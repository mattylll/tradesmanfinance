'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackToTopButtonProps {
  /**
   * Scroll threshold in pixels before the button appears
   * @default 300
   */
  threshold?: number;

  /**
   * Custom class name for additional styling
   */
  className?: string;

  /**
   * Scroll behavior: 'smooth' for animated scroll, 'auto' for instant
   * @default 'smooth'
   */
  scrollBehavior?: ScrollBehavior;
}

/**
 * Back to Top Button Component
 *
 * A fixed-position button that appears after scrolling down the page,
 * allowing users to quickly return to the top with smooth scrolling.
 *
 * Features:
 * - Appears after scrolling past threshold (default 300px)
 * - Smooth fade-in/out animation
 * - Industrial orange theme matching the design system
 * - Fully accessible with aria-label and keyboard support
 * - Works on both desktop and mobile
 */
export function BackToTopButton({
  threshold = 300,
  className,
  scrollBehavior = 'smooth',
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll visibility
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > threshold);
  }, [threshold]);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  }, [scrollBehavior]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToTop();
      }
    },
    [scrollToTop]
  );

  // Set up scroll listener
  useEffect(() => {
    // Check initial scroll position
    handleScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        // Base styles
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center',
        'h-12 w-12 rounded-full',
        // Industrial orange theme
        'bg-[#ff6b35] text-white',
        // Shadow with orange tint
        'shadow-lg shadow-[#ff6b35]/25',
        // Transitions
        'transition-all duration-300 ease-out',
        // Hover effects
        'hover:bg-[#e55a2b] hover:-translate-y-1',
        'hover:shadow-xl hover:shadow-[#ff6b35]/30',
        // Focus styles for accessibility
        'focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2',
        // Active state
        'active:scale-95 active:bg-[#d14e22]',
        // Visibility animation
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
        // Mobile adjustments
        'md:h-14 md:w-14 md:bottom-8 md:right-8',
        // Custom className
        className
      )}
    >
      <ArrowUp
        className="h-5 w-5 md:h-6 md:w-6"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </button>
  );
}

export default BackToTopButton;
