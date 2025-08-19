import React from 'react';

/**
 * Enhanced loading component with skeleton UI
 */
export const SkeletonLoader: React.FC<{ 
  variant?: 'text' | 'card' | 'image' | 'video' | 'header' | 'footer';
  className?: string;
}> = ({ variant = 'card', className = '' }) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variants = {
    text: `${baseClasses} h-4 rounded`,
    card: `${baseClasses} h-48 rounded-lg`,
    image: `${baseClasses} aspect-video rounded-lg`,
    video: `${baseClasses} aspect-video rounded-lg`,
    header: `${baseClasses} h-20 w-full`,
    footer: `${baseClasses} h-32 w-full`
  };

  return (
    <div className={`${variants[variant]} ${className}`} />
  );
};

/**
 * Page skeleton loader with realistic layout
 */
export const PageSkeleton: React.FC<{ type?: 'home' | 'about' | 'gallery' | 'contact' }> = ({ 
  type = 'home' 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <div>
                <div className="w-20 h-6 bg-gray-300 rounded mb-1"></div>
                <div className="w-32 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="hidden lg:flex space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-20 h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-96 h-12 bg-white/30 rounded mx-auto mb-6"></div>
          <div className="w-full max-w-2xl h-6 bg-white/20 rounded mx-auto"></div>
        </div>
      </div>

      {/* Content skeleton based on type */}
      <div className="container mx-auto px-4 py-16">
        {type === 'home' && <HomeContentSkeleton />}
        {type === 'about' && <AboutContentSkeleton />}
        {type === 'gallery' && <GalleryContentSkeleton />}
        {type === 'contact' && <ContactContentSkeleton />}
      </div>

      {/* Footer skeleton */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-4">
                <div className="w-24 h-6 bg-gray-600 rounded"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-700 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeContentSkeleton: React.FC = () => (
  <>
    {/* Stats section */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
          <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-4"></div>
          <div className="w-12 h-8 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="w-20 h-4 bg-gray-200 rounded mx-auto"></div>
        </div>
      ))}
    </div>

    {/* Features section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </>
);

const AboutContentSkeleton: React.FC = () => (
  <div className="space-y-16">
    {/* Mission section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="w-48 h-8 bg-gray-300 rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-full h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="w-32 h-6 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Team section */}
    <div>
      <div className="w-48 h-8 bg-gray-300 rounded mx-auto mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="w-32 h-6 bg-gray-300 rounded mx-auto mb-2"></div>
            <div className="w-20 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
            <div className="w-24 h-3 bg-gray-200 rounded mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GalleryContentSkeleton: React.FC = () => (
  <>
    {/* Tabs */}
    <div className="flex justify-center mb-8">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <div className="w-24 h-12 bg-gray-300 rounded mr-1"></div>
        <div className="w-24 h-12 bg-gray-300 rounded"></div>
      </div>
    </div>

    {/* Gallery grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="aspect-square bg-gray-300 rounded-lg"></div>
      ))}
    </div>
  </>
);

const ContactContentSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    {/* Contact form */}
    <div className="space-y-6">
      <div className="w-48 h-8 bg-gray-300 rounded"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="space-y-2">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
        <div className="w-32 h-12 bg-gray-300 rounded"></div>
      </div>
    </div>

    {/* Contact info */}
    <div className="space-y-8">
      <div className="w-48 h-8 bg-gray-300 rounded"></div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <div className="w-32 h-5 bg-gray-300 rounded mb-1"></div>
              <div className="w-48 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Lazy loading wrapper with intersection observer
 */
export const LazySection: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}> = ({ 
  children, 
  fallback = <SkeletonLoader />, 
  threshold = 0.1,
  rootMargin = '50px',
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
};

/**
 * Progressive image loading component
 */
export const ProgressiveImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}> = ({ src, alt, className = '', placeholder }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          {placeholder ? (
            <span className="text-4xl opacity-50">{placeholder}</span>
          ) : (
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
      
      {/* Image */}
      <img
        ref={imgRef}
        src={isInView ? src : ''}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default LazySection;