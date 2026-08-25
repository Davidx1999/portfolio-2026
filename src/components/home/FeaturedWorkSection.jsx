import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../context/LanguageContext';
import { useHeaderMetrics } from '../../hooks/useHeaderMetrics';
import { FeaturedProjectItem } from './FeaturedProjectItem';
import { ContextualCursor } from './ContextualCursor';

export function FeaturedWorkSection() {
  const { t } = useTranslation(['home']);
  const { language } = useLanguage();
  const { featuredProjects } = useProjects();
  const { headerBottom = 54 } = useHeaderMetrics();
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
        link: `/${language}/work/${slug}`,
        wallpaperSrc: p.landingBackgroundImage || p.wallpaperImage || p.coverImage || p.image,
        mediaThumbSrc: p.coverImage || p.image,
        mediaExpandedSrc: p.coverImage || p.image,
      };
    });
  }, [featuredProjects, language]);

  // Se não houver projetos em destaque no Sanity, oculta graciosamente a seção
  if (displayCases.length === 0) {
    return null;
  }

  return (
    <section
      id="featured-work"
      className="relative z-10 w-full bg-[#111210] text-[#FAFAF7] overflow-visible"
    >
      <div className="absolute z-[9999] pointer-events-none">
        <ContextualCursor isVisible={cursorVisible} label={t('home:cursor_view_case', 'VIEW CASE')} />
      </div>

      {/* ============================================================ */}
      {/* STICKY SECTION TITLE (In-flow sticky from start to end)      */}
      {/* ============================================================ */}
      <div
        style={{ top: `${headerBottom}px`, mixBlendMode: 'difference' }}
        className="sticky z-20 w-full py-6 mb-[-72px] flex items-center justify-center pointer-events-none mix-blend-difference"
      >
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-center">
          <h4 className="font-mono text-base sm:text-lg font-bold uppercase tracking-[0.2em] text-white select-none m-0 text-center">
            {t('home:featured_work_title', 'FEATURED WORK')}
          </h4>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PROJETOS (Scroll Natural com Parallax e Pixel Reveal)         */}
      {/* ============================================================ */}
      <div className="w-full flex flex-col">
        {displayCases.map((caseItem, index) => (
          <FeaturedProjectItem
            key={caseItem.id}
            {...caseItem}
            caseItem={caseItem}
            index={index}
            totalCount={displayCases.length}
            onCursorChange={setCursorVisible}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedWorkSection;
