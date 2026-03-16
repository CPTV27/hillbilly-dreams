// apps/web/app/media/brands/page.tsx
// Big Muddy Media — Our Brands page
// Server component. Credibility through the portfolio.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Brands',
  description:
    'Big Muddy Media runs five brands across the Mississippi corridor — Touring, Magazine, Radio, the Inn, and Outsider Economics. The same engine now powers your business.',
};

const BRANDS = [
  {
    id: 'touring',
    num: '01',
    name: 'Big Muddy Touring',
    url: 'https://bigmuddytouring.com',
    tagline: 'The Mississippi\'s Music Corridor',
    category: 'Travel & Culture',
    desc: 'The flagship. Eighteen cities across five states, from Memphis to New Orleans. City guides, lodging at the Inn, the Blues Highway route, curated playlists, and editorial about the culture that made American music.',
    stats: [
      { label: 'Cities', value: '18' },
      { label: 'States', value: '5' },
      { label: 'Content', value: 'Weekly' },
    ],
    highlights: [
      'Full editorial calendar — features, guides, event coverage',
      'Lodging network: 40+ partner properties along the route',
      'Multi-platform social presence: Instagram, Facebook, TikTok',
      'Newsletter audience across the corridor',
      'Google ranking for Mississippi music tourism searches',
    ],
  },
  {
    id: 'magazine',
    num: '02',
    name: 'Big Muddy Magazine',
    url: 'https://bigmuddymagazine.com',
    tagline: 'Stories from the Southern Gothic heartland',
    category: 'Editorial & Journalism',
    desc: 'Long-form editorial, city guides, interviews, and photo essays from along the Mississippi music corridor. Southern Gothic storytelling — musicians, restaurants, hotels, culture, history. The magazine that treats the South like the subject it is.',
    stats: [
      { label: 'Categories', value: '6' },
      { label: 'Format', value: 'Long-form' },
      { label: 'Cadence', value: 'Weekly' },
    ],
    highlights: [
      'Feature articles, interviews, and photo essays',
      'City guides for every major stop on the route',
      'Business directory with real editorial context',
      'AI-generated, human-edited content at scale',
      'SEO-optimized for regional travel and culture searches',
    ],
  },
  {
    id: 'radio',
    num: '03',
    name: 'Big Muddy Radio',
    url: 'https://bigmuddyradio.com',
    tagline: 'The sound of the river',
    category: 'Music & Audio',
    desc: 'Curated playlists, live sessions, and the soundtrack of the Mississippi music corridor. Blues, soul, country, gospel, jazz, and the border genres that don\'t have clean names. The radio station the river deserves.',
    stats: [
      { label: 'Format', value: 'Streaming' },
      { label: 'Playlists', value: 'Curated' },
      { label: 'Genre', value: 'Corridor' },
    ],
    highlights: [
      'Curated playlists organized by city, era, and genre',
      'Live session recordings from corridor venues',
      'Integration with the Magazine and Touring editorial calendar',
      'Social presence focused on music discovery',
      'Podcast content in development',
    ],
  },
  {
    id: 'inn',
    num: '04',
    name: 'The Big Muddy Inn',
    url: 'https://bigmuddytouring.com/inn',
    tagline: '411 N Commerce St, Natchez, Mississippi',
    category: 'Hospitality',
    desc: 'Six-suite boutique hotel in Natchez, Mississippi. The anchor property for the entire Big Muddy ecosystem — where the media company becomes the hospitality company. Every suite tells a story of the river.',
    stats: [
      { label: 'Suites', value: '6' },
      { label: 'City', value: 'Natchez' },
      { label: 'Category', value: 'Boutique' },
    ],
    highlights: [
      'Full media presence: social, email, local SEO',
      'Editorial features in Big Muddy Magazine',
      'Google Business Profile fully optimized',
      'Photography and video production on-site',
      'Corridor event hosting and promotion',
    ],
  },
  {
    id: 'economics',
    num: '05',
    name: 'Outsider Economics',
    url: 'https://outsidereconomics.com',
    tagline: 'A Field Manual for Independent Economic Systems',
    category: 'Publishing & Media',
    desc: 'Counter-narrative economics. The intellectual arm of the Big Muddy network. Agorism, distributed networks, anti-fragility, and the circular economy — applied to real local communities. A book, a website, a Substack, and a growing reader base.',
    stats: [
      { label: 'Format', value: 'Book + Web' },
      { label: 'Platform', value: 'Substack' },
      { label: 'Reach', value: 'Growing' },
    ],
    highlights: [
      'Published book available on Amazon',
      'Substack newsletter with paid subscriber tier',
      'SEO-optimized site with structured content',
      'Social distribution across Twitter/X and other platforms',
      'Content pipeline: AI-drafted, author-edited and published',
    ],
  },
];

export default function BrandsPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="brands-header">
        <div className="section-container">
          <div className="brands-header__inner">
            <div className="section-label">Our Brands</div>
            <h1 className="brands-header__title">
              Five Brands.
              <br />
              <em>One Platform.</em>
            </h1>
            <p className="brands-header__sub">
              The same engine that powers these properties now powers yours.
              We didn't build this for clients — we built it for ourselves.
              Then we opened the door.
            </p>
          </div>
        </div>
      </section>

      {/* ── Brand Cards ── */}
      <section className="brands-list">
        <div className="section-container">
          {BRANDS.map((brand, i) => (
            <div
              key={brand.id}
              className={`brand-entry ${i < BRANDS.length - 1 ? 'brand-entry--bordered' : ''}`}
            >
              <div className="brand-entry__layout">
                {/* Left: Identity */}
                <div className="brand-entry__identity">
                  <div className="brand-entry__num">{brand.num}</div>
                  <div className="brand-entry__category">{brand.category}</div>
                  <h2 className="brand-entry__name">{brand.name}</h2>
                  <p className="brand-entry__tagline">{brand.tagline}</p>
                  <div className="brand-entry__stats">
                    {brand.stats.map((stat) => (
                      <div key={stat.label} className="brand-entry__stat">
                        <span className="brand-entry__stat-value">{stat.value}</span>
                        <span className="brand-entry__stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={brand.url}
                    className="btn btn--outline brand-entry__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {brand.name.split(' ').slice(-1)[0]} →
                  </a>
                </div>

                {/* Right: Description + highlights */}
                <div className="brand-entry__content">
                  <p className="brand-entry__desc">{brand.desc}</p>
                  <div className="brand-entry__highlights-label">What we run for this brand</div>
                  <ul className="brand-entry__highlights" role="list">
                    {brand.highlights.map((h) => (
                      <li key={h} className="brand-entry__highlight">
                        <span className="brand-entry__highlight-mark" aria-hidden="true">&#10003;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Point ── */}
      <section className="brands-thesis">
        <div className="section-container">
          <div className="brands-thesis__inner">
            <div className="section-label">The Point</div>
            <h2 className="brands-thesis__title">
              We're Not an Agency That Read About Content.
            </h2>
            <p className="brands-thesis__body">
              We run a magazine. We run a radio station. We run a boutique hotel. We run a touring brand
              and a publishing imprint. Every tool we offer you is a tool we use ourselves, every day,
              for real brands with real audiences and real stakes.
            </p>
            <p className="brands-thesis__body">
              When we tell you we can build your content calendar, manage your reviews, optimize your GBP,
              and produce your photos — we're not pitching you something theoretical.
              We're offering you the system that already runs.
            </p>
            <a href="/media/get-started" className="btn btn--primary brands-thesis__cta">
              Put It to Work for Your Business
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .brands-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .brands-header__inner {
          max-width: 680px;
        }
        .brands-header__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .brands-header__title em {
          font-style: italic;
          color: var(--accent);
        }
        .brands-header__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 580px;
        }

        /* ── Brand List ── */
        .brands-list {
          background: var(--bg);
        }
        .brand-entry {
          padding: var(--space-16) 0;
        }
        .brand-entry--bordered {
          border-bottom: 1px solid var(--border);
        }
        .brand-entry__layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
          align-items: start;
        }
        @media (min-width: 768px) {
          .brand-entry__layout {
            grid-template-columns: 280px 1fr;
            gap: var(--space-16);
          }
        }

        /* Identity column */
        .brand-entry__identity {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .brand-entry__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          opacity: 0.6;
          letter-spacing: var(--tracking-wider);
        }
        .brand-entry__category {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .brand-entry__name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .brand-entry__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--accent);
          font-style: italic;
          margin: 0;
        }
        .brand-entry__stats {
          display: flex;
          gap: var(--space-5);
          margin-top: var(--space-2);
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
        }
        .brand-entry__stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .brand-entry__stat-value {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .brand-entry__stat-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .brand-entry__link {
          margin-top: var(--space-2);
          align-self: flex-start;
          font-size: var(--text-xs);
        }

        /* Content column */
        .brand-entry__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-8);
        }
        .brand-entry__highlights-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-4);
        }
        .brand-entry__highlights {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .brand-entry__highlight {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .brand-entry__highlight-mark {
          color: var(--accent);
          font-size: var(--text-sm);
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* ── Thesis ── */
        .brands-thesis {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .brands-thesis__inner {
          max-width: 760px;
        }
        .brands-thesis__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-snug);
          margin: 0 0 var(--space-8);
        }
        .brands-thesis__body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-6);
        }
        .brands-thesis__cta {
          margin-top: var(--space-4);
        }
      `}</style>
    </>
  );
}
