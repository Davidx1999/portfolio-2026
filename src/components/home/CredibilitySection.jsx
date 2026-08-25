import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { ThreeColumnGrid } from './ThreeColumnGrid';

export function CredibilitySection() {
  const { t } = useTranslation(['home']);
  const { language } = useLanguage();

  const isPt = language === 'pt';

  const proofs = isPt
    ? [
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
      ]
    : [
        {
          num: '01',
          title: 'Over 4 years leading the evolution of the same product.',
          desc: 'Real continuity in a complex ecosystem, connecting continuous research, information architecture, and interface maturity.',
        },
        {
          num: '02',
          title: 'Design System, documentation, and handoff across multiple modules.',
          desc: 'Standardization through Design Tokens and modular components, speeding up delivery and eliminating engineering rework.',
        },
        {
          num: '03',
          title: 'Experience in projects with CEnPE, UFC, and FGV DGPE.',
          desc: 'Solutions validated with stakeholders and real users in demanding institutional and academic environments.',
        },
      ];

  return (
    <section
      id="credibility"
      className="relative z-20 w-full bg-[#FAFAF7] text-[#111210] pt-12 pb-20 sm:pt-16 sm:pb-24 lg:py-32 border-b border-[rgba(17,18,16,0.1)] select-none"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ============================================================ */}
        {/* CABEÇALHO EDITORIAL: Método e Continuidade                   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-start mb-20 lg:mb-28">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B8B85] block mb-4">
              {t('home:cred_tag', 'METHOD & CONTINUITY')}
            </span>
            <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#111210]">
              {t('home:cred_headline', 'Complex digital products require rigorous systems, not improvisation.')}
            </h2>
          </div>

          <div className="flex flex-col gap-5 text-[#111210]/80 text-[1.05rem] lg:text-[1.15rem] leading-relaxed max-w-xl lg:pt-8">
            <p>
              {isPt
                ? 'Há mais de quatro anos, atuo na criação e evolução de um ecossistema digital de avaliação educacional, conectando pesquisa, arquitetura, interface, Design System, documentação e desenvolvimento.'
                : 'For more than four years, I have driven the creation and evolution of an educational assessment digital ecosystem, bridging research, architecture, interface, Design Systems, documentation, and development.'}
            </p>
            <p className="text-sm text-[#8B8B85]">
              {isPt
                ? 'Esse trabalho inclui colaboração com CEnPE e Universidade Federal do Ceará em um projeto com FGV DGPE, além da validação contínua de soluções com usuários e stakeholders.'
                : 'This work includes collaboration with CEnPE and Federal University of Ceará on a project with FGV DGPE, alongside continuous validation with users and stakeholders.'}
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
              {isPt ? 'IMPACTOS QUALITATIVOS' : 'QUALITATIVE IMPACT'}
            </span>
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4F3EE] font-normal leading-snug">
              {isPt
                ? 'Mais consistência entre módulos, fluxos complexos simplificados e desenvolvimento mais eficiente.'
                : 'Stronger consistency across modules, simplified complex workflows, and streamlined engineering execution.'}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7F000] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4F3EE]/70">
              {isPt ? 'ENTREGA VALIDADA' : 'VALIDATED DELIVERY'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
