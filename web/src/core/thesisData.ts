export interface AuthorInfo {
  name: string;
  index: string;
  role: string;
  department: string;
  university: string;
  email: string;
}

export const PROJECT_AUTHORS: AuthorInfo[] = [
  {
    name: "H.P.S. Premakumara",
    index: "210494D",
    role: "Lead Student Investigator",
    department: "Department of Materials Science and Engineering",
    university: "University of Moratuwa, Sri Lanka",
    email: "premakumarahpsandun@gmail.com"
  },
  {
    name: "K. Mayoorathan",
    index: "210381E",
    role: "Co-Student Investigator",
    department: "Department of Materials Science and Engineering",
    university: "University of Moratuwa, Sri Lanka",
    email: "mayoo12355@gmail.com"
  },
  {
    name: "Eng. S.P. Guluwita",
    index: "Faculty Supervisor",
    role: "Principal Research Supervisor",
    department: "Department of Materials Science and Engineering",
    university: "University of Moratuwa, Sri Lanka",
    email: "sudagulu@gmail.com"
  }
];

export const PROJECT_METADATA = {
  title: "Synergistic Effects of Rice Husk Ash and Polypropylene Fiber on the Performance of Modified Expanded Polystyrene Cement Mortar",
  shortTitle: "Synergistic Modified EPS Lightweight Mortar",
  degree: "Bachelor of Science in Engineering (Honours) in Materials Science & Engineering",
  institution: "University of Moratuwa, Sri Lanka",
  faculty: "Faculty of Engineering",
  department: "Department of Materials Science and Engineering",
  date: "July 2026",
  group: "Group 24",
  keyFindings: {
    density: 1993, // kg/m3 bulk hardened density (13% dead-weight reduction)
    fc: 15.62, // MPa 28-day compressive strength
    fr: 3.59, // MPa 28-day flexural strength (+10.1% increase)
    toughness: 18.24, // mJ/mm3 (+24.0% handling toughness)
    apparentPorosity: 5.79, // % (lower than plain control 6.04%)
    casiRatioDrop: 77.26, // % reduction in Ca/Si at ITZ (from 24.85 to 5.65)
    coatingRecoveryFc: 70.24, // % recovery in compressive strength at 40% EPS
    coatingRecoveryFr: 94.74, // % recovery in flexural strength at 40% EPS
    rhaOptimum: 10, // % mass replacement of cement
    epsOptimum: 20, // % volume replacement of sand
    ppFiberOptimum: 0.5 // % v/v dosage of micro-fibers
  }
};

export interface MaterialSpec {
  name: string;
  source: string;
  standard: string;
  sg: number; // Specific gravity
  description: string;
  keyProperties: Record<string, string | number>;
  imagePath: string;
}

export const RAW_MATERIALS: Record<string, MaterialSpec> = {
  opc: {
    name: "Ordinary Portland Cement (OPC)",
    source: "Tokyo Super Cement (Sri Lanka)",
    standard: "SLS 107 / EN 197-1 CEM I 42.5N",
    sg: 3.15,
    description: "High-grade hydraulic binder providing primary clinker hydration phases (alite C3S and belite C2S) for early and late-age C-S-H matrix development.",
    keyProperties: {
      "Blaine Fineness": "340 m²/kg",
      "Standard Consistency": "28.5%",
      "Initial Setting Time": "135 mins",
      "Final Setting Time": "240 mins",
      "28-Day Compressive Strength": "52.4 MPa",
      "Loss on Ignition (LOI)": "1.8%"
    },
    imagePath: "/figures/thesis_rendered_page_34.png"
  },
  msand: {
    name: "Manufactured Sand (M-Sand)",
    source: "Local Metamorphic Rock Quarry (Sri Lanka)",
    standard: "BS 882 (Zone M Structural Envelope)",
    sg: 2.65,
    description: "Crushed metamorphic fine aggregate with angular geometry, providing higher inter-particle friction and dimensional stability compared to river sand.",
    keyProperties: {
      "Fineness Modulus (FM)": 2.76,
      "Water Absorption (WA)": "1.20%",
      "Moisture Content": "0.35%",
      "Loose Bulk Density": "1480 kg/m³",
      "Compacted Bulk Density": "1620 kg/m³",
      "Silt Content (<75 µm)": "4.2%"
    },
    imagePath: "/figures/poster_img1_11.jpeg"
  },
  rha: {
    name: "Processed Rice Husk Ash (RHA)",
    source: "Local Agro-Paddy Mills (Sri Lanka)",
    standard: "ASTM C618 Class N Pozzolan",
    sg: 2.12,
    description: "Agricultural waste by-product thermally incinerated at 600-700°C and ball-milled for 90 mins to achieve reactive amorphous micro-silica.",
    keyProperties: {
      "Amorphous Silica (SiO₂)": "88.6 wt%",
      "Active Pozzolanic Index": "93.8% (ASTM C618 > 70%)",
      "Mean Particle Size (d50)": "< 15 µm",
      "Specific Surface Area (BET)": "24.5 m²/g",
      "Loss on Ignition (LOI)": "3.8%",
      "Milling Time": "90 mins (50 RPM)"
    },
    imagePath: "/figures/poster_img16_53.jpeg"
  },
  eps: {
    name: "Core-Shell Coated EPS Beads",
    source: "Modified Commercial Expanded Polystyrene",
    standard: "ASTM C578 Lightweight Particulate",
    sg: 0.150, // Coated EPS specific gravity (vs 0.015 raw)
    description: "Pre-treated polymer beads encapsulated within a Polyvinyl Acetate (PVAc) film encrusted with fine M-sand (<300 µm), increasing SG by 1000% to neutralize buoyancy.",
    keyProperties: {
      "Raw EPS Density": "14 - 16 kg/m³",
      "Coated EPS Specific Gravity": "0.150 (Raw: 0.015)",
      "Particle Diameter": "2.0 - 4.0 mm",
      "Closed-Cell Air Content": "> 98% by volume",
      "Bonding Agent": "PVAc Emulsion (48% solids)",
      "Segregation Resistance": "100% (No flotation during 50Hz vibration)"
    },
    imagePath: "/figures/poster_img2_12.jpeg"
  },
  ppFiber: {
    name: "Polypropylene (PP) Micro-Fibers",
    source: "Synthetic Monofilament Reinforcement",
    standard: "ASTM C1116 Type III Synthetic",
    sg: 0.91,
    description: "Short monofilament fibers engineered to distribute homogeneously in the matrix, arresting advancing micro-cracks and providing post-cracking energy absorption.",
    keyProperties: {
      "Fiber Length": "6.0 mm",
      "Filament Diameter": "20.0 µm",
      "Aspect Ratio (L/d)": "300",
      "Tensile Strength": "420 MPa",
      "Young's Modulus": "3.8 GPa",
      "Melting Point": "165 °C",
      "Alkali Resistance": "100% chemically inert"
    },
    imagePath: "/figures/poster_img17_54.jpeg"
  }
};

// Phase 1: Base Mortar (w/b vs s/b) - Table 22 & Table 24
export interface Phase1Run {
  id: string;
  type: string;
  wb: number;
  sb: number;
  rha: number;
  eps: number;
  fr: number;
  fc: number;
  theoRho: number;
  freshRho: number;
  rho28d: number;
  wa: number;
  porosity: number;
  toughness: number;
  specificFr: number;
  specificFc: number;
}

export const PHASE_1_DATA: Phase1Run[] = [
  { id: "S1M1", type: "Factorial (-1,-1)", wb: 0.350, sb: 1.500, rha: 0, eps: 0, fr: 6.470, fc: 46.000, theoRho: 2286, freshRho: 2262, rho28d: 2275, wa: 2.64, porosity: 6.04, toughness: 48.438, specificFr: 2.84, specificFc: 20.22 },
  { id: "S1M2", type: "Factorial (+1,-1)", wb: 0.500, sb: 1.500, rha: 0, eps: 0, fr: 4.894, fc: 36.500, theoRho: 2146, freshRho: 2112, rho28d: 2125, wa: 3.51, porosity: 7.97, toughness: 37.940, specificFr: 2.30, specificFc: 17.18 },
  { id: "S1M3", type: "Factorial (-1,+1)", wb: 0.350, sb: 3.000, rha: 0, eps: 0, fr: 4.941, fc: 35.660, theoRho: 2417, freshRho: 2382, rho28d: 2396, wa: 3.08, porosity: 7.26, toughness: 37.150, specificFr: 2.06, specificFc: 14.88 },
  { id: "S1M4", type: "Factorial (+1,+1)", wb: 0.500, sb: 3.000, rha: 0, eps: 0, fr: 4.121, fc: 31.340, theoRho: 2306, freshRho: 2266, rho28d: 2279, wa: 4.23, porosity: 9.55, toughness: 30.150, specificFr: 1.81, specificFc: 13.75 },
  { id: "S1M5", type: "Axial (-1,0)",     wb: 0.350, sb: 2.250, rha: 0, eps: 0, fr: 5.523, fc: 39.310, theoRho: 2364, freshRho: 2328, rho28d: 2342, wa: 2.80, porosity: 6.47, toughness: 42.420, specificFr: 2.36, specificFc: 16.78 },
  { id: "S1M6", type: "Axial (+1,0)",     wb: 0.500, sb: 2.250, rha: 0, eps: 0, fr: 4.348, fc: 32.940, theoRho: 2239, freshRho: 2201, rho28d: 2214, wa: 3.77, porosity: 8.61, toughness: 32.960, specificFr: 1.96, specificFc: 14.88 },
  { id: "S1M7", type: "Axial (0,-1)",     wb: 0.425, sb: 1.500, rha: 0, eps: 0, fr: 5.484, fc: 40.250, theoRho: 2212, freshRho: 2179, rho28d: 2192, wa: 2.89, porosity: 6.69, toughness: 40.825, specificFr: 2.50, specificFc: 18.36 },
  { id: "S1M8", type: "Axial (0,+1)",     wb: 0.425, sb: 3.000, rha: 0, eps: 0, fr: 4.389, fc: 32.980, theoRho: 2360, freshRho: 2324, rho28d: 2338, wa: 3.35, porosity: 7.86, toughness: 32.410, specificFr: 1.88, specificFc: 14.11 },
  { id: "S1M9", type: "Center (0,0)",     wb: 0.425, sb: 2.250, rha: 0, eps: 0, fr: 4.577, fc: 34.550, theoRho: 2299, freshRho: 2238, rho28d: 2251, wa: 3.15, porosity: 7.49, toughness: 36.150, specificFr: 2.03, specificFc: 15.35 },
  { id: "S1M10",type: "Center (0,0)",     wb: 0.425, sb: 2.250, rha: 0, eps: 0, fr: 4.900, fc: 36.580, theoRho: 2299, freshRho: 2279, rho28d: 2293, wa: 2.91, porosity: 6.92, toughness: 38.100, specificFr: 2.14, specificFc: 15.95 },
  { id: "S1M11",type: "Center (0,0)",     wb: 0.425, sb: 2.250, rha: 0, eps: 0, fr: 4.752, fc: 35.620, theoRho: 2299, freshRho: 2257, rho28d: 2269, wa: 3.03, porosity: 7.22, toughness: 34.200, specificFr: 2.09, specificFc: 15.70 },
];

// Phase 2: Modified Lightweight Mortar (RHA vs Coated EPS) - Table 27 & Table 28
export interface Phase2Run {
  id: string;
  type: string;
  wb: number;
  sb: number;
  rha: number;
  eps: number;
  fr: number;
  fc: number;
  theoRho: number;
  freshRho: number;
  rho28d: number;
  wa: number;
  porosity: number;
  toughness: number;
  specificFr: number;
  specificFc: number;
}

export const PHASE_2_DATA: Phase2Run[] = [
  { id: "S2M1", type: "Factorial (-1,-1)", wb: 0.425, sb: 2.25, rha: 0,  eps: 0,  fr: 4.743, fc: 35.580, theoRho: 2299, freshRho: 2274, rho28d: 2287, wa: 2.63, porosity: 6.04, toughness: 35.477, specificFr: 2.07, specificFc: 15.56 },
  { id: "S2M2", type: "Factorial (+1,-1)", wb: 0.425, sb: 2.25, rha: 20, eps: 0,  fr: 5.493, fc: 47.680, theoRho: 2257, freshRho: 2220, rho28d: 2233, wa: 3.08, porosity: 6.72, toughness: 32.413, specificFr: 2.46, specificFc: 21.35 },
  { id: "S2M3", type: "Factorial (-1,+1)", wb: 0.425, sb: 2.25, rha: 0,  eps: 40, fr: 1.654, fc: 4.376,  theoRho: 1767, freshRho: 1735, rho28d: 1748, wa: 4.50, porosity: 8.03, toughness: 1.866,  specificFr: 0.95, specificFc: 2.50 },
  { id: "S2M4", type: "Factorial (+1,+1)", wb: 0.425, sb: 2.25, rha: 20, eps: 40, fr: 1.698, fc: 4.290,  theoRho: 1735, freshRho: 1706, rho28d: 1719, wa: 4.24, porosity: 7.85, toughness: 4.360,  specificFr: 0.99, specificFc: 2.50 },
  { id: "S2M5", type: "Axial (-1,0)",     wb: 0.425, sb: 2.25, rha: 0,  eps: 20, fr: 2.869, fc: 12.250, theoRho: 2033, freshRho: 1997, rho28d: 2011, wa: 3.82, porosity: 7.65, toughness: 12.578, specificFr: 1.43, specificFc: 6.09 },
  { id: "S2M6", type: "Axial (+1,0)",     wb: 0.425, sb: 2.25, rha: 20, eps: 20, fr: 3.189, fc: 14.980, theoRho: 1996, freshRho: 1962, rho28d: 1976, wa: 3.24, porosity: 6.98, toughness: 7.440,  specificFr: 1.61, specificFc: 7.58 },
  { id: "S2M7", type: "Axial (0,-1)",     wb: 0.425, sb: 2.25, rha: 10, eps: 0,  fr: 5.506, fc: 48.930, theoRho: 2277, freshRho: 2249, rho28d: 2263, wa: 2.63, porosity: 5.83, toughness: 32.945, specificFr: 2.43, specificFc: 21.62 },
  { id: "S2M8", type: "Axial (0,+1)",     wb: 0.425, sb: 2.25, rha: 10, eps: 40, fr: 1.798, fc: 5.210,  theoRho: 1751, freshRho: 1720, rho28d: 1734, wa: 3.52, porosity: 6.94, toughness: 3.844,  specificFr: 1.04, specificFc: 3.00 },
  { id: "S2M9", type: "Center (0,0)",     wb: 0.425, sb: 2.25, rha: 10, eps: 20, fr: 3.293, fc: 17.960, theoRho: 2043, freshRho: 2000, rho28d: 2034, wa: 3.07, porosity: 5.97, toughness: 11.791, specificFr: 1.62, specificFc: 8.83 },
  { id: "S2M10",type: "Center (0,0)",     wb: 0.425, sb: 2.25, rha: 10, eps: 20, fr: 3.168, fc: 16.190, theoRho: 2018, freshRho: 1970, rho28d: 1970, wa: 2.96, porosity: 5.84, toughness: 11.995, specificFr: 1.61, specificFc: 8.22 },
  { id: "S2M11",type: "Center (0,0)",     wb: 0.425, sb: 2.25, rha: 10, eps: 20, fr: 3.322, fc: 16.190, theoRho: 1981, freshRho: 1970, rho28d: 1975, wa: 3.29, porosity: 6.55, toughness: 10.958, specificFr: 1.68, specificFc: 8.20 },
];

// Phase 3: ITZ Chemical & Elemental Diagnostics (SEM-EDS) - Table 30
export const PHASE_3_ITZ_DATA = [
  {
    sample: "S3M1 (Control)",
    eps: 40,
    rha: 0,
    caAt: 38.27,
    siAt: 1.54,
    casiRatio: 24.85,
    stdDev: 2.70,
    state: "Weak / Highly Crystalline Portlandite",
    microstructure: "Pervasive boundary gaps and microcracking; massive hexagonal plate-like Ca(OH)2 crystals aligned parallel to bead surface, creating pre-formed failure planes."
  },
  {
    sample: "S3M2 (Pozzolanic)",
    eps: 40,
    rha: 20,
    caAt: 21.85,
    siAt: 3.87,
    casiRatio: 5.65,
    stdDev: 0.39,
    state: "Dense / Amorphous C-S-H Gel",
    microstructure: "Boundary gap narrowed and structurally welded; spongy amorphous Calcium-Silicate-Hydrate (C-S-H) network fills interfacial voids, transferring stresses across matrix."
  }
];

// Phase 4: Physical Coating Validation - Table 31
export const PHASE_4_COATING_DATA = [
  { sample: "S4M1", eps: "20%", state: "Uncoated", fc: 10.15, fr: 2.10, fcGain: "0%", frGain: "0%" },
  { sample: "S4M2", eps: "20%", state: "Coated",   fc: 13.85, fr: 3.45, fcGain: "+36.45%", frGain: "+64.29%" },
  { sample: "S4M3", eps: "40%", state: "Uncoated", fc: 4.20,  fr: 0.95, fcGain: "0%", frGain: "0%" },
  { sample: "S4M4", eps: "40%", state: "Coated",   fc: 7.15,  fr: 1.85, fcGain: "+70.24%", frGain: "+94.74%" },
];

// Phase 5: Micro-Fiber Optimization - Table 32
export const PHASE_5_FIBER_DATA = [
  { sample: "S5M1", fiber: 0.0, fr: 3.261, fc: 16.780, theoRho: 2014, freshRho: 1980, rho28d: 1995, wa: 3.13, porosity: 6.15, toughness: 14.706, role: "Baseline unreinforced pozzolanic matrix" },
  { sample: "S5M2", fiber: 0.5, fr: 3.585, fc: 15.620, theoRho: 2013, freshRho: 1952, rho28d: 1969, wa: 3.34, porosity: 6.48, toughness: 18.240, role: "GLOBAL OPTIMUM: Safe load-bearing capacity with 24% toughness boost" },
  { sample: "S5M3", fiber: 1.0, fr: 3.998, fc: 14.140, theoRho: 2011, freshRho: 1922, rho28d: 1938, wa: 3.62, porosity: 6.95, toughness: 25.415, role: "Flexural apex; compressive strength starts declining" },
  { sample: "S5M4", fiber: 1.5, fr: 3.652, fc: 11.850, theoRho: 2009, freshRho: 1902, rho28d: 1919, wa: 3.91, porosity: 7.42, toughness: 28.850, role: "Fiber balling onset: fc drops -24.1% due to trapped macroscopic air" },
  { sample: "S5M5", fiber: 2.0, fr: 2.888, fc: 11.060, theoRho: 2006, freshRho: 1884, rho28d: 1903, wa: 4.28, porosity: 7.98, toughness: 31.540, role: "Degradation plateau: fr falls below unreinforced baseline" },
];
