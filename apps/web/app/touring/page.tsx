// apps/web/app/touring/page.tsx
// Touring homepage — bigmuddytouring.com
// Server component. Uses static placeholder content until DATABASE_URL is connected.

import type { Metadata } from 'next';
import Image from 'next/image';
import { ArticleCard } from '@bigmuddy/ui';
import { PlaylistCard } from '@bigmuddy/ui';
import { NewsletterSignup } from '@bigmuddy/ui';
import type { Article, Playlist } from '@bigmuddy/config';
import { BLUR_DATA_URL } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Big Muddy Touring',
  description:
    'Eighteen cities across five states. The Mississippi music corridor and expanded Big Muddy network — from Memphis to New Orleans and beyond.',
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${baseUrl}/api/articles?status=published`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const all: Article[] = Array.isArray(data) ? data : data.data ?? [];
    return all.slice(0, 3);
  } catch {
    return [];
  }
}

async function getPlaylists(): Promise<Playlist[]> {
  try {
    const res = await fetch(`${baseUrl}/api/playlists`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const all: Playlist[] = Array.isArray(data) ? data : data.data ?? [];
    return all.filter((p) => p.status === 'active').slice(0, 3);
  } catch {
    return [];
  }
}

const NETWORK_BY_STATE = [
  {
    state: 'Louisiana',
    cities: ['St. Francisville', 'Baton Rouge', 'Lafayette', 'Alexandria', 'Monroe', 'Ruston', 'Natchitoches', 'Shreveport'],
  },
  {
    state: 'Arkansas',
    cities: ['El Dorado', 'Little Rock', 'Fayetteville', 'Bentonville'],
  },
  {
    state: 'Missouri',
    cities: ['Branson'],
  },
];

export default async function TouringHomepage() {
  const [articles, playlists] = await Promise.all([getArticles(), getPlaylists()]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="touring-hero">
        <Image
          src="https://storage.googleapis.com/bmt-media-bigmuddy/heroes/hero-highway-sunset.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="touring-hero__overlay" />
        <div className="touring-hero__bg-pattern" aria-hidden="true" />
        <div className="touring-hero__content">
          <div className="touring-hero__eyebrow">
            <span className="touring-hero__ornament">&#9670;</span>
            <span>Memphis · Clarksdale · Natchez · New Orleans · and 14 more</span>
          </div>
          <h1 className="touring-hero__title">
            The Mississippi's
            <br />
            <em>Music Corridor</em>
          </h1>
          <p className="touring-hero__sub">
            Eighteen cities. Five states. A thousand years of American music.
            Stay at the inn. Drive the route. Read the magazine. Hear the radio.
          </p>
          <div className="touring-hero__ctas">
            <a href="/route" className="btn btn--primary">
              Plan the Route
            </a>
            <a href="/inn" className="btn btn--ghost">
              Where to Stay
            </a>
          </div>
        </div>
        <div className="touring-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="1" height="40" viewBox="0 0 1 40">
            <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="fleet-banner">
        <div className="fleet-banner__inner">
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/fleet/fleet-transit-beale-street.webp" alt="Big Muddy Transit van on Beale Street, Memphis" width={1600} height={893} sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      {/* ── Where to Stay ── */}
      <section className="touring-lodging">
        <div className="section-container">
          <div className="touring-lodging__layout">
            <div className="touring-lodging__inner">
              <div className="section-label">Where to Stay</div>
              <h2 className="section-title">Lodging Across the Corridor</h2>
              <p className="section-desc">
                Curated lodging in every city on the route — from the Big Muddy Inn
                in Natchez to boutique hotels, historic B&Bs, and downtown stays
                across five states. Forty-plus properties, hand-picked for the journey.
              </p>
              <a href="/inn" className="btn btn--outline" style={{ marginTop: 'var(--space-8)' }}>
                Browse Lodging
              </a>
            </div>
            <div className="touring-lodging__photos">
              <div className="touring-lodging__photo">
                <Image src="/images/library/corridor-0642.webp" alt="Victorian B&B with wraparound porch in Natchez" width={600} height={400} sizes="(min-width: 768px) 50vw, 100vw" style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div className="touring-lodging__photo">
                <Image src="/images/library/corridor-0630.webp" alt="Antebellum mansion with iron fence and carriage" width={600} height={400} sizes="(min-width: 768px) 50vw, 100vw" style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Route ── */}
      <section className="touring-route">
        <div className="section-container">
          <div className="touring-route__layout">
            <div className="touring-route__text">
              <div className="section-label">The Route</div>
              <h2 className="section-title">Memphis to New Orleans</h2>
              <p className="section-desc">
                Highway 61 south. The Blues Highway. The route that carried a 
                generation of musicians north and brought the whole world south 
                to find where the music came from.
              </p>
              <div className="touring-route__stops">
                {['Memphis', 'Clarksdale', 'Vicksburg', 'Natchez', 'New Orleans'].map((city, i) => (
                  <div key={city} className="route-stop">
                    <span className="route-stop__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="route-stop__city">{city}</span>
                  </div>
                ))}
              </div>

              {/* ── Expanded Network ── */}
              <div className="touring-route__network">
                <div className="touring-route__network-label">The Expanded Network</div>
                <div className="touring-route__network-grid">
                  {NETWORK_BY_STATE.map((group) => (
                    <div key={group.state} className="touring-route__network-group">
                      <span className="touring-route__network-state">{group.state}</span>
                      <div className="touring-route__network-cities">
                        {group.cities.map((city) => (
                          <span key={city} className="touring-route__network-city">{city}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a href="/route" className="btn btn--primary" style={{ marginTop: 'var(--space-8)' }}>
                View Full Route
              </a>
            </div>
            <div className="touring-route__visual">
              <div className="touring-route__photo-stack">
                <div className="touring-route__photo touring-route__photo--1">
                  <Image src="/images/library/corridor-0339.webp" alt="Brick sidewalk with awnings on Natchez main street" width={500} height={375} sizes="(min-width: 768px) 40vw, 90vw" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="touring-route__photo touring-route__photo--2">
                  <Image src="/images/library/corridor-0501.webp" alt="Pink azaleas cascading along Natchez sidewalk" width={500} height={375} sizes="(min-width: 768px) 40vw, 90vw" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="touring-route__photo touring-route__photo--3">
                  <Image src="/images/library/corridor-0954.webp" alt="Teal shrimp boat at Ocean Springs marina" width={500} height={375} sizes="(min-width: 768px) 40vw, 90vw" style={{ width: '100%', height: 'auto' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="fleet-banner">
        <div className="fleet-banner__inner">
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/fleet/fleet-prevost-french-quarter.webp" alt="Big Muddy Prevost tour bus in the French Quarter, New Orleans" width={1600} height={893} sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      {/* ── Photo Break: Mississippi River ── */}
      <section className="photo-break">
        <Image
          src="/images/corridor/mississippi-river-bridge.webp"
          alt="Mississippi River with bridge and barge"
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      {/* ── From the Magazine ── */}
      <section className="touring-magazine">
        <div className="section-container">
          <div className="section-header">
            <div>
              <div className="section-label">From the Magazine</div>
              <h2 className="section-title-sm">Stories from the Corridor</h2>
            </div>
            <a href="https://bigmuddymagazine.com" className="section-link">
              All Stories →
            </a>
          </div>
          <div className="article-grid-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                href={`https://bigmuddymagazine.com/articles/${article.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Break: Victorian Mansion ── */}
      <section className="photo-break">
        <Image
          src="/images/corridor/victorian-mansion-natchez.webp"
          alt="White Victorian mansion in Natchez"
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      {/* ── On the Radio ── */}
      <section className="touring-radio">
        <div className="section-container">
          <div className="section-header">
            <div>
              <div className="section-label">On the Radio</div>
              <h2 className="section-title-sm">Curated Playlists</h2>
            </div>
            <a href="https://bigmuddyradio.com" className="section-link">
              All Playlists →
            </a>
          </div>
          <div className="playlist-grid-3">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .touring-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
        }
        .touring-hero__bg-pattern {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 148, 62, 0.08) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(200, 148, 62, 0.03) 80px,
              rgba(200, 148, 62, 0.03) 81px
            );
        }
        .touring-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.85) 0%, rgba(15, 15, 13, 0.65) 50%, rgba(15, 15, 13, 0.9) 100%);
          z-index: 1;
        }
        .touring-hero__content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: var(--space-24) var(--space-6);
          text-align: center;
        }
        .touring-hero__eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-8);
        }
        .touring-hero__ornament {
          font-size: 8px;
        }
        .touring-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-6);
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }
        .touring-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .touring-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 600px;
          margin: 0 auto var(--space-10);
        }
        .touring-hero__ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .touring-hero__scroll-hint {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          z-index: 2;
        }

        /* ── Lodging Teaser ── */
        .touring-lodging {
          background: linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .touring-lodging__layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
          align-items: center;
        }
        @media (min-width: 768px) {
          .touring-lodging__layout {
            grid-template-columns: 1fr 1fr;
          }
        }
        .touring-lodging__inner {
          max-width: 640px;
        }
        .touring-lodging__photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .touring-lodging__photo {
          overflow: hidden;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-lg);
        }

        /* ── Route Section ── */
        .touring-route__layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: center;
        }
        @media (min-width: 768px) {
          .touring-route__layout {
            grid-template-columns: 1fr 1fr;
          }
        }
        .touring-route__stops {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          margin-top: var(--space-8);
          padding-left: var(--space-4);
          border-left: 1px solid var(--border);
        }
        .route-stop {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-3) 0;
        }
        .route-stop__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.7;
          min-width: 24px;
        }
        .route-stop__city {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 600;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .touring-route__photo-stack {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: var(--space-4);
        }
        .touring-route__photo {
          overflow: hidden;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-lg);
        }
        .touring-route__photo--1 {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
        .touring-route__photo--2 {
          grid-column: 2 / 3;
          grid-row: 1 / 3;
        }
        .touring-route__photo--3 {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
        }

        /* ── Expanded Network ── */
        .touring-route__network {
          margin-top: var(--space-10);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }
        .touring-route__network-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-5);
        }
        .touring-route__network-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .touring-route__network-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .touring-route__network-state {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.7;
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }
        .touring-route__network-cities {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-1) var(--space-3);
        }
        .touring-route__network-city {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: var(--tracking-tight);
        }
        .touring-route__network-city::after {
          content: '·';
          margin-left: var(--space-3);
          color: var(--border-strong);
        }
        .touring-route__network-city:last-child::after {
          content: '';
        }

        /* ── Photo Break ── */
        .photo-break {
          width: 100%;
          max-height: 400px;
          overflow: hidden;
          line-height: 0;
        }
      `}</style>
    </>
  );
}
