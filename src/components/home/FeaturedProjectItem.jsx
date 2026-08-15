import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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

  // Parallax suave
  const wallpaperY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

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
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden border-b border-white/10 select-none bg-[#10110F]"
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
          className={`w-full h-full object-cover transition-[filter,transform] duration-700 ease-out ${
            isHovered
              ? 'grayscale-0 contrast-[0.95] brightness-[0.72] scale-[1.02]'
              : 'grayscale contrast-[0.85] brightness-[0.6] scale-100'
          }`}
        />
        {/* Camada escura uniforme garantindo foco no objeto central */}
        <div className="absolute inset-0 bg-[#10110F]/45" />
      </motion.div>

      {/* ============================================================ */}
      {/* 2. OBJETO CENTRAL EXPANDIDO (10-15% MAIOR)                   */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : mediaY }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center py-16"
      >
        {/* Metadados do Projeto */}
        <div className="flex items-center gap-3 mb-3 text-[#F4F3EE]/80 font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
          <span>{number}</span>
          <span className="text-white/30">•</span>
          <span>{category}</span>
        </div>

        {/* Card Central com Reconstrução Modular */}
        <Link
          to={link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[20px] shadow-2xl overflow-hidden border border-white/20 group cursor-pointer ${
            isHovered
              ? 'w-[94vw] max-w-[940px] aspect-[16/10]'
              : 'w-[86vw] max-w-[760px] aspect-[16/10]'
          }`}
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

          {/* Legenda Direta e Botão de Ação */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between z-30 pointer-events-none">
            <div className="text-left max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F3EE] font-normal leading-tight">
                {title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/75 line-clamp-1 mt-1">
                {description}
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C7F000] group-hover:text-[#10110F] group-hover:border-[#C7F000]">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
