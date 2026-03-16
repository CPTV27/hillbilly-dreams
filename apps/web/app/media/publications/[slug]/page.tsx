// apps/web/app/media/publications/[slug]/page.tsx
// Deep South Press — individual book detail page.
// Server component with generateMetadata and Schema.org Book structured data.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Publication } from '@bigmuddy/config';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

// ─────────────────────────────────────────────────────────────
// Data fetching
// ─────────────────────────────────────────────────────────────

async function getPublication(slug: string): Promise<Publication | null> {
  try {
    const res = await fetch(`${baseUrl}/api/publications?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const items: Publication[] = Array.isArray(json) ? json : (json.data ?? []);
    return items.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

async function getCityBusinesses(city: string): Promise<{ name: string; slug: string; businessType: string }[]> {
  try {
    const res = await fetch(`${baseUrl}/api/directory?city=${encodeURIComponent(city)}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items = Array.isArray(json) ? json : (json.data ?? []);
    return items.slice(0, 4);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const pub = await getPublication(params.slug);
  if (!pub) return { title: 'Book Not Found' };

  const title = pub.subtitle ? `${pub.title}: ${pub.subtitle}` : pub.title;
  const description = pub.description ?? `${pub.title} — a Deep South Press publication by ${pub.author}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'book',
      images: pub.coverImageUrl ? [{ url: pub.coverImageUrl, alt: `Cover of ${pub.title}` }] : [],
    },
    twitter: {
      card: pub.coverImageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: pub.coverImageUrl ? [pub.coverImageUrl] : [],
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatPrice(cents: number | null | undefined): string {
  if (cents == null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function capitalize(s: string): string {
  return s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    draft: 'Draft',
    production: 'In Production',
    preorder: 'Pre-Order',
    available: 'Available',
    'sold-out': 'Sold Out',
    archived: 'Archived',
  };
  return map[status] ?? status;
}

// ─────────────────────────────────────────────────────────────
// Schema.org Book JSON-LD
// ─────────────────────────────────────────────────────────────

function BookSchema({ pub }: { pub: Publication }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: pub.title,
    author: {
      '@type': 'Person',
      name: pub.author,
    },
    description: pub.description ?? undefined,
    bookFormat: pub.format === 'hardcover'
      ? 'https://schema.org/Hardcover'
      : pub.format === 'softcover'
      ? 'https://schema.org/Paperback'
      : pub.format === 'digital'
      ? 'https://schema.org/EBook'
      : undefined,
    numberOfPages: pub.pageCount ?? undefined,
    isbn: pub.isbn ?? undefined,
    image: pub.coverImageUrl ?? undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Deep South Press',
    },
    datePublished: pub.publishedAt
      ? new Date(pub.publishedAt).toISOString().split('T')[0]
      : undefined,
    offers: pub.price != null && pub.status === 'available'
      ? {
          '@type': 'Offer',
          priceCurrency: (pub.currency ?? 'usd').toUpperCase(),
          price: (pub.price / 100).toFixed(2),
          availability: 'https://schema.org/InStock',
          url: pub.shopifyUrl ?? pub.printUrl ?? undefined,
        }
      : pub.status === 'preorder' && pub.price != null
      ? {
          '@type': 'Offer',
          priceCurrency: (pub.currency ?? 'usd').toUpperCase(),
          price: (pub.price / 100).toFixed(2),
          availability: 'https://schema.org/PreOrder',
          url: pub.shopifyUrl ?? pub.printUrl ?? undefined,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

interface PageProps {
  params: { slug: string };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const pub = await getPublication(params.slug);

  if (!pub) notFound();

  const orderUrl = pub.shopifyUrl || pub.printUrl;
  const isSoldOut = pub.status === 'sold-out';
  const isPreorder = pub.status === 'preorder';
  const isAvailable = pub.status === 'available';
  const isArchived = pub.status === 'archived';

  // Fetch related city businesses if relatedCity is set
  const cityBusinesses = pub.relatedCity
    ? await getCityBusinesses(pub.relatedCity)
    : [];

  return (
    <>
      <BookSchema pub={pub} />

      {/* ── Breadcrumb ── */}
      <nav className="pub-breadcrumb" aria-label="Breadcrumb">
        <div className="section-container">
          <ol className="pub-breadcrumb__list">
            <li><a href="/media/publications" className="pub-breadcrumb__link">Deep South Press</a></li>
            <li aria-hidden="true" className="pub-breadcrumb__sep">·</li>
            <li><span className="pub-breadcrumb__current">{pub.title}</span></li>
          </ol>
        </div>
      </nav>

      {/* ── Main Detail Layout ── */}
      <section className="pub-detail">
        <div className="section-container">
          <div className="pub-detail__grid">

            {/* ── Left: Cover + Gallery ── */}
            <aside className="pub-detail__images">
              {/* Cover */}
              <div className="pub-cover-wrap">
                {pub.coverImageUrl ? (
                  <img
                    src={pub.coverImageUrl}
                    alt={`Front cover of ${pub.title}`}
                    className="pub-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="pub-cover pub-cover--empty" aria-label="No cover image">
                    <span aria-hidden="true">◻</span>
                    <span>No Cover</span>
                  </div>
                )}
              </div>

              {/* Preview images gallery */}
              {pub.previewImages && pub.previewImages.length > 0 && (
                <div className="pub-gallery" aria-label="Interior preview images">
                  <p className="pub-gallery__label">Interior Previews</p>
                  <div className="pub-gallery__grid">
                    {pub.previewImages.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Interior spread ${i + 1} of ${pub.title}`}
                        className="pub-gallery__img"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Back cover */}
              {pub.backCoverUrl && (
                <div className="pub-back-cover-wrap">
                  <p className="pub-gallery__label">Back Cover</p>
                  <img
                    src={pub.backCoverUrl}
                    alt={`Back cover of ${pub.title}`}
                    className="pub-cover pub-cover--back"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </aside>

            {/* ── Right: Details + CTA ── */}
            <div className="pub-detail__info">

              {/* Category / status badges */}
              <div className="pub-detail__badges">
                <span className="pub-badge pub-badge--category">{capitalize(pub.category as string)}</span>
                {(isAvailable || isPreorder || isSoldOut) && (
                  <span className={`pub-badge ${
                    isAvailable ? 'pub-badge--available' :
                    isPreorder ? 'pub-badge--preorder' :
                    'pub-badge--sold-out'
                  }`}>
                    {statusLabel(pub.status as string)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="pub-detail__title">{pub.title}</h1>
              {pub.subtitle && <p className="pub-detail__subtitle">{pub.subtitle}</p>}

              {/* Author + edition */}
              <p className="pub-detail__author">
                by <span className="pub-detail__author-name">{pub.author}</span>
                {pub.edition && <> · <em>{pub.edition}</em></>}
              </p>

              {/* Specs row */}
              <div className="pub-detail__specs">
                {pub.format && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">Format</span>
                    <span className="pub-spec__value">{capitalize(pub.format as string)}</span>
                  </div>
                )}
                {pub.pageCount && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">Pages</span>
                    <span className="pub-spec__value">{pub.pageCount}</span>
                  </div>
                )}
                {pub.dimensions && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">Size</span>
                    <span className="pub-spec__value">{pub.dimensions}</span>
                  </div>
                )}
                {pub.printRun && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">Print Run</span>
                    <span className="pub-spec__value">{pub.printRun.toLocaleString()} copies</span>
                  </div>
                )}
                {pub.isbn && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">ISBN</span>
                    <span className="pub-spec__value pub-spec__value--mono">{pub.isbn}</span>
                  </div>
                )}
                {pub.publishedAt && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">Published</span>
                    <span className="pub-spec__value">{formatDate(pub.publishedAt)}</span>
                  </div>
                )}
                {pub.printPartner && (
                  <div className="pub-spec">
                    <span className="pub-spec__label">Printed by</span>
                    <span className="pub-spec__value">{pub.printPartner}</span>
                  </div>
                )}
              </div>

              {/* Price + CTA */}
              <div className="pub-detail__purchase">
                {pub.price != null && (
                  <div className="pub-detail__price">{formatPrice(pub.price)}</div>
                )}

                {isSoldOut ? (
                  <div className="pub-detail__sold-out">
                    <p className="pub-detail__sold-out-text">
                      Sold Out
                      {pub.edition && ` — ${pub.edition}`}
                      {pub.printRun && ` · ${pub.printRun} copies printed`}
                    </p>
                    {pub.soldCount > 0 && (
                      <p className="pub-detail__sold-count">
                        All {pub.soldCount} copies found homes.
                      </p>
                    )}
                  </div>
                ) : isPreorder && orderUrl ? (
                  <div className="pub-detail__cta">
                    <a
                      href={orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-detail__order-btn"
                      aria-label={`Pre-order ${pub.title}`}
                    >
                      Pre-Order Now →
                    </a>
                    <p className="pub-detail__preorder-note">
                      Orders ship when the book is ready. You'll be notified before fulfillment.
                    </p>
                  </div>
                ) : isAvailable && orderUrl ? (
                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-detail__order-btn"
                    aria-label={`Order ${pub.title}`}
                  >
                    Order Now →
                  </a>
                ) : isArchived ? (
                  <p className="pub-detail__archived-note">
                    This title is no longer in print.
                  </p>
                ) : null}
              </div>

              {/* Tags */}
              {pub.tags && pub.tags.length > 0 && (
                <div className="pub-detail__tags" aria-label="Topics">
                  {pub.tags.map((tag) => (
                    <span key={tag} className="pub-tag">{tag}</span>
                  ))}
                </div>
              )}

              {/* Long description */}
              {pub.longDescription && (
                <div className="pub-detail__long-desc">
                  <div className="pub-detail__long-desc-rule" aria-hidden="true" />
                  <div className="pub-detail__long-desc-body">
                    {pub.longDescription.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related City Cross-Link ── */}
      {pub.relatedCity && cityBusinesses.length > 0 && (
        <section className="pub-city-section">
          <div className="section-container">
            <div className="pub-city-header">
              <div className="section-label">From the Deep South Directory</div>
              <h2 className="pub-city-title">
                Places in {capitalize(pub.relatedCity)}
              </h2>
              <p className="pub-city-sub">
                This book documents {capitalize(pub.relatedCity)}. These are some of the businesses that make the city what it is.
              </p>
            </div>
            <div className="pub-city-grid">
              {cityBusinesses.map((biz) => (
                <a
                  key={biz.slug}
                  href={`/media/directory/${biz.slug}`}
                  className="pub-city-card"
                  aria-label={biz.name}
                >
                  <span className="pub-city-card__type">{capitalize(biz.businessType)}</span>
                  <span className="pub-city-card__name">{biz.name}</span>
                  <span className="pub-city-card__arrow">→</span>
                </a>
              ))}
            </div>
            <div className="pub-city-footer">
              <a href={`/media/directory?city=${pub.relatedCity}`} className="btn btn--outline">
                All {capitalize(pub.relatedCity)} Listings →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── More from Deep South Press ── */}
      <section className="pub-back-section">
        <div className="section-container">
          <div className="pub-back-inner">
            <div>
              <div className="section-label">Publishing</div>
              <h2 className="pub-back-title">Deep South Press</h2>
              <p className="pub-back-sub">Small-run books from the Mississippi corridor.</p>
            </div>
            <a href="/media/publications" className="btn btn--outline">
              All Publications →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Breadcrumb ── */
        .pub-breadcrumb {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: var(--space-3) 0;
        }
        .pub-breadcrumb__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
        .pub-breadcrumb__link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .pub-breadcrumb__link:hover { text-decoration: underline; }
        .pub-breadcrumb__sep {
          color: var(--border-strong);
        }
        .pub-breadcrumb__current {
          font-weight: 500;
          color: var(--text-muted);
        }

        /* ── Detail layout ── */
        .pub-detail {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .pub-detail .section-container {
          padding-top: var(--space-12);
          padding-bottom: var(--space-16);
        }
        .pub-detail__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        @media (min-width: 768px) {
          .pub-detail__grid {
            grid-template-columns: 360px 1fr;
            gap: var(--space-16);
            align-items: start;
          }
        }
        @media (min-width: 1024px) {
          .pub-detail__grid {
            grid-template-columns: 420px 1fr;
          }
        }

        /* ── Left: Images ── */
        .pub-detail__images {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          position: sticky;
          top: var(--space-8);
        }
        .pub-cover-wrap {
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-xl);
        }
        .pub-cover {
          width: 100%;
          display: block;
          aspect-ratio: 3 / 4;
          object-fit: cover;
        }
        .pub-cover--empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          background: var(--surface-2);
          font-size: var(--text-sm);
          color: var(--text-disabled);
        }
        .pub-cover--empty span:first-child {
          font-size: 40px;
          opacity: 0.2;
        }
        .pub-cover--back {
          aspect-ratio: 3 / 4;
        }
        .pub-gallery__label {
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin: 0 0 var(--space-3);
        }
        .pub-gallery__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-2);
        }
        .pub-gallery__img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        /* ── Right: Info ── */
        .pub-detail__info {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .pub-detail__badges {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        .pub-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: var(--radius-sm);
          line-height: 1.6;
        }
        .pub-badge--category {
          background: var(--surface-3);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .pub-badge--available {
          background: rgba(34, 197, 94, 0.12);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.25);
        }
        .pub-badge--preorder {
          background: rgba(200, 148, 62, 0.12);
          color: var(--accent);
          border: 1px solid rgba(200, 148, 62, 0.25);
        }
        .pub-badge--sold-out {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .pub-detail__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, var(--text-5xl));
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.03em;
          line-height: 0.95;
          margin: 0;
        }
        .pub-detail__subtitle {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          font-weight: 400;
          color: var(--text-muted);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .pub-detail__author {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          margin: 0;
        }
        .pub-detail__author-name {
          font-weight: 600;
          color: var(--text);
        }
        .pub-detail__specs {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: var(--space-4);
          padding: var(--space-5) 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .pub-spec {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .pub-spec__label {
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .pub-spec__value {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text);
        }
        .pub-spec__value--mono {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.02em;
        }
        /* Purchase */
        .pub-detail__purchase {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .pub-detail__price {
          font-family: var(--font-mono);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .pub-detail__order-btn {
          display: inline-flex;
          align-items: center;
          padding: var(--space-4) var(--space-8);
          background: var(--accent);
          color: var(--bg);
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: background var(--duration-fast) var(--ease-default);
          width: fit-content;
        }
        .pub-detail__order-btn:hover {
          background: var(--accent-hover);
        }
        .pub-detail__preorder-note {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          margin: 0;
          line-height: var(--leading-normal);
          max-width: 380px;
        }
        .pub-detail__sold-out {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-5);
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: var(--radius-md);
        }
        .pub-detail__sold-out-text {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 600;
          color: #ef4444;
          margin: 0;
        }
        .pub-detail__sold-count {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: 0;
        }
        .pub-detail__archived-note {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          font-style: italic;
          margin: 0;
        }
        /* Tags */
        .pub-detail__tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .pub-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 3px 8px;
          background: var(--surface-2);
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        /* Long description */
        .pub-detail__long-desc {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .pub-detail__long-desc-rule {
          width: 32px;
          height: 1px;
          background: var(--accent);
          opacity: 0.35;
        }
        .pub-detail__long-desc-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .pub-detail__long-desc-body p {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 560px;
        }

        /* ── City section ── */
        .pub-city-section {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .pub-city-header {
          margin-bottom: var(--space-8);
        }
        .pub-city-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          margin: var(--space-2) 0 0;
        }
        .pub-city-sub {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 480px;
          margin: var(--space-3) 0 0;
        }
        .pub-city-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-3);
          margin-bottom: var(--space-8);
        }
        @media (min-width: 640px) {
          .pub-city-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .pub-city-card {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-5);
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--duration-fast) var(--ease-default);
        }
        .pub-city-card:hover {
          border-color: var(--accent);
          background: var(--bg);
        }
        .pub-city-card__type {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pub-city-card__name {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          flex: 1;
        }
        .pub-city-card__arrow {
          font-size: var(--text-sm);
          color: var(--accent);
          opacity: 0;
          transition: opacity var(--duration-fast) var(--ease-default);
          flex-shrink: 0;
        }
        .pub-city-card:hover .pub-city-card__arrow {
          opacity: 1;
        }
        .pub-city-footer {
          text-align: left;
        }

        /* ── Back section ── */
        .pub-back-section {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .pub-back-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-8);
          flex-wrap: wrap;
        }
        .pub-back-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          margin: var(--space-1) 0 var(--space-2);
        }
        .pub-back-sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: 0;
        }
      `}</style>
    </>
  );
}
