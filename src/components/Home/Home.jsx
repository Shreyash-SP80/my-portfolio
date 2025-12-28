import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { motion } from "framer-motion";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

gsap.registerPlugin(TextPlugin);


// Character Design
function CharacterEyes() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = [leftEyeRef.current, rightEyeRef.current];
      eyes.forEach((eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxOffset = 6; // movement limit in px
        const x = Math.cos(angle) * maxOffset;
        const y = Math.sin(angle) * maxOffset;
        eye.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-22 h-13 bg-red-500 rounded-t-full border-4 border-red-500 flex items-center justify-center overflow-hidden"
      style={{ marginBottom: "-0.5rem" }}
    >
      <div className="flex gap-3">
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
          <div ref={leftEyeRef} className="w-3 h-3 bg-black rounded-full"></div>
        </div>
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
          <div ref={rightEyeRef} className="w-3 h-3 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}



// Page Layout
function Home() {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const typewriterRef = useRef(null);
  const btnResumeRef = useRef(null);
  const btnConnectRef = useRef(null);
  const floatingShapesRef = useRef([]);
  const buttonsContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Enables smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    floatingShapesRef.current = [];
  }, []);

  // Type writer
  const typewriterTexts = [
    "Fullstack Developer 💻",
    "Creative Problem Solver 🧠",
    "Tech Explorer 🌐",
    "Solving Realworld Problems 🚀",
  ];

  // Animations to elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([nameRef.current, subtitleRef.current, buttonsContainerRef.current, imageRef.current], { opacity: 0 });
      gsap.set(typewriterRef.current, { opacity: 0, height: "1.5rem" });

      // Name animation
      gsap.to(nameRef.current, {
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
         ease: "power3.out",
        onComplete: () => {
          gsap.to(nameRef.current.querySelector("span"), {
            duration: 3,
            textShadow: "0 0 40px rgba(99, 103, 242, 1)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });

      // Subtitle animation
      gsap.to(subtitleRef.current, {
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: "power2.out"
      });

      // Image animation
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 1.5,
        delay: 0.8,
        x: 0,
        rotate: 0,
        ease: "elastic.out(1, 0.5)"
      });

      // Floating shapes animation
      floatingShapesRef.current.forEach((el, i) => {
        gsap.to(el, {
          y: "+=15",
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Typewriter Effect
      let textIndex = 0;
      const typewriterLoop = () => {
        const currentText = typewriterTexts[textIndex];
        gsap.to(typewriterRef.current, {
          duration: 0.8,
          text: currentText,
          opacity: 1,
          ease: "none",
          onComplete: () => {
            gsap.to(typewriterRef.current, {
              duration: 1,
              repeat: 1,
              yoyo: true,
              ease: "sine.inOut",
              onComplete: () => {
                gsap.to(typewriterRef.current, {
                  duration: 0.5,
                  opacity: 0,
                  onComplete: () => {
                    textIndex = (textIndex + 1) % typewriterTexts.length;
                    typewriterLoop();
                  }
                });
              }
            });
          }
        });
      };
      gsap.delayedCall(2, typewriterLoop);

      // Buttons animation
      gsap.to(buttonsContainerRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 2.2,
        onComplete: () => {
          gsap.fromTo([btnResumeRef.current, btnConnectRef.current], 
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.7)"
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addShapeRef = (el) => {
    if (el && !floatingShapesRef.current.includes(el)) {
      floatingShapesRef.current.push(el);
    }
  };

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col justify-center items-center h-screen text-center overflow-hidden -mt-24"
      id="home"
    >
      {/* Programming style background */}
      <div className="absolute inset-0 overflow-hidden opacity-100">
        {/* SVG pattern for grid with subtle gradient */}
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gridGradientLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gridGradientDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
            </linearGradient>
            <pattern id="gridPatternLight" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradientLight)" strokeWidth="0.5" />
            </pattern>
            <pattern id="gridPatternDark" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradientDark)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect className="block dark:hidden" width="100%" height="100%" fill="url(#gridPatternLight)" />
          <rect className="hidden dark:block" width="100%" height="100%" fill="url(#gridPatternDark)" />
          {/* <rect className="hidden dark:block" width="100%" height="100%" fill="url(#gridPatternDark)" /> */}
        </svg>

        {/* Random programming symbols */}
        <div className="absolute top-20 left-10 md:top-10 md:left-10 text-sky-400/30 dark:text-teal-300/30 text-4xl font-mono">{`{}`}</div>
        <div className="absolute bottom-30 right-1 md:bottom-20 md:right-16 text-pink-400/30 dark:text-purple-300/30 text-4xl md:text-5xl font-mono">&lt;/&gt;</div>
        <div className="absolute top-70 right-1/12 md:top-1/3 md:right-1/3 text-indigo-400/30 dark:text-pink-600/30 text-6xl font-mono">[]</div>
        <div className="absolute top-1/2 left-2  md:top-2/3 md:right-2/3 text-red-400/30 dark:text-red-300/30 text-5xl md:text-6xl font-mono">()</div>
        <div className="absolute top-10 right-10 text-red-400/30 dark:text-red-100/10 text-6xl font-mono">;:</div>


        {/* Floating shapes */}
        <div
          ref={addShapeRef}
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-sky-400/10 dark:border-teal-300/10 rotate-45"
        />
        <div
          ref={addShapeRef}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-pink-400/10 dark:border-purple-300/10"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:ml-[11rem]">
        {/* Left side - Text content */}
        <motion.div 
          className="flex-1 text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            ref={nameRef}
            className="text-2xl pl-3 md:text-6xl font-bold mb-2 md:mb-4 text-gray-800 dark:text-white"
          >
            Hello, It's{" "}
            <span className="text-indigo-500 dark:text-indigo-400">Shreyash Patil</span>
          </h1>


          {/* In normal color */}
          {/* <p
            ref={subtitleRef}
            className="text-[1rem] pl-6 md:text-xl text-gray-600 dark:text-gray-300 md:mb-13 mb-3 max-w-xl"
          >
            I’m a final-year B.Sc. (ECS) student, turning ideas into code and code into experiences that matter.
            It’s not just about coding — it’s about storytelling through tech.
          </p> */}

          {/* Color full */}
           <p
            ref={subtitleRef}
            className="text-[1rem] pl-3 md:text-xl text-gray-600 dark:text-gray-300 md:mb-13 mb-3 max-w-xl leading-relaxed"
          >
              I'm a final-year{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                B.Sc. (ECS)
              </span>{" "}
              student, turning{" "}
              <span className="text-purple-600 dark:text-purple-400 font-medium">
                ideas into code
              </span>{" "}
              and code into{" "}
              <span className="text-pink-600 dark:text-pink-400 font-medium">
                experiences that matter
              </span>
              . It's not just about coding — it's about{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                storytelling through tech
              </span>
              .
          </p>
    

          <div 
            ref={buttonsContainerRef}
            className="flex flex-wrap gap-3 opacity-0 pl-3"
          >

            {/* Without any functinality */}
            {/* <motion.button
              ref={btnResumeRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               className="
                px-2 py-1 text-sm        
                sm:px-3 sm:py-1.5 sm:text-base
                md:px-4 md:py-2 md:text-lg
                bg-indigo-600 hover:bg-indigo-700
                text-white rounded-lg
                transition-all duration-300
              "
            >
              View Resume
            </motion.button> */}


            {/* Directly Download Resume */}
            {/* <motion.button
              ref={btnResumeRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-2 py-1 text-sm
                sm:px-3 sm:py-1.5 sm:text-base
                md:px-4 md:py-2 md:text-lg
                bg-indigo-600 hover:bg-indigo-700
                text-white rounded-lg
                transition-all duration-300
              "
              onClick={() => {
                // Create a link element
                const link = document.createElement('a');
                
                // Set the href to the resume path in the public folder
                link.href = '/Resume/Shreyash Resume updated.pdf'; // Replace with your actual file name
                
                // Set the download attribute to force download with a specific filename
                link.download = 'Shreyash_Patil_Resume.pdf'; // Customize the downloaded filename
                
                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              View Resume
            </motion.button> */}

            {/* Opens Reume in new Tab */}
            <motion.button
              ref={btnResumeRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-2 py-1 text-sm
                sm:px-3 sm:py-1.5 sm:text-base
                md:px-4 md:py-2 md:text-lg
                bg-indigo-600 hover:bg-indigo-700
                text-white rounded-lg
                transition-all duration-300
              "
              onClick={() => {
                window.open('/Resume/Shreyash Resume updated.pdf', '_blank');
              }}
            >
              View Resume
            </motion.button>

            <div className="relative flex flex-col items-center">
              {/* Peeking Character above button */}
              <div className="absolute -top-13 z-10 hidden sm:block">
                <CharacterEyes />
              </div>
              <motion.button
                ref={btnConnectRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // className="px-4 py-2 sm:px-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 relative overflow-visible"
                className="
                    px-2 py-1 text-sm   /* default = mobile */
                    sm:px-3 sm:py-1.5 sm:text-base
                    md:px-4 md:py-2 md:text-lg
                    border-2 border-indigo-600
                    text-indigo-600 dark:text-indigo-400
                    hover:bg-indigo-50 dark:hover:bg-gray-800
                    rounded-lg transition-all duration-300 relative overflow-visible
                  "
                onClick={() => {
                document.getElementById("certifications")?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
              >
                Certifications
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div 
            className="flex-1 flex flex-col items-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Larger Circular frame with curved text */}
            <div className="relative w-[16rem] h-[16rem] md:w-[25rem] md:h-[25rem] flex items-center justify-center">
              <svg
                className="absolute w-full h-full"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Circle Path */}
                <defs>
                  <path id="circlePath" d="M250,250 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0" />
                </defs>

                {/* Dashed Circle */}
                <circle
                  cx="250"
                  cy="250"
                  r="200"
                  fill="none"
                  stroke="rgba(99,102,241,0.3)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />

                {/* Curved Text Seg */}
                <text fontSize="18" fill="#6366F1" fontWeight="bold">
                  <textPath href="#circlePath" startOffset="5%">MERN</textPath>
                </text>
                <text fontSize="18" fill="#0EA5E9" fontWeight="bold">
                  <textPath href="#circlePath" startOffset="25%">Algorithms</textPath>
                </text>
                <text fontSize="18" fill="#A855F7" fontWeight="bold">
                  <textPath href="#circlePath" startOffset="45%">Data Structures</textPath>
                </text>
                <text fontSize="18" fill="#3B82F6" fontWeight="bold">
                  <textPath href="#circlePath" startOffset="65%">Projects</textPath>
                </text>
                <text fontSize="18" fill="#EC4899" fontWeight="bold">
                  <textPath href="#circlePath" startOffset="85%">Aptitude</textPath>
                </text>
              </svg>

              {/* Profile image */}
              <div
                ref={imageRef}
                className="w-[11rem] h-[11rem] md:w-[18rem] md:h-[18rem] rounded-full overflow-hidden border-4 border-indigo-500/20 dark:border-indigo-400/20 shadow-xl transform translate-x-20 rotate-12"
                style={{
                  backgroundImage: "url('/MyImage/My.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* Typewriter text */}
            <p
              ref={typewriterRef}
              className="text-sm  md:text-xl text-gray-700 dark:text-gray-200 font-mono h-[1.4rem]"
            />
          </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-9 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500 dark:text-gray-400 mb-2"
        >
          Scroll down
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        >
          <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Home;





