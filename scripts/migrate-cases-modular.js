import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'pjq90dr2';
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN || '***REMOVED***';

const isExecute = process.argv.includes('--execute');

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function migrate() {
  console.log('================================================================');
  console.log(`🚀 MIGRAÇÃO SEGURA E IDEMPOTENTE DE CASES PARA ARQUITETURA MODULAR`);
  console.log(`Modo: ${isExecute ? '⚡ EXECUÇÃO REAL (--execute)' : '🔍 DRY-RUN (Somente Leitura - adicione --execute para gravar)'}`);
  console.log('================================================================\n');

  // 1. Buscar todos os projetos
  const projects = await client.fetch(`*[_type == "project"]`);
  console.log(`📋 Total de documentos "project" encontrados: ${projects.length}`);

  if (projects.length === 0) {
    console.log('Nenhum projeto encontrado. Encerrando.');
    return;
  }

  // 2. Criar Backup em disco
  const backupDir = path.join(__dirname, '..', 'sanity', 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFilePath = path.join(backupDir, `projects_backup_${timestamp}.json`);
  fs.writeFileSync(backupFilePath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`💾 Backup salvo com sucesso em: ${backupFilePath}\n`);

  // 3. Processar cada projeto
  const report = [];

  for (const doc of projects) {
    const slug = doc.slug?.current || doc.id || doc._id;
    const title = doc.title?.en || doc.title?.ptBR || 'Untitled';

    console.log(`----------------------------------------------------------------`);
    console.log(`📁 Processando projeto: "${title}" (ID: ${doc._id}, Slug: /${slug})`);

    const updatedDoc = { ...doc };

    // A. Visual do Card: Capa e Reconstruct
    let coverImage = doc.coverImage;
    if (!coverImage && doc.mainVisual?.image) {
      coverImage = {
        _type: 'image',
        asset: doc.mainVisual.image.asset,
        alt: doc.mainVisual.alt || doc.title,
      };
    } else if (!coverImage && doc.image) {
      coverImage = {
        _type: 'image',
        asset: doc.image.asset,
        alt: doc.title,
      };
    }

    let reconstructImage = doc.reconstructImage;
    if (!reconstructImage && doc.finalImage && doc.finalImage.asset?._ref !== coverImage?.asset?._ref) {
      reconstructImage = {
        _type: 'image',
        asset: doc.finalImage.asset,
        alt: doc.title,
      };
    } else if (!reconstructImage && doc.mainVisual?.videoPoster && doc.mainVisual.videoPoster.asset?._ref !== coverImage?.asset?._ref) {
      reconstructImage = {
        _type: 'image',
        asset: doc.mainVisual.videoPoster.asset,
        alt: doc.title,
      };
    }

    updatedDoc.coverImage = coverImage;
    if (reconstructImage) {
      updatedDoc.reconstructImage = reconstructImage;
    }

    // B. Hero Media Override (se houver vídeo no mainVisual legado)
    if (!updatedDoc.heroMediaOverride && doc.mainVisual?.videoUrl) {
      updatedDoc.heroMediaOverride = {
        videoUrl: doc.mainVisual.videoUrl,
        videoPoster: doc.mainVisual.videoPoster,
      };
    }

    // C. Conteúdo Modular (contentBlocks)
    const existingBlocks = Array.isArray(doc.contentBlocks) && doc.contentBlocks.length > 0 ? [...doc.contentBlocks] : [];
    const newBlocks = [];

    if (existingBlocks.length === 0) {
      // 1. Bloco de Visão Geral & Desafio (stickyNarrative)
      if (doc.overview || doc.challenge || (Array.isArray(doc.responsibilities) && doc.responsibilities.length > 0) || doc.constraints || doc.objectives) {
        const topics = [];

        if (doc.overview) {
          topics.push({
            _key: `topic-context-1`,
            _type: 'stickyTopicItem',
            topicKey: {
              _type: 'localizedString',
              en: 'Context & Problem Space',
              ptBR: 'Contexto & Cenário Inicial',
            },
            title: {
              _type: 'localizedString',
              en: 'Scope & Institutional Context',
              ptBR: 'Escopo & Contexto Institucional',
            },
            content: doc.overview,
            highlight: false,
          });
        }

        if (doc.challenge) {
          topics.push({
            _key: `topic-challenge-2`,
            _type: 'stickyTopicItem',
            topicKey: {
              _type: 'localizedString',
              en: 'The Real Challenge',
              ptBR: 'O Desafio Real',
            },
            title: {
              _type: 'localizedString',
              en: 'Interface Friction & Complexity',
              ptBR: 'Fricção de Interface & Complexidade',
            },
            content: doc.challenge,
            highlight: true,
          });
        }

        if (doc.constraints) {
          topics.push({
            _key: `topic-constraints-3`,
            _type: 'stickyTopicItem',
            topicKey: {
              _type: 'localizedString',
              en: 'Technical & Systemic Constraints',
              ptBR: 'Restrições Técnicas & Sistêmicas',
            },
            title: {
              _type: 'localizedString',
              en: 'Compliance, Scale & Asynchronous Data',
              ptBR: 'Conformidade, Escala & Operações Assíncronas',
            },
            content: doc.constraints,
            highlight: false,
          });
        }

        if (Array.isArray(doc.responsibilities) && doc.responsibilities.length > 0) {
          topics.push({
            _key: `topic-resp-4`,
            _type: 'stickyTopicItem',
            topicKey: {
              _type: 'localizedString',
              en: 'Scope of Action & Responsibilities',
              ptBR: 'Minha Atuação & Responsabilidades',
            },
            title: {
              _type: 'localizedString',
              en: 'Leadership, UX Research & Architecture',
              ptBR: 'Liderança, Pesquisa & Arquitetura',
            },
            bulletPoints: doc.responsibilities,
            highlight: false,
          });
        }

        newBlocks.push({
          _key: `block-sticky-overview`,
          _type: 'stickyNarrative',
          eyebrow: doc.heroEyebrow || {
            _type: 'localizedString',
            en: '01 // OVERVIEW & CONTEXT',
            ptBR: '01 // VISÃO GERAL & CONTEXTO',
          },
          sectionTitle: {
            _type: 'localizedString',
            en: 'Context, Friction & Scope of Action',
            ptBR: 'Contexto, Complexidade & Minha Atuação',
          },
          sectionSubtitle: doc.heroSummary || {
            _type: 'localizedString',
            en: 'Understanding business rules, constraints, and institutional requirements before designing interfaces.',
            ptBR: 'Compreendendo regras de negócio, restrições e objetivos institucionais antes de desenhar telas.',
          },
          theme: 'dark',
          topics,
        });
      }

      // 2. Bloco de Processo (processSteps)
      if (Array.isArray(doc.processSteps) && doc.processSteps.length > 0) {
        const steps = doc.processSteps.map((step, sIdx) => ({
          _key: `step-${sIdx + 1}`,
          _type: 'stepItem',
          index: `0${sIdx + 1}`,
          title: typeof step === 'string' ? { _type: 'localizedString', en: step, ptBR: step } : step,
          description: {
            _type: 'localizedText',
            en: `Execução contínua da etapa 0${sIdx + 1} com foco em consistência, viabilidade técnica e validação com especialistas.`,
            ptBR: `Execução contínua da etapa 0${sIdx + 1} com foco em consistência, viabilidade técnica e validação com especialistas.`,
          },
        }));

        newBlocks.push({
          _key: `block-process-steps`,
          _type: 'processSteps',
          title: {
            _type: 'localizedString',
            en: 'Design Process & Systemic Engineering',
            ptBR: 'Processo de Design & Engenharia Sistêmica',
          },
          theme: 'dark',
          steps,
        });
      }

      // 3. Bloco de Galeria de Imagens (imageGallery)
      if (Array.isArray(doc.gallery) && doc.gallery.length > 0) {
        const galleryImages = doc.gallery.map((gItem, gIdx) => ({
          _key: gItem._key || `gal-img-${gIdx + 1}`,
          _type: 'galleryImageItem',
          image: gItem.image,
          caption: gItem.caption || { _type: 'localizedString', en: `Interface Documentation 0${gIdx + 1}`, ptBR: `Documentação de Interface 0${gIdx + 1}` },
          alt: gItem.alt || gItem.caption || { _type: 'localizedString', en: `Interface Screen 0${gIdx + 1}`, ptBR: `Tela da Interface 0${gIdx + 1}` },
          aspectRatio: '16/10',
        }));

        newBlocks.push({
          _key: `block-image-gallery`,
          _type: 'imageGallery',
          eyebrow: {
            _type: 'localizedString',
            en: 'INTERFACE & ARTIFACTS',
            ptBR: 'INTERFACE & ARTEFATOS',
          },
          title: {
            _type: 'localizedString',
            en: 'Platform Modules & Interface Exploration',
            ptBR: 'Módulos da Plataforma & Exploração de Interface',
          },
          columns: '2',
          theme: 'dark',
          images: galleryImages,
        });
      }

      // 4. Bloco de Demonstração em Vídeo (prototypeVideo)
      if (doc.mainVisual?.videoUrl) {
        newBlocks.push({
          _key: `block-prototype-video`,
          _type: 'prototypeVideo',
          title: {
            _type: 'localizedString',
            en: 'Interactive Prototype & Ecosystem Flow',
            ptBR: 'Protótipo Interativo & Fluxo do Ecossistema',
          },
          shortDescription: {
            _type: 'localizedText',
            en: 'Demonstração de alta fidelidade dos fluxos integrados de criação, aplicação e diagnóstico.',
            ptBR: 'Demonstração de alta fidelidade dos fluxos integrados de criação, aplicação e diagnóstico.',
          },
          videoUrl: doc.mainVisual.videoUrl,
          poster: doc.mainVisual.videoPoster || doc.mainVisual.image,
          caption: {
            _type: 'localizedString',
            en: 'End-to-end user journey across multi-role modules.',
            ptBR: 'Jornada ponta a ponta entre múltiplos perfis de usuário.',
          },
          aspectRatio: '16/9',
          autoplay: true,
          loop: true,
          theme: 'dark',
        });
      }

      // 5. Frase de Destaque / Conclusão (dividerStatement)
      if (doc.finalReflection || doc.reflection || doc.objectives) {
        newBlocks.push({
          _key: `block-statement-reflection`,
          _type: 'dividerStatement',
          eyebrow: {
            _type: 'localizedString',
            en: 'SYSTEMIC CONSISTENCY //',
            ptBR: 'CONSISTÊNCIA SISTÊMICA //',
          },
          statement: {
            _type: 'localizedText',
            en: 'Complex digital products require rigorous systems, not improvisation. Discipline in information architecture and component tokens transforms complexity into clarity.',
            ptBR: 'Produtos digitais complexos exigem sistemas rigorosos, não improviso. A disciplina na arquitetura de informação e tokens de componentes transforma complexidade em clareza.',
          },
          supportingText: {
            _type: 'localizedText',
            en: 'Documenting decisions, managing trade-offs, and maintaining continuous QA with engineering ensure that design quality scales across multiple years.',
            ptBR: 'Documentar decisões, gerenciar trade-offs e manter QA contínuo com a engenharia garantem que a qualidade de design continue escalando ao longo dos anos.',
          },
          alignment: 'center',
          theme: 'dark',
        });
      }

      updatedDoc.contentBlocks = newBlocks;
    } else {
      updatedDoc.contentBlocks = existingBlocks;
    }

    report.push({
      id: doc._id,
      slug,
      title,
      hasCoverImage: !!updatedDoc.coverImage,
      hasReconstructImage: !!updatedDoc.reconstructImage,
      blocksCount: updatedDoc.contentBlocks?.length || 0,
      blockTypes: updatedDoc.contentBlocks?.map((b) => b._type) || [],
    });

    console.log(`  ✓ Cover Image: ${updatedDoc.coverImage ? 'Definida' : '⚠️ Ausente'}`);
    console.log(`  ✓ Reconstruct Image: ${updatedDoc.reconstructImage ? 'Definida' : 'Nenhuma (modo estático)'}`);
    console.log(`  ✓ Blocos Modulares Gerados: ${updatedDoc.contentBlocks?.length || 0}`);
    console.log(`  ✓ Tipos de Bloco: ${updatedDoc.contentBlocks?.map((b) => b._type).join(', ') || 'Nenhum'}`);

    if (isExecute) {
      delete updatedDoc._rev;
      delete updatedDoc._createdAt;
      delete updatedDoc._updatedAt;
      await client.createOrReplace(updatedDoc);
      console.log(`  💾 Documento ${doc._id} salvo no Sanity com sucesso!`);
    }
  }

  console.log('\n================================================================');
  console.log(`📊 RELATÓRIO FINAL DA MIGRAÇÃO`);
  console.log('================================================================');
  console.table(report);

  if (!isExecute) {
    console.log('\nℹ️ A execução foi realizada em modo DRY-RUN (nenhum dado foi alterado no Sanity).');
    console.log('Para aplicar as alterações no dataset, execute:');
    console.log('  node scripts/migrate-cases-modular.js --execute\n');
  } else {
    console.log('\n✅ Migração executada e gravada com sucesso no Sanity!');
  }
}

migrate().catch((err) => {
  console.error('❌ Erro na execução da migração:', err);
  process.exit(1);
});
