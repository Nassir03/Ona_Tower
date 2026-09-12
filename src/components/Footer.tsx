import React from 'react';
import { SiteLink } from '../routing';

export const Footer: React.FC = () => (
  <footer id="ona-footer" className="w-full bg-[#302A26] text-[#E7DED6] border-t border-[#403832] py-8 sm:py-10" aria-label="Footer">
    <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center pb-8 border-b border-[#403832]">
        {/* Brand & Tagline */}
        <div className="md:col-span-7 space-y-2.5">
          <SiteLink to="/" className="inline-block text-left group focus:outline-none">
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-[#F5F0EA] font-medium block leading-none group-hover:text-[#FFFFFF] transition-colors">
              ôNA TOWERS
            </span>
            <span className="font-sans text-[11px] tracking-[0.24em] text-[#A58A71] uppercase block mt-1 font-semibold">
              Mazizini · Zanzibar
            </span>
          </SiteLink>
          <p className="font-script text-xl sm:text-2xl text-[#CFC2B7]">Live above. See beyond.</p>
          <p className="font-sans text-xs text-[#CFC2B7] leading-relaxed max-w-lg font-light">
            Developed by ONIRIA INVESTMENTS. Two residential towers and ONA House rising above Mazizini, Zanzibar.
          </p>
        </div>

        {/* Developer & Location Quick Info & CTA */}
        <div className="md:col-span-5 md:text-right space-y-2 font-sans text-xs">
          <p className="font-semibold tracking-[0.2em] uppercase text-[#A58A71] text-[11px]">Developer & Location</p>
          <div className="text-[#E7DED6] space-y-0.5">
            <p className="font-semibold text-[#F5F0EA]">ONIRIA INVESTMENTS</p>
            <p className="text-[#CFC2B7]">Mazizini, Zanzibar, Tanzania</p>
            <p className="text-[11px] text-[#CFC2B7]">Tower A · ONA House · Tower B</p>
          </div>
          <div className="pt-2">
            <SiteLink to="/enquire" className="inline-block font-semibold tracking-widest text-xs uppercase text-[#A58A71] hover:text-[#FFFFFF] transition-colors border-b border-[#A58A71]/50 pb-0.5">
              Register Interest →
            </SiteLink>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#CFC2B7] gap-3">
        <p>&copy; {new Date().getFullYear()} ONA Towers · ONIRIA Investments. All rights reserved.</p>
        <p className="text-center sm:text-right">Architectural plans & renderings for ONA Towers Mazizini, Zanzibar.</p>
      </div>
    </div>
  </footer>
);
