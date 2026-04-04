// apps/web/app/bearsville/studio-c-photos.ts
// Photo catalog for Studio C / Utopia Studios — Bearsville Creative
// Categories assigned by filename inference. Chase should review and recategorize
// after visual inspection of each photo.

export type PhotoCategory =
  | 'console'       // mixing desk, fader close-ups, outboard gear
  | 'tracking-room' // live room, acoustic panels, drum kit placement
  | 'microphone'    // mic stands, ribbon mics, condensers
  | 'engineer'      // people at the board, headphone moments
  | 'session'       // musicians tracking, performers in the booth
  | 'gear-detail'   // patch bays, vintage compressors, cable runs
  | 'exterior'      // building, grounds
  | 'uncategorized'; // needs Chase's eye

export interface StudioPhoto {
  src: string;
  alt: string;
  category: PhotoCategory;
  notes?: string;
}

// ─── Studio C / Utopia Demo Day Photos (59 files) ────────────────────────────
// These need visual review by Chase to confirm categories.
// Current assignments are best guesses from filename order.
export const STUDIO_C_PHOTOS: StudioPhoto[] = [
  { src: '/images/studio-c/utopiademo-day-2.webp', alt: 'Utopia demo day — 2', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-3.webp', alt: 'Utopia demo day — 3', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-10.webp', alt: 'Studio C console — faders and meters', category: 'console' },
  { src: '/images/studio-c/utopiademo-day-11.webp', alt: 'Outboard rack at Utopia Studios', category: 'gear-detail' },
  { src: '/images/studio-c/utopiademo-day-12.webp', alt: 'Control room monitoring — near-field speakers', category: 'console' },
  { src: '/images/studio-c/utopiademo-day-13.webp', alt: 'Patch bay and signal routing', category: 'gear-detail' },
  { src: '/images/studio-c/utopiademo-day-14.webp', alt: 'Vintage compressor and EQ rack', category: 'gear-detail' },
  { src: '/images/studio-c/utopiademo-day-15.webp', alt: 'Microphone collection — condensers and ribbons', category: 'microphone' },
  { src: '/images/studio-c/utopiademo-day-16.webp', alt: 'Cable runs and studio wiring detail', category: 'gear-detail' },
  { src: '/images/studio-c/utopiademo-day-17.webp', alt: 'Studio C live room — acoustic panels and drum kit', category: 'tracking-room' },
  { src: '/images/studio-c/utopiademo-day-18.webp', alt: 'Utopia Studios tracking room — wide angle', category: 'tracking-room' },
  { src: '/images/studio-c/utopiademo-day-19.webp', alt: 'Studio C session in progress', category: 'session' },
  { src: '/images/studio-c/utopiademo-day-20.webp', alt: 'Microphone setup at Utopia', category: 'microphone' },
  { src: '/images/studio-c/utopiademo-day-21.webp', alt: 'Utopia demo day — 21', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-22.webp', alt: 'Engineer at the console', category: 'engineer' },
  { src: '/images/studio-c/utopiademo-day-23.webp', alt: 'Utopia demo day — 23', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-24.webp', alt: 'Tracking room detail', category: 'tracking-room' },
  { src: '/images/studio-c/utopiademo-day-25.webp', alt: 'Microphone setup — close up', category: 'microphone' },
  { src: '/images/studio-c/utopiademo-day-26.webp', alt: 'Gear detail at Utopia Studios', category: 'gear-detail' },
  { src: '/images/studio-c/utopiademo-day-27.webp', alt: 'Utopia demo day — 27', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-28.webp', alt: 'Studio C production setup', category: 'session' },
  { src: '/images/studio-c/utopiademo-day-29.webp', alt: 'Console detail', category: 'console' },
  { src: '/images/studio-c/utopiademo-day-30.webp', alt: 'Studio C production setup', category: 'session' },
  { src: '/images/studio-c/utopiademo-day-31.webp', alt: 'Utopia demo day — 31', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-32.webp', alt: 'Utopia Studios gear', category: 'gear-detail' },
  { src: '/images/studio-c/utopiademo-day-33.webp', alt: 'Utopia demo day — 33', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-34.webp', alt: 'Studio C control room', category: 'console' },
  { src: '/images/studio-c/utopiademo-day-35.webp', alt: 'Utopia demo day — 35', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-36.webp', alt: 'Studio C wide angle', category: 'tracking-room' },
  { src: '/images/studio-c/utopiademo-day-37.webp', alt: 'Utopia demo day — 37', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-38.webp', alt: 'Utopia demo day — 38', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-39.webp', alt: 'Utopia demo day — 39', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-40.webp', alt: 'Utopia demo day — 40', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-41.webp', alt: 'Utopia demo day — 41', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-42.webp', alt: 'Utopia demo day — 42', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-43.webp', alt: 'Utopia demo day — 43', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-44.webp', alt: 'Utopia demo day — 44', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-45.webp', alt: 'Utopia demo day — 45', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-46.webp', alt: 'Utopia demo day — 46', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-47.webp', alt: 'Utopia demo day — 47', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-48.webp', alt: 'Utopia demo day — 48', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-49.webp', alt: 'Utopia demo day — 49', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-50.webp', alt: 'Utopia demo day — 50', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-51.webp', alt: 'Utopia demo day — 51', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-52.webp', alt: 'Utopia demo day — 52', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-53.webp', alt: 'Utopia demo day — 53', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-54.webp', alt: 'Utopia demo day — 54', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-55.webp', alt: 'Utopia demo day — 55', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-56.webp', alt: 'Utopia demo day — 56', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-57.webp', alt: 'Utopia demo day — 57', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-58.webp', alt: 'Utopia demo day — 58', category: 'uncategorized' },
  { src: '/images/studio-c/utopiademo-day-59.webp', alt: 'Utopia demo day — 59', category: 'uncategorized' },
];

// ─── Processed Bearsville Photos ─────────────────────────────────────────────
export const BEARSVILLE_SESSION_PHOTOS: StudioPhoto[] = [
  { src: '/images/processed/bearsville/balk-session-01.webp', alt: 'Balk recording session — tracking day', category: 'session' },
  { src: '/images/processed/bearsville/balk-session-02.webp', alt: 'Balk session — close up', category: 'session' },
  { src: '/images/processed/bearsville/balk-session-03.webp', alt: 'Balk session — musicians in the live room', category: 'session' },
  { src: '/images/processed/bearsville/balk-session-04.webp', alt: 'Balk session — full room', category: 'session' },
  { src: '/images/processed/bearsville-matt-pond-studio-01.webp', alt: 'Matt Pond recording at Utopia Studios', category: 'session' },
  { src: '/images/processed/bearsville-matt-pond-studio-02.webp', alt: 'Matt Pond at the console', category: 'engineer' },
  { src: '/images/processed/bearsville-studio-session-01.webp', alt: 'Demo day — recording in progress', category: 'session' },
  { src: '/images/processed/bearsville-studio-session-02.webp', alt: 'Control room during session', category: 'console' },
  { src: '/images/processed/bearsville-studio-session-03.webp', alt: 'Studio C equipment and tracking room', category: 'tracking-room' },
  { src: '/images/processed/bearsville-studio-session-04.webp', alt: 'Recording session at Utopia Studios', category: 'session' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getPhotosByCategory(category: PhotoCategory): StudioPhoto[] {
  return [...STUDIO_C_PHOTOS, ...BEARSVILLE_SESSION_PHOTOS].filter(p => p.category === category);
}

export function getAllStudioPhotos(): StudioPhoto[] {
  return [...STUDIO_C_PHOTOS, ...BEARSVILLE_SESSION_PHOTOS];
}

export function getUncategorizedPhotos(): StudioPhoto[] {
  return STUDIO_C_PHOTOS.filter(p => p.category === 'uncategorized');
}

// Summary: 59 Studio C + 10 processed Bearsville = 69 studio photos total
// ~30 categorized, ~39 need Chase's visual review
