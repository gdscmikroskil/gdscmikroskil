import * as React from 'react';
import Image from 'next/image';

import gdscLogo from '~/assets/gdsc-logo.png';

export function Header() {
  return (
    <header className="flex flex-col items-center py-8 text-center">
      <Image src={gdscLogo} alt="" className="mb-4 h-8 w-auto md:h-10" />
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold md:text-2xl">
          Google Developer Student Clubs
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Universitas Mikroskil
        </p>
      </div>
    </header>
  );
}
