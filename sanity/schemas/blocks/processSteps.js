export default {
  name: 'processSteps',
  title: 'Etapas do Processo',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
      initialValue: { en: 'Process & Engineering', ptBR: 'Processo & Engenharia' },
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke nas Miniaturas das Etapas',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para imagens que já possuem o fundo exato da página.',
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
      name: 'steps',
      title: 'Etapas Sequenciais',
      type: 'array',
      of: [
        {
          name: 'stepItem',
          title: 'Etapa',
          type: 'object',
          fields: [
            {
              name: 'index',
              title: 'Número / Tag da Etapa (ex: "01", "02")',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Título da Etapa',
              type: 'localizedString',
              validation: (Rule) => Rule.required().error('O título da etapa é obrigatório.'),
            },
            {
              name: 'description',
              title: 'Descrição da Etapa',
              type: 'localizedText',
              validation: (Rule) => Rule.required().error('A descrição da etapa é obrigatória.'),
            },
            {
              name: 'media',
              title: 'Mídia / Miniatura Ilustrativa (Opcional)',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              idx: 'index',
              title: 'title.en',
              media: 'media',
            },
            prepare({ idx, title, media }) {
              return {
                title: `${idx ? `${idx} // ` : ''}${title || 'Etapa'}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma etapa.'),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      steps: 'steps',
    },
    prepare({ title, steps = [] }) {
      const count = Array.isArray(steps) ? steps.length : 0;
      return {
        title: `Etapas do Processo · ${title || `${count} etapas`}`,
        subtitle: `${count} etapa(s) configurada(s)`,
      };
    },
  },
};
