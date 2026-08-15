import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseTextSection({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block) return null;

  const eyebrow = language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow;
  const title = language === 'en' && block.title_en ? block.title_en : block.title;
  const body = language === 'en' && block.body_en ? block.body_en : block.body;
  const isCenter = block.alignment === 'center';
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
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: EASING }}
          className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}
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
            <h2 className="font-serif text-[1.85rem] sm:text-[2.35rem] lg:text-[2.85rem] font-normal leading-[1.12] tracking-tight mb-6">
              {title}
            </h2>
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
    </section>
  );
}

export default CaseTextSection;
