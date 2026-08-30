import React from 'react';
import { ONA_IMAGES } from '../data/images';

export const InteriorsStory: React.FC = () => {
  return (
    <section
      id="interiors"
      className="relative w-full bg-[#080808] text-[#F7F5F0] py-24 sm:py-36 lg:py-48 border-t border-[#171716]"
      aria-label="Interior Architecture and Atmosphere"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Marker */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            Interiors
          </span>
        </div>

        {/* Section Main Headline */}
        <div className="max-w-3xl mb-20 sm:mb-32">
          <h2
            id="interiors-headline"
            className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase mb-6"
          >
            SPACE TO BREATHE.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#D7D0C5] leading-relaxed font-normal max-w-2xl">
            Interior visualizations.
          </p>
        </div>

        {/* Scene 01: The Living Space */}
        <div className="mb-24 sm:mb-36">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#171716] group mb-8">
            <img
              src={ONA_IMAGES.interiorLiving.url}
              alt={ONA_IMAGES.interiorLiving.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-10">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block mb-1">
                01 / Living
              </span>
              <p className="font-display text-2xl sm:text-3xl text-[#F7F5F0]">
                Living & Reception Space
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <p className="font-sans text-sm sm:text-base text-[#D7D0C5] leading-relaxed font-normal">
                Interior visualization of the living and reception space.
              </p>
            </div>
            <div className="md:col-span-4 flex items-center md:justify-end text-xs font-sans tracking-widest text-[#AE9A7C] uppercase font-semibold">
              <span>Light &middot; Proportion &middot; Space</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Dual Editorial Scene: Natural Light & Kitchen Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 sm:mb-36">
          {/* Left Column: Light & Atmosphere Scene */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171716] group">
              <img
                src={ONA_IMAGES.interiorOceanView.url}
                alt={ONA_IMAGES.interiorOceanView.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block">
                  02 / Atmosphere
                </span>
                <p className="font-display text-xl text-[#F7F5F0]">
                  Interior Visualization
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
              Living-space visualization.
            </p>
          </div>

          {/* Right Column: Culinary & Dining (Offset) */}
          <div className="lg:col-span-6 space-y-6 lg:pt-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171716] group">
              <img
                src={ONA_IMAGES.interiorKitchen.url}
                alt={ONA_IMAGES.interiorKitchen.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block">
                  03 / Culinary
                </span>
                <p className="font-display text-xl text-[#F7F5F0]">
                  Kitchen & Dining Area
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
              Kitchen and dining visualization.
            </p>
          </div>
        </div>

        {/* Scene 04: Bedroom Sanctuary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#171716] group">
              <img
                src={ONA_IMAGES.interiorBedroom.url}
                alt={ONA_IMAGES.interiorBedroom.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block">
                  04 / Bedroom
                </span>
                <p className="font-display text-xl text-[#F7F5F0]">
                  Bedroom Space
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-6 space-y-6">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block">
              Restful Living
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold leading-tight">
              Calm and private retreats.
            </h3>
            <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
              Bedroom visualization.
            </p>
            <div className="pt-2">
              <span className="font-sans text-xs tracking-widest uppercase text-[#AE9A7C] font-semibold block">
                Interior Visualization
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
