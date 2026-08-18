/**
 * Script de Migração e Backup do Sanity para Internacionalização Document-Level (English-First)
 *
 * Uso:
 * - Backup do dataset:
 *     node scripts/migrate-sanity-i18n.js --backup
 * - Simulação de migração (Dry-Run):
 *     node scripts/migrate-sanity-i18n.js --dry-run
 * - Execução real da migração (requer SANITY_API_WRITE_TOKEN):
 *     node scripts/migrate-sanity-i18n.js --apply
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'pjq90dr2';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const isDryRun = process.argv.includes('--dry-run') || !process.argv.includes('--apply');
const isBackupOnly = process.argv.includes('--backup');

async function backupDataset() {
  console.log(`📦 [BACKUP] Exportando dataset "${dataset}" do projeto "${projectId}"...`);
  try {
    const allDocuments = await client.fetch(`*[]`);
    const backupDir = path.resolve(__dirname, '../sanity/backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFilePath = path.join(backupDir, `backup-dataset-${dataset}-${timestamp}.json`);
    fs.writeFileSync(backupFilePath, JSON.stringify(allDocuments, null, 2), 'utf-8');

    console.log(`✅ [BACKUP] Sucesso! ${allDocuments.length} documentos salvos em:`);
    console.log(`   ${backupFilePath}`);
    return allDocuments;
  } catch (err) {
    console.error('❌ [BACKUP] Erro ao exportar dataset:', err);
    throw err;
  }
}

async function migrateDocuments() {
  console.log('\n🌐 [MIGRAÇÃO] Iniciando análise de internacionalização document-level...');
  console.log(`   Modo: ${isDryRun ? 'DRY-RUN (Simulação segura, nenhuma alteração será gravada)' : 'APPLY (Modo de gravação)'}`);

  const documents = await client.fetch(`*[_type in ["project", "aboutPage", "letsTalkPage", "playgroundProject"]]`);
  console.log(`   Total de documentos encontrados para migração: ${documents.length}`);

  if (documents.length === 0) {
    console.log('ℹ️  Nenhum documento encontrado para migrar no dataset atual.');
    return;
  }

  const operations = [];

  for (const doc of documents) {
    const hasLanguage = !!doc.language;
    const docId = doc._id;
    const docType = doc._type;

    console.log(`\n📄 Analisando doc [${docType}] ID: ${docId} (language atual: ${doc.language || 'não definido'})`);

    // Se já possui language configurado como 'en' ou 'pt-BR', verifica se precisa de ajustes
    if (hasLanguage) {
      console.log(`   -> Documento já possui campo language="${doc.language}". Mantendo integridade.`);
      continue;
    }

    // Documento legado com possíveis campos inline
    // Estratégia English-First:
    // 1. O documento base se torna o documento 'en' (Original / Fonte Principal)
    // 2. Se houver conteúdo em português, cria documento irmão com language='pt-BR' e translationStatus='reviewed'

    const enDocPatch = {
      id: docId,
      patch: {
        set: {
          language: 'en',
          translationStatus: 'original',
          // Se tiver campos _en, preserva o fallback para o valor em inglês se title_en existir
          ...(doc.title_en ? { title: doc.title_en } : {}),
          ...(doc.heroSummary_en ? { heroSummary: doc.heroSummary_en } : {}),
          ...(doc.overview_en ? { overview: doc.overview_en } : {}),
          ...(doc.challenge_en ? { challenge: doc.challenge_en } : {}),
          ...(doc.solution_en ? { solution: doc.solution_en } : {}),
          ...(doc.impact_en ? { impact: doc.impact_en } : {}),
          ...(doc.reflection_en ? { reflection: doc.reflection_en } : {}),
        },
      },
    };

    operations.push({ type: 'patch_en', docId, patch: enDocPatch });

    // Documento traduzido em português (pt-BR)
    const ptDocId = `${docId.replace('drafts.', '')}__i18n_pt-BR`;
    const ptDoc = {
      _id: ptDocId,
      _type: docType,
      ...doc,
      _id: ptDocId,
      language: 'pt-BR',
      translationStatus: 'reviewed',
      // Mantém os campos em português como primários
      title: doc.title,
      heroSummary: doc.heroSummary || doc.shortDescription || '',
      overview: doc.overview || doc.context || '',
      challenge: doc.challenge || '',
      solution: doc.solution || '',
      impact: doc.impact || '',
      reflection: doc.reflection || '',
    };

    delete ptDoc._rev;
    delete ptDoc._createdAt;
    delete ptDoc._updatedAt;

    operations.push({ type: 'create_pt', docId: ptDocId, doc: ptDoc });
  }

  console.log(`\n📊 [RESUMO DE OPERAÇÕES] Total de operações calculadas: ${operations.length}`);
  operations.forEach((op, idx) => {
    console.log(`   ${idx + 1}. [${op.type}] Target: ${op.docId}`);
  });

  if (isDryRun) {
    console.log('\n🔒 [DRY-RUN CONCLUÍDO] Nenhuma alteração foi gravada no Sanity.');
    console.log('   Para aplicar de fato, execute com: SANITY_API_WRITE_TOKEN="..." node scripts/migrate-sanity-i18n.js --apply');
    return;
  }

  if (!token) {
    console.error('\n❌ [ERRO] Token de escrita SANITY_API_WRITE_TOKEN não encontrado para executar em modo --apply.');
    process.exit(1);
  }

  console.log('\n🚀 [APPLY] Executando transação de migração no Sanity...');
  const transaction = client.transaction();

  for (const op of operations) {
    if (op.type === 'patch_en') {
      transaction.patch(op.patch.id, op.patch.patch);
    } else if (op.type === 'create_pt') {
      transaction.createOrReplace(op.doc);
    }
  }

  const result = await transaction.commit();
  console.log('✅ [APPLY CONCLUÍDO] Transação gravada com sucesso no Sanity!', result);
}

async function main() {
  try {
    await backupDataset();
    if (!isBackupOnly) {
      await migrateDocuments();
    }
  } catch (err) {
    console.error('Erro na execução:', err);
    process.exit(1);
  }
}

main();
