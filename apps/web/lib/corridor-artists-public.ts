// Public-safe roster slice for marketing surfaces (Deep South Directory, radio, etc.).
// Only artists cleared for outward visibility — no contact fields.

import { prisma } from '@/lib/db';

/** Canonical records domain for artist profile links from non-records hosts. */
export const RECORDS_ARTIST_PROFILE_BASE =
  process.env.NEXT_PUBLIC_RECORDS_ORIGIN ?? 'https://bigmuddyrecord.com';

export type CorridorArtistCard = {
  id: number;
  name: string;
  slug: string;
  genre: string | null;
  city: string;
  state: string;
  bio: string | null;
  photoUrl: string | null;
  status: string;
};

const PUBLIC_STATUSES = ['showcasing', 'touring', 'alumni'] as const;

/**
 * Artists we’re comfortable showing on public marketing pages.
 * Ordered for scanability: city, then name.
 */
export async function getCorridorArtistsPublic(limit = 48): Promise<CorridorArtistCard[]> {
  try {
    return await prisma.artist.findMany({
      where: { status: { in: [...PUBLIC_STATUSES] } },
      orderBy: [{ city: 'asc' }, { name: 'asc' }],
      take: limit,
      select: {
        id: true,
        name: true,
        slug: true,
        genre: true,
        city: true,
        state: true,
        bio: true,
        photoUrl: true,
        status: true,
      },
    });
  } catch {
    return [];
  }
}

export function recordsArtistProfileUrl(slug: string): string {
  return `${RECORDS_ARTIST_PROFILE_BASE.replace(/\/$/, '')}/records/artists/${slug}`;
}
