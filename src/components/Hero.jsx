import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ------------------------------------------------------------------ */
/*  Animation Easing Config                                            */
/* ------------------------------------------------------------------ */
const EASING = [0.22, 1, 0.36, 1];

export function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const isVideoLoadedRef = useRef(false);
  const lastTimeRef = useRef(0);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive breakpoint tracking
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(media.matches);
    const handler = (e) => setIsDesktop(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Track scroll within the 185vh hero scroll area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    isVideoLoadedRef.current = true;
    setIsVideoReady(true);
  }, []);

  // Update video currentTime based on scroll progress
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = scrollYProgress.on('change', (latestProgress) => {
      const video = videoRef.current;
      if (!video || !isVideoLoadedRef.current || isNaN(video.duration) || video.duration <= 0) {
        return;
      }

      // Clamp progress between 0 and 1
      const progress = Math.min(1, Math.max(0, latestProgress));
      const targetTime = progress * video.duration;

      // Only update if difference is meaningful (> 25ms / ~1 frame at 30-60fps) to avoid jank
      if (Math.abs(targetTime - lastTimeRef.current) < 0.025) {
        return;
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (video && !isNaN(targetTime)) {
          video.currentTime = targetTime;
          lastTimeRef.current = targetTime;
        }
      });
    });

    return () => {
      unsubscribe();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrollYProgress, prefersReducedMotion]);

  // Clean navigation helper
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('featured-work') || document.getElementById('what-i-do');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full h-[185vh] lg:h-[190vh]"
    >
      {/* Sticky Stage pinned immediately below the 88px Header */}
      <div className="sticky top-[88px] w-full h-[calc(100svh-88px)] min-h-[580px] overflow-hidden bg-[#F5F2EA]">
        
        {/* Two-Column Grid: Left (Text) ~36% / Right (Video Stage) ~64% */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[minmax(420px,36%)_1fr]">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Editorial Typography, Positioning & CTAs        */}
          {/* ============================================================ */}
          <div className="w-full h-full bg-[#F5F2EA] flex flex-col justify-center px-6 sm:px-10 lg:px-[clamp(32px,4vw,72px)] py-8 lg:py-12 relative z-10">
            <div className="w-full max-w-xl flex flex-col justify-center -translate-y-2 lg:-translate-y-4">
              
              {/* 1. Professional Label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASING }}
                className="mb-4 sm:mb-6"
              >
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#151515]/60 select-none">
                  {t('hero_label', 'PRODUCT DESIGNER • UX/UI • DESIGN SYSTEMS')}
                </span>
              </motion.div>

              {/* 2. Editorial Headline (High-Contrast Serif) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
                className="mb-5 sm:mb-6"
              >
                <h1 className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[2.85rem] xl:text-[3.25rem] font-bold leading-[1.12] tracking-tight text-[#151515]">
                  {t('hero_headline', 'Transformo complexidade em produtos que funcionam.')}
                </h1>
              </motion.div>

              {/* 3. Short Description (Clean Sans-Serif) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: EASING }}
                className="mb-8 sm:mb-10"
              >
                <p className="font-sans text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] text-[#151515]/75 leading-relaxed max-w-md">
                  {t(
                    'hero_description',
                    'Crio experiências digitais claras, escaláveis e visualmente marcantes — da estratégia ao design system e à interface final.'
                  )}
                </p>
              </motion.div>

              {/* 4. Action Area: Primary CTA + Secondary Link */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: EASING }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8"
              >
                {/* Primary CTA */}
                <a
                  href="#featured-work"
                  onClick={handleScrollToProjects}
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 font-mono text-xs font-bold tracking-widest uppercase text-[#151515] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all rounded-[1px] shadow-sm focus-visible:outline-2 focus-visible:outline-[#151515] focus-visible:outline-offset-3 cursor-pointer"
                >
                  <span>{t('hero_cta_primary', 'EXPLORAR PROJETOS →')}</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                {/* Secondary Link */}
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#151515]/70 hover:text-[#151515] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#151515] focus-visible:outline-offset-2"
                >
                  <span className="relative">
                    {t('hero_cta_secondary', 'CONHECER MINHA TRAJETÓRIA')}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#151515]/30 group-hover:bg-[#151515] transition-colors" />
                  </span>
                  <ArrowUpRight size={14} className="text-[#151515]/50 group-hover:text-[#151515] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Product Presentation Video Stage               */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASING }}
            className="w-full h-full bg-[#101010] relative overflow-hidden flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10"
          >
            {/* Scroll-Controlled Presentation Video */}
            <video
              ref={videoRef}
              playsInline
              muted
              preload="auto"
              aria-hidden="true"
              onLoadedMetadata={handleLoadedMetadata}
              poster={`${import.meta.env.BASE_URL}assets/videos/hero_poster.jpg`}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            >
              <source
                src={`${import.meta.env.BASE_URL}assets/videos/hero_showcase.webm`}
                type="video/webm"
              />
              <source
                src={`${import.meta.env.BASE_URL}assets/videos/hero_showcase.mp4`}
                type="video/mp4"
              />
            </video>

            {/* Subtle corner grid crosshair accent */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-30 select-none hidden lg:block">
              <span className="font-mono text-[9px] text-white/40 tracking-widest">SHOWCASE // 01</span>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
