import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCaseStudy } from '../hooks/useCaseStudy';
import { useLanguage } from '../context/LanguageContext';
import { CurtainLink } from '../context/RouteCurtainContext';
import { CaseHeroCover } from '../components/case/CaseHeroCover';
import { CaseEditorialHeader } from '../components/case/CaseEditorialHeader';
import { CaseThesis } from '../components/case/CaseThesis';
import { CaseOverview } from '../components/case/CaseOverview';
import { CaseTableOfContents } from '../components/case/CaseTableOfContents';
import { CaseContentRenderer } from '../components/case/CaseContentRenderer';
import { CaseSolutionImpact } from '../components/case/CaseSolutionImpact';
import { CaseReflection } from '../components/case/CaseReflection';
import { CaseNextProject } from '../components/case/CaseNextProject';

/**
 * CaseStudyPage
 * Template editorial reutilizável, performático e orientado pelo Sanity CMS.
 * Acomoda cases extensos, projetos compactos, estudos independentes e trabalhos com clientes.
 */
export function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug || params.projectId || 'mapear';
  const { caseStudy, nextCase, currentIndex, totalProjects, loading } = useCaseStudy(slug);
  const { language } = useLanguage();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Update Document Title & SEO Meta
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

  // Build dynamic Table of Contents sections
  const tocSections = useMemo(() => {
    if (!caseStudy) return [];
    const list = [];

    if (caseStudy.overview || caseStudy.challenge || (caseStudy.responsibilities && caseStudy.responsibilities.length > 0)) {
      list.push({ id: 'overview-section', label: language === 'en' ? '01. Overview' : '01. Contexto' });
    }

    if (caseStudy.solution || caseStudy.impact) {
      list.push({ id: 'solution-section', label: language === 'en' ? '02. Solution' : '02. Solução' });
    }

    if (caseStudy.reflection) {
      list.push({ id: 'reflection-section', label: language === 'en' ? '03. Reflection' : '03. Reflexão' });
    }

    return list;
  }, [caseStudy, language]);

  // Loading State
  if (loading) {
    return (
      <div className="w-full min-h-[100svh] bg-[#10110F] text-[#FAFAF7] flex items-center justify-center pt-24 pb-16">
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
      <div className="w-full min-h-[100svh] bg-[#10110F] text-[#FAFAF7] flex flex-col justify-center items-center py-32">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
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
      </div>
    );
  }

  return (
    <article className="w-full bg-[#10110F] text-[#FAFAF7] relative">
      {/* Sumário Flutuante para Cases Extensos */}
      <CaseTableOfContents sections={tocSections} />

      {/* ============================================================ */}
      {/* 1. HERO VISUAL STICKY                                        */}
      {/* Ocupa exatamente calc(100svh - var(--header-safe-offset))    */}
      {/* ============================================================ */}
      <CaseHeroCover caseStudy={caseStudy} />

      {/* ============================================================ */}
      {/* 2. FOLHA EDITORIAL FRONTAL (Passa à frente da mídia sticky)  */}
      {/* Cantos superiores arredondados, sem vazamento ou gaps        */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full bg-[#10110F] rounded-t-[28px] sm:rounded-t-[36px] shadow-[0_-20px_50px_rgba(0,0,0,0.6)] border-t border-[rgba(244,243,238,0.12)]">
        
        {/* Abertura Editorial: Link Voltar, Eyebrow, Título, Descrição e Metadados */}
        <CaseEditorialHeader caseStudy={caseStudy} />

        {/* Tese / Pergunta Central (se informada) */}
        {caseStudy.thesis && (
          <CaseThesis thesis={caseStudy.thesis} thesis_en={caseStudy.thesis_en} />
        )}

        {/* Visão Geral: Contexto, Desafio e Atuação (Preserva estrutura editorial) */}
        <CaseOverview caseStudy={caseStudy} />

        {/* Blocos Modulares do Sanity (Vídeo Protótipo, Decisões, Resultados, Mídias, etc.) */}
        {Array.isArray(caseStudy.contentBlocks) && caseStudy.contentBlocks.length > 0 && (
          <CaseContentRenderer contentBlocks={caseStudy.contentBlocks} />
        )}

        {/* Solução Estruturada e Impacto Qualitativo (se preenchidos nos metadados raiz) */}
        <CaseSolutionImpact caseStudy={caseStudy} />

        {/* Reflexão Pessoal em Primeira Pessoa (se informada) */}
        {caseStudy.reflection && (
          <CaseReflection
            reflection={caseStudy.reflection}
            reflection_en={caseStudy.reflection_en}
          />
        )}

        {/* Continue Explorando (Redesenhado com preview panorâmico e navegação de fechamento) */}
        <CaseNextProject
          nextCase={nextCase}
          currentIndex={currentIndex}
          totalProjects={totalProjects}
        />
      </div>
    </article>
  );
}

export default CaseStudyPage;
