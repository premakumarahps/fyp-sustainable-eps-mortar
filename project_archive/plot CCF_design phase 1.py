import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle

# Raw data
sc_all = [1.5, 1.5, 3.0, 3.0, 2.25, 2.25, 1.5, 3.0, 2.25]
wc_all = [0.35, 0.50, 0.35, 0.50, 0.35, 0.50, 0.425, 0.425, 0.425]

# Separate by design type based on indices
# Factorial points (corners): indices 0-3
sc_factorial = [sc_all[i] for i in range(4)]
wc_factorial = [wc_all[i] for i in range(4)]
labels_factorial = ['(-1, -1)', '(+1, -1)', '(-1, +1)', '(+1, +1)']

# Axial points (faces): indices 4-7
sc_axial = [sc_all[i] for i in range(4, 8)]
wc_axial = [wc_all[i] for i in range(4, 8)]
labels_axial = ['(-1, 0)', '(+1, 0)', '(0, -1)', '(0, +1)']

# Center points (replicates): index 8
sc_center = [sc_all[8]]
wc_center = [wc_all[8]]
labels_center = ['(0, 0)']

# Create figure with professional styling
fig, ax = plt.subplots(figsize=(10, 9))

# Draw design space background grid
ax.axvline(x=1.5, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axvline(x=2.25, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axvline(x=3.0, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axhline(y=0.35, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axhline(y=0.425, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axhline(y=0.50, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)

# Plot factorial points (corners)
ax.scatter(sc_factorial, wc_factorial, s=50, c='#1f77b4', marker='s', 
           edgecolors='#0d3b66', linewidth=2, label='Factorial Points (Corners)', zorder=5, alpha=0.85)

# Plot axial points (faces)
ax.scatter(sc_axial, wc_axial, s=50, c='#2ca02c', marker='^', 
           edgecolors='#1a6b1a', linewidth=2, label='Axial Points (Faces)', zorder=5, alpha=0.85)

# Plot center points (replicates) - larger to emphasize
ax.scatter(sc_center, wc_center, s=60, c='#d62728', marker='D', 
           edgecolors='#8b1a1a', linewidth=2.5, label='Center Points (Replicates)', zorder=6, alpha=0.9)

# Annotate factorial points
for i, (x, y) in enumerate(zip(sc_factorial, wc_factorial)):
    ax.annotate(f'M{i+1}\n{labels_factorial[i]}', 
                xy=(x, y), xytext=(15, -18), textcoords='offset points',
                fontsize=11, ha='left', va='top',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#1f77b4', alpha=0.1, edgecolor='none'))

# Annotate axial points
for i, (x, y) in enumerate(zip(sc_axial, wc_axial)):
    ax.annotate(f'M{i+5}\n{labels_axial[i]}', 
                xy=(x, y), xytext=(15, 12), textcoords='offset points',
                fontsize=11, ha='left', va='top',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#2ca02c', alpha=0.1, edgecolor='none'))

# Annotate center points
ax.annotate(f'M9–M11\n{labels_center[0]}\n(replicates)', 
            xy=(sc_center[0], wc_center[0]), xytext=(25, -25), textcoords='offset points',
            fontsize=11, ha='left', va='top', weight='bold',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#d62728', alpha=0.15, edgecolor='#8b1a1a', linewidth=1.5),
            arrowprops=dict(arrowstyle='->', color='#d62728', lw=1.5))

# Formatting
ax.set_xlabel('Sand-to-Cement Ratio (s/c)', fontsize=11, weight='semibold', labelpad=12)
ax.set_ylabel('Water-to-Cement Ratio (w/c)', fontsize=11, weight='semibold', labelpad=12)

# Set axis limits
ax.set_xlim(1.25, 3.45)
ax.set_ylim(0.32, 0.54)

# Set ticks
ax.set_xticks([1.5, 2.25, 3.0])
ax.set_yticks([0.35, 0.425, 0.50])

# Improve grid appearance
ax.grid(True, alpha=0.15, linestyle='-', linewidth=0.5, color='gray')
ax.set_axisbelow(True)

# Professional legend
ax.legend(loc='upper left', framealpha=0.95, fontsize=11, 
          edgecolor='#333333', fancybox=True, shadow=True)

# Spine styling
for spine in ax.spines.values():
    spine.set_edgecolor('#333333')
    spine.set_linewidth(1.2)

# Tick styling
ax.tick_params(axis='both', which='major', labelsize=10, length=6, width=1)

# Title (optional - remove if not needed in thesis)
# ax.set_title('Central Composite Design: Concrete Mix Optimization\nDesign Space Visualization', 
#              fontsize=14, weight='bold', pad=15)

plt.tight_layout()

# Save with high resolution
plt.savefig('figure_ccd_design_professional.png', dpi=300, bbox_inches='tight', facecolor='white')
print("✓ Figure saved as 'figure_ccd_design_professional.png'")

plt.show()
