export default {
  name: 'prototypeVideo',
  title: 'Vídeo de Protótipo (Interativo)',
  type: 'object',
  description: 'Vídeo otimizado de alta fidelidade com autoplay viewport, poster e micro-controles.',
  fields: [
    {
      name: 'title',
      title: 'Título da Demonstração (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'shortDescription',
      title: 'Descrição / Contexto do Protótipo (Opcional)',
      type: 'localizedText',
    },
    {
      name: 'videoUrl',
      title: 'URL do Vídeo (MP4 / WebM / CDN)',
      type: 'url',
      description: 'Insira a URL direta do vídeo para streaming ou CDN.',
    },
    {
      name: 'videoFile',
      title: 'Ou Arquivo de Vídeo Direto (Opcional)',
      type: 'file',
      options: { accept: 'video/*' },
    },
    {
      name: 'poster',
      title: 'Poster da Capa do Vídeo (Obrigatório para carregamento limpo)',
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
      title: 'Proporção do Player',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Padrão)', value: '16/9' },
          { title: '16:10', value: '16/10' },
          { title: '4:3', value: '4/3' },
          { title: '21:9 (Ultrawide)', value: '21/9' },
          { title: '9:16 (Mobile / Vertical)', value: '9/16' },
        ],
      },
      initialValue: '16/9',
    },
    {
      name: 'autoplay',
      title: 'Reprodução Automática ao Entrar na Viewport',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'loop',
      title: 'Repetir em Loop',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke no Container',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para vídeos que já possuem a cor exata do fundo para criar um visual invisível/sem borda (preserva o border-radius).',
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
      caption: 'caption.en',
      media: 'poster',
    },
    prepare({ title, caption, media }) {
      return {
        title: `Vídeo de Protótipo · ${title || caption || 'Demonstração'}`,
        subtitle: 'Player otimizado com viewport autoplay',
        media,
      };
    },
  },
};
