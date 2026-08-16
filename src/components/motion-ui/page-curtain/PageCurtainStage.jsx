import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// High-precision smooth ease curves (long, natural deceleration on exit without abrupt stops)
const EASE_PANEL = [0.16, 1, 0.3, 1]; // power3.out smooth long deceleration for cover and reveal
const EASE_TITLE = [0.65, 0, 0.35, 1]; // power3.inOut smooth continuous drift

// ============================================================================
// CONSTANT PARALLELOGRAM CLIP-PATHS (Panel Width: 125vw, Left: -12.5vw)
// ============================================================================
// Forward: Base shifted +8vw to the right
const CLIP_PANEL_FWD = 'polygon(0% 0%, calc(100% - 8vw) 0%, 100% 100%, 8vw 100%)';
// Backward: Base shifted -8vw to the left
const CLIP_PANEL_BWD = 'polygon(8vw 0%, 100% 0%, calc(100% - 8vw) 100%, 0% 100%)';

// ============================================================================
// ANIMATED MASK CLIP-PATHS (Mask Width: 100vw, Left: 0)
// To match panel's geometric translation without inheriting any transforms.
// ============================================================================
const MASK_CLIP_FWD = {
  idle: 'polygon(112.5vw 0%, 229.5vw 0%, 237.5vw 100%, 120.5vw 100%)', // Panel at 125vw
  covered: 'polygon(-12.5vw 0%, 104.5vw 0%, 112.5vw 100%, -4.5vw 100%)', // Panel at 0vw
  exit: 'polygon(-137.5vw 0%, -20.5vw 0%, -12.5vw 100%, -129.5vw 100%)' // Panel at -125vw
};

const MASK_CLIP_BWD = {
  idle: 'polygon(-129.5vw 0%, -12.5vw 0%, -20.5vw 100%, -137.5vw 100%)', // Panel at -125vw
  covered: 'polygon(-4.5vw 0%, 112.5vw 0%, 104.5vw 100%, -12.5vw 100%)', // Panel at 0vw
  exit: 'polygon(120.5vw 0%, 237.5vw 0%, 229.5vw 100%, 112.5vw 100%)' // Panel at 125vw
};

/**
 * PageCurtainStage
 * Pure Geometric Parallelogram Route Transition:
 * - ZERO opacity used anywhere. Title visibility is exclusively physical (clip-path mask).
 * - Title and Panel are fully decoupled. Title mask animates geometry independently.
 * - Title wrapper is position: fixed at exact screen center.
 * - Title drifts continuously over 1.70s (-100px to 100px).
 */
export function PageCurtainStage({
  curtainState = 'idle',
  direction = 'forward',
  isCurtainActive = false,
  title = '',
  onCoverComplete,
  onRevealComplete,
}) {
  const prefersReducedMotion = useReducedMotion();
  const isBackward = direction === 'backward';

  // 1. MASK ANIMATION (Exclusively controls title visibility via clip-path)
  const maskVariants = {
    idle: {
      clipPath: isBackward ? MASK_CLIP_BWD.idle : MASK_CLIP_FWD.idle,
      transition: { duration: 0 },
    },
    covering: {
      clipPath: isBackward ? MASK_CLIP_BWD.covered : MASK_CLIP_FWD.covered,
      transition: { duration: prefersReducedMotion ? 0.20 : 0.85, ease: EASE_PANEL },
    },
    covered: {
      clipPath: isBackward ? MASK_CLIP_BWD.covered : MASK_CLIP_FWD.covered,
      transition: { duration: 0 },
    },
    revealing: {
      clipPath: isBackward ? MASK_CLIP_BWD.exit : MASK_CLIP_FWD.exit,
      transition: { duration: prefersReducedMotion ? 0.20 : 0.70, ease: EASE_PANEL },
    },
  };

  // 2. PANEL ANIMATION (Pure X Translation)
  const initialPanelX = isBackward ? '-125vw' : '125vw';
  const exitPanelX = isBackward ? '125vw' : '-125vw';

  const panelVariants = {
    idle: {
      x: initialPanelX,
      transition: { duration: 0 },
    },
    covering: {
      x: '0vw',
      transition: { duration: prefersReducedMotion ? 0.20 : 0.85, ease: EASE_PANEL },
    },
    covered: {
      x: '0vw',
      transition: { duration: 0 },
    },
    revealing: {
      x: exitPanelX,
      transition: { duration: prefersReducedMotion ? 0.20 : 0.70, ease: EASE_PANEL },
    },
  };

  // 3. CONTINUOUS TITLE DRIFT (-100px -> +100px or +100px -> -100px)
  // Bound strictly to isCurtainActive for an uninterrupted 1.70s motion.
  const titleVariants = {
    idle: {
      x: isBackward ? 100 : -100,
      transition: { duration: 0 },
    },
    active: {
      x: isBackward ? -100 : 100,
      transition: {
        duration: prefersReducedMotion ? 0.40 : 1.70,
        ease: EASE_TITLE,
      },
    },
  };

  return (
    <div
      id="page-curtain-stage"
      data-curtain-state={curtainState}
      data-curtain-direction={direction}
      aria-hidden={!isCurtainActive}
      className={`page-curtain fixed inset-0 w-full h-[100dvh] overflow-hidden select-none ${
        isCurtainActive ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      style={{
        zIndex: 200,
      }}
    >
      {/* TITLE LAYER - Completely independent mask container */}
      <motion.div
        className="page-curtain__title-mask"
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 20,
          clipPath: prefersReducedMotion ? 'none' : (isBackward ? MASK_CLIP_BWD.idle : MASK_CLIP_FWD.idle),
        }}
        variants={prefersReducedMotion ? {} : maskVariants}
        initial="idle"
        animate={curtainState}
      >
        <div
          className="page-curtain__title-anchor"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max-content',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            className="page-curtain__title-motion"
            style={{ willChange: 'transform' }}
            variants={titleVariants}
            initial="idle"
            animate={isCurtainActive ? 'active' : 'idle'}
          >
            <span
              className="page-curtain__title block font-mono font-bold uppercase tracking-[0.16em] text-[clamp(1.75rem,5vw,3.75rem)] leading-none text-center select-none whitespace-nowrap"
              style={{ color: 'var(--curtain-title-black, #10110F)' }}
            >
              {title || 'PORTFOLIO'}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* LILAC PANEL LAYER */}
      <motion.div
        aria-hidden="true"
        className="page-curtain__panel absolute inset-y-0 h-full overflow-hidden shadow-none"
        style={{
          zIndex: 10,
          width: '125vw',
          left: '-12.5vw',
          backgroundColor: 'var(--curtain-background-lilac, #B6A9ED)',
          clipPath: prefersReducedMotion ? 'none' : (isBackward ? CLIP_PANEL_BWD : CLIP_PANEL_FWD),
          willChange: isCurtainActive ? 'transform' : 'auto',
        }}
        variants={panelVariants}
        initial="idle"
        animate={curtainState}
        onAnimationComplete={() => {
          if (curtainState === 'covering') {
            onCoverComplete?.();
          } else if (curtainState === 'revealing') {
            onRevealComplete?.();
          }
        }}
      />
    </div>
  );
}

export default PageCurtainStage;
