import { useState, useEffect } from 'react';
import { sanityClient } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';
import { normalizeProject, resolveImageUrl } from '../utils/normalizeProject';

export function useAbout() {
  const { locale, language } = useLanguage();
  const [aboutData, setAboutData] = useState(null);
  const [brandingProjects, setBrandingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const targetLocale = locale || (language === 'pt' ? 'pt-BR' : 'en');

    async function fetchAbout() {
      try {
        const [data, brandingData] = await Promise.all([
          sanityClient.fetch(
            `*[_type == "aboutPage" && !(_id in path("drafts.**")) && coalesce(language, "en") == $targetLocale][0]{
              ...,
              "resumeFileUrl": resumeFile.asset->url
            }`,
            { targetLocale }
          ),
          sanityClient.fetch(
            `*[_type == "project" && !(_id in path("drafts.**")) && published != false] | order(featuredOrder asc, _createdAt desc)[0...3]{
              ...,
              "slug": coalesce(slug.current, id.current, id, _id),
              "coverImageUrl": coverImage.asset->url,
              "reconstructImageUrl": reconstructImage.asset->url,
              "mainVisualImageUrl": mainVisual.image.asset->url
            }`
          ),
        ]);

        if (isMounted) {
          if (data) {
            setAboutData({
              ...data,
              portraitUrl: data.portrait ? resolveImageUrl(data.portrait) : null,
              resumeUrl: data.resumeFileUrl || data.resumeUrl || null,
              lattesUrl: data.lattesUrl || 'http://lattes.cnpq.br/2300088312341296',
            });
          }

          if (Array.isArray(brandingData)) {
            const formattedBranding = brandingData.map((item) => {
              const norm = normalizeProject(item, targetLocale);
              return {
                id: norm.id,
                slug: norm.slug,
                title: norm.title,
                area: norm.category || (targetLocale === 'en' ? 'Brand & Visual Systems' : 'Identidade Visual & Sistemas'),
                context: norm.shortDescription || norm.clientOrContext || '',
                imageUrl: norm.reconstructImage || norm.coverImage || norm.image,
                tag: norm.tags?.[0] || 'BRANDING',
              };
            });
            setBrandingProjects(formattedBranding);
          }
        }
      } catch (err) {
        console.error('❌ [Sanity Query Error in useAbout]:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAbout();

    return () => {
      isMounted = false;
    };
  }, [locale, language]);

  return { aboutData, brandingProjects, loading };
}

export default useAbout;
