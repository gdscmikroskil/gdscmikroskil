/**
 * Fetches an SVG file from a given URL and renders it as HTML.
 * @param url - The URL of the SVG file to fetch.
 * @returns A React component that renders the fetched SVG file as HTML.
 */
export async function SVGFetcher({ url }: { url: string }) {
  const res = await fetch(url);
  const text = await res.text();

  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}
