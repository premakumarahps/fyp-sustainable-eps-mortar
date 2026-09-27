import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\thesis_pages_115_to_end.txt", "w", encoding="utf-8") as f:
    for p in range(114, len(doc)):
        f.write(f"\n{'='*50}\n<<< PDF PAGE {p + 1} >>>\n{'='*50}\n")
        f.write(doc[p].get_text())

print(f"Dumped PDF pages 115 to {len(doc)} to thesis_pages_115_to_end.txt")
