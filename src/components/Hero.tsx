import React from 'react';
import { 
  Award, 
  ArrowRight, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  Microscope,
  FileCheck2,
  Atom,
  Camera
} from 'lucide-react';
import { PROJECT_AUTHORS, PROJECT_METADATA } from '../core/thesisData.ts';
import { TabKey } from './Navbar.tsx';

interface HeroProps {
  setActiveTab: (tab: TabKey) => void;
  triggerConfetti?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, triggerConfetti }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-600/10 via-cyan-600/10 to-amber-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Academic Institutional Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs text-emerald-400 font-mono">
            <Atom className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Materials Science & Engineering · Final Year Research Project</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 font-mono">
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Group 24 · Faculty of Engineering · University of Moratuwa</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4 max-w-5xl">
          Synergistic Effects of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400">Rice Husk Ash</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Polypropylene Fiber</span> on Modified EPS Lightweight Cement Mortar
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl font-normal leading-relaxed mb-6">
          Resolving the precast lightweight concrete paradox: decoupling density reduction from fracture degradation through an engineered ternary synergy of <span className="text-amber-300 font-medium">pozzolanic matrix densification (RHA)</span>, <span className="text-cyan-300 font-medium">PVAc/M-sand core-shell aggregate encapsulation</span>, and <span className="text-purple-300 font-medium">crack-bridging micro-reinforcement (PP fibers)</span> optimized via Response Surface Methodology (CCF).
        </p>

        {/* Investigator Credits Card */}
        <div className="materials-glass p-4 rounded-xl border border-slate-800/80 mb-8 max-w-4xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm">
              HP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {PROJECT_AUTHORS[0].name}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold border border-emerald-500/30">
                  Index: {PROJECT_AUTHORS[0].index}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Lead Contributor
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Co-Investigator: <strong className="text-slate-200">{PROJECT_AUTHORS[1].name}</strong> ({PROJECT_AUTHORS[1].index}) · Supervisor: <strong className="text-slate-200">{PROJECT_AUTHORS[2].name}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (triggerConfetti) triggerConfetti();
                setActiveTab('calculator');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Launch Mix Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('surfaces')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500/50 text-xs font-medium transition-colors"
            >
              <span>3D Surfaces & Contours</span>
            </button>
            <button
              onClick={() => setActiveTab('rawdata')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-mono transition-colors"
            >
              <span>Raw Data (7 CSVs)</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-semibold transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lab Photos (83)</span>
            </button>
          </div>
        </div>

        {/* 5 Core Breakthrough Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Metric 1: Density */}
          <div className="materials-card p-4 border-l-4 border-l-cyan-400">
            <div className="flex items-center justify-between text-xs text-cyan-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Bulk Density</span>
              <Scale className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              1993 <span className="text-xs text-slate-400 font-normal">kg/m³</span>
            </div>
            <div className="text-[11px] text-cyan-300/80 mt-1">
              -13% dead-weight reduction (&lt; 2000 kg/m³ threshold)
            </div>
          </div>

          {/* Metric 2: Compressive Strength */}
          <div className="materials-card p-4 border-l-4 border-l-emerald-400">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Compressive Yield</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              15.62 <span className="text-xs text-slate-400 font-normal">MPa</span>
            </div>
            <div className="text-[11px] text-emerald-300/80 mt-1">
              Robust load-bearing partition capacity (28-day)
            </div>
          </div>

          {/* Metric 3: Flexural Strength */}
          <div className="materials-card p-4 border-l-4 border-l-amber-400">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Flexural Strength</span>
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              3.59 <span className="text-xs text-slate-400 font-normal">MPa</span>
            </div>
            <div className="text-[11px] text-amber-300/80 mt-1">
              +10.1% increase over unreinforced pozzolanic baseline
            </div>
          </div>

          {/* Metric 4: Fracture Toughness */}
          <div className="materials-card p-4 border-l-4 border-l-purple-400">
            <div className="flex items-center justify-between text-xs text-purple-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Handling Toughness</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              18.24 <span className="text-xs text-slate-400 font-normal">mJ/mm³</span>
            </div>
            <div className="text-[11px] text-purple-300/80 mt-1">
              +24.0% surge in post-cracking fracture energy
            </div>
          </div>

          {/* Metric 5: ITZ Ca/Si Stoichiometry */}
          <div className="materials-card p-4 border-l-4 border-l-emerald-500 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">ITZ Ca/Si Ratio</span>
              <Microscope className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              5.65 <span className="text-xs text-slate-400 font-normal">(vs 24.85)</span>
            </div>
            <div className="text-[11px] text-emerald-300/80 mt-1">
              -77.3% reduction: weak Portlandite → dense C-S-H
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
