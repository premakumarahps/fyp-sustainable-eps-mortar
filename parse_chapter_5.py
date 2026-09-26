import re

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\chapter_5_results.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Let's find all occurrences of "Table "
tables = re.findall(r"(Table\s+\d+\s*:[^\n]+)", text)
print("Tables found in Chapter 5:")
for t in tables:
    print(" -", t)

# Let's also look for regression equations / formulas in chapter 5
print("\n--- Searching for regression formulas / equations in Chapter 5 ---")
for line in text.splitlines():
    if any(k in line.lower() for k in ["r2", "r²", "porosity =", "toughness =", "fc =", "fr =", "f_c =", "f_r =", "equation", "anova"]):
        if len(line.strip()) < 120:
            print("  ", line.strip())
