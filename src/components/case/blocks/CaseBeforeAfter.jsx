import React, { useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Columns, Sliders } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseBeforeAfter({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  if (!block || !block.beforeImage || !block.afterImage) return null;

  const rawBefore =
    language === 'en' && block.beforeLabel_en ? block.beforeLabel_en : block.beforeLabel || (language === 'en' ? 'Before' : 'Antes');
  const beforeLabel = resolveLocalized(rawBefore, language) || (language === 'en' ? 'Before' : 'Antes');

  const rawAfter =
    language === 'en' && block.afterLabel_en ? block.afterLabel_en : block.afterLabel || (language === 'en' ? 'After' : 'Depois');
  const afterLabel = resolveLocalized(rawAfter, language) || (language === 'en' ? 'After' : 'Depois');

  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const isLight = block.theme === 'light';
  const showBorder = block.showBorder ?? block.hasBorder ?? true;

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Safe fallback if pointer capture isn't supported
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe fallback
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <section
      className={`w-full py-16 md:py-24 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
        >
          {/* Header do Bloco com Toggle Acessível */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00]">
                COMPARAÇÃO INTERATIVA //
              </span>
              <span className="font-mono text-xs text-white/50">
                {beforeLabel} ↔ {afterLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsSideBySide((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-[8px] font-mono text-[10px] uppercase tracking-wider text-[#FAFAF7] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
            >
              {isSideBySide ? <Sliders size={13} /> : <Columns size={13} />}
              <span>{isSideBySide ? 'Modo Slider' : 'Lado a Lado'}</span>
            </button>
          </div>

          {/* Modo Lado a Lado Acessível */}
          {isSideBySide ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div
                  className={`aspect-[16/10] rounded-[16px] overflow-hidden ${
                    showBorder
                      ? `border ${isLight ? 'border-[#10110F]/15' : 'border-[rgba(244,243,238,0.18)]'} bg-[#151613]`
                      : 'border-0 bg-transparent'
                  }`}
                >
                  <img
                    src={block.beforeImage}
                    alt={beforeLabel}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
                  />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/60 mt-3">
                  [ {beforeLabel} ]
                </span>
              </div>

              <div className="flex flex-col">
                <div
                  className={`aspect-[16/10] rounded-[16px] overflow-hidden ${
                    showBorder
                      ? `border ${isLight ? 'border-[#4056F4]/50' : 'border-[#C4FF00]/40'} bg-[#151613]`
                      : 'border-0 bg-transparent'
                  }`}
                >
                  <img
                    src={block.afterImage}
                    alt={afterLabel}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
                  />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C4FF00] mt-3">
                  [ {afterLabel} ]
                </span>
              </div>
            </div>
          ) : (
            /* Modo Slider Interativo */
            <div
              ref={containerRef}
              role="slider"
              aria-label={`${beforeLabel} / ${afterLabel}`}
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onDragStart={(e) => e.preventDefault()}
              className={`relative w-full aspect-[16/10] rounded-[18px] overflow-hidden touch-none select-none ${
                showBorder
                  ? `border ${isLight ? 'border-[#10110F]/15' : 'border-[rgba(244,243,238,0.18)]'} bg-[#151613] shadow-2xl`
                  : 'border-0 bg-transparent'
              } cursor-ew-resize group focus-visible:outline-2 focus-visible:outline-[#C4FF00]`}
              style={{ WebkitUserDrag: 'none', userSelect: 'none', touchAction: 'none' }}
            >
              {/* Imagem Depois (Base) */}
              <img
                src={block.afterImage}
                alt={afterLabel}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
              />

              {/* Imagem Antes (Recortada) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={block.beforeImage}
                  alt={beforeLabel}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
                />
              </div>

              {/* Linha Divisora */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#C4FF00] pointer-events-none shadow-[0_0_12px_rgba(196,255,0,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Knob Central */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#10110F] border-2 border-[#C4FF00] flex items-center justify-center text-[10px] font-mono text-[#C4FF00] font-bold shadow-lg pointer-events-none select-none">
                  ↔
                </div>
              </div>

              {/* Badges Flutuantes nos Cantos */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#10110F]/80 backdrop-blur-md border border-white/15 rounded-[6px] font-mono text-[10px] uppercase font-bold text-white/80 pointer-events-none select-none">
                {beforeLabel}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#10110F]/80 backdrop-blur-md border border-[#C4FF00]/40 rounded-[6px] font-mono text-[10px] uppercase font-bold text-[#C4FF00] pointer-events-none select-none">
                {afterLabel}
              </div>
            </div>
          )}

          {caption && (
            <div className="mt-3.5 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#F4F3EE]/50 uppercase tracking-wider">
              <span>{caption}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseBeforeAfter;
