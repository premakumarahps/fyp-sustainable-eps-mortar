import os
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

OUTPUT_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Configure University / Journal Standard Formatting
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.serif'] = ['Times New Roman', 'DejaVu Serif', 'Liberation Serif', 'serif']
plt.rcParams['mathtext.fontset'] = 'stix' # Times-like math font
plt.rcParams['figure.dpi'] = 300

def create_academic_table():
    # Large dimensions to comfortably render 14pt typography with generous padding
    fig, ax = plt.subplots(figsize=(17, 10.5))
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.axis('off')

    # Main Academic Title & Subtitle in Times New Roman
    fig.text(0.5, 0.94, 'Table 1: Comparative Performance Evaluation of Conventional vs. Upgraded EPS Mortar', 
             ha='center', va='center', fontsize=16, weight='bold', color='#111827', fontfamily='serif')
    fig.text(0.5, 0.905, 'Comprehensive 2x2 Experimental Matrix (Mean Values with Standard Deviations)', 
             ha='center', va='center', fontsize=13, style='italic', color='#4B5563', fontfamily='serif')

    columns = [
        'Property / Performance Metric', 
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

    col_widths = [0.30, 0.175, 0.175, 0.175, 0.175]

    table = ax.table(cellText=cell_data, colLabels=columns, colWidths=col_widths, 
                     loc='center', cellLoc='center')

    # Explicit Font Size = 14 pt
    table.auto_set_font_size(False)
    table.set_fontsize(14)
    table.scale(1.0, 2.7)

    # University / Elsevier Style Borders and Highlighting
    # Header: Deep Navy / Slate Blue
    # Alternate rows: Clean crisp white and subtle grey-tint
    for (row, col), cell in table.get_celld().items():
        cell.set_edgecolor('#9CA3AF') # Clean academic grey borders
        cell.set_linewidth(1.0)
        
        # Header Row
        if row == 0:
            cell.set_text_props(weight='bold', color='#FFFFFF', fontsize=14, fontfamily='serif')
            cell.set_facecolor('#1E3A8A') # University Navy Header
            cell.set_height(0.085)
            cell.set_edgecolor('#1E3A8A')
        else:
            cell.set_height(0.075)
            is_even = (row % 2 == 0)
            
            # Column 0: Row Titles
            if col == 0:
                cell.set_text_props(weight='bold', color='#111827', fontsize=14, ha='left', fontfamily='serif')
                cell.set_facecolor('#F3F4F6' if is_even else '#FFFFFF')
            
            # Conventional Columns (20% and 40%)
            elif col in [1, 3]:
                cell.set_text_props(color='#1F2937', fontsize=14, fontfamily='serif')
                cell.set_facecolor('#FFF7ED' if is_even else '#FFFAF0') # Very subtle warm neutral
            
            # Upgraded Columns (20% and 40%) - Highlighted
            elif col in [2, 4]:
                cell.set_text_props(color='#065F46', weight='bold', fontsize=14, fontfamily='serif')
                cell.set_facecolor('#ECFDF5' if is_even else '#F0FDF4') # Very subtle emerald academic tint

    # Footer note in Times New Roman
    fig.text(0.5, 0.05, '*Note: Values represent mean ± standard deviation from 3 laboratory replicates. Upgraded mixes utilize PVAc coated EPS + 10% RHA + 0.5% PP fibers.', 
             ha='center', va='center', fontsize=11, style='italic', color='#4B5563', fontfamily='serif')

    plt.tight_layout()
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Academic_Golden_Table_TimesNewRoman.{ext}"), 
                    bbox_inches='tight', facecolor=fig.get_facecolor(), dpi=300)
    plt.close()
    print("[OK] University-Standard Academic Table (Times New Roman 14pt) successfully generated.")

if __name__ == '__main__':
    create_academic_table()
