import React, { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SUPPORTED_ROUTES,
  DEFAULT_ROUTE,
  routeToLocale,
  getHtmlLangForRoute,
  persistRoute,
} from '../i18n/languageMapping';
import { NotFound } from '../pages/NotFound';

/**
 * LanguageRouteWrapper
 * Validates the :lang URL parameter, synchronizes i18next, updates <html lang>,
 * and persists the active language preference.
 */
export function LanguageRouteWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const isValidLang = lang && SUPPORTED_ROUTES.includes(lang);
  const activeLocale = routeToLocale(lang || DEFAULT_ROUTE);

  useEffect(() => {
    if (isValidLang) {
      if (i18n.language !== activeLocale) {
        i18n.changeLanguage(activeLocale);
      }
      document.documentElement.lang = getHtmlLangForRoute(lang);
      persistRoute(lang);
    }
  }, [isValidLang, lang, activeLocale, i18n]);

  if (!isValidLang) {
    return <NotFound />;
  }

  return <Outlet />;
}

/**
 * RootRedirect
 * Unconditionally redirects the root path / to /pt, regardless of country,
 * browser language, or saved preference.
 */
export function RootRedirect() {
  return <Navigate to="/pt" replace />;
}

/**
 * LegacyRedirect
 * Redirects legacy top-level un-prefixed routes (e.g., /work, /about, /contact)
 * directly to their /pt equivalent (e.g., /pt/work).
 */
export function LegacyRedirect({ to }) {
  return <Navigate to={`/pt/${to}`} replace />;
}

/**
 * LegacyCaseRedirect
 * Redirects legacy top-level case URLs (e.g., /cases/:slug, /work/:slug)
 * directly to /pt/work/:slug.
 */
export function LegacyCaseRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/pt/work/${slug}`} replace />;
}
