import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildEndpoint(
  baseUrl: string,
  path: string,
  searchParams: Record<string, string> = {}
) {
  const url = new URL(`${baseUrl}/${path}`);
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url;
}
