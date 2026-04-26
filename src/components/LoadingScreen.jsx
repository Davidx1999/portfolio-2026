import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#000000] flex items-center justify-center"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        {/* Background silhouette (dim) - Midnight Black feel */}
        <img
          src={`${import.meta.env.BASE_URL}Union.svg`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain opacity-[0.1]"
          style={{ filter: 'brightness(0) saturate(100%)' }}
        />

        {/* Filling mask — clip-path animated from bottom to top */}
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="absolute inset-0"
        >
          <img
            src={`${import.meta.env.BASE_URL}Union.svg`}
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(151%) hue-rotate(182deg) brightness(101%) contrast(97%)' }} /* Chill White #f8f8f8 approx */
          />
        </motion.div>

        {/* Glow pulse after fill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.9, 1.15, 1.2] }}
          transition={{ duration: 0.8, delay: 1.8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={`${import.meta.env.BASE_URL}Union.svg`}
            alt=""
            className="w-full h-full object-contain invert opacity-30 blur-md"
          />
        </motion.div>
      </div>

      {/* Subtle text below */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-12 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500"
      >
        David Salviano
      </motion.span>
    </motion.div>
  );
}
