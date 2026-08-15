import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseStatement({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || (!block.statement && !block.statement_pt)) return null;

  const eyebrow = language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow;
  const statement =
    language === 'en' && block.statement_en
      ? block.statement_en
      : block.statement || block.statement_pt;
  const supportingText =
    language === 'en' && block.supportingText_en ? block.supportingText_en : block.supportingText;

  const isCenter = block.alignment === 'center';
  const isLight = block.theme === 'light';

  return (
    <section
      className={`w-full py-20 md:py-28 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className={`max-w-4xl ${isCenter ? 'mx-auto text-center' : ''}`}
        >
          {eyebrow && (
            <span
              className={`font-mono text-xs font-bold uppercase tracking-[0.2em] block mb-4 ${
                isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
              }`}
            >
              {eyebrow}
            </span>
          )}

          <p className="font-serif text-[1.85rem] sm:text-[2.5rem] lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight mb-6">
            “{statement}”
          </p>

          {supportingText && (
            <p
              className={`font-sans text-xs sm:text-sm md:text-base leading-relaxed ${
                isLight ? 'text-[#10110F]/70' : 'text-[#F4F3EE]/65'
              }`}
            >
              {supportingText}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseStatement;
