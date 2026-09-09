import React from 'react';
import { ONA_IMAGES } from '../data/images';
import { ONA_FACTS } from '../data/projectFacts';

interface HeroRevealProps {
  onLiveClick: () => void;
  onLifeClick: () => void;
  onWorkClick: () => void;
}

export const HeroReveal: React.FC<HeroRevealProps> = ({ onLiveClick, onLifeClick, onWorkClick }) => {
  return (
    <section
      id="hero-reveal"
      className="relative w-full bg-[#0A131F] border-t border-[#193659]/40 overflow-hidden py-24 sm:py-32 lg:py-40"
      aria-label="The Revelation — Two Towers One Destination"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Lead Marker */}
        <div className="flex items-center space-x-3 mb-8 sm:mb-12">
          <span className="w-8 h-[1px] bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">
            The Revelation
          </span>
        </div>

        {/* Major Revelation Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-24">
          <div className="lg:col-span-8">
            <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Two Towers &middot; Mazizini Coast</span>
            <h2
              id="reveal-headline"
              className="font-display text-section-headline font-light text-[#FFFFFF] leading-none uppercase tracking-tight"
            >
              TWO TOWERS.
              <br />
              <span className="text-[#A58A71] font-script lowercase text-5xl sm:text-7xl block my-1">one connected</span>
              DESTINATION.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4">
            <p className="font-sans text-base sm:text-lg text-[#D5CFC7] leading-relaxed mb-6 font-light">
              {ONA_FACTS.developmentSummary.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-sans tracking-widest text-[#A58A71] uppercase font-semibold">
              <span>Two Residential Towers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A58A71]" />
              <span>Commercial Building</span>
            </div>
          </div>
        </div>

        {/* Large Cinematic Aerial Development Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#102035] rounded-sm border border-[#193659] group mb-16 sm:mb-20 shadow-2xl">
          <img
            src={ONA_IMAGES.heroAerial.url}
            alt={ONA_IMAGES.heroAerial.alt}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-10">
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#FFFFFF] font-medium">
              Architectural Vision &middot; Mazizini Zanzibar
            </p>
            <p className="font-sans text-[11px] text-[#D5CFC7] tracking-wider font-light">
              Residential oceanfront living, commercial suites, and integrated wellness club
            </p>
          </div>
        </div>

        {/* The 3 Pillars Teaser: LIVE / LIFE / WORK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-[#193659]">
          {/* Pillar 01 */}
          <button
            id="reveal-pillar-live"
            onClick={onLiveClick}
            className="text-left group cursor-pointer focus:outline-none p-6 rounded-sm bg-[#102035]/30 border border-[#193659]/50 hover:border-[#A58A71] transition-all"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block mb-3">
              01 / LIVE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] font-light group-hover:text-[#A58A71] transition-colors mb-2">
              Residences
            </h3>
            <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed font-light">
              Two-bedroom and three-bedroom residences, crowned by top-level signature oceanfront penthouses.
            </p>
            <span className="inline-block mt-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#A58A71] group-hover:translate-x-1 transition-transform">
              Discover Homes →
            </span>
          </button>

          {/* Pillar 02 */}
          <button
            id="reveal-pillar-life"
            onClick={onLifeClick}
            className="text-left group cursor-pointer focus:outline-none p-6 rounded-sm bg-[#102035]/30 border border-[#193659]/50 hover:border-[#A58A71] transition-all"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block mb-3">
              02 / LIFE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] font-light group-hover:text-[#A58A71] transition-colors mb-2">
              Lifestyle & Club
            </h3>
            <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed font-light">
              Infinity terrace pool, signature dining, wellness fitness club, and private lounge areas.
            </p>
            <span className="inline-block mt-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#A58A71] group-hover:translate-x-1 transition-transform">
              Explore Life →
            </span>
          </button>

          {/* Pillar 03 */}
          <button
            id="reveal-pillar-work"
            onClick={onWorkClick}
            className="text-left group cursor-pointer focus:outline-none p-6 rounded-sm bg-[#102035]/30 border border-[#193659]/50 hover:border-[#A58A71] transition-all"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block mb-3">
              03 / WORK
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] font-light group-hover:text-[#A58A71] transition-colors mb-2">
              ONA House Suites
            </h3>
            <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed font-light">
              Dedicated commercial office floors, meeting facilities, and ground-floor gourmet market.
            </p>
            <span className="inline-block mt-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#A58A71] group-hover:translate-x-1 transition-transform">
              View Workspaces →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
