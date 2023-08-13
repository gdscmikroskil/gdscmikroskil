import { fontMono, fontSans } from '~/lib/fonts';
import { cn } from '~/lib/utils';

import '~/app/style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('font-sans', fontSans.variable, fontMono.variable)}>
        {children}
      </body>
    </html>
  );
}
