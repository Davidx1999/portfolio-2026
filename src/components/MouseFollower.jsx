import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

const WORM_LENGTH = 60;

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

    let currentStrokeWidth = 4;

    const revertBtnState = (el, type) => {
      if (!el) return;
      el.style.color = el.dataset.oldColor || '';
      if (type === 'primary') {
        el.style.backgroundColor = el.dataset.oldBg || '';
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
        el.style.color = '#FFF9FA';
        el.style.backgroundColor = '#fd1843';

        el.dataset.injected = "true";

        utils.set(el, {
          '--btn-y': '0px',
          '--ring-scale': '0',
          '--ring-opacity': '0',
          translateY: () => 'var(--btn-y)'
        });

        // Anima a variável do salto (--btn-y) e o anel (--ring-scale/opacity)
        animate(el, {
          '--btn-y': '-6px',
          '--ring-scale': '1.3',
          '--ring-opacity': '0',
          duration: 600,
          ease: 'outExpo'
        });
      } else {
        el.style.color = '#fd1843';
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

      const directHover = e.target.closest('a, button, [role="button"]');
      const magneticCard = e.target.closest('[data-magnetic-card]');

      let targetEl = null;

      // Decide which element we are magnetically pulling towards
      if (directHover && !directHover.hasAttribute('data-magnetic-card')) {
        targetEl = directHover;
      } else if (magneticCard) {
        targetEl = magneticCard.querySelector('a, button, [data-magnetic-button]');
      } else if (directHover) { // fallback
        targetEl = directHover;
      }

      if (targetEl && hoverState.el !== targetEl) {
        // Clear previous targeting 
        if (hoverState.hasInjected && hoverState.el) {
          revertBtnState(hoverState.el, hoverState.type);
        }

        const isSecondary = targetEl.getAttribute('data-cursor') === 'secondary' ||
          targetEl.closest('nav') !== null ||
          targetEl.className.includes('underline') ||
          (window.getComputedStyle(targetEl).backgroundColor === 'rgba(0, 0, 0, 0)' && !targetEl.className.includes('bg-'));

        hoverState.el = targetEl;
        hoverState.type = isSecondary ? 'secondary' : 'primary';
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
    const animate = () => {
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
      const targetStroke = (hoverState.isTargeting && hoverState.hasInjected) ? 0 : 4;
      currentStrokeWidth += (targetStroke - currentStrokeWidth) * 0.2;

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
            p.x += (mouse.x - p.x) * 0.4;
            p.y += (mouse.y - p.y) * 0.4;
          } else {
            p.x += (points[i - 1].x - p.x) * 0.5;
            p.y += (points[i - 1].y - p.y) * 0.5;
          }
        }
      });

      if (pathRef.current) {
        let d = `M ${points[0].x} ${points[0].y} `;
        for (let i = 1; i < WORM_LENGTH; i++) {
          d += `L ${points[i].x} ${points[i].y} `;
        }

        pathRef.current.setAttribute("d", d);
        pathRef.current.setAttribute("stroke-width", currentStrokeWidth);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999]">
      <path
        ref={pathRef}
        fill="transparent"
        stroke="#fd1843"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
