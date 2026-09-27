import os
import re

BASE_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project"
FIG_DIR = os.path.join(BASE_DIR, "extracted_figures")

with open(os.path.join(BASE_DIR, "thesis_full_text.txt"), "r", encoding="utf-8") as f:
    text = f.read()

# Let's extract all "Figure X : ..." captions and their surrounding text
figure_captions = re.findall(r"(Figure\s+\d+\s*:[^\n]+(?:\n[^\n]+)?)", text)

with open(os.path.join(BASE_DIR, "figures_manifest.txt"), "w", encoding="utf-8") as out:
    out.write("FIGURE CAPTIONS EXTRACTED FROM THESIS:\n")
    out.write("="*60 + "\n")
    for cap in figure_captions:
        out.write(f"{cap.strip()}\n\n")

print(f"Found {len(figure_captions)} figure captions.")
