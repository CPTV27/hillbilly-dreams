import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { bmmLibrary } from './sanity/plugins/bmm-library';

// Document types that are singletons — only one instance should ever exist.
// Structure Builder shows them as a single editable doc (no list, no "new" button).
const SINGLETON_TYPES = new Set(['touringPage']);

// Matches the fixed id used by the seed script.
const SINGLETON_IDS: Record<string, string> = {
  touringPage: 'touringPage-singleton',
};

export default defineConfig({
  name: 'big-muddy',
  title: 'Big Muddy',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Singletons first ─────────────────────────────────────────────
            S.listItem()
              .title('Touring Page')
              .id('touringPage')
              .child(
                S.document()
                  .schemaType('touringPage')
                  .documentId(SINGLETON_IDS.touringPage)
                  .title('Touring Page'),
              ),
            S.divider(),
            // ── Regular document types (all non-singletons) ──────────────────
            ...S.documentTypeListItems().filter(
              (listItem) => !SINGLETON_TYPES.has(listItem.getId() || ''),
            ),
          ]),
    }),
    visionTool(),
    bmmLibrary(),
  ],

  // Block "create" and "delete" actions for singletons at the Studio level,
  // in addition to the schema-level __experimental_actions guard.
  document: {
    actions: (input, context) => {
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return input.filter(({ action }) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish');
      }
      return input;
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !SINGLETON_TYPES.has(templateItem.templateId));
      }
      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
});
