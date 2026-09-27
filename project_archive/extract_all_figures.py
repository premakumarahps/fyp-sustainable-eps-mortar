import fitz
import os

BASE_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project"
FIG_DIR = os.path.join(BASE_DIR, "extracted_figures")
os.makedirs(FIG_DIR, exist_ok=True)

# 1. Extract images embedded in Group 24 Thesis.pdf
doc_thesis = fitz.open(os.path.join(BASE_DIR, "docs", "Group 24 Thesis.pdf"))
print(f"Extracting images from Group 24 Thesis ({len(doc_thesis)} pages)...")

extracted_count = 0
for page_idx in range(len(doc_thesis)):
    page = doc_thesis[page_idx]
    image_list = page.get_images(full=True)
    for img_idx, img_info in enumerate(image_list):
        xref = img_info[0]
        base_image = doc_thesis.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        # Only save meaningful images (filter out tiny icons/lines)
        if len(image_bytes) > 10000:  # > 10KB
            out_filename = f"thesis_p{page_idx+1}_img{img_idx+1}_{xref}.{image_ext}"
            out_path = os.path.join(FIG_DIR, out_filename)
            with open(out_path, "wb") as f_out:
                f_out.write(image_bytes)
            extracted_count += 1

print(f"Extracted {extracted_count} images from Thesis.")

# 2. Extract images from Poster.pdf (render whole page at 300 DPI as well as extracting embedded images)
doc_poster = fitz.open(os.path.join(BASE_DIR, "docs", "Poster.pdf"))
poster_page = doc_poster[0]
pix_poster = poster_page.get_pixmap(dpi=300)
poster_render_path = os.path.join(FIG_DIR, "research_poster_full_300dpi.png")
pix_poster.save(poster_render_path)
print(f"Rendered full research poster to {poster_render_path}")

# Extract embedded images from poster
for img_idx, img_info in enumerate(poster_page.get_images(full=True)):
    xref = img_info[0]
    base_image = doc_poster.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    if len(image_bytes) > 10000:
        out_filename = f"poster_img{img_idx+1}_{xref}.{image_ext}"
        out_path = os.path.join(FIG_DIR, out_filename)
        with open(out_path, "wb") as f_out:
            f_out.write(image_bytes)
        print(f"Extracted poster image: {out_filename}")

# 3. Extract images from Extended abstract.pdf
doc_abs = fitz.open(os.path.join(BASE_DIR, "docs", "Extended abstract.pdf"))
for page_idx, page in enumerate(doc_abs):
    for img_idx, img_info in enumerate(page.get_images(full=True)):
        xref = img_info[0]
        base_image = doc_abs.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        if len(image_bytes) > 10000:
            out_filename = f"extended_abs_p{page_idx+1}_img{img_idx+1}.{image_ext}"
            out_path = os.path.join(FIG_DIR, out_filename)
            with open(out_path, "wb") as f_out:
                f_out.write(image_bytes)
            print(f"Extracted extended abstract image: {out_filename}")

# Also render key pages of thesis that contain diagrams / response surface charts / SEM micrographs
key_pages = [16, 17, 19, 21, 22, 24, 29, 30, 31, 35, 37, 46, 73, 75, 83, 86, 88, 89, 92, 93, 97, 99, 100, 103, 106, 107, 110, 112, 115]
# Note: In doc_thesis, 0-indexed page is PDF page - 1
for p in key_pages:
    # let's search if page number matches text or PDF page
    pdf_p = min(p + 17, len(doc_thesis) - 1) # offset for Roman numerals
    # Let's render both exact p and pdf_p at 200 DPI if valid
    page = doc_thesis[pdf_p]
    pix = page.get_pixmap(dpi=200)
    pix.save(os.path.join(FIG_DIR, f"thesis_rendered_page_{pdf_p+1}.png"))

print("Figure extraction complete.")
