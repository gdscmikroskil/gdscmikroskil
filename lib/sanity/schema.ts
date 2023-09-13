import { type SchemaTypeDefinition } from 'sanity';

import category from '~/lib/sanity/schemas/category';
import group from '~/lib/sanity/schemas/group';
import link from '~/lib/sanity/schemas/link';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [link, category, group],
};
