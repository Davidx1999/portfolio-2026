import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ArrowDown } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useLanguage } from '../context/LanguageContext';
import { ReconstructMedia } from '../components/ReconstructMedia';
import { ClosingNavigation } from '../components/home/ClosingNavigation';

const EASING = [0.22, 1, 0.36, 1];

const getProjectLink = (id) => {
  return `/cases/${id}`;
};

export function Work() {
  const { allWork: projects, playgroundProjects, loading } = useProjects();
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // 1. Controle de Visualização com persistência de sessão
  const [viewMode, setViewMode] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio_work_view') || 'visual';
    } catch {
      return 'visual';
    }
  });

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    try {
      sessionStorage.setItem('portfolio_work_view', mode);
    } catch {
      // Ignore storage errors
    }
  };

  // 2. Filtros dinâmicos e Estados de Interação
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [expandedDossierId, setExpandedDossierId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredIndexRowId, setHoveredIndexRowId] = useState(null);

  // Fechar dossiê com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setExpandedDossierId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Extração dinâmica de categorias do Sanity
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Projetos filtrados
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const totalCount = projects.length;
  const currentCount = filteredProjects.length;

  const handleScrollDown = () => {
    const target = document.getElementById('work-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDossier = (id) => {
    setExpandedDossierId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full min-h-screen bg-[#10110F] text-[#FAFAF7] select-none">
      {/* ============================================================ */}
      {/* 1. INTRODUÇÃO AUTORAL DA PÁGINA WORK (COMPACTADA)             */}
      {/* ============================================================ */}
      <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-10 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="flex items-center gap-3 mb-3.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C4FF00]">
                {t('work_intro_eyebrow', 'SELECTED WORK / 2021—2026')}
              </span>
            </motion.div>

            {/* Headline Principal Editorial Compacta */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASING }}
              className="font-serif text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] font-normal leading-[1.04] tracking-tight text-[#FAFAF7] max-w-[980px] mb-4"
            >
              {t(
                'work_intro_title',
                'Produtos, sistemas e experiências construídos para organizar complexidade.'
              )}
            </motion.h1>

            {/* Texto de Apoio */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASING }}
              className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/75 leading-relaxed max-w-2xl mb-6"
            >
              {t(
                'work_intro_text',
                'Uma seleção de projetos em que estratégia, arquitetura, interface e Design Systems trabalharam como partes do mesmo produto.'
              )}
            </motion.p>
          </div>

          {/* Meta Bar: Contador Real + Indicador de Scroll */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pt-5 border-t border-[rgba(244,243,238,0.16)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs text-[#F4F3EE]/60 tracking-wider">
              <span className="text-[#C4FF00] font-bold">
                [ 0{totalCount} {t('work_projects_count', 'PROJETOS')} ]
              </span>
              <span className="text-white/20">•</span>
              <span className="uppercase">SaaS · Design Systems · Interface</span>
            </div>

            <button
              type="button"
              onClick={handleScrollDown}
              className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F4F3EE]/70 hover:text-[#C4FF00] transition-colors cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
              aria-label="Rolar para os projetos"
            >
              <span>EXPLORAR</span>
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BARRA DE CONTROLES: FILTROS + ALTERNADOR VISUAL / INDEX   */}
      {/* ============================================================ */}
      <section id="work-content" className="sticky top-[54px] z-40 w-full bg-[#10110F] border-b border-[rgba(244,243,238,0.16)]">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Filtros de Categoria (exibidos somente se houver >= 2 categorias) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {categories.length >= 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveCategory('ALL')}
                  className={`px-3 py-1.5 rounded-[10px] font-mono text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C4FF00] border ${
                    activeCategory === 'ALL'
                      ? 'bg-white text-[#10110F] border-white'
                      : 'text-[#F4F3EE]/60 hover:text-[#F4F3EE] hover:bg-white/5 border-transparent'
                  }`}
                >
                  {t('work_filter_all', 'Todos')} ({totalCount})
                </button>
                {categories.map((cat) => {
                  const count = projects.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-[10px] font-mono text-[11px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C4FF00] border ${
                        activeCategory === cat
                          ? 'bg-white text-[#10110F] border-white'
                          : 'text-[#F4F3EE]/60 hover:text-[#F4F3EE] hover:bg-white/5 border-transparent'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* Alternador de Visualização: Visual / Index */}
          {totalCount >= 4 && (
            <div
              role="group"
              aria-label="Modo de visualização dos projetos"
              className="flex items-center p-1 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[12px] self-start md:self-auto"
            >
              <button
                type="button"
                role="button"
                aria-pressed={viewMode === 'visual'}
                onClick={() => handleSetViewMode('visual')}
                className={`relative px-3.5 py-1 rounded-[8px] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C4FF00] ${
                  viewMode === 'visual' ? 'text-[#10110F]' : 'text-[#F4F3EE]/60 hover:text-[#F4F3EE]'
                }`}
              >
                {viewMode === 'visual' && (
                  <motion.div
                    layoutId="activeViewTab"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-[#C4FF00] rounded-[8px] -z-0"
                  />
                )}
                <span className="relative z-10">{t('work_view_visual', 'Visual')}</span>
              </button>

              <button
                type="button"
                role="button"
                aria-pressed={viewMode === 'index'}
                onClick={() => handleSetViewMode('index')}
                className={`relative px-3.5 py-1 rounded-[8px] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C4FF00] ${
                  viewMode === 'index' ? 'text-[#10110F]' : 'text-[#F4F3EE]/60 hover:text-[#F4F3EE]'
                }`}
              >
                {viewMode === 'index' && (
                  <motion.div
                    layoutId="activeViewTab"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-[#C4FF00] rounded-[8px] -z-0"
                  />
                )}
                <span className="relative z-10">{t('work_view_index', 'Index')}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MODO VISUAL: GRID COM MESMO PESO & MÍDIA FULL-BLEED       */}
      {/* ============================================================ */}
      {viewMode === 'visual' && (
        <section className="w-full py-12 lg:py-16 bg-[#10110F]">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              {filteredProjects.map((project, index) => {
                const isHovered = hoveredCardId === project.id;
                const link = getProjectLink(project.id);
                // Ritmo editorial discreto: coluna 2 com leve offset no desktop
                const staggerClass = index % 3 === 1 ? 'lg:translate-y-8' : '';

                return (
                  <motion.article
                    key={project.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: EASING }}
                    onMouseEnter={() => setHoveredCardId(project.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`group relative w-full aspect-[4/3] rounded-[18px] overflow-hidden border border-[rgba(244,243,238,0.18)] hover:border-[rgba(196,255,0,0.5)] transition-colors duration-500 bg-[#10110F] ${staggerClass}`}
                  >
                    <Link
                      to={link}
                      className="absolute inset-0 w-full h-full block focus-visible:outline-2 focus-visible:outline-[#C4FF00] focus-visible:outline-offset-2"
                      aria-label={`${project.title} - ${project.category}`}
                    >
                      {/* 1. MÍDIA FULL-BLEED COM RECONSTRUCTMEDIA */}
                      <div className="absolute inset-0 w-full h-full">
                        <ReconstructMedia
                          initialImage={project.processImage || project.image}
                          finalImage={project.finalImage || project.image}
                          alt={project.alt || project.title}
                          isHovered={isHovered}
                          aspectRatio="w-full h-full"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                      </div>

                      {/* 2. IDENTIFICAÇÃO SUPERIOR (Sólida, sem blur, discreta) */}
                      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-20">
                        <span className="px-2.5 py-1 bg-[#10110F] border border-[rgba(244,243,238,0.18)] rounded-[8px] font-mono text-[10px] uppercase font-bold tracking-wider text-[#C4FF00]">
                          {project.category || 'Product Design'}
                        </span>
                        <span className="px-2.5 py-1 bg-[#10110F] border border-[rgba(244,243,238,0.18)] rounded-[8px] font-mono text-[10px] uppercase tracking-wider text-[#F4F3EE]/80">
                          {project.period || project.year || '2024'}
                        </span>
                      </div>

                      {/* 3. INFORMAÇÕES INFERIORES (Transiciona para overlay no hover permitindo que a imagem preencha 100% da altura da box) */}
                      <div
                        className={`absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 flex flex-col justify-center transition-all duration-500 ${
                          isHovered
                            ? 'bg-gradient-to-t from-[#10110F]/90 via-[#10110F]/40 to-transparent border-t-0'
                            : 'bg-[#10110F] border-t border-[rgba(244,243,238,0.16)]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h2 className="font-serif text-lg sm:text-xl text-[#FAFAF7] font-normal truncate group-hover:text-[#C4FF00] transition-colors">
                              {project.title}
                            </h2>
                            <p className="font-mono text-[11px] text-[#F4F3EE]/60 truncate mt-0.5">
                              {isHovered && project.role ? project.role : (project.context || project.category || 'Digital Product')}
                            </p>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-[#151613] border border-[rgba(244,243,238,0.18)] text-white/70 group-hover:text-[#10110F] group-hover:bg-[#C4FF00] group-hover:border-[#C4FF00] flex items-center justify-center transition-all duration-300 flex-shrink-0">
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. MODO INDEX: SISTEMA VISUAL CONTÍNUO COM PREVIEW DRAWER     */}
      {/* ============================================================ */}
      {viewMode === 'index' && (
        <section className="w-full py-12 lg:py-16 bg-[#10110F]">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* FRAME PRINCIPAL CONTÍNUO DO INDEX */}
            <div className="w-full bg-[#10110F] border border-[rgba(244,243,238,0.16)] rounded-[18px] relative">
              
              {/* Cabeçalho Tabular Sólido (Desktop) */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 h-14 px-6 sm:px-8 items-center bg-[#151613] border-b border-[rgba(244,243,238,0.16)] font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F4F3EE]/50 rounded-t-[18px]">
                <div className="col-span-4">{t('work_table_project', 'Project')}</div>
                <div className="col-span-3">{t('work_table_role', 'Role & Scope')}</div>
                <div className="col-span-3">{t('work_table_context', 'Context')}</div>
                <div className="col-span-1">{t('work_table_period', 'Period')}</div>
                <div className="col-span-1 text-right">{t('work_table_action', 'Action')}</div>
              </div>

              {/* Linhas do Index */}
              <div className="divide-y divide-[rgba(244,243,238,0.16)]">
                {filteredProjects.map((project, pIndex) => {
                  const isExpanded = expandedDossierId === project.id;
                  const isHovered = hoveredIndexRowId === project.id;
                  const isLast = pIndex === filteredProjects.length - 1;
                  const link = getProjectLink(project.id);
                  const previewImg = project.finalImage || project.image || project.processImage;

                  return (
                    <div
                      key={project.id}
                      onMouseEnter={() => setHoveredIndexRowId(project.id)}
                      onMouseLeave={() => setHoveredIndexRowId(null)}
                      className={`relative transition-colors duration-300 ${
                        isHovered ? 'z-40' : 'z-10'
                      } ${pIndex === 0 ? 'first:rounded-t-[18px] md:first:rounded-t-none' : ''} ${
                        isLast && !isExpanded ? 'rounded-b-[18px]' : ''
                      } ${
                        isExpanded ? 'bg-[#151613]' : 'bg-[#10110F] hover:bg-[#151613]'
                      }`}
                    >
                      {/* Linha Principal Clicável */}
                      <button
                        type="button"
                        onClick={() => toggleDossier(project.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleDossier(project.id);
                          }
                        }}
                        className={`group w-full min-h-[84px] py-5 px-6 sm:px-8 text-left cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-4 items-center focus-visible:outline-2 focus-visible:outline-[#C4FF00] focus-visible:outline-offset-[-2px] transition-all duration-300 ${
                          pIndex === 0 ? 'first:rounded-t-[18px] md:first:rounded-t-none' : ''
                        } ${isLast && !isExpanded ? 'rounded-b-[18px]' : ''}`}
                        aria-expanded={isExpanded}
                        aria-controls={`dossier-${project.id}`}
                      >
                        {/* Coluna 1: Projeto */}
                        <div className="col-span-4 flex items-center gap-3.5">
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isExpanded || isHovered
                                ? 'bg-[#C4FF00] scale-125'
                                : 'bg-[#F4F3EE]/30'
                            }`}
                          />
                          <span className="font-serif text-xl sm:text-2xl text-[#FAFAF7] font-normal tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
                            {project.title}
                          </span>
                        </div>

                        {/* Coluna 2: Atuação / Papel */}
                        <div className="col-span-3 font-mono text-xs text-[#F4F3EE]/80">
                          <span className="md:hidden text-white/40 block mb-0.5">
                            {t('work_table_role', 'Atuação')}:
                          </span>
                          {project.role || 'Product Designer'}
                        </div>

                        {/* Coluna 3: Contexto */}
                        <div className="col-span-3 font-sans text-xs sm:text-sm text-[#F4F3EE]/65">
                          <span className="md:hidden text-white/40 block mb-0.5">
                            {t('work_table_context', 'Contexto')}:
                          </span>
                          {project.context || project.category || 'Digital Product'}
                        </div>

                        {/* Coluna 4: Período */}
                        <div className="col-span-1 font-mono text-xs text-[#F4F3EE]/60">
                          {project.period || project.year || '2024'}
                        </div>

                        {/* Coluna 5: Ação / Indicador */}
                        <div className="col-span-1 flex items-center justify-end gap-2 font-mono text-xs font-bold text-[#C4FF00]">
                          <span className="hidden sm:inline">
                            {isExpanded
                              ? t('work_action_close', 'Fechar')
                              : t('work_action_dossier', 'Ver dossiê')}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-[#C4FF00]' : 'text-white/40 group-hover:text-[#C4FF00]'
                            }`}
                          />
                        </div>
                      </button>

                      {/* ============================================================ */}
                      {/* PREVIEW DE IMAGEM NO HOVER (DOCUMENT DRAWER - DESKTOP ONLY)  */}
                      {/* ============================================================ */}
                      {!prefersReducedMotion && (
                        <AnimatePresence>
                          {isHovered && !isExpanded && previewImg && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: 10,
                                scale: 0.96,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                y: 6,
                                scale: 0.98,
                              }}
                              transition={{
                                duration: 0.28,
                                ease: EASING,
                              }}
                              className="hidden md:block absolute left-8 top-full -mt-2 w-[420px] aspect-[16/10] bg-[#10110F] border border-[rgba(244,243,238,0.24)] rounded-[14px] overflow-hidden pointer-events-none z-50 shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
                            >
                              <img
                                src={previewImg}
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/60 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#10110F]/90 backdrop-blur-sm border border-white/10 rounded-[6px] font-mono text-[9px] uppercase tracking-wider text-[#F4F3EE]/80">
                                {project.title} · Preview
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* ============================================================ */}
                      {/* DOSSIÊ TÉCNICO EXPANSÍVEL (DENTRO DO MESMO FRAME CONTÍNUO)   */}
                      {/* ============================================================ */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`dossier-${project.id}`}
                            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: EASING }}
                            className={`overflow-hidden border-t border-[rgba(244,243,238,0.16)] bg-[#151613] ${
                              isLast ? 'rounded-b-[18px]' : ''
                            }`}
                          >
                            <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                              
                              {/* Lado Esquerdo: Imagem Landscape (~48%) */}
                              <div className="lg:col-span-6 w-full rounded-[14px] overflow-hidden border border-[rgba(244,243,238,0.16)] bg-[#10110F] aspect-[16/10]">
                                <img
                                  src={project.finalImage || project.image || project.processImage}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Lado Direito: Informações Técnicas (~52%) */}
                              <div className="lg:col-span-6 flex flex-col justify-between h-full gap-6">
                                <div>
                                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4FF00] font-bold block mb-2">
                                    {t('work_dossier_challenge', 'DESAFIO & ARQUITETURA')}
                                  </span>

                                  <h3 className="font-serif text-2xl text-white font-normal mb-3">
                                    {project.title}
                                  </h3>

                                  <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/80 leading-relaxed mb-6">
                                    {project.challenge || project.description}
                                  </p>

                                  {/* Passos do Processo */}
                                  {project.process && project.process.length > 0 && (
                                    <div className="mb-6">
                                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-bold">
                                        {t('work_dossier_process', 'Etapas de Execução')}:
                                      </span>
                                      <ul className="space-y-1.5 font-sans text-xs text-[#F4F3EE]/75">
                                        {project.process.map((step, sIdx) => (
                                          <li key={sIdx} className="flex items-start gap-2">
                                            <span className="text-[#C4FF00] font-mono text-[10px] mt-0.5">
                                              0{sIdx + 1}.
                                            </span>
                                            <span>{step}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Tags */}
                                  {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {project.tags.map((tag, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className="px-2.5 py-1 bg-white/[0.05] border border-[rgba(244,243,238,0.12)] rounded-[6px] font-mono text-[10px] uppercase tracking-wider text-[#F4F3EE]/70"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Linha Inferior com Contexto e Botão Ver Case */}
                                <div className="pt-6 border-t border-[rgba(244,243,238,0.16)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <span className="font-mono text-xs text-white/40">
                                    {project.context || project.category || 'Digital Product'}
                                  </span>

                                  {link ? (
                                    <Link
                                      to={link}
                                      className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase text-[#10110F] bg-[#C4FF00] hover:bg-[#d8ff1a] transition-all rounded-[12px]"
                                    >
                                      <span>{t('work_action_view_case', 'Ver case')} ↗</span>
                                    </Link>
                                  ) : (
                                    <span className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase text-[#F4F3EE]/40 bg-white/5 border border-white/10 rounded-[12px] cursor-not-allowed">
                                      {t('work_coming_soon', 'Em breve')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. SEÇÃO DE ARTEFATOS COMPLEMENTARES ("ALÉM DOS CASES")       */}
      {/* ============================================================ */}
      {playgroundProjects && playgroundProjects.length > 0 && (
        <section className="w-full py-20 border-t border-[rgba(244,243,238,0.16)] bg-[#10110F]">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#8B7EC8] block mb-3">
                {t('work_artifacts_title', 'ALÉM DOS CASES')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAFAF7] font-normal leading-tight mb-4">
                Artefatos, documentação e experimentações técnicas.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/70 leading-relaxed">
                {t(
                  'work_artifacts_subtitle',
                  'Documentação técnica, Design Tokens, fluxos de arquitetura e protótipos de interação.'
                )}
              </p>
            </div>

            {/* Grid Modular de Artefatos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playgroundProjects.slice(0, 4).map((artifact, aIdx) => (
                <div
                  key={artifact.id}
                  className="bg-[#151613] border border-[rgba(244,243,238,0.16)] p-6 rounded-[16px] flex flex-col justify-between gap-6 hover:border-[rgba(244,243,238,0.28)] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-white/50 mb-4">
                      <span>0{aIdx + 1} //</span>
                      <span className="text-[#8B7EC8] font-bold">{artifact.category}</span>
                    </div>

                    <h3 className="font-serif text-xl text-white font-normal mb-2">
                      {artifact.title}
                    </h3>

                    <p className="font-sans text-xs text-[#F4F3EE]/65 leading-relaxed">
                      {artifact.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {artifact.tags &&
                      artifact.tags.slice(0, 2).map((tItem, tIndex) => (
                        <span
                          key={tIndex}
                          className="font-mono text-[9px] text-white/40 uppercase tracking-wider"
                        >
                          #{tItem}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. CTA COMPARTILHADO & ENCERRAMENTO COM FOOTER ESCURO        */}
      {/* ============================================================ */}
      <ClosingNavigation />
    </div>
  );
}

export default Work;
