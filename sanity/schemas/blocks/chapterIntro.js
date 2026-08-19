export default {
  name: 'chapterIntro',
  title: 'Abertura de Capítulo',
  type: 'object',
  description: 'Abertura editorial de capítulo com numeração grande e tipografia de destaque.',
  fields: [
    {
      name: 'chapterNumber',
      title: 'Número do Capítulo (ex: "01", "02")',
      type: 'string',
      initialValue: '01',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo / Tag do Capítulo (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'title',
      title: 'Título Principal do Capítulo',
      type: 'localizedString',
      validation: (Rule) => Rule.required().error('O título do capítulo é obrigatório.'),
    },
    {
      name: 'summary',
      title: 'Resumo / Síntese do Capítulo (Opcional)',
      type: 'localizedText',
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
      num: 'chapterNumber',
      title: 'title.en',
      subtitle: 'subtitle.en',
    },
    prepare({ num, title, subtitle }) {
      return {
        title: `Capítulo ${num || '01'} · ${title || 'Abertura'}`,
        subtitle: subtitle || 'Abertura Editorial',
      };
    },
  },
};
