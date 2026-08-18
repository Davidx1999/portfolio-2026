import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pjq90dr2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function inspect() {
  try {
    console.log('Fetching document count by type...');
    const types = await client.fetch(`*[]{ _type, _id, language, title, slug }`);
    console.log(`Total documents found: ${types.length}`);
    
    const byType = {};
    types.forEach((doc) => {
      byType[doc._type] = (byType[doc._type] || 0) + 1;
    });
    console.log('Documents by type:', JSON.stringify(byType, null, 2));

    const sampleProjects = await client.fetch(`*[_type == "project"][0...5]{ _id, title, slug, language, translationStatus }`);
    console.log('Sample projects:', JSON.stringify(sampleProjects, null, 2));

    const aboutDocs = await client.fetch(`*[_type == "aboutPage"]{ _id, language, title }`);
    console.log('About docs:', JSON.stringify(aboutDocs, null, 2));

    const letsTalkDocs = await client.fetch(`*[_type == "letsTalkPage"]{ _id, language, heroTitle }`);
    console.log('LetsTalk docs:', JSON.stringify(letsTalkDocs, null, 2));
  } catch (err) {
    console.error('Error querying Sanity:', err);
  }
}

inspect();
