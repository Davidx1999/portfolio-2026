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

const BLOCK_COMPONENTS = {
  chapterIntro: CaseChapterIntro,
  diagonalMediaScene: CaseDiagonalMediaScene,
  artifactMosaicScene: CaseArtifactMosaic,
  laggedFullViewportMedia: CaseLaggedFullViewport,
  verticalMediaStack: CaseVerticalMediaStack,
  dividerStatement: CaseStatement,
  textSection: CaseTextSection,
  fullMedia: CaseFullMedia,
  splitMedia: CaseSplitMedia,
  mediaText: CaseMediaText,
  imageGrid: CaseImageGrid,
  videoBlock: CaseVideo,
  beforeAfter: CaseBeforeAfter,
  processSteps: CaseProcessSteps,
  artifactShowcase: CaseArtifactShowcase,
  quoteBlock: CaseQuote,
  impactBlock: CaseImpact,
};

export function CaseContentRenderer({ contentBlocks }) {
  if (!Array.isArray(contentBlocks) || contentBlocks.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      {contentBlocks.map((block, idx) => {
        if (!block || !block._type) return null;
        const Component = BLOCK_COMPONENTS[block._type];
        if (!Component) {
          console.warn(`No block renderer found for type: ${block._type}`);
          return null;
        }

        return <Component key={block._key || `${block._type}-${idx}`} block={block} />;
      })}
    </div>
  );
}

export default CaseContentRenderer;
