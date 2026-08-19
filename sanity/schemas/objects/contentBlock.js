export default {
  name: 'contentBlock',
  title: 'Bloco Modular de Conteúdo',
  type: 'object',
  fields: [
    {
      name: 'blockType',
      title: 'Tipo de Bloco / Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Narrativa Editorial com Mídia (Narrative & Media)', value: 'narrativeMedia' },
          { title: 'Destaque em Tela Cheia (Full-bleed Showcase)', value: 'fullBleedMedia' },
          { title: 'Decisões Críticas de Design (Design Decisions & Trade-offs)', value: 'designDecisions' },
          { title: 'Arquitetura e Fluxos (System Architecture & Flows)', value: 'architectureFlows' },
          { title: 'Antes vs Depois / Comparação (Before & After)', value: 'beforeAfter' },
          { title: 'Métricas e Resultados (Outcomes & Impact)', value: 'outcomesImpact' },
          { title: 'Citação Editorial / Depoimento (Editorial Quote)', value: 'quote' },
        ],
      },
      initialValue: 'narrativeMedia',
    },
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Tag da Seção (Eyebrow)',
      type: 'localizedString',
      description: 'Ex: "01 // ANÁLISE DE FLUXO"',
    },
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo / Lead da Seção',
      type: 'localizedString',
    },
    {
      name: 'body',
      title: 'Corpo do Texto / Narrativa',
      type: 'localizedText',
    },
    {
      name: 'image',
      title: 'Imagem do Bloco (Compartilhada)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'caption',
      title: 'Legenda da Mídia',
      type: 'localizedString',
    },
    {
      name: 'alt',
      title: 'Alt Text da Imagem',
      type: 'localizedString',
    },
    {
      name: 'secondaryImage',
      title: 'Segunda Imagem (Opcional - para comparações e grids)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => !['beforeAfter', 'architectureFlows', 'narrativeMedia'].includes(parent?.blockType),
    },
    {
      name: 'secondaryCaption',
      title: 'Legenda da Segunda Imagem',
      type: 'localizedString',
      hidden: ({ parent }) => !parent?.secondaryImage,
    },
    {
      name: 'topics',
      title: 'Tópicos / Pontos Chave',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título do Ponto', type: 'localizedString' },
            { name: 'content', title: 'Descrição / Conteúdo', type: 'localizedText' },
          ],
          preview: {
            select: {
              title: 'title.en',
              subtitle: 'title.ptBR',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || subtitle || 'Tópico',
                subtitle: subtitle ? `🇧🇷 ${subtitle}` : 'Sem tradução PT',
              };
            },
          },
        },
      ],
    },
    {
      name: 'decisions',
      title: 'Decisões Críticas de Design (Trade-offs)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'challenge', title: 'Desafio / Tensão Encontrada', type: 'localizedString' },
            { name: 'decision', title: 'Decisão Tomada & Porquê', type: 'localizedText' },
            { name: 'impact', title: 'Impacto da Decisão', type: 'localizedString' },
          ],
          preview: {
            select: {
              title: 'challenge.en',
              subtitle: 'decision.en',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Decisão de Design',
                subtitle: subtitle || '',
              };
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.blockType !== 'designDecisions',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      ptTitle: 'title.ptBR',
      blockType: 'blockType',
      media: 'image',
    },
    prepare({ title, ptTitle, blockType, media }) {
      return {
        title: title || ptTitle || 'Bloco Modular',
        subtitle: `[${blockType || 'narrative'}] ${ptTitle ? '✓ PT' : '⏳ apenas EN'}`,
        media,
      };
    },
  },
};
