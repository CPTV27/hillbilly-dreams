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
import { prisma } from '@bigmuddy/database';

export const metadata: Metadata = {
  title: 'Big Muddy Touring',
  description:
    'Eighteen cities across five states. The Mississippi music corridor and expanded Big Muddy network — from Memphis to New Orleans and beyond.',
};

// Static placeholder content — replace with prisma queries once DATABASE_URL is set
const PLACEHOLDER_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Clarksdale at Midnight: Where the Blues Were Born',
    slug: 'clarksdale-at-midnight-where-the-blues-were-born',
    category: 'city-guide',
    city: 'clarksdale',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'The crossroads is real. You can stand there at midnight and feel it — the weight of every note ever played in this delta town pressing up through the asphalt.',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-15').toISOString(),
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/clarksdale-crossroads.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'The Inn at Natchez: Six Rooms, Six Stories',
    slug: 'the-inn-at-natchez-six-rooms-six-stories',
    category: 'feature',
    city: 'natchez',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'At 411 N Commerce Street, each suite is named for a legend. Sleep in the Muddy Waters room and wake to the river. Every night here is a night closer to the source.',
    readTime: '6 min read',
    publishedAt: new Date('2026-02-20').toISOString(),
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-bluff-sunset.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Memphis to New Orleans: The Full Route',
    slug: 'memphis-to-new-orleans-the-full-route',
    category: 'feature',
    city: 'memphis',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Five cities. Four hundred miles. A thousand years of American music. Here is how to drive it right.',
    readTime: '12 min read',
    publishedAt: new Date('2026-01-28').toISOString(),
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/memphis-beale-street-neon.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const PLACEHOLDER_PLAYLISTS: Playlist[] = [
  {
    id: 1,
    name: 'Delta Blues Essentials',
    description: 'Robert Johnson, Muddy Waters, Howlin Wolf. The founding documents.',
    trackCount: 42,
    spotifyUrl: null,
    coverImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Natchez After Dark',
    description: 'What plays in the inn after midnight. Soul, jazz, and something unnamed.',
    trackCount: 28,
    spotifyUrl: null,
    coverImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Highway 61 North to South',
    description: 'Road music for the corridor. Memphis to New Orleans at 70 mph.',
    trackCount: 55,
    spotifyUrl: null,
    coverImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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
  let articles: Article[] = PLACEHOLDER_ARTICLES;
  let playlists: Playlist[] = PLACEHOLDER_PLAYLISTS;

  try {
    const [dbArticles, dbPlaylists] = await Promise.all([
      prisma.article.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      }),
      prisma.playlist.findMany({
        where: { status: 'active' },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
    ]);
    if (dbArticles.length) articles = dbArticles as Article[];
    if (dbPlaylists.length) playlists = dbPlaylists as Playlist[];
  } catch {
    // Prisma unavailable — fall back to placeholder data
  }

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
            <div className="touring-route__visual" aria-hidden="true">
              <div className="touring-route__map-placeholder">
                <div className="touring-route__river-line" />
                <div className="touring-route__city-dots">
                  {['Memphis', 'Clarksdale', 'Vicksburg', 'Natchez', 'New Orleans'].map((city) => (
                    <div key={city} className="touring-route__dot">
                      <div className="touring-route__dot-mark" />
                      <span>{city}</span>
                    </div>
                  ))}
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
        }

        /* ── Shared Buttons ── */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-8);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all var(--duration-fast) var(--ease-default);
          cursor: pointer;
          border: none;
        }
        .btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .btn--primary:hover {
          background: var(--accent-hover);
        }
        .btn--ghost {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border-strong);
        }
        .btn--ghost:hover {
          color: var(--text);
          border-color: var(--accent);
        }
        .btn--outline {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .btn--outline:hover {
          background: var(--accent-muted);
        }

        /* ── Shared Section Styles ── */
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
        }
        .section-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }
        .section-title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-snug);
          margin: 0 0 var(--space-5);
        }
        .section-title-sm {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-snug);
          margin: 0;
        }
        .section-desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 520px;
          margin: 0;
        }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
          flex-wrap: wrap;
        }
        .section-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          white-space: nowrap;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .section-link:hover {
          color: var(--accent-hover);
        }

        /* ── Lodging Teaser ── */
        .touring-lodging {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .touring-lodging__inner {
          max-width: 640px;
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
        .touring-route__map-placeholder {
          height: 400px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .touring-route__river-line {
          position: absolute;
          left: 50%;
          top: 5%;
          bottom: 5%;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--accent) 10%,
            var(--slate) 50%,
            var(--accent) 90%,
            transparent
          );
          transform: translateX(-50%);
        }
        .touring-route__city-dots {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 0;
          align-items: center;
        }
        .touring-route__dot {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          position: relative;
        }
        .touring-route__dot-mark {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg);
          flex-shrink: 0;
        }
        .touring-route__dot span {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
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

        /* ── Article / Playlist Grids ── */
        .article-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-6);
        }
        .playlist-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--space-6);
        }

        /* ── Fleet Banner ── */
        .fleet-banner { padding: var(--space-8) var(--space-6); max-width: var(--container-xl); margin: 0 auto; }
        .fleet-banner__inner { border-radius: var(--radius-lg); overflow: hidden; }
        .fleet-banner__inner img { display: block; }
      `}</style>
    </>
  );
}
