import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});

export const projectId = env.VITE_SANITY_PROJECT_ID || env.SANITY_PROJECT_ID || 'pjq90dr2';
export const dataset = env.VITE_SANITY_DATASET || env.SANITY_DATASET || 'production';
export const apiVersion = env.VITE_SANITY_API_VERSION || env.SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `true` to get fast cached responses in production
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper to build image URLs from Sanity image assets.
 * If source is a string URL or undefined, it returns it directly or fallback.
 */
export function urlFor(source) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  try {
    return builder.image(source).url();
  } catch (err) {
    console.warn('Error resolving Sanity image URL:', err);
    return typeof source === 'string' ? source : '';
  }
}
