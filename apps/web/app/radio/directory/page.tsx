// apps/web/app/radio/directory/page.tsx
// On the Route — directory businesses featured on Big Muddy Radio
// Lists all active directory clients grouped by city, with a radio angle.
// Links out to deepsouthdirectory.com/directory/[slug]

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'On the Route — Directory Businesses',
  description:
    'Local businesses featured on Big Muddy Radio across the Mississippi corridor.',
};

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

interface DirectoryClient {
  id: number;
  name: string;
  slug: string;
  businessType: string;
  city: string;
  state: string;
  website: string | null;
  description: string | null;
  logoUrl: string | null;
  tier: string;
}

async function getDirectoryClients(): Promise<DirectoryClient[]> {
  try {
    const res = await fetch(`${baseUrl}/api/directory`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

function formatCity(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Tier display names — tier ordering for badge display
const TIER_LABELS: Record<string, string> = {
  'blues-room': 'Blues Room',
  'river-room': 'River Room',
  'route': 'On the Route',
  'front-porch': 'Front Porch',
};

export default async function RadioDirectoryPage() {
  const clients = await getDirectoryClients();

  // Group by city, preserve insertion order from API (already sorted city asc)
  const byCity = clients.reduce<Record<string, DirectoryClient[]>>((acc, c) => {
    if (!acc[c.city]) acc[c.city] = [];
    acc[c.city].push(c);
    return acc;
  }, {});

  const cities = Object.keys(byCity);
  const totalClients = clients.length;

  return (
    <>
      {/* ── Hero ── */}
      <section className="rtdir-hero">
        <Image
          src="/images/ai-corridor/juke-joint-night.webp"
          alt="Juke joint at night along the Mississippi corridor"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="rtdir-hero__overlay" />
        <div className="rtdir-hero__content">
          <div className="rtdir-hero__eyebrow">
            <span className="rtdir-hero__dot" aria-hidden="true" />
            <span>Big Muddy Radio</span>
          </div>
          <h1 className="rtdir-hero__title">On the Route</h1>
          <p className="rtdir-hero__sub">
            The businesses behind the music. Local restaurants, venues, shops, and
            services from across the Mississippi corridor — all featured on Big Muddy Radio.
          </p>
          {totalClients > 0 && (
            <div className="rtdir-hero__stats">
              <div className="rtdir-hero__stat">
                <span className="rtdir-hero__stat-num">{totalClients}</span>
                <span className="rtdir-hero__stat-label">Businesses</span>
              </div>
              <div className="rtdir-hero__stat-divider" aria-hidden="true" />
              <div className="rtdir-hero__stat">
                <span className="rtdir-hero__stat-num">{cities.length}</span>
                <span className="rtdir-hero__stat-label">Cities</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Directory Content ── */}
      {totalClients === 0 ? (
        <section className="rtdir-empty">
          <div className="rtdir-container">
            <p className="rtdir-empty__text">
              Directory listings are on their way. Check back soon.
            </p>
            <a
              href="https://deepsouthdirectory.com"
              className="rtdir-cta-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit deepsouthdirectory.com →
            </a>
          </div>
        </section>
      ) : (
        <section className="rtdir-listings">
          <div className="rtdir-container">
            {cities.map((citySlug) => {
              const cityClients = byCity[citySlug];
              const cityLabel = formatCity(citySlug);

              return (
                <div key={citySlug} className="rtdir-city-section" id={`city-${citySlug}`}>
                  <div className="rtdir-city-header">
                    <h2 className="rtdir-city-title">{cityLabel}</h2>
                    <span className="rtdir-city-count">
                      {cityClients.length} {cityClients.length === 1 ? 'business' : 'businesses'}
                    </span>
                  </div>

                  <div className="rtdir-city-grid">
                    {cityClients.map((client) => (
                      <a
                        key={client.slug}
                        href={`https://deepsouthdirectory.com/directory/${client.slug}`}
                        className="rtdir-card"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${client.name} — ${client.businessType} in ${cityLabel}`}
                      >
                        {/* Card top: type + tier badge */}
                        <div className="rtdir-card__top">
                          <span className="rtdir-card__type">{client.businessType}</span>
                          {client.tier && client.tier !== 'front-porch' && (
                            <span className="rtdir-card__tier">
                              {TIER_LABELS[client.tier] ?? client.tier}
                            </span>
                          )}
                        </div>

                        {/* Card name */}
                        <h3 className="rtdir-card__name">{client.name}</h3>

                        {/* Description if present */}
                        {client.description && (
                          <p className="rtdir-card__desc">{client.description}</p>
                        )}

                        {/* Footer */}
                        <div className="rtdir-card__footer">
                          <span className="rtdir-card__cta">View listing ↗</span>
                          {client.website && (
                            <span className="rtdir-card__website">
                              {new URL(client.website).hostname.replace(/^www\./, '')}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Directory CTA */}
            <div className="rtdir-promo">
              <div className="rtdir-promo__inner">
                <div className="rtdir-promo__text">
                  <div className="rtdir-promo__label">Deep South Directory</div>
                  <h2 className="rtdir-promo__title">Get Your Business on the Route</h2>
                  <p className="rtdir-promo__desc">
                    Directory clients get featured in Big Muddy editorial content, radio
                    programming, and the city guides read by travelers planning trips
                    through the corridor.
                  </p>
                </div>
                <div className="rtdir-promo__actions">
                  <a
                    href="https://deepsouthdirectory.com"
                    className="rtdir-btn rtdir-btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse the Directory
                  </a>
                  <a
                    href="https://deepsouthdirectory.com/advertise"
                    className="rtdir-btn rtdir-btn--outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    List Your Business
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        /* ── Shared container ── */
        .rtdir-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        /* ── Hero ── */
        .rtdir-hero {
          background: var(--bg);
          padding: var(--space-24) var(--space-6) var(--space-20);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          min-height: 50vh;
          display: flex;
          align-items: flex-end;
        }
        .rtdir-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.5) 0%, rgba(15, 15, 13, 0.88) 100%);
          z-index: 1;
        }
        .rtdir-hero__content {
          position: relative;
          z-index: 2;
          max-width: var(--container-xl);
          margin: 0 auto;
          width: 100%;
        }
        .rtdir-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-6);
        }
        .rtdir-hero__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: rDotPulse 2s ease-in-out infinite;
        }
        @keyframes rDotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .rtdir-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-6);
        }
        .rtdir-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 600px;
          margin: 0 0 var(--space-10);
        }
        .rtdir-hero__stats {
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }
        .rtdir-hero__stat {
          display: flex;
          align-items: baseline;
          gap: var(--space-2);
        }
        .rtdir-hero__stat-num {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--accent);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .rtdir-hero__stat-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }
        .rtdir-hero__stat-divider {
          width: 1px;
          height: 32px;
          background: var(--border);
        }

        /* ── Listings ── */
        .rtdir-listings {
          background: var(--bg);
          padding: var(--space-16) 0;
        }
        .rtdir-city-section {
          margin-bottom: var(--space-16);
          padding-bottom: var(--space-16);
          border-bottom: 1px solid var(--border);
        }
        .rtdir-city-section:last-of-type {
          border-bottom: none;
        }
        .rtdir-city-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }
        .rtdir-city-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .rtdir-city-count {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
        }

        /* ── City Grid ── */
        .rtdir-city-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-4);
        }
        @media (min-width: 640px) {
          .rtdir-city-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .rtdir-city-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Client Card ── */
        .rtdir-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-6);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: border-color var(--duration-fast) var(--ease-default),
                      transform var(--duration-fast) var(--ease-default);
        }
        .rtdir-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .rtdir-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-2);
        }
        .rtdir-card__type {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }
        .rtdir-card__tier {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          background: var(--accent-muted);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-full);
          padding: 2px var(--space-2);
        }
        .rtdir-card__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-snug);
          margin: 0;
        }
        .rtdir-card__desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rtdir-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
          margin-top: auto;
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
        }
        .rtdir-card__cta {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .rtdir-card:hover .rtdir-card__cta {
          color: var(--accent-hover);
        }
        .rtdir-card__website {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 140px;
        }

        /* ── Promo block ── */
        .rtdir-promo {
          margin-top: var(--space-16);
          padding: var(--space-12) var(--space-10);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          border-left: 3px solid var(--accent);
        }
        .rtdir-promo__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          align-items: center;
        }
        @media (min-width: 768px) {
          .rtdir-promo__inner {
            grid-template-columns: 1fr auto;
          }
        }
        .rtdir-promo__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }
        .rtdir-promo__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-4);
        }
        .rtdir-promo__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 500px;
        }
        .rtdir-promo__actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .rtdir-promo__actions {
            align-items: flex-end;
          }
        }

        /* ── Buttons ── */
        .rtdir-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-7);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          text-decoration: none;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          transition: all var(--duration-fast) var(--ease-default);
          cursor: pointer;
          border: none;
        }
        .rtdir-btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .rtdir-btn--primary:hover {
          background: var(--accent-hover);
        }
        .rtdir-btn--outline {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .rtdir-btn--outline:hover {
          background: var(--accent-muted);
        }

        /* ── Empty state ── */
        .rtdir-empty {
          background: var(--bg);
          padding: var(--space-24) var(--space-6);
          text-align: center;
        }
        .rtdir-empty__text {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          margin: 0 0 var(--space-8);
        }
        .rtdir-cta-link {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          transition: color var(--duration-fast) var(--ease-default);
        }
        .rtdir-cta-link:hover {
          color: var(--accent-hover);
        }
      `}</style>
    </>
  );
}
