import React, { useState } from 'react';
import { 
  Award, 
  ArrowRight, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  Microscope,
  FileCheck2,
  Atom,
  Camera,
  Activity,
  Zap,
  TrendingUp,
  Leaf,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { PROJECT_AUTHORS, PROJECT_METADATA } from '../core/thesisData.ts';
import { TabKey } from './Navbar.tsx';

interface HeroProps {
  setActiveTab: (tab: TabKey) => void;
  triggerConfetti?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, triggerConfetti }) => {
  const [activeViewMode, setActiveViewMode] = useState<'infographic' | 'radar'>('infographic');
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      title: "Dense C-S-H Gel ITZ Welding",
      desc: "Amorphous SiO2 from 10% ball-milled RHA consumes Portlandite, dropping ITZ Ca/Si from 24.85 to 5.65 (-77.3%).",
      badge: "-77.3% Ca/Si Ratio",
      color: "emerald",
      position: "top-[18%] right-[12%]"
    },
    {
      id: 2,
      title: "PP Micro-Fiber Crack Bridging",
      desc: "0.5% v/v virgin PP fibers arrest tensile microcracks, lifting toughness by +45% (18.24 mJ/mm³) and flexural yield to 3.59 MPa.",
      badge: "+105% Toughness Surge",
      color: "cyan",
      position: "top-[50%] right-[12%]"
    },
    {
      id: 3,
      title: "PVAc/M-Sand Core-Shell Encrustation",
      desc: "Encapsulating EPS beads in a mineral jacket eliminates buoyancy and creates mechanical interlocking, recovering fc by +70.2%.",
      badge: "+70.2% fc Recovery",
      color: "amber",
      position: "bottom-[16%] right-[12%]"
    }
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#060913] via-[#080d1a] to-[#070b14]">
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-emerald-600/15 via-cyan-600/15 to-purple-600/10 blur-[140px] pointer-events-none rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/3 -left-32 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-32 w-72 h-72 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Badges & Academic Affiliation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs text-emerald-300 font-mono shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Atom className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Materials Science & Engineering · Final Year Research Project</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 text-xs text-slate-300 font-mono">
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
            <span>Group 24 · Faculty of Engineering · University of Moratuwa</span>
          </div>
        </div>

        {/* Hero Main Grid: Text & Live 3D Infographic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Left Column: Core Research Framing */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 tracking-wide">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>CONVENTIONAL EPS vs. UPGRADED TERNARY MORTAR</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Engineering High-Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300">Lightweight EPS Mortar</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Resolving the lightweight precast paradox: while conventional EPS mortar suffers catastrophic compressive loss and brittle transit breakage, our engineered tripartite synergy—<span className="text-amber-300 font-medium">PVAc/M-sand core-shell encrustation</span>, <span className="text-emerald-300 font-medium">10% pozzolanic Rice Husk Ash (RHA)</span>, and <span className="text-cyan-300 font-medium">0.5% Polypropylene (PP) micro-fibers</span>—recovers strength by <strong>+53.9%</strong>, doubles fracture toughness, and reduces carbon intensity by <strong>39.6% per MPa</strong>.
            </p>

            {/* Author & Action Strip */}
            <div className="p-4 rounded-xl bg-slate-900/70 backdrop-blur-md border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">Lead Investigator:</div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{PROJECT_AUTHORS[0].name} ({PROJECT_AUTHORS[0].index})</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">Moratuwa</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Co-Author: {PROJECT_AUTHORS[1].name} · Supervisor: {PROJECT_AUTHORS[2].name}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    if (triggerConfetti) triggerConfetti();
                    setActiveTab('calculator');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Interactive Mix Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500/50 text-xs font-semibold transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2x2 Evaluation Matrix</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic 3D Radar Infographic Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl shadow-emerald-950/30 group">
              
              {/* Header Bar with Live Pulse & View Toggle */}
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    3D Multi-Criteria Performance Radar
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveViewMode('infographic')}
                    className={`px-2.5 py-1 rounded transition-colors ${activeViewMode === 'infographic' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    3D Visual
                  </button>
                  <button
                    onClick={() => setActiveTab('surfaces')}
                    className="px-2.5 py-1 rounded text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>3D RSM</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Image & Interactive Scanning Effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img 
                  src="/figures/AI_Infographic_Radar_3D.jpg" 
                  alt="3D Multi-Criteria Radar Infographic"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Animated Laser Radar Scan Line */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-60 animate-[radarSweep_4s_linear_infinite]" 
                     style={{
                       animation: 'radarSweep 4s ease-in-out infinite'
                     }}
                />

                {/* Glowing Interactive Hotspots over Microstructure Callouts */}
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(selectedHotspot === spot.id ? null : spot.id)}
                    className={`absolute ${spot.position} -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center p-1 rounded-full transition-all ${selectedHotspot === spot.id ? 'ring-4 ring-cyan-400 bg-cyan-500 text-black scale-125' : 'bg-slate-900/90 text-white hover:scale-110 border border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.6)]'}`}
                    title={spot.title}
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
                    </span>
                  </button>
                ))}

                {/* Live Hotspot Modal / Popover */}
                {selectedHotspot && (
                  <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl bg-slate-950/95 backdrop-blur-md border border-cyan-500/60 shadow-2xl z-30 transition-all animate-in fade-in slide-in-from-bottom-2">
                    {(() => {
                      const spot = hotspots.find(h => h.id === selectedHotspot)!;
                      return (
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-white font-heading">{spot.title}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              {spot.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">{spot.desc}</p>
                          <button
                            onClick={() => setSelectedHotspot(null)}
                            className="mt-2 text-[10px] text-cyan-400 hover:text-cyan-300 font-mono font-semibold"
                          >
                            Close Details ✕
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Bottom Quick Legend */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Conventional EPS
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                    Upgraded Mortar
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Full Matrix</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Quantitative Breakthrough Cards (The 6 Key Parameters) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          {/* 1. Density */}
          <div className="materials-card p-4 border-l-4 border-l-cyan-400 hover:border-cyan-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-cyan-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Oven-Dry Density</span>
              <Scale className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              1969 <span className="text-xs text-slate-400 font-normal">kg/m³</span>
            </div>
            <div className="text-[11px] text-cyan-300/80 mt-1">
              -14% dead-weight (&lt; 2000 kg/m³ ASTM threshold)
            </div>
          </div>

          {/* 2. Compressive Strength */}
          <div className="materials-card p-4 border-l-4 border-l-emerald-400 hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Compressive fc</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              15.62 <span className="text-xs text-slate-400 font-normal">MPa</span>
            </div>
            <div className="text-[11px] text-emerald-300/90 font-semibold mt-1">
              +53.9% recovery vs raw EPS (10.15 MPa)
            </div>
          </div>

          {/* 3. Flexural Strength */}
          <div className="materials-card p-4 border-l-4 border-l-amber-400 hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Flexural fr</span>
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              3.59 <span className="text-xs text-slate-400 font-normal">MPa</span>
            </div>
            <div className="text-[11px] text-amber-300/90 font-semibold mt-1">
              +71.0% flexural boost vs raw EPS (2.10 MPa)
            </div>
          </div>

          {/* 4. Toughness */}
          <div className="materials-card p-4 border-l-4 border-l-purple-400 hover:border-purple-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-purple-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Fracture Toughness</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              18.24 <span className="text-xs text-slate-400 font-normal">mJ/mm³</span>
            </div>
            <div className="text-[11px] text-purple-300/90 font-semibold mt-1">
              +45.0% surge in post-crack ductility
            </div>
          </div>

          {/* 5. ITZ Ca/Si Stoichiometry */}
          <div className="materials-card p-4 border-l-4 border-l-emerald-500 hover:border-emerald-500 transition-colors">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">ITZ Ca/Si Ratio</span>
              <Microscope className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              5.65 <span className="text-xs text-slate-400 font-normal">(vs 24.85)</span>
            </div>
            <div className="text-[11px] text-emerald-300/90 font-semibold mt-1">
              -77.3% drop: Portlandite → Dense C-S-H
            </div>
          </div>

          {/* 6. Economic & Carbon Intensity */}
          <div className="materials-card p-4 border-l-4 border-l-teal-400 hover:border-teal-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-teal-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Eco & Cost Gain</span>
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-white font-heading">
              +33.7% <span className="text-xs text-slate-400 font-normal">Efficiency</span>
            </div>
            <div className="text-[11px] text-teal-300/90 font-semibold mt-1">
              -39.6% embodied carbon intensity / MPa
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
