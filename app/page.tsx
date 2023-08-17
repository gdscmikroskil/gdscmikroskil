import { AlertCircleIcon } from 'lucide-react';

import { Card } from '~/components/card';
import { Icons } from '~/components/icons';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { env } from '~/lib/env.mjs';
import { getErrorDetail } from '~/lib/errors';

interface RootPageProps {
  searchParams: { error?: string };
}

export default function RootPage({ searchParams }: RootPageProps) {
  const error = getErrorDetail(searchParams.error);

  return (
    <main className="mb-12">
      {error !== null && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.description}</AlertDescription>
        </Alert>
      )}

      <Card.Root>
        <Card.Group
          title="Discord Server"
          icon={<Icons.Discord className="fill-primary" />}
        >
          <Card.Link
            title="Join as Mikroskil student"
            subtitle="Get an exclusive role for Mikroskil students!"
            href="/api/connect"
          />

          <Card.Link
            title="Join as another university student"
            subtitle="Wherever you come from, you can still join!"
            href={env.DISCORD_INVITE_LINK}
          />
        </Card.Group>
      </Card.Root>
    </main>
  );
}
