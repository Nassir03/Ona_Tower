import React from 'react';
import { ONA_IMAGES } from '../data/images';

export const InteriorsStory: React.FC = () => {
  return (
    <section
      id="interiors"
      className="relative w-full bg-[#302A26] text-[#E7DED6] py-24 sm:py-36 lg:py-48 border-t border-[#403832]"
      aria-label="Interior Architecture and Atmosphere"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Marker */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">
            Interiors
          </span>
        </div>

        {/* Section Main Headline */}
        <div className="max-w-3xl mb-20 sm:mb-32">
          <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Space to Breathe</span>
          <h2
            id="interiors-headline"
            className="font-display text-section-headline font-light text-[#F5F0EA] leading-none uppercase mb-6 tracking-tight"
          >
            LIGHT, SPACE & HARMONY.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#E7DED6] leading-relaxed font-light max-w-2xl">
            Official interior visualizations from the ONA Residences collection. Crafted with neutral stones, warm timbers, and floor-to-ceiling vistas over Zanzibar.
          </p>
        </div>

        {/* Scene 01: The Living Space */}
        <div className="mb-24 sm:mb-36">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#38312C] rounded-sm border border-[#403832] group mb-8 shadow-2xl">
            <img
              src={ONA_IMAGES.interiorLiving.url}
              alt={ONA_IMAGES.interiorLiving.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#302A26]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-10">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block mb-1 text-shadow-image">
                01 / 2-Bedroom Residence
              </span>
              <p className="font-display text-2xl sm:text-3xl text-[#FFFFFF] font-light text-shadow-image">
                Living & Reception Salon
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <p className="font-sans text-sm sm:text-base text-[#E7DED6] leading-relaxed font-light">
                Spacious open-plan living rooms that welcome natural ocean breezes and daylight, framed by flowing private balconies.
              </p>
            </div>
            <div className="md:col-span-4 flex items-center md:justify-end text-xs font-sans tracking-widest text-[#A58A71] uppercase font-semibold">
              <span>Light &middot; Proportion &middot; Space</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Dual Editorial Scene: Natural Light & Kitchen Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 sm:mb-36">
          {/* Left Column: Light & Atmosphere Scene */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#38312C] rounded-sm border border-[#403832] group shadow-2xl">
              <img
                src={ONA_IMAGES.interiorOceanView.url}
                alt={ONA_IMAGES.interiorOceanView.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302A26]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block text-shadow-image">
                  02 / 3-Bedroom Residence
                </span>
                <p className="font-display text-xl text-[#FFFFFF] font-light text-shadow-image">
                  Panoramic Horizon Living
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#E7DED6] leading-relaxed font-light">
              Generous floorplans opening to panoramic views across the island landscape toward the turquoise Indian Ocean.
            </p>
          </div>

          {/* Right Column: Culinary & Dining (Offset) */}
          <div className="lg:col-span-6 space-y-6 lg:pt-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#38312C] rounded-sm border border-[#403832] group shadow-2xl">
              <img
                src={ONA_IMAGES.interiorKitchen.url}
                alt={ONA_IMAGES.interiorKitchen.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302A26]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block text-shadow-image">
                  03 / Open-Plan Living & Dining
                </span>
                <p className="font-display text-xl text-[#FFFFFF] font-light text-shadow-image">
                  Kitchen & Entertaining Space
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-[#E7DED6] leading-relaxed font-light">
              Contemporary kitchens with sleek cabinetry, integrated islands, and premium surfaces designed for effortless hosting.
            </p>
          </div>
        </div>

        {/* Scene 04: Bedroom Sanctuary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#38312C] rounded-sm border border-[#403832] group shadow-2xl">
              <img
                src={ONA_IMAGES.interiorBedroom.url}
                alt={ONA_IMAGES.interiorBedroom.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302A26]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block text-shadow-image">
                  04 / Suite Retreat
                </span>
                <p className="font-display text-xl text-[#FFFFFF] font-light text-shadow-image">
                  Primary Bedroom Sanctuary
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-6 space-y-6">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block">
              Restful Living
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F5F0EA] font-light leading-tight">
              Calm and private retreats.
            </h3>
            <p className="font-sans text-sm text-[#E7DED6] leading-relaxed font-light">
              Bedrooms conceived as quiet sanctuaries with natural finishes, warm illumination, and custom acoustic layering.
            </p>
            <div className="pt-2">
              <span className="font-script text-2xl text-[#A58A71] block">
                Zanzibar Living Above
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
