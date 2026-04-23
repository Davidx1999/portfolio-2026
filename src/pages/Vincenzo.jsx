import { CaseStudyTemplate } from '../components/CaseStudyTemplate';
import vincenzoImg from '../assets/vincenzo.jpg';
import { ExternalLink, Sparkles } from 'lucide-react';

export function Vincenzo() {
  return (
    <CaseStudyTemplate 
      title="Vincenzo Data Science" 
      subtitle="A high-exclusivity interactive portfolio built on stretched architecture and an 80s-inspired shell terminal simulator, integrating matrix visualization for Big Data."
      tags={['Interface Engineering', '2023', 'Retro Terminal', 'Data Science']} 
      image={vincenzoImg}
      liveLink={`${import.meta.env.BASE_URL}vincenzosite/teste.html`}
      challenge="The goal was to create a digital environment that felt like a secret terminal from the 80s, but with modern performance and the ability to visualize massive data streams in an artistic way. The user needed to feel the 'weight' of the data."
      solution={
        <div className="space-y-6">
          <p>
            I engineered a custom terminal simulator using React and Framer Motion. The project features two distinct interactive modes:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href={`${import.meta.env.BASE_URL}vincenzosite/teste.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-zinc-100 text-zinc-900 font-semibold rounded-xl uppercase tracking-widest text-xs hover:bg-white transition-all inline-flex items-center justify-center gap-2"
            >
              Access Data Scientist World <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}vincenzosite/portfolio_hero_cimatics.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-transparent text-green-400 border border-green-800 font-semibold rounded-xl uppercase tracking-widest text-xs hover:bg-green-950 hover:border-green-500 transition-all inline-flex items-center justify-center gap-2"
            >
              Cymatics Experience <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      }
      process={
        <ul className="list-disc pl-5 space-y-3 mb-6">
          <li>Conceptualizing the 80s Cyberpunk aesthetic.</li>
          <li>Building a custom command-line interface (CLI) for navigation.</li>
          <li>Optimizing heavy SVG and Canvas visualizations for web performance.</li>
          <li>Creating a unique 'stretched' typographic system for a premium feel.</li>
        </ul>
      }
    />
  );
}

