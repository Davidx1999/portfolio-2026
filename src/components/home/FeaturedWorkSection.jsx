import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../context/LanguageContext';
import { FeaturedProjectItem } from './FeaturedProjectItem';
import { ContextualCursor } from './ContextualCursor';

export function FeaturedWorkSection() {
  const { t } = useLanguage();
  const { projects: sanityProjects } = useProjects();
  const [cursorVisible, setCursorVisible] = useState(false);

  const getP = (id) => sanityProjects.find((p) => p.id === id);

  const project1 = {
    number: '01',
    title: getP('mapear')?.title || 'Mapear Platform',
    category: getP('mapear')?.category || 'SaaS • EdTech',
    description:
      getP('mapear')?.description ||
      'Plataforma de avaliação educacional e geolocalização conectando pesquisa, design system e desenvolvimento.',
    link: '/cases/mapear',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
  };

  const project2 = {
    number: '02',
    title: getP('aula-f75')?.title || 'Aula F75',
    category: getP('aula-f75')?.category || 'E-learning • Hardware',
    description:
      getP('aula-f75')?.description ||
      'Experiência imersiva e interativa traduzindo a precisão e o design tátil de hardware para a web.',
    link: '/cases/aula-f75',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
  };

  return (
    <section
      id="featured-work"
      className="relative w-full bg-[#111210] text-[#FAFAF7] overflow-visible"
    >
      <ContextualCursor isVisible={cursorVisible} label={t('cursor_view_case', 'VER CASE')} />

      {/* ============================================================ */}
      {/* STICKY SECTION TITLE (Stays pinned during the 2 projects)    */}
      {/* ============================================================ */}
      <div className="sticky top-[54px] w-full z-20 pointer-events-none py-6">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#4056F4]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FAFAF7] drop-shadow-md">
              {t('featured_work_title', 'FEATURED WORK')}
            </span>
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#FAFAF7]/70 drop-shadow-md">
            [ 02 SELECIONADOS ]
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PROJETOS SELECIONADOS (1 Viewport por Projeto)               */}
      {/* ============================================================ */}
      <div className="relative w-full">
        <FeaturedProjectItem
          {...project1}
          onCursorChange={setCursorVisible}
        />
        <FeaturedProjectItem
          {...project2}
          onCursorChange={setCursorVisible}
        />
      </div>
    </section>
  );
}
