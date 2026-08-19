import { urlFor } from '../services/sanityClient.js';
import { resolveField } from './i18nField.js';

/**
 * Helper to safely extract an image URL from a Sanity image object or asset reference.
 */
export function resolveImageUrl(imageSource) {
  if (!imageSource) return null;
  if (typeof imageSource === 'string') return imageSource;
  if (imageSource.asset?.url) return imageSource.asset.url;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

/**
 * Normaliza recursivamente os blocos modulares de conteúdo para o idioma ativo.
 */
export function normalizeContentBlock(block, locale = 'en') {
  if (!block || typeof block !== 'object') return block;

  const normalized = {
    _key: block._key || `block-${Math.random().toString(36).substring(2, 9)}`,
    _type: block._type || 'textSection',
    theme: block.theme || 'dark',
  };

  // 1. Campos de texto gerais
  if (block.eyebrow !== undefined) normalized.eyebrow = resolveField(block.eyebrow, locale);
  if (block.title !== undefined) normalized.title = resolveField(block.title, locale);
  if (block.subtitle !== undefined) normalized.subtitle = resolveField(block.subtitle, locale);
  if (block.headline !== undefined) normalized.headline = resolveField(block.headline, locale);
  if (block.body !== undefined) normalized.body = resolveField(block.body, locale);
  if (block.summary !== undefined) normalized.summary = resolveField(block.summary, locale);
  if (block.intro !== undefined) normalized.intro = resolveField(block.intro, locale);
  if (block.sectionTitle !== undefined) normalized.sectionTitle = resolveField(block.sectionTitle, locale);
  if (block.sectionSubtitle !== undefined) normalized.sectionSubtitle = resolveField(block.sectionSubtitle, locale);
  if (block.statement !== undefined) normalized.statement = resolveField(block.statement, locale);
  if (block.supportingText !== undefined) normalized.supportingText = resolveField(block.supportingText, locale);
  if (block.openingStatement !== undefined) normalized.openingStatement = resolveField(block.openingStatement, locale);
  if (block.closingStatement !== undefined) normalized.closingStatement = resolveField(block.closingStatement, locale);
  if (block.shortDescription !== undefined) normalized.shortDescription = resolveField(block.shortDescription, locale);
  if (block.description !== undefined) normalized.description = resolveField(block.description, locale);
  if (block.quote !== undefined) normalized.quote = resolveField(block.quote, locale);
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

  // 2. Resolução de mídias únicas
  if (block.image) {
    normalized.image = resolveImageUrl(block.image);
    normalized.media = normalized.image;
  }
  if (block.media && !normalized.image) {
    normalized.media = resolveImageUrl(block.media);
    normalized.image = normalized.media;
  }
  if (block.poster) {
    normalized.poster = resolveImageUrl(block.poster);
  }
  if (block.videoUrl) normalized.videoUrl = block.videoUrl;
  if (block.externalVideo) normalized.externalVideo = block.externalVideo;
  if (block.videoFile?.asset?.url) normalized.videoFile = block.videoFile.asset.url;

  if (block.caption !== undefined) normalized.caption = resolveField(block.caption, locale);
  if (block.alt !== undefined) normalized.alt = resolveField(block.alt, locale);

  // 3. Mídia dupla (splitMedia)
  if (block.mediaLeft) normalized.mediaLeft = resolveImageUrl(block.mediaLeft);
  if (block.captionLeft !== undefined) normalized.captionLeft = resolveField(block.captionLeft, locale);
  if (block.altLeft !== undefined) normalized.altLeft = resolveField(block.altLeft, locale);
  if (block.mediaRight) normalized.mediaRight = resolveImageUrl(block.mediaRight);
  if (block.captionRight !== undefined) normalized.captionRight = resolveField(block.captionRight, locale);
  if (block.altRight !== undefined) normalized.altRight = resolveField(block.altRight, locale);

  // 4. Antes vs Depois (beforeAfter)
  if (block.beforeImage) normalized.beforeImage = resolveImageUrl(block.beforeImage);
  if (block.beforeLabel !== undefined) normalized.beforeLabel = resolveField(block.beforeLabel, locale);
  if (block.afterImage) normalized.afterImage = resolveImageUrl(block.afterImage);
  if (block.afterLabel !== undefined) normalized.afterLabel = resolveField(block.afterLabel, locale);

  // 5. Galerias de imagens (imageGallery)
  if (Array.isArray(block.images)) {
    normalized.images = block.images.map((imgItem, idx) => ({
      _key: imgItem._key || `img-${idx}`,
      image: resolveImageUrl(imgItem.image || imgItem),
      caption: resolveField(imgItem.caption, locale),
      alt: resolveField(imgItem.alt, locale),
      aspectRatio: imgItem.aspectRatio || '16/10',
    }));
  }

  // 6. Mosaico de Artefatos (artifactMosaicScene)
  if (Array.isArray(block.items) && (block._type === 'artifactMosaicScene' || block._type === 'artifactMosaic')) {
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `mosaic-${idx}`,
      media: resolveImageUrl(item.media || item.image || item),
      caption: resolveField(item.caption, locale),
      alt: resolveField(item.alt, locale),
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
      caption: resolveField(item.caption, locale),
      supportingText: resolveField(item.supportingText, locale),
    }));
  } else if (Array.isArray(block.items) && block._type === 'imageGrid') {
    // 8. Grade de Imagens (imageGrid)
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `grid-${idx}`,
      image: resolveImageUrl(item.image || item),
      caption: resolveField(item.caption, locale),
      alt: resolveField(item.alt, locale),
    }));
  } else if (Array.isArray(block.items) && block._type === 'impactBlock') {
    // 9. Impacto (impactBlock)
    normalized.items = block.items.map((item, idx) => ({
      _key: item._key || `impact-${idx}`,
      value: item.value || '',
      label: resolveField(item.label, locale),
      description: resolveField(item.description, locale),
      evidenceType: item.evidenceType || 'Qualitativo',
    }));
  }

  // 10. Tópicos da Narrativa Sticky (stickyNarrative)
  if (Array.isArray(block.topics)) {
    normalized.topics = block.topics.map((t, idx) => ({
      _key: t._key || `topic-${idx}`,
      topicKey: resolveField(t.topicKey || t.key || t.label, locale),
      title: resolveField(t.title, locale),
      content: resolveField(t.content, locale),
      bulletPoints: Array.isArray(t.bulletPoints)
        ? t.bulletPoints.map((bp) => resolveField(bp, locale)).filter(Boolean)
        : [],
      highlight: t.highlight ?? false,
    }));
  }

  // 11. Decisões de Design (decisionSection)
  if (Array.isArray(block.decisions)) {
    normalized.decisions = block.decisions.map((d, idx) => ({
      _key: d._key || `decision-${idx}`,
      number: d.number || String(idx + 1).padStart(2, '0'),
      challenge: resolveField(d.challenge, locale),
      decision: resolveField(d.decision, locale),
      rationale: resolveField(d.rationale, locale),
      artifactMedia: resolveImageUrl(d.artifactMedia || d.image),
      artifactCaption: resolveField(d.artifactCaption, locale),
    }));
  }

  // 12. Resultados Qualitativos (outcomeSection)
  if (Array.isArray(block.outcomes)) {
    normalized.outcomes = block.outcomes.map((o, idx) => ({
      _key: o._key || `outcome-${idx}`,
      tag: o.tag || 'Qualidade & Escala',
      title: resolveField(o.title, locale),
      description: resolveField(o.description, locale),
    }));
  }

  // 13. Etapas do Processo (processSteps)
  if (Array.isArray(block.steps)) {
    normalized.steps = block.steps.map((s, idx) => ({
      _key: s._key || `step-${idx}`,
      index: s.index || `0${idx + 1}`,
      title: resolveField(s.title, locale),
      description: resolveField(s.description, locale),
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
      : (rawProject.slug || rawProject.id || rawProject._id);

  // ── Resolução de Mídias de Capa e Reconstruct ──────────────────────────────
  const rawCover = rawProject.coverImage || rawProject.mainVisual?.image || rawProject.image;
  const rawReconstruct = rawProject.reconstructImage || rawProject.finalImage;

  const coverUrl = rawProject.coverImageUrl || resolveImageUrl(rawCover);
  const reconstructUrl = rawProject.reconstructImageUrl || (rawReconstruct ? resolveImageUrl(rawReconstruct) : null);

  // ── Resolução de Campos Textuais com Fallback ───────────────────────────────
  const displayTitle = resolveField(rawProject.title, locale) || 'Untitled Project';
  const rawDesc = rawProject.shortDescription || rawProject.heroSummary || rawProject.overview || rawProject.description;
  const displayDesc = resolveField(rawDesc, locale) || '';

  const rawCategory = rawProject.category || rawProject.context;
  const displayCategory = resolveField(rawCategory, locale) || (locale === 'pt' || locale === 'pt-BR' ? 'Design de Produto' : 'Product Design');

  const rawRole = rawProject.role;
  const displayRole = resolveField(rawRole, locale) || 'Lead Product Designer';

  const rawAlt = rawProject.coverImage?.alt || rawProject.mainVisual?.alt || rawProject.alt;
  const displayAlt = resolveField(rawAlt, locale) || displayTitle;

  // ── Resolução da Hero Media (Vídeo ou Imagem) ──────────────────────────────
  const heroOverride = rawProject.heroMediaOverride || {};
  const hasHeroVideo = !!(heroOverride.videoUrl || rawProject.mainVisual?.videoUrl || rawProject.videoUrl);
  const heroVideoUrl = heroOverride.videoUrl || rawProject.mainVisual?.videoUrl || rawProject.videoUrl || null;
  const heroPosterUrl = heroOverride.videoPoster
    ? resolveImageUrl(heroOverride.videoPoster)
    : rawProject.mainVisualPosterUrl || coverUrl;

  const heroImageUrl = heroOverride.image ? resolveImageUrl(heroOverride.image) : coverUrl;

  // ── Resolução dos Blocos Modulares de Conteúdo ─────────────────────────────
  const rawBlocks = Array.isArray(rawProject.contentBlocks) ? rawProject.contentBlocks : [];
  const normalizedBlocks = rawBlocks
    .map((b) => normalizeContentBlock(b, locale))
    .filter(Boolean);

  // ── Fallbacks de SEO ───────────────────────────────────────────────────────
  const seoTitle = resolveField(rawProject.seo?.title, locale) || `${displayTitle} — David Salviano`;
  const seoDescription = resolveField(rawProject.seo?.description, locale) || displayDesc;
  const seoOgImage = rawProject.seo?.ogImage ? resolveImageUrl(rawProject.seo.ogImage) : coverUrl;

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
      ? rawProject.disciplines
      : (Array.isArray(rawProject.tags) ? rawProject.tags : []),
    tags: Array.isArray(rawProject.disciplines) && rawProject.disciplines.length > 0
      ? rawProject.disciplines
      : (Array.isArray(rawProject.tags) ? rawProject.tags : []),
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
      alt: resolveField(heroOverride.alt || rawProject.mainVisual?.alt || rawProject.alt, locale) || displayTitle,
      eyebrow: resolveField(heroOverride.eyebrow, locale) || resolveField(rawProject.heroEyebrow || rawProject.eyebrow, locale),
      headline: resolveField(heroOverride.headline, locale) || resolveField(rawProject.heroHeadline, locale) || displayTitle,
      summary: resolveField(heroOverride.summary, locale) || resolveField(rawProject.heroSummary || rawDesc, locale),
      autoplay: true,
    },

    // Conteúdo Modular da Case
    contentBlocks: normalizedBlocks,

    // SEO
    seo: {
      title: seoTitle,
      description: seoDescription,
      ogImage: seoOgImage,
    },
  };
}

export default normalizeProject;
