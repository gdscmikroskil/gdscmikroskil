import { Metadata } from 'next';

import { Header } from '~/components/header';
import { fontMono, fontSans } from '~/lib/fonts';
import { cn } from '~/lib/utils';

import '~/app/style.css';

export const metadata: Metadata = {
  title: 'GDSC Mikroskil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'dark mx-auto flex max-w-xl flex-col px-4 font-sans',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
