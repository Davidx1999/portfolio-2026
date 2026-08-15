import { useState, useEffect } from 'react';

/**
 * Global Header Metrics Hook
 * Measures the single source of truth SiteHeader / Navbar element and maintains:
 * - --header-top
 * - --header-height
 * - --header-bottom
 * - --header-trigger-line (headerBottom + 12px)
 * - --header-gap
 * - --header-safe-offset
 * 
 * Provides reactive metrics for Framer Motion, scroll triggers, and responsive layouts.
 */

const DEFAULT_METRICS = {
  headerTop: 0,
  headerHeight: 54,
  headerBottom: 54,
  triggerLine: 66,
  headerGap: 18,
  safeOffset: 72,
};

let globalMetrics = { ...DEFAULT_METRICS };
const listeners = new Set();

function updateCssVariables(metrics) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--header-top', `${metrics.headerTop}px`);
  root.style.setProperty('--header-height', `${metrics.headerHeight}px`);
  root.style.setProperty('--header-bottom', `${metrics.headerBottom}px`);
  root.style.setProperty('--header-trigger-line', `${metrics.triggerLine}px`);
  root.style.setProperty('--header-gap', `${metrics.headerGap}px`);
  root.style.setProperty('--header-safe-offset', `${metrics.safeOffset}px`);
}

export function registerHeaderElement(element) {
  if (!element || typeof window === 'undefined') return () => {};

  const measure = () => {
    const rect = element.getBoundingClientRect();
    const top = Math.max(0, rect.top);
    const height = Math.round(rect.height) || 54;
    const bottom = Math.round(rect.bottom) || (top + height);
    const triggerLine = bottom + 12; // Exactly header.bottom + 12px
    const gap = 18; // Default safety breath margin for page layout
    const safeOffset = top + height + gap;

    const newMetrics = {
      headerTop: top,
      headerHeight: height,
      headerBottom: bottom,
      triggerLine: triggerLine,
      headerGap: gap,
      safeOffset: safeOffset,
    };

    globalMetrics = newMetrics;
    updateCssVariables(newMetrics);
    listeners.forEach((listener) => listener(newMetrics));
  };

  // Initial measurement
  measure();

  // ResizeObserver for dynamic size changes (compact/expanded, fonts loaded, breakpoint shifts)
  const resizeObserver = new ResizeObserver(() => {
    measure();
  });
  resizeObserver.observe(element);

  // Window resize and font loading listeners
  window.addEventListener('resize', measure, { passive: true });
  if (document.fonts) {
    document.fonts.ready.then(measure).catch(() => {});
  }

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener('resize', measure);
  };
}

export function useHeaderMetrics() {
  const [metrics, setMetrics] = useState(globalMetrics);

  useEffect(() => {
    const handleChange = (newMetrics) => {
      setMetrics(newMetrics);
    };

    listeners.add(handleChange);
    // Initial sync
    setMetrics(globalMetrics);

    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  return metrics;
}

export default useHeaderMetrics;
