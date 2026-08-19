export default {
  name: 'videoBlock',
  title: 'Vídeo Inline',
  type: 'object',
  fields: [
    {
      name: 'externalVideo',
      title: 'URL do Vídeo (MP4 / WebM / CDN)',
      type: 'url',
    },
    {
      name: 'videoFile',
      title: 'Ou Arquivo de Vídeo Direto (Opcional)',
      type: 'file',
      options: { accept: 'video/*' },
    },
    {
      name: 'poster',
      title: 'Poster da Capa do Vídeo (Obrigatório)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('O poster do vídeo é obrigatório.'),
    },
    {
      name: 'caption',
      title: 'Legenda Técnica (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'aspectRatio',
      title: 'Proporção do Vídeo',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Padrão)', value: '16/9' },
          { title: '16:10', value: '16/10' },
          { title: '4:3', value: '4/3' },
        ],
      },
      initialValue: '16/9',
    },
    {
      name: 'autoplay',
      title: 'Reproduzir Automaticamente (Muted / Loop)',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      caption: 'caption.en',
      media: 'poster',
    },
    prepare({ caption, media }) {
      return {
        title: `Vídeo Inline · ${caption || 'Sem Legenda'}`,
        media,
      };
    },
  },
};
