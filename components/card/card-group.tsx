import * as React from 'react';

interface CardGroupProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function CardGroup({ title, icon, children }: CardGroupProps) {
  return (
    <li>
      <section className="rounded-xl border border-border p-3">
        <header className="flex items-center gap-2 px-1 pb-3">
          <div className="text-primary">{icon}</div>
          <h2 className="text-sm font-bold text-muted-foreground md:text-base">
            {title}
          </h2>
        </header>
        <ul className="space-y-2 md:space-y-3">{children}</ul>
      </section>
    </li>
  );
}
