import { AlertCircleIcon, ChevronRight } from 'lucide-react';

import { Card } from '~/components/card';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { getErrorDetail } from '~/lib/errors';

interface RootPageProps {
  searchParams: { error?: string };
}

export default function RootPage({ searchParams }: RootPageProps) {
  const error = getErrorDetail(searchParams.error);

  return (
    <main>
      {error !== null && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.description}</AlertDescription>
        </Alert>
      )}

      <ul className="space-y-3">
        <li>
          <Card
            title="Discord Server"
            href="/api/connect"
            icon={<ChevronRight />}
          />
        </li>
      </ul>
    </main>
  );
}
