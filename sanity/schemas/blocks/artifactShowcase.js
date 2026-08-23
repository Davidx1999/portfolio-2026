export default {
  name: 'artifactShowcase',
  title: 'Vitrine de Artefato de Design',
  type: 'object',
  fields: [
    {
      name: 'artifactType',
      title: 'Tipo de Artefato',
      type: 'string',
      options: {
        list: [
          { title: 'Design System / Tokens', value: 'designSystem' },
          { title: 'Arquitetura de Informação / Fluxos', value: 'architecture' },
          { title: 'Wireframes / Estrutura', value: 'wireframes' },
          { title: 'Documentação / Handoff', value: 'documentation' },
          { title: 'Diagramas / Modelos', value: 'diagrams' },
        ],
      },
      initialValue: 'designSystem',
    },
    {
      name: 'title',
      title: 'Título do Artefato',
      type: 'localizedString',
      validation: (Rule) => Rule.required().error('O título do artefato é obrigatório.'),
    },
    {
      name: 'description',
      title: 'Descrição / Contextualização Técnica (Opcional)',
      type: 'localizedText',
    },
    {
      name: 'media',
      title: 'Imagem / Diagrama do Artefato',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A imagem do artefato é obrigatória.'),
    },
    {
      name: 'caption',
      title: 'Legenda Técnica (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke no Container do Artefato',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para mídias que já possuem o fundo exato da página (preserva o border-radius).',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      type: 'artifactType',
      media: 'media',
    },
    prepare({ title, type, media }) {
      return {
        title: `Artefato [${type || 'design'}] · ${title || 'Sem Título'}`,
        media,
      };
    },
  },
};
