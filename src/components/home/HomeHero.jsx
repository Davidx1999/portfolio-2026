import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { useAppReady } from '../../context/AppReadyContext';

const EASING = [0.22, 1, 0.36, 1];
const CLIP_EASING = [0.77, 0, 0.175, 1]; // power3.inOut

// Delay (ms) between text animations settling and video reveal starting.
// Must be perceptible but not feel like a stall.
const VIDEO_REVEAL_DELAY = 500;

export function HomeHero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const { isAppReady } = useAppReady();

  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [shouldRevealVideo, setShouldRevealVideo] = useState(false);

  // Track when the <video> element has enough data to display a frame
  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  // Attach listeners on mount — handles both fresh-load and cached video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If the video is already loaded (cached), mark ready immediately
    if (video.readyState >= 2) {
      setIsVideoReady(true);
      return;
    }

    video.addEventListener('loadeddata', handleVideoReady, { once: true });
    video.addEventListener('canplay', handleVideoReady, { once: true });

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoReady);
    };
  }, [handleVideoReady]);

  // Coordinate the video reveal: wait for isAppReady + isVideoReady,
  // then add the intentional delay so the video enters after text is settled.
  useEffect(() => {
    if (!isAppReady || !isVideoReady) return;

    const timer = setTimeout(() => {
      setShouldRevealVideo(true);
    }, VIDEO_REVEAL_DELAY);

    return () => clearTimeout(timer);
  }, [isAppReady, isVideoReady]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('featured-work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] pt-24 lg:pt-28 flex flex-col justify-between bg-[#F1F0EB] text-[#111210] select-none border-b border-[rgba(17,18,16,0.1)]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-center">

          {/* ============================================================ */}
          {/* LADO ESQUERDO: Posicionamento, Headline & Ações              */}
          {/* ============================================================ */}
          <div className="flex flex-col justify-center max-w-xl">
            {/* Label Profissional */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASING }}
              className="mb-4 sm:mb-6"
            >
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B8B85]">
                {t('hero_label', 'PRODUCT DESIGNER • UX/UI • DESIGN SYSTEMS')}
              </span>
            </motion.div>

            {/* Headline Editorial (Serif de Alto Contraste) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -18 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
              className="mb-5 sm:mb-6"
            >
              <h1 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#111210]">
                {t('hero_headline_v2', 'Transformo complexidade em produtos digitais claros e marcantes.')}
              </h1>
            </motion.div>

            {/* Descrição Curta (Sans-Serif Limpa) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.32, ease: EASING }}
              className="mb-8 sm:mb-10"
            >
              <p className="font-sans text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] text-[#111210]/80 leading-relaxed max-w-md">
                {t(
                  'hero_description_v2',
                  'Estratégia, UX/UI e sistemas de design para empresas que precisam transformar ideias complexas em experiências consistentes, escaláveis e fáceis de usar.'
                )}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASING }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              {/* CTA Principal em Verde Ácido */}
              <a
                href="#featured-work"
                onClick={handleScrollToProjects}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#10110F] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all duration-300 rounded-[18px] shadow-sm focus-visible:outline-2 focus-visible:outline-[#111210] cursor-pointer"
              >
                <span>{t('hero_cta_primary_v2', 'EXPLORAR PROJETOS')}</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Ação Secundária */}
              <CurtainLink
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#111210] border border-[rgba(17,18,16,0.2)] hover:border-[#111210] hover:bg-[#111210]/5 transition-all duration-300 rounded-[18px] focus-visible:outline-2 focus-visible:outline-[#111210]"
              >
                <span>{t('hero_cta_secondary_v2', 'VAMOS CONVERSAR')}</span>
                <ArrowUpRight size={14} className="text-[#8B8B85] group-hover:text-[#111210] transition-colors" />
              </CurtainLink>
            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* LADO DIREITO: Container de Vídeo com Clip-Path Top-Down      */}
          {/* ============================================================ */}
          {/* Outer wrapper: transparent, only reserves layout space.
              No bg-black / bg-[#10110F] — avoids the static black rectangle. */}
          <div className="w-full flex items-start justify-center">
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden relative">
              {/* Inner wrapper: clip-path applied here so the entire visual card
                  (video + rounded corners) is clipped, not just the <video>.
                  Starts fully clipped (inset bottom 100%) so nothing shows.
                  Reveals top-down only when shouldRevealVideo is true. */}
              <motion.div
                initial={prefersReducedMotion ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
                animate={shouldRevealVideo ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(0% 0% 100% 0%)' }}
                transition={{ duration: 0.95, ease: CLIP_EASING }}
                className="w-full h-full rounded-[24px] overflow-hidden relative"
                style={{ transformOrigin: '50% 0%' }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={`${import.meta.env.BASE_URL}assets/videos/hero_poster.jpg`}
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center scale-[1.06] rounded-[24px] pointer-events-none select-none"
                >
                  <source
                    src={`${import.meta.env.BASE_URL}assets/videos/scroll_keyframe.mp4`}
                    type="video/mp4"
                  />
                </video>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HomeHero;
