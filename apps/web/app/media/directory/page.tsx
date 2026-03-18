// apps/web/app/media/directory/page.tsx
// Deep South Directory — public browsable directory index.
// Server component. ISR at 300s.

import type { Metadata } from 'next';
import { Suspense } from 'react';
import DirectoryFilters from './DirectoryFilters';

export const metadata: Metadata = {
  title: 'Browse the Directory',
  description:
    'The Deep South Directory — curated restaurants, venues, hotels, shops, tours, and services along the Mississippi corridor. Memphis to New Orleans and beyond.',
  openGraph: {
    title: 'The Deep South Directory',
    description:
      'Curated businesses along the Mississippi corridor. Memphis to New Orleans and beyond.',
  },
};

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

interface DirectoryClient {
  id: number;
  name: string;
  slug: string;
  tier: string;
  businessType: string;
  city: string;
  state: string;
  description: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  website: string | null;
  gbpUrl: string | null;
  platforms: string[];
}

async function getDirectoryListings(city?: string, type?: string): Promise<DirectoryClient[]> {
  try {
    const params = new URLSearchParams({ status: 'active' });
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    const res = await fetch(`${baseUrl}/api/directory?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  } catch {
    return [];
  }
}

const TIER_LABELS: Record<string, string> = {
  'front-porch': 'Front Porch',
  'the-route': 'The Route',
  'river-room': 'River Room',
  'blues-room': 'Blues Room',
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: 'Restaurant',
  venue: 'Venue',
  hotel: 'Hotel',
  shop: 'Shop',
  tour: 'Tour',
  service: 'Service',
};

// Corridor cities used for the "Coming Soon" placeholder messaging
const PLACEHOLDER_CITIES = [
  'Memphis', 'Clarksdale', 'Vicksburg', 'Natchez',
  'New Orleans', 'Baton Rouge', 'Lafayette',
];

function PlaceholderCards({ city }: { city?: string }) {
  const cities = city ? [city] : PLACEHOLDER_CITIES.slice(0, 6);
  return (
    <>
      {cities.map((c) => (
        <div key={c} className="dir-card dir-card--placeholder" aria-label={`Placeholder listing for ${c}`}>
          <div className="dir-card__placeholder-inner">
            <div className="dir-card__placeholder-icon" aria-hidden="true">&#9670;</div>
            <p className="dir-card__placeholder-text">
              Coming Soon — be the first in <strong>{c}</strong>
            </p>
            <a href="/media/directory/claim" className="dir-card__placeholder-cta">
              Claim Your Business →
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

function BusinessCard({ client }: { client: DirectoryClient }) {
  const tierLabel = TIER_LABELS[client.tier] ?? client.tier;
  const typeLabel = TYPE_LABELS[client.businessType] ?? client.businessType;
  const excerpt = client.description
    ? client.description.length > 120
      ? client.description.slice(0, 117) + '…'
      : client.description
    : null;

  return (
    <a
      href={`/media/directory/${client.slug}`}
      className="dir-card"
      aria-label={`${client.name} — ${client.city}, ${client.state}`}
    >
      {client.heroImageUrl && (
        <div className="dir-card__image-wrap" aria-hidden="true">
          <img
            src={client.heroImageUrl}
            alt=""
            className="dir-card__image"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="dir-card__body">
        <div className="dir-card__badges">
          <span className={`dir-badge dir-badge--type dir-badge--${client.businessType}`}>
            {typeLabel}
          </span>
          {client.tier !== 'front-porch' && (
            <span className="dir-badge dir-badge--tier">{tierLabel}</span>
          )}
        </div>
        <h2 className="dir-card__name">{client.name}</h2>
        <p className="dir-card__location">
          {client.city}, {client.state}
        </p>
        {excerpt && <p className="dir-card__excerpt">{excerpt}</p>}
        <span className="dir-card__cta">View Profile →</span>
      </div>
    </a>
  );
}

interface PageProps {
  searchParams: { city?: string; type?: string };
}

export default async function DirectoryPage({ searchParams }: PageProps) {
  const { city, type } = searchParams;
  const listings = await getDirectoryListings(city, type);
  const isEmpty = listings.length === 0;

  return (
    <>
      {/* ── Hero ── */}
      <section className="dir-hero">
        <div className="dir-hero__bg" aria-hidden="true" />
        <div className="dir-hero__content">
          <div className="dir-hero__eyebrow">
            <span className="dir-hero__ornament" aria-hidden="true">&#9670;</span>
            <span>Mississippi Corridor · Est. 2024</span>
          </div>
          <h1 className="dir-hero__title">The Deep South Directory</h1>
          <p className="dir-hero__sub">
            Curated businesses along the Mississippi corridor — restaurants, venues, hotels,
            shops, and more. From Memphis to New Orleans and every city in between.
          </p>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="dir-main">
        <div className="section-container">

          <Suspense fallback={<div className="dir-filters-skeleton" aria-hidden="true" />}>
            <DirectoryFilters />
          </Suspense>

          {/* Results header */}
          <div className="dir-results-header">
            {!isEmpty && (
              <p className="dir-results-count" aria-live="polite">
                {listings.length} {listings.length === 1 ? 'business' : 'businesses'}
                {city ? ` in ${city}` : ''}
                {type ? ` · ${TYPE_LABELS[type] ?? type}` : ''}
              </p>
            )}
            {isEmpty && (city || type) && (
              <p className="dir-results-count dir-results-count--empty" aria-live="polite">
                No businesses found
                {city ? ` in ${city}` : ''}
                {type ? ` · ${TYPE_LABELS[type] ?? type}` : ''}
                . Try broadening your filters.
              </p>
            )}
          </div>

          {/* Grid */}
          <div
            className="dir-grid"
            role="list"
            aria-label="Directory listings"
          >
            {!isEmpty
              ? listings.map((client) => (
                  <div key={client.id} role="listitem">
                    <BusinessCard client={client} />
                  </div>
                ))
              : <PlaceholderCards city={city} />
            }
          </div>

          {/* Bottom CTA */}
          <div className="dir-bottom-cta">
            <p className="dir-bottom-cta__text">
              Own a business on the corridor?
            </p>
            <a href="/media/directory/claim" className="btn btn--primary">
              Claim Your Business →
            </a>
            <a href="/media/get-started" className="btn btn--outline">
              Learn More About Listing →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .dir-hero {
          position: relative;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .dir-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 148, 62, 0.08) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(200, 148, 62, 0.018) 60px,
              rgba(200, 148, 62, 0.018) 61px
            );
        }
        .dir-hero__content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-20) var(--space-6) var(--space-16);
        }
        .dir-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-5);
        }
        .dir-hero__ornament {
          font-size: 8px;
        }
        .dir-hero__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, var(--text-5xl));
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .dir-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0;
        }

        /* ── Main Section ── */
        .dir-main {
          background: var(--bg);
          min-height: 60vh;
        }
        .dir-main .section-container {
          padding-top: var(--space-8);
          padding-bottom: var(--space-20);
        }
        .dir-filters-skeleton {
          height: 96px;
          border-bottom: 1px solid var(--border);
        }

        /* ── Results header ── */
        .dir-results-header {
          padding: var(--space-6) 0 var(--space-4);
          min-height: 2.5rem;
        }
        .dir-results-count {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          margin: 0;
          letter-spacing: var(--tracking-wide);
        }
        .dir-results-count--empty {
          color: var(--text-muted);
          font-style: italic;
        }

        /* ── Grid ── */
        .dir-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-5);
        }
        @media (min-width: 580px) {
          .dir-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 900px) {
          .dir-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1200px) {
          .dir-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Business Card ── */
        .dir-card {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-decoration: none;
          transition:
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default),
            transform var(--duration-fast) var(--ease-default);
          height: 100%;
        }
        .dir-card:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }
        .dir-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .dir-card__image-wrap {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: var(--surface-2);
          flex-shrink: 0;
        }
        .dir-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--duration-slow) var(--ease-default);
        }
        .dir-card:hover .dir-card__image {
          transform: scale(1.03);
        }
        .dir-card__body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: var(--space-5);
          gap: var(--space-2);
        }
        .dir-card__badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-1);
        }
        .dir-badge {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: 2px var(--space-2);
          border-radius: var(--radius-sm);
          line-height: 1.6;
        }
        .dir-badge--type {
          background: rgba(200, 148, 62, 0.12);
          color: var(--accent);
          border: 1px solid rgba(200, 148, 62, 0.25);
        }
        .dir-badge--restaurant { background: rgba(200, 100, 62, 0.1); color: #c8643e; border-color: rgba(200, 100, 62, 0.22); }
        .dir-badge--venue      { background: rgba(100, 62, 200, 0.1); color: #8b5cf6; border-color: rgba(100, 62, 200, 0.22); }
        .dir-badge--hotel      { background: rgba(62, 150, 200, 0.1); color: #3b9ec4; border-color: rgba(62, 150, 200, 0.22); }
        .dir-badge--shop       { background: rgba(62, 200, 120, 0.1); color: #3ec878; border-color: rgba(62, 200, 120, 0.22); }
        .dir-badge--tour       { background: rgba(200, 180, 62, 0.1); color: #c8b43e; border-color: rgba(200, 180, 62, 0.22); }
        .dir-badge--service    { background: rgba(180, 180, 180, 0.1); color: var(--text-muted); border-color: var(--border); }
        .dir-badge--tier {
          background: transparent;
          color: var(--text-disabled);
          border: 1px solid var(--border-subtle);
        }
        .dir-card__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
          line-height: var(--leading-tight);
        }
        .dir-card__location {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          margin: 0;
        }
        .dir-card__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: var(--space-1) 0 0;
          flex: 1;
        }
        .dir-card__cta {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          margin-top: var(--space-3);
          display: block;
          opacity: 0;
          transform: translateX(-4px);
          transition:
            opacity var(--duration-fast) var(--ease-default),
            transform var(--duration-fast) var(--ease-default);
        }
        .dir-card:hover .dir-card__cta {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Placeholder Cards ── */
        .dir-card--placeholder {
          cursor: default;
          min-height: 180px;
          background: var(--surface);
          border-style: dashed;
        }
        .dir-card--placeholder:hover {
          border-color: rgba(200, 148, 62, 0.3);
          box-shadow: none;
          transform: none;
        }
        .dir-card__placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-8) var(--space-6);
          gap: var(--space-3);
          height: 100%;
        }
        .dir-card__placeholder-icon {
          font-size: 10px;
          color: var(--accent);
          opacity: 0.3;
        }
        .dir-card__placeholder-text {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          margin: 0;
          line-height: var(--leading-normal);
        }
        .dir-card__placeholder-text strong {
          color: var(--text-muted);
          font-weight: 600;
        }
        .dir-card__placeholder-cta {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-decoration: none;
          opacity: 0.7;
          transition: opacity var(--duration-fast) var(--ease-default);
        }
        .dir-card__placeholder-cta:hover {
          opacity: 1;
        }

        /* ── Bottom CTA ── */
        .dir-bottom-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: var(--space-5);
          margin-top: var(--space-16);
          padding-top: var(--space-12);
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .dir-bottom-cta__text {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          margin: 0;
        }
      `}</style>
    </>
  );
}
