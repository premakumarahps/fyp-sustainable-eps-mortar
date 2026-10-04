import zipfile
import re
import os

SRC_PPTX = r"d:\1.Antigravity Projects\14_Final_Year_Project\Group 24.pptx"
OUT_PPTX = r"d:\1.Antigravity Projects\14_Final_Year_Project\Group_24_FINAL_PERFECT.pptx"

def direct_xml_fix():
    with zipfile.ZipFile(SRC_PPTX, 'r') as zin:
        xml_bytes = zin.read('ppt/slides/slide1.xml')
        xml_str = xml_bytes.decode('utf-8')
        
        # 1. Fix Abstract
        # Search for pattern with empty parentheses and missing numbers
        abstract_old_pattern = r'Conventional EPS mortar achieves weight reduction.*?slashing embodied carbon intensity by per \.'
        abstract_new = (
            "Conventional EPS mortar achieves 14–24% weight reduction but suffers severe strength loss and "
            "brittle handling failure due to a weak, porous interface (ITZ Ca/Si ≈ 24.85). We engineered a "
            "tripartite upgrade combining surface-coated EPS, 10% pozzolanic Rice Husk Ash (RHA), and 0.5% "
            "polypropylene micro-fibers. The upgraded mortar delivers +53.9% compressive strength recovery "
            "(15.62 MPa at 20% EPS), +71.0% flexural enhancement, and up to +105% toughness leap with zero "
            "density penalty (1734–1969 kg/m³). SEM-EDS confirms a 77.3% ITZ Ca/Si reduction (24.85 → 5.65, "
            "dense C-S-H gel), slashing embodied carbon intensity by 39.6% per MPa."
        )
        
        # In XML, text is inside <a:t>...</a:t>
        # Let's inspect how the paragraph XML is structured
        print(f"Original XML size: {len(xml_str)} chars")
        
        # Replacements mapping for XML snippets:
        # A. Abstract paragraph:
        xml_str = re.sub(
            r'(<a:p>.*?<a:t>)Conventional EPS mortar achieves weight reduction.*?(</a:t>.*?</a:p>)',
            rf'\g<1>{abstract_new}\g<2>',
            xml_str,
            flags=re.DOTALL
        )
        
        # B. Introduction - The Paradox
        xml_str = xml_str.replace("1424% lighter", "14–24% lighter")
        
        # C. Introduction - Microstructural Degradation Mechanisms
        xml_str = xml_str.replace(
            "Interfacial Transition Zone () - a network",
            "Interfacial Transition Zone (ITZ Ca/Si ≈ 24.85) - a network"
        )
        
        # D. Introduction - Research Objectives
        xml_str = xml_str.replace(
            "PVAc-coated EPS,  pozzolanic RHA, and PP fibers",
            "PVAc-coated EPS, 10% pozzolanic RHA, and 0.5% PP fibers"
        )
        xml_str = xml_str.replace(
            "arrest brittleness under .",
            "arrest brittleness under 2000 kg/m³."
        )
        
        # E. Section C - Fiber Optimization
        fiber_c_new = (
            "On the 10% RHA + 20% coated-EPS matrix, 0.5% PP fiber proved optimum, boosting toughness to "
            "18.24 mJ/mm³ (+24%) and flexural capacity to 3.59 MPa. Dosages exceeding 1.0% triggered fiber "
            "balling and void entrapment, inducing a steep degradation plateau (fc dropped to 11.06 MPa)."
        )
        xml_str = re.sub(
            r'(<a:p>.*?<a:t>)On the RHA \+ coated-EPS matrix, PP fiber proved optimum.*?(</a:t>.*?</a:p>)',
            rf'\g<1>{fiber_c_new}\g<2>',
            xml_str,
            flags=re.DOTALL
        )
        
        # F. Table 1 Caption
        xml_str = xml_str.replace(
            "Table 1 : The line graphs showing the steep downward trendline of strength vs. fiber dosage",
            "Table 1 : Comparative Performance Evaluation of Conventional vs. Upgraded EPS Mortar"
        )
        
        # G. Conclusions - Mechanical Recovery
        mech_new = "Optimized ternary mortar (10% RHA + 20% coated EPS + 0.5% PP) achieves 15.62 MPa compressive (+53.9%), 3.59 MPa flexural (+71%), and 18.24 mJ/mm³ toughness at 1969 kg/m³."
        xml_str = re.sub(
            r'(<a:p>.*?<a:t>)Optimized ternary mortar \( RHA \+ coated EPS \+ PP\).*?(</a:t>.*?</a:p>)',
            rf'\g<1>{mech_new}\g<2>',
            xml_str,
            flags=re.DOTALL
        )
        
        # H. Conclusions - Microstructural Proof
        micro_new = "ITZ Ca/Si drops by -77.3% (24.85 → 5.65), confirming dense C-S-H gel bonding."
        xml_str = re.sub(
            r'(<a:p>.*?<a:t>)drops by \(\), confirming dense C-S-H gel bonding\.(</a:t>.*?</a:p>)',
            rf'\g<1>{micro_new}\g<2>',
            xml_str,
            flags=re.DOTALL
        )
        
        # I. Conclusions - Industrial Impact
        ind_new = "Enhances cost efficiency by +33.7% and slashes embodied carbon by 39.6% per MPa using standard precast batching."
        xml_str = re.sub(
            r'(<a:p>.*?<a:t>)Enhances cost efficiency by and slashes embodied carbon by per using standard precast batching\.(</a:t>.*?</a:p>)',
            rf'\g<1>{ind_new}\g<2>',
            xml_str,
            flags=re.DOTALL
        )
        
        # J. Clean broken characters
        xml_str = xml_str.replace("aggregatepaste", "aggregate–paste")
        xml_str = xml_str.replace("RHAcoated-EPS", "RHA–coated-EPS")
        xml_str = xml_str.replace("94269430", "9426–9430")
        
        # Write to new PPTX archive
        with zipfile.ZipFile(OUT_PPTX, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                if item.filename == 'ppt/slides/slide1.xml':
                    zout.writestr(item, xml_str.encode('utf-8'))
                else:
                    zout.writestr(item, zin.read(item.filename))
                    
    print(f"[OK] Created {OUT_PPTX} with all direct XML fixes.")

if __name__ == '__main__':
    direct_xml_fix()
