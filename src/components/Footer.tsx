import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PROJECT_AUTHORS, PROJECT_METADATA } from '../core/thesisData.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600 py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Institutional Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-wide font-heading">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center">
                <img src="/mortar_logo.svg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span>{PROJECT_METADATA.shortTitle}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Final Year Research Project (Group 24) investigating ternary lightweight cementitious composites for precast partition panels.
            </p>
            <div className="text-[11px] text-slate-500 font-mono leading-relaxed">
              Department of Materials Science and Engineering<br/>
              Faculty of Engineering · University of Moratuwa, Sri Lanka
            </div>
          </div>

          {/* Research Roster */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Research Investigators
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">{PROJECT_AUTHORS[0].name}</strong> (Index: {PROJECT_AUTHORS[0].index})
                <div className="text-[11px] text-emerald-800 font-mono font-semibold">Lead Student Contributor</div>
              </div>
              <div>
                <strong className="text-slate-900">{PROJECT_AUTHORS[1].name}</strong> (Index: {PROJECT_AUTHORS[1].index})
                <div className="text-[11px] text-slate-500 font-mono font-medium">Co-Student Contributor</div>
              </div>
              <div className="pt-1 text-slate-600">
                Principal Supervisor: <strong className="text-slate-900">{PROJECT_AUTHORS[2].name}</strong>
              </div>
            </div>
          </div>

          {/* Standards & Testing Reference */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Laboratory Standards
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside font-mono">
              <li>EN 196-1: Prismatic Mortar Testing</li>
              <li>ASTM C618: Class N Pozzolan (RHA)</li>
              <li>BS 882: Zone M Fine Aggregate</li>
              <li>ASTM C578: Cellular Polystyrene</li>
              <li>ASTM C1116: Micro-Fiber Concrete</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Department of Materials Science and Engineering, University of Moratuwa. All academic rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://github.com/premakumarahps/fyp-sustainable-eps-mortar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-800 transition-colors flex items-center gap-1"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://premakumarahps.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-800 transition-colors flex items-center gap-1"
            >
              <span>Main Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="font-mono text-[11px] text-slate-600 font-semibold">
            H.P.S. Premakumara · 210494D
          </div>
        </div>
      </div>
    </footer>
  );
};
