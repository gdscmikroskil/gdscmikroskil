// Note: this assumes that every document that has a slug field

import { SlugValidationContext } from 'sanity';

import { env } from '~/lib/env.mjs';

export async function isUniqueAcrossAllDocuments(
  slug: string,
  context: SlugValidationContext
): Promise<boolean> {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION });

  if (document === undefined) return false;

  const id = document._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query =
    '!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)';
  const result = await client.fetch(query, params);
  return result;
}
