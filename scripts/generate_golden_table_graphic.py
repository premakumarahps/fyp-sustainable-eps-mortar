import os
import matplotlib.pyplot as plt
import numpy as np

OUTPUT_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['figure.dpi'] = 300

def create_table_graphic():
    fig, ax = plt.subplots(figsize=(15, 8.5))
    fig.patch.set_facecolor('#0E1726') # Sleek dark academic theme
    ax.set_facecolor('#0E1726')
    ax.axis('off')

    # Title
    fig.text(0.5, 0.94, 'BENCHMARK EVALUATION: CONVENTIONAL vs. UPGRADED EPS MORTAR', 
             ha='center', va='center', fontsize=18, weight='bold', color='#FFFFFF')
    fig.text(0.5, 0.89, 'Comprehensive 2x2 Performance Matrix (Experimental Replicates with Standard Deviations)', 
             ha='center', va='center', fontsize=12, color='#94A3B8')

    columns = [
        'Performance Parameter', 
        'Conventional EPS\n(20% Replacement)', 
        'Upgraded EPS\n(20% Replacement)', 
        'Conventional EPS\n(40% Replacement)', 
        'Upgraded EPS\n(40% Replacement)'
    ]

    cell_data = [
        ['28-day Oven-Dry Density (kg/m³)', '2011.0 ± 18.5', '1969.0 ± 17.0 (Lightweight)', '1748.0 ± 15.0', '1734.0 ± 14.5 (Lightweight)'],
        ['Compressive Strength fc (MPa)', '10.15 ± 0.65', '15.62 ± 0.85 (+53.9% ▲)', '4.20 ± 0.35', '5.21 - 7.15 (+70.2% ▲)'],
        ['Flexural Strength fr (MPa)', '2.10 ± 0.15', '3.59 ± 0.20 (+71.0% ▲)', '0.95 ± 0.08', '1.80 - 1.85 (+94.7% ▲)'],
        ['Fracture Toughness (mJ/mm³)', '12.58 ± 0.85', '18.24 ± 1.20 (+45.0% ▲)', '1.87 ± 0.15', '3.84 ± 0.25 (+105.3% ▲)'],
        ['Apparent Porosity (%)', '7.65 ± 0.25%', '6.48 ± 0.24% (Refined)', '8.03 ± 0.30%', '6.94 ± 0.26% (Refined)'],
        ['Water Absorption (%)', '3.82 ± 0.15%', '3.34 ± 0.14% (Reduced)', '4.50 ± 0.18%', '3.52 ± 0.15% (Reduced)'],
        ['ITZ Ca/Si Ratio (SEM-EDS)', '23.50 ± 2.40 (CH)', '6.80 ± 0.55 (C-S-H ▼)', '24.85 ± 2.70 (CH)', '5.65 ± 0.39 (-77.3% C-S-H ▼)'],
        ['Strength-to-Cost (MPa/kLKR)', '0.275 ± 0.020', '0.323 ± 0.025 (+17.5% ▲)', '0.098 ± 0.009', '0.131 ± 0.011 (+33.7% ▲)'],
        ['Embodied Carbon (kg CO2/MPa)', '53.47 ± 2.80', '32.29 ± 1.60 (-39.6% ▼)', '130.02 ± 6.50', '95.66 ± 4.50 (-26.4% ▼)']
    ]

    col_widths = [0.28, 0.18, 0.18, 0.18, 0.18]

    table = ax.table(cellText=cell_data, colLabels=columns, colWidths=col_widths, 
                     loc='center', cellLoc='center')

    table.auto_set_font_size(False)
    table.set_fontsize(10)
    table.scale(1.0, 2.2)

    # Style header and rows
    for (row, col), cell in table.get_celld().items():
        cell.set_edgecolor('#1E293B')
        cell.set_linewidth(1.2)
        if row == 0:
            cell.set_text_props(weight='bold', color='#FFFFFF', fontsize=11)
            cell.set_facecolor('#1E293B')
            cell.set_height(0.08)
        else:
            # Data cells
            cell.set_height(0.065)
            if col == 0:
                cell.set_text_props(weight='bold', color='#E2E8F0', ha='left')
                cell.set_facecolor('#131D31')
            elif col in [1, 3]: # Conventional columns
                cell.set_text_props(color='#FCA5A5')
                cell.set_facecolor('#1E1B2E')
            elif col in [2, 4]: # Upgraded columns
                cell.set_text_props(color='#6EE7B7', weight='bold')
                cell.set_facecolor('#062828')

    plt.tight_layout()
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Figure_5_Golden_Benchmark_Table_Graphic.{ext}"), 
                    bbox_inches='tight', facecolor=fig.get_facecolor(), dpi=300)
    plt.close()
    print("[OK] Figure 5: Golden Table Graphic generated.")

if __name__ == '__main__':
    create_table_graphic()
