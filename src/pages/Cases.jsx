import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { ALL_WORK } from '../data/allWork';
import { LimeActionButton, RotatingStamp, MagneticTextLink } from '../components/Buttons';
import { useLanguage } from '../context/LanguageContext';
import formaStudioImg from '../assets/forma_studio.png';

const tabs = ["ALL", "CASE STUDIES", "PROJECTS", "PRODUCT", "BRAND", "WEB", "SYSTEMS", "EXPERIMENTS"];

const getProjectLink = (id) => {
  if (['mapear', 'aula-f75', 'vincenzo'].includes(id)) {
    return `/${id}`;
  }
  return `/project/${id}`;
};

export function Cases() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter logic
  const filteredWork = ALL_WORK.filter((item) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "CASE STUDIES") return item.workType === "cases";
    if (activeFilter === "PROJECTS") return item.workType !== "cases";
    if (activeFilter === "PRODUCT") return item.category === "PRODUCT" || item.tags.includes("Product Design");
    if (activeFilter === "BRAND") return item.category === "BRAND" || item.tags.includes("Brand Identity");
    if (activeFilter === "WEB") return item.category === "WEB" || item.tags.includes("Web Design");
    if (activeFilter === "SYSTEMS") return item.category === "SYSTEMS" || item.tags.includes("Design Systems");
    if (activeFilter === "EXPERIMENTS") return item.workType === "experiments";
    return true;
  });

  // Split featured 7 and remaining for the ALL bento grid
  const bentoIds = ["mapear", "vincenzo", "ui-ux-study", "aula-f75", "cenpe-platform"];
  
  const bentoItems = bentoIds.map(id => ALL_WORK.find(w => w.id === id)).filter(Boolean);
  const remainingItems = ALL_WORK.filter(w => !bentoIds.includes(w.id));

  // Find specific bento items for rendering
  const focuslyItem = bentoItems.find(w => w.id === "mapear");
  const fieldNotesItem = bentoItems.find(w => w.id === "vincenzo"); 
  const latticeItem = bentoItems.find(w => w.id === "ui-ux-study");
  const aulaF75Item = bentoItems.find(w => w.id === "aula-f75");
  const formaStudioItem = bentoItems.find(w => w.id === "cenpe-platform");
  const auroraItem = null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95 } }
  };

  // Helper to render textured image block
  const renderCardImage = (project) => {
    const isNoGrayscale = project.id === 'vincenzo' || project.id === 'focusly' || project.id === 'aula-f75';
    const hasHoverImage = !!project.imageHover;

    return (
      <div className="absolute inset-y-0 right-0 w-[60%] h-full overflow-hidden border-l border-neutral-carvao/10 select-none relative group/img bg-neutral-carvao/5">
        {hasHoverImage ? (
          <>
            {/* Base Image */}
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-out ${
                isNoGrayscale ? '' : 'grayscale group-hover/card:grayscale-0'
              } group-hover/card:opacity-0 scale-100 group-hover/card:scale-[1.02]`}
            />
            {/* Hover Image */}
            <img
              src={project.imageHover}
              alt={`${project.title} hover`}
              className={`w-full h-full object-cover absolute inset-0 opacity-0 transition-all duration-700 ease-out ${
                isNoGrayscale ? '' : 'grayscale group-hover/card:grayscale-0'
              } group-hover/card:opacity-100 scale-[1.01] group-hover/card:scale-[1.02]`}
            />
          </>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover ${
              isNoGrayscale ? '' : 'grayscale group-hover/card:grayscale-0'
            } transition-all duration-750 ease-out scale-100 group-hover/card:scale-[1.02]`}
          />
        )}
        {/* Repeating paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-repeat z-10"
          style={{ 
            backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
            backgroundSize: '120px 120px' 
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[var(--color-background)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        {/* Row 1: Hero */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-4 md:px-[calc(16%-24px)] py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            {/* Left side */}
            <div className="flex flex-col gap-6">
              <div className="relative">
                <img
                  src={`${import.meta.env.BASE_URL}assets/titles/cases_and_projects.png`}
                  alt={t('cases_title_alt')}
                  className="w-full max-w-[320px] md:max-w-[420px] h-auto object-contain select-none"
                />
              </div>

              <div className="relative">
                <h2 className="text-title-h2 font-extrabold text-neutral-carvao leading-snug tracking-tight uppercase max-w-xl font-sans">
                  {t('cases_subtitle_main')}{' '}
                  <span className="text-[#E6A045]">{t('cases_subtitle_highlight_explorations')}</span>
                  {t('cases_subtitle_end')}
                </h2>
                <svg className="absolute -right-8 top-0 w-6 h-6 text-neutral-carvao/30 hidden sm:block animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.143L13 22l-2.286-6.857L5 12l5.714-3.143L13 3z" />
                </svg>
              </div>

              <p className="text-body-lg text-neutral-carvao/75 max-w-lg leading-relaxed font-sans">
                {t('cases_description')}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-2">
                <LimeActionButton
                  as="a"
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('cases_cta_view_all')}
                </LimeActionButton>
                
                <MagneticTextLink
                  as={Link}
                  to="/about"
                >
                  {t('cases_cta_about_process')}
                  <ArrowRight size={14} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
                </MagneticTextLink>
              </div>
            </div>

            {/* Right side collage (Mockup faithful design) */}
            <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[1.1/1] select-none">
              {/* Stamp circle and big ampersand on left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-6">
                {/* Crosshair decoration */}
                <svg className="w-5 h-5 text-neutral-carvao/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
                </svg>
                
                {/* rotating stamp */}
                <div className="scale-[0.8] opacity-80">
                  <RotatingStamp 
                    text={t('cases_stamp_text')} 
                    icon={ArrowUpRight}
                  />
                </div>

                {/* Large typographic & symbol */}
                <span className="font-serif text-[100px] md:text-[130px] font-extralight text-neutral-carvao/15 leading-none -mt-4 block select-none">
                  &
                </span>
              </div>

              {/* Right-aligned photos */}
              <div className="absolute right-0 top-0 w-[65%] flex flex-col gap-4">
                {/* Eye Photo */}
                <div className="border border-neutral-carvao/10 rounded-[2px] overflow-hidden aspect-[4/3] relative shadow-md">
                  <img src={`${import.meta.env.BASE_URL}assets/apoio/eye.jpg`} alt="Eye detail" className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-[#8b7ec8]/10 mix-blend-color opacity-30" />
                  <div className="absolute top-2 right-2 text-neutral-carvao/30 font-mono text-[7px]">+ 24.90</div>
                </div>

                {/* Building Photo */}
                <div className="border border-neutral-carvao/10 rounded-[2px] overflow-hidden aspect-square relative shadow-md w-[80%] self-end bg-neutral-carvao/5">
                  <img src={formaStudioImg} alt="Architecture grid" className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-neutral-carvao/5" />
                </div>
              </div>

              {/* Scribble line at bottom right */}
              <svg className="absolute -bottom-4 right-12 w-28 h-8 text-neutral-carvao/25" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 15 C 20 5, 30 25, 45 10 C 60 5, 70 20, 85 10 C 90 8, 95 12, 100 15" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: Filters */}
        <div id="gallery" className="w-full border-b border-neutral-carvao/10 scroll-mt-24">
          <div className="px-4 md:px-[calc(16%-24px)] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider rounded-full border transition-all duration-300 font-bold cursor-pointer ${
                    activeFilter === tab 
                      ? 'bg-neutral-carvao text-background border-neutral-carvao shadow-sm'
                      : 'bg-background/50 border-neutral-carvao/15 text-neutral-carvao hover:border-neutral-carvao/40'
                  }`}
                >
                  {tab === "ALL" ? t('cases_tab_all', "ALL WORK") : t('cases_tab_' + tab.toLowerCase().replace(' ', '_'), tab)}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-neutral-carvao/45 uppercase tracking-widest self-end md:self-auto select-none">
              <span>{t('cases_sort_by', "Sort By:")}</span>
              <span className="text-neutral-carvao underline cursor-pointer hover:text-[var(--color-primary)]">{t('cases_sort_newest', "Newest")}</span>
            </div>
          </div>

          {/* Gallery Content Area */}
          <div className="px-4 md:px-[calc(16%-24px)] pb-16 w-full">
            <AnimatePresence mode="wait">
              {activeFilter === "ALL" ? (
                // Mockup Specific Bento Grid layout
                <motion.div
                  key="bento"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8 md:gap-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Focusly & Mapear combined Case Study card (Spans 2 columns, background image) */}
                    {focuslyItem && (
                      <Link
                        to={getProjectLink(focuslyItem.id)}
                        className="col-span-1 md:col-span-2 group/card relative h-[25rem] md:h-[28rem] border border-neutral-carvao/10 rounded-[2px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 md:p-8 cursor-pointer"
                      >
                        {/* Background Image & Texture */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src={focuslyItem.image}
                            alt={focuslyItem.title}
                            className="w-full h-full object-cover transition-all duration-750 ease-out scale-100 group-hover/card:scale-[1.02]"
                          />
                          {/* Dark gradient overlay for readability */}
                          <div className="absolute inset-0 bg-gradient-to-r from-neutral-carvao/85 via-neutral-carvao/50 to-transparent group-hover/card:from-neutral-carvao/80 group-hover/card:via-neutral-carvao/40 transition-all duration-500" />
                          {/* Repeating paper texture overlay */}
                          <div 
                            className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-repeat"
                            style={{ 
                              backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                              backgroundSize: '120px 120px' 
                            }}
                          />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 w-full max-w-[40%] flex flex-col gap-2 text-[#FAF8F3]">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-primary)] font-bold">
                            {t('cases_card_case_study')}
                          </span>
                          <h3 className="font-sans font-extrabold text-title-h3 md:text-title-h2 text-[#FAF8F3] uppercase tracking-tight leading-none group-hover/card:text-[var(--color-lime-500)] transition-colors">
                            {focuslyItem.title}
                          </h3>
                          <p className="font-sans text-body-sm text-[#FAF8F3]/75 mt-3 leading-relaxed">
                            {t('project_' + focuslyItem.id.replace(/-/g, '_') + '_description', focuslyItem.description)}
                          </p>
                        </div>

                        <div className="relative z-10 flex flex-col gap-3 mt-auto max-w-[40%]">
                          <div className="flex flex-wrap gap-1.5">
                            {focuslyItem.tags.slice(0, 5).map(t => (
                              <span key={t} className="border border-white/20 bg-white/10 rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-white/85 font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8 z-20 pointer-events-none">
                          <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                        </div>
                      </Link>
                    )}

                    {/* Right Column: Two Stacked Cards (Field Notes & Lattice) */}
                    <div className="flex flex-col gap-6 md:gap-8 justify-between h-full">
                      {/* Field Notes (using poster-studies) */}
                      {fieldNotesItem && (
                        <Link
                          to={getProjectLink(fieldNotesItem.id)}
                          className="group/card relative h-[11.8rem] md:h-[13.2rem] border border-neutral-carvao/10 rounded-[2px] bg-[#FAF8F3] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex cursor-pointer"
                        >
                          <div className="w-[40%] p-4 flex flex-col justify-between relative z-10">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#B6A9ED] font-bold">
                                {t('cases_card_project')}
                              </span>
                              <h3 className="font-sans font-bold text-subtitle-sm text-neutral-carvao uppercase tracking-tight group-hover/card:text-[var(--color-primary)] transition-colors">
                                {fieldNotesItem.title}
                              </h3>
                              <p className="font-sans text-[11px] text-neutral-carvao/60 mt-1 leading-normal line-clamp-3">
                                {t('project_' + fieldNotesItem.id.replace(/-/g, '_') + '_description', fieldNotesItem.description)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between w-full mt-auto">
                              <div className="flex flex-wrap gap-1 pr-2">
                                {fieldNotesItem.tags.slice(0, 1).map(t => (
                                  <span key={t} className="border border-neutral-carvao/15 bg-background rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-carvao/75 font-bold">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {renderCardImage(fieldNotesItem)}
                          <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                            <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                          </div>
                        </Link>
                      )}

                      {/* Lattice */}
                      {latticeItem && (
                        <Link
                          to={getProjectLink(latticeItem.id)}
                          className="group/card relative h-[11.8rem] md:h-[13.2rem] border border-neutral-carvao/10 rounded-[2px] bg-[#F2EEE4] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex cursor-pointer"
                        >
                          <div className="w-[40%] p-4 flex flex-col justify-between relative z-10">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#8B7EC8] font-bold">
                                {t('cases_card_project')}
                              </span>
                              <h3 className="font-sans font-bold text-subtitle-sm text-neutral-carvao uppercase tracking-tight group-hover/card:text-[var(--color-primary)] transition-colors">
                                {latticeItem.title}
                              </h3>
                              <p className="font-sans text-[11px] text-neutral-carvao/60 mt-1 leading-normal line-clamp-3">
                                {t('project_' + latticeItem.id.replace(/-/g, '_') + '_description', latticeItem.description)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between w-full mt-auto">
                              <div className="flex flex-wrap gap-1 pr-2">
                                {latticeItem.tags.slice(0, 1).map(t => (
                                  <span key={t} className="border border-neutral-carvao/15 bg-background rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-carvao/75 font-bold">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {renderCardImage(latticeItem)}
                          <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                            <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Three standard cards (Aula F75, Forma Studio, Aurora) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Aula F75 */}
                    {aulaF75Item && (
                      <Link
                        to={getProjectLink(aulaF75Item.id)}
                        className="group/card relative h-[12.5rem] md:h-[13.5rem] border border-neutral-carvao/10 rounded-[2px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-4 cursor-pointer"
                      >
                        {/* Background Image & Texture */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src={aulaF75Item.image}
                            alt={aulaF75Item.title}
                            className="w-full h-full object-cover transition-all duration-750 ease-out scale-100 group-hover/card:scale-[1.02]"
                          />
                          {/* Dark gradient overlay for readability */}
                          <div className="absolute inset-0 bg-gradient-to-r from-neutral-carvao/85 via-neutral-carvao/50 to-transparent group-hover/card:from-neutral-carvao/80 group-hover/card:via-neutral-carvao/40 transition-all duration-500" />
                          {/* Repeating paper texture overlay */}
                          <div 
                            className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-repeat"
                            style={{ 
                              backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                              backgroundSize: '120px 120px' 
                            }}
                          />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 w-full max-w-[40%] flex flex-col gap-1 text-[#FAF8F3]">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">
                            {t('cases_card_case_study')}
                          </span>
                          <h3 className="font-sans font-bold text-subtitle-sm text-[#FAF8F3] uppercase tracking-tight group-hover/card:text-[var(--color-lime-500)] transition-colors">
                            {aulaF75Item.title}
                          </h3>
                          <p className="font-sans text-[11px] text-[#FAF8F3]/75 mt-1 leading-normal line-clamp-3">
                            {t('project_' + aulaF75Item.id.replace(/-/g, '_') + '_description', aulaF75Item.description)}
                          </p>
                        </div>

                        <div className="relative z-10 flex flex-col gap-3 mt-auto max-w-[40%]">
                          <div className="flex flex-wrap gap-1.5">
                            {aulaF75Item.tags.slice(0, 2).map(t => (
                              <span key={t} className="border border-white/20 bg-white/10 rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-white/85 font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                          <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                        </div>
                      </Link>
                    )}

                    {/* Forma Studio */}
                    {formaStudioItem && (
                      <Link
                        to={getProjectLink(formaStudioItem.id)}
                        className="group/card relative h-[12.5rem] md:h-[13.5rem] border border-neutral-carvao/10 rounded-[2px] bg-[#FAF8F3] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex cursor-pointer"
                      >
                        <div className="w-[40%] p-4 flex flex-col justify-between relative z-10">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-[#8b7ec8] font-bold">
                              {t('cases_card_project')}
                            </span>
                            <h3 className="font-sans font-bold text-subtitle-sm text-neutral-carvao uppercase tracking-tight group-hover/card:text-[var(--color-primary)] transition-colors">
                              {formaStudioItem.title}
                            </h3>
                            <p className="font-sans text-[11px] text-neutral-carvao/60 mt-1 leading-normal line-clamp-3">
                              {t('project_' + formaStudioItem.id.replace(/-/g, '_') + '_description', formaStudioItem.description)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between w-full mt-auto">
                            <div className="flex flex-wrap gap-1 pr-2">
                              {formaStudioItem.tags.slice(0, 1).map(t => (
                                <span key={t} className="border border-neutral-carvao/15 bg-background rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-carvao/75 font-bold">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {renderCardImage(formaStudioItem)}
                        <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                          <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                        </div>
                      </Link>
                    )}

                    {/* Aurora */}
                    {auroraItem && (
                      <Link
                        to={getProjectLink(auroraItem.id)}
                        className="group/card relative h-[12.5rem] md:h-[13.5rem] border border-neutral-carvao/10 rounded-[2px] bg-[#F5F1E9] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex cursor-pointer"
                      >
                        <div className="w-[40%] p-4 flex flex-col justify-between relative z-10">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">
                              {t('cases_card_project')}
                            </span>
                            <h3 className="font-sans font-bold text-subtitle-sm text-neutral-carvao uppercase tracking-tight group-hover/card:text-[var(--color-primary)] transition-colors">
                              {auroraItem.title}
                            </h3>
                            <p className="font-sans text-[11px] text-neutral-carvao/60 mt-1 leading-normal line-clamp-3">
                              {t('project_aurora_description', "An experimental exploration of wellness, light and art.")}
                            </p>
                          </div>
                          <div className="flex items-center justify-between w-full mt-auto">
                            <div className="flex flex-wrap gap-1 pr-2">
                              {auroraItem.tags.slice(0, 1).map(t => (
                                <span key={t} className="border border-neutral-carvao/15 bg-background rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-carvao/75 font-bold">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {renderCardImage(auroraItem)}
                        <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                          <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* Section Divider & remaining items */}
                  {remainingItems.length > 0 && (
                    <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-neutral-carvao/10">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-carvao/50">
                          {t('cases_section_more_explorations')}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {remainingItems.map((p) => {
                          const isCombined = p.id === 'vincenzo';
                          return (
                            <Link
                              key={p.id}
                              to={getProjectLink(p.id)}
                              className={`group/card relative h-[12.5rem] md:h-[13.5rem] border border-neutral-carvao/10 rounded-[2px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex cursor-pointer ${
                                isCombined ? 'flex-col justify-between p-4' : 'bg-background'
                              }`}
                            >
                              {isCombined ? (
                                <>
                                  {/* Background Image & Texture */}
                                  <div className="absolute inset-0 z-0">
                                    <img
                                      src={p.image}
                                      alt={p.title}
                                      className="w-full h-full object-cover transition-all duration-750 ease-out scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-carvao/85 via-neutral-carvao/55 to-transparent group-hover/card:from-neutral-carvao/80 group-hover/card:via-neutral-carvao/45 transition-all duration-500" />
                                    <div 
                                      className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-repeat"
                                      style={{ 
                                        backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                                        backgroundSize: '120px 120px' 
                                      }}
                                    />
                                  </div>

                                  {/* Content overlay */}
                                  <div className="relative z-10 w-full max-w-[40%] flex flex-col gap-1 text-[#FAF8F3]">
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-primary)] font-bold">
                                      {p.workType === 'cases' ? t('cases_card_case_study') : t('cases_card_project')}
                                    </span>
                                    <h3 className="font-sans font-bold text-subtitle-sm text-[#FAF8F3] uppercase tracking-tight group-hover/card:text-[var(--color-lime-500)] transition-colors leading-tight line-clamp-2">
                                      {p.title}
                                    </h3>
                                    <p className="font-sans text-[11px] text-[#FAF8F3]/75 mt-1 leading-normal line-clamp-3">
                                      {t('project_' + p.id + '_description', p.description)}
                                    </p>
                                  </div>
                                  
                                  <div className="relative z-10 flex items-center mt-auto max-w-[40%]">
                                    <div className="flex flex-wrap gap-1">
                                      {p.tags.slice(0, 2).map(t => (
                                        <span key={t} className="border border-white/20 bg-white/10 rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-white/85 font-bold">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                                    <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-[40%] p-4 flex flex-col justify-between relative z-10">
                                    <div className="flex flex-col gap-1.5">
                                      <span className="font-mono text-[8px] uppercase tracking-widest text-[#8b7ec8] font-bold">
                                        {p.workType === 'cases' ? t('cases_card_case_study') : t('cases_card_project')}
                                      </span>
                                      <h3 className="font-sans font-bold text-subtitle-sm text-neutral-carvao uppercase tracking-tight group-hover/card:text-[var(--color-primary)] transition-colors leading-tight line-clamp-2">
                                        {p.title}
                                      </h3>
                                      <p className="font-sans text-[11px] text-neutral-carvao/60 mt-1 leading-normal line-clamp-3">
                                        {t('project_' + p.id + '_description', p.description)}
                                      </p>
                                    </div>
                                    <div className="flex items-center justify-between w-full mt-auto">
                                      <div className="flex flex-wrap gap-1 pr-2">
                                        {p.tags.slice(0, 1).map(t => (
                                          <span key={t} className="border border-neutral-carvao/15 bg-background rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-carvao/75 font-bold">
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  {renderCardImage(p)}
                                  <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                                    <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                                  </div>
                                </>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                // Standard 3-Column Grid for tabs
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {filteredWork.map((p) => {
                    const isCombined = p.id === "focusly" || p.id === "aula-f75" || p.id === "vincenzo";
                    return (
                      <Link
                        key={p.id}
                        to={getProjectLink(p.id)}
                        className={`group/card relative h-[12.5rem] md:h-[13.5rem] border border-neutral-carvao/10 rounded-[2px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex cursor-pointer ${
                          isCombined ? 'flex-col justify-between p-4' : 'bg-background'
                        }`}
                      >
                        {isCombined ? (
                          <>
                            {/* Background Image & Texture */}
                            <div className="absolute inset-0 z-0">
                              <img
                                src={p.image}
                                alt={p.title}
                                className={`w-full h-full object-cover transition-all duration-750 ease-out scale-100 ${
                                  p.id === 'vincenzo' ? '' : 'group-hover/card:scale-[1.02]'
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-neutral-carvao/85 via-neutral-carvao/55 to-transparent group-hover/card:from-neutral-carvao/80 group-hover/card:via-neutral-carvao/45 transition-all duration-500" />
                              <div 
                                className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-repeat"
                                style={{ 
                                  backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                                  backgroundSize: '120px 120px' 
                                }}
                              />
                            </div>

                            {/* Content overlay */}
                            <div className="relative z-10 w-full max-w-[40%] flex flex-col gap-1 text-[#FAF8F3]">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-primary)] font-bold">
                                {p.workType === 'cases' ? t('cases_card_case_study') : t('cases_card_project')}
                              </span>
                              <h3 className="font-sans font-bold text-subtitle-sm text-[#FAF8F3] uppercase tracking-tight group-hover/card:text-[var(--color-lime-500)] transition-colors leading-tight line-clamp-2">
                                {p.title}
                              </h3>
                              <p className="font-sans text-[11px] text-[#FAF8F3]/75 mt-1 leading-normal line-clamp-3">
                                {t('project_' + p.id + '_description', p.description)}
                              </p>
                            </div>
                            
                            <div className="relative z-10 flex items-center mt-auto max-w-[40%]">
                              <div className="flex flex-wrap gap-1">
                                {p.tags.slice(0, 2).map(t => (
                                  <span key={t} className="border border-white/20 bg-white/10 rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-white/85 font-bold">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                              <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-[40%] p-4 flex flex-col justify-between relative z-10">
                              <div className="flex flex-col gap-1.5">
                                <span className="font-mono text-[8px] uppercase tracking-widest text-[#8b7ec8] font-bold">
                                  {p.workType === 'cases' ? t('cases_card_case_study') : t('cases_card_project')}
                                </span>
                                <h3 className="font-sans font-bold text-subtitle-sm text-neutral-carvao uppercase tracking-tight group-hover/card:text-[var(--color-primary)] transition-colors leading-tight line-clamp-2">
                                  {p.title}
                                </h3>
                                <p className="font-sans text-[11px] text-neutral-carvao/60 mt-1 leading-normal line-clamp-3">
                                  {t('project_' + p.id + '_description', p.description)}
                                </p>
                              </div>
                              <div className="flex items-center justify-between w-full mt-auto">
                                <div className="flex flex-wrap gap-1 pr-2">
                                  {p.tags.slice(0, 1).map(t => (
                                    <span key={t} className="border border-neutral-carvao/15 bg-background rounded-full px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-carvao/75 font-bold">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {renderCardImage(p)}
                            <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                              <LimeActionButton iconOnly={true} icon={ArrowRight} as="div" />
                            </div>
                          </>
                        )}
                      </Link>
                    );
                  })}
                  {filteredWork.length === 0 && (
                    <div className="py-16 text-center col-span-full font-sans text-sm text-neutral-carvao/50 border-t border-neutral-carvao/10 mt-8">
                      {t('cases_empty_state')}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 3: Featured Case (Field Notes) */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-4 md:px-[calc(16%-24px)] bg-background/30">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-lime-500)]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
              {t('cases_featured_tag')}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr_1.5fr] gap-0 border border-neutral-carvao/15 rounded-sm overflow-hidden shadow-md bg-background">
            {/* Column 1: Info */}
            <div className="bg-[#B3A0E6]/15 p-8 flex flex-col justify-between border-b lg:border-b-0 border-neutral-carvao/10">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8b7ec8] bg-[#8b7ec8]/10 border border-[#8b7ec8]/25 px-2 py-0.5 rounded-sm w-fit">
                  {t('cases_featured_editorial_tag')}
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-extrabold text-title-h3 text-neutral-carvao uppercase tracking-tight leading-none">
                    Field Notes
                  </h4>
                  <span className="font-sans text-body-sm font-medium text-neutral-carvao/60">Editorial Website</span>
                </div>
                <p className="font-sans text-body-base text-neutral-carvao/75 leading-relaxed">
                  A content-driven website for a publication sharing insights on creativity, design, and culture. Focuses on immersive reading layouts.
                </p>
              </div>

              <Link
                to="/project/poster-studies"
                className="group w-fit mt-8 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-carvao hover:text-[#8b7ec8] transition-colors py-2 cursor-pointer"
              >
                <span>{t('cases_featured_view_case')}</span>
                <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Column 2: Web Mockup */}
            <div className="bg-neutral-carvao/5 relative overflow-hidden aspect-[4/3] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-x border-neutral-carvao/10">
              <div className="relative w-full h-full border border-neutral-carvao/25 rounded-md overflow-hidden shadow-lg bg-neutral-carvao/5 select-none">
                {/* Browser top bar */}
                <div className="h-6 bg-neutral-carvao/10 border-b border-neutral-carvao/15 flex items-center px-3 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                  <div className="h-3 w-32 bg-background border border-neutral-carvao/5 rounded-sm mx-auto flex items-center justify-center text-[7px] font-mono text-neutral-carvao/40">
                    fieldnotes.publication
                  </div>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}assets/profile/field_notes_mock.png`}
                  alt="Field Notes web mockup"
                  className="w-full h-[calc(100%-24px)] object-cover grayscale opacity-95"
                />
              </div>
            </div>

            {/* Column 3: Meta details */}
            <div className="bg-[#E6A045]/15 p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-6">
                {[
                  { label: "Role", val: "Lead Designer" },
                  { label: "Disciplines", val: "UX / UI Design, Development" },
                  { label: "Year", val: "2024" },
                  { label: "Duration", val: "Jan - Mar 2024" },
                  { label: "Platform", val: "Web" },
                  { label: "Team", val: "2 Designers, 1 Developer" }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5 pb-2 border-b border-neutral-carvao/5">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">
                      {item.label}
                    </span>
                    <span className="font-sans text-xs text-neutral-carvao font-bold">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Featured Experiment (Fluid Grid) */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-4 md:px-[calc(16%-24px)] bg-background/20">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-lime-500)]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
              Featured Experiment
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr_1.5fr] gap-0 border border-neutral-carvao/15 rounded-sm overflow-hidden shadow-md bg-background">
            {/* Column 1: Info */}
            <div className="bg-[#B3A0E6]/10 p-8 flex flex-col justify-between border-b lg:border-b-0 border-neutral-carvao/10">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8b7ec8] bg-[#8b7ec8]/10 border border-[#8b7ec8]/25 px-2 py-0.5 rounded-sm w-fit">
                  Interactions
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-extrabold text-title-h3 text-neutral-carvao uppercase tracking-tight leading-none">
                    Fluid Grid
                  </h4>
                  <span className="font-sans text-body-sm font-medium text-neutral-carvao/60">Interface Concept</span>
                </div>
                <p className="font-sans text-body-base text-neutral-carvao/75 leading-relaxed">
                  An interface concept that adapts, reflows and rethinks structure in real time. Built to explore responsive component boundaries.
                </p>
              </div>

              <Link
                to="/project/ui-micro-interactions"
                className="group w-fit mt-8 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-carvao hover:text-[#8b7ec8] transition-colors py-2 cursor-pointer"
              >
                <span>View Experiment</span>
                <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Column 2: Devices Mockups */}
            <div className="bg-neutral-carvao/5 relative overflow-hidden aspect-[4/3] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-x border-neutral-carvao/10 select-none">
              <div className="relative w-[90%] h-[90%] flex gap-4 items-center justify-center">
                {/* Tablet Frame */}
                <div className="w-[60%] h-[85%] border border-neutral-carvao/25 rounded-md overflow-hidden bg-background shadow-lg relative flex flex-col p-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-carvao/20 self-center mb-2" />
                  <div className="flex-1 border border-neutral-carvao/10 rounded-sm p-3 flex flex-col justify-between">
                    <span className="font-sans font-extrabold text-base text-neutral-carvao leading-none">Ideas<br />shaped by<br />curiosity.</span>
                    <div className="w-8 h-8 rounded-full border border-neutral-carvao/10 bg-[#B3A0E6]/10 flex items-center justify-center text-neutral-carvao/40">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
                    </div>
                  </div>
                </div>
                {/* Phone Frame */}
                <div className="w-[35%] h-[75%] border border-neutral-carvao/25 rounded-md overflow-hidden bg-background shadow-lg relative flex flex-col p-1.5 -translate-y-2">
                  <div className="h-1 w-8 bg-neutral-carvao/25 rounded-full mx-auto mb-1.5" />
                  <div className="flex-1 border border-neutral-carvao/10 rounded-sm p-2 flex flex-col justify-between">
                    <div className="h-1 w-full bg-neutral-carvao/10" />
                    <div className="h-10 w-full bg-[#E6A045]/10 border border-[#E6A045]/30 rounded-sm" />
                    <div className="h-2 w-full bg-neutral-carvao/5 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Bullet Specs */}
            <div className="bg-[#E6A045]/15 p-8 flex flex-col justify-center gap-6">
              {[
                "ADAPTIVE LAYOUT", "REAL TIME REFLOW", "CONTENT AWARE", "LIGHTWEIGHT PROTOTYPE"
              ].map((spec) => (
                <div key={spec} className="flex items-center gap-3 pb-3 border-b border-neutral-carvao/5">
                  <div className="w-4 h-4 rounded-full bg-[#E6A045] flex items-center justify-center text-background">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-carvao">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 5: Bottom CTA banner */}
        <div className="w-full px-4 md:px-[calc(16%-24px)] py-12">
          <div className="bg-[#B3A0E6]/5 border border-neutral-carvao/10 rounded-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-8 shadow-sm">
            <div className="flex flex-col gap-3 max-w-lg text-center lg:text-left">
              <h3 className="font-sans font-extrabold text-title-h2 text-neutral-carvao leading-none uppercase tracking-tight">
                Interested in working <span className="text-[#E6A045]">together?</span>
              </h3>
              <p className="font-sans text-body-base text-neutral-carvao/70 leading-relaxed">
                I'm open to new opportunities and exciting collaborations. Let's build something great.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 z-10 w-full sm:w-auto justify-center">
              <LimeActionButton
                as="a"
                href="mailto:davidsalviano52@gmail.com"
              >
                Let's connect
              </LimeActionButton>

              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Email Me</span>
                <a
                  href="mailto:davidsalviano52@gmail.com"
                  className="font-mono text-xs font-bold text-neutral-carvao hover:text-[#8b7ec8] transition-colors"
                >
                  davidsalviano52@gmail.com
                </a>
              </div>
            </div>

            {/* Rotating Stamp */}
            <div className="absolute right-4 top-4 lg:relative lg:right-auto lg:top-auto z-0 scale-75 opacity-20 lg:opacity-100 flex-shrink-0">
              <RotatingStamp
                text="AVAILABLE FOR NEW PROJECTS • AVAILABLE FOR NEW PROJECTS •"
                icon={Star}
              />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
