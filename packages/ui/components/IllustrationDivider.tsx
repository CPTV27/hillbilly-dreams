// packages/ui/components/IllustrationDivider.tsx
// Decorative illustration strip between content sections.
// Uses watercolor or botanical lookbook images at low opacity.

const GCS_BASE = 'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook';

const DIVIDER_IMAGES = {
  'river': `${GCS_BASE}/10-watercolor/river-golden-hour.webp`,
  'cotton': `${GCS_BASE}/10-watercolor/cotton-field.webp`,
  'town': `${GCS_BASE}/10-watercolor/small-town-street.webp`,
  'wildflowers': `${GCS_BASE}/05-botanical/delta-wildflowers.webp`,
  'oak': `${GCS_BASE}/05-botanical/live-oak-spanish-moss.webp`,
  'magnolia': `${GCS_BASE}/05-botanical/magnolia-bloom.webp`,
} as const;

type DividerVariant = keyof typeof DIVIDER_IMAGES;

export function IllustrationDivider({
  variant = 'river',
  height = 120,
  opacity = 0.15,
}: {
  variant?: DividerVariant;
  height?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        height,
        backgroundImage: `url(${DIVIDER_IMAGES[variant]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
}
