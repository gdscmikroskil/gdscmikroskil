import { Card } from '~/components/card';
import { Icons } from '~/components/icons';
import { SVGFetcher } from '~/components/svg-fetcher';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { getErrorDetail } from '~/lib/errors';
import { client } from '~/lib/sanity/client';
import { urlForImage } from '~/lib/sanity/image';
import { CategoryContent, LinkContent } from '~/types/content';

interface MainPageProps {
  searchParams: { error?: string };
}

type GroupLinkByCategory = {
  category: CategoryContent;
  links: LinkContent[];
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const error = getErrorDetail(searchParams.error);

  const links = await client.fetch<LinkContent[]>(`
    *[_type == "link"] {
      ...,
      category->
    }
  `);

  const groupLinkByCategory = links.reduce(
    (acc: GroupLinkByCategory[], link) => {
      const exist = acc.find((item) => item.category._id === link.category._id);
      if (exist) {
        exist.links.push(link);
        return acc;
      }
      acc.push({ category: link.category, links: [link] });
      return acc;
    },
    []
  );

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
        {groupLinkByCategory.map((group) => {
          return (
            <Card.Group
              key={group.category._id}
              title={group.category.title}
              icon={<SVGFetcher url={urlForImage(group.category.icon).url()} />}
            >
              {group.links.map((link) => (
                <Card.Link
                  key={link._id}
                  title={link.title}
                  subtitle={link.description}
                  href={link.url}
                />
              ))}
            </Card.Group>
          );
        })}
      </Card.Root>
    </main>
  );
}
