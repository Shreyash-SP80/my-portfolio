import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// For smooth scroll animation
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedLeetCode, setSelectedLeetCode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef(null);
  const certificatesContainerRef = useRef(null);

  
  
  // Certificate data
  const certificates = [
    { id: 1, title: "Data Science", issuer: "CORIZO", date: "05-Jun-2025", image: "/Certificates/C1.png", thumbnail: "/Certificates/C1.png" },
    { id: 2, title: "AI Tools WorkShop", issuer: "be10x", date: "27-July-2025", image: "/Certificates/C2.png", thumbnail: "/Certificates/C2.png" },
    { id: 3, title: "PowerBI Workshop", issuer: "OfficeMaster", date: "27-July-2025", image: "/Certificates/C3.png", thumbnail: "/Certificates/C3.png" },
    { id: 4, title: "Cybersecurity Analyst Job Simulation", issuer: "Forage", date: "13-August-2025", image: "/Certificates/C4.png", thumbnail: "/Certificates/C4.png" },
  ];


  // LeetCode profile data
  const leetCodeProfile = {
    username: "ShreyashPatil37",
    ranking: "1440433",
    problemsSolved: 102,
    acceptanceRate: "88.01%",
    profilePic: "/Certificates/LeetCode.jpeg",
    badges: ["None"],
    joinDate: "Jun 2025"
  };

  // Scroll arrow visibility
  const updateArrowVisibility = () => {
    if (!certificatesContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = certificatesContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollCertificates = (direction) => {
    if (!certificatesContainerRef.current) return;
    certificatesContainerRef.current.scrollBy({
      left: direction === 'left' ? -400 : 400,
      behavior: 'smooth'
    });
  };


  useEffect(() => {
    const container = certificatesContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility();
    return () => container.removeEventListener('scroll', updateArrowVisibility);
  }, []);

  // GSAP Animations
  useGSAP(() => {
    // Heading animations
    gsap.from(".main-heading", {
      opacity: 0,
      y: -50,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".main-heading",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(".sub-heading", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".sub-heading",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Certificates animation
    gsap.utils.toArray(".certificate-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      });
    });

    // Leetcode card animation
    gsap.from(".leetcode-card", {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".leetcode-card",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      }
    });
  }, []);

  const openCertificate = (cert) => { setSelectedCert(cert); setIsOpen(true); };
  const openLeetCodeProfile = () => { setSelectedLeetCode(leetCodeProfile); setIsOpen(true); };
  const closeModal = () => { setIsOpen(false); setTimeout(() => { setSelectedCert(null); setSelectedLeetCode(null); }, 300); };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-blue-10  from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900 py-12 px-4" id="certifications">
      <div className="max-w-6xl mx-auto">

        {/* Header section with proper animation */}
        <div className="text-center mb-16">
          <h1
            className="
              main-heading font-extrabold drop-shadow-lg
              text-3xl sm:text-4xl md:text-5xl
              text-blue-500 md:bg-gradient-to-r md:from-blue-500 md:via-purple-500 md:to-pink-500 md:bg-clip-text md:text-transparent
            "
          >
            My Achievements
          </h1>

          <p
            className="
              sub-heading font-semibold mt-4
              text-lg sm:text-xl
              text-pink-400 md:bg-gradient-to-r md:from-pink-400 md:via-purple-400 md:to-blue-400 md:bg-clip-text md:text-transparent
            "
          >
            Certifications and coding profile
          </p>
        </div>

        {/* Certificates */}
        <section className="certificates-section mb-12 relative">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><span className="mr-3">📜</span> Certificates</h2>
          <div className="relative">
            {/* Left Arrow */}
            {showLeftArrow && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={() => scrollCertificates('left')} style={{ left: '-1.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </motion.button>
            )}

            {/* Scrollable Certificates */}
            <div ref={certificatesContainerRef} className="overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4" style={{ scrollBehavior: 'smooth' }}>
              <div className="flex gap-6 w-max">
                {certificates.map((cert) => (
                  <div key={cert.id} className="certificate-card flex-shrink-0 w-68 md:w-70 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-blue-400/60 transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => openCertificate(cert)}>
                    <div className="h-42 md:h-40 relative overflow-hidden">
                      <img src={cert.thumbnail} alt={cert.title} className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">View Certificate</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{cert.issuer} • {cert.date}</p>
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 md:mt-4 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={() => scrollCertificates('right')} style={{ right: '-1.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </motion.button>
            )}
          </div>
        </section>


        {/* LeetCode Profile */}
        <section>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 flex items-center">
            <span className="mr-2 md:mr-3">💻</span> LeetCode Profile
          </h2>

          <div
            className="leetcode-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-orange-400 transition-all duration-300 overflow-hidden cursor-pointer max-w-sm md:max-w-2xl mx-auto"
            onClick={openLeetCodeProfile}
          >
            <div className="p-4 md:p-8">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-orange-400">
                  <img
                    src={leetCodeProfile.profilePic}
                    alt="LeetCode Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 md:ml-6">
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                    {leetCodeProfile.username}
                  </h3>
                  <p className="text-orange-500 font-medium text-sm md:text-base">
                    LeetCode Profile
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {[
                  { label: "Ranking", value: leetCodeProfile.ranking },
                  { label: "Solved", value: leetCodeProfile.problemsSolved },
                  { label: "Acceptance", value: leetCodeProfile.acceptanceRate },
                  { label: "Since", value: leetCodeProfile.joinDate },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-lg"
                  >
                    <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                      {stat.label}
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white text-base md:text-xl">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 md:mb-3 text-base md:text-lg">
                  Badges Earned
                </h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {leetCodeProfile.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 md:px-4 md:py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 text-xs md:text-sm font-medium rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && selectedCert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="p-2">
                <motion.img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedCert.title}</h2>
                <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Issued by:</span> {selectedCert.issuer}</p>
                <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Date:</span> {selectedCert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;
