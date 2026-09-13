export default {
  name: 'toolsGrid',
  title: 'Grid de Ferramentas & Fontes de Dados',
  type: 'object',
  description: 'Apresentação compacta e textual de ferramentas, bibliotecas, fontes de dados e controle de versão.',
  fields: [
    {
      name: 'eyebrow',
      title: 'Sobretítulo / Eyebrow (Opcional)',
      type: 'localizedString',
      initialValue: { en: 'STACK // DATA & TOOLING', ptBR: 'STACK // DADOS E FERRAMENTAS' },
    },
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'localizedString',
      initialValue: { en: 'Tools & Data Architecture', ptBR: 'Ferramentas e Arquitetura de Dados' },
      validation: (Rule) => Rule.required().error('O título da seção é obrigatório.'),
    },
    {
      name: 'intro',
      title: 'Parágrafo Introdutório (Opcional)',
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
    {
      name: 'items',
      title: 'Itens de Ferramentas & Dados',
      type: 'array',
      description: 'Adicione ferramentas, bibliotecas, fontes de dados ou controle de versão utilizados no projeto.',
      of: [
        {
          name: 'toolItem',
          title: 'Ferramenta ou Fonte de Dados',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome da Ferramenta / Fonte',
              type: 'string',
              description: 'Ex: NASA Exoplanet Archive, D3.js, Figma, GitHub',
              validation: (Rule) => Rule.required().error('O nome da ferramenta ou fonte é obrigatório.'),
            },
            {
              name: 'category',
              title: 'Categoria Bilíngue',
              type: 'localizedString',
              description: 'Ex: Data Source / Fonte de Dados, Visualization Library / Biblioteca de Visualização, Version Control / Controle de Versão',
              validation: (Rule) => Rule.required().error('A categoria é obrigatória.'),
            },
            {
              name: 'description',
              title: 'Breve Descrição do Uso no Projeto',
              type: 'localizedText',
              description: 'Ex: Extração e normalização do catálogo de exoplanetas confirmados.',
              validation: (Rule) => Rule.required().error('A descrição é obrigatória.'),
            },
            {
              name: 'url',
              title: 'Link Oficial / Repositório / Documentação (Opcional)',
              type: 'url',
              description: 'URL completa iniciando com http:// ou https://',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                  allowRelative: false,
                }),
            },
          ],
          preview: {
            select: {
              name: 'name',
              category: 'category.en',
              categoryPt: 'category.ptBR',
              desc: 'description.en',
            },
            prepare({ name, category, categoryPt, desc }) {
              const cat = category || categoryPt || 'Item';
              return {
                title: name || 'Ferramenta / Fonte',
                subtitle: `[${cat}] ${desc ? `${desc.substring(0, 45)}...` : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma ferramenta ou fonte de dados.'),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      items: 'items',
    },
    prepare({ title, items = [] }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: `Ferramentas & Fontes de Dados · ${title || `${count} itens`}`,
        subtitle: `${count} item(ns) cadastrado(s)`,
      };
    },
  },
};
