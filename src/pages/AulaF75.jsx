import { CaseStudyTemplate } from '../components/CaseStudyTemplate';

export function AulaF75() {
  return (
    <CaseStudyTemplate 
      title="Aula F75" 
      subtitle="Estudo independente de aplicação de vibe coding, vídeo no scroll e experiência interativa de hardware."
      tags={['Estudo Independente', 'Vibe Coding', 'Vídeo no Scroll', '2024']} 
      image={`${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`}
      liveLink="https://davidx1999.github.io/f75-site-test-2/#features"
      challenge="O objetivo deste estudo independente foi explorar a aplicação de vibe coding e a sincronização precisa de vídeo de alta fidelidade no scroll da página, traduzindo a tatilidade e a acústica de hardware mecânico para a web moderna."
      solution="Construção de uma interface interativa com vídeo indexado a quadros por rolagem, microinterações táteis e feedback sonoro imersivo mantendo 60fps constantes."
      process={
        <ul className="list-disc pl-5 space-y-3 mb-6">
          <li>Prototipagem rápida e interativa com vibe coding.</li>
          <li>Otimização e decodificação de vídeo para rolagem contínua a 60fps.</li>
          <li>Microinterações táteis e simulação acústica com Framer Motion.</li>
          <li>Validação responsiva e ergonomia visual em dispositivos móveis e desktop.</li>
        </ul>
      }
    />
  );
}
