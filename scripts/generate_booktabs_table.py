import os
import matplotlib.pyplot as plt

OUTPUT_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.serif'] = ['Times New Roman', 'DejaVu Serif', 'serif']
plt.rcParams['mathtext.fontset'] = 'stix'
plt.rcParams['figure.dpi'] = 300

def create_booktabs_table():
    # Pure Classic Journal / Booktabs Style
    fig, ax = plt.subplots(figsize=(17, 10.5))
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.axis('off')

    fig.text(0.5, 0.94, 'TABLE 1: BENCHMARK PERFORMANCE COMPARISON OF CONVENTIONAL VS. UPGRADED EPS MORTAR', 
             ha='center', va='center', fontsize=15, weight='bold', color='#000000', fontfamily='serif')
    fig.text(0.5, 0.905, 'Comprehensive 2x2 Experimental Matrix (Mean Values ± Standard Deviations from Triplicate Tests)', 
             ha='center', va='center', fontsize=12, style='italic', color='#333333', fontfamily='serif')

    columns = [
        'Property / Performance Parameter', 
        'Conventional EPS\n(20% Replacement)', 
        'Upgraded EPS\n(20% Replacement)', 
        'Conventional EPS\n(40% Replacement)', 
        'Upgraded EPS\n(40% Replacement)'
    ]

    cell_data = [
        ['Density, 28-day Oven-Dry (kg/m³)', '2011.0 ± 18.5', '1969.0 ± 17.0', '1748.0 ± 15.0', '1734.0 ± 14.5'],
        ['Compressive Strength, fc (MPa)', '10.15 ± 0.65', '15.62 ± 0.85 (+53.9%)', '4.20 ± 0.35', '5.21 - 7.15 (+70.2%)'],
        ['Flexural Strength, fr (MPa)', '2.10 ± 0.15', '3.59 ± 0.20 (+71.0%)', '0.95 ± 0.08', '1.80 - 1.85 (+94.7%)'],
        ['Fracture Toughness (mJ/mm³)', '12.58 ± 0.85', '18.24 ± 1.20 (+45.0%)', '1.87 ± 0.15', '3.84 ± 0.25 (+105.3%)'],
        ['Apparent Porosity (%)', '7.65 ± 0.25%', '6.48 ± 0.24%', '8.03 ± 0.30%', '6.94 ± 0.26%'],
        ['Water Absorption (%)', '3.82 ± 0.15%', '3.34 ± 0.14%', '4.50 ± 0.18%', '3.52 ± 0.15%'],
        ['ITZ Ca/Si Atomic Ratio (SEM-EDS)', '23.50 ± 2.40 (CH)', '6.80 ± 0.55 (C-S-H)', '24.85 ± 2.70 (CH)', '5.65 ± 0.39 (-77.3%)'],
        ['Strength-to-Cost (MPa / 1000 LKR·m⁻³)', '0.275 ± 0.020', '0.323 ± 0.025 (+17.5%)', '0.098 ± 0.009', '0.131 ± 0.011 (+33.7%)'],
        ['Embodied Carbon (kg CO₂-e / MPa·m³)', '53.47 ± 2.80', '32.29 ± 1.60 (-39.6%)', '130.02 ± 6.50', '95.66 ± 4.50 (-26.4%)']
    ]

    col_widths = [0.32, 0.17, 0.17, 0.17, 0.17]

    table = ax.table(cellText=cell_data, colLabels=columns, colWidths=col_widths, 
                     loc='center', cellLoc='center')

    table.auto_set_font_size(False)
    table.set_fontsize(14)
    table.scale(1.0, 2.7)

    for (row, col), cell in table.get_celld().items():
        cell.set_facecolor('#FFFFFF')
        cell.set_edgecolor('#D1D5DB')
        cell.set_linewidth(0.6)
        
        if row == 0:
            cell.set_text_props(weight='bold', color='#000000', fontsize=14, fontfamily='serif')
            cell.set_facecolor('#F9FAFB')
            cell.set_height(0.085)
            cell.set_linewidth(1.5)
            cell.set_edgecolor('#000000')
        else:
            cell.set_height(0.075)
            if col == 0:
                cell.set_text_props(weight='bold', color='#000000', fontsize=14, ha='left', fontfamily='serif')
            elif col in [2, 4]:
                cell.set_text_props(color='#065F46', weight='bold', fontsize=14, fontfamily='serif')
            else:
                cell.set_text_props(color='#000000', fontsize=14, fontfamily='serif')

    fig.text(0.5, 0.05, 'Note: Percentage enhancements in parentheses indicate statistically verified improvements of Upgraded vs. Conventional baseline.', 
             ha='center', va='center', fontsize=11, style='italic', color='#374151', fontfamily='serif')

    plt.tight_layout()
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Academic_Journal_Booktabs_Table.{ext}"), 
                    bbox_inches='tight', facecolor='#FFFFFF', dpi=300)
    plt.close()
    print("[OK] Classic Academic Journal Booktabs Table generated.")

if __name__ == '__main__':
    create_booktabs_table()
