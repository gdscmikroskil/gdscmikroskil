import { QRCodeGenerator } from '~/components/qrcode-generator';
import { client } from '~/lib/sanity/client';
import { LinkContent } from '~/types/content';

export default async function QRCodePage() {
  const links = await client.fetch<LinkContent[]>(`
    *[ _type == "link" && active == true ]|order(orderRank)
  `);

  return <QRCodeGenerator links={links} />;
}
