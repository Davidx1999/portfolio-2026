import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseFullMedia({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || (!block.image && !block.videoUrl)) return null;

  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const rawAlt = language === 'en' && block.alt_en ? block.alt_en : block.alt || caption || 'Case media';
  const alt = resolveLocalized(rawAlt, language);
  const isVideo = block.mediaType === 'video' && block.videoUrl;
  const isLight = block.theme === 'light';

  const aspectClass =
    block.aspectRatio === '21/9'
      ? 'aspect-[21/9]'
      : block.aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : block.aspectRatio === 'auto'
      ? 'aspect-auto'
      : 'aspect-[16/9]';

  return (
    <section
      className={`w-full py-12 md:py-20 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="w-full"
        >
          <div
            className={`w-full ${aspectClass} rounded-[16px] md:rounded-[20px] overflow-hidden border ${
              isLight ? 'border-[#10110F]/15 bg-white' : 'border-[rgba(244,243,238,0.18)] bg-[#151613]'
            } shadow-xl relative`}
          >
            {isVideo ? (
              <video
                src={block.videoUrl}
                poster={block.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={block.image}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover object-top filter saturate-[0.98] contrast-[1.02]"
              />
            )}
          </div>

          {caption && (
            <div className="mt-3.5 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#F4F3EE]/50 uppercase tracking-wider">
              <span>{caption}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseFullMedia;
