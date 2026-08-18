import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseNextProject({ nextCase }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!nextCase || !nextCase.slug) return null;

  const title = nextCase.title || 'Next Project';
  const summary =
    language === 'en' && nextCase.heroSummary_en
      ? nextCase.heroSummary_en
      : nextCase.heroSummary || nextCase.description;

  const projectTypeLabels = {
    professionalProject: { pt: 'PROJETO PROFISSIONAL', en: 'PROFESSIONAL PROJECT', es: 'PROYECTO PROFESIONAL' },
    clientProject: { pt: 'PROJETO PARA CLIENTE', en: 'CLIENT PROJECT', es: 'PROYECTO PARA CLIENTE' },
    independentStudy: { pt: 'ESTUDO INDEPENDENTE', en: 'INDEPENDENT STUDY', es: 'ESTUDIO INDEPENDIENTE' },
  };

  const typeLabel =
    projectTypeLabels[nextCase.projectType]?.[language] ||
    projectTypeLabels.professionalProject[language] ||
    'CASE STUDY';

  const coverSrc = nextCase.coverImage || nextCase.image;

  return (
    <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block">
            {language === 'en' ? 'CONTINUE EXPLORING //' : 'CONTINUAR EXPLORANDO //'}
          </span>
        </div>

        <CurtainLink
          to={`/cases/${nextCase.slug}`}
          curtainTitle={title}
          className="group block relative w-full rounded-[22px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] hover:border-[#C4FF00]/60 transition-all duration-500 shadow-2xl p-8 sm:p-12 lg:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda: Texto */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-3">
                  PRÓXIMO CASE · {typeLabel}
                </span>
                <h3 className="font-serif text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-normal leading-[1.06] tracking-tight text-[#FAFAF7] mb-4 group-hover:text-[#C4FF00] transition-colors">
                  {title}
                </h3>
                {summary && (
                  <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/70 max-w-xl line-clamp-2 mb-8">
                    {summary}
                  </p>
                )}
              </div>

              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#C4FF00]">
                <span>{language === 'en' ? 'EXPLORE CASE' : 'EXPLORAR ESTUDO'}</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </div>
            </div>

            {/* Coluna Direita: Thumbnail */}
            {coverSrc && (
              <div className="lg:col-span-5 flex justify-end">
                <div className="w-full max-w-[420px] aspect-[16/10] rounded-[14px] overflow-hidden border border-white/10 bg-[#10110F]">
                  <img
                    src={coverSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        </CurtainLink>

      </div>
    </section>
  );
}

export default CaseNextProject;
