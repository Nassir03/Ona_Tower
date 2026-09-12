import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SiteLink } from '../../routing';

const links = [
  {
    to: '/development',
    label: 'Development',
    title: 'Understand the masterplan',
    text: 'See how the residential towers, commercial building and architecture fit together.',
  },
  {
    to: '/location',
    label: 'Location',
    title: 'Zanzibar setting',
    text: 'Discover the confirmed Zanzibar setting and project location information.',
  },
  {
    to: '/enquire',
    label: 'Sales',
    title: 'Register your interest',
    text: 'Send an enquiry to the ONA Towers team and receive a reference number.',
  },
];

export const HomeNextSteps: React.FC = () => (
  <section className="bg-[#302A26] text-[#E7DED6] py-20 sm:py-28 border-t border-[#403832]" aria-label="Explore ONA Towers pages">
    <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-px bg-[#A58A71]" />
        <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">Explore further</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#403832]">
        {links.map((item) => (
          <SiteLink
            key={item.to}
            to={item.to}
            className="group py-8 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r last:border-r-0 border-[#403832] transition-colors hover:bg-[#38312C]/60"
          >
            <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A58A71]">{item.label}</span>
            <div className="mt-4 flex items-start justify-between gap-5">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F5F0EA] group-hover:text-[#FFFFFF] transition-colors">{item.title}</h3>
                <p className="font-sans text-sm text-[#E7DED6] leading-relaxed mt-3 max-w-sm font-light">{item.text}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 shrink-0 text-[#A58A71] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </SiteLink>
        ))}
      </div>
    </div>
  </section>
);
