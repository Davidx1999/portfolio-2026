import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * usePageCurtain
 * Hook to manage page curtain transitions, coordinating state, titles, direction, and timing.
 * 
 * Signature:
 * const { page, isPending, go, ref, curtainState, title, direction } = usePageCurtain({
 *   initialPage: 'home',
 *   titles: { home: 'INÍCIO', work: 'PROJETOS', about: 'SOBRE', contact: 'FALE COMIGO' },
 *   pageOrder: ['home', 'work', 'about', 'contact'],
 *   onNavigate: (newPage) => {},
 * });
 */
export function usePageCurtain({
  initialPage = 'home',
  titles = {},
  pageOrder,
  onNavigate,
} = {}) {
  const [page, setPage] = useState(initialPage);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'
  const [curtainState, setCurtainState] = useState('idle'); // 'idle' | 'covering' | 'covered' | 'titleExiting' | 'revealing'
  const [title, setTitle] = useState(
    typeof titles === 'function'
      ? titles(initialPage)
      : titles[initialPage] || String(initialPage).toUpperCase()
  );

  const targetPageRef = useRef(null);
  const containerRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const exitTimerRef = useRef(null);
  const revealTimerRef = useRef(null);

  const isPending = curtainState !== 'idle';

  const clearSafetyTimer = () => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  };

  const clearTransitionTimers = () => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  };

  const resolveTitle = useCallback(
    (target) => {
      if (typeof titles === 'function') {
        return titles(target);
      }
      if (titles && typeof titles === 'object' && titles[target]) {
        return titles[target];
      }
      return String(target).replace(/^\//, '').replace(/[-_]/g, ' ').toUpperCase();
    },
    [titles]
  );

  const resolveDirection = useCallback(
    (target) => {
      const order = pageOrder || (typeof titles === 'object' ? Object.keys(titles) : null);
      if (order && Array.isArray(order)) {
        const currentIndex = order.indexOf(page);
        const targetIndex = order.indexOf(target);
        if (currentIndex !== -1 && targetIndex !== -1) {
          return targetIndex >= currentIndex ? 'forward' : 'backward';
        }
      }
      return 'forward';
    },
    [page, pageOrder, titles]
  );

  const go = useCallback(
    (target, customTitle, options = {}) => {
      if (!target || isPending) return;

      const nextTitle = customTitle || resolveTitle(target);
      const nextDirection = options.direction || resolveDirection(target);

      targetPageRef.current = target;
      setTitle(nextTitle);
      setDirection(nextDirection);
      clearTransitionTimers();
      setCurtainState('covering');

      clearSafetyTimer();
      safetyTimeoutRef.current = setTimeout(() => {
        clearTransitionTimers();
        setCurtainState('idle');
      }, 3500);
    },
    [isPending, resolveTitle, resolveDirection]
  );

  const handleCoverComplete = useCallback(() => {
    if (curtainState !== 'covering') return;

    setCurtainState('covered');

    if (targetPageRef.current) {
      const next = targetPageRef.current;
      setPage(next);
      onNavigate?.(next);
    }

    clearTransitionTimers();

    // Trigger reveal after short buffer once route mounted
    revealTimerRef.current = setTimeout(() => {
      setCurtainState('revealing');
    }, 100);
  }, [curtainState, onNavigate]);

  const handleRevealComplete = useCallback(() => {
    if (curtainState !== 'revealing') return;

    clearTransitionTimers();
    clearSafetyTimer();
    targetPageRef.current = null;
    setCurtainState('idle');
  }, [curtainState]);

  useEffect(() => {
    return () => {
      clearSafetyTimer();
      clearTransitionTimers();
    };
  }, []);

  return {
    page,
    direction,
    isPending,
    go,
    ref: containerRef,
    curtainState,
    title,
    handleCoverComplete,
    handleRevealComplete,
  };
}

export default usePageCurtain;
