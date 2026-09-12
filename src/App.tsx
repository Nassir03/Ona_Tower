import React, { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CommercialPage } from './pages/CommercialPage';
import { DevelopmentPage } from './pages/DevelopmentPage';
import { EnquirePage } from './pages/EnquirePage';
import { HomePage } from './pages/HomePage';
import { LifestylePage } from './pages/LifestylePage';
import { LocationPage } from './pages/LocationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ResidencesPage } from './pages/ResidencesPage';
import { usePathname } from './routing';

const pageTitles: Record<string, string> = {
  '/': 'ONA Towers — Zanzibar | Ishii juu. Ona zaidi.',
  '/residences': 'Residences | ONA Towers Zanzibar',
  '/development': 'Development | ONA Towers Zanzibar',
  '/lifestyle': 'Life at ONA | ONA Towers Zanzibar',
  '/commercial': 'Commercial | ONA Towers Zanzibar',
  '/location': 'Location | ONA Towers Zanzibar',
  '/enquire': 'Enquire | ONA Towers Zanzibar',
};

export function App() {
  const pathname = usePathname();

  useEffect(() => {
    document.title = pageTitles[pathname] || 'ONA Towers Zanzibar';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  let page: React.ReactNode;
  switch (pathname) {
    case '/':
      page = <HomePage />;
      break;
    case '/residences':
      page = <ResidencesPage />;
      break;
    case '/development':
      page = <DevelopmentPage />;
      break;
    case '/lifestyle':
      page = <LifestylePage />;
      break;
    case '/commercial':
      page = <CommercialPage />;
      break;
    case '/location':
      page = <LocationPage />;
      break;
    case '/enquire':
      page = <EnquirePage />;
      break;
    default:
      page = <NotFoundPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#302A26] text-[#E7DED6] overflow-x-hidden selection:bg-[#A58A71] selection:text-[#FFFFFF]">
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {page}
      </main>
      <Footer />
    </div>
  );
}

export default App;
