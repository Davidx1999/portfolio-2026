import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { RollingText } from '../RollingText';
import { resolveLocalized } from '../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseNextProject({
  nextCase,
  currentIndex = 1,
  totalProjects = 3,
}) {
  const { t } = useTranslation(['case', 'common']);
  const { language } = useLanguage();

  if (!nextCase || (!nextCase.slug && !nextCase.id)) return null;

  const targetSlug = nextCase.slug?.current || nextCase.slug || nextCase.id;
  const targetUrl = `/${language}/work/${targetSlug}`;
  const title = resolveLocalized(nextCase.title, language) || (language === 'en' ? 'Next Project' : 'Próximo Projeto');
  
  const rawSummary =
    language === 'en' && nextCase.heroSummary_en
      ? nextCase.heroSummary_en
      : nextCase.heroSummary || nextCase.shortDescription || nextCase.description;
  const summary = resolveLocalized(rawSummary, language);

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
    <section className="w-full bg-[#10110F] text-[#FAFAF7] border-t border-[rgba(244,243,238,0.16)] pt-16 sm:pt-20 pb-20 select-none">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Card Principal do Próximo Projeto */}
        <CurtainLink
          to={targetUrl}
          curtainTitle={title}
          className="group block relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] hover:border-[rgba(196,255,0,0.55)] transition-all duration-500 shadow-2xl focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
        >
          {/* Header Superior: Contador Editorial & Indicador */}
          <div className="p-6 sm:p-8 lg:p-10 pb-4 sm:pb-6 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C4FF00]">
                {t('case:next_case_label', 'NEXT CASE STUDY')}
              </span>
            </div>

            <span className="font-mono text-xs text-[#F4F3EE]/50 tracking-widest font-semibold">
              {formattedCurrent} / {formattedTotal}
            </span>
          </div>

          {/* Conteúdo Central: Título + Descrição + CTA */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Informações Textuais (~60%) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4F3EE]/60 block mb-2 font-medium">
                {nextCase.context || nextCase.category || (language === 'en' ? 'Digital Product' : 'Produto Digital')}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-[1.12] tracking-tight mb-4 group-hover:text-[#C4FF00] transition-colors">
                {title}
              </h3>

              {summary && (
                <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/75 leading-relaxed max-w-xl mb-6">
                  {summary}
                </p>
              )}

              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#C4FF00] group-hover:underline">
                <RollingText text={language === 'en' ? 'EXPLORE PROJECT' : 'EXPLORAR ESTUDO'} />
                <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>

            {/* Imagem Preview Panorâmica (~40%) */}
            {coverSrc && (
              <div className="lg:col-span-5 w-full aspect-[16/10] rounded-[16px] overflow-hidden border border-white/10 bg-[#10110F] relative">
                <img
                  src={coverSrc}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover filter saturate-[0.92] group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

          </div>
        </CurtainLink>

        {/* Rodapé Inferior: Voltar aos Projetos & Voltar ao Topo */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(244,243,238,0.1)] text-xs font-mono">
          <CurtainLink
            to={`/${language}/work`}
            className="inline-flex items-center gap-2 text-[#F4F3EE]/70 hover:text-[#C4FF00] transition-colors font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
          >
            <ArrowLeft size={14} />
            <span>{t('case:back_to_work', 'Back to Selected Work')}</span>
          </CurtainLink>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 text-[#F4F3EE]/50 hover:text-[#FAFAF7] transition-colors uppercase tracking-widest cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
          >
            <span>{language === 'en' ? 'Back to top' : 'Voltar ao topo'}</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default CaseNextProject;
