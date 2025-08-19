import React, { useState, useRef, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface LazyGalleryImageProps {
  src: string;
  alt: string;
  thumbnail?: string;
  onClick?: () => void;
  className?: string;
  aspectRatio?: 'square' | '4:3' | '16:9' | 'auto';
}

/**
 * Lazy loading gallery image with optimized loading and placeholder
 */
const LazyGalleryImage: React.FC<LazyGalleryImageProps> = ({
  src,
  alt,
  thumbnail,
  onClick,
  className = '',
  aspectRatio = 'auto'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case '4:3':
        return 'aspect-[4/3]';
      case '16:9':
        return 'aspect-video';
      default:
        return '';
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${getAspectRatioClass()} ${className}`}
      onClick={onClick}
    >
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      
      {/* Thumbnail blur placeholder */}
      {thumbnail && !isLoaded && isVisible && (
        <div className="absolute inset-0">
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover filter blur-md scale-110"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main optimized image */}
      {isVisible && (
        <OptimizedImage
          src={src}
          alt={alt}
          className="w-full h-full"
          quality="gallery"
          lazy={false} // Already handled by parent
          onLoad={handleLoad}
          style={{
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 1 : 0
          }}
        />
      )}

      {/* Loading overlay */}
      {isVisible && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </div>
  );
};

export default LazyGalleryImage;
