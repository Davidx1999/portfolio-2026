import textSection from './textSection';
import mediaText from './mediaText';
import imageGallery from './imageGallery';
import artifactMosaicScene from './artifactMosaicScene';
import fullMedia from './fullMedia';
import splitMedia from './splitMedia';
import beforeAfter from './beforeAfter';
import laggedFullViewportMedia from './laggedFullViewportMedia';
import diagonalMediaScene from './diagonalMediaScene';
import verticalMediaStack from './verticalMediaStack';
import stickyNarrative from './stickyNarrative';
import decisionSection from './decisionSection';
import outcomeSection from './outcomeSection';
import prototypeVideo from './prototypeVideo';
import chapterIntro from './chapterIntro';
import dividerStatement from './dividerStatement';
import quoteBlock from './quoteBlock';
import impactBlock from './impactBlock';
import artifactShowcase from './artifactShowcase';
import processSteps from './processSteps';
import imageGrid from './imageGrid';
import videoBlock from './videoBlock';

export const blockSchemas = [
  textSection,
  mediaText,
  imageGallery,
  artifactMosaicScene,
  fullMedia,
  splitMedia,
  beforeAfter,
  laggedFullViewportMedia,
  diagonalMediaScene,
  verticalMediaStack,
  stickyNarrative,
  decisionSection,
  outcomeSection,
  prototypeVideo,
  chapterIntro,
  dividerStatement,
  quoteBlock,
  impactBlock,
  artifactShowcase,
  processSteps,
  imageGrid,
  videoBlock,
];

export const contentBlockTypes = blockSchemas.map((b) => ({ type: b.name }));

export default blockSchemas;
