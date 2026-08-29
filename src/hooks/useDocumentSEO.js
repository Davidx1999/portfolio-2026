import { useEffect } from 'react';
import { SITE_URL, DEFAULT_SHARE_IMAGE, getHreflangLinks } from '../config/seo';

/**
 * Single source of truth hook to manage head tags atomically without duplicates or race conditions.
 *
 * @param {Object} options
 * @param {string} options.title - Document title
 * @param {string} options.description - Meta description
 * @param {string} [options.canonicalUrl] - Canonical URL (defaults to current URL)
 * @param {string} [options.shareImage] - Absolute image URL for social preview
 * @param {string} [options.imageAlt] - Alt text for social image
 * @param {string} [options.type] - og:type ('website' | 'article')
 * @param {string} [options.lang] - Current route language ('en' | 'pt')
 * @param {string} [options.unprefixedPath] - Unprefixed path (e.g. '/work/mapear') for hreflangs
 * @param {boolean} [options.noIndex] - Whether to apply noindex, nofollow (for 404)
 * @param {Object} [options.structuredData] - Schema.org JSON-LD object
 */
export function useDocumentSEO({
  title,
  description,
  canonicalUrl,
  shareImage,
  imageAlt,
  type = 'website',
  lang = 'en',
  unprefixedPath = '',
  noIndex = false,
  structuredData = null,
} = {}) {
  useEffect(() => {
    if (!title && !description && !noIndex) return;

    // 1. Update HTML lang
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // 2. Update Document Title and broadcast deterministic SEO ready signal
    if (title && !title.startsWith('Loading')) {
      document.title = title;
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname + window.location.search;
        window.__last_ready_seo = {
          path: currentPath,
          title,
        };
        window.dispatchEvent(
          new CustomEvent('document_seo_ready', {
            detail: {
              path: currentPath,
              title,
            },
          })
        );
      }
    }

    // Helper to update or create meta tags by name
    const setMetaByName = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (content === null || content === undefined) {
        if (meta) meta.remove();
        return;
      }
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to update or create meta tags by property
    const setMetaByProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (content === null || content === undefined) {
        if (meta) meta.remove();
        return;
      }
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to update or create link tags by rel and optional hreflang
    const setLink = (rel, href, hreflang = null) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let link = document.querySelector(selector);
      if (!href) {
        if (link) link.remove();
        return;
      }
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (hreflang) link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 3. Robots / NoIndex
    if (noIndex) {
      setMetaByName('robots', 'noindex, nofollow');
      // Remove canonical and hreflangs for 404 pages
      setLink('canonical', null);
      setLink('alternate', null, 'en');
      setLink('alternate', null, 'pt-BR');
      setLink('alternate', null, 'x-default');
    } else {
      setMetaByName('robots', 'index, follow');

      // 4. Canonical & Hreflang
      const finalCanonical = canonicalUrl || `${SITE_URL}/${lang}${unprefixedPath === '/' ? '' : unprefixedPath}`;
      setLink('canonical', finalCanonical);

      const hreflangs = getHreflangLinks(unprefixedPath);
      hreflangs.forEach(({ hreflang, href }) => {
        setLink('alternate', href, hreflang);
      });
    }

    // 5. Meta Description
    setMetaByName('description', description);

    // 6. OpenGraph
    const finalImage = shareImage || DEFAULT_SHARE_IMAGE;
    const finalUrl = canonicalUrl || `${SITE_URL}/${lang}${unprefixedPath === '/' ? '' : unprefixedPath}`;

    setMetaByProperty('og:site_name', 'David Salviano');
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', finalUrl);
    setMetaByProperty('og:type', type);
    setMetaByProperty('og:locale', lang === 'pt' ? 'pt_BR' : 'en_US');
    setMetaByProperty('og:image', finalImage);
    // Explicitly clean up image alt if not provided on the new route
    setMetaByProperty('og:image:alt', imageAlt || null);

    // 7. Twitter Card (summary_large_image with no fake handle)
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', finalImage);
    // Explicitly clean up image alt if not provided on the new route
    setMetaByName('twitter:image:alt', imageAlt || null);

    // 8. Schema.org JSON-LD (Single unified managed script)
    // Remove any previous base or managed schema scripts to prevent duplicates
    const existingScripts = document.querySelectorAll('script[data-schema="managed-seo"], script[data-schema="base-seo"], script[data-schema="dynamic-seo"]');
    
    if (structuredData && !noIndex) {
      let managedScript = document.querySelector('script[data-schema="managed-seo"]');
      if (!managedScript) {
        managedScript = document.createElement('script');
        managedScript.setAttribute('type', 'application/ld+json');
        managedScript.setAttribute('data-schema', 'managed-seo');
        document.head.appendChild(managedScript);
      }
      managedScript.textContent = JSON.stringify(structuredData);

      // Remove any legacy/other schema scripts if present
      existingScripts.forEach((s) => {
        if (s !== managedScript) s.remove();
      });
    } else {
      existingScripts.forEach((s) => s.remove());
    }
  }, [
    title,
    description,
    canonicalUrl,
    shareImage,
    imageAlt,
    type,
    lang,
    unprefixedPath,
    noIndex,
    structuredData,
  ]);
}

export default useDocumentSEO;
