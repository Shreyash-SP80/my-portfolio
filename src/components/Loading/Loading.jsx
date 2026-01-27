import { useRef, useEffect } from 'react';
import gsap from 'gsap';

function Loading({ onLoadingComplete }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const loaderTextRef = useRef(null);
  const orbitRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

    // Create orbiting elements
    createOrbits();

    // Animation sequence
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.5
    })
    .to(contentRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    });

    // Typewriter effect for loader text
    const loaderText = "🛠️ Explore My Work...🛠️";
    let loaderIndex = 0;
    
    const typeWriter = () => {
      if (loaderIndex < loaderText.length && loaderTextRef.current) {
        loaderTextRef.current.textContent = loaderText.substring(0, loaderIndex + 1);
        loaderIndex++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (onLoadingComplete) {
                onLoadingComplete();
              }
            }
          });
          
          // Animate orbits out
          gsap.to('.orbit-dot', {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in"
          });

          exitTl.to([loaderTextRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.in"
          })
          .to([titleRef.current, contentRef.current.children[0]], {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.in"
          }, "-=0.3")
          .to('.superman-body', {
            opacity: 0,
            scale: 0,
            rotation: 360,
            duration: 0.7,
            ease: "back.in(1.7)"
          }, "-=0.4")
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
          });
        }, 1500); 
      }
    };
    
    setTimeout(typeWriter, 1000);
  }, [onLoadingComplete]);

  // Create orbiting dots around Superman
  const createOrbits = () => {
    const orbits = [
      { radius: 60, speed: 8, color: '#818cf8', size: 4 },
      { radius: 80, speed: -6, color: '#a78bfa', size: 3 },
      { radius: 100, speed: 10, color: '#c4b5fd', size: 2 },
    ];

    orbits.forEach((orbit, orbitIndex) => {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dot = document.createElement('div');
        dot.className = 'orbit-dot';
        
        dot.style.cssText = `
          position: absolute;
          width: ${orbit.size}px;
          height: ${orbit.size}px;
          background: ${orbit.color};
          border-radius: 50%;
          left: 50%;
          top: 50%;
          margin-left: -${orbit.size/2}px;
          margin-top: -${orbit.size/2}px;
          transform: rotate(${angle}rad) translateX(${orbit.radius}px);
          transform-origin: center;
          pointer-events: none;
          z-index: 2;
        `;

        if (containerRef.current) {
          const supermanContainer = containerRef.current.querySelector('.relative.w-full');
          if (supermanContainer) {
            supermanContainer.appendChild(dot);
          }
        }

        // Animate orbit
        gsap.to(dot, {
          rotation: `${orbit.speed > 0 ? 360 : -360}`,
          duration: Math.abs(orbit.speed),
          repeat: -1,
          ease: "none",
          transformOrigin: "center"
        });
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* Small, fast longfazers covering entire page */}
      <div className='longfazers'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-indigo-400 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-400 rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-indigo-300 rotate-12"></div>
      </div>

      <div ref={contentRef} className="text-center relative z-10">
        {/* Logo with animated border */}
        <div className="mb-4 sm:mb-5 mx-auto rounded-full md:p-1.5 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative group">
          {/* <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-sm animate-pulse"></div> */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-sm animate-pulse glow-ring"></div>
          <div className="absolute -inset-0 rounded-full border-2 border-transparent border-t-indigo-400 border-r-purple-400 animate-spin-slow"></div>
          <img
            src="/logo/Mylogo.jpg"
            alt="Logo"
            className="w-full h-full rounded-full object-cover relative z-10"
          />
        </div>

        {/* Title with animated underline */}
        <h1 
          ref={titleRef}
          className="mb-3 text-xl sm:text-2xl md:text-2xl font-bold text-purple-400 relative inline-block"
        >
          Shreyash's Portfolio
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 animate-underline"></span>
        </h1>

        {/* Superman Animation Container */}
        <div className="relative w-full h-28 sm:h-36 md:h-40 mb-3">
          {/* Animated rings around Superman */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 border border-indigo-400/30 rounded-full animate-ping-slow"></div>
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 border border-purple-400/20 rounded-full animate-ping-slower"></div>
          </div>

          {/* Superman body animation - responsive */}
          <div className='superman-body scale-70 sm:scale-85 md:scale-95'>
            <span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div className='base'>
              <span></span>
              <div className='face'></div>
            </div>
          </div>
        </div>

        {/* Custom text element with typing indicator */}
        <div 
          ref={loaderTextRef}
          className="text-base sm:text-lg md:text-lg font-medium font-mono text-indigo-300 h-6 sm:h-7 relative group"
        >
          <span className="relative">
            <span className="absolute -inset-x-1 -inset-y-0.5 bg-indigo-900/20 rounded blur-sm group-hover:blur-md transition-all duration-300"></span>
          </span>
        </div>

        {/* Progress indicator dots */}
        <div className="mt-4 flex justify-center space-x-2">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className="w-2 h-2 rounded-full bg-indigo-400 opacity-30 animate-bounce"
              style={{ animationDelay: `${dot * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS for Superman animation and longfazers */}
      <style jsx>{`
        .superman-body {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -50px;
          animation: speeder 0.4s linear infinite;
          transform-origin: center;
          z-index: 20;
        }

        .superman-body > span {
          height: 5px;
          width: 35px;
          background: #818cf8; /* indigo-400 */
          position: absolute;
          top: -19px;
          left: 60px;
          border-radius: 2px 10px 1px 0;
        }

        .base span {
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #818cf8;
          border-bottom: 6px solid transparent;
        }

        .base span:before {
          content: "";
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: #818cf8;
          position: absolute;
          right: -110px;
          top: -16px;
        }

        .base span:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-right: 55px solid #818cf8;
          border-bottom: 16px solid transparent;
          top: -16px;
          right: -98px;
        }

        .face {
          position: absolute;
          height: 12px;
          width: 20px;
          background: #818cf8;
          border-radius: 20px 20px 0 0;
          transform: rotate(-40deg);
          right: -125px;
          top: -15px;
        }

        .face:after {
          content: "";
          height: 12px;
          width: 12px;
          background: #818cf8;
          right: 4px;
          top: 7px;
          position: absolute;
          transform: rotate(40deg);
          transform-origin: 50% 50%;
          border-radius: 0 0 0 2px;
        }

        .superman-body > span > span:nth-child(1),
        .superman-body > span > span:nth-child(2),
        .superman-body > span > span:nth-child(3),
        .superman-body > span > span:nth-child(4) {
          width: 30px;
          height: 1px;
          background: #818cf8;
          position: absolute;
          animation: fazer1 0.2s linear infinite;
        }

        .superman-body > span > span:nth-child(2) {
          top: 3px;
          animation: fazer2 0.4s linear infinite;
        }

        .superman-body > span > span:nth-child(3) {
          top: 1px;
          animation: fazer3 0.4s linear infinite;
          animation-delay: -1s;
        }

        .superman-body > span > span:nth-child(4) {
          top: 4px;
          animation: fazer4 1s linear infinite;
          animation-delay: -1s;
        }

        /* Small, fast longfazers covering entire page */
        .longfazers {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 5;
        }

        .longfazers span {
          position: absolute;
          height: 2px;
          width: 40%;
          background: linear-gradient(90deg, transparent, #818cf8, transparent);
          opacity: 0.4;
        }

        /* More longfazers with different positions and speeds */
        .longfazers span:nth-child(1) {
          top: 15%;
          animation: lf 1.5s linear infinite;
        }

        .longfazers span:nth-child(2) {
          top: 25%;
          animation: lf2 1.2s linear infinite;
          animation-delay: 0.2s;
        }

        .longfazers span:nth-child(3) {
          top: 35%;
          animation: lf3 1.8s linear infinite;
          animation-delay: 0.4s;
        }

        .longfazers span:nth-child(4) {
          top: 45%;
          animation: lf4 1.3s linear infinite;
          animation-delay: 0.6s;
        }

        .longfazers span:nth-child(5) {
          top: 55%;
          animation: lf 1.6s linear infinite;
          animation-delay: 0.1s;
        }

        .longfazers span:nth-child(6) {
          top: 65%;
          animation: lf2 1.4s linear infinite;
          animation-delay: 0.3s;
        }

        .longfazers span:nth-child(7) {
          top: 75%;
          animation: lf3 1.7s linear infinite;
          animation-delay: 0.5s;
        }

        .longfazers span:nth-child(8) {
          top: 85%;
          animation: lf4 1.5s linear infinite;
          animation-delay: 0.7s;
        }

        @keyframes fazer1 {
          0% {
            left: 0;
          }
          100% {
            left: -80px;
            opacity: 0;
          }
        }

        @keyframes fazer2 {
          0% {
            left: 0;
          }
          100% {
            left: -100px;
            opacity: 0;
          }
        }

        @keyframes fazer3 {
          0% {
            left: 0;
          }
          100% {
            left: -50px;
            opacity: 0;
          }
        }

        @keyframes fazer4 {
          0% {
            left: 0;
          }
          100% {
            left: -150px;
            opacity: 0;
          }
        }

        @keyframes speeder {
          0% {
            transform: translate(2px, 1px) rotate(0deg);
          }
          10% {
            transform: translate(-1px, -3px) rotate(-1deg);
          }
          20% {
            transform: translate(-2px, 0px) rotate(1deg);
          }
          30% {
            transform: translate(1px, 2px) rotate(0deg);
          }
          40% {
            transform: translate(1px, -1px) rotate(1deg);
          }
          50% {
            transform: translate(-1px, 3px) rotate(-1deg);
          }
          60% {
            transform: translate(-1px, 1px) rotate(0deg);
          }
          70% {
            transform: translate(3px, 1px) rotate(-1deg);
          }
          80% {
            transform: translate(-2px, -1px) rotate(1deg);
          }
          90% {
            transform: translate(2px, 1px) rotate(0deg);
          }
          100% {
            transform: translate(1px, -2px) rotate(-1deg);
          }
        }

        @keyframes lf {
          0% {
            left: 100%;
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            left: -100%;
            opacity: 0;
          }
        }

        @keyframes lf2 {
          0% {
            left: 100%;
            opacity: 0;
          }
          15% {
            opacity: 0.3;
          }
          85% {
            opacity: 0.3;
          }
          100% {
            left: -100%;
            opacity: 0;
          }
        }

        @keyframes lf3 {
          0% {
            left: 100%;
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            left: -100%;
            opacity: 0;
          }
        }

        @keyframes lf4 {
          0% {
            left: 100%;
            opacity: 0;
          }
          5% {
            opacity: 0.3;
          }
          95% {
            opacity: 0.3;
          }
          100% {
            left: -100%;
            opacity: 0;
          }
        }

        /* New creative animations */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        @keyframes underline {
          0% { width: 0; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }

        /* New animation classes */
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 3s ease-in-out infinite;
        }

        .animate-underline {
          animation: underline 3s ease-in-out infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .glow-ring {
            filter: none; /* disable blur on mobile */
            opacity: 1;

            box-shadow:
              0 0 8px rgba(99,102,241,0.6),
              0 0 16px rgba(168,85,247,0.45),
              0 0 28px rgba(168,85,247,0.25);
          }
        }

        @media (max-width: 640px) {
          .superman-body {
            margin-left: -40px;
          }
          
          .superman-body > span {
            width: 25px;
            height: 4px;
          }
          
          .base span {
            border-right-width: 80px;
          }
          
          .base span:before {
            height: 18px;
            width: 18px;
            right: -90px;
          }
          
          .base span:after {
            border-right-width: 45px;
            right: -80px;
          }
          
          .face {
            right: -100px;
          }
          
          .superman-body > span > span {
            animation-duration: 0.3s !important;
          }
          
          .longfazers span {
            height: 1px;
            opacity: 0.2;
          }
        }

       

        @media (max-width: 480px) {
          .superman-body {
            margin-left: -35px;
            transform: scale(0.6);
          }
          
          .longfazers span {
            animation-duration: 1s !important;
          }
        }

        @media (min-width: 768px) {
          .longfazers span {
            height: 1.5px;
            opacity: 0.25;
          }
        }

        @media (min-width: 1024px) {
          .longfazers span {
            height: 2px;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;


// OLD VERSON =>

// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { FourSquare } from 'react-loading-indicators';

// function Loading({ onLoadingComplete }) {
//   const containerRef = useRef(null);
//   const contentRef = useRef(null);
//   const titleRef = useRef(null);
//   const loaderTextRef = useRef(null);
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline();
    
//     // Initial state
//     gsap.set(containerRef.current, { opacity: 0 });
//     gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

//     // Animation sequence
//     tl.to(containerRef.current, {
//       opacity: 1,
//       duration: 0.5
//     })
//     .to(contentRef.current.children, {
//       opacity: 1,
//       y: 0,
//       stagger: 0.15,
//       duration: 0.8,
//       ease: "power2.out"
//     });

//     // Typewriter effect for loader text
//     const loaderText = "🛠️ Explore My Work...🛠️";
//     let loaderIndex = 0;
    
//     const typeWriter = () => {
//       // Type loader text
//       if (loaderIndex < loaderText.length && loaderTextRef.current) {
//         loaderTextRef.current.textContent = loaderText.substring(0, loaderIndex + 1);
//         loaderIndex++;
//         setTimeout(typeWriter, 100);
//       } else {
//         setTimeout(() => {
//           const exitTl = gsap.timeline({
//             onComplete: () => {
//               if (onLoadingComplete) {
//                 onLoadingComplete();
//               }
//             }
//           });
          
//           exitTl.to([loaderRef.current, loaderTextRef.current], {
//             opacity: 0,
//             y: -20,
//             duration: 0.6,
//             ease: "power2.in"
//           })
            
//           .to([titleRef.current, contentRef.current.children[0]], {
//             opacity: 0,
//             y: -20,
//             duration: 0.6,
//             ease: "power2.in"
//           }, "-=0.3")
        
//           .to(containerRef.current, {
//             opacity: 0,
//             duration: 0.8,
//             ease: "power2.inOut"
//           });
//         }, 1500); 
//       }
//     };
    
//     setTimeout(typeWriter, 1000);
//   }, [onLoadingComplete]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
//     >
//       <div ref={contentRef} className="text-center">
//         {/* Logo */}
//         <div className="mb-8 mx-auto rounded-full border-2 border-indigo-500 p-1.5 w-20 h-20">
//           <img
//             src="/logo/Mylogo.jpg"
//             alt="Logo"
//             className="w-full h-full rounded-full object-cover"
//           />
//         </div>

//         {/* Title */}
//         <h1 
//           ref={titleRef}
//           className="md:mb-9 sm:mb-6 text-2xl md:text-3xl font-bold text-purple-400"
//         >
//           Shreyash's Portfolio
//         </h1>

//         {/* FourSquare Loader with custom text */}
//         <div ref={loaderRef} className="scale-100 sm:scale-125 md:scale-150">
//           <FourSquare 
//             color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
//             size="large"
//             text=""
//             textColor="#e2e8f0"
//           />
//           {/* Custom text element for the loader with static color */}
//           <div 
//             ref={loaderTextRef}
//             className="mt-1 text-lg font-medium font-mono text-indigo-300"
//           >
//             {/* Text will be filled by typewriter effect */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loading;


// JUST SMALL ANIMATED VERSON

// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';

// function Loading({ onLoadingComplete }) {
//   const containerRef = useRef(null);
//   const contentRef = useRef(null);
//   const titleRef = useRef(null);
//   const loaderTextRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline();
    
//     // Initial state
//     gsap.set(containerRef.current, { opacity: 0 });
//     gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

//     // Animation sequence
//     tl.to(containerRef.current, {
//       opacity: 1,
//       duration: 0.5
//     })
//     .to(contentRef.current.children, {
//       opacity: 1,
//       y: 0,
//       stagger: 0.15,
//       duration: 0.8,
//       ease: "power2.out"
//     });

//     // Typewriter effect for loader text
//     const loaderText = "🛠️ Explore My Work...🛠️";
//     let loaderIndex = 0;
    
//     const typeWriter = () => {
//       if (loaderIndex < loaderText.length && loaderTextRef.current) {
//         loaderTextRef.current.textContent = loaderText.substring(0, loaderIndex + 1);
//         loaderIndex++;
//         setTimeout(typeWriter, 100);
//       } else {
//         setTimeout(() => {
//           const exitTl = gsap.timeline({
//             onComplete: () => {
//               if (onLoadingComplete) {
//                 onLoadingComplete();
//               }
//             }
//           });
          
//           exitTl.to([loaderTextRef.current], {
//             opacity: 0,
//             y: -20,
//             duration: 0.6,
//             ease: "power2.in"
//           })
//           .to([titleRef.current, contentRef.current.children[0]], {
//             opacity: 0,
//             y: -20,
//             duration: 0.6,
//             ease: "power2.in"
//           }, "-=0.3")
//           .to(containerRef.current, {
//             opacity: 0,
//             duration: 0.8,
//             ease: "power2.inOut"
//           });
//         }, 1500); 
//       }
//     };
    
//     setTimeout(typeWriter, 1000);
//   }, [onLoadingComplete]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
//     >
//       <div ref={contentRef} className="text-center relative">
//         {/* Logo */}
//         <div className="mb-8 mx-auto rounded-full border-2 border-indigo-500 p-1.5 w-20 h-20">
//           <img
//             src="/logo/Mylogo.jpg"
//             alt="Logo"
//             className="w-full h-full rounded-full object-cover"
//           />
//         </div>

//         {/* Title */}
//         <h1 
//           ref={titleRef}
//           className="md:mb-9 sm:mb-6 text-2xl md:text-3xl font-bold text-purple-400 mb-12"
//         >
//           Shreyash's Portfolio
//         </h1>

//         {/* Superman Animation Container */}
//         <div className="relative w-full h-64 mb-8">
//           {/* Superman body animation */}
//           <div className='superman-body'>
//             <span>
//               <span></span>
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//             <div className='base'>
//               <span></span>
//               <div className='face'></div>
//             </div>
//           </div>
          
//           {/* Long fazers (trails) */}
//           <div className='longfazers'>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>

//         {/* Custom text element for the loader with static color */}
//         <div 
//           ref={loaderTextRef}
//           className="mt-8 text-lg font-medium font-mono text-indigo-300 h-6"
//         >
//           {/* Text will be filled by typewriter effect */}
//         </div>
//       </div>

//       {/* CSS for Superman animation */}
//       <style jsx>{`
//         .superman-body {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           margin-left: -50px;
//           animation: speeder 0.4s linear infinite;
//           transform-origin: center;
//         }

//         .superman-body > span {
//           height: 5px;
//           width: 35px;
//           background: #818cf8; /* indigo-400 */
//           position: absolute;
//           top: -19px;
//           left: 60px;
//           border-radius: 2px 10px 1px 0;
//         }

//         .base span {
//           position: absolute;
//           width: 0;
//           height: 0;
//           border-top: 6px solid transparent;
//           border-right: 100px solid #818cf8;
//           border-bottom: 6px solid transparent;
//         }

//         .base span:before {
//           content: "";
//           height: 22px;
//           width: 22px;
//           border-radius: 50%;
//           background: #818cf8;
//           position: absolute;
//           right: -110px;
//           top: -16px;
//         }

//         .base span:after {
//           content: "";
//           position: absolute;
//           width: 0;
//           height: 0;
//           border-top: 0 solid transparent;
//           border-right: 55px solid #818cf8;
//           border-bottom: 16px solid transparent;
//           top: -16px;
//           right: -98px;
//         }

//         .face {
//           position: absolute;
//           height: 12px;
//           width: 20px;
//           background: #818cf8;
//           border-radius: 20px 20px 0 0;
//           transform: rotate(-40deg);
//           right: -125px;
//           top: -15px;
//         }

//         .face:after {
//           content: "";
//           height: 12px;
//           width: 12px;
//           background: #818cf8;
//           right: 4px;
//           top: 7px;
//           position: absolute;
//           transform: rotate(40deg);
//           transform-origin: 50% 50%;
//           border-radius: 0 0 0 2px;
//         }

//         .superman-body > span > span:nth-child(1),
//         .superman-body > span > span:nth-child(2),
//         .superman-body > span > span:nth-child(3),
//         .superman-body > span > span:nth-child(4) {
//           width: 30px;
//           height: 1px;
//           background: #818cf8;
//           position: absolute;
//           animation: fazer1 0.2s linear infinite;
//         }

//         .superman-body > span > span:nth-child(2) {
//           top: 3px;
//           animation: fazer2 0.4s linear infinite;
//         }

//         .superman-body > span > span:nth-child(3) {
//           top: 1px;
//           animation: fazer3 0.4s linear infinite;
//           animation-delay: -1s;
//         }

//         .superman-body > span > span:nth-child(4) {
//           top: 4px;
//           animation: fazer4 1s linear infinite;
//           animation-delay: -1s;
//         }

//         .longfazers {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           top: 0;
//           left: 0;
//           pointer-events: none;
//         }

//         .longfazers span {
//           position: absolute;
//           height: 2px;
//           width: 20%;
//           background: #818cf8;
//         }

//         .longfazers span:nth-child(1) {
//           top: 20%;
//           animation: lf 0.6s linear infinite;
//           animation-delay: -5s;
//         }

//         .longfazers span:nth-child(2) {
//           top: 40%;
//           animation: lf2 0.8s linear infinite;
//           animation-delay: -1s;
//         }

//         .longfazers span:nth-child(3) {
//           top: 60%;
//           animation: lf3 0.6s linear infinite;
//         }

//         .longfazers span:nth-child(4) {
//           top: 80%;
//           animation: lf4 0.5s linear infinite;
//           animation-delay: -3s;
//         }

//         @keyframes fazer1 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -80px;
//             opacity: 0;
//           }
//         }

//         @keyframes fazer2 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -100px;
//             opacity: 0;
//           }
//         }

//         @keyframes fazer3 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -50px;
//             opacity: 0;
//           }
//         }

//         @keyframes fazer4 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -150px;
//             opacity: 0;
//           }
//         }

//         @keyframes speeder {
//           0% {
//             transform: translate(2px, 1px) rotate(0deg);
//           }
//           10% {
//             transform: translate(-1px, -3px) rotate(-1deg);
//           }
//           20% {
//             transform: translate(-2px, 0px) rotate(1deg);
//           }
//           30% {
//             transform: translate(1px, 2px) rotate(0deg);
//           }
//           40% {
//             transform: translate(1px, -1px) rotate(1deg);
//           }
//           50% {
//             transform: translate(-1px, 3px) rotate(-1deg);
//           }
//           60% {
//             transform: translate(-1px, 1px) rotate(0deg);
//           }
//           70% {
//             transform: translate(3px, 1px) rotate(-1deg);
//           }
//           80% {
//             transform: translate(-2px, -1px) rotate(1deg);
//           }
//           90% {
//             transform: translate(2px, 1px) rotate(0deg);
//           }
//           100% {
//             transform: translate(1px, -2px) rotate(-1deg);
//           }
//         }

//         @keyframes lf {
//           0% {
//             left: 200%;
//           }
//           100% {
//             left: -200%;
//             opacity: 0;
//           }
//         }

//         @keyframes lf2 {
//           0% {
//             left: 200%;
//           }
//           100% {
//             left: -200%;
//             opacity: 0;
//           }
//         }

//         @keyframes lf3 {
//           0% {
//             left: 200%;
//           }
//           100% {
//             left: -100%;
//             opacity: 0;
//           }
//         }

//         @keyframes lf4 {
//           0% {
//             left: 200%;
//           }
//           100% {
//             left: -100%;
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Loading;







// Without animation version of active code =>

// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';

// function Loading({ onLoadingComplete }) {
//   const containerRef = useRef(null);
//   const contentRef = useRef(null);
//   const titleRef = useRef(null);
//   const loaderTextRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline();
    
//     // Initial state
//     gsap.set(containerRef.current, { opacity: 0 });
//     gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

//     // Animation sequence
//     tl.to(containerRef.current, {
//       opacity: 1,
//       duration: 0.5
//     })
//     .to(contentRef.current.children, {
//       opacity: 1,
//       y: 0,
//       stagger: 0.15,
//       duration: 0.8,
//       ease: "power2.out"
//     });

//     // Typewriter effect for loader text
//     const loaderText = "🛠️ Explore My Work...🛠️";
//     let loaderIndex = 0;
    
//     const typeWriter = () => {
//       if (loaderIndex < loaderText.length && loaderTextRef.current) {
//         loaderTextRef.current.textContent = loaderText.substring(0, loaderIndex + 1);
//         loaderIndex++;
//         setTimeout(typeWriter, 100);
//       } else {
//         setTimeout(() => {
//           const exitTl = gsap.timeline({
//             onComplete: () => {
//               if (onLoadingComplete) {
//                 onLoadingComplete();
//               }
//             }
//           });
          
//           exitTl.to([loaderTextRef.current], {
//             opacity: 0,
//             y: -20,
//             duration: 0.6,
//             ease: "power2.in"
//           })
//           .to([titleRef.current, contentRef.current.children[0]], {
//             opacity: 0,
//             y: -20,
//             duration: 0.6,
//             ease: "power2.in"
//           }, "-=0.3")
//           .to(containerRef.current, {
//             opacity: 0,
//             duration: 0.8,
//             ease: "power2.inOut"
//           });
//         }, 1500); 
//       }
//     };
    
//     setTimeout(typeWriter, 1000);
//   }, [onLoadingComplete]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
//     >
//       {/* Small, fast longfazers covering entire page */}
//       <div className='longfazers'>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       <div ref={contentRef} className="text-center relative z-10">
//         {/* Logo */}
//         <div className="mb-4 sm:mb-5 mx-auto rounded-full border-2 border-indigo-500 p-1.5 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20">
//           <img
//             src="/logo/Mylogo.jpg"
//             alt="Logo"
//             className="w-full h-full rounded-full object-cover"
//           />
//         </div>

//         {/* Title - closer to Superman */}
//         <h1 
//           ref={titleRef}
//           className="mb-3 text-xl sm:text-2xl md:text-2xl font-bold text-purple-400"
//         >
//           Shreyash's Portfolio
//         </h1>

//         {/* Superman Animation Container */}
//         <div className="relative w-full h-28 sm:h-36 md:h-40 mb-3">
//           {/* Superman body animation - responsive */}
//           <div className='superman-body scale-70 sm:scale-85 md:scale-95'>
//             <span>
//               <span></span>
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//             <div className='base'>
//               <span></span>
//               <div className='face'></div>
//             </div>
//           </div>
//         </div>

//         {/* Custom text element - closer to Superman */}
//         <div 
//           ref={loaderTextRef}
//           className="text-base sm:text-lg md:text-lg font-medium font-mono text-indigo-300 h-6 sm:h-7"
//         >
//           {/* Text will be filled by typewriter effect */}
//         </div>
//       </div>

//       {/* CSS for Superman animation and longfazers */}
//       <style jsx>{`
//         .superman-body {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           margin-left: -50px;
//           animation: speeder 0.4s linear infinite;
//           transform-origin: center;
//           z-index: 20;
//         }

//         .superman-body > span {
//           height: 5px;
//           width: 35px;
//           background: #818cf8; /* indigo-400 */
//           position: absolute;
//           top: -19px;
//           left: 60px;
//           border-radius: 2px 10px 1px 0;
//         }

//         .base span {
//           position: absolute;
//           width: 0;
//           height: 0;
//           border-top: 6px solid transparent;
//           border-right: 100px solid #818cf8;
//           border-bottom: 6px solid transparent;
//         }

//         .base span:before {
//           content: "";
//           height: 22px;
//           width: 22px;
//           border-radius: 50%;
//           background: #818cf8;
//           position: absolute;
//           right: -110px;
//           top: -16px;
//         }

//         .base span:after {
//           content: "";
//           position: absolute;
//           width: 0;
//           height: 0;
//           border-top: 0 solid transparent;
//           border-right: 55px solid #818cf8;
//           border-bottom: 16px solid transparent;
//           top: -16px;
//           right: -98px;
//         }

//         .face {
//           position: absolute;
//           height: 12px;
//           width: 20px;
//           background: #818cf8;
//           border-radius: 20px 20px 0 0;
//           transform: rotate(-40deg);
//           right: -125px;
//           top: -15px;
//         }

//         .face:after {
//           content: "";
//           height: 12px;
//           width: 12px;
//           background: #818cf8;
//           right: 4px;
//           top: 7px;
//           position: absolute;
//           transform: rotate(40deg);
//           transform-origin: 50% 50%;
//           border-radius: 0 0 0 2px;
//         }

//         .superman-body > span > span:nth-child(1),
//         .superman-body > span > span:nth-child(2),
//         .superman-body > span > span:nth-child(3),
//         .superman-body > span > span:nth-child(4) {
//           width: 30px;
//           height: 1px;
//           background: #818cf8;
//           position: absolute;
//           animation: fazer1 0.2s linear infinite;
//         }

//         .superman-body > span > span:nth-child(2) {
//           top: 3px;
//           animation: fazer2 0.4s linear infinite;
//         }

//         .superman-body > span > span:nth-child(3) {
//           top: 1px;
//           animation: fazer3 0.4s linear infinite;
//           animation-delay: -1s;
//         }

//         .superman-body > span > span:nth-child(4) {
//           top: 4px;
//           animation: fazer4 1s linear infinite;
//           animation-delay: -1s;
//         }

//         /* Small, fast longfazers covering entire page */
//         .longfazers {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           top: 0;
//           left: 0;
//           pointer-events: none;
//           z-index: 5;
//         }

//         .longfazers span {
//           position: absolute;
//           height: 1px;
//           width: 100%;
//           background: linear-gradient(90deg, transparent, #818cf8, transparent);
//           opacity: 0.3;
//         }

//         /* More longfazers with different positions and speeds */
//         .longfazers span:nth-child(1) {
//           top: 15%;
//           animation: lf 1.5s linear infinite;
//         }

//         .longfazers span:nth-child(2) {
//           top: 25%;
//           animation: lf2 1.2s linear infinite;
//           animation-delay: 0.2s;
//         }

//         .longfazers span:nth-child(3) {
//           top: 35%;
//           animation: lf3 1.8s linear infinite;
//           animation-delay: 0.4s;
//         }

//         .longfazers span:nth-child(4) {
//           top: 45%;
//           animation: lf4 1.3s linear infinite;
//           animation-delay: 0.6s;
//         }

//         .longfazers span:nth-child(5) {
//           top: 55%;
//           animation: lf 1.6s linear infinite;
//           animation-delay: 0.1s;
//         }

//         .longfazers span:nth-child(6) {
//           top: 65%;
//           animation: lf2 1.4s linear infinite;
//           animation-delay: 0.3s;
//         }

//         .longfazers span:nth-child(7) {
//           top: 75%;
//           animation: lf3 1.7s linear infinite;
//           animation-delay: 0.5s;
//         }

//         .longfazers span:nth-child(8) {
//           top: 85%;
//           animation: lf4 1.5s linear infinite;
//           animation-delay: 0.7s;
//         }

//         @keyframes fazer1 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -80px;
//             opacity: 0;
//           }
//         }

//         @keyframes fazer2 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -100px;
//             opacity: 0;
//           }
//         }

//         @keyframes fazer3 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -50px;
//             opacity: 0;
//           }
//         }

//         @keyframes fazer4 {
//           0% {
//             left: 0;
//           }
//           100% {
//             left: -150px;
//             opacity: 0;
//           }
//         }

//         @keyframes speeder {
//           0% {
//             transform: translate(2px, 1px) rotate(0deg);
//           }
//           10% {
//             transform: translate(-1px, -3px) rotate(-1deg);
//           }
//           20% {
//             transform: translate(-2px, 0px) rotate(1deg);
//           }
//           30% {
//             transform: translate(1px, 2px) rotate(0deg);
//           }
//           40% {
//             transform: translate(1px, -1px) rotate(1deg);
//           }
//           50% {
//             transform: translate(-1px, 3px) rotate(-1deg);
//           }
//           60% {
//             transform: translate(-1px, 1px) rotate(0deg);
//           }
//           70% {
//             transform: translate(3px, 1px) rotate(-1deg);
//           }
//           80% {
//             transform: translate(-2px, -1px) rotate(1deg);
//           }
//           90% {
//             transform: translate(2px, 1px) rotate(0deg);
//           }
//           100% {
//             transform: translate(1px, -2px) rotate(-1deg);
//           }
//         }

//         @keyframes lf {
//           0% {
//             left: 100%;
//             opacity: 0;
//           }
//           10% {
//             opacity: 0.3;
//           }
//           90% {
//             opacity: 0.3;
//           }

//           100% {
//             left: -100%;
//             opacity: 0;
//           }
//         }

//         @keyframes lf2 {
//           0% {
//             left: 100%;
//             opacity: 0;
//           }
//           15% {
//             opacity: 0.3;
//           }
//           85% {
//             opacity: 0.3;
//           }
//           100% {
//             left: -100%;
//             opacity: 0;
//           }
//         }

//         @keyframes lf3 {
//           0% {
//             left: 100%;
//             opacity: 0;
//           }
//           20% {
//             opacity: 0.3;
//           }
//           80% {
//             opacity: 0.3;
//           }
//           100% {
//             left: -100%;
//             opacity: 0;
//           }
//         }

//         @keyframes lf4 {
//           0% {
//             left: 100%;
//             opacity: 0;
//           }
//           5% {
//             opacity: 0.3;
//           }
//           95% {
//             opacity: 0.3;
//           }
//           100% {
//             left: -100%;
//             opacity: 0;
//           }
//         }

//         /* Responsive adjustments */
//         @media (max-width: 640px) {
//           .superman-body {
//             margin-left: -40px;
//           }
          
//           .superman-body > span {
//             width: 25px;
//             height: 4px;
//           }
          
//           .base span {
//             border-right-width: 80px;
//           }
          
//           .base span:before {
//             height: 18px;
//             width: 18px;
//             right: -90px;
//           }
          
//           .base span:after {
//             border-right-width: 45px;
//             right: -80px;
//           }
          
//           .face {
//             right: -100px;
//           }
          
//           .superman-body > span > span {
//             animation-duration: 0.3s !important;
//           }
          
//           .longfazers span {
//             height: 0.5px;
//             opacity: 0.2;
//           }
//         }

//         @media (max-width: 480px) {
//           .superman-body {
//             margin-left: -35px;
//             transform: scale(0.6);
//           }
          
//           .longfazers span {
//             animation-duration: 1s !important;
//           }
//         }

//         @media (min-width: 768px) {
//           .longfazers span {
//             height: 1.5px;
//             opacity: 0.25;
//           }
//         }

//         @media (min-width: 1024px) {
//           .longfazers span {
//             height: 2px;
//             opacity: 0.2;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Loading;

