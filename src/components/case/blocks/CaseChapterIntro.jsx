import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseChapterIntro({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block) return null;

  const chapterNum = block.chapterNumber || '01';
  const title = language === 'en' && block.title_en ? block.title_en : block.title;
  const subtitle = language === 'en' && block.subtitle_en ? block.subtitle_en : block.subtitle;
  const summary = language === 'en' && block.summary_en ? block.summary_en : block.summary;
  const isLight = block.theme === 'light';

  return (
    <section
      className={`w-full py-20 md:py-28 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`font-mono text-xs font-bold uppercase tracking-[0.24em] ${
                isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
              }`}
            >
              CAPÍTULO {chapterNum} //
            </span>
            {subtitle && (
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                {subtitle}
              </span>
            )}
          </div>

          <h2 className="font-serif text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-normal leading-[1.04] tracking-tight mb-6">
            {title}
          </h2>

          {summary && (
            <p
              className={`font-sans text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl ${
                isLight ? 'text-[#10110F]/80' : 'text-[#F4F3EE]/75'
              }`}
            >
              {summary}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseChapterIntro;
