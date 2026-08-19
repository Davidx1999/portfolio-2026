export default {
  name: 'outcomeSection',
  title: 'Resultados & Impacto Qualitativo',
  type: 'object',
  description: 'Apresentação de evidências qualitativas de impacto, escalabilidade e maturidade do produto.',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
      initialValue: { en: 'OUTCOMES // LEARNINGS', ptBR: 'RESULTADOS // APRENDIZADOS' },
    },
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
      initialValue: { en: 'Verifiable Impact & Systemic Consistency', ptBR: 'Impacto Real e Consistência Sistêmica' },
    },
    {
      name: 'intro',
      title: 'Parágrafo Introdutório (Opcional)',
      type: 'localizedText',
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
      name: 'outcomes',
      title: 'Itens de Resultado & Impacto',
      type: 'array',
      of: [
        {
          name: 'outcomeItem',
          title: 'Resultado / Aprendizado',
          type: 'object',
          fields: [
            {
              name: 'tag',
              title: 'Tag do Resultado (ex: "Qualidade & Escala", "Adoção", "Governança")',
              type: 'string',
              initialValue: 'Qualidade & Escala',
            },
            {
              name: 'title',
              title: 'Título do Resultado',
              type: 'localizedString',
              validation: (Rule) => Rule.required().error('O título do resultado é obrigatório.'),
            },
            {
              name: 'description',
              title: 'Descrição / Evidência',
              type: 'localizedText',
              validation: (Rule) => Rule.required().error('A descrição do resultado é obrigatória.'),
            },
          ],
          preview: {
            select: {
              tag: 'tag',
              title: 'title.en',
              desc: 'description.en',
            },
            prepare({ tag, title, desc }) {
              return {
                title: title || desc || 'Resultado',
                subtitle: `[${tag || 'Impacto'}] ${desc ? `${desc.substring(0, 40)}...` : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos um resultado.'),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      outcomes: 'outcomes',
    },
    prepare({ title, outcomes = [] }) {
      const count = Array.isArray(outcomes) ? outcomes.length : 0;
      return {
        title: `Resultados & Impacto · ${title || `${count} itens`}`,
        subtitle: `${count} resultado(s) cadastrado(s)`,
      };
    },
  },
};
