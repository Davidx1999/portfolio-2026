/**
 * Centralized SEO & Social Configuration
 * Official Domain: https://davidsalvianodesign.com
 */

export const SITE_URL =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
    ? import.meta.env.VITE_SITE_URL.replace(/\/+$/, '')
    : 'https://davidsalvianodesign.com';

// Real approved asset for universal fallback
export const DEFAULT_SHARE_IMAGE = `${SITE_URL}/assets/profile/cases_hands.png`;

export const SEO_CONFIG = {
  siteName: 'David Salviano',
  siteUrl: SITE_URL,
  defaultShareImage: DEFAULT_SHARE_IMAGE,
  locales: {
    en: {
      locale: 'en_US',
      htmlLang: 'en',
      title: 'David Salviano | Product Designer & Interface Architecture',
      description:
        'David Salviano is a Senior Product Designer crafting scalable interface architectures, complex digital systems, and high-agency design solutions.',
      workTitle: 'Selected Work | David Salviano',
      workDescription:
        'Index of selected digital product case studies, design systems, and software architectures by David Salviano.',
      aboutTitle: 'About | David Salviano',
      aboutDescription:
        'Learn about David Salviano’s background in illustration, visual systems, UX/UI, and digital product design.',
      contactTitle: "Let's Talk | David Salviano",
      contactDescription:
        'Start a conversation about new digital product opportunities, consulting, or software architecture collaboration.',
    },
    pt: {
      locale: 'pt_BR',
      htmlLang: 'pt-BR',
      title: 'David Salviano | Product Designer & Design Systems',
      description:
        'David Salviano é Product Designer sênior focado em arquitetura de interfaces, Design Systems e sistemas digitais complexos de alta agência.',
      workTitle: 'Trabalhos Selecionados | David Salviano',
      workDescription:
        'Índice de estudos de caso selecionados de produtos digitais, design systems e arquitetura de software por David Salviano.',
      aboutTitle: 'Sobre Mim | David Salviano',
      aboutDescription:
        'Conheça a trajetória de David Salviano em ilustração, sistemas visuais, UX/UI e design de produto digital.',
      contactTitle: 'Contato | David Salviano',
      contactDescription:
        'Inicie uma conversa sobre novos projetos de produtos digitais, consultoria ou colaboração em design de interfaces.',
    },
  },
};

/**
 * Helper to build absolute URLs using the official domain
 */
export function getAbsoluteUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Helper to build bilingual hreflangs for a given un-prefixed pathname
 */
export function getHreflangLinks(unprefixedPath = '') {
  const cleanPath = unprefixedPath === '/' || unprefixedPath === '' ? '' : unprefixedPath.startsWith('/') ? unprefixedPath : `/${unprefixedPath}`;
  return [
    { hreflang: 'en', href: `${SITE_URL}/en${cleanPath}` },
    { hreflang: 'pt-BR', href: `${SITE_URL}/pt${cleanPath}` },
    { hreflang: 'x-default', href: `${SITE_URL}/en${cleanPath}` },
  ];
}
