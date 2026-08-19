export default {
  name: 'project',
  title: 'Estudo de Caso / Projeto',
  type: 'document',
  groups: [
    { name: 'config', title: '1. Configuração', default: true },
    { name: 'cardHero', title: '2. Card e Hero' },
    { name: 'caseContent', title: '3. Conteúdo do Case' },
    { name: 'galleryNav', title: '4. Galeria e Navegação' },
    { name: 'seo', title: '5. SEO' },
  ],
  fieldsets: [
    {
      name: 'overviewChallenge',
      title: '📋 Overview & Desafio',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'processSolution',
      title: '⚙️ Processo & Solução',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'resultsReflection',
      title: '📈 Resultados & Reflexão',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ============================================================
    // 1. GRUPO: CONFIGURAÇÃO
    // ============================================================
    {
      name: 'slug',
      title: 'Slug / URL Canônica (Compartilhado)',
      type: 'slug',
      group: 'config',
      options: {
        source: 'title.en',
        maxLength: 96,
        slugify: (input) =>
          (input || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '-'),
      },
      validation: (Rule) => Rule.required().error('O slug canônico é obrigatório para gerar as URLs /en e /pt.'),
      description: 'Slug único compartilhado por ambos os idiomas (ex: /en/work/mapear e /pt/work/mapear).',
    },
    {
      name: 'caseDepth',
      title: 'Profundidade do Case',
      type: 'string',
      group: 'config',
      options: {
        list: [
          { title: 'Case Completo (Full Case Study - Narrativa aprofundada)', value: 'full' },
          { title: 'Case Compacto (Compact Case Study - Síntese visual ágil)', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
      description: 'Define se o estudo de caso renderiza a estrutura completa (ex: Mapear) ou formato compacto.',
    },
    {
      name: 'projectType',
      title: 'Classificação do Projeto',
      type: 'string',
      group: 'config',
      options: {
        list: [
          { title: 'Projeto Profissional (Professional Project)', value: 'professionalProject' },
          { title: 'Projeto para Cliente (Client Project)', value: 'clientProject' },
          { title: 'Estudo Independente (Independent Study)', value: 'independentStudy' },
        ],
        layout: 'radio',
      },
      initialValue: 'professionalProject',
    },
    {
      name: 'projectStatus',
      title: 'Status do Projeto',
      type: 'string',
      group: 'config',
      options: {
        list: [
          { title: 'Concluído (Completed)', value: 'completed' },
          { title: 'Em andamento (Ongoing / Active)', value: 'ongoing' },
          { title: 'Direção / Proposta Conceitual (Concept)', value: 'concept' },
        ],
      },
      initialValue: 'completed',
    },
    {
      name: 'clientOrContext',
      title: 'Cliente ou Contexto Institucional',
      type: 'string',
      group: 'config',
      description: 'Ex: FGV DGPE / CEnPE / UFC, Atlanta Home Concierge, Escutha',
    },
    {
      name: 'period',
      title: 'Período',
      type: 'string',
      group: 'config',
      description: 'Ex: 2021—2026, 2024, 2022—atual',
    },
    {
      name: 'duration',
      title: 'Duração (Opcional)',
      type: 'string',
      group: 'config',
      description: 'Ex: 4 meses, 6 semanas, Contínuo',
    },
    {
      name: 'role',
      title: 'Função Principal (Role)',
      type: 'localizedString',
      group: 'config',
      description: 'Ex: Lead Product Designer, Senior UX/UI Designer',
    },
    {
      name: 'disciplines',
      title: 'Competências e Disciplinas',
      type: 'array',
      group: 'config',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tags de competência (ex: Design System, UX Research, Product Strategy).',
    },
    {
      name: 'featuredOnHome',
      title: 'Destacar na Landing Page (Featured Work)',
      type: 'boolean',
      group: 'config',
      initialValue: false,
      description: 'Quando ativado, o projeto é exibido na seção Featured Work da home.',
    },
    {
      name: 'featuredOrder',
      title: 'Ordem de Exibição / Destaque',
      type: 'number',
      group: 'config',
      initialValue: 99,
      description: 'Menor número = maior prioridade (1, 2, 3...).',
    },
    {
      name: 'published',
      title: 'Publicado no Site',
      type: 'boolean',
      group: 'config',
      initialValue: true,
    },
    {
      name: 'translationStatus',
      title: 'Status de Tradução (Editorial)',
      type: 'string',
      group: 'config',
      options: {
        list: [
          { title: 'Original em Inglês (EN)', value: 'original' },
          { title: 'Traduzido via DeepL (needs_review)', value: 'needs_review' },
          { title: 'Tradução Automática (machine_translated)', value: 'machine_translated' },
          { title: 'Revisado Manualmente (reviewed)', value: 'reviewed' },
          { title: 'Tradução Desatualizada (outdated)', value: 'outdated' },
          { title: 'Pendente / Ausente (missing)', value: 'missing' },
        ],
        layout: 'radio',
      },
      initialValue: 'original',
    },
    {
      name: 'sourceContentHash',
      title: 'Hash de Controle de Conteúdo EN',
      type: 'string',
      group: 'config',
      readOnly: true,
      hidden: true,
      description: 'Hash SHA-256 dos campos em inglês gerado no momento da tradução para detecção de alterações.',
    },

    // ============================================================
    // 2. GRUPO: CARD E HERO
    // ============================================================
    {
      name: 'title',
      title: 'Título Público do Projeto',
      type: 'localizedString',
      group: 'cardHero',
      validation: (Rule) => Rule.required().error('O título do projeto é obrigatório.'),
      description: 'Título público exibido nos cards, na hero e na lista de projetos.',
    },
    {
      name: 'shortDescription',
      title: 'Descrição Curta / Síntese para Cards',
      type: 'localizedText',
      group: 'cardHero',
      description: 'Texto exibido abaixo do card na página Work e no Featured Work.',
    },
    {
      name: 'category',
      title: 'Categoria do Projeto',
      type: 'localizedString',
      group: 'cardHero',
      description: 'Ex: Product Design, Design System, Branding',
    },
    {
      name: 'mainVisual',
      title: 'Visual Principal do Projeto (Compartilhado)',
      type: 'mainVisualMedia',
      group: 'cardHero',
      validation: (Rule) => Rule.required().error('O visual principal é obrigatório.'),
      description: 'Imagem principal compartilhada utilizada no Card do Work, Featured da Landing, fallback da Hero e OpenGraph.',
    },
    {
      name: 'heroEyebrow',
      title: 'Eyebrow da Hero (Opcional)',
      type: 'localizedString',
      group: 'cardHero',
      description: 'Ex: "01 // SISTEMA & ARQUITETURA", "ESTUDO DE CASO"',
    },
    {
      name: 'heroHeadline',
      title: 'Headline da Hero (Opcional)',
      type: 'localizedString',
      description: 'Se vazio, o Título Público do projeto será utilizado.',
      group: 'cardHero',
    },
    {
      name: 'heroSummary',
      title: 'Resumo Editorial da Hero',
      type: 'localizedText',
      group: 'cardHero',
      description: 'Parágrafo de abertura abaixo da headline na Hero do case.',
    },
    {
      name: 'heroMediaOverride',
      title: 'Substituição da Mídia da Hero (Opcional)',
      type: 'object',
      group: 'cardHero',
      description: 'Preencha SOMENTE se a hero deste case precisar exibir uma mídia diferente do Visual Principal.',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'image',
          title: 'Imagem Específica da Hero',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'videoUrl',
          title: 'Vídeo da Hero (URL MP4)',
          type: 'url',
        },
        {
          name: 'videoPoster',
          title: 'Poster do Vídeo',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

    // ============================================================
    // 3. GRUPO: CONTEÚDO DO CASE
    // ============================================================
    // Fieldset 1: Overview & Desafio
    {
      name: 'overview',
      title: 'Visão Geral (Overview)',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'overviewChallenge',
      description: 'Contextualização ampla do escopo do projeto.',
    },
    {
      name: 'context',
      title: 'Contexto do Negócio / Usuários',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'overviewChallenge',
    },
    {
      name: 'challenge',
      title: 'Desafio Central (The Challenge)',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'overviewChallenge',
      description: 'Qual problema central de UX/UI ou arquitetura precisava ser resolvido?',
    },
    {
      name: 'responsibilities',
      title: 'Papéis e Responsabilidades Exercidas',
      type: 'array',
      group: 'caseContent',
      fieldset: 'overviewChallenge',
      of: [{ type: 'localizedString' }],
      description: 'Lista de responsabilidades pontuais (ex: Pesquisa com usuários, Design Tokens, Prototipação).',
    },
    {
      name: 'constraints',
      title: 'Restrições e Condicionantes do Projeto',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'overviewChallenge',
      description: 'Restrições técnicas, prazos, limitações de legado ou institucionais.',
    },
    {
      name: 'objectives',
      title: 'Objetivos Principais',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'overviewChallenge',
    },

    // Fieldset 2: Processo & Solução
    {
      name: 'processIntro',
      title: 'Introdução do Processo',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'processSolution',
    },
    {
      name: 'processSteps',
      title: 'Etapas do Processo',
      type: 'array',
      group: 'caseContent',
      fieldset: 'processSolution',
      of: [{ type: 'localizedString' }],
      description: 'Etapas de execução do processo de design (ex: 01. Descoberta, 02. Arquitetura, 03. Design System).',
    },
    {
      name: 'contentBlocks',
      title: 'Blocos Modulares de Conteúdo (Content Blocks)',
      type: 'array',
      group: 'caseContent',
      fieldset: 'processSolution',
      of: [{ type: 'contentBlock' }],
      description: 'Blocos modulares ordenáveis compartilhando layout e imagens, com textos traduzidos.',
    },
    {
      name: 'solutionSummary',
      title: 'Síntese da Solução Entregue',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'processSolution',
    },

    // Fieldset 3: Resultados & Reflexão
    {
      name: 'deliverables',
      title: 'Entregáveis Principais',
      type: 'array',
      group: 'caseContent',
      fieldset: 'resultsReflection',
      of: [{ type: 'localizedString' }],
    },
    {
      name: 'impact',
      title: 'Impacto & Resultados (Qualitativo / Quantitativo)',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'resultsReflection',
      description: 'Resultados alcançados (ex: redução de tempo de preenchimento, adoção do Design System).',
    },
    {
      name: 'metrics',
      title: 'Métricas Chave (Opcional)',
      type: 'array',
      group: 'caseContent',
      fieldset: 'resultsReflection',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor / Indicador (ex: +40%, 0 retrabalho, 4 anos)', type: 'string' },
            { name: 'label', title: 'Descrição da Métrica', type: 'localizedString' },
          ],
        },
      ],
    },
    {
      name: 'learnings',
      title: 'Aprendizados do Projeto',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'resultsReflection',
    },
    {
      name: 'limitations',
      title: 'Limitações & Trade-offs',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'resultsReflection',
    },
    {
      name: 'nextSteps',
      title: 'Próximos Passos & Evolução Futura',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'resultsReflection',
    },
    {
      name: 'finalReflection',
      title: 'Reflexão Final do Designer',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'resultsReflection',
    },

    // ============================================================
    // 4. GRUPO: GALERIA E NAVEGAÇÃO
    // ============================================================
    {
      name: 'gallery',
      title: 'Galeria Complementar de Mídias',
      type: 'array',
      group: 'galleryNav',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Imagem Complementar',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              title: 'Legenda',
              type: 'localizedString',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'localizedString',
            },
          ],
          preview: {
            select: {
              title: 'caption.en',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Imagem da Galeria',
                media,
              };
            },
          },
        },
      ],
    },
    {
      name: 'nextCase',
      title: 'Próximo Estudo de Caso (Navegação)',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'galleryNav',
      description: 'Referência ao próximo estudo de caso sugerido no fechamento.',
    },
    {
      name: 'showBackToTop',
      title: 'Exibir Botão "Back to Top"',
      type: 'boolean',
      group: 'galleryNav',
      initialValue: true,
    },
    {
      name: 'finalCtaText',
      title: 'Texto Personalizado do CTA Final (Opcional)',
      type: 'localizedString',
      group: 'galleryNav',
      description: 'Se vazio, o texto padrão da interface será utilizado.',
    },

    // ============================================================
    // 5. GRUPO: SEO
    // ============================================================
    {
      name: 'seo',
      title: 'Configurações de SEO & Compartilhamento',
      type: 'localizedSeo',
      group: 'seo',
    },
  ],

  preview: {
    select: {
      titleEn: 'title.en',
      titlePt: 'title.ptBR',
      slug: 'slug.current',
      caseDepth: 'caseDepth',
      media: 'mainVisual.image',
      translationStatus: 'translationStatus',
    },
    prepare({ titleEn, titlePt, slug, caseDepth, media, translationStatus }) {
      const displayTitle = titleEn || titlePt || 'Untitled Project';
      const depthBadge = caseDepth === 'compact' ? '⚡ Compact' : '📖 Full';
      const statusEmoji =
        translationStatus === 'reviewed'
          ? '✅ PT-BR Revisado'
          : translationStatus === 'needs_review'
          ? '⏳ PT-BR Necessita Revisão'
          : translationStatus === 'outdated'
          ? '⚠️ PT-BR Desatualizado'
          : translationStatus === 'machine_translated'
          ? '🤖 DeepL Traduzido'
          : '🌐 Apenas EN';

      return {
        title: displayTitle,
        subtitle: `/${slug || 'sem-slug'} · [${depthBadge}] · ${statusEmoji}`,
        media,
      };
    },
  },
};
