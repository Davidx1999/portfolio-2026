import { createClient } from '@sanity/client';
import { resolveField } from '../src/utils/i18nField.js';

const client = createClient({
  projectId: 'pjq90dr2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function validatePhase1() {
  console.log('🧪 Validando Fase 1 contra o dataset de produção...\n');

  // 1. Consulta dos projetos
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, orderRank asc, _createdAt desc){
    _id,
    "slug": coalesce(slug.current, id.current, id, _id),
    title,
    category,
    role,
    caseDepth,
    featuredOnHome,
    translationStatus,
    mainVisual,
    overview,
    challenge,
    solutionSummary,
    impact,
    finalReflection
  }`;

  const projects = await client.fetch(query);
  console.log(`📊 Total de projetos retornados: ${projects.length}`);

  for (const p of projects) {
    console.log(`\n-----------------------------------------------------------`);
    console.log(`Projeto: [${p._id}] / Slug: /work/${p.slug}`);
    console.log(`   Título EN:   "${resolveField(p.title, 'en')}"`);
    console.log(`   Título PT:   "${resolveField(p.title, 'pt-BR')}"`);
    console.log(`   Status Trad: ${p.translationStatus}`);
    console.log(`   Case Depth:  ${p.caseDepth}`);
    console.log(`   Visual Main: ${p.mainVisual?.image ? '✓ Imagem configurada' : '⚠️ Sem imagem'}`);
    console.log(`   Overview EN: "${resolveField(p.overview, 'en')?.slice(0, 40)}..."`);
    console.log(`   Overview PT: "${resolveField(p.overview, 'pt-BR')?.slice(0, 40)}..."`);
  }

  // 2. Consulta específica do case Mapear
  const mapearSlug = 'mapear';
  const mapearQuery = `*[_type == "project" && !(_id in path("drafts.**")) && (lower(slug.current) == lower($slug) || slug.current == $slug)][0]{
    _id,
    slug,
    title,
    shortDescription,
    category,
    role,
    mainVisual,
    heroEyebrow,
    heroHeadline,
    heroSummary,
    overview,
    challenge,
    solutionSummary,
    impact,
    finalReflection,
    responsibilities
  }`;

  const mapearDoc = await client.fetch(mapearQuery, { slug: mapearSlug });
  console.log(`\n===========================================================`);
  console.log(`🔍 Teste de Consulta do Estudo de Caso "Mapear":`);
  if (mapearDoc) {
    console.log(`   ✅ Documento encontrado! ID: [${mapearDoc._id}]`);
    console.log(`   URL EN: /en/work/${mapearDoc.slug.current}`);
    console.log(`   URL PT: /pt/work/${mapearDoc.slug.current}`);
    console.log(`   Título resolvido (EN): "${resolveField(mapearDoc.title, 'en')}"`);
    console.log(`   Título resolvido (PT): "${resolveField(mapearDoc.title, 'pt-BR')}"`);
    console.log(`   Categoria (EN): "${resolveField(mapearDoc.category, 'en')}"`);
    console.log(`   Categoria (PT): "${resolveField(mapearDoc.category, 'pt-BR')}"`);
  } else {
    console.log(`   ❌ Documento Mapear não encontrado pelo slug "${mapearSlug}".`);
  }
}

validatePhase1();
