"""
Final Year Project - Corrected Experimental Data & Regression Models
Department of Materials Science and Engineering | University of Moratuwa
Thesis: Synergistic Effects of Rice Husk Ash and Polypropylene Fiber on the Performance of Modified Expanded Polystyrene Cement Mortar
Authors: H.P.S. Premakumara (210494D), K. Mayoorathan (210381E)
Supervisor: Eng. S.P. Guluwita
"""

# Phase 1: Base Mortar (w/b vs s/b) - Table 22 & Table 24
PHASE_1_DATA = [
    {"id": "S1M1", "type": "Factorial (-1,-1)", "wb": 0.350, "sb": 1.500, "rha": 0, "eps": 0, "fr": 6.470, "fc": 46.000, "theo_rho": 2286, "fresh_rho": 2262, "rho_28d": 2275, "wa": 2.64, "porosity": 6.04, "toughness": 48.438},
    {"id": "S1M2", "type": "Factorial (+1,-1)", "wb": 0.500, "sb": 1.500, "rha": 0, "eps": 0, "fr": 4.894, "fc": 36.500, "theo_rho": 2146, "fresh_rho": 2112, "rho_28d": 2125, "wa": 3.51, "porosity": 7.97, "toughness": 37.940},
    {"id": "S1M3", "type": "Factorial (-1,+1)", "wb": 0.350, "sb": 3.000, "rha": 0, "eps": 0, "fr": 4.941, "fc": 35.660, "theo_rho": 2417, "fresh_rho": 2382, "rho_28d": 2396, "wa": 3.08, "porosity": 7.26, "toughness": 37.150},
    {"id": "S1M4", "type": "Factorial (+1,+1)", "wb": 0.500, "sb": 3.000, "rha": 0, "eps": 0, "fr": 4.121, "fc": 31.340, "theo_rho": 2306, "fresh_rho": 2266, "rho_28d": 2279, "wa": 4.23, "porosity": 9.55, "toughness": 30.150},
    {"id": "S1M5", "type": "Axial (-1,0)",     "wb": 0.350, "sb": 2.250, "rha": 0, "eps": 0, "fr": 5.523, "fc": 39.310, "theo_rho": 2364, "fresh_rho": 2328, "rho_28d": 2342, "wa": 2.80, "porosity": 6.47, "toughness": 42.420},
    {"id": "S1M6", "type": "Axial (+1,0)",     "wb": 0.500, "sb": 2.250, "rha": 0, "eps": 0, "fr": 4.348, "fc": 32.940, "theo_rho": 2239, "fresh_rho": 2201, "rho_28d": 2214, "wa": 3.77, "porosity": 8.61, "toughness": 32.960},
    {"id": "S1M7", "type": "Axial (0,-1)",     "wb": 0.425, "sb": 1.500, "rha": 0, "eps": 0, "fr": 5.484, "fc": 40.250, "theo_rho": 2212, "fresh_rho": 2179, "rho_28d": 2192, "wa": 2.89, "porosity": 6.69, "toughness": 40.825},
    {"id": "S1M8", "type": "Axial (0,+1)",     "wb": 0.425, "sb": 3.000, "rha": 0, "eps": 0, "fr": 4.389, "fc": 32.980, "theo_rho": 2360, "fresh_rho": 2324, "rho_28d": 2338, "wa": 3.35, "porosity": 7.86, "toughness": 32.410},
    {"id": "S1M9", "type": "Center (0,0)",     "wb": 0.425, "sb": 2.250, "rha": 0, "eps": 0, "fr": 4.577, "fc": 34.550, "theo_rho": 2299, "fresh_rho": 2238, "rho_28d": 2251, "wa": 3.15, "porosity": 7.49, "toughness": 36.150},
    {"id": "S1M10","type": "Center (0,0)",     "wb": 0.425, "sb": 2.250, "rha": 0, "eps": 0, "fr": 4.900, "fc": 36.580, "theo_rho": 2299, "fresh_rho": 2279, "rho_28d": 2293, "wa": 2.91, "porosity": 6.92, "toughness": 38.100},
    {"id": "S1M11","type": "Center (0,0)",     "wb": 0.425, "sb": 2.250, "rha": 0, "eps": 0, "fr": 4.752, "fc": 35.620, "theo_rho": 2299, "fresh_rho": 2257, "rho_28d": 2269, "wa": 3.03, "porosity": 7.22, "toughness": 34.200},
]

# Phase 2: Modified Lightweight Mortar (RHA vs Coated EPS) - Table 27 & Table 28
# Locked: w/b = 0.425, s/b = 2.25
PHASE_2_DATA = [
    {"id": "S2M1", "type": "Factorial (-1,-1)", "rha": 0,  "eps": 0,  "fr": 4.743, "fc": 35.580, "theo_rho": 2299, "fresh_rho": 2274, "rho_28d": 2287, "wa": 2.63, "porosity": 6.04, "toughness": 35.477},
    {"id": "S2M2", "type": "Factorial (+1,-1)", "rha": 20, "eps": 0,  "fr": 5.493, "fc": 47.680, "theo_rho": 2257, "fresh_rho": 2220, "rho_28d": 2233, "wa": 3.08, "porosity": 6.72, "toughness": 32.413},
    {"id": "S2M3", "type": "Factorial (-1,+1)", "rha": 0,  "eps": 40, "fr": 1.654, "fc": 4.376,  "theo_rho": 1767, "fresh_rho": 1735, "rho_28d": 1748, "wa": 4.50, "porosity": 8.03, "toughness": 1.866},
    {"id": "S2M4", "type": "Factorial (+1,+1)", "rha": 20, "eps": 40, "fr": 1.698, "fc": 4.290,  "theo_rho": 1735, "fresh_rho": 1706, "rho_28d": 1719, "wa": 4.24, "porosity": 7.85, "toughness": 4.360},
    {"id": "S2M5", "type": "Axial (-1,0)",     "rha": 0,  "eps": 20, "fr": 2.869, "fc": 12.250, "theo_rho": 2033, "fresh_rho": 1997, "rho_28d": 2011, "wa": 3.82, "porosity": 7.65, "toughness": 12.578},
    {"id": "S2M6", "type": "Axial (+1,0)",     "rha": 20, "eps": 20, "fr": 3.189, "fc": 14.980, "theo_rho": 1996, "fresh_rho": 1962, "rho_28d": 1976, "wa": 3.24, "porosity": 6.98, "toughness": 7.440},
    {"id": "S2M7", "type": "Axial (0,-1)",     "rha": 10, "eps": 0,  "fr": 5.506, "fc": 48.930, "theo_rho": 2277, "fresh_rho": 2249, "rho_28d": 2263, "wa": 2.63, "porosity": 5.83, "toughness": 32.945},
    {"id": "S2M8", "type": "Axial (0,+1)",     "rha": 10, "eps": 40, "fr": 1.798, "fc": 5.210,  "theo_rho": 1751, "fresh_rho": 1720, "rho_28d": 1734, "wa": 3.52, "porosity": 6.94, "toughness": 3.844},
    {"id": "S2M9", "type": "Center (0,0)",     "rha": 10, "eps": 20, "fr": 3.293, "fc": 17.960, "theo_rho": 2043, "fresh_rho": 2000, "rho_28d": 2034, "wa": 3.07, "porosity": 5.97, "toughness": 11.791},
    {"id": "S2M10","type": "Center (0,0)",     "rha": 10, "eps": 20, "fr": 3.168, "fc": 16.190, "theo_rho": 2018, "fresh_rho": 1970, "rho_28d": 1970, "wa": 2.96, "porosity": 5.84, "toughness": 11.995},
    {"id": "S2M11","type": "Center (0,0)",     "rha": 10, "eps": 20, "fr": 3.322, "fc": 16.190, "theo_rho": 1981, "fresh_rho": 1970, "rho_28d": 1975, "wa": 3.29, "porosity": 6.55, "toughness": 10.958},
]

# Phase 3: ITZ Chemical & Elemental Diagnostics (SEM-EDS) - Table 30
PHASE_3_DATA = [
    {"sample": "S3M1", "eps": 40, "rha": 0,  "ca_at": 38.27, "si_at": 1.54, "casi_ratio": 24.85, "std_dev": 2.70, "itz_morphology": "Weak, porous, expansive plate-like Portlandite Ca(OH)2 crystals, boundary microcracks"},
    {"sample": "S3M2", "eps": 40, "rha": 20, "ca_at": 21.85, "si_at": 3.87, "casi_ratio": 5.65,  "std_dev": 0.39, "itz_morphology": "Dense, amorphous C-S-H gel network, closed boundary gaps, 77.3% Ca/Si reduction"}
]

# Phase 4: Physical Coating Validation - Table 31
PHASE_4_DATA = [
    {"sample": "S4M1", "eps": 20, "state": "Uncoated", "fc": 10.15, "fr": 2.10},
    {"sample": "S4M2", "eps": 20, "state": "Coated",   "fc": 13.85, "fr": 3.45, "fc_recovery": "+36.45%", "fr_recovery": "+64.29%"},
    {"sample": "S4M3", "eps": 40, "state": "Uncoated", "fc": 4.20,  "fr": 0.95},
    {"sample": "S4M4", "eps": 40, "state": "Coated",   "fc": 7.15,  "fr": 1.85, "fc_recovery": "+70.24%", "fr_recovery": "+94.74%"}
]

# Phase 5: PP Micro-Fiber Toughening & Final Optimization - Table 32
# Base: 10% RHA + 20% Coated EPS, w/b = 0.425, s/b = 2.25
PHASE_5_DATA = [
    {"sample": "S5M1", "fiber": 0.0, "fr": 3.261, "fc": 16.780, "theo_rho": 2014, "fresh_rho": 1980, "rho_28d": 1995, "wa": 3.13, "porosity": 6.15, "toughness": 14.706, "status": "Baseline unreinforced"},
    {"sample": "S5M2", "fiber": 0.5, "fr": 3.585, "fc": 15.620, "theo_rho": 2013, "fresh_rho": 1952, "rho_28d": 1969, "wa": 3.34, "porosity": 6.48, "toughness": 18.240, "status": "GLOBAL OPTIMUM: +10% fr, +24% Toughness, 15.62 MPa fc, 1993 kg/m3 bulk"},
    {"sample": "S5M3", "fiber": 1.0, "fr": 3.998, "fc": 14.140, "theo_rho": 2011, "fresh_rho": 1922, "rho_28d": 1938, "wa": 3.62, "porosity": 6.95, "toughness": 25.415, "status": "Flexural apex, fc begins dropping"},
    {"sample": "S5M4", "fiber": 1.5, "fr": 3.652, "fc": 11.850, "theo_rho": 2009, "fresh_rho": 1902, "rho_28d": 1919, "wa": 3.91, "porosity": 7.42, "toughness": 28.850, "status": "Fiber balling onset: fc drops -24.1%"},
    {"sample": "S5M5", "fiber": 2.0, "fr": 2.888, "fc": 11.060, "theo_rho": 2006, "fresh_rho": 1884, "rho_28d": 1903, "wa": 4.28, "porosity": 7.98, "toughness": 31.540, "status": "Degradation plateau: fr below unreinforced baseline"}
]

# True-Fit Quadratic Regression Models from Thesis
def predict_phase1(wb, sb):
    """Phase 1 Plain Mortar Models (Thesis Section 5.2.3 & 5.2.4)"""
    porosity = 14.07 - 47.29*wb - 0.74*sb + 68.02*(wb**2) + 0.21*(sb**2) + 1.60*(wb*sb)
    fc = 119.42 - 195.94*wb - 24.01*sb + 116.79*(wb**2) + 2.04*(sb**2) + 23.01*(wb*sb)
    fr = 20.48 - 42.84*wb - 3.64*sb + 32.18*(wb**2) + 0.32*(sb**2) + 3.36*(wb*sb)
    toughness = 137.10 - 304.49*wb - 15.23*sb + 246.56*(wb**2) + 0.56*(sb**2) + 15.55*(wb*sb)
    return {"porosity": porosity, "fc": fc, "fr": fr, "toughness": toughness}

def predict_phase2(rha, eps):
    """Phase 2 Modified Lightweight Mortar Models (Thesis Section 5.3.4)"""
    fr = 4.74 + 0.12*rha - 0.11*eps - 0.005*(rha**2) + 0.001*(eps**2) - 0.001*(rha*eps)
    fc = 35.58 + 2.05*rha - 1.25*eps - 0.07*(rha**2) + 0.01*(eps**2) - 0.015*(rha*eps)
    toughness = 35.47 + 0.25*rha - 1.10*eps - 0.02*(rha**2) + 0.006*(eps**2) - 0.004*(rha*eps)
    porosity = 6.33 - 0.176*rha + 0.042*eps + 0.0097*(rha**2) + 0.00011*(eps**2) - 0.00108*(rha*eps)
    return {"fr": fr, "fc": fc, "toughness": toughness, "porosity": porosity}
