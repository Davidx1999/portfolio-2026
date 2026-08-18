/**
 * Vercel Serverless Function: /api/translate
 *
 * Objetivo:
 * - Autentica a requisição (via SANITY_API_TRANSLATE_SECRET).
 * - Proteção por rate limiting simples.
 * - Busca o documento fonte (EN) no Sanity com SANITY_API_WRITE_TOKEN.
 * - Traduz recursivamente os campos editoriais via DeepL API (source: EN -> target: PT-BR).
 * - Cria exclusivamente um DRAFT no Sanity com translationStatus: 'needs_review'.
 * - NUNCA publica automaticamente.
 */

import { createClient } from '@sanity/client';

// Simple in-memory rate-limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

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
    throw new Error('DEEPL_API_KEY environment variable is missing.');
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
    const errorText = await response.text();
    throw new Error(`DeepL API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data?.translations?.[0]?.text || text;
}

// Helper to translate translatable editorial strings recursively
async function translateDocumentFields(sourceDoc) {
  const cloned = JSON.parse(JSON.stringify(sourceDoc));

  // Top-level text fields to translate
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
    'quote_pt',
  ];

  for (const field of textFields) {
    if (cloned[field] && typeof cloned[field] === 'string') {
      cloned[field] = await translateText(cloned[field], 'PT-BR', 'EN');
    }
  }

  // Translate arrays of strings (e.g. responsibilities)
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

  // Translate content blocks
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
  // CORS Headers for Sanity Studio & Preflight
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Translate-Secret, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    return;
  }

  // Rate Limiting Check
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    res.status(429).json({ error: 'Rate limit exceeded. Please wait a moment before trying again.' });
    return;
  }

  // Authentication Verification
  const sharedSecret = process.env.SANITY_API_TRANSLATE_SECRET;
  const providedSecret = req.headers['x-translate-secret'] || req.body?.secret;

  if (sharedSecret && providedSecret !== sharedSecret) {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing translate secret.' });
    return;
  }

  const { documentId } = req.body || {};
  if (!documentId) {
    res.status(400).json({ error: 'Missing documentId in request body.' });
    return;
  }

  const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'pjq90dr2';
  const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
  const writeToken = process.env.SANITY_API_WRITE_TOKEN;

  if (!writeToken) {
    res.status(500).json({ error: 'Server configuration error: SANITY_API_WRITE_TOKEN is not defined.' });
    return;
  }

  const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token: writeToken,
    useCdn: false,
  });

  try {
    // 1. Fetch source document
    const rawDocId = documentId.replace(/^drafts\./, '');
    const sourceDoc = await sanityClient.getDocument(rawDocId);

    if (!sourceDoc) {
      res.status(404).json({ error: `Document ${rawDocId} not found in Sanity.` });
      return;
    }

    // 2. Perform DeepL translations
    const translatedContent = await translateDocumentFields(sourceDoc);

    // 3. Construct PT-BR Draft Document
    const ptDocId = `drafts.${rawDocId}__i18n_pt-BR`;

    const draftPayload = {
      ...translatedContent,
      _id: ptDocId,
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

    // 4. Save DRAFT only in Sanity (never auto-publish)
    const result = await sanityClient.createOrReplace(draftPayload);

    res.status(200).json({
      success: true,
      message: 'PT-BR draft created successfully in Sanity. Awaiting human editorial review.',
      draftId: ptDocId,
      resultId: result._id,
    });
  } catch (err) {
    console.error('Error generating PT-BR draft:', err);
    res.status(500).json({
      error: 'Translation processing failed.',
      details: err.message,
    });
  }
}
