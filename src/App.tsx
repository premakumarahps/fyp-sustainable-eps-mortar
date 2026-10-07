import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Analytics } from '@vercel/analytics/react';
import { Navbar, TabKey } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { OverviewParadoxSection } from './components/OverviewParadoxSection.tsx';
import { RawMaterialsStudio } from './components/RawMaterialsStudio.tsx';
import { LaboratoryPhotoGallery } from './components/LaboratoryPhotoGallery.tsx';
import { Phase1BaseMatrixStudio } from './components/Phase1BaseMatrixStudio.tsx';
import { Phase2CompositeStudio } from './components/Phase2CompositeStudio.tsx';
import { ThreeDResponseSurfaceStudio } from './components/ThreeDResponseSurfaceStudio.tsx';
import { MicrostructureItzStudio } from './components/MicrostructureItzStudio.tsx';
import { FiberTougheningStudio } from './components/FiberTougheningStudio.tsx';
import { MixDesignCalculator } from './components/MixDesignCalculator.tsx';
import { RawDataRepository } from './components/RawDataRepository.tsx';
import { ThesisRepositoryExplorer } from './components/ThesisRepositoryExplorer.tsx';
import { Footer } from './components/Footer.tsx';

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#f59e0b', '#a855f7']
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Header */}
      <Hero setActiveTab={setActiveTab} triggerConfetti={triggerConfetti} />

      {/* Main Dynamic Workspace Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
        {activeTab === 'overview' && (
          <OverviewParadoxSection setActiveTab={setActiveTab} />
        )}

        {activeTab === 'materials' && (
          <RawMaterialsStudio />
        )}

        {activeTab === 'gallery' && (
          <LaboratoryPhotoGallery />
        )}

        {activeTab === 'phase1' && (
          <Phase1BaseMatrixStudio />
        )}

        {activeTab === 'phase2' && (
          <Phase2CompositeStudio />
        )}

        {activeTab === 'surfaces' && (
          <ThreeDResponseSurfaceStudio />
        )}

        {activeTab === 'itz' && (
          <MicrostructureItzStudio />
        )}

        {activeTab === 'fibers' && (
          <FiberTougheningStudio />
        )}

        {activeTab === 'calculator' && (
          <MixDesignCalculator triggerConfetti={triggerConfetti} />
        )}

        {activeTab === 'rawdata' && (
          <RawDataRepository />
        )}

        {activeTab === 'thesis' && (
          <ThesisRepositoryExplorer />
        )}
      </main>

      {/* Institutional Academic Footer */}
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
