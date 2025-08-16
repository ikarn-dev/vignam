'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { VideoSection } from '@/components/VideoSection';
import { AboutSection } from '@/components/AboutSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { initSmoothScroll } from '@/utils/smoothScroll';

export default function Home() {
  useEffect(() => {
    // Initialize smooth scroll functionality
    initSmoothScroll();
  }, []);

  return (
    <main className="relative" id="main-content">
      <Navbar />
      <Hero />
      <VideoSection />
      <AboutSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}