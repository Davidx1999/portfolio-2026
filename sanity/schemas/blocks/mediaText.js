export default {
  name: 'mediaText',
  title: 'Texto + Imagem',
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
      validation: (Rule) => Rule.required().error('O título é obrigatório.'),
    },
    {
      name: 'body',
      title: 'Corpo do Texto',
      type: 'localizedText',
      validation: (Rule) => Rule.required().error('O corpo do texto é obrigatório.'),
    },
    {
      name: 'image',
      title: 'Imagem Lateral (Compartilhada)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A imagem é obrigatória.'),
    },
    {
      name: 'alt',
      title: 'Alt Text da Imagem',
      type: 'localizedString',
      description: 'Texto de acessibilidade descrevendo a imagem.',
    },
    {
      name: 'mediaPosition',
      title: 'Posição da Imagem',
      type: 'string',
      options: {
        list: [
          { title: 'Imagem à Esquerda / Texto à Direita', value: 'left' },
          { title: 'Texto à Esquerda / Imagem à Direita', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke no Container da Imagem',
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
      title: 'title.en',
      titlePt: 'title.ptBR',
      media: 'image',
      position: 'mediaPosition',
    },
    prepare({ title, titlePt, media, position }) {
      const displayTitle = title || titlePt || 'Texto + Imagem';
      const posLabel = position === 'right' ? 'Mídia à Direita' : 'Mídia à Esquerda';
      return {
        title: `Texto + Imagem · ${displayTitle}`,
        subtitle: `[${posLabel}] ${titlePt ? '✓ PT-BR' : '⏳ Apenas EN'}`,
        media,
      };
    },
  },
};
