import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  Sparkles, 
  Leaf
} from 'lucide-react';
import { calculateAbsoluteVolumeMix } from '../core/mortarPhysics.ts';

interface MixCalculatorProps {
  triggerConfetti?: () => void;
}

export const MixDesignCalculator: React.FC<MixCalculatorProps> = ({ triggerConfetti }) => {
  const [volumeMode, setVolumeMode] = useState<'m3' | 'prisms'>('m3');
  const [batchVolumeM3, setBatchVolumeM3] = useState<number>(1.0);
  const [wb, setWb] = useState<number>(0.425);
  const [sb, setSb] = useState<number>(2.25);
  const [rhaPct, setRhaPct] = useState<number>(10.0);
  const [epsPct, setEpsPct] = useState<number>(20.0);
  const [ppFiberPct, setPpFiberPct] = useState<number>(0.5);
  const [spDosagePct, setSpDosagePct] = useState<number>(0.8);

  const setPresetOptimum = () => {
    setWb(0.425);
    setSb(2.25);
    setRhaPct(10.0);
    setEpsPct(20.0);
    setPpFiberPct(0.5);
    setSpDosagePct(0.8);
    if (triggerConfetti) triggerConfetti();
  };

  const setPresetControl = () => {
    setWb(0.425);
    setSb(2.25);
    setRhaPct(0.0);
    setEpsPct(0.0);
    setPpFiberPct(0.0);
    setSpDosagePct(0.8);
  };

  // Compute batch outputs via Absolute Volume Method engine
  const batchResult = useMemo(() => {
    return calculateAbsoluteVolumeMix({
      batchVolumeM3,
      wb,
      sb,
      rhaPct,
      epsPct,
      ppFiberPct,
      spDosagePct
    });
  }, [batchVolumeM3, wb, sb, rhaPct, epsPct, ppFiberPct, spDosagePct]);

  return (
    <div className="space-y-8 py-6">
      {/* Engine Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
                Absolute Volume Method: Mix Design & LCA Engine
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Rigorous volumetric batching solver based on Chapter 4 with real-time true-fit regression performance forecasting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={setPresetOptimum}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply Global Optimum (S5M2)</span>
            </button>
            <button
              onClick={setPresetControl}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold tracking-wide transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Control (S2M1)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workbench Grid: Sliders on Left, Batch Outputs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mix Control Sliders (7 Cols) */}
        <div className="lg:col-span-7 materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
              1. Batch Volume & Proportional Factors
            </h3>
            
            {/* Batch Volume Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono">
              <button
                onClick={() => {
                  setVolumeMode('m3');
                  setBatchVolumeM3(1.0);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${volumeMode === 'm3' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                1.0 m³ Plant
              </button>
              <button
                onClick={() => {
                  setVolumeMode('prisms');
                  setBatchVolumeM3(0.00096);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${volumeMode === 'prisms' ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                3 Prisms (0.00096 m³)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Custom Volume Input */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-700 font-mono font-medium">Custom Target Volume:</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  step="0.0001" 
                  min="0.0001" 
                  max="50.0"
                  value={batchVolumeM3}
                  onChange={(e) => setBatchVolumeM3(parseFloat(e.target.value) || 0.0001)}
                  className="w-28 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-right text-xs font-mono text-emerald-800 font-bold focus:border-emerald-600 focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-mono font-semibold">m³</span>
              </div>
            </div>

            {/* Slider 1: w/b */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">Water-to-Binder (w/b):</span>
                <span className="font-bold text-emerald-800">{wb.toFixed(3)}</span>
              </div>
              <input 
                type="range" min="0.35" max="0.50" step="0.005"
                value={wb} onChange={(e) => setWb(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.350 (Stiff)</span>
                <span>0.425 (Optimum Center)</span>
                <span>0.500 (Fluid)</span>
              </div>
            </div>

            {/* Slider 2: s/b */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">Sand-to-Binder (s/b):</span>
                <span className="font-bold text-sky-800">{sb.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="1.50" max="3.00" step="0.05"
                value={sb} onChange={(e) => setSb(parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.50 (Paste-Rich)</span>
                <span>2.25 (Optimum Center)</span>
                <span>3.00 (Aggregate-Lean)</span>
              </div>
            </div>

            {/* Slider 3: RHA % */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">RHA Mass Replacement (% of Binder):</span>
                <span className="font-bold text-amber-800">{rhaPct.toFixed(1)}%</span>
              </div>
              <input 
                type="range" min="0" max="20" step="0.5"
                value={rhaPct} onChange={(e) => setRhaPct(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% (100% OPC)</span>
                <span>10% (Optimum Equilibrium)</span>
                <span>20% (Max Replacement)</span>
              </div>
            </div>

            {/* Slider 4: Coated EPS % */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">Coated EPS Volume Replacement (% of Sand):</span>
                <span className="font-bold text-sky-800">{epsPct.toFixed(1)}%</span>
              </div>
              <input 
                type="range" min="0" max="40" step="1"
                value={epsPct} onChange={(e) => setEpsPct(parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% (Plain Heavy)</span>
                <span>20% (Optimum 1993 kg/m³)</span>
                <span>40% (Extreme Lightweight)</span>
              </div>
            </div>

            {/* Slider 5: PP Micro-Fiber % */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">PP Micro-Fiber Volume Dosage (% v/v):</span>
                <span className="font-bold text-purple-800">{ppFiberPct.toFixed(2)}%</span>
              </div>
              <input 
                type="range" min="0" max="2.0" step="0.1"
                value={ppFiberPct} onChange={(e) => setPpFiberPct(parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.0% (Unreinforced)</span>
                <span>0.5% (Toughening Optimum)</span>
                <span>&gt;1.0% (Fiber Balling Limit)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Absolute Volume Batch Masses & Forecasts (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Theoretical Density & Performance Overview */}
          <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading flex items-center justify-between">
              <span>2. Predicted Performance (28-Day)</span>
              <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">R² &gt; 0.95</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="materials-card p-3.5 bg-slate-50 border border-slate-200 border-l-4 border-l-sky-500 rounded-xl shadow-xs">
                <span className="text-[10px] text-slate-500 font-medium">Fresh Density (ρth)</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {batchResult.theoreticalDensity} <span className="text-xs text-slate-500 font-normal">kg/m³</span>
                </div>
                <div className="text-[10px] text-sky-800 font-bold mt-1">
                  {batchResult.deadWeightSavingsPct}% dead-weight cut
                </div>
              </div>

              <div className="materials-card p-3.5 bg-slate-50 border border-slate-200 border-l-4 border-l-emerald-600 rounded-xl shadow-xs">
                <span className="text-[10px] text-slate-500 font-medium">Compressive (fc)</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {batchResult.predictedFc} <span className="text-xs text-slate-500 font-normal">MPa</span>
                </div>
                <div className="text-[10px] text-emerald-800 font-bold mt-1">
                  Partition limit: &gt;15 MPa
                </div>
              </div>

              <div className="materials-card p-3.5 bg-slate-50 border border-slate-200 border-l-4 border-l-amber-500 rounded-xl shadow-xs">
                <span className="text-[10px] text-slate-500 font-medium">Flexural Yield (fr)</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {batchResult.predictedFr} <span className="text-xs text-slate-500 font-normal">MPa</span>
                </div>
                <div className="text-[10px] text-amber-800 font-bold mt-1">
                  Cracking resistance
                </div>
              </div>

              <div className="materials-card p-3.5 bg-slate-50 border border-slate-200 border-l-4 border-l-purple-600 rounded-xl shadow-xs">
                <span className="text-[10px] text-slate-500 font-medium">Handling Toughness</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {batchResult.predictedToughness} <span className="text-xs text-slate-500 font-normal">mJ/mm³</span>
                </div>
                <div className="text-[10px] text-purple-800 font-bold mt-1">
                  Ductile energy absorption
                </div>
              </div>
            </div>
          </div>

          {/* Exact Batch Masses (Table / Bill of Materials) */}
          <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Exact Constituent Batch Masses
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold">SG_b = {batchResult.compositeSG_b}</span>
            </div>

            <div className="divide-y divide-slate-200 text-xs text-slate-700">
              <div className="py-2 flex justify-between">
                <span>Ordinary Portland Cement (OPC):</span>
                <span className="font-bold text-slate-900">{batchResult.cementMass} kg</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Processed Rice Husk Ash (RHA):</span>
                <span className="font-bold text-amber-800">{batchResult.rhaMass} kg</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Manufactured Sand (M-Sand):</span>
                <span className="font-bold text-sky-800">{batchResult.sandMass} kg</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Coated EPS Beads:</span>
                <span className="font-bold text-sky-800">{batchResult.epsMass} kg ({batchResult.epsVolumeLiters} L)</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Effective Mixing Water:</span>
                <span className="font-bold text-blue-800">{batchResult.waterMass} kg</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>PP Micro-Fibers (6 mm):</span>
                <span className="font-bold text-purple-800">{batchResult.fiberMass} kg ({(batchResult.fiberMass * 1000).toFixed(1)} g)</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Superplasticizer (FAIRFLO S):</span>
                <span className="font-bold text-slate-700">{batchResult.spMass} kg</span>
              </div>
              <div className="py-2.5 flex justify-between text-sm font-bold text-slate-900 bg-slate-100 px-3 rounded-lg mt-1 border border-slate-200">
                <span>Total Batch Mass:</span>
                <span className="text-emerald-800 font-bold">{batchResult.totalMass} kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability & Environmental LCA Card */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Environmental Sustainability & Life Cycle Assessment (LCA)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Quantifying circular agricultural waste valorization and industrial logistics decarbonization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          <div className="materials-card p-5 border border-slate-200 bg-slate-50 rounded-xl space-y-2 shadow-xs">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Clinker Carbon Offset</div>
            <div className="text-2xl font-black text-emerald-800 font-heading">
              {batchResult.co2SavingsKg} <span className="text-xs text-slate-500 font-normal">kg CO₂</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Replacing cement clinker with agricultural RHA prevents direct calcination emissions (~0.82 kg CO₂ avoided per kg cement substituted).
            </p>
          </div>

          <div className="materials-card p-5 border border-slate-200 bg-slate-50 rounded-xl space-y-2 shadow-xs">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Dead-Weight Transport Savings</div>
            <div className="text-2xl font-black text-sky-800 font-heading">
              {batchResult.deadWeightSavingsPct}% <span className="text-xs text-slate-500 font-normal">Lighter</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Reduces trailer axle loads, enables 15% more precast panel payload per freight trip, and scales down mobile crane hoist tonnage.
            </p>
          </div>

          <div className="materials-card p-5 border border-slate-200 bg-slate-50 rounded-xl space-y-2 shadow-xs">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Circular Agricultural Economy</div>
            <div className="text-2xl font-black text-amber-800 font-heading">
              100% <span className="text-xs text-slate-500 font-normal">Localized</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Valorizes abundant agro-waste from Sri Lankan paddy milling hubs, diverting rice husk from polluting open landfills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
