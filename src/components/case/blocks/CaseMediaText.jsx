import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseMediaText({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block) return null;

  const eyebrow = language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow;
  const title = language === 'en' && block.title_en ? block.title_en : block.title;
  const body = language === 'en' && block.body_en ? block.body_en : block.body;
  const isMediaRight = block.mediaPosition === 'right';
  const isLight = block.theme === 'light';

  return (
    <section
      className={`w-full py-16 md:py-24 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Coluna de Mídia */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASING }}
            className={`lg:col-span-6 ${isMediaRight ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="aspect-[4/3] rounded-[18px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-xl">
              {block.media && (
                <img
                  src={block.media}
                  alt={title || 'Media showcase'}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Coluna de Texto */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
            className={`lg:col-span-6 flex flex-col justify-center ${
              isMediaRight ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {eyebrow && (
              <span
                className={`font-mono text-xs font-bold uppercase tracking-[0.2em] block mb-3 ${
                  isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
                }`}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h3 className="font-serif text-[1.85rem] sm:text-[2.25rem] lg:text-[2.65rem] font-normal leading-[1.12] tracking-tight mb-5">
                {title}
              </h3>
            )}
            {body && (
              <p
                className={`font-sans text-sm sm:text-base lg:text-lg leading-relaxed ${
                  isLight ? 'text-[#10110F]/80' : 'text-[#F4F3EE]/75'
                }`}
              >
                {body}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CaseMediaText;
