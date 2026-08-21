import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pjq90dr2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function inspect() {
  const projects = await client.fetch(`*[_type == "project"]{
    _id,
    "slug": slug.current,
    "title": title.en,
    "blocks": contentBlocks[]{
      _type,
      _key,
      videoUrl,
      externalVideo,
      videoFile,
      poster
    }
  }`);
  console.log('Projects:', JSON.stringify(projects, null, 2));

  const files = await client.fetch(`*[_type == "sanity.fileAsset"]{ _id, url, originalFilename, mimeType, size }`);
  console.log('Files in Sanity:', JSON.stringify(files, null, 2));
}

inspect();
