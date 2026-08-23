import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function main() {
  console.log(`📦 [1/4] Realizando backup prévio do dataset "${dataset}"...`);
  const allDocs = await client.fetch(`*[]`);
  const backupDir = path.resolve(__dirname, '../sanity/backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-before-migration-${dataset}-${timestamp}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(allDocs, null, 2), 'utf-8');
  console.log(`✅ Backup salvo (${allDocs.length} documentos): ${backupPath}`);

  console.log(`\n🔍 [2/4] Mapeando metadados de tradução e projetos com language ausente...`);
  const metadataDocs = await client.fetch(`*[_type == "translation.metadata"]`);
  
  // Mapa de docId -> language derivado de translation.metadata
  const metaLanguageMap = new Map();
  for (const meta of metadataDocs) {
    if (Array.isArray(meta.translations)) {
      for (const t of meta.translations) {
        const docRef = t.value?._ref;
        const langKey = t._key;
        if (docRef && langKey) {
          metaLanguageMap.set(docRef, langKey);
        }
      }
    }
  }

  const projects = await client.fetch(`*[_type == "project" && !(_id in path("drafts.**"))]`);
  console.log(`Encontrados ${projects.length} projeto(s) publicado(s).`);

  console.log(`\n⚙️ [3/4] Executando migração idempotente...`);
  for (const proj of projects) {
    const rawId = proj._id;
    const currentLang = proj.language;
    const currentStatus = proj.translationStatus;

    let targetLang = currentLang;
    let targetStatus = currentStatus;

    if (!targetLang) {
      if (metaLanguageMap.has(rawId)) {
        targetLang = metaLanguageMap.get(rawId);
        targetStatus = currentStatus || (targetLang === 'pt-BR' ? 'reviewed' : 'original');
      } else {
        targetLang = 'en';
        targetStatus = currentStatus || 'original';
      }

      console.log(`   -> Corrigindo projeto "${proj.title}" (${rawId}):`);
      console.log(`      language: null -> "${targetLang}"`);
      console.log(`      translationStatus: "${currentStatus || 'null'}" -> "${targetStatus}"`);

      await client
        .patch(rawId)
        .set({
          language: targetLang,
          translationStatus: targetStatus,
        })
        .commit();
      console.log(`      ✅ Sucesso no patch do documento ${rawId}`);
    } else {
      console.log(`   -> Projeto "${proj.title}" (${rawId}) já possui language="${currentLang}". Nenhuma alteração necessária.`);
    }
  }

  console.log(`\n📊 [4/4] Validando consulta obrigatória:`);
  console.log(`*[ _type == "project" && !(_id in path("drafts.**")) ]{ _id, title, language, translationStatus, slug, featured, publishedAt }`);
  
  const validationQuery = `*[ _type == "project" && !(_id in path("drafts.**")) ]{
    _id,
    title,
    language,
    translationStatus,
    slug,
    featured,
    publishedAt
  }`;

  const validatedProjects = await client.fetch(validationQuery);
  console.log(`\nResultado da consulta de validação (${validatedProjects.length} documentos):`);
  console.log(JSON.stringify(validatedProjects, null, 2));
}

main().catch((err) => {
  console.error('❌ Erro na migração:', err);
  process.exit(1);
});
