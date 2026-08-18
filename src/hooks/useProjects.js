import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';

/**
 * useProjects
 * Hook orientado exclusivamente ao Sanity.io.
 * Sem fallbacks silenciosos ou dados estáticos mockados.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Busca apenas projetos publicados
      const query = `*[_type == "project" && published != false] | order(featuredOrder asc, orderRank asc, _createdAt desc){
        ...,
        "coverImageUrl": coverImage.asset->url,
        "imageUrl": image.asset->url,
        "processImageUrl": processImage.asset->url,
        "finalImageUrl": finalImage.asset->url,
        "slug": coalesce(slug.current, id.current, id, _id)
      }`;

      const sanityProjects = await sanityClient.fetch(query);

      if (Array.isArray(sanityProjects) && sanityProjects.length > 0) {
        const formatted = sanityProjects.map((p) => {
          const projectSlug = typeof p.slug === 'object' && p.slug?.current ? p.slug.current : (p.slug || p.id || p._id);
          const finalImg = p.finalImageUrl || (p.finalImage ? urlFor(p.finalImage) : null) || p.imageUrl || (p.image ? urlFor(p.image) : null) || p.coverImageUrl || (p.coverImage ? urlFor(p.coverImage) : null);
          const processImg = p.processImageUrl || (p.processImage ? urlFor(p.processImage) : null) || (p.imageHover ? urlFor(p.imageHover) : null) || finalImg;
          const coverImg = p.coverImageUrl || (p.coverImage ? urlFor(p.coverImage) : null) || finalImg;

          return {
            ...p,
            id: projectSlug,
            slug: projectSlug,
            title: p.title || 'Untitled Project',
            category: p.category || p.context || 'Product Design',
            role: p.role || 'Product Designer',
            period: p.period || p.year || '',
            context: p.context || p.clientOrContext || p.category || '',
            alt: p.alt || p.title || 'Project showcase',
            image: p.imageUrl || (p.image ? urlFor(p.image) : null) || finalImg,
            processImage: processImg,
            finalImage: finalImg,
            coverImage: coverImg,
            featured: p.featured ?? false,
            featuredOnHome: p.featuredOnHome ?? p.featured ?? false,
            featuredOrder: p.featuredOrder ?? p.orderRank ?? 99,
            tags: Array.isArray(p.tags) ? p.tags : [],
            process: Array.isArray(p.process) ? p.process : [],
          };
        });
        setProjects(formatted);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.warn('Erro ao carregar projetos do Sanity:', err);
      setError(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allWork = projects;

  // Até 3 projetos em destaque para a Home, ordenados por featuredOrder
  const featuredProjects = projects
    .filter((p) => p.featuredOnHome || p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 3);

  return {
    projects,
    allWork,
    featuredProjects,
    loading,
    error,
    refetch: fetchProjects,
  };
}

export default useProjects;
