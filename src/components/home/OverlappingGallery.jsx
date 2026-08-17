import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

const DEFAULT_ARTIFACTS = [
  {
    id: 'art-1',
    title: 'Educação & Mapeamento',
    label: 'SaaS Platform',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
    gridClass: 'col-span-12 md:col-span-5 md:col-start-1 md:row-start-1 h-[280px] sm:h-[320px] lg:h-[360px]',
  },
  {
    id: 'art-2',
    title: 'Design System & Tokens',
    label: 'UI Architecture',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
    gridClass: 'col-span-12 md:col-span-6 md:col-start-7 md:row-start-1 h-[280px] sm:h-[320px] lg:h-[360px]',
  },
  {
    id: 'art-3',
    title: 'Fluxos & Arquitetura',
    label: 'Core Ecosystem',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
    gridClass: 'col-span-12 md:col-span-8 md:col-start-3 md:row-start-2 h-[340px] sm:h-[400px] lg:h-[460px]',
    isDominant: true,
  },
  {
    id: 'art-4',
    title: 'Interface Tátil & 3D',
    label: 'Interactive Hardware',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
    gridClass: 'col-span-12 md:col-span-5 md:col-start-1 md:row-start-3 h-[260px] sm:h-[300px] lg:h-[340px]',
  },
  {
    id: 'art-5',
    title: 'Engenharia de Interfaces',
    label: 'Data Science & CLI',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_card.png`,
    gridClass: 'col-span-12 md:col-span-6 md:col-start-7 md:row-start-3 h-[260px] sm:h-[300px] lg:h-[340px]',
  },
];

export function OverlappingGallery({ items }) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const artifacts = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return DEFAULT_ARTIFACTS;
  }, [items]);

  return (
    <section
      id="production-gallery"
      className="relative isolation-isolate overflow-clip z-10 w-full bg-[#FAFAF7] text-[#111210] py-24 sm:py-32 lg:py-36 border-b border-[rgba(17,18,16,0.12)] select-none"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ============================================================ */}
        {/* CABEÇALHO EDITORIAL NO FLUXO NORMAL                          */}
        {/* ============================================================ */}
        <div className="max-w-2xl mb-14 sm:mb-18 lg:mb-22">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8B8B85] block mb-3 sm:mb-4">
            {t('gallery_tag', '02 // PRODUÇÃO REAL')}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-[#111210] font-normal leading-[1.2] tracking-tight">
            {t('gallery_headline', 'Da estratégia ao componente final.')}
          </h2>
        </div>

        {/* ============================================================ */}
        {/* GRID EDITORIAL ABERTA DE 12 COLUNAS                          */}
        {/* ============================================================ */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10"
        >
          {artifacts.map((card, idx) => (
            <motion.div
              key={card.id || idx}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0 : idx * 0.08,
                ease: EASING,
              }}
              className={`${card.gridClass} w-full relative group`}
            >
              <div className="w-full h-full rounded-[16px] overflow-hidden border border-[rgba(17,18,16,0.12)] bg-[#10110F] shadow-md transition-all duration-300 ease-out hover:scale-[1.015] hover:shadow-xl relative">
                <img
                  src={card.image}
                  alt={card.alt || card.title}
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Legenda Discreta Glassmorphic */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between text-white pointer-events-none z-10">
                  <div className="max-w-[75%]">
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-white/95 truncate drop-shadow-sm">
                      {card.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/75 font-semibold px-2.5 py-1 rounded-[8px] bg-white/10 backdrop-blur-md border border-white/15 shrink-0">
                    {card.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default OverlappingGallery;
