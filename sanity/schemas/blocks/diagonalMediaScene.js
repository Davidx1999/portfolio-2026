export default {
  name: 'diagonalMediaScene',
  title: 'Cena Diagonal de Mídia',
  type: 'object',
  description: 'Mídia cinemática animada com trajetória diagonal e escala durante o scroll.',
  fields: [
    {
      name: 'media',
      title: 'Mídia Principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A mídia é obrigatória.'),
    },
    {
      name: 'caption',
      title: 'Legenda Técnica (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'directionPreset',
      title: 'Direção da Trajetória Diagonal',
      type: 'string',
      options: {
        list: [
          { title: 'Superior Esquerdo → Centro → Inferior Direito', value: 'topLeftToCenter' },
          { title: 'Superior Direito → Centro → Inferior Esquerdo', value: 'topRightToCenter' },
          { title: 'Inferior Esquerdo → Centro → Superior Direito', value: 'bottomLeftToCenter' },
          { title: 'Inferior Direito → Centro → Superior Esquerdo', value: 'bottomRightToCenter' },
        ],
      },
      initialValue: 'topLeftToCenter',
    },
    {
      name: 'showDestinationFrame',
      title: 'Exibir Moldura de Destino',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'frameColor',
      title: 'Cor da Moldura de Destino',
      type: 'string',
      options: {
        list: [
          { title: 'Lima (#C4FF00)', value: 'lime' },
          { title: 'Branco Translúcido', value: 'white' },
          { title: 'Escuro Translúcido', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'lime',
      hidden: ({ parent }) => !parent?.showDestinationFrame,
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
  ],
  preview: {
    select: {
      caption: 'caption.en',
      media: 'media',
      preset: 'directionPreset',
    },
    prepare({ caption, media, preset }) {
      return {
        title: `Cena Diagonal · ${caption || 'Sem Legenda'}`,
        subtitle: `Preset [${preset || 'topLeftToCenter'}]`,
        media,
      };
    },
  },
};
