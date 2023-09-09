import * as React from 'react';
import Link from 'next/link';

interface CardLinkProps {
  title: string;
  href: string;
  subtitle?: string;
}

export function CardLink({ title, subtitle, href }: CardLinkProps) {
  return (
    <li>
      <article className="relative flex min-h-[60px] flex-col justify-center rounded-lg border border-border bg-slate-50 px-3 py-2 hover:border-primary hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-900/50 md:min-h-[72px] md:px-4 md:py-3">
        <h3 className="text-sm md:text-base">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground md:text-sm">{subtitle}</p>
      </article>
    </li>
  );
}
