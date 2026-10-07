import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp,
  Sparkles, 
  Layers, 
  ArrowRight,
  Truck,
  Box,
  Binary,
  Target,
  Download,
  Microscope,
  Leaf,
  DollarSign,
  Scale,
  ShieldCheck,
  Eye,
  Sliders
} from 'lucide-react';
import { MathView } from './MathView.tsx';
import { TabKey } from './Navbar.tsx';
import { COMPARATIVE_2X2_MATRIX, BenchmarkMetric } from '../core/thesisData.ts';

interface OverviewSectionProps {
  setActiveTab: (tab: TabKey) => void;
}

export const OverviewParadoxSection: React.FC<OverviewSectionProps> = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mechanical' | 'microstructure' | 'physical' | 'sustainability'>('all');
  const [selectedReplacementLevel, setSelectedReplacementLevel] = useState<'20' | '40' | 'both'>('both');
  const [activeMicroHotspot, setActiveMicroHotspot] = useState<'left' | 'right' | null>(null);

  const filteredMetrics = COMPARATIVE_2X2_MATRIX.filter(m => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="space-y-12 py-6">
      
      {/* 1. Core Framing: The Conventional EPS Dilemma vs The Upgraded Solution */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-amber-800 tracking-wider uppercase">
              Industrial Problem & Paradigm Shift
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              1. Conventional EPS Mortar vs. The Upgraded Ternary Matrix
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-700 leading-relaxed items-stretch">
          
          {/* Left: The Conventional Problem */}
          <div className="materials-card p-6 border-l-4 border-l-rose-500 bg-rose-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-bold text-base text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  Conventional EPS Mortar (The Problem)
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 text-[11px] font-mono font-bold border border-rose-300">
                  High Reject Rate
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                Precast manufacturers incorporate Expanded Polystyrene (EPS) beads to achieve a 14–24% self-weight reduction. However, <strong>pristine raw EPS is smooth, hydrophobic, and chemically inert</strong>.
              </p>
              
              <div className="p-3.5 rounded-lg bg-white border border-rose-200 text-xs space-y-2 text-rose-950 shadow-xs">
                <div className="font-bold text-rose-900">Why Conventional EPS Mortar Fails in Factories:</div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-700">
                  <li><strong>Catastrophic Compressive Drop:</strong> Acts as soft air voids (<MathView math="f_c < 5\text{ MPa}" /> at 40% replacement).</li>
                  <li><strong>Porous ITZ (Portlandite Rich):</strong> Smooth beads repel cement paste, precipitating weak <MathView math="\text{Ca(OH)}_2" /> cleavage plates (<MathView math="\text{Ca/Si} \approx 24.85" />).</li>
                  <li><strong>Severe Transit Cracking:</strong> Extremely brittle failure mode causes 10–15% edge breakage during demolding and transport.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200 text-[11px] text-rose-800 font-mono font-medium">
              Result: Restricted only to non-structural, low-demand fillers.
            </div>
          </div>

          {/* Right: The Upgraded Solution */}
          <div className="materials-card p-6 border-l-4 border-l-emerald-600 bg-emerald-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-bold text-base text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Upgraded Engineered Mortar (Our Solution)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[11px] font-mono font-bold border border-emerald-300">
                  Zero-CapEx Retrofit
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                We engineered a tripartite synergy combining <strong>PVAc-encrusted EPS</strong>, <strong>10% ball-milled Rice Husk Ash (RHA)</strong>, and <strong>0.5% Polypropylene (PP) micro-fibers</strong> to fully recover structural integrity.
              </p>
              
              <div className="p-3.5 rounded-lg bg-white border border-emerald-200 text-xs space-y-2 text-emerald-950 shadow-xs">
                <div className="font-bold text-emerald-900">The 3 Tripartite Recovery Mechanisms:</div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-700">
                  <li><strong>Mechanical Interlock:</strong> Coated EPS eliminates polymer buoyancy and bonds paste, achieving <strong className="text-emerald-800">+70.2% compressive recovery</strong>.</li>
                  <li><strong>Chemical ITZ Densification:</strong> RHA consumes Portlandite, dropping <MathView math="\text{Ca/Si}" /> to <strong>5.65 (-77.3%)</strong> into dense C-S-H gel.</li>
                  <li><strong>Micro-Crack Bridging:</strong> PP fibers arrest microcracks, surging toughness by <strong className="text-emerald-800">+45% to +105%</strong>.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200 text-[11px] text-emerald-900 font-mono font-medium flex items-center justify-between">
              <span>Standard plant mixing · No autoclaves required</span>
              <span className="text-emerald-800 font-bold">-39.6% CO₂/MPa</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive 2x2 Comparative Performance Evaluation Matrix */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 shadow-xs">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-sky-800 tracking-wider uppercase">
                Experimental Laboratory Results
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                2. Interactive 2×2 Comparative Performance Matrix
              </h2>
            </div>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'mechanical', 'microstructure', 'physical', 'sustainability'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${selectedCategory === cat ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Interactive Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMetrics.map((metric) => (
            <div key={metric.id} className="materials-card p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900 font-heading tracking-wide">
                    {metric.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                    {metric.unit}
                  </span>
                </div>
                
                <p className="text-[11px] text-slate-600 leading-snug mb-4">
                  {metric.description}
                </p>

                {/* Side-by-side 20% & 40% Comparison Columns */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3">
                  {/* 20% EPS Comparison */}
                  <div className="space-y-1.5 border-r border-slate-200 pr-2">
                    <div className="text-[10px] font-mono text-sky-800 font-bold uppercase tracking-wider">
                      20% EPS
                    </div>
                    <div className="text-[11px] text-rose-700 flex items-center justify-between font-medium">
                      <span className="text-slate-500 text-[10px]">Conv:</span>
                      <span className="font-mono">{metric.conv20.text}</span>
                    </div>
                    <div className="text-xs text-emerald-800 font-bold flex items-center justify-between">
                      <span className="text-slate-500 text-[10px]">Upg:</span>
                      <span className="font-mono">{metric.upg20.text}</span>
                    </div>
                    {metric.upg20.gain && (
                      <div className="text-[10px] text-emerald-800 font-mono font-semibold pt-1 border-t border-slate-200 flex items-center justify-between">
                        <span>Gain:</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold">
                          {metric.upg20.gain}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 40% EPS Comparison */}
                  <div className="space-y-1.5 pl-1">
                    <div className="text-[10px] font-mono text-amber-900 font-bold uppercase tracking-wider">
                      40% EPS
                    </div>
                    <div className="text-[11px] text-rose-700 flex items-center justify-between font-medium">
                      <span className="text-slate-500 text-[10px]">Conv:</span>
                      <span className="font-mono">{metric.conv40.text}</span>
                    </div>
                    <div className="text-xs text-emerald-800 font-bold flex items-center justify-between">
                      <span className="text-slate-500 text-[10px]">Upg:</span>
                      <span className="font-mono">{metric.upg40.text}</span>
                    </div>
                    {metric.upg40.gain && (
                      <div className="text-[10px] text-emerald-800 font-mono font-semibold pt-1 border-t border-slate-200 flex items-center justify-between">
                        <span>Gain:</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold">
                          {metric.upg40.gain}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1">
                <span>Category: <strong className="text-slate-800 uppercase">{metric.category}</strong></span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  Triplicate Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 3D Microstructural Comparison Studio */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-300 shadow-xs">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-purple-800 tracking-wider uppercase">
              Microstructural Mechanism & ITZ Physics
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              3. 3D Microstructural Cutaway: Portlandite Cleavage vs. C-S-H Gel Welding
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Image Visualization with Live Interactivity */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
            <img 
              src="/figures/AI_3D_Microstructure_Comparison.jpg" 
              alt="3D Microstructural Comparison"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Quick Interactive Tooltip Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-700 font-medium">
                Figure 2: Microstructural representation of ITZ bond & fiber mechanics
              </span>
              <a 
                href="/figures/AI_3D_Microstructure_Comparison.jpg" 
                target="_blank" 
                rel="noreferrer"
                className="text-sky-700 hover:text-sky-900 flex items-center gap-1 font-bold"
              >
                <span>Full HD View</span>
                <Eye className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Technical Explanation Breakdown */}
          <div className="lg:col-span-5 space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="materials-card p-4 border-l-4 border-l-rose-500 bg-rose-50/40">
              <div className="text-xs font-bold text-rose-800 font-mono mb-1">
                CONVENTIONAL ITZ (LEFT CUTAWAY)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Hydrophobic raw EPS forces free water accumulation, crystallizing into large, oriented <strong>Portlandite (<MathView math="\text{Ca(OH)}_2" />) hexagonal plates</strong>. This creates a porous boundary with microcracks and high elemental <MathView math="\text{Ca/Si} \approx 24.85" />.
              </p>
            </div>

            <div className="materials-card p-4 border-l-4 border-l-emerald-600 bg-emerald-50/40">
              <div className="text-xs font-bold text-emerald-800 font-mono mb-1">
                UPGRADED TERNARY ITZ (RIGHT CUTAWAY)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Ball-milled RHA supplies reactive <MathView math="\text{SiO}_2" />, executing secondary pozzolanic reaction:
              </p>
              <div className="my-2 p-2 rounded bg-white border border-emerald-200 text-center text-xs font-mono text-emerald-900 font-bold">
                <MathView math="\text{Ca(OH)}_2 + \text{SiO}_2 + \text{H}_2\text{O} \longrightarrow \text{C-S-H gel}" />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Dense amorphous C-S-H gel bridges the gap (<MathView math="\text{Ca/Si} = 5.65" />), while <strong>PP micro-fibers actively stitch propagating tensile cracks</strong>.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('itz')}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-emerald-500 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Microscope className="w-4 h-4 text-emerald-700" />
              <span>Explore Full SEM-EDS Elemental Spectrum Studio</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Complete Academic Golden Table Showcase */}
      <section className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-800 tracking-wider uppercase">
                University of Moratuwa Academic Publication Table
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                4. Table 1: Comparative Performance Evaluation Matrix
              </h2>
            </div>
          </div>

          {/* Download Vector Links */}
          <div className="flex items-center gap-2">
            <a
              href="/figures/Academic_Golden_Table_TimesNewRoman.png"
              download="Table1_Comparative_Evaluation.png"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-mono font-medium transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>PNG (300 DPI)</span>
            </a>
            <a
              href="/figures/Academic_Golden_Table_TimesNewRoman.svg"
              download="Table1_Comparative_Evaluation.svg"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-mono font-medium transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-sky-700" />
              <span>Vector SVG</span>
            </a>
          </div>
        </div>

        {/* Embedded Academic Graphic */}
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-2 sm:p-4 shadow-sm">
          <img 
            src="/figures/Academic_Golden_Table_TimesNewRoman.png" 
            alt="Table 1: Comparative Performance Evaluation of Conventional vs Upgraded EPS Mortar"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl">
            <strong>Statistical Protocol:</strong> All experimental values represent mean ± standard deviation derived from triplicate laboratory prismatic specimens (40 × 40 × 160 mm) tested under ASTM C109, ASTM C348, and BS EN 196-1 protocols.
          </p>
          <button
            onClick={() => setActiveTab('rawdata')}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Access 7 Raw CSV Datasets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
