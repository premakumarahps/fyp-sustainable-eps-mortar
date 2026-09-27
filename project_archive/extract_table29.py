with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_full_clean.txt", "r", encoding="utf-8") as f:
    ch5_text = f.read()

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\verify_p2_anova.txt", "w", encoding="utf-8") as out:
    idx = ch5_text.find("Table 29 : Consolidated ANOVA")
    if idx != -1:
        out.write(ch5_text[idx:idx+2000])

print("Written Table 29 to verify_p2_anova.txt")
