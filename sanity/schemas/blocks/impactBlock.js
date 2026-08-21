export default {
  name: 'impactBlock',
  title: 'Métricas & Impacto Quantitativo',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
      initialValue: { en: 'Evidence & Measurable Impact', ptBR: 'Evidências & Impacto Mensurável' },
    },
    {
      name: 'items',
      title: 'Métricas de Impacto',
      type: 'array',
      of: [
        {
          name: 'metricItem',
          title: 'Métrica',
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Valor / Indicador (ex: "+40%", "4 anos", "0 retrabalho")',
              type: 'string',
              validation: (Rule) => Rule.required().error('O valor da métrica é obrigatório.'),
            },
            {
              name: 'label',
              title: 'Título da Métrica',
              type: 'localizedString',
              validation: (Rule) => Rule.required().error('O título da métrica é obrigatório.'),
            },
            {
              name: 'description',
              title: 'Descrição / Contexto da Métrica',
              type: 'localizedText',
            },
            {
              name: 'evidenceType',
              title: 'Tipo de Evidência (ex: "Qualitativo", "Quantitativo", "Operacional")',
              type: 'string',
              initialValue: 'Qualitativo',
            },
          ],
          preview: {
            select: {
              val: 'value',
              label: 'label.en',
            },
            prepare({ val, label }) {
              return {
                title: `${val || ''} | ${label || 'Métrica'}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma métrica.'),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      items: 'items',
    },
    prepare({ title, items = [] }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: `Métricas de Impacto · ${title || `${count} métricas`}`,
        subtitle: `${count} métrica(s) cadastrada(s)`,
      };
    },
  },
};
