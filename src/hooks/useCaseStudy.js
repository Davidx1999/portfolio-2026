import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { PROJECTS as staticProjects } from '../data/projects';

export function useCaseStudy(slug) {
  const [caseStudy, setCaseStudy] = useState(null);
  const [nextCase, setNextCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCaseStudy = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fallbackLocal =
      CASE_STUDIES_DATA[slug] ||
      staticProjects.find((p) => p.id === slug || p.slug === slug);

    try {
      // Query single project by slug.current OR legacy id
      const query = `*[_type == "project" && (slug.current == $slug || id.current == $slug || id == $slug || _id == $slug)][0]{
        ...,
        "coverImageUrl": coverImage.asset->url,
        "heroMediaImage": heroMedia.image.asset->url,
        "heroMediaPoster": heroMedia.poster.asset->url,
        "nextCaseRef": nextCase->{
          title,
          "slug": coalesce(slug.current, id.current, id, _id),
          projectType,
          heroSummary,
          heroSummary_en,
          description,
          "coverImage": coverImage.asset->url,
          "image": image.asset->url
        }
      }`;

      // Query all published projects for automatic next project resolution
      const allProjectsQuery = `*[_type == "project" && published != false] | order(_createdAt desc){
        title,
        "slug": coalesce(slug.current, id.current, id, _id),
        projectType,
        heroSummary,
        heroSummary_en,
        description,
        "coverImage": coverImage.asset->url,
        "image": image.asset->url
      }`;

      const [sanityProject, allSanityProjects] = await Promise.all([
        sanityClient.fetch(query, { slug }),
        sanityClient.fetch(allProjectsQuery),
      ]);

      if (sanityProject) {
        // Resolve images within contentBlocks
        const rawBlocks =
          Array.isArray(sanityProject.contentBlocks) && sanityProject.contentBlocks.length > 0
            ? sanityProject.contentBlocks
            : fallbackLocal?.contentBlocks || [];

        const resolvedBlocks = rawBlocks.map((block) => {
          if (block._type === 'diagonalMediaScene' && block.media) {
            return { ...block, media: urlFor(block.media) };
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

        const normalizedProject = {
          ...fallbackLocal,
          ...sanityProject,
          slug: sanityProject.slug?.current || sanityProject.id || slug,
          title: sanityProject.title || fallbackLocal?.title,
          coverImage: sanityProject.coverImageUrl || urlFor(sanityProject.coverImage) || fallbackLocal?.coverImage,
          heroMedia: {
            mediaType: sanityProject.heroMedia?.mediaType || fallbackLocal?.heroMedia?.mediaType || 'image',
            image: sanityProject.heroMediaImage || urlFor(sanityProject.heroMedia?.image) || fallbackLocal?.heroMedia?.image,
            videoUrl: sanityProject.heroMedia?.videoUrl || fallbackLocal?.heroMedia?.videoUrl,
            poster: sanityProject.heroMediaPoster || urlFor(sanityProject.heroMedia?.poster) || fallbackLocal?.heroMedia?.poster,
            alt: sanityProject.heroMedia?.alt || fallbackLocal?.heroMedia?.alt || sanityProject.title,
            alt_en: sanityProject.heroMedia?.alt_en || fallbackLocal?.heroMedia?.alt_en || sanityProject.title,
            autoplay: sanityProject.heroMedia?.autoplay ?? true,
            enableDiagonalHeroReveal:
              sanityProject.heroMedia?.enableDiagonalHeroReveal ??
              fallbackLocal?.heroMedia?.enableDiagonalHeroReveal ??
              true,
            initialRotation: sanityProject.heroMedia?.initialRotation || fallbackLocal?.heroMedia?.initialRotation || '-13',
            initialScalePreset: sanityProject.heroMedia?.initialScalePreset || fallbackLocal?.heroMedia?.initialScalePreset || 'medium',
            initialHorizontalDirection: sanityProject.heroMedia?.initialHorizontalDirection || fallbackLocal?.heroMedia?.initialHorizontalDirection || 'left',
            heroScrollLength: sanityProject.heroMedia?.heroScrollLength || fallbackLocal?.heroMedia?.heroScrollLength || 'medium',
          },
          heroSummary: sanityProject.heroSummary || sanityProject.description || fallbackLocal?.heroSummary,
          heroSummary_en: sanityProject.heroSummary_en || fallbackLocal?.heroSummary_en,
          thesis: sanityProject.thesis || fallbackLocal?.thesis,
          thesis_en: sanityProject.thesis_en || fallbackLocal?.thesis_en,
          overview: sanityProject.overview || fallbackLocal?.overview,
          overview_en: sanityProject.overview_en || fallbackLocal?.overview_en,
          challenge: sanityProject.challenge || fallbackLocal?.challenge,
          challenge_en: sanityProject.challenge_en || fallbackLocal?.challenge_en,
          responsibilities:
            Array.isArray(sanityProject.responsibilities) && sanityProject.responsibilities.length > 0
              ? sanityProject.responsibilities
              : fallbackLocal?.responsibilities || [],
          responsibilities_en:
            Array.isArray(sanityProject.responsibilities_en) && sanityProject.responsibilities_en.length > 0
              ? sanityProject.responsibilities_en
              : fallbackLocal?.responsibilities_en || [],
          solution: sanityProject.solution || fallbackLocal?.solution,
          solution_en: sanityProject.solution_en || fallbackLocal?.solution_en,
          impact: sanityProject.impact || fallbackLocal?.impact,
          impact_en: sanityProject.impact_en || fallbackLocal?.impact_en,
          reflection: sanityProject.reflection || fallbackLocal?.reflection,
          reflection_en: sanityProject.reflection_en || fallbackLocal?.reflection_en,
          contentBlocks: resolvedBlocks,
          disciplines:
            Array.isArray(sanityProject.disciplines) && sanityProject.disciplines.length > 0
              ? sanityProject.disciplines
              : fallbackLocal?.disciplines || ['Product Design', 'UX/UI Design', 'Design Systems'],
          projectType: sanityProject.projectType || fallbackLocal?.projectType || 'professionalProject',
          projectStatus: sanityProject.projectStatus || fallbackLocal?.projectStatus || 'completed',
          period: sanityProject.period || sanityProject.year || fallbackLocal?.period || '2021—2026',
          clientOrContext: sanityProject.clientOrContext || sanityProject.context || fallbackLocal?.clientOrContext || 'FGV DGPE · CEnPE / UFC',
          role: sanityProject.role || fallbackLocal?.role || 'Lead Product Designer',
          externalUrl: sanityProject.externalUrl || sanityProject.liveLink || fallbackLocal?.externalUrl,
        };

        setCaseStudy(normalizedProject);

        // Next project resolution
        if (sanityProject.nextCaseRef) {
          setNextCase(sanityProject.nextCaseRef);
        } else if (Array.isArray(allSanityProjects) && allSanityProjects.length > 0) {
          const currentIdx = allSanityProjects.findIndex((p) => p.slug === slug);
          const nextIdx = currentIdx >= 0 && currentIdx < allSanityProjects.length - 1 ? currentIdx + 1 : 0;
          setNextCase(allSanityProjects[nextIdx]);
        }
      } else if (fallbackLocal) {
        setCaseStudy(fallbackLocal);

        // Local next project fallback
        const nextSlug = fallbackLocal.nextCaseSlug || 'aula-f75';
        const fallbackNext = CASE_STUDIES_DATA[nextSlug] || staticProjects.find((p) => p.id === nextSlug);
        if (fallbackNext) {
          setNextCase({
            title: fallbackNext.title,
            slug: fallbackNext.slug || fallbackNext.id,
            projectType: fallbackNext.projectType,
            heroSummary: fallbackNext.heroSummary || fallbackNext.description,
            heroSummary_en: fallbackNext.heroSummary_en,
            coverImage: fallbackNext.coverImage || fallbackNext.image,
          });
        }
      } else {
        setCaseStudy(null);
      }
    } catch (err) {
      console.warn('Could not fetch case from Sanity, falling back to static local data:', err);
      setError(err);
      if (fallbackLocal) {
        setCaseStudy(fallbackLocal);
        const nextSlug = fallbackLocal.nextCaseSlug || 'aula-f75';
        const fallbackNext = CASE_STUDIES_DATA[nextSlug] || staticProjects.find((p) => p.id === nextSlug);
        if (fallbackNext) {
          setNextCase({
            title: fallbackNext.title,
            slug: fallbackNext.slug || fallbackNext.id,
            projectType: fallbackNext.projectType,
            heroSummary: fallbackNext.heroSummary || fallbackNext.description,
            heroSummary_en: fallbackNext.heroSummary_en,
            coverImage: fallbackNext.coverImage || fallbackNext.image,
          });
        }
      } else {
        setCaseStudy(null);
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCaseStudy();
  }, [fetchCaseStudy]);

  return {
    caseStudy,
    nextCase,
    loading,
    error,
    refetch: fetchCaseStudy,
  };
}

export default useCaseStudy;
