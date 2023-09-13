import * as React from 'react';

interface CardSectionProps {
  title: string;
  slug?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export function CardSection({
  title,
  icon,
  children,
  rightContent,
}: CardSectionProps) {
  return (
    <li>
      <section className="rounded-xl border border-border p-3">
        <header className="flex h-11 items-center justify-between px-1 pb-3">
          <div className="flex items-center gap-2">
            <div className="text-primary">{icon}</div>
            <h2 className="text-sm font-bold text-muted-foreground md:text-base">
              {title}
            </h2>
          </div>
          {rightContent}
        </header>
        <ul className="space-y-2 md:space-y-3">{children}</ul>
      </section>
    </li>
  );
}
