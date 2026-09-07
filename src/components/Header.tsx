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
            ? 'bg-[#080808]/92 border-b border-[#171716] py-4 backdrop-blur-md'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-6">
          <SiteLink
            to="/"
            id="brand-wordmark"
            className="text-left group focus:outline-none focus:ring-1 focus:ring-[#AE9A7C] shrink-0"
            aria-label="ONA Towers Home"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-[#F7F5F0] font-semibold block leading-none transition-colors group-hover:text-[#AE9A7C]">
              ONA TOWERS
            </span>
            <span className="font-sans text-[10px] tracking-[0.24em] text-[#D7D0C5]/70 uppercase block mt-1">Zanzibar</span>
          </SiteLink>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {navigation.map((item) => {
              const active = pathname === item.to;
              return (
                <SiteLink
                  key={item.to}
                  to={item.to}
                  className={`font-sans text-[11px] xl:text-xs tracking-[0.14em] uppercase transition-colors relative py-1 group ${
                    active ? 'text-[#AE9A7C]' : 'text-[#D7D0C5] hover:text-[#FFFDF8]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span className={`absolute bottom-0 left-0 h-px bg-[#AE9A7C] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </SiteLink>
              );
            })}
            <SiteLink
              to="/enquire"
              className={`font-sans text-xs tracking-[0.18em] uppercase px-5 py-2.5 transition-colors font-semibold ${
                pathname === '/enquire' ? 'bg-[#AE9A7C] text-[#080808]' : 'text-[#080808] bg-[#F7F5F0] hover:bg-[#AE9A7C]'
              }`}
              aria-current={pathname === '/enquire' ? 'page' : undefined}
            >
              Enquire
            </SiteLink>
          </nav>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden text-[#F7F5F0] p-2 hover:text-[#AE9A7C] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-between px-8 py-24 lg:hidden animate-fade-in">
          <div className="space-y-8 mt-8">
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#AE9A7C]">Navigation</p>
            <div className="flex flex-col space-y-5">
              {navigation.map((item) => (
                <SiteLink
                  key={item.to}
                  to={item.to}
                  className={`text-left font-display text-3xl transition-colors ${pathname === item.to ? 'text-[#AE9A7C]' : 'text-[#F7F5F0] hover:text-[#AE9A7C]'}`}
                >
                  {item.label}
                </SiteLink>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#171716] space-y-4">
            <SiteLink to="/enquire" className="block w-full text-center font-sans text-xs tracking-[0.2em] uppercase py-4 bg-[#F7F5F0] text-[#080808] hover:bg-[#AE9A7C] transition-colors font-semibold">
              Enquire Now
            </SiteLink>
            <p className="font-sans text-[10px] tracking-widest text-[#D7D0C5]/60 text-center uppercase">Ishii juu. Ona zaidi.</p>
          </div>
        </div>
      )}
    </>
  );
};
