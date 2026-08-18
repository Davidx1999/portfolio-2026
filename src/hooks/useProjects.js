import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';

/**
 * useProjects
 * Hook orientado ao Sanity.io com suporte à localização document-level ($locale).
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
      // 1. Busca projetos no locale ativo (ex: 'pt-BR' ou 'en')
      const targetLocale = locale || (language === 'pt' ? 'pt-BR' : 'en');
      const query = `*[_type == "project" && published != false && (language == $targetLocale || (!defined(language) && $targetLocale == "en"))] | order(featuredOrder asc, orderRank asc, _createdAt desc){
        ...,
        "coverImageUrl": coverImage.asset->url,
        "imageUrl": image.asset->url,
        "processImageUrl": processImage.asset->url,
        "finalImageUrl": finalImage.asset->url,
        "slug": coalesce(slug.current, id.current, id, _id)
      }`;

      let sanityProjects = await sanityClient.fetch(query, { targetLocale });

      // Se nenhum projeto for retornado no idioma solicitado e não estivermos em 'en', busca a versão 'en' com flag de tradução pendente
      if ((!Array.isArray(sanityProjects) || sanityProjects.length === 0) && targetLocale !== 'en') {
        const fallbackQuery = `*[_type == "project" && published != false && (language == "en" || !defined(language))] | order(featuredOrder asc, orderRank asc, _createdAt desc){
          ...,
          "coverImageUrl": coverImage.asset->url,
          "imageUrl": image.asset->url,
          "processImageUrl": processImage.asset->url,
          "finalImageUrl": finalImage.asset->url,
          "slug": coalesce(slug.current, id.current, id, _id)
        }`;
        const fallbackProjects = await sanityClient.fetch(fallbackQuery);
        if (Array.isArray(fallbackProjects) && fallbackProjects.length > 0) {
          sanityProjects = fallbackProjects.map((p) => ({
            ...p,
            translationStatus: 'missing',
          }));
        }
      }

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
