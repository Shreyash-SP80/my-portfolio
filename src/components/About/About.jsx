import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const skillLine1Ref = useRef(null);
  const skillLine2Ref = useRef(null);
  const hobbyConstraintsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for animatable elements
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const subtitleRef = useRef(null);
  const journeyRef = useRef(null);
  const philosophyRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const hobbiesTitleRef = useRef(null);
  const principleCardsRef = useRef([]);

  const hobbies = [
    { id: 1, name: 'Gaming' },
    { id: 2, name: 'Reading' },
    { id: 3, name: 'Music' },
    { id: 4, name: 'Painting' },
    { id: 5, name: 'Cricket' },
    { id: 6, name: 'Watching Anime' }
  ];

  const skills = [
    "DSA In C++", "C++", "Java", 
    "MERN Stack", "PHP", "MySQL", 
    "SQL", "Python", "Data Science",
    "PowerBI", "Tailwind",
    "GSAP", "Framer Motion", "Git and GitHub"
  ];

  // Programming background code lines
  const codeLines = [
    "function greet() {",
    "  return 'Hello, World!';",
    "}",
    "class Developer {",
    "  constructor(name) {",
    "    this.name = name;",
    "  }",
    "  code() {",
    "    return `${this.name} is coding...`;",
    "  }",
    "}",
    "const dev = new Developer('You');",
    "console.log(dev.code());",
    "const projects = [];",
    "while(true) {",
    "  projects.push(new Project());",
    "}"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    // Main section animation
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reset play reset"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Title animation
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

    // Divider animation
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

    // Subtitle animation
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

    // Journey card animation
    gsap.from(journeyRef.current, {
      scrollTrigger: {
        trigger: journeyRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reset play reset"
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "back.out(1.7)"
    });

    // Philosophy card animation
    gsap.from(philosophyRef.current, {
      scrollTrigger: {
        trigger: philosophyRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reset play reset"
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "back.out(1.7)"
    });

    // Skills title animation
    gsap.from(skillsTitleRef.current, {
      scrollTrigger: {
        trigger: skillsTitleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reset play reset"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Skills line animation (desktop only)
    if (!isMobile && skillLine1Ref.current && skillLine2Ref.current) {
      const skillWidth = skillLine1Ref.current.scrollWidth / 2;
      
      gsap.from(skillLine1Ref.current, {
        scrollTrigger: {
          trigger: skillLine1Ref.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(skillLine1Ref.current, {
            x: -skillWidth,
            duration: 20,
            ease: "none",
            repeat: -1
          });
        }
      });

      gsap.from(skillLine2Ref.current, {
        scrollTrigger: {
          trigger: skillLine2Ref.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(skillLine2Ref.current, {
            x: skillWidth,
            duration: 25,
            ease: "none",
            repeat: -1
          });
        }
      });
    }

    // Hobbies section animation
    gsap.from(hobbiesTitleRef.current, {
      scrollTrigger: {
        trigger: hobbiesTitleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reset play reset"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    gsap.from(hobbyConstraintsRef.current, {
      scrollTrigger: {
        trigger: hobbyConstraintsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reset play reset"
      },
      x: isMobile ? 0 : -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Principle cards animation
    principleCardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "back.out(1.7)"
      });
    });

  }, containerRef);

  return () => ctx.revert();
}, [isMobile]);

  return (
    <section 
      ref={containerRef}
      id="about"
      className="relative py-16 md:py-24 overflow-hidden min-h-screen flex items-center"
    >
      {/* background */}
       <div className="absolute inset-0 overflow-hidden opacity-100 dark:opacity-100 pointer-events-none">
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
          </svg>

        {/* Random code adding to bg */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 opacity-25 dark:opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`code-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="text-xs md:text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-nowrap"
            >
              {codeLines[Math.floor(Math.random() * codeLines.length)]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header section */}
      <div 
        ref={sectionRef}
        className="relative z-10 container mx-auto px-4 md:px-6 max-w-6xl"
      >
        <div className="text-center mb-12 md:mb-20">
          <h2 ref={titleRef} className="text-3xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
            About <span className="text-indigo-500 dark:text-indigo-400">Me</span>
          </h2>
          <div ref={dividerRef} className="w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-4 md:mb-6 rounded-full" />
          <p ref={subtitleRef} className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Developer | Problem Solver | Technology Explorer
          </p>
        </div>

        {/* My info section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="space-y-8 md:space-y-12">
            <div ref={journeyRef} className="p-6 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <h3 className="text-xl md:text-3xl font-semibold mb-3 md:mb-4 text-gray-800 dark:text-white">
                My Journey
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300">
                <p>
                  My coding journey began in 2018 with C, sparking a passion for <span className="text-indigo-500 dark:text-indigo-400 font-medium">problem-solving</span> and logical thinking. This curiosity led me to modern technologies and <span className="text-indigo-500 dark:text-indigo-400 font-medium">web development</span>, where I enjoy creating meaningful digital experiences. With continuous learning and practice, I’ve built the ability to turn ideas into <span className="text-indigo-500 dark:text-indigo-400 font-medium">user-friendly projects</span>.
                </p>
                <p>
                  Along with my technical journey, my academics have shaped my growth. Scoring <span className="text-indigo-500 dark:text-indigo-400 font-medium">80% in 10th</span> and 59.20% in 12th taught me persistence and the importance of continuous improvement. These lessons, combined with my passion for coding, keep me motivated to build a strong <span className="text-indigo-500 dark:text-indigo-400 font-medium">career in technology</span>.
                </p>
              </div>
            </div>


            <div ref={philosophyRef} className="p-6 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <h3 className="text-xl md:text-3xl font-semibold mb-3 md:mb-4 text-gray-800 dark:text-white">
                My Philosophy
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                I believe in <span className="text-indigo-500 dark:text-indigo-400 font-medium">"code with purpose"</span> - every line should serve a clear function while being maintainable and efficient. Great design and smooth interactions should work together to create memorable experiences.
              </p>
            </div>
          </div>


          {/* Skill section  */}
          <div className="space-y-8 md:space-y-12">
            <div className="p-6 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
              <h3 ref={skillsTitleRef} className="text-xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800 dark:text-white">
                My <span className="text-indigo-500 dark:text-indigo-400">Skills</span>
              </h3>
              
              {isMobile ? (
                <div className="grid grid-cols-3 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div 
                      key={`mobile-skill-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="px-2 py-2 bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 rounded-lg font-medium flex items-center gap-2 shadow-sm text-xs md:text-sm"
                    >
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                      {skill}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="mb-4 md:mb-6 overflow-hidden h-12 md:h-14">
                    <div 
                      ref={skillLine1Ref} 
                      className="flex gap-3 md:gap-4 w-max h-full items-center"
                    >
                      {[...skills, ...skills].map((skill, index) => (
                        <motion.div 
                          key={`line1-${index}`}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 md:px-5 py-2 md:py-3 bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 rounded-xl font-medium flex items-center gap-2 shadow-md whitespace-nowrap text-sm md:text-base"
                        >
                          <span className="w-2 md:w-3 h-2 md:h-3 bg-indigo-500 rounded-full animate-pulse"></span>
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="overflow-hidden h-12 md:h-14">
                    <div 
                      ref={skillLine2Ref}
                      className="flex gap-3 md:gap-4 w-max h-full items-center"
                    >
                      {[...skills].reverse().map((skill, index) => (
                        <motion.div 
                          key={`line2-${index}`}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 md:px-5 py-2 md:py-3 bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 rounded-xl font-medium flex items-center gap-2 shadow-md whitespace-nowrap text-sm md:text-base"
                        >
                          <span className="w-2 md:w-3 h-2 md:h-3 bg-indigo-500 rounded-full animate-pulse"></span>
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>


            {/* Hobby section moves according to use interaction */}
            <div 
              ref={hobbyConstraintsRef} 
              className="p-6 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border overflow-hidden border-gray-200/50 dark:border-gray-700/50 shadow-xl min-h-[200px] md:min-h-[300px] relative"
            >
              <h3 ref={hobbiesTitleRef} className="text-xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800 dark:text-white">
                Behind the <span className="text-indigo-500 dark:text-indigo-400">Code</span>
              </h3>
              
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                When I'm not coding, you can find me enjoying these activities:
              </p>
              
              {isMobile ? (
                <div className="grid grid-cols-2 gap-3">
                  {hobbies.map((hobby, index) => (
                    <motion.div
                      key={hobby.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="px-4 py-2 bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-300 rounded-lg font-medium shadow-sm text-center"
                    >
                      {hobby.name}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="relative w-full h-[150px] md:h-[180px]">
                  {hobbies.map((hobby, index) => (
                    <DraggableHobby 
                      key={hobby.id}
                      hobby={hobby}
                      index={index}
                      constraintsRef={hobbyConstraintsRef}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Last section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: "🎓",
              title: "Education",
              description: "Currently pursuing a  B.sc-(ECS), maintaining a CGPA of 9/10. 3rd Year | Expected Graduation: May 2026."
            },
            {
              icon: "💼",
              title: "Experience",
              description: "Worked on multiple academic and personal projects, gaining hands-on experience in C++, web development, and problem-solving."
            },
            {
              icon: "🌟",
              title: "Skills",
              description: "Strong foundation in programming, web technologies, and database management with a passion for continuous learning."
            }
          ].map((principle, i) => (
            <div
              key={i}
              ref={el => principleCardsRef.current[i] = el}
              className="p-6 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{principle.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-gray-800 dark:text-white">{principle.title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DraggableHobby = ({ hobby, index, constraintsRef }) => {
  const angle = (index / 5) * Math.PI * 2;
  const radius = 80;
  const centerX = 120;
  const centerY = 80;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={0.5}
      initial={{ 
        opacity: 0, 
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      }}
      whileInView={{
        opacity: 1,
        transition: { type: "spring", damping: 10, stiffness: 50, delay: index * 0.3 }
      }}
      viewport={{ once: true }}
      whileDrag={{ 
        scale: 1.1, 
        zIndex: 10, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        cursor: "grabbing"
      }}
      whileHover={{ scale: 1.05 }}
      className="px-4 md:px-5 py-2 md:py-3 bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-300 rounded-xl font-medium cursor-grab active:cursor-grabbing shadow-md absolute"
    >
      <span className="text-sm md:text-base">{hobby.name}</span>
    </motion.div>
  );
};

export default About;

