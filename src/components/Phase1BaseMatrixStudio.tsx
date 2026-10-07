import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Sparkles, 
  Info, 
  CheckCircle2,
  Table as TableIcon,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { PHASE_1_DATA, Phase1Run } from '../core/thesisData.ts';
import { MathView } from './MathView.tsx';

type ResponseVar = 'fc' | 'fr' | 'porosity' | 'toughness';

export const Phase1BaseMatrixStudio: React.FC = () => {
  const [activeVar, setActiveVar] = useState<ResponseVar>('fc');
  const [sliderWb, setSliderWb] = useState<number>(0.425);
  const [sliderSb, setSliderSb] = useState<number>(2.25);
  const [selectedRun, setSelectedRun] = useState<Phase1Run>(PHASE_1_DATA[8]); // Center point S1M9

  // Compute response using thesis true-fit equations (Thesis p. 89, 91)
  const calcPorosity = (wb: number, sb: number) => 14.07 - 47.29*wb - 0.74*sb + 68.02*(wb**2) + 0.21*(sb**2) + 1.60*(wb*sb);
  const calcFc = (wb: number, sb: number) => 119.42 - 195.94*wb - 24.01*sb + 116.79*(wb**2) + 2.04*(sb**2) + 23.01*(wb*sb);
  const calcFr = (wb: number, sb: number) => 20.48 - 42.84*wb - 3.64*sb + 32.18*(wb**2) + 0.32*(sb**2) + 3.36*(wb*sb);
  const calcT = (wb: number, sb: number) => 137.10 - 304.49*wb - 15.23*sb + 246.56*(wb**2) + 0.56*(sb**2) + 15.55*(wb*sb);

  const predictedValues = {
    fc: calcFc(sliderWb, sliderSb),
    fr: calcFr(sliderWb, sliderSb),
    porosity: calcPorosity(sliderWb, sliderSb),
    toughness: calcT(sliderWb, sliderSb)
  };

  const varMeta = {
    fc: {
      name: "Compressive Strength (fc)",
      unit: "MPa",
      color: "text-emerald-400",
      bgGlow: "csh-glow",
      modelFormula: "f_c = 119.42 - 195.94(w/b) - 24.01(s/b) + 116.79(w/b)^2 + 2.04(s/b)^2 + 23.01(w/b \\cdot s/b)",
      r2: "0.962",
      pVal: "0.0007",
      fVal: "36.54"
    },
    fr: {
      name: "Flexural Strength (fr)",
      unit: "MPa",
      color: "text-amber-400",
      bgGlow: "rha-glow",
      modelFormula: "f_r = 20.48 - 42.84(w/b) - 3.64(s/b) + 32.18(w/b)^2 + 0.32(s/b)^2 + 3.36(w/b \\cdot s/b)",
      r2: "0.976",
      pVal: "0.0005",
      fVal: "42.18"
    },
    porosity: {
      name: "Apparent Porosity",
      unit: "%",
      color: "text-cyan-400",
      bgGlow: "eps-glow",
      modelFormula: "\\text{Porosity} = 14.07 - 47.29(w/b) - 0.74(s/b) + 68.02(w/b)^2 + 0.21(s/b)^2 + 1.60(w/b \\cdot s/b)",
      r2: "0.965",
      pVal: "< 0.001",
      fVal: "> 40.00"
    },
    toughness: {
      name: "Structural Toughness (T)",
      unit: "mJ/mm³",
      color: "text-purple-400",
      bgGlow: "fiber-glow",
      modelFormula: "T = 137.10 - 304.49(w/b) - 15.23(s/b) + 246.56(w/b)^2 + 0.56(s/b)^2 + 15.55(w/b \\cdot s/b)",
      r2: "0.971",
      pVal: "0.0006",
      fVal: "39.22"
    }
  };

  const currentMeta = varMeta[activeVar];

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Phase 1: Base Plain Mortar Matrix Optimization
            </h2>
            <p className="text-xs text-slate-600">
              Face-Centered Central Composite Design (CCF) mapping water-to-binder (w/b) vs sand-to-binder (s/b) ratios
            </p>
          </div>
        </div>

        {/* Response Variable Selector Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
          {(Object.keys(varMeta) as ResponseVar[]).map((vKey) => {
            const isSelected = activeVar === vKey;
            const meta = varMeta[vKey];
            return (
              <button
                key={vKey}
                onClick={() => setActiveVar(vKey)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-400 font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {meta.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Response Surface Calculator & Contour Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Parameter Slider & Contour Grid */}
        <div className="lg:col-span-2 materials-glass p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
                Interactive Response Surface Predictor
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 font-bold">
              R² = {currentMeta.r2} · F = {currentMeta.fVal}
            </span>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-mono font-medium">
                <span>Water-to-Binder (w/b)</span>
                <span className="font-bold text-emerald-800">{sliderWb.toFixed(3)}</span>
              </div>
              <input 
                type="range" 
                min="0.35" 
                max="0.50" 
                step="0.005"
                value={sliderWb} 
                onChange={(e) => setSliderWb(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 font-medium">
                <span>0.350 (Stiff)</span>
                <span>0.425 (Center)</span>
                <span>0.500 (Fluid)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-mono font-medium">
                <span>Sand-to-Binder (s/b)</span>
                <span className="font-bold text-sky-800">{sliderSb.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="1.50" 
                max="3.00" 
                step="0.05"
                value={sliderSb} 
                onChange={(e) => setSliderSb(parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 font-medium">
                <span>1.50 (Paste-Rich)</span>
                <span>2.25 (Center)</span>
                <span>3.00 (Aggregate-Lean)</span>
              </div>
            </div>
          </div>

          {/* Real-Time Predicted Outputs Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="materials-card p-3 border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] text-slate-500 font-mono font-medium">Compressive (fc)</span>
              <div className="text-lg font-bold text-emerald-800 font-mono mt-0.5">
                {predictedValues.fc.toFixed(2)} <span className="text-xs text-slate-500 font-normal">MPa</span>
              </div>
            </div>

            <div className="materials-card p-3 border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] text-slate-500 font-mono font-medium">Flexural (fr)</span>
              <div className="text-lg font-bold text-amber-800 font-mono mt-0.5">
                {predictedValues.fr.toFixed(2)} <span className="text-xs text-slate-500 font-normal">MPa</span>
              </div>
            </div>

            <div className="materials-card p-3 border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] text-slate-500 font-mono font-medium">Apparent Porosity</span>
              <div className="text-lg font-bold text-sky-800 font-mono mt-0.5">
                {predictedValues.porosity.toFixed(2)} <span className="text-xs text-slate-500 font-normal">%</span>
              </div>
            </div>

            <div className="materials-card p-3 border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] text-slate-500 font-mono font-medium">Toughness (T)</span>
              <div className="text-lg font-bold text-purple-800 font-mono mt-0.5">
                {predictedValues.toughness.toFixed(2)} <span className="text-xs text-slate-500 font-normal">mJ/mm³</span>
              </div>
            </div>
          </div>

          {/* Model Regression Formula */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
            <div className="text-xs text-slate-600 font-mono font-bold">
              Thesis True-Fit Quadratic Model (Section 5.2.3 & 5.2.4):
            </div>
            <div className="text-xs text-emerald-900 font-mono overflow-x-auto py-1 font-semibold">
              <MathView math={currentMeta.modelFormula} block />
            </div>
          </div>
        </div>

        {/* Right Col: Baseline Selection Rationale & ANOVA metrics */}
        <div className="materials-glass p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Center Point Locking Rationale</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-medium">
                <span className="text-slate-600">Selected Baseline:</span>
                <span className="font-bold text-emerald-800">w/b = 0.425, s/b = 2.25</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-medium">
                <span className="text-slate-600">Average fc:</span>
                <span className="text-slate-900 font-bold">35.58 MPa</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-medium">
                <span className="text-slate-600">Average fr:</span>
                <span className="text-slate-900 font-bold">4.74 MPa</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-medium">
                <span className="text-slate-600">Average Porosity:</span>
                <span className="text-sky-800 font-bold">7.19%</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              While the extreme corner S1M1 achieved a global peak of <strong>46.0 MPa</strong>, its ultra-low w/b ratio of 0.35 creates a stiff, unworkable paste that causes immediate flow collapse when adding high-surface-area RHA and water-repelling EPS.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              The 0.425 w/b center point retains controlled capillary voids (7.19%), providing the exact physical volume and accessible calcium hydroxide necessary for secondary pozzolanic C-S-H growth in Phase 2.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-900 font-medium">
            <strong>ANOVA Status:</strong> Model is statistically highly significant (p = {currentMeta.pVal}), with an insignificant Lack of Fit (p &gt; 0.05).
          </div>
        </div>
      </div>

      {/* Complete Phase 1 CCF Data Table (Table 22 & 24) */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TableIcon className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Table 22 & 24: Phase 1 CCF Consolidated Experimental Results
            </h3>
          </div>
          <span className="text-xs text-slate-600 font-mono">11 Experimental Runs (EN 196-1 Standard Prisms)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden font-mono shadow-xs">
            <thead className="bg-slate-100 text-slate-700 text-[11px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Mix ID</th>
                <th className="p-2.5">Run Type</th>
                <th className="p-2.5">w/b</th>
                <th className="p-2.5">s/b</th>
                <th className="p-2.5 text-amber-800">fr (MPa)</th>
                <th className="p-2.5 text-emerald-800">fc (MPa)</th>
                <th className="p-2.5 text-slate-600">Theo ρ</th>
                <th className="p-2.5 text-slate-600">Fresh ρ</th>
                <th className="p-2.5 text-slate-900">28d ρ</th>
                <th className="p-2.5 text-sky-800">WA (%)</th>
                <th className="p-2.5 text-sky-800">Porosity (%)</th>
                <th className="p-2.5 text-purple-800">Toughness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 bg-white">
              {PHASE_1_DATA.map((row) => {
                const isCenter = row.type.includes('Center');
                const isPeak = row.id === 'S1M1';
                return (
                  <tr 
                    key={row.id} 
                    onClick={() => {
                      setSelectedRun(row);
                      setSliderWb(row.wb);
                      setSliderSb(row.sb);
                    }}
                    className={`cursor-pointer transition-colors ${
                      selectedRun.id === row.id 
                        ? 'bg-emerald-50 text-emerald-950 font-bold' 
                        : isCenter 
                        ? 'bg-slate-50/70 hover:bg-slate-100' 
                        : isPeak 
                        ? 'bg-amber-50/50 hover:bg-amber-100/60' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-2.5 font-bold text-slate-900">{row.id}</td>
                    <td className="p-2.5 text-[10px] text-slate-600">{row.type}</td>
                    <td className="p-2.5">{row.wb.toFixed(3)}</td>
                    <td className="p-2.5">{row.sb.toFixed(2)}</td>
                    <td className="p-2.5 text-amber-800 font-bold">{row.fr.toFixed(2)}</td>
                    <td className="p-2.5 text-emerald-800 font-bold">{row.fc.toFixed(2)}</td>
                    <td className="p-2.5 text-slate-600">{row.theoRho}</td>
                    <td className="p-2.5 text-slate-600">{row.freshRho}</td>
                    <td className="p-2.5 text-slate-900 font-bold">{row.rho28d}</td>
                    <td className="p-2.5 text-sky-800">{row.wa.toFixed(2)}%</td>
                    <td className="p-2.5 text-sky-800 font-bold">{row.porosity.toFixed(2)}%</td>
                    <td className="p-2.5 text-purple-800">{row.toughness.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] text-slate-500 italic font-medium">
          Tip: Click any row to sync the interactive predictor sliders to that physical experimental mix coordinate.
        </div>
      </div>
    </div>
  );
};
