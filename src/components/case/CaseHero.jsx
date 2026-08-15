import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseHero({ caseStudy }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const projectTypeLabels = {
    professionalProject: {
      pt: 'PROJETO PROFISSIONAL',
      en: 'PROFESSIONAL PROJECT',
      es: 'PROYECTO PROFESIONAL',
    },
    clientProject: {
      pt: 'PROJETO PARA CLIENTE',
      en: 'CLIENT PROJECT',
      es: 'PROYECTO PARA CLIENTE',
    },
    independentStudy: {
      pt: 'ESTUDO INDEPENDENTE',
      en: 'INDEPENDENT STUDY',
      es: 'ESTUDIO INDEPENDIENTE',
    },
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

  return (
    <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ============================================================ */}
        {/* CABEÇALHO EDITORIAL DO CASE                                  */}
        {/* ============================================================ */}
        <div className="max-w-4xl mb-10 md:mb-14">
          {/* Eyebrow */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASING }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C4FF00]">
              CASE STUDY // {typeLabel}
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASING }}
            className="font-serif text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.75rem] font-normal leading-[1.02] tracking-tight text-[#FAFAF7] mb-6"
          >
            {caseStudy.title}
          </motion.h1>

          {/* Resumo da Hero */}
          {summary && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASING }}
              className="font-sans text-base sm:text-lg lg:text-xl text-[#F4F3EE]/80 leading-relaxed max-w-3xl"
            >
              {summary}
            </motion.p>
          )}
        </div>

        {/* ============================================================ */}
        {/* GRID DE METADADOS ESTRUTURADOS                                */}
        {/* ============================================================ */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASING }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 md:py-8 border-y border-[rgba(244,243,238,0.16)] font-mono text-xs mb-10 md:mb-14"
        >
          {/* Período */}
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'PERIOD' : 'PERÍODO'}
            </span>
            <span className="text-[#FAFAF7] font-medium">{caseStudy.period || '2024'}</span>
          </div>

          {/* Contexto / Cliente */}
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
            <span className="text-[#FAFAF7] font-medium">
              {caseStudy.clientOrContext || 'Digital Product'}
            </span>
          </div>

          {/* Função */}
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'ROLE' : 'FUNÇÃO'}
            </span>
            <span className="text-[#FAFAF7] font-medium">{caseStudy.role || 'Product Designer'}</span>
          </div>

          {/* Disciplinas / Link */}
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'DISCIPLINES' : 'DISCIPLINAS'}
            </span>
            <div className="flex flex-wrap gap-1 text-[#FAFAF7]/90 font-sans text-xs">
              {disciplines.slice(0, 3).join(' · ')}
              {disciplines.length > 3 && ` +${disciplines.length - 3}`}
            </div>
            {caseStudy.externalUrl && (
              <a
                href={caseStudy.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#C4FF00] hover:underline mt-1 font-mono text-[10px] uppercase font-bold"
              >
                <span>{language === 'en' ? 'Live Project' : 'Acessar Link'}</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* MÍDIA PRINCIPAL DA HERO (FRAME LIMPO SEM RUÍDO)              */}
        {/* ============================================================ */}
        {mediaSrc && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[18px] md:rounded-[24px] overflow-hidden border border-[rgba(244,243,238,0.2)] bg-[#151613] shadow-2xl relative"
          >
            {isVideo ? (
              <video
                src={mediaSrc}
                poster={heroMedia.poster}
                autoPlay={heroMedia.autoplay ?? true}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={mediaSrc}
                alt={heroMedia.alt || caseStudy.title}
                className="w-full h-full object-cover object-top filter saturate-[0.98] contrast-[1.02]"
              />
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}

export default CaseHero;
