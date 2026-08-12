import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { PROJECTS as staticProjects } from '../data/projects';
import { PLAYGROUND_PROJECTS as staticPlayground } from '../data/playground';

export function useProjects() {
  const [projects, setProjects] = useState(staticProjects);
  const [playgroundProjects, setPlaygroundProjects] = useState(staticPlayground);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Query for main projects & playground projects
      const [sanityProjects, sanityPlayground] = await Promise.all([
        sanityClient.fetch(`*[_type == "project"] | order(_createdAt desc)`),
        sanityClient.fetch(`*[_type == "playgroundProject"] | order(_createdAt desc)`),
      ]);

      // Format main projects
      if (Array.isArray(sanityProjects) && sanityProjects.length > 0) {
        const formattedProjects = sanityProjects.map((p) => ({
          ...p,
          id: typeof p.id === 'object' && p.id?.current ? p.id.current : (p.id || p._id),
          image: p.image ? urlFor(p.image) : (staticProjects.find(sp => sp.id === (p.id?.current || p.id))?.image || null),
          imageHover: p.imageHover ? urlFor(p.imageHover) : (staticProjects.find(sp => sp.id === (p.id?.current || p.id))?.imageHover || null),
          tags: Array.isArray(p.tags) ? p.tags : [],
          process: Array.isArray(p.process) ? p.process : [],
        }));
        setProjects(formattedProjects);
      } else {
        setProjects(staticProjects);
      }

      // Format playground projects
      if (Array.isArray(sanityPlayground) && sanityPlayground.length > 0) {
        const formattedPlayground = sanityPlayground.map((p) => ({
          ...p,
          id: typeof p.id === 'object' && p.id?.current ? p.id.current : (p.id || p._id),
          image: p.image ? urlFor(p.image) : (staticPlayground.find(sp => sp.id === (p.id?.current || p.id))?.image || null),
          tags: Array.isArray(p.tags) ? p.tags : [],
          process: Array.isArray(p.process) ? p.process : [],
        }));
        setPlaygroundProjects(formattedPlayground);
      } else {
        setPlaygroundProjects(staticPlayground);
      }
    } catch (err) {
      console.error('Failed to fetch projects from Sanity:', err);
      setError(err);
      // Fallback to static data on fetch error
      setProjects(staticProjects);
      setPlaygroundProjects(staticPlayground);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allWork = [...projects];

  return {
    projects,
    playgroundProjects,
    allWork,
    loading,
    error,
    refetch: fetchProjects,
  };
}
