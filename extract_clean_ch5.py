import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

# In the thesis, Chapter 5 runs from page 81 to page 117 (PDF pages 98 to 134 roughly).
# Let's inspect where Phase 2, Phase 3, Phase 4, Phase 5 appear in doc.
with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_full_clean.txt", "w", encoding="utf-8") as f:
    for page_idx in range(95, 135):
        f.write(f"\n<<< PAGE {page_idx + 1} >>>\n")
        f.write(doc[page_idx].get_text())

print("Saved clean Chapter 5 to chapter_5_full_clean.txt")
