import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\page_101_text.txt", "w", encoding="utf-8") as f:
    f.write(doc[100].get_text("text"))

print("Page 101 text written.")
