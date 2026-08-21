import { urlFor } from '../services/sanityClient.js';
import { resolveLocalized } from './i18nField.js';
import { resolveFileUrl, isVideoMedia } from './mediaUtils.js';

export { resolveFileUrl, isVideoMedia };

/**
 * Helper to safely extract an image URL from a Sanity image object or asset reference.
 */
export function resolveImageUrl(imageSource) {
  if (!imageSource) return null;
  if (typeof imageSource === 'string') {
    const trimmed = imageSource.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('./')) {
      return trimmed;
    }
    return trimmed;
  }
  if (imageSource.asset?.url) return imageSource.asset.url;
  try {
    const res = urlFor(imageSource);
    if (!res) return null;
    if (typeof res.url === 'function') return res.url();
    if (typeof res === 'string') return res;
    return null;
  } catch (err) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ [resolveImageUrl]: Erro ao resolver URL de imagem:', err);
    }
    return null;
  }
}

/**
 * Normaliza recursivamente os blocos modulares de conteúdo para o idioma ativo.
 * Trata todos os 22 tipos de contentBlocks definidos no schema do Sanity.
 */
export function normalizeContentBlock(block, locale = 'en', idx) {
  if (!block || typeof block !== 'object') return block;

  const normalized = {
    _key: block._key || (idx !== undefined ? `block-${idx}` : `block-${Math.random().toString(36).substring(2, 9)}`),
    _type: block._type || 'textSection',
    theme: block.theme || 'dark',
  };

  // 1. Campos de texto gerais
  if (block.eyebrow !== undefined) normalized.eyebrow = resolveLocalized(block.eyebrow, locale);
  if (block.title !== undefined) normalized.title = resolveLocalized(block.title, locale);
  if (block.subtitle !== undefined) normalized.subtitle = resolveLocalized(block.subtitle, locale);
  if (block.headline !== undefined) normalized.headline = resolveLocalized(block.headline, locale);
  if (block.body !== undefined) normalized.body = resolveLocalized(block.body, locale);
  if (block.summary !== undefined) normalized.summary = resolveLocalized(block.summary, locale);
  if (block.intro !== undefined) normalized.intro = resolveLocalized(block.intro, locale);
  if (block.sectionTitle !== undefined) normalized.sectionTitle = resolveLocalized(block.sectionTitle, locale);
  if (block.sectionSubtitle !== undefined) normalized.sectionSubtitle = resolveLocalized(block.sectionSubtitle, locale);
  if (block.statement !== undefined) normalized.statement = resolveLocalized(block.statement, locale);
  if (block.supportingText !== undefined) normalized.supportingText = resolveLocalized(block.supportingText, locale);
  if (block.openingStatement !== undefined) normalized.openingStatement = resolveLocalized(block.openingStatement, locale);
  if (block.closingStatement !== undefined) normalized.closingStatement = resolveLocalized(block.closingStatement, locale);
  if (block.shortDescription !== undefined) normalized.shortDescription = resolveLocalized(block.shortDescription, locale);
  if (block.description !== undefined) normalized.description = resolveLocalized(block.description, locale);
  if (block.quote !== undefined) normalized.quote = resolveLocalized(block.quote, locale);
  if (block.author !== undefined) normalized.author = block.author;
  if (block.role !== undefined) normalized.role = block.role;
  if (block.organization !== undefined) normalized.organization = block.organization;
  if (block.chapterNumber !== undefined) normalized.chapterNumber = block.chapterNumber;
  if (block.alignment !== undefined) normalized.alignment = block.alignment;
  if (block.columns !== undefined) normalized.columns = block.columns;
  if (block.aspectRatio !== undefined) normalized.aspectRatio = block.aspectRatio;
  if (block.mediaPosition !== undefined) normalized.mediaPosition = block.mediaPosition;
  if (block.mediaType !== undefined) normalized.mediaType = block.mediaType;
  if (block.ratio !== undefined) normalized.ratio = block.ratio;
  if (block.lagPreset !== undefined) normalized.lagPreset = block.lagPreset;
  if (block.directionPreset !== undefined) normalized.directionPreset = block.directionPreset;
  if (block.showDestinationFrame !== undefined) normalized.showDestinationFrame = block.showDestinationFrame;
  if (block.frameColor !== undefined) normalized.frameColor = block.frameColor;
  if (block.artifactType !== undefined) normalized.artifactType = block.artifactType;
  if (block.autoplay !== undefined) normalized.autoplay = block.autoplay;
  if (block.loop !== undefined) normalized.loop = block.loop;
  normalized.showBorder = block.showBorder ?? block.hasBorder ?? true;

  // 2. Resolução de mídias e vídeos
  const rawVideo =
    block.videoUrl ||
    block.externalVideo ||
    block.videoFile ||
    block.videoFileUrl ||
    block.video ||
    (isVideoMedia(block.media) ? block.media : null) ||
    (isVideoMedia(block.image) ? block.image : null);

  const resolvedVideo = resolveFileUrl(rawVideo);
  if (resolvedVideo) {
    normalized.videoUrl = resolvedVideo;
    normalized.externalVideo = resolvedVideo;
    normalized.videoFile = resolvedVideo;
  }

  if (block.image) {
    normalized.image = isVideoMedia(block.image) ? resolveFileUrl(block.image) : resolveImageUrl(block.image);
    normalized.media = normalized.image;
  }
  if (block.media && !normalized.image) {
    normalized.media = isVideoMedia(block.media) ? resolveFileUrl(block.media) : resolveImageUrl(block.media);
    normalized.image = normalized.media;
  }
  if (block.poster || block.posterUrl || block.videoPoster) {
    normalized.poster = resolveImageUrl(block.poster || block.posterUrl || block.videoPoster);
  }

  if (block.caption !== undefined) normalized.caption = resolveLocalized(block.caption, locale);
  if (block.alt !== undefined) normalized.alt = resolveLocalized(block.alt, locale);

  // 3. Mídia dupla (splitMedia)
  if (block.mediaLeft) {
    normalized.mediaLeft = isVideoMedia(block.mediaLeft) ? resolveFileUrl(block.mediaLeft) : resolveImageUrl(block.mediaLeft);
  }
  if (block.captionLeft !== undefined) normalized.captionLeft = resolveLocalized(block.captionLeft, locale);
  if (block.altLeft !== undefined) normalized.altLeft = resolveLocalized(block.altLeft, locale);

  if (block.mediaRight) {
    normalized.mediaRight = isVideoMedia(block.mediaRight) ? resolveFileUrl(block.mediaRight) : resolveImageUrl(block.mediaRight);
  }
  if (block.captionRight !== undefined) normalized.captionRight = resolveLocalized(block.captionRight, locale);
  if (block.altRight !== undefined) normalized.altRight = resolveLocalized(block.altRight, locale);

  // 4. Antes vs Depois (beforeAfter)
  if (block.beforeImage) normalized.beforeImage = resolveImageUrl(block.beforeImage);
  if (block.beforeLabel !== undefined) normalized.beforeLabel = resolveLocalized(block.beforeLabel, locale);
  if (block.afterImage) normalized.afterImage = resolveImageUrl(block.afterImage);
  if (block.afterLabel !== undefined) normalized.afterLabel = resolveLocalized(block.afterLabel, locale);

  // 5. Galerias de imagens (imageGallery)
  if (Array.isArray(block.images)) {
    normalized.images = block.images.map((imgItem, idx) => ({
      _key: imgItem._key || `img-${idx}`,
      image: resolveImageUrl(imgItem.image || imgItem),
      caption: resolveLocalized(imgItem.caption, locale),
      alt: resolveLocalized(imgItem.alt, locale),
      aspectRatio: imgItem.aspectRatio || '16/10',
    }));
  }

  // 6. Mosaico de Artefatos (artifactMosaicScene / artifactMosaic)
  if (Array.isArray(block.items) && (block._type === 'artifactMosaicScene' || block._type === 'artifactMosaic')) {
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `mosaic-${idx}`,
      media: resolveImageUrl(item.media || item.image || item),
      caption: resolveLocalized(item.caption, locale),
      alt: resolveLocalized(item.alt, locale),
      row: item.row,
      column: item.column,
      transformOrigin: item.transformOrigin || 'center',
      fitMode: item.fitMode || 'cover',
    }));
  } else if (Array.isArray(block.items) && block._type === 'verticalMediaStack') {
    // 7. Pilha Vertical (verticalMediaStack)
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `stack-${idx}`,
      media: resolveImageUrl(item.media || item.image || item),
      caption: resolveLocalized(item.caption, locale),
      supportingText: resolveLocalized(item.supportingText, locale),
    }));
  } else if (Array.isArray(block.items) && block._type === 'imageGrid') {
    // 8. Grade de Imagens (imageGrid)
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `grid-${idx}`,
      image: resolveImageUrl(item.image || item),
      caption: resolveLocalized(item.caption, locale),
      alt: resolveLocalized(item.alt, locale),
    }));
  } else if (Array.isArray(block.items) && block._type === 'impactBlock') {
    // 9. Impacto (impactBlock)
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `impact-${idx}`,
      value: item.value || '',
      label: resolveLocalized(item.label, locale),
      description: resolveLocalized(item.description, locale),
      evidenceType: item.evidenceType || 'Qualitativo',
    }));
  }

  // 10. Tópicos da Narrativa Sticky (stickyNarrative)
  if (Array.isArray(block.topics)) {
    normalized.topics = block.topics.map((t, idx) => ({
      _key: t._key || `topic-${idx}`,
      topicKey: resolveLocalized(t.topicKey || t.key || t.label, locale),
      title: resolveLocalized(t.title, locale),
      content: resolveLocalized(t.content, locale),
      bulletPoints: Array.isArray(t.bulletPoints)
        ? t.bulletPoints.map((bp) => resolveLocalized(bp, locale)).filter(Boolean)
        : [],
      highlight: t.highlight ?? false,
    }));
  }

  // 11. Decisões de Design (decisionSection)
  if (Array.isArray(block.decisions)) {
    normalized.decisions = block.decisions.map((d, idx) => ({
      _key: d._key || `decision-${idx}`,
      number: d.number || String(idx + 1).padStart(2, '0'),
      challenge: resolveLocalized(d.challenge, locale),
      decision: resolveLocalized(d.decision, locale),
      rationale: resolveLocalized(d.rationale, locale),
      artifactMedia: resolveImageUrl(d.artifactMedia || d.image),
      artifactCaption: resolveLocalized(d.artifactCaption, locale),
    }));
  }

  // 12. Resultados Qualitativos (outcomeSection)
  if (Array.isArray(block.outcomes)) {
    normalized.outcomes = block.outcomes.map((o, idx) => ({
      _key: o._key || `outcome-${idx}`,
      tag: o.tag || (locale === 'en' ? 'Quality & Scale' : 'Qualidade & Escala'),
      title: resolveLocalized(o.title, locale),
      description: resolveLocalized(o.description, locale),
    }));
  }

  // 13. Etapas do Processo (processSteps)
  if (Array.isArray(block.steps)) {
    normalized.steps = block.steps.map((s, idx) => ({
      _key: s._key || `step-${idx}`,
      index: s.index || `0${idx + 1}`,
      title: resolveLocalized(s.title, locale),
      description: resolveLocalized(s.description, locale),
      media: resolveImageUrl(s.media || s.image),
    }));
  }

  return normalized;
}

/**
 * Normaliza um documento de projeto completo para consumo seguro no React.
 * - Resolve todos os campos localizados para o idioma ativo (com fallback em inglês).
 * - Desacopla explicitamente `coverImage` (estado inicial) e `reconstructImage` (estado final no hover).
 * - Resolve a lista de `contentBlocks` ordenável.
 * - Constrói fallbacks inteligentes para SEO.
 */
export function normalizeProject(rawProject, locale = 'en') {
  if (!rawProject || typeof rawProject !== 'object') return null;

  const projectSlug =
    typeof rawProject.slug === 'object' && rawProject.slug?.current
      ? rawProject.slug.current
      : (rawProject.slug || rawProject.id?.current || rawProject.id || rawProject._id);

  // ── Resolução de Mídias de Capa e Reconstruct ──────────────────────────────
  const rawCover = rawProject.coverImage || rawProject.mainVisual?.image || rawProject.image;
  const rawReconstruct = rawProject.reconstructImage || rawProject.finalImage;

  const coverUrl = rawProject.coverImageUrl || resolveImageUrl(rawCover);
  const reconstructUrl = rawProject.reconstructImageUrl || (rawReconstruct ? resolveImageUrl(rawReconstruct) : null);

  // ── Resolução de Campos Textuais com Fallback ───────────────────────────────
  const displayTitle = resolveLocalized(rawProject.title, locale) || 'Untitled Project';
  const rawDesc = rawProject.shortDescription || rawProject.heroSummary || rawProject.overview || rawProject.description;
  const displayDesc = resolveLocalized(rawDesc, locale) || '';

  const rawCategory = rawProject.category || rawProject.context;
  const displayCategory = resolveLocalized(rawCategory, locale) || (locale === 'pt' || locale === 'pt-BR' ? 'Design de Produto' : 'Product Design');

  const rawRole = rawProject.role;
  const displayRole = resolveLocalized(rawRole, locale) || 'Lead Product Designer';

  const rawAlt = rawProject.coverImage?.alt || rawProject.mainVisual?.alt || rawProject.alt;
  const displayAlt = resolveLocalized(rawAlt, locale) || displayTitle;

  // ── Resolução da Hero Media (Vídeo ou Imagem) ──────────────────────────────
  const heroOverride = rawProject.heroMediaOverride || {};
  const rawHeroVideo =
    heroOverride.videoUrl ||
    heroOverride.videoFile ||
    heroOverride.externalVideo ||
    heroOverride.video ||
    rawProject.mainVisual?.videoUrl ||
    rawProject.mainVisual?.videoFile ||
    rawProject.mainVisual?.externalVideo ||
    rawProject.mainVisual?.video ||
    rawProject.videoUrl ||
    rawProject.videoFile ||
    rawProject.video ||
    rawProject.heroMediaVideoFileUrl ||
    rawProject.mainVisualVideoFileUrl;

  const heroVideoUrl = resolveFileUrl(rawHeroVideo);
  const hasHeroVideo = !!heroVideoUrl || heroOverride.mediaType === 'video' || rawProject.mainVisual?.mediaType === 'video';
  const heroPosterUrl = heroOverride.videoPoster
    ? resolveImageUrl(heroOverride.videoPoster)
    : rawProject.mainVisualPosterUrl || coverUrl;

  const heroImageUrl = heroOverride.image ? resolveImageUrl(heroOverride.image) : coverUrl;

  // ── Resolução dos Blocos Modulares de Conteúdo ─────────────────────────────
  const rawBlocks = Array.isArray(rawProject.contentBlocks) ? rawProject.contentBlocks : [];
  const normalizedBlocks = rawBlocks
    .map((b, idx) => normalizeContentBlock(b, locale, idx))
    .filter(Boolean);

  // ── Fallbacks de SEO ───────────────────────────────────────────────────────
  const seoTitle = resolveLocalized(rawProject.seo?.title, locale) || `${displayTitle} | David Salviano`;
  const seoDescription = resolveLocalized(rawProject.seo?.description, locale) || displayDesc;
  const seoOgImage = rawProject.seo?.ogImage ? resolveImageUrl(rawProject.seo.ogImage) : coverUrl;

  // ── Resolução de Campos Legados para compatibilidade reversa ──────────────
  const legacyOverview = resolveLocalized(rawProject.overview, locale);
  const legacyChallenge = resolveLocalized(rawProject.challenge, locale);
  const legacyResponsibilities = resolveLocalized(rawProject.responsibilities, locale);
  const legacySolution = resolveLocalized(rawProject.solution, locale);
  const legacyImpact = resolveLocalized(rawProject.impact, locale);
  const legacyReflection = resolveLocalized(rawProject.reflection, locale);
  const legacyThesis = resolveLocalized(rawProject.thesis, locale);

  return {
    ...rawProject,
    id: projectSlug,
    slug: projectSlug,
    title: displayTitle,
    shortDescription: displayDesc,
    description: displayDesc,
    category: displayCategory,
    role: displayRole,
    period: rawProject.period || rawProject.year || '',
    duration: rawProject.duration || '',
    clientOrContext: rawProject.clientOrContext || rawProject.client || '',
    projectStatus: rawProject.projectStatus || 'completed',
    disciplines: Array.isArray(rawProject.disciplines) && rawProject.disciplines.length > 0
      ? resolveLocalized(rawProject.disciplines, locale)
      : (Array.isArray(rawProject.tags) ? resolveLocalized(rawProject.tags, locale) : []),
    tags: Array.isArray(rawProject.disciplines) && rawProject.disciplines.length > 0
      ? resolveLocalized(rawProject.disciplines, locale)
      : (Array.isArray(rawProject.tags) ? resolveLocalized(rawProject.tags, locale) : []),
    featuredOnHome: rawProject.featuredOnHome ?? rawProject.featured ?? false,
    featured: rawProject.featuredOnHome ?? rawProject.featured ?? false,
    featuredOrder: rawProject.featuredOrder ?? 99,
    published: rawProject.published !== false,
    translationStatus: rawProject.translationStatus || 'original',

    // Imagens explícitas
    coverImage: coverUrl,
    reconstructImage: reconstructUrl,
    image: reconstructUrl || coverUrl,
    processImage: coverUrl,
    finalImage: reconstructUrl || coverUrl,
    alt: displayAlt,

    // Hero Media
    heroMedia: {
      mediaType: hasHeroVideo ? 'video' : 'image',
      image: heroImageUrl,
      videoUrl: heroVideoUrl,
      poster: heroPosterUrl,
      alt: resolveLocalized(heroOverride.alt || rawProject.mainVisual?.alt || rawProject.alt, locale) || displayTitle,
      eyebrow: resolveLocalized(heroOverride.eyebrow, locale) || resolveLocalized(rawProject.heroEyebrow || rawProject.eyebrow, locale),
      headline: resolveLocalized(heroOverride.headline, locale) || resolveLocalized(rawProject.heroHeadline, locale) || displayTitle,
      summary: resolveLocalized(heroOverride.summary, locale) || resolveLocalized(rawProject.heroSummary || rawDesc, locale),
      autoplay: true,
    },

    // Conteúdo Modular da Case
    contentBlocks: normalizedBlocks,

    // Suporte a campos de transição legados normalizados
    overview: legacyOverview,
    challenge: legacyChallenge,
    responsibilities: Array.isArray(legacyResponsibilities) ? legacyResponsibilities : [],
    solution: legacySolution,
    impact: legacyImpact,
    reflection: legacyReflection,
    thesis: legacyThesis,

    // SEO
    seo: {
      title: seoTitle,
      description: seoDescription,
      ogImage: seoOgImage,
    },
  };
}

export default normalizeProject;
