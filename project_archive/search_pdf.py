import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

print("Searching in Group 24 Thesis.pdf...")
keywords = ["24.85", "5.65", "Table 30", "Table 31", "Table 32", "Phase 3", "Phase 4", "Phase 5", "PP Fiber", "15.62", "3.59", "18.24", "1993", "S3M1", "S3M2"]

results = {k: [] for k in keywords}

for page_idx, page in enumerate(doc):
    text = page.get_text()
    for kw in keywords:
        if kw.lower() in text.lower():
            results[kw].append(page_idx + 1)

for kw, pages in results.items():
    print(f"Keyword '{kw}': found on pages {pages[:15]} (total {len(pages)} pages)")
