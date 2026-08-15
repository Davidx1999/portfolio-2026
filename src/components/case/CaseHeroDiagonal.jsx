import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function CaseHeroDiagonal({ caseStudy }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  if (!caseStudy) return null;

  const projectTypeLabels = {
    professionalProject: { pt: 'PROJETO PROFISSIONAL', en: 'PROFESSIONAL PROJECT', es: 'PROYECTO PROFESIONAL' },
    clientProject: { pt: 'PROJETO PARA CLIENTE', en: 'CLIENT PROJECT', es: 'PROYECTO PARA CLIENTE' },
    independentStudy: { pt: 'ESTUDO INDEPENDENTE', en: 'INDEPENDENT STUDY', es: 'ESTUDIO INDEPENDIENTE' },
  };

  const typeLabel =
    projectTypeLabels[caseStudy.projectType]?.[language] ||
    projectTypeLabels.professionalProject[language] ||
    'CASE STUDY';

  const summary =
    language === 'en' && caseStudy.heroSummary_en
      ? caseStudy.heroSummary_en
      : caseStudy.heroSummary || caseStudy.description;

  const disciplines = Array.isArray(caseStudy.disciplines)
    ? caseStudy.disciplines
    : ['Product Design', 'UX/UI Design', 'Design Systems'];

  const heroMedia = caseStudy.heroMedia || {};
  const isVideo = heroMedia.mediaType === 'video' && heroMedia.videoUrl;
  const mediaSrc = isVideo ? heroMedia.videoUrl : heroMedia.image || caseStudy.coverImage;

  // Scroll Progress across 240svh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 3D "Sheet Opening" (Folha Abrindo com rotateX)
  // 0%–12%: Media is below viewport (y: 90vh, rotateX: 78deg, scale: 0.55, radius: 28)
  // 12%–28%: Top edge enters in 3D perspective (y: 56vh, rotateX: 72deg, scale: 0.62, radius: 26)
  // 28%–52%: Sheet opens with deep foreshortening (y: 24vh, rotateX: 48deg, scale: 0.76, radius: 20)
  // 52%–74%: Approaches frontal plane (y: 7vh, rotateX: 18deg, scale: 0.92, radius: 10)
  // 74%–84%: Fully open frontal 100vw × 100svh (y: 0, rotateX: 0, scale: 1, radius: 0)
  // 84%–100%: Holds full viewport before next section
  const mediaY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.52, 0.74, 0.84, 1],
    ['90vh', '90vh', '56vh', '24vh', '7vh', '0vh', '0vh']
  );

  const mediaRotateX = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.52, 0.74, 0.84, 1],
    [78, 78, 72, 48, 18, 0, 0]
  );

  const mediaScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.52, 0.74, 0.84, 1],
    [0.55, 0.55, 0.62, 0.76, 0.92, 1, 1]
  );

  const mediaRadius = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.52, 0.74, 0.84, 1],
    [28, 28, 26, 20, 10, 0, 0]
  );

  // Text Transition:
  // 0%–30%: text full opacity
  // 30%–55%: text fades opacity 1 → 0 and translates up
  // 55%+: text is gone
  const textOpacity = useTransform(scrollYProgress, [0, 0.30, 0.55], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.30, 0.55], ['0px', '0px', '-40px']);

  const isReduced = prefersReducedMotion || heroMedia.enableDiagonalHeroReveal === false;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isReduced ? 'min-h-[100svh]' : 'min-h-[240svh]'} bg-[#10110F] text-[#FAFAF7] select-none`}
    >
      {/* Sticky Full-Viewport Stage with 3D Perspective (1200px) */}
      <div
        style={isReduced ? {} : { perspective: '1200px' }}
        className={`${
          isReduced
            ? 'relative w-full min-h-[100svh] py-20'
            : 'sticky top-0 w-full h-[100svh] overflow-hidden'
        } flex flex-col justify-between`}
      >
        {/* ============================================================ */}
        {/* 1. CABEÇALHO & METADADOS DA HERO (Fades out 30% -> 55%)      */}
        {/* ============================================================ */}
        <motion.div
          style={isReduced ? {} : { opacity: textOpacity, y: textY }}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 md:pt-24 pointer-events-auto"
        >
          <div className="max-w-4xl mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C4FF00]">
                CASE STUDY // {typeLabel}
              </span>
            </div>

            <h1 className="font-serif text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.75rem] font-normal leading-[1.02] tracking-tight text-[#FAFAF7] mb-5">
              {caseStudy.title}
            </h1>

            {summary && (
              <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/80 leading-relaxed max-w-3xl mb-6">
                {summary}
              </p>
            )}
          </div>

          {/* Grid de Metadados Rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-y border-[rgba(244,243,238,0.16)] font-mono text-xs">
            <div>
              <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
                {language === 'en' ? 'PERIOD' : 'PERÍODO'}
              </span>
              <span className="text-[#FAFAF7] font-medium">{caseStudy.period || '2021—2026'}</span>
            </div>

            <div>
              <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
                {caseStudy.projectType === 'independentStudy'
                  ? language === 'en'
                    ? 'CONTEXT'
                    : 'CONTEXTO'
                  : language === 'en'
                  ? 'CLIENT / CONTEXT'
                  : 'CLIENTE / CONTEXTO'}
              </span>
              <span className="text-[#FAFAF7] font-medium">{caseStudy.clientOrContext || 'FGV DGPE · CEnPE / UFC'}</span>
            </div>

            <div>
              <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
                {language === 'en' ? 'ROLE' : 'FUNÇÃO'}
              </span>
              <span className="text-[#FAFAF7] font-medium">{caseStudy.role || 'Lead Product Designer'}</span>
            </div>

            <div>
              <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
                {language === 'en' ? 'DISCIPLINES' : 'DISCIPLINAS'}
              </span>
              <div className="flex flex-wrap gap-1 text-[#FAFAF7]/90 font-sans text-xs">
                {disciplines.slice(0, 3).join(' · ')}
                {disciplines.length > 3 && ` +${disciplines.length - 3}`}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. MÍDIA COMO FOLHA 3D ABRINDO (rotateX + 100vw × 100svh)    */}
        {/* ============================================================ */}
        {mediaSrc && (
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <motion.div
              style={
                isReduced
                  ? {}
                  : {
                      y: mediaY,
                      rotateX: mediaRotateX,
                      scale: mediaScale,
                      borderRadius: mediaRadius,
                      transformOrigin: '50% 100%',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform, border-radius',
                    }
              }
              className={`absolute inset-0 w-full h-full overflow-hidden ${
                isReduced
                  ? 'rounded-[20px] aspect-[16/9] md:aspect-[21/9] max-w-[1400px] mx-auto relative mt-8'
                  : 'shadow-2xl'
              } border border-[rgba(244,243,238,0.18)] bg-[#151613]`}
            >
              {isVideo ? (
                <video
                  src={mediaSrc}
                  poster={heroMedia.poster}
                  autoPlay={heroMedia.autoplay ?? true}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover block"
                />
              ) : (
                <img
                  src={mediaSrc}
                  alt={heroMedia.alt || caseStudy.title}
                  className="w-full h-full object-cover object-top filter saturate-[0.98] contrast-[1.02] block"
                />
              )}
            </motion.div>
          </div>
        )}

        {/* Indicador Discreto de Scroll na Abertura */}
        {!isReduced && (
          <motion.div
            style={{ opacity: textOpacity }}
            className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-6 flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-white/50"
          >
            <span>{language === 'en' ? 'SCROLL TO EXPLORE' : 'ROLE PARA EXPLORAR'}</span>
            <ArrowDown size={12} className="animate-bounce text-[#C4FF00]" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CaseHeroDiagonal;
