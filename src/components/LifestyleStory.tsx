import React, { useEffect, useMemo, useState } from 'react';
import { listAmenities, type AmenityApi } from '../api/content';
import { LIFESTYLE_SCENES } from '../data/residences';
import { ONA_IMAGES, type ImageKey } from '../data/images';
import type { LifestyleScene } from '../types';

export const LifestyleStory: React.FC = () => {
  const [activeScene, setActiveScene] = useState<LifestyleScene>(LIFESTYLE_SCENES[0]);
  const [amenities, setAmenities] = useState<AmenityApi[]>([]);

  useEffect(() => {
    let active = true;
    listAmenities()
      .then((items) => {
        if (active) setAmenities(items);
      })
      .catch(() => {
        // Verified local content keeps the page available when the API is offline.
      });
    return () => {
      active = false;
    };
  }, []);

  const apiAmenity = useMemo(
    () => amenities.find((item) => item.name.toLowerCase() === activeScene.title.toLowerCase()),
    [activeScene.title, amenities],
  );

  return (
    <section id="lifestyle" className="relative w-full bg-[#080808] text-[#F7F5F0] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 border-t border-[#171716]" aria-label="Life at ONA — Hospitality, Wellness and Community">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">Life at ONA</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <h1 id="lifestyle-headline" className="font-display text-section-headline font-semibold text-[#F7F5F0] leading-none uppercase mb-4">ALIVE WITH WARMTH.</h1>
            <p className="font-sans text-base sm:text-lg text-[#D7D0C5] max-w-xl font-normal">Terrace lifestyle functions and everyday amenities within the ONA Towers development.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {LIFESTYLE_SCENES.map((scene) => {
              const isSelected = activeScene.id === scene.id;
              return (
                <button key={scene.id} onClick={() => setActiveScene(scene)} className={`px-4 py-2 text-xs font-sans font-semibold tracking-widest uppercase transition-all border cursor-pointer ${isSelected ? 'bg-[#AE9A7C] text-[#080808] border-[#AE9A7C]' : 'bg-[#171716] text-[#D7D0C5] border-[#D7D0C5]/20 hover:border-[#AE9A7C] hover:text-[#F7F5F0]'}`}>
                  <span className="mr-1 opacity-70">{scene.number}</span> {scene.title.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#171716] border border-[#D7D0C5]/10 p-6 sm:p-10 lg:p-12">
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#080808] group">
            <img src={ONA_IMAGES[activeScene.imageKey as ImageKey]?.url || ONA_IMAGES.lifestylePool.url} alt={ONA_IMAGES[activeScene.imageKey as ImageKey]?.alt || activeScene.title} loading="lazy" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-6 right-6 z-10 bg-[#080808]/80 backdrop-blur-md px-3.5 py-1.5 border border-[#AE9A7C]/40 text-[#AE9A7C] text-[11px] font-sans font-semibold tracking-widest uppercase">{activeScene.highlight}</div>
            <div className="absolute bottom-6 left-6 z-10">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block mb-1">Scene {activeScene.number}</span>
              <p className="font-display text-2xl sm:text-3xl text-[#F7F5F0] font-semibold">{apiAmenity?.name || activeScene.title}</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block mb-2">{activeScene.number} / {apiAmenity?.category || 'EXPERIENCE'}</span>
              <h2 className="font-display text-3xl text-[#F7F5F0] font-semibold mb-3 leading-tight">{apiAmenity?.name || activeScene.title}</h2>
              <p className="font-display italic text-lg text-[#AE9A7C] mb-4">{activeScene.subtitle}</p>
              <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed font-normal">{apiAmenity?.description || activeScene.description}</p>
            </div>
            <div className="pt-6 border-t border-[#D7D0C5]/20">
              <span className="font-sans text-[11px] font-semibold tracking-widest text-[#AE9A7C] uppercase block mb-2">Confirmed development amenity</span>
              <p className="text-xs text-[#D7D0C5]/90 leading-relaxed font-sans">Lifestyle information reflects the confirmed functions within the ONA Towers development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
