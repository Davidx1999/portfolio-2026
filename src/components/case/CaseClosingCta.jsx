import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { resolveLocalized } from '../../utils/i18nField';
import { isValidHttpUrl } from '../../utils/url';
import { CaseExternalUrlButton } from './CaseExternalUrlButton';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseClosingCta
 * Chamada de link externo integrada diretamente sobre o fundo preto da página.
 * - Sem caixa, borda, sombra ou cantos arredondados
 * - Título à esquerda: rótulo customizado do projeto no idioma ativo
 *   (Em inglês, se o rótulo estiver vazio, usa o nome do projeto sem fallback para o português)
 * - Descrição: "Explore the finished work." (EN) / "Confira o trabalho realizado." (PT)
 * - Botão lima à direita: "Visit project" (EN) / "Visitar projeto" (PT)
 * - Responsivo: empilhado no mobile (botão abaixo do texto) e alinhado no desktop
 * - Sem linha divisória inferior antes de "Próximo estudo de caso"
 */
export function CaseClosingCta({ caseStudy }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const hasValidExternalUrl = isValidHttpUrl(caseStudy.externalUrl);
  if (!hasValidExternalUrl) return null;

  const projectTitle = resolveLocalized(caseStudy.title, language) || 'Project';
  const rawLabel = caseStudy.rawExternalUrlLabel || caseStudy.externalUrlLabel;

  let title = '';

  if (language === 'en') {
    // No idioma inglês: busca estritamente o valor em inglês
    const enLabel =
      typeof rawLabel === 'object' && rawLabel !== null
        ? rawLabel.en
        : (caseStudy.externalUrlLabel_en || (typeof rawLabel === 'string' ? rawLabel : ''));

    const cleanEnLabel = typeof enLabel === 'string' ? enLabel.trim() : '';

    // Se o rótulo inglês estiver vazio, usa o nome do projeto (NUNCA o texto em português)
    title = cleanEnLabel || projectTitle;
  } else {
    // No idioma português: busca a versão em português
    const ptLabel =
      typeof rawLabel === 'object' && rawLabel !== null
        ? (rawLabel.ptBR ?? rawLabel.pt)
        : (caseStudy.externalUrlLabel_pt || (typeof rawLabel === 'string' ? rawLabel : ''));

    const cleanPtLabel = typeof ptLabel === 'string' ? ptLabel.trim() : '';

    title = cleanPtLabel || projectTitle;
  }

  const description =
    language === 'en' ? 'Explore the finished work.' : 'Confira o trabalho realizado.';
  const buttonLabel = language === 'en' ? 'Visit project' : 'Visitar projeto';

  return (
    <section
      aria-label={language === 'en' ? 'Live project link' : 'Link do projeto no ar'}
      className="w-full bg-[#10110F] text-[#FAFAF7] pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: EASING }}
          className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10"
        >
          {/* Lado Esquerdo: Título e Descrição diretamente sobre o fundo preto */}
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-[#FAFAF7] font-normal tracking-tight leading-snug mb-2">
              {title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Lado Direito: Botão Lima Padronizado (abaixo do texto no mobile) */}
          <div className="shrink-0 w-full sm:w-auto">
            <CaseExternalUrlButton
              url={caseStudy.externalUrl}
              label={buttonLabel}
              projectTitle={title}
              className="w-full sm:w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseClosingCta;
