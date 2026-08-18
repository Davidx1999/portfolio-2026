import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────
   DEFAULT ARTIFACTS — 6 cards for a 3 × 2 grid
   ──────────────────────────────────────────────────────────── */
const DEFAULT_ARTIFACTS = [
  {
    id: 'art-1',
    title: { pt: 'Educação & Mapeamento', en: 'Education & Mapping' },
    label: 'SaaS Platform',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
  },
  {
    id: 'art-2',
    title: { pt: 'Design System & Tokens', en: 'Design System & Tokens' },
    label: 'UI Architecture',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
  },
  {
    id: 'art-3',
    title: { pt: 'Fluxos & Arquitetura', en: 'Flows & Architecture' },
    label: 'Core Ecosystem',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
  },
  {
    id: 'art-4',
    title: { pt: 'Interface Tátil & 3D', en: 'Tactile Interface & 3D' },
    label: 'Interactive Hardware',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
  },
  {
    id: 'art-5',
    title: { pt: 'Engenharia de Interfaces', en: 'Interface Engineering' },
    label: 'Data Science & CLI',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_card.png`,
  },
  {
    id: 'art-6',
    title: { pt: 'Relatórios & Impacto', en: 'Reports & Impact' },
    label: 'Research Outputs',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/mapear_reports.jpg`,
  },
];

/* ────────────────────────────────────────────────────────────
   DISPERSAL OFFSETS
   ──────────────────────────────────────────────────────────── */
const DISPERSALS = [
  { x: -35, y: -30, rotate: -14, scale: 0.82 },  // top-left
  { x: 10,  y: -40, rotate: 8,   scale: 0.78 },  // top-center
  { x: 40,  y: -25, rotate: 16,  scale: 0.85 },  // top-right
  { x: -30, y: 35,  rotate: 12,  scale: 0.80 },  // bottom-left
  { x: 15,  y: 40,  rotate: -6,  scale: 0.76 },  // bottom-center
  { x: 35,  y: 35,  rotate: -18, scale: 0.83 },  // bottom-right
];

export function OverlappingGallery({ items }) {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  const artifacts = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) return items;
    return DEFAULT_ARTIFACTS;
  }, [items]);

  const row1 = useMemo(() => artifacts.slice(0, 3), [artifacts]);
  const row2 = useMemo(() => artifacts.slice(3, 6), [artifacts]);

  /* ──────────────────────────────────────────────────────────
     GSAP ScrollTrigger — dispersal → convergence
     ────────────────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !stage || cards.length === 0) return;

    // Preserve cleanup with gsap.context()
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Desktop (≥768px, no reduced motion) ─────────────── */
      mm.add(
        {
          isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          isMobile: '(max-width: 767px)',
          isReduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop } = context.conditions;
          if (!isDesktop) return; // mobile / reduced: plain grid, no animation

          const vw = window.innerWidth;

          // Set each card to its dispersed position coming from the outer borders
          cards.forEach((card, i) => {
            const d = DISPERSALS[i] || DISPERSALS[0];
            gsap.set(card, {
              x: (d.x / 100) * vw,
              y: (d.y / 100) * vw,
              rotate: d.rotate,
              scale: d.scale,
              opacity: 1,
              willChange: 'transform',
            });
          });

          // Create a single timeline scrubbed by scroll
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
              invalidateOnRefresh: true, // required for responsive recalc
            },
          });

          // Stagger each card converging to its grid slot, but start at 0 so no dead zone
          cards.forEach((card, i) => {
            tl.to(
              card,
              {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
              },
              0 // Start immediately at progress 0, no empty hold phase
            );
          });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [artifacts]);

  /* ──────────────────────────────────────────────────────────
     RENDER
     ────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="production-gallery"
      className="relative w-full bg-[#FAFAF7] text-[#111210] select-none h-auto md:h-[220svh]"
    >
      <style>{`
        .gallery-stage {
          box-sizing: border-box;
          padding: 2rem 0 1.5rem;
          width: 100%;
        }
        @media (min-width: 768px) {
          .gallery-stage {
            position: sticky;
            top: 0;
            height: 100svh;
            padding-top: calc(var(--header-safe-offset, 64px) + clamp(8px, 1.5vh, 16px));
            padding-bottom: clamp(24px, 3vh, 40px);
            overflow: hidden;
          }
        }

        .gallery-inner {
          width: min(86vw, 1520px);
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.5vh, 32px);
          height: 100%;
        }
        @media (min-width: 768px) {
          .gallery-inner {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            min-height: 0;
          }
        }
      `}</style>

      {/* STICKY STAGE */}
      <div ref={stageRef} className="gallery-stage">
        <div className="gallery-inner">
          {/* TITLE */}
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8B8B85] block mb-3 sm:mb-4">
              {t('gallery_tag', '02 // PROCESSO & ENTREGA')}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-[#111210] font-normal leading-[1.2] tracking-tight">
              {t('gallery_headline', 'Da estratégia ao componente final.')}
            </h2>
          </div>

          {/* CARDS CONTAINER */}
          <div className="w-full flex flex-col justify-center min-h-0">
            {/* ROW 1 (3 CARDS) */}
            <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 w-full">
              {row1.map((card, idx) => (
                <div
                  key={card.id || idx}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className="col-span-12 sm:col-span-6 md:col-span-4 relative w-full aspect-[16/9] overflow-hidden rounded-[16px] bg-[#10110F] group"
                >
                  <img
                    src={card.image}
                    alt={card.alt || (typeof card.title === 'object' ? (card.title[language] || card.title.pt) : card.title)}
                    loading="lazy"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Glassmorphic caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between text-white pointer-events-none z-10">
                    <div className="max-w-[75%]">
                      <h3 className="font-sans font-semibold text-sm sm:text-base text-white/95 truncate drop-shadow-sm">
                        {typeof card.title === 'object'
                          ? (card.title[language] || card.title.pt)
                          : card.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/75 font-semibold px-2.5 py-1 rounded-[8px] bg-white/10 backdrop-blur-md border border-white/15 shrink-0">
                      {card.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DIVIDER BETWEEN ROW 1 AND ROW 2 (EXACT HALF-GAP MARGINS: 0.75rem / 1rem / 1.25rem) */}
            <div className="w-full border-t border-[#111210]/12 my-3 sm:my-4 lg:my-5" />

            {/* ROW 2 (3 CARDS) */}
            <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 w-full">
              {row2.map((card, idx) => (
                <div
                  key={card.id || (idx + 3)}
                  ref={(el) => { cardsRef.current[idx + 3] = el; }}
                  className="col-span-12 sm:col-span-6 md:col-span-4 relative w-full aspect-[16/9] overflow-hidden rounded-[16px] bg-[#10110F] group"
                >
                  <img
                    src={card.image}
                    alt={card.alt || (typeof card.title === 'object' ? (card.title[language] || card.title.pt) : card.title)}
                    loading="lazy"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Glassmorphic caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between text-white pointer-events-none z-10">
                    <div className="max-w-[75%]">
                      <h3 className="font-sans font-semibold text-sm sm:text-base text-white/95 truncate drop-shadow-sm">
                        {typeof card.title === 'object'
                          ? (card.title[language] || card.title.pt)
                          : card.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/75 font-semibold px-2.5 py-1 rounded-[8px] bg-white/10 backdrop-blur-md border border-white/15 shrink-0">
                      {card.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverlappingGallery;
