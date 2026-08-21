import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';
import { SmartVideoPlayer } from '../../common/SmartVideoPlayer';
import { isVideoMedia } from '../../../utils/mediaUtils';

export function CaseLaggedFullViewport({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    mass: 0.5,
  });

  const isSubtle = block?.lagPreset === 'subtle';
  const startY = isSubtle ? '6vh' : '10vh';
  const endY = isSubtle ? '-5vh' : '-8vh';

  const y = useTransform(smoothProgress, [0, 1], [startY, endY]);
  const scale = useTransform(smoothProgress, [0, 1], [1.06, 1]);

  if (!block || (!block.image && !block.videoUrl && !block.media && !block.videoFile)) return null;

  const headline = resolveLocalized(language === 'en' && block.headline_en ? block.headline_en : block.headline, language);
  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);

  const isVideo =
    block.mediaType === 'video' ||
    !!block.videoUrl ||
    !!block.videoFile ||
    isVideoMedia(block.media) ||
    isVideoMedia(block.image);

  const videoSrc = block.videoUrl || block.videoFile || (isVideo ? block.media || block.image : null);
  const imageSrc = block.image || block.media;
  const isLight = block.theme === 'light';
  const isReduced = prefersReducedMotion;

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-[100svh] overflow-hidden border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      } flex items-center justify-center`}
    >
      {/* Inner Media with Lagged Parallax Transform */}
      <motion.div
        style={isReduced ? {} : { y, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        {isVideo && videoSrc ? (
          <SmartVideoPlayer
            src={videoSrc}
            poster={block.poster}
            autoplay={true}
            muted={true}
            loop={true}
            showControls={false}
            title={headline || caption || 'Full viewport video'}
            className="w-full h-full"
          />
        ) : (
          <img
            src={imageSrc}
            alt={headline || caption || 'Full viewport media'}
            loading="lazy"
            className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02]"
          />
        )}

        {/* Subtle Dark Vignette for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/80 via-transparent to-[#10110F]/40" />
      </motion.div>

      {/* Overlaid Headline & Metadata Container */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 min-h-[100svh] flex flex-col justify-between py-16 sm:py-20 pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
          <span>FULL VIEWPORT SCENE</span>
        </div>

        {headline && (
          <div className="max-w-3xl pointer-events-auto">
            <h3 className="font-serif text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-normal leading-[1.06] tracking-tight text-white drop-shadow-lg">
              {headline}
            </h3>
          </div>
        )}

        {caption && (
          <div className="flex items-center justify-between font-mono text-[11px] text-[#F4F3EE]/70 uppercase tracking-wider">
            <span>{caption}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
          </div>
        )}
      </div>
    </section>
  );
}

export default CaseLaggedFullViewport;
