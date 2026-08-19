export default {
  name: 'localizedPortableText',
  title: 'Texto Rico Localizado (Portable Text)',
  type: 'object',
  fieldsets: [
    {
      name: 'ptFieldset',
      title: '🇧🇷 Tradução para Português (Revisável)',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'en',
      title: 'English (Original / Fonte Principal)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'ptBR',
      title: 'Português (Brasil)',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'ptFieldset',
      description: 'Tradução para português. Se deixado em branco, o site exibirá a versão em inglês.',
    },
  ],
};
