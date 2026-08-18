import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseVerticalMediaStack
 *
 * Pilha visual de imagens empilhadas com oclusão natural (sem fade/opacidade).
 *
 * Distância e Timeline Diretas:
 * - Altura total: window.innerHeight + (cards - 1) * 0.55vh + 0.15vh
 * - A 1ª imagem já está centralizada quando a seção alcança o sticky.
 * - Do primeiro movimento de scroll para baixo, a 2ª imagem começa a subir imediatamente.
 * - Zero pausas vazias na timeline. Cada transição usa ~55vh e ease: "none".
 * - A suavidade vem do Lenis com lerp: 0.18.
 */
export function CaseVerticalMediaStack({ block }) {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const [sectionHeightPx, setSectionHeightPx] = useState(null);

  const items = Array.isArray(block?.items) ? block.items : [];
  const total = items.length;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const cardElements = cardsRef.current.filter(Boolean);

    if (!section || !stage || cardElements.length === 0) return;

    // Calcular alturas exatas baseadas na viewport atual
    const updateDimensions = () => {
      const vh = window.innerHeight;
      const transitionDistance = vh * 0.55;
      const finalHoldDistance = vh * 0.15;
      const totalDistance = (cardElements.length - 1) * transitionDistance + finalHoldDistance;
      const calculatedHeight = vh + totalDistance;
      setSectionHeightPx(calculatedHeight);
      return { totalDistance, calculatedHeight };
    };

    const { totalDistance } = updateDimensions();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          const headerHeight = 0;

          // ── Posições Iniciais ─────────────────────────────────
          cardElements.forEach((card, index) => {
            if (index === 0) {
              gsap.set(card, {
                y: 0,
                scale: 1,
                zIndex: 10,
                willChange: 'transform',
                transformOrigin: 'center center',
              });
            } else {
              gsap.set(card, {
                y: isDesktop ? '110vh' : '100vh',
                scale: 1,
                zIndex: 10 + index * 10,
                willChange: 'transform',
                transformOrigin: 'center center',
              });
            }
          });

          // ── Timeline Contínua Sem Deadzones ───────────────────
          const timeline = gsap.timeline({
            defaults: {
              ease: 'none',
              duration: 1,
            },
          });

          cardElements.forEach((card, index) => {
            if (index > 0) {
              const insertPosition = (index - 1) * 1.0;

              timeline.to(
                card,
                {
                  y: 0,
                  duration: 1.0,
                  ease: 'none',
                },
                insertPosition
              );

              const prevCard = cardElements[index - 1];
              timeline.to(
                prevCard,
                {
                  scale: isDesktop ? 0.94 : 0.96,
                  duration: 1.0,
                  ease: 'none',
                },
                insertPosition
              );
            }

            if (index > 1) {
              const olderCard = cardElements[index - 2];
              const olderPosition = (index - 1) * 1.0;
              timeline.to(
                olderCard,
                {
                  scale: isDesktop ? 0.88 : 0.92,
                  duration: 1.0,
                  ease: 'none',
                },
                olderPosition
              );
            }
          });

          // ── ScrollTrigger Único com Distância Curta ────────────
          ScrollTrigger.create({
            trigger: section,
            start: () => `top top+=${headerHeight}`,
            end: () => `+=${totalDistance}`,
            animation: timeline,
            scrub: true,
            invalidateOnRefresh: true,
          });
        }
      );
    }, sectionRef);

    const handleResize = () => {
      updateDimensions();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      ctx.revert();
    };
  }, [total]);

  if (!block || !Array.isArray(block.items) || block.items.length === 0) {
    return null;
  }

  const eyebrow = language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow;
  const opening =
    language === 'en' && block.openingStatement_en ? block.openingStatement_en : block.openingStatement;
  const closing =
    language === 'en' && block.closingStatement_en ? block.closingStatement_en : block.closingStatement;
  const isLight = block.theme === 'light';

  return (
    <section
      ref={sectionRef}
      style={{
        '--stack-scroll-height': sectionHeightPx
          ? `${sectionHeightPx}px`
          : `calc(100vh + (${total} - 1) * 55vh + 15vh)`,
        height: 'var(--stack-scroll-height)',
        position: 'relative',
      }}
      className={`stack-scroll-section w-full border-b select-none ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      {/* ============================================================ */}
      {/* LAYOUT DESKTOP: CSS STICKY STAGE (≥ 768px & normal motion)   */}
      {/* ============================================================ */}
      <div
        ref={stageRef}
        className="stack-sticky-stage hidden md:flex flex-col justify-between w-full px-6 sm:px-10 lg:px-16 pt-20 lg:pt-24 pb-8 lg:pb-10"
        style={{
          position: 'sticky',
          top: 'var(--header-safe-offset, 72px)',
          height: 'calc(100svh - var(--header-safe-offset, 72px))',
          overflow: 'hidden',
        }}
      >
        {/* Cabeçalho da Seção */}
        <div className="section-heading w-full max-w-[1560px] mx-auto z-20 flex-shrink-0 mb-4">
          {eyebrow && (
            <span
              className={`font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] block mb-1.5 ${
                isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
              }`}
            >
              {eyebrow}
            </span>
          )}
          {opening && (
            <h3 className="font-serif text-lg sm:text-2xl lg:text-[1.75rem] font-normal leading-snug max-w-3xl">
              {opening}
            </h3>
          )}
        </div>

        {/* Palco Central dos Cards */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto z-10 min-h-0 overflow-hidden">
          {items.map((item, idx) => {
            const caption = language === 'en' && item.caption_en ? item.caption_en : item.caption;
            const supportingText =
              language === 'en' && item.supportingText_en ? item.supportingText_en : item.supportingText;

            return (
              <div
                key={item._key || `stack-pos-${idx}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(44rem,calc(100vw-8rem))] max-h-[50vh] aspect-[16/10] pointer-events-none"
                style={{ zIndex: idx + 1 }}
              >
                <div
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="w-full h-full rounded-[18px] lg:rounded-[22px] overflow-hidden border border-[rgba(244,243,238,0.22)] bg-[#151613] shadow-2xl relative pointer-events-auto"
                >
                  <img
                    src={item.media}
                    alt={caption || `Stack item ${idx + 1}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover filter saturate-[0.98] contrast-[1.02] block"
                  />

                  {(caption || supportingText) && (
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between font-mono text-xs text-[#FAFAF7]">
                      <div>
                        <span className="text-[#C4FF00] font-bold block mb-0.5">{caption}</span>
                        {supportingText && (
                          <p className="text-white/75 text-[11px] font-sans max-w-xl">{supportingText}</p>
                        )}
                      </div>
                      <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono ml-4 flex-shrink-0">
                        0{idx + 1} / 0{total}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé / Statement de Fechamento */}
        {closing && (
          <div className="section-index w-full max-w-[1560px] mx-auto text-right z-20 flex-shrink-0 mt-3">
            <p className="font-serif text-sm sm:text-base lg:text-lg text-[#F4F3EE]/75 max-w-2xl ml-auto">
              {closing}
            </p>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* LAYOUT MOBILE / REDUCED MOTION (Fluxo Vertical Nativo)      */}
      {/* ============================================================ */}
      <div className="flex md:hidden flex-col w-full py-16 px-6 sm:px-10">
        <div className="w-full mb-10">
          {eyebrow && (
            <span
              className={`font-mono text-xs font-bold uppercase tracking-[0.2em] block mb-2 ${
                isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
              }`}
            >
              {eyebrow}
            </span>
          )}
          {opening && (
            <h3 className="font-serif text-xl font-normal leading-snug">
              {opening}
            </h3>
          )}
        </div>

        <div className="flex flex-col gap-10">
          {items.map((item, idx) => {
            const caption = language === 'en' && item.caption_en ? item.caption_en : item.caption;
            const supportingText =
              language === 'en' && item.supportingText_en ? item.supportingText_en : item.supportingText;

            return (
              <div key={item._key || `mobile-stack-${idx}`} className="w-full flex flex-col">
                <div className="w-full aspect-[16/10] rounded-[18px] overflow-hidden border border-white/15 bg-[#151613] shadow-xl">
                  <img
                    src={item.media}
                    alt={caption || `Stack item ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                {(caption || supportingText) && (
                  <div className="mt-3 flex flex-col gap-1 font-mono text-xs text-[#FAFAF7]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#C4FF00]">{caption}</span>
                      <span className="text-white/40 text-[10px]">0{idx + 1} / 0{total}</span>
                    </div>
                    {supportingText && (
                      <span className="text-white/60 text-[11px] font-sans">{supportingText}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {closing && (
          <div className="w-full mt-10">
            <p className="font-serif text-sm text-[#F4F3EE]/75">
              {closing}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CaseVerticalMediaStack;
