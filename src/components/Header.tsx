import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SiteLink, usePathname } from '../routing';

const navigation = [
  { to: '/residences', label: 'Residences' },
  { to: '/development', label: 'Development' },
  { to: '/lifestyle', label: 'Lifestyle' },
  { to: '/commercial', label: 'Commercial' },
  { to: '/location', label: 'Location' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  return (
    <>
      <header
        id="ona-main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled || pathname !== '/'
            ? 'bg-[#0A131F]/95 border-b border-[#193659]/40 py-4 backdrop-blur-md'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-6">
          <SiteLink
            to="/"
            id="brand-wordmark"
            className="text-left group focus:outline-none focus:ring-1 focus:ring-[#A58A71] shrink-0"
            aria-label="ONA Towers Home"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-[#FFFFFF] font-medium block leading-none transition-colors group-hover:text-[#A58A71]">
              ôNA TOWERS
            </span>
            <span className="font-sans text-[10px] tracking-[0.24em] text-[#718F9B] uppercase block mt-1">Mazizini · Zanzibar</span>
          </SiteLink>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {navigation.map((item) => {
              const active = pathname === item.to;
              return (
                <SiteLink
                  key={item.to}
                  to={item.to}
                  className={`font-sans text-[11px] xl:text-xs tracking-[0.14em] uppercase transition-colors relative py-1 group ${
                    active ? 'text-[#A58A71]' : 'text-[#D5CFC7] hover:text-[#FFFFFF]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span className={`absolute bottom-0 left-0 h-px bg-[#A58A71] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </SiteLink>
              );
            })}
            <SiteLink
              to="/enquire"
              className={`font-sans text-xs tracking-[0.18em] uppercase px-5 py-2.5 transition-colors font-semibold ${
                pathname === '/enquire' ? 'bg-[#A58A71] text-[#FFFFFF]' : 'text-[#0A131F] bg-[#F8F6F2] hover:bg-[#A58A71] hover:text-white'
              }`}
              aria-current={pathname === '/enquire' ? 'page' : undefined}
            >
              Enquire
            </SiteLink>
          </nav>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden text-[#F8F6F2] p-2 hover:text-[#A58A71] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="fixed inset-0 z-40 bg-[#0A131F] flex flex-col justify-between px-8 py-24 lg:hidden animate-fade-in">
          <div className="space-y-8 mt-8">
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#A58A71]">Navigation</p>
            <div className="flex flex-col space-y-5">
              {navigation.map((item) => (
                <SiteLink
                  key={item.to}
                  to={item.to}
                  className={`text-left font-display text-3xl transition-colors ${pathname === item.to ? 'text-[#A58A71]' : 'text-[#F8F6F2] hover:text-[#A58A71]'}`}
                >
                  {item.label}
                </SiteLink>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#193659]/40 space-y-4">
            <SiteLink to="/enquire" className="block w-full text-center font-sans text-xs tracking-[0.2em] uppercase py-4 bg-[#A58A71] text-white hover:bg-[#C5B19D] transition-colors font-semibold">
              Enquire Now
            </SiteLink>
            <p className="font-script text-2xl text-[#A58A71] text-center">Live above. See beyond.</p>
          </div>
        </div>
      )}
    </>
  );
};
