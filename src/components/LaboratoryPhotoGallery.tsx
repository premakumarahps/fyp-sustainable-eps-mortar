import React, { useState, useMemo, useEffect } from 'react';
import { 
  Camera, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  FlaskConical, 
  Layers, 
  Microscope, 
  ShieldCheck,
  Tag,
  Info
} from 'lucide-react';
import { LABORATORY_PHOTOS, LabPhoto } from '../core/laboratoryPhotosData.ts';

type CategoryFilter = 'All' | 'Raw Materials' | 'Fresh Properties & Mixing' | 'Casting & Curing' | 'Microstructure & SEM';

export const LaboratoryPhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<LabPhoto | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All': LABORATORY_PHOTOS.length,
      'Raw Materials': 0,
      'Fresh Properties & Mixing': 0,
      'Casting & Curing': 0,
      'Microstructure & SEM': 0
    };
    LABORATORY_PHOTOS.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Top popular tags
  const popularTags = useMemo(() => {
    const tagMap: Record<string, number> = {};
    LABORATORY_PHOTOS.forEach(p => {
      p.tags.forEach(t => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      });
    });
    return Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, []);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return LABORATORY_PHOTOS.filter(photo => {
      const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
      const matchesTag = !selectedTag || photo.tags.includes(selectedTag);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        photo.title.toLowerCase().includes(query) ||
        photo.subtitle.toLowerCase().includes(query) ||
        photo.description.toLowerCase().includes(query) ||
        photo.tags.some(t => t.toLowerCase().includes(query)) ||
        photo.filename.toLowerCase().includes(query);
      
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  // Keyboard navigation for active lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredPhotos.findIndex(p => p.id === activePhoto.id);
        if (currentIndex < filteredPhotos.length - 1) {
          setActivePhoto(filteredPhotos[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredPhotos.findIndex(p => p.id === activePhoto.id);
        if (currentIndex > 0) {
          setActivePhoto(filteredPhotos[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, filteredPhotos]);

  const handleCopyLink = (photo: LabPhoto) => {
    const url = `${window.location.origin}${photo.webPath}`;
    navigator.clipboard.writeText(url);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Raw Materials':
        return <FlaskConical className="w-4 h-4 text-amber-400" />;
      case 'Fresh Properties & Mixing':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'Casting & Curing':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Microstructure & SEM':
        return <Microscope className="w-4 h-4 text-purple-400" />;
      default:
        return <Camera className="w-4 h-4 text-slate-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Raw Materials':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Fresh Properties & Mixing':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Casting & Curing':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Microstructure & SEM':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="materials-glass p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Camera className="w-3.5 h-3.5" />
              <span>Experimental Laboratory Photographic Archive · 83 Verified Curated Assets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Laboratory Research & Specimen Gallery
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete photographic documentation of raw material characterization (EPS & RHA), EN 196-1 standardized mixing, ASTM C1437 mini-slump flow test rheology, steel prism fabrication, and high-resolution SEM/EDAX elemental spectroscopy at the University of Moratuwa Materials Science laboratories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Deduplication Status</div>
                <div className="text-sm font-bold text-white">100% Curated & Distinct</div>
              </div>
            </div>

            <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Resolution Tier</div>
                <div className="text-sm font-bold text-white">Full HD / WebP Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel: Categories, Search, and Tag Filters */}
      <div className="materials-glass p-5 rounded-2xl border border-slate-800/80 space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Raw Materials', 'Fresh Properties & Mixing', 'Casting & Curing', 'Microstructure & SEM'] as CategoryFilter[]).map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-white border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-emerald-400/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by apparatus, ASTM/EN standard, specimen ID, or tag..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3" />
              <span>Trending:</span>
            </span>
            {popularTags.map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
              >
                Clear Tag
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Showing Count Information */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <strong className="text-white font-mono">{filteredPhotos.length}</strong> of{' '}
          <strong className="text-slate-200 font-mono">{LABORATORY_PHOTOS.length}</strong> laboratory photographs
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <Info className="w-3 h-3 text-cyan-400" />
          <span>Click on any image card to open full-resolution technical lightbox with standards</span>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => {
          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="materials-card group cursor-pointer overflow-hidden rounded-xl border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <picture>
                  <source srcSet={photo.webPath} type="image/webp" />
                  <img
                    src={photo.fallbackPath}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                  <span className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 px-2 py-0.5 rounded border border-emerald-500/30">
                    {photo.width} × {photo.height}
                  </span>
                  <div className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Category Pill Tag */}
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border backdrop-blur-md ${getCategoryBadgeClass(photo.category)}`}>
                    {photo.category}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-cyan-400 font-mono mt-0.5 line-clamp-1">
                    {photo.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                {/* Card Tags Footer */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/60">
                  {photo.tags.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                  {photo.tags.length > 3 && (
                    <span className="text-[9px] px-1 py-0.5 text-slate-500 font-mono">
                      +{photo.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="materials-glass p-12 text-center rounded-2xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">No photographs matched your query</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or reset category filters to view all 83 verified laboratory photos.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTag(null);
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Full-Screen Technical Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-2xl"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          <button
            onClick={() => {
              const idx = filteredPhotos.findIndex(p => p.id === activePhoto.id);
              if (idx > 0) setActivePhoto(filteredPhotos[idx - 1]);
            }}
            disabled={filteredPhotos.findIndex(p => p.id === activePhoto.id) === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => {
              const idx = filteredPhotos.findIndex(p => p.id === activePhoto.id);
              if (idx < filteredPhotos.length - 1) setActivePhoto(filteredPhotos[idx + 1]);
            }}
            disabled={filteredPhotos.findIndex(p => p.id === activePhoto.id) === filteredPhotos.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Modal Content Container */}
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Left Image Viewport */}
            <div className="flex-1 bg-black flex items-center justify-center p-2 sm:p-4 relative min-h-[350px] lg:min-h-[550px]">
              <picture>
                <source srcSet={activePhoto.webPath} type="image/webp" />
                <img
                  src={activePhoto.fallbackPath}
                  alt={activePhoto.title}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />
              </picture>
            </div>

            {/* Right Metadata Sidebar */}
            <div className="w-full lg:w-96 p-6 flex flex-col justify-between overflow-y-auto bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 space-y-6">
              <div className="space-y-4">
                {/* Header Category Pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-mono border ${getCategoryBadgeClass(activePhoto.category)}`}>
                    {activePhoto.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {filteredPhotos.findIndex(p => p.id === activePhoto.id) + 1} / {filteredPhotos.length}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-white font-heading leading-snug">
                    {activePhoto.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    {activePhoto.subtitle}
                  </div>
                </div>

                {/* Technical Description */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  {activePhoto.description}
                </div>

                {/* Technical Specifications Specs List */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-mono">Standard Code:</span>
                    <span className="text-emerald-400 font-mono font-medium">EN 196-1 / ASTM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-mono">Curated Filename:</span>
                    <span className="text-slate-200 font-mono text-[11px] truncate max-w-[180px]">{activePhoto.filename}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-mono">Original Reference:</span>
                    <span className="text-slate-400 font-mono text-[11px]">{activePhoto.originalFilename}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-mono">Aspect Dimensions:</span>
                    <span className="text-slate-200 font-mono">{activePhoto.width} × {activePhoto.height} px</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-mono">Optimized Size:</span>
                    <span className="text-cyan-300 font-mono">{activePhoto.sizeKb} KB (WebP)</span>
                  </div>
                </div>

                {/* All Tags */}
                <div>
                  <div className="text-[11px] text-slate-400 font-mono mb-1.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>Scientific Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activePhoto.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
                <a
                  href={activePhoto.webPath}
                  download={activePhoto.filename}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Web-Ready Image</span>
                </a>

                <button
                  onClick={() => handleCopyLink(activePhoto)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                >
                  {copiedId === activePhoto.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Image Asset URL Copied!</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Copy Direct Asset URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
