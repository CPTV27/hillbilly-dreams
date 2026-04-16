'use client';

// apps/web/app/gallery/clients/brittany/page.tsx
// Client delivery gallery — Brittany family session
// Golden hour maternity shoot, Natchez MS, Big Muddy Inn guests

import { useState } from 'react';

const PHOTOS = [
  { id: 'for03355', src: '/images/gallery/clients/brittany/for03355.webp', orientation: 'portrait' as const },
  { id: 'for03359', src: '/images/gallery/clients/brittany/for03359.webp', orientation: 'portrait' as const },
  { id: 'for03367', src: '/images/gallery/clients/brittany/for03367.webp', orientation: 'portrait' as const },
  { id: 'for03370', src: '/images/gallery/clients/brittany/for03370.webp', orientation: 'portrait' as const },
  { id: 'for03372', src: '/images/gallery/clients/brittany/for03372.webp', orientation: 'portrait' as const },
  { id: 'for03375', src: '/images/gallery/clients/brittany/for03375.webp', orientation: 'portrait' as const },
  { id: 'for03380', src: '/images/gallery/clients/brittany/for03380.webp', orientation: 'portrait' as const },
  { id: 'for03382', src: '/images/gallery/clients/brittany/for03382.webp', orientation: 'portrait' as const },
  { id: 'for03383', src: '/images/gallery/clients/brittany/for03383.webp', orientation: 'portrait' as const },
  { id: 'for03384', src: '/images/gallery/clients/brittany/for03384.webp', orientation: 'portrait' as const },
  { id: 'for03388', src: '/images/gallery/clients/brittany/for03388.webp', orientation: 'portrait' as const },
  { id: 'for03389', src: '/images/gallery/clients/brittany/for03389.webp', orientation: 'portrait' as const },
  { id: 'for03391', src: '/images/gallery/clients/brittany/for03391.webp', orientation: 'portrait' as const },
  { id: 'for03399', src: '/images/gallery/clients/brittany/for03399.webp', orientation: 'portrait' as const },
  { id: 'for03402', src: '/images/gallery/clients/brittany/for03402.webp', orientation: 'portrait' as const },
];

const PRINT_PRICES = [
  { size: '5x7', price: 25 },
  { size: '8x10', price: 45 },
  { size: '11x14', price: 75 },
  { size: '16x20', price: 150 },
  { size: '24x36', price: 350 },
];

const DIGITAL_DOWNLOAD = { label: 'Full Resolution Digital', price: 35 };

const GALLERY_URL = 'https://bigmuddytouring.com/gallery/clients/brittany';
const SHARE_TEXT = 'Check out our family photos from The Big Muddy Inn in Natchez!';

export default function BrittanyGalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(GALLERY_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentIndex = lightbox
    ? PHOTOS.findIndex((p) => p.id === lightbox)
    : -1;

  const goNext = () => {
    if (currentIndex < PHOTOS.length - 1) setLightbox(PHOTOS[currentIndex + 1].id);
  };
  const goPrev = () => {
    if (currentIndex > 0) setLightbox(PHOTOS[currentIndex - 1].id);
  };

  const favList = PHOTOS.filter((p) => favorites.has(p.id));

  return (
    <>
      <style>{`
        .client-photo { cursor: pointer; transition: transform 0.3s ease; }
        .client-photo:hover { transform: scale(1.02); }
        .fav-btn { cursor: pointer; transition: all 0.2s ease; border: none; background: none; }
        .fav-btn:hover { transform: scale(1.15); }
        @media (max-width: 700px) {
          .client-grid { column-count: 1 !important; }
        }
        @media (min-width: 701px) and (max-width: 1000px) {
          .client-grid { column-count: 2 !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <section
        style={{
          padding: '4rem 2rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--border, #e5e5e0)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--text-muted, #999)',
            marginBottom: '1rem',
          }}
        >
          Chase Pierson Photography
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            margin: 0,
            color: 'var(--text)',
          }}
        >
          Brittany &amp; Family
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-muted, #999)',
            marginTop: '0.75rem',
            letterSpacing: '0.05em',
          }}
        >
          Golden Hour &middot; Natchez, Mississippi &middot; The Big Muddy Inn
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--text-muted, #bbb)',
            marginTop: '1.5rem',
            maxWidth: '500px',
            margin: '1.5rem auto 0',
            lineHeight: 1.6,
          }}
        >
          Your gallery is ready. Browse, select your favorites, and order
          prints below. Digital downloads available for every image.
        </p>
      </section>

      {/* ── Photo Grid ── */}
      <section
        style={{
          padding: '3rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          className="client-grid"
          style={{ columnCount: 3, columnGap: '1rem' }}
        >
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              style={{
                breakInside: 'avoid',
                marginBottom: '1rem',
                position: 'relative',
              }}
            >
              <img
                className="client-photo"
                src={photo.src}
                alt={`Brittany session — ${photo.id}`}
                loading="lazy"
                onClick={() => setLightbox(photo.id)}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '2px',
                }}
              />
              {/* Favorite heart */}
              <button
                className="fav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(photo.id);
                }}
                aria-label={
                  favorites.has(photo.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  fontSize: '1.4rem',
                  color: favorites.has(photo.id) ? '#e25555' : 'rgba(255,255,255,0.7)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  padding: '0.25rem',
                }}
              >
                {favorites.has(photo.id) ? '\u2665' : '\u2661'}
              </button>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted, #999)',
            marginTop: '1.5rem',
          }}
        >
          {PHOTOS.length} photos &middot;{' '}
          {favorites.size > 0
            ? `${favorites.size} favorite${favorites.size !== 1 ? 's' : ''} selected`
            : 'Tap the heart to mark your favorites'}
        </p>
      </section>

      {/* ── Favorites Summary ── */}
      {favorites.size > 0 && (
        <section
          style={{
            padding: '3rem 2rem',
            maxWidth: '800px',
            margin: '0 auto',
            borderTop: '1px solid var(--border, #e5e5e0)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'var(--text)',
            }}
          >
            Your Favorites
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            {favList.map((photo) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.id}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a
              href={`mailto:studio@studiocvideo.com?subject=Print Order — Brittany Session&body=Hi there,%0A%0AI'd like to order prints of the following photos:%0A%0A${favList.map((p) => p.id).join('%0A')}%0A%0APlease send me sizing and pricing options.%0A%0AThank you!`}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '1rem 3rem',
                backgroundColor: 'var(--text, #1a1a1a)',
                color: 'var(--bg, #fff)',
                textDecoration: 'none',
                transition: 'opacity 0.3s ease',
              }}
            >
              Order These Prints
            </a>
          </div>
        </section>
      )}

      {/* ── Download & Share ── */}
      <section
        style={{
          padding: '3rem 2rem',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid var(--border, #e5e5e0)',
          backgroundColor: 'var(--surface, #fafaf8)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            color: 'var(--text)',
          }}
        >
          Download Your Photos
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: 'var(--text-muted, #666)',
            marginBottom: '1.5rem',
            maxWidth: '450px',
            margin: '0 auto 1.5rem',
          }}
        >
          Digital downloads of your full gallery are complimentary for
          Big Muddy Inn guests. If you love them, a tip is always appreciated.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="mailto:studio@studiocvideo.com?subject=Download Request — Brittany Session&body=Hi there,%0A%0APlease send me the full-resolution downloads of my gallery. Thank you!"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--text, #1a1a1a)',
              color: 'var(--bg, #fff)',
              textDecoration: 'none',
            }}
          >
            Request Downloads
          </a>
          <a
            href="mailto:studio@studiocvideo.com?subject=Tip — Brittany Session&body=Hi there,%0A%0AHere's a tip for the beautiful photos! [Stripe link coming soon]"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              border: '1px solid var(--text)',
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            Leave a Tip
          </a>
        </div>

        {/* Share buttons */}
        <div style={{ marginTop: '2.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted, #bbb)',
              marginBottom: '0.75rem',
            }}
          >
            Share This Gallery
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={copyLink}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                padding: '0.5rem 1.25rem',
                border: '1px solid var(--border, #e5e5e0)',
                backgroundColor: copied ? 'var(--text, #1a1a1a)' : 'transparent',
                color: copied ? 'var(--bg, #fff)' : 'var(--text-muted, #999)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(GALLERY_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                padding: '0.5rem 1.25rem',
                border: '1px solid var(--border, #e5e5e0)',
                color: 'var(--text-muted, #999)',
                textDecoration: 'none',
              }}
            >
              Facebook
            </a>
            <a
              href={`sms:?body=${encodeURIComponent(SHARE_TEXT + ' ' + GALLERY_URL)}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                padding: '0.5rem 1.25rem',
                border: '1px solid var(--border, #e5e5e0)',
                color: 'var(--text-muted, #999)',
                textDecoration: 'none',
              }}
            >
              Text
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent('Our Big Muddy Inn Photos')}&body=${encodeURIComponent(SHARE_TEXT + '\n\n' + GALLERY_URL)}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                padding: '0.5rem 1.25rem',
                border: '1px solid var(--border, #e5e5e0)',
                color: 'var(--text-muted, #999)',
                textDecoration: 'none',
              }}
            >
              Email
            </a>
          </div>
        </div>
      </section>

      {/* ── Print Pricing ── */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid var(--border, #e5e5e0)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            color: 'var(--text)',
          }}
        >
          Print Pricing
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {PRINT_PRICES.map((item) => (
            <div
              key={item.size}
              style={{
                padding: '1.25rem 0.75rem',
                border: '1px solid var(--border, #e5e5e0)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                }}
              >
                {item.size}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted, #999)',
                  marginTop: '0.25rem',
                }}
              >
                ${item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Digital download */}
        <div
          style={{
            padding: '1.25rem',
            border: '1px solid var(--border, #e5e5e0)',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 400,
              color: 'var(--text)',
            }}
          >
            {DIGITAL_DOWNLOAD.label}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-muted, #999)',
              marginTop: '0.25rem',
            }}
          >
            ${DIGITAL_DOWNLOAD.price} per image
          </div>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: 'var(--text-muted, #666)',
            marginBottom: '2rem',
          }}
        >
          All prints are produced on archival cotton rag paper. Digital files
          delivered at full resolution, print-ready. Payment via Stripe
          — link provided after you place your order.
        </p>

        <a
          href="mailto:studio@studiocvideo.com?subject=Photo Order — Brittany Session&body=Hi there,%0A%0AI'd like to place an order from my gallery. Here are the photos and sizes I'd like:%0A%0A"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '1rem 3rem',
            border: '1px solid var(--text)',
            color: 'var(--text)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Place an Order
        </a>
      </section>

      {/* ── Footer note ── */}
      <section
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderTop: '1px solid var(--border, #e5e5e0)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted, #bbb)',
            maxWidth: '400px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Thank you for choosing Chase Pierson Photography
          at The Big Muddy Inn. These images are for your personal use.
          Commercial licensing available on request.
        </p>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {/* Prev */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '1rem',
                opacity: 0.7,
              }}
              aria-label="Previous photo"
            >
              &#8249;
            </button>
          )}

          <img
            src={PHOTOS[currentIndex]?.src}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              cursor: 'default',
            }}
          />

          {/* Next */}
          {currentIndex < PHOTOS.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '1rem',
                opacity: 0.7,
              }}
              aria-label="Next photo"
            >
              &#8250;
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              opacity: 0.7,
            }}
            aria-label="Close lightbox"
          >
            &#x2715;
          </button>

          {/* Favorite in lightbox */}
          <button
            className="fav-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (lightbox) toggleFavorite(lightbox);
            }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '1.8rem',
              color: favorites.has(lightbox) ? '#e25555' : 'rgba(255,255,255,0.6)',
              padding: '0.5rem 1rem',
            }}
            aria-label="Toggle favorite"
          >
            {favorites.has(lightbox) ? '\u2665 Favorited' : '\u2661 Add to Favorites'}
          </button>

          {/* Counter */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em',
            }}
          >
            {currentIndex + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
}
