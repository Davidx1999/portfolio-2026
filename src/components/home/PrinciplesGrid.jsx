import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function PrinciplesGrid() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Dynamic capabilities words from locales
  const words = useMemo(() => [
    t('cap_strategy', 'ESTRATÉGIA'),
    t('cap_architecture', 'ARQUITETURA'),
    t('cap_interfaces', 'INTERFACES'),
    t('cap_design_systems', 'DESIGN SYSTEMS'),
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

  const currentWord = words[currentIndex];
  const isLongWord = currentWord.length > 11; // e.g. "DESIGN SYSTEMS"

  return (
    <section
      ref={sectionRef}
      id="positioning-capabilities"
      className="relative w-full bg-[#10110F] text-[#FAFAF7] py-24 sm:py-32 lg:py-40 border-b border-white/10 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between">

        {/* ============================================================ */}
        {/* 1. INTRODUÇÃO EDITORIAL DISCRETA                             */}
        {/* ============================================================ */}
        <div className="max-w-2xl mb-14 sm:mb-20 lg:mb-24">
          <span className="font-mono text-xs font-bold text-[#8B8B85] uppercase tracking-[0.22em] block mb-4 sm:mb-5">
            {t('principles_tag', 'POSICIONAMENTO')}
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] font-normal leading-[1.22] tracking-tight text-[#FAFAF7]/90">
            <span className="block">{t('positioning_headline_1', 'Produtos digitais precisam funcionar.')}</span>
            <span className="block text-[#FAFAF7]/60 mt-1">{t('positioning_headline_2', 'Os melhores também impressionam.')}</span>
          </h2>
        </div>

        {/* ============================================================ */}
        {/* 2. BLOCO TIPOGRÁFICO CINÉTICO: DUAS LINHAS                   */}
        {/* ============================================================ */}
        {prefersReducedMotion ? (
          /* Versão estática acessível para reduced-motion */
          <div className="flex flex-col items-start text-left gap-2 pt-4 w-full">
            <p className="font-sans font-bold text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[1.05] tracking-[-0.035em] text-[#FAFAF7] text-left">
              {t(
                'kinetic_reduced_line',
                'EU ENTREGO ESTRATÉGIA, ARQUITETURA, INTERFACES E DESIGN SYSTEMS.'
              )}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start w-full text-left">
            {/* Primeira Linha Fixa */}
            <div
              className="w-full text-left font-sans font-bold uppercase tracking-[-0.045em] leading-[0.9] text-[#FAFAF7] select-none text-[clamp(3.5rem,10vw,11rem)]"
            >
              {t('kinetic_fixed_line', 'EU ENTREGO')}
            </div>

            {/* Segunda Linha Variável com Máscara Vertical */}
            <div className="capability-line-mask relative overflow-hidden w-full h-[clamp(3.8rem,11.5vw,12.5rem)] flex items-center justify-start text-left select-none mt-1 sm:mt-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${currentIndex}-${currentWord}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{
                    duration: 0.72,
                    ease: [0.77, 0, 0.175, 1], // power3.inOut suave e preciso
                  }}
                  className={`capability-word font-sans font-bold uppercase tracking-[-0.045em] leading-[1.05] text-[#C7F000] whitespace-nowrap will-change-transform text-left flex items-center ${
                    isLongWord
                      ? 'text-[clamp(2.5rem,8vw,9rem)]'
                      : 'text-[clamp(3.5rem,10vw,11rem)]'
                  }`}
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
