export default {
  name: 'quoteBlock',
  title: 'Depoimento / Citação Editorial',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Texto da Citação / Depoimento',
      type: 'localizedText',
      validation: (Rule) => Rule.required().error('O texto da citação é obrigatório.'),
    },
    {
      name: 'author',
      title: 'Nome do Autor',
      type: 'string',
      validation: (Rule) => Rule.required().error('O nome do autor é obrigatório.'),
    },
    {
      name: 'role',
      title: 'Cargo / Função do Autor',
      type: 'string',
    },
    {
      name: 'organization',
      title: 'Empresa / Organização',
      type: 'string',
    },
  ],
  preview: {
    select: {
      quote: 'quote.en',
      author: 'author',
      org: 'organization',
    },
    prepare({ quote, author, org }) {
      return {
        title: `Depoimento · ${author || 'Autor'}`,
        subtitle: `“${quote ? `${quote.substring(0, 40)}...` : ''}” ${org ? `(${org})` : ''}`,
      };
    },
  },
};
