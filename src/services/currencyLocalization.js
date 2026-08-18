/**
 * Currency Localization & Commercial Budget Engine
 * 
 * Strict Single Source of Truth:
 * - Route 'en' (Locale 'en')   -> Currency 'USD', Market 'INTL', Symbol 'US$'
 * - Route 'pt' (Locale 'pt-BR') -> Currency 'BRL', Market 'BR',   Symbol 'R$'
 * 
 * Budget tiers are independent commercial ranges (not currency conversions).
 */

export const DEFAULT_BUDGET_OPTIONS = [
  // Brasil (BRL - R$)
  { market: 'BR', currency: 'BRL', labelPt: 'Até R$2.500', labelEn: 'Up to R$2,500', order: 1, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'R$2.500–5.000', labelEn: 'R$2,500–5,000', order: 2, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'R$5.000–10.000', labelEn: 'R$5,000–10,000', order: 3, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'R$10.000–20.000', labelEn: 'R$10,000–20,000', order: 4, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'Acima de R$20.000', labelEn: 'Above R$20,000', order: 5, active: true },
  { market: 'BR', currency: 'BRL', labelPt: 'Ainda não defini', labelEn: 'Not defined yet', order: 6, active: true },

  // Internacional (USD - US$)
  { market: 'INTL', currency: 'USD', labelPt: 'Até US$1.000', labelEn: 'Under US$1,000', order: 1, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$1.000–2.500', labelEn: 'US$1,000–2,500', order: 2, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$2.500–5.000', labelEn: 'US$2,500–5,000', order: 3, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$5.000–10.000', labelEn: 'US$5,000–10,000', order: 4, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'US$10.000+', labelEn: 'US$10,000+', order: 5, active: true },
  { market: 'INTL', currency: 'USD', labelPt: 'Ainda não defini', labelEn: "I’m not sure yet", order: 6, active: true },
];

/**
 * Filter and format budget options by active currency and language
 */
export function getLocalizedBudgetOptions(rawOptions, activeLanguage = 'en') {
  const sourceOptions = Array.isArray(rawOptions) && rawOptions.length > 0
    ? rawOptions
    : DEFAULT_BUDGET_OPTIONS;

  const targetCurrency = activeLanguage === 'pt' ? 'BRL' : 'USD';
  const targetMarket = activeLanguage === 'pt' ? 'BR' : 'INTL';

  // Filter items matching active currency or market
  const filtered = sourceOptions.filter((opt) => {
    if (!opt) return false;
    if (opt.active === false) return false;
    if (opt.currency) return opt.currency.toUpperCase() === targetCurrency;
    if (opt.market) return opt.market.toUpperCase() === targetMarket;
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
    if (activeLanguage === 'pt') {
      return opt.labelPt || opt.labelEn || opt.title || 'Ainda não defini';
    }
    return opt.labelEn || opt.labelPt || opt.title || 'Not defined yet';
  });
}
