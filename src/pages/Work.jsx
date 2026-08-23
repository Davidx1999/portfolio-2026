import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../hooks/useProjects';
import { useLanguage } from '../context/LanguageContext';
import { CurtainLink } from '../context/RouteCurtainContext';
import { ReconstructMedia } from '../components/ReconstructMedia';
import { ClosingNavigation } from '../components/home/ClosingNavigation';

const EASING = [0.22, 1, 0.36, 1];

export function Work() {
  const { allWork: projects, loading } = useProjects();
  const { t } = useTranslation(['work', 'common']);
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const getProjectLink = (id) => {
    return `/${language}/work/${id}`;
  };

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
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);
  const [expandedDossierId, setExpandedDossierId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredIndexRowId, setHoveredIndexRowId] = useState(null);

  // Fechar dossiê e dropdown com tecla Escape ou clique fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCategoryDropdownOpen(false);
        setExpandedDossierId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
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

  const toggleDossier = (id) => {
    setExpandedDossierId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full min-h-screen bg-[#10110F] text-[#FAFAF7] select-none">
      {/* ============================================================ */}
      {/* 1. INTRODUÇÃO AUTORAL DA PÁGINA WORK (COMPACTADA)             */}
      {/* ============================================================ */}
      <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-10 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
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
                {t('work:intro_eyebrow', 'SELECTED WORK / 2021—2026')}
              </span>
            </motion.div>

            {/* Headline Principal Editorial Compacta */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASING }}
              className="font-serif text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] max-w-[980px] mb-4"
            >
              {t(
                'work:intro_title',
                'Products, systems and experiences built to make complexity understandable.'
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
                'work:intro_text',
                'A selection of projects where strategy, architecture, interface and Design Systems worked as unified parts of the same digital product.'
              )}
            </motion.p>
          </div>

          {/* Meta Bar: Contador Real */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pt-5 border-t border-[rgba(244,243,238,0.16)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-1.5 font-mono text-[11px] sm:text-xs text-[#F4F3EE]/60 tracking-wider">
              <span className="text-[#C4FF00] font-bold whitespace-nowrap">
                [ {String(totalCount).padStart(2, '0')} {t('work:projects_count', 'PROJECTS')} ]
              </span>
              <span className="text-white/20 hidden xs:inline">•</span>
              <span className="uppercase text-[10px] sm:text-xs tracking-wider">
                {t('work:meta_disciplines', 'SaaS · Design Systems · Interface')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BARRA DE CONTROLES: FILTRO DROPDOWN + ALTERNADOR VISUAL/INDEX */}
      {/* ============================================================ */}
      <section id="work-content" className="sticky top-[54px] z-40 w-full bg-[#10110F] border-b border-[rgba(244,243,238,0.16)]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 py-3.5 flex flex-row items-center justify-between gap-4">
          
          {/* Seletor Dropdown de Categorias */}
          <div ref={categoryDropdownRef} className="relative z-50">
            <button
              type="button"
              onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isCategoryDropdownOpen}
              className="flex items-center gap-3 px-4 py-2 bg-[#151613] hover:bg-[#1c1e1a] border border-[rgba(244,243,238,0.18)] hover:border-[rgba(196,255,0,0.5)] rounded-[12px] font-mono text-[11px] font-bold tracking-wider uppercase transition-all text-[#FAFAF7] cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#C4FF00]">
                  {activeCategory === 'ALL'
                    ? `${t('work:filter_all', 'All')} (${totalCount})`
                    : `${activeCategory} (${projects.filter((p) => p.category === activeCategory).length})`}
                </span>
              </div>
              <ChevronDown
                size={14}
                className={`text-white/60 transition-transform duration-300 ${
                  isCategoryDropdownOpen ? 'rotate-180 text-[#C4FF00]' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: EASING }}
                  role="listbox"
                  className="absolute left-0 top-full mt-2 w-max min-w-[260px] bg-[#151613] border border-[rgba(244,243,238,0.18)] rounded-[14px] shadow-2xl p-1.5 z-50 divide-y divide-white/5 backdrop-blur-md"
                >
                  <div className="py-1">
                    <button
                      type="button"
                      role="option"
                      aria-selected={activeCategory === 'ALL'}
                      onClick={() => {
                        setActiveCategory('ALL');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[10px] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer text-left ${
                        activeCategory === 'ALL'
                          ? 'bg-[#C4FF00] text-[#10110F]'
                          : 'text-[#F4F3EE]/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{t('work:filter_all_label', 'All Projects')}</span>
                      <span className="text-[10px] opacity-75">({totalCount})</span>
                    </button>
                  </div>

                  <div className="py-1">
                    {categories.map((cat) => {
                      const count = projects.filter((p) => p.category === cat).length;
                      const isSelected = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setActiveCategory(cat);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[10px] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer text-left ${
                            isSelected
                              ? 'bg-[#C4FF00] text-[#10110F]'
                              : 'text-[#F4F3EE]/80 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className="text-[10px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                <span className="relative z-10">{t('work:view_visual', 'Visual')}</span>
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
                <span className="relative z-10">{t('work:view_index', 'Index')}</span>
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
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
            {loading ? (
              <div className="w-full py-24 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-6 h-6 border-2 border-[#C4FF00] border-t-transparent rounded-full animate-spin" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                  {t('common:loading_status_assets', 'Carregando projetos...')}
                </span>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="w-full py-24 px-6 text-center border border-[rgba(244,243,238,0.12)] rounded-[18px] bg-[#151613]">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
                  [ STATUS // 00 ]
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                  {t('work:empty_state_title', 'New case studies are being prepared.')}
                </h3>
                <p className="font-sans text-sm text-[#F4F3EE]/60 max-w-md mx-auto">
                  {t(
                    'work:empty_state_desc',
                    'Documentation and metrics for upcoming projects are currently being consolidated.'
                  )}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                {filteredProjects.map((project, index) => {
                  const isHovered = hoveredCardId === project.id;
                  const link = getProjectLink(project.id);
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
                    <CurtainLink
                      to={link}
                      curtainTitle={project.title}
                      className="absolute inset-0 w-full h-full block focus-visible:outline-2 focus-visible:outline-[#C4FF00] focus-visible:outline-offset-2"
                      aria-label={`${project.title} - ${project.category}`}
                    >
                      {/* 1. MÍDIA FULL-BLEED COM ZOOM SUAVE NO HOVER */}
                      <div className="absolute inset-0 w-full h-full">
                        <ReconstructMedia
                          image={project.coverImage || project.image}
                          alt={project.alt || project.title}
                          isHovered={isHovered}
                          aspectRatio="w-full h-full"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                      </div>

                      {/* 2. IDENTIFICAÇÃO SUPERIOR */}
                      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-20">
                        <span className="px-2.5 py-1 bg-[#10110F] border border-[rgba(244,243,238,0.18)] rounded-[8px] font-mono text-[10px] uppercase font-bold tracking-wider text-[#C4FF00]">
                          {project.category || (language === 'en' ? 'Product Design' : 'Design de Produto')}
                        </span>
                        <span className="px-2.5 py-1 bg-[#10110F] border border-[rgba(244,243,238,0.18)] rounded-[8px] font-mono text-[10px] uppercase tracking-wider text-[#F4F3EE]/80">
                          {project.period || project.year || '2024'}
                        </span>
                      </div>

                      {/* 3. INFORMAÇÕES INFERIORES */}
                      <div
                        className={`absolute inset-x-0 bottom-0 z-20 h-[33.333%] p-4 sm:p-5 flex flex-col justify-center bg-[#10110F] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isHovered
                            ? 'opacity-0 translate-y-3 pointer-events-none'
                            : 'opacity-100 translate-y-0 pointer-events-auto'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h2 className="font-serif text-lg sm:text-xl text-[#FAFAF7] font-normal truncate group-hover:text-[#C4FF00] transition-colors">
                              {project.title}
                            </h2>
                            <p className="font-mono text-[11px] text-[#F4F3EE]/60 truncate mt-0.5">
                              {isHovered && project.role ? project.role : (project.context || project.category || (language === 'en' ? 'Digital Product' : 'Produto Digital'))}
                            </p>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-[#151613] border border-[rgba(244,243,238,0.18)] text-white/70 group-hover:text-[#10110F] group-hover:bg-[#C4FF00] group-hover:border-[#C4FF00] flex items-center justify-center transition-all duration-300 flex-shrink-0">
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CurtainLink>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    )}

      {/* ============================================================ */}
      {/* 4. MODO INDEX: SISTEMA VISUAL CONTÍNUO COM PREVIEW DRAWER     */}
      {/* ============================================================ */}
      {viewMode === 'index' && (
        <section className="w-full py-12 lg:py-16 bg-[#10110F]">
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* FRAME PRINCIPAL CONTÍNUO DO INDEX */}
            <div className="w-full bg-[#10110F] border border-[rgba(244,243,238,0.16)] rounded-[18px] relative">
              
              {/* Cabeçalho Tabular Sólido (Desktop) */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 h-14 px-6 sm:px-8 items-center bg-[#151613] border-b border-[rgba(244,243,238,0.16)] font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F4F3EE]/50 rounded-t-[18px]">
                <div className="col-span-4">{t('work:table_project', 'Project')}</div>
                <div className="col-span-3">{t('work:table_role', 'Role & Scope')}</div>
                <div className="col-span-3">{t('work:table_context', 'Context')}</div>
                <div className="col-span-1">{t('work:table_period', 'Period')}</div>
                <div className="col-span-1 text-right">{t('work:table_action', 'Action')}</div>
              </div>

              {/* Linhas do Index */}
              <div className="divide-y divide-[rgba(244,243,238,0.16)]">
                {filteredProjects.length === 0 ? (
                  <div className="py-16 px-6 text-center">
                    <p className="font-mono text-xs text-[#F4F3EE]/50 uppercase tracking-widest">
                      {t('work:empty_state_title', 'New case studies are being prepared.')}
                    </p>
                  </div>
                ) : (
                  filteredProjects.map((project, pIndex) => {
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
                            {t('work:table_role', 'Role')}:
                          </span>
                          {project.role || (language === 'en' ? 'Product Designer' : 'Designer de Produto')}
                        </div>

                        {/* Coluna 3: Contexto */}
                        <div className="col-span-3 font-sans text-xs sm:text-sm text-[#F4F3EE]/65">
                          <span className="md:hidden text-white/40 block mb-0.5">
                            {t('work:table_context', 'Context')}:
                          </span>
                          {project.context || project.category || (language === 'en' ? 'Digital Product' : 'Produto Digital')}
                        </div>

                        {/* Coluna 4: Período */}
                        <div className="col-span-1 font-mono text-xs text-[#F4F3EE]/60">
                          {project.period || project.year || '2024'}
                        </div>

                        {/* Coluna 5: Ação / Indicador */}
                        <div className="col-span-1 flex items-center justify-end gap-2 font-mono text-xs font-bold text-[#C4FF00]">
                          <span className="hidden sm:inline">
                            {isExpanded
                              ? t('work:action_close', 'Close')
                              : t('work:action_dossier', 'View dossier')}
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
                                    {t('work:dossier_challenge', 'CHALLENGE & ARCHITECTURE')}
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
                                        {t('work:dossier_process', 'Execution Process')}:
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
                                    {project.context || project.category || (language === 'en' ? 'Digital Product' : 'Produto Digital')}
                                  </span>

                                  {link ? (
                                    <CurtainLink
                                      to={link}
                                      curtainTitle={project.title}
                                      className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase text-[#10110F] bg-[#C4FF00] hover:bg-[#d8ff1a] transition-all rounded-[12px]"
                                    >
                                      <span>{t('work:action_view_case', 'Explore Case')} ↗</span>
                                    </CurtainLink>
                                  ) : (
                                    <span className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase text-[#F4F3EE]/40 bg-white/5 border border-white/10 rounded-[12px] cursor-not-allowed">
                                      {t('common:status_coming_soon', 'Coming soon')}
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
                }))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. CTA COMPARTILHADO & ENCERRAMENTO COM FOOTER ESCURO        */}
      {/* ============================================================ */}
      <ClosingNavigation />
    </div>
  );
}

export default Work;
