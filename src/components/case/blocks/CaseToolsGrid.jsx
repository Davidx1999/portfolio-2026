import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';
import { isValidHttpUrl } from '../../../utils/url';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseToolsGrid
 * Bloco modular compacto e textual para apresentação das ferramentas,
 * bibliotecas, fontes de dados e controle de versão utilizados no projeto.
 * 
 * - Grid responsivo (1 col mobile, 2 tablet, 3-4 desktop)
 * - Tipografia escaneável, compacta e com texto 100% selecionável
 * - Suporte a temas dark e light
 * - Suporte a URLs externas opcionais por item com acessibilidade por teclado
 */
export function CaseToolsGrid({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !Array.isArray(block.items) || block.items.length === 0) {
    return null;
  }

  const rawEyebrow =
    language === 'en' && block.eyebrow_en
      ? block.eyebrow_en
      : block.eyebrow || (language === 'en' ? 'STACK // DATA & TOOLING' : 'STACK // DADOS E FERRAMENTAS');
  const eyebrow = resolveLocalized(rawEyebrow, language);

  const rawTitle =
    language === 'en' && block.title_en
      ? block.title_en
      : block.title || (language === 'en' ? 'Tools & Data Architecture' : 'Ferramentas e Arquitetura de Dados');
  const title = resolveLocalized(rawTitle, language);

  const rawIntro = language === 'en' && block.intro_en ? block.intro_en : block.intro;
  const intro = resolveLocalized(rawIntro, language);
  const isLight = block.theme === 'light';

  // Define colunas dinamicamente baseado na quantidade de itens
  const itemCount = block.items.length;
  const gridColsClass =
    itemCount === 1
      ? 'grid-cols-1 max-w-xl'
      : itemCount === 2
      ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl'
      : itemCount === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <section
      aria-labelledby={`tools-grid-heading-${block._key || 'default'}`}
      className={`w-full py-16 md:py-20 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASING }}
          className="max-w-3xl mb-10 md:mb-12"
        >
          {eyebrow && (
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              {eyebrow}
            </span>
          )}
          <h3
            id={`tools-grid-heading-${block._key || 'default'}`}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-3"
          >
            {title}
          </h3>
          {intro && (
            <p
              className={`font-sans text-sm sm:text-base ${
                isLight ? 'text-[#10110F]/75' : 'text-[#F4F3EE]/75'
              } leading-relaxed select-text`}
            >
              {intro}
            </p>
          )}
        </motion.div>

        {/* Grid Textual Compacto de Ferramentas e Fontes de Dados */}
        <div className={`grid ${gridColsClass} gap-4 sm:gap-5`}>
          {block.items.map((item, idx) => {
            const rawCategory =
              language === 'en' && item.category_en ? item.category_en : item.category;
            const category = resolveLocalized(rawCategory, language);

            const rawDescription =
              language === 'en' && item.description_en ? item.description_en : item.description;
            const description = resolveLocalized(rawDescription, language);

            const name = item.name || '';
            const hasValidUrl = isValidHttpUrl(item.url);
            const itemUrl = hasValidUrl ? item.url.trim() : null;

            return (
              <motion.article
                key={item._key || idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: EASING }}
                className={`p-5 sm:p-6 rounded-[14px] border flex flex-col justify-between transition-colors duration-200 select-text ${
                  isLight
                    ? 'bg-white border-[#10110F]/10 hover:border-[#10110F]/25 shadow-sm'
                    : 'bg-[#151613] border-[rgba(244,243,238,0.12)] hover:border-[rgba(244,243,238,0.24)]'
                }`}
              >
                <div>
                  {/* Categoria + Link opcional */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {category ? (
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[4px] border ${
                          isLight
                            ? 'bg-[#10110F]/5 text-[#10110F]/80 border-[#10110F]/10'
                            : 'bg-white/5 text-[#C4FF00] border-[#C4FF00]/25'
                        }`}
                      >
                        {category}
                      </span>
                    ) : (
                      <div />
                    )}

                    {itemUrl && (
                      <a
                        href={itemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} (${category || (language === 'en' ? 'Link' : 'Link')}): ${language === 'en' ? 'Open link in new tab' : 'Abrir link em nova aba'}`}
                        className={`inline-flex items-center p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4FF00] ${
                          isLight
                            ? 'text-[#10110F]/50 hover:text-[#10110F]'
                            : 'text-[#F4F3EE]/50 hover:text-[#C4FF00]'
                        }`}
                      >
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  {/* Nome da Ferramenta / Fonte de Dados */}
                  <h4
                    className={`font-sans text-base sm:text-lg font-semibold tracking-tight mb-2 ${
                      isLight ? 'text-[#10110F]' : 'text-[#FAFAF7]'
                    }`}
                  >
                    {itemUrl ? (
                      <a
                        href={itemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline decoration-[#C4FF00]/60 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4FF00] rounded-[2px]"
                      >
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </h4>

                  {/* Descrição do Papel / Uso */}
                  {description && (
                    <p
                      className={`font-sans text-xs sm:text-sm leading-relaxed ${
                        isLight ? 'text-[#10110F]/70' : 'text-[#F4F3EE]/70'
                      }`}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CaseToolsGrid;
