import matplotlib.pyplot as plt
import numpy as np

# Phase 2 Raw data
# EPS Volume Fraction (v) from 0.0 to 0.40
# RHA Mass Fraction (r) from 0.0 to 0.20
eps_all = [0.0, 0.40, 0.0, 0.40, 0.0, 0.40, 0.20, 0.20, 0.20]
rha_all = [0.0, 0.0, 0.20, 0.20, 0.10, 0.10, 0.0, 0.20, 0.10]

# Separate by design type based on indices
# Factorial points (corners): indices 0-3
eps_factorial = [eps_all[i] for i in range(4)]
rha_factorial = [rha_all[i] for i in range(4)]
labels_factorial = ['(-1, -1)', '(+1, -1)', '(-1, +1)', '(+1, +1)']

# Axial points (faces): indices 4-7
eps_axial = [eps_all[i] for i in range(4, 8)]
rha_axial = [rha_all[i] for i in range(4, 8)]
labels_axial = ['(-1, 0)', '(+1, 0)', '(0, -1)', '(0, +1)']

# Center points (replicates): index 8
eps_center = [eps_all[8]]
rha_center = [rha_all[8]]
labels_center = ['(0, 0)']

# Create figure with professional styling
fig, ax = plt.subplots(figsize=(10, 9))

# Draw design space background grid
ax.axvline(x=0.0, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axvline(x=0.20, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axvline(x=0.40, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axhline(y=0.0, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axhline(y=0.10, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)
ax.axhline(y=0.20, color='#cccccc', linestyle='--', linewidth=0.8, alpha=0.6, zorder=1)

# Plot factorial points (corners)
ax.scatter(eps_factorial, rha_factorial, s=120, c='#1f77b4', marker='s', 
           edgecolors='#0d3b66', linewidth=2, label='Factorial Points (Corners)', zorder=5, alpha=0.85)

# Plot axial points (faces)
ax.scatter(eps_axial, rha_axial, s=150, c='#2ca02c', marker='^', 
           edgecolors='#1a6b1a', linewidth=2, label='Axial Points (Faces)', zorder=5, alpha=0.85)

# Plot center points (replicates) - larger to emphasize
ax.scatter(eps_center, rha_center, s=180, c='#d62728', marker='D', 
           edgecolors='#8b1a1a', linewidth=2.5, label='Center Points (Replicates)', zorder=6, alpha=0.9)

# Annotate factorial points
for i, (x, y) in enumerate(zip(eps_factorial, rha_factorial)):
    ax.annotate(f'M{i+1}\n{labels_factorial[i]}', 
                xy=(x, y), xytext=(15, -18) if y > 0 else (15, 18), textcoords='offset points',
                fontsize=11, ha='left', va='top' if y > 0 else 'bottom',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#1f77b4', alpha=0.1, edgecolor='none'))

# Annotate axial points
for i, (x, y) in enumerate(zip(eps_axial, rha_axial)):
    # Adjust annotation positions to avoid overlap with bottom axis
    if x == 0.20 and y == 0.0:
        xytext_offset = (15, 18)
        va_align = 'bottom'
    else:
        xytext_offset = (15, 12)
        va_align = 'top'
        
    ax.annotate(f'M{i+5}\n{labels_axial[i]}', 
                xy=(x, y), xytext=xytext_offset, textcoords='offset points',
                fontsize=11, ha='left', va=va_align,
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#2ca02c', alpha=0.1, edgecolor='none'))

# Annotate center points
ax.annotate(f'M9–M11\n{labels_center[0]}\n(replicates)', 
            xy=(eps_center[0], rha_center[0]), xytext=(25, -25), textcoords='offset points',
            fontsize=11, ha='left', va='top', weight='bold',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#d62728', alpha=0.15, edgecolor='#8b1a1a', linewidth=1.5),
            arrowprops=dict(arrowstyle='->', color='#d62728', lw=1.5))

# Formatting
ax.set_xlabel('Volumetric EPS Replacement Fraction ($v$)', fontsize=12, weight='semibold', labelpad=12)
ax.set_ylabel('RHA Mass Replacement Fraction ($r$)', fontsize=12, weight='semibold', labelpad=12)

# Set axis limits adding some padding so labels fit nicely
ax.set_xlim(-0.05, 0.48)
ax.set_ylim(-0.03, 0.24)

# Set ticks exactly at the levels
ax.set_xticks([0.0, 0.20, 0.40])
ax.set_yticks([0.0, 0.10, 0.20])

# Improve grid appearance
ax.grid(True, alpha=0.15, linestyle='-', linewidth=0.5, color='gray')
ax.set_axisbelow(True)

# Professional legend
ax.legend(loc='upper right', framealpha=0.95, fontsize=11, 
          edgecolor='#333333', fancybox=True, shadow=True)

# Spine styling
for spine in ax.spines.values():
    spine.set_edgecolor('#333333')
    spine.set_linewidth(1.2)

# Tick styling
ax.tick_params(axis='both', which='major', labelsize=10, length=6, width=1)

plt.tight_layout()

# Save with high resolution
plt.savefig('figure_phase2_ccd_design.png', dpi=300, bbox_inches='tight', facecolor='white')
print("✓ Figure saved as 'figure_phase2_ccd_design.png'")
