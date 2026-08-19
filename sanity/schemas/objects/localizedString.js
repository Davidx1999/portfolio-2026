export default {
  name: 'localizedString',
  title: 'Texto Curto Localizado',
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
      type: 'string',
      validation: (Rule) => Rule.custom((val, context) => {
        // Se o campo pai for obrigatório no schema, pode validar
        return true;
      }),
    },
    {
      name: 'ptBR',
      title: 'Português (Brasil)',
      type: 'string',
      fieldset: 'ptFieldset',
      description: 'Tradução para português. Se deixado em branco, o site exibirá a versão em inglês como fallback.',
    },
  ],
};
