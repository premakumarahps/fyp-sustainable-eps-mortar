import re

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_results.txt", "r", encoding="utf-8") as f:
    text = f.read()

out_path = r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_summary.txt"
with open(out_path, "w", encoding="utf-8") as out:
    # Find all tables
    tables = re.findall(r"(Table\s+\d+\s*:[^\n]+)", text)
    out.write("TABLES IN CHAPTER 5:\n")
    for t in tables:
        out.write(f" - {t}\n")

    out.write("\n" + "="*60 + "\n")
    out.write("KEY REGRESSION FORMULAS, EQUATIONS & ANOVA DETAILS:\n")
    out.write("="*60 + "\n")
    
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if any(k in line.lower() for k in ["r2", "r²", "porosity =", "toughness =", "fc =", "fr =", "f_c =", "f_r =", "equation", "anova", "table 22", "table 24", "table 25", "table 26", "table 27", "table 28", "table 29", "table 30", "table 31", "table 32"]):
            context = "\n".join(lines[max(0, i-2):min(len(lines), i+8)])
            out.write(f"\n[Line {i+1}]:\n{context}\n{'-'*40}\n")

print(f"Summary written to {out_path}")
