import { ChevronRight } from 'lucide-react';

import { Card } from '~/components/card';

export default function RootPage() {
  return (
    <main>
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
