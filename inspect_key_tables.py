import re

with open(r"d:\1.Antigravity Projects\14_Final_Year_Project\thesis_full_text.txt", "r", encoding="utf-8") as f:
    content = f.read()

def search_section(title, start_pattern, end_pattern):
    print(f"\n==================== {title} ====================")
    m_start = re.search(start_pattern, content, re.IGNORECASE)
    if not m_start:
        print(f"Start pattern '{start_pattern}' not found")
        return
    start_pos = m_start.start()
    m_end = re.search(end_pattern, content[start_pos:], re.IGNORECASE)
    if not m_end:
        print(f"End pattern '{end_pattern}' not found, showing next 3000 chars:")
        print(content[start_pos:start_pos+3000])
    else:
        end_pos = start_pos + m_end.start()
        print(content[start_pos:end_pos])

# Search for Table 22
search_section("TABLE 22: Phase 1 CCF Mix Matrix and Consolidated Experimental Results", r"Table 22\s*:", r"Table 23\s*:")

# Search for Table 27
search_section("TABLE 27: Phase 2 CCF Mix Matrix and Consolidated Experimental Results", r"Table 27\s*:", r"Table 28\s*:")

# Search for Table 30
search_section("TABLE 30: Comparative EDS Elemental Analysis and ITZ Ca/Si Ratios", r"Table 30\s*:", r"5\.5\s+Mechanical Translation")

# Search for Table 31
search_section("TABLE 31: Phase 4 Physical Coating Validation", r"Table 31\s*:", r"Table 32\s*:")

# Search for Table 32
search_section("TABLE 32: Phase 5 Mechanical Toughness and Micro-Fiber Optimization", r"Table 32\s*:", r"6\.\s+CONCLUSION")
