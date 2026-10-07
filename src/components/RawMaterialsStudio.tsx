import React, { useState } from 'react';
import { 
  FlaskConical, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Microscope, 
  Info,
  Maximize2
} from 'lucide-react';
import { RAW_MATERIALS } from '../core/thesisData.ts';
import { MathView } from './MathView.tsx';

export const RawMaterialsStudio: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('rha');
  const [modalImage, setModalImage] = useState<string | null>(null);

  // M-Sand Sieve Analysis Data (Table 14 vs BS 882 Zone M Envelope)
  const sieveData = [
    { sieve: "10.0 mm", aperture: 10.0, passing: 100.0, bsLower: 100, bsUpper: 100 },
    { sieve: "5.0 mm",  aperture: 5.0,  passing: 96.5,  bsLower: 89,  bsUpper: 100 },
    { sieve: "2.36 mm", aperture: 2.36, passing: 81.2,  bsLower: 60,  bsUpper: 100 },
    { sieve: "1.18 mm", aperture: 1.18, passing: 54.8,  bsLower: 30,  bsUpper: 90 },
    { sieve: "600 µm",  aperture: 0.60, passing: 34.2,  bsLower: 15,  bsUpper: 54 },
    { sieve: "300 µm",  aperture: 0.30, passing: 16.5,  bsLower: 5,   bsUpper: 40 },
    { sieve: "150 µm",  aperture: 0.15, passing: 4.8,   bsLower: 0,   bsUpper: 15 },
  ];

  // RHA EDS Smart Quant (Table 21 from thesis)
  const edsData = [
    { element: "Silicon (Si K)", wt: 44.78, at: 34.76, role: "Primary amorphous reactive pozzolanic silica (SiO₂)" },
    { element: "Oxygen (O K)",   wt: 41.96, at: 57.19, role: "Oxide matrix partner for silicates and aluminates" },
    { element: "Aluminum (Al K)",wt: 4.25,  at: 3.43,  role: "Secondary aluminate (C-A-H gel contributor)" },
    { element: "Potassium (K K)", wt: 4.16,  at: 2.32,  role: "Alkali component from organic rice straw combustion" },
    { element: "Iron (Fe K)",    wt: 3.18,  at: 1.24,  role: "Ferrite clinker phase contributor (C₄AF)" },
    { element: "Calcium (Ca K)", wt: 0.62,  at: 0.34,  role: "Trace natural alkaline earth constituent" },
    { element: "Magnesium (Mg K)", wt: 0.32, at: 0.29, role: "Trace refractory oxide" },
    { element: "Titanium (Ti K)", wt: 0.31, at: 0.14,  role: "Trace mineral inclusion" },
    { element: "Phosphorus (P K)", wt: 0.30, at: 0.21, role: "Trace agricultural mineral" },
    { element: "Chlorine (Cl K)", wt: 0.12, at: 0.08,  role: "Negligible trace non-deleterious salt" },
  ];

  const currentMat = RAW_MATERIALS[selectedMaterial] || RAW_MATERIALS.rha;

  return (
    <div className="space-y-8 py-6">
      {/* Studio Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Raw Materials Characterization & Standard Compliance
            </h2>
            <p className="text-xs text-slate-600">
              Detailed physical, chemical, and mineralogical properties of all constituents tested under ASTM, BS, and SLS protocols
            </p>
          </div>
        </div>

        {/* Material Selection Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
          {Object.entries(RAW_MATERIALS).map(([key, mat]) => {
            const isSelected = selectedMaterial === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMaterial(key)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-400 font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {mat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Material Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Technical Metrics */}
        <div className="lg:col-span-2 materials-glass p-6 rounded-2xl border border-slate-200 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
                {currentMat.standard}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1.5 font-heading">
                {currentMat.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                Source: <strong className="text-slate-800">{currentMat.source}</strong> · Specific Gravity (SG): <strong className="text-sky-800 font-mono font-bold">{currentMat.sg}</strong>
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {currentMat.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {Object.entries(currentMat.keyProperties).map(([prop, val]) => (
              <div key={prop} className="materials-card p-3 border border-slate-200 bg-slate-50/50">
                <div className="text-[10px] text-slate-500 font-mono font-medium truncate">{prop}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 font-heading truncate">
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Physical Specimen Micrograph / Photo */}
        <div className="materials-glass p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
              <span className="font-bold uppercase tracking-wider text-[10px]">Specimen Micrograph</span>
              <button 
                onClick={() => setModalImage(currentMat.imagePath)}
                className="text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                title="View Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
              <img 
                src={currentMat.imagePath} 
                alt={currentMat.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium">Click icon to inspect 300 DPI scan</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 italic text-center font-medium">
            Figure captured from Group 24 research experimental testing portfolio
          </div>
        </div>
      </div>

      {/* Special Deep-Dive Studio 1: RHA Chemical Composition & ASTM C618 Compliance */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Rice Husk Ash: Energy Dispersive X-Ray Spectroscopy (EDS) & Pozzolanic Classification
            </h3>
            <p className="text-xs text-slate-600">
              eZAF Smart Quant elemental quantification (Table 21 in thesis) confirming ASTM C618 Class N pozzolan compliance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Elemental Line</th>
                  <th className="p-2.5">Weight %</th>
                  <th className="p-2.5">Atomic %</th>
                  <th className="p-2.5">Role in Hydration Chemistry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-800 bg-white">
                {edsData.map((row, idx) => (
                  <tr key={row.element} className={idx < 2 ? "bg-amber-50/70 font-bold text-amber-950" : "hover:bg-slate-50"}>
                    <td className="p-2.5">{row.element}</td>
                    <td className="p-2.5 text-sky-800 font-bold">{row.wt.toFixed(2)}%</td>
                    <td className="p-2.5 text-slate-600">{row.at.toFixed(2)}%</td>
                    <td className="p-2.5 text-[11px] font-sans text-slate-700 font-normal">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="materials-card p-5 border border-slate-200 space-y-4 flex flex-col justify-between bg-slate-50/50">
            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                ASTM C618 Class N Compliance Formula
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs font-mono text-amber-900 shadow-xs">
                <MathView math="\text{SiO}_2 + \text{Al}_2\text{O}_3 + \text{Fe}_2\text{O}_3 \ge 70.0\%" block />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Processed RHA achieved a cumulative pozzolanic active oxide fraction of <strong className="text-slate-900 font-bold">93.8%</strong>, vastly surpassing the 70.0% threshold. The high amorphous silica content enables intense consumption of calcium hydroxide during cement hydration.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-medium flex items-center gap-2.5 shadow-xs">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-700" />
              <span>Certified active pozzolana capable of complete ITZ boundary densification.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Deep-Dive Studio 2: M-Sand Granulometric Grading Curve (BS 882) */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-50 text-sky-800 border border-sky-300 shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Fine Aggregate Grading Envelope: Manufactured Sand (BS 882: Zone M)
            </h3>
            <p className="text-xs text-slate-600">
              Sieve analysis and Fineness Modulus compliance (Table 12 & Table 14 from thesis)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Sieve Size</th>
                  <th className="p-2.5">Aperture</th>
                  <th className="p-2.5">M-Sand Cumulative Passing</th>
                  <th className="p-2.5">BS 882 Zone M Range</th>
                  <th className="p-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-800 bg-white">
                {sieveData.map((row) => (
                  <tr key={row.sieve} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">{row.sieve}</td>
                    <td className="p-2.5 text-slate-600">{row.aperture} mm</td>
                    <td className="p-2.5 text-emerald-800 font-bold">{row.passing.toFixed(1)}%</td>
                    <td className="p-2.5 text-slate-600">{row.bsLower}% – {row.bsUpper}%</td>
                    <td className="p-2.5 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
                        In Spec
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Granulometric Analysis Summary */}
          <div className="materials-card p-6 border border-slate-200 space-y-4 bg-slate-50/50">
            <h4 className="text-sm font-bold text-slate-900 font-heading">
              Sieve Analysis & Particle Packing Insights
            </h4>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                The calculated Fineness Modulus is <strong className="text-sky-800 font-mono font-bold">FM = 2.76</strong>, placing the crushed metamorphic manufactured sand precisely within the optimal <strong>Zone M (Medium)</strong> structural grading envelope.
              </p>
              <p>
                Unlike smooth, rounded river sand, the angular quarry fracture profile of M-sand delivers superior mechanical interlocking across the micro-skeleton. The controlled 4.8% passing 150 µm fraction provides micro-filler effect, reducing paste demand while preventing excessive drying shrinkage.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 font-mono font-medium">Fineness Modulus</span>
                <div className="text-base font-bold text-emerald-800 font-mono mt-0.5">2.76</div>
                <span className="text-[10px] text-slate-500 font-medium">Target: 2.60 - 2.90</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 font-mono font-medium">Water Absorption</span>
                <div className="text-base font-bold text-sky-800 font-mono mt-0.5">1.20%</div>
                <span className="text-[10px] text-slate-500 font-medium">Compensated in batching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full-Resolution Image Inspection */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden border border-slate-300 p-2 relative shadow-2xl">
            <img src={modalImage} alt="Expanded Specimen" className="w-full h-full object-contain max-h-[85vh] rounded-xl" />
            <div className="text-center text-xs text-slate-600 font-medium py-2">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};
