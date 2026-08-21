import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';
import { SmartVideoPlayer } from '../../common/SmartVideoPlayer';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CasePrototypeVideo
 * Bloco de vídeo de protótipo de alta performance orientado pelo Sanity CMS.
 * - Suporte a arquivos (.mp4, .webm, .mov) e links de plataformas (YouTube, Vimeo, Loom, Google Drive)
 * - Carregamento sob demanda com poster e sem tela preta
 * - Micro-controles discretos no hover
 */
export function CasePrototypeVideo({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block) return null;

  const videoSrc =
    block.videoUrl ||
    block.videoFile ||
    block.externalVideo ||
    block.video ||
    block.url ||
    block.media;

  if (!videoSrc) return null;

  const posterSrc = block.poster;
  const title = resolveLocalized(language === 'en' && block.title_en ? block.title_en : block.title, language);
  const shortDescription =
    resolveLocalized(language === 'en' && block.shortDescription_en ? block.shortDescription_en : block.shortDescription, language);
  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const isLight = block.theme === 'light';
  const shouldLoop = block.loop ?? true;
  const showBorder = block.showBorder ?? block.hasBorder ?? true;

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

  return (
    <section
      aria-label={title || 'Demonstração em Vídeo'}
      className={`w-full py-16 md:py-24 border-b ${
        isLight
          ? 'bg-[#FAFAF7] text-[#10110F] border-[#10110F]/10'
          : 'bg-[#10110F] text-[#FAFAF7] border-[rgba(244,243,238,0.14)]'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Cabeçalho Editorial do Bloco */}
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
            className={`relative w-full ${aspectClass} rounded-[18px] md:rounded-[24px] overflow-hidden ${
              showBorder
                ? `border ${isLight ? 'border-[#10110F]/15 bg-[#E8E7E0]' : 'border-[rgba(244,243,238,0.18)] bg-[#151613]'} shadow-2xl`
                : 'border-0 bg-transparent'
            } group`}
          >
            <SmartVideoPlayer
              src={videoSrc}
              poster={posterSrc}
              autoplay={block.autoplay ?? true}
              muted={true}
              loop={shouldLoop}
              showControls={true}
              title={caption || title || 'Demonstração em Vídeo'}
              className="w-full h-full"
            />
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

