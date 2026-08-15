import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function OverlappingGallery() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Individual fan-out transforms for 5 real production artifacts
  const card1X = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '-38%']);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '-24%']);
  const card1Rotate = useTransform(scrollYProgress, [0.2, 0.7], ['0deg', '-8deg']);

  const card2X = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '36%']);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '-28%']);
  const card2Rotate = useTransform(scrollYProgress, [0.2, 0.7], ['0deg', '6deg']);

  const card3X = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '-32%']);
  const card3Y = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '30%']);
  const card3Rotate = useTransform(scrollYProgress, [0.2, 0.7], ['0deg', '4deg']);

  const card4X = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '34%']);
  const card4Y = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '26%']);
  const card4Rotate = useTransform(scrollYProgress, [0.2, 0.7], ['0deg', '-5deg']);

  const centerScale = useTransform(scrollYProgress, [0.2, 0.7], [0.85, 1.05]);

  const cards = [
    {
      title: 'Educação & Mapeamento',
      label: 'SaaS Platform',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
      style: {
        x: prefersReducedMotion ? 0 : card1X,
        y: prefersReducedMotion ? 0 : card1Y,
        rotate: prefersReducedMotion ? 0 : card1Rotate,
      },
      zIndex: 10,
    },
    {
      title: 'Design System & Componentes',
      label: 'UI Architecture',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
      style: {
        x: prefersReducedMotion ? 0 : card2X,
        y: prefersReducedMotion ? 0 : card2Y,
        rotate: prefersReducedMotion ? 0 : card2Rotate,
      },
      zIndex: 20,
    },
    {
      title: 'Interface Tátil & 3D',
      label: 'Interactive Hardware',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
      style: {
        x: prefersReducedMotion ? 0 : card3X,
        y: prefersReducedMotion ? 0 : card3Y,
        rotate: prefersReducedMotion ? 0 : card3Rotate,
      },
      zIndex: 15,
    },
    {
      title: 'Engenharia de Interfaces',
      label: 'Data Science & CLI',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_card.png`,
      style: {
        x: prefersReducedMotion ? 0 : card4X,
        y: prefersReducedMotion ? 0 : card4Y,
        rotate: prefersReducedMotion ? 0 : card4Rotate,
      },
      zIndex: 25,
    },
    {
      title: 'Fluxos & Arquitetura',
      label: 'Core Ecosystem',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
      style: {
        scale: prefersReducedMotion ? 1 : centerScale,
      },
      zIndex: 30,
      isCenter: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[140vh] bg-[#FAFAF7] text-[#111210] py-24 border-b border-[rgba(17,18,16,0.12)] overflow-hidden select-none"
    >
      <div className="sticky top-[54px] h-[calc(100svh-54px)] w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between items-center">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-xl mx-auto pt-6 z-40">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B8B85] block mb-2">
            {t('gallery_tag', 'PRODUÇÃO REAL')}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#111210] font-normal">
            {t('gallery_headline', 'Da estratégia ao componente final.')}
          </h2>
        </div>

        {/* Palco Central com Pilha Sobreposta em Expansão */}
        <div className="relative w-full h-[60vh] max-h-[500px] flex items-center justify-center">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              style={{
                ...card.style,
                zIndex: card.zIndex,
              }}
              className={`absolute w-[70vw] sm:w-[48vw] lg:w-[32vw] max-w-[440px] aspect-[16/11] bg-white rounded-[1px] shadow-xl border border-[rgba(17,18,16,0.14)] overflow-hidden transition-shadow hover:shadow-2xl`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-white">
                <span className="font-sans font-medium text-xs truncate max-w-[70%]">
                  {card.title}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/70">
                  {card.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé da seção */}
        <div className="pb-6 text-center text-[#8B8B85] font-mono text-[11px] uppercase tracking-wider z-40">
          <span>ROLE PARA EXPANDIR // EXPLORE OS DETALHES</span>
        </div>

      </div>
    </section>
  );
}
