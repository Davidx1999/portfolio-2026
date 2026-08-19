export default {
  name: 'fullMedia',
  title: 'Mídia Única (Largura Total)',
  type: 'object',
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
      title: 'Imagem Principal',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType === 'video',
    },
    {
      name: 'videoUrl',
      title: 'URL do Vídeo (MP4 / WebM / CDN)',
      type: 'url',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
    {
      name: 'poster',
      title: 'Poster do Vídeo (Opcional)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
    {
      name: 'caption',
      title: 'Legenda Técnica (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'alt',
      title: 'Alt Text da Imagem',
      type: 'localizedString',
    },
    {
      name: 'aspectRatio',
      title: 'Proporção da Mídia',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Padrão)', value: '16/9' },
          { title: '16:10', value: '16/10' },
          { title: '21:9 (Ultrawide)', value: '21/9' },
          { title: 'Auto (Original)', value: 'auto' },
        ],
      },
      initialValue: '16/9',
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
      media: 'image',
      mediaType: 'mediaType',
    },
    prepare({ caption, media, mediaType }) {
      return {
        title: `Mídia Única · ${caption || (mediaType === 'video' ? 'Vídeo' : 'Imagem')}`,
        subtitle: `[${mediaType === 'video' ? 'Vídeo' : 'Imagem'}]`,
        media,
      };
    },
  },
};
