import { Footer } from '~/components/footer';
import { Header } from '~/components/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col justify-stretch">
      <Header />
      <div className="flex-1">
        <div className="mx-auto max-w-xl px-3">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
