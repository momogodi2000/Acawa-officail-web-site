/**
 * Image optimization utilities for ACAWA platform
 * Provides WebP support, responsive images, and lazy loading
 */

export interface ImageSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export const defaultImageSizes: ImageSizes = {
  small: 320,
  medium: 640,
  large: 1024,
  xlarge: 1920
};

/**
 * Generate responsive image sources with WebP fallback
 */
export const generateResponsiveImageSources = (
  imagePath: string,
  sizes: ImageSizes = defaultImageSizes
) => {
  const baseUrl = imagePath.replace(/\.[^/.]+$/, ''); // Remove extension
  const extension = imagePath.split('.').pop() || 'jpg';

  return {
    webp: {
      small: `${baseUrl}-${sizes.small}w.webp`,
      medium: `${baseUrl}-${sizes.medium}w.webp`,
      large: `${baseUrl}-${sizes.large}w.webp`,
      xlarge: `${baseUrl}-${sizes.xlarge}w.webp`,
    },
    fallback: {
      small: `${baseUrl}-${sizes.small}w.${extension}`,
      medium: `${baseUrl}-${sizes.medium}w.${extension}`,
      large: `${baseUrl}-${sizes.large}w.${extension}`,
      xlarge: `${baseUrl}-${sizes.xlarge}w.${extension}`,
    },
    original: imagePath
  };
};

/**
 * Generate srcSet for responsive images
 */
export const generateSrcSet = (sources: Record<string, string>) => {
  return Object.entries(sources)
    .map(([size, src]) => {
      const width = size === 'small' ? 320 : 
                   size === 'medium' ? 640 : 
                   size === 'large' ? 1024 : 1920;
      return `${src} ${width}w`;
    })
    .join(', ');
};

/**
 * Get optimal image sizes based on screen size
 */
export const getOptimalImageSizes = () => {
  return "(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px";
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Check WebP support
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Image loading states
 */
export enum ImageLoadingState {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

/**
 * Image compression quality settings
 */
export const imageQualitySettings = {
  thumbnail: 70,
  gallery: 85,
  hero: 90,
  print: 95
} as const;
