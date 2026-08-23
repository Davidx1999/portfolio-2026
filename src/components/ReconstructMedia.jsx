import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASING = [0.22, 1, 0.36, 1];

/**
 * ReconstructMedia
 *
 * Exibe a imagem de capa do projeto com efeito de zoom suave de 25% (scale: 1.25) no hover.
 */
export function ReconstructMedia({
  image,
  initialImage,
  finalImage,
  src,
  alt = 'Project media showcase',
  isHovered: controlledIsHovered,
  interactive = false,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  loading = 'lazy',
}) {
  const [internalHovered, setInternalHovered] = useState(false);
  const [isTouchRevealed, setIsTouchRevealed] = useState(false);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const isRevealed = controlledIsHovered !== undefined ? controlledIsHovered : (internalHovered || isTouchRevealed);

  // Normalização de imagem única com fallback
  const mediaSrc = image || src || initialImage || finalImage;

  // Touch observer para dispositivos móveis
  useEffect(() => {
    if (!interactive) return;
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (!isTouch || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setIsTouchRevealed(true);
        } else {
          setIsTouchRevealed(false);
        }
      },
      { threshold: [0.6] }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [interactive]);

  if (!mediaSrc) {
    return (
      <div className={`w-full h-full bg-[#10110F] flex items-center justify-center ${aspectRatio} ${className}`}>
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Sem Imagem</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerEnter={interactive ? () => setInternalHovered(true) : undefined}
      onPointerLeave={interactive ? () => setInternalHovered(false) : undefined}
      onFocus={interactive ? () => setInternalHovered(true) : undefined}
      onBlur={interactive ? () => setInternalHovered(false) : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`relative w-full h-full overflow-hidden select-none bg-[#10110F] ${aspectRatio} ${className} ${
        interactive ? 'focus-visible:outline-2 focus-visible:outline-[#C7F000] focus-visible:outline-offset-2' : ''
      }`}
      aria-label={alt}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        className="w-full h-full pointer-events-none"
        initial={false}
        animate={{
          scale: prefersReducedMotion ? 1 : isRevealed ? 1.25 : 1,
        }}
        transition={{
          duration: 0.65,
          ease: EASING,
        }}
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <img
          src={mediaSrc}
          alt={alt}
          loading={loading}
          className="w-full h-full object-cover select-none pointer-events-none block filter saturate-[0.98] contrast-[1.02]"
        />
      </motion.div>
    </div>
  );
}

export default ReconstructMedia;
