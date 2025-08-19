import React, { useState, useRef, useEffect } from 'react';
import { generateResponsiveImageSources, supportsWebP } from '../../utils/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  quality?: 'thumbnail' | 'gallery' | 'hero' | 'print';
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  onLoad,
  onError,
  threshold = 0.1
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [optimalSrc, setOptimalSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Set optimal source when image comes into view
          const updateOptimalSrc = async () => {
            if (hasError) {
              setOptimalSrc(src);
              return;
            }
            
            try {
              const imageSources = generateResponsiveImageSources(src);
              const webpSupport = await supportsWebP();
              
              if (webpSupport && imageSources.webp) {
                setOptimalSrc(imageSources.webp.medium);
              } else {
                setOptimalSrc(imageSources.fallback.medium || src);
              }
            } catch (error) {
              setOptimalSrc(src);
            }
          };
          
          updateOptimalSrc();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [threshold, src, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <div className="text-4xl opacity-50">{placeholder}</div>
          ) : (
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-sm">Image non disponible</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? optimalSrc : ''}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
