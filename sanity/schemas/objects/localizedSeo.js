export default {
  name: 'localizedSeo',
  title: 'SEO & Social Share',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Meta Título (SEO Title)',
      type: 'localizedString',
      description: 'Opcional. Se vazio, o título público do case será utilizado automaticamente.',
    },
    {
      name: 'description',
      title: 'Meta Descrição (SEO Description)',
      type: 'localizedText',
      description: 'Opcional. Se vazio, a descrição curta do projeto será utilizada.',
    },
    {
      name: 'shareImage',
      title: 'Imagem Social de Compartilhamento (OpenGraph / Twitter)',
      type: 'image',
      options: { hotspot: true },
      description: 'Opcional (1200x630px). Se não informada, a imagem principal do projeto será utilizada automaticamente.',
    },
  ],
};
