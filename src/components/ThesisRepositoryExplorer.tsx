import React, { useState } from 'react';
import { 
  Download, 
  BookOpen, 
  Maximize2
} from 'lucide-react';

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
      <div className="materials-glass p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
                Academic Master Thesis & Research Repository
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Department of Materials Science & Engineering · Faculty of Engineering · University of Moratuwa
              </p>
            </div>
          </div>

          {/* Document Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setSelectedDoc('poster')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDoc === 'poster' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Research Poster (300 DPI)
            </button>
            <button
              onClick={() => setSelectedDoc('thesis')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDoc === 'thesis' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Master Thesis (149p)
            </button>
            <button
              onClick={() => setSelectedDoc('abstract')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDoc === 'abstract' ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IEEE Extended Abstract (6p)
            </button>
          </div>
        </div>
      </div>

      {/* Primary Display Area */}
      {selectedDoc === 'poster' && (
        <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  Conference Grade
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  High-Resolution Research Poster (300 DPI)
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Authored by Premakumara H.P.S. & Mayoorathan K. under the supervision of Eng. S.P. Guluwita
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalPoster(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-mono transition-colors shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5 text-sky-700" />
                <span>Fullscreen</span>
              </button>
              <a
                href="/docs/Research_Poster.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          <div 
            className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-950 shadow-md cursor-pointer group"
            onClick={() => setModalPoster(true)}
          >
            <img 
              src="/figures/research_poster_full_300dpi.png" 
              alt="Research Poster 300 DPI" 
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]" 
            />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-4 h-4 text-emerald-700" />
                <span>Click to view ultra-high-resolution scan</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {selectedDoc === 'thesis' && (
        <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                149 Pages · 4.7 MB · Master Dissertation
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">
                Comprehensive Final Year Research Dissertation (Group 24)
              </h3>
              <p className="text-xs text-slate-600">
                Degree of Bachelor of Science in Engineering (Honours) in Materials Science & Engineering
              </p>
            </div>

            <a
              href="/docs/Group_24_Thesis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Open / Download Master PDF</span>
            </a>
          </div>

          {/* Chapter Guide Accordion / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((ch) => (
              <div key={ch.num} className="materials-card p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-800">Chapter {ch.num}</span>
                  <span className="text-slate-500 font-medium">pp. {ch.pages}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{ch.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDoc === 'abstract' && (
        <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 font-bold border border-sky-200">
                6 Pages · Peer-Reviewed IEEE Style
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">
                Extended Research Abstract & Paper Manuscript
              </h3>
              <p className="text-xs text-slate-600">
                Authors: H.P.S. Premakumara, K. Mayoorathan, Eng. S.P. Guluwita
              </p>
            </div>

            <a
              href="/docs/Extended_Abstract.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold font-mono transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Open / Download Abstract PDF</span>
            </a>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-3 leading-relaxed shadow-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-mono">
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
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalPoster(false)}
        >
          <div className="max-w-6xl max-h-[95vh] bg-white rounded-2xl overflow-hidden border border-slate-200 p-2 shadow-2xl">
            <img 
              src="/figures/research_poster_full_300dpi.png" 
              alt="Research Poster Fullscreen" 
              className="w-full h-full object-contain max-h-[90vh] rounded-xl" 
            />
            <div className="text-center text-xs text-slate-500 py-2 font-mono">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};
