import { createClient } from '@sanity/client';

const projectId = 'pjq90dr2';
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = '***REMOVED***';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function restoreMapear() {
  console.log('🚀 Migrando e consolidando o Estudo de Caso "Mapear" para Field-Level i18n...\n');

  const mapearDoc = {
    _id: 'c179568e-44cf-477a-87cf-33e80398d10a',
    _type: 'project',
    slug: {
      _type: 'slug',
      current: 'mapear',
    },
    caseDepth: 'full',
    projectType: 'professionalProject',
    projectStatus: 'ongoing',
    clientOrContext: 'FGV DGPE / CEnPE / UFC',
    period: '2022—ATUAL',
    duration: 'Mais de 4 anos',
    featuredOnHome: true,
    featuredOrder: 1,
    published: true,
    translationStatus: 'reviewed',
    title: {
      _type: 'localizedString',
      en: 'Mapear',
      ptBR: 'Mapear',
    },
    shortDescription: {
      _type: 'localizedText',
      en: 'Educational assessment digital ecosystem connecting continuous research, architecture, and Design Systems across multiple modules.',
      ptBR: 'Ecossistema digital de avaliação educacional conectando pesquisa contínua, arquitetura e Design Systems em múltiplos módulos.',
    },
    category: {
      _type: 'localizedString',
      en: 'Product Design',
      ptBR: 'Design de Produto',
    },
    role: {
      _type: 'localizedString',
      en: 'Lead Product Designer',
      ptBR: 'Lead Product Designer',
    },
    disciplines: [
      'Product Design',
      'UX/UI Design',
      'Design Systems',
      'Information Architecture',
      'UX Research',
      'Design Documentation',
      'Handoff & QA',
    ],
    mainVisual: {
      _type: 'mainVisualMedia',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-57f3985447e0551411c70c854972a80ec4387841-1915x821-jpg',
        },
      },
      videoUrl: 'https://drive.google.com/file/d/1-xBQs-NmsFfTnKYFBwjMJLmdEhJYOw8L/view?usp=sharing',
      videoPoster: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-095303a2a7b33c7eb86aebfdd6b1ad4de8cdd25c-15454x7708-png',
        },
      },
      alt: {
        _type: 'localizedString',
        en: 'Mapear Platform - Educational Assessment Ecosystem',
        ptBR: 'Plataforma Mapear - Ecossistema de Avaliação Educacional',
      },
    },
    heroEyebrow: {
      _type: 'localizedString',
      en: '01 // SISTEMA & ARQUITETURA',
      ptBR: '01 // SISTEMA & ARQUITETURA',
    },
    heroHeadline: {
      _type: 'localizedString',
      en: 'Mapear — Educational Assessment Platform',
      ptBR: 'Mapear — Plataforma de Avaliação Educacional',
    },
    heroSummary: {
      _type: 'localizedText',
      en: 'A complex web-based ecosystem that coordinates diagnostics, questionnaires, and large-scale educational assessments for CEnPE, UFC, and FGV DGPE.',
      ptBR: 'Ecossistema web complexo que coordena diagnósticos, questionários e avaliações educacionais em larga escala para CEnPE, UFC e FGV DGPE.',
    },
    overview: {
      _type: 'localizedText',
      en: 'For more than four years, I have driven the design and evolution of Mapear, turning complex psychometric and assessment methodologies into an intuitive, accessible, and robust digital product.',
      ptBR: 'Há mais de quatro anos lidero o design e a evolução do Mapear, transformando metodologias psicométricas e educacionais complexas em um produto digital intuitivo, acessível e robusto.',
    },
    context: {
      _type: 'localizedText',
      en: 'Created in collaboration between CEnPE and Federal University of Ceará on a strategic project with FGV DGPE, serving educators, managers, and students across public education networks.',
      ptBR: 'Desenvolvido em colaboração entre CEnPE e Universidade Federal do Ceará em projeto estratégico com FGV DGPE, atendendo educadores, gestores e estudantes de redes públicas de ensino.',
    },
    challenge: {
      _type: 'localizedText',
      en: 'Standardizing disjointed assessment workflows across diverse educational networks while eliminating engineering rework and interface friction.',
      ptBR: 'Padronizar fluxos de avaliação fragmentados entre diversas redes de ensino, eliminando retrabalho com engenharia e inconsistências de interface.',
    },
    responsibilities: [
      {
        _type: 'localizedString',
        en: 'Continuous UX/UI research and user journey mapping with educators and managers',
        ptBR: 'Pesquisa contínua de UX/UI e mapeamento de jornadas com educadores e gestores',
      },
      {
        _type: 'localizedString',
        en: 'End-to-end Design System creation, tokenization, and component documentation in Figma',
        ptBR: 'Criação do Design System end-to-end, tokenização e documentação de componentes no Figma',
      },
      {
        _type: 'localizedString',
        en: 'Close coordination and QA with software engineering squads to ensure high-fidelity delivery',
        ptBR: 'Coordenação contínua e QA com squads de engenharia para assegurar entrega em alta fidelidade',
      },
    ],
    constraints: {
      _type: 'localizedText',
      en: 'High density of data, low-bandwidth classroom environments, and strict public institutional compliance requirements.',
      ptBR: 'Alta densidade de dados, ambientes escolares com conectividade variável e exigências rigorosas de conformidade institucional pública.',
    },
    solutionSummary: {
      _type: 'localizedText',
      en: 'Modular UI architecture powered by accessible Design Tokens, optimized multi-step questionnaire forms, and clear diagnostic data dashboards.',
      ptBR: 'Arquitetura modular de interface baseada em Design Tokens acessíveis, formulários de questionário otimizados em múltiplas etapas e dashboards diagnósticos claros.',
    },
    impact: {
      _type: 'localizedText',
      en: 'Over 4 years of continuous product evolution, validated with stakeholders and real educators in demanding institutional and academic environments.',
      ptBR: 'Mais de 4 anos de maturidade contínua do produto, validado com stakeholders e educadores reais em ambientes institucionais e acadêmicos de alta exigência.',
    },
    learnings: {
      _type: 'localizedText',
      en: 'Systemic consistency and thorough documentation are the foundation for scaling complex products with multi-disciplinary squads.',
      ptBR: 'Consistência sistêmica e documentação aprofundada são a base para escalar produtos complexos com squads multidisciplinares.',
    },
    finalReflection: {
      _type: 'localizedText',
      en: 'Complex digital products require rigorous systems, not improvisation. Discipline in information architecture and component tokens transforms complexity into clarity.',
      ptBR: 'Produtos digitais complexos exigem sistemas rigorosos, não improviso. A disciplina na arquitetura de informação e tokens de componentes transforma complexidade em clareza.',
    },
    seo: {
      _type: 'localizedSeo',
      title: {
        _type: 'localizedString',
        en: 'Mapear Case Study — David Salviano',
        ptBR: 'Estudo de Caso Mapear — David Salviano',
      },
      description: {
        _type: 'localizedText',
        en: 'Case study on the Mapear educational assessment ecosystem by Lead Product Designer David Salviano.',
        ptBR: 'Estudo de caso do ecossistema de avaliação educacional Mapear pelo Lead Product Designer David Salviano.',
      },
    },
  };

  await client.createOrReplace(mapearDoc);
  console.log('✅ Estudo de caso "Mapear" [c179568e-44cf-477a-87cf-33e80398d10a] gravado com sucesso no Sanity!');
}

restoreMapear();
