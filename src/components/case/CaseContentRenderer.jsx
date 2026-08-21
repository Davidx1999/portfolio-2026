import React from 'react';
import { CaseChapterIntro } from './blocks/CaseChapterIntro';
import { CaseDiagonalMediaScene } from './blocks/CaseDiagonalMediaScene';
import { CaseArtifactMosaic } from './blocks/CaseArtifactMosaic';
import { CaseLaggedFullViewport } from './blocks/CaseLaggedFullViewport';
import { CaseVerticalMediaStack } from './blocks/CaseVerticalMediaStack';
import { CaseStatement } from './blocks/CaseStatement';
import { CaseTextSection } from './blocks/CaseTextSection';
import { CaseFullMedia } from './blocks/CaseFullMedia';
import { CaseSplitMedia } from './blocks/CaseSplitMedia';
import { CaseMediaText } from './blocks/CaseMediaText';
import { CaseImageGrid } from './blocks/CaseImageGrid';
import { CaseVideo } from './blocks/CaseVideo';
import { CaseBeforeAfter } from './blocks/CaseBeforeAfter';
import { CaseProcessSteps } from './blocks/CaseProcessSteps';
import { CaseArtifactShowcase } from './blocks/CaseArtifactShowcase';
import { CaseQuote } from './blocks/CaseQuote';
import { CaseImpact } from './blocks/CaseImpact';
import { CasePrototypeVideo } from './blocks/CasePrototypeVideo';
import { CaseDecisionSection } from './blocks/CaseDecisionSection';
import { CaseOutcomeSection } from './blocks/CaseOutcomeSection';
import { CaseImageGallery } from './blocks/CaseImageGallery';
import { CaseStickyNarrative } from './blocks/CaseStickyNarrative';

/**
 * Registry de componentes visuais do frontend correspondentes aos schemas do Sanity.
 */
const BLOCK_COMPONENTS = {
  // 1. Textos e Narrativa
  textSection: CaseTextSection,
  stickyNarrative: CaseStickyNarrative,
  chapterIntro: CaseChapterIntro,
  dividerStatement: CaseStatement,
  statementBlock: CaseStatement,
  quoteBlock: CaseQuote,

  // 2. Mídia e Conteúdo Misto
  mediaText: CaseMediaText,
  fullMedia: CaseFullMedia,
  splitMedia: CaseSplitMedia,
  beforeAfter: CaseBeforeAfter,
  laggedFullViewportMedia: CaseLaggedFullViewport,
  diagonalMediaScene: CaseDiagonalMediaScene,
  verticalMediaStack: CaseVerticalMediaStack,

  // 3. Galerias e Mosaicos
  imageGallery: CaseImageGallery,
  artifactMosaicScene: CaseArtifactMosaic,
  artifactMosaic: CaseArtifactMosaic,
  imageGrid: CaseImageGrid,

  // 4. Decisões, Processo & Evidências
  decisionSection: CaseDecisionSection,
  outcomeSection: CaseOutcomeSection,
  processSteps: CaseProcessSteps,
  artifactShowcase: CaseArtifactShowcase,
  impactBlock: CaseImpact,

  // 5. Vídeos e Prototipagem
  prototypeVideo: CasePrototypeVideo,
  videoBlock: CaseVideo,
};

export function CaseContentRenderer({ contentBlocks }) {
  if (!Array.isArray(contentBlocks) || contentBlocks.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      {contentBlocks.map((block, idx) => {
        if (!block || typeof block !== 'object') return null;
        const blockType = block._type || block.blockType;
        if (!blockType) return null;

        const Component = BLOCK_COMPONENTS[blockType];

        if (!Component) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `⚠️ [CaseContentRenderer]: Nenhum componente registrado para o tipo de bloco "${blockType}". O bloco foi ignorado.`
            );
          }
          return null;
        }

        const blockId = `block-${block._key || idx}`;

        return (
          <div
            key={block._key || `${blockType}-${idx}`}
            id={blockId}
            data-block-type={blockType}
            className="w-full scroll-mt-24"
          >
            <Component
              block={block}
              {...block}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CaseContentRenderer;
