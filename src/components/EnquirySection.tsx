import React from 'react';
import { ONA_IMAGES } from '../data/images';

export const EnquirySection: React.FC = () => (
  <section id="enquiry" className="relative w-full bg-[#080808] text-[#F7F5F0] py-24 sm:py-36 lg:py-48 border-t border-[#171716] overflow-hidden" aria-label="Register interest for ONA Towers">
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <img src={ONA_IMAGES.enquiryBackground.url} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#080808]/80" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
      <div className="flex items-center space-x-3 mb-6"><span className="w-8 h-px bg-[#AE9A7C]" /><span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">Enquire</span></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <h2 className="font-display text-section-headline font-semibold leading-none uppercase mb-4">EXPERIENCE ONA.</h2>
          <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] mb-6">Register your interest.</p>
          <p className="font-sans text-sm sm:text-base text-[#D7D0C5] leading-relaxed">Enquiry contact details and a working submission channel will be added once verified.</p>
        </div>
        <div className="lg:col-span-7 bg-[#171716]/90 border border-[#D7D0C5]/20 p-8 sm:p-12 backdrop-blur-md">
          <div className="space-y-6" aria-label="Enquiry form unavailable">
            <div><label className="block font-sans text-[11px] font-semibold tracking-widest text-[#D7D0C5] uppercase mb-2">Full Name</label><input disabled className="w-full bg-[#080808] border border-[#D7D0C5]/20 px-4 py-3.5 text-sm opacity-60" /></div>
            <div><label className="block font-sans text-[11px] font-semibold tracking-widest text-[#D7D0C5] uppercase mb-2">Email Address</label><input disabled type="email" className="w-full bg-[#080808] border border-[#D7D0C5]/20 px-4 py-3.5 text-sm opacity-60" /></div>
            <button type="button" disabled className="w-full py-4 bg-[#D7D0C5]/40 text-[#D7D0C5] font-sans text-xs font-semibold tracking-[0.2em] uppercase cursor-not-allowed">Enquiries opening soon</button>
            <p className="font-sans text-[11px] text-[#78716C] text-center">No information is submitted from this form.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
