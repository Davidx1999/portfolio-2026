/**
 * Centralized Language & Route Mapping
 * 
 * Public URLs: /en and /pt
 * Internal Locales (i18next, Sanity, HTML): 'en' and 'pt-BR'
 */

export const SUPPORTED_ROUTES = ['en', 'pt'];
export const DEFAULT_ROUTE = 'en';

export const SUPPORTED_LOCALES = ['en', 'pt-BR'];
export const DEFAULT_LOCALE = 'en';

export const STORAGE_KEY_LANG = 'portfolio_lang';

/**
 * Maps a URL route prefix ('en' | 'pt') to an internal locale ('en' | 'pt-BR')
 */
export function routeToLocale(route) {
  if (route === 'pt') return 'pt-BR';
  return 'en';
}

/**
 * Maps an internal locale ('en' | 'pt-BR') to a URL route prefix ('en' | 'pt')
 */
export function localeToRoute(locale) {
  if (locale === 'pt-BR' || locale === 'pt') return 'pt';
  return 'en';
}

/**
 * Derives the active commercial currency from the route prefix
 * EN -> USD ($)
 * PT -> BRL (R$)
 */
export function getCurrencyForRoute(route) {
  return route === 'pt' ? 'BRL' : 'USD';
}

/**
 * Derives the commercial market from the route prefix
 */
export function getMarketForRoute(route) {
  return route === 'pt' ? 'BR' : 'INTL';
}

/**
 * Derives the currency symbol for display
 */
export function getCurrencySymbolForRoute(route) {
  return route === 'pt' ? 'R$' : 'US$';
}

/**
 * Derives the document html lang attribute
 */
export function getHtmlLangForRoute(route) {
  return route === 'pt' ? 'pt-BR' : 'en';
}

/**
 * Retrieves the persisted language preference or falls back to 'en'
 */
export function getPersistedRoute() {
  if (typeof window === 'undefined') return DEFAULT_ROUTE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved && SUPPORTED_ROUTES.includes(saved)) {
      return saved;
    }
  } catch {
    // Storage access error
  }
  return DEFAULT_ROUTE;
}

/**
 * Persists the language preference
 */
export function persistRoute(route) {
  if (typeof window === 'undefined') return;
  try {
    if (SUPPORTED_ROUTES.includes(route)) {
      localStorage.setItem(STORAGE_KEY_LANG, route);
    }
  } catch {
    // Storage access error
  }
}
