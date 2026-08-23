import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Layers, FileText, GitBranch, Layout } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { resolveLocalized } from '../../../utils/i18nField';

const EASING = [0.22, 1, 0.36, 1];

export function CaseArtifactShowcase({ block }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!block || !block.media) return null;

  const title = resolveLocalized(language === 'en' && block.title_en ? block.title_en : block.title, language);
  const description = resolveLocalized(language === 'en' && block.description_en ? block.description_en : block.description, language);
  const caption = resolveLocalized(language === 'en' && block.caption_en ? block.caption_en : block.caption, language);
  const showBorder = block.showBorder ?? block.hasBorder ?? true;

  const artifactIcons = {
    designSystem: Cpu,
    architecture: GitBranch,
    wireframes: Layout,
    documentation: FileText,
    diagrams: Layers,
  };

  const IconComp = artifactIcons[block.artifactType] || Layers;

  return (
    <section className="w-full py-16 md:py-24 border-b border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="bg-[#151613] border border-[rgba(244,243,238,0.18)] rounded-[20px] p-6 sm:p-10 lg:p-12 shadow-2xl"
        >
          {/* Header do Artefato */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <IconComp size={16} className="text-[#C4FF00]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#C4FF00]">
                  ARTEFATO DE DESIGN // {block.artifactType?.toUpperCase() || 'SISTEMA'}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {title || 'Artefato de Engenharia de Design'}
              </h3>
            </div>

            {description && (
              <p className="max-w-md font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Visualização Principal do Artefato */}
          <div
            className={`w-full aspect-[16/10] rounded-[14px] overflow-hidden ${
              showBorder ? 'border border-white/10 bg-[#10110F]' : 'border-0 bg-transparent'
            } mb-4`}
          >
            <img
              src={block.media}
              alt={title || 'Design artifact showcase'}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {caption && (
            <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-[#F4F3EE]/50 uppercase tracking-wider">
              <span>{caption}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CaseArtifactShowcase;
