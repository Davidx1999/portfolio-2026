import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseProcessSteps({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.steps) || block.steps.length === 0) return null;

  const title = language === 'en' && block.title_en ? block.title_en : block.title || 'Processo & Engenharia';
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
        <div className="max-w-4xl mb-12 lg:mb-16">
          <span
            className={`font-mono text-xs font-bold uppercase tracking-[0.2em] block mb-3 ${
              isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
            }`}
          >
            PROCESSO DE DESIGN //
          </span>
          <h2 className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-normal leading-[1.08] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Grade de Etapas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {block.steps.map((step, idx) => {
            const stepTitle = language === 'en' && step.title_en ? step.title_en : step.title;
            const stepDesc = language === 'en' && step.description_en ? step.description_en : step.description;
            const stepNum = step.index || `0${idx + 1}`;

            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASING }}
                className={`p-6 sm:p-7 rounded-[16px] border flex flex-col justify-between ${
                  isLight
                    ? 'bg-white border-[#10110F]/10 hover:border-[#4056F4]'
                    : 'bg-[#151613] border-[rgba(244,243,238,0.14)] hover:border-[#C4FF00]/50'
                } transition-all duration-300 min-h-[260px]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
                      }`}
                    >
                      {stepNum} //
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>

                  <h3 className="font-serif text-xl font-normal mb-3">{stepTitle}</h3>
                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-[#10110F]/75' : 'text-[#F4F3EE]/70'
                    }`}
                  >
                    {stepDesc}
                  </p>
                </div>

                {step.media && (
                  <div className="mt-5 pt-4 border-t border-white/10 aspect-[16/9] rounded-[8px] overflow-hidden">
                    <img
                      src={step.media}
                      alt={stepTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CaseProcessSteps;
