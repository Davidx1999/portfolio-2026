import mapearImg from '../assets/mapear.jpg';
import aulaf75Img from '../assets/aulaf75.png';
import vincenzoImg from '../assets/vincenzo.jpg';

export const PROJECTS = [
  {
    id: 'mapear',
    title: 'Mapear Platform',
    category: 'Product Design',
    workType: 'cases',
    year: '2021—2026',
    period: '2021—2026',
    role: 'Lead Product Designer · Design System',
    context: 'EdTech Enterprise · FGV DGPE / CEnPE / UFC',
    tags: ['Product Design', 'Design Systems', 'EdTech FGV', 'Information Architecture'],
    description: 'Plataforma institucional de avaliação educacional e geolocalização conectando pesquisa acadêmica, design system e desenvolvimento com handoff integrado.',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
    finalImage: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
    processImage: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
    imageHover: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
    featured: true,
    rating: '4.9',
    badge: 'Enterprise FGV',
    challenge: 'Organizar ecossistema denso de dados educacionais, relatórios e geolocalização com escalabilidade multi-módulo.',
    solution: 'Arquitetura modular orientada a tokens, componentes reutilizáveis e fluxos de navegação simplificados para múltiplos perfis.',
    process: [
      'Pesquisa contínua e imersão com stakeholders acadêmicos.',
      'Arquitetura de informação e mapeamento de jornadas complexas.',
      'Design System com tokens, acessibilidade WCAG e documentação.',
      'Handoff detalhado e validação com engenharia e usuários finais.'
    ]
  },
  {
    id: 'aula-f75',
    title: 'Aula F75',
    category: 'Interface & Motion',
    workType: 'cases',
    year: '2024',
    period: '2024',
    role: 'Interaction Designer · Creative Technologist',
    context: 'Estudo Independente · Vibe Coding & Video Scroll',
    tags: ['Estudo Independente', 'Vibe Coding', 'Vídeo no Scroll', 'Interação'],
    description: 'Estudo independente de aplicação de vibe coding, vídeo no scroll e experiência interativa imersiva simulando hardware mecânico.',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
    finalImage: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
    processImage: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_card.png`,
    imageHover: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`,
    featured: true,
    rating: '5.0',
    badge: 'Estudo de Laboratório',
    liveLink: 'https://davidx1999.github.io/f75-site-test-2/#features',
    challenge: 'Explorar a aplicação prática de vibe coding e sincronização de vídeo no scroll para criar uma experiência tátil de hardware na web.',
    solution: 'Interface com simulação tátil, vídeo controlado por scroll a 60fps constantes e microinterações de teclado com som.',
    process: [
      'Prototipagem interativa com vibe coding e React.',
      'Sincronização precisa de vídeo em alta fidelidade no scroll.',
      'Microinterações e física de teclas com Framer Motion.',
      'Otimização de performance web para taxa de quadros estável.'
    ]
  },
  {
    id: 'vincenzo',
    title: 'Vincenzo Data Science',
    category: 'System Architecture',
    workType: 'cases',
    year: '2023—2024',
    period: '2023—2024',
    role: 'Interface Architect · Creative Engineering',
    context: 'Estudo de Laboratório · Arquitetura de Interface & Dados',
    tags: ['Estudo Independente', 'Terminal CLI', 'Big Data', 'Cimática'],
    description: 'Estudo e experimentação de laboratório combinando simulação de terminal CLI dos anos 80, visualização de matrizes e padrões cimáticos.',
    image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_cape.png`,
    finalImage: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_cape.png`,
    processImage: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_card.png`,
    imageHover: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_cape.png`,
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_retro_cape.png`,
    featured: false,
    badge: 'Estudo de Laboratório',
    challenge: 'Construir um ambiente experimental simulando terminal retrô e visualização matemática densa de dados.',
    solution: 'Simulador customizado de CLI integrado a matriz de visualização de grafos e patterns cimáticos interativos.',
    process: [
      'Conceituação tipográfica monoespaçada de alto contraste.',
      'Arquitetura de componentes para streaming de dados em tempo real.',
      'Otimização de renderização gráfica para padrões matemáticos.',
      'Testes de ergonomia cognitiva para analistas de dados.'
    ]
  },
  {
    id: 'ui-ux-study',
    title: 'Lattice Design System',
    category: 'Design Systems',
    workType: 'cases',
    year: '2024',
    period: '2024',
    role: 'Design System Lead',
    context: 'Enterprise Infrastructure',
    tags: ['Design Systems', 'Design Tokens', 'Accessibility', 'Documentation'],
    description: 'Estudo aprofundado e arquitetura de componentes escaláveis com tokens semânticos e documentação de handoff.',
    image: mapearImg,
    finalImage: mapearImg,
    processImage: aulaf75Img,
    featured: false,
    challenge: 'Garantir consistência absoluta entre times de design e engenharia com sincronização de tokens.',
    solution: 'Sistema estruturado em tokens semânticos, componentes atômicos e guias de uso no Figma e código.',
    process: [
      'Mapeamento de inventário de componentes legados.',
      'Definição da escala tipográfica fluida e paleta de contraste acessível.',
      'Documentação técnica de comportamento e estados de foco.',
      'Construção de biblioteca de componentes reutilizáveis.'
    ]
  },
  {
    id: 'cenpe-platform',
    title: 'CEnPE Platform',
    category: 'Product Design',
    workType: 'cases',
    year: '2024',
    period: '2024',
    role: 'Senior Product Designer',
    context: 'Institutional · FGV',
    tags: ['Product Design', 'Information Architecture', 'User Testing'],
    description: 'Design de plataforma institucional para centro de empreendedorismo e novos projetos com financiamento FGV.',
    image: vincenzoImg,
    finalImage: vincenzoImg,
    processImage: mapearImg,
    featured: false,
    challenge: 'Conectar empreendedores, mentores e investidores em uma única jornada clara e objetiva.',
    solution: 'Plataforma modular com dashboards personalizados por perfil e fluxos de mentoria simplificados.',
    process: [
      'Entrevistas de profundidade com empreendedores e pesquisadores.',
      'Arquitetura de informação e mapeamento de fluxos de decisão.',
      'Prototipagem de alta fidelidade e testes de usabilidade.',
      'Apresentação e validação com banca institucional.'
    ]
  }
];
