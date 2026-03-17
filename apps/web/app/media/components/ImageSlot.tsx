// apps/web/app/media/components/ImageSlot.tsx
// Reusable image slot for the Deep South Directory site.
// Handles real photos and warm fallback gradients for slots that haven't been
// filled yet. Designed for fill-mode layouts where the parent sets dimensions.
//
// Usage — fixed aspect ratio wrapper (most common):
//   <div style={{ position: 'relative', aspectRatio: '16/9' }}>
//     <ImageSlot src="/images/dsd/hero-mainstreet.webp" alt="..." aspectRatio="16/9" overlay />
//   </div>
//
// Usage — inside a flex/grid card that controls height:
//   <div style={{ position: 'relative', height: 240 }}>
//     <ImageSlot src="/images/dsd/southern-food.webp" alt="..." />
//   </div>
//
// Usage — above-the-fold hero (skip lazy loading):
//   <ImageSlot src="..." alt="..." priority />

'use client';

import Image from 'next/image';
import { useState, CSSProperties } from 'react';

export interface ImageSlotProps {
  /** Path like '/images/dsd/bbq-restaurant.webp' */
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. '16/9', '1/1', '4/3'. When provided the
   *  component creates its own wrapper div at this ratio so you don't need to. */
  aspectRatio?: string;
  /** Adds a dark gradient overlay from bottom — improves text legibility on
   *  top of the image. */
  overlay?: boolean;
  className?: string;
  /** Skip lazy loading for above-the-fold images. */
  priority?: boolean;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = {
  // Outer wrapper when aspectRatio prop is provided — owns the box dimensions.
  aspectWrapper: (ratio: string): CSSProperties => ({
    position: 'relative',
    width: '100%',
    aspectRatio: ratio,
    overflow: 'hidden',
  }),

  // Wrapper when no aspectRatio is given — caller's parent must be `position:
  // relative` and have a defined height for fill mode to work.
  fillWrapper: (): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  }),

  // The Next.js Image in fill mode. Hover scale is applied to this element via
  // the CSS class below so we can use a CSS transition without JS.
  imageWrap: (): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    transition: `transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
  }),

  // Warm Southern Gothic fallback — visible while the real photo loads or when
  // the file hasn't been dropped into the slot yet.
  fallback: (): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    // Layered gradients: a deep radial glow (amber, like candlelight through
    // old glass) over a near-black base that matches --bg / --surface.
    background: `
      radial-gradient(ellipse at 30% 60%, rgba(200, 148, 62, 0.18) 0%, transparent 65%),
      radial-gradient(ellipse at 75% 25%, rgba(200, 148, 62, 0.08) 0%, transparent 55%),
      linear-gradient(160deg, #2d2824 0%, #1a1816 50%, #110f0e 100%)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  // Small decorative mark inside the fallback — a subtle amber cross-hatch
  // reminiscent of old newspaper layout guides.
  fallbackMark: (): CSSProperties => ({
    width: 32,
    height: 32,
    opacity: 0.2,
    position: 'relative',
  }),

  // Optional dark overlay gradient for text readability.
  overlay: (): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(15, 12, 10, 0.85) 0%, rgba(15, 12, 10, 0.35) 40%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: 2,
  }),
} as const;

// ---------------------------------------------------------------------------
// Fallback SVG — placeholder crosshair mark, no external deps
// ---------------------------------------------------------------------------

function FallbackMark() {
  return (
    <svg
      style={styles.fallbackMark()}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <line x1="16" y1="2" x2="16" y2="30" stroke="#c8943e" strokeWidth="1.5" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#c8943e" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" stroke="#c8943e" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="12" stroke="#c8943e" strokeWidth="0.75" strokeDasharray="3 3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ImageSlot({
  src,
  alt,
  aspectRatio,
  overlay = false,
  className,
  priority = false,
}: ImageSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showFallback = !loaded || errored;

  // Inner content: fallback gradient + the actual Next/Image layer on top.
  const inner = (
    <>
      {/* Fallback gradient — always rendered, fades out when image loads */}
      <div
        style={{
          ...styles.fallback(),
          opacity: showFallback ? 1 : 0,
          transition: 'opacity 500ms ease',
        }}
        aria-hidden="true"
      >
        <FallbackMark />
      </div>

      {/* Image layer — sits on top of fallback */}
      {!errored && (
        <div
          className={`image-slot__img${loaded ? ' image-slot__img--loaded' : ''}`}
          style={styles.imageWrap()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        </div>
      )}

      {/* Optional text-readability overlay */}
      {overlay && <div style={styles.overlay()} aria-hidden="true" />}

      {/* Hover scale — scoped CSS injected once via a style tag */}
      <style>{`
        .image-slot__img {
          will-change: transform;
        }
        .image-slot__img:hover,
        *:hover > .image-slot__img {
          transform: scale(1.04);
        }
      `}</style>
    </>
  );

  // When aspectRatio is supplied the component is fully self-contained.
  if (aspectRatio) {
    return (
      <div
        style={styles.aspectWrapper(aspectRatio)}
        className={className}
        role="img"
        aria-label={alt}
      >
        {inner}
      </div>
    );
  }

  // Without aspectRatio the component fills its parent (parent must be
  // position:relative with a defined height).
  return (
    <div
      style={styles.fillWrapper()}
      className={className}
      role="img"
      aria-label={alt}
    >
      {inner}
    </div>
  );
}

export default ImageSlot;
