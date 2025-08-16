'use client';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

interface SmoothScrollOptions {
  duration?: number;
  ease?: string;
  offset?: number;
}

export const smoothScrollTo = (
  target: string | HTMLElement,
  options: SmoothScrollOptions = {}
) => {
  const {
    duration = 1.2,
    ease = 'power2.inOut',
    offset = -80 // Account for fixed navbar
  } = options;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Use instant scroll for users who prefer reduced motion
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: elementPosition, behavior: 'auto' });
    }
    return;
  }

  // High-performance GSAP scroll with 60+ FPS
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: Math.abs(offset)
    },
    ease,
    // Optimize for performance
    force3D: true,
    // Ensure smooth 60+ FPS animation
    onUpdate: () => {
      // Force GPU acceleration during scroll
      document.body.style.transform = 'translateZ(0)';
    },
    onComplete: () => {
      // Clean up after animation
      document.body.style.transform = '';
    }
  });
};

// Utility function for navigation links
export const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  callback?: () => void
) => {
  e.preventDefault();
  
  // Extract the hash from href
  const targetId = href.startsWith('#') ? href : `#${href}`;
  
  // Smooth scroll to target
  smoothScrollTo(targetId, {
    duration: 1.0,
    ease: 'power2.inOut',
    offset: -80
  });
  
  // Execute callback (e.g., close mobile menu)
  if (callback) {
    setTimeout(callback, 100);
  }
  
  // Update URL without triggering scroll
  if (history.pushState) {
    history.pushState(null, '', targetId);
  }
};

// Initialize smooth scroll for the entire application
export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return;

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        smoothScrollTo(hash, { duration: 0.8 });
      }, 100);
    }
  });

  // Handle direct hash links on page load
  if (window.location.hash) {
    setTimeout(() => {
      smoothScrollTo(window.location.hash, { duration: 0.8 });
    }, 500); // Wait for page to fully load
  }
};