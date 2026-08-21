import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';
import { SmartVideoPlayer } from '../../common/SmartVideoPlayer';

const EASING = [0.22, 1, 0.36, 1];

export function CaseVideo({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block) return null;

  const videoSrc =
    block.videoUrl ||
    block.videoFile ||
    block.externalVideo ||
    block.video ||
    block.url ||
    block.media;

  if (!videoSrc) return null;

  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const showBorder = block.showBorder ?? block.hasBorder ?? true;

  const aspectClass =
    block.aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : block.aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : block.aspectRatio === '21/9'
      ? 'aspect-[21/9]'
      : 'aspect-[16/9]';

  return (
    <section className="w-full py-12 md:py-20 border-b border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="w-full"
        >
          <div
            className={`relative w-full ${aspectClass} rounded-[18px] overflow-hidden ${
              showBorder
                ? 'border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-2xl'
                : 'border-0 bg-transparent'
            } group`}
          >
            <SmartVideoPlayer
              src={videoSrc}
              poster={block.poster}
              autoplay={block.autoplay ?? true}
              muted={true}
              loop={block.loop ?? true}
              showControls={true}
              title={caption || 'Case Video'}
              className="w-full h-full"
            />
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

export default CaseVideo;

