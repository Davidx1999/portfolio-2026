import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { extractRouteInfo } from './RouteCurtainContext';
import {
  routeToLocale,
  getCurrencyForRoute,
  getMarketForRoute,
  getCurrencySymbolForRoute,
} from '../i18n/languageMapping';

/**
 * useLanguage
 * Clean bridge hook deriving language state directly from the active route.
 * URL is the single source of truth.
 */
export function useLanguage() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { lang: routeLang } = extractRouteInfo(location.pathname);

  const language = routeLang; // 'en' | 'pt'
  const locale = routeToLocale(routeLang); // 'en' | 'pt-BR'
  const currency = getCurrencyForRoute(routeLang); // 'USD' | 'BRL'
  const market = getMarketForRoute(routeLang); // 'INTL' | 'BR'
  const currencySymbol = getCurrencySymbolForRoute(routeLang); // 'US$' | 'R$'

  return {
    language,
    locale,
    currency,
    market,
    currencySymbol,
    t,
    i18n,
  };
}

export default useLanguage;
