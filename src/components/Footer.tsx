'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Animate left column
      if (leftColumnRef.current) {
        gsap.set(leftColumnRef.current, {
          x: -50,
          opacity: 0
        });

        gsap.to(leftColumnRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          x: 0,
          opacity: 1,
          ease: "power3.out"
        });
      }

      // Animate right column contact items
      if (rightColumnRef.current) {
        const contactItems = rightColumnRef.current.querySelectorAll('.contact-item');
        gsap.set(contactItems, {
          x: 50,
          opacity: 0
        });

        gsap.to(contactItems, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          x: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2
        });
      }

      // Animate bottom section
      if (bottomRef.current) {
        gsap.set(bottomRef.current, {
          y: 30,
          opacity: 0
        });

        gsap.to(bottomRef.current, {
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          y: 0,
          opacity: 1,
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
    <footer ref={containerRef} className="pt-12 pb-6 relative footer-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Brand & Description */}
          <div ref={leftColumnRef}>
            {/* Brand Name */}
            <h2 className="text-2xl font-bold text-white mb-2">Vignam</h2>

            {/* Tagline */}
            <h3 className="text-lg font-medium text-gray-200 mb-3">Bringing Ideas to Life</h3>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed">
              With Vignam, easily turn your ideas into interactive 3D simulations for teaching, learning, or for personal use.
            </p>
          </div>

          {/* Right Column - Contact Info */}
          <div ref={rightColumnRef} className="space-y-3">
            {/* Contact Items */}
            <div className="flex items-center space-x-3 contact-item">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Location</p>
                <p className="text-sm text-gray-300">Montreal, Canada</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 contact-item">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Email</p>
                <p className="text-sm text-gray-300">hello@vignam.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 contact-item">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Phone</p>
                <p className="text-sm text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div ref={bottomRef} className="border-t border-white/20 pt-4 mt-6 text-center">
          <p className="text-gray-400 text-xs">
            © 2024 Vignam. All rights reserved. | Bringing ideas to life through innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};