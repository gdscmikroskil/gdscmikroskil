import { Header } from '~/components/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto h-[99999px] max-w-xl px-3">{children}</div>
    </>
  );
}
