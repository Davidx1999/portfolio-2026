import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { resolveLocalized } from '../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseSolutionImpact({ caseStudy }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const isIndependent = caseStudy.projectType === 'independentStudy';

  const rawSolution =
    language === 'en' && caseStudy.solution_en
      ? caseStudy.solution_en
      : caseStudy.solution;
  const solution = resolveLocalized(rawSolution, language);

  const rawImpact =
    language === 'en' && caseStudy.impact_en
      ? caseStudy.impact_en
      : caseStudy.impact;
  const impact = resolveLocalized(rawImpact, language);

  if (!solution && !impact) return null;

  return (
    <section id="solution-section" className="w-full py-16 md:py-24 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] text-[#FAFAF7]">
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
              02 // {isIndependent ? (language === 'en' ? 'OUTCOMES & INSIGHTS' : 'RESULTADO & APRENDIZADO') : (language === 'en' ? 'SOLUTION & IMPACT' : 'SOLUÇÃO & IMPACTO')}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.5rem] font-normal leading-[1.08] tracking-tight mb-4">
              {isIndependent
                ? language === 'en'
                  ? 'Built Solution & Interaction Feasibility'
                  : 'Solução Construída & Viabilidade Técnica'
                : language === 'en'
                ? 'Systemic Solution & Verifiable Outcomes'
                : 'Solução Sistêmica & Evidências Reais'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/60 leading-relaxed">
              {isIndependent
                ? language === 'en'
                  ? 'Translating interaction experiments into functioning web prototypes.'
                  : 'Traduzindo experimentos de interação em protótipos funcionais na web.'
                : language === 'en'
                ? 'Delivering architecture, tokens, and components that scale across products.'
                : 'Entregando arquitetura, tokens e componentes que escalam entre produtos.'}
            </p>
          </motion.div>

          {/* Coluna de Conteúdo Direita (~65%) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Solução Estruturada */}
            {solution && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASING }}
                className="p-8 sm:p-10 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px]"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <Layers size={18} className="text-[#C4FF00]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C4FF00]">
                    {isIndependent ? (language === 'en' ? 'Built Prototype' : 'Solução Construída') : (language === 'en' ? 'Structured Solution' : 'Solução Estruturada')}
                  </span>
                </div>
                <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/85 leading-relaxed">
                  {solution}
                </p>
              </motion.div>
            )}

            {/* 2. Impacto & Evidências */}
            {impact && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASING }}
                className="p-8 sm:p-10 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px]"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <Zap size={18} className="text-[#C4FF00]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C4FF00]">
                    {isIndependent ? (language === 'en' ? 'Validated Feasibility' : 'Viabilidade Validada') : (language === 'en' ? 'Impact & Results' : 'Impacto & Continuidade')}
                  </span>
                </div>
                <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/85 leading-relaxed">
                  {impact}
                </p>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CaseSolutionImpact;
