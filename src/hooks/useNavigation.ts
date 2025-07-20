import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import type { UseMobileNavigationReturn } from '@/types';

/**
 * Custom hook for managing mobile navigation state with strict typing
 */
export function useMobileNavigation(): UseMobileNavigationReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = useCallback((): void => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback((): void => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  } as const;
}

/**
 * Custom hook for detecting scroll position with configurable threshold
 */
export function useScrollDetection(threshold: number = 50): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Validate threshold
    if (threshold < 0) {
      console.warn('useScrollDetection: threshold should be a positive number');
    }

    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > Math.max(0, threshold));
    };

    // Set initial state
    handleScroll();

    // Add event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Custom hook for smooth scrolling utilities with error handling
 */
export function useSmoothScroll() {
  const scrollToElement = useCallback((elementId: string): boolean => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`useSmoothScroll: Element with id "${elementId}" not found`);
        return false;
      }
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      return true;
    } catch (error) {
      console.error('useSmoothScroll: Error scrolling to element', error);
      return false;
    }
  }, []);

  const scrollToTop = useCallback((): void => {
    try {
      window.scrollTo({ 
        top: 0, 
        left: 0,
        behavior: 'smooth' 
      });
    } catch (error) {
      console.error('useSmoothScroll: Error scrolling to top', error);
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, []);

  const scrollToPosition = useCallback((x: number, y: number): void => {
    try {
      window.scrollTo({
        top: y,
        left: x,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error('useSmoothScroll: Error scrolling to position', error);
      window.scrollTo(x, y);
    }
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToPosition,
  } as const;
}
