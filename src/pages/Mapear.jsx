import { CaseStudyTemplate } from '../components/CaseStudyTemplate';
import mapearImg from '../assets/mapear.jpg';

export function Mapear() {
  return (
    <CaseStudyTemplate 
      title="Mapear Platform" 
      subtitle="An educational platform designed to empower student wisdom. The UX architecture bridges complex design systems with asynchronous integration, focused on data visualization."
      tags={['UX/UI Design', '2022-2024', 'Web App', 'Education']} 
      image={mapearImg}
      challenge="The main challenge was to organize vast amounts of educational data and geographic mappings into a cohesive, high-performance interface that doesn't overwhelm the user while maintaining a professional and clean aesthetic."
      solution="We implemented a robust design system with a focus on data clarity and modularity. The use of asynchronous loading ensured that the platform remained snappy even when handling large datasets."
      process={
        <ul className="list-disc pl-5 space-y-3 mb-6">
          <li>Extensive user research and stakeholder interviews.</li>
          <li>Development of a comprehensive and scalable Design System.</li>
          <li>Prototyping complex data visualization flows.</li>
          <li>Iterative usability testing with real users (students and educators).</li>
        </ul>
      }
    />
  );
}
