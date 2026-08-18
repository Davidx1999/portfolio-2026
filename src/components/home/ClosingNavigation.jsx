import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { ThreeColumnGrid } from './ThreeColumnGrid';
import { RollingButton } from '../RollingButton';

export function ClosingNavigation() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const pathways = [
    {
      num: '01',
      title: 'Projetos',
      desc: 'Explore a coleção completa de estudos de caso e produtos digitais.',
      link: '/work',
    },
    {
      num: '02',
      title: 'Sobre Mim',
      desc: 'Conheça minha trajetória, princípios de design e ferramentas.',
      link: '/about',
    },
    {
      num: '03',
      title: 'Fale Comigo',
      desc: 'Inicie uma conversa sobre consultoria, freelance ou novo produto.',
      link: '/contact',
    },
  ];

  return (
    <section className="relative w-full bg-[#111210] text-[#FAFAF7] py-24 lg:py-32 select-none">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ============================================================ */}
        {/* CTA PRINCIPAL DE FECHAMENTO                                  */}
        {/* ============================================================ */}
        <div className="max-w-4xl mb-20 lg:mb-28">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#C7F000] block mb-4">
            {t('closing_tag', 'VAMOS TRABALHAR JUNTOS')}
          </span>
          <h2 className="font-serif text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-8">
            {t('closing_headline', 'Vamos construir algo que funcione e que seja lembrado.')}
          </h2>

          <RollingButton
            variant="light"
            size="lg"
            to="/contact"
            icon={<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          >
            {t('closing_cta', 'VAMOS CONVERSAR')}
          </RollingButton>
        </div>

        {/* ============================================================ */}
        {/* TRÊS GRANDES CAMINHOS EDITORIAIS                             */}
        {/* ============================================================ */}
        <ThreeColumnGrid
          variant="navigation"
          theme="dark"
          items={pathways}
        />

      </div>
    </section>
  );
}
