import { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';

export function useAbout() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAbout() {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "aboutPage"][0]{
            ...,
            "resumeFileUrl": resumeFile.asset->url
          }`
        );
        if (data && isMounted) {
          setAboutData({
            ...data,
            portraitUrl: data.portrait ? urlFor(data.portrait).url() : null,
            resumeUrl: data.resumeFileUrl || data.resumeUrl || null,
          });
        }
      } catch (err) {
        console.warn('Could not fetch aboutPage from Sanity, using built-in defaults:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAbout();

    return () => {
      isMounted = false;
    };
  }, []);

  return { aboutData, loading };
}
