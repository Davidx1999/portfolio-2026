import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function PrinciplesGrid() {
  const { t } = useTranslation(['home']);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Dynamic capabilities words from locales
  const words = useMemo(() => [
    t('home:cap_strategy', 'STRATEGY'),
    t('home:cap_architecture', 'ARCHITECTURE'),
    t('home:cap_interfaces', 'INTERFACES'),
    t('home:cap_design_systems', 'DESIGN SYSTEMS'),
  ], [t]);

  // Track tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Track viewport intersection
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay carousel timer: ~2000ms interval, pauses if off-screen or tab hidden
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2100);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, isInView, isTabVisible, words.length]);

  const currentWord = words[currentIndex] || '';
  const wordLength = currentWord.length;
  const wordTypographyClass = useMemo(() => {
    if (wordLength >= 13) {
      return 'text-[clamp(1.75rem,6.8vw,8.5rem)]';
    }
    if (wordLength >= 10) {
      return 'text-[clamp(2.15rem,8vw,10rem)]';
    }
    return 'text-[clamp(2.6rem,9vw,11rem)]';
  }, [wordLength]);

  return (
    <section
      ref={sectionRef}
      id="positioning-capabilities"
      className="relative w-full bg-[#10110F] text-[#FAFAF7] py-20 sm:py-32 lg:py-40 border-b border-white/10 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between">

        {/* ============================================================ */}
        {/* 1. INTRODUÇÃO EDITORIAL DISCRETA                             */}
        {/* ============================================================ */}
        <div className="max-w-2xl mb-12 sm:mb-20 lg:mb-24">
          <span className="font-mono text-xs font-bold text-[#8B8B85] uppercase tracking-[0.22em] block mb-4 sm:mb-5">
            {t('home:principles_tag', 'POSITIONING')}
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] font-normal leading-[1.22] tracking-tight text-[#FAFAF7]/90">
            <span className="block">{t('home:positioning_headline_1', 'Digital products must work flawlessly.')}</span>
            <span className="block text-[#FAFAF7]/60 mt-1">{t('home:positioning_headline_2', 'The best ones also leave an impression.')}</span>
          </h2>
        </div>

        {/* ============================================================ */}
        {/* 2. BLOCO TIPOGRÁFICO CINÉTICO: DUAS LINHAS                   */}
        {/* ============================================================ */}
        {prefersReducedMotion ? (
          /* Versão estática acessível para reduced-motion */
          <div className="flex flex-col items-start text-left gap-2 pt-4 w-full">
            <p className="font-sans font-bold text-[clamp(1.75rem,5vw,4.5rem)] uppercase leading-[1.05] tracking-[-0.035em] text-[#FAFAF7] text-left">
              {t(
                'home:kinetic_reduced_line',
                'I DELIVER STRATEGY, ARCHITECTURE, INTERFACES, AND DESIGN SYSTEMS.'
              )}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start w-full text-left">
            {/* Primeira Linha Fixa */}
            <div
              className="w-full text-left font-sans font-bold uppercase tracking-[-0.035em] sm:tracking-[-0.045em] leading-[0.92] text-[#FAFAF7] select-none text-[clamp(2.4rem,8.5vw,11rem)]"
            >
              {t('home:kinetic_fixed_line', 'I DELIVER')}
            </div>

            {/* Segunda Linha Variável com Máscara Vertical */}
            <div className="capability-line-mask relative overflow-hidden w-full h-[clamp(3.2rem,10.5vw,12.5rem)] flex items-center justify-start text-left select-none mt-1 sm:mt-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${currentIndex}-${currentWord}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{
                    duration: 0.72,
                    ease: [0.77, 0, 0.175, 1],
                  }}
                  className={`capability-word font-sans font-bold uppercase tracking-[-0.035em] sm:tracking-[-0.045em] leading-[1.05] text-[#C7F000] whitespace-nowrap will-change-transform text-left flex items-center ${wordTypographyClass}`}
                >
                  {currentWord}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default PrinciplesGrid;
