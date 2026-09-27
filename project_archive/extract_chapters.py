import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

# Extract Chapter 4: Calculations & Mix Design (approx pages 50 to 80)
# Extract Chapter 5: Results & Discussion (approx pages 80 to 118)
# Extract Chapter 6: Conclusions (approx pages 118 to 125)

def save_page_range(start_p, end_p, out_filename):
    with open(out_filename, "w", encoding="utf-8") as f:
        for p in range(start_p - 1, min(end_p, len(doc))):
            f.write(f"\n{'='*40}\n<<< PDF PAGE {p + 1} >>>\n{'='*40}\n")
            f.write(doc[p].get_text())
    print(f"Saved pages {start_p}-{end_p} to {out_filename}")

save_page_range(50, 80, r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_4_calculations.txt")
save_page_range(81, 117, r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_results.txt")
save_page_range(118, 126, r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_6_conclusions.txt")
save_page_range(127, len(doc), r"d:\1.Antigravity Projects\14_Final_Year_Project\appendices.txt")
