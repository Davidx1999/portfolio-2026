export default {
  name: 'mainVisualMedia',
  title: 'Visual Principal do Projeto',
  type: 'object',
  description: 'Mídia principal compartilhada entre todos os idiomas. Exibida no card da página Work, no Featured Work da Landing, como fallback automático da Hero e imagem OpenGraph.',
  fields: [
    {
      name: 'image',
      title: 'Imagem Principal (Obrigatória)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A imagem principal do projeto é obrigatória.'),
      description: 'Imagem de alta resolução (mínimo 1920x1080px) com ponto focal.',
    },
    {
      name: 'videoUrl',
      title: 'Vídeo de Apresentação (Opcional - MP4 / WebM / CDN)',
      type: 'url',
      description: 'Opcional. URL de vídeo para reprodução contínua ou prévia dinâmica.',
    },
    {
      name: 'videoPoster',
      title: 'Poster do Vídeo (Opcional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Opcional. Caso não seja fornecido, a Imagem Principal acima será usada como poster automaticamente.',
    },
    {
      name: 'alt',
      title: 'Texto Alternativo de Acessibilidade (Alt Text)',
      type: 'localizedString',
      description: 'Descreva visualmente o conteúdo para leitores de tela e acessibilidade.',
    },
  ],
};
