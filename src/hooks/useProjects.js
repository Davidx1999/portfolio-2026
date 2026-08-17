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
        const formattedProjects = sanityProjects.map((p) => {
          const staticMatch = staticProjects.find(sp => sp.id === (p.id?.current || p.id));
          return {
            ...staticMatch,
            ...p,
            id: typeof p.id === 'object' && p.id?.current ? p.id.current : (p.id || p._id),
            image: p.image ? urlFor(p.image) : (staticMatch?.image || null),
            processImage: p.processImage ? urlFor(p.processImage) : (staticMatch?.processImage || staticMatch?.imageHover || null),
            finalImage: p.finalImage ? urlFor(p.finalImage) : (staticMatch?.finalImage || p.image ? urlFor(p.image) : staticMatch?.image || null),
            coverImage: p.coverImage ? urlFor(p.coverImage) : (staticMatch?.coverImage || null),
            imageHover: p.imageHover ? urlFor(p.imageHover) : (staticMatch?.imageHover || null),
            role: p.role || staticMatch?.role || 'Product Designer',
            period: p.period || staticMatch?.period || p.year || '2024',
            context: p.context || staticMatch?.context || p.category || 'Digital Product',
            alt: p.alt || staticMatch?.alt || p.title || 'Project showcase',
            featured: p.featured ?? staticMatch?.featured ?? false,
            featuredOnHome: p.featuredOnHome ?? staticMatch?.featuredOnHome ?? p.featured ?? staticMatch?.featured ?? false,
            featuredOrder: p.featuredOrder ?? staticMatch?.featuredOrder ?? p.orderRank ?? 99,
            tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : (staticMatch?.tags || []),
            process: Array.isArray(p.process) && p.process.length > 0 ? p.process : (staticMatch?.process || []),
          };
        });
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

  // Up to 3 featured projects for Home scene, sorted by featuredOrder
  const featuredProjects = projects
    .filter((p) => p.featuredOnHome || p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 3);

  return {
    projects,
    playgroundProjects,
    allWork,
    featuredProjects,
    loading,
    error,
    refetch: fetchProjects,
  };
}
