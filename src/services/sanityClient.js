import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});

export const projectId = env.VITE_SANITY_PROJECT_ID || env.SANITY_PROJECT_ID || 'pjq90dr2';
export const dataset = env.VITE_SANITY_DATASET || env.SANITY_DATASET || 'production';
export const apiVersion = env.VITE_SANITY_API_VERSION || env.SANITY_API_VERSION || '2024-01-01';

// Em desenvolvimento (Vite dev server / localhost), useCdn DEVE ser false para refletir mudanças e publicações imediatamente.
// Em produção (Vercel / build), useCdn é true para usufruir da borda de CDN do Sanity.
const isProd = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD) ||
  (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production');

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isProd,
});

const builder = createImageUrlBuilder(sanityClient);

/**
 * Helper to build Sanity image URL builder or resolve URLs safely.
 * Returns an ImageUrlBuilder instance when given an asset/image object,
 * or handles string URLs directly.
 */
export function urlFor(source) {
  if (!source) return null;
  if (typeof source === 'string') {
    return {
      url: () => source,
      width: () => ({ url: () => source }),
      height: () => ({ url: () => source }),
      toString: () => source,
    };
  }
  try {
    return builder.image(source);
  } catch (err) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ [urlFor]: Erro ao construir URL de imagem do Sanity:', err);
    }
    return null;
  }
}
