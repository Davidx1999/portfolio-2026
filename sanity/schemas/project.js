export default {
  name: 'project',
  title: 'Estudo de Caso / Projeto',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Visão Geral & Metadados', default: true },
    { name: 'content', title: 'Narrativa & Estrutura' },
    { name: 'blocks', title: 'Blocos Modulares (Content Blocks)' },
    { name: 'media', title: 'Mídias & Capas' },
    { name: 'publishing', title: 'Publicação & Próximo Case' },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    // ============================================================
    // 1. GRUPO: OVERVIEW & METADADOS
    // ============================================================
    {
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required().error('O título do projeto é obrigatório.'),
    },
    {
      name: 'slug',
      title: 'Slug / URL amigável',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('O slug é obrigatório para gerar a URL.'),
    },
    {
      name: 'id',
      title: 'ID Legado (Retrocompatibilidade)',
      type: 'string',
      group: 'overview',
      hidden: true,
    },
    {
      name: 'caseDepth',
      title: 'Profundidade do Case (Depth)',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Case Completo (Full Case Study - Estrutura profunda e detalhada)', value: 'full' },
          { title: 'Case Compacto (Compact Case Study - Síntese visual ágil)', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
      description: 'Define se a abertura e narrativa seguem modelo completo (ex: Mapear) ou modelo conciso (ex: estudos ágeis e projetos menores).',
    },
    {
      name: 'translationStatus',
      title: 'Status de Tradução (Editorial)',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Original (EN - Fonte Principal)', value: 'original' },
          { title: 'Revisado Editorialmente (PT-BR)', value: 'reviewed' },
          { title: 'Necessita Revisão (Draft Automático / Vercel)', value: 'needs_review' },
          { title: 'Pendente / Ausente', value: 'missing' },
        ],
        layout: 'radio',
      },
      initialValue: 'original',
      description: 'Indica a maturidade editorial da versão traduzida no Sanity.',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow / Sobretítulo Editorial (Opcional)',
      type: 'string',
      group: 'overview',
      description: 'Ex: "01 // SISTEMA & ARQUITETURA", "ESTUDO DE LABORATÓRIO"',
    },
    {
      name: 'projectType',
      title: 'Classificação do Projeto',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Projeto Profissional (Professional Project)', value: 'professionalProject' },
          { title: 'Projeto para Cliente (Client Project)', value: 'clientProject' },
          { title: 'Estudo Independente (Independent Study)', value: 'independentStudy' },
        ],
        layout: 'radio',
      },
      initialValue: 'professionalProject',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'projectStatus',
      title: 'Status do Projeto',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Em andamento (Ongoing / Active)', value: 'ongoing' },
          { title: 'Concluído (Completed)', value: 'completed' },
          { title: 'Direção & Proposta (Concept / Direction)', value: 'concept' },
        ],
      },
      initialValue: 'completed',
    },
    {
      name: 'period',
      title: 'Período (ex: 2021—2026, 2024, 2022—atual)',
      type: 'string',
      group: 'overview',
      description: 'Permita anos únicos ou intervalos flexíveis como 2022—atual.',
    },
    {
      name: 'duration',
      title: 'Duração do Projeto (ex: 4 meses, 6 semanas, Contínuo)',
      type: 'string',
      group: 'overview',
      description: 'Opcional. Exibido na grade de metadados apenas quando preenchido.',
    },
    {
      name: 'clientOrContext',
      title: 'Cliente ou Contexto Institucional',
      type: 'string',
      group: 'overview',
      description: 'Ex: FGV DGPE / CEnPE / UFC, Atlanta Home Concierge, Escutha, Estudo de Laboratório',
    },
    {
      name: 'institution',
      title: 'Instituição de Ensino / Parceiro (Opcional)',
      type: 'string',
      group: 'overview',
    },
    {
      name: 'location',
      title: 'Localização / Modalidade (ex: Fortaleza, Brasil · Remoto)',
      type: 'string',
      group: 'overview',
    },
    {
      name: 'role',
      title: 'Função / Papel Principal (ex: Lead Product Designer)',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'disciplines',
      title: 'Disciplinas & Competências Atuantes',
      type: 'array',
      group: 'overview',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Product Design', value: 'Product Design' },
          { title: 'UX/UI Design', value: 'UX/UI Design' },
          { title: 'Design Systems', value: 'Design Systems' },
          { title: 'Information Architecture', value: 'Information Architecture' },
          { title: 'UX Research', value: 'UX Research' },
          { title: 'Brand Identity', value: 'Brand Identity' },
          { title: 'Motion Design', value: 'Motion Design' },
          { title: 'Creative Development', value: 'Creative Development' },
          { title: 'Prototyping & AI', value: 'Prototyping & AI' },
          { title: 'Design Documentation', value: 'Design Documentation' },
          { title: 'Handoff & QA', value: 'Handoff & QA' },
          { title: 'Web Design', value: 'Web Design' },
        ],
      },
    },
    {
      name: 'externalUrl',
      title: 'Link Externo do Projeto (Opcional)',
      type: 'url',
      group: 'overview',
      description: 'URL para o produto no ar, protótipo interativo ou repositório.',
    },
    {
      name: 'category',
      title: 'Categoria do Card (ex: Product Design, Interface & Motion)',
      type: 'string',
      group: 'overview',
    },
    {
      name: 'tags',
      title: 'Tags Rápidas de Indexação',
      type: 'array',
      group: 'overview',
      of: [{ type: 'string' }],
    },

    // ============================================================
    // 2. GRUPO: MÍDIAS & CAPAS
    // ============================================================
    {
      name: 'coverImage',
      title: 'Imagem de Capa / Thumbnail Geral',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('A imagem de capa é obrigatória para cases publicados.'),
    },
    {
      name: 'coverMedia',
      title: 'Capa do Card Central (Featured Work)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Imagem principal colorida exibida no card central dos Featured Works na Home. Se omitido, usa a Imagem de Capa.',
    },
    {
      name: 'backgroundMedia',
      title: 'Wallpaper / Mídia de Fundo (Featured Work)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Artefato secundário (fluxo, wireframe, detalhe ampliado) utilizado no fundo do palco sticky dos Featured Works.',
    },
    {
      name: 'heroMedia',
      title: 'Mídia Principal da Hero (Imagem ou Vídeo)',
      type: 'object',
      group: 'media',
      fields: [
        {
          name: 'mediaType',
          title: 'Tipo de Mídia',
          type: 'string',
          options: {
            list: [
              { title: 'Imagem de Alta Fidelidade', value: 'image' },
              { title: 'Vídeo / Gravação de Interface', value: 'video' },
            ],
            layout: 'radio',
          },
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Arquivo de Imagem',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.mediaType === 'video',
        },
        {
          name: 'videoUrl',
          title: 'URL do Vídeo (MP4 / WebM)',
          type: 'url',
          hidden: ({ parent }) => parent?.mediaType !== 'video',
        },
        {
          name: 'poster',
          title: 'Poster / Frame de Carregamento do Vídeo',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.mediaType !== 'video',
        },
        {
          name: 'autoplay',
          title: 'Autoplay (Muted & Loop)',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => parent?.mediaType !== 'video',
        },
        {
          name: 'alt',
          title: 'Texto Alternativo de Acessibilidade (PT)',
          type: 'string',
        },
        {
          name: 'alt_en',
          title: 'Accessibility Alt Text (EN)',
          type: 'string',
        },
        // Configurações de Abertura Cinematográfica Diagonal
        {
          name: 'enableDiagonalHeroReveal',
          title: 'Ativar Revelação Cinematográfica Diagonal no Scroll',
          type: 'boolean',
          initialValue: true,
          description: 'A mídia surge menor e inclinada na diagonal, expandindo para full viewport conforme o scroll.',
        },
        {
          name: 'initialRotation',
          title: 'Rotação Inicial na Diagonal',
          type: 'string',
          options: {
            list: [
              { title: '-10° (Diagonal Esquerda Padrão)', value: '-10' },
              { title: '-5° (Discreto)', value: '-5' },
              { title: '+8° (Diagonal Direita)', value: '8' },
              { title: '0° (Sem Rotação Inicial)', value: '0' },
            ],
          },
          initialValue: '-10',
          hidden: ({ parent }) => !parent?.enableDiagonalHeroReveal,
        },
        {
          name: 'initialScalePreset',
          title: 'Escala Inicial da Mídia',
          type: 'string',
          options: {
            list: [
              { title: 'Compacto (0.38)', value: 'compact' },
              { title: 'Médio (0.45 Padrão)', value: 'medium' },
              { title: 'Amplo (0.60)', value: 'large' },
            ],
          },
          initialValue: 'medium',
          hidden: ({ parent }) => !parent?.enableDiagonalHeroReveal,
        },
        {
          name: 'initialHorizontalDirection',
          title: 'Deslocamento Horizontal Inicial',
          type: 'string',
          options: {
            list: [
              { title: 'Deslocado para a Esquerda (-10vw)', value: 'left' },
              { title: 'Deslocado para a Direita (+10vw)', value: 'right' },
              { title: 'Centralizado (0)', value: 'center' },
            ],
          },
          initialValue: 'left',
          hidden: ({ parent }) => !parent?.enableDiagonalHeroReveal,
        },
        {
          name: 'heroScrollLength',
          title: 'Comprimento do Scroll de Abertura',
          type: 'string',
          options: {
            list: [
              { title: 'Curto (160vh)', value: 'short' },
              { title: 'Médio (220vh Padrão)', value: 'medium' },
              { title: 'Longo (280vh)', value: 'long' },
            ],
          },
          initialValue: 'medium',
          hidden: ({ parent }) => !parent?.enableDiagonalHeroReveal,
        },
      ],
    },
    {
      name: 'image',
      title: 'Imagem Principal Legada (Retrocompatibilidade)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    },
    {
      name: 'processImage',
      title: 'Imagem de Processo Legada (Opcional)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    },
    {
      name: 'finalImage',
      title: 'Imagem Final Legada (Opcional)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    },

    // ============================================================
    // 3. GRUPO: NARRATIVA & ESTRUTURA EDITORIAL
    // ============================================================
    {
      name: 'heroSummary',
      title: 'Resumo da Hero (PT)',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Apresentação curta e objetiva do projeto na Hero.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSummary_en',
      title: 'Hero Summary (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    },
    {
      name: 'thesis',
      title: 'Frase Central / Tese do Projeto (PT)',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Frase de grande escala em serif logo após a Hero. Ex: "Como transformar um ecossistema educacional complexo em uma experiência compreensível?"',
    },
    {
      name: 'thesis_en',
      title: 'Central Thesis / Core Question (EN)',
      type: 'text',
      rows: 2,
      group: 'content',
    },
    {
      name: 'overview',
      title: 'Visão Geral / Contexto (PT)',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'O que era o projeto, quem utilizava e em qual ambiente existia.',
    },
    {
      name: 'overview_en',
      title: 'Project Overview / Context (EN)',
      type: 'text',
      rows: 4,
      group: 'content',
    },
    {
      name: 'challenge',
      title: 'O Desafio Real (PT)',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Apresenta a complexidade, regras de negócio e restrições reais.',
    },
    {
      name: 'challenge_en',
      title: 'The Real Challenge (EN)',
      type: 'text',
      rows: 4,
      group: 'content',
    },
    {
      name: 'responsibilities',
      title: 'Minha Atuação / Responsabilidades (PT)',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Lista direta de responsabilidades individuais.',
    },
    {
      name: 'responsibilities_en',
      title: 'Key Responsibilities & Scope (EN)',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    },
    {
      name: 'solution',
      title: 'A Solução Estruturada (PT)',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'O que foi criado, desenhado ou organizado.',
    },
    {
      name: 'solution_en',
      title: 'Structured Solution (EN)',
      type: 'text',
      rows: 4,
      group: 'content',
    },
    {
      name: 'impact',
      title: 'Impacto & Evidências Reais (PT)',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'O que mudou ou passou a ser possível (evidências qualitativas reais, sem métricas falsas).',
    },
    {
      name: 'impact_en',
      title: 'Impact & Verifiable Outcomes (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    },
    {
      name: 'reflection',
      title: 'Reflexão Pessoal em Primeira Pessoa (PT)',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Reflexão curta sobre o aprendizado e evolução profissional com este projeto.',
    },
    {
      name: 'reflection_en',
      title: 'Personal Design Reflection (EN)',
      type: 'text',
      rows: 3,
      group: 'content',
    },

    // ============================================================
    // 4. GRUPO: BLOCOS MODULARES (CONTENT BLOCKS)
    // ============================================================
    {
      name: 'contentBlocks',
      title: 'Blocos Modulares de Conteúdo & Narrativa',
      type: 'array',
      group: 'blocks',
      description: 'Monte a narrativa visual do case alternando textos, mídia cinematográfica, diagonais, mosaicos, pilhas verticais e artefatos.',
      of: [
        // 0. Bloco de Narrativa Sticky Customizável (Sticky Narrative Section)
        {
          name: 'stickyNarrative',
          title: 'Narrativa Sticky Editorial (Visão Geral, Desafios & Tópicos)',
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow / Tag Superior (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'sectionTitle', title: 'Título Principal da Seção (PT)', type: 'string', initialValue: 'Contexto & Desafio' },
            { name: 'sectionTitle_en', title: 'Section Title (EN)', type: 'string', initialValue: 'Context & Challenge' },
            { name: 'sectionSubtitle', title: 'Subtítulo / Descrição da Coluna Esquerda (PT)', type: 'text', rows: 2 },
            { name: 'sectionSubtitle_en', title: 'Subtitle (EN)', type: 'text', rows: 2 },
            {
              name: 'topics',
              title: 'Tópicos da Narrativa (Coluna Direita)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'topicKey', title: 'Identificador / Label (ex: [ Contexto ], [ Desafio ])', type: 'string' },
                    { name: 'topicKey_en', title: 'Identifier Label (EN)', type: 'string' },
                    { name: 'title', title: 'Título do Tópico (Opcional)', type: 'string' },
                    { name: 'title_en', title: 'Topic Title (EN)', type: 'string' },
                    { name: 'content', title: 'Texto do Tópico (PT)', type: 'text', rows: 4, validation: (Rule) => Rule.required() },
                    { name: 'content_en', title: 'Content (EN)', type: 'text', rows: 4 },
                    {
                      name: 'bulletPoints',
                      title: 'Itens em Lista (Opcional - ex: Responsabilidades)',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'bulletPoints_en',
                      title: 'Bullet Points (EN)',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'highlight',
                      title: 'Destacar este tópico com cor de acento',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: { title: 'topicKey', subtitle: 'content' },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || 'Tópico Narrativo',
                        subtitle: subtitle ? subtitle.slice(0, 50) + '...' : '',
                      };
                    },
                  },
                },
              ],
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'sectionTitle', subtitle: 'eyebrow' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Narrativa Sticky Editorial',
                subtitle: subtitle || 'Sticky Narrative Block',
              };
            },
          },
        },

        // 0.1 Bloco de Vídeo de Protótipo de Alta Performance (Prototype Video Section)
        {
          name: 'prototypeVideo',
          title: 'Vídeo de Protótipo / Demonstração Interativa',
          type: 'object',
          description: 'Vídeo com IntersectionObserver, carregamento sob demanda, poster sem frame preto e respeito a reduced motion.',
          fields: [
            { name: 'videoUrl', title: 'URL do Vídeo (MP4 / WebM)', type: 'url' },
            { name: 'videoFile', title: 'Arquivo de Vídeo (Upload Direto no Sanity)', type: 'file', options: { accept: 'video/*' } },
            { name: 'poster', title: 'Poster / Imagem de Capa do Vídeo', type: 'image', options: { hotspot: true } },
            { name: 'title', title: 'Título da Demonstração (Opcional - PT)', type: 'string' },
            { name: 'title_en', title: 'Title (EN)', type: 'string' },
            { name: 'shortDescription', title: 'Descrição Curta do Protótipo (PT)', type: 'text', rows: 2 },
            { name: 'shortDescription_en', title: 'Short Description (EN)', type: 'text', rows: 2 },
            { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
            { name: 'caption_en', title: 'Technical Caption (EN)', type: 'string' },
            {
              name: 'aspectRatio',
              title: 'Proporção do Player',
              type: 'string',
              options: {
                list: [
                  { title: '16/9 (Widescreen Padrão)', value: '16/9' },
                  { title: '16/10 (Interface Desktop / Dashboard)', value: '16/10' },
                  { title: '4/3 (Foco Tátil / Tablet)', value: '4/3' },
                  { title: '21/9 (Cinemático Ultra-Wide)', value: '21/9' },
                  { title: '9/16 (Vertical / Mobile App)', value: '9/16' },
                ],
              },
              initialValue: '16/9',
            },
            { name: 'autoplay', title: 'Autoplay ao entrar na Viewport (Muted)', type: 'boolean', initialValue: true },
            { name: 'loop', title: 'Repetir em Loop', type: 'boolean', initialValue: true },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'caption', media: 'poster' },
            prepare({ title, subtitle, media }) {
              return {
                title: title || subtitle || 'Vídeo de Protótipo',
                subtitle: 'Prototype Video Section',
                media,
              };
            },
          },
        },

        // 0.2 Bloco de Decisões de Design (Decision Section)
        {
          name: 'decisionSection',
          title: 'Decisões de Design & Justificativas (Design Decisions)',
          type: 'object',
          description: 'Documentação de problemas enfrentados, decisões tomadas e trade-offs técnicos/visuais.',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow (PT)', type: 'string', initialValue: 'DECISÕES DE DESIGN // ARQUITETURA' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string', initialValue: 'DESIGN DECISIONS // ARCHITECTURE' },
            { name: 'title', title: 'Título da Seção (PT)', type: 'string', initialValue: 'Decisões Críticas e Justificativas de Projeto' },
            { name: 'title_en', title: 'Title (EN)', type: 'string', initialValue: 'Critical Decisions & Trade-Offs' },
            { name: 'intro', title: 'Texto de Introdução (PT)', type: 'text', rows: 2 },
            { name: 'intro_en', title: 'Intro (EN)', type: 'text', rows: 2 },
            {
              name: 'decisions',
              title: 'Lista de Decisões',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'number', title: 'Número (ex: 01)', type: 'string' },
                    { name: 'challenge', title: 'O Problema / Fricção Identificada (PT)', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'challenge_en', title: 'Problem / Friction (EN)', type: 'string' },
                    { name: 'decision', title: 'Decisão Tomada (PT)', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
                    { name: 'decision_en', title: 'Decision Made (EN)', type: 'text', rows: 3 },
                    { name: 'rationale', title: 'Justificativa Técnica / Racional (PT)', type: 'text', rows: 3 },
                    { name: 'rationale_en', title: 'Rationale / Impact (EN)', type: 'text', rows: 3 },
                    { name: 'artifactMedia', title: 'Mídia / Artefato Comprobatório (Opcional)', type: 'image', options: { hotspot: true } },
                    { name: 'artifactCaption', title: 'Legenda do Artefato (PT)', type: 'string' },
                    { name: 'artifactCaption_en', title: 'Caption (EN)', type: 'string' },
                  ],
                  preview: {
                    select: { title: 'challenge', subtitle: 'number', media: 'artifactMedia' },
                    prepare({ title, subtitle, media }) {
                      return {
                        title: `${subtitle ? `[${subtitle}] ` : ''}${title || 'Decisão'}`,
                        subtitle: 'Design Decision Item',
                        media,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).error('Adicione pelo menos 1 decisão de design.'),
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'eyebrow' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Decisões de Design',
                subtitle: subtitle || 'Decision Section',
              };
            },
          },
        },

        // 0.3 Bloco de Resultados Qualitativos Legítimos (Outcome Section)
        {
          name: 'outcomeSection',
          title: 'Resultados Qualitativos & Aprendizados (Outcomes & Learnings)',
          type: 'object',
          description: 'Resultados honestos e verificáveis (consistência, tokens, handoff, validações) sem métricas inventadas.',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow (PT)', type: 'string', initialValue: 'RESULTADOS // APRENDIZADOS' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string', initialValue: 'OUTCOMES // LEARNINGS' },
            { name: 'title', title: 'Título da Seção (PT)', type: 'string', initialValue: 'Impacto Real e Consistência Sistêmica' },
            { name: 'title_en', title: 'Title (EN)', type: 'string', initialValue: 'Real Impact & Systemic Consistency' },
            { name: 'intro', title: 'Introdução / Resumo Geral (PT)', type: 'text', rows: 2 },
            { name: 'intro_en', title: 'Intro (EN)', type: 'text', rows: 2 },
            {
              name: 'outcomes',
              title: 'Evidências & Aprendizados Qualitativos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'tag', title: 'Tag / Tipo (ex: Consistência, Engenharia, Handoff, Validação)', type: 'string' },
                    { name: 'title', title: 'Título do Resultado (PT)', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'title_en', title: 'Outcome Title (EN)', type: 'string' },
                    { name: 'description', title: 'Descrição Qualitativa / Verificação (PT)', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
                    { name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 },
                  ],
                  preview: {
                    select: { title: 'title', subtitle: 'tag' },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || 'Resultado Qualitativo',
                        subtitle: subtitle ? `[${subtitle}]` : 'Outcome',
                      };
                    },
                  },
                },
              ],
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'eyebrow' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Resultados Qualitativos',
                subtitle: subtitle || 'Outcome Section',
              };
            },
          },
        },

        // 0.4 Bloco de Galeria de Imagens (Image Gallery Section)
        {
          name: 'imageGallery',
          title: 'Galeria Editorial de Imagens (Image Gallery)',
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'title', title: 'Título da Galeria (Opcional - PT)', type: 'string' },
            { name: 'title_en', title: 'Title (EN)', type: 'string' },
            {
              name: 'columns',
              title: 'Layout de Colunas',
              type: 'string',
              options: {
                list: [
                  { title: '2 Colunas Grandes (50% / 50%)', value: '2' },
                  { title: '3 Colunas Médias (Grid 33%)', value: '3' },
                  { title: '4 Colunas Compactas (Grid 25%)', value: '4' },
                ],
              },
              initialValue: '2',
            },
            {
              name: 'images',
              title: 'Imagens da Galeria',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'image', title: 'Arquivo de Imagem', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
                    { name: 'alt', title: 'Texto Alternativo (PT)', type: 'string' },
                    { name: 'alt_en', title: 'Alt Text (EN)', type: 'string' },
                    { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
                    { name: 'caption_en', title: 'Caption (EN)', type: 'string' },
                    {
                      name: 'aspectRatio',
                      title: 'Aspect Ratio',
                      type: 'string',
                      options: {
                        list: [
                          { title: '16/10 (Interface)', value: '16/10' },
                          { title: '16/9 (Widescreen)', value: '16/9' },
                          { title: '4/3 (Equilibrado)', value: '4/3' },
                          { title: '1/1 (Quadrado)', value: '1/1' },
                          { title: 'Auto (Original)', value: 'auto' },
                        ],
                      },
                      initialValue: '16/10',
                    },
                  ],
                  preview: {
                    select: { title: 'caption', media: 'image' },
                    prepare({ title, media }) {
                      return {
                        title: title || 'Imagem da Galeria',
                        media,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).error('Adicione pelo menos 1 imagem.'),
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', items: 'images' },
            prepare({ title, items }) {
              return {
                title: title || `Galeria de Imagens (${items?.length || 0} fotos)`,
                subtitle: 'Image Gallery Block',
              };
            },
          },
        },

        // 1. Bloco de Capítulo (Chapter Intro)
        {
          name: 'chapterIntro',
          title: 'Abertura de Capítulo (Chapter Intro)',
          type: 'object',
          fields: [
            { name: 'chapterNumber', title: 'Número do Capítulo (ex: 01, 02)', type: 'string', initialValue: '01' },
            { name: 'title', title: 'Título do Capítulo (PT)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'title_en', title: 'Chapter Title (EN)', type: 'string' },
            { name: 'subtitle', title: 'Subtítulo Editorial (PT)', type: 'string' },
            { name: 'subtitle_en', title: 'Subtitle (EN)', type: 'string' },
            { name: 'summary', title: 'Resumo / Declaração do Capítulo (PT)', type: 'text', rows: 3 },
            { name: 'summary_en', title: 'Summary (EN)', type: 'text', rows: 3 },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'chapterNumber' },
            prepare({ title, subtitle }) {
              return {
                title: `Capítulo ${subtitle || '01'}: ${title || 'Abertura'}`,
                subtitle: 'Chapter Intro Block',
              };
            },
          },
        },

        // 2. Bloco Diagonal Media Scene
        {
          name: 'diagonalMediaScene',
          title: 'Cena de Mídia Diagonal (Diagonal Media Scene)',
          type: 'object',
          description: 'Mídia que cresce pela diagonal no scroll, permanece completa em hold e recolhe pela mesma diagonal.',
          fields: [
            { name: 'media', title: 'Imagem ou Artefato', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'alt', title: 'Texto Alternativo (PT)', type: 'string' },
            { name: 'alt_en', title: 'Alt Text (EN)', type: 'string' },
            { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
            { name: 'caption_en', title: 'Caption (EN)', type: 'string' },
            {
              name: 'directionPreset',
              title: 'Direção do Movimento Diagonal',
              type: 'string',
              options: {
                list: [
                  { title: 'Superior Esquerda para o Centro (Top Left to Center)', value: 'topLeftToCenter' },
                  { title: 'Superior Direita para o Centro (Top Right to Center)', value: 'topRightToCenter' },
                  { title: 'Inferior Esquerda para o Centro (Bottom Left to Center)', value: 'bottomLeftToCenter' },
                  { title: 'Inferior Direita para o Centro (Bottom Right to Center)', value: 'bottomRightToCenter' },
                ],
              },
              initialValue: 'topLeftToCenter',
            },
            {
              name: 'showDestinationFrame',
              title: 'Exibir Frame Fixo no Tamanho Final',
              type: 'boolean',
              initialValue: false,
              description: 'O frame permanece no tamanho final e a imagem escala dentro dele.',
            },
            {
              name: 'frameColor',
              title: 'Cor do Frame Fixo',
              type: 'string',
              options: {
                list: [
                  { title: 'Lime Accent (#C4FF00)', value: 'lime' },
                  { title: 'Branco Sutil (White/20)', value: 'white' },
                  { title: 'Carvão Escuro', value: 'dark' },
                ],
              },
              initialValue: 'lime',
              hidden: ({ parent }) => !parent?.showDestinationFrame,
            },
            {
              name: 'scrollLength',
              title: 'Duração do Scroll',
              type: 'string',
              options: {
                list: [
                  { title: 'Curto (160vh)', value: 'short' },
                  { title: 'Médio (220vh Padrão)', value: 'medium' },
                  { title: 'Longo (280vh)', value: 'long' },
                ],
              },
              initialValue: 'medium',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'caption', media: 'media', subtitle: 'directionPreset' },
            prepare({ title, media, subtitle }) {
              return {
                title: title || 'Cena de Mídia Diagonal',
                subtitle: `Diagonal: ${subtitle || 'topLeft'}`,
                media,
              };
            },
          },
        },

        // 3. Bloco Artifact Mosaic Scene
        {
          name: 'artifactMosaicScene',
          title: 'Mosaico de Artefatos (Artifact Mosaic Scene)',
          type: 'object',
          description: 'Artefatos distribuídos em grid de 4 colunas com espaços vazios intencionais e animação individual.',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'title', title: 'Título da Seção de Mosaico (PT)', type: 'string' },
            { name: 'title_en', title: 'Title (EN)', type: 'string' },
            {
              name: 'preset',
              title: 'Padrão de Distribuição (Preset)',
              type: 'string',
              options: {
                list: [
                  { title: 'Alternado (Alternating Pattern)', value: 'alternating' },
                  { title: 'Cascata (Cascade Pattern)', value: 'cascade' },
                  { title: 'Esparso (Sparse Pattern)', value: 'sparse' },
                  { title: 'Personalizado por Item (Custom)', value: 'custom' },
                ],
              },
              initialValue: 'alternating',
            },
            {
              name: 'items',
              title: 'Itens do Mosaico',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'media', title: 'Mídia / Artefato', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
                    { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
                    { name: 'caption_en', title: 'Caption (EN)', type: 'string' },
                    { name: 'alt', title: 'Alt Text (PT)', type: 'string' },
                    { name: 'row', title: 'Linha na Grid (1-12)', type: 'number' },
                    { name: 'column', title: 'Coluna na Grid (1-4)', type: 'number' },
                    {
                      name: 'frameMode',
                      title: 'Modo do Frame',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Nenhum / Escala Total (None)', value: 'none' },
                          { title: 'Quadrado Fixo (Fixed Square)', value: 'fixedSquare' },
                          { title: 'Retângulo Fixo (Fixed Rectangle)', value: 'fixedRectangle' },
                        ],
                      },
                      initialValue: 'none',
                    },
                    {
                      name: 'transformOrigin',
                      title: 'Origem da Escala',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Centro (Center)', value: 'center' },
                          { title: 'Canto Superior Esquerdo', value: 'topLeft' },
                          { title: 'Canto Superior Direito', value: 'topRight' },
                          { title: 'Canto Inferior Esquerdo', value: 'bottomLeft' },
                          { title: 'Canto Inferior Direito', value: 'bottomRight' },
                        ],
                      },
                      initialValue: 'center',
                    },
                    {
                      name: 'fitMode',
                      title: 'Modo de Preenchimento da Imagem',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Cover (Preenchimento Total do Quadrante)', value: 'cover' },
                          { title: 'Contain (Artefatos Isolados / Ícones / Tokens)', value: 'contain' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'cover',
                    },
                  ],
                  preview: {
                    select: { title: 'caption', media: 'media', row: 'row', col: 'column' },
                    prepare({ title, media, row, col }) {
                      return {
                        title: title || 'Item do Mosaico',
                        subtitle: row && col ? `Posição: L${row}, C${col}` : 'Auto grid',
                        media,
                      };
                    },
                  },
                },
              ],
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare({ title, items }) {
              return {
                title: title || 'Mosaico de Artefatos',
                subtitle: `${items?.length || 0} artefatos distribuídos`,
              };
            },
          },
        },

        // 4. Bloco Lagged Full Viewport Media
        {
          name: 'laggedFullViewportMedia',
          title: 'Mídia Full Viewport com Atraso (Lagged Full Viewport)',
          type: 'object',
          description: 'Mídia de tela cheia (100svh) com movimento interno mais lento que o container para transmitir profundidade.',
          fields: [
            {
              name: 'mediaType',
              title: 'Tipo de Mídia',
              type: 'string',
              options: {
                list: [
                  { title: 'Imagem', value: 'image' },
                  { title: 'Vídeo', value: 'video' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Imagem de Alta Resolução',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType === 'video',
            },
            {
              name: 'videoUrl',
              title: 'URL do Vídeo (MP4 / WebM)',
              type: 'url',
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            },
            {
              name: 'poster',
              title: 'Poster do Vídeo',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            },
            { name: 'headline', title: 'Título / Mensagem Sobreposta (PT)', type: 'string' },
            { name: 'headline_en', title: 'Overlaid Headline (EN)', type: 'string' },
            {
              name: 'headlineAlignment',
              title: 'Alinhamento da Mensagem',
              type: 'string',
              options: {
                list: [
                  { title: 'Canto Inferior Esquerdo', value: 'bottomLeft' },
                  { title: 'Centro da Tela', value: 'center' },
                  { title: 'Canto Superior Esquerdo', value: 'topLeft' },
                ],
              },
              initialValue: 'bottomLeft',
            },
            { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
            { name: 'caption_en', title: 'Technical Caption (EN)', type: 'string' },
            {
              name: 'lagPreset',
              title: 'Intensidade do Atraso (Parallax Sutil)',
              type: 'string',
              options: {
                list: [
                  { title: 'Subtle (6vh - Muito Discreto)', value: 'subtle' },
                  { title: 'Medium (10vh - Padrão Cinematográfico)', value: 'medium' },
                ],
              },
              initialValue: 'medium',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'headline', media: 'image', caption: 'caption' },
            prepare({ title, media, caption }) {
              return {
                title: title || caption || 'Full Viewport Media com Atraso',
                subtitle: 'Lagged Full Viewport Block',
                media,
              };
            },
          },
        },

        // 5. Bloco Vertical Media Stack
        {
          name: 'verticalMediaStack',
          title: 'Pilha Vertical de Imagens (Vertical Media Stack)',
          type: 'object',
          description: 'Narrativa em pilha de mídias que avança e recua em profundidade durante o scroll.',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'openingStatement', title: 'Declaração de Abertura (PT)', type: 'text', rows: 2 },
            { name: 'openingStatement_en', title: 'Opening Statement (EN)', type: 'text', rows: 2 },
            {
              name: 'items',
              title: 'Mídias da Pilha (2 a 5 itens recomendados)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'media', title: 'Imagem da Camada', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
                    { name: 'caption', title: 'Título / Legenda da Camada (PT)', type: 'string' },
                    { name: 'caption_en', title: 'Caption (EN)', type: 'string' },
                    { name: 'supportingText', title: 'Texto de Apoio (PT)', type: 'text', rows: 2 },
                    { name: 'supportingText_en', title: 'Supporting Text (EN)', type: 'text', rows: 2 },
                  ],
                  preview: {
                    select: { title: 'caption', media: 'media' },
                    prepare({ title, media }) {
                      return {
                        title: title || 'Camada da Pilha',
                        media,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(2).error('A pilha vertical precisa de pelo menos 2 mídias.'),
            },
            { name: 'closingStatement', title: 'Declaração de Fechamento (PT)', type: 'text', rows: 2 },
            { name: 'closingStatement_en', title: 'Closing Statement (EN)', type: 'text', rows: 2 },
            {
              name: 'scrollLengthPreset',
              title: 'Comprimento do Scroll da Pilha',
              type: 'string',
              options: {
                list: [
                  { title: 'Curto (200vh)', value: 'short' },
                  { title: 'Médio (280vh Padrão)', value: 'medium' },
                  { title: 'Longo (360vh)', value: 'long' },
                ],
              },
              initialValue: 'medium',
            },
            {
              name: 'mediaWidthPreset',
              title: 'Largura da Mídia',
              type: 'string',
              options: {
                list: [
                  { title: 'Padrão (840px)', value: 'standard' },
                  { title: 'Amplo (1040px)', value: 'wide' },
                ],
              },
              initialValue: 'standard',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'openingStatement', items: 'items' },
            prepare({ title, items }) {
              return {
                title: title || 'Pilha Vertical de Imagens',
                subtitle: `${items?.length || 0} mídias em profundidade`,
              };
            },
          },
        },

        // 6. Bloco Divider Statement (Evoluído)
        {
          name: 'dividerStatement',
          title: 'Frase Editorial de Transição (Statement Block)',
          type: 'object',
          description: 'Pausa narrativa reflexiva entre cenas visuais do case.',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow / Tag Superior (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'statement', title: 'Declaração Editorial Principal (PT)', type: 'text', rows: 2, validation: (Rule) => Rule.required() },
            { name: 'statement_en', title: 'Statement (EN)', type: 'text', rows: 2 },
            { name: 'supportingText', title: 'Texto de Apoio Opcional (PT)', type: 'text', rows: 2 },
            { name: 'supportingText_en', title: 'Supporting Text (EN)', type: 'text', rows: 2 },
            {
              name: 'alignment',
              title: 'Alinhamento',
              type: 'string',
              options: {
                list: [
                  { title: 'Esquerda (Padrão)', value: 'left' },
                  { title: 'Centro', value: 'center' },
                ],
              },
              initialValue: 'left',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Project Accent', value: 'projectAccent' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'statement', subtitle: 'eyebrow' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Frase Editorial de Transição',
                subtitle: subtitle || 'Statement Block',
              };
            },
          },
        },

        // Bloco 7: Text Section
        {
          name: 'textSection',
          title: 'Seção de Texto Editorial',
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow / Tag Superior (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'title', title: 'Título da Seção (PT)', type: 'string' },
            { name: 'title_en', title: 'Section Title (EN)', type: 'string' },
            { name: 'body', title: 'Corpo do Texto (PT)', type: 'text', rows: 4 },
            { name: 'body_en', title: 'Body Text (EN)', type: 'text', rows: 4 },
            {
              name: 'alignment',
              title: 'Alinhamento',
              type: 'string',
              options: {
                list: [
                  { title: 'Esquerda (Padrão)', value: 'left' },
                  { title: 'Centro', value: 'center' },
                ],
              },
              initialValue: 'left',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'eyebrow' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Seção de Texto Editorial',
                subtitle: subtitle || 'Bloco de Texto',
              };
            },
          },
        },

        // Bloco 8: Full Media
        {
          name: 'fullMedia',
          title: 'Mídia Ampla (Full Width)',
          type: 'object',
          fields: [
            {
              name: 'mediaType',
              title: 'Tipo de Mídia',
              type: 'string',
              options: {
                list: [
                  { title: 'Imagem', value: 'image' },
                  { title: 'Vídeo', value: 'video' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType === 'video',
            },
            {
              name: 'videoUrl',
              title: 'URL do Vídeo (MP4)',
              type: 'url',
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            },
            {
              name: 'poster',
              title: 'Poster do Vídeo',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            },
            { name: 'alt', title: 'Texto Alternativo (PT)', type: 'string' },
            { name: 'alt_en', title: 'Alt Text (EN)', type: 'string' },
            { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
            { name: 'caption_en', title: 'Technical Caption (EN)', type: 'string' },
            {
              name: 'aspectRatio',
              title: 'Proporção Visual',
              type: 'string',
              options: {
                list: [
                  { title: '16/9 (Widescreen Padrão)', value: '16/9' },
                  { title: '21/9 (Cinemático Amplo)', value: '21/9' },
                  { title: '16/10 (Interface Desktop)', value: '16/10' },
                  { title: 'Auto / Original', value: 'auto' },
                ],
              },
              initialValue: '16/9',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
            prepare({ title, media }) {
              return {
                title: title || 'Mídia de Largura Total',
                subtitle: 'Full Media Block',
                media,
              };
            },
          },
        },

        // Bloco 9: Split Media
        {
          name: 'splitMedia',
          title: 'Mídias Lado a Lado (Split Media)',
          type: 'object',
          fields: [
            {
              name: 'mediaLeft',
              title: 'Mídia Esquerda',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            { name: 'captionLeft', title: 'Legenda Esquerda (PT)', type: 'string' },
            { name: 'captionLeft_en', title: 'Left Caption (EN)', type: 'string' },
            {
              name: 'mediaRight',
              title: 'Mídia Direita',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            { name: 'captionRight', title: 'Legenda Direita (PT)', type: 'string' },
            { name: 'captionRight_en', title: 'Right Caption (EN)', type: 'string' },
            {
              name: 'ratio',
              title: 'Divisão de Colunas',
              type: 'string',
              options: {
                list: [
                  { title: '50% / 50% (Igual)', value: '50-50' },
                  { title: '60% / 40% (Destaque Esquerda)', value: '60-40' },
                  { title: '40% / 60% (Destaque Direita)', value: '40-60' },
                ],
              },
              initialValue: '50-50',
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'captionLeft', media: 'mediaLeft' },
            prepare({ title, media }) {
              return {
                title: title || 'Mídias Lado a Lado (50/50)',
                subtitle: 'Split Media Block',
                media,
              };
            },
          },
        },

        // Bloco 10: Media + Text
        {
          name: 'mediaText',
          title: 'Composição Mídia + Texto',
          type: 'object',
          fields: [
            {
              name: 'media',
              title: 'Mídia (Imagem)',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'mediaPosition',
              title: 'Posição da Mídia',
              type: 'string',
              options: {
                list: [
                  { title: 'Mídia na Esquerda / Texto na Direita', value: 'left' },
                  { title: 'Texto na Esquerda / Mídia na Direita', value: 'right' },
                ],
              },
              initialValue: 'left',
            },
            { name: 'eyebrow', title: 'Eyebrow (PT)', type: 'string' },
            { name: 'eyebrow_en', title: 'Eyebrow (EN)', type: 'string' },
            { name: 'title', title: 'Título do Destaque (PT)', type: 'string' },
            { name: 'title_en', title: 'Title (EN)', type: 'string' },
            { name: 'body', title: 'Texto Explicativo (PT)', type: 'text', rows: 4 },
            { name: 'body_en', title: 'Body Text (EN)', type: 'text', rows: 4 },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title', media: 'media' },
            prepare({ title, media }) {
              return {
                title: title || 'Mídia + Texto Editorial',
                subtitle: 'Media + Text Block',
                media,
              };
            },
          },
        },

        // Bloco 11: Image Grid
        {
          name: 'imageGrid',
          title: 'Grade de Imagens (2 ou 3 Colunas)',
          type: 'object',
          fields: [
            {
              name: 'columns',
              title: 'Número de Colunas',
              type: 'string',
              options: {
                list: [
                  { title: '2 Colunas', value: '2' },
                  { title: '3 Colunas', value: '3' },
                ],
                layout: 'radio',
              },
              initialValue: '2',
            },
            {
              name: 'items',
              title: 'Itens da Grade',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'image', title: 'Imagem', type: 'image', options: { hotspot: true } },
                    { name: 'caption', title: 'Legenda (PT)', type: 'string' },
                    { name: 'caption_en', title: 'Caption (EN)', type: 'string' },
                    { name: 'alt', title: 'Alt Text (PT)', type: 'string' },
                  ],
                },
              ],
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { items: 'items' },
            prepare({ items }) {
              return {
                title: `Grade de Imagens (${items?.length || 0} itens)`,
                subtitle: 'Image Grid Block',
              };
            },
          },
        },

        // Bloco 12: Video Block
        {
          name: 'videoBlock',
          title: 'Bloco de Vídeo / Microinteração',
          type: 'object',
          fields: [
            { name: 'externalVideo', title: 'URL do Vídeo (MP4 / WebM)', type: 'url' },
            { name: 'poster', title: 'Poster / Imagem de Capa do Vídeo', type: 'image', options: { hotspot: true } },
            { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
            { name: 'caption_en', title: 'Technical Caption (EN)', type: 'string' },
            { name: 'autoplay', title: 'Autoplay (Muted & Loop)', type: 'boolean', initialValue: true },
            { name: 'controls', title: 'Exibir Controles Nativos', type: 'boolean', initialValue: false },
            {
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: '16/9 (Widescreen)', value: '16/9' },
                  { title: '16/10 (Interface)', value: '16/10' },
                  { title: '4/3 (Foco)', value: '4/3' },
                ],
              },
              initialValue: '16/9',
            },
          ],
          preview: {
            select: { title: 'caption', media: 'poster' },
            prepare({ title, media }) {
              return {
                title: title || 'Bloco de Vídeo',
                subtitle: 'Video Block',
                media,
              };
            },
          },
        },

        // Bloco 13: Before / After
        {
          name: 'beforeAfter',
          title: 'Comparação Antes / Depois (Before & After)',
          type: 'object',
          fields: [
            { name: 'beforeImage', title: 'Imagem Antes (Before)', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'beforeLabel', title: 'Label Antes (PT)', type: 'string', initialValue: 'Antes / Legado' },
            { name: 'beforeLabel_en', title: 'Before Label (EN)', type: 'string', initialValue: 'Before / Legacy' },
            { name: 'afterImage', title: 'Imagem Depois (After)', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'afterLabel', title: 'Label Depois (PT)', type: 'string', initialValue: 'Depois / Redesign' },
            { name: 'afterLabel_en', title: 'After Label (EN)', type: 'string', initialValue: 'After / Redesign' },
            { name: 'caption', title: 'Legenda Explicativa (PT)', type: 'string' },
            { name: 'caption_en', title: 'Caption (EN)', type: 'string' },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'caption', media: 'afterImage' },
            prepare({ title, media }) {
              return {
                title: title || 'Comparação Antes / Depois',
                subtitle: 'Before & After Block',
                media,
              };
            },
          },
        },

        // Bloco 14: Process Steps
        {
          name: 'processSteps',
          title: 'Etapas de Processo (Process Steps)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título da Seção de Processo (PT)', type: 'string', initialValue: 'Processo & Engenharia de Design' },
            { name: 'title_en', title: 'Section Title (EN)', type: 'string', initialValue: 'Process & Design Engineering' },
            {
              name: 'steps',
              title: 'Etapas Cronológicas',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'index', title: 'Número da Etapa (ex: 01)', type: 'string' },
                    { name: 'title', title: 'Título da Etapa (PT)', type: 'string' },
                    { name: 'title_en', title: 'Step Title (EN)', type: 'string' },
                    { name: 'description', title: 'Descrição Técnica (PT)', type: 'text', rows: 3 },
                    { name: 'description_en', title: 'Technical Description (EN)', type: 'text', rows: 3 },
                    { name: 'media', title: 'Mídia / Artefato da Etapa (Opcional)', type: 'image', options: { hotspot: true } },
                  ],
                },
              ],
            },
            {
              name: 'theme',
              title: 'Tema do Bloco',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark (#10110F)', value: 'dark' },
                  { title: 'Light (#FAFAF7)', value: 'light' },
                ],
              },
              initialValue: 'dark',
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return {
                title: title || 'Etapas de Processo',
                subtitle: 'Process Steps Block',
              };
            },
          },
        },

        // Bloco 15: Artifact Showcase
        {
          name: 'artifactShowcase',
          title: 'Mostra de Artefatos de Design (Wireframes, Tokens, Fluxos)',
          type: 'object',
          fields: [
            {
              name: 'artifactType',
              title: 'Tipo de Artefato',
              type: 'string',
              options: {
                list: [
                  { title: 'Design System & Tokens', value: 'designSystem' },
                  { title: 'Arquitetura & Fluxos de Informação', value: 'architecture' },
                  { title: 'Wireframes & Estrutura', value: 'wireframes' },
                  { title: 'Documentação Técnica & Handoff', value: 'documentation' },
                  { title: 'Diagramas de Decisão', value: 'diagrams' },
                ],
              },
              initialValue: 'designSystem',
            },
            { name: 'title', title: 'Título do Artefato (PT)', type: 'string' },
            { name: 'title_en', title: 'Artifact Title (EN)', type: 'string' },
            { name: 'description', title: 'Descrição Técnica & Contexto (PT)', type: 'text', rows: 3 },
            { name: 'description_en', title: 'Technical Context (EN)', type: 'text', rows: 3 },
            { name: 'media', title: 'Imagem / Visualização do Artefato', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'caption', title: 'Legenda Técnica (PT)', type: 'string' },
            { name: 'caption_en', title: 'Technical Caption (EN)', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'artifactType', media: 'media' },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Mostra de Artefatos',
                subtitle: `Artefato: ${subtitle || 'Design'}`,
                media,
              };
            },
          },
        },

        // Bloco 16: Quote Block
        {
          name: 'quoteBlock',
          title: 'Depoimento Real ou Citação de Stakeholder',
          type: 'object',
          fields: [
            { name: 'quote', title: 'Depoimento / Citação (PT)', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
            { name: 'quote_en', title: 'Quote (EN)', type: 'text', rows: 3 },
            { name: 'author', title: 'Nome do Autor', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'role', title: 'Cargo / Função', type: 'string' },
            { name: 'organization', title: 'Organização / Instituição', type: 'string' },
          ],
          preview: {
            select: { title: 'author', subtitle: 'quote' },
            prepare({ title, subtitle }) {
              return {
                title: `Depoimento: ${title || 'Autor'}`,
                subtitle: subtitle || 'Citação',
              };
            },
          },
        },

        // Bloco 17: Impact Block
        {
          name: 'impactBlock',
          title: 'Bloco de Impacto & Evidências Verificáveis',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título da Seção de Impacto (PT)', type: 'string', initialValue: 'Impacto & Resultados Reais' },
            { name: 'title_en', title: 'Section Title (EN)', type: 'string', initialValue: 'Impact & Verifiable Outcomes' },
            {
              name: 'items',
              title: 'Itens de Evidência',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'value', title: 'Valor / Indicador (Opcional, se real)', type: 'string' },
                    { name: 'label', title: 'Título da Evidência (PT)', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'label_en', title: 'Evidence Label (EN)', type: 'string' },
                    { name: 'description', title: 'Descrição Qualitativa / Verificação (PT)', type: 'text', rows: 2 },
                    { name: 'description_en', title: 'Description (EN)', type: 'text', rows: 2 },
                    {
                      name: 'evidenceType',
                      title: 'Tipo de Evidência',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Qualitativo (Consistência / Governança)', value: 'qualitative' },
                          { title: 'Técnico (Handoff / Redução de Retrabalho)', value: 'technical' },
                          { title: 'Institucional (Validação / Adoção)', value: 'institutional' },
                        ],
                      },
                      initialValue: 'qualitative',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return {
                title: title || 'Bloco de Impacto',
                subtitle: 'Impact Block',
              };
            },
          },
        },
      ],
    },

    // ============================================================
    // 5. GRUPO: PUBLICAÇÃO & PRÓXIMO CASE
    // ============================================================
    {
      name: 'published',
      title: 'Publicado no Portfólio',
      type: 'boolean',
      group: 'publishing',
      initialValue: true,
      description: 'Se desmarcado, o case é considerado rascunho e não aparecerá nas rotas públicas.',
    },
    {
      name: 'featured',
      title: 'Destaque na Página Inicial (Legado)',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
    },
    {
      name: 'featuredOnHome',
      title: 'Exibir nos Projetos Selecionados da Landing',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      description: 'Marque para incluir este projeto entre as 3 cases da cena de transição vertical da Home.',
    },
    {
      name: 'featuredOrder',
      title: 'Ordem de Destaque na Home (1, 2 ou 3)',
      type: 'number',
      group: 'publishing',
      description: 'Define a sequência de revelação no scroll da Home (ex: 1 para o 1º case, 2 para o 2º, etc.).',
    },
    {
      name: 'showInAbout',
      title: 'Exibir em "Além da Interface" no Sobre Mim',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      description: 'Marque para exibir este case entre os projetos de Identidade Visual / Além da Interface na página Sobre Mim (máximo 3).',
    },
    {
      name: 'aboutOrder',
      title: 'Ordem de Exibição no Sobre Mim (1, 2 ou 3)',
      type: 'number',
      group: 'publishing',
      description: 'Define a ordem do card na seção Além da Interface em Sobre Mim.',
    },
    {
      name: 'orderRank',
      title: 'Ordem de Exibição Geral (Opcional)',
      type: 'number',
      group: 'publishing',
    },
    {
      name: 'nextCase',
      title: 'Próximo Case Recomendado (Opcional)',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'publishing',
      description: 'Se vazio, o sistema selecionará automaticamente o próximo projeto publicado.',
    },
    {
      name: 'nextProjectFallbackAction',
      title: 'Ação para o Último Projeto no "Continue Explorando"',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          { title: 'Voltar ao Primeiro Projeto (Loop Contínuo)', value: 'firstProject' },
          { title: 'Ir para a Página de Projetos (/work)', value: 'work' },
          { title: 'Ir para a Página Sobre Mim (/about)', value: 'about' },
          { title: 'Ir para Contato / Fale Comigo (/contact)', value: 'contact' },
        ],
      },
      initialValue: 'firstProject',
      description: 'Define para onde o usuário é direcionado caso este seja o último case do portfólio.',
    },
    {
      name: 'testimonial',
      title: 'Depoimento Real Associado (Opcional)',
      type: 'object',
      group: 'publishing',
      fields: [
        { name: 'quote_pt', title: 'Depoimento (PT)', type: 'text', rows: 3 },
        { name: 'quote_en', title: 'Quote (EN)', type: 'text', rows: 3 },
        { name: 'author', title: 'Nome do Autor', type: 'string' },
        { name: 'role', title: 'Cargo', type: 'string' },
        { name: 'organization', title: 'Organização', type: 'string' },
        { name: 'published', title: 'Publicar este depoimento', type: 'boolean', initialValue: false },
      ],
    },

    // ============================================================
    // 6. GRUPO: SEO & SOCIAL SHARE
    // ============================================================
    {
      name: 'seo',
      title: 'Configurações de SEO & Compartilhamento',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Título SEO (PT)', type: 'string' },
        { name: 'metaTitle_en', title: 'SEO Title (EN)', type: 'string' },
        { name: 'metaDescription', title: 'Descrição SEO (PT)', type: 'text', rows: 2 },
        { name: 'metaDescription_en', title: 'SEO Description (EN)', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'Imagem de Compartilhamento (Open Graph)', type: 'image', options: { hotspot: true } },
        { name: 'noIndex', title: 'Bloquear Indexação (noindex)', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientOrContext',
      media: 'coverImage',
      projectType: 'projectType',
      published: 'published',
    },
    prepare({ title, subtitle, media, projectType, published }) {
      const typeMap = {
        professionalProject: '🏢 Profissional',
        clientProject: '💼 Cliente',
        independentStudy: '🔬 Estudo Independente',
      };
      const statusIcon = published === false ? '⛔ [Rascunho]' : '✅ [Publicado]';
      return {
        title: `${statusIcon} ${title || 'Sem título'}`,
        subtitle: `${typeMap[projectType] || 'Projeto'} · ${subtitle || 'Sem contexto'}`,
        media,
      };
    },
  },
};
