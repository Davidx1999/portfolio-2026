/**
 * Utilitário de Resolução Field-Level com Fallback Universal para Inglês (EN)
 *
 * Regras:
 * - Se o campo for um objeto localizado { en, ptBR }:
 *   - Em 'pt' ou 'pt-BR': retorna ptBR se preenchido; se vazio, faz fallback automático para 'en'.
 *   - Em 'en': retorna 'en'.
 * - Se o campo for uma string/número direto (legado ou compartilhado), retorna o valor diretamente.
 * - Nunca retorna undefined/null se houver fallback em inglês.
 */

export function isPtLocale(locale) {
  if (!locale) return false;
  const l = String(locale).toLowerCase();
  return l === 'pt' || l === 'pt-br' || l === 'pt_br';
}

export function resolveField(field, locale = 'en') {
  if (field === null || field === undefined) {
    return '';
  }

  // Se já for string, número ou booleano direto
  if (typeof field !== 'object') {
    return field;
  }

  // Se for objeto localizado com { en, ptBR }
  if (Object.prototype.hasOwnProperty.call(field, 'en') || Object.prototype.hasOwnProperty.call(field, 'ptBR')) {
    if (isPtLocale(locale)) {
      if (field.ptBR !== undefined && field.ptBR !== null && field.ptBR !== '') {
        return field.ptBR;
      }
      return field.en ?? '';
    }
    return field.en ?? field.ptBR ?? '';
  }

  // Se for array (ex: lista de responsabilidades ou entregáveis)
  if (Array.isArray(field)) {
    return field.map((item) => resolveField(item, locale));
  }

  return field;
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
