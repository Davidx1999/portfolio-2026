import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { useHeaderMetrics } from '../../../hooks/useHeaderMetrics';

// Standard 4-column spatial coordinates from the official 11-row pattern:
// [1, 0, 1, 0] -> row 1: col 1, col 3
// [0, 1, 0, 1] -> row 2: col 2, col 4
// [1, 0, 0, 0] -> row 3: col 1
// [0, 0, 1, 0] -> row 4: col 3
// [0, 0, 0, 1] -> row 5: col 4
// [1, 0, 0, 1] -> row 6: col 1, col 4
// [0, 1, 1, 0] -> row 7: col 2, col 3
// [1, 0, 0, 0] -> row 8: col 1
// [0, 1, 0, 1] -> row 9: col 2, col 4
// [1, 0, 0, 0] -> row 10: col 1
// [0, 0, 1, 0] -> row 11: col 3
const DEFAULT_SPATIAL_SLOTS = [
  { row: 1, col: 1, origin: 'bottomLeft' },
  { row: 1, col: 3, origin: 'bottomRight' },
  { row: 2, col: 2, origin: 'topLeft' },
  { row: 2, col: 4, origin: 'topRight' },
  { row: 3, col: 1, origin: 'center' },
  { row: 4, col: 3, origin: 'center' },
  { row: 5, col: 4, origin: 'center' },
  { row: 6, col: 1, origin: 'bottomLeft' },
  { row: 6, col: 4, origin: 'bottomRight' },
  { row: 7, col: 2, origin: 'topLeft' },
  { row: 7, col: 3, origin: 'topRight' },
  { row: 8, col: 1, origin: 'center' },
  { row: 9, col: 2, origin: 'center' },
  { row: 9, col: 4, origin: 'center' },
  { row: 10, col: 1, origin: 'center' },
  { row: 11, col: 3, origin: 'center' },
];

function FullBleedMosaicCell({ item, slot, index, isLight }) {
  const { language } = useLanguage();
  const { triggerLine = 66 } = useHeaderMetrics();
  const prefersReducedMotion = useReducedMotion();
  const cellRef = useRef(null);

  // 1. Entry scroll: scales from 0.08 to 1.0 as it enters from bottom
  const { scrollYProgress: entryProgress } = useScroll({
    target: cellRef,
    offset: ['start end', 'start 70%'],
  });

  // 2. Exit scroll: starts ONLY when top of image touches triggerLine (headerBottom + 12px)
  // and finishes scaling to 0.08 over a tight 110px scroll distance.
  const exitTriggerStart = triggerLine || 66;
  const exitTriggerEnd = exitTriggerStart - 110;

  const { scrollYProgress: exitProgress } = useScroll({
    target: cellRef,
    offset: [`start ${exitTriggerStart}px`, `start ${exitTriggerEnd}px`],
  });

  const entryScale = useTransform(entryProgress, [0, 1], [0.08, 1], { clamp: true });
  const entryOpacity = useTransform(entryProgress, [0, 0.4], [0.3, 1], { clamp: true });

  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.08], { clamp: true });
  const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0.3], { clamp: true });

  // Combined transforms: remains scale: 1 and opacity: 1 completely stable in the middle
  const scale = useTransform(() => entryScale.get() * exitScale.get());
  const opacity = useTransform(() => entryOpacity.get() * exitOpacity.get());

  const originMap = {
    topLeft: '0% 0%',
    topRight: '100% 0%',
    bottomLeft: '0% 100%',
    bottomRight: '100% 100%',
    center: '50% 50%',
  };

  const transformOrigin = originMap[item.transformOrigin || slot.origin || 'center'];

  const caption = language === 'en' && item.caption_en ? item.caption_en : item.caption;
  const isContain = item.fitMode === 'contain';
  const isReduced = prefersReducedMotion;

  const row = item.row || slot.row;
  const col = item.column || slot.col;

  return (
    <div
      ref={cellRef}
      style={{ gridRow: row, gridColumn: col }}
      className="relative w-full h-[50svh] overflow-hidden border border-[rgba(244,243,238,0.08)] bg-[#10110F] z-10"
    >
      {/* Mídia em Escala Total (25vw × 50svh) */}
      <motion.div
        style={
          isReduced
            ? {}
            : {
                scale,
                opacity,
                transformOrigin,
              }
        }
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <img
          src={item.media}
          alt={item.alt || caption || `Artifact ${index + 1}`}
          loading="lazy"
          className={`w-full h-full ${
            isContain ? 'object-contain p-6' : 'object-cover'
          } block filter saturate-[0.98] contrast-[1.02]`}
        />

        {caption && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between font-mono text-[11px] text-[#FAFAF7]">
            <span className="truncate">{caption}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00] shrink-0 ml-2" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function CaseArtifactMosaic({ block }) {
  const { language } = useLanguage();

  if (!block || !Array.isArray(block.items) || block.items.length === 0) {
    return null;
  }

  const eyebrow = language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow;
  const title = language === 'en' && block.title_en ? block.title_en : block.title;
  const isLight = block.theme === 'light';

  const items = block.items;

  // Compute maximum row needed so there are no trailing empty rows below
  const maxRow = Math.max(
    ...items.map(
      (item, idx) => item.row || DEFAULT_SPATIAL_SLOTS[idx % DEFAULT_SPATIAL_SLOTS.length]?.row || 1
    )
  );

  return (
    <section
      className={`w-full py-20 lg:py-28 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      {/* Header Editorial (Centralizado com padding para leitura) */}
      {(eyebrow || title) && (
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 lg:mb-16">
          {eyebrow && (
            <span
              className={`font-mono text-xs font-bold uppercase tracking-[0.2em] block mb-3 ${
                isLight ? 'text-[#4056F4]' : 'text-[#C4FF00]'
              }`}
            >
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] font-normal leading-[1.06] tracking-tight">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. DESKTOP FULL-BLEED 4-COLUMN SPATIAL GRID (100vw × 50svh)  */}
      {/* 2 linhas ocupam exatamente 100svh. Cada célula = 25vw × 50svh */}
      {/* ============================================================ */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          gridTemplateColumns: 'repeat(4, 25vw)',
          gridTemplateRows: `repeat(${maxRow}, 50svh)`,
        }}
        className="hidden md:grid w-screen max-w-none bg-[#10110F] overflow-hidden relative z-10"
      >
        {items.map((item, idx) => {
          const slot =
            DEFAULT_SPATIAL_SLOTS[idx % DEFAULT_SPATIAL_SLOTS.length] || {
              row: idx + 1,
              col: (idx % 4) + 1,
              origin: 'center',
            };
          return (
            <FullBleedMosaicCell
              key={item._key || `mosaic-${idx}`}
              item={item}
              slot={slot}
              index={idx}
              isLight={isLight}
            />
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 2. TABLET / MOBILE FULL-BLEED 2-COLUMN RESPONSIVE GRID        */}
      {/* ============================================================ */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
        }}
        className="grid grid-cols-2 md:hidden w-screen max-w-none bg-[#10110F] overflow-hidden relative z-10"
      >
        {items.map((item, idx) => (
          <div
            key={item._key || `mosaic-m-${idx}`}
            className="relative w-[50vw] h-[36svh] sm:h-[45svh] overflow-hidden border border-[rgba(244,243,238,0.08)] bg-[#10110F]"
          >
            <img
              src={item.media}
              alt={item.alt || item.caption || `Artifact ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover block"
            />
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent font-mono text-[10px] text-[#FAFAF7] truncate">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CaseArtifactMosaic;
