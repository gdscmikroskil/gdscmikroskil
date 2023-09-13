'use client';

import * as React from 'react';
import Link from 'next/link';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { LinkContent } from '~/types/content';

interface CardGroupProps {
  title: string;
  subtitle?: string;
  links: LinkContent[];
}

export function CardGroup({ title, subtitle, links }: CardGroupProps) {
  return (
    <li>
      <article className="relative flex min-h-[60px] cursor-pointer flex-col justify-center rounded-lg border border-border bg-slate-50 px-3 py-2 hover:border-primary hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-900/50 md:min-h-[72px] md:px-4 md:py-3">
        <Dialog>
          <DialogTrigger asChild>
            <button className="after:absolute after:inset-0">
              <h3 className="text-left text-sm md:text-base">{title}</h3>
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{subtitle}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="w-full space-y-2">
                {links.map((link) => {
                  return (
                    <Button key={link._id} className="w-full text-white">
                      <Link href={link.url}>{link.title}</Link>
                    </Button>
                  );
                })}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-xs text-muted-foreground md:text-sm">{subtitle}</p>
      </article>
    </li>
  );
}
