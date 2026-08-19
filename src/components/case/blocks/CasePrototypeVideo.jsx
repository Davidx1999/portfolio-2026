import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CasePrototypeVideo
 * Bloco de vídeo de protótipo de alta performance orientado pelo Sanity CMS.
 * - IntersectionObserver: autoplay ao entrar na viewport e pausa ao sair
 * - Carregamento sob demanda com poster e sem tela preta
 * - Muted, playsInline, loop configurável
 * - Respeita prefers-reduced-motion e economia de dados
 * - Micro-controles discretos no hover
 */
export function CasePrototypeVideo({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Check Data Saver
  const isSaveData =
    typeof navigator !== 'undefined' &&
    navigator.connection &&
    navigator.connection.saveData === true;

  const shouldAutoplay = block?.autoplay ?? true;
  const canAutoplay = shouldAutoplay && !prefersReducedMotion && !isSaveData;

  // IntersectionObserver to control playback & on-demand loading
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            if (videoRef.current && canAutoplay) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => {
                    // Autoplay prevented by browser policy
                    setIsPlaying(false);
                  });
              }
            }
          } else {
            setIsInViewport(false);
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { rootMargin: '100px 0px', threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canAutoplay]);

  if (!block || (!block.videoUrl && !block.videoFile && !block.externalVideo)) {
    return null;
  }

  const videoSrc = block.videoUrl || block.videoFile || block.externalVideo;
  const posterSrc = block.poster;
  const title = resolveLocalized(language === 'en' && block.title_en ? block.title_en : block.title, language);
  const shortDescription =
    resolveLocalized(language === 'en' && block.shortDescription_en ? block.shortDescription_en : block.shortDescription, language);
  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const isLight = block.theme === 'light';
  const shouldLoop = block.loop ?? true;

  // Aspect ratio classes
  const aspectClass =
    block.aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : block.aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : block.aspectRatio === '21/9'
      ? 'aspect-[21/9]'
      : block.aspectRatio === '9/16'
      ? 'aspect-[9/16] max-w-sm mx-auto'
      : 'aspect-[16/9]';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section
      ref={containerRef}
      aria-label={title || 'Demonstração em Vídeo'}
      className={`w-full py-16 md:py-24 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Cabeçalho Editorial do Bloco (quando houver título ou descrição) */}
        {(title || shortDescription) && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASING }}
            className="max-w-3xl mb-8 md:mb-10"
          >
            {title && (
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-3">
                {title}
              </h3>
            )}
            {shortDescription && (
              <p className={`font-sans text-sm sm:text-base ${isLight ? 'text-[#10110F]/75' : 'text-[#F4F3EE]/75'} leading-relaxed`}>
                {shortDescription}
              </p>
            )}
          </motion.div>
        )}

        {/* Player de Vídeo com Frame Limpo e Poster */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="w-full"
        >
          <div
            className={`relative w-full ${aspectClass} rounded-[18px] md:rounded-[24px] overflow-hidden border ${
              isLight ? 'border-[#10110F]/15 bg-[#E8E7E0]' : 'border-[rgba(244,243,238,0.18)] bg-[#151613]'
            } shadow-2xl group`}
          >
            {/* Elemento de Vídeo */}
            <video
              ref={videoRef}
              src={isInViewport || isVideoReady ? videoSrc : undefined}
              poster={posterSrc}
              muted={isMuted}
              loop={shouldLoop}
              playsInline
              preload={canAutoplay ? 'metadata' : 'none'}
              onCanPlay={() => setIsVideoReady(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover object-center block"
            />

            {/* Poster Fallback / Loading Shield */}
            {!isVideoReady && posterSrc && (
              <img
                src={posterSrc}
                alt={caption || title || 'Poster do Vídeo'}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500"
                style={{ opacity: isVideoReady ? 0 : 1 }}
              />
            )}

            {/* Micro-controles discretos flutuantes (Hover / Foco) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-auto z-10">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                className="p-2.5 bg-[#10110F]/85 backdrop-blur-md border border-white/20 rounded-full text-white hover:text-[#C4FF00] hover:border-[#C4FF00]/40 transition-all focus-visible:outline-2 focus-visible:outline-[#C4FF00] cursor-pointer"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar áudio' : 'Silenciar áudio'}
                className="p-2.5 bg-[#10110F]/85 backdrop-blur-md border border-white/20 rounded-full text-white hover:text-[#C4FF00] hover:border-[#C4FF00]/40 transition-all focus-visible:outline-2 focus-visible:outline-[#C4FF00] cursor-pointer"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>

          {/* Legenda Técnica */}
          {caption && (
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#F4F3EE]/50 uppercase tracking-wider">
              <span>{caption}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}

export default CasePrototypeVideo;
