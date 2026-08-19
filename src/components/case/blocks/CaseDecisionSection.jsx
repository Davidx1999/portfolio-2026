import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseDecisionSection
 * Bloco para documentar decisões críticas de design, trade-offs e justificativas técnicas.
 */
export function CaseDecisionSection({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.decisions) || block.decisions.length === 0) {
    return null;
  }

  const rawEyebrow =
    language === 'en' && block.eyebrow_en
      ? block.eyebrow_en
      : block.eyebrow || (language === 'en' ? 'DESIGN DECISIONS // ARCHITECTURE' : 'DECISÕES DE DESIGN // ARQUITETURA');
  const eyebrow = resolveLocalized(rawEyebrow, language);

  const rawTitle =
    language === 'en' && block.title_en
      ? block.title_en
      : block.title || (language === 'en' ? 'Critical Design Decisions & Trade-Offs' : 'Decisões Críticas de Design & Trade-Offs');
  const title = resolveLocalized(rawTitle, language);

  const rawIntro = language === 'en' && block.intro_en ? block.intro_en : block.intro;
  const intro = resolveLocalized(rawIntro, language);
  const isLight = block.theme === 'light';

  return (
    <section
      className={`w-full py-16 md:py-24 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Cabeçalho da Seção de Decisões */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASING }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
            {eyebrow}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-4">
            {title}
          </h3>
          {intro && (
            <p className={`font-sans text-sm sm:text-base ${isLight ? 'text-[#10110F]/75' : 'text-[#F4F3EE]/75'} leading-relaxed`}>
              {intro}
            </p>
          )}
        </motion.div>

        {/* Grid de Decisões */}
        <div className="space-y-8 md:space-y-12">
          {block.decisions.map((item, idx) => {
            const num = item.number || String(idx + 1).padStart(2, '0');
            const challenge = resolveLocalized(language === 'en' && item.challenge_en ? item.challenge_en : item.challenge, language);
            const decision = resolveLocalized(language === 'en' && item.decision_en ? item.decision_en : item.decision, language);
            const rationale = resolveLocalized(language === 'en' && item.rationale_en ? item.rationale_en : item.rationale, language);
            const caption = resolveLocalized(language === 'en' && item.artifactCaption_en ? item.artifactCaption_en : item.artifactCaption, language);

            return (
              <motion.div
                key={item._key || idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: EASING }}
                className={`p-7 sm:p-9 lg:p-10 rounded-[20px] border ${
                  isLight
                    ? 'bg-white border-[#10110F]/12 shadow-sm'
                    : 'bg-[#151613] border-[rgba(244,243,238,0.16)] shadow-xl'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Coluna de Conteúdo Editorial */}
                  <div className={item.artifactMedia ? 'lg:col-span-7' : 'lg:col-span-12'}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-[#C4FF00] bg-[#C4FF00]/10 px-2.5 py-1 rounded-[6px]">
                        #{num}
                      </span>
                      <span className="font-mono text-xs font-semibold text-white/50 uppercase tracking-wider">
                        {language === 'en' ? 'DESIGN DECISION' : 'DECISÃO DE PROJETO'}
                      </span>
                    </div>

                    {/* Problema / Fricção */}
                    {challenge && (
                      <div className="mb-5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block mb-1">
                          {language === 'en' ? 'FRICTION / CHALLENGE' : 'FRICÇÃO IDENTIFICADA'}
                        </span>
                        <h4 className="font-sans text-base sm:text-lg font-semibold text-[#FAFAF7] leading-snug">
                          {challenge}
                        </h4>
                      </div>
                    )}

                    {/* Decisão Tomada */}
                    {decision && (
                      <div className="mb-5 p-4 rounded-[12px] bg-white/[0.03] border border-white/5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#C4FF00] block mb-1">
                          {language === 'en' ? 'DECISION ADOPTED' : 'DECISÃO ADOTADA'}
                        </span>
                        <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/90 leading-relaxed">
                          {decision}
                        </p>
                      </div>
                    )}

                    {/* Justificativa / Racional */}
                    {rationale && (
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block mb-1">
                          {language === 'en' ? 'RATIONALE & SYSTEMIC IMPACT' : 'JUSTIFICATIVA & IMPACTO'}
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed">
                          {rationale}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Coluna de Mídia / Artefato */}
                  {item.artifactMedia && (
                    <div className="lg:col-span-5 flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden border border-white/10 bg-[#10110F]">
                        <img
                          src={item.artifactMedia}
                          alt={caption || challenge || 'Artefato de Decisão'}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      {caption && (
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider mt-2.5 block">
                          {caption}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default CaseDecisionSection;
