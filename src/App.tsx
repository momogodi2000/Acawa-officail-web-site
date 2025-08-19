import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePWA, usePWAStatus } from '@/hooks/usePWA';
import PWAInstallGuide from '@/components/ui/PWAInstallGuide';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const ClubsPage = React.lazy(() => import('@/pages/ClubsPage'));
const ClubDetailsPage = React.lazy(() => import('@/pages/ClubDetailsPage'));
const ChampionsPage = React.lazy(() => import('@/pages/ChampionsPage'));
const EventsPage = React.lazy(() => import('@/pages/EventsPage'));
const PartnersPage = React.lazy(() => import('@/pages/PartnersPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const GalleryPage = React.lazy(() => import('@/pages/GalleryPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

// Layout components
const Header = React.lazy(() => import('@/components/layout/Header'));
const Footer = React.lazy(() => import('@/components/layout/Footer'));

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🥋</span>
        </div>
      </div>
      <p className="text-red-600 font-medium">Chargement de ACAWA...</p>
    </div>
  </div>
);

/**
 * Main App Component - ACAWA Platform
 * Handles routing, PWA functionality and global layout
 */
const App: React.FC = () => {
  const { showInstallPrompt, dismissInstallPrompt, trackPageVisit } = usePWA();
  const { isPWA } = usePWAStatus();

  // Track page visits for PWA analytics
  React.useEffect(() => {
    trackPageVisit();
  }, [trackPageVisit]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Global SEO and Meta Tags */}
        <Helmet>
          <html lang="fr" />
          <title>ACAWA - Association Camerounaise de Karaté Wadokai</title>
          <meta name="description" content="Association Camerounaise de Karaté Wadokai - L'Art Martial de l'Excellence. Découvrez nos clubs, nos champions et rejoignez la tradition Wadokai au Cameroun." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href="https://ACAWA-cameroon.org" />
        </Helmet>

        {/* PWA Install Guide */}
        {showInstallPrompt && !isPWA && (
          <PWAInstallGuide isOpen={showInstallPrompt} onClose={dismissInstallPrompt} />
        )}

          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
        {/* Header */}
        <React.Suspense 
          fallback={
            <div className="h-20 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          }
        >
          <Header />
        </React.Suspense>

        {/* Main Content */}
        <main className="flex-1">
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              
              {/* About */}
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/about" element={<Navigate to="/a-propos" replace />} />
              
              {/* Clubs */}
              <Route path="/clubs" element={<ClubsPage />} />
              <Route path="/clubs/:clubId" element={<ClubDetailsPage />} />
              <Route path="/dojos" element={<Navigate to="/clubs" replace />} />
              
              {/* Champions */}
              <Route path="/champions" element={<ChampionsPage />} />
              <Route path="/nos-champions" element={<Navigate to="/champions" replace />} />
              
              {/* Events & Training */}
              <Route path="/evenements" element={<EventsPage />} />
              <Route path="/events" element={<Navigate to="/evenements" replace />} />
              <Route path="/formations" element={<Navigate to="/evenements" replace />} />
              <Route path="/stages" element={<Navigate to="/evenements" replace />} />
              
              {/* Partners */}
              <Route path="/partenaires" element={<PartnersPage />} />
              <Route path="/partners" element={<Navigate to="/partenaires" replace />} />
              
              {/* Contact */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/adhesion" element={<Navigate to="/contact" replace />} />
              
              {/* Gallery */}
              <Route path="/galerie" element={<GalleryPage />} />
              <Route path="/gallery" element={<Navigate to="/galerie" replace />} />
              
              {/* Redirects for common typos/variations */}
              <Route path="/accueil" element={<Navigate to="/" replace />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              
              {/* 404 - Must be last */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </main>

        {/* Footer */}
        <React.Suspense 
          fallback={
            <div className="h-32 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
            </div>
          }
        >
          <Footer />
        </React.Suspense>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

        {/* Performance monitoring in development */}
        {import.meta.env.DEV && <DevTools />}
      </LanguageProvider>
    </ThemeProvider>
  );
};/**
 * Scroll to Top Button Component
 */
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-40 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label="Retour en haut"
    >
      <svg 
        className="w-6 h-6 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};

/**
 * Development Tools Component
 */
const DevTools: React.FC = () => {
  const [showGrid, setShowGrid] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        setShowGrid(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {showGrid && (
        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}
      
      <div className="fixed top-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded">
        <p>DEV MODE</p>
        <p>Ctrl+Shift+G: Grid</p>
      </div>
    </>
  );
};

export default App;
