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
    <section id="lifestyle" className="relative w-full bg-[#0A131F] text-[#F8F6F2] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 border-t border-[#193659]/40" aria-label="Life at ONA — Hospitality, Wellness and Community">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">Life at ONA</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Everyday Rituals & Culture</span>
            <h2 id="lifestyle-headline" className="font-display text-section-headline font-light text-[#FFFFFF] leading-none uppercase mb-4 tracking-tight">ALIVE WITH WARMTH.</h2>
            <p className="font-sans text-base sm:text-lg text-[#D5CFC7] max-w-xl font-light">Curated spaces across Tower A, Tower B, and ONA House designed for wellbeing, connection, and family.</p>
          </div>

          <div className="flex flex-wrap gap-2 max-w-2xl">
            {LIFESTYLE_SCENES.map((scene) => {
              const isSelected = activeScene.id === scene.id;
              return (
                <button key={scene.id} onClick={() => setActiveScene(scene)} className={`px-3.5 py-2 text-xs font-sans font-semibold tracking-wider uppercase transition-all border cursor-pointer ${isSelected ? 'bg-[#A58A71] text-white border-[#A58A71] shadow-md' : 'bg-[#102035] text-[#D5CFC7] border-[#193659] hover:border-[#A58A71] hover:text-white'}`}>
                  <span className="mr-1 text-[#718F9B]">{scene.number}</span> {scene.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#102035] border border-[#193659] p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#0A131F] group">
            <img src={ONA_IMAGES[activeScene.imageKey as ImageKey]?.url || ONA_IMAGES.lifestylePool.url} alt={ONA_IMAGES[activeScene.imageKey as ImageKey]?.alt || activeScene.title} loading="lazy" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-6 right-6 z-10 bg-[#0A131F]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#A58A71]/50 text-[#A58A71] text-[11px] font-sans font-semibold tracking-widest uppercase">{activeScene.highlight}</div>
            <div className="absolute bottom-6 left-6 z-10">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A58A71] uppercase block mb-1">Scene {activeScene.number}</span>
              <p className="font-display text-2xl sm:text-3xl text-[#FFFFFF] font-light">{apiAmenity?.name || activeScene.title}</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A58A71] uppercase block mb-2">{activeScene.number} / {activeScene.highlight}</span>
              <h3 className="font-display text-3xl text-[#FFFFFF] font-light mb-3 leading-tight">{apiAmenity?.name || activeScene.title}</h3>
              <p className="font-script text-2xl text-[#A58A71] mb-4">{activeScene.subtitle}</p>
              <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed font-light">{apiAmenity?.description || activeScene.description}</p>
            </div>
            <div className="pt-6 border-t border-[#193659]">
              <span className="font-sans text-[11px] font-semibold tracking-widest text-[#A58A71] uppercase block mb-2">Confirmed Development Feature</span>
              <p className="text-xs text-[#718F9B] leading-relaxed font-sans">Official amenity curated by ONIRIA INVESTMENTS within the ONA Towers master development in Mazizini, Zanzibar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
