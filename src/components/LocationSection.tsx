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
    <section id="location" className="relative w-full bg-[#080808] text-[#F7F5F0] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 border-t border-[#171716]" aria-label="ONA Towers location">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">Location</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end border-y border-[#171716] py-14 sm:py-20">
          <div className="lg:col-span-7">
            <h1 className="font-display text-section-headline font-semibold leading-none uppercase mb-8">ZANZIBAR.</h1>
            <p className="font-sans text-base sm:text-lg text-[#D7D0C5] leading-relaxed max-w-xl">ONA Towers is a mixed-use development in Zanzibar, bringing residential, commercial and lifestyle spaces together in one destination.</p>
          </div>

          <div className="lg:col-span-5 grid gap-3">
            {points.map((point) => (
              <div key={point.id} className="border border-[#D7D0C5]/15 bg-[#171716] p-5 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#AE9A7C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#AE9A7C]">{point.category}</p>
                  <h2 className="font-display text-2xl mt-1">{point.name}</h2>
                  {point.distance_or_travel_note && <p className="font-sans text-xs text-[#D7D0C5]/80 mt-2 leading-relaxed">{point.distance_or_travel_note}</p>}
                  {point.map_url && (
                    <a href={point.map_url} target="_blank" rel="noreferrer" className="inline-block mt-3 font-sans text-[11px] font-semibold tracking-widest uppercase text-[#AE9A7C] border-b border-[#AE9A7C]/50 pb-0.5">Open map</a>
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
