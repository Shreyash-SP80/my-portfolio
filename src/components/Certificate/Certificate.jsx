// import React, { useRef, useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // For smooth scroll animation
// gsap.registerPlugin(ScrollTrigger, useGSAP);

// const Certificate = () => {
//   const [selectedCert, setSelectedCert] = useState(null);
//   const [selectedLeetCode, setSelectedLeetCode] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const containerRef = useRef(null);
//   const certificatesContainerRef = useRef(null);

  
  
//   // Certificate data
//   const certificates = [
//     { id: 1, title: "Data Science", issuer: "CORIZO", date: "05-Jun-2025", image: "/Certificates/C1.png", thumbnail: "/Certificates/C1.png" },
//     { id: 2, title: "AI Tools WorkShop", issuer: "be10x", date: "27-July-2025", image: "/Certificates/C2.png", thumbnail: "/Certificates/C2.png" },
//     { id: 3, title: "PowerBI Workshop", issuer: "OfficeMaster", date: "27-July-2025", image: "/Certificates/C3.png", thumbnail: "/Certificates/C3.png" },
//     { id: 4, title: "Cybersecurity Analyst Job Simulation", issuer: "Forage", date: "13-August-2025", image: "/Certificates/C4.png", thumbnail: "/Certificates/C4.png" },
//   ];


//   // LeetCode profile data
//   const leetCodeProfile = {
//     username: "ShreyashPatil37",
//     ranking: "1440433",
//     problemsSolved: "150+",
//     acceptanceRate: "88.01%",
//     profilePic: "/Certificates/LeetCode.jpeg",
//     badges: ["50 Days", "100 Days"],
//     joinDate: "Jun 2025"
//   };

//   // Scroll arrow visibility
//   const updateArrowVisibility = () => {
//     if (!certificatesContainerRef.current) return;
//     const { scrollLeft, scrollWidth, clientWidth } = certificatesContainerRef.current;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
//   };

//   const scrollCertificates = (direction) => {
//     if (!certificatesContainerRef.current) return;
//     certificatesContainerRef.current.scrollBy({
//       left: direction === 'left' ? -400 : 400,
//       behavior: 'smooth'
//     });
//   };


//   useEffect(() => {
//     const container = certificatesContainerRef.current;
//     if (!container) return;
//     container.addEventListener('scroll', updateArrowVisibility);
//     updateArrowVisibility();
//     return () => container.removeEventListener('scroll', updateArrowVisibility);
//   }, []);

//   // GSAP Animations
//   useGSAP(() => {
//     // Heading animations
//     gsap.from(".main-heading", {
//       opacity: 0,
//       y: -50,
//       scale: 0.9,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".main-heading",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".sub-heading", {
//       opacity: 0,
//       y: 30,
//       duration: 1,
//       ease: "power2.out",
//       delay: 0.3,
//       scrollTrigger: {
//         trigger: ".sub-heading",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     // Certificates animation
//     gsap.utils.toArray(".certificate-card").forEach((card, i) => {
//       gsap.from(card, {
//         opacity: 0,
//         y: 60,
//         scale: 0.95,
//         duration: 0.8,
//         ease: "power3.out",
//         delay: i * 0.1,
//         scrollTrigger: {
//           trigger: card,
//           start: "top 85%",
//           toggleActions: "play reverse play reverse"
//         }
//       });
//     });

//     // Leetcode card animation
//     gsap.from(".leetcode-card", {
//       opacity: 0,
//       x: -100,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".leetcode-card",
//         start: "top 85%",
//         toggleActions: "play reverse play reverse"
//       }
//     });
//   }, []);

//   const openCertificate = (cert) => { setSelectedCert(cert); setIsOpen(true); };
//   const openLeetCodeProfile = () => { setSelectedLeetCode(leetCodeProfile); setIsOpen(true); };
//   const closeModal = () => { setIsOpen(false); setTimeout(() => { setSelectedCert(null); setSelectedLeetCode(null); }, 300); };

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-blue-10  from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900 py-12 px-4" id="certifications">
//       <div className="max-w-6xl mx-auto">

//         {/* Header section with proper animation */}
//         <div className="text-center mb-16">
//           <h1
//             style={{ fontFamily: "'Exo', cursive" }}
//             className="
//               main-heading font-extrabold drop-shadow-lg
//               text-3xl sm:text-4xl md:text-5xl
//               text-blue-500 md:bg-gradient-to-r md:from-blue-500 md:via-purple-500 md:to-pink-500 md:bg-clip-text md:text-transparent
//             "
//           >
//             My Achievements
//           </h1>

//           <p
//             style={{ fontFamily: "'Source Sans Pro', sans-serif"}}
//             className="
//               sub-heading font-semibold mt-4
//               text-lg sm:text-xl
//               text-pink-400 md:bg-gradient-to-r md:from-pink-400 md:via-purple-400 md:to-blue-400 md:bg-clip-text md:text-transparent
//             "
//           >
//             Certifications and coding profile
//           </p>
//         </div>

//         {/* Certificates */}
//         <section className="certificates-section mb-12 relative">
//           <h2 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><span className="mr-3">📜</span> Certificates</h2>
//           <div className="relative">
//             {/* Left Arrow */}
//             {showLeftArrow && (
//               <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={() => scrollCertificates('left')} style={{ left: '-1.5rem' }}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//               </motion.button>
//             )}

//             {/* Scrollable Certificates */}
//             <div ref={certificatesContainerRef} className="overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4" style={{ scrollBehavior: 'smooth' }}>
//               <div className="flex gap-6 w-max">
//                 {certificates.map((cert) => (
//                   <div key={cert.id} className="certificate-card flex-shrink-0 w-68 md:w-70 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-blue-400/60 transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => openCertificate(cert)}>
//                     <div className="h-42 md:h-40 relative overflow-hidden">
//                       <img src={cert.thumbnail} alt={cert.title} className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105" />
//                       <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                         <span className="text-white text-lg font-semibold">View Certificate</span>
//                       </div>
//                     </div>
//                     <div className="p-4 md:p-6">
//                       <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
//                       <p style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-gray-600 dark:text-gray-300">{cert.issuer} • {cert.date}</p>
//                       <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 md:mt-4 rounded-full"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Arrow */}
//             {showRightArrow && (
//               <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={() => scrollCertificates('right')} style={{ right: '-1.5rem' }}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//               </motion.button>
//             )}
//           </div>
//         </section>


//         {/* LeetCode Profile */}
//         <section>
//           <h2 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 flex items-center">
//             <span className="mr-2 md:mr-3">💻</span> LeetCode Profile
//           </h2>

//           <div
//             className="leetcode-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-orange-400 transition-all duration-300 overflow-hidden cursor-pointer max-w-sm md:max-w-xl mx-auto"
//             onClick={openLeetCodeProfile}
//           >
//             <div className="p-4 md:p-8">
//               <div className="flex items-center mb-4 md:mb-6">
//                 <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-orange-400">
//                   <img
//                     src={leetCodeProfile.profilePic}
//                     alt="LeetCode Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="ml-4 md:ml-6">
//                   <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
//                     {leetCodeProfile.username}
//                   </h3>
//                   <p className="text-orange-500 font-medium text-sm md:text-base">
//                     LeetCode Profile
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
//                 {[
//                   { label: "Ranking", value: leetCodeProfile.ranking },
//                   { label: "Solved", value: leetCodeProfile.problemsSolved },
//                   { label: "Acceptance", value: leetCodeProfile.acceptanceRate },
//                   { label: "Since", value: leetCodeProfile.joinDate },
//                 ].map((stat, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-lg"
//                   >
//                     <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
//                       {stat.label}
//                     </p>
//                     <p className="font-bold text-gray-900 dark:text-white text-base md:text-xl">
//                       {stat.value}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 md:mt-6">
//                 <h4 className="font-bold text-gray-900 dark:text-white mb-2 md:mb-3 text-base md:text-lg">
//                   Badges Earned
//                 </h4>
//                 <div className="flex flex-wrap gap-1.5 md:gap-2">
//                   {leetCodeProfile.badges.map((badge, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 md:px-4 md:py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 text-xs md:text-sm font-medium rounded-full"
//                     >
//                       {badge}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isOpen && selectedCert && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
//             <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
//               <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//               <div className="p-2">
//                 <motion.img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
//               </div>
//               <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedCert.title}</h2>
//                 <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Issued by:</span> {selectedCert.issuer}</p>
//                 <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Date:</span> {selectedCert.date}</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Certificate;


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
    problemsSolved: "150+",
    acceptanceRate: "88.01%",
    profilePic: "/Certificates/LeetCode.jpeg",
    badges: ["50 Days", "100 Days"],
    joinDate: "Jun 2025",
    profileLink: "https://leetcode.com/u/ShreyashPatil37/"
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

  // GSAP Animations - FIXED FOR MOBILE
  useGSAP(() => {
    // Reset all ScrollTrigger instances first
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Mobile detection for better trigger points
    const isMobile = window.innerWidth < 768;
    const triggerStart = isMobile ? "top 95%" : "top 85%";
    const triggerEnd = isMobile ? "bottom 5%" : "bottom 15%";

    // Heading animations - Simplified for mobile
    gsap.from(".main-heading", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".main-heading",
        start: triggerStart,
        end: triggerEnd,
        toggleActions: "play none none reverse",
        markers: false // Remove for production
      }
    });

    gsap.from(".sub-heading", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: ".sub-heading",
        start: triggerStart,
        end: triggerEnd,
        toggleActions: "play none none reverse",
        markers: false
      }
    });

    // Certificates section animation - Single trigger for better mobile performance
    gsap.from(".certificates-section", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".certificates-section",
        start: triggerStart,
        end: triggerEnd,
        toggleActions: "play none none reverse",
        markers: false
      }
    });

    // Individual certificate cards - Simplified animation
    gsap.utils.toArray(".certificate-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: isMobile ? "top 100%" : "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
          markers: false
        }
      });
    });

    // Leetcode card animation - Fixed x-axis animation for mobile
    gsap.from(".leetcode-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".leetcode-card",
        start: triggerStart,
        end: triggerEnd,
        toggleActions: "play none none reverse",
        markers: false
      }
    });

    // Refresh ScrollTrigger on resize for mobile compatibility
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openCertificate = (cert) => { 
    setSelectedCert(cert); 
    setIsOpen(true); 
  };
  
  const openLeetCodeProfile = () => { 
    setSelectedLeetCode(leetCodeProfile); 
    setIsOpen(true); 
  };
  
  const openLeetCodeExternal = (e) => {
    e.stopPropagation();
    window.open(leetCodeProfile.profileLink, '_blank', 'noopener,noreferrer');
  };
  
  const closeModal = () => { 
    setIsOpen(false); 
    setTimeout(() => { 
      setSelectedCert(null); 
      setSelectedLeetCode(null); 
    }, 300); 
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-blue-10 from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900 py-12 px-4" id="certifications">
      <div className="max-w-6xl mx-auto">

        {/* Header section with proper animation - UNCHANGED */}
        <div className="text-center mb-16">
          <h1
            style={{ fontFamily: "'Exo', cursive" }}
            className="
              main-heading font-extrabold drop-shadow-lg
              text-3xl sm:text-4xl md:text-5xl
              text-blue-500 md:bg-gradient-to-r md:from-blue-500 md:via-purple-500 md:to-pink-500 md:bg-clip-text md:text-transparent
            "
          >
            My Achievements
          </h1>

          <p
            style={{ fontFamily: "'Source Sans Pro', sans-serif"}}
            className="
              sub-heading font-semibold mt-4
              text-lg sm:text-xl
              text-pink-400 md:bg-gradient-to-r md:from-pink-400 md:via-purple-400 md:to-blue-400 md:bg-clip-text md:text-transparent
            "
          >
            Certifications and coding profile
          </p>
        </div>

        {/* Certificates - EXACTLY AS BEFORE */}
        <section className="certificates-section mb-12 relative">
          <h2 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><span className="mr-3">📜</span> Certificates</h2>
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
                      <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                      <p style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-gray-600 dark:text-gray-300">{cert.issuer} • {cert.date}</p>
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

        {/* IMPROVED LeetCode Profile - Optimized for Mobile */}
        <section className="mb-12">
          <h2 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span className="mr-3">💻</span> LeetCode Profile
          </h2>

          {/* Optimized LeetCode Card - Responsive width */}
          <div className="leetcode-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-orange-400 transition-all duration-300 overflow-hidden w-full sm:max-w-lg md:max-w-xl mx-auto">
            <div className="p-5 sm:p-6 md:p-7">
              {/* Profile Header - Optimized for mobile */}
              <div className="flex items-center mb-5 md:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-3 sm:border-4 border-orange-400 flex-shrink-0">
                  <img
                    src={leetCodeProfile.profilePic}
                    alt="LeetCode Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 sm:ml-4 md:ml-5 flex-1 min-w-0">
                  <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-1 sm:mb-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                          {leetCodeProfile.username}
                        </h3>
                        <p className="text-orange-500 font-medium text-sm sm:text-base">
                          LeetCode Profile
                        </p>
                      </div>
                      <button
                        onClick={openLeetCodeExternal}
                        className="mt-1 sm:mt-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs sm:text-sm font-medium flex items-center transition-colors whitespace-nowrap"
                      >
                        Visit Profile
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 truncate">
                      leetcode.com/u/{leetCodeProfile.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid - Optimized spacing */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 md:mb-6">
                {[
                  { label: "Ranking", value: leetCodeProfile.ranking, icon: "🏆" },
                  { label: "Solved", value: leetCodeProfile.problemsSolved, icon: "✅" },
                  { label: "Acceptance", value: leetCodeProfile.acceptanceRate, icon: "📊" },
                  { label: "Since", value: leetCodeProfile.joinDate, icon: "📅" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg"
                  >
                    <div className="flex items-center mb-1">
                      <span className="mr-1 sm:mr-2 text-sm">{stat.icon}</span>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">
                        {stat.label}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-base sm:text-lg md:text-xl truncate">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Badges Section - Compact for mobile */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-base sm:text-lg">
                  Badges Earned
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {leetCodeProfile.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 sm:px-3 sm:py-1.5 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 text-xs sm:text-sm font-medium rounded-full border border-yellow-200 dark:border-yellow-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Stack on mobile, row on larger */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={openLeetCodeProfile}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base"
                >
                  View Details
                </button>
                <button
                  onClick={openLeetCodeExternal}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base flex items-center justify-center"
                >
                  <span className="mr-1 sm:mr-2">Visit Profile</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Modal for Certificate */}
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

      {/* Modal for LeetCode Profile - Optimized for mobile */}
      <AnimatePresence>
        {isOpen && selectedLeetCode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-5 sm:p-6 md:p-7">
                <div className="text-center mb-5 sm:mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-orange-400 mx-auto mb-3 sm:mb-4">
                    <img
                      src={selectedLeetCode.profilePic}
                      alt="LeetCode Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedLeetCode.username}
                  </h2>
                  <p className="text-orange-500 font-medium text-base sm:text-lg">LeetCode Profile</p>
                  <a
                    href={selectedLeetCode.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-2 text-xs sm:text-sm"
                  >
                    leetcode.com/u/{selectedLeetCode.username}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                  {[
                    { label: "Global Ranking", value: selectedLeetCode.ranking },
                    { label: "Problems Solved", value: selectedLeetCode.problemsSolved },
                    { label: "Acceptance Rate", value: selectedLeetCode.acceptanceRate },
                    { label: "Member Since", value: selectedLeetCode.joinDate },
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">{stat.label}</span>
                      <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 sm:mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-base sm:text-lg">Badges Earned</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedLeetCode.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 font-medium rounded-full text-xs sm:text-sm"
                      >
                        {badge} Challenge
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={openLeetCodeExternal}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base flex items-center justify-center"
                >
                  <span className="mr-1 sm:mr-2">View Full Profile</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;


// import React, { useRef, useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // For smooth scroll animation
// gsap.registerPlugin(ScrollTrigger, useGSAP);

// const Certificate = () => {
//   const [selectedCert, setSelectedCert] = useState(null);
//   const [selectedLeetCode, setSelectedLeetCode] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const containerRef = useRef(null);
//   const certificatesContainerRef = useRef(null);

  
  
//   // Certificate data
//   const certificates = [
//     { id: 1, title: "Data Science", issuer: "CORIZO", date: "05-Jun-2025", image: "/Certificates/C1.png", thumbnail: "/Certificates/C1.png" },
//     { id: 2, title: "AI Tools WorkShop", issuer: "be10x", date: "27-July-2025", image: "/Certificates/C2.png", thumbnail: "/Certificates/C2.png" },
//     { id: 3, title: "PowerBI Workshop", issuer: "OfficeMaster", date: "27-July-2025", image: "/Certificates/C3.png", thumbnail: "/Certificates/C3.png" },
//     { id: 4, title: "Cybersecurity Analyst Job Simulation", issuer: "Forage", date: "13-August-2025", image: "/Certificates/C4.png", thumbnail: "/Certificates/C4.png" },
//   ];


//   // LeetCode profile data
//   const leetCodeProfile = {
//     username: "ShreyashPatil37",
//     ranking: "1440433",
//     problemsSolved: 102,
//     acceptanceRate: "88.01%",
//     profilePic: "/Certificates/LeetCode.jpeg",
//     badges: ["None"],
//     joinDate: "Jun 2025"
//   };

//   // Scroll arrow visibility
//   const updateArrowVisibility = () => {
//     if (!certificatesContainerRef.current) return;
//     const { scrollLeft, scrollWidth, clientWidth } = certificatesContainerRef.current;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
//   };

//   const scrollCertificates = (direction) => {
//     if (!certificatesContainerRef.current) return;
//     certificatesContainerRef.current.scrollBy({
//       left: direction === 'left' ? -400 : 400,
//       behavior: 'smooth'
//     });
//   };


//   useEffect(() => {
//     const container = certificatesContainerRef.current;
//     if (!container) return;
//     container.addEventListener('scroll', updateArrowVisibility);
//     updateArrowVisibility();
//     return () => container.removeEventListener('scroll', updateArrowVisibility);
//   }, []);

//   // GSAP Animations
//   useGSAP(() => {
//     // Heading animations
//     gsap.from(".main-heading", {
//       opacity: 0,
//       y: -50,
//       scale: 0.9,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".main-heading",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".sub-heading", {
//       opacity: 0,
//       y: 30,
//       duration: 1,
//       ease: "power2.out",
//       delay: 0.3,
//       scrollTrigger: {
//         trigger: ".sub-heading",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     // Certificates animation
//     gsap.utils.toArray(".certificate-card").forEach((card, i) => {
//       gsap.from(card, {
//         opacity: 0,
//         y: 60,
//         scale: 0.95,
//         duration: 0.8,
//         ease: "power3.out",
//         delay: i * 0.1,
//         scrollTrigger: {
//           trigger: card,
//           start: "top 85%",
//           toggleActions: "play reverse play reverse"
//         }
//       });
//     });

//     // Leetcode card animation
//     gsap.from(".leetcode-card", {
//       opacity: 0,
//       x: -100,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".leetcode-card",
//         start: "top 85%",
//         toggleActions: "play reverse play reverse"
//       }
//     });
//   }, []);

//   const openCertificate = (cert) => { setSelectedCert(cert); setIsOpen(true); };
//   const openLeetCodeProfile = () => { setSelectedLeetCode(leetCodeProfile); setIsOpen(true); };
//   const closeModal = () => { setIsOpen(false); setTimeout(() => { setSelectedCert(null); setSelectedLeetCode(null); }, 300); };

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-blue-10  from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900 py-12 px-4" id="certifications">
//       <div className="max-w-6xl mx-auto">

//         {/* Header section with proper animation */}
//         <div className="text-center mb-16">
//           <h1
//             className="
//               main-heading font-extrabold drop-shadow-lg
//               text-3xl sm:text-4xl md:text-5xl
//               text-blue-500 md:bg-gradient-to-r md:from-blue-500 md:via-purple-500 md:to-pink-500 md:bg-clip-text md:text-transparent
//             "
//           >
//             My Achievements
//           </h1>

//           <p
//             className="
//               sub-heading font-semibold mt-4
//               text-lg sm:text-xl
//               text-pink-400 md:bg-gradient-to-r md:from-pink-400 md:via-purple-400 md:to-blue-400 md:bg-clip-text md:text-transparent
//             "
//           >
//             Certifications and coding profile
//           </p>
//         </div>

//         {/* Certificates */}
//         <section className="certificates-section mb-12 relative">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><span className="mr-3">📜</span> Certificates</h2>
//           <div className="relative">
//             {/* Left Arrow */}
//             {showLeftArrow && (
//               <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={() => scrollCertificates('left')} style={{ left: '-1.5rem' }}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//               </motion.button>
//             )}

//             {/* Scrollable Certificates */}
//             <div ref={certificatesContainerRef} className="overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4" style={{ scrollBehavior: 'smooth' }}>
//               <div className="flex gap-6 w-max">
//                 {certificates.map((cert) => (
//                   <div key={cert.id} className="certificate-card flex-shrink-0 w-68 md:w-70 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-blue-400/60 transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => openCertificate(cert)}>
//                     <div className="h-42 md:h-40 relative overflow-hidden">
//                       <img src={cert.thumbnail} alt={cert.title} className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105" />
//                       <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                         <span className="text-white text-lg font-semibold">View Certificate</span>
//                       </div>
//                     </div>
//                     <div className="p-4 md:p-6">
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
//                       <p className="text-gray-600 dark:text-gray-300">{cert.issuer} • {cert.date}</p>
//                       <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 md:mt-4 rounded-full"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Arrow */}
//             {showRightArrow && (
//               <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={() => scrollCertificates('right')} style={{ right: '-1.5rem' }}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//               </motion.button>
//             )}
//           </div>
//         </section>


//         {/* LeetCode Profile */}
//         <section>
//           <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 flex items-center">
//             <span className="mr-2 md:mr-3">💻</span> LeetCode Profile
//           </h2>

//           <div
//             className="leetcode-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-orange-400 transition-all duration-300 overflow-hidden cursor-pointer max-w-sm md:max-w-2xl mx-auto"
//             onClick={openLeetCodeProfile}
//           >
//             <div className="p-4 md:p-8">
//               <div className="flex items-center mb-4 md:mb-6">
//                 <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-orange-400">
//                   <img
//                     src={leetCodeProfile.profilePic}
//                     alt="LeetCode Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="ml-4 md:ml-6">
//                   <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
//                     {leetCodeProfile.username}
//                   </h3>
//                   <p className="text-orange-500 font-medium text-sm md:text-base">
//                     LeetCode Profile
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
//                 {[
//                   { label: "Ranking", value: leetCodeProfile.ranking },
//                   { label: "Solved", value: leetCodeProfile.problemsSolved },
//                   { label: "Acceptance", value: leetCodeProfile.acceptanceRate },
//                   { label: "Since", value: leetCodeProfile.joinDate },
//                 ].map((stat, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-lg"
//                   >
//                     <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
//                       {stat.label}
//                     </p>
//                     <p className="font-bold text-gray-900 dark:text-white text-base md:text-xl">
//                       {stat.value}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 md:mt-6">
//                 <h4 className="font-bold text-gray-900 dark:text-white mb-2 md:mb-3 text-base md:text-lg">
//                   Badges Earned
//                 </h4>
//                 <div className="flex flex-wrap gap-1.5 md:gap-2">
//                   {leetCodeProfile.badges.map((badge, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 md:px-4 md:py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 text-xs md:text-sm font-medium rounded-full"
//                     >
//                       {badge}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isOpen && selectedCert && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
//             <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
//               <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//               <div className="p-2">
//                 <motion.img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
//               </div>
//               <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedCert.title}</h2>
//                 <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Issued by:</span> {selectedCert.issuer}</p>
//                 <p className="text-gray-600 dark:text-gray-300"><span className="font-medium">Date:</span> {selectedCert.date}</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Certificate;

