import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { RESIDENCE_TYPOLOGIES } from '../data/residences';
import { FloorPlanModal } from './FloorPlanModal';
import { ONA_IMAGES, ImageKey } from '../data/images';

export const ResidenceSelector: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('2-bedroom');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentTypology =
    RESIDENCE_TYPOLOGIES.find((t) => t.id === activeTabId) || RESIDENCE_TYPOLOGIES[0];

  return (
    <section
      id="residence-selector-section"
      className="relative w-full bg-[#080808] text-[#F7F5F0] py-24 sm:py-36 lg:py-48 border-t border-[#171716]"
      aria-label="Choose Your Residence"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[1px] bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">
            Typology Portfolio
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <h2
              id="selector-headline"
              className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase mb-4"
            >
              CHOOSE YOUR RESIDENCE.
            </h2>
            <p className="font-sans text-base text-[#D7D0C5] max-w-xl font-normal">
              Official project drawings for the confirmed residence typologies across both residential towers.
            </p>
          </div>

          {/* Typology Switcher Tabs */}
          <div
            className="flex flex-wrap items-center gap-1 sm:gap-2 bg-[#171716] p-1.5 border border-[#D7D0C5]/20 self-start lg:self-end"
            role="tablist"
            aria-label="Residence Typologies"
          >
            {RESIDENCE_TYPOLOGIES.map((typology) => {
              const isSelected = typology.id === activeTabId;
              return (
                <button
                  key={typology.id}
                  id={`tab-${typology.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTabId(typology.id)}
                  className={`px-3.5 sm:px-5 py-2.5 sm:py-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F7F5F0] text-[#080808] shadow-sm'
                      : 'text-[#D7D0C5] hover:text-[#FFFDF8] hover:bg-[#080808]/40'
                  }`}
                >
                  {typology.name.split(' ')[0]} {typology.name.split(' ')[1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Typology Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Factual Typography & Spatial Details */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            {/* Monumental Area Typography */}
            <div className="pb-8 border-b border-[#171716]">
              <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-2">
                {currentTypology.code}
              </span>
              <div className="flex items-baseline space-x-4">
                <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-semibold text-[#F7F5F0] tracking-tighter leading-none">
                  {currentTypology.approxAreaSqm}
                </span>
                <div>
                  <span className="font-display text-2xl sm:text-3xl text-[#AE9A7C] font-semibold block leading-none">
                    SQM
                  </span>
                  <span className="font-sans text-xs tracking-widest text-[#D7D0C5] uppercase mt-1 block">
                    {currentTypology.bedrooms} Bedrooms &middot; {currentTypology.areaDisplay}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline & Description */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#F7F5F0] font-semibold mb-3">
                {currentTypology.name}
              </h3>
              <p className="font-display italic text-lg text-[#AE9A7C] mb-4">
                {currentTypology.tagline}
              </p>
              <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">
                {currentTypology.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-2.5 pt-4 border-t border-[#171716] text-xs font-sans">
              <span className="text-[#AE9A7C] uppercase tracking-wider block text-[11px] font-semibold">
                Confirmed Specifications
              </span>
              <ul className="space-y-2 text-xs text-[#D7D0C5]/90">
                {currentTypology.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AE9A7C] mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                id="view-full-plan-btn"
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center space-x-3 px-6 py-3.5 bg-[#F7F5F0] text-[#080808] hover:bg-[#AE9A7C] transition-colors font-sans text-xs font-semibold tracking-[0.2em] uppercase focus:outline-none cursor-pointer"
              >
                <span>Inspect Plan Diagram</span>
                <Maximize2 className="w-4 h-4 text-[#080808] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Floor Plan */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative bg-[#F7F5F0] border border-[#D7D0C5] p-6 sm:p-10 shadow-2xl rounded-sm group overflow-hidden">
              {/* Floor Plan Render */}
              <div className="w-full">
                <img src={ONA_IMAGES[currentTypology.planKey as ImageKey].url} alt={ONA_IMAGES[currentTypology.planKey as ImageKey].alt} className="w-full h-auto max-h-[720px] object-contain" />
              </div>

              {/* Hover inspect prompt button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute inset-0 bg-[#080808]/0 hover:bg-[#080808]/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Click to enlarge floor plan"
              >
                <span className="bg-[#080808] text-[#F7F5F0] px-5 py-2.5 font-sans text-xs font-semibold tracking-widest uppercase shadow-xl">
                  Inspect Detailed Plan
                </span>
              </button>

              {/* Bottom Plan Caption */}
              <div className="mt-4 pt-4 border-t border-[#D7D0C5] flex items-center justify-between text-[11px] font-sans text-[#78716C]">
                <span className="tracking-wider uppercase font-semibold text-[#171716]">
                  {currentTypology.name} &middot; {currentTypology.areaDisplay}
                </span>
                <span className="tracking-widest uppercase text-[#AE9A7C] font-semibold">
                  Project Drawing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Floor Plan Modal */}
      <FloorPlanModal
        typology={currentTypology}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
