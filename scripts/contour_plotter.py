import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.interpolate import griddata

# ---------------------------------------------------------
# 1. DATA PREPARATION (Extracted from CCD Table)
# ---------------------------------------------------------
data = {
    'Mix': ['S1M1', 'S1M2', 'S1M3', 'S1M4', 'S1M5', 'S1M6', 'S1M7', 'S1M8', 'S1M9', 'S1M10', 'S1M11'],
    'wc': [0.350, 0.500, 0.350, 0.500, 0.350, 0.500, 0.425, 0.425, 0.425, 0.425, 0.425],
    'sc': [1.500, 1.500, 3.000, 3.000, 2.250, 2.250, 1.500, 3.000, 2.250, 2.250, 2.250],
    'fr': [6.07, 4.29, 4.38, 4.20, 5.72, 4.75, 5.68, 4.79, 5.28, 5.19, 5.25]
}
df = pd.DataFrame(data)

# ---------------------------------------------------------
# 2. INTERPOLATION
# ---------------------------------------------------------
# Create a meshgrid for interpolation based on your data ranges
grid_wc, grid_sc = np.mgrid[0.35:0.50:100j, 1.5:3.0:100j]

# Interpolate the data to create the surface
grid_fr = griddata((df['wc'], df['sc']), df['fr'], (grid_wc, grid_sc), method='cubic')

# ---------------------------------------------------------
# 3. 3D SURFACE PLOT
# ---------------------------------------------------------
fig1 = plt.figure(figsize=(10, 7))
ax1 = fig1.add_subplot(111, projection='3d')

# Plot surface and scatter points
surf1 = ax1.plot_surface(grid_wc, grid_sc, grid_fr, cmap='viridis', edgecolor='none', alpha=0.9)
ax1.scatter(df['wc'], df['sc'], df['fr'], color='red', s=50, label='Actual Data Points')

# Formatting
ax1.set_xlabel('Water/Cement Ratio (w/c)', labelpad=10)
ax1.set_ylabel('Sand/Cement Ratio (s/c)', labelpad=10)
ax1.set_zlabel('Flexural Strength (MPa)', labelpad=10)
ax1.set_title('Response Surface: Flexural Strength ($f_r$)')
ax1.view_init(elev=25, azim=135)
ax1.legend()

# Colorbar and save
fig1.colorbar(surf1, ax=ax1, shrink=0.5, aspect=10)
plt.tight_layout()
plt.savefig('response_surfaces.png', dpi=300)

# ---------------------------------------------------------
# 4. 2D CONTOUR PLOT
# ---------------------------------------------------------
fig2, ax2 = plt.subplots(figsize=(8, 6))

# Plot contour and scatter points
cp = ax2.contourf(grid_wc, grid_sc, grid_fr, levels=15, cmap='viridis')
ax2.scatter(df['wc'], df['sc'], color='red', s=50)

# Annotate points with Mix IDs
for i, txt in enumerate(df['Mix']):
    ax2.annotate(txt, (df['wc'][i], df['sc'][i]), textcoords="offset points", xytext=(5,5), ha='center', color='white', weight='bold')

# Formatting
fig2.colorbar(cp, label='Flexural Strength (MPa)')
ax2.set_xlabel('Water/Cement Ratio (w/c)')
ax2.set_ylabel('Sand/Cement Ratio (s/c)')
ax2.set_title('Contour Plot: Flexural Strength Optimization')

# Save and display
plt.tight_layout()
plt.savefig('contour_plot.png', dpi=300)

plt.show()
