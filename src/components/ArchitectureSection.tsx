import React from 'react';
import { ONA_IMAGES } from '../data/images';

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="relative w-full bg-[#0A131F] text-[#F8F6F2] py-24 sm:py-36 lg:py-48 border-t border-[#193659]/40"
      aria-label="Architecture and Design Principles"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">
            Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline mb-16 sm:mb-24">
          <div className="lg:col-span-8">
            <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Sculpted Coastal Form</span>
            <h2
              id="architecture-headline"
              className="font-display text-section-headline font-light text-[#FFFFFF] leading-none uppercase tracking-tight"
            >
              DESIGNED WITH PURPOSE.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-base sm:text-lg text-[#D5CFC7] font-light leading-relaxed">
              A contemporary architectural landmark harmonizing sweeping Indian Ocean panoramas with refined sustainable engineering.
            </p>
          </div>
        </div>

        {/* 2-Column Architectural Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Balcony & Façade Detail */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#102035] rounded-sm border border-[#193659] group shadow-2xl">
              <img
                src={ONA_IMAGES.architectureFacade.url}
                alt={ONA_IMAGES.architectureFacade.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#A58A71]">
                  Architecture &middot; Façade
                </span>
                <p className="font-display text-xl text-[#FFFFFF] font-light mt-1">
                  Cantilevered Balconies & Terraces
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed font-light">
              Continuous wrap-around balconies provide natural solar shading while framing uninterrupted views of the turquoise ocean and lush island palms.
            </p>
          </div>

          {/* Right Column: Coastal Materiality */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#102035] rounded-sm border border-[#193659] group shadow-2xl">
              <img
                src={ONA_IMAGES.architectureMaterial.url}
                alt={ONA_IMAGES.architectureMaterial.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#A58A71]">
                  Residential Architecture
                </span>
                <p className="font-display text-xl text-[#FFFFFF] font-light mt-1">
                  Tower Silhouette & Elevation
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed font-light">
              Designed by ONIRIA to redefine coastal luxury living in East Africa, merging world-class hospitality finishes with authentic island serenity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
