import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '@/utils';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.clubs': 'Nos Clubs',
    'nav.champions': 'Nos Champions',
    'nav.events': 'Événements',
    'nav.partners': 'Partenaires',
    'nav.contact': 'Contact',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.retry': 'Réessayer',
    'common.close': 'Fermer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.continue': 'Continuer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.submit': 'Envoyer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.clear': 'Effacer',
    'common.all': 'Tout',
    'common.none': 'Aucun',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.ok': 'OK',
    'common.phone': 'Téléphone',
    'common.email': 'Email',
    'common.address': 'Adresse',
    'common.location': 'Localisation',
    'common.schedule': 'Horaires',
    'common.contact': 'Contact',
    'common.info': 'Informations',
    'common.details': 'Détails',
    'common.more': 'Plus',
    'common.less': 'Moins',
    
    // Home Page
    'home.title': 'ACAWA - Association Camerounaise de Karaté Wadokai',
    'home.subtitle': 'L\'Art Martial de l\'Excellence',
    'home.hero.description': 'Découvrez la tradition millénaire du Karaté Wadokai au Cameroun. Rejoignez notre communauté de pratiquants passionnés et développez force, discipline et respect à travers l\'art martial authentique.',
    'home.cta.findClub': 'Trouver un Club',
    'home.cta.join': 'Rejoindre ACAWA',
    'home.features.title': 'Pourquoi Choisir ACAWA ?',
    'home.features.subtitle': 'Une formation complète dans l\'art martial traditionnel du Karaté Wadokai',
    'home.feature.tradition.title': 'Tradition Authentique',
    'home.feature.tradition.desc': 'Apprenez le véritable Karaté Wadokai selon les enseignements traditionnels transmis par les maîtres japonais.',
    'home.feature.excellence.title': 'Excellence Sportive',
    'home.feature.excellence.desc': 'Formez-vous aux côtés de champions nationaux et internationaux dans un environnement d\'excellence.',
    'home.feature.community.title': 'Communauté Unie',
    'home.feature.community.desc': 'Rejoignez une famille de pratiquants passionnés répartis dans tout le Cameroun.',
    'home.stats.clubs': 'Clubs Affiliés',
    'home.stats.members': 'Membres Actifs',
    'home.stats.champions': 'Champions',
    'home.stats.years': 'Années d\'Excellence',
    'home.cta.ready': 'Prêt à Commencer Votre Parcours ?',
    'home.cta.description': 'Rejoignez ACAWA aujourd\'hui et découvrez la voie du Karaté Wadokai. Votre transformation commence maintenant.',
    
    // About Page
    'about.title': 'À Propos d\'ACAWA',
    'about.subtitle': 'L\'Association Camerounaise de Karaté Wadokai - Une tradition d\'excellence depuis plus de 10 ans',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc1': 'ACAWA a pour mission de promouvoir et développer l\'art martial traditionnel du Karaté Wadokai au Cameroun. Nous nous engageons à former des pratiquants respectueux des valeurs traditionnelles tout en développant leurs compétences techniques et leur caractère.',
    'about.mission.desc2': 'Notre approche combine la discipline traditionnelle du Wadokai avec des méthodes d\'enseignement modernes, créant un environnement d\'apprentissage optimal pour tous les âges et niveaux.',
    'about.values.title': 'Nos Valeurs',
    'about.values.respect': 'Respect et discipline',
    'about.values.excellence': 'Excellence technique',
    'about.values.tradition': 'Tradition authentique',
    'about.values.community': 'Esprit communautaire',
    'about.values.development': 'Développement personnel',
    
    // Clubs Page
    'clubs.title': 'Nos Clubs',
    'clubs.subtitle': 'Découvrez les dojos ACAWA près de chez vous',
    'clubs.level': 'Niveau',
    'clubs.allLevels': 'Tous niveaux',
    'clubs.beginner': 'Débutant',
    'clubs.advanced': 'Avancé',
    'clubs.viewDetails': 'Voir les détails',
    'clubs.backToClubs': '← Retour aux clubs',
    'clubs.about': 'À propos',
    'clubs.instructor': 'Instructeur',
    'clubs.readyToJoin': 'Prêt à nous rejoindre ?',
    'clubs.readyToJoinDesc': 'Contactez-nous pour plus d\'informations ou pour réserver votre cours d\'essai gratuit.',
    'clubs.contactWhatsApp': 'Contacter via WhatsApp',
    
    // Champions Page
    'champions.title': 'Nos Champions',
    'champions.subtitle': 'L\'excellence sportive au service du Karaté Wadokai',
    'champions.achievements': 'Palmarès',
    
    // Events Page
    'events.title': 'Nos Événements',
    'events.subtitle': 'Stages, compétitions et formations pour tous les niveaux',
    'events.register': 'S\'inscrire',
    'events.stage': 'Stage',
    'events.competition': 'Compétition',
    
    // Partners Page
    'partners.title': 'Nos Partenaires',
    'partners.subtitle': 'Ensemble pour le développement du karaté Wadokai',
    'partners.institutional': 'Institutionnel',
    'partners.technical': 'Technique',
    
    // Contact Page
    'contact.title': 'Nous Contacter',
    'contact.subtitle': 'Rejoignez la communauté ACAWA ou obtenez plus d\'informations',
    'contact.info.title': 'Informations de Contact',
    'contact.social.title': 'Réseaux Sociaux',
    'contact.quick.title': 'Contact Rapide',
    'contact.whatsapp.title': 'Contact WhatsApp Recommandé',
    'contact.whatsapp.desc': 'Pour une réponse rapide, contactez-nous directement via WhatsApp.',
    'contact.whatsapp.cta': 'Contacter via WhatsApp',
    'contact.faq.title': 'Questions Fréquentes',
    'contact.faq.join': '• Comment rejoindre un club ?',
    'contact.faq.prices': '• Quels sont les tarifs ?',
    'contact.faq.beginners': '• Programme pour débutants ?',
    'contact.faq.schedule': '• Horaires et localisations ?',
    
    // Footer
    'footer.brand.desc': 'ACAWA promeut l\'art martial traditionnel du Karaté Wadokai au Cameroun. Rejoignez notre communauté de pratiquants passionnés et découvrez l\'excellence martiale à travers nos clubs répartis dans tout le pays.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.followUs': 'Suivez-nous',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.desc': 'Recevez nos dernières actualités et événements directement dans votre boîte mail.',
    'footer.newsletter.placeholder': 'Votre email...',
    'footer.newsletter.privacy': 'En vous abonnant, vous acceptez de recevoir nos communications par email.',
    'footer.affiliations': 'Affiliations',
    'footer.copyright': '© {year} ACAWA - Association Camerounaise de Karaté Wadokai. Tous droits réservés.',
    'footer.tagline': '🥋 L\'Art Martial de l\'Excellence | Développé avec ❤️ au Cameroun',
    
    // Theme and Language
    'theme.toggle': 'Basculer le thème',
    'theme.light': 'Mode clair',
    'theme.dark': 'Mode sombre',
    'language.toggle': 'Changer la langue',
    'language.french': 'Français',
    'language.english': 'Anglais',
    
    // Error messages
    'error.notFound': 'Page non trouvée',
    'error.server': 'Erreur serveur',
    'error.network': 'Erreur réseau',
    'error.generic': 'Une erreur s\'est produite',
    
    // Success messages
    'success.saved': 'Enregistré avec succès',
    'success.sent': 'Envoyé avec succès',
    'success.updated': 'Mis à jour avec succès'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.clubs': 'Our Clubs',
    'nav.champions': 'Our Champions',
    'nav.events': 'Events',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.address': 'Address',
    'common.location': 'Location',
    'common.schedule': 'Schedule',
    'common.contact': 'Contact',
    'common.info': 'Information',
    'common.details': 'Details',
    'common.more': 'More',
    'common.less': 'Less',
    
    // Home Page
    'home.title': 'ACAWA - Cameroon Wadokai Karate Association',
    'home.subtitle': 'The Martial Art of Excellence',
    'home.hero.description': 'Discover the ancient tradition of Wadokai Karate in Cameroon. Join our community of passionate practitioners and develop strength, discipline and respect through authentic martial arts.',
    'home.cta.findClub': 'Find a Club',
    'home.cta.join': 'Join ACAWA',
    'home.features.title': 'Why Choose ACAWA?',
    'home.features.subtitle': 'Complete training in the traditional martial art of Wadokai Karate',
    'home.feature.tradition.title': 'Authentic Tradition',
    'home.feature.tradition.desc': 'Learn true Wadokai Karate according to traditional teachings transmitted by Japanese masters.',
    'home.feature.excellence.title': 'Sports Excellence',
    'home.feature.excellence.desc': 'Train alongside national and international champions in an environment of excellence.',
    'home.feature.community.title': 'United Community',
    'home.feature.community.desc': 'Join a family of passionate practitioners spread throughout Cameroon.',
    'home.stats.clubs': 'Affiliated Clubs',
    'home.stats.members': 'Active Members',
    'home.stats.champions': 'Champions',
    'home.stats.years': 'Years of Excellence',
    'home.cta.ready': 'Ready to Start Your Journey?',
    'home.cta.description': 'Join ACAWA today and discover the way of Wadokai Karate. Your transformation begins now.',
    
    // About Page
    'about.title': 'About ACAWA',
    'about.subtitle': 'The Cameroon Wadokai Karate Association - A tradition of excellence for over 10 years',
    'about.mission.title': 'Our Mission',
    'about.mission.desc1': 'ACAWA\'s mission is to promote and develop the traditional martial art of Wadokai Karate in Cameroon. We are committed to training practitioners who respect traditional values while developing their technical skills and character.',
    'about.mission.desc2': 'Our approach combines traditional Wadokai discipline with modern teaching methods, creating an optimal learning environment for all ages and levels.',
    'about.values.title': 'Our Values',
    'about.values.respect': 'Respect and discipline',
    'about.values.excellence': 'Technical excellence',
    'about.values.tradition': 'Authentic tradition',
    'about.values.community': 'Community spirit',
    'about.values.development': 'Personal development',
    
    // Clubs Page
    'clubs.title': 'Our Clubs',
    'clubs.subtitle': 'Discover ACAWA dojos near you',
    'clubs.level': 'Level',
    'clubs.allLevels': 'All levels',
    'clubs.beginner': 'Beginner',
    'clubs.advanced': 'Advanced',
    'clubs.viewDetails': 'View details',
    'clubs.backToClubs': '← Back to clubs',
    'clubs.about': 'About',
    'clubs.instructor': 'Instructor',
    'clubs.readyToJoin': 'Ready to join us?',
    'clubs.readyToJoinDesc': 'Contact us for more information or to book your free trial class.',
    'clubs.contactWhatsApp': 'Contact via WhatsApp',
    
    // Champions Page
    'champions.title': 'Our Champions',
    'champions.subtitle': 'Sports excellence in service of Wadokai Karate',
    'champions.achievements': 'Achievements',
    
    // Events Page
    'events.title': 'Our Events',
    'events.subtitle': 'Training camps, competitions and courses for all levels',
    'events.register': 'Register',
    'events.stage': 'Training Camp',
    'events.competition': 'Competition',
    
    // Partners Page
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Together for the development of Wadokai karate',
    'partners.institutional': 'Institutional',
    'partners.technical': 'Technical',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Join the ACAWA community or get more information',
    'contact.info.title': 'Contact Information',
    'contact.social.title': 'Social Media',
    'contact.quick.title': 'Quick Contact',
    'contact.whatsapp.title': 'Recommended WhatsApp Contact',
    'contact.whatsapp.desc': 'For a quick response, contact us directly via WhatsApp.',
    'contact.whatsapp.cta': 'Contact via WhatsApp',
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.join': '• How to join a club?',
    'contact.faq.prices': '• What are the rates?',
    'contact.faq.beginners': '• Program for beginners?',
    'contact.faq.schedule': '• Schedules and locations?',
    
    // Footer
    'footer.brand.desc': 'ACAWA promotes the traditional martial art of Wadokai Karate in Cameroon. Join our community of passionate practitioners and discover martial excellence through our clubs spread throughout the country.',
    'footer.quickLinks': 'Quick Links',
    'footer.followUs': 'Follow Us',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.desc': 'Receive our latest news and events directly in your mailbox.',
    'footer.newsletter.placeholder': 'Your email...',
    'footer.newsletter.privacy': 'By subscribing, you agree to receive our communications by email.',
    'footer.affiliations': 'Affiliations',
    'footer.copyright': '© {year} ACAWA - Cameroon Wadokai Karate Association. All rights reserved.',
    'footer.tagline': '🥋 The Martial Art of Excellence | Made with ❤️ in Cameroon',
    
    // Theme and Language
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light mode',
    'theme.dark': 'Dark mode',
    'language.toggle': 'Change language',
    'language.french': 'French',
    'language.english': 'English',
    
    // Error messages
    'error.notFound': 'Page not found',
    'error.server': 'Server error',
    'error.network': 'Network error',
    'error.generic': 'An error occurred',
    
    // Success messages
    'success.saved': 'Successfully saved',
    'success.sent': 'Successfully sent',
    'success.updated': 'Successfully updated'
  }
};

// Get initial language from localStorage or browser preference
const getInitialLanguage = (): Language => {
  // Try to get from localStorage first
  const savedLanguage = storage.get<Language>('acawa-language');
  if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
    return savedLanguage;
  }
  
  // Fall back to browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) {
      return 'en';
    }
  }
  
  // Default to French
  return 'fr';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  // Set language function
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    storage.set('acawa-language', newLanguage);
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLanguage === 'fr' ? 'fr-FR' : 'en-US';
    }
  };

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
  };

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const translation = translations[language]?.[key];
    if (translation) {
      return translation;
    }
    
    // Try fallback language
    const fallbackLang = language === 'fr' ? 'en' : 'fr';
    const fallbackTranslation = translations[fallbackLang]?.[key];
    if (fallbackTranslation) {
      return fallbackTranslation;
    }
    
    // Return provided fallback or the key itself
    return fallback || key;
  };

  // Update HTML lang attribute on language change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Component for language toggle button
export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${className}`}
      aria-label={t('language.toggle')}
      title={language === 'fr' ? t('language.english') : t('language.french')}
    >
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {language === 'fr' ? '🇫🇷 FR' : '🇺🇸 EN'}
        </span>
      </div>
    </button>
  );
};