import os
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

OUTPUT_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Configure Times New Roman
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.serif'] = ['Times New Roman', 'DejaVu Serif', 'serif']
plt.rcParams['mathtext.fontset'] = 'stix'
plt.rcParams['figure.dpi'] = 300

def generate_filled_times_table(transparent=True):
    # Figure size adjusted for poster cell aspect ratio
    fig, ax = plt.subplots(figsize=(16, 9.5))
    
    if transparent:
        fig.patch.set_alpha(0.0)
        ax.patch.set_alpha(0.0)
    else:
        fig.patch.set_facecolor('#FFFFFF')
        ax.patch.set_facecolor('#FFFFFF')
        
    ax.axis('off')

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
        ['ITZ Ca/Si Ratio (SEM-EDS)', '23.50 ± 2.40 (CH)', '6.80 ± 0.55 (C-S-H)', '24.85 ± 2.70 (CH)', '5.65 ± 0.39 (-77.3%)'],
        ['Strength-to-Cost (MPa / kLKR·m⁻³)', '0.275 ± 0.020', '0.323 ± 0.025 (+17.5%)', '0.098 ± 0.009', '0.131 ± 0.011 (+33.7%)'],
        ['Embodied Carbon (kg CO₂/MPa·m³)', '53.47 ± 2.80', '32.29 ± 1.60 (-39.6%)', '130.02 ± 6.50', '95.66 ± 4.50 (-26.4%)']
    ]

    col_widths = [0.32, 0.17, 0.17, 0.17, 0.17]

    # Create table spanning the full axis area to maximize text filling the cell
    table = ax.table(cellText=cell_data, colLabels=columns, colWidths=col_widths, 
                     loc='center', cellLoc='center')

    # PROMINENT LARGE FONT SIZE (18pt) to fill the cells
    table.auto_set_font_size(False)
    table.set_fontsize(18)
    table.scale(1.0, 3.2)

    for (row, col), cell in table.get_celld().items():
        cell.set_edgecolor('#1E293B')
        cell.set_linewidth(1.5)
        
        # Header Row
        if row == 0:
            cell.set_text_props(weight='bold', color='#FFFFFF', fontsize=18, fontfamily='serif')
            cell.set_facecolor('#1E3A8A') # Dark university navy header
            cell.set_height(0.095)
            cell.set_edgecolor('#0F172A')
        else:
            cell.set_height(0.088)
            is_even = (row % 2 == 0)
            
            if col == 0:
                cell.set_text_props(weight='bold', color='#0F172A', fontsize=17, ha='left', fontfamily='serif')
                cell.set_facecolor('#F1F5F9' if is_even else '#FFFFFF')
            elif col in [1, 3]:
                # Conventional columns
                cell.set_text_props(color='#1E293B', fontsize=17, fontfamily='serif')
                cell.set_facecolor('#FFF7ED' if is_even else '#FFFAF0')
            elif col in [2, 4]:
                # Upgraded columns - highlighted in green
                cell.set_text_props(color='#047857', weight='bold', fontsize=17, fontfamily='serif')
                cell.set_facecolor('#ECFDF5' if is_even else '#F0FDF4')

    plt.tight_layout(pad=0.5)
    
    # Save Transparent Version
    fig.savefig(os.path.join(OUTPUT_DIR, "Poster_Themed_Golden_Table_Transparent.png"), 
                bbox_inches='tight', transparent=True, dpi=300)
    fig.savefig(os.path.join(OUTPUT_DIR, "Poster_Themed_Golden_Table_Transparent.svg"), 
                bbox_inches='tight', transparent=True)
    
    # Save White Background Version
    fig.savefig(os.path.join(OUTPUT_DIR, "Poster_Themed_Golden_Table_White_Card.png"), 
                bbox_inches='tight', facecolor='#FFFFFF', dpi=300)
    fig.savefig(os.path.join(OUTPUT_DIR, "Poster_Themed_Golden_Table_White_Card.pdf"), 
                bbox_inches='tight', facecolor='#FFFFFF')
    
    plt.close()
    print("[OK] Generated Poster_Themed_Golden_Table_Transparent.png with large Times New Roman font filling the cells.")

if __name__ == '__main__':
    generate_filled_times_table(transparent=True)
