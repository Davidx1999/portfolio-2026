import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ThreeColumnGrid } from './ThreeColumnGrid';

export function CredibilitySection() {
  const { t } = useLanguage();

  const proofs = [
    {
      num: '01',
      title: 'Mais de 4 anos conduzindo a evolução de um mesmo produto.',
      desc: 'Continuidade real em um ecossistema complexo, conectando pesquisa contínua, arquitetura de informação e maturidade de interface.',
    },
    {
      num: '02',
      title: 'Design System, documentação e handoff para múltiplos módulos.',
      desc: 'Padronização através de Design Tokens e componentes modulares, acelerando entregas e eliminando retrabalho com a engenharia.',
    },
    {
      num: '03',
      title: 'Experiência em projetos com CEnPE, UFC e FGV DGPE.',
      desc: 'Soluções validadas com stakeholders e usuários reais em ambientes de alta exigência institucional e acadêmica.',
    },
  ];

  return (
    <section
      id="credibility"
      className="relative w-full bg-[#FAFAF7] text-[#111210] pt-12 pb-20 sm:pt-16 sm:pb-24 lg:py-32 border-b border-[rgba(17,18,16,0.1)] select-none"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ============================================================ */}
        {/* CABEÇALHO EDITORIAL: Método e Continuidade                   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-start mb-20 lg:mb-28">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B8B85] block mb-4">
              {t('cred_tag', 'MÉTODO & CONTINUIDADE')}
            </span>
            <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#111210]">
              {t('cred_headline', 'Projetos complexos exigem método, não improviso.')}
            </h2>
          </div>

          <div className="flex flex-col gap-5 text-[#111210]/80 text-[1.05rem] lg:text-[1.15rem] leading-relaxed max-w-xl lg:pt-8">
            <p>
              {t(
                'cred_p1',
                'Há mais de quatro anos, atuo na criação e evolução de um ecossistema digital de avaliação educacional, conectando pesquisa, arquitetura, interface, Design System, documentação e desenvolvimento.'
              )}
            </p>
            <p className="text-sm text-[#8B8B85]">
              {t(
                'cred_p2',
                'Esse trabalho inclui colaboração com CEnPE e Universidade Federal do Ceará em um projeto com FGV DGPE, além da validação contínua de soluções com usuários e stakeholders.'
              )}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TRÊS PROVAS PRINCIPAIS EM COMPOSIÇÃO EDITORIAL               */}
        {/* ============================================================ */}
        <div className="mb-20 lg:mb-24">
          <ThreeColumnGrid
            variant="informational"
            theme="light"
            items={proofs}
          />
        </div>

        {/* ============================================================ */}
        {/* FAIXA TIPOGRÁFICA DE IMPACTOS QUALITATIVOS                   */}
        {/* ============================================================ */}
        <div className="bg-[#10110F] text-[#F4F3EE] p-8 sm:p-12 lg:p-16 rounded-[24px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C7F000] block mb-3">
              IMPACTOS QUALITATIVOS
            </span>
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4F3EE] font-normal leading-snug">
              Mais consistência entre módulos, fluxos complexos simplificados e desenvolvimento mais eficiente.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7F000] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4F3EE]/70">
              ENTREGA VALIDADA
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
