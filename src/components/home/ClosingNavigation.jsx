import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';

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
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ============================================================ */}
        {/* CTA PRINCIPAL DE FECHAMENTO                                  */}
        {/* ============================================================ */}
        <div className="max-w-4xl mb-20 lg:mb-28">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#4056F4] block mb-4">
            {t('closing_tag', 'VAMOS TRABALHAR JUNTOS')}
          </span>
          <h2 className="font-serif text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-8">
            {t('closing_headline', 'Vamos construir algo que funcione — e que seja lembrado.')}
          </h2>
          
          <CurtainLink
            to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#111210] bg-[#FAFAF7] hover:bg-[#4056F4] hover:text-white active:scale-[0.98] transition-all duration-300 rounded-[1px] shadow-md focus-visible:outline-2 focus-visible:outline-[#4056F4]"
          >
            <span>{t('closing_cta', 'VAMOS CONVERSAR')}</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </CurtainLink>
        </div>

        {/* ============================================================ */}
        {/* TRÊS GRANDES CAMINHOS EDITORIAIS                             */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/15">
          {pathways.map((item, idx) => (
            <CurtainLink
              key={idx}
              to={item.link}
              className={`group flex flex-col justify-between p-8 sm:p-10 border-b md:border-b-0 border-white/15 ${
                idx < 2 ? 'md:border-r border-white/15' : ''
              } hover:bg-white/[0.03] transition-colors duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-bold text-[#8B8B85]">
                    {item.num} //
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-normal mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase text-white/50 group-hover:text-[#4056F4] transition-colors">
                <span>ACESSAR</span>
                <span>→</span>
              </div>
            </CurtainLink>
          ))}
        </div>

      </div>
    </section>
  );
}
