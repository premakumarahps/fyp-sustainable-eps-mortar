import fitz
import re

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

print(f"Total pages in thesis: {len(doc)}")

# Let's extract full text with page indicators to search and verify
with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\thesis_full_text.txt", "w", encoding="utf-8") as f:
    for page_num in range(len(doc)):
        text = doc[page_num].get_text()
        f.write(f"\n<<< PAGE {page_num + 1} >>>\n")
        f.write(text)

print("Full text extracted to thesis_full_text.txt")
