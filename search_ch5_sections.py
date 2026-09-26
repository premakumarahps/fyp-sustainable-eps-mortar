with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_full_clean.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Let's search for "Table 27", "Table 30", "Table 31", "Table 32" and the Phase 2 true-fit equations
targets = ["Table 27", "Table 28", "Table 29", "Table 30", "Table 31", "Table 32", "5.3.4", "5.4", "5.5", "5.6"]

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\key_sections_ch5.txt", "w", encoding="utf-8") as out:
    for t in targets:
        pos = 0
        while True:
            idx = text.find(t, pos)
            if idx == -1:
                break
            out.write(f"\n{'='*50}\nMATCH FOR: {t} at char {idx}\n{'='*50}\n")
            out.write(text[idx:idx+2500])
            out.write("\n")
            pos = idx + len(t)

print("Saved key sections to key_sections_ch5.txt")
