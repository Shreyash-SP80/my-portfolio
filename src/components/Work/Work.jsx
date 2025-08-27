import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const containerRef = useRef(null);
  const dividerRef = useRef(null);
  const subtitleRef = useRef(null);
  const projectRefs = useRef([]);
  const titleRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Collage Result Management System",
      description:
        "Developed a College Result Management System using Python, Streamlit, and MongoDB to manage student records, display insights through a simple user-friendly interface.",
      tags: ["Python", "Streamlit", "MongoDB", "Data Science"],
      image:
        "/projectimg/ResultManagement.png",
      video: "https://drive.google.com/file/d/1w-ztmCKoeH00JFbglq2PsMZ9kTuR2P5S/preview",
      github: null,
      demo: null,
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-600",
    },
    {
      id: 2,
      title: "Interactive Portfolio",
      description:
        "Developed a modern portfolio using React, featuring smooth animations and transitions with GSAP and Framer Motion, styled with Tailwind CSS for a responsive and elegant design.",
      tags: ["React", "GSAP", "Framer Motion", "Tailwind CSS"],
      image:
        "/projectimg/Protfolio.png",
      video: "https://example.com/video2.mp4",
      github: "https://github.com/yourusername/portfolio",
      demo: "https://github.com/yourusername/portfolio", 
      gradientFrom: "from-amber-500",
      gradientTo: "to-pink-500",
    },
    {
      id: 3,
      title: "AI-Powered Skill-to-Career Roadmap Generator",
      description:
        "Built a MERN-based Skill-to-Career Roadmap Generator with AI/ML-powered personalized paths and a gamified journey featuring badges, levels, and step-by-step guidance.",
      tags: ["React", "Expres.js", "Node.js", "Mongodb", "AI ML API's"],
      image:
        "/projectimg/CareerCraft.png",
      video: "https://example.com/video3.mp4",
      github: null, 
      demo: null, 
      gradientFrom: "from-emerald-500",
      gradientTo: "to-teal-600",
    },
  ];

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  const addVideoRef = (el, index) => {
    if (el && !videoRefs.current[index]) {
      videoRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)"
      });

      gsap.from(dividerRef.current, {
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset"
        },
        scaleX: 0,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset"
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
      });

      projectRefs.current.forEach((project) => {
        gsap.from(project, {
          opacity: 0,
          scale: 0.95,
          y: 80,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            end: "+=300",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePlayVideo = (index) => {
    setPlayingVideo(index);
    setTimeout(() => {
      if (videoRefs.current[index]) {
        videoRefs.current[index].play();
      }
    }, 300);
  };

  const handleCloseVideo = () => {
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
    setPlayingVideo(null);
  };

  // Calculate sticky positioning
  const getStickyPosition = (index) => {
    if (isMobile) {
      return `${90 + index * 45}px`;
    }
    return `${120 + index * 50}px`;
  };

  return (
    <section
      ref={containerRef}
      className="relative py-10 md:py-20 bg-gradient-to-br from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900"
      id="work"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-20">
          <h2 ref={titleRef} className="text-3xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
            Featured <span className="text-indigo-500 dark:text-indigo-400">Work</span>
          </h2>
          <div ref={dividerRef} className="w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-4 md:mb-6 rounded-full" />
          <p ref={subtitleRef} className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Selected projects that showcase my skills and approach
          </p>
        </div>

        <div
          className="relative"
          style={{ height: isMobile ? `${projects.length * 70}vh` : `${projects.length * 60}vh` }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToRefs}
              className="project-card group rounded-xl md:rounded-2xl overflow-hidden shadow-lg will-change-transform bg-white dark:bg-gray-800 flex flex-col md:flex-row"
              style={{
                position: "sticky",
                top: getStickyPosition(index),
                zIndex: projects.length + index,
                maxWidth: "880px",
                margin: "0 auto",
                minHeight: isMobile ? "280px" : "330px",
                border: "1px solid rgba(255,255,255,0.1)",
                marginBottom: "13px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
                borderRadius: "12px",
              }}
            >
              <div className={`flex-1 p-4 md:p-6 flex flex-col justify-center ${isMobile ? 'order-2' : ''}`}>
                <span className="inline-block text-xl md:text-2xl font-bold mb-1 text-gray-900 dark:text-white">
                  0{index + 1}
                </span>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4 max-w-xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 md:px-3 md:py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-white font-medium text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Project Links Section */}
                <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xs font-medium flex items-center gap-1 transition-all hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  ) : project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white rounded-full text-xs font-medium flex items-center gap-1 transition-all hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  ) : (
                    <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                      Working on it
                    </span>
                  )}
                </div>
              </div>

              {/* Image/Video Section */}
              <div className={`w-full ${isMobile ? 'h-45' : 'md:w-[40%]'} flex flex-col items-center justify-start p-2 md:p-4 relative ${isMobile ? 'order-1' : ''}`}>
                <div className="w-full h-5 md:h-6 bg-gray-200 dark:bg-gray-700 flex items-center px-2 rounded-t-lg md:rounded-t-xl border border-b-0 border-gray-300 dark:border-gray-600">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-1 md:mr-1.5"></span>
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full mr-1 md:mr-1.5"></span>
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>
                </div>

                <motion.div
                  className="relative rounded-b-lg md:rounded-b-xl overflow-hidden border border-gray-300 dark:border-gray-800 w-full cursor-pointer group"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: isMobile ? "calc(100% - 20px)" : "180px",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => handlePlayVideo(index)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/50">
                    <div className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} bg-white/30 rounded-full flex items-center justify-center border-2 border-white backdrop-blur-sm`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} ml-0.5 text-white`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 md:mt-20 px-4"
        >
          {/* <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
            Explore more projects on GitHub or let's discuss how we can work together.
          </p> */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
            Explore more projects on{" "}
            <a
              href="https://github.com/Shreyash-Sp80"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>{" "}
            or let&apos;s discuss how we can work together.
          </p>


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="px-6 py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto"
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseVideo}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
             <iframe
                src={projects[playingVideo]?.video}
                width="100%"
                height="480px"
                allow="autoplay"
                allowFullScreen
                className="rounded-lg shadow-2xl"
                loading="lazy"
              ></iframe>
              <button
                className="absolute -top-10 right-0 bg-white/20 hover:bg-white/40 rounded-full p-1.5 transition-all"
                onClick={handleCloseVideo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


export default Work;

