import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { RollingText } from '../RollingText';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseNextProject
 * Transição editorial panorâmica para o próximo case com destaque moderado.
 * Estrutura:
 * - CONTINUE EXPLORANDO               02 / 03
 * - Próximo projeto                         ↗
 * - Nome da próxima case
 * - Descrição breve
 * - [ Preview panorâmico ]
 * - ← Todos os projetos          Voltar ao topo ↑
 */
export function CaseNextProject({
  nextCase,
  currentIndex = 1,
  totalProjects = 3,
}) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!nextCase || (!nextCase.slug && !nextCase.id)) return null;

  const targetSlug = nextCase.slug || nextCase.id;
  const targetUrl = targetSlug.startsWith('/') ? targetSlug : `/cases/${targetSlug}`;
  const title = nextCase.title || (language === 'en' ? 'Next Project' : 'Próximo Projeto');
  
  const summary =
    language === 'en' && nextCase.heroSummary_en
      ? nextCase.heroSummary_en
      : nextCase.heroSummary || nextCase.shortDescription || nextCase.description;

  const coverSrc = nextCase.coverImage || nextCase.image;

  const formattedCurrent = String(currentIndex).padStart(2, '0');
  const formattedTotal = String(totalProjects).padStart(2, '0');

  const handleScrollToTop = () => {
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: isReduced ? 'auto' : 'smooth',
    });

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus({ preventScroll: true });
    }
  };

  return (
    <section
      aria-label="Navegação de Próximo Projeto"
      className="w-full py-16 md:py-24 border-t border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Cabeçalho da Seção: CONTINUE EXPLORANDO & Contador (02 / 03) */}
        <div className="flex items-center justify-between py-4 border-b border-[rgba(244,243,238,0.12)] mb-8 md:mb-12 font-mono text-xs text-white/50 uppercase tracking-[0.2em]">
          <span className="font-bold text-[#C4FF00]">
            {language === 'en' ? 'CONTINUE EXPLORING' : 'CONTINUE EXPLORANDO'}
          </span>
          <span>
            {formattedCurrent} / {formattedTotal}
          </span>
        </div>

        {/* Card Editorial Panorâmico Clicável */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASING }}
          className="w-full mb-12"
        >
          <CurtainLink
            to={targetUrl}
            curtainTitle={title}
            className="group block relative w-full rounded-[20px] md:rounded-[26px] overflow-hidden border border-[rgba(244,243,238,0.16)] bg-[#151613] hover:border-[#C4FF00]/40 transition-all duration-500 shadow-xl p-6 sm:p-10 lg:p-12"
          >
            {/* Topo do Card: Chamada + Seta Direcional */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                {language === 'en' ? 'Next project' : 'Próximo projeto'}
              </span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:text-[#10110F] group-hover:bg-[#C4FF00] group-hover:border-[#C4FF00] transition-all duration-300">
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>

            {/* Nome da Próxima Case */}
            <h3 className="font-serif text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-4 group-hover:text-[#C4FF00] transition-colors duration-300">
              {title}
            </h3>

            {/* Descrição Breve (1 a 2 linhas) */}
            {summary && (
              <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/75 max-w-2xl line-clamp-2 mb-8 leading-relaxed">
                {summary}
              </p>
            )}

            {/* Preview Panorâmico */}
            {coverSrc && (
              <div className="w-full aspect-[21/9] sm:aspect-[24/9] rounded-[14px] md:rounded-[18px] overflow-hidden border border-white/10 bg-[#10110F] relative">
                <img
                  src={coverSrc}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </CurtainLink>
        </motion.div>

        {/* Rodapé de Navegação do Case: Todos os projetos & Voltar ao topo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 font-mono text-xs">
          <CurtainLink
            to="/work"
            className="group inline-flex items-center gap-2 text-[#F4F3EE]/70 hover:text-[#C4FF00] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C4FF00] rounded-[4px]"
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1 text-[#C4FF00]"
            />
            <span className="uppercase tracking-wider">
              <RollingText text={language === 'en' ? 'All projects' : 'Todos os projetos'} />
            </span>
          </CurtainLink>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-2 text-[#F4F3EE]/70 hover:text-[#C4FF00] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C4FF00] rounded-[4px] cursor-pointer"
          >
            <span className="uppercase tracking-wider">
              <RollingText text={language === 'en' ? 'Back to top' : 'Voltar ao topo'} />
            </span>
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-1 text-[#C4FF00]"
            />
          </button>
        </div>

      </div>
    </section>
  );
}

export default CaseNextProject;
