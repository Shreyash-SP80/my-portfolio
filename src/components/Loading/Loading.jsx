import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FourSquare } from 'react-loading-indicators';

function Loading({ onLoadingComplete }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const loaderTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
  
    gsap.set(containerRef.current, { autoAlpha: 0 });
    gsap.set(contentRef.current.children, { autoAlpha: 0, y: 20 });

    // Animation sequence 
    tl.to(containerRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(contentRef.current.children, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    });

    // Typewriter effect for loader text
    const loaderText = "🛠️ Explore My Work...🛠️";
    let loaderIndex = 0;
    let timeoutId = null;
    
    const typeWriter = () => {
      if (loaderIndex < loaderText.length && loaderTextRef.current) {
        loaderTextRef.current.textContent = loaderText.substring(0, loaderIndex + 1);
        loaderIndex++;
        timeoutId = setTimeout(typeWriter, 100);
      } else {
        // After typewriter completes, animate the exit
        setTimeout(() => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (onLoadingComplete) {
                onLoadingComplete();
              }
            }
          });
          
          // Smooth exit animation
          exitTl.to(contentRef.current.children, {
            y: -20,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.in"
          })
          .to(containerRef.current, {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.4");
        }, 1000);
      }
    };
    
    // Start typewriter after initial animations
    timeoutId = setTimeout(typeWriter, 1000);
    
    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div ref={contentRef} className="text-center">
        {/* Logo */}
        <div className="mb-8 mx-auto rounded-full border-2 border-indigo-500 p-1.5 w-20 h-20">
          <img
            src="/logo/Mylogo.jpg"
            alt="Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="md:mb-9 sm:mb-6 text-2xl md:text-3xl font-bold text-purple-400"
        >
          Shreyash's Portfolio
        </h1>

        {/* Loader */}
        <div className="scale-100 sm:scale-125 md:scale-150">
          <FourSquare 
            color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
            size="large"
            text=""
            textColor="#e2e8f0"
          />
          <div 
            ref={loaderTextRef}
            className="mt-1 text-lg font-medium font-mono text-indigo-300"
          >
            {/* Typewriter fills text here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
