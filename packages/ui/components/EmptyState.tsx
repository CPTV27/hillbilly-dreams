// packages/ui/components/EmptyState.tsx
// Illustrated empty state for when no content is loaded.
// Uses folk-art or watercolor illustrations.

const GCS_BASE = 'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook';

const EMPTY_IMAGES = {
  'folk-art': `${GCS_BASE}/08-folk-art/town-dancing.webp`,
  'watercolor': `${GCS_BASE}/10-watercolor/small-town-street.webp`,
  'community': `${GCS_BASE}/08-folk-art/community-quilt.webp`,
} as const;

type EmptyVariant = keyof typeof EMPTY_IMAGES;

export function EmptyState({
  variant = 'folk-art',
  message = 'Nothing here yet — check back soon.',
}: {
  variant?: EmptyVariant;
  message?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        minHeight: 320,
        overflow: 'hidden',
        borderRadius: '12px',
        background: 'var(--surface, #1a1816)',
        border: '1px solid var(--border, #2a2520)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${EMPTY_IMAGES[variant]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />
      <p
        style={{
          position: 'relative',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          fontStyle: 'italic',
          color: 'var(--text-muted, #8a8074)',
          margin: 0,
          letterSpacing: '-0.01em',
        }}
      >
        {message}
      </p>
    </div>
  );
}
