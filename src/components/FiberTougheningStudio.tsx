import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Table as TableIcon, 
  Award,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { PHASE_5_FIBER_DATA } from '../core/thesisData.ts';
import { MathView } from './MathView.tsx';

export const FiberTougheningStudio: React.FC = () => {
  const [selectedFiberIdx, setSelectedFiberIdx] = useState<number>(1); // Index 1 is 0.5% (Global Optimum)

  const currentSample = PHASE_5_FIBER_DATA[selectedFiberIdx];

  return (
    <div className="space-y-8 py-6">
      {/* Studio Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Phase 5: Mechanical Toughening & Micro-Fiber Optimization
            </h2>
            <p className="text-xs text-slate-400">
              Randomly distributed 6 mm monofilament Polypropylene (PP) micro-fibers: resolving handling brittleness and discovering the "fiber balling" threshold
            </p>
          </div>
        </div>
      </div>

      {/* Global Optimum Callout Banner */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-cyan-950/20 csh-glow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                ★ CERTIFIED GLOBAL OPTIMUM: S5M2 (0.5% PP Fiber)
              </span>
            </div>
            <h3 className="text-2xl font-black text-white font-heading">
              10% RHA + 20% Coated EPS + 0.5% PP Micro-Fibers
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Captures a <strong>+10.1% increase in flexural capacity (3.59 MPa)</strong> and a <strong>+24.0% increase in handling toughness (18.24 mJ/mm³)</strong>, while safely preserving peak compressive capacity at <strong>15.62 MPa</strong> and maintaining a lightweight bulk density of <strong>1993 kg/m³</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Hardened Density</span>
              <div className="text-xl font-black text-cyan-400 font-mono">1969 kg/m³</div>
              <span className="text-[10px] text-emerald-400 font-mono">-13% dead-weight</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Toughness</span>
              <div className="text-xl font-black text-purple-400 font-mono">18.24 mJ/mm³</div>
              <span className="text-[10px] text-purple-400 font-mono">+24% fracture energy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Fiber Dosage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dosage Selector & Visual Mechanism Analysis */}
        <div className="lg:col-span-2 materials-glass p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Dosage Escalation: Crack Bridging vs. Fiber Balling
            </h3>
            <span className="text-xs font-mono text-purple-400">
              Dosage: {currentSample.fiber}% (v/v)
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-5 gap-2">
            {PHASE_5_FIBER_DATA.map((sample, idx) => {
              const isSelected = selectedFiberIdx === idx;
              const isOptimum = idx === 1;
              return (
                <button
                  key={sample.sample}
                  onClick={() => setSelectedFiberIdx(idx)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/30 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{sample.sample}</div>
                  <div className={`text-sm font-black font-heading mt-1 ${isOptimum ? 'text-emerald-400' : 'text-purple-300'}`}>
                    {sample.fiber}%
                  </div>
                  {isOptimum && (
                    <span className="inline-block mt-1 text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      Optimum
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Sample Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono">
            <div>
              <span className="text-[10px] text-slate-400">Compressive fc:</span>
              <div className="text-lg font-bold text-emerald-400">{currentSample.fc.toFixed(2)} MPa</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Flexural fr:</span>
              <div className="text-lg font-bold text-amber-300">{currentSample.fr.toFixed(2)} MPa</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Toughness:</span>
              <div className="text-lg font-bold text-purple-400">{currentSample.toughness.toFixed(2)} mJ/mm³</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Apparent Porosity:</span>
              <div className="text-lg font-bold text-cyan-400">{currentSample.porosity.toFixed(2)}%</div>
            </div>
          </div>

          {/* Microstructural Behavioral Description */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Microstructural Phase Behavior at {currentSample.fiber}% Fiber Content:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentSample.role}
            </p>
          </div>
        </div>

        {/* Right Col: Discovery of Fiber Balling Limit (Thesis Section 5.6.2) */}
        <div className="materials-glass p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>The "Fiber Balling" Threshold</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The experimental testing was deliberately pushed to an extreme <strong>2.0% dosage (S5M5)</strong> to mathematically confirm that the degradation boundary was genuine rather than an artifact of a narrow test window.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-200 font-semibold">Physical Mechanism of Balling:</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Past 0.5% dosage, high concentrations of flexible monofilament fibers tangle together during mixing, creating physical clumps ("fiber balls").
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-300/90">
              <li>Traps macroscopic air bubbles inside the matrix</li>
              <li>Compaction voids escalate apparent porosity to <strong>7.98%</strong></li>
              <li>Compressive strength plummets by <strong>-29.4%</strong> (from 15.62 down to 11.06 MPa)</li>
              <li>At 2.0%, flexural strength drops to 2.89 MPa (below unreinforced control)</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300">
            <strong>Conclusion:</strong> 0.5% fiber volume is the strict physical tipping point where crack-bridging gains are captured without inducing structural void penalties.
          </div>
        </div>
      </div>

      {/* Complete Table 32 Data Explorer */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TableIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              Table 32: Phase 5 – Mechanical Toughness and Micro-Fiber Optimization
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Fixed Matrix: 10% RHA + 20% Coated EPS (w/b = 0.425, s/b = 2.25)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-900/90 text-slate-300 text-[11px] uppercase">
              <tr>
                <th className="p-2.5 border-b border-slate-800">Mix ID</th>
                <th className="p-2.5 border-b border-slate-800 text-purple-300">PP Dosage (v/v %)</th>
                <th className="p-2.5 border-b border-slate-800 text-amber-300">fr (MPa)</th>
                <th className="p-2.5 border-b border-slate-800 text-emerald-300">fc (MPa)</th>
                <th className="p-2.5 border-b border-slate-800 text-slate-400">Theo ρ</th>
                <th className="p-2.5 border-b border-slate-800 text-slate-300">Fresh ρ</th>
                <th className="p-2.5 border-b border-slate-800 text-white">28d ρ</th>
                <th className="p-2.5 border-b border-slate-800 text-cyan-300">WA (%)</th>
                <th className="p-2.5 border-b border-slate-800 text-cyan-400">Porosity (%)</th>
                <th className="p-2.5 border-b border-slate-800 text-purple-300">Toughness</th>
                <th className="p-2.5 border-b border-slate-800">Structural Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {PHASE_5_FIBER_DATA.map((row, idx) => {
                const isOptimum = idx === 1;
                const isSelected = selectedFiberIdx === idx;
                return (
                  <tr 
                    key={row.sample}
                    onClick={() => setSelectedFiberIdx(idx)}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-purple-500/20 text-white font-bold' 
                        : isOptimum 
                        ? 'bg-emerald-500/10 text-emerald-300 font-semibold' 
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="p-2.5 font-bold text-white">{row.sample}</td>
                    <td className="p-2.5 text-purple-300 font-bold">{row.fiber.toFixed(1)}%</td>
                    <td className="p-2.5 text-amber-300 font-bold">{row.fr.toFixed(2)}</td>
                    <td className="p-2.5 text-emerald-400 font-bold">{row.fc.toFixed(2)}</td>
                    <td className="p-2.5 text-slate-400">{row.theoRho}</td>
                    <td className="p-2.5 text-slate-300">{row.freshRho}</td>
                    <td className="p-2.5 text-white font-bold">{row.rho28d}</td>
                    <td className="p-2.5 text-cyan-300">{row.wa.toFixed(2)}%</td>
                    <td className="p-2.5 text-cyan-400">{row.porosity.toFixed(2)}%</td>
                    <td className="p-2.5 text-purple-300 font-bold">{row.toughness.toFixed(2)}</td>
                    <td className="p-2.5 text-[11px] font-sans">
                      {isOptimum ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                          ★ Global Optimum
                        </span>
                      ) : (
                        <span className="text-slate-400">{row.role.split(':')[0]}</span>
                      )}
                    </td>
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
