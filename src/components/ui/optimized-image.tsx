'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  /**
   * Whether to show a blur placeholder during loading
   * Helps reduce CLS (Cumulative Layout Shift)
   */
  showBlur?: boolean;

  /**
   * Aspect ratio for the image container
   * Helps reserve space and prevent layout shift
   */
  aspectRatio?: 'square' | '4:3' | '16:9' | '3:2' | 'auto';

  /**
   * Wrapper class name
   */
  wrapperClassName?: string;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-video',
  '3:2': 'aspect-[3/2]',
  auto: '',
};

/**
 * Optimized image component for better Core Web Vitals
 *
 * Features:
 * - Automatic blur placeholder for reduced CLS
 * - Aspect ratio preservation
 * - Lazy loading for below-fold images
 * - Priority loading for hero images
 * - Smooth fade-in animation on load
 */
export function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  showBlur = true,
  aspectRatio = 'auto',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        wrapperClassName
      )}
    >
      {/* Blur placeholder background */}
      {showBlur && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
}

/**
 * Hero image component optimized for LCP (Largest Contentful Paint)
 *
 * Uses:
 * - Priority loading
 * - fetchpriority="high"
 * - Proper sizing hints
 */
export function HeroImage({
  src,
  alt,
  className,
  wrapperClassName,
  ...props
}: Omit<OptimizedImageProps, 'priority' | 'showBlur'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      wrapperClassName={wrapperClassName}
      priority
      showBlur
      sizes="(max-width: 768px) 100vw, 50vw"
      {...props}
    />
  );
}

/**
 * Trade/product card image with lazy loading
 */
export function CardImage({
  src,
  alt,
  className,
  wrapperClassName,
  ...props
}: Omit<OptimizedImageProps, 'priority'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      wrapperClassName={wrapperClassName}
      priority={false}
      showBlur
      aspectRatio="4:3"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      {...props}
    />
  );
}
