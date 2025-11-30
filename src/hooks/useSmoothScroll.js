// import { useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';

// export const useSmoothScroll = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       lerp: 0.1,
//       smooth: true,
//       direction: 'vertical',
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

// };


import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Create Lenis instance
    lenisRef.current = new Lenis({
      smooth: true,
      lerp: 0.05,          // adjust smoothness
      wheelMultiplier: 1.2 // improves desktop scroll feel
    });

    // Animation loop
    const raf = (time) => {
      lenisRef.current.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenisRef.current.destroy();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
};
