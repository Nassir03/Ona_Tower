import React from 'react';
import { ONA_IMAGES } from '../data/images';

interface OnaIdeaProps {
  onExploreResidences: () => void;
  onExploreLifestyle: () => void;
  onExploreCommercial: () => void;
}

export const OnaIdea: React.FC<OnaIdeaProps> = ({
  onExploreResidences,
  onExploreLifestyle,
  onExploreCommercial,
}) => {
  return (
    <section
      id="ona-idea"
      className="relative w-full bg-[#080808] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48"
      aria-label="The ONA Idea — Live, Life, Work"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Marker */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            The Idea
          </span>
        </div>

        <div className="max-w-3xl mb-16 sm:mb-24">
          <h1 className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase mb-5">
            LIVE. LIFE. WORK.
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#D7D0C5] leading-relaxed">
            Explore how residential living, lifestyle functions and commercial spaces come together across the ONA Towers development.
          </p>
        </div>

        {/* Scene 01: LIVE */}
        <div
          id="idea-scene-live"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-32 sm:mb-44"
        >
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-4">
              01 / LIVE
            </span>
            <h3 className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none mb-6">
              Live.
            </h3>
            <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] mb-4">
              A home above the everyday.
            </p>
            <p className="font-sans text-base text-[#D7D0C5] leading-relaxed mb-8 max-w-md">
              Residential living across two dedicated towers.
            </p>
            <button
              onClick={onExploreResidences}
              className="inline-flex items-center font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors border-b border-[#F7F5F0]/30 pb-1 cursor-pointer"
            >
              Discover Residences →
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#171716]">
              <img
                src={ONA_IMAGES.livePreview.url}
                alt={ONA_IMAGES.livePreview.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scene 02: LIFE */}
        <div
          id="idea-scene-life"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-32 sm:mb-44"
        >
          <div className="lg:col-span-7 order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#171716]">
              <img
                src={ONA_IMAGES.lifePreview.url}
                alt={ONA_IMAGES.lifePreview.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-5 order-2 lg:pl-6">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-4">
              02 / LIFE
            </span>
            <h3 className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none mb-6">
              Life.
            </h3>
            <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] mb-4">
              More than an address.
            </p>
            <p className="font-sans text-base text-[#D7D0C5] leading-relaxed mb-8 max-w-md">
              A rooftop terrace pool, indoor and outdoor restaurant dining, dedicated gym, and social coffee areas.
            </p>
            <button
              onClick={onExploreLifestyle}
              className="inline-flex items-center font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors border-b border-[#F7F5F0]/30 pb-1 cursor-pointer"
            >
              Explore Lifestyle →
            </button>
          </div>
        </div>

        {/* Scene 03: WORK */}
        <div
          id="idea-scene-work"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32"
        >
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-4">
              03 / WORK
            </span>
            <h3 className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none mb-6">
              Work.
            </h3>
            <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] mb-4">
              Business, closer to life.
            </p>
            <p className="font-sans text-base text-[#D7D0C5] leading-relaxed mb-8 max-w-md">
              A dedicated office level alongside meeting spaces, ground-floor coffee work areas, and retail convenience.
            </p>
            <button
              onClick={onExploreCommercial}
              className="inline-flex items-center font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors border-b border-[#F7F5F0]/30 pb-1 cursor-pointer"
            >
              View Workspaces →
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#171716]">
              <img
                src={ONA_IMAGES.workPreview.url}
                alt={ONA_IMAGES.workPreview.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* The Synthesis / Destination Statement */}
        <div className="pt-16 sm:pt-24 border-t border-[#171716] text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#AE9A7C] mb-4">
            LIVE &middot; LIFE &middot; WORK
          </p>
          <h4 className="font-display text-editorial-statement font-semibold text-[#F7F5F0] uppercase">
            One Connected Destination
          </h4>
        </div>
      </div>
    </section>
  );
};
