import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

// Individual layer within the vertical stack
function StackLayer({ item, index, total, scrollYProgress, isLight, isReduced }) {
  const { language } = useLanguage();

  // Divide the scroll progress (0 to 1) into segments for N items
  // Peak for item i happens at progress = (i + 0.5) / total
  const segment = 1 / total;
  const centerProgress = (index + 0.5) * segment;

  // Window where this layer is among the 3 active layers: [center - segment, center + segment]
  const enterStart = Math.max(0, centerProgress - segment);
  const exitEnd = Math.min(1, centerProgress + segment);

  // Next image entering from below: translateY 18vh -> 0, scale 0.92 -> 1, opacity 0.35 -> 1
  // Image at center: translateY 0, scale 1, opacity 1
  // Active image retreating back: translateY 0 -> -7vh, scale 1 -> 0.86, opacity 1 -> 0.18
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, enterStart - segment * 0.2), enterStart, centerProgress, exitEnd, Math.min(1, exitEnd + segment * 0.2)],
    ['18vh', '12vh', '0vh', '-7vh', '-12vh']
  );

  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, enterStart - segment * 0.2), enterStart, centerProgress, exitEnd, Math.min(1, exitEnd + segment * 0.2)],
    [0.88, 0.92, 1, 0.86, 0.82]
  );

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, enterStart - segment * 0.1), enterStart, centerProgress, exitEnd, Math.min(1, exitEnd + segment * 0.1)],
    [0, 0.35, 1, 0.18, 0]
  );

  // Dynamic z-index so incoming and active cards stack in proper depth order
  const zIndex = useTransform(scrollYProgress, (progress) => {
    const diff = Math.abs(progress - centerProgress);
    return Math.round(50 - diff * 40);
  });

  const caption = language === 'en' && item.caption_en ? item.caption_en : item.caption;
  const supportingText =
    language === 'en' && item.supportingText_en ? item.supportingText_en : item.supportingText;

  if (isReduced) {
    return (
      <div className="w-full flex flex-col mb-10">
        <div className="w-full aspect-[16/10] rounded-[18px] overflow-hidden border border-white/15 bg-[#151613] shadow-xl">
          <img src={item.media} alt={caption || 'Stack item'} className="w-full h-full object-cover" />
        </div>
        {caption && (
          <div className="mt-3 flex items-center justify-between font-mono text-xs text-[#FAFAF7]">
            <span className="font-bold">{caption}</span>
            {supportingText && <span className="text-white/50 text-[11px]">{supportingText}</span>}
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center pointer-events-none"
    >
      <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-[rgba(244,243,238,0.22)] bg-[#151613] shadow-2xl">
        <img
          src={item.media}
          alt={caption || `Stack item ${index + 1}`}
          className="w-full h-full object-cover filter saturate-[0.98] contrast-[1.02]"
        />

        {/* Legend Overlay */}
        {(caption || supportingText) && (
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between font-mono text-xs text-[#FAFAF7]">
            <div>
              <span className="text-[#C4FF00] font-bold block mb-0.5">{caption}</span>
              {supportingText && <p className="text-white/70 text-[11px] font-sans">{supportingText}</p>}
            </div>
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono">
              0{index + 1} / 0{total}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CaseVerticalMediaStack({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  if (!block || !Array.isArray(block.items) || block.items.length === 0) {
    return null;
  }

  const eyebrow = language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow;
  const opening =
    language === 'en' && block.openingStatement_en ? block.openingStatement_en : block.openingStatement;
  const closing =
    language === 'en' && block.closingStatement_en ? block.closingStatement_en : block.closingStatement;
  const isLight = block.theme === 'light';

  const items = block.items;
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const isReduced = prefersReducedMotion;

  // Calculate proportional scroll length: itemCount * 75svh
  // E.g., 5 items = 375svh, ensuring generous natural scroll
  const scrollHeightStyle = isReduced ? 'min-h-[100svh] py-16' : '';
  const calculatedHeight = `${Math.max(220, total * 75)}svh`;

  return (
    <section
      ref={containerRef}
      style={isReduced ? {} : { height: calculatedHeight }}
      className={`relative w-full ${scrollHeightStyle} border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div
        className={`${
          isReduced ? 'relative' : 'sticky top-0 h-[100svh] overflow-hidden'
        } w-full flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-10 lg:px-16`}
      >
        {/* Statement de Abertura */}
        <div className="w-full max-w-[1400px] mx-auto z-20">
          {eyebrow && (
            <span
              className={`font-mono text-xs font-bold uppercase tracking-[0.2em] block mb-2 ${
                isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
              }`}
            >
              {eyebrow}
            </span>
          )}
          {opening && (
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal leading-snug max-w-3xl">
              {opening}
            </h3>
          )}
        </div>

        {/* Palco da Pilha de Imagens (Suporta N itens mantendo no máximo 3 visíveis por frame) */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/10] my-auto z-10">
          {items.map((item, idx) => (
            <StackLayer
              key={item._key || `stack-${idx}`}
              item={item}
              index={idx}
              total={total}
              scrollYProgress={scrollYProgress}
              isLight={isLight}
              isReduced={isReduced}
            />
          ))}
        </div>

        {/* Statement de Fechamento */}
        {closing && (
          <div className="w-full max-w-[1400px] mx-auto text-right z-20">
            <p className="font-serif text-base sm:text-lg lg:text-xl text-[#F4F3EE]/75 max-w-2xl ml-auto">
              {closing}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CaseVerticalMediaStack;
