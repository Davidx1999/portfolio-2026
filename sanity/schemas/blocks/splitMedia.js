export default {
  name: 'splitMedia',
  title: 'Mídia Dupla (Split)',
  type: 'object',
  fields: [
    {
      name: 'mediaLeft',
      title: 'Mídia da Esquerda',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A mídia da esquerda é obrigatória.'),
    },
    {
      name: 'captionLeft',
      title: 'Legenda Esquerda (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'altLeft',
      title: 'Alt Text Esquerda',
      type: 'localizedString',
    },
    {
      name: 'mediaRight',
      title: 'Mídia da Direita',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A mídia da direita é obrigatória.'),
    },
    {
      name: 'captionRight',
      title: 'Legenda Direita (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'altRight',
      title: 'Alt Text Direita',
      type: 'localizedString',
    },
    {
      name: 'ratio',
      title: 'Proporção entre Colunas',
      type: 'string',
      options: {
        list: [
          { title: '50% / 50% (Equilibrado)', value: '50-50' },
          { title: '60% / 40% (Foco Esquerda)', value: '60-40' },
          { title: '40% / 60% (Foco Direita)', value: '40-60' },
        ],
        layout: 'radio',
      },
      initialValue: '50-50',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke nos Containers de Mídia',
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
  ],
  preview: {
    select: {
      captionLeft: 'captionLeft.en',
      captionRight: 'captionRight.en',
      media: 'mediaLeft',
      ratio: 'ratio',
    },
    prepare({ captionLeft, captionRight, media, ratio }) {
      return {
        title: `Mídia Dupla · ${captionLeft || captionRight || 'Duas Colunas'}`,
        subtitle: `Proporção [${ratio || '50-50'}]`,
        media,
      };
    },
  },
};
