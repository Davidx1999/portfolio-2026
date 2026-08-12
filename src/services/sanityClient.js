import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'pjq90dr2';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

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
