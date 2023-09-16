'use client';

import * as React from 'react';

import { QRCodeCanvas } from 'qrcode.react';

import gdsclogo from '~/assets/qrcode-gdsc-logo.jpg';
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
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string | null>(null);

  const qrCodeContainerRef = React.useRef<HTMLDivElement>(null);
  const downloadLinkRef = React.useRef<HTMLAnchorElement>(null);

  const selectedLink = links.find((link) => link._id === value);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? null : currentValue);
    setOpen(false);
  };

  const handleFilter = (filterValue: string, search: string) => {
    const item = links.find((link) => link._id === filterValue);
    if (item?.title.toLowerCase().includes(search.toLowerCase())) {
      return 1;
    }
    return 0;
  };

  const handleDownload = () => {
    const canvasElement = qrCodeContainerRef.current?.querySelector('canvas');
    const qrCodeDataUrl = canvasElement?.toDataURL('image/png');
    if (downloadLinkRef.current !== null && qrCodeDataUrl !== undefined) {
      downloadLinkRef.current.href = qrCodeDataUrl;
      downloadLinkRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? selectedLink?.title : 'Select Link...'}
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

      <div className="aspect-square w-full rounded-md border p-4 md:p-8">
        {selectedLink === undefined ? (
          <div className="grid h-full place-content-center place-items-center gap-2 text-muted-foreground">
            <Icons.Link />
            <p className="text-xs md:text-sm">Please select the link...</p>
          </div>
        ) : (
          <div ref={qrCodeContainerRef}>
            <QRCodeCanvas
              includeMargin
              value={selectedLink.url}
              size={1080}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              imageSettings={{
                src: gdsclogo.src,
                height: 256,
                width: 256,
                excavate: true,
              }}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
      <div>
        <a ref={downloadLinkRef} download={selectedLink?._id} />
        <Button
          className="w-full"
          onClick={handleDownload}
          disabled={selectedLink === undefined}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
