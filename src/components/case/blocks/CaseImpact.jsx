import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseImpact({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.items) || block.items.length === 0) return null;

  const title = language === 'en' && block.title_en ? block.title_en : block.title || 'Impacto & Resultados Reais';

  return (
    <section className="w-full py-16 md:py-24 border-b border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mb-12 lg:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
            EVIDÊNCIAS DE IMPACTO //
          </span>
          <h2 className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-normal leading-[1.08] tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.items.map((item, idx) => {
            const label = language === 'en' && item.label_en ? item.label_en : item.label;
            const desc = language === 'en' && item.description_en ? item.description_en : item.description;

            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASING }}
                className="p-7 rounded-[16px] bg-[#151613] border border-[rgba(244,243,238,0.14)] hover:border-[#C4FF00]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#C4FF00]">
                      0{idx + 1}.
                    </span>
                    <CheckCircle2 size={16} className="text-[#C4FF00]" />
                  </div>

                  {item.value && (
                    <span className="font-serif text-3xl sm:text-4xl text-white font-normal block mb-2">
                      {item.value}
                    </span>
                  )}

                  <h3 className="font-serif text-xl text-white font-normal mb-2.5">{label}</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">
                    VERIFICÁVEL · {item.evidenceType?.toUpperCase() || 'QUALITATIVO'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CaseImpact;
