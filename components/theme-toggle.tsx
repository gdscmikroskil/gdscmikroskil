'use client';

import * as React from 'react';

import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { useTheme } from 'next-themes';

import { Icons } from '~/components/icons';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';

export function ThemeToggle() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Icons.LightTheme
          size={20}
          className="mr-2 h-4 w-4 rotate-0 scale-100 transition-transform duration-700 dark:-rotate-90 dark:scale-0"
        />
        <Icons.DarkTheme
          size={20}
          className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-transform duration-700 dark:rotate-0 dark:scale-100"
        />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuGroup className="space-y-1">
            <DropDownMenuItemTheme theme="light">
              <Icons.LightTheme className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropDownMenuItemTheme>
            <DropDownMenuItemTheme theme="dark">
              <Icons.DarkTheme className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropDownMenuItemTheme>
            <DropDownMenuItemTheme theme="system">
              <Icons.SystemTheme className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropDownMenuItemTheme>
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function DropDownMenuItemTheme({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) {
  const { theme: activeTheme, setTheme } = useTheme();

  const isActiveTheme = activeTheme === theme;

  const handleSelectTheme = (theme: string) => {
    return () => setTheme(theme);
  };

  return (
    <DropdownMenuItem
      className={cn('cursor-pointer', {
        'bg-accent text-accent-foreground': isActiveTheme,
      })}
      onClick={handleSelectTheme(theme)}
    >
      {children}
    </DropdownMenuItem>
  );
}
