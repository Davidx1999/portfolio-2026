import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { ThreeColumnGrid } from './ThreeColumnGrid';
import { RollingButton } from '../RollingButton';

export function ClosingNavigation() {
  const { t } = useTranslation(['home']);
  const { language } = useLanguage();

  const isPt = language === 'pt';

  const pathways = isPt
    ? [
        {
          num: '01',
          title: 'Projetos',
          desc: 'Explore a coleção completa de estudos de caso e produtos digitais.',
          link: `/${language}/work`,
          actionLabel: 'ACESSAR',
        },
        {
          num: '02',
          title: 'Sobre Mim',
          desc: 'Conheça minha trajetória, princípios de design e ferramentas.',
          link: `/${language}/about`,
          actionLabel: 'ACESSAR',
        },
        {
          num: '03',
          title: 'Fale Comigo',
          desc: 'Inicie uma conversa sobre consultoria, freelance ou novo produto.',
          link: `/${language}/contact`,
          actionLabel: 'ACESSAR',
        },
      ]
    : [
        {
          num: '01',
          title: 'Work',
          desc: 'Explore the complete collection of case studies and digital products.',
          link: `/${language}/work`,
          actionLabel: 'EXPLORE',
        },
        {
          num: '02',
          title: 'About Me',
          desc: 'Learn about my trajectory, design principles, and toolkit.',
          link: `/${language}/about`,
          actionLabel: 'EXPLORE',
        },
        {
          num: '03',
          title: "Let's Talk",
          desc: 'Start a conversation about consulting, freelance, or a new product.',
          link: `/${language}/contact`,
          actionLabel: 'EXPLORE',
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
            {t('home:closing_tag', "LET'S WORK TOGETHER")}
          </span>
          <h2 className="font-serif text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-8">
            {t('home:closing_headline', "Let's build something that works and gets remembered.")}
          </h2>

          <RollingButton
            variant="light"
            size="lg"
            to={`/${language}/contact`}
            icon={<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          >
            {t('home:closing_cta', "LET'S TALK")}
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

export default ClosingNavigation;
