'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  buttonText: string;
}

const features: Feature[] = [
  {
    id: 'simulation',
    title: 'AI Powered Simulation Builder',
    description: "Create interactive 3D simulations with just a simple prompt. No technical skills needed—just enter your ideas and let AI bring them to life instantly.",
    icon: '✨',
    gradient: 'from-purple-600 to-pink-500',
    buttonText: 'Give me a chemistry lab'
  },
  {
    id: 'interactive',
    title: '3D Interactive Simulations',
    description: "Whether you're teaching or learning, our simulations help visualize difficult concepts in an engaging, hands-on way, making them easier to understand and retain.",
    icon: '🧪',
    gradient: 'from-green-500 to-emerald-600',
    buttonText: 'Explore Simulations'
  },
  {
    id: 'animations',
    title: '3D Animations',
    description: "Animations bring complex processes to life, making them easier to understand and more engaging, enhancing both learning and teaching.",
    icon: '🎬',
    gradient: 'from-orange-500 to-red-500',
    buttonText: 'View Animations'
  },
  {
    id: 'vr',
    title: 'Virtual Reality Labs',
    description: "Immersive VR experiences that transport students into virtual laboratories where they can conduct experiments safely and repeatedly.",
    icon: '🥽',
    gradient: 'from-blue-600 to-cyan-500',
    buttonText: 'Enter VR Lab'
  }
];

export const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Animate badge
      if (badgeRef.current) {
        gsap.set(badgeRef.current, {
          y: 50,
          opacity: 0
        });

        gsap.to(badgeRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power3.out"
        });
      }

      // Animate feature cards
      const featureCards = featuresGridRef.current?.querySelectorAll('.feature-card');
      if (featureCards && featureCards.length > 0) {
        gsap.set(featureCards, {
          y: 100,
          opacity: 0,
          scale: 0.9
        });

        gsap.to(featureCards, {
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 1,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          stagger: 0.15
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="features" className="py-16 bg-gray-50">
      <div className="w-full px-4">
        {/* Features Badge */}
        <div ref={badgeRef} className="mb-16 text-center">
          <div className="relative inline-flex items-center">
            <span className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white text-sm border border-gray-400 section-badge">
              {/* Left punch hole */}
              <div className="badge-punch-hole badge-punch-hole-left bg-gray-50"></div>
              {/* Right punch hole */}
              <div className="badge-punch-hole badge-punch-hole-right bg-gray-50"></div>
              Features
            </span>
          </div>
        </div>

        {/* Single Row Layout - Minimal Gaps */}
        <div ref={featuresGridRef} className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group feature-card"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-6 text-white shadow-lg h-[500px] flex flex-col justify-between`}>
                <div className="flex-1">
                  {/* Icon */}
                  <div className="text-3xl mb-4">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-90 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Button */}
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30 mb-6">
                    {feature.buttonText}
                  </button>
                </div>

                {/* Image Space - More Prominent */}
                <div className="mt-auto">
                  <div className="bg-white rounded-2xl p-4 h-40 flex items-center justify-center shadow-inner">
                    {/* More prominent content based on feature type */}
                    {feature.id === 'simulation' && (
                      <div className="w-full h-full bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-purple-300 rounded-full"></div>
                      </div>
                    )}
                    {feature.id === 'interactive' && (
                      <div className="w-full h-full relative bg-gray-100 rounded-xl">
                        <div className="absolute top-2 left-2 right-2 h-8 bg-green-500 rounded-md flex items-center px-2">
                          <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
                          <div className="flex-1 h-2 bg-white/50 rounded"></div>
                        </div>
                        <div className="absolute bottom-2 left-2 w-20 h-16 bg-green-400 rounded-lg"></div>
                        <div className="absolute bottom-2 right-2 w-20 h-16 bg-green-400 rounded-lg"></div>
                        <div className="absolute top-12 right-2 w-6 h-6 bg-green-300 rounded-full"></div>
                      </div>
                    )}
                    {feature.id === 'animations' && (
                      <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center relative">
                        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute top-3 right-3 w-8 h-8 bg-orange-300 rounded-full"></div>
                        <div className="absolute bottom-3 left-3 w-6 h-6 bg-orange-400 rounded-full"></div>
                      </div>
                    )}
                    {feature.id === 'vr' && (
                      <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center relative">
                        <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                          <div className="text-2xl text-white">{feature.icon}</div>
                        </div>
                        <div className="absolute top-2 left-2 w-6 h-6 bg-blue-300 rounded-full"></div>
                        <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-400 rounded-lg"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};