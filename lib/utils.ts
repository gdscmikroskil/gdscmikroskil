import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createEndpoint(
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

export function compactName(name: string) {
  const maxCharacters = 32;

  if (name.length <= maxCharacters) {
    return name;
  }

  const afterLastMaxCharacter = name[maxCharacters];
  if (afterLastMaxCharacter === ' ') {
    return name.slice(0, maxCharacters);
  }

  const lastSpaceIndex = name.lastIndexOf(' ', maxCharacters);
  if (lastSpaceIndex !== -1) {
    return name.slice(0, lastSpaceIndex);
  }

  return name.slice(0, maxCharacters);
}
