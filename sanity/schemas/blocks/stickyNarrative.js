export default {
  name: 'stickyNarrative',
  title: 'Narrativa Sticky em Duas Colunas',
  type: 'object',
  description: 'Coluna esquerda com título e contexto fixos (sticky) e coluna direita com tópicos e itens com check.',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
      initialValue: { en: '01 // OVERVIEW & CONTEXT', ptBR: '01 // VISÃO GERAL & CONTEXTO' },
    },
    {
      name: 'sectionTitle',
      title: 'Título Sticky da Seção',
      type: 'localizedString',
      validation: (Rule) => Rule.required().error('O título da seção é obrigatório.'),
    },
    {
      name: 'sectionSubtitle',
      title: 'Subtítulo / Contexto Lateral (Opcional)',
      type: 'localizedString',
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
      name: 'topics',
      title: 'Tópicos da Narrativa',
      type: 'array',
      of: [
        {
          name: 'stickyTopicItem',
          title: 'Tópico de Narrativa',
          type: 'object',
          fields: [
            {
              name: 'topicKey',
              title: 'Rótulo / Tag do Tópico (ex: "Contexto", "O Desafio Real")',
              type: 'localizedString',
            },
            {
              name: 'title',
              title: 'Título do Tópico (Opcional)',
              type: 'localizedString',
            },
            {
              name: 'content',
              title: 'Texto Explicativo',
              type: 'localizedText',
            },
            {
              name: 'bulletPoints',
              title: 'Lista de Pontos / Itens com Check (Opcional)',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
            {
              name: 'highlight',
              title: 'Destacar Tag com Cor de Acento',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              key: 'topicKey.en',
              title: 'title.en',
              content: 'content.en',
            },
            prepare({ key, title, content }) {
              return {
                title: key || title || 'Tópico de Narrativa',
                subtitle: content ? `${content.substring(0, 50)}...` : '',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos um tópico.'),
    },
  ],
  preview: {
    select: {
      title: 'sectionTitle.en',
      eyebrow: 'eyebrow.en',
      topics: 'topics',
    },
    prepare({ title, eyebrow, topics = [] }) {
      const count = Array.isArray(topics) ? topics.length : 0;
      return {
        title: `Narrativa Sticky · ${title || 'Sem Título'}`,
        subtitle: `${eyebrow ? `[${eyebrow}] ` : ''}${count} tópico(s)`,
      };
    },
  },
};
