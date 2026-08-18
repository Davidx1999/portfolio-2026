import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractRouteInfo } from '../context/RouteCurtainContext';
import { getHtmlLangForRoute } from '../i18n/languageMapping';

const DOMAIN = 'https://davidsalviano.com';

export function SEOHead() {
  const location = useLocation();
  const { t } = useTranslation(['common', 'home', 'work', 'about', 'contact', 'case']);
  const { lang, unPrefixed } = extractRouteInfo(location.pathname);

  useEffect(() => {
    // 1. Update HTML lang attribute
    const htmlLang = getHtmlLangForRoute(lang);
    document.documentElement.lang = htmlLang;

    // 2. Derive Title and Description based on route
    let pageTitle = t('common:site_title', 'David Salviano — Product Designer');
    let pageDescription = t(
      'common:site_description',
      'Portfolio of David Salviano, Product Designer specialized in complex digital products and Design Systems.'
    );

    if (unPrefixed === '' || unPrefixed === '/') {
      pageTitle = lang === 'en'
        ? 'David Salviano — Product Designer'
        : 'David Salviano — Product Designer & Design Systems';
      pageDescription = lang === 'en'
        ? 'David Salviano is a Product Designer crafting the architecture, interfaces, and Design Systems behind complex digital platforms.'
        : 'David Salviano é Product Designer focado em arquitetura de informação, interfaces e Design Systems para produtos complexos.';
    } else if (unPrefixed.startsWith('/work')) {
      pageTitle = lang === 'en'
        ? 'Selected Work — David Salviano'
        : 'Trabalhos Selecionados — David Salviano';
      pageDescription = lang === 'en'
        ? 'Index of selected digital product case studies, design systems, and software architectures.'
        : 'Índice de estudos de caso selecionados de produtos digitais, design systems e arquitetura de software.';
    } else if (unPrefixed.startsWith('/about')) {
      pageTitle = lang === 'en'
        ? 'About — David Salviano'
        : 'Sobre Mim — David Salviano';
      pageDescription = lang === 'en'
        ? 'Learn about David Salviano’s background in illustration, visual systems, UX/UI, and product design.'
        : 'Conheça a trajetória de David Salviano em ilustração, sistemas visuais, UX/UI e design de produto.';
    } else if (unPrefixed.startsWith('/contact')) {
      pageTitle = lang === 'en'
        ? "Let's Talk — David Salviano"
        : 'Contato — David Salviano';
      pageDescription = lang === 'en'
        ? 'Start a project, inquire about consulting, or discuss collaboration on digital products.'
        : 'Inicie uma conversa sobre novos projetos, consultoria ou colaboração em produtos digitais.';
    }

    document.title = pageTitle;

    // 3. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageDescription;

    // 4. Update Canonical Link
    const cleanPath = unPrefixed === '/' ? '' : unPrefixed;
    const currentUrl = `${DOMAIN}/${lang}${cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // 5. Update hreflang Alternate Links
    const updateHreflang = (hreflang, href) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    updateHreflang('en', `${DOMAIN}/en${cleanPath}`);
    updateHreflang('pt-BR', `${DOMAIN}/pt${cleanPath}`);
    updateHreflang('x-default', `${DOMAIN}/en${cleanPath}`);

    // 6. Update OpenGraph Tags
    const updateMetaProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaProperty('og:title', pageTitle);
    updateMetaProperty('og:description', pageDescription);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:locale', lang === 'en' ? 'en_US' : 'pt_BR');
    updateMetaProperty('og:type', 'website');
  }, [lang, unPrefixed, t]);

  return null;
}

export default SEOHead;
