/**
 * Currency Localization & Market Budget Engine
 * 
 * Priority:
 * 1. Manual user choice (saved in localStorage)
 * 2. Explicit URL parameter (?currency=USD or ?currency=BRL)
 * 3. Selected site language (pt -> BRL, en -> USD)
 * 4. Country detected by IP (suggestion only, safe non-blocking query)
 * 5. Fallback (BRL)
 */

export const STORAGE_KEY_CURRENCY = 'portfolio_currency_choice';

export const DEFAULT_BUDGET_OPTIONS = [
  // Brasil (BRL)
  { market: 'BR', currency: 'BRL', labelPt: 'Até R$2.500', labelEn: 'Up to R$2,500', order: 1, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'R$2.500–5.000', labelEn: 'R$2,500–5,000', order: 2, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'R$5.000–10.000', labelEn: 'R$5,000–10,000', order: 3, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'R$10.000–20.000', labelEn: 'R$10,000–20,000', order: 4, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'Acima de R$20.000', labelEn: 'Above R$20,000', order: 5, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'Ainda não defini', labelEn: 'Not defined yet', order: 6, active: true },

  // Internacional (USD)
  { market: 'INTL', currency: 'USD', labelPt: 'Até US$1.000', labelEn: 'Under US$1,000', order: 1, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$1.000–2.500', labelEn: 'US$1,000–2,500', order: 2, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$2.500–5.000', labelEn: 'US$2,500–5,000', order: 3, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$5.000–10.000', labelEn: 'US$5,000–10,000', order: 4, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$10.000+', labelEn: 'US$10,000+', order: 5, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'Ainda não defini', labelEn: "I’m not sure yet", order: 6, active: true },
];

/**
 * Gets URL currency override if present (?currency=USD or ?currency=BRL)
 */
export function getUrlCurrency() {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const paramCurrency = params.get('currency') || params.get('curr') || params.get('cur');
    if (paramCurrency) {
      const normalized = paramCurrency.toUpperCase().trim();
      if (normalized === 'USD' || normalized === 'BRL') {
        return normalized;
      }
    }
    const paramMarket = params.get('market');
    if (paramMarket) {
      const normalizedMarket = paramMarket.toUpperCase().trim();
      if (normalizedMarket === 'BR' || normalizedMarket === 'BRL') return 'BRL';
      if (normalizedMarket === 'INTL' || normalizedMarket === 'USD') return 'USD';
    }
  } catch {
    // Ignore URL parse errors
  }
  return null;
}

/**
 * Gets stored currency from localStorage
 */
export function getSavedCurrency() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CURRENCY);
    if (saved === 'USD' || saved === 'BRL') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

/**
 * Saves manual currency choice to localStorage
 */
export function setSavedCurrency(currency) {
  if (typeof window === 'undefined') return;
  try {
    if (currency === 'USD' || currency === 'BRL') {
      localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
    }
  } catch {
    // Ignore storage errors
  }
}

/**
 * Resolves initial currency and detection source synchronously
 */
export function resolveInitialCurrency(language = 'pt') {
  // 1. Manual user choice
  const manual = getSavedCurrency();
  if (manual) {
    return {
      currency: manual,
      market: manual === 'BRL' ? 'BR' : 'INTL',
      source: 'manual',
    };
  }

  // 2. URL parameter
  const urlCurr = getUrlCurrency();
  if (urlCurr) {
    return {
      currency: urlCurr,
      market: urlCurr === 'BRL' ? 'BR' : 'INTL',
      source: 'url',
    };
  }

  // 3. Language preference
  if (language === 'en') {
    return {
      currency: 'USD',
      market: 'INTL',
      source: 'language',
    };
  }

  if (language === 'pt') {
    return {
      currency: 'BRL',
      market: 'BR',
      source: 'language',
    };
  }

  // 5. Default fallback
  return {
    currency: 'BRL',
    market: 'BR',
    source: 'fallback',
  };
}

/**
 * Optional safe, non-blocking IP country suggestion (with strict timeout)
 */
export async function detectCountryByIp() {
  if (typeof window === 'undefined') return null;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1400);

  try {
    // Fast, lightweight country-only lookup
    const response = await fetch('https://api.country.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.country && typeof data.country === 'string') {
        return data.country.toUpperCase();
      }
    }
  } catch {
    // Network fail, timeout, or adblocker blocked: silent fallback
  } finally {
    clearTimeout(timeoutId);
  }

  return null;
}

/**
 * Filter and format budget options by active currency and language
 */
export function getLocalizedBudgetOptions(rawOptions, activeCurrency = 'BRL', activeLanguage = 'pt') {
  const sourceOptions = Array.isArray(rawOptions) && rawOptions.length > 0
    ? rawOptions
    : DEFAULT_BUDGET_OPTIONS;

  const targetCurrency = activeCurrency === 'USD' ? 'USD' : 'BRL';

  // Filter items matching active currency or market
  const filtered = sourceOptions.filter((opt) => {
    if (!opt) return false;
    if (opt.active === false) return false;
    if (opt.currency) return opt.currency.toUpperCase() === targetCurrency;
    if (opt.market) {
      return targetCurrency === 'BRL' ? opt.market === 'BR' : opt.market === 'INTL';
    }
    return true;
  });

  // Fallback to default if empty
  const activeList = filtered.length > 0
    ? filtered
    : DEFAULT_BUDGET_OPTIONS.filter((opt) => opt.currency === targetCurrency);

  // Sort by order
  const sorted = [...activeList].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Map to display label string
  return sorted.map((opt) => {
    if (activeLanguage === 'en') {
      return opt.labelEn || opt.labelPt || opt.title || 'Other';
    }
    return opt.labelPt || opt.labelEn || opt.title || 'Outro';
  });
}
