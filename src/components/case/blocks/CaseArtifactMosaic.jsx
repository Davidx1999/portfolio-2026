import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { useHeaderMetrics } from '../../../hooks/useHeaderMetrics';
import { resolveLocalized } from '../../../utils/i18nField';

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
  { row: 1, col: 1, origin: 'topLeft' },
  { row: 1, col: 3, origin: 'topRight' },
  { row: 2, col: 2, origin: 'topLeft' },
  { row: 2, col: 4, origin: 'topRight' },
  { row: 3, col: 1, origin: 'topLeft' },
  { row: 4, col: 2, origin: 'topLeft' },
  { row: 4, col: 3, origin: 'topRight' },
  { row: 5, col: 4, origin: 'topRight' },
  { row: 6, col: 1, origin: 'bottomLeft' },
  { row: 6, col: 4, origin: 'bottomRight' },
  { row: 7, col: 2, origin: 'topLeft' },
  { row: 7, col: 3, origin: 'topRight' },
  { row: 8, col: 1, origin: 'topLeft' },
  { row: 9, col: 2, origin: 'topLeft' },
  { row: 9, col: 4, origin: 'topRight' },
  { row: 10, col: 1, origin: 'topLeft' },
  { row: 11, col: 3, origin: 'topRight' },
];

function FullBleedMosaicCell({ item, slot, index, _isLight, showBorder = true, is1440x960 = false }) {
  const { language } = useLanguage();
  const { headerBottom = 54 } = useHeaderMetrics();
  const prefersReducedMotion = useReducedMotion();
  const cellRef = useRef(null);

  const currentHeaderBottom = headerBottom || 54;

  // 1. Entry / Bottom scroll:
  // - When scrolling down: starts at scale 0.08 at 'start end' and reaches 1.0 at 'end end'.
  // - When scrolling up: as soon as the cell bottom touches the bottom of viewport ('end end'),
  //   it immediately starts shrinking synchronously down to 0.08 at 'start end'.
  const { scrollYProgress: entryProgress } = useScroll({
    target: cellRef,
    offset: ['start end', 'end end'],
  });

  // 2. Exit / Header scroll: starts precisely when the top of the cell touches the bottom of the header
  // and spans the full cell height until the bottom of the cell reaches the header
  const { scrollYProgress: exitProgress } = useScroll({
    target: cellRef,
    offset: [`start ${currentHeaderBottom}px`, `end ${currentHeaderBottom}px`],
  });

  // Synchronous 1:1 scroll transforms (no spring lag or delayed physics)
  const entryScale = useTransform(entryProgress, [0, 1], [0.08, 1], { clamp: true });
  const entryOpacity = useTransform(entryProgress, [0, 0.35], [0.2, 1], { clamp: true });

  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.08], { clamp: true });
  const exitOpacity = useTransform(exitProgress, [0.75, 1], [1, 0.2], { clamp: true });

  // Combined transforms: remains scale 1.0 and opacity 1.0 completely solid in the middle
  const scale = useTransform(() => entryScale.get() * exitScale.get());
  const opacity = useTransform(() => entryOpacity.get() * exitOpacity.get());

  // Vertical pinning ("trava ali"):
  // As the cell scrolls up past the header, translating by exitProgress * 100% keeps the top
  // of the image locked at currentHeaderBottom while the image shrinks into its diagonal corner!
  const y = useTransform(exitProgress, [0, 1], ['0%', '100%'], { clamp: true });

  const row = item.row || slot.row;
  const col = item.column || slot.col;

  // 4 Diagonal Corners ONLY: Top-Left, Top-Right, Bottom-Left, Bottom-Right
  const originMap = {
    topLeft: '0% 0%',
    topRight: '100% 0%',
    bottomLeft: '0% 100%',
    bottomRight: '100% 100%',
  };

  const rawOrigin = item.transformOrigin || slot.origin;
  const transformOrigin = originMap[rawOrigin] || ((col === 1 || col === 2) ? '0% 0%' : '100% 0%');

  const caption = resolveLocalized(language === 'en' && item.caption_en ? item.caption_en : item.caption, language);
  const isContain = item.fitMode === 'contain';
  const isReduced = prefersReducedMotion;

  return (
    <div
      ref={cellRef}
      style={{ gridRow: row, gridColumn: col }}
      className={`relative w-full ${
        is1440x960
          ? 'aspect-[3/2] h-auto'
          : 'h-[50svh]'
      } overflow-hidden ${
        showBorder ? 'border border-[rgba(244,243,238,0.08)] bg-[#10110F]' : 'border-0 bg-transparent'
      } z-10`}
    >
      {/* Mídia em Escala Total (25vw × 50svh ou 360px × 480px) */}
      <motion.div
        style={
          isReduced
            ? {}
            : {
                y,
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

  const eyebrow = resolveLocalized(language === 'en' && block.eyebrow_en ? block.eyebrow_en : block.eyebrow, language);
  const title = resolveLocalized(language === 'en' && block.title_en ? block.title_en : block.title, language);
  const isLight = block.theme === 'light';
  const showBorder = block.showBorder ?? block.hasBorder ?? true;
  const is1440x960 = block.aspectRatioPreset === '1440x960' || block.aspectRatio === '1440x960' || block.layoutMode === '1440x960';

  const items = block.items;

  // Compute maximum row needed so there are no trailing empty rows below
  const maxRow = Math.max(
    ...items.map(
      (item, idx) => item.row || DEFAULT_SPATIAL_SLOTS[idx % DEFAULT_SPATIAL_SLOTS.length]?.row || 1
    )
  );

  return (
    <section
      className={`w-full border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      {/* Header Editorial (Opcional, com padding próprio apenas quando existir texto) */}
      {(eyebrow || title) && (
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
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
      {/* 1. DESKTOP 4-COLUMN SPATIAL GRID (100vw)                     */}
      {/* Padrão: 50svh por célula | 3:2: aspect-[3/2] por imagem      */}
      {/* ============================================================ */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          gridTemplateColumns: 'repeat(4, 25vw)',
          gridTemplateRows: is1440x960 ? `repeat(${maxRow}, auto)` : `repeat(${maxRow}, 50svh)`,
        }}
        className="hidden md:grid w-screen max-w-none bg-[#10110F] overflow-hidden relative z-10"
      >
        {items.map((item, idx) => {
          const slot =
            DEFAULT_SPATIAL_SLOTS[idx % DEFAULT_SPATIAL_SLOTS.length] || {
              row: idx + 1,
              col: (idx % 4) + 1,
              origin: 'topLeft',
            };
          return (
            <FullBleedMosaicCell
              key={item._key || `mosaic-${idx}`}
              item={item}
              slot={slot}
              index={idx}
              isLight={isLight}
              showBorder={showBorder}
              is1440x960={is1440x960}
            />
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 2. TABLET / MOBILE 2-COLUMN RESPONSIVE GRID (100vw)          */}
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
            className={`relative w-full ${
              is1440x960 ? 'aspect-[3/2]' : 'h-[36svh] sm:h-[45svh]'
            } overflow-hidden ${
              showBorder ? 'border border-[rgba(244,243,238,0.08)] bg-[#10110F]' : 'border-0 bg-transparent'
            }`}
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
