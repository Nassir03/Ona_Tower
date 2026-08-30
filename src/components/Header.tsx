import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        id="ona-main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-[#080808]/90 border-b border-[#171716] py-5 backdrop-blur-md'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Wordmark */}
          <button
            id="brand-wordmark"
            onClick={() => handleLinkClick('hero')}
            className="text-left group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#AE9A7C]"
            aria-label="ONA Towers Home"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-[#F7F5F0] font-semibold block leading-none transition-colors group-hover:text-[#AE9A7C]">
              ONA TOWERS
            </span>
            <span className="font-sans text-[10px] tracking-[0.24em] text-[#D7D0C5]/70 uppercase block mt-1">
              Zanzibar
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10" aria-label="Main Navigation">
            <button
              id="nav-link-residences"
              onClick={() => handleLinkClick('residences')}
              className="font-sans text-xs tracking-[0.16em] uppercase text-[#D7D0C5] hover:text-[#FFFDF8] transition-colors relative py-1 group"
            >
              <span>Residences</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#AE9A7C] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-link-life"
              onClick={() => handleLinkClick('lifestyle')}
              className="font-sans text-xs tracking-[0.16em] uppercase text-[#D7D0C5] hover:text-[#FFFDF8] transition-colors relative py-1 group"
            >
              <span>Life at ONA</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#AE9A7C] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-link-commercial"
              onClick={() => handleLinkClick('commercial')}
              className="font-sans text-xs tracking-[0.16em] uppercase text-[#D7D0C5] hover:text-[#FFFDF8] transition-colors relative py-1 group"
            >
              <span>Commercial</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#AE9A7C] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-link-enquire"
              onClick={() => handleLinkClick('enquiry')}
              className="font-sans text-xs tracking-[0.18em] uppercase text-[#080808] bg-[#F7F5F0] hover:bg-[#AE9A7C] px-5 py-2.5 transition-colors font-semibold"
            >
              Enquire
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F7F5F0] p-2 hover:text-[#AE9A7C] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-between px-8 py-24 md:hidden animate-fade-in"
        >
          <div className="space-y-8 mt-8">
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#AE9A7C]">
              Navigation
            </p>
            <div className="flex flex-col space-y-6">
              <button
                id="mobile-link-residences"
                onClick={() => handleLinkClick('residences')}
                className="text-left font-display text-3xl text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors"
              >
                Residences
              </button>
              <button
                id="mobile-link-life"
                onClick={() => handleLinkClick('lifestyle')}
                className="text-left font-display text-3xl text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors"
              >
                Life at ONA
              </button>
              <button
                id="mobile-link-commercial"
                onClick={() => handleLinkClick('commercial')}
                className="text-left font-display text-3xl text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors"
              >
                Commercial
              </button>
              <button
                id="mobile-link-development"
                onClick={() => handleLinkClick('development')}
                className="text-left font-display text-3xl text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors"
              >
                Masterplan
              </button>
              <button
                id="mobile-link-location"
                onClick={() => handleLinkClick('location')}
                className="text-left font-display text-3xl text-[#F7F5F0] hover:text-[#AE9A7C] transition-colors"
              >
                Location
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#171716] space-y-4">
            <button
              id="mobile-link-enquire"
              onClick={() => handleLinkClick('enquiry')}
              className="w-full text-center font-sans text-xs tracking-[0.2em] uppercase py-4 bg-[#F7F5F0] text-[#080808] hover:bg-[#AE9A7C] transition-colors font-semibold"
            >
              Enquire Now
            </button>
            <p className="font-sans text-[10px] tracking-widest text-[#D7D0C5]/60 text-center uppercase">
              Ishii juu. Ona zaidi.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
