import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { ReconstructMedia } from '../ReconstructMedia';
import { ContextualCursor } from './ContextualCursor';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fallback curated cases if Sanity data is not yet populated
const STATIC_FALLBACK_CASES = [
  {
    id: 'mapear',
    slug: 'mapear',
    title: 'Mapear Platform',
    category: 'Product Design · Design Systems',
    description:
      'Plataforma de avaliação educacional e geolocalização conectando pesquisa, design system e desenvolvimento.',
    link: '/cases/mapear',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
  },
  {
    id: 'aula-f75',
    slug: 'aula-f75',
    title: 'Aula F75',
    category: 'Interface & Motion · Hardware',
    description:
      'Experiência imersiva e interativa traduzindo a precisão e o design tátil de hardware para a web.',
    link: '/cases/aula-f75',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
  },
  {
    id: 'escutha',
    slug: 'escutha',
    title: 'Escutha',
    category: 'Product & Web Design · Healthcare',
    description:
      'Redesign e modernização da presença digital com foco em clareza, arquitetura de informação e acolhimento.',
    link: '/cases/escutha',
    wallpaperSrc: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
    mediaThumbSrc: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_card.png`,
    mediaExpandedSrc: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
  },
];

export function FeaturedCasesStage() {
  const { t } = useLanguage();
  const { featuredProjects } = useProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // References for DOM and animation
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const slideRefs = useRef([]);
  const wallpaperRefs = useRef([]);
  const cardRefs = useRef([]);
  const infoRefs = useRef([]);

  // Format cases from Sanity with robust fallback mapping
  const cases = useMemo(() => {
    if (Array.isArray(featuredProjects) && featuredProjects.length > 0) {
      return featuredProjects.map((p, idx) => {
        const fallback = STATIC_FALLBACK_CASES.find((fb) => fb.id === (p.slug || p.id)) || STATIC_FALLBACK_CASES[idx] || {};
        const slug = p.slug?.current || p.slug || p.id;
        return {
          id: p.id || slug,
          slug,
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
    return STATIC_FALLBACK_CASES.map((fb, idx) => ({
      ...fb,
      number: String(idx + 1).padStart(2, '0'),
    }));
  }, [featuredProjects]);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Single GSAP ScrollTrigger timeline pinning the stage and swapping slides
  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !stageRef.current || cases.length <= 1) {
      return;
    }

    const numTransitions = cases.length - 1;
    const effectiveViewportHeight = window.innerHeight;

    const ctx = gsap.context(() => {
      // Initialize slides
      cases.forEach((_, i) => {
        if (i === 0) {
          gsap.set(slideRefs.current[i], { autoAlpha: 1, zIndex: 10 });
          gsap.set(wallpaperRefs.current[i], { autoAlpha: 1, scale: 1 });
          gsap.set(cardRefs.current[i], { autoAlpha: 1, yPercent: 0, scale: 1 });
          gsap.set(infoRefs.current[i], { autoAlpha: 1, yPercent: 0 });
        } else {
          gsap.set(slideRefs.current[i], { autoAlpha: 0, zIndex: 10 + i });
          gsap.set(wallpaperRefs.current[i], { autoAlpha: 0, scale: 1.06 });
          gsap.set(cardRefs.current[i], { autoAlpha: 0, yPercent: 18, scale: 0.94 });
          gsap.set(infoRefs.current[i], { autoAlpha: 0, yPercent: 20 });
        }
      });

      // Master Timeline
      const tl = gsap.timeline({ paused: true });

      for (let i = 0; i < numTransitions; i++) {
        const stepTime = i * 1.2;
        const duration = 1.0;

        // Slide i exits
        tl.to(
          wallpaperRefs.current[i],
          {
            autoAlpha: 0,
            scale: 0.96,
            ease: 'power2.inOut',
            duration,
          },
          stepTime
        );

        tl.to(
          cardRefs.current[i],
          {
            autoAlpha: 0,
            yPercent: -18,
            scale: 0.94,
            ease: 'power2.inOut',
            duration,
          },
          stepTime
        );

        tl.to(
          infoRefs.current[i],
          {
            autoAlpha: 0,
            yPercent: -20,
            ease: 'power2.inOut',
            duration: duration * 0.75,
          },
          stepTime
        );

        // Slide i+1 enters
        tl.set(slideRefs.current[i + 1], { autoAlpha: 1 }, stepTime);

        tl.to(
          wallpaperRefs.current[i + 1],
          {
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.inOut',
            duration,
          },
          stepTime
        );

        tl.to(
          cardRefs.current[i + 1],
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            ease: 'power2.inOut',
            duration,
          },
          stepTime
        );

        tl.to(
          infoRefs.current[i + 1],
          {
            autoAlpha: 1,
            yPercent: 0,
            ease: 'power2.out',
            duration: duration * 0.85,
          },
          stepTime + duration * 0.15
        );
      }

      // Single ScrollTrigger instance
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${numTransitions * effectiveViewportHeight * 0.95}px`,
        pin: stageRef.current,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        snap: numTransitions > 0
          ? {
              snapTo: 1 / numTransitions,
              directional: true,
              duration: {
                min: 0.18,
                max: 0.45,
              },
              ease: 'power2.inOut',
            }
          : false,
        onUpdate: (self) => {
          if (numTransitions > 0) {
            const idx = Math.min(
              numTransitions,
              Math.round(self.progress * numTransitions)
            );
            setActiveIndex(idx);
            // Clear hover state during active scrolling
            if (self.getVelocity && Math.abs(self.getVelocity()) > 10) {
              setHoveredIndex(null);
              setCursorVisible(false);
            }
          }
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger when images are fully ready or window resizes
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleRefresh);

    return () => {
      window.removeEventListener('resize', handleRefresh);
      ctx.revert();
    };
  }, [cases, prefersReducedMotion]);

  // Reduced Motion Fallback Mode: Simple static vertical layout
  if (prefersReducedMotion) {
    return (
      <section
        id="featured-work"
        className="relative w-full bg-[#10110F] text-[#FAFAF7] overflow-visible"
      >
        <div className="absolute z-[9999] pointer-events-none">
          <ContextualCursor isVisible={cursorVisible} label={t('cursor_view_case', 'VER CASE')} />
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C7F000]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FAFAF7]">
              {t('featured_work_title', 'FEATURED WORK')}
            </span>
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#FAFAF7]/70">
            [ {String(cases.length).padStart(2, '0')} SELECIONADOS ]
          </span>
        </div>

        <div className="flex flex-col gap-16 py-12">
          {cases.map((project, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={project.id || idx}
                className="relative w-full min-h-[90svh] flex items-center justify-center overflow-hidden bg-[#10110F]"
              >
                {/* B&W Wallpaper */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <img
                    src={project.wallpaperSrc}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-[filter,transform] duration-700 ease-out ${
                      isHovered
                        ? 'grayscale-0 contrast-[0.95] brightness-[0.72] scale-[1.02]'
                        : 'grayscale contrast-[0.85] brightness-[0.6] scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-[#10110F]/45" />
                </div>

                {/* Central Card */}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center py-12">
                  <div className="flex items-center gap-3 mb-3 text-[#F4F3EE]/80 font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
                    <span>{project.number}</span>
                    <span className="text-white/30">•</span>
                    <span>{project.category}</span>
                  </div>

                  <CurtainLink
                    to={project.link}
                    curtainTitle={project.title}
                    onMouseEnter={() => {
                      setHoveredIndex(idx);
                      setCursorVisible(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setCursorVisible(false);
                    }}
                    className={`relative block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[20px] shadow-2xl overflow-hidden border border-white/20 group cursor-pointer w-[90vw] max-w-[860px] aspect-[16/10]`}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <ReconstructMedia
                        initialImage={project.mediaThumbSrc}
                        finalImage={project.mediaExpandedSrc}
                        alt={project.title}
                        isHovered={isHovered}
                        aspectRatio="w-full h-full"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between z-30 pointer-events-none">
                      <div className="text-left max-w-xl">
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F3EE] font-normal leading-tight">
                          {project.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/75 line-clamp-1 mt-1">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C7F000] group-hover:text-[#10110F] group-hover:border-[#C7F000]">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </CurtainLink>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Standard Mode: Single Pinned Stage with B&W Wallpapers and Central ReconstructMedia
  return (
    <section
      id="featured-work"
      ref={containerRef}
      className="relative w-full bg-[#10110F] text-[#FAFAF7] overflow-visible select-none"
    >
      {/* Stable wrapper to isolate conditional rendering from GSAP's DOM manipulation */}
      <div className="absolute z-[9999] pointer-events-none">
        <ContextualCursor isVisible={cursorVisible} label={t('cursor_view_case', 'VER CASE')} />
      </div>

      {/* Pinned Stage that fits exactly below the header safe offset */}
      <div
        ref={stageRef}
        className="w-full overflow-hidden relative z-10"
        style={{
          height: 'calc(100svh - var(--header-safe-offset, 72px))',
          top: 'var(--header-safe-offset, 72px)',
        }}
      >
        {/* Fixed Discreet Section Title during all slide transitions */}
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none py-5 sm:py-6 px-6 sm:px-10 lg:px-16">
          <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C7F000]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FAFAF7] drop-shadow-md">
                {t('featured_work_title', 'FEATURED WORK')}
              </span>
            </div>

            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#FAFAF7]/70 drop-shadow-md">
              [ {String(activeIndex + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')} SELECIONADOS ]
            </span>
          </div>
        </div>

        {/* Stacked Project Slides */}
        {cases.map((project, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <article
              key={project.id || idx}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="featured-case-slide absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden will-change-transform"
            >
              {/* ============================================================ */}
              {/* 1. B&W WALLPAPER (Full Viewport, Soft Color on Card Hover)   */}
              {/* ============================================================ */}
              <div
                ref={(el) => (wallpaperRefs.current[idx] = el)}
                className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
              >
                <img
                  src={project.wallpaperSrc}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-[filter,transform] duration-700 ease-out ${
                    isHovered
                      ? 'grayscale-0 contrast-[0.95] brightness-[0.72] scale-[1.02]'
                      : 'grayscale contrast-[0.85] brightness-[0.6] scale-100'
                  }`}
                  onLoad={() => ScrollTrigger.refresh()}
                />
                {/* Dark uniform overlay for center focus */}
                <div className="absolute inset-0 bg-[#10110F]/45" />
              </div>

              {/* ============================================================ */}
              {/* 2. CENTRAL CARD & RECONSTRUCT MEDIA                          */}
              {/* ============================================================ */}
              <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center pt-8 sm:pt-6">
                {/* Metadata */}
                <div
                  ref={(el) => (infoRefs.current[idx] = el)}
                  className="flex items-center gap-3 mb-3 text-[#F4F3EE]/80 font-mono text-[11px] font-bold uppercase tracking-[0.22em] will-change-transform"
                >
                  <span>{project.number}</span>
                  <span className="text-white/30">•</span>
                  <span>{project.category}</span>
                </div>

                {/* Central Card with ReconstructMedia */}
                <div
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="w-full flex justify-center will-change-transform"
                >
                  <CurtainLink
                    to={project.link}
                    curtainTitle={project.title}
                    onMouseEnter={() => {
                      setHoveredIndex(idx);
                      setCursorVisible(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setCursorVisible(false);
                    }}
                    className={`relative block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[20px] shadow-2xl overflow-hidden border border-white/20 group cursor-pointer w-[88vw] sm:w-[80vw] md:w-[70vw] lg:w-[min(54vw,860px)] aspect-[16/10] max-h-[min(62vh,680px)] ${
                      isHovered
                        ? 'scale-[1.02] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-white/40'
                        : 'scale-100 shadow-2xl border-white/20'
                    }`}
                  >
                    {/* Media with Modular Reconstruct Effect */}
                    <div className="absolute inset-0 w-full h-full">
                      <ReconstructMedia
                        initialImage={project.mediaThumbSrc}
                        finalImage={project.mediaExpandedSrc}
                        alt={project.title}
                        isHovered={isHovered}
                        aspectRatio="w-full h-full"
                      />
                    </div>

                    {/* Bottom Gradient with Title, Description & Action */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between z-30 pointer-events-none">
                      <div className="text-left max-w-xl">
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F3EE] font-normal leading-tight">
                          {project.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/75 line-clamp-1 mt-1">
                          {project.description}
                        </p>
                      </div>

                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C7F000] group-hover:text-[#10110F] group-hover:border-[#C7F000] flex-shrink-0 ml-4">
                        <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </CurtainLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedCasesStage;
