import { projectId, dataset } from '../services/sanityClient.js';

/**
 * Normaliza e resolve URLs de arquivos de mídia (especialmente vídeos .mp4/.webm/.mov)
 * provenientes do Sanity CMS ou de fontes externas/locais.
 */
export function resolveFileUrl(source) {
  if (!source) return null;

  // Se já for uma string direta
  if (typeof source === 'string') {
    const trimmed = source.trim();
    if (!trimmed) return null;

    // Se for URL HTTP, caminho relativo, blob ou data URI
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('./') ||
      trimmed.startsWith('blob:') ||
      trimmed.startsWith('data:')
    ) {
      return trimmed;
    }

    // Se for um ID de asset bruto do Sanity (ex: "file-85f9a65d5dfa74d28ad17799b6ea17c385750d4f-mp4")
    if (trimmed.startsWith('file-')) {
      const parts = trimmed.split('-');
      const ext = parts[parts.length - 1];
      const assetId = parts.slice(1, -1).join('-');
      return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
    }

    return trimmed;
  }

  // Se for objeto com URL direta (ex: expandido via GROQ: asset->url ou url)
  if (source.asset?.url) return source.asset.url;
  if (source.url) return source.url;

  // Se for objeto de referência do Sanity: { asset: { _ref: "file-..." } } ou { _ref: "file-..." }
  const ref = source.asset?._ref || source._ref;
  if (ref && typeof ref === 'string' && ref.startsWith('file-')) {
    const parts = ref.split('-');
    const ext = parts[parts.length - 1];
    const assetId = parts.slice(1, -1).join('-');
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
  }

  return null;
}

/**
 * Analisa uma URL de vídeo e extrai suas características (YouTube, Vimeo, Loom, Google Drive ou Arquivo Direto).
 */
export function parseVideoSource(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. YouTube (URLs padrão, encurtadas, shorts, embeds)
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1];
    return {
      type: 'youtube',
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&playsinline=1&rel=0&modestbranding=1`,
      rawUrl: trimmed,
    };
  }

  // 2. Vimeo (URLs padrão, canais, grupos, players diretos)
  const vimeoMatch = trimmed.match(
    /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/i
  );
  if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[2] || vimeoMatch[1])) {
    const id = vimeoMatch[3] || vimeoMatch[2] || vimeoMatch[1];
    return {
      type: 'vimeo',
      id,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&autopause=0&background=0&controls=1`,
      rawUrl: trimmed,
    };
  }

  // 3. Loom
  const loomMatch = trimmed.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9_-]+)/i);
  if (loomMatch && loomMatch[1]) {
    const id = loomMatch[1];
    return {
      type: 'loom',
      id,
      embedUrl: `https://www.loom.com/embed/${id}?autoplay=1&muted=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`,
      rawUrl: trimmed,
    };
  }

  // 4. Google Drive
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (driveMatch && driveMatch[1]) {
    const id = driveMatch[1];
    return {
      type: 'drive',
      id,
      embedUrl: `https://drive.google.com/file/d/${id}/preview`,
      rawUrl: trimmed,
    };
  }

  // 5. Arquivo de Vídeo Direto (.mp4, .webm, .mov, .m4v, .ogg ou CDN Sanity)
  return {
    type: 'direct',
    src: trimmed,
    rawUrl: trimmed,
  };
}

/**
 * Determina se uma URL ou objeto de mídia corresponde a um vídeo.
 */
export function isVideoMedia(source) {
  if (!source) return false;

  const url = typeof source === 'string' ? source : source.asset?.url || source.url || '';
  if (!url) return false;

  // Extensões de vídeo comuns
  if (/\.(mp4|webm|mov|m4v|ogg)($|\?)/i.test(url)) {
    return true;
  }

  // Domínios de vídeo conhecidos
  if (
    /youtube\.com|youtu\.be|vimeo\.com|loom\.com|drive\.google\.com/i.test(url)
  ) {
    return true;
  }

  // Sanity file asset de vídeo
  if (typeof source === 'string' && source.startsWith('file-') && /-(mp4|webm|mov|m4v|ogg)$/i.test(source)) {
    return true;
  }

  const ref = source.asset?._ref || source._ref;
  if (typeof ref === 'string' && ref.startsWith('file-') && /-(mp4|webm|mov|m4v|ogg)$/i.test(ref)) {
    return true;
  }

  return false;
}
