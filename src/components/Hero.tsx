'use client';

import { Canvas } from './three/Canvas';
import { Model3D } from './three/Model3D';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Load custom fonts
const loadCustomFonts = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Aquire';
        src: url('/font-family/aquire/Aquire.woff') format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Aquire';
        src: url('/font-family/aquire/Aquire-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }
};
import { ErrorBoundary } from './ErrorBoundary';

export const Hero = () => {
  const mobileHeaderRef = useRef<HTMLHeadingElement>(null);
  const mobileSubheaderRef = useRef<HTMLHeadingElement>(null);
  const desktopHeaderRef = useRef<HTMLHeadingElement>(null);
  const desktopSubheaderRef = useRef<HTMLHeadingElement>(null);
  const mobileButtonsRef = useRef<HTMLDivElement>(null);
  const desktopButtonsRef = useRef<HTMLDivElement>(null);
  const mobile3DRef = useRef<HTMLDivElement>(null);
  const desktop3DRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the custom fonts when component mounts
  useEffect(() => {
    loadCustomFonts();
  }, []);

  // Reveal text animation with ScrollTrigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Get all text elements
      const mobileHeaderSpans = mobileHeaderRef.current?.querySelectorAll('.line span');
      const mobileSubheaderSpans = mobileSubheaderRef.current?.querySelectorAll('.line span');
      const desktopHeaderSpans = desktopHeaderRef.current?.querySelectorAll('.line span');
      const desktopSubheaderSpans = desktopSubheaderRef.current?.querySelectorAll('.line span');

      // Combine all spans for animation
      const allSpans = [
        ...(mobileHeaderSpans || []),
        ...(mobileSubheaderSpans || []),
        ...(desktopHeaderSpans || []),
        ...(desktopSubheaderSpans || [])
      ];

      if (allSpans.length > 0) {
        // Set initial state
        gsap.set(allSpans, {
          y: 100,
          skewY: 7,
          transformOrigin: 'bottom center',
          force3D: true
        });

        // Create animation timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
            markers: false
          }
        });

        tl.to(allSpans, {
          duration: 1.8,
          y: 0,
          skewY: 0,
          ease: "power4.out",
          force3D: true,
          stagger: {
            amount: 0.3
          }
        });
      }

      // Animate buttons
      const mobileButtons = mobileButtonsRef.current?.querySelectorAll('button');
      const desktopButtons = desktopButtonsRef.current?.querySelectorAll('button');
      const allButtons = [...(mobileButtons || []), ...(desktopButtons || [])];

      if (allButtons.length > 0) {
        gsap.set(allButtons, {
          y: 50,
          opacity: 0,
          scale: 0.9
        });

        gsap.to(allButtons, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 1,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.5
        });
      }

      // Animate 3D models
      const mobile3D = mobile3DRef.current;
      const desktop3D = desktop3DRef.current;
      const all3D = [mobile3D, desktop3D].filter(Boolean);

      if (all3D.length > 0) {
        gsap.set(all3D, {
          y: 100,
          opacity: 0,
          scale: 0.8
        });

        gsap.to(all3D, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 1.5,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          delay: 0.3
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-gray-50 pt-14 overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 h-screen lg:flex lg:flex-col lg:justify-between">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col relative z-20">
          {/* Header Text - Mobile */}
          <div className="text-center pt-4 sm:pt-8 mb-4 sm:mb-8">
            <h1 ref={mobileHeaderRef} className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight hero-title">
              <div className="line overflow-hidden">
                <span className="inline-block">Bring <span className="italic font-bold inline-block rounded-md ml-2 hero-educational-badge">Educational</span></span>
              </div>
              <div className="line overflow-hidden">
                <span className="block">Concepts to Life</span>
              </div>
            </h1>
            <h2 ref={mobileSubheaderRef} className="text-base sm:text-lg md:text-xl font-extrabold text-gray-800 hero-subtitle-mobile">
              <div className="line overflow-hidden">
                <span className="inline-block">With Vignam, You Can Build Stunning 3D Content Without Any Technical Expertise!</span>
              </div>
            </h2>
          </div>

          {/* 3D Model Section - Mobile */}
          <div ref={mobile3DRef} className="flex justify-center mb-6 sm:mb-8">
            <div className="w-full h-56 sm:h-64 md:h-80 max-w-sm sm:max-w-2xl md:max-w-4xl">
              <ErrorBoundary>
                <Canvas enableControls={false} className="w-full h-full">
                  <Model3D />
                </Canvas>
              </ErrorBoundary>
            </div>
          </div>

          {/* CTA Section - Mobile */}
          <div ref={mobileButtonsRef} className="flex justify-center pb-4 sm:pb-12 relative z-20">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center px-4">
              <button
                className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white text-sm sm:text-base border border-gray-400 active:translate-y-0.5 w-[160px] sm:w-[180px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 btn-primary"
                aria-label="Get started with Vignam platform"
              >
                Get Started
              </button>
              <button
                className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white text-sm sm:text-base border border-gray-500 active:translate-y-0.5 w-[160px] sm:w-[180px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 btn-secondary"
                aria-label="Book a free demo session"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:contents relative z-20">
          {/* Header Text - Desktop */}
          <div className="flex-shrink-0 text-center pt-16 relative z-20">
            <h1 ref={desktopHeaderRef} className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight hero-title">
              <div className="line overflow-hidden">
                <span className="inline-block">Bring <span className="italic font-bold inline-block rounded-md ml-2 hero-educational-badge">Educational</span></span>
              </div>
              <div className="line overflow-hidden">
                <span className="block">Concepts to Life</span>
              </div>
            </h1>
            <h2 ref={desktopSubheaderRef} className="text-lg font-bold text-gray-700 hero-subtitle-desktop">
              <div className="line overflow-hidden">
                <span className="inline-block">With Vignam, You Can Build Stunning 3D Content Without Any Technical Expertise!</span>
              </div>
            </h2>
          </div>

          {/* 3D Model Section - Desktop */}
          <div ref={desktop3DRef} className="flex-1 flex items-center justify-center min-h-0 relative z-20">
            <div className="w-full h-96 max-w-6xl">
              <ErrorBoundary>
                <Canvas enableControls={false} className="w-full h-full">
                  <Model3D />
                </Canvas>
              </ErrorBoundary>
            </div>
          </div>

          {/* CTA Section - Desktop */}
          <div ref={desktopButtonsRef} className="flex-shrink-0 pb-16 flex justify-center relative z-20">
            <div className="flex gap-4 items-center">
              <button
                className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white border border-gray-400 active:translate-y-0.5 w-[180px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 btn-primary"
                aria-label="Get started with Vignam platform"
              >
                Get Started
              </button>
              <button
                className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white border border-gray-500 active:translate-y-0.5 w-[180px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 btn-secondary"
                aria-label="Book a free demo session"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};