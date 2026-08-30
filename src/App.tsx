import React, { useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HeroReveal } from './components/HeroReveal';
import { OnaIdea } from './components/OnaIdea';
import { Development } from './components/Development';
import { ResidencesIntro } from './components/ResidencesIntro';
import { ResidenceSelector } from './components/ResidenceSelector';
import { PenthousesSection } from './components/PenthousesSection';
import { InteriorsStory } from './components/InteriorsStory';
import { LifestyleStory } from './components/LifestyleStory';
import { CommercialStory } from './components/CommercialStory';
import { ArchitectureSection } from './components/ArchitectureSection';
import { LocationSection } from './components/LocationSection';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';

export function App() {
  const scrollToSection = useCallback((id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F7F5F0] overflow-x-hidden selection:bg-[#AE9A7C] selection:text-[#080808]">
      {/* 00 Navigation Header */}
      <Header onNavigate={scrollToSection} />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* 01 Arrival at ONA / Hero */}
        <Hero onExploreClick={() => scrollToSection('hero-reveal')} />

        {/* 02 First-Scroll Reveal / Wow Moment */}
        <HeroReveal
          onLiveClick={() => scrollToSection('residences')}
          onLifeClick={() => scrollToSection('lifestyle')}
          onWorkClick={() => scrollToSection('commercial')}
        />

        {/* 03 The ONA Idea (Live / Life / Work) */}
        <OnaIdea
          onExploreResidences={() => scrollToSection('residences')}
          onExploreLifestyle={() => scrollToSection('lifestyle')}
          onExploreCommercial={() => scrollToSection('commercial')}
        />

        {/* 04 The Development / Masterplan */}
        <Development />

        {/* 05 Residences Intro & Interior Teaser */}
        <ResidencesIntro />

        {/* 06 Choose Your Residence / Floor Plans */}
        <ResidenceSelector />

        {/* 07 Signature Penthouses */}
        <PenthousesSection onEnquireClick={() => scrollToSection('enquiry')} />

        {/* 08 Interiors Story */}
        <InteriorsStory />

        {/* 09 Life at ONA */}
        <LifestyleStory />

        {/* 10 Commercial / Work at ONA */}
        <CommercialStory />

        {/* 11 Architecture */}
        <ArchitectureSection />

        {/* 12 Location */}
        <LocationSection />

        {/* 13 Enquiry Form */}
        <EnquirySection />
      </main>

      {/* 14 Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
