export default {
  name: 'playgroundProject',
  title: 'Experimento Playground',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Idioma (Language)',
      type: 'string',
      readOnly: true,
      hidden: false,
    },
    {
      name: 'id',
      title: 'ID / Slug (ex: kinetic-study, type-explorations)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria (ex: MOTION, TYPE, POSTERS)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'year',
      title: 'Ano',
      type: 'string',
      initialValue: '2024',
    },
    {
      name: 'challenge',
      title: 'O Desafio (The Challenge)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'solution',
      title: 'A Solução (The Solution)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'process',
      title: 'Passos do Processo',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Imagem (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
};
