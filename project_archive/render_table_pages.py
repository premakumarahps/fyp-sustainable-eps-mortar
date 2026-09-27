import fitz

doc = fitz.open(r"d:\1.Antigravity Projects\14_Final_Year_Project\docs\Group 24 Thesis.pdf")
page122 = doc[121] # 0-indexed for PDF page 122
pix = page122.get_pixmap(dpi=200)
pix.save(r"d:\1.Antigravity Projects\14_Final_Year_Project\extracted_figures\page_122_table_29.png")
print("Page 122 rendered to page_122_table_29.png")

# Also render page 101, 102 (Table 22)
pix101 = doc[100].get_pixmap(dpi=200)
pix101.save(r"d:\1.Antigravity Projects\14_Final_Year_Project\extracted_figures\page_101_table_22.png")
print("Page 101 rendered to page_101_table_22.png")
