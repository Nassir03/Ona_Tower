import React, { useEffect, useMemo, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { getResidence, listResidences, type ResidenceDetailApi, type ResidenceSummaryApi } from '../api/residences';
import { RESIDENCE_TYPOLOGIES } from '../data/residences';
import { FloorPlanModal } from './FloorPlanModal';
import { ONA_IMAGES, type ImageKey } from '../data/images';
import type { ResidenceTypology } from '../types';

export const ResidenceSelector: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('2-bedroom');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [summaries, setSummaries] = useState<Record<string, ResidenceSummaryApi>>({});
  const [detail, setDetail] = useState<ResidenceDetailApi | null>(null);

  useEffect(() => {
    let active = true;
    listResidences()
      .then((items) => {
        if (!active) return;
        setSummaries(Object.fromEntries(items.map((item) => [item.slug, item])));
      })
      .catch(() => {
        // Static verified project data remains available when the API is offline.
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setDetail(null);
    getResidence(activeTabId)
      .then((item) => {
        if (active) setDetail(item);
      })
      .catch(() => {
        // Keep the page usable from the verified local fallback data.
      });
    return () => {
      active = false;
    };
  }, [activeTabId]);

  const currentTypology = useMemo<ResidenceTypology>(() => {
    const fallback = RESIDENCE_TYPOLOGIES.find((item) => item.id === activeTabId) || RESIDENCE_TYPOLOGIES[0];
    const apiItem = detail?.slug === activeTabId ? detail : summaries[activeTabId];

    return {
      ...fallback,
      name: apiItem?.name || fallback.name,
      bedrooms: apiItem?.bedrooms ?? fallback.bedrooms,
      approxAreaSqm: apiItem?.size_m2 ?? fallback.approxAreaSqm,
      areaDisplay: apiItem?.size_m2 != null ? `Approx. ${Number(apiItem.size_m2)} sqm` : fallback.areaDisplay,
      description: detail?.short_description || apiItem?.short_description || fallback.description,
      features: detail?.features?.length ? detail.features : fallback.features,
    };
  }, [activeTabId, detail, summaries]);

  const fallbackPlan = ONA_IMAGES[currentTypology.planKey as ImageKey];
  const apiPlanPreview = detail?.floor_plans?.find((plan) => plan.preview_image_url)?.preview_image_url;
  const planUrl = apiPlanPreview || detail?.cover_image || summaries[activeTabId]?.cover_image || fallbackPlan.url;

  return (
    <section id="residence-selector-section" className="relative w-full bg-[#302A26] text-[#E7DED6] py-24 sm:py-36 lg:py-48 border-t border-[#403832]" aria-label="Choose Your Residence">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">Typology Portfolio</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Designed for Elevated Living</span>
            <h2 id="selector-headline" className="font-display text-section-headline font-light text-[#F5F0EA] leading-none uppercase mb-4 tracking-tight">CHOOSE YOUR RESIDENCE.</h2>
            <p className="font-sans text-base text-[#E7DED6] max-w-xl font-light">Official architectural drawings and confirmed floor dimensions for each residence typology.</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#38312C] p-1.5 border border-[#403832] self-start lg:self-end rounded-sm" role="tablist" aria-label="Residence Typologies">
            {RESIDENCE_TYPOLOGIES.map((typology) => {
              const isSelected = typology.id === activeTabId;
              return (
                <button
                  key={typology.id}
                  id={`tab-${typology.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTabId(typology.id)}
                  className={`px-3.5 sm:px-5 py-2.5 sm:py-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase transition-all cursor-pointer rounded-xs ${
                    isSelected ? 'bg-[#A58A71] text-[#FFFFFF] shadow-md' : 'text-[#CFC2B7] hover:text-[#FFFFFF] hover:bg-[#403832]'
                  }`}
                >
                  {typology.name.split(' ')[0]} {typology.name.split(' ')[1]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="pb-8 border-b border-[#403832]">
              <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A58A71] uppercase block mb-2">{currentTypology.code}</span>
              <div className="flex items-baseline space-x-4">
                <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-light text-[#F5F0EA] tracking-tighter leading-none">{currentTypology.approxAreaSqm}</span>
                <div>
                  <span className="font-display text-2xl sm:text-3xl text-[#A58A71] font-medium block leading-none">SQM</span>
                  <span className="font-sans text-xs tracking-widest text-[#CFC2B7] uppercase mt-1 block">{currentTypology.bedrooms} Bedrooms &middot; {currentTypology.areaDisplay}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#F5F0EA] font-light mb-3">{currentTypology.name}</h3>
              <p className="font-script text-2xl text-[#A58A71] mb-4">{currentTypology.tagline}</p>
              <p className="font-sans text-sm text-[#E7DED6] leading-relaxed font-light">{currentTypology.description}</p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#403832] text-xs font-sans">
              <span className="text-[#A58A71] uppercase tracking-wider block text-[11px] font-semibold">Confirmed Specifications</span>
              <ul className="space-y-2 text-xs text-[#E7DED6]">
                {currentTypology.features.map((feature, index) => (
                  <li key={`${feature}-${index}`} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A58A71] mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button id="view-full-plan-btn" onClick={() => setIsModalOpen(true)} className="group inline-flex items-center space-x-3 px-6 py-3.5 bg-[#A58A71] text-[#FFFFFF] hover:bg-[#917860] transition-colors font-sans text-xs font-semibold tracking-[0.2em] uppercase focus:outline-none cursor-pointer shadow-lg rounded-xs">
                <span>Inspect Plan Diagram</span>
                <Maximize2 className="w-4 h-4 text-[#FFFFFF] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative bg-[#F3EEE7] border border-[#A58A71]/35 p-6 sm:p-10 shadow-2xl rounded-sm group overflow-hidden">
              <div className="w-full flex items-center justify-center min-h-[440px]">
                <img src={planUrl} alt={`${currentTypology.name} project drawing`} className="w-full h-auto max-h-[720px] object-contain" />
              </div>
              <button onClick={() => setIsModalOpen(true)} className="absolute inset-0 bg-[#302A26]/0 hover:bg-[#302A26]/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer" aria-label="Click to enlarge floor plan">
                <span className="bg-[#302A26] text-[#F5F0EA] border border-[#A58A71] px-5 py-2.5 font-sans text-xs font-semibold tracking-widest uppercase shadow-xl rounded-xs">Inspect Detailed Plan</span>
              </button>
              <div className="mt-4 pt-4 border-t border-[#DED4CA] flex items-center justify-between text-[11px] font-sans text-[#6F645C]">
                <span className="tracking-wider uppercase font-semibold text-[#302A26]">{currentTypology.name} &middot; {currentTypology.areaDisplay}</span>
                <span className="tracking-widest uppercase text-[#A58A71] font-semibold">Official Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloorPlanModal typology={currentTypology} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
