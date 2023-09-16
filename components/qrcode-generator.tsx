'use client';

import * as React from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { LinkContent } from '~/types/content';

interface QRCodeGeneratorProps {
  links: LinkContent[];
}

export function QRCodeGenerator({ links }: QRCodeGeneratorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
  };

  const handleFilter = (value: string, search: string) => {
    const item = links.find((link) => link._id === value);
    if (item?.title.toLowerCase().includes(search.toLowerCase())) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? links.find((link) => link._id === value)?.title
              : 'Select Link...'}
            <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen border-none p-0">
          <div className="mx-auto max-w-xl px-3">
            <div className="rounded-md border">
              <Command filter={handleFilter}>
                <CommandInput placeholder="Search link..." />
                <CommandEmpty>No link found.</CommandEmpty>
                <CommandGroup>
                  {links.map((link) => {
                    const isChecked = value === link._id;

                    return (
                      <CommandItem
                        key={link._id}
                        value={link._id}
                        onSelect={handleSelect}
                      >
                        <Icons.Check
                          className={cn('mr-3 h-4 w-4 shrink-0 opacity-0', {
                            'opacity-100': isChecked,
                          })}
                        />
                        <div>
                          <p className="line-clamp-1 break-all">{link.title}</p>
                          <p className="line-clamp-1 break-all text-muted-foreground">
                            {link.url}
                          </p>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
