import localizedString from './objects/localizedString';
import localizedText from './objects/localizedText';
import localizedPortableText from './objects/localizedPortableText';
import localizedSeo from './objects/localizedSeo';
import mainVisualMedia from './objects/mainVisualMedia';
import contentBlock from './objects/contentBlock';

import { blockSchemas } from './blocks';

import project from './project';
import playgroundProject from './playgroundProject';
import aboutPage from './aboutPage';
import letsTalkPage from './letsTalkPage';

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedPortableText,
  localizedSeo,
  mainVisualMedia,
  contentBlock,
  ...blockSchemas,
  project,
  playgroundProject,
  aboutPage,
  letsTalkPage,
];

export default schemaTypes;
