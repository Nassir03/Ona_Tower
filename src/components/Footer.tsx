import React from 'react';
import { SiteLink } from '../routing';

const links = [
  { to: '/residences', label: 'Residences & Typologies' },
  { to: '/development', label: 'Development & Architecture' },
  { to: '/lifestyle', label: 'Life at ONA' },
  { to: '/commercial', label: 'Commercial / Service Building' },
  { to: '/location', label: 'Zanzibar Location' },
];

export const Footer: React.FC = () => (
  <footer id="ona-footer" className="w-full bg-[#080808] text-[#F7F5F0] border-t border-[#171716] py-16 sm:py-24" aria-label="Footer">
    <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-16 border-b border-[#171716]">
        <div className="md:col-span-5 space-y-4">
          <SiteLink to="/" className="inline-block text-left group focus:outline-none">
            <span className="font-display text-3xl sm:text-4xl tracking-tight text-[#F7F5F0] font-semibold block leading-none group-hover:text-[#AE9A7C] transition-colors">ONA TOWERS</span>
            <span className="font-sans text-xs tracking-[0.24em] text-[#AE9A7C] uppercase block mt-1.5 font-semibold">Zanzibar</span>
          </SiteLink>
          <p className="font-display italic text-xl text-[#D7D0C5] font-normal">Ishii juu. Ona zaidi.</p>
          <p className="font-sans text-xs text-[#78716C] leading-relaxed max-w-sm">A mixed-use development with two residential towers and a separate commercial and lifestyle building in Zanzibar.</p>
        </div>

        <div className="md:col-span-4 space-y-3 font-sans text-xs">
          <p className="font-semibold tracking-[0.2em] uppercase text-[#AE9A7C] mb-4 text-[11px]">Pages</p>
          <div className="flex flex-col space-y-2.5 text-[#D7D0C5]">
            {links.map((item) => (
              <SiteLink key={item.to} to={item.to} className="hover:text-[#FFFDF8] transition-all hover:translate-x-1 duration-200">{item.label}</SiteLink>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-3 font-sans text-xs">
          <p className="font-semibold tracking-[0.2em] uppercase text-[#AE9A7C] mb-4 text-[11px]">Destination</p>
          <div className="text-[#D7D0C5] space-y-1"><p>Zanzibar</p></div>
          <div className="pt-4">
            <SiteLink to="/enquire" className="font-semibold tracking-widest text-xs uppercase text-[#AE9A7C] hover:underline">Register Interest →</SiteLink>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#78716C] gap-4">
        <p>&copy; {new Date().getFullYear()} ONA Towers Zanzibar. All rights reserved.</p>
        <p className="text-center sm:text-right">Visual representations are artistic impressions intended for conceptual architectural demonstration.</p>
      </div>
    </div>
  </footer>
);
