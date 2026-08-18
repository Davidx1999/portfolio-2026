import React, { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SUPPORTED_ROUTES,
  DEFAULT_ROUTE,
  routeToLocale,
  getHtmlLangForRoute,
  persistRoute,
  getPersistedRoute,
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
 * Redirects the root path / to /en (or user's saved preference).
 */
export function RootRedirect() {
  const targetRoute = getPersistedRoute() || DEFAULT_ROUTE;
  return <Navigate to={`/${targetRoute}`} replace />;
}

/**
 * LegacyRedirect
 * Redirects legacy top-level un-prefixed routes (e.g., /work, /about, /contact)
 * to their language-prefixed equivalent (e.g., /en/work).
 */
export function LegacyRedirect({ to }) {
  const targetRoute = getPersistedRoute() || DEFAULT_ROUTE;
  return <Navigate to={`/${targetRoute}/${to}`} replace />;
}

/**
 * LegacyCaseRedirect
 * Redirects legacy top-level case URLs (e.g., /cases/:slug) to /:lang/work/:slug.
 */
export function LegacyCaseRedirect() {
  const { slug } = useParams();
  const targetRoute = getPersistedRoute() || DEFAULT_ROUTE;
  return <Navigate to={`/${targetRoute}/work/${slug}`} replace />;
}
