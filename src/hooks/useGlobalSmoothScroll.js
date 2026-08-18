import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenisInstance = null;

export function getGlobalLenis() {
  return globalLenisInstance;
}

/**
 * useGlobalSmoothScroll
 * Configuração única global do Lenis sincronizada com GSAP ScrollTrigger ticker.
 * - Evita múltiplas instâncias ou loops duplicados.
 * - Suporta prefers-reduced-motion.
 * - lerp: 0.13, smoothWheel: true, wheelMultiplier: 0.9, syncTouch: false.
 */
export function useGlobalSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    if (globalLenisInstance) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.18,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      respectReducedMotion: true,
    });

    globalLenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, []);
}

export default useGlobalSmoothScroll;
