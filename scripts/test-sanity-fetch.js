import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'pjq90dr2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function check() {
  try {
    const res = await sanityClient.fetch('*[_type == "project" && (slug.current == "mapear" || id == "mapear" || _id == "mapear")][0]');
    console.log('Sanity Mapear result:', res ? {
      _id: res._id,
      title: res.title,
      slug: res.slug,
      contentBlocksCount: res.contentBlocks?.length || 0,
      contentBlocksTypes: res.contentBlocks?.map(b => b._type) || [],
      heroMedia: res.heroMedia,
    } : 'NOT FOUND IN SANITY');

    const all = await sanityClient.fetch('*[_type == "project"]{ title, "slug": slug.current, id, "blocks": count(contentBlocks) }');
    console.log('All Sanity projects in production:', all);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

check();
