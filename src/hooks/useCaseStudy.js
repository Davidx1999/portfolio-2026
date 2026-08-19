import { useState, useEffect, useCallback } from 'react';
import { sanityClient } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';
import { normalizeProject } from '../utils/normalizeProject';

/**
 * useCaseStudy
 * Hook editorial com suporte a Field-Level Internationalization e Composição Modular.
 * Busca o documento canônico único pelo slug e normaliza todos os campos e contentBlocks.
 */
export function useCaseStudy(slug) {
  const { locale, language } = useLanguage();
  const [caseStudy, setCaseStudy] = useState(null);
  const [nextCase, setNextCase] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCaseStudy = useCallback(async () => {
    if (!slug) {
      setCaseStudy(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const activeLocale = locale || (language === 'pt' ? 'pt-BR' : 'en');

    try {
      // 1. Busca o documento canônico único pelo slug compartilhado
      const query = `*[_type == "project" && !(_id in path("drafts.**")) && (lower(slug.current) == lower($slug) || slug.current == $slug || id.current == $slug || id == $slug || _id == $slug)][0]{
        ...,
        "coverImageUrl": coverImage.asset->url,
        "reconstructImageUrl": reconstructImage.asset->url,
        "mainVisualImageUrl": mainVisual.image.asset->url,
        "mainVisualPosterUrl": mainVisual.videoPoster.asset->url,
        "heroMediaImage": heroMediaOverride.image.asset->url,
        "heroMediaPoster": heroMediaOverride.videoPoster.asset->url,
        "slug": coalesce(slug.current, id.current, id, _id),
        "nextCaseRef": nextCase->{
          title,
          "slug": coalesce(slug.current, id.current, id, _id),
          category,
          shortDescription,
          heroSummary,
          "coverImageUrl": coverImage.asset->url,
          "mainVisualImageUrl": mainVisual.image.asset->url
        }
      }`;

      // 2. Consulta todos os projetos para o índice e navegação
      const allProjectsQuery = `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, _createdAt desc){
        title,
        "slug": coalesce(slug.current, id.current, id, _id),
        category,
        shortDescription,
        heroSummary,
        "coverImageUrl": coverImage.asset->url,
        "mainVisualImageUrl": mainVisual.image.asset->url
      }`;

      const [sanityProject, allSanityProjects] = await Promise.all([
        sanityClient.fetch(query, { slug }),
        sanityClient.fetch(allProjectsQuery),
      ]);

      if (sanityProject) {
        const normalized = normalizeProject(sanityProject, activeLocale);
        setCaseStudy(normalized);

        // Resolução do próximo case
        if (Array.isArray(allSanityProjects) && allSanityProjects.length > 0) {
          setTotalProjects(allSanityProjects.length);
          const currentIdx = allSanityProjects.findIndex((p) => p.slug === slug);
          setCurrentIndex(currentIdx >= 0 ? currentIdx + 1 : 1);

          const rawNext = sanityProject.nextCaseRef;
          if (rawNext) {
            setNextCase(normalizeProject(rawNext, activeLocale));
          } else {
            const nextIdx = currentIdx >= 0 && currentIdx < allSanityProjects.length - 1 ? currentIdx + 1 : 0;
            const autoNext = allSanityProjects[nextIdx];
            if (autoNext) {
              setNextCase(normalizeProject(autoNext, activeLocale));
            } else {
              setNextCase(null);
            }
          }
        }
      } else {
        setCaseStudy(null);
        setNextCase(null);
      }
    } catch (err) {
      console.error('❌ [Sanity Query Error in useCaseStudy]:', err);
      setError(err);
      setCaseStudy(null);
      setNextCase(null);
    } finally {
      setLoading(false);
    }
  }, [slug, locale, language]);

  useEffect(() => {
    fetchCaseStudy();
  }, [fetchCaseStudy]);

  return {
    caseStudy,
    nextCase,
    currentIndex,
    totalProjects,
    loading,
    error,
    refetch: fetchCaseStudy,
  };
}

export default useCaseStudy;
