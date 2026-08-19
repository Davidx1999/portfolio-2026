import BulkImageArrayInput from '../../components/BulkImageArrayInput';

export default {
  name: 'verticalMediaStack',
  title: 'Pilha Vertical de Mídias (GSAP Stack)',
  type: 'object',
  description: 'Pilha de cards com pinagem sticky e sobreposição progressiva via ScrollTrigger.',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'openingStatement',
      title: 'Declaração de Abertura (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'closingStatement',
      title: 'Declaração de Fechamento (Opcional)',
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
      name: 'items',
      title: 'Cards da Pilha Vertical',
      type: 'array',
      components: {
        input: BulkImageArrayInput,
      },
      of: [
        {
          name: 'stackCardItem',
          title: 'Card da Pilha',
          type: 'object',
          fields: [
            {
              name: 'media',
              title: 'Imagem do Card',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required().error('A imagem é obrigatória.'),
            },
            {
              name: 'caption',
              title: 'Título / Legenda do Card',
              type: 'localizedString',
            },
            {
              name: 'supportingText',
              title: 'Texto de Apoio (Opcional)',
              type: 'localizedString',
            },
          ],
          preview: {
            select: {
              caption: 'caption.en',
              supporting: 'supportingText.en',
              media: 'media',
            },
            prepare({ caption, supporting, media }) {
              return {
                title: caption || supporting || 'Card da Pilha',
                subtitle: supporting ? `${supporting.substring(0, 40)}...` : '',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos um card à pilha vertical.'),
    },
  ],
  preview: {
    select: {
      opening: 'openingStatement.en',
      items: 'items',
    },
    prepare({ opening, items = [] }) {
      const count = Array.isArray(items) ? items.length : 0;
      const firstImg = items?.[0]?.media;
      return {
        title: `Pilha Vertical · ${opening || `${count} cards`}`,
        subtitle: `Pinagem GSAP ScrollTrigger · ${count} cards`,
        media: firstImg,
      };
    },
  },
};
