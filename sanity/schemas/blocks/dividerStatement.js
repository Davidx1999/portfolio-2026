export default {
  name: 'dividerStatement',
  title: 'Frase de Destaque (Statement)',
  type: 'object',
  description: 'Declaração editorial ou frase de impacto entre seções.',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'statement',
      title: 'Declaração / Frase de Impacto',
      type: 'localizedText',
      validation: (Rule) => Rule.required().error('A frase de impacto é obrigatória.'),
    },
    {
      name: 'supportingText',
      title: 'Texto de Apoio / Racional (Opcional)',
      type: 'localizedText',
    },
    {
      name: 'alignment',
      title: 'Alinhamento do Texto',
      type: 'string',
      options: {
        list: [
          { title: 'Alinhado à Esquerda', value: 'left' },
          { title: 'Centralizado', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
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
      statement: 'statement.en',
      eyebrow: 'eyebrow.en',
    },
    prepare({ statement, eyebrow }) {
      return {
        title: `Frase de Destaque · “${statement ? `${statement.substring(0, 45)}...` : ''}”`,
        subtitle: eyebrow ? `[${eyebrow}]` : 'Statement editorial',
      };
    },
  },
};
