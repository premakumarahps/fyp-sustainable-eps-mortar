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
  date: "October 2026",
  group: "Group 24",
  keyFindings: {
    density: 1969, // kg/m3 bulk hardened density (14% dead-weight reduction at 20% EPS)
    fc: 15.62, // MPa 28-day compressive strength (+53.9% over conventional raw EPS)
    fr: 3.59, // MPa 28-day flexural strength (+71.0% over conventional raw EPS)
    toughness: 18.24, // mJ/mm3 (+45.0% handling fracture energy)
    apparentPorosity: 6.48, // % (pore refinement from 7.65%)
    waterAbsorption: 3.34, // % (reduced water permeability)
    casiRatioDrop: 77.26, // % reduction in Ca/Si at ITZ (from 24.85 to 5.65)
    costEfficiencyGain: 33.7, // % higher strength-to-cost ratio (MPa/kLKR)
    carbonIntensityReduction: 39.6, // % lower embodied carbon per MPa
    rhaOptimum: 10, // % mass replacement of cement
    epsOptimum: 20, // % volume replacement of sand
    ppFiberOptimum: 0.5 // % v/v dosage of micro-fibers
  }
};

// 2x2 Comparative Performance Evaluation Matrix
export interface BenchmarkMetric {
  id: string;
  name: string;
  unit: string;
  conv20: { value: number | string; err?: number; text?: string };
  upg20:  { value: number | string; err?: number; gain?: string; text?: string };
  conv40: { value: number | string; err?: number; text?: string };
  upg40:  { value: number | string; err?: number; gain?: string; text?: string };
  category: 'mechanical' | 'microstructure' | 'physical' | 'sustainability';
  description: string;
}

export const COMPARATIVE_2X2_MATRIX: BenchmarkMetric[] = [
  {
    id: 'density',
    name: '28-Day Oven-Dry Density',
    unit: 'kg/m³',
    conv20: { value: 2011.0, err: 18.5, text: '2011.0 ± 18.5' },
    upg20:  { value: 1969.0, err: 17.0, gain: '-2.1% Light', text: '1969.0 ± 17.0' },
    conv40: { value: 1748.0, err: 15.0, text: '1748.0 ± 15.0' },
    upg40:  { value: 1734.0, err: 14.5, gain: '-0.8% Light', text: '1734.0 ± 14.5' },
    category: 'physical',
    description: 'Volume-for-volume replacement preserves lightweight classification (14–24% lighter than normal dense mortar) with zero density penalty from coating and RHA.'
  },
  {
    id: 'fc',
    name: 'Compressive Strength (fc)',
    unit: 'MPa',
    conv20: { value: 10.15, err: 0.65, text: '10.15 ± 0.65' },
    upg20:  { value: 15.62, err: 0.85, gain: '+53.9%', text: '15.62 ± 0.85' },
    conv40: { value: 4.20, err: 0.35, text: '4.20 ± 0.35' },
    upg40:  { value: 5.21, err: 0.40, gain: '+70.2%', text: '5.21 - 7.15' },
    category: 'mechanical',
    description: 'Substantial compressive capacity recovery. Micro-pore filling + secondary C-S-H formation densifies the matrix surrounding the EPS inclusions.'
  },
  {
    id: 'fr',
    name: 'Flexural Strength (fr)',
    unit: 'MPa',
    conv20: { value: 2.10, err: 0.15, text: '2.10 ± 0.15' },
    upg20:  { value: 3.59, err: 0.20, gain: '+71.0%', text: '3.59 ± 0.20' },
    conv40: { value: 0.95, err: 0.08, text: '0.95 ± 0.08' },
    upg40:  { value: 1.80, err: 0.12, gain: '+94.7%', text: '1.80 - 1.85' },
    category: 'mechanical',
    description: 'Significant flexural enhancement from PP micro-fiber tensile crack bridging and PVAc-coated bead mechanical interlocking.'
  },
  {
    id: 'toughness',
    name: 'Fracture Energy / Toughness',
    unit: 'mJ/mm³',
    conv20: { value: 12.58, err: 0.85, text: '12.58 ± 0.85' },
    upg20:  { value: 18.24, err: 1.20, gain: '+45.0%', text: '18.24 ± 1.20' },
    conv40: { value: 1.87, err: 0.15, text: '1.87 ± 0.15' },
    upg40:  { value: 3.84, err: 0.25, gain: '+105.3%', text: '3.84 ± 0.25' },
    category: 'mechanical',
    description: 'Converts sudden, catastrophic brittle collapse into a ductile post-peak plateau, drastically reducing edge spalling and transport breakage.'
  },
  {
    id: 'porosity',
    name: 'Apparent Porosity',
    unit: '%',
    conv20: { value: 7.65, err: 0.25, text: '7.65 ± 0.25%' },
    upg20:  { value: 6.48, err: 0.24, gain: '-15.3%', text: '6.48 ± 0.24%' },
    conv40: { value: 8.03, err: 0.30, text: '8.03 ± 0.30%' },
    upg40:  { value: 6.94, err: 0.26, gain: '-13.6%', text: '6.94 ± 0.26%' },
    category: 'physical',
    description: 'Pore refinement via RHA secondary hydration products filling permeable capillary voids.'
  },
  {
    id: 'wa',
    name: 'Water Absorption (WA)',
    unit: '%',
    conv20: { value: 3.82, err: 0.15, text: '3.82 ± 0.15%' },
    upg20:  { value: 3.34, err: 0.14, gain: '-12.6%', text: '3.34 ± 0.14%' },
    conv40: { value: 4.50, err: 0.18, text: '4.50 ± 0.18%' },
    upg40:  { value: 3.52, err: 0.15, gain: '-21.8%', text: '3.52 ± 0.15%' },
    category: 'physical',
    description: 'Decreased water ingress and moisture permeability, protecting partition panels against efflorescence and dampness.'
  },
  {
    id: 'casi',
    name: 'ITZ Ca/Si Atomic Ratio (SEM-EDS)',
    unit: 'ratio',
    conv20: { value: 23.50, err: 2.40, text: '23.50 ± 2.40 (CH)' },
    upg20:  { value: 6.80, err: 0.55, gain: '-71.1% (C-S-H)', text: '6.80 ± 0.55' },
    conv40: { value: 24.85, err: 2.70, text: '24.85 ± 2.70 (CH)' },
    upg40:  { value: 5.65, err: 0.39, gain: '-77.3% (C-S-H)', text: '5.65 ± 0.39' },
    category: 'microstructure',
    description: 'Direct chemical proof: Amorphous SiO2 in RHA consumes weak Portlandite (CH) to synthesize dense, load-bearing C-S-H gel at the bead boundary.'
  },
  {
    id: 'cost_efficiency',
    name: 'Strength-to-Cost Efficiency',
    unit: 'MPa / 1000 LKR',
    conv20: { value: 0.275, err: 0.020, text: '0.275 ± 0.020' },
    upg20:  { value: 0.323, err: 0.025, gain: '+17.5%', text: '0.323 ± 0.025' },
    conv40: { value: 0.098, err: 0.009, text: '0.098 ± 0.009' },
    upg40:  { value: 0.131, err: 0.011, gain: '+33.7%', text: '0.131 ± 0.011' },
    category: 'sustainability',
    description: 'Every rupee invested yields substantially more load-bearing capacity. M-sand and RHA cement-replacement offset coating and fiber costs.'
  },
  {
    id: 'carbon_intensity',
    name: 'Embodied Carbon Intensity',
    unit: 'kg CO₂-e / MPa·m³',
    conv20: { value: 53.47, err: 2.80, text: '53.47 ± 2.80' },
    upg20:  { value: 32.29, err: 1.60, gain: '-39.6%', text: '32.29 ± 1.60' },
    conv40: { value: 130.02, err: 6.50, text: '130.02 ± 6.50' },
    upg40:  { value: 95.66, err: 4.50, gain: '-26.4%', text: '95.66 ± 4.50' },
    category: 'sustainability',
    description: 'Significantly lower carbon footprint per unit strength through 10% clinker displacement with biomass agro-waste RHA.'
  }
];

// Sri Lankan Market Unit Rates
export const SRI_LANKAN_UNIT_RATES = {
  cementPerKg: 36.00,       // 1800 LKR / 50kg bag
  mSandPerKg: 2.734,         // 12000 LKR / cube (2.83 m³)
  riverSandPerKg: 5.886,     // 25000 LKR / cube (2.83 m³)
  epsPerKg: 4000.0,          // 4000 LKR / kg
  rhaPerKg: 15.00,           // 15 LKR / kg (waste collection + ball milling electricity)
  ppFiberPerKg: 3450.0,      // 3450 LKR / kg bag
  pvacCoatingPerKg: 800.0    // 800 LKR / kg emulsion
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
    imagePath: "/figures/poster_img10_47.jpeg"
  },
  rha: {
    name: "Rice Husk Ash (RHA)",
    source: "Open-Field Agro-Brick Kilns (Sri Lanka)",
    standard: "ASTM C618 (Class N Pozzolan Spec)",
    sg: 2.10,
    description: "Processed agricultural biomass waste. Ball-milled for 2 hours to achieve micro-silica reactivity, transforming porous Portlandite into dense load-bearing C-S-H gel.",
    keyProperties: {
      "Amorphous SiO2 Content": "89.4%",
      "Ball-Milling Duration": "120 mins",
      "Specific Surface Area": "28,500 m²/kg",
      "Median Particle Size (D50)": "7.4 µm",
      "Pozzolanic Activity Index": "108%",
      "Loss on Ignition (LOI)": "4.1%"
    },
    imagePath: "/figures/poster_img1_11.jpeg"
  },
  eps: {
    name: "Surface-Coated EPS Beads",
    source: "Expanded Polystyrene Core + PVAc/M-Sand Encrustation",
    standard: "ASTM C578 Type I (Cellular Core)",
    sg: 0.024,
    description: "Expanded polystyrene beads encapsulated in a rough PVAc mineral jacket. Eliminates polymer hydrophobicity and aggregate buoyancy while providing mechanical shear interlocking.",
    keyProperties: {
      "Bead Diameter": "2.0 - 4.0 mm",
      "Loose Bulk Density": "18.5 kg/m³",
      "Coated Bulk Density": "142 kg/m³",
      "Encrustation Shell Thickness": "45 - 80 µm",
      "Compressive Recovery at 40% EPS": "+70.2%",
      "Buoyancy Flotation Index": "0% Segregation"
    },
    imagePath: "/figures/poster_img2_12.jpeg"
  },
  ppFiber: {
    name: "Polypropylene (PP) Micro-Fibers",
    source: "Virgin Monofilament Micro-Reinforcement",
    standard: "ASTM C1116 / EN 14889-2 (Class 1a)",
    sg: 0.91,
    description: "Alkali-resistant synthetic micro-fibers engineered to arrest plastic shrinkage microcracks and provide post-cracking tensile stress bridging across the EPS matrix.",
    keyProperties: {
      "Fiber Cut Length": "6.0 mm",
      "Filament Diameter": "25 µm",
      "Tensile Strength": "560 MPa",
      "Modulus of Elasticity": "3.5 GPa",
      "Optimal Volumetric Dosage": "0.5% v/v (4.55 kg/m³)",
      "Toughness Enhancement": "+45.0%"
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
    sample: "S3M1 (Conventional Unmodified)",
    eps: 40,
    rha: 0,
    caAt: 38.27,
    siAt: 1.54,
    casiRatio: 24.85,
    stdDev: 2.70,
    state: "Weak / Highly Crystalline Portlandite (CH)",
    microstructure: "Pervasive boundary gaps and microcracking; massive hexagonal plate-like Ca(OH)2 crystals aligned parallel to bead surface, creating pre-formed failure planes."
  },
  {
    sample: "S3M2 (Upgraded Pozzolanic)",
    eps: 40,
    rha: 20,
    caAt: 21.85,
    siAt: 3.87,
    casiRatio: 5.65,
    stdDev: 0.39,
    state: "Dense / Amorphous C-S-H Gel Network",
    microstructure: "Boundary gap narrowed and structurally welded; spongy amorphous Calcium-Silicate-Hydrate (C-S-H) network fills interfacial voids, transferring stresses across matrix."
  }
];

// Phase 4: Physical Coating Validation - Table 31
export const PHASE_4_COATING_DATA = [
  { sample: "S4M1", eps: "20%", state: "Conventional Raw EPS", fc: 10.15, fr: 2.10, fcGain: "0%", frGain: "0%" },
  { sample: "S4M2", eps: "20%", state: "PVAc/M-Sand Coated EPS", fc: 13.85, fr: 3.45, fcGain: "+36.45%", frGain: "+64.29%" },
  { sample: "S4M3", eps: "40%", state: "Conventional Raw EPS", fc: 4.20,  fr: 0.95, fcGain: "0%", frGain: "0%" },
  { sample: "S4M4", eps: "40%", state: "PVAc/M-Sand Coated EPS", fc: 7.15,  fr: 1.85, fcGain: "+70.24%", frGain: "+94.74%" },
];

// Phase 5: Micro-Fiber Optimization - Table 32
export const PHASE_5_FIBER_DATA = [
  { sample: "S5M1", fiber: 0.0, fr: 3.261, fc: 16.780, theoRho: 2014, freshRho: 1980, rho28d: 1995, wa: 3.13, porosity: 6.15, toughness: 14.706, role: "Baseline unreinforced pozzolanic matrix (brittle)" },
  { sample: "S5M2", fiber: 0.5, fr: 3.585, fc: 15.620, theoRho: 2013, freshRho: 1952, rho28d: 1969, wa: 3.34, porosity: 6.48, toughness: 18.240, role: "GLOBAL OPTIMUM: Safe load-bearing capacity with +45.0% toughness boost" },
  { sample: "S5M3", fiber: 1.0, fr: 3.998, fc: 14.140, theoRho: 2011, freshRho: 1922, rho28d: 1938, wa: 3.62, porosity: 6.95, toughness: 25.415, role: "Flexural apex (4.00 MPa); compressive strength starts declining" },
  { sample: "S5M4", fiber: 1.5, fr: 3.652, fc: 11.850, theoRho: 2009, freshRho: 1902, rho28d: 1919, wa: 3.91, porosity: 7.42, toughness: 28.850, role: "Fiber balling onset: fc drops -24.1% due to trapped macroscopic air" },
  { sample: "S5M5", fiber: 2.0, fr: 2.888, fc: 11.060, theoRho: 2006, freshRho: 1884, rho28d: 1903, wa: 4.28, porosity: 7.98, toughness: 31.540, role: "Degradation plateau: fr falls below unreinforced baseline" },
];
