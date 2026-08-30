import React from 'react';
import { ONA_IMAGES } from '../data/images';

export const ResidencesIntro: React.FC = () => {
  return (
    <section
      id="residences"
      className="relative w-full bg-[#080808] text-[#F7F5F0] overflow-hidden"
      aria-label="ONA Residences Overview"
    >
      {/* 01: Outdoor Architecture Atmosphere — LIVE ABOVE */}
      <div className="relative py-28 sm:py-36 lg:py-48 border-t border-[#171716]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Label */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-8 h-[1px] bg-[#AE9A7C]" />
            <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
              Residences
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline mb-16 sm:mb-20">
            <div className="lg:col-span-8">
              <h2
                id="residences-headline"
                className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase"
              >
                LIVE ABOVE.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="font-display italic text-2xl sm:text-3xl text-[#D7D0C5] font-normal">
                Homes shaped around light, space and the horizon.
              </p>
            </div>
          </div>

          {/* Full-Bleed Residential Tower Façade Visual */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#171716] group">
            <img
              src={ONA_IMAGES.residencesExterior.url}
              alt={ONA_IMAGES.residencesExterior.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-10">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#AE9A7C] font-semibold">
                Residential Architecture
              </p>
              <p className="font-sans text-sm sm:text-base text-[#F7F5F0]">
                Two dedicated residential towers offering contemporary living in Zanzibar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 02: Interior Teaser */}
      <div className="relative py-28 sm:py-36 lg:py-44 bg-[#171716] border-t border-[#080808]/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-4">
              Inside ONA
            </span>
            <h3
              id="interior-teaser-headline"
              className="font-display text-editorial-statement font-semibold text-[#F7F5F0] leading-none uppercase mb-4"
            >
              SPACE TO BREATHE.
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#D7D0C5]/80 font-normal">
              Open-plan living layouts designed for natural light, ventilation, and effortless connection between indoor and outdoor spaces.
            </p>
          </div>

          {/* Panoramic Interior View */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#080808] group">
            <img
              src={ONA_IMAGES.residenceInteriorTeaser.url}
              alt={ONA_IMAGES.residenceInteriorTeaser.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-10 text-right">
              <span className="font-display text-lg sm:text-xl text-[#F7F5F0] italic block">
                Living Space Concept
              </span>
              <span className="font-sans text-[11px] tracking-widest text-[#AE9A7C] uppercase">
                Contemporary Residential Design
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
