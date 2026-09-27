import React, { useState } from 'react';
import { 
  Activity, 
  Scale, 
  Sparkles, 
  Table as TableIcon, 
  Sliders, 
  AlertCircle,
  TrendingDown,
  CheckCircle2
} from 'lucide-react';
import { PHASE_2_DATA, Phase2Run } from '../core/thesisData.ts';
import { MathView } from './MathView.tsx';

type Phase2Var = 'fc' | 'fr' | 'porosity' | 'toughness';

export const Phase2CompositeStudio: React.FC = () => {
  const [activeVar, setActiveVar] = useState<Phase2Var>('fc');
  const [sliderRha, setSliderRha] = useState<number>(10);
  const [sliderEps, setSliderEps] = useState<number>(20);
  const [selectedRun, setSelectedRun] = useState<Phase2Run>(PHASE_2_DATA[8]); // Center point S2M9

  // Phase 2 True-Fit Regression Models (Thesis Section 5.3.4)
  const calcFr = (r: number, e: number) => 4.74 + 0.12*r - 0.11*e - 0.005*(r**2) + 0.001*(e**2) - 0.001*(r*e);
  const calcFc = (r: number, e: number) => 35.58 + 2.05*r - 1.25*e - 0.07*(r**2) + 0.01*(e**2) - 0.015*(r*e);
  const calcT = (r: number, e: number) => 35.47 + 0.25*r - 1.10*e - 0.02*(r**2) + 0.006*(e**2) - 0.004*(r*e);
  const calcP = (r: number, e: number) => 6.33 - 0.176*r + 0.042*e + 0.0097*(r**2) + 0.00011*(e**2) - 0.00108*(r*e);

  const predicted = {
    fc: Math.max(1.0, calcFc(sliderRha, sliderEps)),
    fr: Math.max(0.5, calcFr(sliderRha, sliderEps)),
    toughness: Math.max(1.0, calcT(sliderRha, sliderEps)),
    porosity: Math.max(3.0, calcP(sliderRha, sliderEps)),
  };

  const meta = {
    fc: {
      name: "Compressive Strength (fc)",
      unit: "MPa",
      color: "text-emerald-400",
      formula: "f_c = 35.58 + 2.05(RHA) - 1.25(EPS) - 0.07(RHA)^2 + 0.01(EPS)^2 - 0.015(RHA \\cdot EPS)",
      fVal: "52.14",
      pVal: "0.0003",
      r2: "0.981"
    },
    fr: {
      name: "Flexural Strength (fr)",
      unit: "MPa",
      color: "text-amber-400",
      formula: "f_r = 4.74 + 0.12(RHA) - 0.11(EPS) - 0.005(RHA)^2 + 0.001(EPS)^2 - 0.001(RHA \\cdot EPS)",
      fVal: "46.88",
      pVal: "0.0004",
      r2: "0.978"
    },
    toughness: {
      name: "Structural Toughness (T)",
      unit: "mJ/mm³",
      color: "text-purple-400",
      formula: "T = 35.47 + 0.25(RHA) - 1.10(EPS) - 0.02(RHA)^2 + 0.006(EPS)^2 - 0.004(RHA \\cdot EPS)",
      fVal: "61.20",
      pVal: "0.0002",
      r2: "0.993"
    },
    porosity: {
      name: "Apparent Porosity",
      unit: "%",
      color: "text-cyan-400",
      formula: "\\text{Porosity} = 6.33 - 0.176(RHA) + 0.042(EPS) + 0.0097(RHA)^2 + 0.00011(EPS)^2 - 0.00108(RHA \\cdot EPS)",
      fVal: "41.50",
      pVal: "0.0005",
      r2: "0.886"
    }
  };

  const curMeta = meta[activeVar];

  return (
    <div className="space-y-8 py-6">
      {/* Studio Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Phase 2: Modified Lightweight Composite (RHA × EPS)
            </h2>
            <p className="text-xs text-slate-400">
              Statistical interaction modeling of chemical pozzolanic densification vs physical polymer void inclusion (Baseline locked: w/b = 0.425, s/b = 2.25)
            </p>
          </div>
        </div>

        {/* Response Selector */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
          {(Object.keys(meta) as Phase2Var[]).map((vKey) => {
            const isSelected = activeVar === vKey;
            const item = meta[vKey];
            return (
              <button
                key={vKey}
                onClick={() => setActiveVar(vKey)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Dual-Slider Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 materials-glass p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Interactive Ternary Workspace Predictor
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              R² = {curMeta.r2} · F = {curMeta.fVal} (p = {curMeta.pVal})
            </span>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono">
                <span>RHA Mass Replacement</span>
                <span className="font-bold text-amber-400">{sliderRha.toFixed(1)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="0.5"
                value={sliderRha} 
                onChange={(e) => setSliderRha(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0% (Control)</span>
                <span>10% (Optimum)</span>
                <span>20% (Max SCM)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono">
                <span>Coated EPS Volume Replacement</span>
                <span className="font-bold text-cyan-400">{sliderEps.toFixed(1)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="40" 
                step="1"
                value={sliderEps} 
                onChange={(e) => setSliderEps(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0% (Dense)</span>
                <span>20% (Optimum)</span>
                <span>40% (Extreme LW)</span>
              </div>
            </div>
          </div>

          {/* Real-Time Predicted Performance Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="materials-card p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Compressive (fc)</span>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                {predicted.fc.toFixed(2)} <span className="text-xs text-slate-400">MPa</span>
              </div>
            </div>

            <div className="materials-card p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Flexural (fr)</span>
              <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                {predicted.fr.toFixed(2)} <span className="text-xs text-slate-400">MPa</span>
              </div>
            </div>

            <div className="materials-card p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Apparent Porosity</span>
              <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">
                {predicted.porosity.toFixed(2)} <span className="text-xs text-slate-400">%</span>
              </div>
            </div>

            <div className="materials-card p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Toughness (T)</span>
              <div className="text-lg font-bold text-purple-400 font-mono mt-0.5">
                {predicted.toughness.toFixed(2)} <span className="text-xs text-slate-400">mJ/mm³</span>
              </div>
            </div>
          </div>

          {/* Model Formula */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-mono">
              Thesis True-Fit Response Surface Equation (Section 5.3.4):
            </div>
            <div className="text-xs text-cyan-300 font-mono overflow-x-auto py-1">
              <MathView math={curMeta.formula} block />
            </div>
          </div>
        </div>

        {/* Right Col: Antagonistic Interaction Analysis */}
        <div className="materials-glass p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>The Antagonistic (RHA × EPS) Interaction</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            In the regression equation for compressive strength, the interaction coefficient for <MathView math="(RHA \cdot EPS)" /> is negative (<strong className="text-rose-400">-0.015</strong>, p = 0.0292).
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-200 font-semibold">Microstructural Meaning:</div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
              <li>
                <strong className="text-amber-300">At low EPS (0% - 20%):</strong> RHA aggressively densifies the continuous cement skeleton, driving strength upward (35.58 → 47.68 MPa).
              </li>
              <li>
                <strong className="text-rose-400">At high EPS (40%):</strong> The mineral skeleton is physically severed by soft compressible polymer spheres. Mix S2M3 (0% RHA) collapses to 4.38 MPa, and adding 20% RHA (S2M4) yields 4.29 MPa.
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-300">
            <strong>Key Conclusion:</strong> Pozzolanic healing is structurally powerless if the mineral skeleton is physically broken by excessive voids. <strong>20% EPS is the absolute boundary limit.</strong>
          </div>
        </div>
      </div>

      {/* Complete Phase 2 CCF Data Table (Table 27 & 28) */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TableIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              Table 27 & 28: Phase 2 CCF Consolidated Experimental Results
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">11 Modified Lightweight Formulations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-900/90 text-slate-300 text-[11px] uppercase">
              <tr>
                <th className="p-2.5 border-b border-slate-800">Mix ID</th>
                <th className="p-2.5 border-b border-slate-800">Run Type</th>
                <th className="p-2.5 border-b border-slate-800 text-amber-300">RHA (%)</th>
                <th className="p-2.5 border-b border-slate-800 text-cyan-300">EPS,c (%)</th>
                <th className="p-2.5 border-b border-slate-800 text-amber-300">fr (MPa)</th>
                <th className="p-2.5 border-b border-slate-800 text-emerald-300">fc (MPa)</th>
                <th className="p-2.5 border-b border-slate-800 text-slate-400">Theo ρ</th>
                <th className="p-2.5 border-b border-slate-800 text-slate-300">Fresh ρ</th>
                <th className="p-2.5 border-b border-slate-800 text-white">28d ρ</th>
                <th className="p-2.5 border-b border-slate-800 text-cyan-300">WA (%)</th>
                <th className="p-2.5 border-b border-slate-800 text-cyan-400">Porosity (%)</th>
                <th className="p-2.5 border-b border-slate-800 text-purple-300">Toughness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {PHASE_2_DATA.map((row) => {
                const isCenter = row.type.includes('Center');
                const isExtreme = row.eps === 40;
                return (
                  <tr 
                    key={row.id} 
                    onClick={() => {
                      setSelectedRun(row);
                      setSliderRha(row.rha);
                      setSliderEps(row.eps);
                    }}
                    className={`cursor-pointer transition-colors ${
                      selectedRun.id === row.id 
                        ? 'bg-cyan-500/15 font-semibold text-white' 
                        : isCenter 
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-300' 
                        : isExtreme 
                        ? 'bg-rose-500/5 hover:bg-rose-500/10 text-rose-300' 
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="p-2.5 font-bold text-white">{row.id}</td>
                    <td className="p-2.5 text-[10px] text-slate-400">{row.type}</td>
                    <td className="p-2.5 text-amber-300 font-bold">{row.rha}%</td>
                    <td className="p-2.5 text-cyan-300 font-bold">{row.eps}%</td>
                    <td className="p-2.5 text-amber-300 font-bold">{row.fr.toFixed(2)}</td>
                    <td className="p-2.5 text-emerald-400 font-bold">{row.fc.toFixed(2)}</td>
                    <td className="p-2.5 text-slate-400">{row.theoRho}</td>
                    <td className="p-2.5 text-slate-300">{row.freshRho}</td>
                    <td className="p-2.5 text-white font-bold">{row.rho28d}</td>
                    <td className="p-2.5 text-cyan-300">{row.wa.toFixed(2)}%</td>
                    <td className="p-2.5 text-cyan-400 font-bold">{row.porosity.toFixed(2)}%</td>
                    <td className="p-2.5 text-purple-300">{row.toughness.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
