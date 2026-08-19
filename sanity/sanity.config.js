import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { createGeneratePtDraftAction } from './actions/generatePtDraftAction';

export default defineConfig({
  name: 'default',
  title: 'David Salviano Portfolio Studio',

  projectId: 'pjq90dr2',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      const generateAction = createGeneratePtDraftAction(context);
      return [generateAction, ...prev];
    },
  },
});
