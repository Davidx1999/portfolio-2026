import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const EASING = [0.22, 1, 0.36, 1];

export function CaseVideo({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(block?.autoplay ?? true);
  const [isMuted, setIsMuted] = useState(true);

  if (!block || (!block.externalVideo && !block.videoFile)) return null;

  const videoSrc = block.externalVideo || block.videoFile;
  const caption = language === 'en' && block.caption_en ? block.caption_en : block.caption;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
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

  const aspectClass =
    block.aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : block.aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : 'aspect-[16/9]';

  return (
    <section className="w-full py-12 md:py-20 border-b border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="w-full"
        >
          <div
            className={`relative w-full ${aspectClass} rounded-[18px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-2xl group`}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={block.poster}
              autoPlay={block.autoplay ?? true}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Custom Overlaid Micro Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                className="p-2.5 bg-[#10110F]/80 backdrop-blur-md border border-white/20 rounded-full text-white hover:text-[#C4FF00] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar som' : 'Silenciar vídeo'}
                className="p-2.5 bg-[#10110F]/80 backdrop-blur-md border border-white/20 rounded-full text-white hover:text-[#C4FF00] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>

          {caption && (
            <div className="mt-3.5 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#F4F3EE]/50 uppercase tracking-wider">
              <span>{caption}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseVideo;
