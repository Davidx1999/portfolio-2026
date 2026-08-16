import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';

const EASING = [0.22, 1, 0.36, 1];

export function HomeHero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('featured-work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToNext = () => {
    const target = document.getElementById('credibility');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] pt-24 lg:pt-28 pb-16 flex flex-col justify-between bg-[#F1F0EB] text-[#111210] select-none border-b border-[rgba(17,18,16,0.1)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-center">
          
          {/* ============================================================ */}
          {/* LADO ESQUERDO: Posicionamento, Headline & Ações              */}
          {/* ============================================================ */}
          <div className="flex flex-col justify-center max-w-xl">
            {/* Label Profissional */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASING }}
              className="mb-4 sm:mb-6"
            >
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B8B85]">
                {t('hero_label', 'PRODUCT DESIGNER • UX/UI • DESIGN SYSTEMS')}
              </span>
            </motion.div>

            {/* Headline Editorial (Serif de Alto Contraste) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
              className="mb-5 sm:mb-6"
            >
              <h1 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#111210]">
                {t('hero_headline_v2', 'Transformo complexidade em produtos digitais claros e marcantes.')}
              </h1>
            </motion.div>

            {/* Descrição Curta (Sans-Serif Limpa) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: EASING }}
              className="mb-8 sm:mb-10"
            >
              <p className="font-sans text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] text-[#111210]/80 leading-relaxed max-w-md">
                {t(
                  'hero_description_v2',
                  'Estratégia, UX/UI e sistemas de design para empresas que precisam transformar ideias complexas em experiências consistentes, escaláveis e fáceis de usar.'
                )}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASING }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              {/* CTA Principal em Verde Ácido */}
              <a
                href="#featured-work"
                onClick={handleScrollToProjects}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#10110F] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all duration-300 rounded-[18px] shadow-sm focus-visible:outline-2 focus-visible:outline-[#111210] cursor-pointer"
              >
                <span>{t('hero_cta_primary_v2', 'EXPLORAR PROJETOS')}</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Ação Secundária */}
              <CurtainLink
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#111210] border border-[rgba(17,18,16,0.2)] hover:border-[#111210] hover:bg-[#111210]/5 transition-all duration-300 rounded-[18px] focus-visible:outline-2 focus-visible:outline-[#111210]"
              >
                <span>{t('hero_cta_secondary_v2', 'VAMOS CONVERSAR')}</span>
                <ArrowUpRight size={14} className="text-[#8B8B85] group-hover:text-[#111210] transition-colors" />
              </CurtainLink>
            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* LADO DIREITO: Container de Vídeo com Bordas Arredondadas     */}
          {/* ============================================================ */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
            className="w-full flex items-center justify-center"
          >
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] bg-[#10110F] rounded-[24px] overflow-hidden border border-[rgba(17,18,16,0.12)] shadow-xl relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={`${import.meta.env.BASE_URL}assets/videos/hero_poster.jpg`}
                aria-hidden="true"
                className="w-full h-full object-cover object-center scale-[1.06] pointer-events-none select-none"
              >
                <source
                  src={`${import.meta.env.BASE_URL}assets/videos/hero_showcase.webm`}
                  type="video/webm"
                />
                <source
                  src={`${import.meta.env.BASE_URL}assets/videos/hero_showcase.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* INDICADOR DE SCROLL INSPIRADO EM FIDDLE.DIGITAL              */}
      {/* ============================================================ */}
      <div className="w-full flex justify-center pt-8 pb-2">
        <button
          type="button"
          onClick={handleScrollToNext}
          aria-label="Rolar para a próxima seção"
          className="group p-3 flex flex-col items-center gap-1.5 text-[#111210]/60 hover:text-[#111210] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111210] rounded-full"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown size={22} strokeWidth={1.5} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
