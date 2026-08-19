import { createClient } from '@sanity/client';

const projectId = 'pjq90dr2';
const dataset = 'production';
const apiVersion = '2024-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function testFrontendQueries() {
  console.log('🧪 Testando queries do Frontend contra o dataset Sanity production...\n');

  // 1. Query Obrigatória
  const mandatoryQuery = `*[ _type == "project" && !(_id in path("drafts.**")) ]{ _id, title, language, translationStatus, slug, featured, publishedAt }`;
  const allProjects = await client.fetch(mandatoryQuery);
  console.log('1. [Consulta Obrigatória]:');
  console.log(JSON.stringify(allProjects, null, 2));

  // 2. useProjects (EN)
  const projectsEnQuery = `*[_type == "project" && !(_id in path("drafts.**")) && coalesce(language, "en") == $targetLocale] | order(featuredOrder asc, orderRank asc, _createdAt desc){
    _id,
    title,
    language,
    translationStatus,
    "slug": coalesce(slug.current, id.current, id, _id)
  }`;
  const projectsEn = await client.fetch(projectsEnQuery, { targetLocale: 'en' });
  console.log(`\n2. [useProjects - targetLocale="en"]: ${projectsEn.length} projeto(s)`);
  console.log(JSON.stringify(projectsEn, null, 2));

  // 3. useProjects (PT-BR)
  const projectsPt = await client.fetch(projectsEnQuery, { targetLocale: 'pt-BR' });
  console.log(`\n3. [useProjects - targetLocale="pt-BR"]: ${projectsPt.length} projeto(s)`);
  console.log(JSON.stringify(projectsPt, null, 2));

  // 4. useCaseStudy (slug: "MapearPlataforma", targetLocale: "pt-BR")
  const casePtQuery = `*[_type == "project" && !(_id in path("drafts.**")) && (lower(slug.current) == lower($slug) || slug.current == $slug || id.current == $slug || id == $slug || _id == $slug) && coalesce(language, "en") == $targetLocale][0]{
    _id,
    title,
    language,
    translationStatus,
    "slug": coalesce(slug.current, id.current, id, _id)
  }`;
  const casePt = await client.fetch(casePtQuery, { slug: 'MapearPlataforma', targetLocale: 'pt-BR' });
  console.log(`\n4. [useCaseStudy - "MapearPlataforma" / pt-BR]:`);
  console.log(JSON.stringify(casePt, null, 2));
}

testFrontendQueries();
