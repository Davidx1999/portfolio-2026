import { createClient } from '@sanity/client';
import { normalizeProject, normalizeContentBlock } from '../src/utils/normalizeProject.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'pjq90dr2';
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function runTests() {
  console.log('================================================================');
  console.log('🧪 SUITE DE TESTES: ARQUITETURA MODULAR DE CASES & FIELD-LEVEL I18N');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} — ${details}`);
      failed++;
    }
  }

  // -------------------------------------------------------------------------
  // TESTE 1: Leitura e Normalização do Dataset Real
  // -------------------------------------------------------------------------
  console.log('🔹 TESTE 1: Consulta GROQ e Normalização de Projetos Reais');
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, _createdAt desc){
    ...,
    "coverImageUrl": coverImage.asset->url,
    "reconstructImageUrl": reconstructImage.asset->url,
    "mainVisualImageUrl": mainVisual.image.asset->url,
    "mainVisualPosterUrl": mainVisual.videoPoster.asset->url,
    "heroMediaImage": heroMediaOverride.image.asset->url,
    "heroMediaPoster": heroMediaOverride.videoPoster.asset->url,
    "slug": coalesce(slug.current, id.current, id, _id)
  }`;

  const sanityProjects = await client.fetch(query);
  assert(sanityProjects.length > 0, 'Consulta GROQ retornou projetos válidos');

  const firstProject = sanityProjects[0];
  const normalizedEn = normalizeProject(firstProject, 'en');
  const normalizedPt = normalizeProject(firstProject, 'pt');

  assert(normalizedEn && normalizedEn.title, 'Normalização em EN gerou título válido');
  assert(normalizedPt && normalizedPt.title, 'Normalização em PT gerou título válido');
  assert(normalizedEn.coverImage !== null, 'coverImage resolvida corretamente');
  assert(Array.isArray(normalizedEn.contentBlocks), 'contentBlocks normalizado como Array');
  assert(normalizedEn.contentBlocks.length >= 1, `contentBlocks contém blocos migrados (total: ${normalizedEn.contentBlocks.length})`);

  // -------------------------------------------------------------------------
  // TESTE 2: Simulação de Criação de 2 Projetos Arbitrários Novos
  // -------------------------------------------------------------------------
  console.log('\n🔹 TESTE 2: Simulação de Criação de Projetos Arbitrários com Blocos Diferentes');

  // Projeto A: FinTech Dashboard
  const arbitraryProjectA = {
    _id: 'test-arbitrary-project-a',
    _type: 'project',
    title: { en: 'Aura Financial Hub', ptBR: 'Aura Centro Financeiro' },
    slug: { current: 'aura-financial' },
    shortDescription: {
      en: 'Real-time wealth management platform for institutional funds.',
      ptBR: 'Plataforma de gestão patrimonial em tempo real para fundos institucionais.',
    },
    category: { en: 'FinTech Platform', ptBR: 'Plataforma FinTech' },
    period: '2025',
    coverImage: { asset: { url: 'https://images.unsplash.com/photo-cover-aura.jpg' } },
    reconstructImage: { asset: { url: 'https://images.unsplash.com/photo-reconstruct-aura.jpg' } },
    contentBlocks: [
      {
        _key: 'b1',
        _type: 'textSection',
        title: { en: 'Executive Summary', ptBR: 'Sumário Executivo' },
        body: { en: 'Aura was built to unify disparate banking rails into a singular interface.', ptBR: 'Aura foi construído para unificar trilhos bancários em uma interface única.' },
      },
      {
        _key: 'b2',
        _type: 'beforeAfter',
        beforeImage: { asset: { url: 'https://images.unsplash.com/legacy-table.jpg' } },
        afterImage: { asset: { url: 'https://images.unsplash.com/modular-grid.jpg' } },
        beforeLabel: { en: 'Legacy Terminal', ptBR: 'Terminal Legado' },
        afterLabel: { en: 'Aura Reactive UI', ptBR: 'UI Reativa Aura' },
      },
      {
        _key: 'b3',
        _type: 'impactBlock',
        title: { en: 'Performance Metrics', ptBR: 'Métricas de Performance' },
        items: [
          { value: '-65%', label: { en: 'Settlement Latency', ptBR: 'Latência de Liquidação' } },
          { value: '$4.2B', label: { en: 'Volume Managed', ptBR: 'Volume Gerenciado' } },
        ],
      },
    ],
  };

  const normProjA_EN = normalizeProject(arbitraryProjectA, 'en');
  const normProjA_PT = normalizeProject(arbitraryProjectA, 'pt');

  assert(normProjA_EN.title === 'Aura Financial Hub', 'Projeto A resolve título em EN');
  assert(normProjA_PT.title === 'Aura Centro Financeiro', 'Projeto A resolve título em PT');
  assert(normProjA_EN.coverImage === 'https://images.unsplash.com/photo-cover-aura.jpg', 'Projeto A resolve coverImage');
  assert(normProjA_EN.reconstructImage === 'https://images.unsplash.com/photo-reconstruct-aura.jpg', 'Projeto A resolve reconstructImage');
  assert(normProjA_EN.contentBlocks.length === 3, 'Projeto A possui 3 contentBlocks');
  assert(normProjA_EN.contentBlocks[0]._type === 'textSection', 'Bloco 1 do Projeto A é textSection');
  assert(normProjA_EN.contentBlocks[1]._type === 'beforeAfter', 'Bloco 2 do Projeto A é beforeAfter');
  assert(normProjA_EN.contentBlocks[2]._type === 'impactBlock', 'Bloco 3 do Projeto A é impactBlock');

  // Projeto B: HealthTech Telemedicine
  const arbitraryProjectB = {
    _id: 'test-arbitrary-project-b',
    _type: 'project',
    title: { en: 'Synapse Health Network' }, // Apenas EN (para testar fallback)
    slug: { current: 'synapse-health' },
    coverImage: { asset: { url: 'https://images.unsplash.com/health-cover.jpg' } },
    contentBlocks: [
      {
        _key: 'c1',
        _type: 'chapterIntro',
        chapterNumber: '01',
        title: { en: 'Clinical Triage System' }, // Apenas EN
      },
      {
        _key: 'c2',
        _type: 'decisionSection',
        title: { en: 'Key Clinical Trade-Offs' },
        decisions: [
          {
            number: '01',
            challenge: { en: 'High cognitive load during emergency triage' },
            decision: { en: 'Progressive disclosure with critical vital signs pinned' },
          },
        ],
      },
    ],
  };

  const normProjB_PT = normalizeProject(arbitraryProjectB, 'pt');
  assert(normProjB_PT.title === 'Synapse Health Network', 'Projeto B realiza fallback para EN quando PT-BR está ausente');
  assert(normProjB_PT.contentBlocks[0].title === 'Clinical Triage System', 'Bloco de Projeto B realiza fallback de campo interno para EN');
  assert(normProjB_PT.contentBlocks[1].decisions[0].challenge === 'High cognitive load during emergency triage', 'Array interno de decisões realiza fallback para EN');

  // -------------------------------------------------------------------------
  // TESTE 3: Reordenação de Blocos no Sanity
  // -------------------------------------------------------------------------
  console.log('\n🔹 TESTE 3: Reordenação Dinâmica de Blocos');
  const reorderedBlocks = [
    arbitraryProjectA.contentBlocks[2], // impactBlock primeiro
    arbitraryProjectA.contentBlocks[0], // textSection segundo
    arbitraryProjectA.contentBlocks[1], // beforeAfter terceiro
  ];

  const reorderedProject = { ...arbitraryProjectA, contentBlocks: reorderedBlocks };
  const normReordered = normalizeProject(reorderedProject, 'en');

  assert(normReordered.contentBlocks[0]._type === 'impactBlock', 'Bloco 0 agora é impactBlock');
  assert(normReordered.contentBlocks[1]._type === 'textSection', 'Bloco 1 agora é textSection');
  assert(normReordered.contentBlocks[2]._type === 'beforeAfter', 'Bloco 2 agora é beforeAfter');

  // -------------------------------------------------------------------------
  // TESTE 4: Verificação de Ausência de Hardcoded Logic para Slugs Fixos
  // -------------------------------------------------------------------------
  console.log('\n🔹 TESTE 4: Verificação de Ausência de Condições Hardcoded por Slug');
  const caseStudyPagePath = path.join(__dirname, '..', 'src', 'pages', 'CaseStudyPage.jsx');
  const caseStudyPageContent = fs.readFileSync(caseStudyPagePath, 'utf8');

  assert(!caseStudyPageContent.includes("'mapear'"), 'CaseStudyPage.jsx não possui fallback fixo para "mapear"');
  assert(!caseStudyPageContent.includes("slug === 'mapear'"), 'CaseStudyPage.jsx não possui condições por slug específico');

  console.log('\n================================================================');
  console.log(`🏁 RESULTADO DOS TESTES: ${passed} PASSOU / ${failed} FALHOU`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('❌ Erro durante a execução da suite de testes:', err);
  process.exit(1);
});
