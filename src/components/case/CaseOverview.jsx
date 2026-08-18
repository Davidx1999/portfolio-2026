import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseOverview({ caseStudy }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const isIndependent = caseStudy.projectType === 'independentStudy';

  const overview =
    language === 'en' && caseStudy.overview_en
      ? caseStudy.overview_en
      : caseStudy.overview;

  const challenge =
    language === 'en' && caseStudy.challenge_en
      ? caseStudy.challenge_en
      : caseStudy.challenge;

  const responsibilities =
    language === 'en' && Array.isArray(caseStudy.responsibilities_en) && caseStudy.responsibilities_en.length > 0
      ? caseStudy.responsibilities_en
      : Array.isArray(caseStudy.responsibilities)
      ? caseStudy.responsibilities
      : [];

  return (
    <section id="overview-section" className="w-full py-16 md:py-24 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Editorial Esquerda (~35%) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASING }}
            className="lg:col-span-4 lg:sticky lg:top-28"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              01 // {isIndependent ? (language === 'en' ? 'INTENT & SCOPE' : 'INTENÇÃO & ESCOPO') : (language === 'en' ? 'OVERVIEW & CHALLENGE' : 'VISÃO GERAL & DESAFIO')}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.5rem] font-normal leading-[1.08] tracking-tight mb-4">
              {isIndependent
                ? language === 'en'
                  ? 'Independent Exploration & Construction'
                  : 'Exploração & Construção Independente'
                : language === 'en'
                ? 'Context, Friction & Scope of Action'
                : 'Contexto, Complexidade & Minha Atuação'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/60 leading-relaxed">
              {isIndependent
                ? language === 'en'
                  ? 'Investigating interface ergonomics, experimental technologies, and real interaction models.'
                  : 'Investigando ergonomia de interface, tecnologias experimentais e modelos reais de interação.'
                : language === 'en'
                ? 'Understanding business rules, constraints, and institutional requirements before designing interfaces.'
                : 'Compreendendo regras de negócio, restrições e objetivos institucionais antes de desenhar telas.'}
            </p>
          </motion.div>

          {/* Coluna de Conteúdo Direita (~65%) */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Contexto */}
            {overview && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASING }}
                className="p-7 sm:p-8 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px]"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/50 block mb-3">
                  [ {isIndependent ? (language === 'en' ? 'Intent & Environment' : 'Intenção & Ambiente') : (language === 'en' ? 'Context & Problem Space' : 'Contexto & Cenário Inicial')} ]
                </span>
                <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/85 leading-relaxed">
                  {overview}
                </p>
              </motion.div>
            )}

            {/* 2. O Desafio Real */}
            {challenge && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.05, ease: EASING }}
                className="p-7 sm:p-8 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px]"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C4FF00] block mb-3">
                  [ {isIndependent ? (language === 'en' ? 'Technical Friction' : 'Fricção & Desafio Técnico') : (language === 'en' ? 'The Real Challenge' : 'O Desafio Real')} ]
                </span>
                <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/85 leading-relaxed">
                  {challenge}
                </p>
              </motion.div>
            )}

            {/* 3. Minha Atuação */}
            {responsibilities.length > 0 && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.1, ease: EASING }}
                className="p-7 sm:p-8 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px]"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/50 block mb-4">
                  [ {isIndependent ? (language === 'en' ? 'Key Experiments & Code' : 'Experimentos & Construção') : (language === 'en' ? 'Scope of Action & Responsibilities' : 'Minha Atuação & Responsabilidades')} ]
                </span>

                <ul className="space-y-3.5">
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#FAFAF7]">
                      <CheckCircle2 size={16} className="text-[#C4FF00] flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CaseOverview;
