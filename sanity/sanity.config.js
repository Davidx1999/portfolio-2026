import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './schemas';

export const supportedLanguages = [
  { id: 'en', title: 'English (Original / English-First)' },
  { id: 'pt-BR', title: 'Português (Brasil)' },
];

export default defineConfig({
  name: 'default',
  title: 'David Salviano Portfolio Studio',

  projectId: 'pjq90dr2',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ['project', 'aboutPage', 'letsTalkPage', 'playgroundProject'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
