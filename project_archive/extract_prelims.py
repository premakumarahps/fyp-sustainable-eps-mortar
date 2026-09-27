import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

print(f"Total pages: {len(doc)}")
with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\thesis_preliminary.txt", "w", encoding="utf-8") as f:
    for page_idx in range(min(25, len(doc))):
        page = doc[page_idx]
        text = page.get_text()
        header = f"\n{'='*50}\n--- PAGE {page_idx + 1} ---\n{'='*50}\n"
        f.write(header + text)

print("Preliminary pages extracted to thesis_preliminary.txt")

# Let's also inspect Extended abstract.pdf completely
doc_abs = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Extended abstract.pdf")
with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\extended_abstract_text.txt", "w", encoding="utf-8") as f:
    for idx, page in enumerate(doc_abs):
        f.write(f"\n--- PAGE {idx + 1} ---\n" + page.get_text())
print("Extended abstract extracted to extended_abstract_text.txt")

# And poster text
doc_poster = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Poster.pdf")
with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\poster_text.txt", "w", encoding="utf-8") as f:
    for idx, page in enumerate(doc_poster):
        f.write(f"\n--- PAGE {idx + 1} ---\n" + page.get_text())
print("Poster text extracted to poster_text.txt")
