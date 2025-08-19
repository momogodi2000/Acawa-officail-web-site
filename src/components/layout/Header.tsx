import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/contexts/ThemeContext';
import { LanguageToggle, useLanguage } from '@/contexts/LanguageContext';

interface NavigationItem {
  path: string;
  label: string;
  submenu?: Array<{
    path: string;
    label: string;
    description?: string;
  }>;
}

// Removed unused navigationItems constant - now using getNavigationItems() function

/**
 * Header Component - ACAWA Navigation
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  // Get translated navigation items
  const getNavigationItems = (): NavigationItem[] => [
    { 
      path: '/', 
      label: t('nav.home') 
    },
    { 
      path: '/a-propos', 
      label: t('nav.about') 
    },
    { 
      path: '/clubs', 
      label: t('nav.clubs'),
      submenu: [
        { 
          path: '/clubs', 
          label: 'Tous les Clubs',
          description: 'Découvrez nos dojos à travers le Cameroun'
        },
        { 
          path: '/clubs?region=centre', 
          label: 'Région du Centre',
          description: 'Yaoundé et environs'
        },
        { 
          path: '/clubs?region=littoral', 
          label: 'Région du Littoral',
          description: 'Douala et environs'
        }
      ]
    },
    { 
      path: '/champions', 
      label: t('nav.champions') 
    },
    { 
      path: '/evenements', 
      label: t('nav.events'),
      submenu: [
        { 
          path: '/evenements', 
          label: 'Tous les Événements',
          description: 'Compétitions, stages et formations'
        },
        { 
          path: '/evenements?type=competition', 
          label: 'Compétitions',
          description: 'Tournois et championnats'
        },
        { 
          path: '/evenements?type=stage', 
          label: 'Stages',
          description: 'Formations techniques'
        }
      ]
    },
    { 
      path: '/partenaires', 
      label: t('nav.partners') 
    },
    { 
      path: '/galerie', 
      label: 'Galerie' 
    },
    { 
      path: '/contact', 
      label: t('nav.contact') 
    }
  ];

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle submenu toggle
  const toggleSubmenu = (path: string) => {
    setActiveSubmenu(activeSubmenu === path ? null : path);
  };

  // Check if current path matches nav item
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b border-gray-100 dark:border-gray-800 py-2">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <div className="hidden md:flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Yaoundé, Cameroun
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +237 675 395 238
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-primary-600 font-medium hidden sm:block">
                🥋 {t('home.subtitle', "L'Art Martial de l'Excellence")}
              </span>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/icons/logo.jpg" 
                alt="ACAWA Logo" 
                className="w-12 h-12 rounded-lg shadow-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary-600">ACAWA</h1>
                <p className="text-sm text-gray-600">Karaté Wadokai Cameroun</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {getNavigationItems().map((item) => (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                      isActiveRoute(item.path)
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <svg 
                        className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Desktop Submenu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                          >
                            <div className="font-medium text-gray-800 dark:text-gray-200">{subItem.label}</div>
                            {subItem.description && (
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subItem.description}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button
                variant="whatsapp"
                onClick={() => window.open('https://wa.me/237675395238?text=Bonjour, je souhaite rejoindre ACAWA', '_blank')}
                className="shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                </svg>
                Rejoindre ACAWA
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span 
                  className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 my-1 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
          }`}
        >
          <nav className="border-t border-gray-100 dark:border-gray-800 pt-4">
            {getNavigationItems().map((item) => (
              <div key={item.path}>
                <div className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => toggleSubmenu(item.path)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeSubmenu === item.path ? 'rotate-180' : ''
                        }`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.submenu && (
                  <div 
                    className={`overflow-hidden transition-all duration-200 ${
                      activeSubmenu === item.path ? 'max-h-screen' : 'max-h-0'
                    }`}
                  >
                    <div className="ml-4 border-l-2 border-primary-100 dark:border-primary-800 pl-4 py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
                        >
                          <div className="font-medium">{subItem.label}</div>
                          {subItem.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="mt-4 px-4">
              <Button
                variant="whatsapp"
                onClick={() => window.open('https://wa.me/237675395238?text=Bonjour, je souhaite rejoindre ACAWA', '_blank')}
                className="w-full justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                </svg>
                Rejoindre ACAWA
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
