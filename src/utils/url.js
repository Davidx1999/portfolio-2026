/**
 * Utilitário para validação estrita de URLs com protocolos HTTP e HTTPS
 */
export function isValidHttpUrl(string) {
  if (!string || typeof string !== 'string') return false;
  try {
    const parsed = new URL(string.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export default isValidHttpUrl;
