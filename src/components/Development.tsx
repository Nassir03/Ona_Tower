import React, { useEffect, useState } from 'react';
import { MASTERPLAN_HOTSPOTS } from '../data/residences';
import { ONA_IMAGES } from '../data/images';
import { MasterplanHotspot } from '../types';
import { ONA_FACTS } from '../data/projectFacts';
import { listSmartFeatures, type SmartFeatureApi } from '../api/content';

export const Development: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<MasterplanHotspot>(MASTERPLAN_HOTSPOTS[0]);
  const [smartFeatures, setSmartFeatures] = useState<SmartFeatureApi[]>([
    {
      id: 'integrated-mixed-use-living',
      name: 'Integrated mixed-use living',
      benefit_statement: 'Residences, lifestyle facilities and commercial functions are brought together within one development.',
      display_order: 1,
    },
  ]);

  useEffect(() => {
    let active = true;
    listSmartFeatures()
      .then((items) => {
        if (active) setSmartFeatures(items);
      })
      .catch(() => {
        // The verified masterplan remains available if the API is offline.
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="development"
      className="relative w-full bg-[#F7F5F0] text-[#171716] py-24 sm:py-36 lg:py-48"
      aria-label="The Development and Masterplan"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Lead Marker */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            The Development
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2
            id="development-headline"
            className="font-display text-section-headline font-semibold text-[#171716] leading-none uppercase mb-6"
          >
            Discover ONA.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#171716]/80 leading-relaxed max-w-2xl font-normal">
            {ONA_FACTS.developmentSummary.description}
          </p>
        </div>

        {/* Masterplan Interactive View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Masterplan Graphic Canvas with Interactive Subtle Markers */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-[#EAE5DB] border border-[#D7D0C5] overflow-hidden group">
            <img
              src={ONA_IMAGES.masterplan.url}
              alt={ONA_IMAGES.masterplan.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[#080808]/20 pointer-events-none" />

            {/* Interactive Markers */}
            {MASTERPLAN_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  style={{ left: `${hotspot.xPercent}%`, top: `${hotspot.yPercent}%` }}
                  className="hidden"
                  aria-label={`Select ${hotspot.title}`}
                >
                  <span className="relative flex items-center justify-center">
                    {/* Outer pulse */}
                    <span
                      className={`absolute w-10 h-10 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#AE9A7C]/40 scale-125'
                          : 'bg-[#080808]/20 group-hover:scale-110'
                      }`}
                    />
                    {/* Inner pin */}
                    <span
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#AE9A7C] text-[#080808] shadow-lg ring-2 ring-white'
                          : 'bg-[#080808] text-[#F7F5F0] group-hover:bg-[#AE9A7C] group-hover:text-[#080808]'
                      }`}
                    >
                      {hotspot.number}
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Visual caption */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-[#080808]/80 text-[#F7F5F0] px-4 py-2 text-xs font-sans tracking-widest backdrop-blur-sm uppercase">
              ONA Towers Development Masterplan
            </div>
          </div>

          {/* Masterplan Detail Inspector */}
          <div className="lg:col-span-4 bg-[#FFFDF8] border border-[#D7D0C5] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#D7D0C5]/60 mb-6">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase">
                {selectedHotspot.number} / {selectedHotspot.category}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#78716C]">
                Zanzibar
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#171716] leading-snug mb-4">
              {selectedHotspot.title}
            </h3>

            <p className="font-sans text-sm text-[#171716]/80 leading-relaxed mb-6 font-normal">
              {selectedHotspot.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#D7D0C5]/60 mb-8">
              <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#78716C]">
                Confirmed Structure
              </p>
              {selectedHotspot.keyDetails.map((detail, index) => (
                <div key={index} className="flex items-start space-x-2 text-xs text-[#171716]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AE9A7C] mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>

            {/* Quick selector buttons */}
            <div className="grid grid-cols-1 gap-2">
              {MASTERPLAN_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`py-2.5 px-3.5 text-left text-xs font-sans transition-all border cursor-pointer ${
                    selectedHotspot.id === spot.id
                      ? 'border-[#AE9A7C] bg-[#EAE5DB] font-semibold text-[#171716]'
                      : 'border-[#D7D0C5]/70 bg-transparent text-[#78716C] hover:border-[#171716] hover:text-[#171716]'
                  }`}
                >
                  <span className="text-[#AE9A7C] mr-2 font-bold">{spot.number}</span> {spot.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {smartFeatures.length > 0 && (
          <div className="mt-12 sm:mt-16 border-t border-[#D7D0C5] pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-8 h-px bg-[#AE9A7C]" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AE9A7C]">Connected living</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smartFeatures.map((feature) => (
                <article key={feature.id} className="border border-[#D7D0C5] bg-[#FFFDF8] p-6">
                  <h3 className="font-display text-2xl font-semibold text-[#171716]">{feature.name}</h3>
                  <p className="font-sans text-sm text-[#171716]/75 leading-relaxed mt-3">{feature.benefit_statement}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
