import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Card } from '~/components/card';
import { Icons } from '~/components/icons';
import { SVGFetcher } from '~/components/svg-fetcher';
import { Button } from '~/components/ui/button';
import { client } from '~/lib/sanity/client';
import { urlForImage } from '~/lib/sanity/image';
import { CategoryWithLinksContent } from '~/types/content';

interface MainPageProps {
  params: { category: string };
}

export default async function MainPage({ params }: MainPageProps) {
  const category = await client.fetch<CategoryWithLinksContent | null>(`
    *[ _type == "category" && active == true && slug.current == "${params.category}" ]|order(orderRank){
      ...,
      "links": *[ _type == "link" && category._ref == ^._id && active == true ]|order(orderRank)
    }[0]
  `);

  if (category === null) notFound();

  return (
    <main className="mb-12">
      <Card.Root>
        <Card.Section
          key={category._id}
          title={category.title}
          icon={<SVGFetcher url={urlForImage(category.icon).url()} />}
          rightContent={
            <Button asChild size="icon" variant="ghost" className="h-8 w-8">
              <Link href="/">
                <Icons.Undo size={16} />
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
      </Card.Root>
    </main>
  );
}
