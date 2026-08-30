import React from 'react';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="ona-footer"
      className="w-full bg-[#080808] text-[#F7F5F0] border-t border-[#171716] py-16 sm:py-24"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-16 border-b border-[#171716]">
          {/* Brand Wordmark & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-display text-3xl sm:text-4xl tracking-tight text-[#F7F5F0] font-semibold block leading-none group-hover:text-[#AE9A7C] transition-colors">
                ONA TOWERS
              </span>
              <span className="font-sans text-xs tracking-[0.24em] text-[#AE9A7C] uppercase block mt-1.5 font-semibold">
                Zanzibar
              </span>
            </button>
            <p className="font-display italic text-xl text-[#D7D0C5] font-normal">
              Ishii juu. Ona zaidi.
            </p>
            <p className="font-sans text-xs text-[#78716C] leading-relaxed max-w-sm">
              A mixed-use development with two residential towers and a separate commercial and lifestyle building in Zanzibar.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-3 font-sans text-xs">
            <p className="font-semibold tracking-[0.2em] uppercase text-[#AE9A7C] mb-4 text-[11px]">
              Navigation
            </p>
            <div className="flex flex-col space-y-2.5 text-[#D7D0C5]">
              <button
                onClick={() => onNavigate('residences')}
                className="text-left hover:text-[#FFFDF8] transition-colors hover:translate-x-1 duration-200 cursor-pointer"
              >
                Residences & Typologies
              </button>
              <button
                onClick={() => onNavigate('penthouses')}
                className="text-left hover:text-[#FFFDF8] transition-colors hover:translate-x-1 duration-200 cursor-pointer"
              >
                Signature Penthouses
              </button>
              <button
                onClick={() => onNavigate('lifestyle')}
                className="text-left hover:text-[#FFFDF8] transition-colors hover:translate-x-1 duration-200 cursor-pointer"
              >
                Life at ONA
              </button>
              <button
                onClick={() => onNavigate('commercial')}
                className="text-left hover:text-[#FFFDF8] transition-colors hover:translate-x-1 duration-200 cursor-pointer"
              >
                Commercial / Service Building
              </button>
              <button
                onClick={() => onNavigate('development')}
                className="text-left hover:text-[#FFFDF8] transition-colors hover:translate-x-1 duration-200 cursor-pointer"
              >
                Development Masterplan
              </button>
              <button
                onClick={() => onNavigate('location')}
                className="text-left hover:text-[#FFFDF8] transition-colors hover:translate-x-1 duration-200 cursor-pointer"
              >
                Zanzibar Location
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <p className="font-semibold tracking-[0.2em] uppercase text-[#AE9A7C] mb-4 text-[11px]">
              Destination
            </p>
            <div className="text-[#D7D0C5] space-y-1">
              <p>Zanzibar</p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('enquiry')}
                className="font-semibold tracking-widest text-xs uppercase text-[#AE9A7C] hover:underline cursor-pointer"
              >
                Register Interest →
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#78716C] gap-4">
          <p>
            &copy; {new Date().getFullYear()} ONA Towers Zanzibar. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Visual representations are artistic impressions intended for conceptual architectural demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
};
