/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { SUPPORTED_ROUTES, DEFAULT_ROUTE } from '../i18n/languageMapping';

/**
 * Route Dictionary for Automatic Title Resolution
 */
const ROUTE_TITLES = {
  '/': {
    pt: 'INÍCIO',
    en: 'HOME',
    index: '01 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/work': {
    pt: 'PROJETOS',
    en: 'WORK',
    index: '02 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/cases': {
    pt: 'PROJETOS',
    en: 'WORK',
    index: '02 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/projects': {
    pt: 'PROJETOS',
    en: 'WORK',
    index: '02 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/about': {
    pt: 'SOBRE',
    en: 'ABOUT',
    index: '03 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/contact': {
    pt: 'FALE COMIGO',
    en: "LET'S TALK",
    index: '04 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/lets-talk': {
    pt: 'FALE COMIGO',
    en: "LET'S TALK",
    index: '04 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
  '/talk': {
    pt: 'FALE COMIGO',
    en: "LET'S TALK",
    index: '04 / 04',
    eyebrow_pt: 'NAVEGANDO PARA',
    eyebrow_en: 'NAVIGATING TO',
  },
};

/**
 * Extracts route prefix and un-prefixed path from a given URL path
 */
export function extractRouteInfo(pathname) {
  if (!pathname) return { lang: DEFAULT_ROUTE, unPrefixed: '/' };
  const cleanPath = pathname.split('?')[0].split('#')[0];

  for (const r of SUPPORTED_ROUTES) {
    if (cleanPath === `/${r}`) {
      return { lang: r, unPrefixed: '/' };
    }
    if (cleanPath.startsWith(`/${r}/`)) {
      return { lang: r, unPrefixed: cleanPath.replace(new RegExp(`^/${r}`), '') };
    }
  }

  return { lang: DEFAULT_ROUTE, unPrefixed: cleanPath || '/' };
}

/**
 * Resolves localized curtain title for any internal route.
 */
export function resolveRouteTitle(to, currentLang = 'en') {
  if (!to) return currentLang === 'en' ? 'HOME' : 'INÍCIO';

  const { lang: targetLang, unPrefixed } = extractRouteInfo(to);
  const langToUse = targetLang || currentLang;

  // Direct match in dictionary
  if (ROUTE_TITLES[unPrefixed]) {
    const route = ROUTE_TITLES[unPrefixed];
    return {
      title: langToUse === 'en' ? route.en : route.pt,
      eyebrow: langToUse === 'en' ? route.eyebrow_en : route.eyebrow_pt,
      index: route.index,
    };
  }

  // Dynamic Case Study match: /cases/:slug or /work/:slug or /project/:slug
  const caseMatch = unPrefixed.match(/^\/(?:cases|work|project|projects)\/([^/]+)/);
  if (caseMatch) {
    const slug = caseMatch[1];
    const formatted = slug.replace(/[-_]/g, ' ').toUpperCase();
    return {
      title: formatted,
      eyebrow: langToUse === 'en' ? 'CASE STUDY //' : 'ESTUDO DE CASO //',
      index: null,
    };
  }

  // Generic fallback
  const fallback = unPrefixed.replace(/^\//, '').replace(/[-_]/g, ' ').toUpperCase() || (langToUse === 'en' ? 'HOME' : 'INÍCIO');
  return {
    title: fallback,
    eyebrow: langToUse === 'en' ? 'NAVIGATING TO' : 'NAVEGANDO PARA',
    index: null,
  };
}

const ROUTE_RANK = {
  '/': 0,
  '/work': 1,
  '/cases': 1,
  '/projects': 1,
  '/about': 2,
  '/contact': 3,
  '/talk': 3,
  '/lets-talk': 3,
};

function getRouteRank(path) {
  if (!path) return 0;
  const { unPrefixed } = extractRouteInfo(path);
  if (ROUTE_RANK[unPrefixed] !== undefined) return ROUTE_RANK[unPrefixed];
  if (unPrefixed.startsWith('/cases') || unPrefixed.startsWith('/work') || unPrefixed.startsWith('/project')) {
    return 1;
  }
  return 1;
}

const RouteCurtainContext = createContext({
  curtainState: 'idle',
  isCurtainActive: false,
  curtainData: { title: '', eyebrow: '', index: null, direction: 'forward' },
  navigateWithCurtain: () => {},
  handleCoverAnimationComplete: () => {},
  handleRevealAnimationComplete: () => {},
});

export function RouteCurtainProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Current route language
  const { lang: currentRouteLang } = extractRouteInfo(location.pathname);

  // Curtain State Machine: 'idle' | 'covering' | 'covered' | 'revealing'
  const [curtainState, setCurtainState] = useState('idle');
  const [curtainData, setCurtainData] = useState({
    title: '',
    eyebrow: '',
    index: null,
    direction: 'forward',
  });
  const [srAnnouncement, setSrAnnouncement] = useState('');

  const targetRef = useRef(null);
  const safetyTimerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const revealTimerRef = useRef(null);

  const clearSafetyTimer = () => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
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

  /**
   * Main transition trigger
   */
  const navigateWithCurtain = useCallback(
    (to, options = {}) => {
      if (!to) return;

      // 1. Lock: Ignore repeated rapid clicks while already transitioning
      if (curtainState !== 'idle') {
        return;
      }

      const cleanPath = to.split('?')[0].split('#')[0];
      const currentCleanPath = location.pathname;

      // 2. Ignore if already on the exact same route
      if (cleanPath === currentCleanPath && !to.includes('#') && !to.includes('?')) {
        return;
      }

      // 3. Resolve Title & Eyebrow & Direction
      const resolved = resolveRouteTitle(to, currentRouteLang);
      const finalTitle =
        options.title ||
        (currentRouteLang === 'en' && options.title_en ? options.title_en : resolved.title);
      const finalEyebrow = options.eyebrow || resolved.eyebrow;
      const finalIndex = options.index !== undefined ? options.index : resolved.index;

      const currentRank = getRouteRank(currentCleanPath);
      const targetRank = getRouteRank(cleanPath);
      const autoDirection = targetRank >= currentRank ? 'forward' : 'backward';
      const direction = options.direction || autoDirection;

      const newCurtainData = {
        title: finalTitle,
        eyebrow: finalEyebrow,
        index: finalIndex,
        direction,
      };

      setCurtainData(newCurtainData);
      setSrAnnouncement(
        currentRouteLang === 'en' ? `Navigating to ${finalTitle}` : `Navegando para ${finalTitle}`
      );

      targetRef.current = {
        to,
        replace: options.replace || false,
      };

      // 4. Start Covering state
      clearTransitionTimers();
      setCurtainState('covering');

      // Safety timeout: reset if anything hangs
      clearSafetyTimer();
      safetyTimerRef.current = setTimeout(() => {
        clearTransitionTimers();
        setCurtainState('idle');
      }, 3500);
    },
    [curtainState, location.pathname, currentRouteLang]
  );

  /**
   * Callback: Fired when covering animation finishes (100% viewport covered at ~0.70s)
   */
  const handleCoverAnimationComplete = useCallback(() => {
    if (curtainState !== 'covering') return;

    setCurtainState('covered');

    // Execute real route navigation completely hidden behind curtain
    if (targetRef.current) {
      const { to, replace } = targetRef.current;
      targetRef.current = null;

      try {
        if (replace) {
          navigate(to, { replace: true });
        } else {
          navigate(to);
        }
      } catch (err) {
        console.error('Route navigation error:', err);
      }

      // Reset scroll position instantly while curtain is 100% opaque
      window.scrollTo(0, 0);
    }

    // Short pause (240ms) with covered curtain to ensure seamless paint
    exitTimerRef.current = setTimeout(() => {
      setCurtainState('revealing');
    }, 240);
  }, [curtainState, navigate]);

  /**
   * Callback: Fired when revealing animation finishes (curtain has exited)
   */
  const handleRevealAnimationComplete = useCallback(() => {
    clearTransitionTimers();
    clearSafetyTimer();
    setCurtainState('idle');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSafetyTimer();
      clearTransitionTimers();
    };
  }, []);

  const isCurtainActive = curtainState !== 'idle';

  return (
    <RouteCurtainContext.Provider
      value={{
        curtainState,
        isCurtainActive,
        curtainData,
        navigateWithCurtain,
        handleCoverAnimationComplete,
        handleRevealAnimationComplete,
      }}
    >
      {/* Accessible Live Region for Screen Readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {srAnnouncement}
      </div>

      {children}
    </RouteCurtainContext.Provider>
  );
}

export function useRouteCurtain() {
  const context = useContext(RouteCurtainContext);
  if (!context) {
    throw new Error('useRouteCurtain must be used within a RouteCurtainProvider');
  }
  return context;
}

/**
 * CurtainLink: Drop-in replacement for internal <Link> tags.
 * Intercepts internal clicks and triggers the global route curtain.
 * Automatically ensures links respect the current active route language prefix.
 */
export function CurtainLink({
  to,
  href,
  curtainTitle,
  curtainTitleEn,
  curtainEyebrow,
  curtainIndex,
  direction,
  onClick,
  children,
  className,
  replace = false,
  ...props
}) {
  const rawTarget = to || href;
  const { navigateWithCurtain } = useRouteCurtain();
  const location = useLocation();

  const { lang: currentLang } = extractRouteInfo(location.pathname);

  // Normalize target URL with language prefix if not already prefixed
  let target = rawTarget;
  if (
    typeof target === 'string' &&
    target.startsWith('/') &&
    !target.startsWith('/en') &&
    !target.startsWith('/pt') &&
    !target.startsWith('//')
  ) {
    target = target === '/' ? `/${currentLang}` : `/${currentLang}${target}`;
  }

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // Filter out external, modifier clicks, downloads, _blank, mailto, etc.
    if (
      !target ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      props.target === '_blank' ||
      props.download ||
      typeof target !== 'string' ||
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('tel:') ||
      target.startsWith('wa.me')
    ) {
      return; // Standard native handling
    }

    // Same-page anchor hashes
    if (target.startsWith('#')) {
      return;
    }

    e.preventDefault();

    const targetClean = target.split('?')[0].split('#')[0];
    if (targetClean === location.pathname && !target.includes('?') && !target.includes('#')) {
      return; // Already on this route
    }

    navigateWithCurtain(target, {
      title: curtainTitle,
      title_en: curtainTitleEn,
      eyebrow: curtainEyebrow,
      index: curtainIndex,
      direction,
      replace,
    });
  };

  return (
    <RouterLink to={target} onClick={handleClick} className={className} {...props}>
      {children}
    </RouterLink>
  );
}

export default RouteCurtainContext;
