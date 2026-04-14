// apps/web/sanity/plugins/bmm-library/index.ts
// Sanity v3 plugin that adds a "Big Muddy Photo Library" asset source to
// every image field in Studio. The source is backed by GCS + Next.js API
// at /api/photo-library.
//
// Registration: imported and passed to `plugins: [...]` in sanity.config.ts.

import { definePlugin, type AssetSource } from 'sanity';
import { BmmLibrarySource } from './BmmLibrarySource';
import { BmmLibraryIcon } from './icon';

const bmmLibraryAssetSource: AssetSource = {
  name: 'bmm-library',
  title: 'Big Muddy Photo Library',
  component: BmmLibrarySource,
  icon: BmmLibraryIcon,
};

export const bmmLibrary = definePlugin({
  name: 'bmm-library',
  form: {
    image: {
      assetSources: (prev) => [bmmLibraryAssetSource, ...prev],
    },
  },
});
