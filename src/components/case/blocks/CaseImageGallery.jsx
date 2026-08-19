import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseImageGallery
 * Galeria de imagens responsiva com legendas individuais e proteção contra layout shifts.
 */
export function CaseImageGallery({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.images) || block.images.length === 0) {
    return null;
  }

  const eyebrow = resolveLocalized(language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow, language);
  const title = resolveLocalized(language === 'en' && block.title_en ? block.title_en : block.title, language);
  const isLight = block.theme === 'light';

  const gridColsClass =
    block.columns === '4'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : block.columns === '3'
      ? 'grid-cols-1 md:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';

  return (
    <section
      className={`w-full py-14 md:py-20 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Cabeçalho da Galeria (opcional) */}
        {(eyebrow || title) && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASING }}
            className="max-w-3xl mb-8 md:mb-12"
          >
            {eyebrow && (
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-2">
                {eyebrow}
              </span>
            )}
            {title && (
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">
                {title}
              </h3>
            )}
          </motion.div>
        )}

        {/* Grid de Imagens */}
        <div className={`grid ${gridColsClass} gap-6 md:gap-8 items-start`}>
          {block.images.map((item, idx) => {
            const caption = resolveLocalized(language === 'en' && item.caption_en ? item.caption_en : item.caption, language);
            const rawAlt = language === 'en' && item.alt_en ? item.alt_en : item.alt || caption || `Galeria foto ${idx + 1}`;
            const alt = resolveLocalized(rawAlt, language);
            
            const aspectClass =
              item.aspectRatio === '16/9'
                ? 'aspect-[16/9]'
                : item.aspectRatio === '4/3'
                ? 'aspect-[4/3]'
                : item.aspectRatio === '1/1'
                ? 'aspect-square'
                : item.aspectRatio === 'auto'
                ? 'aspect-auto'
                : 'aspect-[16/10]';

            return (
              <motion.div
                key={item._key || idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: EASING }}
                className="flex flex-col"
              >
                <div
                  className={`w-full ${aspectClass} rounded-[16px] overflow-hidden border ${
                    isLight ? 'border-[#10110F]/15 bg-white' : 'border-[rgba(244,243,238,0.16)] bg-[#151613]'
                  } shadow-md group`}
                >
                  <img
                    src={item.image}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-103"
                  />
                </div>

                {caption && (
                  <span className="font-mono text-[11px] text-[#F4F3EE]/50 uppercase tracking-wider mt-3 block">
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

export default CaseImageGallery;
