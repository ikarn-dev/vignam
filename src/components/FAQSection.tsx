'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'manufacturing-time',
    question: 'How fast can you manufacture custom parts?',
    answer: 'We can deliver custom CNC parts in as fast as one day. Our streamlined platform and in-house automation allow for rapid prototyping and small production runs with exceptional speed.'
  },
  {
    id: 'materials',
    question: 'What materials do you work with?',
    answer: 'We work with a wide range of materials including aluminum, steel, stainless steel, brass, copper, and various plastics. Our CNC machines are equipped to handle both metals and polymers with precision.'
  },
  {
    id: 'file-formats',
    question: 'What file formats do you accept?',
    answer: 'We accept all standard CAD file formats including STEP, IGES, STL, DWG, DXF, and native files from SolidWorks, AutoCAD, Fusion 360, and other major CAD software.'
  },
  {
    id: 'quality-control',
    question: 'How do you ensure quality control?',
    answer: 'Every part goes through rigorous quality control processes including dimensional inspection, surface finish verification, and material certification. We maintain ISO standards throughout our manufacturing process.'
  },
  {
    id: 'pricing',
    question: 'How is pricing determined?',
    answer: 'Pricing is based on material costs, machining time, complexity, and quantity. Upload your CAD files to our platform for an instant quote, or contact us for custom pricing on larger orders.'
  },
  {
    id: 'minimum-order',
    question: 'Is there a minimum order quantity?',
    answer: 'No minimum order quantity required. We handle everything from single prototypes to production runs of thousands of parts. Our flexible manufacturing approach scales with your needs.'
  }
];

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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

      // Animate FAQ items
      const faqItems = faqItemsRef.current?.querySelectorAll('.faq-item');
      if (faqItems && faqItems.length > 0) {
        gsap.set(faqItems, {
          y: 50,
          opacity: 0
        });

        gsap.to(faqItems, {
          scrollTrigger: {
            trigger: faqItemsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true
          },
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.1
        });
      }

      // Animate CTA
      if (ctaRef.current) {
        gsap.set(ctaRef.current, {
          y: 50,
          opacity: 0
        });

        gsap.to(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
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
    <section ref={containerRef} id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Badge */}
        <div ref={badgeRef} className="mb-16 text-center">
          <div className="relative inline-flex items-center">
            <span className="relative px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer text-white text-sm border border-gray-400 section-badge">
              {/* Left punch hole */}
              <div className="badge-punch-hole badge-punch-hole-left bg-white"></div>
              {/* Right punch hole */}
              <div className="badge-punch-hole badge-punch-hole-right bg-white"></div>
              FAQ
            </span>
          </div>
        </div>

        {/* FAQ Items */}
        <div ref={faqItemsRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-gray-50 rounded-2xl overflow-hidden faq-item"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFAQ === faq.id ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div ref={ctaRef} className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <button className="relative px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer text-white text-shadow-sm border border-gray-600 active:translate-y-0.5 btn-dark">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};