'use client';

// apps/web/app/snap/[code]/SnapGallery.tsx
// Client gallery component for Snap & Share.
// Mobile-first, premium feel. Dark Southern Gothic + gold accent (#C8943E).
// Receives session data as a prop — no data fetching here.
//
// Features:
//  - 2-col mobile / 3-col desktop photo grid
//  - Lightbox with prev/next keyboard nav (arrow keys + Escape)
//  - Native share (Web Share API) with clipboard fallback
//  - "That's me!" claim flow with name / email / instagram
//  - Print order CTA (placeholder — "Coming Soon")
//  - Social follow CTAs

import { useState, useEffect, useCallback } from 'react';
import type { SessionData, PhotoData } from './page';

// ─── Helpers ─────────────────────────────────────────────────
function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─── Style helpers ────────────────────────────────────────────
type BtnVariant = 'accent' | 'ghost' | 'ghost-dim' | 'success';

function btnStyle(variant: BtnVariant): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    borderRadius: '6px',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };
  if (variant === 'accent')    return { ...base, background: 'var(--accent)',              color: 'var(--bg)',            borderColor: 'var(--accent)' };
  if (variant === 'success')   return { ...base, background: 'rgba(52,199,89,0.12)',       color: '#34c759',             borderColor: 'rgba(52,199,89,0.3)' };
  if (variant === 'ghost-dim') return { ...base, background: 'transparent',               color: 'var(--text-disabled)', borderColor: 'var(--border)' };
  return                              { ...base, background: 'rgba(255,255,255,0.05)',     color: 'var(--text)',          borderColor: 'rgba(255,255,255,0.12)' };
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.73rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: 'var(--bg)',
  border: '1px solid rgba(200,148,62,0.25)',
  borderRadius: '6px',
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const arrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--text)',
  fontSize: '20px',
  zIndex: 10,
};

// ─── Claim Modal ──────────────────────────────────────────────
function ClaimModal({
  photo,
  onClose,
  onClaimed,
}: {
  photo: PhotoData;
  onClose: () => void;
  onClaimed: () => void;
}) {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [instagram, setInstagram] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]           = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/snap/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId: photo.id, name, email, instagram, shared: false }),
      });
    } catch {
      // Non-blocking — show success regardless
    } finally {
      setDone(true);
      onClaimed();
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8, 7, 6, 0.94)',
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Claim this photo"
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(200,148,62,0.28)',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', color: 'var(--accent)', marginBottom: '16px' }}>&#9670;</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--accent)', margin: '0 0 10px' }}>
              You&apos;re in the frame.
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, margin: '0 0 24px' }}>
              We&apos;ve got your info. Check your inbox for the full-res download — and tag us when you post.
            </p>
            <button onClick={onClose} style={btnStyle('accent')}>Done</button>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text)', margin: '0 0 6px' }}>
              That&apos;s me in this photo
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', margin: '0 0 24px', lineHeight: 1.65 }}>
              Drop your info and we&apos;ll send you a high-res copy — on us.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle} htmlFor="claim-name">Your name</label>
                <input
                  id="claim-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bessie Smith"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="claim-email">
                  Email <span style={{ color: 'var(--text-disabled)', fontWeight: 400 }}>(for your free download)</span>
                </label>
                <input
                  id="claim-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="claim-instagram">
                  Instagram <span style={{ color: 'var(--text-disabled)', fontWeight: 400 }}>(optional, for the tag)</span>
                </label>
                <input
                  id="claim-instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@yourhandle"
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button type="submit" disabled={submitting} style={{ ...btnStyle('accent'), flex: 1 }}>
                  {submitting ? 'Sending…' : 'Send my photo'}
                </button>
                <button type="button" onClick={onClose} style={{ ...btnStyle('ghost'), flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Print Order Modal ────────────────────────────────────────
function PrintOrderModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8, 7, 6, 0.94)',
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Order a print"
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(200,148,62,0.28)',
          borderRadius: '12px',
          padding: '36px 32px',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
          Coming Soon
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text)', margin: '0 0 12px', lineHeight: 1.2 }}>
          Museum-Quality Prints
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 10px' }}>
          <strong style={{ color: 'var(--accent)' }}>$20</strong> per 8&times;10 print, shipped to your door.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 28px' }}>
          Archival pigment on fine-art paper. These aren&apos;t Walgreens prints.
          We&apos;ll notify you when ordering goes live.
        </p>
        <button onClick={onClose} style={btnStyle('accent')}>Got it</button>
      </div>
    </div>
  );
}

// ─── Photo Lightbox ───────────────────────────────────────────
function PhotoLightbox({
  photo,
  session,
  onClose,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}: {
  photo: PhotoData;
  session: SessionData;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [showClaim,     setShowClaim]     = useState(false);
  const [showPrint,     setShowPrint]     = useState(false);
  const [claimed,       setClaimed]       = useState(false);
  const [shareSuccess,  setShareSuccess]  = useState(false);

  const galleryUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/snap/${session.code}`
      : `https://bigmuddyinn.com/snap/${session.code}`;

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: session.name,
          text: `Check out this photo from ${session.name} at ${session.location}`,
          url: galleryUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch {
        // User cancelled — not an error
      }
    } else {
      try {
        await navigator.clipboard.writeText(galleryUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch {
        /* ignore */
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showClaim || showPrint) return;
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft'  && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev, hasNext, hasPrev, showClaim, showPrint]);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={photo.caption ?? 'Photo viewer'}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6, 5, 4, 0.97)',
          zIndex: 300,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close photo viewer"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '20px',
            zIndex: 10,
            lineHeight: 1,
          }}
        >
          &#215;
        </button>

        {/* Prev arrow */}
        {hasPrev && (
          <button
            onClick={onPrev}
            aria-label="Previous photo"
            style={{ ...arrowStyle, left: '12px' }}
          >
            &#8592;
          </button>
        )}

        {/* Next arrow */}
        {hasNext && (
          <button
            onClick={onNext}
            aria-label="Next photo"
            style={{ ...arrowStyle, right: '12px' }}
          >
            &#8594;
          </button>
        )}

        {/* Photo */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '56px 64px 8px',
            minHeight: 0,
          }}
          onClick={onClose}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.caption ?? 'Event photo'}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '3px',
              display: 'block',
              boxShadow: '0 8px 60px rgba(0,0,0,0.8)',
            }}
          />
        </div>

        {/* Bottom action tray */}
        <div
          style={{
            borderTop: '1px solid rgba(200,148,62,0.10)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            flexShrink: 0,
          }}
        >
          {/* Caption */}
          {photo.caption && (
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
              {photo.caption}
            </p>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleShare}
              style={btnStyle(shareSuccess ? 'success' : 'accent')}
              aria-label="Share this photo gallery"
            >
              {shareSuccess ? 'Link copied' : 'Share'}
            </button>
            <button
              onClick={() => !claimed && setShowClaim(true)}
              style={btnStyle(claimed ? 'ghost-dim' : 'ghost')}
              aria-label="Claim this photo"
            >
              {claimed ? 'Claimed' : "That's me!"}
            </button>
            <button
              onClick={() => setShowPrint(true)}
              style={btnStyle('ghost')}
              aria-label="Order a print of this photo"
            >
              Order Print
            </button>
          </div>

          {/* Social follow CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
            <a
              href="https://instagram.com/bigmuddyinn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', textDecoration: 'none', letterSpacing: '0.09em', textTransform: 'uppercase' }}
            >
              Instagram
            </a>
            <span style={{ color: 'rgba(200,148,62,0.3)', fontSize: '8px' }}>&#9670;</span>
            <a
              href="https://tiktok.com/@bigmuddyinn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', textDecoration: 'none', letterSpacing: '0.09em', textTransform: 'uppercase' }}
            >
              TikTok
            </a>
            <span style={{ color: 'rgba(200,148,62,0.3)', fontSize: '8px' }}>&#9670;</span>
            <a
              href="https://bigmuddyinn.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', textDecoration: 'none', letterSpacing: '0.09em', textTransform: 'uppercase' }}
            >
              Book a Room
            </a>
          </div>
        </div>
      </div>

      {showClaim && (
        <ClaimModal
          photo={photo}
          onClose={() => setShowClaim(false)}
          onClaimed={() => { setClaimed(true); setShowClaim(false); }}
        />
      )}

      {showPrint && (
        <PrintOrderModal onClose={() => setShowPrint(false)} />
      )}
    </>
  );
}

// ─── Main Gallery Component ───────────────────────────────────
export function SnapGallery({ session }: { session: SessionData }) {
  const photos = [...session.photos].sort((a, b) => a.sortOrder - b.sortOrder);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openPhoto  = useCallback((i: number) => setActiveIndex(i), []);
  const closePhoto = useCallback(() => setActiveIndex(null), []);
  const goNext     = useCallback(() => setActiveIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);
  const goPrev     = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          background: 'var(--bg)',
          borderBottom: '1px solid rgba(200,148,62,0.12)',
          padding: '72px 24px 44px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Radial gold bleed */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(200,148,62,0.09) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}
        />
        {/* Subtle horizontal rule texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,148,62,0.018) 60px, rgba(200,148,62,0.018) 61px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '22px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--accent)', opacity: 0.45 }} />
            Photography by Chase Pierson
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--accent)', opacity: 0.45 }} />
          </div>

          {/* Session name */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5.5vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              margin: '0 0 12px',
            }}
          >
            {session.name}
          </h1>

          {/* Location */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}>
            {session.location}
          </p>

          {/* Date */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-disabled)',
            letterSpacing: '0.09em',
            margin: '0 0 22px',
          }}>
            {formatEventDate(session.date)}
          </p>

          {/* Description */}
          {session.description && (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: '460px',
              margin: '0 auto 26px',
            }}>
              {session.description}
            </p>
          )}

          {/* Social proof pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(200,148,62,0.07)',
            border: '1px solid rgba(200,148,62,0.18)',
            borderRadius: '100px',
            padding: '6px 16px',
            fontSize: '0.73rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            color: 'var(--accent)',
            letterSpacing: '0.04em',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            {session.totalShares} people shared from this event
          </div>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section style={{ background: 'var(--bg)', padding: '28px 14px 72px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="snap-grid">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => openPhoto(index)}
                className="snap-card"
                aria-label={photo.caption ? `View: ${photo.caption}` : `View photo ${index + 1}`}
              >
                <div className="snap-card__img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.thumbnailUrl ?? photo.url}
                    alt={photo.caption ?? `Event photo ${index + 1}`}
                    className="snap-card__img"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  <div className="snap-card__overlay" aria-hidden="true">
                    <div className="snap-card__overlay-inner">
                      {photo.caption && (
                        <p className="snap-card__caption">{photo.caption}</p>
                      )}
                      <span className="snap-card__cta">View</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Grid instruction — mobile hint */}
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-disabled)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Tap any photo to view, share, or claim
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid rgba(200,148,62,0.10)',
        padding: '36px 24px 44px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--text-muted)',
          margin: '0 0 4px',
        }}>
          Photos by Chase Pierson
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.67rem',
          color: 'var(--text-disabled)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 24px',
        }}>
          Big Muddy Entertainment &middot; Natchez, Mississippi
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
          {[
            { label: 'Instagram', href: 'https://instagram.com/bigmuddyinn' },
            { label: 'TikTok',    href: 'https://tiktok.com/@bigmuddyinn' },
            { label: 'Book a Room', href: 'https://bigmuddyinn.com' },
          ].map((link, i, arr) => (
            <span key={link.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px' }}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.72rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.09em', textTransform: 'uppercase' }}
              >
                {link.label}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(200,148,62,0.25)', fontSize: '8px' }}>&#9670;</span>
              )}
            </span>
          ))}
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {activeIndex !== null && (
        <PhotoLightbox
          photo={photos[activeIndex]}
          session={session}
          onClose={closePhoto}
          onNext={goNext}
          onPrev={goPrev}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < photos.length - 1}
        />
      )}

      {/* ── Styles ── */}
      <style>{`
        /* 2-col mobile, 3-col desktop */
        .snap-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        @media (min-width: 640px) {
          .snap-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }

        /* Photo card button reset */
        .snap-card {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: block;
          width: 100%;
          text-align: left;
        }
        .snap-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* Image container */
        .snap-card__img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 4px;
          background: var(--surface);
        }
        @media (min-width: 640px) {
          .snap-card__img-wrap {
            border-radius: 6px;
          }
        }

        /* Photo image */
        .snap-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .snap-card:hover .snap-card__img,
        .snap-card:focus-visible .snap-card__img {
          transform: scale(1.05);
        }

        /* Hover overlay */
        .snap-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 7, 6, 0.88) 0%,
            rgba(8, 7, 6, 0.18) 55%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.22s ease;
          display: flex;
          align-items: flex-end;
        }
        .snap-card:hover .snap-card__overlay,
        .snap-card:focus-visible .snap-card__overlay {
          opacity: 1;
        }
        .snap-card__overlay-inner {
          padding: 10px 12px;
          width: 100%;
        }
        .snap-card__caption {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.73rem;
          color: rgba(255,255,255,0.82);
          margin: 0 0 4px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .snap-card__cta {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
