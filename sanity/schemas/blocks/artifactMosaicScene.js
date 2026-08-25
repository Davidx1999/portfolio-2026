import BulkImageArrayInput from '../../components/BulkImageArrayInput';

export default {
  name: 'artifactMosaicScene',
  title: 'Galeria Expansiva (Mosaico de Artefatos)',
  type: 'object',
  description: 'Galeria cinemática de scroll contínuo com comportamento de crescimento e redução (zoom progressivo 0.08 a 1.0).',
  fields: [
    {
      name: 'aspectRatioPreset',
      title: 'Proporção / Formato do Mosaico',
      type: 'string',
      description: 'Escolha entre Tela Cheia (Full Bleed 100vw) ou Container Proporcional (1440px × 960px em proporção 3:2).',
      options: {
        list: [
          { title: 'Full Bleed (100vw · Tela Cheia)', value: 'fullBleed' },
          { title: '1440 × 960px (Container Proporcional 3:2)', value: '1440x960' },
        ],
        layout: 'radio',
      },
      initialValue: 'fullBleed',
    },
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
              title: 'Ponto de Origem do Zoom Diagonal (Quinas)',
              type: 'string',
              description: 'O zoom ocorre exclusivamente através de uma das 4 quinas diagonais.',
              options: {
                list: [
                  { title: 'Superior Esquerdo (Top-Left)', value: 'topLeft' },
                  { title: 'Superior Direito (Top-Right)', value: 'topRight' },
                  { title: 'Inferior Esquerdo (Bottom-Left)', value: 'bottomLeft' },
                  { title: 'Inferior Direito (Bottom-Right)', value: 'bottomRight' },
                ],
              },
              initialValue: 'topLeft',
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
