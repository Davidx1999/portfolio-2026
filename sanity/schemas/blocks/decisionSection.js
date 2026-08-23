export default {
  name: 'decisionSection',
  title: 'Decisões Críticas de Design (Trade-offs)',
  type: 'object',
  description: 'Documentação de fricções identificadas, decisões de UX/UI/Arquitetura adotadas, justificativas e artefatos visuais.',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
      initialValue: { en: 'DESIGN DECISIONS // ARCHITECTURE', ptBR: 'DECISÕES DE DESIGN // ARQUITETURA' },
    },
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
      initialValue: { en: 'Critical Design Decisions & Trade-Offs', ptBR: 'Decisões Críticas de Design & Trade-Offs' },
    },
    {
      name: 'intro',
      title: 'Parágrafo Introdutório (Opcional)',
      type: 'localizedText',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke nos Artefatos de Decisão',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para mídias que já possuem o fundo exato da página (preserva o border-radius).',
      initialValue: true,
    },
    {
      name: 'theme',
      title: 'Tema Visual',
      type: 'string',
      options: {
        list: [
          { title: 'Escuro (Padrão)', value: 'dark' },
          { title: 'Claro (Light)', value: 'light' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    },
    {
      name: 'decisions',
      title: 'Decisões de Design',
      type: 'array',
      of: [
        {
          name: 'decisionItem',
          title: 'Decisão de Design',
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Número / Índice (ex: "01")',
              type: 'string',
            },
            {
              name: 'challenge',
              title: 'Fricção / Desafio Identificado',
              type: 'localizedString',
              validation: (Rule) => Rule.required().error('O desafio/fricção é obrigatório.'),
            },
            {
              name: 'decision',
              title: 'Decisão Adotada',
              type: 'localizedText',
              validation: (Rule) => Rule.required().error('A decisão adotada é obrigatória.'),
            },
            {
              name: 'rationale',
              title: 'Justificativa & Impacto Sistêmico',
              type: 'localizedText',
            },
            {
              name: 'artifactMedia',
              title: 'Artefato / Imagem Ilustrativa (Opcional)',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'artifactCaption',
              title: 'Legenda do Artefato (Opcional)',
              type: 'localizedString',
            },
          ],
          preview: {
            select: {
              num: 'number',
              challenge: 'challenge.en',
              decision: 'decision.en',
              media: 'artifactMedia',
            },
            prepare({ num, challenge, decision, media }) {
              return {
                title: `${num ? `#${num} ` : ''}${challenge || decision || 'Decisão'}`,
                subtitle: decision ? `${decision.substring(0, 50)}...` : '',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma decisão de design.'),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      decisions: 'decisions',
    },
    prepare({ title, decisions = [] }) {
      const count = Array.isArray(decisions) ? decisions.length : 0;
      return {
        title: `Decisões de Design · ${title || `${count} decisões`}`,
        subtitle: `${count} decisão(ões) documentada(s)`,
      };
    },
  },
};
