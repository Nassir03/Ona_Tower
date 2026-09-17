import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ONA_IMAGES } from '../data/images';
import { SiteLink } from '../routing';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] flex items-end overflow-hidden bg-[#302A26]"
      aria-label="Arrival at ONA Towers"
    >
      {/* Background Architectural Ocean-view Terrace Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <img
          src={ONA_IMAGES.heroArrival.url}
          alt={ONA_IMAGES.heroArrival.alt}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-center scale-[1.01] animate-[fadeInScale_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          referrerPolicy="no-referrer"
        />

        {/* Seamless full-bleed base gradient across the bottom, eliminating any vertical bands or seams */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#201B18]/85 via-[#201B18]/35 to-transparent to-75% pointer-events-none" />

        {/* Soft, organic radial vignette localized at bottom-left behind the typography to ensure high contrast without panel lines */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 15% 90%, rgba(32, 27, 24, 0.72) 0%, rgba(32, 27, 24, 0.35) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* Hero Content — Lower-Left Editorial Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl">
          {/* Developer & Location Badge */}
          <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2.5 sm:gap-3 text-shadow-hero-soft">
            <span
              id="hero-developer-label"
              className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#D1B298] uppercase"
            >
              ONIRIA INVESTMENTS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1B298]" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-sans tracking-[0.22em] text-[#F3EEE7] uppercase font-medium">
              MAZIZINI &bull; ZANZIBAR
            </span>
          </div>

          {/* Script Welcome line */}
          <span className="font-script text-3xl sm:text-4xl lg:text-[2.65rem] text-[#D1B298] block mb-2 leading-none text-shadow-hero">
            Welcome to:
          </span>

          {/* Balgin Display Typography */}
          <h1
            id="hero-headline"
            className="font-balgin text-hero-display font-light text-[#FFFFFF] tracking-tight mb-1 uppercase text-shadow-hero-title"
          >
            ôNA
          </h1>
          <p className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-[0.38em] text-[#F8F4EF] uppercase mb-4 sm:mb-6 font-light text-shadow-hero">
            TOWERS
          </p>

          {/* Brand Tagline in Signature Script */}
          <p
            id="hero-tagline"
            className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#F8F4EF] tracking-wide mb-8 sm:mb-10 font-normal leading-tight text-shadow-hero"
          >
            Live above. See beyond.
          </p>

          {/* Primary CTA and Secondary Touchpoint */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-explore-cta"
              onClick={onExploreClick}
              className="group inline-flex items-center space-x-3 px-6 py-3.5 bg-[#A58A71] hover:bg-[#917860] text-[#FFFFFF] font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-xl cursor-pointer rounded-xs focus:outline-none focus:ring-2 focus:ring-[#D1B298]"
            >
              <span>Explore ONA</span>
              <ArrowDownRight className="w-4 h-4 text-[#FFFFFF] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <SiteLink
              to="/residences"
              className="inline-flex items-center space-x-2 px-5 py-3.5 bg-[#201B18]/70 hover:bg-[#201B18]/90 backdrop-blur-sm border border-[#D1B298]/70 text-[#F8F4EF] hover:text-[#FFFFFF] font-sans text-xs font-semibold tracking-[0.18em] uppercase transition-all rounded-xs shadow-lg"
            >
              <span>View Residences</span>
            </SiteLink>
          </div>
        </div>
      </div>

      {/* Subtle Right Side Indicator */}
      <div className="hidden lg:flex absolute right-10 bottom-16 z-10 flex-col items-end text-[#F8F4EF] text-[11px] font-sans tracking-widest uppercase bg-[#201B18]/75 backdrop-blur-md px-4 py-2.5 border border-[#D1B298]/40 rounded-xs shadow-xl text-shadow-hero-soft">
        <span className="text-[#D1B298] mb-1 font-semibold">Mazizini &bull; Zanzibar</span>
        <span className="text-[#F8F4EF] font-light">Live Above &bull; See Beyond</span>
      </div>
    </section>
  );
};
