'use client';

import * as React from 'react';

import { ThemeProvider } from 'next-themes';

interface ProviderProps {
  children?: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider enableSystem defaultTheme="system" attribute="class">
      {children}
    </ThemeProvider>
  );
}
