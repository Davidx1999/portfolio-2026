import { createClient } from '@sanity/client';

const projectId = 'pjq90dr2';
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error('SANITY_API_WRITE_TOKEN is required to run this script.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function testDeepLFieldTranslation() {
  console.log('🧪 Testando fluxo de tradução DeepL no mesmo documento...\n');

  // 1. Busca primeiro projeto do dataset
  const projects = await client.fetch('*[_type == "project" && !(_id in path("drafts.**"))]');
  if (!projects || projects.length === 0) {
    console.log('Nenhum projeto encontrado para testar.');
    return;
  }

  const doc = projects[0];
  console.log('1. Documento canônico antes da tradução:');
  console.log({
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    role: doc.role,
    translationStatus: doc.translationStatus,
  });

  // 2. Simula criação do draft traduzido no mesmo documento
  console.log('\n2. Simulando preenchimento dos campos ptBR via DeepL...');
  const updatedDraft = {
    ...doc,
    _id: `drafts.${doc._id}`,
    title: {
      _type: 'localizedString',
      en: doc.title?.en || 'Mapear',
      ptBR: 'Mapear Plataforma',
    },
    shortDescription: {
      _type: 'localizedText',
      en: doc.shortDescription?.en || 'Educational assessment ecosystem connecting research, design systems, and software engineering.',
      ptBR: 'Ecossistema digital de avaliação educacional conectando pesquisa, design systems e engenharia.',
    },
    category: {
      _type: 'localizedString',
      en: 'Product Design',
      ptBR: 'Design de Produto',
    },
    role: {
      _type: 'localizedString',
      en: 'Lead Product Designer',
      ptBR: 'Lead Product Designer',
    },
    translationStatus: 'needs_review',
    sourceContentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  };

  delete updatedDraft._rev;
  delete updatedDraft._createdAt;
  delete updatedDraft._updatedAt;

  await client.createOrReplace(updatedDraft);
  console.log('   ✅ Rascunho (draft) salvo no mesmo documento com status "needs_review"!');

  const draftResult = await client.getDocument(`drafts.${doc._id}`);
  console.log('\n3. Rascunho verificado no Sanity:');
  console.log({
    _id: draftResult._id,
    slug: draftResult.slug,
    title: draftResult.title,
    shortDescription: draftResult.shortDescription,
    category: draftResult.category,
    role: draftResult.role,
    translationStatus: draftResult.translationStatus,
    sourceContentHash: draftResult.sourceContentHash,
  });
}

testDeepLFieldTranslation();
