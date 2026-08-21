import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseStickyNarrative
 * Seção editorial de narrativa sticky em duas colunas.
 * - Coluna esquerda com título sticky: top: calc(var(--header-safe-offset, 72px) + 24px)
 * - Coluna direita fluida com tópicos e listas de itens
 * - Em mobile: fluxo vertical limpo sem sticky
 */
export function CaseStickyNarrative({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.topics) || block.topics.length === 0) {
    return null;
  }

  const rawEyebrow =
    language === 'en' && block.eyebrow_en
      ? block.eyebrow_en
      : block.eyebrow || (language === 'en' ? '01 // OVERVIEW & CONTEXT' : '01 // VISÃO GERAL & CONTEXTO');
  const eyebrow = resolveLocalized(rawEyebrow, language);

  const rawSectionTitle =
    language === 'en' && block.sectionTitle_en
      ? block.sectionTitle_en
      : block.sectionTitle || (language === 'en' ? 'Context, Friction & Scope' : 'Contexto, Complexidade & Atuação');
  const sectionTitle = resolveLocalized(rawSectionTitle, language);

  const rawSectionSubtitle =
    language === 'en' && block.sectionSubtitle_en
      ? block.sectionSubtitle_en
      : block.sectionSubtitle;
  const sectionSubtitle = resolveLocalized(rawSectionSubtitle, language);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Coluna Editorial Esquerda Sticky (~35%) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASING }}
            className="lg:col-span-4 lg:sticky"
            style={{
              top: 'calc(var(--header-safe-offset, 72px) + 24px)',
            }}
          >
            {eyebrow && (
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
                {eyebrow}
              </span>
            )}
            <h2 className="font-serif text-[2rem] sm:text-[2.5rem] font-normal leading-[1.08] tracking-tight mb-4">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className={`font-sans text-xs sm:text-sm ${isLight ? 'text-[#10110F]/65' : 'text-[#F4F3EE]/60'} leading-relaxed`}>
                {sectionSubtitle}
              </p>
            )}
          </motion.div>

          {/* Coluna de Conteúdo Direita (~65%) */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            {block.topics.map((topic, idx) => {
              const label = resolveLocalized(language === 'en' && topic.topicKey_en ? topic.topicKey_en : topic.topicKey, language);
              const title = resolveLocalized(language === 'en' && topic.title_en ? topic.title_en : topic.title, language);
              const content = resolveLocalized(language === 'en' && topic.content_en ? topic.content_en : topic.content, language);
              const rawBullets =
                language === 'en' && Array.isArray(topic.bulletPoints_en) && topic.bulletPoints_en.length > 0
                  ? topic.bulletPoints_en
                  : Array.isArray(topic.bulletPoints)
                  ? topic.bulletPoints
                  : [];
              const bullets = rawBullets.map((bp) => resolveLocalized(bp, language)).filter(Boolean);

              return (
                <motion.div
                  key={topic._key || idx}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: idx * 0.06, ease: EASING }}
                  className={`p-7 sm:p-8 rounded-[18px] border ${
                    isLight
                      ? 'bg-white border-[#10110F]/12 shadow-sm'
                      : 'bg-[#151613] border-[rgba(244,243,238,0.16)] shadow-lg'
                  }`}
                >
                  {label && (
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider block mb-3 ${
                        topic.highlight ? 'text-[#C4FF00]' : isLight ? 'text-[#10110F]/50' : 'text-white/50'
                      }`}
                    >
                      {label.startsWith('[') ? label : `[ ${label} ]`}
                    </span>
                  )}

                  {title && (
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAFAF7] leading-snug mb-3">
                      {title}
                    </h3>
                  )}

                  {content && (
                    <p className={`font-sans text-sm sm:text-base lg:text-lg ${isLight ? 'text-[#10110F]/85' : 'text-[#F4F3EE]/85'} leading-relaxed ${bullets.length > 0 ? 'mb-5' : ''}`}>
                      {content}
                    </p>
                  )}

                  {bullets.length > 0 && (
                    <ul className="space-y-3 pt-2">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#FAFAF7]">
                          <CheckCircle2 size={16} className="text-[#C4FF00] flex-shrink-0 mt-1" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default CaseStickyNarrative;
