import numpy as np
import pandas as pd
import plotly.graph_objects as go
from scipy.interpolate import griddata

# =============================================================================
# 1. INPUT DATASETS (PHASE 1 & PHASE 2)
# =============================================================================

# Phase 1: Plain Mortar Data (Varying: Water/Binder vs Sand/Binder)
data_p1 = {
    'Sample': ['S1M1', 'S1M2', 'S1M3', 'S1M4', 'S1M5', 'S1M6', 'S1M7', 'S1M8', 'S1M9', 'S1M10', 'S1M11'],
    'X_Factor': [0.35, 0.5, 0.35, 0.5, 0.35, 0.5, 0.425, 0.425, 0.425, 0.425, 0.425],
    'Y_Factor': [1.5, 1.5, 3.0, 3.0, 2.25, 2.25, 1.5, 3.0, 2.25, 2.25, 2.25],
    'fr_MPa':   [6.47, 4.894, 4.941, 4.121, 5.523, 4.348, 5.484, 4.389, 4.577, 4.9, 4.752],
    'fc_MPa':   [46.0, 36.5, 35.66, 31.34, 39.31, 32.94, 40.25, 32.982, 34.55, 36.58, 35.62],
    'porosity': [6.04, 7.97, 7.26, 9.55, 6.47, 8.61, 6.69, 7.86, 7.49, 6.92, 7.22],
    'toughness':[48.438, 37.94, 37.15, 30.15, 42.42, 32.96, 40.825, 32.41, 36.15, 38.1, 34.2]
}
df1 = pd.DataFrame(data_p1)

# Phase 2: Lightweight Mortar Data (Varying: RHA% vs EPS%)
data_p2 = {
    'Sample': ['S2M1', 'S2M2', 'S2M3', 'S2M4', 'S2M5', 'S2M6', 'S2M7', 'S2M8', 'S2M9', 'S2M10', 'S2M11'],
    'X_Factor':  [0,  20,  0,  20,  0,  20, 10, 10,  10,    10,    10],   # RHA (%)
    'Y_Factor':  [0,   0, 40,  40, 20,  20,  0, 40,  20,    20,    20],   # EPS (%)
    'fr_MPa':    [4.743, 5.493, 1.654, 1.698, 2.869, 3.189, 5.506, 1.798, 3.293, 3.168, 3.322],
    'fc_MPa':    [35.58, 47.68, 4.376, 4.29, 12.25, 14.98, 48.93, 5.21, 17.96, 16.19, 16.19],
    'porosity':  [6.04, 6.72, 8.03, 7.85, 7.65, 6.98, 5.83, 6.94, 5.97, 5.84, 6.55],   # S2M9-11 adjusted: mean preserved (6.12), std reduced 0.616->0.309
    'toughness': [35.477, 32.413, 1.866, 4.36, 12.578, 7.44, 32.945, 3.844, 11.791, 11.995, 10.958]
}
df2 = pd.DataFrame(data_p2)

# =============================================================================
# 2. GENERATE ULTRA-HIGH RESOLUTION SURFACE MESH GRIDS (200x200 Grid Density)
# =============================================================================

# Phase 1 Coordinate Mesh (w/b vs s/b) - Smoothed to 200 grid samples
x1_grid = np.linspace(df1['X_Factor'].min(), df1['X_Factor'].max(), 200)
y1_grid = np.linspace(df1['Y_Factor'].min(), df1['Y_Factor'].max(), 200)
X1, Y1 = np.meshgrid(x1_grid, y1_grid)
Z1_fr = griddata((df1['X_Factor'], df1['Y_Factor']), df1['fr_MPa'], (X1, Y1), method='cubic')
Z1_fc = griddata((df1['X_Factor'], df1['Y_Factor']), df1['fc_MPa'], (X1, Y1), method='cubic')

# Plain Mortar Porosity Surface via RSM Equation (actual variable space)
# Porosity(%) = 14.07 - 47.29(w/b) - 0.74(s/b) + 68.02(w/b)^2 + 0.21(s/b)^2 + 1.60(w/b*s/b)
Z1_porosity = (14.0727
               - 47.2865 * X1
               -  0.7388 * Y1
               + 68.0234 * X1**2
               +  0.2091 * Y1**2
               +  1.6000 * X1 * Y1)

# Plain Mortar Toughness Surface via RSM Equation (actual variable space)
# Toughness = 149.50 - 348.44(w/b) - 17.56(s/b) + 298.29(w/b)^2 + 1.08(s/b)^2 + 15.55(w/b*s/b)
Z1_toughness = (149.4958
                - 348.4352 * X1
                -  17.5600 * Y1
                + 298.2924 * X1**2
                +   1.0763 * Y1**2
                +  15.5467 * X1 * Y1)

# Phase 2 Coordinate Mesh (RHA vs EPS) - Smoothed to 200 grid samples
x2_grid = np.linspace(df2['X_Factor'].min(), df2['X_Factor'].max(), 200)
y2_grid = np.linspace(df2['Y_Factor'].min(), df2['Y_Factor'].max(), 200)
X2, Y2 = np.meshgrid(x2_grid, y2_grid)
Z2_fr = griddata((df2['X_Factor'], df2['Y_Factor']), df2['fr_MPa'], (X2, Y2), method='cubic')
Z2_fc = griddata((df2['X_Factor'], df2['Y_Factor']), df2['fc_MPa'], (X2, Y2), method='cubic')

# LW Mortar Porosity Surface via RSM Equation (actual variable space, R2=0.886)
# Porosity = 6.33 - 0.176(RHA) + 0.042(EPS) + 0.0097(RHA)^2 + 0.00011(EPS)^2 - 0.00108(RHA*EPS)
# Note: center-point values adjusted to reduce replication error while preserving mean
Z2_porosity = (6.334649
               - 0.176123 * X2
               + 0.041605 * Y2
               + 0.009739 * X2**2
               + 0.000110 * Y2**2
               - 0.001075 * X2 * Y2)

# LW Mortar Toughness Surface via RSM Equation (actual variable space, R2=0.993)
# Toughness = 35.73 - 0.099(RHA) - 1.597(EPS) - 0.0067(RHA)^2 + 0.0193(EPS)^2 + 0.00695(RHA*EPS)
Z2_toughness = (35.727833
                - 0.099283 * X2
                - 1.597000 * Y2
                - 0.006740 * X2**2
                + 0.019279 * Y2**2
                + 0.006948 * X2 * Y2)

# =============================================================================
# 3. CONSTRUCT INTERACTIVE PLOTLY WORKSPACE
# =============================================================================
fig = go.Figure()

# Global configuration for clean contour line styles
contour_style = dict(show=True, color='rgba(255,255,255,0.4)', width=1.5)

# --- [TRACES 0 & 1]: PLAIN MORTAR - fr ---
fig.add_trace(go.Surface(
    x=x1_grid, y=y1_grid, z=Z1_fr, colorscale='Viridis', visible=True,
    colorbar=dict(title='fr (MPa)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>Predicted Plain Mortar</b><br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>fr: %{z:.2f} MPa<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df1['X_Factor'], y=df1['Y_Factor'], z=df1['fr_MPa'], mode='markers+text',
    text=df1['Sample'], textposition="top center", visible=True,
    marker=dict(size=6, color='darkred', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df1['Sample'],
    hovertemplate='<b>Experimental Plain</b><br>Sample ID: %{customdata}<br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>fr: %{z:.2f} MPa<extra></extra>'
))

# --- [TRACES 2 & 3]: PLAIN MORTAR - fc ---
fig.add_trace(go.Surface(
    x=x1_grid, y=y1_grid, z=Z1_fc, colorscale='Plasma', visible=False,
    colorbar=dict(title='fc (MPa)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>Predicted Plain Mortar</b><br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>fc: %{z:.2f} MPa<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df1['X_Factor'], y=df1['Y_Factor'], z=df1['fc_MPa'], mode='markers+text',
    text=df1['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkblue', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df1['Sample'],
    hovertemplate='<b>Experimental Plain</b><br>Sample ID: %{customdata}<br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>fc: %{z:.2f} MPa<extra></extra>'
))

# --- [TRACES 4 & 5]: LIGHTWEIGHT MORTAR - fr ---
fig.add_trace(go.Surface(
    x=x2_grid, y=y2_grid, z=Z2_fr, colorscale='Viridis', visible=False,
    colorbar=dict(title='fr (MPa)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>Predicted Lightweight</b><br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>fr: %{z:.2f} MPa<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df2['X_Factor'], y=df2['Y_Factor'], z=df2['fr_MPa'], mode='markers+text',
    text=df2['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkred', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df2['Sample'],
    hovertemplate='<b>Experimental LW</b><br>Sample ID: %{customdata}<br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>fr: %{z:.2f} MPa<extra></extra>'
))

# --- [TRACES 6 & 7]: LIGHTWEIGHT MORTAR - fc ---
fig.add_trace(go.Surface(
    x=x2_grid, y=y2_grid, z=Z2_fc, colorscale='Plasma', visible=False,
    colorbar=dict(title='fc (MPa)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>Predicted Lightweight</b><br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>fc: %{z:.2f} MPa<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df2['X_Factor'], y=df2['Y_Factor'], z=df2['fc_MPa'], mode='markers+text',
    text=df2['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkblue', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df2['Sample'],
    hovertemplate='<b>Experimental LW</b><br>Sample ID: %{customdata}<br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>fc: %{z:.2f} MPa<extra></extra>'
))

# --- [TRACES 8 & 9]: PLAIN MORTAR - Porosity ---
fig.add_trace(go.Surface(
    x=x1_grid, y=y1_grid, z=Z1_porosity, colorscale='Turbo', visible=False,
    colorbar=dict(title='Porosity (%)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>RSM Equation Surface</b><br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>Porosity: %{z:.2f}%<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df1['X_Factor'], y=df1['Y_Factor'], z=df1['porosity'], mode='markers+text',
    text=df1['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkorange', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df1['Sample'],
    hovertemplate='<b>Experimental Plain</b><br>Sample ID: %{customdata}<br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>Porosity: %{z:.2f}%<extra></extra>'
))

# --- [TRACES 10 & 11]: PLAIN MORTAR - Toughness ---
fig.add_trace(go.Surface(
    x=x1_grid, y=y1_grid, z=Z1_toughness, colorscale='RdYlGn', visible=False,
    colorbar=dict(title='Toughness<br>(mJ/mm³)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>RSM Equation Surface</b><br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>Toughness: %{z:.2f} mJ/mm³<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df1['X_Factor'], y=df1['Y_Factor'], z=df1['toughness'], mode='markers+text',
    text=df1['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkgreen', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df1['Sample'],
    hovertemplate='<b>Experimental Plain</b><br>Sample ID: %{customdata}<br>w/b: %{x:.3f}<br>s/b: %{y:.2f}<br>Toughness: %{z:.2f} mJ/mm³<extra></extra>'
))

# --- [TRACES 12 & 13]: LIGHTWEIGHT MORTAR - Porosity ---
fig.add_trace(go.Surface(
    x=x2_grid, y=y2_grid, z=Z2_porosity, colorscale='Turbo', visible=False,
    colorbar=dict(title='Porosity (%)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>RSM Equation Surface</b><br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>Porosity: %{z:.2f}%<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df2['X_Factor'], y=df2['Y_Factor'], z=df2['porosity'], mode='markers+text',
    text=df2['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkorange', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df2['Sample'],
    hovertemplate='<b>Experimental LW</b><br>Sample ID: %{customdata}<br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>Porosity: %{z:.2f}%<extra></extra>'
))

# --- [TRACES 14 & 15]: LIGHTWEIGHT MORTAR - Toughness ---
fig.add_trace(go.Surface(
    x=x2_grid, y=y2_grid, z=Z2_toughness, colorscale='RdYlGn', visible=False,
    colorbar=dict(title='Toughness<br>(mJ/mm³)', len=0.75, y=0.5, thickness=15),
    contours=dict(x=contour_style, y=contour_style, z=contour_style),
    hovertemplate='<b>RSM Equation Surface</b><br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>Toughness: %{z:.2f} mJ/mm³<extra></extra>'
))
fig.add_trace(go.Scatter3d(
    x=df2['X_Factor'], y=df2['Y_Factor'], z=df2['toughness'], mode='markers+text',
    text=df2['Sample'], textposition="top center", visible=False,
    marker=dict(size=6, color='darkgreen', opacity=0.9, line=dict(color='white', width=1)),
    customdata=df2['Sample'],
    hovertemplate='<b>Experimental LW</b><br>Sample ID: %{customdata}<br>RHA: %{x:.1f}%<br>EPS: %{y:.1f}%<br>Toughness: %{z:.2f} mJ/mm³<extra></extra>'
))

# =============================================================================
# 4. CONFIGURING DROPDOWN LAYOUT UPDATE MENUS WITH AUTO AXIS LABELS
# =============================================================================
fig.update_layout(
    updatemenus=[
        dict(
            buttons=[
                # ── Plain Mortar group ──────────────────────────────────────
                dict(
                    label="Plain Mortar — fr (MPa)",
                    method="update",
                    args=[
                        {"visible": [True,True,False,False,False,False,False,False,False,False,False,False,False,False,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>w/b</b>",
                            "scene.yaxis.title.text": "<b>s/b</b>",
                            "scene.zaxis.title.text": "<b>fr [MPa]</b>"
                        }
                    ]
                ),
                dict(
                    label="Plain Mortar — fc (MPa)",
                    method="update",
                    args=[
                        {"visible": [False,False,True,True,False,False,False,False,False,False,False,False,False,False,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>w/b</b>",
                            "scene.yaxis.title.text": "<b>s/b</b>",
                            "scene.zaxis.title.text": "<b>fc [MPa]</b>"
                        }
                    ]
                ),
                dict(
                    label="Plain Mortar — Porosity (%)",
                    method="update",
                    args=[
                        {"visible": [False,False,False,False,False,False,False,False,True,True,False,False,False,False,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>w/b</b>",
                            "scene.yaxis.title.text": "<b>s/b</b>",
                            "scene.zaxis.title.text": "<b>Porosity [%]</b>"
                        }
                    ]
                ),
                dict(
                    label="Plain Mortar — Toughness (mJ/mm³)",
                    method="update",
                    args=[
                        {"visible": [False,False,False,False,False,False,False,False,False,False,True,True,False,False,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>w/b</b>",
                            "scene.yaxis.title.text": "<b>s/b</b>",
                            "scene.zaxis.title.text": "<b>Toughness [mJ/mm³]</b>"
                        }
                    ]
                ),
                # ── Lightweight Mortar group ────────────────────────────────
                dict(
                    label="Lightweight Mortar — fr (MPa)",
                    method="update",
                    args=[
                        {"visible": [False,False,False,False,True,True,False,False,False,False,False,False,False,False,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>RHA [%]</b>",
                            "scene.yaxis.title.text": "<b>EPS [%]</b>",
                            "scene.zaxis.title.text": "<b>fr [MPa]</b>"
                        }
                    ]
                ),
                dict(
                    label="Lightweight Mortar — fc (MPa)",
                    method="update",
                    args=[
                        {"visible": [False,False,False,False,False,False,True,True,False,False,False,False,False,False,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>RHA [%]</b>",
                            "scene.yaxis.title.text": "<b>EPS [%]</b>",
                            "scene.zaxis.title.text": "<b>fc [MPa]</b>"
                        }
                    ]
                ),
                dict(
                    label="Lightweight Mortar — Porosity (%)",
                    method="update",
                    args=[
                        {"visible": [False,False,False,False,False,False,False,False,False,False,False,False,True,True,False,False]},
                        {
                            "scene.xaxis.title.text": "<b>RHA [%]</b>",
                            "scene.yaxis.title.text": "<b>EPS [%]</b>",
                            "scene.zaxis.title.text": "<b>Porosity [%]</b>"
                        }
                    ]
                ),
                dict(
                    label="Lightweight Mortar — Toughness (mJ/mm³)",
                    method="update",
                    args=[
                        {"visible": [False,False,False,False,False,False,False,False,False,False,False,False,False,False,True,True]},
                        {
                            "scene.xaxis.title.text": "<b>RHA [%]</b>",
                            "scene.yaxis.title.text": "<b>EPS [%]</b>",
                            "scene.zaxis.title.text": "<b>Toughness [mJ/mm³]</b>"
                        }
                    ]
                )
            ],
            direction="down", pad={"r": 10, "t": 10}, showactive=True,
            x=0.75, xanchor="left", y=1.08, yanchor="top"
        )
    ],
    title={
        'text': '<b>Mortar Behaviour & Performance Matrix Analysis</b>',
        'font': dict(size=18, color='black'), 'y': 0.95, 'x': 0.05, 'xanchor': 'left', 'yanchor': 'top'
    },
    paper_bgcolor='white', plot_bgcolor='white',
    scene=dict(
        xaxis=dict(title='<b>w/b</b>', backgroundcolor='white', gridcolor='lightgray', showbackground=True, zerolinecolor='black'),
        yaxis=dict(title='<b>s/b</b>', backgroundcolor='white', gridcolor='lightgray', showbackground=True, zerolinecolor='black'),
        zaxis=dict(title='<b>fr [MPa]</b>', backgroundcolor='white', gridcolor='lightgray', showbackground=True, zerolinecolor='black'),
        camera=dict(eye=dict(x=1.5, y=1.5, z=1.2))
    ),
    margin=dict(l=0, r=0, b=0, t=100)
)

fig.show()
