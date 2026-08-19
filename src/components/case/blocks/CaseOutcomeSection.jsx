import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseOutcomeSection
 * Bloco de resultados qualitativos legítimos e aprendizados comprovados.
 * Sem métricas inventadas, focando em consistência, escalabilidade e valor real.
 */
export function CaseOutcomeSection({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.outcomes) || block.outcomes.length === 0) {
    return null;
  }

  const rawEyebrow =
    language === 'en' && block.eyebrow_en
      ? block.eyebrow_en
      : block.eyebrow || (language === 'en' ? 'OUTCOMES // LEARNINGS' : 'RESULTADOS // APRENDIZADOS');
  const eyebrow = resolveLocalized(rawEyebrow, language);

  const rawTitle =
    language === 'en' && block.title_en
      ? block.title_en
      : block.title || (language === 'en' ? 'Verifiable Impact & Systemic Consistency' : 'Impacto Real e Consistência Sistêmica');
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
        
        {/* Cabeçalho */}
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

        {/* Grid de Resultados Qualitativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {block.outcomes.map((item, idx) => {
            const rawTag = item.tag || (language === 'en' ? 'Quality & Scale' : 'Qualidade & Escala');
            const tag = resolveLocalized(rawTag, language) || (language === 'en' ? 'Quality & Scale' : 'Qualidade & Escala');
            const outcomeTitle = resolveLocalized(language === 'en' && item.title_en ? item.title_en : item.title, language);
            const description = resolveLocalized(language === 'en' && item.description_en ? item.description_en : item.description, language);

            return (
              <motion.div
                key={item._key || idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: EASING }}
                className={`p-7 sm:p-8 rounded-[18px] border flex flex-col justify-between ${
                  isLight
                    ? 'bg-white border-[#10110F]/12 shadow-sm'
                    : 'bg-[#151613] border-[rgba(244,243,238,0.16)] shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C4FF00] bg-[#C4FF00]/10 px-2.5 py-1 rounded-[6px]">
                      {tag}
                    </span>
                    <CheckCircle2 size={16} className="text-[#C4FF00]" />
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-normal text-[#FAFAF7] leading-snug mb-3">
                    {outcomeTitle}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/75 leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default CaseOutcomeSection;
