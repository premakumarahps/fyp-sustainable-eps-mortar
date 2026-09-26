import os
import shutil

BASE_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project"
WEB_DIR = os.path.join(BASE_DIR, "web")
PUBLIC_DIR = os.path.join(WEB_DIR, "public")
PUB_DOCS = os.path.join(PUBLIC_DIR, "docs")
PUB_FIGS = os.path.join(PUBLIC_DIR, "figures")

os.makedirs(PUB_DOCS, exist_ok=True)
os.makedirs(PUB_FIGS, exist_ok=True)

# 1. Copy Documents
doc_mapping = {
    "Group 24 Thesis.pdf": "Group_24_Thesis.pdf",
    "Extended abstract.pdf": "Extended_Abstract.pdf",
    "Poster.pdf": "Research_Poster.pdf"
}

for src_name, dst_name in doc_mapping.items():
    src = os.path.join(BASE_DIR, "docs", src_name)
    if os.path.exists(src):
        dst = os.path.join(PUB_DOCS, dst_name)
        shutil.copy2(src, dst)
        print(f"Staged doc: {dst_name}")

# 2. Copy Extracted Figures
extracted_dir = os.path.join(BASE_DIR, "extracted_figures")
if os.path.exists(extracted_dir):
    for f in os.listdir(extracted_dir):
        src = os.path.join(extracted_dir, f)
        dst = os.path.join(PUB_FIGS, f)
        shutil.copy2(src, dst)
    print(f"Staged all figures to {PUB_FIGS}")

print("Assets staging complete.")
