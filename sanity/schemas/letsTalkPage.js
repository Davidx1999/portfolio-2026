export default {
  name: 'letsTalkPage',
  title: 'Página Let’s Talk (Contato)',
  type: 'document',
  fields: [
    // 1. Hero Compacta
    {
      name: 'heroEyebrow',
      title: 'Hero Eyebrow (PT)',
      type: 'string',
      initialValue: 'NOVOS PROJETOS / CONSULTORIA',
    },
    {
      name: 'heroEyebrow_en',
      title: 'Hero Eyebrow (EN)',
      type: 'string',
      initialValue: 'NEW PROJECTS / CONSULTING',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title (PT)',
      type: 'text',
      rows: 2,
      initialValue: 'Tem uma ideia, um produto complexo ou uma presença digital para melhorar? Vamos conversar.',
    },
    {
      name: 'heroTitle_en',
      title: 'Hero Title (EN)',
      type: 'text',
      rows: 2,
      initialValue: 'Have an idea, a complex product, or a digital presence to elevate? Let’s talk.',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description (PT)',
      type: 'text',
      rows: 3,
      initialValue: 'Conte o que você precisa construir, organizar ou evoluir. Eu respondo com contexto, próximos passos e honestidade sobre o que realmente faz sentido.',
    },
    {
      name: 'heroDescription_en',
      title: 'Hero Description (EN)',
      type: 'text',
      rows: 3,
      initialValue: 'Tell me what you need to build, organize, or evolve. I’ll reply with context, next steps, and honest guidance on what truly makes sense.',
    },

    // 2. Painel de Disponibilidade & Foto
    {
      name: 'availabilityStatus',
      title: 'Status de Disponibilidade (Ativo)',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'availabilityText',
      title: 'Texto de Disponibilidade (PT)',
      type: 'string',
      initialValue: 'Aceitando novos projetos',
    },
    {
      name: 'availabilityText_en',
      title: 'Texto de Disponibilidade (EN)',
      type: 'string',
      initialValue: 'Accepting new projects',
    },
    {
      name: 'availabilitySubtext',
      title: 'Subtexto de Disponibilidade (PT)',
      type: 'string',
      initialValue: 'Projetos freelance, consultoria e colaboração com times de produto.',
    },
    {
      name: 'availabilitySubtext_en',
      title: 'Subtexto de Disponibilidade (EN)',
      type: 'string',
      initialValue: 'Freelance projects, consulting, and collaboration with product squads.',
    },
    {
      name: 'profileImage',
      title: 'Fotografia de Apoio',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'profileImageAlt',
      title: 'Alt Text da Foto (PT)',
      type: 'string',
      initialValue: 'David Salviano — Product Designer',
    },
    {
      name: 'profileImageAlt_en',
      title: 'Alt Text da Foto (EN)',
      type: 'string',
      initialValue: 'David Salviano — Product Designer',
    },
    {
      name: 'responseTime',
      title: 'Prazo Médio de Resposta (PT)',
      type: 'string',
      initialValue: 'Normalmente respondo em até 24–48 horas úteis.',
    },
    {
      name: 'responseTime_en',
      title: 'Prazo Médio de Resposta (EN)',
      type: 'string',
      initialValue: 'I usually reply within 24–48 business hours.',
    },

    // 3. Contatos Diretos
    {
      name: 'email',
      title: 'Email de Contato',
      type: 'string',
      initialValue: 'davidsalviano52@gmail.com',
    },
    {
      name: 'linkedIn',
      title: 'URL do LinkedIn',
      type: 'url',
      initialValue: 'https://www.linkedin.com/in/david-salviano-12b41b264/',
    },
    {
      name: 'whatsapp',
      title: 'Número do WhatsApp (Opcional - ex: +5585999999999)',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Handle do Instagram (Opcional - ex: @davidolix11)',
      type: 'string',
      initialValue: '@davidolix11',
    },

    // 4. Opções do Formulário Conversacional
    {
      name: 'servicesOptions',
      title: 'Opções de Serviços (PT)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Product Design',
        'UX/UI',
        'Design System',
        'Website ou Landing Page',
        'Identidade visual',
        'Outro',
      ],
    },
    {
      name: 'servicesOptions_en',
      title: 'Opções de Serviços (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Product Design',
        'UX/UI',
        'Design System',
        'Website or Landing Page',
        'Brand Identity',
        'Other',
      ],
    },
    {
      name: 'collaborationFormats',
      title: 'Formatos de Colaboração (PT)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Projeto fechado',
        'Consultoria',
        'Apoio recorrente',
        'Colaboração com time',
        'Ainda não sei',
      ],
    },
    {
      name: 'collaborationFormats_en',
      title: 'Formatos de Colaboração (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Fixed-scope project',
        'Consulting',
        'Ongoing retainer',
        'Team collaboration',
        'Not sure yet',
      ],
    },
    {
      name: 'timelineOptions',
      title: 'Opções de Prazo / Início (PT)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Assim que possível',
        'Neste mês',
        'Nos próximos 3 meses',
        'Ainda estou explorando',
      ],
    },
    {
      name: 'timelineOptions_en',
      title: 'Opções de Prazo / Início (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'As soon as possible',
        'This month',
        'Within 3 months',
        'Still exploring',
      ],
    },
    {
      name: 'budgetRanges',
      title: 'Faixas de Investimento (PT)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Até R$ 5.000',
        'R$ 5.000 — R$ 10.000',
        'R$ 10.000 — R$ 25.000',
        'R$ 25.000+',
        'Prefiro conversar primeiro',
        'Ainda não defini',
      ],
    },
    {
      name: 'budgetRanges_en',
      title: 'Faixas de Investimento (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Under $1,500',
        '$1,500 — $3,000',
        '$3,000 — $6,000',
        '$6,000+',
        'Let’s discuss first',
        'Not defined yet',
      ],
    },

    // 5. Textos de Ação e Confirmação
    {
      name: 'ctaText',
      title: 'Texto do CTA (PT)',
      type: 'string',
      initialValue: 'ENVIAR PROJETO ↗',
    },
    {
      name: 'ctaText_en',
      title: 'Texto do CTA (EN)',
      type: 'string',
      initialValue: 'SUBMIT PROJECT ↗',
    },
    {
      name: 'confirmationMessage',
      title: 'Mensagem de Confirmação (PT)',
      type: 'text',
      rows: 2,
      initialValue: 'Mensagem recebida com sucesso. Entrarei em contato em breve com contexto e próximos passos.',
    },
    {
      name: 'confirmationMessage_en',
      title: 'Mensagem de Confirmação (EN)',
      type: 'text',
      rows: 2,
      initialValue: 'Message received successfully. I’ll be in touch shortly with context and next steps.',
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'responseTime',
      media: 'profileImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: 'Página Let’s Talk (Contato)',
        subtitle: subtitle || 'Configuração de contato e disponibilidade',
        media,
      };
    },
  },
};
