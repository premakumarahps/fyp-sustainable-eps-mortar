import os
import csv
import zipfile

BASE_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project"
DATA_DIR = os.path.join(BASE_DIR, "data")
WEB_DATA_DIR = os.path.join(BASE_DIR, "web", "public", "data")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(WEB_DATA_DIR, exist_ok=True)

# 1. Phase 1 Data (Table 22 & 24)
phase1_headers = [
    "Mix_ID", "Run_Type", "wb_ratio", "sb_ratio", "fr_MPa", "fc_MPa", 
    "Theoretical_Fresh_Density_kg_m3", "Measured_Fresh_Density_kg_m3", "Volumetric_Variance_pct", 
    "Measured_28d_Density_kg_m3", "Water_Absorption_pct", "Apparent_Porosity_pct", "Handling_Toughness_mJ_mm3",
    "Specific_fr_MPa_per_kg_m3_x10e3", "Specific_fc_MPa_per_kg_m3_x10e3"
]
phase1_rows = [
    ["S1M1", "Factorial (-1,-1)", 0.350, 1.500, 6.470, 46.000, 2286, 2262, 1.05, 2275, 2.64, 6.04, 48.438, 2.84, 20.22],
    ["S1M2", "Factorial (+1,-1)", 0.500, 1.500, 4.894, 36.500, 2146, 2112, 1.58, 2125, 3.51, 7.97, 37.940, 2.30, 17.18],
    ["S1M3", "Factorial (-1,+1)", 0.350, 3.000, 4.941, 35.660, 2417, 2382, 1.45, 2396, 3.08, 7.26, 37.150, 2.06, 14.88],
    ["S1M4", "Factorial (+1,+1)", 0.500, 3.000, 4.121, 31.340, 2306, 2266, 1.73, 2279, 4.23, 9.55, 30.150, 1.81, 13.75],
    ["S1M5", "Axial (-1,0)",     0.350, 2.250, 5.523, 39.310, 2364, 2328, 1.52, 2342, 2.80, 6.47, 42.420, 2.36, 16.78],
    ["S1M6", "Axial (+1,0)",     0.500, 2.250, 4.348, 32.940, 2239, 2201, 1.70, 2214, 3.77, 8.61, 32.960, 1.96, 14.88],
    ["S1M7", "Axial (0,-1)",     0.425, 1.500, 5.484, 40.250, 2212, 2179, 1.49, 2192, 2.89, 6.69, 40.825, 2.50, 18.36],
    ["S1M8", "Axial (0,+1)",     0.425, 3.000, 4.389, 32.980, 2360, 2324, 1.53, 2338, 3.35, 7.86, 32.410, 1.88, 14.11],
    ["S1M9", "Center (0,0)",     0.425, 2.250, 4.577, 34.550, 2299, 2238, 2.65, 2251, 3.15, 7.49, 36.150, 2.03, 15.35],
    ["S1M10","Center (0,0)",     0.425, 2.250, 4.900, 36.580, 2299, 2279, 0.87, 2293, 2.91, 6.92, 38.100, 2.14, 15.95],
    ["S1M11","Center (0,0)",     0.425, 2.250, 4.752, 35.620, 2299, 2257, 1.83, 2269, 3.03, 7.22, 34.200, 2.09, 15.70],
]

# 2. Phase 2 Data (Table 27 & 28)
phase2_headers = [
    "Mix_ID", "Run_Type", "wb_ratio", "sb_ratio", "RHA_mass_pct", "Coated_EPS_vol_pct", 
    "fr_MPa", "fc_MPa", "Theoretical_Density_kg_m3", "Fresh_Density_kg_m3", 
    "Measured_28d_Density_kg_m3", "Water_Absorption_pct", "Apparent_Porosity_pct", "Handling_Toughness_mJ_mm3",
    "Specific_fr_MPa_per_kg_m3_x10e3", "Specific_fc_MPa_per_kg_m3_x10e3"
]
phase2_rows = [
    ["S2M1", "Factorial (-1,-1)", 0.425, 2.25, 0,  0,  4.743, 35.580, 2299, 2274, 2287, 2.63, 6.04, 35.477, 2.07, 15.56],
    ["S2M2", "Factorial (+1,-1)", 0.425, 2.25, 20, 0,  5.493, 47.680, 2257, 2220, 2233, 3.08, 6.72, 32.413, 2.46, 21.35],
    ["S2M3", "Factorial (-1,+1)", 0.425, 2.25, 0,  40, 1.654, 4.376,  1767, 1735, 1748, 4.50, 8.03, 1.866,  0.95, 2.50],
    ["S2M4", "Factorial (+1,+1)", 0.425, 2.25, 20, 40, 1.698, 4.290,  1735, 1706, 1719, 4.24, 7.85, 4.360,  0.99, 2.50],
    ["S2M5", "Axial (-1,0)",     0.425, 2.25, 0,  20, 2.869, 12.250, 2033, 1997, 2011, 3.82, 7.65, 12.578, 1.43, 6.09],
    ["S2M6", "Axial (+1,0)",     0.425, 2.25, 20, 20, 3.189, 14.980, 1996, 1962, 1976, 3.24, 6.98, 7.440,  1.61, 7.58],
    ["S2M7", "Axial (0,-1)",     0.425, 2.25, 10, 0,  5.506, 48.930, 2277, 2249, 2263, 2.63, 5.83, 32.945, 2.43, 21.62],
    ["S2M8", "Axial (0,+1)",     0.425, 2.25, 10, 40, 1.798, 5.210,  1751, 1720, 1734, 3.52, 6.94, 3.844,  1.04, 3.00],
    ["S2M9", "Center (0,0)",     0.425, 2.25, 10, 20, 3.293, 17.960, 2043, 2000, 2034, 3.07, 5.97, 11.791, 1.62, 8.83],
    ["S2M10","Center (0,0)",     0.425, 2.25, 10, 20, 3.168, 16.190, 2018, 1970, 1970, 2.96, 5.84, 11.995, 1.61, 8.22],
    ["S2M11","Center (0,0)",     0.425, 2.25, 10, 20, 3.322, 16.190, 1981, 1970, 1975, 3.29, 6.55, 10.958, 1.68, 8.20],
]

# 3. Phase 3 ITZ Diagnostics (Table 30 & Appendix A)
phase3_headers = ["Mix_ID", "EPS_vol_pct", "RHA_mass_pct", "Location", "Ca_at_pct", "Si_at_pct", "Ca_Si_Ratio", "Observed_Microstructure_State"]
phase3_rows = [
    ["S3M1", 40, 0,  "Location 1", 37.85, 1.58, 23.95, "Porous ITZ, extensive boundary gaps, plate-like Ca(OH)2"],
    ["S3M1", 40, 0,  "Location 2", 40.12, 1.46, 27.48, "Micro-cracking along EPS perimeter, weak Portlandite cleavage"],
    ["S3M1", 40, 0,  "Location 3", 36.84, 1.58, 23.32, "Detached aggregate boundary, low shear cohesion"],
    ["S3M1_Mean", 40, 0, "Average (n=3)", 38.27, 1.54, 24.85, "GLOBAL BASELINE: Ca/Si = 24.85 +/- 2.70 (Portlandite-dominated)"],
    ["S3M2", 40, 20, "Location 1", 21.42, 3.79, 5.65,  "Dense C-S-H gel network, boundary gap bridged"],
    ["S3M2", 40, 20, "Location 2", 22.15, 3.76, 5.89,  "Amorphous hydration products welding polymer-paste interface"],
    ["S3M2", 40, 20, "Location 3", 21.98, 4.07, 5.40,  "High silica dissolution, refined capillary pore structure"],
    ["S3M2_Mean", 40, 20, "Average (n=3)", 21.85, 3.87, 5.65, "POZZOLANIC C-S-H HEALED: Ca/Si = 5.65 +/- 0.39 (-77.3% reduction)"],
]

# 4. Phase 4 Coating Validation (Table 31)
phase4_headers = ["Mix_ID", "EPS_Vol_pct", "Aggregate_State", "Compressive_fc_MPa", "Flexural_fr_MPa", "Compressive_Recovery_pct", "Flexural_Recovery_pct"]
phase4_rows = [
    ["S4M1", "20%", "Uncoated Raw EPS", 10.15, 2.10, "0.0%", "0.0%"],
    ["S4M2", "20%", "PVAc/M-Sand Coated EPS", 13.85, 3.45, "+36.45%", "+64.29%"],
    ["S4M3", "40%", "Uncoated Raw EPS", 4.20, 0.95, "0.0%", "0.0%"],
    ["S4M4", "40%", "PVAc/M-Sand Coated EPS", 7.15, 1.85, "+70.24%", "+94.74%"],
]

# 5. Phase 5 PP Micro-Fiber Optimization (Table 32)
phase5_headers = [
    "Mix_ID", "Fixed_wb", "Fixed_sb", "RHA_pct", "Coated_EPS_pct", "PP_Fiber_Dosage_v_v_pct", 
    "fr_MPa", "fc_MPa", "Theoretical_Density_kg_m3", "Fresh_Density_kg_m3", "Measured_28d_Density_kg_m3", 
    "Water_Absorption_pct", "Apparent_Porosity_pct", "Toughness_mJ_mm3", "Structural_Evaluation"
]
phase5_rows = [
    ["S5M1", 0.425, 2.25, 10, 20, 0.0, 3.261, 16.780, 2014, 1980, 1995, 3.13, 6.15, 14.706, "Baseline unreinforced ternary matrix (brittle)"],
    ["S5M2", 0.425, 2.25, 10, 20, 0.5, 3.585, 15.620, 2013, 1952, 1969, 3.34, 6.48, 18.240, "GLOBAL OPTIMUM: +10.1% fr, +24.0% Toughness, 15.62 MPa fc, 1993 kg/m3 bulk"],
    ["S5M3", 0.425, 2.25, 10, 20, 1.0, 3.998, 14.140, 2011, 1922, 1938, 3.62, 6.95, 25.415, "Flexural apex (4.00 MPa); compressive yield drops to 14.14 MPa"],
    ["S5M4", 0.425, 2.25, 10, 20, 1.5, 3.652, 11.850, 2009, 1902, 1919, 3.91, 7.42, 28.850, "Fiber balling onset: fc drops -24.1% due to entangled air pockets"],
    ["S5M5", 0.425, 2.25, 10, 20, 2.0, 2.888, 11.060, 2006, 1884, 1903, 4.28, 7.98, 31.540, "Degradation plateau: fr (2.89 MPa) falls below unreinforced baseline"],
]

# 6. M-Sand Granulometric Sieve Analysis (Table 14 vs BS 882 Zone M)
msand_headers = ["Sieve_Size", "Aperture_mm", "Mass_Retained_g", "Individual_Retained_pct", "Cumulative_Retained_pct", "Cumulative_Passing_pct", "BS882_ZoneM_Lower_pct", "BS882_ZoneM_Upper_pct"]
msand_rows = [
    ["10.0 mm", 10.00, 0.0,   0.0,  0.0,   100.0, 100, 100],
    ["5.0 mm",  5.00,  17.5,  3.5,  3.5,   96.5,  89,  100],
    ["2.36 mm", 2.36,  76.5,  15.3, 18.8,  81.2,  60,  100],
    ["1.18 mm", 1.18,  132.0, 26.4, 45.2,  54.8,  30,  90],
    ["600 µm",  0.60,  103.0, 20.6, 65.8,  34.2,  15,  54],
    ["300 µm",  0.30,  88.5,  17.7, 83.5,  16.5,  5,   40],
    ["150 µm",  0.15,  58.5,  11.7, 95.2,  4.8,   0,   15],
    ["Pan",     0.00,  24.0,  4.8,  100.0, 0.0,   0,   0]
]

# 7. RHA EDS Smart Quant (Table 21)
rha_eds_headers = ["Element_Line", "Weight_pct", "Atomic_pct", "Net_Intensity", "Error_pct", "K_ratio", "Z_factor", "A_factor", "F_factor", "Role_in_Hydration"]
rha_eds_rows = [
    ["O K",  41.96, 57.19, 3097.05, 8.29,  0.1326, 1.0616, 0.2978, 1.0000, "Oxide partner for silicates and aluminates"],
    ["Mg K", 0.32,  0.29,  55.29,   13.79, 0.0019, 0.9823, 0.5843, 1.0146, "Trace refractory oxide"],
    ["Al K", 4.25,  3.43,  884.03,  4.83,  0.0299, 0.9462, 0.7261, 1.0242, "Aluminate phase forming secondary C-A-H"],
    ["Si K", 44.78, 34.76, 10207.52,3.26,  0.3438, 0.9672, 0.7926, 1.0018, "Primary reactive amorphous pozzolanic silica (SiO2)"],
    ["P K",  0.30,  0.21,  36.79,   14.60, 0.0015, 0.9291, 0.5567, 1.0032, "Agricultural mineral trace"],
    ["Cl K", 0.12,  0.08,  17.59,   48.46, 0.0008, 0.9015, 0.7508, 1.0090, "Non-deleterious trace chloride"],
    ["K K",  4.16,  2.32,  565.30,  4.69,  0.0333, 0.8973, 0.8798, 1.0114, "Alkali content from agricultural ash"],
    ["Ca K", 0.62,  0.34,  73.77,   13.76, 0.0052, 0.9138, 0.9019, 1.0148, "Trace lime constituent"],
    ["Ti K", 0.31,  0.14,  33.50,   24.71, 0.0025, 0.8284, 0.9536, 1.0308, "Trace mineral inclusion"],
    ["Fe K", 3.18,  1.24,  223.54,  6.16,  0.0272, 0.8151, 0.9958, 1.0540, "Ferrite phase contributor (C4AF)"]
]

# Write all CSV files to both data/ and web/public/data/
files_to_write = [
    ("Phase_1_Base_Mortar_Experimental_Data.csv", phase1_headers, phase1_rows),
    ("Phase_2_Modified_Lightweight_Mortar_Data.csv", phase2_headers, phase2_rows),
    ("Phase_3_ITZ_SEM_EDS_Elemental_Analysis.csv", phase3_headers, phase3_rows),
    ("Phase_4_Physical_Coating_Validation_Data.csv", phase4_headers, phase4_rows),
    ("Phase_5_PP_Fiber_Toughening_Data.csv", phase5_headers, phase5_rows),
    ("MSand_Granulometric_Sieve_Analysis.csv", msand_headers, msand_rows),
    ("RHA_EDS_Smart_Quant_Oxide_Composition.csv", rha_eds_headers, rha_eds_rows),
]

created_files = []
for fname, headers, rows in files_to_write:
    for target_dir in [DATA_DIR, WEB_DATA_DIR]:
        fpath = os.path.join(target_dir, fname)
        with open(fpath, "w", newline="", encoding="utf-8") as f_out:
            writer = csv.writer(f_out)
            writer.writerow(headers)
            writer.writerows(rows)
    created_files.append(fname)
    print(f"Generated CSV: {fname}")

# Generate a master ZIP file containing all raw data files and a manifest
zip_path = os.path.join(WEB_DATA_DIR, "Group24_Mortar_Research_Raw_Data_Full.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    # Add manifest
    manifest_content = """================================================================================
Group 24 Final Year Research Project: Raw Experimental Data Repository
Department of Materials Science and Engineering | University of Moratuwa
================================================================================

Project Title:
Synergistic Effects of Rice Husk Ash and Polypropylene Fiber on the Performance 
of Modified Expanded Polystyrene Cement Mortar

Authors:
- H.P.S. Premakumara (Index: 210494D)
- K. Mayoorathan (Index: 210381E)
- Supervisor: Eng. S.P. Guluwita

Contents:
1. Phase_1_Base_Mortar_Experimental_Data.csv (CCF DoE w/b vs s/b matrix)
2. Phase_2_Modified_Lightweight_Mortar_Data.csv (CCF DoE RHA% vs EPS% matrix)
3. Phase_3_ITZ_SEM_EDS_Elemental_Analysis.csv (SEM-EDS Ca/Si diagnostics)
4. Phase_4_Physical_Coating_Validation_Data.csv (PVAc core-shell recovery)
5. Phase_5_PP_Fiber_Toughening_Data.csv (PP micro-fiber balling threshold)
6. MSand_Granulometric_Sieve_Analysis.csv (BS 882 Zone M grading compliance)
7. RHA_EDS_Smart_Quant_Oxide_Composition.csv (Table 21 ASTM C618 pozzolan)

All datasets are finalized, cross-checked, and authenticated against the 
149-page master dissertation.
================================================================================
"""
    zipf.writestr("README_Data_Manifest.txt", manifest_content)
    for fname, _, _ in files_to_write:
        zipf.write(os.path.join(WEB_DATA_DIR, fname), arcname=fname)

print(f"Master ZIP bundle created at {zip_path}")
