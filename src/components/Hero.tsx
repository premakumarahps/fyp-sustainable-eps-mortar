import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Rotate3d, 
  GraduationCap, 
  User, 
  ShieldCheck,
  Tag,
  ExternalLink
} from 'lucide-react';
import { PROJECT_AUTHORS } from '../core/thesisData.ts';
import { TabKey } from './Navbar.tsx';
import { FuturisticInfographic } from './FuturisticInfographic.tsx';

interface HeroProps {
  setActiveTab: (tab: TabKey) => void;
  triggerConfetti?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, triggerConfetti }) => {
  // Author image fallback handlers
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  // Living Typewriter Animation for Title
  const TYPEWRITER_PHRASES = [
    "Lightweight EPS Mortar",
    "Sustainable Precast Matrix",
    "Core-Shell ITZ Composite",
    "Tripartite Synergistic Mortar"
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('Lightweight EPS Mortar');
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    const targetPhrase = TYPEWRITER_PHRASES[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === targetPhrase) {
      // Hold completed word for 3.5s so users can comfortably read and appreciate it
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3500);
    } else if (isDeleting && displayText === '') {
      // Pause before typing next phrase
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      timer = setTimeout(() => {}, 400);
    } else {
      // Natural human-like dynamic typing speed
      const nextLength = isDeleting ? displayText.length - 1 : displayText.length + 1;
      const speed = isDeleting 
        ? 35 + Math.random() * 20 
        : 70 + Math.random() * 35;

      timer = setTimeout(() => {
        setDisplayText(targetPhrase.substring(0, nextLength));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  const authorsData = [
    {
      id: 'premakumara',
      name: PROJECT_AUTHORS[0].name,
      index: PROJECT_AUTHORS[0].index,
      role: 'Lead Student Investigator',
      image: '/authors/sandun_premakumara.jpg',
      initials: 'SP',
      badge: 'Lead Researcher',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      ringColor: 'ring-emerald-500',
      url: 'https://premakumarahps.vercel.app/',
    },
    {
      id: 'mayoorathan',
      name: PROJECT_AUTHORS[1].name,
      index: PROJECT_AUTHORS[1].index,
      role: 'Co-Student Investigator',
      image: '/authors/mayoorathan_k.jpg',
      initials: 'KM',
      badge: 'Co-Author',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-300',
      ringColor: 'ring-sky-500',
      url: 'https://www.linkedin.com/in/mayoorathan',
    },
    {
      id: 'guluwita',
      name: PROJECT_AUTHORS[2].name,
      index: 'Faculty Supervisor',
      role: 'Principal Research Supervisor',
      image: '/authors/eng_guluwita.jpg',
      initials: 'SG',
      badge: 'Senior Lecturer',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      ringColor: 'ring-amber-500',
      url: 'https://uom.lk/staff/Guluwita.SP',
    },
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/60">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-gradient-to-tr from-emerald-500/10 via-sky-500/10 to-teal-500/10 blur-[150px] pointer-events-none rounded-full animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-500/10 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-sky-500/10 blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* 1. FIRST ELEMENT: Centered Main Title with Living Typesetting Animation */}
        <div className="w-full text-center space-y-3 pb-3 animate-hero-fade">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-extrabold text-slate-950 tracking-[-0.02em] font-heading leading-[1.18] sm:leading-[1.12] max-w-6xl mx-auto">
            <span>Engineering High-Performance</span>
            <span className="block mt-1 sm:mt-2.5 min-h-[1.25em]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 via-cyan-500 to-sky-600 animate-title-gradient font-black">
                {displayText}
              </span>
              <span 
                className="inline-block w-[3.5px] sm:w-[5px] md:w-[6px] h-[0.82em] bg-gradient-to-b from-emerald-400 via-teal-400 to-sky-400 ml-1.5 align-baseline rounded-full animate-typewriter-cursor"
                aria-hidden="true"
              />
            </span>
          </h1>
        </div>

        {/* 2. SECOND ELEMENT: Master Summary Spanning Full Width (Box Wrapping Removed) */}
        <div className="w-full space-y-4 pt-1">
          <p className="text-base sm:text-lg lg:text-[1.125rem] text-slate-700/95 font-normal leading-[1.85] text-left w-full">
            Resolving the lightweight precast paradox: while normal mortar exceeds 2,200 kg/m³ and conventional EPS suffers catastrophic compressive loss and brittle transit breakage due to hydrophobic bead interfacial detachment, our engineered tripartite synergy—<strong className="text-amber-900 font-semibold">PVAc/M-sand core-shell encrustation</strong>, <strong className="text-emerald-900 font-semibold">10% pozzolanic Rice Husk Ash (RHA)</strong>, and <strong className="text-sky-900 font-semibold">0.5% Polypropylene (PP) micro-fibers</strong>—delivers remarkable mechanical recovery across calibrated <strong className="text-slate-900 font-semibold">20% (structural partition, 1969 kg/m³)</strong> and <strong className="text-slate-900 font-semibold">40% (ultra-lightweight, 1734 kg/m³)</strong> replacement ratios, elevating compressive strength by up to <strong className="text-emerald-800 font-bold">+70.2%</strong>, flexural capacity by <strong className="text-emerald-800 font-bold">+94.7%</strong>, and doubling fracture toughness with a scalable parametric framework ready for higher volume industrial precast adoption.
          </p>

          {/* Professional Academic Keywords Strip Spanning Full Width */}
          <div className="flex flex-wrap items-center gap-2 pt-1 w-full">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Keywords:
            </span>
            {[
              { label: 'Expanded Polystyrene (EPS)', color: 'bg-amber-50/80 border-amber-200 text-amber-900' },
              { label: 'Core-Shell Encrustation', color: 'bg-slate-100/90 border-slate-200 text-slate-800' },
              { label: 'Rice Husk Ash (RHA)', color: 'bg-emerald-50/80 border-emerald-200 text-emerald-900' },
              { label: 'PP Micro-Fibers', color: 'bg-sky-50/80 border-sky-200 text-sky-900' },
              { label: 'Interfacial Transition Zone (ITZ)', color: 'bg-teal-50/80 border-teal-200 text-teal-900' },
              { label: '3D Response Surface Methodology (RSM)', color: 'bg-indigo-50/80 border-indigo-200 text-indigo-900' },
              { label: 'ASTM C869 Structural Lightweight', color: 'bg-slate-100/90 border-slate-200 text-slate-800' },
              { label: 'Sustainable Precast Matrix', color: 'bg-emerald-50/80 border-emerald-200 text-emerald-900' }
            ].map((kw, idx) => (
              <span 
                key={idx} 
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${kw.color} transition-all duration-150 hover:shadow-2xs hover:scale-105 select-none`}
              >
                {kw.label}
              </span>
            ))}
          </div>
        </div>

        {/* 3. THIRD ELEMENT: Attractive Research Group Card (With Round Profile Photos & Moved Tags) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md space-y-5">
          
          {/* Card Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-2xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading tracking-wide uppercase">
                  Research Investigation Team
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Department of Materials Science & Engineering · Faculty of Engineering · University of Moratuwa
                </p>
              </div>
            </div>

            {/* University Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Final Year Research Project 2026</span>
            </div>
          </div>

          {/* Authors Grid with Round Profile Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {authorsData.map((author) => {
              const CardTag = author.url ? 'a' : 'div';
              const linkProps = author.url ? {
                href: author.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                title: `Visit ${author.name}'s profile`
              } : {};

              return (
                <CardTag 
                  key={author.id}
                  {...linkProps}
                  className={`p-3.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/95 border border-slate-200/80 hover:border-slate-300 transition-all duration-200 flex items-center gap-3.5 group shadow-2xs hover:shadow-sm ${author.url ? 'cursor-pointer' : ''}`}
                >
                  {/* Round Profile Photo Container */}
                  <div className="relative shrink-0">
                    <div className={`w-13 h-13 rounded-full ring-2 ${author.ringColor} ring-offset-2 overflow-hidden bg-slate-200 flex items-center justify-center shadow-sm`}>
                      {!imgErrors[author.id] ? (
                        <img 
                          src={author.image} 
                          alt={author.name}
                          onError={() => handleImageError(author.id)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold font-mono text-sm flex items-center justify-center">
                          {author.initials}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author Credentials */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs font-bold text-slate-950 truncate font-heading group-hover:text-emerald-700 transition-colors">
                          {author.name}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${author.badgeColor}`}>
                          {author.badge}
                        </span>
                      </div>
                      {author.url && (
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 transition-colors" />
                      )}
                    </div>
                    <div className="text-[11px] font-mono font-semibold text-emerald-800 mt-0.5">
                      {author.index}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {author.role}
                    </div>
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>

        {/* 4. FOURTH ELEMENT: Sleek One-Line Quick Action Bar */}
        <div className="w-full flex justify-center py-1">
          <div className="inline-flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs whitespace-nowrap">
            
            {/* 1. Interactive Mix Simulator */}
            <button
              onClick={() => {
                if (triggerConfetti) triggerConfetti();
                setActiveTab('calculator');
              }}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs tracking-wide transition-all shadow-sm shadow-emerald-700/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Interactive Mix Simulator</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* 2. 2×2 Evaluation Matrix */}
            <button
              onClick={() => setActiveTab('overview')}
              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-emerald-500 text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5 text-sky-700" />
              <span>2×2 Evaluation Matrix</span>
            </button>

            {/* 3. 3D RSM Surfaces */}
            <button
              onClick={() => setActiveTab('surfaces')}
              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-emerald-500 text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
            >
              <Rotate3d className="w-3.5 h-3.5 text-amber-700" />
              <span>3D RSM Surfaces</span>
            </button>

          </div>
        </div>

        {/* 5. FIFTH ELEMENT: Full-Width / Page Fill Bigger Version of the Futuristic Infographic */}
        <div className="pt-4 pb-2 w-full flex flex-col items-center justify-center animate-[fadeIn_0.6s_ease-out]">
          <div className="w-full max-w-6xl">
            <FuturisticInfographic />
          </div>
        </div>

      </div>
    </div>
  );
};
