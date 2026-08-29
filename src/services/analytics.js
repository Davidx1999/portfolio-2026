/**
 * Google Analytics 4 (GA4) Service
 * Measurement ID: G-9RLX4CC4NK
 *
 * Implements strict privacy consent:
 * - gtag.js is NEVER loaded until explicit consent is granted.
 * - SPA pageview tracking is manually managed without duplicate triggers.
 * - generate_lead event contains strictly zero PII (no name, email, or message).
 */

export const GA_MEASUREMENT_ID = 'G-9RLX4CC4NK';
export const CONSENT_STORAGE_KEY = 'portfolio_analytics_consent';

/**
 * Get current consent status: 'granted' | 'denied' | null
 */
export function getAnalyticsConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if analytics consent has been granted
 */
export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === 'granted';
}

/**
 * Set and persist user's analytics consent choice
 * @param {'granted' | 'denied'} status
 */
export function setAnalyticsConsent(status) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch (err) {
    console.warn('[Analytics]: Failed to save consent in localStorage:', err);
  }

  if (status === 'granted') {
    initGA();
  }

  // Notify active listeners (hooks, banners)
  try {
    window.dispatchEvent(
      new CustomEvent('analytics_consent_changed', {
        detail: { consent: status },
      })
    );
  } catch {
    // Fallback for older environments
  }
}

/**
 * Initialize GA4 script and dataLayer only after consent is granted.
 */
export function initGA() {
  if (typeof window === 'undefined') return false;
  if (!hasAnalyticsConsent()) return false;
  if (window.__ga_initialized) return true;

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  // Disable automatic pageviews to manage SPA route transitions cleanly
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  // Inject gtag.js script if not already present
  if (!document.querySelector(`script[data-ga="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.setAttribute('data-ga', GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  window.__ga_initialized = true;
  return true;
}

/**
 * Track SPA page view manually
 * @param {string} path - URL path (e.g., '/en/work/mapear')
 * @param {string} [title] - Optional document title
 * @returns {boolean} - Returns true if event was actually dispatched, false otherwise
 */
export function trackPageView(path, title) {
  if (typeof window === 'undefined') return false;
  if (!hasAnalyticsConsent()) return false;

  initGA();

  if (typeof window.gtag === 'function') {
    const pageTitle = title || document.title;
    const pagePath = path || (window.location.pathname + window.location.search);
    const pageLocation = window.location.href;

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: pageLocation,
    });
    return true;
  }
  return false;
}

/**
 * Track contact form lead generation
 * Strictly ZERO Personally Identifiable Information (PII) is included.
 */
export function trackGenerateLead() {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  initGA();

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'contact_form',
    });
  }
}
