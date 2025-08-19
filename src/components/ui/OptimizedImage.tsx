import React, { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';
import { 
  generateResponsiveImageSources, 
  generateSrcSet, 
  getOptimalImageSizes, 
  ImageSizes,
  ImageLoadingState,
  supportsWebP 
} from '../../utils/imageOptimization';

export interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  src: string;
  alt: string;
  lazy?: boolean;
  responsive?: boolean;
  imageSizes?: ImageSizes;
  quality?: 'thumbnail' | 'gallery' | 'hero' | 'print';
  placeholder?: string;
  showLoadingSpinner?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  fallbackSrc?: string;
}

/**
 * Optimized Image Component with WebP support, lazy loading, and responsive images
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  lazy = true,
  responsive = true,
  imageSizes,
  quality = 'gallery',
  placeholder,
  showLoadingSpinner = true,
  onLoad,
  onError,
  className = '',
  fallbackSrc,
  ...props
}) => {
  const [loadingState, setLoadingState] = useState<ImageLoadingState>(ImageLoadingState.LOADING);
  const [hasWebPSupport, setHasWebPSupport] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check WebP support
  useEffect(() => {
    supportsWebP().then(setHasWebPSupport);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  const handleLoad = () => {
    setLoadingState(ImageLoadingState.LOADED);
    onLoad?.();
  };

  const handleError = () => {
    setLoadingState(ImageLoadingState.ERROR);
    onError?.();
  };

  // Generate responsive image sources
  const imageSources = responsive ? generateResponsiveImageSources(src, imageSizes) : null;
  
  // Determine which format to use
  const useWebP = hasWebPSupport && imageSources;
  const srcSet = useWebP 
    ? generateSrcSet(imageSources.webp)
    : imageSources 
      ? generateSrcSet(imageSources.fallback)
      : undefined;

  const finalSrc = isInView ? (
    loadingState === ImageLoadingState.ERROR && fallbackSrc 
      ? fallbackSrc 
      : src
  ) : (placeholder || '');

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      {...(props.style && { style: props.style })}
    >
      {/* Loading placeholder */}
      {!isInView && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Loading spinner */}
      {isInView && loadingState === ImageLoadingState.LOADING && showLoadingSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {loadingState === ImageLoadingState.ERROR && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center p-4">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">Image failed to load</p>
          </div>
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <picture>
          {/* WebP sources */}
          {useWebP && imageSources && (
            <source
              srcSet={generateSrcSet(imageSources.webp)}
              sizes={responsive ? getOptimalImageSizes() : undefined}
              type="image/webp"
            />
          )}
          
          {/* Fallback sources */}
          {responsive && imageSources && !useWebP && (
            <source
              srcSet={generateSrcSet(imageSources.fallback)}
              sizes={getOptimalImageSizes()}
            />
          )}
          
          {/* Main img element */}
          <img
            ref={imgRef}
            src={finalSrc}
            alt={alt}
            srcSet={srcSet}
            sizes={responsive ? getOptimalImageSizes() : undefined}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy ? 'lazy' : 'eager'}
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loadingState === ImageLoadingState.LOADED 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
