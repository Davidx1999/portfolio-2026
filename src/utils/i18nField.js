/**
 * Utilitário Centralizado de Resolução Field-Level com Fallback Universal para Inglês (EN)
 *
 * Regras:
 * - Se o campo for um objeto localizado { _type: 'localizedString', en, ptBR }:
 *   - Em 'pt', 'pt-BR', 'pt_BR' ou 'ptBR': retorna ptBR se preenchido; se vazio, faz fallback automático para 'en'.
 *   - Em 'en': retorna 'en'; se vazio, tenta 'ptBR'.
 * - Se o campo for uma string/número/booleano direto (legado ou compartilhado), retorna o valor diretamente.
 * - Se for array (ex: tags, bullet points), resolve cada item individualmente.
 * - Preserva blocos de Portable Text sem convertê-los indevidamente em string.
 * - NUNCA retorna o objeto localizado bruto {_type, en, ptBR} como fallback para evitar React Error #31.
 * - NUNCA usa String(object) para mascarar dados mal-formatados.
 */

export const localeKeys = {
  en: 'en',
  pt: 'ptBR',
  'pt-BR': 'ptBR',
  'pt_BR': 'ptBR',
  ptBR: 'ptBR',
};

export function isPtLocale(locale) {
  if (!locale) return false;
  const l = String(locale).toLowerCase();
  return l === 'pt' || l === 'pt-br' || l === 'pt_br' || l === 'ptbr';
}

/**
 * Resolve qualquer valor (string, objeto localizado, array ou nulo) para o idioma solicitado.
 */
export function resolveLocalized(value, language = 'en') {
  if (value === null || value === undefined) {
    return '';
  }

  // Se já for string pura, número ou booleano direto
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  // Se for array (ex: lista de tags, disciplinas ou bullet points)
  if (Array.isArray(value)) {
    // Se for Portable Text (array de blocos Sanity com _type: 'block')
    if (value.length > 0 && typeof value[0] === 'object' && value[0]?._type === 'block') {
      return value;
    }
    return value.map((item) => resolveLocalized(item, language)).filter(Boolean);
  }

  // Se for objeto (ex: {_type: 'localizedString', en: '...', ptBR: '...'} ou {en, ptBR})
  if (typeof value === 'object') {
    // Se for Portable Text localizado { _type: 'localizedPortableText', en: [...], ptBR: [...] }
    if (value._type === 'localizedPortableText') {
      const key = localeKeys[language] ?? 'en';
      const ptBlocks = value[key] ?? value.en ?? value.ptBR ?? [];
      return Array.isArray(ptBlocks) ? ptBlocks : [];
    }

    const key = localeKeys[language] ?? 'en';
    const targetVal = value[key];

    // 1. Tenta o idioma alvo
    if (targetVal !== undefined && targetVal !== null && targetVal !== '') {
      if (typeof targetVal === 'string') return targetVal;
      if (typeof targetVal === 'object') return resolveLocalized(targetVal, language);
      return targetVal;
    }

    // 2. Fallback automático para inglês (EN)
    const enVal = value.en;
    if (enVal !== undefined && enVal !== null && enVal !== '') {
      if (typeof enVal === 'string') return enVal;
      if (typeof enVal === 'object') return resolveLocalized(enVal, language);
      return enVal;
    }

    // 3. Fallback para ptBR se inglês não existir
    const ptVal = value.ptBR ?? value.pt;
    if (ptVal !== undefined && ptVal !== null && ptVal !== '') {
      if (typeof ptVal === 'string') return ptVal;
      if (typeof ptVal === 'object') return resolveLocalized(ptVal, language);
      return ptVal;
    }

    // Proteção em desenvolvimento para avisar no console sem quebrar produção
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      if (value._type === 'localizedString' || value._type === 'localizedText' || value.en !== undefined || value.ptBR !== undefined) {
        console.warn('⚠️ [resolveLocalized]: Objeto localizado sem conteúdo válido nos idiomas configurados:', value);
      }
    }

    // NUNCA retorna o objeto original como fallback
    return '';
  }

  return '';
}

export const resolveField = resolveLocalized;

/**
 * Proteção textual para uso direto em JSX ({safeText(prop)}) garantindo que nunca
 * um objeto { _type, en, ptBR } chegue a tags como <h1>, <h2>, <h3>, <p>, alt, etc.
 */
export function safeText(value, language = 'en', fallback = '') {
  const resolved = resolveLocalized(value, language);
  if (typeof resolved === 'string') return resolved || fallback;
  if (typeof resolved === 'number' || typeof resolved === 'boolean') return String(resolved);
  return fallback;
}

export function resolveMedia(mainVisual, legacyImage, legacyVideo) {
  const img = mainVisual?.image || legacyImage || null;
  const video = mainVisual?.videoUrl || legacyVideo || null;
  const poster = mainVisual?.videoPoster || img;

  return {
    image: img,
    videoUrl: video,
    videoPoster: poster,
    alt: mainVisual?.alt,
  };
}
