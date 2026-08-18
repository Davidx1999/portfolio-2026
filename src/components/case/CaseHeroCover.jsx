import React from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * CaseHeroCover
 * Hero visual sticky contido estritamente na seção de topo do case.
 * - Altura: calc(100svh - var(--header-safe-offset))
 * - position: sticky dentro do container da hero (sem position fixed global)
 * - Mídia com object-fit: cover, sem ruído, textura ou glow
 * - Respeita prefers-reduced-motion e não vaza para outras seções
 */
export function CaseHeroCover({ caseStudy }) {
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const heroMedia = caseStudy.heroMedia || {};
  const isVideo = heroMedia.mediaType === 'video' && heroMedia.videoUrl;
  const mediaSrc = isVideo ? heroMedia.videoUrl : heroMedia.image || caseStudy.coverImage;
  const altText = heroMedia.alt || caseStudy.title || 'Case Cover Media';

  if (!mediaSrc) return null;

  return (
    <section
      aria-label="Capa Visual do Projeto"
      className="sticky w-full z-0 overflow-hidden bg-[#151613]"
      style={{
        top: 'var(--header-safe-offset, 72px)',
        height: 'calc(100svh - var(--header-safe-offset, 72px))',
      }}
    >
      {isVideo ? (
        <video
          src={mediaSrc}
          poster={heroMedia.poster}
          autoPlay={prefersReducedMotion ? false : heroMedia.autoplay ?? true}
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center block"
        />
      ) : (
        <img
          src={mediaSrc}
          alt={altText}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-top filter saturate-[0.98] contrast-[1.02] block"
        />
      )}
    </section>
  );
}

export default CaseHeroCover;
