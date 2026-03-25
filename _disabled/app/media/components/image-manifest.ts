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

export type ImageSlotStatus = 'placeholder' | 'needed' | 'ready';

interface ImageSlotEntry {
  file: string;
  alt: string;
  aspectRatio: string;
  status: ImageSlotStatus;
}

export const IMAGE_SLOTS: Record<string, ImageSlotEntry> = {

  // ── Homepage ──────────────────────────────────────────────────────────────
  'hero-mainstreet': {
    file: 'hero-mainstreet.webp',
    alt: 'Natchez main street with azaleas and brick sidewalk',
    aspectRatio: '16/9',
    status: 'ready',
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
    alt: 'Antebellum mansion with live oaks and carriage',
    aspectRatio: '16/9',
    status: 'ready',
  },
  'restaurant-owner': {
    file: 'restaurant-owner.webp',
    alt: 'Art gallery gathering in Natchez',
    aspectRatio: '1/1',
    status: 'ready',
  },
  'hotel-room': {
    file: 'hotel-room.webp',
    alt: 'Victorian B&B with porch and garden in Natchez',
    aspectRatio: '16/9',
    status: 'ready',
  },

  // ── Services page ─────────────────────────────────────────────────────────
  'service-content': {
    file: 'service-content.webp',
    alt: 'Community gathering with warm interior lighting',
    aspectRatio: '16/9',
    status: 'ready',
  },
  'service-social': {
    file: 'service-social.webp',
    alt: 'Social media on mobile devices',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'service-photo': {
    file: 'service-photo.webp',
    alt: 'Pink azaleas blooming on Southern main street',
    aspectRatio: '16/9',
    status: 'ready',
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
    alt: 'Bistro tables on brick sidewalk under awning in Natchez',
    aspectRatio: '4/3',
    status: 'ready',
  },
  'cat-venue': {
    file: 'cat-venue.webp',
    alt: 'Historic downtown Natchez building with wooden doors and awning',
    aspectRatio: '4/3',
    status: 'ready',
  },
  'cat-hotel': {
    file: 'cat-hotel.webp',
    alt: 'Charming Southern cottage with American flag and garden',
    aspectRatio: '4/3',
    status: 'ready',
  },
  'cat-shop': {
    file: 'cat-shop.webp',
    alt: 'OutsideIN MS artisan shop on brick sidewalk',
    aspectRatio: '4/3',
    status: 'ready',
  },
  'cat-tour': {
    file: 'cat-tour.webp',
    alt: 'Beach with bridge and families on the Gulf Coast',
    aspectRatio: '4/3',
    status: 'ready',
  },
  'cat-service': {
    file: 'cat-service.webp',
    alt: 'Marina porch with boats and locals',
    aspectRatio: '4/3',
    status: 'ready',
  },

  // ── Brand images ──────────────────────────────────────────────────────────
  'brand-touring': {
    file: 'brand-touring.webp',
    alt: 'Antebellum mansion with live oaks along the corridor',
    aspectRatio: '16/9',
    status: 'ready',
  },
  'brand-magazine': {
    file: 'brand-magazine.webp',
    alt: 'Big Muddy Magazine spread',
    aspectRatio: '16/9',
    status: 'placeholder',
  },
  'brand-radio': {
    file: 'brand-radio.webp',
    alt: 'Downtown Natchez storefront with black awning and string lights',
    aspectRatio: '16/9',
    status: 'ready',
  },
  'brand-inn': {
    file: 'brand-inn.webp',
    alt: 'Victorian B&B exterior in Natchez',
    aspectRatio: '16/9',
    status: 'ready',
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
    alt: 'Palm trees and pier on Gulf Coast waterfront',
    aspectRatio: '21/9',
    status: 'ready',
  },
  'bg-natchez-street': {
    file: 'bg-natchez-street.webp',
    alt: 'Historic two-story building with iron balcony in Natchez',
    aspectRatio: '21/9',
    status: 'ready',
  },
  'bg-memphis-beale': {
    file: 'bg-memphis-beale.webp',
    alt: 'Downtown Natchez with azaleas and brick storefronts',
    aspectRatio: '21/9',
    status: 'ready',
  },
  'bg-nola-quarter': {
    file: 'bg-nola-quarter.webp',
    alt: 'French Quarter New Orleans',
    aspectRatio: '21/9',
    status: 'placeholder',
  },

};

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;

// ---------------------------------------------------------------------------
// Manifest helpers — useful for build-time audits or a dev admin page
// ---------------------------------------------------------------------------

/** Returns all slots that still need a real photo. */
export function getSlotsNeedingPhotos(): string[] {
  return Object.keys(IMAGE_SLOTS).filter(
    (key) => IMAGE_SLOTS[key].status !== 'ready'
  );
}

/** Returns counts per status — quick audit without iterating manually. */
export function getManifestSummary(): Record<ImageSlotStatus, number> {
  const counts: Record<ImageSlotStatus, number> = { placeholder: 0, needed: 0, ready: 0 };
  for (const key of Object.keys(IMAGE_SLOTS)) {
    counts[IMAGE_SLOTS[key].status]++;
  }
  return counts;
}
