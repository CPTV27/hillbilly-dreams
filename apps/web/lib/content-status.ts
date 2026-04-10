/**
 * Content-Status Badge System
 *
 * Tracks provenance of photos and copy on presentation pages.
 * Badges render as small overlays so Chase can see what's final vs borrowed vs placeholder.
 */

export type ImageStatus = 'final' | 'borrowed' | 'ai' | 'placeholder';
export type CopyStatus = 'human' | 'hybrid' | 'ai-draft' | 'placeholder';

/** Badge colors by status */
export const IMAGE_BADGE: Record<ImageStatus, { label: string; bg: string; color: string } | null> = {
  final: null, // no overlay
  borrowed: { label: 'BORROWED', bg: 'rgba(0, 180, 160, 0.85)', color: '#fff' },
  ai: { label: 'AI IMAGE', bg: 'rgba(200, 148, 62, 0.85)', color: '#fff' },
  placeholder: { label: 'PLACEHOLDER', bg: 'rgba(200, 60, 60, 0.85)', color: '#fff' },
};

export const COPY_BADGE: Record<CopyStatus, { border: string } | null> = {
  human: null,
  hybrid: { border: '2px solid rgba(0, 180, 160, 0.5)' },
  'ai-draft': { border: '2px solid rgba(200, 148, 62, 0.5)' },
  placeholder: { border: '2px solid rgba(200, 60, 60, 0.5)' },
};

/** Inline styles for the badge overlay — position: absolute in top-left of a relative container */
export function imageBadgeStyle(status: ImageStatus): React.CSSProperties | null {
  const badge = IMAGE_BADGE[status];
  if (!badge) return null;
  return {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    zIndex: 10,
    padding: '4px 10px',
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    background: badge.bg,
    color: badge.color,
    borderRadius: '2px',
    pointerEvents: 'none' as const,
  };
}

/** Inline styles for copy status — adds a colored left border */
export function copyStatusStyle(status: CopyStatus): React.CSSProperties {
  const badge = COPY_BADGE[status];
  if (!badge) return {};
  return {
    borderLeft: badge.border,
    paddingLeft: '12px',
  };
}
