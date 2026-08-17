import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * usePageCurtain
 * Hook controlling page curtain transition states and direction.
 * 
 * @param {Object} options
 * @param {string} [options.initialPage='page1'] - Initial active page
 * @param {string[]|Function|Object} [options.pageOrder] - Sequence array for auto direction calculation
 * @param {Object|Function} [options.titles] - Map of page key to label text
 * @param {Function} [options.onNavigate] - Callback fired at 100% curtain cover to swap page content
 */
export function usePageCurtain({
  initialPage = 'page1',
  pageOrder = ['page1', 'page2'],
  titles = {},
  onNavigate,
} = {}) {
  const [page, setPage] = useState(initialPage);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'
  const [curtainState, setCurtainState] = useState('idle'); // 'idle' | 'covering' | 'covered' | 'revealing'
  const [title, setTitle] = useState(
    typeof titles === 'function'
      ? titles(initialPage)
      : titles[initialPage] || String(initialPage).toUpperCase()
  );

  const targetPageRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const isPending = curtainState !== 'idle';

  const clearSafetyTimer = () => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
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
      const order = Array.isArray(pageOrder)
        ? pageOrder
        : (typeof titles === 'object' ? Object.keys(titles) : null);

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
      if (!target || isPending || target === page) return;

      const nextTitle = customTitle || resolveTitle(target);
      const nextDirection = options.direction || resolveDirection(target);

      targetPageRef.current = target;
      setTitle(nextTitle);
      setDirection(nextDirection);
      setCurtainState('covering');

      clearSafetyTimer();
      safetyTimeoutRef.current = setTimeout(() => {
        setCurtainState('idle');
      }, 3500);
    },
    [isPending, page, resolveTitle, resolveDirection]
  );

  const handleCoverComplete = useCallback(() => {
    if (curtainState !== 'covering') return;

    if (targetPageRef.current) {
      const next = targetPageRef.current;
      setPage(next);
      onNavigate?.(next);
    }

    setCurtainState('revealing');
  }, [curtainState, onNavigate]);

  const handleRevealComplete = useCallback(() => {
    clearSafetyTimer();
    targetPageRef.current = null;
    setCurtainState('idle');
  }, []);

  useEffect(() => {
    return () => {
      clearSafetyTimer();
    };
  }, []);

  return {
    page,
    direction,
    isPending,
    curtainState,
    title,
    go,
    handleCoverComplete,
    handleRevealComplete,
  };
}

export default usePageCurtain;
