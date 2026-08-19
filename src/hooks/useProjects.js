import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';
import { resolveField } from '../utils/i18nField';

/**
 * useProjects
 * Hook orientado ao Sanity com arquitetura Field-Level i18n.
 * Busca documentos canônicos publicados e resolve campos para o idioma ativo com fallback universal em inglês.
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

      const query = `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, orderRank asc, _createdAt desc){
        ...,
        "mainVisualImageUrl": mainVisual.image.asset->url,
        "mainVisualPosterUrl": mainVisual.videoPoster.asset->url,
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
          
          // Resolução de Mídia Unificada (Visual Principal -> legado)
          const mainImg = p.mainVisualImageUrl || (p.mainVisual?.image ? urlFor(p.mainVisual.image).url() : null);
          const finalImg = mainImg || p.finalImageUrl || (p.finalImage ? urlFor(p.finalImage).url() : null) || p.imageUrl || (p.image ? urlFor(p.image).url() : null) || p.coverImageUrl || (p.coverImage ? urlFor(p.coverImage).url() : null);
          const processImg = p.processImageUrl || (p.processImage ? urlFor(p.processImage).url() : null) || finalImg;
          const coverImg = mainImg || p.coverImageUrl || (p.coverImage ? urlFor(p.coverImage).url() : null) || finalImg;

          // Resolução de Campos Textuais com Fallback
          const rawTitle = p.title;
          const displayTitle = resolveField(rawTitle, activeLocale) || (typeof rawTitle === 'string' ? rawTitle : 'Untitled Project');
          
          const rawDesc = p.shortDescription || p.heroSummary || p.overview || p.description;
          const displayDesc = resolveField(rawDesc, activeLocale);

          const rawCategory = p.category || p.context;
          const displayCategory = resolveField(rawCategory, activeLocale) || (language === 'pt' ? 'Design de Produto' : 'Product Design');

          const rawRole = p.role;
          const displayRole = resolveField(rawRole, activeLocale) || 'Product Designer';

          const rawAlt = p.mainVisual?.alt || p.alt;
          const displayAlt = resolveField(rawAlt, activeLocale) || displayTitle;

          return {
            ...p,
            id: projectSlug,
            slug: projectSlug,
            title: displayTitle,
            shortDescription: displayDesc,
            description: displayDesc,
            category: displayCategory,
            role: displayRole,
            period: p.period || p.year || '',
            context: p.clientOrContext || p.context || displayCategory,
            alt: displayAlt,
            image: finalImg,
            processImage: processImg,
            finalImage: finalImg,
            coverImage: coverImg,
            videoUrl: p.mainVisual?.videoUrl || p.videoUrl || null,
            videoPoster: p.mainVisualPosterUrl || coverImg,
            featured: p.featuredOnHome ?? p.featured ?? false,
            featuredOnHome: p.featuredOnHome ?? p.featured ?? false,
            featuredOrder: p.featuredOrder ?? p.orderRank ?? 99,
            tags: Array.isArray(p.disciplines) && p.disciplines.length > 0 ? p.disciplines : (Array.isArray(p.tags) ? p.tags : []),
            process: Array.isArray(p.processSteps) ? p.processSteps.map((s) => resolveField(s, activeLocale)) : (Array.isArray(p.process) ? p.process : []),
            translationStatus: p.translationStatus || 'original',
          };
        });
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
