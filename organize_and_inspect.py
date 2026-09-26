import os
import shutil
import fitz

BASE_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project"
DOCS_DIR = os.path.join(BASE_DIR, "docs")
DATA_DIR = os.path.join(BASE_DIR, "data")
SCRIPTS_DIR = os.path.join(BASE_DIR, "scripts")
FIGURES_DIR = os.path.join(BASE_DIR, "figures")

os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(SCRIPTS_DIR, exist_ok=True)
os.makedirs(FIGURES_DIR, exist_ok=True)

# Copy PDFs to docs/
for pdf_file in ["Group 24 Thesis.pdf", "Extended abstract.pdf", "Poster.pdf"]:
    src = os.path.join(BASE_DIR, pdf_file)
    if os.path.exists(src):
        dst = os.path.join(DOCS_DIR, pdf_file)
        shutil.copy2(src, dst)
        print(f"Copied {pdf_file} to docs/")

# Copy scripts to scripts/
for py_file in ["contour_plotter.py", "mortar plottor.py", "plot CCF_design phase 1.py", "plot CCF_design phase 2.py"]:
    src = os.path.join(BASE_DIR, py_file)
    if os.path.exists(src):
        dst = os.path.join(SCRIPTS_DIR, py_file)
        shutil.copy2(src, dst)
        print(f"Copied {py_file} to scripts/")

# Check and copy from Mortar_Model_Analysis
mortar_data = r"d:\1.Antigravity Projects\Mortar_Model_Analysis\data"
if os.path.exists(mortar_data):
    for f in os.listdir(mortar_data):
        if f.endswith(".csv"):
            shutil.copy2(os.path.join(mortar_data, f), os.path.join(DATA_DIR, f))
            print(f"Copied {f} from Mortar_Model_Analysis to data/")

mortar_src = r"d:\1.Antigravity Projects\Mortar_Model_Analysis\src"
if os.path.exists(mortar_src):
    for f in os.listdir(mortar_src):
        if f.endswith(".py"):
            shutil.copy2(os.path.join(mortar_src, f), os.path.join(SCRIPTS_DIR, f))
            print(f"Copied {f} from Mortar_Model_Analysis/src to scripts/")

print("\n--- Inspecting PDFs ---")
for doc_name in ["Group 24 Thesis.pdf", "Extended abstract.pdf", "Poster.pdf"]:
    path = os.path.join(DOCS_DIR, doc_name)
    if os.path.exists(path):
        doc = fitz.open(path)
        print(f"\nDocument: {doc_name}")
        print(f"Page count: {len(doc)}")
        print(f"Metadata: {doc.metadata}")
        toc = doc.get_toc()
        if toc:
            print(f"TOC entries: {len(toc)}")
            for item in toc[:25]:
                print(f"  Level {item[0]}: {item[1]} (p. {item[2]})")
            if len(toc) > 25:
                print(f"  ... and {len(toc) - 25} more items")
        else:
            print("No embedded TOC found.")
