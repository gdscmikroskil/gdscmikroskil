import * as React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function Card({ title, href, icon }: CardProps) {
  return (
    <article className="relative rounded-lg border border-border bg-slate-300/10 p-4 transition-colors hover:border-primary md:border-2 md:p-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="ml-2 text-sm font-bold md:text-base">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h1>
        {icon}
      </div>
    </article>
  );
}
