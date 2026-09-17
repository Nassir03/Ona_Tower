import React from 'react';
import { SiteLink } from '../routing';

export const NotFoundPage: React.FC = () => (
  <section className="min-h-[70vh] bg-[#302A26] text-[#E7DED6] pt-40 pb-24 flex items-center">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
      <p className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">404</p>
      <h1 className="font-display text-section-headline font-light uppercase mt-4 text-[#F5F0EA]">Page not found.</h1>
      <p className="font-sans text-[#E7DED6] mt-5 max-w-xl font-light">The page you requested is not part of the ONA Towers website.</p>
      <SiteLink to="/" className="inline-block mt-8 border-b border-[#A58A71] pb-1 font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#A58A71] hover:text-[#FFFFFF] transition-colors">
        Return home
      </SiteLink>
    </div>
  </section>
);
