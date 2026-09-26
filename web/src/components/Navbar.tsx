import React from 'react';
import { 
  Layers, 
  FlaskConical, 
  BarChart3, 
  Microscope, 
  Activity, 
  Calculator, 
  FileText, 
  Download,
  GraduationCap,
  Sparkles,
  Rotate3d,
  Database
} from 'lucide-react';

export type TabKey = 
  | 'overview' 
  | 'materials' 
  | 'phase1' 
  | 'phase2' 
  | 'surfaces'
  | 'itz' 
  | 'fibers' 
  | 'calculator' 
  | 'rawdata'
  | 'thesis';

interface NavbarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'overview' as TabKey, label: 'Overview', icon: Layers },
    { key: 'materials' as TabKey, label: 'Raw Materials', icon: FlaskConical },
    { key: 'phase1' as TabKey, label: 'Phase 1: Base (w/b - s/b)', icon: BarChart3 },
    { key: 'phase2' as TabKey, label: 'Phase 2: RHA × EPS', icon: Activity },
    { key: 'surfaces' as TabKey, label: '3D Surfaces & Contours', icon: Rotate3d },
    { key: 'itz' as TabKey, label: 'Phase 3 & 4: ITZ & Shell', icon: Microscope },
    { key: 'fibers' as TabKey, label: 'Phase 5: PP Fibers', icon: Sparkles },
    { key: 'calculator' as TabKey, label: 'Mix Engine', icon: Calculator },
    { key: 'rawdata' as TabKey, label: 'Raw Data Center', icon: Database },
    { key: 'thesis' as TabKey, label: 'Thesis & Poster', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full materials-glass border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Academic Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-amber-500/20 border border-emerald-500/40 p-1.5 flex items-center justify-center csh-glow">
              <img src="/mortar_logo.svg" alt="Mortar Research Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-wide uppercase font-heading">
                  Synergistic EPS Mortar
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold border border-emerald-500/30">
                  FYP 2026
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <GraduationCap className="w-3 h-3 text-cyan-400" />
                <span>Materials Science & Engineering · University of Moratuwa</span>
              </div>
            </div>
          </div>

          {/* Quick Downloads Header Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a 
              href="/data/Group24_Mortar_Research_Raw_Data_Full.zip" 
              download="Group24_Mortar_Research_Raw_Data_Full.zip"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors font-mono font-semibold"
              title="Download Complete Research Raw Data Bundle (.ZIP)"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Raw Data (.ZIP)</span>
            </a>
            <a 
              href="/docs/Group_24_Thesis.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Thesis (149p)</span>
            </a>
            <a 
              href="/docs/Research_Poster.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Poster</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
