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
      className="relative w-full bg-[#080808] border-t border-[#171716] overflow-hidden py-24 sm:py-32 lg:py-40"
      aria-label="The Revelation — Two Towers One Destination"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Lead Marker */}
        <div className="flex items-center space-x-3 mb-8 sm:mb-12">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            The Revelation
          </span>
        </div>

        {/* Major Revelation Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-24">
          <div className="lg:col-span-8">
            <h2
              id="reveal-headline"
              className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase"
            >
              TWO TOWERS.
              <br />
              <span className="text-[#AE9A7C] italic font-normal">ONE CONNECTED</span>
              <br />
              DESTINATION.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4">
            <p className="font-sans text-base sm:text-lg text-[#D7D0C5] leading-relaxed mb-6 font-normal">
              {ONA_FACTS.developmentSummary.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-sans tracking-widest text-[#AE9A7C] uppercase font-semibold">
              <span>Two Residential Towers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#AE9A7C]" />
              <span>Commercial Building</span>
            </div>
          </div>
        </div>

        {/* Large Cinematic Aerial Development Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#171716] group mb-16 sm:mb-20">
          <img
            src={ONA_IMAGES.heroAerial.url}
            alt={ONA_IMAGES.heroAerial.alt}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-10">
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#F7F5F0] font-semibold">
              Architectural Vision
            </p>
            <p className="font-sans text-[11px] text-[#D7D0C5]/70 tracking-wider">
              Residential living, commercial suites, and integrated lifestyle amenities
            </p>
          </div>
        </div>

        {/* The 3 Pillars Teaser: LIVE / LIFE / WORK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-[#171716]">
          {/* Pillar 01 */}
          <button
            id="reveal-pillar-live"
            onClick={onLiveClick}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block mb-3">
              01 / LIVE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold group-hover:text-[#AE9A7C] transition-colors mb-2">
              Residences
            </h3>
            <p className="font-sans text-sm text-[#D7D0C5]/80 leading-relaxed">
              Two-bedroom and three-bedroom residences, crowned by top-level signature penthouses.
            </p>
            <span className="inline-block mt-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#AE9A7C] group-hover:translate-x-1 transition-transform">
              Discover Homes →
            </span>
          </button>

          {/* Pillar 02 */}
          <button
            id="reveal-pillar-life"
            onClick={onLifeClick}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block mb-3">
              02 / LIFE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold group-hover:text-[#AE9A7C] transition-colors mb-2">
              Lifestyle & Wellness
            </h3>
            <p className="font-sans text-sm text-[#D7D0C5]/80 leading-relaxed">
              Terrace swimming pool, indoor and outdoor restaurant dining, gym, and coffee space.
            </p>
            <span className="inline-block mt-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#AE9A7C] group-hover:translate-x-1 transition-transform">
              Explore Life →
            </span>
          </button>

          {/* Pillar 03 */}
          <button
            id="reveal-pillar-work"
            onClick={onWorkClick}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block mb-3">
              03 / WORK
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold group-hover:text-[#AE9A7C] transition-colors mb-2">
              Commercial & Suites
            </h3>
            <p className="font-sans text-sm text-[#D7D0C5]/80 leading-relaxed">
              Dedicated commercial office level, coffee & work areas, and ground-floor supermarket.
            </p>
            <span className="inline-block mt-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#AE9A7C] group-hover:translate-x-1 transition-transform">
              View Workspaces →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
