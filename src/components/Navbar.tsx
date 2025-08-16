'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { handleNavClick } from '@/utils/smoothScroll';

// Scramble Link Component with Binary Animation
const ScrambleLink = ({ href, text, className = '' }: { href: string; text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const binaryChars = ['0', '1'];

  const scrambleText = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    let iteration = 0;
    const originalText = text;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return binaryChars[Math.floor(Math.random() * binaryChars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAnimating(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const resetText = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDisplayText(text);
      setIsAnimating(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <a
      href={href}
      className={`text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer font-mono ${className}`}
      onMouseEnter={scrambleText}
      onMouseLeave={resetText}
      onClick={(e) => handleNavClick(e, href)}
      aria-label={`Navigate to ${text} section`}
    >
      {displayText}
    </a>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-xl mx-4 mt-4 rounded-2xl border border-gray-200/50'
        : 'bg-white/70 backdrop-blur-md border-b border-gray-200/30'
        }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'px-6' : ''
        }`}>
        <div className="flex justify-between items-center h-14">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Vignam</span>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <ScrambleLink
                key={item.name}
                href={item.href}
                text={item.name}
              />
            ))}
          </nav>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md p-1"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/30"
            id="mobile-menu"
          >
            <nav className="px-2 pt-2 pb-3 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <div key={item.name} className="block px-3 py-2">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, () => setIsOpen(false))}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer font-mono"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};