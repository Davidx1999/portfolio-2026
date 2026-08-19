import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseSplitMedia({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || (!block.mediaLeft && !block.mediaRight)) return null;

  const captionLeft = resolveLocalized(language === 'en' && block.captionLeft_en ? block.captionLeft_en : block.captionLeft, language);
  const captionRight = resolveLocalized(language === 'en' && block.captionRight_en ? block.captionRight_en : block.captionRight, language);
  const isLight = block.theme === 'light';

  const colLeftClass =
    block.ratio === '60-40'
      ? 'lg:col-span-7'
      : block.ratio === '40-60'
      ? 'lg:col-span-5'
      : 'lg:col-span-6';

  const colRightClass =
    block.ratio === '60-40'
      ? 'lg:col-span-5'
      : block.ratio === '40-60'
      ? 'lg:col-span-7'
      : 'lg:col-span-6';

  return (
    <section
      className={`w-full py-12 md:py-20 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Mídia Esquerda */}
          {block.mediaLeft && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASING }}
              className={colLeftClass}
            >
              <div className="aspect-[4/3] rounded-[16px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-lg">
                <img
                  src={block.mediaLeft}
                  alt={captionLeft || 'Split media left'}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {captionLeft && (
                <span className="font-mono text-[11px] text-[#F4F3EE]/50 uppercase tracking-wider block mt-3">
                  {captionLeft}
                </span>
              )}
            </motion.div>
          )}

          {/* Mídia Direita */}
          {block.mediaRight && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASING }}
              className={colRightClass}
            >
              <div className="aspect-[4/3] rounded-[16px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-lg">
                <img
                  src={block.mediaRight}
                  alt={captionRight || 'Split media right'}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {captionRight && (
                <span className="font-mono text-[11px] text-[#F4F3EE]/50 uppercase tracking-wider block mt-3">
                  {captionRight}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CaseSplitMedia;
