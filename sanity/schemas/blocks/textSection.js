export default {
  name: 'textSection',
  title: 'Bloco de Texto',
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
      description: 'Ex: "01 // CONTEXTO & DESAFIO"',
    },
    {
      name: 'title',
      title: 'Título da Seção (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'body',
      title: 'Corpo do Texto (Narrativa)',
      type: 'localizedText',
      validation: (Rule) => Rule.required().error('O corpo do texto é obrigatório.'),
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
      title: 'title.en',
      titlePt: 'title.ptBR',
      body: 'body.en',
      bodyPt: 'body.ptBR',
      eyebrow: 'eyebrow.en',
    },
    prepare({ title, titlePt, body, bodyPt, eyebrow }) {
      const displayTitle = title || titlePt || (body ? body.substring(0, 60) + '...' : 'Bloco de Texto');
      const hasPt = !!(titlePt || bodyPt);
      return {
        title: `Bloco de Texto · ${displayTitle}`,
        subtitle: `${eyebrow ? `[${eyebrow}] ` : ''}${hasPt ? '✓ PT-BR' : '⏳ Apenas EN'}`,
      };
    },
  },
};
