import { CaseStudyTemplate } from '../components/CaseStudyTemplate';
import vincenzoImg from '../assets/vincenzo.jpg';
import { ExternalLink, Sparkles } from 'lucide-react';

export function Vincenzo() {
  return (
    <CaseStudyTemplate 
      title="Vincenzo Data Science" 
      subtitle="Estudo independente de laboratório com arquitetura de terminal CLI retrô dos anos 80 e visualização matricial de dados."
      tags={['Estudo Independente', 'Terminal CLI', 'Big Data', 'Laboratório']} 
      image={`${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_cape.png`}
      liveLink={`${import.meta.env.BASE_URL}vincenzosite/teste.html`}
      challenge="Este projeto foi desenvolvido como um estudo independente e experimento de laboratório para investigar interfaces densas inspiradas em terminais dos anos 80, combinando streaming de dados, padrões de cimática e visualização de grafos."
      solution={
        <div className="space-y-6">
          <p>
            Desenvolvimento de um simulador de terminal CLI com navegação por teclado e modos interativos de visualização matemática:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href={`${import.meta.env.BASE_URL}vincenzosite/teste.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-primary text-neutral-branco font-mono font-bold rounded-xl uppercase tracking-widest text-[10px] hover:bg-[#7b6db8] transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              Acessar Simulador de Terminal <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}vincenzosite/portfolio_hero_cimatics.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-tertiary text-neutral-carvao font-mono font-bold rounded-xl uppercase tracking-widest text-[10px] hover:bg-[#b0c82f] transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              Experiência Cimática <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      }
      process={
        <ul className="list-disc pl-5 space-y-3 mb-6">
          <li>Concepção tipográfica e estética de terminal monoespaçado.</li>
          <li>Engenharia de CLI para navegação e comandos interativos.</li>
          <li>Visualização matricial e renderização de patterns de áudio/cimática.</li>
          <li>Ergonomia visual de alto contraste e performance web.</li>
        </ul>
      }
    />
  );
}

