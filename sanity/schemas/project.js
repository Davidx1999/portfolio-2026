import { contentBlockTypes } from './blocks';

export default {
  name: 'project',
  title: 'Estudo de Caso / Projeto',
  type: 'document',
  groups: [
    { name: 'projectInfo', title: '1. Informações do Projeto', default: true },
    { name: 'caseContent', title: '2. Conteúdo da Case' },
    { name: 'seoConfig', title: '3. SEO e Configurações' },
  ],
  fieldsets: [
    {
      name: 'cardVisuals',
      title: '🖼️ Visual do Card & Fundo da Landing',
      description: 'Imagem de capa do card e imagem de fundo (wallpaper) opcional para o parallax da Landing Page.',
      options: { columns: 2, collapsible: false },
    },
    {
      name: 'heroOverride',
      title: '🎬 Substituição Opcional da Hero',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'legacyFields',
      title: '📦 Campos Legados (Transição / Migração)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ============================================================
    // 1. GRUPO: INFORMAÇÕES DO PROJETO (projectInfo)
    // ============================================================
    {
      name: 'title',
      title: 'Título Público do Projeto',
      type: 'localizedString',
      group: 'projectInfo',
      validation: (Rule) => Rule.required().error('O título do projeto é obrigatório.'),
      description: 'Título público exibido nos cards, na hero e na lista de projetos.',
    },
    {
      name: 'slug',
      title: 'Slug / URL Canônica (Compartilhado)',
      type: 'slug',
      group: 'projectInfo',
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
      name: 'shortDescription',
      title: 'Descrição Curta / Síntese para Cards',
      type: 'localizedText',
      group: 'projectInfo',
      description: 'Texto de síntese exibido abaixo do card na página Work e no Featured Work da Landing.',
    },
    {
      name: 'category',
      title: 'Categoria do Projeto',
      type: 'localizedString',
      group: 'projectInfo',
      description: 'Ex: Product Design, Design System, Branding',
    },
    {
      name: 'disciplines',
      title: 'Competências e Disciplinas (Tags)',
      type: 'array',
      group: 'projectInfo',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tags de competência (ex: Design System, UX Research, Product Architecture).',
    },
    {
      name: 'clientOrContext',
      title: 'Cliente ou Contexto Institucional',
      type: 'string',
      group: 'projectInfo',
      description: 'Ex: FGV DGPE / CEnPE / UFC, Atlanta Home Concierge, Escutha',
    },
    {
      name: 'period',
      title: 'Período',
      type: 'string',
      group: 'projectInfo',
      description: 'Ex: 2022—ATUAL, 2024, 2021—2023',
    },
    {
      name: 'duration',
      title: 'Duração (Opcional)',
      type: 'string',
      group: 'projectInfo',
      description: 'Ex: Mais de 4 anos, 6 semanas, Contínuo',
    },
    {
      name: 'role',
      title: 'Função Principal (Role)',
      type: 'localizedString',
      group: 'projectInfo',
      description: 'Ex: Lead Product Designer, Senior UX/UI Designer',
    },
    {
      name: 'projectStatus',
      title: 'Status do Projeto',
      type: 'string',
      group: 'projectInfo',
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
      name: 'featuredOnHome',
      title: 'Destacar na Landing Page (Featured Work)',
      type: 'boolean',
      group: 'projectInfo',
      initialValue: false,
      description: 'Quando ativado, o projeto é exibido na seção Featured Work da home.',
    },
    {
      name: 'featuredOrder',
      title: 'Ordem de Exibição / Destaque',
      type: 'number',
      group: 'projectInfo',
      initialValue: 99,
      description: 'Menor número = maior prioridade (1, 2, 3...).',
    },
    {
      name: 'published',
      title: 'Publicado no Site / Visibilidade',
      type: 'boolean',
      group: 'projectInfo',
      initialValue: true,
      options: {
        layout: 'switch',
      },
      description:
        'Ligue (ON) para deixar o projeto publicado e visível no site. Desligue (OFF) para mantê-lo como Rascunho / Oculto no site, mesmo se o documento estiver publicado no Sanity Studio.',
    },
    {
      name: 'translationStatus',
      title: 'Status de Tradução (Editorial)',
      type: 'string',
      group: 'projectInfo',
      options: {
        list: [
          { title: 'Original em Inglês (EN)', value: 'original' },
          { title: 'Traduzido via DeepL (needs_review)', value: 'needs_review' },
          { title: 'Revisado Manualmente (reviewed)', value: 'reviewed' },
          { title: 'Tradução Desatualizada (outdated)', value: 'outdated' },
          { title: 'Pendente / Ausente (missing)', value: 'missing' },
        ],
        layout: 'radio',
      },
      initialValue: 'original',
    },

    // ── Fieldset: Visual do Card & Fundo da Landing ─────────────
    {
      name: 'coverImage',
      title: '1. Imagem de Capa do Card',
      type: 'image',
      group: 'projectInfo',
      fieldset: 'cardVisuals',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A imagem de capa é obrigatória.'),
      description: 'Exibida no card na landing/work (com efeito de zoom no hover) e como fallback da hero.',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text da Capa',
          type: 'localizedString',
        },
      ],
    },
    {
      name: 'landingBackgroundImage',
      title: '2. Imagem de Fundo da Landing (Wallpaper)',
      type: 'image',
      group: 'projectInfo',
      fieldset: 'cardVisuals',
      options: { hotspot: true },
      description: 'Opcional. Exibida como wallpaper em tela cheia com efeito parallax na página inicial. Se vazia, a capa será usada.',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text do Fundo',
          type: 'localizedString',
        },
      ],
    },
    {
      name: 'reconstructImage',
      title: 'Imagem Secundária Legada',
      type: 'image',
      hidden: true,
    },

    // ── Fieldset: Substituição Opcional da Hero ─────────────────
    {
      name: 'heroMediaOverride',
      title: 'Mídia Específica da Hero',
      type: 'object',
      group: 'projectInfo',
      fieldset: 'heroOverride',
      description: 'Preencha apenas se este case precisar de um vídeo MP4 ou mídia específica na hero diferente da capa.',
      fields: [
        {
          name: 'image',
          title: 'Imagem da Hero',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'videoUrl',
          title: 'Vídeo da Hero (URL MP4 / WebM)',
          type: 'url',
        },
        {
          name: 'videoPoster',
          title: 'Poster do Vídeo',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'eyebrow',
          title: 'Eyebrow Específico da Hero',
          type: 'localizedString',
        },
        {
          name: 'headline',
          title: 'Headline Específica da Hero',
          type: 'localizedString',
        },
        {
          name: 'summary',
          title: 'Resumo Editorial da Hero',
          type: 'localizedText',
        },
      ],
    },

    // ============================================================
    // 2. GRUPO: CONTEÚDO DA CASE (caseContent)
    // ============================================================
    {
      name: 'contentBlocks',
      title: 'Conteúdo Modular da Case',
      type: 'array',
      group: 'caseContent',
      description: 'Adicione e ordene as instâncias dos templates visuais existentes para construir a narrativa da case.',
      of: contentBlockTypes,
    },

    // ============================================================
    // 3. GRUPO: SEO E CONFIGURAÇÕES (seoConfig)
    // ============================================================
    {
      name: 'nextCase',
      title: 'Próximo Estudo de Caso (Navegação)',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'seoConfig',
      description: 'Referência ao próximo estudo de caso sugerido no fechamento da página.',
    },
    {
      name: 'seo',
      title: 'SEO & Metadados de Compartilhamento',
      type: 'localizedSeo',
      group: 'seoConfig',
      description: 'Configurações de SEO. Se vazio, o título, descrição curta e imagem de capa serão usados como fallback automático.',
    },
    {
      name: 'sourceContentHash',
      title: 'Hash de Controle de Conteúdo EN',
      type: 'string',
      group: 'seoConfig',
      readOnly: true,
      hidden: true,
      description: 'Hash SHA-256 dos campos em inglês gerado no momento da tradução para detecção de alterações.',
    },

    // ============================================================
    // CAMPOS LEGADOS PARA MIGRAÇÃO NÃO-DESTRUTIVA
    // ============================================================
    {
      name: 'mainVisual',
      title: 'Visual Principal Legado',
      type: 'mainVisualMedia',
      group: 'projectInfo',
      fieldset: 'legacyFields',
      readOnly: true,
      hidden: ({ document }) => !document?.mainVisual,
    },
    {
      name: 'overview',
      title: 'Overview Legado',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'legacyFields',
      readOnly: true,
      hidden: ({ document }) => !document?.overview,
    },
    {
      name: 'challenge',
      title: 'Challenge Legado',
      type: 'localizedText',
      group: 'caseContent',
      fieldset: 'legacyFields',
      readOnly: true,
      hidden: ({ document }) => !document?.challenge,
    },
    {
      name: 'responsibilities',
      title: 'Responsibilities Legado',
      type: 'array',
      group: 'caseContent',
      fieldset: 'legacyFields',
      of: [{ type: 'localizedString' }],
      readOnly: true,
      hidden: ({ document }) => !document?.responsibilities,
    },
  ],

  preview: {
    select: {
      titleEn: 'title.en',
      titlePt: 'title.ptBR',
      slug: 'slug.current',
      featured: 'featuredOnHome',
      published: 'published',
      status: 'projectStatus',
      cover: 'coverImage',
      legacyCover: 'mainVisual.image',
      translationStatus: 'translationStatus',
      blocks: 'contentBlocks',
    },
    prepare({ titleEn, titlePt, slug, featured, published, status, cover, legacyCover, translationStatus, blocks }) {
      const displayTitle = titleEn || titlePt || 'Untitled Project';
      const blockCount = Array.isArray(blocks) ? blocks.length : 0;
      const isPublished = published !== false;
      const publishedBadge = isPublished ? '🟢 Publicado' : '🔴 Rascunho / Oculto';
      const featuredBadge = featured ? '⭐ Destaque' : 'Standard';
      const statusLabel = status === 'ongoing' ? 'Em andamento' : status === 'concept' ? 'Conceito' : 'Concluído';
      
      const translationBadge =
        translationStatus === 'reviewed'
          ? '✅ PT-BR Revisado'
          : translationStatus === 'needs_review'
          ? '⏳ PT-BR Necessita Revisão'
          : translationStatus === 'outdated'
          ? '⚠️ PT-BR Desatualizado'
          : '🌐 Apenas EN';

      return {
        title: `${!isPublished ? '[RASCUNHO] ' : ''}${displayTitle}`,
        subtitle: `/${slug || 'sem-slug'} · [${publishedBadge}] · [${featuredBadge}] · ${blockCount} blocos · ${statusLabel} · ${translationBadge}`,
        media: cover || legacyCover,
      };
    },
  },
};
