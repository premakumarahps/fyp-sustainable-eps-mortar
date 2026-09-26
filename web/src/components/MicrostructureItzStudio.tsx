import React, { useState } from 'react';
import { 
  Microscope, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity,
  Maximize2
} from 'lucide-react';
import { PHASE_3_ITZ_DATA, PHASE_4_COATING_DATA } from '../core/thesisData.ts';
import { MathView } from './MathView.tsx';

export const MicrostructureItzStudio: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <div className="space-y-8 py-6">
      {/* Studio Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Phase 3 & 4: ITZ Nanomechanics & Core-Shell Encapsulation
            </h2>
            <p className="text-xs text-slate-400">
              Scanning Electron Microscopy (SEM), Energy Dispersive X-Ray Spectroscopy (EDS) elemental mapping, and physical mechanical interlocking
            </p>
          </div>
        </div>
      </div>

      {/* Phase 3: SEM-EDS Interfacial Chemical Healing Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Before/After ITZ Slider & Micrograph Showcase */}
        <div className="lg:col-span-2 materials-glass p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                Phase 3: Diagnostic Mapping
              </span>
              <h3 className="text-base font-bold text-white font-heading">
                Interfacial Transition Zone: Portlandite vs C-S-H Phase Transformation
              </h3>
            </div>
            <button
              onClick={() => setModalImage('/figures/thesis_rendered_page_128.png')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full SEM</span>
            </button>
          </div>

          {/* Interactive Split-Screen Comparison Component */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 select-none">
            {/* Background: Healed ITZ with RHA (S3M2) */}
            <div className="absolute inset-0">
              <img 
                src="/figures/thesis_rendered_page_128.png" 
                alt="Healed Pozzolanic ITZ with CSH" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
                S3M2: With 20% RHA · Ca/Si = 5.65 (Dense C-S-H Gel)
              </div>
            </div>

            {/* Foreground: Unhealed ITZ without RHA (S3M1) - Clipped by Slider */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${sliderPos}%` }}
            >
              <img 
                src="/figures/thesis_rendered_page_110.png" 
                alt="Unhealed Weak ITZ with Portlandite" 
                className="w-full h-full object-cover max-w-none" 
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 border border-rose-500/40 text-[11px] font-mono text-rose-400">
                S3M1: 0% RHA · Ca/Si = 24.85 (Porous Portlandite)
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-md">
                ↔
              </div>
            </div>

            {/* Invisible Range Input for Dragging */}
            <input 
              type="range" 
              min="5" 
              max="95" 
              value={sliderPos}
              onChange={(e) => setSliderPos(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
            />
          </div>

          <p className="text-xs text-slate-400 italic text-center">
            Drag the slider horizontally to compare the unhealed boundary gap (left) against the pozzolanically welded C-S-H matrix (right).
          </p>

          {/* Table 30: EDS Elemental Quantification Comparison */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-900/90 text-slate-300 text-[11px] uppercase">
                <tr>
                  <th className="p-2.5 border-b border-slate-800">Mix Formulation</th>
                  <th className="p-2.5 border-b border-slate-800">EPS Vol %</th>
                  <th className="p-2.5 border-b border-slate-800">RHA Mass %</th>
                  <th className="p-2.5 border-b border-slate-800 text-rose-400">Avg. Ca (at.%)</th>
                  <th className="p-2.5 border-b border-slate-800 text-cyan-400">Avg. Si (at.%)</th>
                  <th className="p-2.5 border-b border-slate-800 text-emerald-400">Ca/Si Ratio</th>
                  <th className="p-2.5 border-b border-slate-800">ITZ Microstructure State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {PHASE_3_ITZ_DATA.map((row) => {
                  const isPozzolanic = row.rha > 0;
                  return (
                    <tr key={row.sample} className={isPozzolanic ? "bg-emerald-500/10 font-semibold text-emerald-200" : "bg-rose-500/5 text-rose-200"}>
                      <td className="p-2.5 font-bold text-white">{row.sample}</td>
                      <td className="p-2.5">{row.eps}%</td>
                      <td className="p-2.5">{row.rha}%</td>
                      <td className="p-2.5 text-rose-400">{row.caAt}%</td>
                      <td className="p-2.5 text-cyan-400">{row.siAt}%</td>
                      <td className="p-2.5 text-emerald-400 font-bold text-sm">
                        {row.casiRatio} <span className="text-[10px] text-slate-400 font-normal">± {row.stdDev}</span>
                      </td>
                      <td className="p-2.5 text-[11px] font-sans text-slate-300">{row.state}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Chemical Reaction Mechanism & Micro-Kinetics */}
        <div className="materials-glass p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Chemical Welding Kinetics</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Energy Dispersive X-Ray Spectroscopy (EDS) diagnostic mapping across 3 spatial locations confirms that RHA induces a <strong className="text-emerald-400">-77.3% drop in Ca/Si ratio</strong> (24.85 down to 5.65).
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400 font-mono">Secondary Hydration Reaction:</div>
              <div className="text-xs text-amber-300 font-mono">
                <MathView math="\text{Ca(OH)}_2 + \text{SiO}_2 \to \text{C-S-H}" block />
              </div>
              <div className="text-[11px] text-slate-400">
                Consumes large, plate-like Portlandite crystals and seals the micro-capillary void gap between aggregate and matrix.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="font-semibold text-white">Statistical Standard Deviation:</div>
              <p className="text-[11px] text-slate-400">
                S3M1 scatter: <strong>± 2.70</strong> (chaotic accumulation of weak crystals).<br/>
                S3M2 scatter: <strong>± 0.39</strong> (tight, uniform C-S-H gel distribution).
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300">
            <strong>Materials Science Validation:</strong> Direct empirical proof of interfacial densification, providing the micro-foundation for the macro-strength recovery.
          </div>
        </div>
      </div>

      {/* Phase 4: Physical Core-Shell Encapsulation & Mechanical Recovery (Table 31) */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
              Phase 4: Physical Core-Shell Encapsulation & Mechanical Recovery (Table 31)
            </h3>
            <p className="text-xs text-slate-400">
              PVAc polymer emulsion + Manufactured Sand encrustation: neutralizing aggregate buoyancy and enforcing mechanical interlocking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASE_4_COATING_DATA.map((item) => {
            const isCoated = item.state === "Coated";
            return (
              <div 
                key={item.sample} 
                className={`materials-card p-5 border ${
                  isCoated ? 'border-cyan-500/40 bg-cyan-950/15' : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-white">{item.sample}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isCoated ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.eps} EPS · {item.state}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">Compressive (fc):</span>
                    <div className="text-lg font-bold text-white font-mono">
                      {item.fc.toFixed(2)} MPa 
                      {item.fcGain !== "0%" && (
                        <span className="text-xs text-emerald-400 font-bold ml-2">{item.fcGain}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">Flexural (fr):</span>
                    <div className="text-base font-bold text-amber-300 font-mono">
                      {item.fr.toFixed(2)} MPa
                      {item.frGain !== "0%" && (
                        <span className="text-xs text-emerald-400 font-bold ml-2">{item.frGain}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Breakthrough Comparison Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              20% EPS Replacement Threshold
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying the PVAc/M-sand coating increased compressive strength from <strong>10.15 MPa to 13.85 MPa (+36.45%)</strong>, while flexural strength jumped from <strong>2.10 MPa to 3.45 MPa (+64.29%)</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              40% Extreme Lightweight Rescue
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              At extreme 40% EPS volume, coating recovered compressive capacity from <strong>4.20 MPa up to 7.15 MPa (+70.24%)</strong>, and nearly doubled flexural strength from <strong>0.95 MPa to 1.85 MPa (+94.74%)</strong>, rescuing the composite from total collapse!
            </p>
          </div>
        </div>
      </div>

      {/* Modal for full resolution view */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-2">
            <img src={modalImage} alt="Expanded SEM" className="w-full h-full object-contain max-h-[85vh] rounded-xl" />
            <div className="text-center text-xs text-slate-400 py-2">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};
