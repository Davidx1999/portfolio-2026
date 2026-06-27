import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Compass, Layout, Sparkles, Grid, Asterisk, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextButton } from './Buttons';
import { useLanguage } from '../context/LanguageContext';

// ---------- Frame-sequence config ----------
const TOTAL_FRAMES = 100;
const FRAME_BASE = `${import.meta.env.BASE_URL}assets/videos/scroll_frames/frame_`;

/** Build zero-padded filename: frame_0001.jpg … frame_0100.jpg */
function frameSrc(index) {
  return `${FRAME_BASE}${String(index).padStart(4, '0')}.jpg`;
}
// -------------------------------------------

const services = [
  {
    number: "01",
    title: "Strategy",
    description: "I turn loose ideas into direction, structure and visual priorities.",
    icon: Compass
  },
  {
    number: "02",
    title: "Interface",
    description: "I design screens, flows and components with clarity and consistency.",
    icon: Layout
  },
  {
    number: "03",
    title: "Motion",
    description: "I create microinteractions that guide navigation without getting in the way.",
    icon: Sparkles
  },
  {
    number: "04",
    title: "System",
    description: "I organize colors, typography, components and patterns so the experience can scale.",
    icon: Grid
  }
];

export function WhatIDo() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);      // HTMLImageElement[]
  const rafRef = useRef(null);
  const currentFrameRef = useRef(0); // avoid redundant redraws
  const [isDesktop, setIsDesktop] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  // ---------- Responsive breakpoint ----------
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // ---------- Preload all frames ----------
  useEffect(() => {
    let cancelled = false;
    const images = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loaded++;
        if (!cancelled && loaded === TOTAL_FRAMES) {
          framesRef.current = images;
          setFramesReady(true);
          // Paint first frame immediately
          drawFrame(0);
        }
      };
      images.push(img);
    }

    return () => { cancelled = true; };
  }, []);

  // ---------- Draw a frame onto the canvas ----------
  function drawFrame(index) {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    // Match canvas internal resolution to the image
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0);
  }

  // ---------- Scroll tracking ----------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // On desktop the video occupies the first 60% of scroll, rest is for FeaturedWork overlap
  const frameProgress = useTransform(scrollYProgress, (value) => {
    if (isDesktop) {
      return Math.min(1, Math.max(0, value / 0.6));
    }
    return value;
  });

  // Paint the correct frame on scroll
  useMotionValueEvent(frameProgress, "change", (latest) => {
    if (!framesReady) return;
    const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest * (TOTAL_FRAMES - 1))));

    // Skip if already showing this frame
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(index));
  });

  // Cleanup
  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ---------- Animated values ----------
  const asteriskRotate = useTransform(frameProgress, [0, 1], [0, 360]);
  const progressWidth = useTransform(frameProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative lg:h-[350vh] h-auto overflow-visible p-0 m-0 border-t border-neutral-branco/10 z-[1]"
      style={{
        backgroundColor: '#171717',
        '--color-foreground': '#fbf9f6',
        '--color-background': '#171717'
      }}
    >
      {/* Sticky Wrapper — pins to viewport while section scrolls behind */}
      <div
        className="lg:sticky lg:top-0 lg:h-screen w-full flex flex-col justify-center py-16 lg:py-0"
        style={{
          '--color-foreground': '#fbf9f6',
          '--color-background': '#171717'
        }}
      >
        {/* Layout Grid */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 px-4 md:px-[calc(16%-24px)] h-full lg:py-8">

          {/* Left Column: Heading, Description and Services (col-span-5) */}
          <div className="w-full flex flex-col gap-6 lg:gap-12 lg:col-span-5 lg:h-full lg:justify-end lg:py-6 pt-24 lg:pt-28">

            {/* Top of Section: Asterisk, Title, and Description */}
            <div className="flex flex-col gap-6 lg:gap-4">
              {/* Scroll progress asterisk and line indicator */}
              <div className="flex items-center gap-4 mb-2 lg:mb-1">
                <motion.div style={{ rotate: asteriskRotate }} className="text-[var(--color-tertiary)] flex-shrink-0">
                  <Asterisk size={24} className="stroke-[3]" />
                </motion.div>
                <div className="w-24 h-[3px] bg-neutral-branco/10 relative rounded-full overflow-hidden">
                  <motion.div
                    style={{ width: progressWidth }}
                    className="h-full bg-[var(--color-primary)] absolute left-0 top-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:gap-1.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-branco/45">
                  {t('what_i_do_tag')}
                </span>
                <h1 className="font-sans text-[2.5rem] md:text-[3.5rem] lg:text-[2.25rem] xl:text-[2.5rem] font-light leading-[1.1] tracking-tighter text-neutral-branco">
                  <span className="font-black">{t('what_i_do_title')}</span>
                </h1>
              </div>

              <p className="font-sans text-body-base lg:text-sm text-neutral-branco/80 max-w-sm leading-relaxed mt-2 lg:mt-0">
                {t('what_i_do_description')}
              </p>
            </div>

            {/* Bottom of Section: Services List (the 4 points) with padding and Contact Button */}
            <div className="flex flex-col gap-6 lg:gap-4 mt-6 lg:mt-0 lg:pb-2">
              {/* Services List */}
              <div className="w-full flex flex-col gap-2">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.number}
                      className="flex items-center justify-between py-3.5 px-4 bg-neutral-branco/[0.02] border border-neutral-branco/10 rounded-[1px] relative cursor-default"
                    >
                      <div className="flex items-start gap-4 md:gap-5 lg:gap-3">
                        <span className="font-mono text-sm lg:text-xs font-bold text-neutral-branco/40 mt-1 lg:mt-0.5">
                          {service.number}
                        </span>
                        <div className="w-10 h-10 lg:w-8 lg:h-8 flex-shrink-0 rounded-[2px] border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                          <IconComponent className="w-[18px] h-[18px] lg:w-4 lg:h-4" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col pr-4">
                          <h3 className="font-sans font-bold text-sm lg:text-xs text-neutral-branco uppercase tracking-wide">
                            {t('what_i_do_service_' + service.number + '_title')}
                          </h3>
                          <p className="font-sans text-[13px] md:text-sm lg:text-xs text-neutral-branco/75 leading-snug mt-1 lg:mt-0.5 max-w-[260px] lg:max-w-[320px]">
                            {t('what_i_do_service_' + service.number + '_desc')}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-neutral-branco/20">
                        <ArrowUpRight size={20} className="w-5 h-5 lg:w-4 lg:h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 lg:mt-4 mb-8 lg:mb-0">
                <TextButton as={Link} to="/contact" variant="secondary" className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase">
                  {t('what_i_do_cta')} <ArrowUpRight size={14} />
                </TextButton>
              </div>
            </div>
          </div>

          {/* Right Column: Scroll-Controlled Video (col-span-7) */}
          <div className="w-full lg:col-span-7 flex items-center justify-center relative min-h-[400px] lg:h-full border border-neutral-branco/10 lg:border-none bg-neutral-carvao lg:bg-transparent lg:overflow-visible overflow-hidden rounded-[2px] lg:rounded-none">

            {/* Grid lines styling (desktop only) */}
            <div className="hidden lg:grid absolute inset-0 grid-cols-2 grid-rows-2 pointer-events-none opacity-50 z-0">
              <div className="border-b border-r border-neutral-branco/10" />
              <div className="border-b border-neutral-branco/10" />
              <div className="border-r border-neutral-branco/10" />
              <div className="" />
            </div>

            {/* Corner ornaments */}
            {/* Corner ornaments */}
            <div className="hidden lg:flex absolute top-0 left-0 -translate-x-[168px] w-32 h-32 bg-[var(--color-semantic-yellow)] z-0 items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-neutral-branco/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-neutral-branco/30 flex items-center justify-center">
                  <div className="w-2 h-2 border border-neutral-branco/50" />
                </div>
              </div>
              <div className="absolute w-full h-[1px] bg-neutral-branco/30" />
              <div className="absolute h-full w-[1px] bg-neutral-branco/30" />
            </div>
            <div className="hidden lg:block absolute bottom-0 left-0 w-32 h-24 bg-[var(--color-secondary)] z-0 mix-blend-screen opacity-80" />

            {/* The scroll-controlled canvas (frame sequence) */}
            <div className="relative z-10 w-full max-w-full lg:max-w-none p-4 lg:py-0 lg:px-4">
              {/* Crosshair corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-branco/30 -translate-y-4" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neutral-branco/30 -translate-y-4" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neutral-branco/30 translate-y-4" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-branco/30 translate-y-4" />

              <div className="relative overflow-hidden rounded-[2px] shadow-sm">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-[2px]"
                  style={{
                    aspectRatio: '41 / 27',
                    opacity: framesReady ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                />
                {/* Inset shadow overlay to blend borders with the background */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_20px_#171717] rounded-[2px]" />

                {/* Placeholder while frames load */}
                {!framesReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/5 rounded-[2px]">
                    <div className="w-8 h-8 border-2 border-neutral-branco/20 border-t-neutral-branco/60 rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
