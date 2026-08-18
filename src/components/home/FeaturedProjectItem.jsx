import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { ReconstructMedia } from '../ReconstructMedia';

export function FeaturedProjectItem({
  number,
  title,
  category,
  description,
  link,
  wallpaperSrc,
  mediaThumbSrc,
  mediaExpandedSrc,
  onCursorChange,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  // Parallax suave do wallpaper de fundo
  const wallpaperY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%']);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onCursorChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onCursorChange?.(false);
  };

  return (
    <div
      ref={itemRef}
      className="relative w-full min-h-[76svh] sm:min-h-[100svh] flex items-center justify-center overflow-hidden border-b border-white/10 select-none bg-[#10110F]"
    >
      {/* ============================================================ */}
      {/* 1. WALLPAPER COM CONTRASTE REDUZIDO & ESCURECIMENTO SUTIL   */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : wallpaperY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        <img
          src={wallpaperSrc}
          alt={title}
          className={`w-full h-full object-cover transition-[filter,transform] duration-700 ease-out ${isHovered
              ? 'grayscale-0 contrast-[0.95] brightness-[0.72] scale-100'
              : 'grayscale contrast-[0.85] brightness-[0.6] scale-100'
            }`}
        />
        {/* Camada escura uniforme garantindo foco no objeto central */}
        <div className="absolute inset-0 bg-[#10110F]/45" />
      </motion.div>

      {/* ============================================================ */}
      {/* 2. OBJETO CENTRAL EXPANDIDO                                 */}
      {/* ============================================================ */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center py-8 sm:py-16"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Metadados do Projeto */}
        <div className="flex items-center gap-3 mb-2.5 sm:mb-3 text-[#F4F3EE]/80 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em]">
          <span>{number}</span>
          <span className="text-white/30">•</span>
          <span>{category}</span>
        </div>

        {/* Card Central com Reconstrução Modular */}
        <CurtainLink
          to={link}
          curtainTitle={title}
          className="relative block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[16px] sm:rounded-[20px] shadow-2xl overflow-hidden border border-white/20 group cursor-pointer w-[86vw] sm:w-[82vw] max-w-[820px] aspect-[4/3] sm:aspect-[16/10]"
          style={{ transform: isHovered ? 'scale(1)' : 'scale(0.97)' }}
        >
          {/* Mídia com Reconstrução da Estrutura ao Produto Final */}
          <div className="absolute inset-0 w-full h-full">
            <ReconstructMedia
              initialImage={mediaThumbSrc}
              finalImage={mediaExpandedSrc || mediaThumbSrc}
              alt={title}
              isHovered={isHovered}
              aspectRatio="w-full h-full"
            />
          </div>
        </CurtainLink>

        {/* Legenda e Descrição (Abaixo do Card) */}
        <div className="w-[82vw] max-w-[820px] mt-6 text-left">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F3EE] font-normal leading-tight transition-colors duration-300 group-hover:text-[#C7F000]">
            {title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/75 line-clamp-2 mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
