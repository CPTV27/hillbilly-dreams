// apps/web/app/media/publications/page.tsx
// Deep South Press — public publications showcase.
// Server component. ISR revalidate 300s.

import type { Metadata } from 'next';
import type { Publication } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'Deep South Press | Books & Print from the Mississippi Corridor',
  description:
    'Small-run books, portrait photography, and art publications from Deep South Press — the publishing arm of Big Muddy Media. Natchez, Mississippi and beyond.',
  openGraph: {
    title: 'Deep South Press',
    description: 'Small-run books, portraits, and art from the Mississippi corridor.',
    type: 'website',
  },
};

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

async function getPublications(statuses: string[]): Promise<Publication[]> {
  try {
    const params = new URLSearchParams({ status: statuses.join(',') });
    const res = await fetch(`${baseUrl}/api/publications?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : (json.data ?? []);
  } catch {
    return [];
  }
}

async function getUpcoming(): Promise<Publication[]> {
  try {
    const params = new URLSearchParams({ status: 'draft,production' });
    const res = await fetch(`${baseUrl}/api/publications?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : (json.data ?? []);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatPrice(cents: number | null | undefined): string {
  if (cents == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(cents / 100);
}

function statusLabel(status: string): string {
  if (status === 'preorder') return 'Pre-Order';
  if (status === 'available') return 'Available';
  if (status === 'sold-out') return 'Sold Out';
  return status;
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function FormatBadge({ format }: { format: string }) {
  return (
    <span className="dsp-badge dsp-badge--format">
      {format.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === 'available'
    ? 'dsp-badge dsp-badge--available'
    : status === 'preorder'
    ? 'dsp-badge dsp-badge--preorder'
    : status === 'sold-out'
    ? 'dsp-badge dsp-badge--sold-out'
    : 'dsp-badge dsp-badge--default';
  return <span className={cls}>{statusLabel(status)}</span>;
}

function PublicationCard({ pub }: { pub: Publication }) {
  const orderUrl = pub.shopifyUrl || pub.printUrl;
  const excerpt = pub.description && pub.description.length > 130
    ? pub.description.slice(0, 127) + '…'
    : pub.description;

  return (
    <article className="dsp-card" aria-label={pub.title}>
      <a href={`/media/publications/${pub.slug}`} className="dsp-card__image-link" tabIndex={-1} aria-hidden="true">
        {pub.coverImageUrl ? (
          <div className="dsp-card__image-wrap">
            <img
              src={pub.coverImageUrl}
              alt={`Cover of ${pub.title}`}
              className="dsp-card__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="dsp-card__image-placeholder" aria-hidden="true">
            <span className="dsp-card__placeholder-icon">◻</span>
          </div>
        )}
      </a>
      <div className="dsp-card__body">
        <div className="dsp-card__badges">
          <FormatBadge format={pub.format as string} />
          <StatusBadge status={pub.status as string} />
        </div>
        <a href={`/media/publications/${pub.slug}`} className="dsp-card__title-link">
          <h2 className="dsp-card__title">{pub.title}</h2>
        </a>
        {pub.subtitle && <p className="dsp-card__subtitle">{pub.subtitle}</p>}
        <p className="dsp-card__author">by {pub.author}</p>
        {excerpt && <p className="dsp-card__excerpt">{excerpt}</p>}
        <div className="dsp-card__footer">
          {pub.price != null && (
            <span className="dsp-card__price">{formatPrice(pub.price)}</span>
          )}
          {orderUrl && pub.status !== 'sold-out' ? (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dsp-card__order-btn"
              aria-label={`Order ${pub.title}`}
            >
              {pub.status === 'preorder' ? 'Pre-Order →' : 'Order →'}
            </a>
          ) : pub.status === 'sold-out' ? (
            <span className="dsp-card__sold-out">Sold Out</span>
          ) : (
            <a href={`/media/publications/${pub.slug}`} className="dsp-card__order-btn">
              Learn More →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function UpcomingCard({ pub }: { pub: Publication }) {
  return (
    <article className="dsp-upcoming-card" aria-label={`Coming soon: ${pub.title}`}>
      <div className="dsp-upcoming-card__label">Coming Soon</div>
      <h3 className="dsp-upcoming-card__title">{pub.title}</h3>
      {pub.subtitle && <p className="dsp-upcoming-card__subtitle">{pub.subtitle}</p>}
      <p className="dsp-upcoming-card__author">by {pub.author}</p>
      <div className="dsp-upcoming-card__meta">
        <span>{pub.format}</span>
        {pub.pageCount && <span>{pub.pageCount} pages</span>}
        {pub.printRun && <span>Limited to {pub.printRun} copies</span>}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default async function PublicationsPage() {
  const [available, upcoming] = await Promise.all([
    getPublications(['available', 'preorder']),
    getUpcoming(),
  ]);

  const hasAvailable = available.length > 0;
  const hasUpcoming = upcoming.length > 0;

  return (
    <>
      {/* ── Hero ── */}
      <section className="dsp-hero">
        <div className="dsp-hero__bg" aria-hidden="true" />
        <div className="dsp-hero__content">
          <div className="dsp-hero__eyebrow">
            <span className="dsp-hero__ornament" aria-hidden="true">&#9670;</span>
            <span>Big Muddy Media · Publishing Arm</span>
          </div>
          <h1 className="dsp-hero__title">
            Deep South Press
          </h1>
          <p className="dsp-hero__sub">
            Small-run books, portraits, and art from the Mississippi corridor.
            Coffee table books, photography collections, and limited-edition print.
            Made in Natchez.
          </p>
          <div className="dsp-hero__rule" aria-hidden="true" />
          <p className="dsp-hero__tagline">
            Each book is a document. A place. A face. A time.
          </p>
        </div>
      </section>

      {/* ── Available & Pre-Order ── */}
      {hasAvailable && (
        <section className="dsp-available">
          <div className="section-container">
            <div className="dsp-section-header">
              <div className="section-label">Available Now</div>
              <h2 className="dsp-section-title">Books & Print</h2>
            </div>
            <div
              className="dsp-grid"
              role="list"
              aria-label="Available publications"
            >
              {available.map((pub) => (
                <div key={pub.id} role="listitem">
                  <PublicationCard pub={pub} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Coming Soon ── */}
      {hasUpcoming && (
        <section className="dsp-upcoming">
          <div className="section-container">
            <div className="dsp-section-header">
              <div className="section-label">In Development</div>
              <h2 className="dsp-section-title">Coming Soon</h2>
              <p className="dsp-section-sub">
                Projects currently in production. Each is limited-run — when they're gone, they're gone.
              </p>
            </div>
            <div className="dsp-upcoming-grid">
              {upcoming.map((pub) => (
                <UpcomingCard key={pub.id} pub={pub} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Empty state if nothing at all ── */}
      {!hasAvailable && !hasUpcoming && (
        <section className="dsp-empty-section">
          <div className="section-container">
            <div className="dsp-empty">
              <div className="dsp-empty__icon" aria-hidden="true">&#9670;</div>
              <h2 className="dsp-empty__title">First books in production.</h2>
              <p className="dsp-empty__text">
                Deep South Press is building its first run of titles — portrait photography,
                inn art, and Mississippi corridor stories. Check back soon.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── About Deep South Press ── */}
      <section className="dsp-about">
        <div className="section-container">
          <div className="dsp-about__inner">
            <div className="dsp-about__text">
              <div className="section-label">About</div>
              <h2 className="dsp-about__title">Deep South Press</h2>
              <p className="dsp-about__body">
                Deep South Press is the publishing arm of Big Muddy Media. We produce
                small-run, high-quality printed books focused on the people, places, and art
                of the Mississippi corridor — with a focus on Natchez, the Blues Highway,
                and the communities along the river.
              </p>
              <p className="dsp-about__body">
                Every title is limited-run. When the print run sells out, it's gone. We don't
                reprint. That's the point.
              </p>
            </div>
            <div className="dsp-about__links">
              <a href="/media/directory" className="dsp-about__link">
                <span className="dsp-about__link-label">Deep South Directory</span>
                <span className="dsp-about__link-arrow">→</span>
              </a>
              <a href="https://bigmuddymagazine.com" className="dsp-about__link" target="_blank" rel="noopener noreferrer">
                <span className="dsp-about__link-label">Big Muddy Magazine</span>
                <span className="dsp-about__link-arrow">↗</span>
              </a>
              <a href="https://bigmuddytouring.com/inn" className="dsp-about__link" target="_blank" rel="noopener noreferrer">
                <span className="dsp-about__link-label">The Big Muddy Inn</span>
                <span className="dsp-about__link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .dsp-hero {
          position: relative;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .dsp-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 30% -10%, rgba(200, 148, 62, 0.09) 0%, transparent 60%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 80px,
              rgba(200, 148, 62, 0.02) 80px,
              rgba(200, 148, 62, 0.02) 81px
            );
        }
        .dsp-hero__content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-24) var(--space-6) var(--space-20);
        }
        .dsp-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-6);
        }
        .dsp-hero__ornament {
          font-size: 8px;
        }
        .dsp-hero__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.03em;
          line-height: 0.95;
          margin: 0 0 var(--space-6);
        }
        .dsp-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 520px;
          margin: 0 0 var(--space-8);
        }
        .dsp-hero__rule {
          width: 40px;
          height: 1px;
          background: var(--accent);
          opacity: 0.4;
          margin-bottom: var(--space-6);
        }
        .dsp-hero__tagline {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          color: var(--text-muted);
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ── Section layout ── */
        .dsp-available {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .dsp-section-header {
          margin-bottom: var(--space-10);
        }
        .dsp-section-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin: var(--space-2) 0 0;
        }
        .dsp-section-sub {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 480px;
          margin: var(--space-3) 0 0;
        }

        /* ── Publication grid ── */
        .dsp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 640px) {
          .dsp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .dsp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1200px) {
          .dsp-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Publication card ── */
        .dsp-card {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition:
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default),
            transform var(--duration-fast) var(--ease-default);
          height: 100%;
        }
        .dsp-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .dsp-card__image-link {
          display: block;
          text-decoration: none;
        }
        .dsp-card__image-wrap {
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--surface-2);
        }
        .dsp-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--duration-slow) var(--ease-default);
        }
        .dsp-card:hover .dsp-card__image {
          transform: scale(1.03);
        }
        .dsp-card__image-placeholder {
          width: 100%;
          aspect-ratio: 3 / 4;
          background: var(--surface-2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dsp-card__placeholder-icon {
          font-size: 32px;
          color: var(--text-disabled);
          opacity: 0.3;
        }
        .dsp-card__body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: var(--space-5);
          gap: var(--space-2);
        }
        .dsp-card__badges {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-bottom: var(--space-1);
        }
        .dsp-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: var(--radius-sm);
          line-height: 1.6;
        }
        .dsp-badge--format {
          background: var(--surface-3);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .dsp-badge--available {
          background: rgba(34, 197, 94, 0.12);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.25);
        }
        .dsp-badge--preorder {
          background: rgba(200, 148, 62, 0.12);
          color: var(--accent);
          border: 1px solid rgba(200, 148, 62, 0.25);
        }
        .dsp-badge--sold-out {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .dsp-badge--default {
          background: var(--surface-3);
          color: var(--text-disabled);
          border: 1px solid var(--border-subtle);
        }
        .dsp-card__title-link {
          text-decoration: none;
        }
        .dsp-card__title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          line-height: var(--leading-snug);
          margin: 0;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .dsp-card__title-link:hover .dsp-card__title {
          color: var(--accent);
        }
        .dsp-card__subtitle {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-style: italic;
          color: var(--text-muted);
          margin: 0;
          line-height: var(--leading-snug);
        }
        .dsp-card__author {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          margin: 0;
          text-transform: uppercase;
        }
        .dsp-card__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: var(--space-1) 0 0;
          flex: 1;
        }
        .dsp-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
        }
        .dsp-card__price {
          font-family: var(--font-mono);
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .dsp-card__order-btn {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .dsp-card__order-btn:hover {
          color: var(--accent-hover);
        }
        .dsp-card__sold-out {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }

        /* ── Upcoming / In Production ── */
        .dsp-upcoming {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .dsp-upcoming-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-5);
        }
        @media (min-width: 640px) {
          .dsp-upcoming-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .dsp-upcoming-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .dsp-upcoming-card {
          background: var(--surface-2);
          border: 1px dashed var(--border-strong);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
        }
        .dsp-upcoming-card__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.7;
          margin-bottom: var(--space-3);
        }
        .dsp-upcoming-card__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          margin: 0 0 var(--space-2);
        }
        .dsp-upcoming-card__subtitle {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-style: italic;
          color: var(--text-muted);
          margin: 0 0 var(--space-2);
        }
        .dsp-upcoming-card__author {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          margin: 0 0 var(--space-4);
        }
        .dsp-upcoming-card__meta {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }

        /* ── Empty ── */
        .dsp-empty-section {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .dsp-empty {
          text-align: center;
          padding: var(--space-24) var(--space-6);
        }
        .dsp-empty__icon {
          font-size: 24px;
          color: var(--accent);
          opacity: 0.2;
          margin-bottom: var(--space-6);
        }
        .dsp-empty__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-4);
        }
        .dsp-empty__text {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── About ── */
        .dsp-about {
          border-top: 1px solid var(--border);
          background: var(--bg);
        }
        .dsp-about__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        @media (min-width: 768px) {
          .dsp-about__inner {
            grid-template-columns: 1fr 280px;
            align-items: start;
          }
        }
        .dsp-about__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin: var(--space-2) 0 var(--space-5);
        }
        .dsp-about__body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-4);
          max-width: 520px;
        }
        .dsp-about__links {
          display: flex;
          flex-direction: column;
          gap: 1px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .dsp-about__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-5);
          background: var(--surface);
          text-decoration: none;
          transition: background var(--duration-fast) var(--ease-default);
          border-bottom: 1px solid var(--border);
        }
        .dsp-about__link:last-child {
          border-bottom: none;
        }
        .dsp-about__link:hover {
          background: var(--surface-2);
        }
        .dsp-about__link-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
        }
        .dsp-about__link-arrow {
          font-size: var(--text-sm);
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
