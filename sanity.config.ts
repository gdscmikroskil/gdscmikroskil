/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

import { env } from '~/lib/env.mjs';
import { schema } from '~/lib/sanity/schema';

export default defineConfig({
  basePath: '/studio',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema,
  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'category',
              title: 'Categories',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'link',
              title: 'Links',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'group',
              title: 'Groups',
              S,
              context,
            }),
          ]);
      },
    }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
  ],
});
