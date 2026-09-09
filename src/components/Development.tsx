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
      className="relative w-full bg-[#0A131F] text-[#F8F6F2] py-24 sm:py-36 lg:py-48 border-t border-[#193659]/40"
      aria-label="The Development and Masterplan"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Lead Marker */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">
            The Development
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Masterplan & Architecture</span>
          <h2
            id="development-headline"
            className="font-display text-section-headline font-light text-[#FFFFFF] leading-none uppercase mb-6 tracking-tight"
          >
            DISCOVER ONA.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#D5CFC7] leading-relaxed max-w-2xl font-light">
            {ONA_FACTS.developmentSummary.description}
          </p>
        </div>

        {/* Masterplan Interactive View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Masterplan Graphic Canvas with Interactive Subtle Markers */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-[#102035] rounded-sm border border-[#193659] overflow-hidden group shadow-2xl">
            <img
              src={ONA_IMAGES.masterplan.url}
              alt={ONA_IMAGES.masterplan.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[#0A131F]/30 pointer-events-none" />

            {/* Visual caption */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-[#0A131F]/85 text-[#F8F6F2] border border-[#A58A71]/40 px-4 py-2 text-xs font-sans tracking-widest backdrop-blur-sm uppercase">
              ONA Towers Development Masterplan &middot; Mazizini
            </div>
          </div>

          {/* Masterplan Detail Inspector */}
          <div className="lg:col-span-4 bg-[#102035] border border-[#193659] p-6 sm:p-8 rounded-sm shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#193659] mb-6">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase">
                {selectedHotspot.number} / {selectedHotspot.category}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#718F9B]">
                Zanzibar
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-light text-[#FFFFFF] leading-snug mb-2">
              {selectedHotspot.title}
            </h3>

            <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed mb-6 font-light">
              {selectedHotspot.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#193659] mb-8">
              <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#A58A71]">
                Confirmed Structure
              </p>
              {selectedHotspot.keyDetails.map((detail, index) => (
                <div key={index} className="flex items-start space-x-2 text-xs text-[#D5CFC7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A58A71] mt-1.5 flex-shrink-0" />
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
                  className={`py-2.5 px-3.5 text-left text-xs font-sans transition-all border cursor-pointer rounded-sm ${
                    selectedHotspot.id === spot.id
                      ? 'border-[#A58A71] bg-[#A58A71] font-semibold text-white shadow-md'
                      : 'border-[#193659] bg-[#0A131F]/50 text-[#D5CFC7] hover:border-[#A58A71] hover:text-white'
                  }`}
                >
                  <span className="text-[#718F9B] mr-2 font-bold">{spot.number}</span> {spot.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {smartFeatures.length > 0 && (
          <div className="mt-12 sm:mt-16 border-t border-[#193659] pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-8 h-px bg-[#A58A71]" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A58A71]">Connected Living</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smartFeatures.map((feature) => (
                <article key={feature.id} className="border border-[#193659] bg-[#102035] p-6 rounded-sm">
                  <h3 className="font-display text-2xl font-light text-[#FFFFFF]">{feature.name}</h3>
                  <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed mt-3 font-light">{feature.benefit_statement}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
