import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Layout, Sparkles, Box } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function PrinciplesGrid() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const capabilities = [
    {
      num: '01',
      title: 'Estratégia',
      subtitle: 'Definição de Produto',
      desc: 'Alinhamento direto entre objetivos de negócio, restrições técnicas e necessidades reais de quem usa o produto.',
      icon: Compass,
      colSpan: 'lg:col-span-7',
      bg: 'bg-[#FAFAF7]',
    },
    {
      num: '02',
      title: 'Arquitetura',
      subtitle: 'Fluxos & Informação',
      desc: 'Estruturação de dados densos, mapeamento de jornadas e organização de ecossistemas complexos com clareza.',
      icon: Layout,
      colSpan: 'lg:col-span-5',
      bg: 'bg-[#FAFAF7]',
    },
    {
      num: '03',
      title: 'Interface',
      subtitle: 'Design Visual & UX',
      desc: 'Telas refinadas, hierarquia de leitura precisa, acessibilidade WCAG e microinterações de alto impacto.',
      icon: Sparkles,
      colSpan: 'lg:col-span-5',
      bg: 'bg-[#FAFAF7]',
    },
    {
      num: '04',
      title: 'Design Systems',
      subtitle: 'Componentes & Tokens',
      desc: 'Bibliotecas modulares prontas para escala, documentação detalhada e handoff integrado com engenharia.',
      icon: Box,
      colSpan: 'lg:col-span-7',
      bg: 'bg-[#FAFAF7]',
      hasVideo: true,
    },
  ];

  return (
    <section className="relative z-30 w-full bg-[#F1F0EB] text-[#111210] py-24 lg:py-32 border-b border-[rgba(17,18,16,0.12)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ============================================================ */}
        {/* CABEÇALHO DE PRINCÍPIOS                                      */}
        {/* ============================================================ */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B8B85] block mb-4">
            {t('principles_tag', 'CAPACIDADES & PRINCÍPIOS')}
          </span>
          <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#111210]">
            {t(
              'principles_headline',
              'Produtos digitais precisam funcionar antes de impressionar. Os melhores conseguem fazer os dois.'
            )}
          </h2>
        </div>

        {/* ============================================================ */}
        {/* GRID MODULAR ASSIMÉTRICA                                     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.num}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASING }}
                className={`${cap.colSpan} ${cap.bg} p-8 lg:p-10 border border-[rgba(17,18,16,0.12)] flex flex-col justify-between rounded-[1px] relative overflow-hidden group hover:border-[rgba(17,18,16,0.3)] transition-colors duration-300`}
              >
                <div>
                  {/* Header do Card */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-[#8B8B85]">
                      {cap.num} //
                    </span>
                    <div className="w-10 h-10 rounded-[1px] bg-[#111210] text-[#FAFAF7] flex items-center justify-center">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Títulos */}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#4056F4] font-bold block mb-1">
                    {cap.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#111210] font-normal mb-4">
                    {cap.title}
                  </h3>

                  {/* Descrição */}
                  <p className="font-sans text-xs sm:text-sm text-[#111210]/75 leading-relaxed max-w-md">
                    {cap.desc}
                  </p>
                </div>

                {/* Bloco de Vídeo de Apoio sutil para o Design System */}
                {cap.hasVideo && (
                  <div className="mt-8 w-full aspect-[21/9] bg-[#111210] rounded-[1px] overflow-hidden border border-[rgba(17,18,16,0.12)] relative">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-85"
                    >
                      <source
                        src={`${import.meta.env.BASE_URL}assets/videos/lines.mp4`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
