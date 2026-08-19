import { useState, useEffect, useCallback } from 'react';
import { sanityClient } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';
import { normalizeProject } from '../utils/normalizeProject';

/**
 * useProjects
 * Hook orientado ao Sanity Studio com arquitetura Field-Level i18n e composição modular.
 * Busca documentos canônicos publicados e normaliza campos com separação estrita entre
 * coverImage (estado inicial) e reconstructImage (estado final).
 */
export function useProjects() {
  const { locale, language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const activeLocale = locale || (language === 'pt' ? 'pt-BR' : 'en');

      const query = `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, _createdAt desc){
        ...,
        "coverImageUrl": coverImage.asset->url,
        "reconstructImageUrl": reconstructImage.asset->url,
        "mainVisualImageUrl": mainVisual.image.asset->url,
        "mainVisualPosterUrl": mainVisual.videoPoster.asset->url,
        "heroMediaImage": heroMediaOverride.image.asset->url,
        "heroMediaPoster": heroMediaOverride.videoPoster.asset->url,
        "slug": coalesce(slug.current, id.current, id, _id)
      }`;

      const sanityProjects = await sanityClient.fetch(query);

      if (Array.isArray(sanityProjects) && sanityProjects.length > 0) {
        const formatted = sanityProjects.map((p) => normalizeProject(p, activeLocale));
        setProjects(formatted);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('❌ [Sanity Query Error in useProjects]:', err);
      setError(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [locale, language]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allWork = projects;

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
