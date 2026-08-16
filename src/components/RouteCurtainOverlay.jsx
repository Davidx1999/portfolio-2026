import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouteCurtain } from '../context/RouteCurtainContext';

// High-precision smooth ease curves (long, natural deceleration on exit without abrupt stops)
const EASE_COVER = [0.65, 0, 0.35, 1]; // Smooth ease in and out for covering
const EASE_REVEAL = [0.16, 1, 0.3, 1]; // power3.out smooth long deceleration for reveal
const EASE_TITLE_DRIFT = [0.65, 0, 0.35, 1]; // Smooth continuous drift near center

// Constant Parallelogram Clip-Paths:
// Forward: Base shifted +8vw to the right (topo: x = 0, base: x = +d)
const CLIP_PARALLELOGRAM_FWD = 'polygon(0% 0%, calc(100% - 8vw) 0%, 100% 100%, 8vw 100%)';

// Backward: Base shifted -8vw to the left (topo: x = 0, base: x = -d)
const CLIP_PARALLELOGRAM_BWD = 'polygon(8vw 0%, 100% 0%, calc(100% - 8vw) 100%, 0% 100%)';

/**
 * RouteCurtainOverlay
 * Pure Geometric Parallelogram Route Transition:
 * - ZERO opacity used (no fade-in, no fade-out, no autoAlpha)
 * - The front diagonal edge of the lilac curtain physically reveals the black title
 * - The exit diagonal edge of the lilac curtain physically masks/covers the black title
 * - Black title (#10110F) stays centered with short horizontal drift (-50px -> +50px, y = 0)
 * - Long smooth power3.out deceleration on reveal exit
 */
export function RouteCurtainOverlay() {
  const {
    curtainState,
    isCurtainActive,
    curtainData,
    handleCoverAnimationComplete,
    handleRevealAnimationComplete,
    srAnnouncement,
  } = useRouteCurtain();

  const prefersReducedMotion = useReducedMotion();
  const isBackward = curtainData.direction === 'backward';

  // Constant slant for the entire transition
  const clipPath = prefersReducedMotion
    ? 'none'
    : isBackward
    ? CLIP_PARALLELOGRAM_BWD
    : CLIP_PARALLELOGRAM_FWD;

  const initialPanelX = isBackward ? '-125vw' : '125vw';
  const exitPanelX = isBackward ? '125vw' : '-125vw';

  // Counter-translation values for title container to maintain center position while inside moving mask
  const initialCounterX = isBackward ? '125vw' : '-125vw';
  const exitCounterX = isBackward ? '-125vw' : '125vw';

  // Short horizontal drift near center
  const fromDriftX = isBackward ? 50 : -50;
  const toDriftX = isBackward ? -50 : 50;

  // ============================================================================
  // 1. CONSTANT PARALLELOGRAM LILAC PANEL (0.00s -> 0.90s cover | 1.00s -> 1.90s reveal)
  // ============================================================================
  const mainVariants = {
    idle: {
      x: initialPanelX,
      transition: { duration: 0 },
    },
    covering: {
      x: [initialPanelX, '0vw'],
      transition: {
        duration: prefersReducedMotion ? 0.20 : 0.90,
        ease: EASE_COVER,
      },
    },
    covered: {
      x: '0vw',
      transition: { duration: 0 },
    },
    revealing: {
      x: exitPanelX,
      transition: {
        duration: prefersReducedMotion ? 0.20 : 0.90,
        ease: EASE_REVEAL,
      },
    },
  };

  const getMainAnimate = () => {
    if (curtainState === 'revealing') {
      return {
        x: exitPanelX,
      };
    }
    return curtainState;
  };

  // ============================================================================
  // 2. TITLE COUNTER-TRANSLATION (Locks title in screen center inside moving mask)
  // ============================================================================
  const counterVariants = {
    idle: {
      x: initialCounterX,
      transition: { duration: 0 },
    },
    covering: {
      x: [initialCounterX, '0vw'],
      transition: {
        duration: prefersReducedMotion ? 0.20 : 0.90,
        ease: EASE_COVER,
      },
    },
    covered: {
      x: '0vw',
      transition: { duration: 0 },
    },
    revealing: {
      x: exitCounterX,
      transition: {
        duration: prefersReducedMotion ? 0.20 : 0.90,
        ease: EASE_REVEAL,
      },
    },
  };

  // ============================================================================
  // 3. TITLE MICRO-DRIFT (-50px -> +50px near center, y = 0, ZERO opacity)
  // ============================================================================
  const titleDriftVariants = {
    idle: {
      x: fromDriftX,
      transition: { duration: 0 },
    },
    covering: {
      x: prefersReducedMotion ? 0 : [fromDriftX, 0],
      transition: {
        duration: prefersReducedMotion ? 0.20 : 0.90,
        ease: EASE_TITLE_DRIFT,
      },
    },
    covered: {
      x: 0,
      transition: { duration: 0 },
    },
    revealing: {
      x: prefersReducedMotion ? 0 : [0, toDriftX],
      transition: {
        duration: prefersReducedMotion ? 0.20 : 0.90,
        ease: EASE_TITLE_DRIFT,
      },
    },
  };

  return (
    <>
      {/* Screen Reader Live Announcement */}
      <div role="status" aria-live="polite" className="sr-only">
        {srAnnouncement}
      </div>

      {/* Global Route Curtain Stage */}
      <div
        id="global-route-curtain"
        data-curtain-state={curtainState}
        data-curtain-direction={curtainData.direction || 'forward'}
        aria-hidden={!isCurtainActive}
        className={`page-curtain fixed inset-0 w-full h-[100dvh] overflow-hidden select-none ${
          isCurtainActive ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        style={{
          zIndex: 200,
        }}
      >
        {/* LILAC PARALLELOGRAM PANEL WITH INTEGRATED GEOMETRIC MASK FOR TITLE */}
        <motion.div
          aria-hidden="true"
          className="page-curtain__panel absolute inset-y-0 h-full overflow-hidden shadow-none"
          style={{
            zIndex: 10,
            width: '125vw',
            left: '-12.5vw',
            backgroundColor: 'var(--curtain-background-lilac, #B6A9ED)',
            clipPath,
            willChange: isCurtainActive ? 'transform' : 'auto',
          }}
          variants={mainVariants}
          initial="idle"
          animate={getMainAnimate()}
          onAnimationComplete={() => {
            if (curtainState === 'covering') {
              handleCoverAnimationComplete();
            } else if (curtainState === 'revealing') {
              handleRevealAnimationComplete();
            }
          }}
        >
          {/* TITLE LAYER INSIDE MOVING PARALLELOGRAM:
              - The leading diagonal edge reveals the title on entry
              - The trailing diagonal edge masks the title on exit
              - Counter-translation keeps the title centered on the viewport
              - ZERO opacity used anywhere
          */}
          <motion.div
            className="absolute inset-y-0 left-[12.5vw] w-screen flex items-center justify-center pointer-events-none"
            style={{
              zIndex: 20,
              willChange: isCurtainActive ? 'transform' : 'auto',
            }}
            variants={counterVariants}
            initial="idle"
            animate={getMainAnimate()}
          >
            <div className="page-curtain__title-anchor absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max max-w-[calc(100vw-32px)]">
              <motion.div
                className="page-curtain__title-motion"
                style={{
                  willChange: 'transform',
                }}
                variants={titleDriftVariants}
                initial="idle"
                animate={curtainState}
              >
                <span
                  className="page-curtain__title block font-mono font-bold uppercase tracking-[0.16em] text-[clamp(1.75rem,5vw,3.75rem)] leading-none text-center select-none whitespace-nowrap"
                  style={{
                    color: 'var(--curtain-title-black, #10110F)',
                  }}
                >
                  {curtainData.title || 'PORTFOLIO'}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default RouteCurtainOverlay;
