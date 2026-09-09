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
  <footer id="ona-footer" className="w-full bg-[#0A131F] text-[#F8F6F2] border-t border-[#193659]/40 py-16 sm:py-24" aria-label="Footer">
    <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-16 border-b border-[#193659]/40">
        <div className="md:col-span-5 space-y-4">
          <SiteLink to="/" className="inline-block text-left group focus:outline-none">
            <span className="font-display text-3xl sm:text-4xl tracking-tight text-[#FFFFFF] font-medium block leading-none group-hover:text-[#A58A71] transition-colors">
              ôNA TOWERS
            </span>
            <span className="font-sans text-xs tracking-[0.24em] text-[#A58A71] uppercase block mt-1.5 font-semibold">
              Mazizini · Zanzibar
            </span>
          </SiteLink>
          <p className="font-script text-2xl sm:text-3xl text-[#A58A71]">Live above. See beyond.</p>
          <p className="font-sans text-xs text-[#718F9B] leading-relaxed max-w-sm">
            Developed by ONIRIA INVESTMENTS. Two residential towers and ONA House rising above Mazizini, Zanzibar.
          </p>
        </div>

        <div className="md:col-span-4 space-y-3 font-sans text-xs">
          <p className="font-semibold tracking-[0.2em] uppercase text-[#A58A71] mb-4 text-[11px]">Pages</p>
          <div className="flex flex-col space-y-2.5 text-[#D5CFC7]">
            {links.map((item) => (
              <SiteLink key={item.to} to={item.to} className="hover:text-[#FFFFFF] hover:text-[#A58A71] transition-all hover:translate-x-1 duration-200">{item.label}</SiteLink>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-3 font-sans text-xs">
          <p className="font-semibold tracking-[0.2em] uppercase text-[#A58A71] mb-4 text-[11px]">Developer & Location</p>
          <div className="text-[#D5CFC7] space-y-1">
            <p className="font-semibold text-white">ONIRIA INVESTMENTS</p>
            <p className="text-[#718F9B]">Mazizini, Zanzibar, Tanzania</p>
            <p className="text-xs text-[#D5CFC7]/80">Tower A · ONA House · Tower B</p>
          </div>
          <div className="pt-4">
            <SiteLink to="/enquire" className="font-semibold tracking-widest text-xs uppercase text-[#A58A71] hover:underline">Register Interest →</SiteLink>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#718F9B] gap-4">
        <p>&copy; {new Date().getFullYear()} ONA Towers · ONIRIA Investments. All rights reserved.</p>
        <p className="text-center sm:text-right">Official architectural renderings & plans for ONA Towers Mazizini, Zanzibar.</p>
      </div>
    </div>
  </footer>
);
