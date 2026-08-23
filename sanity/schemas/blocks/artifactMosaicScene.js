import BulkImageArrayInput from '../../components/BulkImageArrayInput';

export default {
  name: 'artifactMosaicScene',
  title: 'Galeria Expansiva (Mosaico de Artefatos)',
  type: 'object',
  description: 'Galeria cinemática de scroll contínuo com comportamento de crescimento e redução (zoom progressivo 0.08 a 1.0).',
  fields: [
    {
      name: 'showBorder',
      title: 'Exibir Borda / Stroke nos Artefatos do Mosaico',
      type: 'boolean',
      description: 'Ativado por padrão. Desative para mídias que já possuem o fundo exato da página.',
      initialValue: true,
    },
    {
      name: 'items',
      title: 'Artefatos do Mosaico',
      type: 'array',
      components: {
        input: BulkImageArrayInput,
      },
      of: [
        {
          name: 'mosaicItem',
          title: 'Artefato do Mosaico',
          type: 'object',
          fields: [
            {
              name: 'media',
              title: 'Imagem do Artefato',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required().error('A imagem é obrigatória.'),
            },
            {
              name: 'caption',
              title: 'Legenda Técnica (Opcional)',
              type: 'localizedString',
            },
            {
              name: 'alt',
              title: 'Alt Text da Imagem',
              type: 'localizedString',
            },
            {
              name: 'row',
              title: 'Linha no Grid (1 a 11 - Opcional)',
              type: 'number',
              description: 'Se vazio, o slot padrão da sequência será utilizado.',
            },
            {
              name: 'column',
              title: 'Coluna no Grid (1 a 4 - Opcional)',
              type: 'number',
              description: 'Se vazio, o slot padrão da sequência será utilizado.',
            },
            {
              name: 'transformOrigin',
              title: 'Ponto de Origem do Zoom (Opcional)',
              type: 'string',
              options: {
                list: [
                  { title: 'Centro (Padrão)', value: 'center' },
                  { title: 'Superior Esquerdo', value: 'topLeft' },
                  { title: 'Superior Direito', value: 'topRight' },
                  { title: 'Inferior Esquerdo', value: 'bottomLeft' },
                  { title: 'Inferior Direito', value: 'bottomRight' },
                ],
              },
              initialValue: 'center',
            },
            {
              name: 'fitMode',
              title: 'Modo de Enquadramento',
              type: 'string',
              options: {
                list: [
                  { title: 'Cover (Preencher)', value: 'cover' },
                  { title: 'Contain (Conter com padding)', value: 'contain' },
                ],
                layout: 'radio',
              },
              initialValue: 'cover',
            },
          ],
          preview: {
            select: {
              captionEn: 'caption.en',
              captionPt: 'caption.ptBR',
              altEn: 'alt.en',
              media: 'media',
            },
            prepare({ captionEn, captionPt, altEn, media }) {
              return {
                title: captionEn || captionPt || altEn || 'Artefato do Mosaico',
                subtitle: altEn ? '✓ Alt Text' : '⚠️ Sem Alt Text',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos um item ao mosaico.'),
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items = [] }) {
      const count = Array.isArray(items) ? items.length : 0;
      const firstImg = items?.[0]?.media;
      return {
        title: `Galeria Expansiva · ${count} artefatos`,
        subtitle: 'Comportamento de crescimento e redução no scroll',
        media: firstImg,
      };
    },
  },
};
