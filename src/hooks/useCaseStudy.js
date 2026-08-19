import { useState, useEffect, useCallback } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';
import { resolveField } from '../utils/i18nField';

/**
 * useCaseStudy
 * Hook editorial com suporte a Field-Level Internationalization.
 * Busca o documento canônico único pelo slug e resolve os campos para o idioma ativo.
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
        "slug": coalesce(slug.current, id.current, id, _id),
        "mainVisualImageUrl": mainVisual.image.asset->url,
        "mainVisualPosterUrl": mainVisual.videoPoster.asset->url,
        "coverImageUrl": coverImage.asset->url,
        "heroMediaImage": heroMediaOverride.image.asset->url,
        "heroMediaPoster": heroMediaOverride.videoPoster.asset->url,
        "nextCaseRef": nextCase->{
          title,
          "slug": coalesce(slug.current, id.current, id, _id),
          projectType,
          caseDepth,
          eyebrow,
          heroEyebrow,
          heroSummary,
          shortDescription,
          "mainVisualImageUrl": mainVisual.image.asset->url,
          "coverImage": coverImage.asset->url,
          "image": image.asset->url
        }
      }`;

      // 2. Consulta todos os projetos para o índice e navegação
      const allProjectsQuery = `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, orderRank asc, _createdAt desc){
        title,
        "slug": coalesce(slug.current, id.current, id, _id),
        projectType,
        caseDepth,
        eyebrow,
        heroEyebrow,
        heroSummary,
        shortDescription,
        "mainVisualImageUrl": mainVisual.image.asset->url,
        "coverImage": coverImage.asset->url,
        "image": image.asset->url
      }`;

      const [sanityProject, allSanityProjects] = await Promise.all([
        sanityClient.fetch(query, { slug }),
        sanityClient.fetch(allProjectsQuery),
      ]);

      if (sanityProject) {
        // Resolução de Mídias
        const mainImg = sanityProject.mainVisualImageUrl || (sanityProject.mainVisual?.image ? urlFor(sanityProject.mainVisual.image).url() : null);
        const fallbackImg = mainImg || sanityProject.coverImageUrl || (sanityProject.coverImage ? urlFor(sanityProject.coverImage).url() : null);
        const heroImg = sanityProject.heroMediaImage || (sanityProject.heroMediaOverride?.image ? urlFor(sanityProject.heroMediaOverride.image).url() : null) || fallbackImg;

        // Resolução dos blocos modulares
        const rawBlocks = Array.isArray(sanityProject.contentBlocks) ? sanityProject.contentBlocks : [];
        const resolvedBlocks = rawBlocks.map((block) => {
          if (!block || typeof block !== 'object') return block;

          const blockImg = block.image ? urlFor(block.image).url() : null;
          const blockSecImg = block.secondaryImage ? urlFor(block.secondaryImage).url() : null;

          return {
            ...block,
            eyebrow: resolveField(block.eyebrow, activeLocale),
            title: resolveField(block.title, activeLocale),
            subtitle: resolveField(block.subtitle, activeLocale),
            body: resolveField(block.body, activeLocale),
            caption: resolveField(block.caption, activeLocale),
            alt: resolveField(block.alt, activeLocale),
            secondaryCaption: resolveField(block.secondaryCaption, activeLocale),
            imageUrl: blockImg,
            secondaryImageUrl: blockSecImg,
            topics: Array.isArray(block.topics)
              ? block.topics.map((t) => ({
                  title: resolveField(t.title, activeLocale),
                  content: resolveField(t.content, activeLocale),
                }))
              : [],
            decisions: Array.isArray(block.decisions)
              ? block.decisions.map((d) => ({
                  challenge: resolveField(d.challenge, activeLocale),
                  decision: resolveField(d.decision, activeLocale),
                  impact: resolveField(d.impact, activeLocale),
                  artifactCaption: resolveField(d.artifactCaption, activeLocale),
                }))
              : [],
          };
        });

        // Resolução dos Textos Principais do Case
        const displayTitle = resolveField(sanityProject.title, activeLocale) || (typeof sanityProject.title === 'string' ? sanityProject.title : 'Untitled Project');
        const displayHeroEyebrow = resolveField(sanityProject.heroEyebrow || sanityProject.eyebrow, activeLocale);
        const displayHeroHeadline = resolveField(sanityProject.heroHeadline, activeLocale) || displayTitle;
        const displayHeroSummary = resolveField(sanityProject.heroSummary || sanityProject.shortDescription || sanityProject.overview, activeLocale);
        const displayShortDesc = resolveField(sanityProject.shortDescription || sanityProject.heroSummary, activeLocale);
        const displayOverview = resolveField(sanityProject.overview || sanityProject.overview_en, activeLocale);
        const displayContext = resolveField(sanityProject.context || sanityProject.clientOrContext, activeLocale);
        const displayChallenge = resolveField(sanityProject.challenge || sanityProject.challenge_en, activeLocale);
        const displaySolution = resolveField(sanityProject.solutionSummary || sanityProject.solution || sanityProject.solution_en, activeLocale);
        const displayImpact = resolveField(sanityProject.impact || sanityProject.impact_en, activeLocale);
        const displayLearnings = resolveField(sanityProject.learnings, activeLocale);
        const displayLimitations = resolveField(sanityProject.limitations, activeLocale);
        const displayNextSteps = resolveField(sanityProject.nextSteps, activeLocale);
        const displayReflection = resolveField(sanityProject.finalReflection || sanityProject.reflection || sanityProject.reflection_en, activeLocale);

        const rawResp = sanityProject.responsibilities || sanityProject.responsibilities_en;
        const displayResponsibilities = Array.isArray(rawResp)
          ? rawResp.map((r) => resolveField(r, activeLocale)).filter(Boolean)
          : [];

        const rawSteps = sanityProject.processSteps || sanityProject.process;
        const displayProcessSteps = Array.isArray(rawSteps)
          ? rawSteps.map((s) => resolveField(s, activeLocale)).filter(Boolean)
          : [];

        const rawDeliverables = sanityProject.deliverables;
        const displayDeliverables = Array.isArray(rawDeliverables)
          ? rawDeliverables.map((d) => resolveField(d, activeLocale)).filter(Boolean)
          : [];

        const normalizedProject = {
          ...sanityProject,
          caseDepth: sanityProject.caseDepth || 'full',
          eyebrow: displayHeroEyebrow,
          heroEyebrow: displayHeroEyebrow,
          slug: sanityProject.slug || slug,
          title: displayTitle,
          heroHeadline: displayHeroHeadline,
          heroSummary: displayHeroSummary,
          shortDescription: displayShortDesc,
          overview: displayOverview,
          context: displayContext,
          challenge: displayChallenge,
          solution: displaySolution,
          impact: displayImpact,
          learnings: displayLearnings,
          limitations: displayLimitations,
          nextSteps: displayNextSteps,
          reflection: displayReflection,
          responsibilities: displayResponsibilities,
          processSteps: displayProcessSteps,
          deliverables: displayDeliverables,
          contentBlocks: resolvedBlocks,
          coverImage: fallbackImg,
          heroMedia: {
            mediaType: sanityProject.heroMediaOverride?.videoUrl || sanityProject.mainVisual?.videoUrl ? 'video' : 'image',
            image: heroImg,
            videoUrl: sanityProject.heroMediaOverride?.videoUrl || sanityProject.mainVisual?.videoUrl || null,
            poster: sanityProject.heroMediaPoster || (sanityProject.heroMediaOverride?.videoPoster ? urlFor(sanityProject.heroMediaOverride.videoPoster).url() : fallbackImg),
            alt: resolveField(sanityProject.mainVisual?.alt || sanityProject.alt, activeLocale) || displayTitle,
            autoplay: true,
          },
          disciplines: Array.isArray(sanityProject.disciplines) ? sanityProject.disciplines : (Array.isArray(sanityProject.tags) ? sanityProject.tags : []),
          projectType: sanityProject.projectType || 'professionalProject',
          projectStatus: sanityProject.projectStatus || 'completed',
          period: sanityProject.period || sanityProject.year || '',
          duration: sanityProject.duration || null,
          clientOrContext: sanityProject.clientOrContext || displayContext || '',
          role: resolveField(sanityProject.role, activeLocale) || 'Product Designer',
          translationStatus: sanityProject.translationStatus || 'original',
        };

        setCaseStudy(normalizedProject);

        // Resolução do próximo case
        if (Array.isArray(allSanityProjects) && allSanityProjects.length > 0) {
          setTotalProjects(allSanityProjects.length);
          const currentIdx = allSanityProjects.findIndex((p) => p.slug === slug);
          setCurrentIndex(currentIdx >= 0 ? currentIdx + 1 : 1);

          const rawNext = sanityProject.nextCaseRef;
          if (rawNext) {
            setNextCase({
              ...rawNext,
              title: resolveField(rawNext.title, activeLocale),
              shortDescription: resolveField(rawNext.shortDescription || rawNext.heroSummary, activeLocale),
              eyebrow: resolveField(rawNext.heroEyebrow || rawNext.eyebrow, activeLocale),
              coverImage: rawNext.mainVisualImageUrl || rawNext.coverImage || rawNext.image,
            });
          } else {
            const nextIdx = currentIdx >= 0 && currentIdx < allSanityProjects.length - 1 ? currentIdx + 1 : 0;
            const autoNext = allSanityProjects[nextIdx];
            if (autoNext) {
              setNextCase({
                ...autoNext,
                title: resolveField(autoNext.title, activeLocale),
                shortDescription: resolveField(autoNext.shortDescription || autoNext.heroSummary, activeLocale),
                eyebrow: resolveField(autoNext.heroEyebrow || autoNext.eyebrow, activeLocale),
                coverImage: autoNext.mainVisualImageUrl || autoNext.coverImage || autoNext.image,
              });
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
