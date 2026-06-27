import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

const WORM_LENGTH = 56;
const MAX_THICKNESS = 4;
const SLANT_ANGLE = 0;
const MIN_THICKNESS_RATIO = 0.12; // 88% calligraphic contrast (1 - 0.12 = 0.88)
const TAIL_COLOR = 'var(--color-secondary)';
const HOVER_BG_COLOR = 'var(--color-secondary)';
const FEATURED_BTN_BG = '#B6A9ED';   // light purple hover – injected by mouse follower on featured cards
const FEATURED_BTN_FG = '#ffffff';   // white text when purple

export function MouseFollower() {
  const pathRef = useRef(null);

  useEffect(() => {
    const mouse = { x: -100, y: -100 };
    const points = Array.from({ length: WORM_LENGTH }, () => ({ x: -100, y: -100 }));

    // State machine to track the physics target and animation states
    const hoverState = {
      isTargeting: false,
      hasInjected: false,
      type: 'primary',
      el: null,
      centerX: -100,
      centerY: -100
    };

    let currentStrokeWidth = 3;

    const revertBtnState = (el, type) => {
      if (!el) return;
      el.style.color = el.dataset.oldColor || '';
      if (type === 'primary' || type === 'featured') {
        el.style.backgroundColor = el.dataset.oldBg || '';
        el.style.removeProperty('--ring-border-color');
        animate(el, {
          '--btn-y': '0px',
          '--ring-scale': '0.8',
          '--ring-opacity': '0',
          duration: 300,
          ease: 'outQuad',
          onComplete: () => { el.dataset.injected = "false"; }
        });
      }
    };

    const injectBtnState = (el, type) => {
      if (!el) return;
      el.style.transition = 'color 0.2s ease, background-color 0.2s ease';
      if (type === 'primary') {
        el.style.color = 'var(--color-neutral-carvao)';
        el.style.backgroundColor = HOVER_BG_COLOR;
        el.style.setProperty('--ring-border-color', HOVER_BG_COLOR);

        el.dataset.injected = "true";

        utils.set(el, {
          '--btn-y': '0px',
          '--ring-scale': '0',
          '--ring-opacity': '0',
          translateY: () => 'var(--btn-y)'
        });

        // Anima a variável do salto (--btn-y) e o anel (--ring-scale/opacity)
        animate(el, {
          '--btn-y': '0px',
          '--ring-scale': '1.3',
          '--ring-opacity': '0.3',
          duration: 600,
          ease: 'outExpo'
        });
      } else if (type === 'featured') {
        // Purple injection for featured work card buttons
        el.style.color = FEATURED_BTN_FG;
        el.style.backgroundColor = FEATURED_BTN_BG;
        el.style.setProperty('--ring-border-color', FEATURED_BTN_BG);

        el.dataset.injected = "true";

        utils.set(el, {
          '--btn-y': '0px',
          '--ring-scale': '0',
          '--ring-opacity': '0',
          translateY: () => 'var(--btn-y)'
        });

        animate(el, {
          '--btn-y': '0px',
          '--ring-scale': '1.3',
          '--ring-opacity': '0.3',
          duration: 600,
          ease: 'outExpo'
        });
      } else {
        el.style.color = HOVER_BG_COLOR;
      }
    };

    const updateTargetCoords = (el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        hoverState.centerX = rect.left + rect.width / 2;
        hoverState.centerY = rect.top + rect.height / 2;
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // The user requested to remove the action of the mouse arrow filling the buttons.
      // We set targetEl = null so the worm simply follows the cursor without magnetically attaching.
      let targetEl = null;

      if (targetEl && hoverState.el !== targetEl) {
        // Clear previous targeting 
        if (hoverState.hasInjected && hoverState.el) {
          revertBtnState(hoverState.el, hoverState.type);
        }

        const isFeaturedBtn = targetEl.hasAttribute('data-magnetic-button');
        const isSecondary = !isFeaturedBtn && (
          targetEl.getAttribute('data-cursor') === 'secondary' ||
          targetEl.closest('nav') !== null ||
          targetEl.className.includes('underline') ||
          (window.getComputedStyle(targetEl).backgroundColor === 'rgba(0, 0, 0, 0)' && !targetEl.className.includes('bg-'))
        );

        hoverState.el = targetEl;
        hoverState.type = isFeaturedBtn ? 'featured' : (isSecondary ? 'secondary' : 'primary');
        hoverState.isTargeting = true;
        hoverState.hasInjected = false;

        const css = window.getComputedStyle(targetEl);
        targetEl.dataset.oldColor = css.color;
        if (hoverState.type === 'primary') targetEl.dataset.oldBg = css.backgroundColor;

        updateTargetCoords(targetEl);

      } else if (!targetEl && hoverState.el) {
        // Mouse left magnetic fields
        if (hoverState.hasInjected) {
          revertBtnState(hoverState.el, hoverState.type);
        }
        hoverState.isTargeting = false;
        hoverState.hasInjected = false;
        hoverState.el = null;
      } else if (targetEl === hoverState.el && hoverState.isTargeting && !hoverState.hasInjected) {
        // Continuously update coords while approaching
        updateTargetCoords(targetEl);
      }
    };

    const handleScroll = () => {
      if (hoverState.isTargeting) updateTargetCoords(hoverState.el);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frameId;
    const animateLoop = () => {
      // Logic for arriving at the button
      if (hoverState.isTargeting) {
        const dx = hoverState.centerX - points[0].x;
        const dy = hoverState.centerY - points[0].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (!hoverState.hasInjected && dist < 15) {
          hoverState.hasInjected = true;
          injectBtnState(hoverState.el, hoverState.type);
        }
      }

      // Worm thickness retracts when injected
      const targetStroke = (hoverState.isTargeting && hoverState.hasInjected) ? 0 : MAX_THICKNESS;
      currentStrokeWidth += (targetStroke - currentStrokeWidth) * 0.25;

      points.forEach((p, i) => {
        if (hoverState.isTargeting) {
          if (hoverState.type === 'primary') {
            // Worm head flies towards the target center smoothly
            if (i === 0) {
              p.x += (hoverState.centerX - p.x) * (hoverState.hasInjected ? 0.4 : 0.12);
              p.y += (hoverState.centerY - p.y) * (hoverState.hasInjected ? 0.4 : 0.12);
            } else {
              // When injected, pull the tail extremely fast to simulate fluid absorption
              p.x += (points[i - 1].x - p.x) * (hoverState.hasInjected ? 0.6 : 0.45);
              p.y += (points[i - 1].y - p.y) * (hoverState.hasInjected ? 0.6 : 0.45);
            }
          } else {
            // Secondary type - travels to the target but collapses quietly
            if (i === 0) {
              p.x += (hoverState.centerX - p.x) * (hoverState.hasInjected ? 0.4 : 0.12);
              p.y += (hoverState.centerY - p.y) * (hoverState.hasInjected ? 0.4 : 0.12);
            } else {
              p.x += (points[i - 1].x - p.x) * 0.45;
              p.y += (points[i - 1].y - p.y) * 0.45;
            }
          }
        } else {
          // Default trailing worm behavior
          if (i === 0) {
            p.x += (mouse.x - p.x) * 0.42;
            p.y += (mouse.y - p.y) * 0.42;
          } else {
            p.x += (points[i - 1].x - p.x) * 0.48;
            p.y += (points[i - 1].y - p.y) * 0.48;
          }
        }
      });

      // --- GEOMETRIA CALIGRÁFICA AVANÇADA ---
      if (pathRef.current && points.length > 1) {
        let leftSide = [];
        let rightSide = [];

        points.forEach((p, i) => {
          const t = i / points.length;

          // Estreitamento suave e redondo para pontas delicadas
          const tailTaper = 0.45 + 0.55 * Math.pow(1 - t, 1.1);
          const headTaper = i < 5 ? (0.5 + 0.5 * (i / 5)) : 1.0;
          const profile = headTaper * tailTaper;

          const thicknessBase = currentStrokeWidth * profile;

          const next = points[i + 1] || p;
          const prev = points[i - 1] || p;
          let dx = next.x - prev.x;
          let dy = next.y - prev.y;
          let len = Math.sqrt(dx * dx + dy * dy);

          if (len < 0.01) {
            dx = 1;
            dy = 0;
            len = 1;
          }

          const nx = -dy / len;
          const ny = dx / len;

          // --- MODELAÇÃO DE ELIPSE ---
          const maxR = thicknessBase;
          const minR = thicknessBase * MIN_THICKNESS_RATIO;

          const slantRad = (SLANT_ANGLE) * Math.PI / 180;
          const normalAngle = Math.atan2(ny, nx);
          const diff = normalAngle - slantRad;

          // Raio resultante na direção normal
          const thickness = Math.sqrt(
            Math.pow(maxR * Math.cos(diff), 2) +
            Math.pow(minR * Math.sin(diff), 2)
          );

          leftSide.push({ x: p.x + nx * thickness, y: p.y + ny * thickness });
          rightSide.unshift({ x: p.x - nx * thickness, y: p.y - ny * thickness });
        });

        const polygonPoints = [...leftSide, ...rightSide];
        let d = `M ${polygonPoints[0].x} ${polygonPoints[0].y} `;
        for (let i = 1; i < polygonPoints.length; i++) {
          d += `L ${polygonPoints[i].x} ${polygonPoints[i].y} `;
        }
        d += 'Z';

        pathRef.current.setAttribute("d", d);
      }

      frameId = requestAnimationFrame(animateLoop);
    };

    frameId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999]">
      <defs>
        {/* FILTRO MELODRAMA ADAPTADO PARA LINHAS FINAS */}
        <filter id="melodrama-marker-fine" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.5" result="blurred" />
          <feColorMatrix in="blurred" type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 35 -12" />
        </filter>
      </defs>

      <path
        ref={pathRef}
        fill={TAIL_COLOR}
        stroke="none"
        filter="url(#melodrama-marker-fine)"
        className="transition-colors duration-300 opacity-[0.98]"
      />
    </svg>
  );
}
