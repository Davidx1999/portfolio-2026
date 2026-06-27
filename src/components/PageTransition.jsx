import React from 'react';
import { motion } from 'framer-motion';

export function PageTransition({ pathname }) {
  const getCleanPathName = () => {
    if (!pathname || pathname === '/') return 'HOME';
    const clean = pathname.replace('/', '').replace(/-/g, ' ');
    return clean.toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed inset-0 z-[150] bg-[#1A1A1A] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative flex flex-col items-center w-full max-w-xs px-6">
        {/* Header row: DS.PORTFOLIO + Name of the Page */}
        <div className="flex justify-between w-full font-mono text-[10px] sm:text-xs tracking-[0.22em] text-[#B6A9ED] uppercase font-semibold">
          <span>DS.PORTFOLIO</span>
          <span className="text-[#C8E63C]">{getCleanPathName()}</span>
        </div>
      </div>
    </motion.div>
  );
}
