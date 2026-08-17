import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

// Forma diagonal do painel — percentuais relativos à PRÓPRIA caixa do
// painel (130vw de largura). Isso é o que dá o corte em diagonal.
const CLIP_PANEL_FWD = 'polygon(0% 0%, calc(100% - 10vw) 0%, 100% 100%, 10vw 100%)';
const CLIP_PANEL_BWD = 'polygon(10vw 0%, 100% 0%, calc(100% - 10vw) 100%, 0% 100%)';

export function PageCurtainStage({
  curtainState = 'idle',
  direction = 'forward',
  title = '',
  onCoverComplete,
  onRevealComplete,
}) {
  const panelRef = useRef(null);
  const maskRef = useRef(null);
  const labelRef = useRef(null);
  const isBackward = direction === 'backward';
  const isActive = curtainState !== 'idle';

  // 1. MOVIMENTO INDEPENDENTE DO LABEL (t = 0) — inalterado, já estava certo
  useEffect(() => {
    if (curtainState === 'covering' && labelRef.current) {
      const fromX = isBackward ? '120px' : '-120px';
      const toX = isBackward ? '-120px' : '120px';
      animate(labelRef.current, {
        translateX: [fromX, toX],
        duration: 1550,
        ease: 'cubicBezier(0.65, 0, 0.35, 1)',
      });
    }
  }, [curtainState, isBackward]);

  // 2. TRANSIÇÃO DA CORTINA — painel usa transform (não tem filhos, tudo bem);
  //    máscara usa APENAS clip-path recalculado a cada frame (nunca transform),
  //    pra não arrastar o label que mora dentro dela.
  useEffect(() => {
    if (!panelRef.current || !maskRef.current) return;

    // Aplica o "frame" atual: move o painel (transform) e recalcula o
    // clip-path da máscara em coordenadas ABSOLUTAS de viewport (vw),
    // replicando a mesma geometria do trapézio do painel.
    const applyFrame = (xVw) => {
      panelRef.current.style.transform = `translateX(${xVw}vw)`;

      const left = -15 + xVw; // -15vw é o "left" base do painel (130vw de largura)
      const clip = isBackward
        ? `polygon(${left + 10}vw 0%, ${left + 130}vw 0%, ${left + 120}vw 100%, ${left}vw 100%)`
        : `polygon(${left}vw 0%, ${left + 120}vw 0%, ${left + 130}vw 100%, ${left + 10}vw 100%)`;

      maskRef.current.style.clipPath = clip;
    };

    const state = { x: 0 };

    if (curtainState === 'covering') {
      state.x = isBackward ? 135 : -135;
      applyFrame(state.x);
      animate(state, {
        x: 0,
        duration: 750,
        ease: 'cubicBezier(0.16, 1, 0.3, 1)',
        onUpdate: () => applyFrame(state.x),
        onComplete: () => onCoverComplete?.(),
      });
    } else if (curtainState === 'revealing') {
      state.x = 0;
      applyFrame(state.x);
      const end = isBackward ? -135 : 135;
      animate(state, {
        x: end,
        duration: 750,
        ease: 'cubicBezier(0.16, 1, 0.3, 1)',
        onUpdate: () => applyFrame(state.x),
        onComplete: () => onRevealComplete?.(),
      });
    } else if (curtainState === 'idle') {
      applyFrame(isBackward ? 135 : -135);
    }
  }, [curtainState, isBackward, onCoverComplete, onRevealComplete]);

  return (
    <div
      id="page-curtain-stage"
      data-curtain-state={curtainState}
      data-curtain-direction={direction}
      aria-hidden={!isActive}
      className={`page-curtain fixed inset-0 w-full h-[100dvh] overflow-hidden select-none z-[200] ${
        isActive ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
    >
      {/* Painel sólido lilás — se move via transform, sem filhos, sem problema */}
      <div
        ref={panelRef}
        aria-hidden="true"
        className="page-curtain__panel absolute inset-y-0 h-full overflow-hidden shadow-none pointer-events-none z-10"
        style={{
          width: '130vw',
          left: '-15vw',
          backgroundColor: 'var(--curtain-background-lilac, #B6A9ED)',
          clipPath: isBackward ? CLIP_PANEL_BWD : CLIP_PANEL_FWD,
          willChange: 'transform',
        }}
      />

      {/* Máscara — FIXA na tela inteira, NUNCA usa transform.
          Só o clip-path se move, recalculado a cada frame.
          O label mora aqui dentro, centralizado, e nunca herda
          nenhum deslocamento da cortina. */}
      <div
        ref={maskRef}
        className="page-curtain__mask fixed inset-0 w-full h-[100dvh] flex items-center justify-center pointer-events-none z-20 overflow-hidden"
      >
        <div ref={labelRef} className="page-curtain__label-track will-change-transform">
          <span className="page-curtain__title block font-sans font-black uppercase tracking-[0.06em] text-[clamp(2.25rem,6.5vw,5rem)] leading-none text-center select-none whitespace-nowrap text-[#10110F]">
            {title || 'PORTFOLIO'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PageCurtainStage;
