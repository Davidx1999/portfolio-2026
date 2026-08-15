import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function StatementSection() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const lines = [
    'Eu entrego experiências que organizam a complexidade,',
    'orientam quem usa e continuam consistentes',
    'enquanto o produto cresce.',
  ];

  return (
    <section className="relative w-full bg-[#111210] text-[#FAFAF7] py-28 lg:py-40 border-b border-white/10 select-none">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-start justify-center">
        
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#4056F4] block mb-8">
          {t('statement_tag', 'POSICIONAMENTO // DESIGN DE PRODUTO')}
        </span>

        <div className="flex flex-col gap-2 sm:gap-4 max-w-5xl">
          {lines.map((line, index) => (
            <div key={index} className="overflow-hidden">
              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: EASING }}
                className="font-serif text-[1.85rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] font-normal leading-[1.12] tracking-tight text-[#FAFAF7]"
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex items-center gap-4 text-[#8B8B85] font-mono text-xs tracking-widest uppercase"
        >
          <span className="w-8 h-[1px] bg-white/20" />
          <span>DAVID SALVIANO • SENIOR PRODUCT DESIGNER</span>
        </motion.div>

      </div>
    </section>
  );
}
