import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const SITE_URL = 'https://davidsalvianodesign.com';
const FALLBACK_SHARE_IMAGE = `${SITE_URL}/assets/profile/cases_hands.png`;

// Sanity client for fetching published projects
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'pjq90dr2',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
});

/**
 * Helper to safely extract string from localized fields
 */
function resolveLocalized(field, lang = 'en') {
  if (!field) return '';
  if (typeof field === 'string') return field.trim();
  if (typeof field === 'object') {
    if (lang === 'pt' || lang === 'pt-BR') {
      return (field.ptBR || field.pt_BR || field.pt || field.en || Object.values(field)[0] || '').trim();
    }
    return (field.en || field.ptBR || field.pt || Object.values(field)[0] || '').trim();
  }
  return '';
}

/**
 * Replace head metadata tags cleanly without leaving duplicates
 */
function injectHeadMetadata(htmlTemplate, meta) {
  const {
    lang = 'en',
    title,
    description,
    canonicalUrl,
    hreflangs = [],
    ogType = 'website',
    ogLocale = 'en_US',
    ogTitle,
    ogDescription,
    ogImage,
    ogImageAlt,
    twitterTitle,
    twitterDescription,
    twitterImage,
    noIndex = false,
    structuredData = null,
  } = meta;

  // 1. Update <html lang="...">
  let modifiedHtml = htmlTemplate.replace(/<html[^>]*>/i, `<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">`);

  // 2. Remove existing meta/link/comment tags that will be replaced
  modifiedHtml = modifiedHtml
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<link\s+rel="alternate"[^>]*hreflang[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<!--\s*(Canonical|OpenGraph|Twitter|Structured Data)[^>]*-->/gi, '')
    .replace(/\n\s*\n\s*\n/g, '\n');

  // 3. Build new head tags block
  const lines = [];

  if (title) lines.push(`  <title>${escapeHtml(title)}</title>`);
  if (description) lines.push(`  <meta name="description" content="${escapeHtml(description)}" />`);

  if (noIndex) {
    lines.push(`  <meta name="robots" content="noindex, nofollow" />`);
  } else {
    lines.push(`  <meta name="robots" content="index, follow" />`);

    if (canonicalUrl) {
      lines.push(`  <link rel="canonical" href="${canonicalUrl}" />`);
    }

    hreflangs.forEach(({ hreflang, href }) => {
      lines.push(`  <link rel="alternate" hreflang="${hreflang}" href="${href}" />`);
    });

    // OpenGraph
    lines.push(`  <meta property="og:site_name" content="David Salviano" />`);
    lines.push(`  <meta property="og:title" content="${escapeHtml(ogTitle || title)}" />`);
    lines.push(`  <meta property="og:description" content="${escapeHtml(ogDescription || description)}" />`);
    lines.push(`  <meta property="og:url" content="${canonicalUrl || SITE_URL}" />`);
    lines.push(`  <meta property="og:type" content="${ogType}" />`);
    lines.push(`  <meta property="og:locale" content="${ogLocale}" />`);
    lines.push(`  <meta property="og:image" content="${ogImage || FALLBACK_SHARE_IMAGE}" />`);
    if (ogImageAlt) {
      lines.push(`  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />`);
    }

    // Twitter Card
    lines.push(`  <meta name="twitter:card" content="summary_large_image" />`);
    lines.push(`  <meta name="twitter:title" content="${escapeHtml(twitterTitle || ogTitle || title)}" />`);
    lines.push(`  <meta name="twitter:description" content="${escapeHtml(twitterDescription || ogDescription || description)}" />`);
    lines.push(`  <meta name="twitter:image" content="${twitterImage || ogImage || FALLBACK_SHARE_IMAGE}" />`);
    if (ogImageAlt) {
      lines.push(`  <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />`);
    }

    // Structured Data JSON-LD
    if (structuredData) {
      lines.push(`  <script type="application/ld+json" data-schema="managed-seo">\n${JSON.stringify(structuredData, null, 2)}\n  </script>`);
    }
  }

  const metaBlock = lines.join('\n');

  // Insert cleanly right before </head>
  return modifiedHtml.replace('</head>', `${metaBlock}\n</head>`);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function run() {
  console.log('🚀 [SEO Build]: Iniciando geração de sitemap, robots e prerender estático...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ [SEO Build]: Diretório dist/ não encontrado. Execute o vite build antes.');
    process.exit(1);
  }

  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ [SEO Build]: Arquivo dist/index.html não encontrado.');
    process.exit(1);
  }

  // 1. Fetch published projects from Sanity ONCE
  let projects = [];
  try {
    console.log('📡 [SEO Build]: Consultando projetos publicados na API do Sanity...');
    projects = await client.fetch(
      `*[_type == "project" && published != false && !(_id in path("drafts.**"))]{
        _id,
        _updatedAt,
        title,
        shortDescription,
        description,
        slug,
        "shareImageUrl": seo.shareImage.asset->url,
        "coverImageUrl": coverImage.asset->url,
        "seoTitle": seo.title,
        "seoDescription": seo.description
      }`
    );

    if (!Array.isArray(projects) || projects.length === 0) {
      throw new Error('Nenhum projeto publicado retornado pelo Sanity. Verifique as publicações dos documentos.');
    }
    console.log(`✅ [SEO Build]: ${projects.length} projetos publicados recuperados com sucesso.`);
  } catch (err) {
    console.error('❌ [SEO Build]: Falha crítica ao consultar o Sanity:', err.message);
    process.exit(1);
  }

  // Verify that the universal fallback share image exists in dist
  const fallbackLocalPath = path.join(distDir, 'assets', 'profile', 'cases_hands.png');
  if (!fs.existsSync(fallbackLocalPath)) {
    console.error(`❌ [SEO Build]: Imagem de fallback não encontrada em ${fallbackLocalPath}.`);
    process.exit(1);
  }

  const baseHtmlTemplate = fs.readFileSync(indexHtmlPath, 'utf8');

  // 2. Generate dist/robots.txt directly in dist
  const robotsTxtContent = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxtContent, 'utf8');
  console.log('✅ [SEO Build]: dist/robots.txt gerado com sucesso.');

  // 3. Static routes definition
  const staticRoutes = [
    {
      unprefixed: '',
      en: {
        title: 'David Salviano | Product Designer & Interface Architecture',
        description: 'David Salviano is a Senior Product Designer crafting scalable interface architectures, complex digital systems, and high-agency design solutions.',
      },
      pt: {
        title: 'David Salviano | Product Designer & Design Systems',
        description: 'David Salviano é Product Designer sênior focado em arquitetura de interfaces, Design Systems e sistemas digitais complexos de alta agência.',
      },
      changefreq: 'monthly',
      priority: '1.0',
    },
    {
      unprefixed: '/work',
      en: {
        title: 'Selected Work | David Salviano',
        description: 'Index of selected digital product case studies, design systems, and software architectures by David Salviano.',
      },
      pt: {
        title: 'Trabalhos Selecionados | David Salviano',
        description: 'Índice de estudos de caso selecionados de produtos digitais, design systems e arquitetura de software por David Salviano.',
      },
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      unprefixed: '/about',
      en: {
        title: 'About | David Salviano',
        description: 'Learn about David Salviano’s background in illustration, visual systems, UX/UI, and digital product design.',
      },
      pt: {
        title: 'Sobre Mim | David Salviano',
        description: 'Conheça a trajetória de David Salviano em ilustração, sistemas visuais, UX/UI e design de produto digital.',
      },
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      unprefixed: '/contact',
      en: {
        title: "Let's Talk | David Salviano",
        description: 'Start a conversation about new digital product opportunities, consulting, or software architecture collaboration.',
      },
      pt: {
        title: 'Contato | David Salviano',
        description: 'Inicie uma conversa sobre novos projetos de produtos digitais, consultoria ou colaboração em design de interfaces.',
      },
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  // 4. Generate dist/sitemap.xml
  const sitemapUrls = [];

  // Static routes in sitemap
  staticRoutes.forEach((route) => {
    const cleanPath = route.unprefixed === '' ? '' : route.unprefixed;
    ['en', 'pt'].forEach((lang) => {
      sitemapUrls.push(`  <url>
    <loc>${SITE_URL}/${lang}${cleanPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en${cleanPath}" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt${cleanPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${cleanPath}" />
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
    });
  });

  // Project routes in sitemap
  projects.forEach((proj) => {
    const slug = proj.slug?.current;
    if (!slug) return;
    const lastMod = proj._updatedAt ? new Date(proj._updatedAt).toISOString() : new Date().toISOString();

    ['en', 'pt'].forEach((lang) => {
      sitemapUrls.push(`  <url>
    <loc>${SITE_URL}/${lang}/work/${slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/work/${slug}" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt/work/${slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/work/${slug}" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
    });
  });

  const sitemapXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXmlContent, 'utf8');
  console.log('✅ [SEO Build]: dist/sitemap.xml gerado com sucesso.');

  // 5. Prerender static HTML files per route
  console.log('🔨 [SEO Build]: Pré-renderizando HTML estático por rota...');

  const writePrerenderedFile = (relativeRoutePath, htmlContent) => {
    // E.g. 'en/work/mapear' -> dist/en/work/mapear/index.html
    const targetDir = path.join(distDir, relativeRoutePath);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');
  };

  // 5.1 Prerender static pages
  staticRoutes.forEach((route) => {
    ['en', 'pt'].forEach((lang) => {
      const localeData = route[lang];
      const cleanPath = route.unprefixed === '' ? '' : route.unprefixed;
      const canonicalUrl = `${SITE_URL}/${lang}${cleanPath}`;
      const hreflangs = [
        { hreflang: 'en', href: `${SITE_URL}/en${cleanPath}` },
        { hreflang: 'pt-BR', href: `${SITE_URL}/pt${cleanPath}` },
        { hreflang: 'x-default', href: `${SITE_URL}/en${cleanPath}` },
      ];

      const structuredData =
        route.unprefixed === ''
          ? {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'David Salviano',
              jobTitle: 'Senior Product Designer',
              url: SITE_URL,
              sameAs: [
                'https://www.linkedin.com/in/david-salviano-12b41b264/',
              ],
              image: FALLBACK_SHARE_IMAGE,
              description: localeData.description,
            }
          : null;

      const html = injectHeadMetadata(baseHtmlTemplate, {
        lang,
        title: localeData.title,
        description: localeData.description,
        canonicalUrl,
        hreflangs,
        ogType: 'website',
        ogLocale: lang === 'pt' ? 'pt_BR' : 'en_US',
        ogTitle: localeData.title,
        ogDescription: localeData.description,
        ogImage: FALLBACK_SHARE_IMAGE,
        ogImageAlt: 'David Salviano | Product Designer',
        structuredData,
      });

      const routeKey = cleanPath === '' ? lang : `${lang}${cleanPath}`;
      writePrerenderedFile(routeKey, html);
    });
  });

  // 5.2 Prerender project case studies
  projects.forEach((proj) => {
    const slug = proj.slug?.current;
    if (!slug) {
      console.error(`❌ [SEO Build]: Projeto ${proj._id} não possui slug válido.`);
      process.exit(1);
    }

    const shareImage = proj.shareImageUrl || proj.coverImageUrl || FALLBACK_SHARE_IMAGE;

    ['en', 'pt'].forEach((lang) => {
      const displayTitle = resolveLocalized(proj.title, lang) || 'Untitled Case';
      const metaTitle = resolveLocalized(proj.seoTitle, lang) || `${displayTitle} | David Salviano`;
      const metaDescription =
        resolveLocalized(proj.seoDescription, lang) ||
        resolveLocalized(proj.shortDescription, lang) ||
        resolveLocalized(proj.description, lang) ||
        `${displayTitle} Case Study by David Salviano.`;

      // Strict validation: must not be empty
      if (!metaTitle || !metaDescription || !shareImage) {
        console.error(
          `❌ [SEO Build]: Metadados obrigatórios ausentes no case "${slug}" (${lang}): title="${metaTitle}", desc="${metaDescription}", image="${shareImage}"`
        );
        process.exit(1);
      }

      const canonicalUrl = `${SITE_URL}/${lang}/work/${slug}`;
      const hreflangs = [
        { hreflang: 'en', href: `${SITE_URL}/en/work/${slug}` },
        { hreflang: 'pt-BR', href: `${SITE_URL}/pt/work/${slug}` },
        { hreflang: 'x-default', href: `${SITE_URL}/en/work/${slug}` },
      ];

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: displayTitle,
        headline: metaTitle,
        description: metaDescription,
        url: canonicalUrl,
        image: shareImage,
        author: {
          '@type': 'Person',
          name: 'David Salviano',
          url: SITE_URL,
        },
        creator: {
          '@type': 'Person',
          name: 'David Salviano',
        },
        inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
      };

      const html = injectHeadMetadata(baseHtmlTemplate, {
        lang,
        title: metaTitle,
        description: metaDescription,
        canonicalUrl,
        hreflangs,
        ogType: 'article',
        ogLocale: lang === 'pt' ? 'pt_BR' : 'en_US',
        ogTitle: metaTitle,
        ogDescription: metaDescription,
        ogImage: shareImage,
        ogImageAlt: `${displayTitle} - David Salviano Case Study`,
        twitterTitle: metaTitle,
        twitterDescription: metaDescription,
        twitterImage: shareImage,
        structuredData,
      });

      writePrerenderedFile(`${lang}/work/${slug}`, html);
    });
  });

  // 5.3 Prerender 404.html with noindex
  const notFoundHtml = injectHeadMetadata(baseHtmlTemplate, {
    lang: 'en',
    title: 'Page Not Found | David Salviano',
    description: 'The requested page could not be found.',
    noIndex: true,
  });
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');

  console.log('🎉 [SEO Build]: Pré-renderização e SEO concluídos com 100% de sucesso!');
}

run();
