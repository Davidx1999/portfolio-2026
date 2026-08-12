export default {
  name: 'project',
  title: 'Projeto',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID / Slug (ex: mapear, aula-f75)',
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
      title: 'Categoria (ex: Web App, E-learning)',
      type: 'string',
    },
    {
      name: 'workType',
      title: 'Tipo de Trabalho',
      type: 'string',
      options: {
        list: [
          { title: 'Case Study', value: 'cases' },
          { title: 'Project', value: 'projects' },
          { title: 'Experiment', value: 'experiments' },
        ],
      },
      initialValue: 'cases',
    },
    {
      name: 'year',
      title: 'Ano',
      type: 'string',
      initialValue: '2024',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'description',
      title: 'Descrição Resumida',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageHover',
      title: 'Imagem de Hover (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Destaque?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'rating',
      title: 'Rating (ex: 4.9, 5.0)',
      type: 'string',
    },
    {
      name: 'badge',
      title: 'Badge (ex: Enterprise, Guest Favorite)',
      type: 'string',
    },
    {
      name: 'liveLink',
      title: 'Link ao Vivo (ex: https://...)',
      type: 'url',
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
      title: 'Passos do Processo / Engenharia',
      type: 'array',
      of: [{ type: 'string' }],
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
