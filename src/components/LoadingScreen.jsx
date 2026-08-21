import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

// Diagonal trapezoid geometry matching global RouteCurtainOverlay
const CLIP_PANEL_FWD = 'polygon(0% 0%, calc(100% - 10vw) 0%, 100% 100%, 10vw 100%)';
const MIN_DURATION = 600; // Minimum intentional opening duration (ms)
const MAX_THRESHOLD = 1200; // Target maximum duration before eager reveal (ms)
const SAFETY_TIMEOUT = 4000; // Hard fallback timeout (ms)

// Threshold (0-1) at which isAppReady fires during the curtain exit.
// 0.7 = when 70% of the slide-out distance is covered → hero/header
// animations start while the curtain is still finishing its last 30%.
const APP_READY_PROGRESS = 0.7;

/**
 * Preloads critical hero media & assets
 */
function preloadCriticalAssets() {
  const promises = [];

  // 1. Preload Document Fonts
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    promises.push(document.fonts.ready);
  }

  // 2. Preload Hero Poster Image
  const posterUrl = `${import.meta.env.BASE_URL}assets/videos/hero_poster.jpg`;
  promises.push(
    new Promise((resolve) => {
      const img = new Image();
      img.src = posterUrl;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block on network error
      }
    })
  );

  // Fallback race so preloading never stalls longer than 600ms
  return Promise.race([
    Promise.all(promises),
    new Promise((resolve) => setTimeout(resolve, 600)),
  ]);
}

export function LoadingScreen({ onComplete, setIsAppReady }) {
  const panelRef = useRef(null);
  const maskRef = useRef(null);
  const contentRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

  const onCompleteRef = useRef(onComplete);
  const setIsAppReadyRef = useRef(setIsAppReady);
  const hasExitedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setIsAppReadyRef.current = setIsAppReady;
  }, [setIsAppReady]);

  useEffect(() => {
    // 1. Accessibility: Skip immediately if prefers-reduced-motion is active
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setIsAppReadyRef.current?.(true);
        onCompleteRef.current?.();
        return;
      }
    }

    const startTime = performance.now();
    let appReadyFired = false;

    const applyFrame = (xVw) => {
      if (panelRef.current) {
        panelRef.current.style.transform = `translateX(${xVw}vw)`;
      }
      if (maskRef.current) {
        const left = -15 + xVw;
        const clip = `polygon(${left}vw 0%, ${left + 120}vw 0%, ${left + 130}vw 100%, ${left + 10}vw 100%)`;
        maskRef.current.style.clipPath = clip;
      }
    };

    // Initial position: 100% covering
    applyFrame(0);

    const triggerCurtainExit = () => {
      if (hasExitedRef.current) return;
      hasExitedRef.current = true;
      setIsExiting(true);

      const TARGET_X = 135;
      const state = { x: 0 };

      animate(state, {
        x: TARGET_X,
        duration: 750,
        ease: 'cubicBezier(0.16, 1, 0.3, 1)',
        onUpdate: () => {
          applyFrame(state.x);

          // Fire isAppReady when the curtain has moved ~70% of its exit distance.
          if (!appReadyFired && state.x / TARGET_X >= APP_READY_PROGRESS) {
            appReadyFired = true;
            setIsAppReadyRef.current?.(true);
          }
        },
        onComplete: () => {
          if (!appReadyFired) {
            appReadyFired = true;
            setIsAppReadyRef.current?.(true);
          }
          onCompleteRef.current?.();
        },
      });

      // Subtle fade out for the centered text
      if (contentRef.current) {
        animate(contentRef.current, {
          opacity: [1, 0],
          scale: [1, 0.97],
          duration: 350,
          ease: 'cubicBezier(0.16, 1, 0.3, 1)',
        });
      }
    };

    // 2. Load critical resources and respect min/max timing
    const criticalPromise = preloadCriticalAssets();
    const minTimerPromise = new Promise((resolve) => setTimeout(resolve, MIN_DURATION));
    const safetyTimer = setTimeout(triggerCurtainExit, 1500);

    Promise.all([criticalPromise, minTimerPromise]).then(() => {
      clearTimeout(safetyTimer);
      const elapsed = performance.now() - startTime;
      if (elapsed >= MAX_THRESHOLD) {
        triggerCurtainExit();
      } else {
        triggerCurtainExit();
      }
    }).catch(() => {
      triggerCurtainExit();
    });

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      id="initial-preloader"
      aria-live="polite"
      aria-label="Carregando portfólio"
      className={`fixed inset-0 w-full h-[100dvh] overflow-hidden select-none z-[300] ${isExiting ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
    >
      {/* 1. Solid Lilac Curtain Panel (Matching Global Route Curtain Geometry) */}
      <div
        ref={panelRef}
        aria-hidden="true"
        className="absolute inset-y-0 h-full overflow-hidden shadow-none pointer-events-none z-10 will-change-transform"
        style={{
          width: '130vw',
          left: '-15vw',
          backgroundColor: 'var(--curtain-background-lilac, #B6A9ED)',
          clipPath: CLIP_PANEL_FWD,
        }}
      />

      {/* 2. Mask Container with Real-time Synchronized Clip-Path */}
      <div
        ref={maskRef}
        className="fixed inset-0 w-full h-[100dvh] flex flex-col justify-between p-8 sm:p-12 md:p-16 pointer-events-none z-20 overflow-hidden"
      >
        {/* Top Header: Brand Mark "DS." */}
        <div className="w-full flex items-center justify-between">
          <span className="font-sans font-[650] tracking-tight text-sm sm:text-base text-[#10110F]">
            DS.
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#10110F]/60 uppercase">
            2026
          </span>
        </div>

        {/* Center: Editorial Name, Subtitle & Discrete Real Indicator */}
        <div
          ref={contentRef}
          className="flex flex-col items-center justify-center text-center my-auto will-change-transform"
        >
          {/* Brand Logo Alt */}
          <div className="mb-4 sm:mb-6">
            <svg
              width="782"
              height="762"
              viewBox="0 0 782 762"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              aria-hidden="true"
            >
              <path d="M653.662 423H766C774.837 423 782 415.837 782 407V355C782 346.163 774.837 339 766 339H653.662C649.398 339 645.311 337.298 642.307 334.271L518.144 209.179C515.169 206.182 513.5 202.13 513.5 197.908V131C513.5 104.49 534.99 83 561.5 83H678C686.836 83 694 90.1635 694 99V289C694 297.837 701.163 305 710 305H766C774.836 305 782 297.837 782 289V16C782 7.16345 774.836 0 766 0H512C467.817 0 432 35.8172 432 80V229.153C432 233.23 433.556 237.153 436.351 240.121L558.672 370.032C564.474 376.193 564.474 385.807 558.672 391.968L436.351 521.879C433.556 524.847 432 528.77 432 532.847V682C432 726.183 467.817 762 512 762H766C774.836 762 782 754.837 782 746V473C782 464.163 774.836 457 766 457H710C701.163 457 694 464.163 694 473V663C694 671.837 686.836 679 678 679H561.5C534.99 679 513.5 657.51 513.5 631V564.092C513.5 559.87 515.169 555.818 518.144 552.821L642.307 427.729C645.311 424.702 649.398 423 653.662 423Z" fill="#10110F" />
              <path d="M128.338 423H16C7.16344 423 0 415.837 0 407V355C0 346.163 7.16344 339 16 339H128.338C132.602 339 136.689 337.298 139.693 334.271L263.856 209.179C266.831 206.182 268.5 202.13 268.5 197.908V131C268.5 104.49 247.01 83 220.5 83H104C95.1636 83 88.0002 90.1635 88.0002 99V289C88.0002 297.837 80.8367 305 72.0002 305H16.0002C7.16363 305 0.000185534 297.837 0.000185534 289V16C0.000185534 7.16345 7.16363 0 16.0002 0H270C314.183 0 350 35.8172 350 80V229.153C350 233.23 348.444 237.153 345.649 240.121L223.328 370.032C217.526 376.193 217.526 385.807 223.328 391.968L345.649 521.879C348.444 524.847 350 528.77 350 532.847V682C350 726.183 314.183 762 270 762H16.0002C7.16363 762 0.000185534 754.837 0.000185534 746V473C0.000185534 464.163 7.16363 457 16.0002 457H72.0002C80.8367 457 88.0002 464.163 88.0002 473V663C88.0002 671.837 95.1636 679 104 679H220.5C247.01 679 268.5 657.51 268.5 631V564.092C268.5 559.87 266.831 555.818 263.856 552.821L139.693 427.729C136.689 424.702 132.602 423 128.338 423Z" fill="#10110F" />
              <path d="M407 287C411.418 287 415 290.582 415 295V323.059L434.841 303.218C437.965 300.094 443.03 300.094 446.154 303.218L468.781 325.845C471.905 328.969 471.905 334.035 468.781 337.159L448.94 357H477C481.418 357 485 360.582 485 365V397C485 401.418 481.418 405 477 405H448.942L468.782 424.84C471.906 427.964 471.906 433.029 468.782 436.153L446.154 458.781C443.03 461.905 437.965 461.905 434.841 458.781L415 438.94V467C415 471.418 411.418 475 407 475H375C370.582 475 367 471.418 367 467V438.94L347.159 458.781C344.035 461.905 338.97 461.905 335.846 458.781L313.218 436.153C310.094 433.029 310.094 427.964 313.218 424.84L333.059 405H305C300.582 405 297 401.418 297 397V365C297 360.582 300.582 357 305 357H333.06L313.219 337.159C310.095 334.035 310.095 328.969 313.219 325.845L335.846 303.218C338.97 300.094 344.035 300.094 347.159 303.218L367 323.059V295C367 290.582 370.582 287 375 287H407Z" fill="#C7F000" />
            </svg>
          </div>

          <h1 className="font-sans font-black uppercase tracking-[0.05em] text-[clamp(2rem,6vw,4.25rem)] leading-none text-[#10110F] select-none whitespace-nowrap">
            DAVID SALVIANO
          </h1>

          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#10110F]/75 mt-3 sm:mt-4 font-semibold">
            PRODUCT DESIGNER | BRAZIL
          </p>

          {/* Discrete Real Activity Indicator (Minimal line pulse) */}
          <div className="mt-8 flex items-center justify-center">
            <div className="w-12 h-[1.5px] bg-[#10110F]/20 overflow-hidden relative rounded-full">
              <div className="absolute inset-y-0 w-1/2 bg-[#10110F] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Monospace Footer Note */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#10110F]/60 uppercase">
          <span>PORTFOLIO</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
