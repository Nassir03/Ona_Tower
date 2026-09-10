import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { listLocationPoints, type LocationPointApi } from '../api/content';

const fallbackPoints: LocationPointApi[] = [
  {
    id: 'zanzibar-fallback',
    name: 'Zanzibar',
    category: 'Location',
    distance_or_travel_note: 'ONA Towers development location',
    display_order: 1,
  },
];

export const LocationSection: React.FC = () => {
  const [points, setPoints] = useState<LocationPointApi[]>(fallbackPoints);

  useEffect(() => {
    let active = true;
    listLocationPoints()
      .then((items) => {
        if (active && items.length) setPoints(items);
      })
      .catch(() => {
        // Keep the verified Zanzibar fallback visible if the backend is unavailable.
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="location" className="relative w-full bg-[#0A131F] text-[#F8F6F2] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 border-t border-[#193659]/40" aria-label="ONA Towers location">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">Location</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end border-y border-[#193659] py-14 sm:py-20">
          <div className="lg:col-span-7">
            <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Mazizini & Stone Town</span>
            <h2 className="font-display text-section-headline font-light text-[#FFFFFF] leading-none uppercase mb-8 tracking-tight">ZANZIBAR.</h2>
            <p className="font-sans text-base sm:text-lg text-[#D5CFC7] leading-relaxed max-w-xl font-light">ONA Towers is ideally situated in Mazizini, Zanzibar — combining tranquility with direct proximity to Abeid Amani Karume International Airport and historic Stone Town.</p>
          </div>

          <div className="lg:col-span-5 grid gap-3">
            {points.map((point) => (
              <div key={point.id} className="border border-[#193659] bg-[#102035] p-5 flex items-start gap-4 rounded-sm shadow-lg">
                <MapPin className="w-5 h-5 text-[#A58A71] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#A58A71]">{point.category}</p>
                  <h3 className="font-display text-2xl font-light text-[#FFFFFF] mt-1">{point.name}</h3>
                  {point.distance_or_travel_note && <p className="font-sans text-xs text-[#D5CFC7] mt-2 leading-relaxed font-light">{point.distance_or_travel_note}</p>}
                  {point.map_url && (
                    <a href={point.map_url} target="_blank" rel="noreferrer" className="inline-block mt-3 font-sans text-[11px] font-semibold tracking-widest uppercase text-[#A58A71] border-b border-[#A58A71]/50 pb-0.5 hover:text-white">Open map</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
