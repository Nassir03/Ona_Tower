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
      className="relative w-full bg-[#0A131F] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 text-[#F8F6F2]"
      aria-label="The ONA Idea — Live, Life, Work"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Marker */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-8 h-[1px] bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">
            ONIRIA Investments · Vision
          </span>
        </div>

        <div className="max-w-3xl mb-16 sm:mb-24">
          <h2 className="font-display text-section-headline font-light text-[#FFFFFF] leading-none uppercase mb-4 tracking-tight">
            We create what doesn’t exist yet.
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#A58A71] mb-6">
            Designed to see beyond
          </p>
          <p className="font-sans text-base sm:text-lg text-[#D5CFC7] leading-relaxed font-light">
            More than a residence, ONA Towers introduces a new expression of elevated living in Mazizini, Zanzibar. Rising as two sculptural landmarks connected by ONA House, shaped by light, ocean breezes and the horizon.
          </p>
        </div>

        {/* Scene 01: LIVE */}
        <div
          id="idea-scene-live"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-32 sm:mb-44"
        >
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A58A71] uppercase block mb-2">
              01 / LIVE · TOWER A
            </span>
            <span className="font-script text-2xl sm:text-3xl text-[#718F9B] block mb-4">
              Wellbeing · Connection · Everyday Pleasure
            </span>
            <h3 className="font-display text-section-headline font-light text-[#FFFFFF] leading-none mb-6">
              Live.
            </h3>
            <p className="font-sans text-base text-[#D5CFC7] leading-relaxed mb-8 max-w-md font-light">
              Tower A is shaped around the rituals of everyday life — Coffee & Bakery, Social Lounge, Mini Market, and Beauty Studio close to home.
            </p>
            <button
              onClick={onExploreResidences}
              className="inline-flex items-center font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F8F6F2] hover:text-[#A58A71] transition-colors border-b border-[#A58A71]/50 pb-1 cursor-pointer"
            >
              Discover Residences →
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#102035] rounded-sm border border-[#193659]/50 shadow-2xl">
              <img
                src={ONA_IMAGES.livePreview.url}
                alt={ONA_IMAGES.livePreview.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scene 02: LIFE */}
        <div
          id="idea-scene-life"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-32 sm:mb-44"
        >
          <div className="lg:col-span-7 order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#102035] rounded-sm border border-[#193659]/50 shadow-2xl">
              <img
                src={ONA_IMAGES.lifePreview.url}
                alt={ONA_IMAGES.lifePreview.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-5 order-2 lg:pl-6">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A58A71] uppercase block mb-2">
              02 / LIFE · LANDSCAPE & GARDENS
            </span>
            <span className="font-script text-2xl sm:text-3xl text-[#718F9B] block mb-4">
              A landscape made for people
            </span>
            <h3 className="font-display text-section-headline font-light text-[#FFFFFF] leading-none mb-6">
              Life.
            </h3>
            <p className="font-sans text-base text-[#D5CFC7] leading-relaxed mb-8 max-w-md font-light">
              Cars are kept away from the heart of the development with dedicated parking at ONA HOUSE — leaving room for lush gardens, shaded pathways, and outdoor calm. Green by design. Calm by nature.
            </p>
            <button
              onClick={onExploreLifestyle}
              className="inline-flex items-center font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F8F6F2] hover:text-[#A58A71] transition-colors border-b border-[#A58A71]/50 pb-1 cursor-pointer"
            >
              Explore Lifestyle →
            </button>
          </div>
        </div>

        {/* Scene 03: WORK / BEYOND */}
        <div
          id="idea-scene-work"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32"
        >
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A58A71] uppercase block mb-2">
              03 / BEYOND · TOWER B
            </span>
            <span className="font-script text-2xl sm:text-3xl text-[#718F9B] block mb-4">
              Culture · Thought · Family
            </span>
            <h3 className="font-display text-section-headline font-light text-[#FFFFFF] leading-none mb-6">
              Beyond.
            </h3>
            <p className="font-sans text-base text-[#D5CFC7] leading-relaxed mb-8 max-w-md font-light">
              The more contemplative side of ONA — Art Salon, Study Lounge, Concierge Desk, and Kids’ Club. A place for minds, families, and ideas to grow.
            </p>
            <button
              onClick={onExploreCommercial}
              className="inline-flex items-center font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F8F6F2] hover:text-[#A58A71] transition-colors border-b border-[#A58A71]/50 pb-1 cursor-pointer"
            >
              View Work & Culture →
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#102035] rounded-sm border border-[#193659]/50 shadow-2xl">
              <img
                src={ONA_IMAGES.workPreview.url}
                alt={ONA_IMAGES.workPreview.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* The Synthesis / Destination Statement */}
        <div className="pt-16 sm:pt-24 border-t border-[#193659]/50 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#A58A71] mb-2">
            LIVE &middot; LIFE &middot; BEYOND
          </p>
          <p className="font-script text-3xl sm:text-4xl text-[#718F9B] mb-3">
            Two towers. Two perspectives.
          </p>
          <h4 className="font-display text-editorial-statement font-light text-[#FFFFFF] uppercase">
            One Unmistakable Presence
          </h4>
        </div>
      </div>
    </section>
  );
};
