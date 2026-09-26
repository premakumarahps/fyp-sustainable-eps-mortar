import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")

for p_num in [100, 101, 121]: # PDF pages 101, 102, 122
    page = doc[p_num]
    images = page.get_images()
    print(f"PDF Page {p_num + 1} has {len(images)} images: {images}")
