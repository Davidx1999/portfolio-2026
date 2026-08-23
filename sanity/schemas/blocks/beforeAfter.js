export default {
  name: 'beforeAfter',
  title: 'Antes vs Depois (Comparação)',
  type: 'object',
  fields: [
    {
      name: 'beforeImage',
      title: 'Imagem "Antes" (Estado Legado)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A imagem "Antes" é obrigatória.'),
    },
    {
      name: 'beforeLabel',
      title: 'Rótulo "Antes"',
      type: 'localizedString',
      initialValue: { en: 'Before', ptBR: 'Antes' },
    },
    {
      name: 'afterImage',
      title: 'Imagem "Depois" (Solução Refinada)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('A imagem "Depois" é obrigatória.'),
    },
    {
      name: 'afterLabel',
      title: 'Rótulo "Depois"',
      type: 'localizedString',
      initialValue: { en: 'After', ptBR: 'Depois' },
    },
    {
      name: 'caption',
      title: 'Legenda Técnica (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke nos Containers de Imagem',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para imagens que já possuem o fundo exato da página (preserva o border-radius).',
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
      before: 'beforeLabel.en',
      after: 'afterLabel.en',
      media: 'afterImage',
    },
    prepare({ before, after, media }) {
      return {
        title: `Antes vs Depois · ${before || 'Antes'} ↔ ${after || 'Depois'}`,
        subtitle: 'Comparação interativa (Slider / Lado a lado)',
        media,
      };
    },
  },
};
