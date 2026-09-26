import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Truck,
  Box,
  Binary,
  Target
} from 'lucide-react';
import { MathView } from './MathView.tsx';
import { TabKey } from './Navbar.tsx';

interface OverviewSectionProps {
  setActiveTab: (tab: TabKey) => void;
}

export const OverviewParadoxSection: React.FC<OverviewSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-10 py-6">
      {/* 1. The Precast Concrete Dead-Weight Dilemma */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              1. The Industrial Precast Paradox & Logistics Crisis
            </h2>
            <p className="text-xs text-slate-400">
              The conflict between factory prefabrication productivity and self-weight handling limitations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <p>
              In rapid urban high-rise development across developing Asian economies like Sri Lanka, construction is shifting away from labor-intensive, in-situ wet plastering toward <strong>factory-controlled off-site prefabrication (OSC)</strong>. Prefabricated non-load-bearing wall panels provide superior dimensional accuracy, factory curing control, and instantaneous dry mechanical anchoring on site.
            </p>
            <p>
              However, conventional cement mortars and fine concretes have a dense bulk density of <strong className="text-white">2200 to 2400 kg/m³</strong>. When cast into large-format architectural wall panels (e.g. 2.4 m × 1.2 m), this massive dead-weight burdens the logistics chain: requiring heavy-duty mobile cranes, specialized flat-bed freight, and escalating transport costs.
            </p>
          </div>

          <div className="materials-card p-5 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs tracking-wider uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>The Early-Age Handling Crisis (12–24 Hours)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              During the critical early-age production cycle (demolding, vertical stripping, crane lifting, and transit), precast elements have not yet achieved their mature tensile strength. Heavy self-weight induces localized bending moments and internal stress concentrations.
            </p>
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-xs text-rose-300 space-y-1">
              <div className="font-semibold">Unacceptable Failure Modes:</div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-200/90">
                <li>Corner chipping and boundary cleavage during vertical mold release</li>
                <li>Premature plastic shrinkage cracking and macro-shear failure during flatbed transit</li>
                <li>High lifting crane capacity requirements driving up structural overhead</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Microstructural Breakdown: Why Raw EPS Substitution Fails */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              2. The Microstructural "Wall Effect" & ITZ Failure Deficit
            </h2>
            <p className="text-xs text-slate-400">
              Why simply dumping raw Expanded Polystyrene beads into concrete ruins mechanical integrity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="materials-card p-5 border-l-4 border-l-rose-500 space-y-3">
            <div className="text-rose-400 font-bold text-sm">Defect 1: Hydrophobic "Wall Effect"</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Raw EPS beads possess an ultra-smooth, chemically inert, and strongly hydrophobic polymer surface energy. When mixed into hydrophilic Portland cement paste, it repels free mixing water, creating a fluid pocket around each sphere.
            </p>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900/80 p-2 rounded border border-slate-800">
              Microstructural air gap &gt; 15 µm between bead and paste
            </div>
          </div>

          <div className="materials-card p-5 border-l-4 border-l-amber-500 space-y-3">
            <div className="text-amber-400 font-bold text-sm">Defect 2: Portlandite Orientation</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The water-rich boundary encourages the preferential precipitation of massive, weak, hexagonal plate-like Calcium Hydroxide <MathView math="\text{Ca(OH)}_2" /> (Portlandite) crystals oriented parallel to the bead surface, creating pre-formed failure cleavage planes.
            </p>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900/80 p-2 rounded border border-slate-800">
              Baseline ITZ Ca/Si atomic ratio = 24.85 (severely deficient)
            </div>
          </div>

          <div className="materials-card p-5 border-l-4 border-l-cyan-500 space-y-3">
            <div className="text-cyan-400 font-bold text-sm">Defect 3: Extreme Buoyancy Flotation</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Raw EPS has a bulk density of only 14–16 kg/m³ (SG ≈ 0.015), over 150 times lighter than the wet cement paste (≈2300 kg/m³). During standard compaction, buoyant forces cause severe aggregate segregation, bleeding, and surface foaming.
            </p>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900/80 p-2 rounded border border-slate-800">
              Catastrophic compressive collapse: 4.20 MPa at 40% EPS
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Ternary Synergistic Framework */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              3. The Ternary Synergistic Architecture
            </h2>
            <p className="text-xs text-slate-400">
              Three complementary mechanisms working in physical, chemical, and mechanical harmony
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1: Chemical Healing */}
          <div className="materials-card p-6 border-t-4 border-t-amber-400 relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Phase 1: Chemical Healing
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Ball-Milled Rice Husk Ash (RHA)</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Thermally activated micro-silica (93.8% pozzolanic activity) drives a secondary pozzolanic reaction:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-amber-300 font-mono mb-3">
              <MathView math="\text{Ca(OH)}_2 + \text{SiO}_2 + \text{H}_2\text{O} \to \text{C-S-H Gel}" block />
            </div>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Consumes weak leachable Portlandite</li>
              <li>Precipitates dense, load-bearing C-S-H gel</li>
              <li>Reduces ITZ Ca/Si atomic ratio by <strong className="text-amber-300">-77.3%</strong></li>
            </ul>
          </div>

          {/* Phase 2: Physical Interlocking */}
          <div className="materials-card p-6 border-t-4 border-t-cyan-400 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                Phase 2: Physical Anchoring
              </span>
              <Box className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">PVAc / M-Sand Core-Shell EPS</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Pre-encapsulating EPS beads with a water-insoluble polymer binder encrusted with fine manufactured sand:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 font-mono mb-3">
              <MathView math="\text{SG}_{\text{EPS,c}} = 0.150 \quad (+1000\% \text{ vs Raw})" block />
            </div>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Neutralizes aggregate buoyancy during vibration</li>
              <li>Eliminates the geometric "wall effect"</li>
              <li>Recovers <strong className="text-cyan-300">+70.2% compressive capacity</strong> at 40% EPS</li>
            </ul>
          </div>

          {/* Phase 3: Mechanical Toughening */}
          <div className="materials-card p-6 border-t-4 border-t-purple-400 relative overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                Phase 3: Mechanical Web
              </span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">PP Micro-Fiber Crack Bridging</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Discontinuous 6 mm monofilament Polypropylene micro-fibers form a 3D internal reinforcing web:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-purple-300 font-mono mb-3">
              <MathView math="V_f = 0.5\% \implies +24\% \text{ Toughness}" block />
            </div>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Arrests micro-crack propagation across void fronts</li>
              <li>Prevents catastrophic brittle shearing</li>
              <li>Preserves 15.62 MPa compressive strength</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Research Objectives & Methodology Scope */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              4. Research Objectives & Empirical Boundary Scope
            </h2>
            <p className="text-xs text-slate-400">
              Rigorous scientific targets fulfilled across the 149-page thesis investigation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="materials-card p-5 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Objective 1: Multi-Phase Synergistic Quantification</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To systematically isolate and quantify the independent and interactive contributions of ball-milled RHA, PVAc core-shell EPS coating, and PP micro-fiber dosage on mortar density, compressive yield, flexural strength, apparent porosity, and handling toughness.
            </p>
            <div className="text-[11px] text-emerald-400/90 font-mono">
              Status: 100% Satisfied via dual-phase CCF and analytical SEM-EDS diagnostics.
            </div>
          </div>

          <div className="materials-card p-5 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Objective 2: Industrial Design Methodology & Models</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To deliver a generalizable, physics-grounded mathematical design framework based on Response Surface Methodology (RSM) with true-fit quadratic regression models (<MathView math="R^2 > 0.95" />), providing local Sri Lankan precast engineers with calibrated batching algorithms.
            </p>
            <div className="text-[11px] text-cyan-400/90 font-mono">
              Status: 100% Delivered and packaged into the interactive Mix Engine.
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-300">
            Ready to explore the scientific breakdown of each constituent material?
          </div>
          <button
            onClick={() => setActiveTab('materials')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold tracking-wide transition-all"
          >
            <span>Proceed to Raw Materials Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
