import React from 'react';

export const LocationSection: React.FC = () => (
  <section id="location" className="relative w-full bg-[#080808] text-[#F7F5F0] py-24 sm:py-36 lg:py-48 border-t border-[#171716]" aria-label="ONA Towers location">
    <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="flex items-center space-x-3 mb-6">
        <span className="w-8 h-px bg-[#AE9A7C]" />
        <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">Location</span>
      </div>
      <div className="min-h-[40vh] flex flex-col justify-center border-y border-[#171716] py-16">
        <h2 className="font-display text-section-headline font-semibold leading-none uppercase mb-8">ZANZIBAR.</h2>
        <p className="font-sans text-base sm:text-lg text-[#D7D0C5] leading-relaxed max-w-xl">ONA Towers is a mixed-use development in Zanzibar.</p>
      </div>
    </div>
  </section>
);
