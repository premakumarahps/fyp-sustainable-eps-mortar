import zipfile
import xml.etree.ElementTree as ET

PPTX_PATH = r"d:\1.Antigravity Projects\14_Final_Year_Project\Group 24_FINAL_CORRECTED.pptx"

def verify_corrected():
    with zipfile.ZipFile(PPTX_PATH, 'r') as z:
        xml_content = z.read('ppt/slides/slide1.xml')
        tree = ET.fromstring(xml_content)
        
        paragraphs = []
        for p in tree.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}p'):
            p_text = "".join([t.text for t in p.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if t.text])
            if p_text.strip():
                paragraphs.append(p_text.strip())
        
        print("=== VERIFYING FINAL CORRECTED PPTX TEXT ===")
        for i, p in enumerate(paragraphs, 1):
            print(f"[{i:02d}] {p}")

if __name__ == '__main__':
    verify_corrected()
