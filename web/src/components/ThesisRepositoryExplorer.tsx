import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  Maximize2,
  Table as TableIcon,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { PROJECT_AUTHORS, PROJECT_METADATA } from '../core/thesisData.ts';

export const ThesisRepositoryExplorer: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'thesis' | 'abstract' | 'poster'>('poster');
  const [modalPoster, setModalPoster] = useState<boolean>(false);

  const chapters = [
    { num: 1, title: "Introduction", pages: "1 – 8", desc: "Evolution of prefabrication in civil infrastructure, dead-weight penalty and handling crisis, problem statement, research objectives, and experimental scope." },
    { num: 2, title: "Literature Review", pages: "9 – 27", desc: "Historical evolution of binders, Sri Lankan precast industrial ecosystem, engineering mechanics of EPS, RHA pozzolanic chemistry, PP micro-fiber bridging, and research gap." },
    { num: 3, title: "Materials and Experimental Procedure", pages: "28 – 51", desc: "Raw material properties (OPC, M-Sand, EPS, PVAc, RHA, SP, PP fibers), testing apparatus, CCF factorial mix apportionment, specimen casting and curing, and SEM-EDS microstructural diagnostic protocols." },
    { num: 4, title: "Calculations and Mix Design Equations", pages: "52 – 80", desc: "Bogue stoichiometric clinker conversions, Absolute Volume Method multi-phase derivation, moisture-compensation algorithms, and theoretical density formulations." },
    { num: 5, title: "Results and Discussion", pages: "81 – 117", desc: "Consolidated results across all 5 experimental phases: Phase 1 base matrix optimization, Phase 2 composite void competition, Phase 3 ITZ SEM-EDS chemical healing, Phase 4 physical coating recovery, and Phase 5 micro-fiber toughening." },
    { num: 6, title: "Conclusions and Recommendations", pages: "118 – 126", desc: "Fulfillment of primary research objectives, significant discoveries (fiber balling threshold, extreme 40% EPS coating rescue), and industrial implementation pathways." },
    { num: "App", title: "Appendices: Raw Analytical EDS Data", pages: "127 – 149", desc: "Full raw Energy Dispersive X-Ray Spectroscopy spectral printouts across three independent spatial measurement locations per mix." },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Studio Header */}
      <div className="materials-glass p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Academic Master Thesis & Research Repository
              </h2>
              <p className="text-xs text-slate-400">
                Department of Materials Science & Engineering · Faculty of Engineering · University of Moratuwa
              </p>
            </div>
          </div>

          {/* Document Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setSelectedDoc('poster')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDoc === 'poster' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Research Poster (300 DPI)
            </button>
            <button
              onClick={() => setSelectedDoc('thesis')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDoc === 'thesis' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Master Thesis (149p)
            </button>
            <button
              onClick={() => setSelectedDoc('abstract')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDoc === 'abstract' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              IEEE Extended Abstract (6p)
            </button>
          </div>
        </div>
      </div>

      {/* Primary Display Area */}
      {selectedDoc === 'poster' && (
        <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                  Conference Grade
                </span>
                <h3 className="text-lg font-bold text-white font-heading">
                  High-Resolution Research Poster (300 DPI)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Authored by Premakumara H.P.S. & Mayoorathan K. under the supervision of Eng. S.P. Guluwita
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalPoster(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fullscreen</span>
              </button>
              <a
                href="/docs/Research_Poster.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold text-xs font-mono transition-all hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          <div 
            className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl cursor-pointer group"
            onClick={() => setModalPoster(true)}
          >
            <img 
              src="/figures/research_poster_full_300dpi.png" 
              alt="Research Poster 300 DPI" 
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]" 
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-bold text-white flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <span>Click to view ultra-high-resolution scan</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {selectedDoc === 'thesis' && (
        <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                149 Pages · 4.7 MB · Master Dissertation
              </span>
              <h3 className="text-xl font-bold text-white mt-1 font-heading">
                Comprehensive Final Year Research Dissertation (Group 24)
              </h3>
              <p className="text-xs text-slate-400">
                Degree of Bachelor of Science in Engineering (Honours) in Materials Science & Engineering
              </p>
            </div>

            <a
              href="/docs/Group_24_Thesis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Open / Download Master PDF</span>
            </a>
          </div>

          {/* Chapter Guide Accordion / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((ch) => (
              <div key={ch.num} className="materials-card p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-400">Chapter {ch.num}</span>
                  <span className="text-slate-500">pp. {ch.pages}</span>
                </div>
                <h4 className="text-sm font-bold text-white font-heading">{ch.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDoc === 'abstract' && (
        <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30">
                6 Pages · Peer-Reviewed IEEE Style
              </span>
              <h3 className="text-xl font-bold text-white mt-1 font-heading">
                Extended Research Abstract & Paper Manuscript
              </h3>
              <p className="text-xs text-slate-400">
                Authors: H.P.S. Premakumara, K. Mayoorathan, Eng. S.P. Guluwita
              </p>
            </div>

            <a
              href="/docs/Extended_Abstract.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Open / Download Abstract PDF</span>
            </a>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              Abstract Summary
            </h4>
            <p>
              Lightweight cement mortar produced with Expanded Polystyrene (EPS) is an effective approach for reducing the self-weight of cement-based elements; however, EPS inclusion commonly reduces strength and toughness due to poor interfacial bonding, high buoyancy, and weak stress transfer within the cement matrix. This study investigates the synergistic effects of Rice Husk Ash (RHA) and Polypropylene (PP) fiber on the performance of modified EPS cement mortar...
            </p>
            <p>
              The results showed that EPS replacement reduced mortar density but caused a reduction in mechanical strength due to its void-like behavior. The incorporation of RHA improved the cementitious matrix through pozzolanic reaction and pore refinement, with 10% RHA giving the most effective strength recovery...
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen Poster Modal */}
      {modalPoster && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalPoster(false)}
        >
          <div className="max-w-6xl max-h-[95vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-2">
            <img 
              src="/figures/research_poster_full_300dpi.png" 
              alt="Research Poster Fullscreen" 
              className="w-full h-full object-contain max-h-[90vh] rounded-xl" 
            />
            <div className="text-center text-xs text-slate-400 py-2">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};
