import React, { useState, useEffect } from 'react';
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
  Database, 
  Camera,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  Leaf,
  Scale,
  Zap,
} from 'lucide-react';

export type TabKey = 
  | 'overview' 
  | 'materials' 
  | 'gallery' 
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

interface NavGroup {
  groupName: string;
  items: {
    key: TabKey;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    accentColor: string;
    bgColor: string;
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Grouped research tabs for the professional sliding navigation menu
  const navigationGroups: NavGroup[] = [
    {
      groupName: "Executive Summary & Materials",
      items: [
        { 
          key: 'overview', 
          label: 'Overview & 2×2 Matrix', 
          sublabel: 'Precast Paradox, Breakthrough Metrics & Synergistic Solution', 
          icon: Layers,
          badge: 'Executive',
          accentColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50 border-emerald-200'
        },
        { 
          key: 'materials', 
          label: 'Raw Materials Studio', 
          sublabel: '5 Constituents: OPC, RHA, M-Sand, PVAc Polymer & EPS', 
          icon: FlaskConical,
          accentColor: 'text-teal-700',
          bgColor: 'bg-teal-50 border-teal-200'
        },
        { 
          key: 'gallery', 
          label: 'Lab Photo Gallery', 
          sublabel: '83 High-Resolution Lab & Specimen Micrographs', 
          icon: Camera,
          badge: '83 Photos',
          accentColor: 'text-sky-700',
          bgColor: 'bg-sky-50 border-sky-200'
        },
      ]
    },
    {
      groupName: "Empirical Experimental Phases (1 – 5)",
      items: [
        { 
          key: 'phase1', 
          label: 'Phase 1: Base Matrix Optimization', 
          sublabel: 'w/b (0.35–0.45) & s/b (1.5–2.5) Parametric Calibration', 
          icon: BarChart3,
          accentColor: 'text-blue-700',
          bgColor: 'bg-blue-50 border-blue-200'
        },
        { 
          key: 'phase2', 
          label: 'Phase 2: Pozzolanic RHA × EPS', 
          sublabel: '16-Mix Factorial Series & 28-Day Strength Regressions', 
          icon: Activity,
          accentColor: 'text-indigo-700',
          bgColor: 'bg-indigo-50 border-indigo-200'
        },
        { 
          key: 'itz', 
          label: 'Phase 3 & 4: ITZ & Core-Shell Beads', 
          sublabel: 'SEM Micrographs, Ca/Si Stoichiometry & PVAc Encrustation', 
          icon: Microscope,
          badge: '-77.3% Ca/Si',
          accentColor: 'text-teal-700',
          bgColor: 'bg-teal-50 border-teal-200'
        },
        { 
          key: 'fibers', 
          label: 'Phase 5: PP Micro-Fibers', 
          sublabel: '0.5% Polypropylene Fibers & Post-Crack Fracture Toughness', 
          icon: Sparkles,
          badge: '+45% Ductility',
          accentColor: 'text-purple-700',
          bgColor: 'bg-purple-50 border-purple-200'
        },
      ]
    },
    {
      groupName: "Interactive Computational Engines",
      items: [
        { 
          key: 'surfaces', 
          label: '3D RSM Surfaces & Contours', 
          sublabel: 'Interactive 3D Plotly Response Surfaces (w/b, RHA, EPS)', 
          icon: Rotate3d,
          badge: '3D Plotly',
          accentColor: 'text-amber-700',
          bgColor: 'bg-amber-50 border-amber-200'
        },
        { 
          key: 'calculator', 
          label: 'Mix Design Simulation Engine', 
          sublabel: 'Live Batch Computation, Carbon Intensity & Cost Optimization', 
          icon: Calculator,
          badge: 'Live Simulator',
          accentColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50 border-emerald-200'
        },
      ]
    },
    {
      groupName: "Repository Data & Verification",
      items: [
        { 
          key: 'rawdata', 
          label: 'Raw Data Center', 
          sublabel: 'Verified UTM Logs, Stress-Strain CSVs & Density Benchmarks', 
          icon: Database,
          accentColor: 'text-sky-700',
          bgColor: 'bg-sky-50 border-sky-200'
        },
        { 
          key: 'thesis', 
          label: 'Thesis & Research Poster', 
          sublabel: 'Complete 149-Page Academic FYP Thesis & Conference Poster', 
          icon: FileText,
          badge: 'PDF',
          accentColor: 'text-rose-700',
          bgColor: 'bg-rose-50 border-rose-200'
        },
      ]
    }
  ];

  // Helper to find currently active tab title
  const allTabs = navigationGroups.flatMap(g => g.items);
  const currentTabObj = allTabs.find(t => t.key === activeTab) || allTabs[0];
  const CurrentTabIcon = currentTabObj.icon;

  // Scroll-direction aware navbar visibility with organic momentum physics
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      if (isMenuOpen) {
        setIsNavVisible(true);
        ticking = false;
        return;
      }
      
      const delta = scrollY - lastScrollY;
      
      // Ignore micro-jitters
      if (Math.abs(delta) < 10) {
        ticking = false;
        return;
      }

      // Always show when near the very top of the page
      if (scrollY <= 50) {
        setIsNavVisible(true);
      } else if (delta > 14 && scrollY > 120) {
        // Scrolling down deliberately -> organic float up
        setIsNavVisible(false);
      } else if (delta < -10) {
        // Scrolling up -> organic fluid reveal
        setIsNavVisible(true);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  // Close menu on Escape key and prevent background scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSelectTab = (key: TabKey) => {
    setActiveTab(key);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Sleek, Organic Living Header with Fluid Spring Scroll-Direction Animation */}
      <header 
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 will-change-[transform,opacity,filter] ${
          isNavVisible 
            ? 'translate-y-0 opacity-100 scale-100 blur-0 shadow-sm shadow-slate-900/5 duration-500' 
            : '-translate-y-full opacity-0 scale-[0.98] pointer-events-none shadow-none duration-400'
        }`}
        style={{
          transitionProperty: 'transform, opacity, filter, box-shadow',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Academic Identity */}
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab('overview')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border border-emerald-300 p-1.5 flex items-center justify-center shadow-xs hover:scale-105 transition-transform">
                <img src="/mortar_logo.svg" alt="Mortar Research Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-950 tracking-wide uppercase font-heading">
                    Synergistic EPS Mortar
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono font-bold border border-emerald-300">
                    FYP 2026
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Materials Science & Engineering · University of Moratuwa</span>
                </div>
              </div>
            </div>

            {/* Currently Active Tab Pill (Center/Left Badge) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs text-slate-700">
              <span className="text-slate-600 font-medium text-[11px]">Active View:</span>
              <CurrentTabIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-bold text-slate-900">{currentTabObj.label}</span>
            </div>

            {/* Right Action Hub: 3 Download Action Buttons + 4th THREE-BAR MENU BUTTON */}
            <div className="flex items-center gap-2.5">
              
              {/* Button 1: Raw Data (.ZIP) */}
              <a 
                href="/data/Group24_Mortar_Research_Raw_Data_Full.zip" 
                download="Group24_Mortar_Research_Raw_Data_Full.zip"
                className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors font-mono font-bold shadow-xs"
                title="Download Complete Research Raw Data Bundle (.ZIP)"
              >
                <Database className="w-3.5 h-3.5 text-emerald-700" />
                <span>Raw Data (.ZIP)</span>
              </a>

              {/* Button 2: Thesis (149p PDF) */}
              <a 
                href="/docs/Group_24_Thesis.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 transition-colors font-medium shadow-xs"
                title="Open Complete 149-Page Research Thesis"
              >
                <Download className="w-3.5 h-3.5 text-sky-700" />
                <span>Thesis (149p)</span>
              </a>

              {/* Button 3: Poster */}
              <a 
                href="/docs/Research_Poster.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 transition-colors font-medium shadow-xs"
                title="Open Conference Research Poster"
              >
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>Poster</span>
              </a>

              {/* Button 4: PROFESSIONAL THREE-BAR MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-mono font-bold shadow-md shadow-emerald-700/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-600 select-none"
                title="Open Full Research Navigation & Modules Menu"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 text-emerald-100" />
                <span className="font-sans font-semibold tracking-wide">Menu</span>
                <span className="relative flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* PROFESSIONAL ANIMATED SLIDING NAVIGATION DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          
          {/* Backdrop Overlay with smooth frosted dark blur & fade */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-[drawerFadeIn_0.25s_ease-out]"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide-In Navigation Command Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
            <div className="w-screen max-w-md lg:max-w-lg bg-white border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform animate-[drawerSlideIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
              
              {/* Drawer Top Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between border-b border-slate-700/60 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-inner">
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold font-heading tracking-wide uppercase">
                        Research Navigation
                      </h2>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        11 Modules
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-sans">
                      Synergistic Lightweight Mortar Exploration
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                  title="Close Navigation (Esc)"
                  aria-label="Close Navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-slate-50/60">
                {navigationGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2">
                    <div className="flex items-center justify-between px-2 text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                      <span>{group.groupName}</span>
                    </div>

                    <div className="space-y-1.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.key;

                        return (
                          <button
                            key={item.key}
                            onClick={() => handleSelectTab(item.key)}
                            className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-50 to-teal-50/80 border-2 border-emerald-500 shadow-sm'
                                : 'bg-white hover:bg-slate-100/90 border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:translate-x-1'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Tab Icon Container */}
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                                isActive 
                                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-xs' 
                                  : `${item.bgColor} ${item.accentColor}`
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-bold font-sans ${isActive ? 'text-emerald-950' : 'text-slate-900 group-hover:text-slate-950'}`}>
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                                      isActive 
                                        ? 'bg-emerald-200/70 text-emerald-900 border border-emerald-300' 
                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? 'text-emerald-800 font-medium' : 'text-slate-600'}`}>
                                  {item.sublabel}
                                </p>
                              </div>
                            </div>

                            {/* Active/Chevron Indicator */}
                            <div className="shrink-0 flex items-center">
                              {isActive ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-700 text-white shadow-2xs">
                                  Active
                                </span>
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Bottom Research Key Metrics & Quick Actions */}
              <div className="p-4 bg-white border-t border-slate-200 space-y-3 shrink-0">
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium px-1">
                  <span>Key Breakthrough Highlights:</span>
                  <span className="font-mono text-emerald-700 font-bold">20% & 40% EPS</span>
                </div>

                {/* 4 Micro Metric Badges */}
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="text-[10px] font-bold text-emerald-900 font-heading">+53.9%</div>
                    <div className="text-[9px] text-emerald-700 font-mono">28d fc</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="text-[10px] font-bold text-amber-900 font-heading">+71.0%</div>
                    <div className="text-[9px] text-amber-700 font-mono">28d fr</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-200">
                    <div className="text-[10px] font-bold text-teal-900 font-heading">-77.3%</div>
                    <div className="text-[9px] text-teal-700 font-mono">Ca/Si ITZ</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200">
                    <div className="text-[10px] font-bold text-sky-900 font-heading">-14%</div>
                    <div className="text-[9px] text-sky-700 font-mono">Density</div>
                  </div>
                </div>

                {/* Quick File Downloads Row inside Drawer */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="/data/Group24_Mortar_Research_Raw_Data_Full.zip"
                    download="Group24_Mortar_Research_Raw_Data_Full.zip"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold font-mono transition-colors"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Raw Data</span>
                  </a>
                  <a
                    href="/docs/Group_24_Thesis.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold font-mono transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-700" />
                    <span>Thesis PDF</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global CSS Keyframe Animations for Drawer */}
      <style>{`
        @keyframes drawerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes drawerSlideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
