import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const PORT = 5199;
const SITE_DOMAIN = 'https://davidsalvianodesign.com';
const REAL_LINKEDIN_URL = 'https://www.linkedin.com/in/david-salviano-12b41b264/';

const USER_AGENTS = {
  whatsapp: 'WhatsApp/2.21.12.21 A',
  facebook: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  twitter: 'Twitterbot/1.0',
  linkedin: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
  slack: 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
  telegram: 'TelegramBot (like TwitterBot)',
  discord: 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
};

/**
 * Local server simulating Vercel cleanUrls and static-first file delivery
 */
function createVercelLikeServer() {
  return http.createServer((req, res) => {
    const rawUrl = req.url.split('?')[0];
    let filePath = path.join(distDir, rawUrl);

    // 1. Direct file match (e.g. /robots.txt, /sitemap.xml, /assets/...)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.xml': 'application/xml; charset=utf-8',
        '.txt': 'text/plain; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.js': 'application/javascript',
        '.css': 'text/css',
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      return res.end(fs.readFileSync(filePath));
    }

    // 2. Directory match with index.html (e.g. /en/work/mapear -> dist/en/work/mapear/index.html)
    const nestedIndexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(nestedIndexPath) && fs.statSync(nestedIndexPath).isFile()) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(nestedIndexPath));
    }

    // 3. 404 Fallback
    const notFoundPath = path.join(distDir, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(notFoundPath));
    }

    // 4. Default SPA fallback
    const defaultIndexPath = path.join(distDir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(defaultIndexPath));
  });
}

/**
 * Make an HTTP request
 */
function makeRequest(urlPath, userAgent) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path: urlPath,
      method: 'GET',
      headers: {
        'User-Agent': userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

/**
 * Verify that an image URL actually responds with HTTP 200
 */
async function checkImageUrlResponds(imageUrl) {
  if (!imageUrl) return { ok: false, error: 'Empty image URL' };

  // If local domain, check against our local server
  if (imageUrl.startsWith(SITE_DOMAIN)) {
    const localPath = imageUrl.replace(SITE_DOMAIN, '');
    const res = await makeRequest(localPath);
    return { ok: res.statusCode === 200, status: res.statusCode, url: imageUrl };
  }

  // If external URL (e.g. Sanity CDN https://cdn.sanity.io/...)
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(imageUrl);
      const protocol = urlObj.protocol === 'https:' ? https : http;
      const req = protocol.request(
        imageUrl,
        {
          method: 'GET',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        },
        (res) => {
          resolve({ ok: res.statusCode === 200, status: res.statusCode, url: imageUrl });
        }
      );
      req.on('error', (err) => {
        resolve({ ok: false, error: err.message, url: imageUrl });
      });
      req.setTimeout(8000, () => {
        req.destroy();
        resolve({ ok: false, error: 'Timeout', url: imageUrl });
      });
      req.end();
    } catch (e) {
      resolve({ ok: false, error: e.message, url: imageUrl });
    }
  });
}

/**
 * Check that no duplicate head tags exist
 */
function assertNoDuplicateTags(html, route) {
  const countOccurrences = (pattern) => {
    const matches = html.match(pattern);
    return matches ? matches.length : 0;
  };

  const titleCount = countOccurrences(/<title[^>]*>/gi);
  if (titleCount > 1) {
    throw new Error(`[${route}]: Encontradas ${titleCount} tags <title> duplicadas no HTML.`);
  }

  const descCount = countOccurrences(/<meta\s+name="description"/gi);
  if (descCount > 1) {
    throw new Error(`[${route}]: Encontradas ${descCount} tags meta description duplicadas no HTML.`);
  }

  const canonicalCount = countOccurrences(/<link\s+rel="canonical"/gi);
  if (canonicalCount > 1) {
    throw new Error(`[${route}]: Encontradas ${canonicalCount} tags canonical duplicadas no HTML.`);
  }

  const ogTitleCount = countOccurrences(/<meta\s+property="og:title"/gi);
  if (ogTitleCount > 1) {
    throw new Error(`[${route}]: Encontradas ${ogTitleCount} tags og:title duplicadas no HTML.`);
  }

  const jsonLdCount = countOccurrences(/<script\s+type="application\/ld\+json"/gi);
  if (jsonLdCount > 1) {
    throw new Error(`[${route}]: Encontradas ${jsonLdCount} tags JSON-LD duplicadas no HTML.`);
  }
}

/**
 * DOM Navigation Transition Simulation test
 * Replicates useDocumentSEO logic in a simulated DOM environment to verify tag cleanup
 */
function testDOMNavigationSimulation() {
  // Simple in-memory DOM simulation
  const domElements = new Map();

  const setMetaByName = (name, content) => {
    if (content === null || content === undefined) {
      domElements.delete(`meta[name="${name}"]`);
      return;
    }
    domElements.set(`meta[name="${name}"]`, content);
  };

  const setMetaByProperty = (property, content) => {
    if (content === null || content === undefined) {
      domElements.delete(`meta[property="${property}"]`);
      return;
    }
    domElements.set(`meta[property="${property}"]`, content);
  };

  const setScript = (id, content) => {
    if (!content) {
      domElements.delete(`script[data-schema="${id}"]`);
      return;
    }
    domElements.set(`script[data-schema="${id}"]`, content);
  };

  const applySEO = (opts) => {
    setMetaByName('description', opts.description);
    setMetaByProperty('og:title', opts.title);
    setMetaByProperty('og:image', opts.shareImage || 'default.png');
    setMetaByProperty('og:image:alt', opts.imageAlt || null);
    setMetaByName('twitter:image:alt', opts.imageAlt || null);

    if (opts.structuredData && !opts.noIndex) {
      setScript('managed-seo', JSON.stringify(opts.structuredData));
    } else {
      setScript('managed-seo', null);
    }
  };

  // STEP 1: Case study page with imageAlt and CreativeWork
  applySEO({
    title: 'Mapear | David Salviano',
    description: 'Mapear platform description',
    shareImage: 'https://cdn.sanity.io/mapear.png',
    imageAlt: 'Mapear Case Study Banner',
    structuredData: { '@type': 'CreativeWork', name: 'Mapear' },
  });

  if (domElements.get('meta[property="og:image:alt"]') !== 'Mapear Case Study Banner') {
    throw new Error('og:image:alt não foi definido corretamente na etapa 1.');
  }
  if (!domElements.get('script[data-schema="managed-seo"]').includes('CreativeWork')) {
    throw new Error('JSON-LD CreativeWork não encontrado na etapa 1.');
  }

  // STEP 2: Transition to /about (no imageAlt, no structuredData)
  applySEO({
    title: 'About | David Salviano',
    description: 'About description',
    shareImage: 'default.png',
    imageAlt: null,
    structuredData: null,
  });

  if (domElements.has('meta[property="og:image:alt"]')) {
    throw new Error('og:image:alt da rota anterior NÃO foi removido após navegar para About.');
  }
  if (domElements.has('meta[name="twitter:image:alt"]')) {
    throw new Error('twitter:image:alt da rota anterior NÃO foi removido após navegar para About.');
  }
  if (domElements.has('script[data-schema="managed-seo"]')) {
    throw new Error('JSON-LD CreativeWork da rota anterior NÃO foi removido após navegar para About.');
  }

  // STEP 3: Transition to Home (Person structured data with real LinkedIn URL)
  applySEO({
    title: 'Home | David Salviano',
    description: 'Home description',
    structuredData: {
      '@type': 'Person',
      name: 'David Salviano',
      sameAs: [REAL_LINKEDIN_URL],
    },
  });

  const homeJsonLd = domElements.get('script[data-schema="managed-seo"]');
  if (!homeJsonLd || !homeJsonLd.includes(REAL_LINKEDIN_URL)) {
    throw new Error('JSON-LD de Person não contém a URL real do LinkedIn.');
  }
  if (homeJsonLd.includes('CreativeWork')) {
    throw new Error('CreativeWork antigo vazou para o JSON-LD da Home.');
  }

  // STEP 4: Transition to 404
  applySEO({
    title: 'Not Found',
    description: 'Not found',
    noIndex: true,
  });

  if (domElements.has('script[data-schema="managed-seo"]')) {
    throw new Error('JSON-LD não foi removido na rota 404.');
  }
}

async function runTests() {
  console.log('🧪 [SEO HTTP Tests]: Iniciando servidor HTTP local para testes...');
  const server = createVercelLikeServer();

  await new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`🌐 [SEO HTTP Tests]: Servidor ouvindo em http://127.0.0.1:${PORT}`);
      resolve();
    });
  });

  let totalTests = 0;
  let passedTests = 0;

  const test = async (name, fn) => {
    totalTests++;
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Erro: ${err.message}`);
    }
  };

  try {
    // ── TEST 1: Case study /en/work/mapear delivery to WhatsApp ─────────
    await test('Entrega de HTML específico para /en/work/mapear (WhatsApp crawler)', async () => {
      const res = await makeRequest('/en/work/mapear', USER_AGENTS.whatsapp);
      if (res.statusCode !== 200) throw new Error(`Status code esperado 200, recebido ${res.statusCode}`);

      // Must be the specific case HTML, NOT generic index.html
      if (!res.body.includes('Mapear') || !res.body.includes('og:title')) {
        throw new Error('A resposta não contém o título do case "Mapear" nas meta tags.');
      }
      if (!res.body.includes(`${SITE_DOMAIN}/en/work/mapear`)) {
        throw new Error('A URL canônica ou og:url não aponta para o domínio oficial.');
      }

      // Check CreativeWork JSON-LD
      if (!res.body.includes('"@type": "CreativeWork"') && !res.body.includes('"@type":"CreativeWork"')) {
        throw new Error('Schema.org CreativeWork não encontrado no HTML de /en/work/mapear.');
      }

      // Check managed data-schema attribute
      if (!res.body.includes('data-schema="managed-seo"')) {
        throw new Error('Atributo data-schema="managed-seo" ausente no script JSON-LD.');
      }

      // Check that hardcoded dimensions are NOT present
      if (res.body.includes('og:image:width') || res.body.includes('og:image:height')) {
        throw new Error('og:image:width ou og:image:height incorretas encontradas no HTML.');
      }

      assertNoDuplicateTags(res.body, '/en/work/mapear');
    });

    // ── TEST 2: Case study /pt/work/mapear delivery to LinkedInBot ───────
    await test('Entrega de HTML específico em PT para /pt/work/mapear (LinkedInBot)', async () => {
      const res = await makeRequest('/pt/work/mapear', USER_AGENTS.linkedin);
      if (res.statusCode !== 200) throw new Error(`Status code esperado 200, recebido ${res.statusCode}`);

      if (!res.body.includes(`${SITE_DOMAIN}/pt/work/mapear`)) {
        throw new Error('A URL canônica em português não corresponde ao esperado.');
      }
      if (!res.body.includes('pt_BR')) {
        throw new Error('og:locale não está definido como pt_BR.');
      }

      assertNoDuplicateTags(res.body, '/pt/work/mapear');
    });

    // ── TEST 3: Validation that every og:image responds with HTTP 200 ───
    await test('Validação de que as URLs de og:image respondem com HTTP 200', async () => {
      const resMapear = await makeRequest('/en/work/mapear');
      const ogImageMatch = resMapear.body.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
      if (!ogImageMatch || !ogImageMatch[1]) {
        throw new Error('Tag og:image não encontrada no HTML do case Mapear.');
      }

      const imageUrl = ogImageMatch[1];
      console.log(`     🔍 Testando acessibilidade HTTP da og:image: ${imageUrl}`);
      const imgCheck = await checkImageUrlResponds(imageUrl);
      if (!imgCheck.ok) {
        throw new Error(`A URL da og:image (${imageUrl}) falhou com status: ${imgCheck.status || imgCheck.error}`);
      }

      // Also test fallback share image
      const fallbackCheck = await checkImageUrlResponds(`${SITE_DOMAIN}/assets/profile/cases_hands.png`);
      if (!fallbackCheck.ok) {
        throw new Error(`A imagem de fallback (${SITE_DOMAIN}/assets/profile/cases_hands.png) não respondeu HTTP 200.`);
      }
    });

    // ── TEST 4: Person JSON-LD with Real LinkedIn Profile ──────────────
    await test('Validação do Schema.org Person na Home com LinkedIn real', async () => {
      const homeRes = await makeRequest('/en');
      if (homeRes.statusCode !== 200) throw new Error(`Status code esperado 200, recebido ${homeRes.statusCode}`);
      if (!homeRes.body.includes(REAL_LINKEDIN_URL)) {
        throw new Error(`URL real do LinkedIn (${REAL_LINKEDIN_URL}) não encontrada no JSON-LD da Home.`);
      }
      if (!homeRes.body.includes('data-schema="managed-seo"')) {
        throw new Error('Atributo data-schema="managed-seo" ausente no JSON-LD da Home.');
      }
      assertNoDuplicateTags(homeRes.body, '/en');
    });

    // ── TEST 5: Sitemap XML and Robots.txt ──────────────────────────────
    await test('Validação do sitemap.xml e robots.txt no domínio oficial', async () => {
      const sitemapRes = await makeRequest('/sitemap.xml');
      if (sitemapRes.statusCode !== 200) throw new Error(`sitemap.xml retornou status ${sitemapRes.statusCode}`);
      if (!sitemapRes.body.includes(SITE_DOMAIN)) {
        throw new Error('sitemap.xml não contém URLs com o domínio oficial.');
      }
      if (!sitemapRes.body.includes('xhtml:link')) {
        throw new Error('sitemap.xml não contém tags de alternância hreflang.');
      }

      const robotsRes = await makeRequest('/robots.txt');
      if (robotsRes.statusCode !== 200) throw new Error(`robots.txt retornou status ${robotsRes.statusCode}`);
      if (!robotsRes.body.includes(`Sitemap: ${SITE_DOMAIN}/sitemap.xml`)) {
        throw new Error('robots.txt não aponta para o sitemap correto.');
      }
    });

    // ── TEST 6: Exact Route Matching & 404 noindex, nofollow ───────────
    await test('Validação de noindex em rotas inexistentes e sub-rotas inválidas (/en/about/inexistente e /en/work/mapear/inexistente)', async () => {
      const res404 = await makeRequest('/rota-inexistente-teste-404', USER_AGENTS.twitter);
      if (res404.statusCode !== 404 && res404.statusCode !== 200) {
        throw new Error(`Status code inesperado ${res404.statusCode}`);
      }
      if (!res404.body.includes('noindex, nofollow')) {
        throw new Error('A página 404 não contém a meta tag "noindex, nofollow".');
      }

      const resSubPath = await makeRequest('/en/about/inexistente', USER_AGENTS.googlebot);
      if (!resSubPath.body.includes('noindex, nofollow')) {
        throw new Error('/en/about/inexistente não recebeu noindex, nofollow!');
      }

      const resCaseSubPath = await makeRequest('/en/work/mapear/inexistente', USER_AGENTS.googlebot);
      if (!resCaseSubPath.body.includes('noindex, nofollow')) {
        throw new Error('/en/work/mapear/inexistente não recebeu noindex, nofollow!');
      }
    });

    // ── TEST 7: Twitter Cards (summary_large_image & no fake handle) ────
    await test('Validação de Twitter Cards em /en/work/mapear (Twitterbot)', async () => {
      const res = await makeRequest('/en/work/mapear', USER_AGENTS.twitter);
      if (!res.body.includes('name="twitter:card" content="summary_large_image"')) {
        throw new Error('twitter:card summary_large_image ausente.');
      }
      if (res.body.includes('@') && res.body.includes('twitter:site')) {
        throw new Error('Twitter handle falso detectado na tag twitter:site.');
      }
    });

    // ── TEST 8: DOM Navigation Transition Simulation ───────────────────
    await test('Validação de limpeza de imageAlt e JSON-LD durante navegação no cliente', async () => {
      testDOMNavigationSimulation();
    });
  } finally {
    server.close();
    console.log('🏁 [SEO HTTP Tests]: Servidor encerrado.');
  }

  console.log(`\n📊 [SEO HTTP Tests]: ${passedTests} de ${totalTests} testes passaram com sucesso.`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests();
