import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Balancer from 'react-wrap-balancer';

import gdscLogo from '~/assets/gdsc-logo.png';
import { Icons } from '~/components/icons';
import { ThemeToggle } from '~/components/theme-toggle';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 mb-4 bg-background">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-2 border-b px-3 py-4">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="p-2">
              <Icons.Menu size={20} />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/studio">
                  <Icons.Studio className="mr-2 h-4 w-4" />
                  <span>Studio</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/qrcode">
                  <Icons.QRCode className="mr-2 h-4 w-4" />
                  <span>QRCode</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ThemeToggle />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
