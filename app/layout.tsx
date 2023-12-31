import { Metadata } from 'next';

import { Provider } from '~/app/provider';
import { fontMono, fontSans } from '~/lib/fonts';
import { cn } from '~/lib/utils';

import '~/app/style.css';

export const metadata: Metadata = {
  title: 'GDSC Mikroskil',
  description: 'Google Developer Student Clubs Universitas Mikroskil',
  openGraph: {
    type: 'website',
    title: 'GDSC Mikroskil',
    description: 'Google Developer Student Clubs Universitas Mikroskil',
  },
  keywords: ['gdsc', 'gdsc mikroskil'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('font-sans', fontSans.variable, fontMono.variable)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
