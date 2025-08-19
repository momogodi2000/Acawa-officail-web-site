import { useState, useEffect } from 'react';
import { preloadImage } from '../utils/imageOptimization';

interface UseImagePreloaderOptions {
  priority?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for preloading images with loading state management
 */
export const useImagePreloader = (
  imageSources: string | string[],
  options: UseImagePreloaderOptions = {}
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const sources = Array.isArray(imageSources) ? imageSources : [imageSources];
  const totalImages = sources.length;

  useEffect(() => {
    if (!sources.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsLoaded(false);
    setHasError(false);
    setLoadedCount(0);

    // Preload all images
    sources.forEach(async (src) => {
      try {
        await preloadImage(src);
        setLoadedCount(prev => {
          const newCount = prev + 1;
          if (newCount === totalImages) {
            setIsLoading(false);
            setIsLoaded(true);
            options.onLoad?.();
          }
          return newCount;
        });
      } catch (error) {
        console.warn(`Failed to preload image: ${src}`, error);
        setHasError(true);
        if (options.onError) {
          options.onError(error as Error);
        }
        
        // Still count as "loaded" to prevent hanging
        setLoadedCount(prev => {
          const newCount = prev + 1;
          if (newCount === totalImages) {
            setIsLoading(false);
            setIsLoaded(true);
          }
          return newCount;
        });
      }
    });

    // If priority is set, don't wait for all images
    if (options.priority && sources.length > 0) {
      preloadImage(sources[0])
        .then(() => {
          setIsLoading(false);
          setIsLoaded(true);
          options.onLoad?.();
        })
        .catch((error) => {
          setHasError(true);
          setIsLoading(false);
          options.onError?.(error);
        });
    }

  }, [imageSources]);

  const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;

  return {
    isLoading,
    isLoaded,
    hasError,
    progress,
    loadedCount,
    totalImages
  };
};

/**
 * Hook for progressive image loading with multiple quality levels
 */
export const useProgressiveImage = (
  lowQualitySrc: string,
  highQualitySrc: string
) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    // Start with low quality
    setCurrentSrc(lowQualitySrc);
    setIsHighQualityLoaded(false);

    // Preload high quality version
    preloadImage(highQualitySrc)
      .then(() => {
        setCurrentSrc(highQualitySrc);
        setIsHighQualityLoaded(true);
      })
      .catch((error) => {
        console.warn('Failed to load high quality image:', error);
      });
  }, [lowQualitySrc, highQualitySrc]);

  return {
    src: currentSrc,
    isHighQualityLoaded
  };
};

/**
 * Hook for critical images that should be preloaded on page load
 */
export const useCriticalImages = (criticalImages: string[]) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const preloadCritical = async () => {
      try {
        await Promise.allSettled(
          criticalImages.map(src => preloadImage(src))
        );
        setIsReady(true);
      } catch (error) {
        console.warn('Some critical images failed to preload:', error);
        setIsReady(true); // Don't block the app
      }
    };

    if (criticalImages.length > 0) {
      preloadCritical();
    } else {
      setIsReady(true);
    }
  }, [criticalImages]);

  return { isReady };
};

export default useImagePreloader;
