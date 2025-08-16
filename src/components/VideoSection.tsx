'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const VideoSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Consolidated button styles
  const buttonStyles = "flex items-center space-x-1 sm:space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white focus:bg-white transition-colors px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Animate video container
      if (videoRef.current) {
        gsap.set(videoRef.current, {
          scale: 0.9,
          opacity: 0
        });

        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 1.2,
          scale: 1,
          opacity: 1,
          ease: "power3.out"
        });
      }

      // Animate controls
      if (controlsRef.current) {
        const buttons = controlsRef.current.querySelectorAll('button, a');
        gsap.set(buttons, {
          y: -30,
          opacity: 0
        });

        gsap.to(buttons, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.1,
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
    <section ref={containerRef} id="video" className="relative w-full bg-gray-100">
      {/* Video Container */}
      <div ref={videoRef} className="relative w-full">
        <div className="relative w-full aspect-video">
          {/* Upper Control Buttons */}
          <div ref={controlsRef} className="absolute top-2 sm:top-4 left-0 right-0 z-20 flex justify-between items-center px-3 sm:px-6">
            {/* Sound Control Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={buttonStyles}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMuted ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                )}
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {isMuted ? 'SOUND OFF' : 'SOUND ON'}
              </span>
            </button>

            {/* YouTube Link Button */}
            <a
              href="https://www.youtube.com/watch?v=E1czmX6bjFA&ab_channel=Vignam"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles}
              aria-label="Watch full video on YouTube (opens in new tab)"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">CHECK ON YOUTUBE</span>
              <span className="text-xs font-medium text-gray-700 sm:hidden">YOUTUBE</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Video Element */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            aria-label="Vignam platform demonstration video"
          >
            <source src="/video/video-section.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};