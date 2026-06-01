import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const showEnterButton = false; // Set to true to hold the screen with a manual Enter button

  useEffect(() => {
    const duration = 2500; // Simulated loading time: 2.5 seconds
    const intervalTime = 30; // Update ~33 times per second for smooth rendering
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !showEnterButton) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // 500ms delay after reaching 100% for user satisfaction
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete, showEnterButton]);

  const handleEnter = () => {
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#000000] overflow-hidden select-none"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}assets//BG/LoadingScreen16por9.png`}
          alt=""
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Loading Content Box, anchored at exactly 50vh (viewport center) */}
      <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-56 z-10 flex flex-col items-center w-full max-w-[640px] px-6">

        {/* Name Logo: Semi-opaque base + full-color fill layer, shifted up by half its height to align center to 50vh */}
        <div className="relative w-[280px] md:w-[640px] lg:w-[480px]">

          {/* Logo aligned to top-right of the /David/my_name.png wrapper */}
          <div className="absolute top-0 right-0 z-20">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt="Logo"
              className="h-8 md:h-10 w-auto object-contain pointer-events-none select-none"
            />
          </div>

          {/* Base Layer: Semi-opaque */}
          <img
            src={`${import.meta.env.BASE_URL}assets//David/my_name.png`}
            alt="David Salviano"
            className="w-full h-auto block opacity-25 pointer-events-none select-none"
          />

          {/* Fill Layer: Animates clip-path from bottom (100%) to top (0%) directly on the overlayed image */}
          <img
            src={`${import.meta.env.BASE_URL}assets//David/my_name.png`}
            alt="David Salviano"
            className="absolute top-0 left-0 w-full h-full block pointer-events-none select-none transition-all duration-100 ease-out"
            style={{ clipPath: `inset(${(100 - progress).toFixed(1)}% 0 0 0)` }}
          />
        </div>

        {/* Text Loading Progress Indicator: Loading + continuous line + porcentagem (40px below logo container) */}
        <div className="flex items-center gap-4 font-mono text-[16px] md:text-xs tracking-[0.2em] text-neutral-carvao uppercase mt-[40px]">
          <span className="font-bold opacity-80 text-[14px]">Loading</span>

          <div className="relative w-56 md:w-80 h-[2px] bg-neutral-carvao select-none">
            {/* The single solid growth bar of 4px height in color #C8E63C, vertically centered */}
            <div
              className="absolute left-0 h-[8px] bg-tertiary -top-[3px] transition-all duration-100 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="min-w-[4ch] text-right font-bold text-[14px]">{Math.round(progress)}%</span>
        </div>

        {/* Subtitle: "Designing with purpose • Building Meaningful Experiences" (80px below loading indicator) */}
        <div className="mt-[80px] font-semibold text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-carvao uppercase text-center flex items-center justify-center gap-2 whitespace-nowrap">
          <span>Designing with purpose</span>
          <span className="text-tertiary font-bold text-[16px]">•</span>
          <span>Building Meaningful Experiences</span>
        </div>

        {/* Conditional element: 8 ticks while loading, Enter button when complete (40px below the subtitle) */}
        <div className="mt-10 h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {progress < 100 ? (
              <motion.div
                key="ticks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[1.5px] h-4 bg-neutral-carvao"
                  />
                ))}
              </motion.div>
            ) : showEnterButton ? (
              <motion.button
                key="enter-button"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleEnter}
                className="bg-neutral-carvao text-tertiary px-8 py-3 rounded-full hover:brightness-90 hover:scale-105 active:scale-98 transition-all text-xs tracking-[0.25em] font-bold font-mono shadow-md uppercase cursor-pointer"
              >
                Enter Portfolio
              </motion.button>
            ) : (
              <motion.div
                key="ticks-completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[1.5px] h-4 bg-neutral-carvao"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}

