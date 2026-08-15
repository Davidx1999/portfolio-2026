/**
 * Rich Structured Fallback & Static Dataset for Case Studies
 * Complies with official trajectory, honest framing, and bilingual localization.
 */

export const CASE_STUDIES_DATA = {
  mapear: {
    id: 'mapear',
    slug: 'mapear',
    title: 'Mapear Platform',
    projectType: 'professionalProject',
    projectStatus: 'ongoing',
    period: '2021—2026',
    startYear: '2021',
    endYear: '2026',
    clientOrContext: 'FGV DGPE · CEnPE / UFC',
    institution: 'Universidade Federal do Ceará (UFC) · FGV DGPE',
    location: 'Fortaleza, Brasil',
    role: 'Lead Product Designer · Design System',
    disciplines: [
      'Product Design',
      'UX/UI Design',
      'Design Systems',
      'Information Architecture',
      'UX Research',
      'Prototyping & AI',
      'Design Documentation',
      'Handoff & QA',
    ],
    category: 'Product Design',
    tags: ['Product Design', 'Design Systems', 'EdTech FGV', 'Information Architecture'],
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
    heroMedia: {
      mediaType: 'image',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
      alt: 'Mapear Platform — Visão Panorâmica de Interface e Módulos Pedagógicos',
      alt_en: 'Mapear Platform — Panoramic View of Interface and Pedagogical Modules',
      enableDiagonalHeroReveal: true,
      initialRotation: '-13',
      initialScalePreset: 'medium',
      initialHorizontalDirection: 'left',
      heroScrollLength: 'medium',
    },
    heroSummary:
      'Uma plataforma educacional criada para organizar avaliação, aprendizagem e tomada de decisão em múltiplos níveis da rede de ensino.',
    heroSummary_en:
      'An enterprise educational platform designed to organize assessment, learning data, and decision-making across multiple tiers of the school network.',
    thesis:
      'Como transformar um ecossistema educacional denso e complexo em uma experiência que diferentes perfis conseguem compreender e operar com total autonomia?',
    thesis_en:
      'How to transform a dense and complex educational ecosystem into an experience that diverse user profiles can intuitively understand and operate?',
    overview:
      'O Mapear nasceu no contexto institucional do CEnPE/UFC e da FGV DGPE como uma plataforma de avaliação educacional em larga escala. O ecossistema precisava atender professores, gestores escolares, secretarias de educação e pesquisadores, cada um com necessidades analíticas e níveis de proficiência digital distintos.',
    overview_en:
      'Mapear was conceived within the institutional framework of CEnPE/UFC and FGV DGPE as a large-scale educational assessment platform. The ecosystem had to serve teachers, school managers, education boards, and researchers—each with distinct analytical needs and levels of digital proficiency.',
    challenge:
      'A complexidade residia na densidade de dados estatísticos, regras de progressão pedagógica e multiplicidade de perfis de usuário em diferentes dispositivos, exigindo uma arquitetura de informação escalável e governança rigorosa de componentes de interface.',
    challenge_en:
      'The core challenge lay in the sheer density of statistical data, pedagogical progression rules, and diverse user personas across desktop and mobile devices, requiring a scalable information architecture and strict interface component governance.',
    responsibilities: [
      'Product Design end-to-end e visão sistêmica da plataforma ao longo de mais de 4 anos.',
      'Arquitetura de informação, fluxos de navegação e taxonomia modular.',
      'Criação e governança do Design System com tokens semânticos e variantes.',
      'Prototipagem de alta fidelidade e validação contínua de usabilidade.',
      'Documentação técnica de engenharia de design e handoff integrado com times de desenvolvimento.',
    ],
    responsibilities_en: [
      'End-to-end Product Design and systemic platform vision over 4+ continuous years.',
      'Information architecture, navigation flows, and modular taxonomy.',
      'Creation and governance of the Design System with semantic tokens and component variants.',
      'High-fidelity prototyping and continuous usability testing.',
      'Technical design documentation and integrated engineering handoff.',
    ],
    solution:
      'Estruturação de uma interface modular orientada a tokens, fluxos de navegação desacoplados por perfil e um Design System documentado que garantiu consistência visual e velocidade de implementação técnica.',
    solution_en:
      'Structuring a token-driven modular interface, decoupled role-based navigation flows, and a documented Design System that ensured visual consistency and rapid technical implementation.',
    impact:
      'Padronização de centenas de componentes de interface, eliminação de retrabalho entre design e desenvolvimento e operação consolidada ao longo de mais de 4 anos de evolução contínua.',
    impact_en:
      'Standardization of hundreds of interface components, elimination of rework between design and engineering, and consolidated operations over 4+ years of continuous evolution.',
    reflection:
      'Acompanhar o Mapear por tantos anos transformou minha perspectiva sobre design: uma solução não termina na interface. Ela precisa continuar viva e compreensível para novas regras, novos públicos e novos desenvolvedores.',
    reflection_en:
      'Guiding Mapear over multiple years redefined my perspective on product design: a solution never ends at the interface. It must remain viable and understandable across evolving business rules, new audiences, and growing engineering teams.',
    
    // Master demonstration rhythm for Mapear
    contentBlocks: [
      // 1. Statement Editorial
      {
        _type: 'dividerStatement',
        eyebrow: '01 // ARQUITETURA DE INFORMAÇÃO',
        eyebrow_en: '01 // INFORMATION ARCHITECTURE',
        statement: 'A complexidade não estava em uma única tela. Estava na relação entre módulos, pessoas e regras.',
        statement_en: 'The complexity was not confined to a single screen. It lived in the relationship between modules, people, and business rules.',
        supportingText: 'Orquestrar avaliações diagnósticas em escala exigiu transformar fluxos de decisão densos em jornadas claras e previsíveis.',
        supportingText_en: 'Orchestrating large-scale diagnostic assessments demanded transforming dense decision paths into clear, predictable journeys.',
        alignment: 'left',
        theme: 'dark',
      },

      // 2. Full Viewport com Atraso Interno
      {
        _type: 'laggedFullViewportMedia',
        image: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
        headline: 'Visão Panorâmica da Plataforma Mapear',
        headline_en: 'Panoramic View of the Mapear Ecosystem',
        caption: 'Mapear v4.0 · Arquitetura modular de dados pedagógicos e relatórios em tempo real.',
        caption_en: 'Mapear v4.0 · Modular pedagogical data architecture and real-time reporting.',
        lagPreset: 'medium',
        theme: 'dark',
      },

      // 3. Capítulo 01: Produto e Arquitetura
      {
        _type: 'chapterIntro',
        chapterNumber: '01',
        title: 'Produto e Arquitetura',
        title_en: 'Product & Architecture',
        subtitle: 'Taxonomia & Governança de Fluxos',
        subtitle_en: 'Taxonomy & Flow Governance',
        summary: 'Estruturação de jornadas específicas para professores, gestores escolares e secretarias de educação com hierarquias de acesso desacopladas.',
        summary_en: 'Designing tailored user journeys for teachers, school administrators, and education boards with decoupled permission hierarchies.',
        theme: 'dark',
      },

      // 4. Pilha Vertical com 5 Imagens Reais Distintas
      {
        _type: 'verticalMediaStack',
        eyebrow: 'FLUXOS & MÓDULOS DE NAVEGAÇÃO',
        eyebrow_en: 'FLOWS & NAVIGATION MODULES',
        openingStatement: 'Módulos construídos para responder com precisão a cada etapa da avaliação diagnóstica.',
        openingStatement_en: 'Modules engineered to precisely address every stage of diagnostic evaluation.',
        items: [
          {
            _key: 'stack-1',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
            caption: 'Painel Central de Gestão & Indicadores',
            caption_en: 'Central Management Dashboard & Metrics',
            supportingText: 'Visão agregada de proficiência por turma e escola.',
            supportingText_en: 'Aggregated proficiency view by class and school.',
          },
          {
            _key: 'stack-2',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
            caption: 'Mapeamento de Habilidades Pedagógicas',
            caption_en: 'Pedagogical Skill Tree Mapping',
            supportingText: 'Navegação por matriz curricular e matriz de referência.',
            supportingText_en: 'Curriculum matrix and benchmark reference navigation.',
          },
          {
            _key: 'stack-3',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
            caption: 'Banco de Tarefas & Gestão de Avaliações',
            caption_en: 'Task Bank & Diagnostic Assessment Builder',
            supportingText: 'Criação e parametrização de itens avaliativos com rubricas.',
            supportingText_en: 'Authoring and configuration of assessment items with scoring rubrics.',
          },
          {
            _key: 'stack-4',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear.png`,
            caption: 'Módulo de Aplicação & Execução de Provas',
            caption_en: 'Assessment Administration & Real-Time Sync',
            supportingText: 'Interface de preenchimento e sincronização offline para escolas.',
            supportingText_en: 'Offline-ready student exam interface and automatic sync.',
          },
          {
            _key: 'stack-5',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/mapear_reports.jpg`,
            caption: 'Relatórios Estatísticos & Visualização de Dados',
            caption_en: 'Statistical Analytics & Pedagogical Reports',
            supportingText: 'Geração automatizada de gráficos para conselho pedagógico.',
            supportingText_en: 'Automated chart generation for pedagogical review boards.',
          },
        ],
        closingStatement: 'Cada módulo opera de maneira independente, mas compartilha a mesma linguagem visual e técnica.',
        closingStatement_en: 'Every module operates independently, yet shares the exact same visual and technical grammar.',
        scrollLengthPreset: 'medium',
        mediaWidthPreset: 'standard',
        theme: 'dark',
      },

      // 5. Statement de Transição para o Design System
      {
        _type: 'dividerStatement',
        eyebrow: '02 // DESIGN SYSTEM COMO INFRAESTRUTURA',
        eyebrow_en: '02 // DESIGN SYSTEM AS INFRASTRUCTURE',
        statement: 'Consistência precisava ser construída como infraestrutura.',
        statement_en: 'Consistency had to be engineered as infrastructure.',
        supportingText: 'Para sustentar 4 anos de novas funcionalidades sem degradação visual, criamos uma fundação atômica de tokens e documentação viva.',
        supportingText_en: 'To support 4 years of expanding features without visual decay, we established an atomic foundation of semantic tokens and living documentation.',
        alignment: 'left',
        theme: 'dark',
      },

      // 6. Capítulo 02: Design System e Escala
      {
        _type: 'chapterIntro',
        chapterNumber: '02',
        title: 'Design System e Escala',
        title_en: 'Design System & Scale',
        subtitle: 'Tokens Semânticos, Variantes & Componentes',
        subtitle_en: 'Semantic Tokens, Variants & Components',
        summary: 'Governança centralizada de biblioteca no Figma conectada diretamente aos componentes de produção no front-end.',
        summary_en: 'Centralized Figma component governance linked directly to production front-end component libraries.',
        theme: 'dark',
      },

      // 7. Mosaico de Artefatos em 4 Colunas com Espaços Vazios Intencionais
      {
        _type: 'artifactMosaicScene',
        eyebrow: 'BIBLIOTECA & ANATOMIA DE COMPONENTES',
        eyebrow_en: 'COMPONENT LIBRARY & ANATOMY',
        title: 'Mosaico de Artefatos do Sistema',
        title_en: 'System Artifacts Mosaic',
        preset: 'alternating',
        items: [
          {
            _key: 'mosaic-1',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`,
            caption: 'Tokens Semânticos de Cor & Superfície',
            caption_en: 'Semantic Color & Surface Tokens',
            alt: 'Tokens de cor do Mapear',
            row: 1,
            column: 1,
            frameMode: 'none',
          },
          {
            _key: 'mosaic-2',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
            caption: 'Tipografia Fluida & Escalas Modulares',
            caption_en: 'Fluid Typography & Modular Scales',
            alt: 'Escala tipográfica do Mapear',
            row: 1,
            column: 3,
            frameMode: 'none',
          },
          {
            _key: 'mosaic-3',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
            caption: 'Anatomia de Tabelas Complexas & Estados',
            caption_en: 'Complex Table Anatomy & Data States',
            alt: 'Tabelas do Mapear',
            row: 2,
            column: 2,
            frameMode: 'none',
          },
          {
            _key: 'mosaic-4',
            media: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear.png`,
            caption: 'Modais & Componentes de Diálogo',
            caption_en: 'Modals & Dialog Components',
            alt: 'Modais do Mapear',
            row: 2,
            column: 4,
            frameMode: 'none',
          },
        ],
        theme: 'dark',
      },

      // 8. Diagonal Media Scene
      {
        _type: 'diagonalMediaScene',
        media: `${import.meta.env.BASE_URL}assets/projects_cape/fgv_aspect_wide.png`,
        caption: 'Anatomia do Componente de Avaliação — Estados de Foco, Hover e Validação.',
        caption_en: 'Assessment Component Anatomy — Focus, Hover, and Validation States.',
        directionPreset: 'topLeftToCenter',
        showDestinationFrame: true,
        frameColor: 'lime',
        scrollLength: 'medium',
        theme: 'dark',
      },

      // 9. Capítulo 03: Validação, Documentação e Handoff
      {
        _type: 'chapterIntro',
        chapterNumber: '03',
        title: 'Validação, Documentação e Handoff',
        title_en: 'Validation, Documentation & Handoff',
        subtitle: 'Engenharia de Design & Qualidade',
        subtitle_en: 'Design Engineering & QA',
        summary: 'Alinhamento contínuo com equipes de engenharia, especificações técnicas detalhadas e prototipagem funcional para reduzir retrabalho.',
        summary_en: 'Continuous alignment with engineering squads, exhaustive technical specs, and functional prototypes to eliminate design debt.',
        theme: 'dark',
      },

      // 10. Process Steps
      {
        _type: 'processSteps',
        title: 'Ciclo de Engenharia de Design',
        title_en: 'Design Engineering Lifecycle',
        steps: [
          {
            index: '01',
            title: 'Imersão Pedagógica & Regras de Negócio',
            title_en: 'Pedagogical Immersion & Business Rules',
            description: 'Mapeamento de restrições com a equipe do CEnPE/UFC e especialistas em avaliação educacional.',
            description_en: 'Constraint mapping with CEnPE/UFC specialists and educational assessment experts.',
          },
          {
            index: '02',
            title: 'Arquitetura de Informação & Protótipos Vibe Coding',
            title_en: 'Information Architecture & Functional Prototypes',
            description: 'Validação de viabilidade técnica com prototipagem rápida e testes de usabilidade reais.',
            description_en: 'Validating technical feasibility with rapid code prototyping and real usability testing.',
          },
          {
            index: '03',
            title: 'Componentização & Documentação de Handoff',
            title_en: 'Componentization & Handoff Documentation',
            description: 'Especificação de propriedades, tokens, acessibilidade e comportamentos responsivos.',
            description_en: 'Detailed specs for component props, tokens, accessibility, and responsive states.',
          },
          {
            index: '04',
            title: 'QA de Interface & Evolução Contínua',
            title_en: 'UI QA & Continuous Systemic Evolution',
            description: 'Acompanhamento do deploy e refinamento contínuo com feedback dos usuários finais.',
            description_en: 'Reviewing deployments and continuously iterating based on real user feedback.',
          },
        ],
        theme: 'dark',
      },
    ],
    nextCaseSlug: 'aula-f75',
    seo: {
      metaTitle: 'Mapear Platform — Case Study · David Salviano',
      metaTitle_en: 'Mapear Platform — Case Study · David Salviano',
      metaDescription:
        'Estudo de caso detalhado sobre a plataforma educacional Mapear (FGV DGPE · CEnPE/UFC), cobrindo Product Design, Design System e Arquitetura de Informação.',
      metaDescription_en:
        'Detailed case study on the Mapear educational platform (FGV DGPE · CEnPE/UFC), covering Product Design, Design Systems, and Information Architecture.',
    },
  },

  'aula-f75': {
    id: 'aula-f75',
    slug: 'aula-f75',
    title: 'Aula F75',
    projectType: 'independentStudy',
    projectStatus: 'completed',
    period: '2025',
    startYear: '2025',
    endYear: '2025',
    clientOrContext: 'Estudo de Laboratório & Vibe Coding',
    location: 'Fortaleza, Brasil',
    role: 'Creative Developer & Interaction Designer',
    disciplines: [
      'Creative Development',
      'Interaction Design',
      'Motion Design',
      'Prototyping & AI',
      'Web Design',
    ],
    category: 'Creative Development',
    tags: ['Vibe Coding', 'Interaction Design', 'Scroll Video', 'Tactile Simulation'],
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`,
    heroMedia: {
      mediaType: 'image',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
      alt: 'Aula F75 — Simulação Tátil de Hardware e Interação Web',
      alt_en: 'Aula F75 — Tactile Hardware Simulation and Web Interaction',
      enableDiagonalHeroReveal: true,
      initialRotation: '-13',
      initialScalePreset: 'medium',
      initialHorizontalDirection: 'left',
    },
    heroSummary:
      'Uma exploração interativa de engenharia criativa traduzindo a precisão mecânica de hardware físico em uma narrativa web imersiva orientada pelo scroll.',
    heroSummary_en:
      'An interactive creative engineering exploration translating tactile hardware physics into a scroll-driven web narrative.',
    thesis:
      'Como transpor a sensação tátil e o peso mecânico de um hardware físico para uma interface web fluida sem recorrer a modelagens 3D pesadas?',
    thesis_en:
      'How to translate the tactile feel and mechanical weight of physical hardware into a fluid web interface without relying on heavy 3D assets?',
    overview:
      'Aula F75 é um estudo independente focado em engenharia de interação e vibe coding. O objetivo foi explorar o mapeamento preciso de vídeo frame-a-frame sincronizado ao scroll nativo do usuário, criando uma sensação tátil e imediata de exploração de produto.',
    overview_en:
      'Aula F75 is an independent study focused on interaction engineering and vibe coding. The objective was exploring precise frame-by-frame video scrub mapped to native user scroll, creating an immediate tactile sensation of product exploration.',
    challenge:
      'Sincronizar reprodução de vídeo no scroll mantendo 60fps em dispositivos móveis, sem sobrecarregar a memória do navegador e garantindo que o controle permaneça natural em trackpads e telas touch.',
    challenge_en:
      'Synchronizing scroll-driven video playback at solid 60fps on mobile devices, avoiding browser memory overhead while keeping scroll physics natural on trackpads and touchscreens.',
    responsibilities: [
      'Concepção visual e direção de arte da experiência imersiva.',
      'Desenvolvimento do pipeline de captura e otimização de vídeo para scroll-scrubbing.',
      'Engenharia front-end com React, Framer Motion e Canvas de alta performance.',
      'Otimização de performance móvel e testes em múltiplos dispositivos.',
    ],
    responsibilities_en: [
      'Visual direction and art direction for the immersive web experience.',
      'Engineering the video asset pipeline for smooth scroll-scrubbing.',
      'Front-end engineering with React, Framer Motion, and high-performance Canvas.',
      'Mobile performance optimization and cross-device testing.',
    ],
    solution:
      'Desenvolvimento de uma arquitetura baseada em chunks de vídeo pré-decodificados e interpolação linear no scroll, resultando em resposta instantânea ao toque e transição sem atrito.',
    solution_en:
      'Engineering an architecture based on pre-decoded video chunks and linear scroll interpolation, providing instant touch response and frictionless state transitions.',
    impact:
      'Validação de viabilidade técnica de interfaces orientadas a scroll-video com carregamento inferior a 2 segundos e taxa de quadros estável em dispositivos variados.',
    impact_en:
      'Validated technical feasibility of scroll-video interfaces with under 2-second initial load and consistent 60fps across varied test devices.',
    reflection:
      'Estudos independentes são o espaço onde testo os limites da tecnologia antes de aplicá-la em produtos reais. O Aula F75 me provou como o refinamento de microinterações transforma um objeto estático em uma experiência memorável.',
    reflection_en:
      'Independent studies are where I push technical boundaries before applying techniques to client products. Aula F75 proved how micro-interaction craftsmanship transforms a static product into a memorable experience.',
    contentBlocks: [
      {
        _type: 'dividerStatement',
        eyebrow: '01 // ENGENHARIA DE INTERAÇÃO',
        eyebrow_en: '01 // INTERACTION ENGINEERING',
        statement: 'A web não precisa ser estática quando o scroll pode ser tratado como um eixo físico de controle.',
        statement_en: 'The web does not have to be static when scroll can be treated as a physical control axis.',
        alignment: 'left',
        theme: 'dark',
      },
      {
        _type: 'laggedFullViewportMedia',
        image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
        headline: 'Precisão Tátil no Scroll',
        headline_en: 'Tactile Precision on Scroll',
        caption: 'Simulação mecânica de teclas e botões rotativos com feedback sonoro sintetizado.',
        caption_en: 'Mechanical keycap and rotary knob simulation with synthesized sound feedback.',
        lagPreset: 'medium',
        theme: 'dark',
      },
      {
        _type: 'processSteps',
        title: 'Etapas de Engenharia & Prototipagem',
        title_en: 'Engineering & Prototyping Stages',
        steps: [
          {
            index: '01',
            title: 'Captura & Masterização de Mídia',
            title_en: 'Media Capture & Mastering',
            description: 'Gravação em 60fps com iluminação controlada e compressão WebM/H.264 otimizada.',
            description_en: '60fps capture under studio lighting with optimized WebM/H.264 compression.',
          },
          {
            index: '02',
            title: 'Scrubbing por RequestAnimationFrame',
            title_en: 'RequestAnimationFrame Scrubbing',
            description: 'Mapeamento de delta de rolagem direto no canvas para evitar saltos visuais.',
            description_en: 'Direct scroll delta mapping on canvas to eliminate frame stuttering.',
          },
          {
            index: '03',
            title: 'Refinamento Acústico e Háptico',
            title_en: 'Acoustic and Haptic Refinement',
            description: 'Integração de Web Audio API para simulação de cliques mecânicos.',
            description_en: 'Web Audio API integration for mechanical switch sound simulation.',
          },
        ],
        theme: 'dark',
      },
    ],
    nextCaseSlug: 'vincenzo',
    seo: {
      metaTitle: 'Aula F75 — Independent Study · David Salviano',
      metaTitle_en: 'Aula F75 — Independent Study · David Salviano',
      metaDescription:
        'Estudo independente de engenharia de interação e scroll-video com o teclado mecânico Aula F75.',
      metaDescription_en:
        'Independent study exploring scroll-driven interaction engineering with the Aula F75 mechanical keyboard.',
    },
  },

  vincenzo: {
    id: 'vincenzo',
    slug: 'vincenzo',
    title: 'Vincenzo Data Science',
    projectType: 'independentStudy',
    projectStatus: 'completed',
    period: '2025',
    startYear: '2025',
    endYear: '2025',
    clientOrContext: 'Estudo Experimental de CLI & Visualização',
    location: 'Fortaleza, Brasil',
    role: 'Creative Front-end Developer & Visual Designer',
    disciplines: [
      'Creative Development',
      'Interaction Design',
      'Typography & Layout',
      'Prototyping & AI',
    ],
    category: 'Creative Development',
    tags: ['CLI Terminal', 'Data Streaming', 'CRT Shader', 'Matrix Aesthetics'],
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_cape.jpg`,
    heroMedia: {
      mediaType: 'image',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo.jpg`,
      alt: 'Vincenzo Data Science — Terminal CLI e Streaming de Dados',
      alt_en: 'Vincenzo Data Science — CLI Terminal and Data Streaming',
      enableDiagonalHeroReveal: true,
      initialRotation: '-13',
      initialScalePreset: 'medium',
      initialHorizontalDirection: 'right',
    },
    heroSummary:
      'Uma interface de terminal retrô dos anos 80 recriada com tecnologias web contemporâneas, explorando transmissão de dados matriciais e feedback CRT analógico.',
    heroSummary_en:
      'An 80s retro CLI terminal interface recreated with contemporary web technologies, exploring matrix data streaming and analog CRT display physics.',
    thesis:
      'Como evocar a nostalgia analógica dos monitores fósforo verde com a velocidade e fluidez de um front-end moderno?',
    thesis_en:
      'How to evoke the analog nostalgia of phosphor CRT monitors with the speed and responsiveness of a modern web stack?',
    overview:
      'Vincenzo é um experimento independente de design e desenvolvimento que simula um console de computação científica dos anos 80, incorporando shaders WebGL de varredura CRT, tipografia bitmap e comandos interativos de terminal.',
    overview_en:
      'Vincenzo is an independent design and development experiment simulating an 80s scientific computing console, featuring WebGL CRT scanline shaders, bitmap typography, and interactive terminal commands.',
    challenge:
      'Recriar a curvatura ótica de um monitor CRT e o efeito de bloom de fósforo mantendo renderização pura sem travar o processamento da CPU.',
    challenge_en:
      'Recreating the optical curvature of a CRT screen and phosphor bloom physics while maintaining pure GPU acceleration without CPU bottleneck.',
    responsibilities: [
      'Direção de arte e tipografia baseada em manuais de computação clássica.',
      'Programação de shaders GLSL para simulação de scanlines e distorção esférica.',
      'Arquitetura de comandos e parser de terminal em JavaScript.',
    ],
    responsibilities_en: [
      'Art direction and typography based on vintage computing documentation.',
      'GLSL shader engineering for scanline and spherical distortion simulation.',
      'Command parser and stateful CLI engine architecture.',
    ],
    solution:
      'Construção de um motor de terminal leve com renderização acelerada por GPU e efeitos sonoros mecânicos acionados por digitação em tempo real.',
    solution_en:
      'Building a lightweight terminal engine with GPU-accelerated post-processing and real-time synthesized keypress acoustic feedback.',
    impact:
      'Criação de uma experiência imersiva amplamente elogiada pela comunidade de desenvolvedores criativos como exemplo de fidelidade e performance.',
    impact_en:
      'Engineered an immersive experience praised by the creative development community for visual fidelity and lightweight execution.',
    reflection:
      'Recriar o passado técnico me ensinou que limitações históricas de hardware geravam soluções visuais geniais. Trazer essa essência para o código moderno enriquece qualquer interface.',
    reflection_en:
      'Rebuilding historical technical constraints revealed how hardware limits inspired brilliant visual solutions. Bringing that essence to modern front-end elevates UI design.',
    contentBlocks: [
      {
        _type: 'dividerStatement',
        eyebrow: '01 // ESTÉTICA ANALÓGICA & RETROCOMPUTAÇÃO',
        eyebrow_en: '01 // ANALOG AESTHETICS & RETROCOMPUTING',
        statement: 'A textura do fósforo e a rigidez do monospace criam um foco que interfaces planas não conseguem replicar.',
        statement_en: 'Phosphor textures and monospace rigor command a level of focus flat interfaces cannot replicate.',
        alignment: 'left',
        theme: 'dark',
      },
      {
        _type: 'laggedFullViewportMedia',
        image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo.jpg`,
        headline: 'Terminal de Transmissão Científica',
        headline_en: 'Scientific Data Transmission Terminal',
        caption: 'Simulação de shaders GLSL de CRT com aberração cromática sutil e scanlines.',
        caption_en: 'GLSL CRT shader simulation with subtle chromatic aberration and scanlines.',
        lagPreset: 'medium',
        theme: 'dark',
      },
    ],
    nextCaseSlug: 'atlanta-home-concierge',
    seo: {
      metaTitle: 'Vincenzo Data Science — Independent Study · David Salviano',
      metaTitle_en: 'Vincenzo Data Science — Independent Study · David Salviano',
      metaDescription:
        'Estudo independente de terminal CLI retrô e shaders analógicos por David Salviano.',
      metaDescription_en:
        'Independent study of retro CLI terminal physics and analog shaders by David Salviano.',
    },
  },

  'atlanta-home-concierge': {
    id: 'atlanta-home-concierge',
    slug: 'atlanta-home-concierge',
    title: 'Atlanta Home Concierge',
    projectType: 'clientProject',
    projectStatus: 'completed',
    period: '2026',
    startYear: '2026',
    endYear: '2026',
    clientOrContext: 'Atlanta Home Concierge · EUA',
    location: 'Atlanta, EUA · Remoto',
    role: 'Brand & Digital Product Designer',
    disciplines: [
      'Brand Identity',
      'UX/UI Design',
      'Motion Design',
      'Web Design',
    ],
    category: 'Brand & Digital Experience',
    tags: ['Brand Manual', 'Motion', 'Digital Assets', 'Web Concept'],
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/ahc_cape.png`,
    heroMedia: {
      mediaType: 'image',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/ahc_cape.png`,
      alt: 'Atlanta Home Concierge — Manual de Marca e Assets Digitais',
      alt_en: 'Atlanta Home Concierge — Brand Manual and Digital Assets',
      enableDiagonalHeroReveal: true,
      initialRotation: '-13',
      initialScalePreset: 'medium',
      initialHorizontalDirection: 'left',
    },
    heroSummary:
      'Manual de marca, produção de assets digitais, animações de logotipo e proposta de modernização da presença web para serviços de concierge residencial premium.',
    heroSummary_en:
      'Brand manual, digital asset production, logo motion design, and digital presence modernization concept for premium residential concierge services.',
    thesis:
      'Como traduzir a discrição e a sofisticação do atendimento concierge de alto padrão em uma identidade visual e proposta digital consistente?',
    thesis_en:
      'How to translate the discretion and sophistication of high-end concierge services into a cohesive visual identity and digital presence proposal?',
    overview:
      'Atuação como designer freelancer responsável pela consolidação da identidade visual da Atlanta Home Concierge, entregando manual de aplicação de marca, guidelines de cor e tipografia, vinhetas em motion e o conceito de interface para sua presença web.',
    overview_en:
      'Freelance engagement delivering visual identity consolidation for Atlanta Home Concierge, including brand application manual, color and typography guidelines, motion idents, and web presence concept.',
    challenge:
      'Criar uma linguagem visual que transmitisse confiança, segurança patrimonial e hospitalidade premium sem cair em clichês tradicionais do mercado imobiliário.',
    challenge_en:
      'Establishing a visual language conveying trust, asset security, and premium hospitality without falling into generic real estate design tropes.',
    responsibilities: [
      'Desenvolvimento do manual completo de marca e normas de aplicação.',
      'Direção e animação de assets em motion para apresentações e mídias sociais.',
      'Proposta de arquitetura de informação e wireframes para o site institucional.',
    ],
    responsibilities_en: [
      'Development of complete brand guidelines and usage manual.',
      'Motion design and brand animation for presentations and social media.',
      'Information architecture and wireframe concept for the institutional website.',
    ],
    solution:
      'Entrega de um sistema visual sólido com paleta cromática sofisticada, tipografia serifada contemporânea e proposta de interface minimalista e acolhedora.',
    solution_en:
      'Delivery of a robust visual identity system featuring a refined palette, contemporary serif typography, and a warm, minimalist digital interface proposal.',
    impact:
      'Padronização de todos os pontos de contato da marca e consolidação de um guia oficial de aplicação para expansão no mercado norte-americano.',
    impact_en:
      'Standardized all brand touchpoints and provided an official design system guide ready for North American market outreach.',
    reflection:
      'Trabalhar com clientes internacionais exige clareza absoluta na comunicação e na documentação. O design precisa ser autoexplicativo e fácil de aplicar por equipes remotas.',
    reflection_en:
      'Collaborating with international clients demands exceptional clarity in documentation. Design guidelines must be self-explanatory and effortlessly applicable by remote teams.',
    contentBlocks: [
      {
        _type: 'dividerStatement',
        eyebrow: '01 // IDENTIDADE VISUAL & POSICIONAMENTO',
        eyebrow_en: '01 // BRAND IDENTITY & POSITIONING',
        statement: 'A sofisticação não está no excesso de detalhes, mas na precisão do espaçamento e na sobriedade tipográfica.',
        statement_en: 'Sophistication does not stem from excessive detail, but from precise spatial rhythm and typographic restraint.',
        alignment: 'left',
        theme: 'dark',
      },
      {
        _type: 'artifactShowcase',
        artifactType: 'designSystem',
        title: 'Manual de Aplicação de Marca',
        title_en: 'Brand Application Guidelines',
        description: 'Diretrizes oficiais para uso de logotipo, zonas de proteção, paleta cromática institucional e tipografia.',
        description_en: 'Official rules for logo usage, safe zones, institutional color palettes, and typography.',
        media: `${import.meta.env.BASE_URL}assets/projects_cape/ahc_cape.png`,
        caption: 'Manual de marca AHC · Diretrizes para mídias físicas e digitais.',
        caption_en: 'AHC Brand Manual · Physical and digital media guidelines.',
      },
    ],
    nextCaseSlug: 'escutha',
    seo: {
      metaTitle: 'Atlanta Home Concierge — Client Project · David Salviano',
      metaTitle_en: 'Atlanta Home Concierge — Client Project · David Salviano',
      metaDescription:
        'Manual de marca e proposta digital para Atlanta Home Concierge por David Salviano.',
      metaDescription_en:
        'Brand manual and digital concept for Atlanta Home Concierge by David Salviano.',
    },
  },

  escutha: {
    id: 'escutha',
    slug: 'escutha',
    title: 'Escutha',
    projectType: 'clientProject',
    projectStatus: 'completed',
    period: '2026',
    startYear: '2026',
    endYear: '2026',
    clientOrContext: 'Escutha · Presença Digital',
    location: 'Brasil · Remoto',
    role: 'Product & Web Designer',
    disciplines: [
      'Product Design',
      'UX/UI Design',
      'Information Architecture',
      'Web Design',
    ],
    category: 'Digital Product & Web',
    tags: ['Web Redesign', 'Healthcare', 'UX Research', 'Information Architecture'],
    coverImage: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
    heroMedia: {
      mediaType: 'image',
      image: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
      alt: 'Escutha — Redesign e Modernização da Presença Digital',
      alt_en: 'Escutha — Digital Presence Redesign and Modernization',
      enableDiagonalHeroReveal: true,
      initialRotation: '-13',
      initialScalePreset: 'medium',
      initialHorizontalDirection: 'left',
    },
    heroSummary:
      'Redesign e modernização da presença digital com foco em clareza na comunicação, arquitetura de informação acessível e experiência humanizada.',
    heroSummary_en:
      'Redesign and modernization of digital presence focusing on communicative clarity, accessible information architecture, and a human-centered user journey.',
    thesis:
      'Como criar uma presença digital acolhedora e confiável que simplifique o agendamento e o primeiro contato em serviços de escuta e saúde?',
    thesis_en:
      'How to build a welcoming, dependable digital presence that streamlines booking and first contact in psychological and healthcare listening services?',
    overview:
      'O projeto Escutha envolveu a reestruturação completa do website institucional, melhorando o funil de contato, a legibilidade do conteúdo e a experiência em dispositivos móveis.',
    overview_en:
      'The Escutha project entailed a comprehensive institutional website overhaul, improving contact funnel conversion, content readability, and mobile responsiveness.',
    challenge:
      'Garantir que usuários em momentos de sensibilidade emocional encontrem informações de forma rápida, acolhedora e sem barreiras visuais ou técnicas.',
    challenge_en:
      'Ensuring users in moments of emotional vulnerability find essential service information quickly, warmly, and without cognitive friction.',
    responsibilities: [
      'Diagnóstico de usabilidade e análise do site anterior.',
      'Reestruturação da arquitetura de informação e hierarquia de conteúdo.',
      'Design visual de alta fidelidade e prototipagem responsiva.',
    ],
    responsibilities_en: [
      'Usability audit and legacy site friction analysis.',
      'Information architecture restructuring and content hierarchy.',
      'High-fidelity responsive UI design and interactive prototyping.',
    ],
    solution:
      'Interface limpa e empática com tipografia legível, tons suaves de contraste acessível e caminhos diretos de agendamento.',
    solution_en:
      'Clean, empathetic interface featuring high-legibility typography, calming accessible color palettes, and frictionless contact paths.',
    impact:
      'Redução do tempo de navegação até o formulário de contato e melhora expressiva na percepção de acolhimento e profissionalismo.',
    impact_en:
      'Significant reduction in time-to-contact and marked improvement in perceived warmth and professional reliability.',
    reflection:
      'Design para saúde e bem-estar não aceita ruído desnecessário. Cada elemento na tela deve acolher, informar e transmitir calma.',
    reflection_en:
      'Designing for mental healthcare leaves no room for superficial noise. Every element on the canvas must inform, comfort, and inspire confidence.',
    contentBlocks: [
      {
        _type: 'dividerStatement',
        eyebrow: '01 // EXPERIÊNCIA HUMANIZADA',
        eyebrow_en: '01 // HUMAN-CENTERED EXPERIENCE',
        statement: 'Acolhimento digital começa na eliminação de qualquer atrito desnecessário entre a pessoa e o cuidado.',
        statement_en: 'Digital empathy begins by removing every unnecessary friction point between the individual and care.',
        alignment: 'left',
        theme: 'dark',
      },
      {
        _type: 'artifactShowcase',
        artifactType: 'architecture',
        title: 'Arquitetura de Navegação & Fluxo de Contato',
        title_en: 'Navigation Architecture & Contact Flow',
        description: 'Jornada simplificada orientada à redução de ansiedade e rapidez no agendamento.',
        description_en: 'Streamlined user journey optimized for anxiety reduction and rapid scheduling.',
        media: `${import.meta.env.BASE_URL}assets/projects_cape/escutha_cape.png`,
        caption: 'Redesign da presença digital Escutha · Layout responsivo e acolhedor.',
        caption_en: 'Escutha digital redesign · Responsive and welcoming layout.',
      },
    ],
    nextCaseSlug: 'mapear',
    seo: {
      metaTitle: 'Escutha — Client Project · David Salviano',
      metaTitle_en: 'Escutha — Client Project · David Salviano',
      metaDescription:
        'Redesign e modernização da presença digital Escutha por David Salviano.',
      metaDescription_en:
        'Digital presence redesign and modernization for Escutha by David Salviano.',
    },
  },
};

export default CASE_STUDIES_DATA;
