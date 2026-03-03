// apps/web/app/(magazine)/city-guides/page.tsx
// City guide index — all cities with published city-guide articles

import type { Metadata } from 'next';
import { NewsletterSignup } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'City Guides',
  description:
    'Comprehensive guides to every stop on the Mississippi music corridor — Memphis, Clarksdale, Vicksburg, Natchez, and New Orleans.',
};

const CITIES = [
  {
    id: 'memphis',
    name: 'Memphis',
    state: 'Tennessee',
    tagline: 'Where the Blues Went Electric',
    description:
      "The northern anchor of the corridor. Beale Street, Sun Studio, Stax Records, and the National Civil Rights Museum. Memphis is where delta blues met electric amplification and became rock and roll.",
    articleCount: 4,
    highlights: ['Beale Street', 'Sun Studio', 'Stax Museum', 'NCRM'],
    accentColor: '#8b4513',
  },
  {
    id: 'clarksdale',
    name: 'Clarksdale',
    state: 'Mississippi',
    tagline: 'The Birthplace of the Delta Blues',
    description:
      "Sixty miles south of Memphis, where the delta opens up and the crossroads of 61 and 49 makes the legend feel real. The Delta Blues Museum, Ground Zero, and Yazoo Pass are why you come. The feeling of the place is why you stay.",
    articleCount: 6,
    highlights: ['The Crossroads', 'Delta Blues Museum', 'Ground Zero', 'Yazoo Pass'],
    accentColor: '#8b6914',
  },
  {
    id: 'vicksburg',
    name: 'Vicksburg',
    state: 'Mississippi',
    tagline: 'Where the River Commands',
    description:
      "A Civil War town on a bluff above the Mississippi that's slowly becoming something interesting again. The National Military Park is extraordinary. The river views from the bluff are why people have stopped here for three hundred years.",
    articleCount: 3,
    highlights: ['National Military Park', 'River Overlooks', 'Old Court House', 'Gallery District'],
    accentColor: '#3d6b4a',
  },
  {
    id: 'natchez',
    name: 'Natchez',
    state: 'Mississippi',
    tagline: 'The Oldest City on the Mississippi',
    description:
      "The heart of the route — and the location of the inn. The oldest permanent settlement on the Mississippi River. More antebellum architecture per square mile than anywhere in the country. Natchez Under-the-Hill was once the roughest port on the river.",
    articleCount: 8,
    highlights: ['The Inn', 'Under-the-Hill', 'Stanton Hall', 'The Natchez Trace'],
    accentColor: '#c8943e',
  },
  {
    id: 'new-orleans',
    name: 'New Orleans',
    state: 'Louisiana',
    tagline: 'Where the River Meets the Sea',
    description:
      "The southern terminus. Jazz was born here. So was a cuisine, a culture, and an entire way of understanding what America could be if it stopped being afraid of pleasure. The French Quarter is the postcard; Tremé and Bywater are the real city.",
    articleCount: 7,
    highlights: ['French Quarter', "Tremé", 'Preservation Hall', 'Frenchmen Street'],
    accentColor: '#6b4faa',
  },
];

export default async function CityGuidesPage() {
  // TODO: Replace with prisma query:
  // const cityArticles = await prisma.article.groupBy({
  //   by: ['city'],
  //   where: { status: 'published', category: 'city-guide', city: { not: null } },
  //   _count: { city: true },
  // });

  return (
    <>
      {/* ── Header ── */}
      <section className="cg-header">
        <div className="section-container">
          <div className="section-label">City Guides</div>
          <h1 className="cg-title">Five Cities.<br /><em>One River.</em></h1>
          <p className="cg-sub">
            Comprehensive guides to every stop on the Mississippi music corridor. 
            Where to eat, sleep, listen, and why it all matters.
          </p>
        </div>
      </section>

      {/* ── Route Visual ── */}
      <section className="cg-route-bar">
        <div className="section-container">
          <div className="cg-route-cities">
            {CITIES.map((city, i) => (
              <div key={city.id} className="cg-route-city">
                <a href={`#${city.id}`} className="cg-route-city__link">
                  {city.name}
                </a>
                {i < CITIES.length - 1 && (
                  <span className="cg-route-arrow" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── City Cards ── */}
      <section className="cg-cities">
        <div className="section-container">
          {CITIES.map((city, i) => (
            <article
              key={city.id}
              id={city.id}
              className={`cg-city ${i % 2 === 1 ? 'cg-city--alt' : ''}`}
            >
              <div className="cg-city__num">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="cg-city__body">
                <div className="cg-city__header">
                  <div>
                    <h2 className="cg-city__name">{city.name}</h2>
                    <p className="cg-city__state">{city.state}</p>
                    <p className="cg-city__tagline">{city.tagline}</p>
                  </div>
                  <div className="cg-city__count">
                    <span className="cg-city__count-num">{city.articleCount}</span>
                    <span className="cg-city__count-label">stories</span>
                  </div>
                </div>
                <p className="cg-city__desc">{city.description}</p>
                <div className="cg-city__highlights">
                  {city.highlights.map((h) => (
                    <span key={h} className="cg-city__tag">{h}</span>
                  ))}
                </div>
                <a
                  href={`/articles?city=${city.id}`}
                  className="cg-city__link"
                >
                  Read all {city.name} stories →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        .cg-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .cg-title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .cg-title em {
          font-style: italic;
          color: var(--accent);
        }
        .cg-sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 560px;
          margin: 0;
        }
        .cg-route-bar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .cg-route-bar .section-container {
          padding-top: var(--space-6);
          padding-bottom: var(--space-6);
        }
        .cg-route-cities {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        .cg-route-city {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .cg-route-city__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          transition: color var(--duration-fast) var(--ease-default);
        }
        .cg-route-city__link:hover { color: var(--accent); }
        .cg-route-arrow {
          color: var(--text-disabled);
          font-size: var(--text-sm);
        }
        .cg-cities .section-container {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
        .cg-city {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: var(--space-8);
          padding: var(--space-16) 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .cg-city:first-child { padding-top: var(--space-20); }
        .cg-city:last-child { border-bottom: none; padding-bottom: var(--space-20); }
        .cg-city--alt .cg-city__body {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          margin: calc(-1 * var(--space-4)) 0;
        }
        .cg-city__num {
          padding-top: 6px;
        }
        .cg-city__num span {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          opacity: 0.5;
        }
        .cg-city__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-6);
          margin-bottom: var(--space-5);
          flex-wrap: wrap;
        }
        .cg-city__name {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 2px;
          line-height: 1;
        }
        .cg-city__state {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin: 0 0 var(--space-2);
        }
        .cg-city__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          margin: 0;
        }
        .cg-city__count {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .cg-city__count-num {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text-disabled);
          line-height: 1;
        }
        .cg-city__count-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
        }
        .cg-city__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 680px;
          margin: 0 0 var(--space-5);
        }
        .cg-city__highlights {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
        }
        .cg-city__tag {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-muted);
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: var(--space-1) var(--space-3);
        }
        .cg-city__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .cg-city__link:hover { color: var(--accent-hover); }
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
          margin-bottom: var(--space-4);
          display: block;
        }
      `}</style>
    </>
  );
}
