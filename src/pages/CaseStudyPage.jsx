import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import { useCaseStudy } from '../hooks/useCaseStudy';
import { useLanguage } from '../context/LanguageContext';
import { CurtainLink } from '../context/RouteCurtainContext';
import { CaseHero } from '../components/case/CaseHero';
import { CaseHeroDiagonal } from '../components/case/CaseHeroDiagonal';
import { CaseThesis } from '../components/case/CaseThesis';
import { CaseOverview } from '../components/case/CaseOverview';
import { CaseTableOfContents } from '../components/case/CaseTableOfContents';
import { CaseContentRenderer } from '../components/case/CaseContentRenderer';
import { CaseSolutionImpact } from '../components/case/CaseSolutionImpact';
import { CaseReflection } from '../components/case/CaseReflection';
import { CaseNextProject } from '../components/case/CaseNextProject';
import { ClosingNavigation } from '../components/home/ClosingNavigation';

export function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug || params.projectId || 'mapear';
  const { caseStudy, nextCase, loading, error } = useCaseStudy(slug);
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Update SEO Document Title
  useEffect(() => {
    if (caseStudy) {
      const metaTitle =
        language === 'en' && caseStudy.seo?.metaTitle_en
          ? caseStudy.seo.metaTitle_en
          : caseStudy.seo?.metaTitle || `${caseStudy.title} — David Salviano`;
      document.title = metaTitle;
    } else {
      document.title = 'Case Study — David Salviano';
    }
  }, [caseStudy, language]);

  // Loading State
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#10110F] text-[#FAFAF7] flex items-center justify-center pt-24 pb-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-[#C4FF00] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
            {language === 'en' ? 'LOADING CASE STUDY...' : 'CARREGANDO ESTUDO DE CASO...'}
          </span>
        </div>
      </div>
    );
  }

  // Not Found / 404 State
  if (!caseStudy) {
    return (
      <div className="w-full min-h-screen bg-[#10110F] text-[#FAFAF7] flex flex-col justify-between pt-28 pb-16">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 my-auto text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-4">
            404 // CASE STUDY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal mb-6">
            {language === 'en' ? 'Case study not found or unpublished.' : 'Estudo de caso não encontrado ou não publicado.'}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/70 max-w-md mx-auto mb-8">
            {language === 'en'
              ? 'The requested project could not be found. Explore our complete selected work index.'
              : 'O projeto solicitado não foi localizado. Explore nosso índice completo de trabalhos selecionados.'}
          </p>
          <CurtainLink
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C4FF00] hover:bg-[#d4ff1a] text-[#10110F] font-mono text-xs font-bold uppercase tracking-wider rounded-[12px] transition-all"
          >
            <ArrowLeft size={14} />
            <span>{language === 'en' ? 'Back to Selected Work' : 'Voltar para Trabalhos'}</span>
          </CurtainLink>
        </div>

        <ClosingNavigation />
      </div>
    );
  }

  // Define Table of Contents sections
  const sections = [
    { id: 'overview-section', label: language === 'en' ? '01. Overview' : '01. Contexto' },
    { id: 'solution-section', label: language === 'en' ? '02. Solution' : '02. Solução' },
    ...(caseStudy.reflection
      ? [{ id: 'reflection-section', label: language === 'en' ? '03. Reflection' : '03. Reflexão' }]
      : []),
  ];

  return (
    <div className="w-full min-h-screen bg-[#10110F] text-[#FAFAF7] select-none">
      {/* Table of Contents for Long Cases */}
      <CaseTableOfContents sections={sections} />

      {/* 1. Hero do Case com Metadados e Mídia Principal (Diagonal Reveal) */}
      <CaseHeroDiagonal caseStudy={caseStudy} />

      {/* 2. Frase Central / Tese do Projeto */}
      <CaseThesis thesis={caseStudy.thesis} thesis_en={caseStudy.thesis_en} />

      {/* 3. Visão Geral: Contexto, Desafio e Minha Atuação */}
      <CaseOverview caseStudy={caseStudy} />

      {/* 4. Blocos Modulares de Conteúdo (Content Blocks do Sanity) */}
      <CaseContentRenderer contentBlocks={caseStudy.contentBlocks} />

      {/* 5. Solução Estruturada e Impacto Real */}
      <CaseSolutionImpact caseStudy={caseStudy} />

      {/* 6. Reflexão Pessoal em Primeira Pessoa */}
      <CaseReflection
        reflection={caseStudy.reflection}
        reflection_en={caseStudy.reflection_en}
      />

      {/* 7. Próximo Projeto / Próximo Case */}
      <CaseNextProject nextCase={nextCase} />

      {/* 8. Fechamento e Navegação Compartilhada */}
      <ClosingNavigation />
    </div>
  );
}

export default CaseStudyPage;
