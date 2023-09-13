import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Card } from '~/components/card';
import { Icons } from '~/components/icons';
import { SVGFetcher } from '~/components/svg-fetcher';
import { Button } from '~/components/ui/button';
import { client } from '~/lib/sanity/client';
import { urlForImage } from '~/lib/sanity/image';
import {
  CategoryWithLinksContent,
  LinkContent,
  LinkWithGroupContent,
} from '~/types/content';

interface MainPageProps {
  params: { category: string };
}

export default async function MainPage({ params }: MainPageProps) {
  const category = await client.fetch<CategoryWithLinksContent | null>(`
    *[ _type == "category" && active == true && slug.current == "${params.category}" ]|order(orderRank){
      ...,
      "links": *[ _type == "link" && category._ref == ^._id && active == true ]|order(orderRank){
        ...,
        group->
      }
    }[0]
  `);

  if (category === null) notFound();

  const groups = new Map<
    string,
    { title: string; description: string; links: LinkWithGroupContent[] }
  >();
  const links = category.links.reduce<LinkContent[]>((acc, link) => {
    if (!link.group) {
      acc.push(link);
      return acc;
    }

    const existingGroup = groups.get(link.group._id);

    if (existingGroup === undefined) {
      groups.set(link.group._id, {
        title: link.group.title,
        description: link.group.description,
        links: [link],
      });
      return acc;
    }

    existingGroup.links.push(link);
    return acc;
  }, []);

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
          {Array.from(groups).map(([groupId, group]) => {
            return (
              <Card.Group
                key={groupId}
                links={group.links}
                title={group.title}
                subtitle={group.description}
              />
            );
          })}
          {links.map((link) => (
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
