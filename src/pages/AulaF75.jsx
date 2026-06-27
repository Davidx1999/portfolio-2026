import { CaseStudyTemplate } from '../components/CaseStudyTemplate';

export function AulaF75() {
  return (
    <CaseStudyTemplate 
      title="Aula F75" 
      subtitle="Interactive on-demand page for premium mechanical keyboards. Featuring high-performance video and simulated 3D rendering."
      tags={['Product Design', '2024', 'E-learning', 'Hardware']} 
      image={`${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`}
      liveLink="https://davidx1999.github.io/f75-site-test-2/#features"
      challenge="The challenge was to translate the tactile feel of a high-end mechanical keyboard into a digital experience. We needed to showcase the product's features with high-fidelity visuals without sacrificing performance."
      solution="We leveraged high-performance video backgrounds and simulated 3D rendering techniques to create an immersive 'unboxing' feel. The interface was designed to be as responsive and 'clicky' as the keyboard itself."
      process={
        <ul className="list-disc pl-5 space-y-3 mb-6">
          <li>3D modeling and lighting simulation for product shots.</li>
          <li>Video optimization for seamless background integration.</li>
          <li>Interactive gamification elements to showcase key switch tech.</li>
          <li>Mobile-first optimization for global accessibility.</li>
        </ul>
      }
    />
  );
}
