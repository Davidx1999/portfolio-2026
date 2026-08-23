export default {
  name: 'laggedFullViewportMedia',
  title: 'Mídia Full Viewport (Parallax Lagged)',
  type: 'object',
  description: 'Mídia em tela cheia com efeito cinemático de parallax suave e headline de sobreposição.',
  fields: [
    {
      name: 'mediaType',
      title: 'Tipo de Mídia',
      type: 'string',
      options: {
        list: [
          { title: 'Imagem Estática', value: 'image' },
          { title: 'Vídeo MP4 / WebM', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    },
    {
      name: 'image',
      title: 'Imagem Full Viewport',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType === 'video',
    },
    {
      name: 'videoUrl',
      title: 'URL do Vídeo (MP4 / WebM)',
      type: 'url',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
    {
      name: 'poster',
      title: 'Poster do Vídeo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
    {
      name: 'headline',
      title: 'Headline de Sobreposição (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'caption',
      title: 'Legenda / Metadado Inferior',
      type: 'localizedString',
    },
    {
      name: 'lagPreset',
      title: 'Intensidade do Efeito Parallax',
      type: 'string',
      options: {
        list: [
          { title: 'Padrão (10vh)', value: 'default' },
          { title: 'Sutil (6vh)', value: 'subtle' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke Divisório de Seção',
      type: 'boolean',
      description: 'Ativado por padrão. Exibe o stroke sutil na borda inferior da cena.',
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
      headline: 'headline.en',
      caption: 'caption.en',
      media: 'image',
    },
    prepare({ headline, caption, media }) {
      return {
        title: `Full Viewport Scene · ${headline || caption || 'Sem Headline'}`,
        subtitle: 'Parallax spring suave no scroll',
        media,
      };
    },
  },
};
