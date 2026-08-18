import React, { useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Columns, Sliders } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseBeforeAfter({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSideBySide, setIsSideBySide] = useState(false);
  const containerRef = useRef(null);

  if (!block || !block.beforeImage || !block.afterImage) return null;

  const beforeLabel =
    language === 'en' && block.beforeLabel_en ? block.beforeLabel_en : block.beforeLabel || 'Antes';
  const afterLabel =
    language === 'en' && block.afterLabel_en ? block.afterLabel_en : block.afterLabel || 'Depois';
  const caption = language === 'en' && block.caption_en ? block.caption_en : block.caption;
  const isLight = block.theme === 'light';

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
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
                <div className="aspect-[16/10] rounded-[16px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613]">
                  <img
                    src={block.beforeImage}
                    alt={beforeLabel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/60 mt-3">
                  [ {beforeLabel} ]
                </span>
              </div>

              <div className="flex flex-col">
                <div className="aspect-[16/10] rounded-[16px] overflow-hidden border border-[#C4FF00]/40 bg-[#151613]">
                  <img
                    src={block.afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-cover"
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
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-2xl select-none cursor-ew-resize group"
            >
              {/* Imagem Depois (Base) */}
              <img
                src={block.afterImage}
                alt={afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Imagem Antes (Recortada) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={block.beforeImage}
                  alt={beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Linha Divisora */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#C4FF00] pointer-events-none shadow-[0_0_12px_rgba(196,255,0,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Knob Central */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#10110F] border-2 border-[#C4FF00] flex items-center justify-center text-[10px] font-mono text-[#C4FF00] font-bold shadow-lg">
                  ↔
                </div>
              </div>

              {/* Badges Flutuantes nos Cantos */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#10110F]/80 backdrop-blur-md border border-white/15 rounded-[6px] font-mono text-[10px] uppercase font-bold text-white/80 pointer-events-none">
                {beforeLabel}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#10110F]/80 backdrop-blur-md border border-[#C4FF00]/40 rounded-[6px] font-mono text-[10px] uppercase font-bold text-[#C4FF00] pointer-events-none">
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
