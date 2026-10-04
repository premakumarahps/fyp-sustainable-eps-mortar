import os
import zipfile
import xml.etree.ElementTree as ET

PPTX_PATH = r"d:\1.Antigravity Projects\14_Final_Year_Project\Group 24.pptx"

def inspect_pptx_xml():
    print(f"Inspecting PPTX file: {PPTX_PATH}")
    with zipfile.ZipFile(PPTX_PATH, 'r') as z:
        file_list = z.namelist()
        print(f"Total files in PPTX archive: {len(file_list)}")
        
        # Check media images embedded
        media_files = [f for f in file_list if f.startswith('ppt/media/')]
        print(f"Embedded media/images count: {len(media_files)}")
        for m in media_files:
            info = z.getinfo(m)
            print(f"  - {m} ({info.file_size // 1024} KB)")

        # Inspect slides
        slide_files = [f for f in file_list if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
        print(f"\nTotal slides: {len(slide_files)}")
        
        for sf in slide_files:
            print(f"\n--- Content of {sf} ---")
            xml_content = z.read(sf)
            tree = ET.fromstring(xml_content)
            
            # Extract all text elements (<a:t>)
            namespaces = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
            texts = []
            for elem in tree.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t'):
                if elem.text:
                    texts.append(elem.text.strip())
            
            # Print assembled text blocks
            print("Text content extracted:")
            full_text = " ".join([t for t in texts if t])
            print("="*60)
            
            # Group into paragraphs/runs
            paragraphs = []
            for p in tree.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}p'):
                p_text = "".join([t.text for t in p.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if t.text])
                if p_text.strip():
                    paragraphs.append(p_text.strip())
            
            for i, p in enumerate(paragraphs, 1):
                print(f"[{i:02d}] {p}")
            print("="*60)

if __name__ == '__main__':
    inspect_pptx_xml()
