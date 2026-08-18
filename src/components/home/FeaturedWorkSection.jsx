import React, { useState, useMemo } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../context/LanguageContext';
import { FeaturedProjectItem } from './FeaturedProjectItem';
import { ContextualCursor } from './ContextualCursor';

const STATIC_FALLBACK_CASES = [
  {
    id: 'mapear',
    title: 'Mapear Platform',
    category: 'SaaS • EdTech',
    description:
      'Plataforma de avaliação educacional e geolocalização conectando pesquisa, design system e desenvolvimento.',
    link: '/cases/mapear',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
  },
  {
    id: 'aula-f75',
    title: 'Aula F75',
    category: 'E-learning • Hardware',
    description:
      'Experiência imersiva e interativa traduzindo a precisão e o design tátil de hardware para a web.',
    link: '/cases/aula-f75',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
  },
  {
    id: 'escutha',
    title: 'Escutha',
    category: 'Product & Web Design',
    description:
      'Redesign e modernização da presença digital com foco em clareza na comunicação, arquitetura de informação acessível e experiência humanizada.',
    link: '/cases/escutha',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
  },
];

export function FeaturedWorkSection() {
  const { t } = useLanguage();
  const { featuredProjects } = useProjects();
  const [cursorVisible, setCursorVisible] = useState(false);

  const displayCases = useMemo(() => {
    if (Array.isArray(featuredProjects) && featuredProjects.length > 0) {
      return featuredProjects.map((p, idx) => {
        const slug = p.slug?.current || p.slug || p.id;
        const fallback = STATIC_FALLBACK_CASES.find((fb) => fb.id === slug) || STATIC_FALLBACK_CASES[idx] || {};

        return {
          id: p.id || slug,
          number: String(idx + 1).padStart(2, '0'),
          title: p.title || fallback.title || 'Projeto',
          category: p.category || p.context || fallback.category || 'Digital Product',
          description: p.description || fallback.description || '',
          link: `/cases/${slug}`,
          wallpaperSrc: p.coverImage || fallback.wallpaperSrc || p.image || p.finalImage,
          mediaThumbSrc: p.processImage || p.image || fallback.mediaThumbSrc || p.coverImage,
          mediaExpandedSrc: p.finalImage || p.imageHover || fallback.mediaExpandedSrc || p.coverImage || p.image,
        };
      });
    }

    return STATIC_FALLBACK_CASES.map((item, idx) => ({
      ...item,
      number: String(idx + 1).padStart(2, '0'),
    }));
  }, [featuredProjects]);

  return (
    <section
      id="featured-work"
      className="relative w-full bg-[#111210] text-[#FAFAF7] overflow-visible"
    >
      <div className="absolute z-[9999] pointer-events-none">
        <ContextualCursor isVisible={cursorVisible} label={t('cursor_view_case', 'VER CASE')} />
      </div>

      {/* ============================================================ */}
      {/* STICKY SECTION TITLE (Stays pinned during the cases)          */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="sticky top-[54px] w-full py-6 mix-blend-difference">
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-center text-[#FAFAF7]">
            <h4 className="font-mono text-base sm:text-lg font-bold uppercase tracking-[0.2em] drop-shadow-md m-0 text-center">
              {t('featured_work_title', 'FEATURED WORK')}
            </h4>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PROJETOS SELECIONADOS (1 Viewport por Projeto, Scroll Normal) */}
      {/* ============================================================ */}
      <div className="relative w-full">
        {displayCases.map((project) => (
          <FeaturedProjectItem
            key={project.id}
            {...project}
            onCursorChange={setCursorVisible}
          />
        ))}
      </div>
    </section>
  );
}
