import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseReflection({ reflection, reflection_en }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const text = language === 'en' && reflection_en ? reflection_en : reflection;

  if (!text) return null;

  return (
    <section id="reflection-section" className="w-full py-16 md:py-24 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00]">
              {language === 'en' ? 'PERSONAL REFLECTION //' : 'REFLEXÃO PESSOAL //'}
            </span>
          </div>

          <p className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-normal leading-relaxed text-[#FAFAF7] mb-6">
            “{text}”
          </p>

          <span className="font-mono text-xs text-white/50 uppercase tracking-wider block">
            — David Salviano · Product Design
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseReflection;
