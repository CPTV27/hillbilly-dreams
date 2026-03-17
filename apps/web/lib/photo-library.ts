// apps/web/lib/photo-library.ts
// Shared photo library — magazine-quality corridor photography available to ALL brands.
//
// Every photo is from the Feb–Mar 2026 Ocean Springs / Natchez corridor shoots,
// editorially enhanced (auto levels, contrast, vibrance, warm shift, shadow recovery,
// sharpening, film vignette).
//
// USAGE:
//   import { LIBRARY, getPhotosByTag, getTopPhotos } from '@/lib/photo-library';
//   const hero = getPhotosByTag('mansion')[0];
//   <Image src={hero.src} alt={hero.alt} />

export type PhotoTag =
  | 'azalea'
  | 'mansion'
  | 'downtown'
  | 'storefront'
  | 'live-oak'
  | 'street'
  | 'marina'
  | 'shrimp-boat'
  | 'pier'
  | 'waterfront'
  | 'cottage'
  | 'garden'
  | 'iron-fence'
  | 'carriage'
  | 'residential'
  | 'brick'
  | 'b-and-b';

export interface LibraryPhoto {
  /** Web-accessible path: /images/library/corridor-NNNN.webp */
  src: string;
  /** Descriptive alt text */
  alt: string;
  /** Technical quality score (0–1, higher = better) */
  score: number;
  /** Content tags for filtering */
  tags: PhotoTag[];
  /** Original photo number from the corridor shoot */
  corridorNum: number;
}

// ── Photo Library ───────────────────────────────────────────────────────────────
// Ordered by quality score descending.

export const LIBRARY: LibraryPhoto[] = [
  // ── Azaleas & Gardens ───────────────────────────────────────────────────────
  { src: '/images/library/corridor-0501.webp', alt: 'Pink azaleas cascading along Natchez sidewalk under live oaks', score: 0.789, tags: ['azalea', 'live-oak', 'residential'], corridorNum: 501 },
  { src: '/images/library/corridor-0500.webp', alt: 'Azalea-lined sidewalk with fallen petals in Natchez', score: 0.742, tags: ['azalea', 'residential'], corridorNum: 500 },
  { src: '/images/library/corridor-0499.webp', alt: 'Brilliant azaleas spilling onto Natchez sidewalk', score: 0.713, tags: ['azalea', 'residential'], corridorNum: 499 },
  { src: '/images/library/corridor-0505.webp', alt: 'Cottage with azaleas and live oaks on Natchez hillside', score: 0.576, tags: ['azalea', 'cottage', 'live-oak'], corridorNum: 505 },
  { src: '/images/library/corridor-0502.webp', alt: 'Small cottage with pink azaleas and brick retaining wall', score: 0.585, tags: ['azalea', 'cottage', 'brick'], corridorNum: 502 },
  { src: '/images/library/corridor-0673.webp', alt: 'Azalea garden with live oaks framing Natchez mansion', score: 0.644, tags: ['azalea', 'mansion', 'garden', 'live-oak'], corridorNum: 673 },

  // ── Mansions & Antebellum ───────────────────────────────────────────────────
  { src: '/images/library/corridor-0630.webp', alt: 'White antebellum mansion with iron fence and carriage', score: 0.705, tags: ['mansion', 'iron-fence', 'carriage'], corridorNum: 630 },
  { src: '/images/library/corridor-0495.webp', alt: 'Columned mansion through canopy of live oaks with iron gate', score: 0.652, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 495 },
  { src: '/images/library/corridor-0614.webp', alt: 'White mansion on hillside with manicured grounds', score: 0.645, tags: ['mansion', 'garden'], corridorNum: 614 },
  { src: '/images/library/corridor-0627.webp', alt: 'Antebellum mansion with live oaks and horse-drawn carriage', score: 0.641, tags: ['mansion', 'carriage', 'live-oak'], corridorNum: 627 },
  { src: '/images/library/corridor-0631.webp', alt: 'White columned mansion close-up with balcony and shutters', score: 0.640, tags: ['mansion', 'iron-fence'], corridorNum: 631 },
  { src: '/images/library/corridor-0629.webp', alt: 'Mansion grounds with live oaks and wrought iron fence', score: 0.636, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 629 },
  { src: '/images/library/corridor-0490.webp', alt: 'Grand white mansion with columns and ornate iron gate', score: 0.575, tags: ['mansion', 'iron-fence'], corridorNum: 490 },
  { src: '/images/library/corridor-0491.webp', alt: 'Mansion framed by massive live oaks with iron fence', score: 0.633, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 491 },
  { src: '/images/library/corridor-0494.webp', alt: 'Antebellum mansion with columns seen through oak canopy', score: 0.638, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 494 },

  // ── B&Bs & Cottages ─────────────────────────────────────────────────────────
  { src: '/images/library/corridor-0642.webp', alt: 'Victorian B&B with wraparound porch and gingerbread trim', score: 0.713, tags: ['b-and-b', 'cottage'], corridorNum: 642 },
  { src: '/images/library/corridor-0645.webp', alt: 'Southern B&B with wide porch and black shutters', score: 0.655, tags: ['b-and-b', 'cottage'], corridorNum: 645 },
  { src: '/images/library/corridor-0654.webp', alt: 'Cottage under sprawling live oak with car in driveway', score: 0.671, tags: ['cottage', 'live-oak', 'residential'], corridorNum: 654 },
  { src: '/images/library/corridor-0600.webp', alt: 'White cottage with green lawn on quiet Natchez street', score: 0.605, tags: ['cottage', 'residential'], corridorNum: 600 },

  // ── Live Oaks ───────────────────────────────────────────────────────────────
  { src: '/images/library/corridor-0657.webp', alt: 'Massive live oak canopy over Ocean Springs street', score: 0.739, tags: ['live-oak', 'residential'], corridorNum: 657 },
  { src: '/images/library/corridor-0655.webp', alt: 'Live oak with spreading branches over Ocean Springs home', score: 0.735, tags: ['live-oak', 'residential'], corridorNum: 655 },
  { src: '/images/library/corridor-0656.webp', alt: 'Live oak branches framing coastal cottage', score: 0.628, tags: ['live-oak', 'cottage'], corridorNum: 656 },
  { src: '/images/library/corridor-0661.webp', alt: 'Spanish moss and live oaks along Ocean Springs road', score: 0.607, tags: ['live-oak', 'residential'], corridorNum: 661 },

  // ── Downtown & Storefronts ──────────────────────────────────────────────────
  { src: '/images/library/corridor-0339.webp', alt: 'Brick sidewalk with bench and awnings on Natchez main street', score: 0.736, tags: ['downtown', 'storefront', 'brick'], corridorNum: 339 },
  { src: '/images/library/corridor-0307.webp', alt: 'Downtown Natchez brick storefronts with green awnings', score: 0.720, tags: ['downtown', 'storefront', 'brick'], corridorNum: 307 },
  { src: '/images/library/corridor-0338.webp', alt: 'Natchez main street with brick walkway and shop signs', score: 0.716, tags: ['downtown', 'storefront', 'brick'], corridorNum: 338 },
  { src: '/images/library/corridor-0308.webp', alt: 'Brick downtown sidewalk with iron bench in Natchez', score: 0.711, tags: ['downtown', 'storefront', 'brick'], corridorNum: 308 },
  { src: '/images/library/corridor-0306.webp', alt: 'Downtown Natchez brick buildings with columned walkway', score: 0.710, tags: ['downtown', 'storefront', 'brick'], corridorNum: 306 },
  { src: '/images/library/corridor-0309.webp', alt: 'Natchez downtown with trees and brick sidewalk', score: 0.692, tags: ['downtown', 'storefront', 'brick'], corridorNum: 309 },
  { src: '/images/library/corridor-0431.webp', alt: 'Natchez barbershop with hanging sign on brick street', score: 0.620, tags: ['downtown', 'storefront', 'brick'], corridorNum: 431 },
  { src: '/images/library/corridor-0414.webp', alt: 'Downtown Natchez street with brick buildings and parked cars', score: 0.622, tags: ['downtown', 'street', 'brick'], corridorNum: 414 },
  { src: '/images/library/corridor-0470.webp', alt: 'Downtown storefront with black awning and string lights', score: 0.616, tags: ['downtown', 'storefront'], corridorNum: 470 },
  { src: '/images/library/corridor-0471.webp', alt: 'Downtown sidewalk with green awning and brick walkway', score: 0.634, tags: ['downtown', 'storefront', 'brick'], corridorNum: 471 },
  { src: '/images/library/corridor-0342.webp', alt: 'Historic Natchez storefront with striped awning', score: 0.628, tags: ['downtown', 'storefront'], corridorNum: 342 },

  // ── Streets & Residential ───────────────────────────────────────────────────
  { src: '/images/library/corridor-0611.webp', alt: 'Tree-lined Natchez residential street with live oaks', score: 0.639, tags: ['street', 'live-oak', 'residential'], corridorNum: 611 },
  { src: '/images/library/corridor-0591.webp', alt: 'Quiet Natchez street with arching trees and dappled light', score: 0.632, tags: ['street', 'residential'], corridorNum: 591 },
  { src: '/images/library/corridor-0621.webp', alt: 'Wide residential street with bare winter trees in Natchez', score: 0.623, tags: ['street', 'residential'], corridorNum: 621 },
  { src: '/images/library/corridor-0612.webp', alt: 'Natchez neighborhood with mansions and live oaks', score: 0.608, tags: ['street', 'residential', 'mansion'], corridorNum: 612 },
  { src: '/images/library/corridor-0594.webp', alt: 'Natchez street with spring foliage and historic homes', score: 0.606, tags: ['street', 'residential'], corridorNum: 594 },

  // ── Marina & Waterfront ─────────────────────────────────────────────────────
  { src: '/images/library/corridor-0954.webp', alt: 'Teal shrimp boat at Ocean Springs marina dock', score: 0.667, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 954 },
  { src: '/images/library/corridor-0952.webp', alt: 'Shrimp boat with nets and rigging at Ocean Springs harbor', score: 0.632, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 952 },
  { src: '/images/library/corridor-0953.webp', alt: 'Shrimp boat "My Son" docked at Ocean Springs pier', score: 0.624, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 953 },
  { src: '/images/library/corridor-0970.webp', alt: 'Weathered shrimp boat rigging against blue sky', score: 0.625, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 970 },
  { src: '/images/library/corridor-0967.webp', alt: 'Blue shrimp boat "Miss Lily" at Ocean Springs dock', score: 0.622, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 967 },
  { src: '/images/library/corridor-0969.webp', alt: 'Shrimp boat masts and rigging at golden hour', score: 0.611, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 969 },

  // ── Historic Buildings & Details ────────────────────────────────────────────
  { src: '/images/library/corridor-0299.webp', alt: 'Historic Natchez building with iron balcony details', score: 0.694, tags: ['downtown', 'iron-fence'], corridorNum: 299 },
  { src: '/images/library/corridor-0300.webp', alt: 'Natchez historic building facade with ornate ironwork', score: 0.686, tags: ['downtown', 'iron-fence'], corridorNum: 300 },
  { src: '/images/library/corridor-0295.webp', alt: 'Historic two-story building in downtown Natchez', score: 0.637, tags: ['downtown', 'brick'], corridorNum: 295 },
  { src: '/images/library/corridor-0316.webp', alt: 'Natchez downtown corner building with columns', score: 0.619, tags: ['downtown', 'brick'], corridorNum: 316 },
  { src: '/images/library/corridor-0320.webp', alt: 'Historic Natchez streetscape in afternoon light', score: 0.617, tags: ['downtown', 'street'], corridorNum: 320 },
  { src: '/images/library/corridor-0305.webp', alt: 'Downtown Natchez brick building with awning', score: 0.604, tags: ['downtown', 'storefront', 'brick'], corridorNum: 305 },
  { src: '/images/library/corridor-0304.webp', alt: 'Natchez main street architecture with columns', score: 0.601, tags: ['downtown', 'brick'], corridorNum: 304 },
  { src: '/images/library/corridor-0430.webp', alt: 'Downtown Natchez with spring trees and brick facades', score: 0.603, tags: ['downtown', 'street', 'brick'], corridorNum: 430 },
  { src: '/images/library/corridor-0340.webp', alt: 'Natchez downtown with green awning over brick walk', score: 0.612, tags: ['downtown', 'storefront', 'brick'], corridorNum: 340 },
  { src: '/images/library/corridor-0341.webp', alt: 'Historic Natchez building with striped awning', score: 0.622, tags: ['downtown', 'storefront'], corridorNum: 341 },
  { src: '/images/library/corridor-0292.webp', alt: 'Natchez Under-the-Hill district architecture', score: 0.604, tags: ['downtown', 'brick'], corridorNum: 292 },
  { src: '/images/library/corridor-0641.webp', alt: 'Southern cottage with porch and climbing vines', score: 0.620, tags: ['cottage', 'garden', 'residential'], corridorNum: 641 },
  { src: '/images/library/corridor-0651.webp', alt: 'Historic home with columned porch in Natchez', score: 0.610, tags: ['cottage', 'residential'], corridorNum: 651 },
];

// ── Query Helpers ──────────────────────────────────────────────────────────────

/** Get photos by tag, sorted by quality score. */
export function getPhotosByTag(tag: PhotoTag): LibraryPhoto[] {
  return LIBRARY.filter((p) => p.tags.includes(tag)).sort((a, b) => b.score - a.score);
}

/** Get photos matching ANY of the given tags. */
export function getPhotosByTags(tags: PhotoTag[]): LibraryPhoto[] {
  return LIBRARY.filter((p) => tags.some((t) => p.tags.includes(t))).sort((a, b) => b.score - a.score);
}

/** Get the top N photos overall. */
export function getTopPhotos(n = 10): LibraryPhoto[] {
  return [...LIBRARY].sort((a, b) => b.score - a.score).slice(0, n);
}

/** Get a random selection of N photos, optionally filtered by tag. */
export function getRandomPhotos(n = 6, tag?: PhotoTag): LibraryPhoto[] {
  const pool = tag ? getPhotosByTag(tag) : [...LIBRARY];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/** All unique tags in the library. */
export function getAllTags(): PhotoTag[] {
  const tags: PhotoTag[] = [];
  LIBRARY.forEach((p) => p.tags.forEach((t) => {
    if (!tags.includes(t)) tags.push(t);
  }));
  return tags.sort();
}
