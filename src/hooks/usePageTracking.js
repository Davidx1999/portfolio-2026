import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initGA, hasAnalyticsConsent } from '../services/analytics';

/**
 * Hook to track SPA route transitions deterministically without duplicate page views.
 * Listens for the explicit document_seo_ready signal so that case studies and async
 * routes are only tracked once their final metadata is applied (never with temporary "Loading..." titles).
 * Updates lastTrackedPathRef only when trackPageView confirms event dispatch (returns true).
 */
export function usePageTracking() {
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const lastTrackedPathRef = useRef(null);

  // 1. Initialize GA on mount if consent is already granted
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initGA();
    }
  }, []);

  // 2. Track pageviews on deterministic document_seo_ready signal
  useEffect(() => {
    const handleSEOReady = (e) => {
      const eventPath = e.detail?.path || (location.pathname + location.search);
      const eventTitle = e.detail?.title || document.title;

      // Only track if it matches current path, has not been successfully tracked yet, and is not a loading title
      if (
        eventPath === (location.pathname + location.search) &&
        lastTrackedPathRef.current !== eventPath &&
        eventTitle &&
        !eventTitle.startsWith('Loading')
      ) {
        const didTrack = trackPageView(eventPath, eventTitle);
        if (didTrack) {
          lastTrackedPathRef.current = eventPath;
        }
      }
    };

    window.addEventListener('document_seo_ready', handleSEOReady);

    // If current route SEO was already resolved before this listener was attached
    if (
      window.__last_ready_seo &&
      window.__last_ready_seo.path === currentPath &&
      lastTrackedPathRef.current !== currentPath &&
      window.__last_ready_seo.title &&
      !window.__last_ready_seo.title.startsWith('Loading')
    ) {
      const didTrack = trackPageView(currentPath, window.__last_ready_seo.title);
      if (didTrack) {
        lastTrackedPathRef.current = currentPath;
      }
    }

    return () => {
      window.removeEventListener('document_seo_ready', handleSEOReady);
    };
  }, [currentPath, location.pathname, location.search]);

  // 3. Listen for runtime consent acceptance on an already loaded route
  useEffect(() => {
    const handleConsentChange = (e) => {
      if (e.detail?.consent === 'granted') {
        initGA();
        const activeTitle = (window.__last_ready_seo?.path === currentPath && window.__last_ready_seo.title)
          ? window.__last_ready_seo.title
          : document.title;

        if (
          lastTrackedPathRef.current !== currentPath &&
          activeTitle &&
          !activeTitle.startsWith('Loading')
        ) {
          const didTrack = trackPageView(currentPath, activeTitle);
          if (didTrack) {
            lastTrackedPathRef.current = currentPath;
          }
        }
      }
    };

    window.addEventListener('analytics_consent_changed', handleConsentChange);
    return () => {
      window.removeEventListener('analytics_consent_changed', handleConsentChange);
    };
  }, [currentPath]);
}

export default usePageTracking;
