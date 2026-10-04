import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# Configure high-quality styling for publication
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.labelsize'] = 12
plt.rcParams['axes.titlesize'] = 13
plt.rcParams['xtick.labelsize'] = 10
plt.rcParams['ytick.labelsize'] = 10
plt.rcParams['legend.fontsize'] = 10
plt.rcParams['figure.titlesize'] = 15
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['savefig.bbox'] = 'tight'

OUTPUT_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. RADAR / SPIDER CHART
# -------------------------------------------------------------
def generate_radar_chart():
    categories = [
        'Compressive\nStrength ($f_c$)',
        'Flexural\nStrength ($f_r$)',
        'Fracture\nToughness',
        'Water\nImpermeability',
        'ITZ C-S-H\nQuality ($1/\\text{Ca:Si}$)',
        'Cost\nEfficiency',
        'Eco-Efficiency\n($1/\\text{Carbon}$)',
        'Lightweight\nEffect'
    ]
    num_vars = len(categories)

    # Compute angle of each axis
    angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()
    angles += angles[:1] # Complete the circle

    # Normalized scores (0 to 10 scale based on relative benchmarking)
    # 1. Compressive Strength (max ~18 MPa -> 10)
    # 2. Flexural Strength (max ~4 MPa -> 10)
    # 3. Toughness (max ~25 -> 10)
    # 4. Water Impermeability (inverse of water absorption %)
    # 5. ITZ Quality (inverse of Ca/Si)
    # 6. Cost Efficiency (MPa / kLKR)
    # 7. Eco-Efficiency (1 / carbon intensity)
    # 8. Lightweight effect (lower density -> higher score)

    # Raw metrics for reference:
    # C20: fc=10.15, fr=2.10, T=12.58, Wa=3.82, CaSi=23.50, CE=0.275, CI=53.47, Dens=2011
    # U20: fc=15.62, fr=3.59, T=18.24, Wa=3.34, CaSi=6.80,  CE=0.323, CI=32.29, Dens=1969
    # C40: fc=4.20,  fr=0.95, T=1.87,  Wa=4.50, CaSi=24.85, CE=0.098, CI=130.0, Dens=1748
    # U40: fc=5.21,  fr=1.80, T=3.84,  Wa=3.52, CaSi=5.65,  CE=0.131, CI=95.66, Dens=1734

    values_c20 = [5.6, 5.2, 5.0, 5.8, 2.4, 5.5, 5.2, 5.5]
    values_u20 = [8.7, 9.0, 7.3, 7.5, 8.3, 6.5, 8.5, 6.2]
    values_c40 = [2.3, 2.4, 0.7, 4.2, 2.3, 2.0, 2.1, 9.2]
    values_u40 = [3.2, 4.5, 1.5, 6.8, 9.2, 2.6, 3.2, 9.5]

    for v in [values_c20, values_u20, values_c40, values_u40]:
        v += v[:1]

    fig, ax = plt.subplots(figsize=(9, 9), subplot_kw=dict(polar=True))
    
    # Background and Grid
    ax.set_theta_offset(np.pi / 2)
    ax.set_theta_direction(-1)
    plt.xticks(angles[:-1], categories, size=11, weight='bold', color='#1A252C')
    ax.tick_params(pad=18)
    
    ax.set_rlabel_position(0)
    plt.yticks([2, 4, 6, 8, 10], ["2", "4", "6", "8", "10"], color="#7F8C8D", size=9)
    plt.ylim(0, 10)
    ax.grid(color='#BDC3C7', linestyle='--', linewidth=0.8, alpha=0.7)
    ax.set_facecolor('#FBFDFE')

    # Plot lines & fills
    # Conventional 20%
    ax.plot(angles, values_c20, linewidth=2, linestyle='--', color='#E74C3C', label='Conventional EPS (20%)', marker='o', markersize=4)
    ax.fill(angles, values_c20, color='#E74C3C', alpha=0.12)

    # Upgraded 20%
    ax.plot(angles, values_u20, linewidth=2.5, linestyle='-', color='#1B4F72', label='Upgraded EPS (20%) [RHA+Coat+PP]', marker='s', markersize=5)
    ax.fill(angles, values_u20, color='#2E86C1', alpha=0.22)

    # Conventional 40%
    ax.plot(angles, values_c40, linewidth=2, linestyle=':', color='#E67E22', label='Conventional EPS (40%)', marker='^', markersize=4)
    ax.fill(angles, values_c40, color='#E67E22', alpha=0.10)

    # Upgraded 40%
    ax.plot(angles, values_u40, linewidth=2.5, linestyle='-', color='#117864', label='Upgraded EPS (40%) [RHA+Coat]', marker='D', markersize=5)
    ax.fill(angles, values_u40, color='#1ABC9C', alpha=0.20)

    plt.title("Multi-Criteria Performance Polygon\nConventional vs. Upgraded EPS Mortar", size=15, weight='bold', pad=30, color='#0B2545')
    plt.legend(loc='upper right', bbox_to_anchor=(1.35, 1.12), frameon=True, facecolor='#FFFFFF', edgecolor='#BDC3C7', shadow=True)

    # Save
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Figure_1_Multi_Criteria_Radar_Chart.{ext}"), bbox_inches='tight', dpi=300)
    plt.close()
    print("[OK] Figure 1: Radar Chart generated.")

# -------------------------------------------------------------
# 2. GROUPED MULTI-PANEL BAR CHARTS (2x2)
# -------------------------------------------------------------
def generate_grouped_bar_charts():
    fig, axs = plt.subplots(2, 2, figsize=(14, 11))
    fig.patch.set_facecolor('#FFFFFF')
    
    x = np.arange(2) # 20% EPS, 40% EPS
    width = 0.35

    # Labels
    x_labels = ['20% EPS Replacement', '40% EPS Replacement']

    # Colors
    c_conv = '#D9534F'   # Coral Red
    c_upg = '#1E88E5'    # Royal Blue
    c_upg2 = '#00897B'   # Teal
    c_conv2 = '#F39C12'  # Orange

    # Subplot A: Compressive Strength & Flexural Strength
    ax = axs[0, 0]
    fc_conv = [10.15, 4.20]
    fc_conv_err = [0.65, 0.35]
    fc_upg = [15.62, 5.21]
    fc_upg_err = [0.85, 0.40]

    rects1 = ax.bar(x - width/2, fc_conv, width, yerr=fc_conv_err, capsize=5, label='Conventional EPS', color=c_conv, edgecolor='#333333', linewidth=1, hatch='//', alpha=0.85)
    rects2 = ax.bar(x + width/2, fc_upg, width, yerr=fc_upg_err, capsize=5, label='Upgraded EPS', color=c_upg, edgecolor='#333333', linewidth=1, alpha=0.9)

    ax.set_ylabel('Compressive Strength $f_c$ (MPa)', weight='bold')
    ax.set_title('(a) Compressive Strength Recovery', weight='bold', color='#1A252C')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 20)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(frameon=True, loc='upper right')

    # Annotate bar values
    for rect in rects1:
        h = rect.get_height()
        ax.annotate(f'{h:.2f} MPa', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold')
    for rect in rects2:
        h = rect.get_height()
        ax.annotate(f'{h:.2f} MPa', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold', color='#0D47A1')

    # Subplot B: Flexural Strength & Toughness
    ax = axs[0, 1]
    t_conv = [12.58, 1.87]
    t_conv_err = [0.85, 0.15]
    t_upg = [18.24, 3.84]
    t_upg_err = [1.20, 0.25]

    rects1 = ax.bar(x - width/2, t_conv, width, yerr=t_conv_err, capsize=5, label='Conventional EPS', color='#E67E22', edgecolor='#333333', linewidth=1, hatch='\\\\', alpha=0.85)
    rects2 = ax.bar(x + width/2, t_upg, width, yerr=t_upg_err, capsize=5, label='Upgraded EPS', color='#43A047', edgecolor='#333333', linewidth=1, alpha=0.9)

    ax.set_ylabel('Fracture Toughness (mJ/mm³)', weight='bold')
    ax.set_title('(b) Fracture Energy & Toughness', weight='bold', color='#1A252C')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 24)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(frameon=True, loc='upper right')

    for rect in rects1:
        h = rect.get_height()
        ax.annotate(f'{h:.2f}', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold')
    for rect in rects2:
        h = rect.get_height()
        ax.annotate(f'{h:.2f}', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold', color='#1B5E20')

    # Subplot C: ITZ Ca/Si Atomic Ratio (Microstructural Chemistry)
    ax = axs[1, 0]
    casi_conv = [23.50, 24.85]
    casi_conv_err = [2.40, 2.70]
    casi_upg = [6.80, 5.65]
    casi_upg_err = [0.55, 0.39]

    rects1 = ax.bar(x - width/2, casi_conv, width, yerr=casi_conv_err, capsize=5, label='Conventional (Portlandite CH)', color='#8E44AD', edgecolor='#333333', linewidth=1, hatch='xx', alpha=0.85)
    rects2 = ax.bar(x + width/2, casi_upg, width, yerr=casi_upg_err, capsize=5, label='Upgraded (Dense C-S-H)', color='#00ACC1', edgecolor='#333333', linewidth=1, alpha=0.9)

    ax.set_ylabel('ITZ Ca/Si Atomic Ratio (SEM-EDS)', weight='bold')
    ax.set_title('(c) Interfacial Transition Zone (ITZ) Ca/Si Ratio', weight='bold', color='#1A252C')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 32)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(frameon=True, loc='upper right')

    for rect in rects1:
        h = rect.get_height()
        ax.annotate(f'{h:.2f}', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold')
    for rect in rects2:
        h = rect.get_height()
        ax.annotate(f'{h:.2f}', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold', color='#006064')

    # Subplot D: Strength-to-Cost Efficiency & Embodied Carbon
    ax = axs[1, 1]
    ce_conv = [0.275, 0.098]
    ce_conv_err = [0.020, 0.009]
    ce_upg = [0.323, 0.131]
    ce_upg_err = [0.025, 0.011]

    rects1 = ax.bar(x - width/2, ce_conv, width, yerr=ce_conv_err, capsize=5, label='Conventional EPS', color='#78909C', edgecolor='#333333', linewidth=1, hatch='//', alpha=0.85)
    rects2 = ax.bar(x + width/2, ce_upg, width, yerr=ce_upg_err, capsize=5, label='Upgraded EPS', color='#3949AB', edgecolor='#333333', linewidth=1, alpha=0.9)

    ax.set_ylabel('Strength-to-Cost Ratio (MPa / 1000 LKR)', weight='bold')
    ax.set_title('(d) Economic Performance Efficiency', weight='bold', color='#1A252C')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 0.45)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(frameon=True, loc='upper right')

    for rect in rects1:
        h = rect.get_height()
        ax.annotate(f'{h:.3f}', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold')
    for rect in rects2:
        h = rect.get_height()
        ax.annotate(f'{h:.3f}', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 6),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, weight='bold', color='#1A237E')

    plt.tight_layout()
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Figure_2_Grouped_Bar_Comparison_2x2.{ext}"), bbox_inches='tight', dpi=300)
    plt.close()
    print("[OK] Figure 2: Grouped Bar Chart (2x2) generated.")

# -------------------------------------------------------------
# 3. RELATIVE PERCENTAGE ENHANCEMENT BAR CHART
# -------------------------------------------------------------
def generate_enhancement_chart():
    fig, ax = plt.subplots(figsize=(12, 6))
    fig.patch.set_facecolor('#FFFFFF')

    metrics = [
        'Compressive\nStrength ($f_c$)',
        'Flexural\nStrength ($f_r$)',
        'Fracture\nToughness',
        'Cost Efficiency\n(MPa/kLKR)',
        'Water Absorption\nReduction',
        'Porosity\nRefinement',
        'ITZ Ca/Si Drop\n(C-S-H Formation)',
        'Carbon Intensity\nReduction'
    ]
    
    # % Improvements (+ = better for all metrics)
    gain_20 = [53.9, 71.0, 45.0, 17.5, 12.6, 15.3, 71.1, 39.6]
    gain_40 = [24.0, 89.5, 105.3, 33.7, 21.8, 13.6, 77.3, 26.4]

    x = np.arange(len(metrics))
    width = 0.38

    rects1 = ax.bar(x - width/2, gain_20, width, label='20% EPS Upgrade vs. Conventional 20%', color='#1B4F72', edgecolor='#1A252C', linewidth=1, alpha=0.9)
    rects2 = ax.bar(x + width/2, gain_40, width, label='40% EPS Upgrade vs. Conventional 40%', color='#00897B', edgecolor='#1A252C', linewidth=1, alpha=0.9)

    ax.set_ylabel('Performance Enhancement (% Improvement)', weight='bold', fontsize=12)
    ax.set_title('Quantified Synergy: Percentage Gains of Upgraded Mortar over Conventional Baseline', weight='bold', fontsize=14, pad=15, color='#0B2545')
    ax.set_xticks(x)
    ax.set_xticklabels(metrics, weight='bold', fontsize=10)
    ax.set_ylim(0, 125)
    ax.grid(axis='y', linestyle='--', alpha=0.6)
    ax.legend(frameon=True, fontsize=11, facecolor='#FFFFFF', edgecolor='#BDC3C7')

    # Add data labels
    for rect in rects1:
        h = rect.get_height()
        ax.annotate(f'+{h:.1f}%', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 4),
                    textcoords="offset points", ha='center', va='bottom', fontsize=8.5, weight='bold', color='#1B4F72')
    for rect in rects2:
        h = rect.get_height()
        ax.annotate(f'+{h:.1f}%', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 4),
                    textcoords="offset points", ha='center', va='bottom', fontsize=8.5, weight='bold', color='#004D40')

    plt.tight_layout()
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Figure_3_Percentage_Enhancement_Synergy.{ext}"), bbox_inches='tight', dpi=300)
    plt.close()
    print("[OK] Figure 3: Percentage Enhancement Chart generated.")

# -------------------------------------------------------------
# 4. POSTER PANORAMIC FIGURE (TRIPTYCH)
# -------------------------------------------------------------
def generate_poster_triptych():
    fig, axs = plt.subplots(1, 3, figsize=(18, 5.5))
    fig.patch.set_facecolor('#FFFFFF')

    x_labels = ['20% EPS', '40% EPS']
    x = np.arange(len(x_labels))
    width = 0.35

    # Panel 1: Compressive & Flexural Strength
    ax = axs[0]
    fc_c = [10.15, 4.20]
    fc_u = [15.62, 5.21]
    ax.bar(x - width/2, fc_c, width, label='Conventional', color='#D9534F', hatch='//', edgecolor='#333')
    ax.bar(x + width/2, fc_u, width, label='Upgraded', color='#1E88E5', edgecolor='#333')
    ax.set_ylabel('Compressive Strength (MPa)', weight='bold')
    ax.set_title('1. Compressive Strength Recovery', weight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 20)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(loc='upper right')

    # Panel 2: Toughness
    ax = axs[1]
    t_c = [12.58, 1.87]
    t_u = [18.24, 3.84]
    ax.bar(x - width/2, t_c, width, label='Conventional', color='#E67E22', hatch='\\\\', edgecolor='#333')
    ax.bar(x + width/2, t_u, width, label='Upgraded', color='#43A047', edgecolor='#333')
    ax.set_ylabel('Toughness (mJ/mm³)', weight='bold')
    ax.set_title('2. Post-Crack Fracture Energy', weight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 24)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(loc='upper right')

    # Panel 3: ITZ Ca/Si Ratio Drop
    ax = axs[2]
    c_c = [23.50, 24.85]
    c_u = [6.80, 5.65]
    ax.bar(x - width/2, c_c, width, label='Conventional (Weak CH)', color='#8E44AD', hatch='xx', edgecolor='#333')
    ax.bar(x + width/2, c_u, width, label='Upgraded (C-S-H)', color='#00ACC1', edgecolor='#333')
    ax.set_ylabel('ITZ Ca/Si Ratio (SEM-EDS)', weight='bold')
    ax.set_title('3. Microstructural ITZ Densification', weight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(x_labels, weight='bold')
    ax.set_ylim(0, 32)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(loc='upper right')

    plt.tight_layout()
    for ext in ['png', 'svg', 'pdf']:
        fig.savefig(os.path.join(OUTPUT_DIR, f"Figure_4_Poster_Triptych_Summary.{ext}"), bbox_inches='tight', dpi=300)
    plt.close()
    print("[OK] Figure 4: Poster Triptych Summary generated.")

if __name__ == '__main__':
    print("Generating publication-quality research figures...")
    generate_radar_chart()
    generate_grouped_bar_charts()
    generate_enhancement_chart()
    generate_poster_triptych()
    print(f"All figures successfully created in: {OUTPUT_DIR}")
