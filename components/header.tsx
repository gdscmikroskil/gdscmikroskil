import * as React from 'react';
import Image from 'next/image';

import Balancer from 'react-wrap-balancer';

import gdscLogo from '~/assets/gdsc-logo.png';
import { ThemeToggle } from '~/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 mb-4 bg-background">
      <div className=" mx-auto flex max-w-xl items-center justify-between border-b px-3 py-4">
        <div className="flex items-center gap-1">
          <Image
            src={gdscLogo}
            alt=""
            className="h-10 w-auto md:h-12"
            placeholder="blur"
          />
          <h1 className="text-xs md:text-sm">
            <span className="block font-semibold">
              <Balancer>Google Developer Student Clubs</Balancer>
            </span>
            <span className="block text-muted-foreground">
              Universitas Mikroskil
            </span>
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
