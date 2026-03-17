// apps/web/app/media/components/image-manifest.ts
// Master shopping list for every image slot across the Deep South Directory site.
//
// STATUS VALUES:
//   'placeholder' — webp file exists in /public/images/dsd/ but is a temp image
//   'needed'      — no file yet; ImageSlot will render the warm fallback gradient
//   'ready'       — real edited photo is in place, approved for production
//
// TO MARK AN IMAGE READY: change status to 'ready' after dropping the final
// photo into /apps/web/public/images/dsd/ with the filename listed here.
//
// USAGE:
//   import { IMAGE_SLOTS, type ImageSlotKey } from '@/app/media/components/image-manifest';
//   const slot = IMAGE_SLOTS['hero-mainstreet'];
//   <ImageSlot src={`/images/dsd/${slot.file}`} alt={slot.alt} aspectRatio={slot.aspectRatio} />

export const IMAGE_SLOTS = {

  // ── Homepage ──────────────────────────────────────────────────────────────
  'hero-mainstreet': {
    file: 'hero-mainstreet.webp',
    alt: 'Historic Southern main street at golden hour',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'southern-food': {
    file: 'southern-food.webp',
    alt: 'Southern cuisine plated on rustic table',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'blues-musician': {
    file: 'blues-musician.webp',
    alt: 'Blues musician performing in intimate juke joint',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'mississippi-sunset': {
    file: 'mississippi-sunset.webp',
    alt: 'Mississippi River at sunset',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'restaurant-owner': {
    file: 'restaurant-owner.webp',
    alt: 'Restaurant owner in their establishment',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'hotel-room': {
    file: 'hotel-room.webp',
    alt: 'Boutique hotel room in the Deep South',
    aspectRatio: '16/9',
    status: 'placeholder',
  },

  // ── Services page ─────────────────────────────────────────────────────────
  'service-content': {
    file: 'service-content.webp',
    alt: 'Content creation workspace',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-social': {
    file: 'service-social.webp',
    alt: 'Social media on mobile devices',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-photo': {
    file: 'service-photo.webp',
    alt: 'Photo enhancement before and after',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-seo': {
    file: 'service-seo.webp',
    alt: 'Google search results on laptop',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-email': {
    file: 'service-email.webp',
    alt: 'Email newsletter design',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-analytics': {
    file: 'service-analytics.webp',
    alt: 'Analytics dashboard showing growth',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-website': {
    file: 'service-website.webp',
    alt: 'Beautiful business website on screen',
    aspectRatio: '16/9',
    status: 'placeholder',
  },

  // ── Directory category images ─────────────────────────────────────────────
  'cat-restaurant': {
    file: 'cat-restaurant.webp',
    alt: 'Southern restaurant exterior',
    aspectRatio: '4/3',
    status: 'placeholder',
  },
  'cat-venue': {
    file: 'cat-venue.webp',
    alt: 'Live music venue stage',
    aspectRatio: '4/3',
    status: 'placeholder',
  },
  'cat-hotel': {
    file: 'cat-hotel.webp',
    alt: 'Boutique hotel facade',
    aspectRatio: '4/3',
    status: 'placeholder',
  },
  'cat-shop': {
    file: 'cat-shop.webp',
    alt: 'Artisan retail shop interior',
    aspectRatio: '4/3',
    status: 'placeholder',
  },
  'cat-tour': {
    file: 'cat-tour.webp',
    alt: 'Tour group on historic street',
    aspectRatio: '4/3',
    status: 'placeholder',
  },
  'cat-service': {
    file: 'cat-service.webp',
    alt: 'Local service business',
    aspectRatio: '4/3',
    status: 'placeholder',
  },

  // ── Brand images ──────────────────────────────────────────────────────────
  'brand-touring': {
    file: 'brand-touring.webp',
    alt: 'Big Muddy Touring highway scene',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'brand-magazine': {
    file: 'brand-magazine.webp',
    alt: 'Big Muddy Magazine spread',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'brand-radio': {
    file: 'brand-radio.webp',
    alt: 'Big Muddy Radio studio',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'brand-inn': {
    file: 'brand-inn.webp',
    alt: 'The Big Muddy Inn exterior',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'brand-economics': {
    file: 'brand-economics.webp',
    alt: 'Outsider Economics book',
    aspectRatio: '16/9',
    status: 'placeholder',
  },

  // ── How It Works steps ────────────────────────────────────────────────────
  'step-meet': {
    file: 'step-meet.webp',
    alt: 'Business owner meeting',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'step-voice': {
    file: 'step-voice.webp',
    alt: 'Brand voice profile creation',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'step-calendar': {
    file: 'step-calendar.webp',
    alt: 'Content calendar planning',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'step-review': {
    file: 'step-review.webp',
    alt: 'Content review and approval',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'step-publish': {
    file: 'step-publish.webp',
    alt: 'Content going live across platforms',
    aspectRatio: '1/1',
    status: 'placeholder',
  },
  'step-results': {
    file: 'step-results.webp',
    alt: 'Performance report showing growth',
    aspectRatio: '1/1',
    status: 'placeholder',
  },

  // ── Backgrounds / cinematic wide ──────────────────────────────────────────
  'bg-river-aerial': {
    file: 'bg-river-aerial.webp',
    alt: 'Aerial view of Mississippi River',
    aspectRatio: '21/9',
    status: 'placeholder',
  },
  'bg-natchez-street': {
    file: 'bg-natchez-street.webp',
    alt: 'Natchez historic street',
    aspectRatio: '21/9',
    status: 'placeholder',
  },
  'bg-memphis-beale': {
    file: 'bg-memphis-beale.webp',
    alt: 'Beale Street Memphis',
    aspectRatio: '21/9',
    status: 'placeholder',
  },
  'bg-nola-quarter': {
    file: 'bg-nola-quarter.webp',
    alt: 'French Quarter New Orleans',
    aspectRatio: '21/9',
    status: 'placeholder',
  },

} as const;

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;

// All valid status values — includes 'ready' even though no slot carries it
// yet, so callers can use the full union without compiler errors.
export type ImageSlotStatus = 'placeholder' | 'needed' | 'ready';

// ---------------------------------------------------------------------------
// Manifest helpers — useful for build-time audits or a dev admin page
// ---------------------------------------------------------------------------

/** Returns all slots that still need a real photo. */
export function getSlotsNeedingPhotos(): ImageSlotKey[] {
  return (Object.keys(IMAGE_SLOTS) as ImageSlotKey[]).filter(
    (key) => {
      const status: string = IMAGE_SLOTS[key].status;
      return status !== 'ready';
    }
  );
}

/** Returns counts per status — quick audit without iterating manually. */
export function getManifestSummary(): Record<ImageSlotStatus, number> {
  const counts: Record<ImageSlotStatus, number> = { placeholder: 0, needed: 0, ready: 0 };
  for (const key of Object.keys(IMAGE_SLOTS) as ImageSlotKey[]) {
    const s = IMAGE_SLOTS[key].status as ImageSlotStatus;
    counts[s]++;
  }
  return counts;
}
