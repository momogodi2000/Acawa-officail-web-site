import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: readonly string[] | string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'video';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
  alternates?: Array<{
    href: string;
    hreflang: string;
  }>;
}

/**
 * Comprehensive SEO component with full meta tag support
 */
export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url,
  type = 'website',
  author = 'Association Camerounaise de Karaté Wadokai',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical,
  alternates = []
}) => {
  const { language } = useLanguage();
  const baseUrl = 'https://acawa-cameroon.org';
  
  // Generate full URLs
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : fullUrl;

  // Combine base keywords with page-specific ones
  const allKeywords = [
    'karaté',
    'wadokai',
    'wado ryu',
    'cameroun',
    'ACAWA',
    'arts martiaux',
    'clubs',
    'formation',
    'compétition',
    'dojos',
    'yaoundé',
    'douala',
    ...keywords
  ].join(', ');

  // Default titles and descriptions
  const defaultTitle = 'ACAWA - Association Camerounaise de Karaté Wadokai';
  const defaultDescription = 'Association Camerounaise de Karaté Wadokai - L\'Art Martial de l\'Excellence. Découvrez nos clubs, nos champions et rejoignez la tradition Wadokai au Cameroun.';

  const finalTitle = title ? `${title} | ACAWA` : defaultTitle;
  const finalDescription = description || defaultDescription;

  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Association Camerounaise de Karaté Wadokai',
    'alternateName': 'ACAWA',
    'url': baseUrl,
    'logo': `${baseUrl}/icons/logo.jpg`,
    'description': finalDescription,
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'CM',
      'addressRegion': 'Centre',
      'addressLocality': 'Yaoundé'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+237675395238',
      'contactType': 'customer service',
      'availableLanguage': ['fr', 'en']
    },
    'sameAs': [
      'https://www.facebook.com/ACAWA.cameroon',
      'https://www.instagram.com/ACAWA_cameroon',
      'https://wa.me/237675395238'
    ]
  };

  // Breadcrumb schema
  const breadcrumbSchema = url ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': generateBreadcrumbs(url)
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content="ACAWA - Association Camerounaise de Karaté Wadokai" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@ACAWA_cameroon" />
      
      {/* Alternative Language Links */}
      {alternates.map(alt => (
        <link key={alt.hreflang} rel="alternate" href={alt.href} hrefLang={alt.hreflang} />
      ))}
      
      {/* Default alternate languages */}
      <link rel="alternate" href={fullUrl} hrefLang="fr" />
      <link rel="alternate" href={fullUrl.replace('/fr/', '/en/')} hrefLang="en" />
      <link rel="alternate" href={fullUrl} hrefLang="x-default" />

      {/* Theme and App Meta */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ACAWA" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * Generate breadcrumb structured data from URL path
 */
function generateBreadcrumbs(url: string) {
  const paths = url.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Accueil',
      'item': 'https://acawa-cameroon.org'
    }
  ];

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const name = getBreadcrumbName(path);
    
    breadcrumbs.push({
      '@type': 'ListItem',
      'position': index + 2,
      'name': name,
      'item': `https://acawa-cameroon.org${currentPath}`
    });
  });

  return breadcrumbs;
}

/**
 * Convert path segment to readable breadcrumb name
 */
function getBreadcrumbName(path: string): string {
  const pathNames: Record<string, string> = {
    'a-propos': 'À Propos',
    'clubs': 'Nos Clubs',
    'champions': 'Champions',
    'evenements': 'Événements',
    'partenaires': 'Partenaires',
    'galerie': 'Galerie',
    'contact': 'Contact'
  };

  return pathNames[path] || path.charAt(0).toUpperCase() + path.slice(1);
}

/**
 * Preset SEO configurations for common pages
 */
export const SEOPresets = {
  home: {
    title: 'Accueil',
    description: 'Association Camerounaise de Karaté Wadokai - L\'Art Martial de l\'Excellence. Découvrez le karaté Wado Ryu au Cameroun, nos clubs, formations et compétitions.',
    keywords: ['accueil', 'karaté', 'wadokai', 'cameroun', 'arts martiaux'],
    url: '/'
  },
  
  about: {
    title: 'À Propos de nous',
    description: 'Découvrez l\'histoire, la mission et l\'équipe d\'ACAWA. Notre vision pour le développement du Karaté Wado Ryu au Cameroun et nos valeurs traditionnelles.',
    keywords: ['histoire', 'mission', 'équipe', 'valeurs', 'fondateurs'],
    url: '/a-propos'
  },
  
  clubs: {
    title: 'Nos Clubs',
    description: 'Trouvez un club de Karaté Wadokai près de chez vous. Plus de 15 dojos à travers le Cameroun, de Yaoundé à Douala, avec des instructeurs certifiés.',
    keywords: ['clubs', 'dojos', 'yaoundé', 'douala', 'instructeurs'],
    url: '/clubs'
  },
  
  gallery: {
    title: 'Galerie Photos et Vidéos',
    description: 'Découvrez en images et vidéos les moments forts d\'ACAWA : compétitions, démonstrations de senseis, entraînements et événements spéciaux.',
    keywords: ['photos', 'vidéos', 'galerie', 'compétitions', 'démonstrations', 'kata'],
    url: '/galerie',
    type: 'website' as const
  },
  
  contact: {
    title: 'Contact et Adhésion',
    description: 'Rejoignez ACAWA ! Contactez-nous pour vous inscrire dans un club, participer à nos formations ou obtenir des informations sur le Karaté Wadokai.',
    keywords: ['contact', 'adhésion', 'inscription', 'information'],
    url: '/contact'
  }
} as const;

export default SEOHead;