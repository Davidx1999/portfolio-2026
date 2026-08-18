import { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';

export function useAbout() {
  const [aboutData, setAboutData] = useState(null);
  const [brandingProjects, setBrandingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAbout() {
      try {
        const [data, brandingData] = await Promise.all([
          sanityClient.fetch(
            `*[_type == "aboutPage"][0]{
              ...,
              "resumeFileUrl": resumeFile.asset->url
            }`
          ),
          sanityClient.fetch(
            `*[_type == "project" && published != false && (showInAbout == true || category match "Brand*" || category match "Identidade*")] | order(aboutOrder asc, orderRank asc, _createdAt desc)[0...3]{
              _id,
              title,
              "slug": slug.current,
              clientOrContext,
              category,
              period,
              heroSummary,
              heroSummary_en,
              overview,
              overview_en,
              coverImage,
              cardCoverImage,
              tags
            }`
          ),
        ]);

        if (isMounted) {
          if (data) {
            setAboutData({
              ...data,
              portraitUrl: data.portrait ? urlFor(data.portrait).url() : null,
              resumeUrl: data.resumeFileUrl || data.resumeUrl || null,
              lattesUrl: data.lattesUrl || 'http://lattes.cnpq.br/2300088312341296',
            });
          }

          if (Array.isArray(brandingData)) {
            const formattedBranding = brandingData.map((item) => ({
              id: item._id,
              slug: item.slug,
              title: item.title,
              area: item.category || 'Identidade Visual',
              context: item.heroSummary || item.overview || item.clientOrContext || '',
              context_en: item.heroSummary_en || item.overview_en || item.clientOrContext || '',
              imageUrl: item.cardCoverImage
                ? urlFor(item.cardCoverImage).width(800).url()
                : item.coverImage
                ? urlFor(item.coverImage).width(800).url()
                : null,
              tag: item.tags?.[0] || 'BRANDING',
            }));
            setBrandingProjects(formattedBranding);
          }
        }
      } catch (err) {
        console.warn('Could not fetch aboutPage or brandingProjects from Sanity:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAbout();

    return () => {
      isMounted = false;
    };
  }, []);

  return { aboutData, brandingProjects, loading };
}
