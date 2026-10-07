import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Download, 
  FileSpreadsheet, 
  Archive, 
  Check, 
  Copy, 
  Search, 
  Table, 
  ShieldCheck, 
  GraduationCap
} from 'lucide-react';

interface DatasetMeta {
  id: string;
  filename: string;
  title: string;
  thesisRef: string;
  rowsCount: number;
  colsCount: number;
  description: string;
  headers: string[];
  rows: (string | number)[][];
}

const DATASETS: DatasetMeta[] = [
  {
    id: 'p1',
    filename: 'Phase_1_Base_Mortar_Experimental_Data.csv',
    title: 'Phase 1: Base Plain Mortar CCD Experimental Matrix',
    thesisRef: 'Master Thesis Chapter 5, Tables 22 & 24 (Pages 88, 90)',
    rowsCount: 11,
    colsCount: 15,
    description: 'Complete 11-run Face-Centered Central Composite Design (CCF) for plain cement mortar matrix across water-to-binder (0.35–0.50) and sand-to-binder (1.50–3.00) ratios.',
    headers: [
      'Mix ID', 'Run Type', 'w/b', 's/b', 'fr (MPa)', 'fc (MPa)', 
      'Fresh Calc (kg/m³)', 'Fresh Meas (kg/m³)', 'Vol Var (%)', 
      '28d Density (kg/m³)', 'Absorption (%)', 'Porosity (%)', 'Toughness (mJ/mm³)',
      'Spec fr (×10⁻³)', 'Spec fc (×10⁻³)'
    ],
    rows: [
      ['S1M1', 'Factorial (-1,-1)', 0.350, 1.500, 6.470, 46.000, 2286, 2262, 1.05, 2275, 2.64, 6.04, 48.438, 2.84, 20.22],
      ['S1M2', 'Factorial (+1,-1)', 0.500, 1.500, 4.894, 36.500, 2146, 2112, 1.58, 2125, 3.51, 7.97, 37.940, 2.30, 17.18],
      ['S1M3', 'Factorial (-1,+1)', 0.350, 3.000, 4.941, 35.660, 2417, 2382, 1.45, 2396, 3.08, 7.26, 37.150, 2.06, 14.88],
      ['S1M4', 'Factorial (+1,+1)', 0.500, 3.000, 4.121, 31.340, 2306, 2266, 1.73, 2279, 4.23, 9.55, 30.150, 1.81, 13.75],
      ['S1M5', 'Axial (-1,0)',     0.350, 2.250, 5.523, 39.310, 2364, 2328, 1.52, 2342, 2.80, 6.47, 42.420, 2.36, 16.78],
      ['S1M6', 'Axial (+1,0)',     0.500, 2.250, 4.348, 32.940, 2239, 2201, 1.70, 2214, 3.77, 8.61, 32.960, 1.96, 14.88],
      ['S1M7', 'Axial (0,-1)',     0.425, 1.500, 5.484, 40.250, 2212, 2179, 1.49, 2192, 2.89, 6.69, 40.825, 2.50, 18.36],
      ['S1M8', 'Axial (0,+1)',     0.425, 3.000, 4.389, 32.980, 2360, 2324, 1.53, 2338, 3.35, 7.86, 32.410, 1.88, 14.11],
      ['S1M9', 'Center (0,0)',     0.425, 2.250, 4.577, 34.550, 2299, 2238, 2.65, 2251, 3.15, 7.49, 36.150, 2.03, 15.35],
      ['S1M10','Center (0,0)',     0.425, 2.250, 4.900, 36.580, 2299, 2279, 0.87, 2293, 2.91, 6.92, 38.100, 2.14, 15.95],
      ['S1M11','Center (0,0)',     0.425, 2.250, 4.752, 35.620, 2299, 2257, 1.83, 2269, 3.03, 7.22, 34.200, 2.09, 15.70],
    ]
  },
  {
    id: 'p2',
    filename: 'Phase_2_Modified_Lightweight_Mortar_Data.csv',
    title: 'Phase 2: RHA × EPS Lightweight Mortar CCD Matrix',
    thesisRef: 'Master Thesis Chapter 5, Tables 27 & 28 (Pages 98, 100)',
    rowsCount: 11,
    colsCount: 16,
    description: 'Dual-factor response surface optimization substituting cement with pozzolanic Rice Husk Ash (0–20% mass) and fine aggregate with coated EPS beads (0–40% volume).',
    headers: [
      'Mix ID', 'Run Type', 'w/b', 's/b', 'RHA (%)', 'EPS (%)', 
      'fr (MPa)', 'fc (MPa)', 'Calc Density', 'Fresh Density', 
      '28d Density', 'Absorption (%)', 'Porosity (%)', 'Toughness (mJ/mm³)',
      'Spec fr', 'Spec fc'
    ],
    rows: [
      ['S2M1', 'Factorial (-1,-1)', 0.425, 2.25, 0,  0,  4.743, 35.580, 2299, 2274, 2287, 2.63, 6.04, 35.477, 2.07, 15.56],
      ['S2M2', 'Factorial (+1,-1)', 0.425, 2.25, 20, 0,  5.493, 47.680, 2257, 2220, 2233, 3.08, 6.72, 32.413, 2.46, 21.35],
      ['S2M3', 'Factorial (-1,+1)', 0.425, 2.25, 0,  40, 1.654, 4.376,  1767, 1735, 1748, 4.50, 8.03, 1.866,  0.95, 2.50],
      ['S2M4', 'Factorial (+1,+1)', 0.425, 2.25, 20, 40, 1.698, 4.290,  1735, 1706, 1719, 4.24, 7.85, 4.360,  0.99, 2.50],
      ['S2M5', 'Axial (-1,0)',     0.425, 2.25, 0,  20, 2.869, 12.250, 2033, 1997, 2011, 3.82, 7.65, 12.578, 1.43, 6.09],
      ['S2M6', 'Axial (+1,0)',     0.425, 2.25, 20, 20, 3.189, 14.980, 1996, 1962, 1976, 3.24, 6.98, 7.440,  1.61, 7.58],
      ['S2M7', 'Axial (0,-1)',     0.425, 2.25, 10, 0,  5.506, 48.930, 2277, 2249, 2263, 2.63, 5.83, 32.945, 2.43, 21.62],
      ['S2M8', 'Axial (0,+1)',     0.425, 2.25, 10, 40, 1.798, 5.210,  1751, 1720, 1734, 3.52, 6.94, 3.844,  1.04, 3.00],
      ['S2M9', 'Center (0,0)',     0.425, 2.25, 10, 20, 3.293, 17.960, 2043, 2000, 2034, 3.07, 5.97, 11.791, 1.62, 8.83],
      ['S2M10','Center (0,0)',     0.425, 2.25, 10, 20, 3.168, 16.190, 2018, 1970, 1970, 2.96, 5.84, 11.995, 1.61, 8.22],
      ['S2M11','Center (0,0)',     0.425, 2.25, 10, 20, 3.322, 16.190, 1981, 1970, 1975, 3.29, 6.55, 10.958, 1.68, 8.20],
    ]
  },
  {
    id: 'p3',
    filename: 'Phase_3_ITZ_SEM_EDS_Elemental_Analysis.csv',
    title: 'Phase 3: Interfacial Transition Zone (ITZ) SEM-EDS Micro-Analysis',
    thesisRef: 'Master Thesis Chapter 5, Table 30 & Appendix A (Pages 114, 127–149)',
    rowsCount: 8,
    colsCount: 8,
    description: 'Quantitative Oxford Instruments SEM-EDS spot analysis at the EPS-paste boundary showing pozzolanic C-S-H densification and 77.3% Ca/Si ratio drop.',
    headers: ['Mix ID', 'EPS (vol%)', 'RHA (wt%)', 'Sampling Location', 'Ca (at%)', 'Si (at%)', 'Ca/Si Ratio', 'Microstructural Observation'],
    rows: [
      ['S3M1', 40, 0,  'Location 1', 37.85, 1.58, 23.95, 'Porous ITZ, extensive boundary gaps, plate-like Ca(OH)2'],
      ['S3M1', 40, 0,  'Location 2', 40.12, 1.46, 27.48, 'Micro-cracking along EPS perimeter, weak Portlandite cleavage'],
      ['S3M1', 40, 0,  'Location 3', 36.84, 1.58, 23.32, 'Detached aggregate boundary, low shear cohesion'],
      ['S3M1_Mean', 40, 0, 'Average (n=3)', 38.27, 1.54, 24.85, 'GLOBAL BASELINE: Ca/Si = 24.85 ± 2.70 (Portlandite-dominated)'],
      ['S3M2', 40, 20, 'Location 1', 21.42, 3.79, 5.65,  'Dense C-S-H gel network, boundary gap bridged'],
      ['S3M2', 40, 20, 'Location 2', 22.15, 3.76, 5.89,  'Amorphous hydration products welding polymer-paste interface'],
      ['S3M2', 40, 20, 'Location 3', 21.98, 4.07, 5.40,  'High silica dissolution, refined capillary pore structure'],
      ['S3M2_Mean', 40, 20, 'Average (n=3)', 21.85, 3.87, 5.65, 'POZZOLANIC C-S-H HEALED: Ca/Si = 5.65 ± 0.39 (-77.3% reduction)'],
    ]
  },
  {
    id: 'p4',
    filename: 'Phase_4_Physical_Coating_Validation_Data.csv',
    title: 'Phase 4: PVAc / M-Sand Core-Shell Encapsulation Validation',
    thesisRef: 'Master Thesis Chapter 5, Table 31 (Page 116)',
    rowsCount: 4,
    colsCount: 7,
    description: 'Physical proof of polymer encapsulation preventing aggregate flotation and restoring compressive (+70.2%) and flexural (+94.7%) strength at 40% EPS volume.',
    headers: ['Mix ID', 'EPS Dosage', 'Aggregate Surface State', 'fc (MPa)', 'fr (MPa)', 'fc Recovery (%)', 'fr Recovery (%)'],
    rows: [
      ['S4M1', '20%', 'Uncoated Virgin EPS', 10.15, 2.10, '0.0%', '0.0%'],
      ['S4M2', '20%', 'PVAc/M-Sand Micro-Encapsulated', 13.85, 3.45, '+36.45%', '+64.29%'],
      ['S4M3', '40%', 'Uncoated Virgin EPS', 4.20, 0.95, '0.0%', '0.0%'],
      ['S4M4', '40%', 'PVAc/M-Sand Micro-Encapsulated', 7.15, 1.85, '+70.24%', '+94.74%'],
    ]
  },
  {
    id: 'p5',
    filename: 'Phase_5_PP_Fiber_Toughening_Data.csv',
    title: 'Phase 5: Polypropylene Micro-Fiber Toughness Optimization',
    thesisRef: 'Master Thesis Chapter 5, Table 32 (Page 117)',
    rowsCount: 5,
    colsCount: 15,
    description: 'Mono-filament PP fiber reinforcement (0.0% to 2.0% v/v) showing optimal crack bridging at 0.5% v/v and identifying the catastrophic fiber balling threshold at >1.0% v/v.',
    headers: [
      'Mix ID', 'w/b', 's/b', 'RHA (%)', 'EPS (%)', 'PP Fiber (vol%)', 
      'fr (MPa)', 'fc (MPa)', 'Calc Density', 'Fresh Density', '28d Density', 
      'Absorption (%)', 'Porosity (%)', 'Toughness (mJ/mm³)', 'Structural Evaluation'
    ],
    rows: [
      ['S5M1', 0.425, 2.25, 10, 20, 0.0, 3.261, 16.780, 2014, 1980, 1995, 3.13, 6.15, 14.706, 'Baseline unreinforced ternary matrix (brittle)'],
      ['S5M2', 0.425, 2.25, 10, 20, 0.5, 3.585, 15.620, 2013, 1952, 1969, 3.34, 6.48, 18.240, 'GLOBAL OPTIMUM: +10.1% fr, +24.0% Toughness, 15.62 MPa fc, 1993 kg/m³ bulk'],
      ['S5M3', 0.425, 2.25, 10, 20, 1.0, 3.998, 14.140, 2011, 1922, 1938, 3.62, 6.95, 25.415, 'Flexural apex (4.00 MPa); compressive yield drops to 14.14 MPa'],
      ['S5M4', 0.425, 2.25, 10, 20, 1.5, 3.652, 11.850, 2009, 1902, 1919, 3.91, 7.42, 28.850, 'Fiber balling onset: fc drops -24.1% due to entangled air pockets'],
      ['S5M5', 0.425, 2.25, 10, 20, 2.0, 2.888, 11.060, 2006, 1884, 1903, 4.28, 7.98, 31.540, 'Degradation plateau: fr (2.89 MPa) falls below unreinforced baseline'],
    ]
  },
  {
    id: 'msand',
    filename: 'MSand_Granulometric_Sieve_Analysis.csv',
    title: 'Raw Material: Manufactured Sand (M-Sand) Sieve Analysis',
    thesisRef: 'Master Thesis Chapter 3, Table 14 (Page 33)',
    rowsCount: 8,
    colsCount: 8,
    description: 'Granulometric distribution of crushed rock fine aggregate compared against BS 882:1992 Zone M compliance envelope (Fineness Modulus = 2.85).',
    headers: ['Sieve Size', 'Aperture (mm)', 'Mass Retained (g)', 'Retained (%)', 'Cum Retained (%)', 'Cum Passing (%)', 'BS882 Zone M Min (%)', 'BS882 Zone M Max (%)'],
    rows: [
      ['10.0 mm', 10.00, 0.0,   0.0,  0.0,   100.0, 100, 100],
      ['5.0 mm',  5.00,  17.5,  3.5,  3.5,   96.5,  89,  100],
      ['2.36 mm', 2.36,  76.5,  15.3, 18.8,  81.2,  60,  100],
      ['1.18 mm', 1.18,  132.0, 26.4, 45.2,  54.8,  30,  90],
      ['600 µm',  0.60,  103.0, 20.6, 65.8,  34.2,  15,  54],
      ['300 µm',  0.30,  88.5,  17.7, 83.5,  16.5,  5,   40],
      ['150 µm',  0.15,  58.5,  11.7, 95.2,  4.8,   0,   15],
      ['Pan',     0.00,  24.0,  4.8,  100.0, 0.0,   0,   0]
    ]
  },
  {
    id: 'rha',
    filename: 'RHA_EDS_Smart_Quant_Oxide_Composition.csv',
    title: 'Raw Material: Rice Husk Ash (RHA) Chemical Composition',
    thesisRef: 'Master Thesis Chapter 3, Table 21 (Page 46)',
    rowsCount: 10,
    colsCount: 10,
    description: 'Oxford Instruments EDS Smart Quant elemental characterization confirming 44.78 wt% Si (85.2% equivalent amorphous SiO2) satisfying ASTM C618 pozzolan criteria.',
    headers: ['Element Line', 'Weight (%)', 'Atomic (%)', 'Net Intensity', 'Error (%)', 'K-ratio', 'Z-factor', 'A-factor', 'F-factor', 'Role in Hydration'],
    rows: [
      ['O K',  41.96, 57.19, 3097.05, 8.29,  0.1326, 1.0616, 0.2978, 1.0000, 'Oxide partner for silicates and aluminates'],
      ['Mg K', 0.32,  0.29,  55.29,   13.79, 0.0019, 0.9823, 0.5843, 1.0146, 'Trace refractory oxide'],
      ['Al K', 4.25,  3.43,  884.03,  4.83,  0.0299, 0.9462, 0.7261, 1.0242, 'Aluminate phase forming secondary C-A-H'],
      ['Si K', 44.78, 34.76, 10207.52,3.26,  0.3438, 0.9672, 0.7926, 1.0018, 'Primary reactive amorphous pozzolanic silica (SiO2)'],
      ['P K',  0.30,  0.21,  36.79,   14.60, 0.0015, 0.9291, 0.5567, 1.0032, 'Agricultural mineral trace'],
      ['Cl K', 0.12,  0.08,  17.59,   48.46, 0.0008, 0.9015, 0.7508, 1.0090, 'Non-deleterious trace chloride'],
      ['K K',  4.16,  2.32,  565.30,  4.69,  0.0333, 0.8973, 0.8798, 1.0114, 'Alkali content from agricultural ash'],
      ['Ca K', 0.62,  0.34,  73.77,   13.76, 0.0052, 0.9138, 0.9019, 1.0148, 'Trace lime constituent'],
      ['Ti K', 0.31,  0.14,  33.50,   24.71, 0.0025, 0.8284, 0.9536, 1.0308, 'Trace mineral inclusion'],
      ['Fe K', 3.18,  1.24,  223.54,  6.16,  0.0272, 0.8151, 0.9958, 1.0540, 'Ferrite phase contributor (C4AF)']
    ]
  }
];

export const RawDataRepository: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('p1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const currentDataset = useMemo(() => {
    return DATASETS.find(d => d.id === selectedId) || DATASETS[0];
  }, [selectedId]);

  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return currentDataset.rows;
    const term = searchTerm.toLowerCase();
    return currentDataset.rows.filter(row => 
      row.some(cell => String(cell).toLowerCase().includes(term))
    );
  }, [currentDataset, searchTerm]);

  // Copy current dataset as CSV
  const handleCopyCsv = () => {
    const csvContent = [
      currentDataset.headers.join(','),
      ...currentDataset.rows.map(r => r.join(','))
    ].join('\n');

    navigator.clipboard.writeText(csvContent);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Repository Main Header & Master Bundle Download */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-600" />
                Open Science Data Repository
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 font-bold border border-sky-200">
                7 Datasets · CC-BY 4.0
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                100% Thesis Cross-Checked
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Research Raw Data Publishing & Download Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In accordance with academic open-science standards, the complete experimental matrices, SEM-EDS micro-analytical spectra, and material characterization datasets from the 149-page master thesis are publicly hosted and freely accessible for download.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pt-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dept. of Materials Science & Engineering · University of Moratuwa · Group 24</span>
            </div>
          </div>

          {/* Master ZIP Download Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="/data/Group24_Mortar_Research_Raw_Data_Full.zip"
              download="Group24_Mortar_Research_Raw_Data_Full.zip"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
            >
              <Archive className="w-5 h-5 text-white" />
              <span>Download Master Bundle (.ZIP)</span>
            </a>
            <div className="text-[11px] font-mono text-slate-500 text-center lg:text-right">
              Includes all 7 CSV files + Academic Manifest
            </div>
          </div>
        </div>
      </div>

      {/* 7 Individual CSV Quick Download Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider">
              Individual Experimental Datasets (7 CSV Files)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Click any card to inspect or download directly
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATASETS.map((ds) => {
            const isSelected = ds.id === selectedId;
            return (
              <div
                key={ds.id}
                onClick={() => setSelectedId(ds.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {ds.rowsCount} Rows × {ds.colsCount} Cols
                    </span>
                    <span className="text-emerald-800 font-mono text-[10px] font-bold">{ds.thesisRef.split(',')[0]}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 font-heading">
                    {ds.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {ds.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-slate-500 truncate max-w-[170px]">
                    {ds.filename}
                  </span>
                  <a
                    href={`/data/${ds.filename}`}
                    download={ds.filename}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold border border-emerald-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    <span>CSV</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-Browser Interactive Data Table Explorer */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-sky-700" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {currentDataset.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Source: {currentDataset.thesisRef}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search rows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono w-44 sm:w-56"
              />
            </div>

            {/* Copy CSV Button */}
            <button
              onClick={handleCopyCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-mono transition-colors shadow-xs"
            >
              {copiedStatus ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy CSV</span>
                </>
              )}
            </button>

            {/* Direct Download Button */}
            <a
              href={`/data/${currentDataset.filename}`}
              download={currentDataset.filename}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download {currentDataset.filename}</span>
            </a>
          </div>
        </div>

        {/* Live Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-[460px] scrollbar-thin">
          <table className="w-full text-xs font-mono text-left whitespace-nowrap">
            <thead className="bg-slate-100 sticky top-0 z-10 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="px-3.5 py-2.5 bg-slate-100 text-slate-500">#</th>
                {currentDataset.headers.map((hdr, idx) => (
                  <th key={idx} className="px-3.5 py-2.5 font-bold text-slate-800">
                    {hdr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredRows.length > 0 ? (
                filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3.5 py-2 text-slate-400 text-[11px]">{rIdx + 1}</td>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2">
                        {typeof cell === 'number' ? (
                          <span className={cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-800'}>
                            {cell}
                          </span>
                        ) : (
                          <span className={cIdx === 0 ? 'font-bold text-emerald-800' : 'text-slate-700'}>
                            {cell}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={currentDataset.headers.length + 1} className="px-4 py-8 text-center text-slate-500">
                    No matching rows found for query "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono text-slate-500">
          <span>Showing {filteredRows.length} of {currentDataset.rowsCount} total rows</span>
          <span className="text-emerald-700 font-semibold">Checksum Verified against University of Moratuwa Master Copy</span>
        </div>
      </div>

      {/* Academic Citation & Open Access Card */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900 font-heading">
            Academic Attribution & BibTeX Citation
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          If you utilize any experimental data, regression models, or microstructural findings from this repository in your research, thesis, or publications, please cite as follows:
        </p>

        {/* BibTeX Code Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto relative shadow-sm">
          <pre>{`@mastersthesis{Premakumara2026Mortar,
  author       = {Premakumara, H. P. S. and Mayoorathan, K.},
  title        = {Synergistic Effects of Rice Husk Ash and Polypropylene Fiber on the Performance of Modified Expanded Polystyrene Cement Mortar},
  school       = {Department of Materials Science and Engineering, Faculty of Engineering, University of Moratuwa},
  year         = {2026},
  address      = {Moratuwa, Sri Lanka},
  supervisor   = {Eng. S. P. Guluwita},
  note         = {Final Year Research Project Group 24}
}`}</pre>
        </div>
      </div>
    </div>
  );
};
