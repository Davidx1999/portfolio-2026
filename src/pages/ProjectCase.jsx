import { useParams, Navigate } from 'react-router-dom';
import { CaseStudyTemplate } from '../components/CaseStudyTemplate';
import { PROJECTS } from '../data/projects';
import { FocuslyCase } from './FocuslyCase';
import { PlaygroundProjectDetail } from './PlaygroundProjectDetail';
import { PLAYGROUND_PROJECTS } from '../data/playground';

export function ProjectCase() {
  const { projectId } = useParams();

  if (projectId === 'focusly') {
    return <FocuslyCase />;
  }

  const isPlayground = PLAYGROUND_PROJECTS.some(p => p.id === projectId);
  if (isPlayground) {
    return <PlaygroundProjectDetail />;
  }

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
