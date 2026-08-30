import React from 'react';
import { ONA_IMAGES } from '../data/images';

interface PenthousesSectionProps {
  onEnquireClick: () => void;
}

export const PenthousesSection: React.FC<PenthousesSectionProps> = ({ onEnquireClick }) => {
  return (
    <section
      id="penthouses"
      className="relative w-full bg-[#080808] text-[#F7F5F0] py-28 sm:py-40 lg:py-52 overflow-hidden border-t border-[#171716]"
      aria-label="Signature Penthouses"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Mood Shift Lead */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.28em] uppercase text-[#AE9A7C]">
            Signature Residences
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline mb-16 sm:mb-24">
          <div className="lg:col-span-8">
            <h2
              id="penthouses-headline"
              className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase"
            >
              PENTHOUSES.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] font-normal">
              Top residential level living.
            </p>
          </div>
        </div>

        {/* Dramatic Penthouse Visual */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#171716] group mb-16 sm:mb-20">
          <img
            src={ONA_IMAGES.penthouseTerrace.url}
            alt={ONA_IMAGES.penthouseTerrace.alt}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 max-w-xl">
            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-2">
              Signature Penthouse Level
            </span>
            <p className="font-display text-2xl sm:text-3xl text-[#F7F5F0] font-semibold leading-tight">
              Two confirmed signature penthouse typologies for the penthouse level.
            </p>
          </div>
        </div>

        {/* Penthouse Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 py-12 border-y border-[#171716]">
          {/* Penthouse 01 */}
          <div className="space-y-3 p-6 sm:p-8 bg-[#171716] border border-[#D7D0C5]/10">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block">
              Penthouse Typology 01
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold">
              03 Bedroom Penthouse
            </h3>
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="font-display text-4xl sm:text-5xl text-[#AE9A7C] font-semibold">
                416
              </span>
              <span className="font-sans text-xs tracking-widest text-[#D7D0C5] uppercase">
                Approx. SQM Total Area
              </span>
            </div>
            <p className="font-sans text-sm text-[#D7D0C5]/80 leading-relaxed pt-2">
              Three-bedroom penthouse residence on the penthouse level.
            </p>
          </div>

          {/* Penthouse 02 */}
          <div className="space-y-3 p-6 sm:p-8 bg-[#171716] border border-[#D7D0C5]/10">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block">
              Penthouse Typology 02
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold">
              04 Bedroom Penthouse
            </h3>
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="font-display text-4xl sm:text-5xl text-[#AE9A7C] font-semibold">
                482
              </span>
              <span className="font-sans text-xs tracking-widest text-[#D7D0C5] uppercase">
                Approx. SQM Total Area
              </span>
            </div>
            <p className="font-sans text-sm text-[#D7D0C5]/80 leading-relaxed pt-2">
              Four-bedroom penthouse residence on the penthouse level.
            </p>
          </div>
        </div>

        {/* Penthouse Callout */}
        <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-sans text-xs text-[#D7D0C5] tracking-widest uppercase">
            3-bedroom and 4-bedroom signature penthouse typologies.
          </p>
          <button
            onClick={onEnquireClick}
            className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#080808] bg-[#AE9A7C] hover:bg-[#F7F5F0] px-8 py-3.5 transition-colors cursor-pointer"
          >
            Register Interest for Penthouses →
          </button>
        </div>
      </div>
    </section>
  );
};
