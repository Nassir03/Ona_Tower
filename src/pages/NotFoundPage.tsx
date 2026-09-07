import React from 'react';
import { SiteLink } from '../routing';

export const NotFoundPage: React.FC = () => (
  <section className="min-h-[70vh] bg-[#080808] text-[#F7F5F0] pt-40 pb-24 flex items-center">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
      <p className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">404</p>
      <h1 className="font-display text-section-headline font-semibold uppercase mt-4">Page not found.</h1>
      <p className="font-sans text-[#D7D0C5] mt-5 max-w-xl">The page you requested is not part of the ONA Towers website.</p>
      <SiteLink to="/" className="inline-block mt-8 border-b border-[#AE9A7C] pb-1 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
        Return home
      </SiteLink>
    </div>
  </section>
);
