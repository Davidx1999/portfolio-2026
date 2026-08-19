/**
 * Vercel Serverless Function: /api/translate
 *
 * Arquitetura Field-Level Internationalization:
 * - Traduz recursivamente os campos 'en' para 'ptBR' dentro do MESMO documento.
 * - Suporta todos os campos essenciais e blocos modulares em `contentBlocks`.
 * - Lê preferencialmente o draft 'drafts.<id>' mais recente (com fallback para publicado).
 * - Suporta dois modos: 'missing_only' (apenas campos vazios) ou 'regenerate_all' (sobrescrever todos).
 * - Preserva termos protegidos (ex: MAPEAR, CEnPE, UFC, FGV DGPE, TCT, TRI, HTR, Design System).
 * - Calcula hash SHA-256 do conteúdo em inglês (sourceContentHash) para detecção de alterações futuras ('outdated').
 * - Cria/atualiza exclusivamente o draft 'drafts.<id>' no Sanity.
 * - NUNCA cria documentos separados, NUNCA duplica slugs e NUNCA publica automaticamente.
 */

import { createClient } from '@sanity/client';
import crypto from 'crypto';

// Rate-limiting em memória por IP (10 requisições por minuto por IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_PAYLOAD_SIZE_BYTES = 500 * 1024; // 500 KB

function isRateLimited(ip) {
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - userRecord.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }

  if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userRecord.count += 1;
  rateLimitMap.set(ip, userRecord);
  return false;
}

// Termos e acrônimos que não devem ser traduzidos pelo DeepL
const PROTECTED_TERMS = [
  'MAPEAR',
  'CEnPE',
  'UFC',
  'FGV DGPE',
  'FGV',
  'DGPE',
  'TCT',
  'TRI',
  'HTR',
  'Design System',
  'Design Systems',
  'Design Tokens',
  'Figma',
  'React',
  'Vite',
  'Sanity',
  'GSAP',
  'ScrollTrigger',
];

function protectTerms(text) {
  if (!text || typeof text !== 'string') return text;
  let protectedText = text;
  PROTECTED_TERMS.forEach((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'g');
    protectedText = protectedText.replace(regex, `<span class="notranslate">${term}</span>`);
  });
  return protectedText;
}

function unprotectTerms(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/<span class="notranslate">(.*?)<\/span>/gi, '$1')
    .replace(/<span class=\\"notranslate\\">(.*?)<\/span>/gi, '$1');
}

// DeepL API Caller
async function translateText(text, targetLang = 'PT-BR', sourceLang = 'EN') {
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return text;
  }

  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY environment variable is not configured.');
  }

  const isFreeKey = apiKey.endsWith(':fx');
  const endpoint = isFreeKey
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate';

  const processedText = protectTerms(text);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [processedText],
      source_lang: sourceLang,
      target_lang: targetLang,
      preserve_formatting: true,
      tag_handling: 'html',
    }),
  });

  if (!response.ok) {
    const errorStatus = response.status;
    throw new Error(`DeepL API returned HTTP error ${errorStatus}`);
  }

  const data = await response.json();
  const rawTranslated = data?.translations?.[0]?.text || text;
  return unprotectTerms(rawTranslated);
}

/**
 * Coleta todas as strings 'en' do documento para gerar o hash de controle de versão.
 */
function collectEnglishStrings(node, collected = []) {
  if (!node) return collected;

  if (typeof node === 'object') {
    if (typeof node.en === 'string') {
      collected.push(node.en);
    }
    for (const key of Object.keys(node)) {
      if (key !== 'ptBR') {
        collectEnglishStrings(node[key], collected);
      }
    }
  } else if (Array.isArray(node)) {
    for (const item of node) {
      collectEnglishStrings(item, collected);
    }
  }

  return collected;
}

function computeContentHash(doc) {
  const strings = collectEnglishStrings(doc);
  const concatenated = strings.join('|||');
  return crypto.createHash('sha256').update(concatenated, 'utf8').digest('hex');
}

/**
 * Tradução recursiva de campos localizados { en: "...", ptBR: "..." }
 */
async function translateFieldLevelObject(node, mode = 'missing_only') {
  if (!node || typeof node !== 'object') return node;

  // Se for um objeto localizado { en: string, ptBR?: string }
  if (Object.prototype.hasOwnProperty.call(node, 'en') && typeof node.en === 'string') {
    const hasExistingPt = typeof node.ptBR === 'string' && node.ptBR.trim() !== '';
    if (mode === 'missing_only' && hasExistingPt) {
      return node;
    }
    if (node.en.trim() !== '') {
      const translated = await translateText(node.en, 'PT-BR', 'EN');
      return {
        ...node,
        ptBR: translated,
      };
    }
    return node;
  }

  // Se for um array (ex: contentBlocks, topics, decisions, images, etc.)
  if (Array.isArray(node)) {
    const newArr = [];
    for (const item of node) {
      newArr.push(await translateFieldLevelObject(item, mode));
    }
    return newArr;
  }

  // Se for um objeto regular (ex: contentBlock, coverImage, seo)
  const result = { ...node };
  for (const key of Object.keys(result)) {
    // Ignora metadados e campos estruturais internos do Sanity
    if (['_id', '_type', '_rev', '_createdAt', '_updatedAt', '_key', 'slug', 'asset', '_ref'].includes(key)) {
      continue;
    }
    result[key] = await translateFieldLevelObject(result[key], mode);
  }

  return result;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Validação de Método HTTP (GET -> 405)
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported.',
    });
  }

  // 2. Verificação de Tamanho do Payload
  const rawBodyLength = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : 0;
  if (rawBodyLength > MAX_PAYLOAD_SIZE_BYTES) {
    return res.status(413).json({
      error: 'Payload Too Large',
      message: 'Request payload exceeds maximum allowed size.',
    });
  }

  // 3. Rate Limiting por IP
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please wait a moment before trying again.',
    });
  }

  // 4. Autenticação e Autorização via Token de Sessão do Sanity
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization Bearer header.',
    });
  }

  const userToken = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!userToken) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Empty authorization token provided.',
    });
  }

  const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'pjq90dr2';
  const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
  const writeToken = process.env.SANITY_API_WRITE_TOKEN;

  // Validação do token do usuário contra a API do Sanity
  try {
    const userValidationRes = await fetch('https://api.sanity.io/v2021-06-07/users/me', {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (!userValidationRes.ok) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired Sanity user session.',
      });
    }

    const userData = await userValidationRes.json();
    if (!userData || !userData.id) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Could not identify Sanity user.',
      });
    }

    // Validação de permissão no projeto
    const projectAccessRes = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (!projectAccessRes.ok) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `User does not have access permissions for Sanity project ${projectId}.`,
      });
    }
  } catch {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Sanity authentication verification failed.',
    });
  }

  // 5. Validação de Payload
  const { documentId, mode = 'missing_only' } = req.body || {};
  if (!documentId || typeof documentId !== 'string' || documentId.trim() === '') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing or invalid "documentId" in request body.',
    });
  }

  if (!writeToken) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Backend write token is not configured on server.',
    });
  }

  const backendClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token: writeToken,
    useCdn: false,
  });

  try {
    const rawDocId = documentId.replace(/^drafts\./, '');
    const draftId = `drafts.${rawDocId}`;

    // 6. Busca primeiro o draft 'drafts.<id>' mais recente; se não existir, usa o publicado
    let activeDoc = await backendClient.getDocument(draftId);
    if (!activeDoc) {
      activeDoc = await backendClient.getDocument(rawDocId);
    }

    if (!activeDoc) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Document "${rawDocId}" not found in Sanity.`,
      });
    }

    // 7. Tradução recursiva dos campos field-level (incluindo contentBlocks)
    const translatedDoc = await translateFieldLevelObject(activeDoc, mode);

    // 8. Cálculo de hash do conteúdo em inglês
    const contentHash = computeContentHash(translatedDoc);

    // 9. Atualização exclusiva do DRAFT do próprio documento
    const draftPayload = {
      ...translatedDoc,
      _id: draftId,
      translationStatus: 'needs_review',
      sourceContentHash: contentHash,
    };

    delete draftPayload._rev;
    delete draftPayload._createdAt;
    delete draftPayload._updatedAt;

    // Salva como draft no mesmo documento (NUNCA publica automaticamente)
    const result = await backendClient.createOrReplace(draftPayload);

    return res.status(200).json({
      success: true,
      message: `PT-BR fields updated in draft (${mode === 'missing_only' ? 'missing fields only' : 'all fields'}).`,
      draftId: result._id,
      translationStatus: 'needs_review',
      sourceContentHash: contentHash,
    });
  } catch (err) {
    console.error('Translation processing error:', err.message);
    return res.status(500).json({
      error: 'Translation Failed',
      message: 'An error occurred during translation processing.',
      details: err.message,
    });
  }
}
