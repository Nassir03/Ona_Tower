import React from 'react';
import { ONA_IMAGES } from '../data/images';

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="relative w-full bg-[#080808] text-[#F7F5F0] py-24 sm:py-36 lg:py-48 border-t border-[#171716]"
      aria-label="Architecture and Design Principles"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline mb-16 sm:mb-24">
          <div className="lg:col-span-8">
            <h2
              id="architecture-headline"
              className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase"
            >
              DESIGNED WITH PURPOSE.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] font-normal">
              A contemporary mixed-use development in Zanzibar.
            </p>
          </div>
        </div>

        {/* 2-Column Architectural Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Balcony & Façade Detail */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171716] group">
              <img
                src={ONA_IMAGES.architectureFacade.url}
                alt={ONA_IMAGES.architectureFacade.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#AE9A7C]">
                  Architecture
                </span>
                <p className="font-display text-xl text-[#F7F5F0]">
                  Exterior Detail
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
              An architectural close-up.
            </p>
          </div>

          {/* Right Column: Coastal Materiality */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171716] group">
              <img
                src={ONA_IMAGES.architectureMaterial.url}
                alt={ONA_IMAGES.architectureMaterial.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#AE9A7C]">
                  Residential Architecture
                </span>
                <p className="font-display text-xl text-[#F7F5F0]">
                  Tower Form
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
              ONA Towers brings residential, commercial and lifestyle spaces together in Zanzibar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
