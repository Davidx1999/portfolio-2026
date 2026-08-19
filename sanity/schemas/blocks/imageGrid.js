import BulkImageArrayInput from '../../components/BulkImageArrayInput';

export default {
  name: 'imageGrid',
  title: 'Grade de Imagens (2 ou 3 Colunas)',
  type: 'object',
  fields: [
    {
      name: 'columns',
      title: 'Colunas',
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
      name: 'items',
      title: 'Imagens da Grade',
      type: 'array',
      components: {
        input: BulkImageArrayInput,
      },
      of: [
        {
          name: 'gridImageItem',
          title: 'Imagem da Grade',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required().error('A imagem é obrigatória.'),
            },
            {
              name: 'caption',
              title: 'Legenda (Opcional)',
              type: 'localizedString',
            },
            {
              name: 'alt',
              title: 'Alt Text (Acessibilidade)',
              type: 'localizedString',
            },
          ],
          preview: {
            select: {
              caption: 'caption.en',
              alt: 'alt.en',
              media: 'image',
            },
            prepare({ caption, alt, media }) {
              return {
                title: caption || alt || 'Imagem da Grade',
                subtitle: alt ? '✓ Alt Text' : '⚠️ Sem Alt Text',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma imagem à grade.'),
    },
  ],
  preview: {
    select: {
      cols: 'columns',
      items: 'items',
    },
    prepare({ cols, items = [] }) {
      const count = Array.isArray(items) ? items.length : 0;
      const firstImg = items?.[0]?.image;
      return {
        title: `Grade de Imagens · ${count} imagens (${cols || 2} colunas)`,
        media: firstImg,
      };
    },
  },
};
