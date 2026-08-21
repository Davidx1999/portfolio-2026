import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { SmartVideoPlayer } from '../common/SmartVideoPlayer';
import { isVideoMedia } from '../../utils/mediaUtils';

/**
 * CaseHeroCover
 * Hero visual sticky contido estritamente na seção de topo do case.
 * - Altura: calc(100svh - var(--header-safe-offset))
 * - position: sticky dentro do container da hero (sem position fixed global)
 * - Suporta vídeos .mp4 e links de vídeo (YouTube, Vimeo, etc.) via SmartVideoPlayer
 * - Mídia com object-fit: cover, sem ruído, textura ou glow
 * - Respeita prefers-reduced-motion e não vaza para outras seções
 */
export function CaseHeroCover({ caseStudy }) {
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const heroMedia = caseStudy.heroMedia || {};
  const isVideo =
    heroMedia.mediaType === 'video' ||
    !!heroMedia.videoUrl ||
    isVideoMedia(heroMedia.image || caseStudy.coverImage);

  const videoSrc = heroMedia.videoUrl || (isVideo ? heroMedia.image || caseStudy.coverImage : null);
  const mediaSrc = isVideo ? videoSrc : heroMedia.image || caseStudy.coverImage;
  const altText = heroMedia.alt || caseStudy.title || 'Case Cover Media';

  if (!mediaSrc) return null;

  return (
    <section
      aria-label="Capa Visual do Projeto"
      className="sticky w-full z-0 overflow-hidden bg-[#10110F]"
      style={{
        top: 'var(--header-height, 54px)',
        height: 'calc(100svh - var(--header-height, 54px) - clamp(110px, 14vh, 140px))',
      }}
    >
      {isVideo && videoSrc ? (
        <SmartVideoPlayer
          src={videoSrc}
          poster={heroMedia.poster || caseStudy.coverImage}
          autoplay={prefersReducedMotion ? false : heroMedia.autoplay ?? true}
          muted={true}
          loop={true}
          showControls={false}
          title={altText}
          className="w-full h-full"
        />
      ) : (
        <img
          src={mediaSrc}
          alt={altText}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] block"
        />
      )}
    </section>
  );
}

export default CaseHeroCover;
