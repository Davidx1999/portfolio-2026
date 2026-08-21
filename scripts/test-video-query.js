import { createClient } from '@sanity/client';
import { normalizeProject } from '../src/utils/normalizeProject.js';

const client = createClient({
  projectId: 'pjq90dr2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && (lower(slug.current) == lower($slug) || slug.current == $slug || id.current == $slug || id == $slug || _id == $slug)][0]{
    ...,
    "coverImageUrl": coverImage.asset->url,
    "reconstructImageUrl": reconstructImage.asset->url,
    "mainVisualImageUrl": mainVisual.image.asset->url,
    "mainVisualPosterUrl": mainVisual.videoPoster.asset->url,
    "heroMediaImage": heroMediaOverride.image.asset->url,
    "heroMediaPoster": heroMediaOverride.videoPoster.asset->url,
    "slug": coalesce(slug.current, id.current, id, _id),
    contentBlocks[]{
      ...,
      videoFile{
        ...,
        asset->{
          ...,
          url,
          mimeType,
          originalFilename,
          size
        }
      },
      poster{
        ...,
        asset->{
          ...,
          url
        }
      }
    },
    "nextCaseRef": nextCase->{
      ...,
      "slug": coalesce(slug.current, id.current, id, _id),
      "coverImageUrl": coverImage.asset->url,
      "reconstructImageUrl": reconstructImage.asset->url,
      "mainVisualImageUrl": mainVisual.image.asset->url
    }
  }`;

  const res = await client.fetch(query, { slug: 'mapear' });
  console.log('--- Raw Sanity Project (mapear) ---');
  const vBlock = res?.contentBlocks?.find((b) => b._type === 'prototypeVideo' || b._type === 'videoBlock');
  console.log('Video block from GROQ:', JSON.stringify(vBlock, null, 2));

  const normalized = normalizeProject(res, 'pt');
  const normVBlock = normalized?.contentBlocks?.find((b) => b._type === 'prototypeVideo' || b._type === 'videoBlock');
  console.log('\n--- Normalized Video Block ---');
  console.log(JSON.stringify(normVBlock, null, 2));
}

run();
