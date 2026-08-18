import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';

/**
 * useCaseStudy
 * Hook editorial orientado ao Sanity.io com suporte à localização document-level ($locale).
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

    const targetLocale = locale || (language === 'pt' ? 'pt-BR' : 'en');

    try {
      // 1. Tenta buscar o projeto no idioma exato solicitado
      const query = `*[_type == "project" && (slug.current == $slug || id.current == $slug || id == $slug || _id == $slug) && (language == $targetLocale || (!defined(language) && $targetLocale == "en"))][0]{
        ...,
        "slug": coalesce(slug.current, id.current, id, _id),
        "coverImageUrl": coverImage.asset->url,
        "heroMediaImage": heroMedia.image.asset->url,
        "heroMediaPoster": heroMedia.poster.asset->url,
        "nextCaseRef": nextCase->{
          title,
          "slug": coalesce(slug.current, id.current, id, _id),
          projectType,
          caseDepth,
          eyebrow,
          heroSummary,
          heroSummary_en,
          shortDescription,
          shortDescription_en,
          description,
          "coverImage": coverImage.asset->url,
          "image": image.asset->url
        }
      }`;

      // 2. Consulta todos os projetos para o índice do carrossel no mesmo idioma
      const allProjectsQuery = `*[_type == "project" && published != false && (language == $targetLocale || (!defined(language) && $targetLocale == "en"))] | order(featuredOrder asc, orderRank asc, _createdAt desc){
        title,
        "slug": coalesce(slug.current, id.current, id, _id),
        projectType,
        caseDepth,
        eyebrow,
        heroSummary,
        heroSummary_en,
        shortDescription,
        shortDescription_en,
        description,
        "coverImage": coverImage.asset->url,
        "image": image.asset->url
      }`;

      let [sanityProject, allSanityProjects] = await Promise.all([
        sanityClient.fetch(query, { slug, targetLocale }),
        sanityClient.fetch(allProjectsQuery, { targetLocale }),
      ]);

      // Se não encontrar o documento em pt-BR, busca a versão 'en' e marca como 'missing' para o banner editorial
      if (!sanityProject && targetLocale !== 'en') {
        const enQuery = `*[_type == "project" && (slug.current == $slug || id.current == $slug || id == $slug || _id == $slug) && (language == "en" || !defined(language))][0]{
          ...,
          "slug": coalesce(slug.current, id.current, id, _id),
          "coverImageUrl": coverImage.asset->url,
          "heroMediaImage": heroMedia.image.asset->url,
          "heroMediaPoster": heroMedia.poster.asset->url,
          "nextCaseRef": nextCase->{
            title,
            "slug": coalesce(slug.current, id.current, id, _id),
            projectType,
            caseDepth,
            eyebrow,
            heroSummary,
            heroSummary_en,
            shortDescription,
            shortDescription_en,
            description,
            "coverImage": coverImage.asset->url,
            "image": image.asset->url
          }
        }`;
        const enProject = await sanityClient.fetch(enQuery, { slug });
        if (enProject) {
          sanityProject = {
            ...enProject,
            translationStatus: 'missing',
          };
        }
      }

      if (sanityProject) {
        // Resolve blocos modulares dinamicamente
        const rawBlocks = Array.isArray(sanityProject.contentBlocks) ? sanityProject.contentBlocks : [];

        const resolvedBlocks = rawBlocks.map((block) => {
          if (!block) return block;

          if (block._type === 'prototypeVideo' && block.poster) {
            return { ...block, poster: urlFor(block.poster) };
          }

          if (block._type === 'decisionSection' && Array.isArray(block.decisions)) {
            return {
              ...block,
              decisions: block.decisions.map((dec) => ({
                ...dec,
                artifactMedia: dec.artifactMedia ? urlFor(dec.artifactMedia) : null,
              })),
            };
          }

          if (block._type === 'imageGallery' && Array.isArray(block.images)) {
            return {
              ...block,
              images: block.images.map((img) => ({
                ...img,
                image: img.image ? urlFor(img.image) : null,
              })),
            };
          }

          if (block._type === 'artifactMosaicScene' && Array.isArray(block.items)) {
            return {
              ...block,
              items: block.items.map((it) => ({
                ...it,
                media: it.media ? urlFor(it.media) : null,
              })),
            };
          }

          if (block._type === 'laggedFullViewportMedia') {
            return {
              ...block,
              image: block.image ? urlFor(block.image) : null,
              poster: block.poster ? urlFor(block.poster) : null,
            };
          }

          if (block._type === 'verticalMediaStack' && Array.isArray(block.items)) {
            return {
              ...block,
              items: block.items.map((it) => ({
                ...it,
                media: it.media ? urlFor(it.media) : null,
              })),
            };
          }

          if (block._type === 'fullMedia' && block.image) {
            return { ...block, image: urlFor(block.image) };
          }

          if (block._type === 'splitMedia') {
            return {
              ...block,
              mediaLeft: block.mediaLeft ? urlFor(block.mediaLeft) : null,
              mediaRight: block.mediaRight ? urlFor(block.mediaRight) : null,
            };
          }

          if (block._type === 'mediaText' && block.media) {
            return { ...block, media: urlFor(block.media) };
          }

          if (block._type === 'imageGrid' && Array.isArray(block.items)) {
            return {
              ...block,
              items: block.items.map((it) => ({
                ...it,
                image: it.image ? urlFor(it.image) : null,
              })),
            };
          }

          if (block._type === 'beforeAfter') {
            return {
              ...block,
              beforeImage: block.beforeImage ? urlFor(block.beforeImage) : null,
              afterImage: block.afterImage ? urlFor(block.afterImage) : null,
            };
          }

          if (block._type === 'artifactShowcase' && block.media) {
            return { ...block, media: urlFor(block.media) };
          }

          if (block._type === 'processSteps' && Array.isArray(block.steps)) {
            return {
              ...block,
              steps: block.steps.map((st) => ({
                ...st,
                media: st.media ? urlFor(st.media) : null,
              })),
            };
          }

          return block;
        });

        const coverImg = sanityProject.coverImageUrl || (sanityProject.coverImage ? urlFor(sanityProject.coverImage) : null);
        const heroImg = sanityProject.heroMediaImage || (sanityProject.heroMedia?.image ? urlFor(sanityProject.heroMedia.image) : null) || coverImg;

        const normalizedProject = {
          ...sanityProject,
          caseDepth: sanityProject.caseDepth || 'full',
          eyebrow: sanityProject.eyebrow || null,
          slug: sanityProject.slug || slug,
          title: sanityProject.title || 'Untitled Case Study',
          coverImage: coverImg,
          heroMedia: {
            mediaType: sanityProject.heroMedia?.mediaType || 'image',
            image: heroImg,
            videoUrl: sanityProject.heroMedia?.videoUrl || null,
            poster: sanityProject.heroMediaPoster || (sanityProject.heroMedia?.poster ? urlFor(sanityProject.heroMedia.poster) : null),
            alt: sanityProject.heroMedia?.alt || sanityProject.title,
            alt_en: sanityProject.heroMedia?.alt_en || sanityProject.title,
            autoplay: sanityProject.heroMedia?.autoplay ?? true,
          },
          shortDescription: sanityProject.shortDescription || sanityProject.heroSummary || sanityProject.description || '',
          shortDescription_en: sanityProject.shortDescription_en || sanityProject.heroSummary_en || '',
          longDescription: sanityProject.longDescription || sanityProject.overview || sanityProject.context || '',
          longDescription_en: sanityProject.longDescription_en || sanityProject.overview_en || sanityProject.context_en || '',
          heroSummary: sanityProject.heroSummary || sanityProject.description || '',
          heroSummary_en: sanityProject.heroSummary_en || '',
          thesis: sanityProject.thesis || null,
          thesis_en: sanityProject.thesis_en || null,
          overview: sanityProject.overview || null,
          overview_en: sanityProject.overview_en || null,
          challenge: sanityProject.challenge || null,
          challenge_en: sanityProject.challenge_en || null,
          responsibilities: Array.isArray(sanityProject.responsibilities) ? sanityProject.responsibilities : [],
          responsibilities_en: Array.isArray(sanityProject.responsibilities_en) ? sanityProject.responsibilities_en : [],
          solution: sanityProject.solution || null,
          solution_en: sanityProject.solution_en || null,
          impact: sanityProject.impact || null,
          impact_en: sanityProject.impact_en || null,
          reflection: sanityProject.reflection || null,
          reflection_en: sanityProject.reflection_en || null,
          contentBlocks: resolvedBlocks,
          disciplines: Array.isArray(sanityProject.disciplines) ? sanityProject.disciplines : [],
          projectType: sanityProject.projectType || 'professionalProject',
          projectStatus: sanityProject.projectStatus || 'completed',
          period: sanityProject.period || sanityProject.year || '',
          duration: sanityProject.duration || null,
          clientOrContext: sanityProject.clientOrContext || sanityProject.context || '',
          role: sanityProject.role || '',
          externalUrl: sanityProject.externalUrl || sanityProject.liveLink || null,
        };

        setCaseStudy(normalizedProject);

        // Resolução do próximo case
        if (Array.isArray(allSanityProjects) && allSanityProjects.length > 0) {
          setTotalProjects(allSanityProjects.length);
          const currentIdx = allSanityProjects.findIndex((p) => p.slug === slug);
          setCurrentIndex(currentIdx >= 0 ? currentIdx + 1 : 1);

          if (sanityProject.nextCaseRef) {
            setNextCase(sanityProject.nextCaseRef);
          } else {
            const nextIdx = currentIdx >= 0 && currentIdx < allSanityProjects.length - 1 ? currentIdx + 1 : 0;
            setNextCase(allSanityProjects[nextIdx] || null);
          }
        } else if (sanityProject.nextCaseRef) {
          setNextCase(sanityProject.nextCaseRef);
        } else {
          setNextCase(null);
        }
      } else {
        setCaseStudy(null);
        setNextCase(null);
      }
    } catch (err) {
      console.warn('Erro ao carregar estudo de caso do Sanity:', err);
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
