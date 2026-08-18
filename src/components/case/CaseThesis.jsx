import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseThesis({ thesis, thesis_en }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const text = language === 'en' && thesis_en ? thesis_en : thesis;

  if (!text) return null;

  return (
    <section className="w-full py-16 md:py-24 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="max-w-4xl"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-4">
            {language === 'en' ? 'CORE THESIS //' : 'TESE DO PROJETO //'}
          </span>
          <h2 className="font-serif text-[1.85rem] sm:text-[2.5rem] lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#FAFAF7]">
            “{text}”
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseThesis;
