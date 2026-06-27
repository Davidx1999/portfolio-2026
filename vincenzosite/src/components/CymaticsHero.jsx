/**
 * CymaticsHero.jsx
 * ----------------
 * React component that wires together the cymatics particle system.
 * All heavy logic lives in src/cymatics/* — this file only handles
 * DOM structure, event delegation, and React lifecycle.
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import PATTERNS from '../cymatics/patterns';
import createParticleSystem from '../cymatics/createParticleSystem';
import createMouseTracker from '../cymatics/mouseTracker';
import startAnimation from '../cymatics/animationLoop';
import './CymaticsHero.css';

/* ── SVG icons for each pattern button ─────────────────── */
const BUTTON_ICONS = [
  // 0 – Solid Square
  <svg key="0" viewBox="0 0 14 14" fill="white" stroke="none">
    <rect x="3" y="3" width="8" height="8" rx="1" opacity="0.8" />
  </svg>,
  // 1 – Grid
  <svg key="1" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <rect x="2" y="2" width="5" height="5" rx="2" />
    <rect x="8" y="2" width="5" height="5" rx="2" />
    <rect x="2" y="8" width="5" height="5" rx="2" />
    <rect x="8" y="8" width="5" height="5" rx="2" />
  </svg>,
  // 2 – Diamond Eyes
  <svg key="2" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <ellipse cx="7" cy="7" rx="6" ry="5" />
    <rect x="4.5" y="4.5" width="5" height="5" rx="1" />
  </svg>,
  // 3 – Concentric
  <svg key="3" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <ellipse cx="7" cy="7" rx="6" ry="6" />
    <ellipse cx="7" cy="7" rx="4" ry="4" />
    <ellipse cx="7" cy="7" rx="2" ry="2" />
  </svg>,
  // 4 – Hexagon
  <svg key="4" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <polygon points="7,2 11.5,4.5 11.5,9.5 7,12 2.5,9.5 2.5,4.5" />
  </svg>,
  // 5 – Supernova
  <svg key="5" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <path d="M7 1 Q7 7 13 7 Q7 7 7 13 Q7 7 1 7 Q7 7 7 1" />
  </svg>,
  // 6 – Infinity
  <svg key="6" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
    <path d="M2 7 C 2 3, 7 3, 7 7 C 7 11, 12 11, 12 7 C 12 3, 7 3, 7 7 C 7 11, 2 11, 2 7" />
  </svg>,
];

export default function CymaticsHero() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);     // { stop, triggerPulse }
  const patternRef = useRef(null);    // mutable pattern state

  const [activeIdx, setActiveIdx] = useState(0);

  // Build mutable pattern state once
  if (patternRef.current === null) {
    const first = PATTERNS[0];
    patternRef.current = {
      patterns:  PATTERNS,
      index:     0,
      active:    first,
      targetA:   first.holeA,
      targetB:   first.holeB,
      targetK:   first.holeK,
      curA:      first.holeA,
      curB:      first.holeB,
      curK:      first.holeK,
      lastPulse: Date.now(),
      autoPlay:  true,
    };
  }

  // ── Bootstrap Three.js on mount ──
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const world = createParticleSystem(container);
    const mouse = createMouseTracker(world.camera);

    const engine = startAnimation(
      world,
      mouse,
      patternRef.current,
      (idx) => setActiveIdx(idx),   // sync React state on auto-pulse
    );
    engineRef.current = engine;

    engine.animate();

    return () => {
      engine.stop();
      mouse.dispose();
      world.dispose();
    };
  }, []);

  // ── Button click handler ──
  const handleButtonClick = useCallback((idx) => {
    patternRef.current.autoPlay = false;
    engineRef.current?.triggerPulse(idx);
    setActiveIdx(idx);
  }, []);

  // ── Background click → next pulse ──
  const handleBackgroundClick = useCallback((e) => {
    if (e.target.closest('.cymatics-hero__btn') ||
        e.target.closest('.cymatics-hero__nav')) return;
    engineRef.current?.triggerPulse();
  }, []);

  const patternName = PATTERNS[activeIdx]?.name ?? '';

  return (
    <section className="cymatics-hero" onClick={handleBackgroundClick}>
      {/* Three.js canvas */}
      <div className="cymatics-hero__canvas" ref={canvasRef} />

      {/* Vignette overlay */}
      <div className="cymatics-hero__vignette" />

      {/* UI Layer */}
      <div className="cymatics-hero__ui">
        {/* Top bar */}
        <div className="cymatics-hero__top-bar">
          <div className="cymatics-hero__logo">
            Vincenzo Fadda · Data Scientist
          </div>
          <nav className="cymatics-hero__nav">
            <span>Vision</span>
            <span>Hardware</span>
            <span>Manifesto</span>
          </nav>
        </div>

        {/* Hero copy */}
        <div className="cymatics-hero__copy">
          <div className="cymatics-hero__eyebrow">Zero surveillance</div>
          <h1 className="cymatics-hero__title">
            The Legend of Fadda<br />
            <em>you can see the magic here.</em>
          </h1>
          <p className="cymatics-hero__sub">
            Your mind is not for sale.<br />
            Open source is trust. The future is free.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="cymatics-hero__bottom-bar">
          <div className="cymatics-hero__freq">
            <div className="cymatics-hero__freq-label">Resonance Frequency</div>
            <div className="cymatics-hero__freq-btns">
              {PATTERNS.map((p, i) => (
                <button
                  key={i}
                  className={`cymatics-hero__btn${i === activeIdx ? ' active' : ''}`}
                  title={p.name}
                  onClick={() => handleButtonClick(i)}
                >
                  {BUTTON_ICONS[i]}
                </button>
              ))}
            </div>
          </div>

          <div className="cymatics-hero__meta">
            <div className="cymatics-hero__pattern-name">{patternName}</div>
            <div className="cymatics-hero__scroll-hint">Discover</div>
          </div>
        </div>
      </div>
    </section>
  );
}
