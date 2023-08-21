import { Header } from '~/components/header';
import { cn } from '~/lib/utils';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn('mx-auto flex max-w-xl flex-col px-4')}>
      <Header />
      {children}
    </div>
  );
}
