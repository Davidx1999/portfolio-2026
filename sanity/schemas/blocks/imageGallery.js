import BulkImageArrayInput from '../../components/BulkImageArrayInput';

export default {
  name: 'imageGallery',
  title: 'Galeria Centralizada',
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'title',
      title: 'Título da Galeria (Opcional)',
      type: 'localizedString',
    },
    {
      name: 'columns',
      title: 'Número de Colunas',
      type: 'string',
      options: {
        list: [
          { title: '2 Colunas', value: '2' },
          { title: '3 Colunas', value: '3' },
          { title: '4 Colunas', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '2',
    },
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke nas Imagens',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para mídias que já possuem o fundo exato da página (preserva o border-radius).',
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
    {
      name: 'images',
      title: 'Imagens da Galeria',
      type: 'array',
      components: {
        input: BulkImageArrayInput,
      },
      of: [
        {
          name: 'galleryImageItem',
          title: 'Item da Galeria',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required().error('A imagem é obrigatória.'),
            },
            {
              name: 'caption',
              title: 'Legenda (Opcional)',
              type: 'localizedString',
            },
            {
              name: 'alt',
              title: 'Alt Text (Acessibilidade)',
              type: 'localizedString',
            },
            {
              name: 'aspectRatio',
              title: 'Proporção da Imagem',
              type: 'string',
              options: {
                list: [
                  { title: '16:10 (Padrão)', value: '16/10' },
                  { title: '16:9 (Widescreen)', value: '16/9' },
                  { title: '4:3 (Clássico)', value: '4/3' },
                  { title: '1:1 (Quadrado)', value: '1/1' },
                  { title: 'Auto (Original)', value: 'auto' },
                ],
              },
              initialValue: '16/10',
            },
          ],
          preview: {
            select: {
              captionEn: 'caption.en',
              captionPt: 'caption.ptBR',
              altEn: 'alt.en',
              media: 'image',
            },
            prepare({ captionEn, captionPt, altEn, media }) {
              const display = captionEn || captionPt || altEn || 'Imagem';
              const missingAlt = !altEn;
              return {
                title: display,
                subtitle: missingAlt ? '⚠️ Sem Alt Text' : '✓ Acessibilidade OK',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma imagem à galeria.'),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      images: 'images',
    },
    prepare({ title, images = [] }) {
      const count = Array.isArray(images) ? images.length : 0;
      const firstImage = images?.[0]?.image;
      return {
        title: `Galeria Centralizada · ${title || `${count} imagens`}`,
        subtitle: `${count} imagem(ns) cadastrada(s)`,
        media: firstImage,
      };
    },
  },
};
