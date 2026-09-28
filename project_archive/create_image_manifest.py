import os
import glob
import json
from PIL import Image

raw_dir = r"d:\1.Antigravity Projects\14_Final_Year_Project\project_archive\laboratory_photos\raw"
files = sorted([os.path.basename(f) for f in glob.glob(os.path.join(raw_dir, "*"))])

print(f"Total files: {len(files)}")
with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\project_archive\raw_files_list.txt", "w") as out:
    for idx, f in enumerate(files):
        out.write(f"{idx+1:02d}: {f}\n")
print("Saved raw_files_list.txt")
