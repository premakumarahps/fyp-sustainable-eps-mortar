with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_full_clean.txt", "r", encoding="utf-8") as f:
    ch5_text = f.read()

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\verify_p1.txt", "w", encoding="utf-8") as out:
    for t_name in [
        "Table 22 : Phase 1 CCF Mix Matrix",
        "Table 23 : Phase 1 Volumetric Density",
        "Table 24 : Phase 1 Absolute and Specific",
        "Table 25 : Thesis-Grade ANOVA Table for Apparent Porosity",
        "Table 26 : Consolidated Thesis-Grade ANOVA Significance"
    ]:
        idx = ch5_text.find(t_name)
        if idx != -1:
            out.write(f"\n{'='*50}\n{t_name}\n{'='*50}\n")
            out.write(ch5_text[idx:idx+2500])
            out.write("\n")

print("Written to verify_p1.txt")
