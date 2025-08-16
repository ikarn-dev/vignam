'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: string;
  title: string;
  image: string;
}

const features: FeatureItem[] = [
  {
    id: 'simulations',
    title: 'Interactive 3D Simulations',
    image: '/about-images/interactive-image.jfif'
  },
  {
    id: 'animations',
    title: 'Educational Animations',
    image: '/about-images/education-image.jfif'
  },
  {
    id: 'vr',
    title: 'Virtual Reality Labs',
    image: '/about-images/labs-image.jfif'
  },
  {
    id: 'ai',
    title: 'AI-Powered Content Creation',
    image: '/about-images/ar-image.jfif'
  }
];

export const AboutSection = () => {
  const [activeFeature, setActiveFeature] = useState<string>('simulations');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const featuresListRef = useRef<HTMLDivElement>(null);
  const featureImageRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!headingRef.current || !containerRef.current) return;

      const textElements = headingRef.current.querySelectorAll('.line span');
      
      // console.log('About spans found:', textElements.length);
      
      if (textElements.length === 0) return;

      // Set initial state
      gsap.set(textElements, {
        y: 100,
        skewY: 7,
        transformOrigin: 'bottom center',
        force3D: true
      });

      // Create reveal animation with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
          markers: false, // Debug markers disabled
          // onEnter: () => console.log('About animation triggered!')
        }
      });

      // Apply the reveal animation
      tl.to(textElements, {
        duration: 1.8,
        y: 0,
        skewY: 0,
        ease: "power4.out",
        force3D: true,
        stagger: {
          amount: 0.3
        }
      });

      // Animate badge
      if (badgeRef.current) {
        gsap.set(badgeRef.current, {
          y: 50,
          opacity: 0
        });

        gsap.to(badgeRef.current, {
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power3.out"
        });
      }

      // Animate feature list items
      const featureItems = featuresListRef.current?.querySelectorAll('.feature-item');
      if (featureItems && featureItems.length > 0) {
        gsap.set(featureItems, {
          x: -50,
          opacity: 0
        });

        gsap.to(featureItems, {
          scrollTrigger: {
            trigger: featuresListRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          x: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.1
        });
      }

      // Animate feature image
      if (featureImageRef.current) {
        gsap.set(featureImageRef.current, {
          y: 50,
          opacity: 0,
          scale: 0.95
        });

        gsap.to(featureImageRef.current, {
          scrollTrigger: {
            trigger: featureImageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 1,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out"
        });
      }

      // Animate testimonial card
      if (testimonialRef.current) {
        gsap.set(testimonialRef.current, {
          x: 50,
          opacity: 0,
          scale: 0.95
        });

        gsap.to(testimonialRef.current, {
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 1,
          x: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out"
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Badge */}
        <div ref={badgeRef} className="mb-16 text-center">
          <div className="relative inline-flex items-center">
            <span className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white text-sm border border-gray-400 section-badge">
              {/* Left punch hole */}
              <div className="badge-punch-hole badge-punch-hole-left bg-gray-50"></div>
              {/* Right punch hole */}
              <div className="badge-punch-hole badge-punch-hole-right bg-gray-50"></div>
              About
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-6">
            {/* Main Heading with GSAP Reveal Animation */}
            <div ref={containerRef} className="mb-8">
              <h2
                ref={headingRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                <div className="line overflow-hidden">
                  <span className="inline-block">Transforming</span>
                </div>
                <div className="line overflow-hidden">
                  <span className="inline-block">Education with</span>
                </div>
                <div className="line overflow-hidden">
                  <span className="inline-block">
                    Interactive{' '}
                    <span className="italic text-gray-600 font-light">3D Content</span>
                  </span>
                </div>
              </h2>
            </div>

            {/* Features List */}
            <div ref={featuresListRef} className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 p-4 rounded-lg feature-item ${activeFeature === feature.id
                    ? 'bg-white shadow-md'
                    : 'hover:bg-white/50'
                    }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-gray-400 text-sm font-mono">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Image with Seamless Crossfade */}
            <div ref={featureImageRef} className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              {/* Preload all images and show them with opacity transitions */}
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`absolute inset-0 transition-opacity duration-300 ease-out ${activeFeature === feature.id ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={feature.id === 'simulations'}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Testimonial/Info */}
          <div className="lg:col-span-6 flex">
            <div ref={testimonialRef} className="bg-white rounded-2xl p-8 shadow-lg flex flex-col justify-between w-full">
              {/* Profile */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">VT</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Vignam Team</h4>
                  <p className="text-sm text-gray-600">Founders &amp; Educational Technology Experts</p>
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-4 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  At Vignam, we believe that learning should be engaging, interactive, and accessible to everyone. That&apos;s why we built a revolutionary platform that transforms complex educational concepts into stunning 3D simulations and animations. Whether you&apos;re a teacher looking to captivate your students or a learner seeking deeper understanding, we make it possible to create immersive educational content without any technical expertise.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our AI-powered platform enables educators and students to build interactive 3D laboratories, simulations, and virtual reality experiences with just simple prompts. From chemistry labs to physics demonstrations, our system brings abstract concepts to life through visual storytelling and hands-on interaction, making learning more effective and memorable.
                </p>
              </div>

              {/* Bottom text */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  EDUCATION REIMAGINED — WE CREATE
                  <br />
                  IMMERSIVE EXPERIENCES WITH INNOVATION,
                  <br />
                  ACCESSIBILITY, AND VISUAL EXCELLENCE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};