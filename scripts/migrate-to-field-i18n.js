import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDryRun = process.argv.includes('--dry-run');

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'pjq90dr2';
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
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

function normalizeSlugString(str) {
  if (!str) return 'untitled';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
}

function toLocalizedString(valEn, valPt) {
  if (typeof valEn === 'object' && valEn !== null && (valEn.en || valEn.ptBR)) {
    return {
      _type: 'localizedString',
      en: valEn.en || '',
      ptBR: valPt || valEn.ptBR || '',
    };
  }
  return {
    _type: 'localizedString',
    en: typeof valEn === 'string' ? valEn : '',
    ptBR: typeof valPt === 'string' ? valPt : '',
  };
}

function toLocalizedText(valEn, valPt) {
  if (typeof valEn === 'object' && valEn !== null && (valEn.en || valEn.ptBR)) {
    return {
      _type: 'localizedText',
      en: valEn.en || '',
      ptBR: valPt || valEn.ptBR || '',
    };
  }
  return {
    _type: 'localizedText',
    en: typeof valEn === 'string' ? valEn : '',
    ptBR: typeof valPt === 'string' ? valPt : '',
  };
}

async function main() {
  console.log(`=======================================================`);
  console.log(`🚀 MIGRAÇÃO SANITY: FIELD-LEVEL INTERNATIONALIZATION`);
  console.log(`   Modo: ${isDryRun ? '🔍 DRY-RUN (Nenhuma alteração será gravada)' : '⚡ GRAVAÇÃO REAL'}`);
  console.log(`   Dataset: ${dataset} | Project ID: ${projectId}`);
  console.log(`=======================================================\n`);

  // 1. BACKUP COMPLETO DO DATASET
  console.log(`📦 [1/5] Gerando backup completo de segurança do dataset "${dataset}"...`);
  const allDatasetDocs = await client.fetch(`*[]`);
  const backupDir = path.resolve(__dirname, '../sanity/backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFilename = `backup-before-field-i18n-${dataset}-${timestamp}.json`;
  const backupPath = path.join(backupDir, backupFilename);
  fs.writeFileSync(backupPath, JSON.stringify(allDatasetDocs, null, 2), 'utf-8');
  console.log(`✅ Backup salvo com sucesso (${allDatasetDocs.length} documentos): ${backupPath}\n`);

  // 2. BUSCA DE DOCUMENTOS (DATASET + BACKUP DE RECUPERAÇÃO)
  console.log(`🔍 [2/5] Mapeando metadados de tradução e projetos existentes...`);
  const metadataDocs = await client.fetch(`*[_type == "translation.metadata"]`);
  let allProjects = await client.fetch(`*[_type == "project" && !(_id in path("drafts.**"))]`);

  // Se o documento Mapear (c179568e-44cf-477a-87cf-33e80398d10a) não estiver na listagem ativa, recupera do backup
  const hasMapear = allProjects.some((p) => p._id === 'c179568e-44cf-477a-87cf-33e80398d10a' || (p.title && JSON.stringify(p.title).includes('Mapear')));
  if (!hasMapear) {
    const historicalBackupPath = path.join(backupDir, 'backup-before-i18n-fix-production-2026-08-18T23-42-34-226Z.json');
    if (fs.existsSync(historicalBackupPath)) {
      const historicalDocs = JSON.parse(fs.readFileSync(historicalBackupPath, 'utf8'));
      const mapearFromBackup = historicalDocs.find((d) => d._id === 'c179568e-44cf-477a-87cf-33e80398d10a');
      if (mapearFromBackup) {
        console.log(`   ℹ️ Recuperando estudo de caso "Mapear" [c179568e-44cf-477a-87cf-33e80398d10a] do backup histórico.`);
        allProjects.push(mapearFromBackup);
      }
    }
  }

  console.log(`   Total de projetos para migração: ${allProjects.length}`);
  console.log(`   Total de translation.metadata encontrados: ${metadataDocs.length}\n`);

  // 3. ANÁLISE E CONSTRUÇÃO DO PLANO DE MIGRAÇÃO
  console.log(`⚙️ [3/5] Preparando fusão e transformação dos documentos para Field-Level i18n...\n`);
  const migrationPlan = [];

  for (const doc of allProjects) {
    const canonicalId = doc._id;
    let canonicalSlug = normalizeSlugString(doc.slug?.current || doc.slug || doc.title || 'project');
    if (canonicalSlug === 'mapearplataforma') {
      canonicalSlug = 'mapear';
    }

    // Mídias
    const primaryCover = doc.mainVisual?.image || doc.coverImage || doc.image || doc.finalImage;
    const mainVisualPayload = {
      _type: 'mainVisualMedia',
      image: primaryCover,
      videoUrl: doc.mainVisual?.videoUrl || doc.heroMedia?.videoUrl || null,
      videoPoster: doc.mainVisual?.videoPoster || doc.heroMedia?.poster || primaryCover,
      alt: toLocalizedString(
        doc.mainVisual?.alt?.en || doc.heroMedia?.alt_en || doc.alt || doc.title || '',
        doc.mainVisual?.alt?.ptBR || doc.heroMedia?.alt || doc.alt || doc.title || ''
      ),
    };

    // Textos Localizados
    const titlePayload = toLocalizedString(
      doc.title?.en || doc.title || '',
      doc.title?.ptBR || doc.title || ''
    );

    const shortDescPayload = toLocalizedText(
      doc.shortDescription?.en || doc.shortDescription || doc.heroSummary_en || doc.heroSummary || '',
      doc.shortDescription?.ptBR || doc.shortDescription || doc.heroSummary || ''
    );

    const categoryPayload = toLocalizedString(
      doc.category?.en || doc.category || 'Product Design',
      doc.category?.ptBR || (doc.category === 'Product Design' ? 'Design de Produto' : doc.category) || 'Design de Produto'
    );

    const rolePayload = toLocalizedString(
      doc.role?.en || doc.role || 'Lead Product Designer',
      doc.role?.ptBR || doc.role || 'Lead Product Designer'
    );

    const eyebrowPayload = toLocalizedString(
      doc.heroEyebrow?.en || doc.eyebrow_en || doc.eyebrow || '01 // SISTEMA & ARQUITETURA',
      doc.heroEyebrow?.ptBR || doc.eyebrow || '01 // SISTEMA & ARQUITETURA'
    );

    const heroHeadlinePayload = toLocalizedString(
      doc.heroHeadline?.en || doc.title?.en || doc.title || '',
      doc.heroHeadline?.ptBR || doc.title?.ptBR || doc.title || ''
    );

    const heroSummaryPayload = toLocalizedText(
      doc.heroSummary?.en || doc.heroSummary_en || doc.heroSummary || doc.shortDescription || '',
      doc.heroSummary?.ptBR || doc.heroSummary || doc.shortDescription || ''
    );

    const overviewPayload = toLocalizedText(
      doc.overview?.en || doc.overview_en || doc.overview || '',
      doc.overview?.ptBR || doc.overview || ''
    );

    const contextPayload = toLocalizedText(
      doc.context?.en || doc.context_en || doc.clientOrContext || '',
      doc.context?.ptBR || doc.context || doc.clientOrContext || ''
    );

    const challengePayload = toLocalizedText(
      doc.challenge?.en || doc.challenge_en || doc.challenge || '',
      doc.challenge?.ptBR || doc.challenge || ''
    );

    const solutionPayload = toLocalizedText(
      doc.solutionSummary?.en || doc.solution_en || doc.solution || '',
      doc.solutionSummary?.ptBR || doc.solution || ''
    );

    const impactPayload = toLocalizedText(
      doc.impact?.en || doc.impact_en || doc.impact || '',
      doc.impact?.ptBR || doc.impact || ''
    );

    const reflectionPayload = toLocalizedText(
      doc.finalReflection?.en || doc.reflection_en || doc.reflection || '',
      doc.finalReflection?.ptBR || doc.reflection || ''
    );

    // Responsabilidades
    const enResp = Array.isArray(doc.responsibilities_en) ? doc.responsibilities_en : (Array.isArray(doc.responsibilities) ? doc.responsibilities : []);
    const ptResp = Array.isArray(doc.responsibilities) ? doc.responsibilities : [];
    const maxResp = Math.max(enResp.length, ptResp.length);
    const responsibilitiesPayload = [];
    for (let i = 0; i < maxResp; i++) {
      const e = enResp[i] || '';
      const p = ptResp[i] || e;
      responsibilitiesPayload.push(toLocalizedString(typeof e === 'object' ? e.en : e, typeof p === 'object' ? p.ptBR : p));
    }

    // Disciplinas / Tags
    const disciplines = Array.isArray(doc.disciplines) && doc.disciplines.length > 0 ? doc.disciplines : (Array.isArray(doc.tags) ? doc.tags : []);

    const transformedDoc = {
      ...doc,
      _id: canonicalId,
      _type: 'project',
      slug: {
        _type: 'slug',
        current: canonicalSlug,
      },
      caseDepth: doc.caseDepth || 'full',
      projectType: doc.projectType || 'professionalProject',
      projectStatus: doc.projectStatus || 'completed',
      clientOrContext: doc.clientOrContext || '',
      period: doc.period || '2022—ATUAL',
      duration: doc.duration || null,
      role: rolePayload,
      disciplines,
      featuredOnHome: doc.featuredOnHome ?? doc.featured ?? true,
      featuredOrder: doc.featuredOrder ?? doc.orderRank ?? 1,
      published: doc.published !== false,
      translationStatus: doc.translationStatus === 'reviewed' ? 'reviewed' : 'original',
      title: titlePayload,
      shortDescription: shortDescPayload,
      category: categoryPayload,
      mainVisual: mainVisualPayload,
      heroEyebrow: eyebrowPayload,
      heroHeadline: heroHeadlinePayload,
      heroSummary: heroSummaryPayload,
      overview: overviewPayload,
      context: contextPayload,
      challenge: challengePayload,
      solutionSummary: solutionPayload,
      impact: impactPayload,
      finalReflection: reflectionPayload,
      responsibilities: responsibilitiesPayload,
    };

    // Remove campos legados desnecessários
    delete transformedDoc.language;
    delete transformedDoc.title_en;
    delete transformedDoc.overview_en;
    delete transformedDoc.challenge_en;
    delete transformedDoc.impact_en;
    delete transformedDoc.solution_en;
    delete transformedDoc.reflection_en;
    delete transformedDoc.responsibilities_en;
    delete transformedDoc.heroSummary_en;
    delete transformedDoc.shortDescription_en;
    delete transformedDoc.longDescription_en;
    delete transformedDoc.context_en;

    migrationPlan.push({
      canonicalId,
      canonicalSlug,
      titleEn: titlePayload.en,
      titlePt: titlePayload.ptBR,
      translationStatus: transformedDoc.translationStatus,
      payload: transformedDoc,
    });
  }

  // 4. RELATÓRIO DO DRY-RUN
  console.log(`📋 [4/5] Relatório de Migração de Documentos:`);
  console.log(`--------------------------------------------------------------------------------`);
  for (const item of migrationPlan) {
    console.log(`📄 Documento Canônico: [${item.canonicalId}]`);
    console.log(`   Slug Canônico:      /work/${item.canonicalSlug}`);
    console.log(`   Título (EN):        "${item.titleEn}"`);
    console.log(`   Título (PT-BR):     "${item.titlePt || '(Vazio - fallback para EN)'}"`);
    console.log(`   Status Editorial:   ${item.translationStatus}`);
    console.log(`--------------------------------------------------------------------------------`);
  }

  // 5. GRAVAÇÃO (SE NÃO FOR DRY-RUN)
  if (isDryRun) {
    console.log(`\n🔍 [5/5] Modo DRY-RUN concluído. Nenhuma gravação foi efetuada no Sanity.`);
    console.log(`   Execute sem '--dry-run' para aplicar as transformações no dataset.`);
  } else {
    console.log(`\n⚡ [5/5] Aplicando transformações no Sanity...`);
    for (const item of migrationPlan) {
      console.log(`   -> Gravando documento canônico [${item.canonicalId}] (${item.canonicalSlug})...`);
      await client.createOrReplace(item.payload);
      console.log(`      ✅ Sucesso!`);
    }
    console.log(`\n🎉 Migração concluída com sucesso! Todos os documentos foram transformados para Field-Level.`);
  }
}

main().catch((err) => {
  console.error('❌ Erro na migração:', err);
  process.exit(1);
});
