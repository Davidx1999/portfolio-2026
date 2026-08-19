import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

export function CaseDiagonalMediaScene({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    mass: 0.5,
  });

  // Calculate coordinates based on directionPreset
  const preset = block?.directionPreset || 'topLeftToCenter';
  let startX = '-28vw';
  let startY = '18vh';
  let endX = '28vw';
  let endY = '-18vh';

  if (preset === 'topRightToCenter') {
    startX = '28vw';
    startY = '18vh';
    endX = '-28vw';
    endY = '-18vh';
  } else if (preset === 'bottomLeftToCenter') {
    startX = '-28vw';
    startY = '-18vh';
    endX = '28vw';
    endY = '18vh';
  } else if (preset === 'bottomRightToCenter') {
    startX = '28vw';
    startY = '-18vh';
    endX = '-28vw';
    endY = '18vh';
  }

  // 0%-25% Enter -> 25%-60% Hold -> 60%-85% Exit -> 85%-100% Clear
  const scale = useTransform(smoothProgress, [0, 0.25, 0.6, 0.85, 1], [0.15, 1, 1, 0.15, 0]);
  const x = useTransform(smoothProgress, [0, 0.25, 0.6, 0.85, 1], [startX, '0vw', '0vw', endX, endX]);
  const y = useTransform(smoothProgress, [0, 0.25, 0.6, 0.85, 1], [startY, '0vh', '0vh', endY, endY]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.85, 0.95], [0.2, 1, 1, 0]);

  if (!block || !block.media) return null;

  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const isLight = block.theme === 'light';
  const isReduced = prefersReducedMotion;

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        isReduced ? 'min-h-[70vh] py-16' : 'h-[220vh]'
      } border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      {/* Sticky Full-Viewport Window */}
      <div className={`${isReduced ? 'relative' : 'sticky top-0 h-[100svh] overflow-hidden'} w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16`}>
        
        {/* Destination Frame (se ativo) */}
        <div className="relative w-full max-w-5xl aspect-[16/10] flex items-center justify-center">
          {block.showDestinationFrame && (
            <div
              className={`absolute inset-0 rounded-[20px] border-2 ${
                block.frameColor === 'lime'
                  ? 'border-[#C4FF00]/50'
                  : block.frameColor === 'white'
                  ? 'border-white/20'
                  : 'border-black/20'
              } pointer-events-none z-0`}
            />
          )}

          {/* Mídia Diagonal Animada */}
          <motion.div
            style={isReduced ? {} : { scale, x, y, opacity }}
            className="w-full h-full rounded-[18px] overflow-hidden border border-[rgba(244,243,238,0.2)] bg-[#151613] shadow-2xl z-10"
          >
            <img
              src={block.media}
              alt={caption || 'Diagonal Media Scene'}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {caption && (
          <div className="max-w-5xl w-full mt-4 flex items-center justify-between font-mono text-[11px] text-[#F4F3EE]/50 uppercase tracking-wider">
            <span>{caption}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
          </div>
        )}

      </div>
    </section>
  );
}

export default CaseDiagonalMediaScene;
