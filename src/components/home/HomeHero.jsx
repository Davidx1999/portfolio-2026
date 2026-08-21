import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppReady } from '../../context/AppReadyContext';
import { RollingButton } from '../RollingButton';
import { useLanguage } from '../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];
const CLIP_EASING = [0.77, 0, 0.175, 1];
const VIDEO_REVEAL_DELAY = 500;

export function HomeHero() {
  const { t } = useTranslation(['home', 'common']);
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const { isAppReady } = useAppReady();

  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [shouldRevealVideo, setShouldRevealVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Track when the <video> element has enough data to display a frame
  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const togglePlayPause = (e) => {
    e?.stopPropagation?.();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Attach listeners on mount | handles both fresh-load and cached video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      setIsVideoReady(true);
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleVideoReady, { once: true });
    video.addEventListener('canplay', handleVideoReady, { once: true });
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoReady);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [handleVideoReady]);

  // Coordinate the video reveal: wait for isAppReady + isVideoReady
  useEffect(() => {
    if (!isAppReady || !isVideoReady) return;

    const timer = setTimeout(() => {
      setShouldRevealVideo(true);
    }, VIDEO_REVEAL_DELAY);

    return () => clearTimeout(timer);
  }, [isAppReady, isVideoReady]);


  return (
    <section className="relative w-full min-h-[100svh] pt-24 pb-14 sm:pb-16 lg:pt-28 lg:pb-12 flex flex-col justify-between bg-[#F1F0EB] text-[#111210] select-none border-b border-[rgba(17,18,16,0.1)]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-12 lg:gap-16 items-center">

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
                {t('home:hero_label', 'PRODUCT DESIGNER • UX/UI • DESIGN SYSTEMS')}
              </span>
            </motion.div>

            {/* Headline Editorial (Serif de Alto Contraste) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -18 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
              className="mb-5 sm:mb-6"
            >
              <h1 className="font-serif text-[1.95rem] xs:text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-[#111210]">
                {t('home:hero_headline', 'I turn complexity into clear, memorable digital products.')}
              </h1>
            </motion.div>

            {/* Descrição Curta (Sans-Serif Limpa) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.32, ease: EASING }}
              className="mb-7 sm:mb-10"
            >
              <p className="font-sans text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] text-[#111210]/80 leading-relaxed max-w-md">
                {t(
                  'home:hero_description',
                  'Strategy, UX/UI, and design systems for companies that need to transform complex ideas into consistent, scalable, and intuitive digital experiences.'
                )}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
              animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASING }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6"
            >
              {/* CTA Principal em Verde Ácido -> Navega para Work */}
              <RollingButton
                variant="primary"
                size="lg"
                to={`/${language}/work`}
                icon={<ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />}
              >
                {t('home:hero_cta_primary', 'EXPLORE PROJECTS')}
              </RollingButton>

              {/* Ação Secundária -> Navega para Let's Talk */}
              <RollingButton
                variant="secondary"
                size="md"
                to={`/${language}/contact`}
                icon={<ArrowUpRight size={14} className="text-[#8B8B85] group-hover:text-[#111210] transition-colors" />}
              >
                {t('home:hero_cta_secondary', "LET'S TALK")}
              </RollingButton>
            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* LADO DIREITO: Container de Vídeo com Clip-Path Top-Down      */}
          {/* ============================================================ */}
          <div className="w-full flex items-center justify-end">
            <div
              role="button"
              tabIndex={0}
              onClick={togglePlayPause}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  togglePlayPause(e);
                }
              }}
              className="w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden relative cursor-pointer group/videocard focus-visible:outline-2 focus-visible:outline-[#C7F000] select-none"
              aria-label={
                isPlaying
                  ? language === 'en'
                    ? 'Pause process video'
                    : 'Pausar vídeo de processo'
                  : language === 'en'
                    ? 'Play process video'
                    : 'Reproduzir vídeo de processo'
              }
            >
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

              {/* Botão de Controle Sutil e Apenas com Ícone */}
              {shouldRevealVideo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20"
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#10110F]/60 hover:bg-[#10110F]/85 backdrop-blur-md border border-white/12 hover:border-white/25 text-[#FAFAF7]/80 group-hover/videocard:text-[#FAFAF7] hover:!text-[#C7F000] shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
                    title={isPlaying ? (language === 'en' ? 'Pause' : 'Pausar') : (language === 'en' ? 'Play' : 'Reproduzir')}
                  >
                    {isPlaying ? (
                      <Pause size={14} className="fill-current" />
                    ) : (
                      <Play size={14} className="fill-current ml-0.5 text-[#C7F000]" />
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HomeHero;
