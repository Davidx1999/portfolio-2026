export default {
  name: 'localizedText',
  title: 'Texto Longo Localizado',
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
      type: 'text',
      rows: 3,
    },
    {
      name: 'ptBR',
      title: 'Português (Brasil)',
      type: 'text',
      rows: 3,
      fieldset: 'ptFieldset',
      description: 'Tradução para português. Se deixado em branco, o site exibirá a versão em inglês como fallback.',
    },
  ],
};
