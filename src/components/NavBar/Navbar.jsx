

import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import useTheme from '../../context/Theme';

function Navbar() {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const rightIconsRef = useRef(null);

  linksRef.current = [];

  // Simplified loading animation
    useLayoutEffect(() => {
      // Set a timeout to simulate waiting for the loading screen to complete
      const timer = setTimeout(() => {
        setIsLoaded(true);
        
        // Apply simple fade-in animation to all navbar elements
        const navElements = document.querySelectorAll('.nav-item');
        navElements.forEach((el, index) => {
          setTimeout(() => {
            if (el) {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          }, 100 * index);
        });
      }, 1100); // Slightly longer than your loading animation
  
      return () => clearTimeout(timer);
    }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      navLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (section) {
          const offsetTop = section.offsetTop - 80;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveLink(link.id);
          }
        }
      });
      setIsScrolled(scrollPos > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    if (themeMode === 'light') darkTheme();
    else lightTheme();
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Navbar Container */}
      <div className="fixed inset-x-0 top-0 z-50 h-5 md:h-21 font-mono pointer-events-none">
        <header
          ref={navRef}
          className={`pointer-events-auto w-full max-w-7xl mx-auto rounded-full transition-all duration-300 mt-4
            ${themeMode === 'light'
              ? 'bg-white/80 backdrop-blur-lg shadow-[0_8px_30px_rgba(16,24,40,0.25)]'
              : 'bg-gray-900/80 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.5)]'}
            ${isScrolled ? 'py-2 px-6' : 'py-3 px-8'}`}
        >
          <div className="flex justify-between items-center h-full px-4 py-1.5 md:py-1">
            {/* Logo */}
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="nav-item flex items-center gap-3 opacity-0 transform -translate-y-0 transition-all duration-500"
            >
              <div className="overflow-hidden rounded-full border-2 border-indigo-500 p-1">
                <motion.img
                  src="/logo/Mylogo.jpg"
                  alt="Logo"
                  className="h-10 w-10 rounded-full object-cover"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  ref={(el) => (linksRef.current[idx] = el)}
                  href={`#${link.id}`}
                  className={`nav-item relative px-4 py-2 rounded-full text-lg font-medium transition-all opacity-0 transform -translate-y-0
                    ${themeMode === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}
                    ${activeLink === link.id ? (themeMode === 'light' ? 'text-indigo-600' : 'text-indigo-400') : ''}`}
                  onClick={() => setActiveLink(link.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  {activeLink === link.id && (
                    <motion.span
                      layoutId="activeLink"
                      className="active-link-indicator absolute left-1/2 bottom-1 -translate-x-1/2 w-6 h-1 bg-indigo-500 rounded-full"
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div ref={rightIconsRef} className="nav-item flex items-center gap-4 opacity-0 transform -translate-y-0 transition-all duration-500">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all
                  ${themeMode === 'light' ? 'bg-white/90 hover:bg-gray-100 text-indigo-600 shadow-sm' : 'bg-gray-800/90 hover:bg-gray-700 text-yellow-300 shadow-md'}`}
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {themeMode === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
             
              {/* GitHub Link */}
              <motion.a
                href="https://github.com/Shreyash-SP80"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all
                  ${themeMode === 'light' ? 'bg-white/90 hover:bg-gray-100 text-gray-700 shadow-sm' : 'bg-gray-800/90 hover:bg-gray-700 text-white shadow-md'}`}
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-full"
                onClick={() => setMobileMenuOpen((s) => !s)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-24 z-[60] flex justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className={`pointer-events-auto w-[90%] max-w-md rounded-2xl py-4 px-6
                ${themeMode === 'light' ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-gray-900/95 backdrop-blur-lg shadow-xl shadow-indigo-900/30'}`}
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`relative px-4 py-3 rounded-lg text-base font-medium transition-all
                      ${themeMode === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'}
                      ${activeLink === link.id ? (themeMode === 'light' ? 'bg-gray-100 text-indigo-600' : 'bg-gray-800 text-indigo-400') : ''}`}
                    onClick={() => {
                      setActiveLink(link.id);
                      setMobileMenuOpen(false);
                    }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                    {activeLink === link.id && (
                      <motion.span
                        layoutId="mobileActiveLink"
                        className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-full"
                        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden behind navbar */}
      <div className="h-24"></div>
    </>
  );
}

export default Navbar;
