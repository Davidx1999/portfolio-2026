import mapearImg from '../assets/mapear.jpg';
import aulaf75Img from '../assets/aulaf75.png';
import vincenzoImg from '../assets/vincenzo.jpg';

export const PROJECTS = [
  {
    id: 'mapear',
    title: 'Mapear Platform',
    category: 'Web App',
    year: '2024',
    tags: ['UX', 'UI', 'SaaS', 'Education'],
    description: 'Advanced mapping platform to optimize real-time geographic data visualization and routing with high precision.',
    image: mapearImg,
    featured: true,
    rating: '4.9',
    badge: 'Enterprise',
    challenge: 'The main challenge was to organize vast amounts of educational data and geographic mappings into a cohesive interface.',
    solution: 'We implemented a robust design system with a focus on data clarity and modularity.',
    process: [
      'Extensive user research.',
      'Development of a scalable Design System.',
      'Prototyping complex flows.',
      'Usability testing.'
    ]
  },
  {
    id: 'aula-f75',
    title: 'Aula F75',
    category: 'E-learning',
    year: '2024',
    tags: ['3D', 'Motion', 'Hardware'],
    description: 'Redesign of the online learning experience, elevating engagement through gamification and immersive interface.',
    image: aulaf75Img,
    featured: true,
    rating: '5.0',
    badge: 'Guest Favorite',
    liveLink: 'https://davidx1999.github.io/f75-site-test-2/#features',
    challenge: 'Translating the tactile feel of a high-end mechanical keyboard into a digital experience.',
    solution: 'Leveraging high-performance video backgrounds and simulated 3D rendering.',
    process: [
      '3D modeling and lighting simulation.',
      'Video optimization.',
      'Interactive gamification.',
      'Mobile-first optimization.'
    ]
  },
  {
    id: 'vincenzo',
    title: 'Vincenzo Data Science',
    category: 'Interface Engineering',
    year: '2023',
    tags: ['Terminal', 'React', 'Big Data'],
    description: 'High-exclusivity interactive portfolio with 80s terminal simulation.',
    image: vincenzoImg,
    featured: false,
    challenge: 'Creating a digital environment that felt like a secret terminal from the 80s.',
    solution: 'Engineered a custom terminal simulator using React and Framer Motion.',
    process: [
      'Conceptualizing the Cyberpunk aesthetic.',
      'Building a custom CLI.',
      'Optimizing visualizations.',
      'Creating a unique typographic system.'
    ]
  },
  {
    id: 'ui-ux-study',
    title: 'UI/UX Study Case',
    category: 'UI · UX Design',
    year: '2024',
    tags: ['UI', 'UX', 'Research'],
    description: 'Complete study case exploring user flows, wireframes, and high-fidelity prototyping.',
    featured: false,
    challenge: 'Exploring the full lifecycle of a digital product.',
    solution: 'A systematic approach to design problems.',
    process: [
      'User journey mapping.',
      'Low-fidelity wireframing.',
      'High-fidelity UI design.',
      'Interactive prototyping.'
    ]
  },
  {
    id: 'cenpe-platform',
    title: 'CEnPE Platform',
    category: 'Product Design',
    year: '2024',
    tags: ['Product', 'UI', 'Platform'],
    description: 'Enterprise platform design for the FGV Center for Entrepreneurship and New Projects.',
    featured: false,
    challenge: 'Designing a professional platform for entrepreneurs.',
    solution: 'A modular layout for customization.',
    process: [
      'Competitive analysis.',
      'Information architecture.',
      'Component-based development.',
      'Accessibility audit.'
    ]
  }
];
