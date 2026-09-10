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
      className="relative w-full h-[100svh] min-h-[640px] flex items-end overflow-hidden bg-[#0A131F]"
      aria-label="Arrival at ONA Towers"
    >
      {/* Background Architectural Human-level Arrival Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <img
          src={ONA_IMAGES.heroArrival.url}
          alt={ONA_IMAGES.heroArrival.alt}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-center scale-[1.02] animate-[fadeInScale_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          referrerPolicy="no-referrer"
        />

        {/* Sophisticated Local Navy Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F] via-[#0A131F]/50 to-transparent sm:w-3/4 md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A131F]/80 via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Hero Content — Lower-Left Editorial Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl">
          {/* Developer & Location Badge */}
          <div className="overflow-hidden mb-3 sm:mb-4 flex items-center gap-3">
            <span
              id="hero-developer-label"
              className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#A58A71] uppercase"
            >
              ONIRIA INVESTMENTS
            </span>
            <span className="w-1 h-1 rounded-full bg-[#718F9B]" />
            <span className="text-xs sm:text-sm font-sans tracking-[0.2em] text-[#718F9B] uppercase hidden sm:inline">
              Zanzibar, Tanzania
            </span>
          </div>

          {/* Script Welcome line */}
          <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">
            Welcome to:
          </span>

          {/* Balgin Display Typography */}
          <h1
            id="hero-headline"
            className="font-balgin text-hero-display font-light text-[#FFFFFF] tracking-tight mb-2 uppercase"
          >
            ôNA
          </h1>
          <p className="font-display text-2xl sm:text-4xl tracking-[0.38em] text-[#F8F6F2] uppercase mb-4 sm:mb-6 font-light">
            Towers
          </p>

          {/* Brand Tagline in Signature Script */}
          <p
            id="hero-tagline"
            className="font-script text-3xl sm:text-4xl text-[#C5B19D] tracking-wide mb-8 sm:mb-10 font-normal"
          >
            Live above. See beyond.
          </p>

          {/* Restrained Single CTA */}
          <button
            id="hero-explore-cta"
            onClick={onExploreClick}
            className="group inline-flex items-center space-x-3 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold text-[#F8F6F2] hover:text-[#A58A71] transition-colors cursor-pointer py-2 focus:outline-none focus:ring-1 focus:ring-[#A58A71]"
          >
            <span className="border-b border-[#F8F6F2]/40 pb-1 group-hover:border-[#A58A71] transition-colors">
              Explore ONA
            </span>
            <span className="w-8 h-8 rounded-full border border-[#F8F6F2]/30 flex items-center justify-center group-hover:border-[#A58A71] group-hover:translate-y-0.5 transition-all">
              <ArrowDownRight className="w-4 h-4 text-[#F8F6F2] group-hover:text-[#A58A71]" />
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Right Side Indicator */}
      <div className="hidden lg:flex absolute right-10 bottom-16 z-10 flex-col items-end text-[#D5CFC7]/70 text-[11px] font-sans tracking-widest uppercase">
        <span className="text-[#A58A71] mb-1 font-semibold">Mazizini, Zanzibar</span>
        <span className="text-[#718F9B]">Live Above · See Beyond</span>
      </div>
    </section>
  );
};
