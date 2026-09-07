import React from 'react';
import { COMMERCIAL_MODULES } from '../data/residences';
import { ONA_IMAGES, ImageKey } from '../data/images';

export const CommercialStory: React.FC = () => {
  return (
    <section
      id="commercial"
      className="relative w-full bg-[#080808] text-[#F7F5F0] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 border-t border-[#171716]"
      aria-label="Commercial and Workspace at ONA"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            Commercial / Service Building
          </span>
        </div>

        <div className="max-w-3xl mb-16 sm:mb-24">
          <h1
            id="commercial-headline"
            className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase mb-4"
          >
            WORK AT ONA.
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#D7D0C5] leading-relaxed font-normal">
            A separate commercial / service building with a ground floor for supermarket and work functions, a dedicated office level, and a terrace lifestyle level including restaurant, pool, and gym.
          </p>
        </div>

        {/* 3 Commercial Scenes: WORK / MEET / CONVENIENCE */}
        <div className="space-y-24 sm:space-y-36">
          {COMMERCIAL_MODULES.map((module, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={module.id}
                id={`commercial-module-${module.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Column */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#171716] group">
                    <img
                      src={ONA_IMAGES[module.imageKey as ImageKey]?.url || ONA_IMAGES.commercialOffice.url}
                      alt={ONA_IMAGES[module.imageKey as ImageKey]?.alt || module.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="font-sans text-[11px] tracking-widest text-[#AE9A7C] uppercase font-semibold">
                        Commercial / Service Building &middot; {module.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                  <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block">
                    {module.label}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#F7F5F0] font-semibold leading-tight">
                    {module.title}
                  </h3>
                  <p className="font-display italic text-lg text-[#AE9A7C]">
                    {module.lead}
                  </p>
                  <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
                    {module.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-[#171716] space-y-2">
                    {module.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-[#D7D0C5]/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AE9A7C] flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
