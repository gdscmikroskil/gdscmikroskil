import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Revalidates the cache for the root path ('/').
 * @returns A JSON response indicating that the cache has been revalidated and the current timestamp.
 */
export async function POST() {
  revalidatePath('/');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
