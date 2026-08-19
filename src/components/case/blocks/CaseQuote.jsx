import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseQuote({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || (!block.quote && !block.quote_pt)) return null;

  const rawQuote =
    language === 'en' && block.quote_en
      ? block.quote_en
      : block.quote || block.quote_pt;
  const quote = resolveLocalized(rawQuote, language);

  return (
    <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="max-w-4xl mx-auto p-8 sm:p-12 lg:p-14 bg-[#151613] border border-[rgba(244,243,238,0.2)] rounded-[20px] shadow-2xl relative"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-6">
            DEPOIMENTO REAL //
          </span>

          <p className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-white font-normal leading-snug mb-8">
            “{quote}”
          </p>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg text-white font-normal">{block.author}</h4>
              <p className="font-mono text-xs text-white/50">
                {block.role} {block.organization ? `· ${block.organization}` : ''}
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseQuote;
