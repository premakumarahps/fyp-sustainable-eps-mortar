import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Table as TableIcon, 
  AlertTriangle
} from 'lucide-react';
import { PHASE_5_FIBER_DATA } from '../core/thesisData.ts';

export const FiberTougheningStudio: React.FC = () => {
  const [selectedFiberIdx, setSelectedFiberIdx] = useState<number>(1); // Index 1 is 0.5% (Global Optimum)

  const currentSample = PHASE_5_FIBER_DATA[selectedFiberIdx];

  return (
    <div className="space-y-8 py-6">
      {/* Studio Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
              Phase 5: Mechanical Toughening & Micro-Fiber Optimization
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Randomly distributed 6 mm monofilament Polypropylene (PP) micro-fibers: resolving handling brittleness and discovering the "fiber balling" threshold
            </p>
          </div>
        </div>
      </div>

      {/* Global Optimum Callout Banner */}
      <div className="p-6 sm:p-8 rounded-2xl border-2 border-emerald-500 bg-gradient-to-r from-emerald-50/80 via-white to-sky-50/80 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold border border-emerald-300 shadow-xs">
                ★ CERTIFIED GLOBAL OPTIMUM: S5M2 (0.5% PP Fiber)
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-heading">
              10% RHA + 20% Coated EPS + 0.5% PP Micro-Fibers
            </h3>
            <p className="text-xs text-slate-700 max-w-3xl leading-relaxed">
              Captures a <strong className="text-slate-900">+10.1% increase in flexural capacity (3.59 MPa)</strong> and a <strong className="text-slate-900">+24.0% increase in handling toughness (18.24 mJ/mm³)</strong>, while safely preserving peak compressive capacity at <strong className="text-slate-900">15.62 MPa</strong> and maintaining a lightweight bulk density of <strong className="text-slate-900">1993 kg/m³</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-mono">Hardened Density</span>
              <div className="text-xl font-black text-sky-700 font-mono">1969 kg/m³</div>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">-13% dead-weight</span>
            </div>
            <div className="text-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-mono">Toughness</span>
              <div className="text-xl font-black text-purple-700 font-mono">18.24 mJ/mm³</div>
              <span className="text-[10px] text-purple-700 font-mono font-bold">+24% fracture energy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Fiber Dosage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dosage Selector & Visual Mechanism Analysis */}
        <div className="lg:col-span-2 materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
              Dosage Escalation: Crack Bridging vs. Fiber Balling
            </h3>
            <span className="text-xs font-mono text-purple-700 font-bold">
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
                      ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-xs font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{sample.sample}</div>
                  <div className={`text-sm font-black font-heading mt-1 ${isOptimum ? 'text-emerald-700' : 'text-purple-700'}`}>
                    {sample.fiber}%
                  </div>
                  {isOptimum && (
                    <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                      Optimum
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Sample Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono shadow-xs">
            <div>
              <span className="text-[10px] text-slate-500">Compressive fc:</span>
              <div className="text-lg font-bold text-emerald-800">{currentSample.fc.toFixed(2)} MPa</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Flexural fr:</span>
              <div className="text-lg font-bold text-amber-800">{currentSample.fr.toFixed(2)} MPa</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Toughness:</span>
              <div className="text-lg font-bold text-purple-800">{currentSample.toughness.toFixed(2)} mJ/mm³</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Apparent Porosity:</span>
              <div className="text-lg font-bold text-sky-800">{currentSample.porosity.toFixed(2)}%</div>
            </div>
          </div>

          {/* Microstructural Behavioral Description */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Microstructural Phase Behavior at {currentSample.fiber}% Fiber Content:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentSample.role}
            </p>
          </div>
        </div>

        {/* Right Col: Discovery of Fiber Balling Limit (Thesis Section 5.6.2) */}
        <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>The "Fiber Balling" Threshold</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            The experimental testing was deliberately pushed to an extreme <strong className="text-slate-900">2.0% dosage (S5M5)</strong> to mathematically confirm that the degradation boundary was genuine rather than an artifact of a narrow test window.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="text-slate-900 font-semibold">Physical Mechanism of Balling:</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Past 0.5% dosage, high concentrations of flexible monofilament fibers tangle together during mixing, creating physical clumps ("fiber balls").
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-800 font-medium">
              <li>Traps macroscopic air bubbles inside the matrix</li>
              <li>Compaction voids escalate apparent porosity to <strong>7.98%</strong></li>
              <li>Compressive strength plummets by <strong>-29.4%</strong> (from 15.62 down to 11.06 MPa)</li>
              <li>At 2.0%, flexural strength drops to 2.89 MPa (below unreinforced control)</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed">
            <strong className="text-emerald-950 font-bold">Conclusion:</strong> 0.5% fiber volume is the strict physical tipping point where crack-bridging gains are captured without inducing structural void penalties.
          </div>
        </div>
      </div>

      {/* Complete Table 32 Data Explorer */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TableIcon className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Table 32: Phase 5 – Mechanical Toughness and Micro-Fiber Optimization
            </h3>
          </div>
          <span className="text-xs text-slate-600 font-mono">Fixed Matrix: 10% RHA + 20% Coated EPS (w/b = 0.425, s/b = 2.25)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden font-mono shadow-xs">
            <thead className="bg-slate-100 text-slate-700 text-[11px] uppercase">
              <tr>
                <th className="p-2.5 border-b border-slate-200">Mix ID</th>
                <th className="p-2.5 border-b border-slate-200 text-purple-800">PP Dosage (v/v %)</th>
                <th className="p-2.5 border-b border-slate-200 text-amber-800">fr (MPa)</th>
                <th className="p-2.5 border-b border-slate-200 text-emerald-800">fc (MPa)</th>
                <th className="p-2.5 border-b border-slate-200 text-slate-500">Theo ρ</th>
                <th className="p-2.5 border-b border-slate-200 text-slate-600">Fresh ρ</th>
                <th className="p-2.5 border-b border-slate-200 text-slate-900">28d ρ</th>
                <th className="p-2.5 border-b border-slate-200 text-sky-800">WA (%)</th>
                <th className="p-2.5 border-b border-slate-200 text-sky-800">Porosity (%)</th>
                <th className="p-2.5 border-b border-slate-200 text-purple-800">Toughness</th>
                <th className="p-2.5 border-b border-slate-200">Structural Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {PHASE_5_FIBER_DATA.map((row, idx) => {
                const isOptimum = idx === 1;
                const isSelected = selectedFiberIdx === idx;
                return (
                  <tr 
                    key={row.sample}
                    onClick={() => setSelectedFiberIdx(idx)}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-purple-100/70 text-purple-950 font-bold' 
                        : isOptimum 
                        ? 'bg-emerald-50 text-emerald-950 font-semibold' 
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <td className="p-2.5 font-bold text-slate-900">{row.sample}</td>
                    <td className="p-2.5 text-purple-800 font-bold">{row.fiber.toFixed(1)}%</td>
                    <td className="p-2.5 text-amber-800 font-bold">{row.fr.toFixed(2)}</td>
                    <td className="p-2.5 text-emerald-800 font-bold">{row.fc.toFixed(2)}</td>
                    <td className="p-2.5 text-slate-500">{row.theoRho}</td>
                    <td className="p-2.5 text-slate-600">{row.freshRho}</td>
                    <td className="p-2.5 text-slate-900 font-bold">{row.rho28d}</td>
                    <td className="p-2.5 text-sky-800">{row.wa.toFixed(2)}%</td>
                    <td className="p-2.5 text-sky-800">{row.porosity.toFixed(2)}%</td>
                    <td className="p-2.5 text-purple-800 font-bold">{row.toughness.toFixed(2)}</td>
                    <td className="p-2.5 text-[11px] font-sans">
                      {isOptimum ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          ★ Global Optimum
                        </span>
                      ) : (
                        <span className="text-slate-600">{row.role.split(':')[0]}</span>
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
