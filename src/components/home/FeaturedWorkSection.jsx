import React, { useState, useMemo } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../context/LanguageContext';
import { FeaturedProjectItem } from './FeaturedProjectItem';
import { ContextualCursor } from './ContextualCursor';

export function FeaturedWorkSection() {
  const { t } = useLanguage();
  const { featuredProjects } = useProjects();
  const [cursorVisible, setCursorVisible] = useState(false);

  const displayCases = useMemo(() => {
    if (!Array.isArray(featuredProjects) || featuredProjects.length === 0) {
      return [];
    }

    return featuredProjects.map((p, idx) => {
      const slug = p.slug?.current || p.slug || p.id;
      return {
        id: p.id || slug,
        number: String(idx + 1).padStart(2, '0'),
        title: p.title || 'Untitled Project',
        category: p.category || p.context || 'Digital Product',
        description: p.shortDescription || p.heroSummary || p.description || '',
        link: `/cases/${slug}`,
        wallpaperSrc: p.coverImage || p.finalImage || p.image,
        mediaThumbSrc: p.processImage || p.image || p.coverImage,
        mediaExpandedSrc: p.finalImage || p.image || p.coverImage,
      };
    });
  }, [featuredProjects]);

  // Se não houver projetos em destaque no Sanity, oculta graciosamente a seção
  if (displayCases.length === 0) {
    return null;
  }

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
