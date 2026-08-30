import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ONA_IMAGES } from '../data/images';
import { ONA_FACTS } from '../data/projectFacts';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] flex items-end overflow-hidden bg-[#080808]"
      aria-label="Arrival at ONA Towers"
    >
      {/* Background Architectural Human-level Arrival Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <img
          src={ONA_IMAGES.heroArrival.url}
          alt={ONA_IMAGES.heroArrival.alt}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-center scale-[1.03] animate-[fadeInScale_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          referrerPolicy="no-referrer"
        />

        {/* Sophisticated Local Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/40 to-transparent sm:w-3/4 md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Hero Content — Lower-Left Editorial Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl">
          {/* Location */}
          <div className="overflow-hidden mb-3 sm:mb-4">
            <span
              id="hero-location-label"
              className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#AE9A7C] uppercase"
            >
              {ONA_FACTS.location}
            </span>
          </div>

          {/* Monumental Serif Typography */}
          <h1
            id="hero-headline"
            className="font-display text-hero-display font-semibold text-[#F7F5F0] tracking-tight mb-4 sm:mb-6 uppercase"
          >
            ONA
            <br />
            TOWERS
          </h1>

          {/* Brand Tagline */}
          <p
            id="hero-tagline"
            className="font-display italic text-2xl sm:text-3xl text-[#D7D0C5] tracking-wide mb-8 sm:mb-10 font-normal"
          >
            {ONA_FACTS.tagline}
          </p>

          {/* Restrained Single CTA */}
          <button
            id="hero-explore-cta"
            onClick={onExploreClick}
            className="group inline-flex items-center space-x-3 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors cursor-pointer py-2 focus:outline-none focus:ring-1 focus:ring-[#AE9A7C]"
          >
            <span className="border-b border-[#F7F5F0]/40 pb-1 group-hover:border-[#AE9A7C] transition-colors">
              Explore ONA
            </span>
            <span className="w-8 h-8 rounded-full border border-[#F7F5F0]/30 flex items-center justify-center group-hover:border-[#AE9A7C] group-hover:translate-y-0.5 transition-all">
              <ArrowDownRight className="w-4 h-4 text-[#F7F5F0] group-hover:text-[#AE9A7C]" />
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Right Side Indicator */}
      <div className="hidden lg:flex absolute right-10 bottom-16 z-10 flex-col items-end text-[#D7D0C5]/60 text-[11px] font-sans tracking-widest uppercase">
        <span className="text-[#AE9A7C] mb-1">{ONA_FACTS.projectName}</span>
        <span>{ONA_FACTS.location}</span>
      </div>
    </section>
  );
};
