/**
 * Vercel Serverless Function: /api/translate
 *
 * Segurança & Auditoria:
 * - Valida método HTTP (apenas POST permitido, GET retorna 405).
 * - Autentica a sessão do usuário do Sanity via Bearer Token contra a API do Sanity (GET /users/me e GET /projects/:id).
 * - Retorna 401 para requisições sem token ou com token inválido.
 * - Retorna 403 para usuários autenticados no Sanity mas sem permissão no projeto específico.
 * - Proteção contra DoS / Rate limiting e verificação de payload excessivo (máx 250KB).
 * - Proteção editorial: não sobrescreve documentos com translationStatus === 'reviewed'.
 * - Cria exclusivamente DRAFT ('drafts.<id>__i18n_pt-BR') com translationStatus: 'needs_review'.
 * - Cria/atualiza o documento 'translation.metadata' do @sanity/document-internationalization.
 * - NUNCA publica automaticamente.
 * - Logs sanitizados sem vazamento de tokens, chaves ou payloads completos.
 */

import { createClient } from '@sanity/client';

// Rate-limiting em memória por IP (10 requisições por minuto por IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_PAYLOAD_SIZE_BYTES = 250 * 1024; // 250 KB

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

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
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
  return data?.translations?.[0]?.text || text;
}

// Tradução recursiva de campos editoriais
async function translateDocumentFields(sourceDoc) {
  const cloned = JSON.parse(JSON.stringify(sourceDoc));

  const textFields = [
    'title',
    'heroTitle',
    'heroSummary',
    'shortDescription',
    'longDescription',
    'overview',
    'challenge',
    'solution',
    'impact',
    'reflection',
    'openingStatement',
    'closingStatement',
    'intro',
  ];

  for (const field of textFields) {
    if (cloned[field] && typeof cloned[field] === 'string') {
      cloned[field] = await translateText(cloned[field], 'PT-BR', 'EN');
    }
  }

  if (Array.isArray(cloned.responsibilities)) {
    const translatedResp = [];
    for (const item of cloned.responsibilities) {
      if (typeof item === 'string') {
        translatedResp.push(await translateText(item, 'PT-BR', 'EN'));
      } else {
        translatedResp.push(item);
      }
    }
    cloned.responsibilities = translatedResp;
  }

  if (Array.isArray(cloned.contentBlocks)) {
    for (const block of cloned.contentBlocks) {
      if (!block || typeof block !== 'object') continue;

      if (block.sectionTitle) block.sectionTitle = await translateText(block.sectionTitle, 'PT-BR', 'EN');
      if (block.sectionSubtitle) block.sectionSubtitle = await translateText(block.sectionSubtitle, 'PT-BR', 'EN');
      if (block.title) block.title = await translateText(block.title, 'PT-BR', 'EN');
      if (block.subtitle) block.subtitle = await translateText(block.subtitle, 'PT-BR', 'EN');
      if (block.shortDescription) block.shortDescription = await translateText(block.shortDescription, 'PT-BR', 'EN');
      if (block.caption) block.caption = await translateText(block.caption, 'PT-BR', 'EN');
      if (block.intro) block.intro = await translateText(block.intro, 'PT-BR', 'EN');
      if (block.headline) block.headline = await translateText(block.headline, 'PT-BR', 'EN');
      if (block.description) block.description = await translateText(block.description, 'PT-BR', 'EN');
      if (block.summary) block.summary = await translateText(block.summary, 'PT-BR', 'EN');

      if (Array.isArray(block.topics)) {
        for (const topic of block.topics) {
          if (topic.title) topic.title = await translateText(topic.title, 'PT-BR', 'EN');
          if (topic.content) topic.content = await translateText(topic.content, 'PT-BR', 'EN');
        }
      }

      if (Array.isArray(block.decisions)) {
        for (const dec of block.decisions) {
          if (dec.challenge) dec.challenge = await translateText(dec.challenge, 'PT-BR', 'EN');
          if (dec.decision) dec.decision = await translateText(dec.decision, 'PT-BR', 'EN');
          if (dec.rationale) dec.rationale = await translateText(dec.rationale, 'PT-BR', 'EN');
          if (dec.artifactCaption) dec.artifactCaption = await translateText(dec.artifactCaption, 'PT-BR', 'EN');
        }
      }

      if (Array.isArray(block.outcomes)) {
        for (const out of block.outcomes) {
          if (out.title) out.title = await translateText(out.title, 'PT-BR', 'EN');
          if (out.description) out.description = await translateText(out.description, 'PT-BR', 'EN');
        }
      }
    }
  }

  return cloned;
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
      message: 'Request payload exceeds maximum allowed size of 250KB.',
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
  const { documentId } = req.body || {};
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
    const sourceDoc = await backendClient.getDocument(rawDocId);

    if (!sourceDoc) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Document "${rawDocId}" not found in Sanity.`,
      });
    }

    // 6. Proteção Editorial: Bloqueia sobrescrita de documentos 'reviewed'
    const ptPublishedId = `${rawDocId}__i18n_pt-BR`;
    const ptDraftId = `drafts.${rawDocId}__i18n_pt-BR`;

    const existingPtDoc = await backendClient.getDocument(ptDraftId) || await backendClient.getDocument(ptPublishedId);
    if (existingPtDoc && existingPtDoc.translationStatus === 'reviewed') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'A reviewed translation already exists for this document. Overwriting is blocked to protect editorial work.',
      });
    }

    // 7. Tradução recursiva via DeepL
    const translatedContent = await translateDocumentFields(sourceDoc);

    // 8. Construção do Draft PT-BR
    const draftPayload = {
      ...translatedContent,
      _id: ptDraftId,
      _type: sourceDoc._type,
      language: 'pt-BR',
      translationStatus: 'needs_review',
      translationOf: {
        _type: 'reference',
        _ref: rawDocId,
      },
    };

    delete draftPayload._rev;
    delete draftPayload._createdAt;
    delete draftPayload._updatedAt;

    // Salva EXCLUSIVAMENTE como DRAFT (nunca publica automaticamente)
    const draftResult = await backendClient.createOrReplace(draftPayload);

    // 9. Atualiza/Cria documento de metadados do @sanity/document-internationalization
    const metadataDocId = `i18n.${rawDocId}`;
    const metadataPayload = {
      _id: metadataDocId,
      _type: 'translation.metadata',
      schemaTypes: [sourceDoc._type],
      translations: [
        {
          _key: 'en',
          value: {
            _type: 'reference',
            _ref: rawDocId,
          },
        },
        {
          _key: 'pt-BR',
          value: {
            _type: 'reference',
            _ref: ptPublishedId,
          },
        },
      ],
    };

    await backendClient.createIfNotExists(metadataPayload);

    return res.status(200).json({
      success: true,
      message: 'PT-BR draft created successfully. Document translation.metadata linked.',
      draftId: draftResult._id,
      translationStatus: 'needs_review',
    });
  } catch (err) {
    // Sanitização de logs: nunca exibe tokens ou dados sensíveis
    console.error('Translation processing error:', err.message);
    return res.status(500).json({
      error: 'Translation Failed',
      message: 'An error occurred during translation processing.',
      details: err.message,
    });
  }
}
