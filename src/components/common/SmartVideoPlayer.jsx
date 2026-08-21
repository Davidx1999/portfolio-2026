import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { parseVideoSource, resolveFileUrl } from '../../utils/mediaUtils';

/**
 * SmartVideoPlayer
 * Componente unificado e de alta performance para reprodução de vídeos:
 * - Arquivos de vídeo direto (.mp4, .webm, .mov, local e Sanity CDN)
 * - Links de plataformas externas (YouTube, Vimeo, Loom, Google Drive)
 * - Autoplay resiliente (com mute e playsInline)
 * - Poster com transição suave sem telas pretas
 * - Micro-controles discretos em hover
 */
export function SmartVideoPlayer({
  src,
  poster,
  autoplay = true,
  muted = true,
  loop = true,
  className = '',
  showControls = true,
  title = 'Vídeo',
  onReady,
  objectFit = 'cover',
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Normaliza e resolve a URL do vídeo
  const resolvedUrl = resolveFileUrl(src);
  const videoInfo = parseVideoSource(resolvedUrl);

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
    onReady?.();
  }, [onReady]);

  // Autoplay resiliente para arquivos de vídeo direto
  useEffect(() => {
    if (videoInfo?.type !== 'direct') return;

    const video = videoRef.current;
    if (!video) return;

    if (autoplay) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay bloqueado pelo navegador até interação do usuário
            setIsPlaying(false);
          });
      }
    }
  }, [autoplay, isMuted, videoInfo?.type, resolvedUrl]);

  if (!videoInfo) {
    if (poster) {
      return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return null;
  }

  // Reprodução via Embed de Plataforma (YouTube, Vimeo, Loom, Google Drive)
  if (videoInfo.type !== 'direct') {
    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden bg-transparent ${className}`}
      >
        <iframe
          src={videoInfo.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0 block"
        />
      </div>
    );
  }

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-transparent group ${className}`}
    >
      {/* Elemento de Vídeo HTML5 */}
      <video
        ref={videoRef}
        src={videoInfo.src}
        poster={poster}
        autoPlay={autoplay}
        muted={isMuted}
        loop={loop}
        playsInline
        preload="metadata"
        onLoadedData={handleVideoReady}
        onCanPlay={handleVideoReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={`w-full h-full block ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        }`}
      />

      {/* Poster Fallback com Fade Out ao Carregar */}
      {poster && !isVideoReady && (
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500"
          style={{ opacity: isVideoReady ? 0 : 1 }}
        />
      )}

      {/* Micro-controles flutuantes em hover */}
      {showControls && (
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
      )}
    </div>
  );
}

export default SmartVideoPlayer;
