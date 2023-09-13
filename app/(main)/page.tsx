import Link from 'next/link';

import { Card } from '~/components/card';
import { Icons } from '~/components/icons';
import { SVGFetcher } from '~/components/svg-fetcher';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { getErrorDetail } from '~/lib/errors';
import { client } from '~/lib/sanity/client';
import { urlForImage } from '~/lib/sanity/image';
import { CategoryWithLinksContent } from '~/types/content';

export const dynamic = 'force-static';

interface MainPageProps {
  searchParams: { error?: string };
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const error = getErrorDetail(searchParams.error);

  const categories = await client.fetch<CategoryWithLinksContent[]>(`
    *[ _type == "category" && active == true ]|order(orderRank){
      ...,
      "links": *[ _type == "link" && category._ref == ^._id && active == true ]|order(orderRank)
    }
  `);

  return (
    <main className="mb-12">
      {error !== null && (
        <Alert variant="destructive" className="mb-2">
          <Icons.Alert className="h-4 w-4" />
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.description}</AlertDescription>
        </Alert>
      )}

      <Card.Root>
        {categories.map((category) => {
          if (category.links.length === 0) return null;

          return (
            <Card.Section
              key={category._id}
              title={category.title}
              icon={<SVGFetcher url={urlForImage(category.icon).url()} />}
              rightContent={
                <Button asChild size="icon" variant="ghost" className="h-8 w-8">
                  <Link href={`/${category.slug.current}`}>
                    <Icons.Link size={16} />
                  </Link>
                </Button>
              }
            >
              {category.links.map((link) => (
                <Card.Link
                  key={link._id}
                  title={link.title}
                  subtitle={link.description}
                  href={link.url}
                />
              ))}
            </Card.Section>
          );
        })}
      </Card.Root>
    </main>
  );
}
