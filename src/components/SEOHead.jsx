import { useLocation } from 'react-router-dom';
import { extractRouteInfo } from '../context/RouteCurtainContext';
import { SEO_CONFIG, SITE_URL } from '../config/seo';
import { useDocumentSEO } from '../hooks/useDocumentSEO';

/**
 * Top-level SEO Head manager for static portfolio routes.
 * Case studies (/work/:slug) are handled exclusively by CaseStudyPage to prevent race conditions.
 */
export function SEOHead() {
  const location = useLocation();
  const { lang, unPrefixed } = extractRouteInfo(location.pathname);

  const isCaseStudyRoute =
    unPrefixed.startsWith('/work/') && unPrefixed.split('/').filter(Boolean).length === 2;

  const currentLocale = lang === 'pt' ? SEO_CONFIG.locales.pt : SEO_CONFIG.locales.en;

  let pageTitle = currentLocale.title;
  let pageDescription = currentLocale.description;
  let isKnownRoute = true;

  // Exact matching for routes to ensure sub-paths (e.g. /en/about/xyz) receive noindex
  if (unPrefixed === '' || unPrefixed === '/') {
    pageTitle = currentLocale.title;
    pageDescription = currentLocale.description;
  } else if (unPrefixed === '/work' || unPrefixed === '/work/') {
    pageTitle = currentLocale.workTitle;
    pageDescription = currentLocale.workDescription;
  } else if (unPrefixed === '/about' || unPrefixed === '/about/') {
    pageTitle = currentLocale.aboutTitle;
    pageDescription = currentLocale.aboutDescription;
  } else if (unPrefixed === '/contact' || unPrefixed === '/contact/') {
    pageTitle = currentLocale.contactTitle;
    pageDescription = currentLocale.contactDescription;
  } else if (!isCaseStudyRoute) {
    isKnownRoute = false;
  }

  // Schema.org JSON-LD for Home & Person with real LinkedIn profile
  const structuredData =
    (unPrefixed === '' || unPrefixed === '/')
      ? {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'David Salviano',
          jobTitle: 'Senior Product Designer',
          url: SITE_URL,
          sameAs: [
            'https://www.linkedin.com/in/david-salviano-12b41b264/',
          ],
          description: currentLocale.description,
        }
      : null;

  useDocumentSEO({
    title: isCaseStudyRoute ? null : isKnownRoute ? pageTitle : 'Page Not Found | David Salviano',
    description: isCaseStudyRoute ? null : isKnownRoute ? pageDescription : 'The requested page could not be found.',
    lang,
    unprefixedPath: unPrefixed,
    type: 'website',
    noIndex: !isKnownRoute && !isCaseStudyRoute,
    structuredData: isCaseStudyRoute ? null : structuredData,
  });

  return null;
}

export default SEOHead;
