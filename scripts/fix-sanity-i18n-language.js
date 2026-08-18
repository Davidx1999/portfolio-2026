/**
 * Script de Correção Não-Destrutiva de Internacionalização Document-Level
 *
 * Executa:
 * 1. Backup completo prévio do dataset em sanity/backups/
 * 2. Correção de language: "pt-BR" no documento c179568e-44cf-477a-87cf-33e80398d10a (Mapear)
 * 3. Correção de language: "en" no documento inglês relacionado (mantendo status de draft)
 * 4. Validação de translation.metadata d8ce78cd-c03b-4595-b4d7-466dee931686
 * 5. Validação das queries GROQ para en e pt-BR
 */

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

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function backup() {
  console.log(`📦 [1/5] Realizando backup de segurança do dataset "${dataset}"...`);
  const allDocs = await client.fetch(`*[]`);
  const backupDir = path.resolve(__dirname, '../sanity/backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-before-i18n-fix-${dataset}-${timestamp}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(allDocs, null, 2), 'utf-8');
  console.log(`✅ Backup concluído com sucesso (${allDocs.length} documentos salvos em: ${backupPath})`);
  return allDocs;
}

async function fixDocuments() {
  const ptDocId = 'c179568e-44cf-477a-87cf-33e80398d10a';
  const enDocId = 'a8f5037b-3e2a-4c6a-928c-cf54339ab887';
  const metaDocId = 'd8ce78cd-c03b-4595-b4d7-466dee931686';

  console.log(`\n🔍 [2/5] Inspecionando documentos no Sanity...`);

  if (!token) {
    console.log(`⚠️ SANITY_API_WRITE_TOKEN não detectado no ambiente atual.`);
    console.log(`   Para aplicar as correções diretamente no Sanity, execute:`);
    console.log(`   SANITY_API_WRITE_TOKEN="seu-token" node scripts/fix-sanity-i18n-language.js\n`);
  }

  // 1. Inspecionar e atualizar PT-BR
  const ptDoc = await client.getDocument(ptDocId);
  if (ptDoc) {
    console.log(`📄 Documento PT-BR encontrado: [${ptDoc._type}] ID: ${ptDoc._id} (Título: "${ptDoc.title}", Slug: "${ptDoc.slug?.current}")`);
    console.log(`   language atual: "${ptDoc.language || 'null'}", translationStatus: "${ptDoc.translationStatus}"`);

    if (token) {
      console.log(`   -> Aplicando patch { language: "pt-BR", translationStatus: "reviewed" }...`);
      await client
        .patch(ptDocId)
        .set({
          language: 'pt-BR',
          translationStatus: 'reviewed',
        })
        .commit();
      console.log(`   ✅ Documento PT-BR atualizado com language: "pt-BR" preservando todos os demais campos.`);
    }
  } else {
    console.warn(`⚠️ Documento PT-BR ${ptDocId} não encontrado.`);
  }

  // 2. Inspecionar e atualizar EN (published ou draft)
  console.log(`\n🔍 [3/5] Verificando documento EN relacionado (${enDocId})...`);
  const enDoc = await client.getDocument(enDocId);
  const enDraftDoc = await client.getDocument(`drafts.${enDocId}`);

  if (enDoc) {
    console.log(`📄 Documento EN (publicado) encontrado: ID: ${enDoc._id} (Título: "${enDoc.title}")`);
    if (token) {
      await client.patch(enDocId).set({ language: 'en' }).commit();
      console.log(`   ✅ Documento EN (publicado) atualizado com language: "en".`);
    }
  } else if (enDraftDoc) {
    console.log(`📄 Documento EN (Draft) encontrado: ID: ${enDraftDoc._id} (Título: "${enDraftDoc.title}")`);
    if (token) {
      await client.patch(`drafts.${enDocId}`).set({ language: 'en' }).commit();
      console.log(`   ✅ Documento EN (Draft) atualizado com language: "en" mantendo status de draft (sem publicar).`);
    }
  } else {
    console.log(`ℹ️ Documento EN ${enDocId} ainda não foi instanciado como documento separado no Sanity.`);
  }

  // 3. Inspecionar e garantir translation.metadata
  console.log(`\n🔍 [4/5] Verificando translation.metadata (${metaDocId})...`);
  const metaDoc = await client.getDocument(metaDocId);
  if (metaDoc) {
    console.log(`📑 translation.metadata existente confirmada:`);
    console.log(JSON.stringify(metaDoc.translations, null, 2));
  } else if (token) {
    console.log(`   Criando translation.metadata ${metaDocId}...`);
    await client.createIfNotExists({
      _id: metaDocId,
      _type: 'translation.metadata',
      schemaTypes: ['project'],
      translations: [
        {
          _key: 'en',
          _type: 'internationalizedArrayReferenceValue',
          value: {
            _type: 'reference',
            _ref: enDocId,
            _weak: true,
          },
        },
        {
          _key: 'pt-BR',
          _type: 'internationalizedArrayReferenceValue',
          value: {
            _type: 'reference',
            _ref: ptDocId,
            _weak: true,
          },
        },
      ],
    });
    console.log(`   ✅ translation.metadata criada com sucesso.`);
  }

  // 4. Validar queries GROQ do Frontend
  console.log(`\n🔍 [5/5] Validando queries GROQ para [pt-BR] e [en]...`);

  const ptProjectsQuery = `*[_type == "project" && published != false && (language == $targetLocale || (!defined(language) && $targetLocale == "en"))]{
    _id,
    title,
    "slug": coalesce(slug.current, id.current, id, _id),
    language,
    translationStatus
  }`;

  const ptResults = await client.fetch(ptProjectsQuery, { targetLocale: 'pt-BR' });
  console.log(`\n📊 [Resultado Query targetLocale="pt-BR"]: ${ptResults.length} projeto(s) retornado(s):`);
  console.log(JSON.stringify(ptResults, null, 2));

  const enResults = await client.fetch(ptProjectsQuery, { targetLocale: 'en' });
  console.log(`\n📊 [Resultado Query targetLocale="en"]: ${enResults.length} projeto(s) retornado(s):`);
  console.log(JSON.stringify(enResults, null, 2));
}

async function main() {
  try {
    await backup();
    await fixDocuments();
  } catch (err) {
    console.error('❌ Erro na execução:', err);
  }
}

main();
