import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseImageGrid({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.items) || block.items.length === 0) return null;

  const is3Cols = block.columns === '3';
  const isLight = block.theme === 'light';
  const showBorder = block.showBorder ?? block.hasBorder ?? true;

  return (
    <section
      className={`w-full py-14 md:py-20 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            is3Cols ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
          } gap-6 lg:gap-8`}
        >
          {block.items.map((item, idx) => {
            const caption = resolveLocalized(language === 'en' && item.caption_en ? item.caption_en : item.caption, language);
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASING }}
                className="flex flex-col"
              >
                <div
                  className={`aspect-[4/3] rounded-[16px] overflow-hidden ${
                    showBorder
                      ? `border ${isLight ? 'border-[#10110F]/15 bg-white' : 'border-[rgba(244,243,238,0.18)] bg-[#151613]'} shadow-lg`
                      : 'border-0 bg-transparent'
                  }`}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.alt || caption || `Grid item ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {caption && (
                  <span className="font-mono text-[11px] text-[#F4F3EE]/50 uppercase tracking-wider block mt-3">
                    {caption}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CaseImageGrid;
