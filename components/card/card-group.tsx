import * as React from 'react';
import Link from 'next/link';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

interface CardGroupProps {
  title: string;
  slug?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function CardGroup({ title, slug, icon, children }: CardGroupProps) {
  return (
    <li>
      <section className="rounded-xl border border-border p-3">
        <header className="flex justify-between px-1 pb-3">
          <div className="flex items-center gap-2">
            <div className="text-primary">{icon}</div>
            <h2 className="text-sm font-bold text-muted-foreground md:text-base">
              {title}
            </h2>
          </div>
          {slug && (
            <Button asChild size="icon" variant="ghost" className="h-8 w-8">
              <Link href={`/${slug}`}>
                <Icons.Link size={16} />
              </Link>
            </Button>
          )}
        </header>
        <ul className="space-y-2 md:space-y-3">{children}</ul>
      </section>
    </li>
  );
}
