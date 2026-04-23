import { useParams, Navigate } from 'react-router-dom';
import { CaseStudyTemplate } from '../components/CaseStudyTemplate';
import { PROJECTS } from '../data/projects';

export function ProjectCase() {
  const { projectId } = useParams();
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <CaseStudyTemplate 
      title={project.title}
      subtitle={project.description}
      tags={project.tags}
      image={project.image}
      liveLink={project.liveLink || project.behance}
      challenge={project.challenge}
      solution={project.solution}
      process={
        <ul className="list-disc pl-5 space-y-3 mb-6">
          {project.process.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      }
    />
  );
}
