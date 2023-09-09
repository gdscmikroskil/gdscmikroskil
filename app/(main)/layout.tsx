import { Header } from '~/components/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-xl px-3">{children}</div>
    </>
  );
}
