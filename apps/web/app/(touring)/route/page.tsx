// apps/web/app/(touring)/route/page.tsx
// Route page — Memphis to New Orleans via Highway 61

import type { Metadata } from 'next';
import { NewsletterSignup } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'The Route — Memphis to New Orleans',
  description:
    'Five cities, four hundred miles, a thousand years of American music. The Big Muddy Touring route along Highway 61.',
};

const STOPS = [
  {
    id: 'memphis',
    city: 'Memphis',
    state: 'Tennessee',
    tagline: 'Where the Blues Went Electric',
    description:
      "Memphis is the northern anchor — Beale Street, Sun Studio, Stax Records, and the National Civil Rights Museum. This is where Robert Johnson\'s Delta blues met electric amplification and became rock and roll. Drive south on Highway 61 when you\'re ready; the delta opens up fast.",
    highlights: [
      'Beale Street — the living museum of Memphis blues',
      'Sun Studio — Elvis, Johnny Cash, Jerry Lee Lewis all recorded here',
      'Stax Records Museum — where soul music was born',
      'National Civil Rights Museum at the Lorraine Motel',
      'Gus\'s World Famous Fried Chicken — non-negotiable',
    ],
    distance: 'Starting point',
    driveTime: null,
  },
  {
    id: 'clarksdale',
    city: 'Clarksdale',
    state: 'Mississippi',
    tagline: 'The Birthplace of the Delta Blues',
    description:
      "Sixty miles south of Memphis, Clarksdale is where you feel the delta open up. The crossroads of Highways 61 and 49 is real — you can stand there. The Delta Blues Museum, Ground Zero Blues Club (co-owned by Morgan Freeman), and Yazoo Pass make Clarksdale essential. Spend the night if you can.",
    highlights: [
      'The Crossroads (61 & 49) — where Robert Johnson allegedly sold his soul',
      'Delta Blues Museum — the definitive collection',
      'Ground Zero Blues Club — live music most nights',
      "Yazoo Pass — the best record store on the route",
      'Riverside Hotel — where Bessie Smith died',
    ],
    distance: '~60 miles south of Memphis',
    driveTime: '1 hour',
  },
  {
    id: 'vicksburg',
    city: 'Vicksburg',
    state: 'Mississippi',
    tagline: 'Where the River Commands',
    description:
      "Vicksburg sits on a bluff above the Mississippi where the river bends in a way that made it strategically critical during the Civil War. The National Military Park is extraordinary. The old town, now filling with art galleries and restaurants, rewards a half day of wandering. The river views from the bluff are why people stopped here in the first place.",
    highlights: [
      'Vicksburg National Military Park',
      'The Mississippi River overlooks',
      'Old Court House Museum',
      'Rusty\'s Riverfront Grill for catfish',
      'Historic downtown gallery district',
    ],
    distance: '~130 miles south of Clarksdale',
    driveTime: '2 hours',
  },
  {
    id: 'natchez',
    city: 'Natchez',
    state: 'Mississippi',
    tagline: 'The Oldest City on the Mississippi',
    description:
      "Natchez is the heart of the route — and the location of the inn. The oldest permanent settlement on the Mississippi River, Natchez has more antebellum architecture per square mile than anywhere in the country. Under-the-Hill, the historic neighborhood at the base of the bluff, was once the roughest port on the river. It\'s quieter now. Stay for two nights.",
    highlights: [
      'The Inn at Big Muddy — 411 N Commerce Street',
      'Natchez Under-the-Hill',
      'Stanton Hall — one of the great antebellum homes',
      'The Natchez Trace Parkway',
      'Magnolia Grill for breakfast',
    ],
    distance: '~75 miles south of Vicksburg',
    driveTime: '1.5 hours',
  },
  {
    id: 'new-orleans',
    city: 'New Orleans',
    state: 'Louisiana',
    tagline: 'Where the River Meets the Sea',
    description:
      "New Orleans is the southern terminus — and a destination that earns every mile of road that led to it. Jazz was born here. So was a cuisine, a culture, and an entire way of understanding what America could be if it stopped being afraid of pleasure. The French Quarter is the postcard. Tremé, Bywater, and Magazine Street are the real city. Eat beignets. Listen to everything.",
    highlights: [
      'The French Quarter — worth the tourist gauntlet',
      'Tremé — the oldest Black neighborhood in the country',
      'Preservation Hall — live traditional jazz nightly',
      'The Spotted Cat on Frenchmen Street',
      'Dooky Chase\'s — Leah Chase\'s restaurant',
    ],
    distance: '~170 miles south of Natchez',
    driveTime: '3 hours',
  },
];

export default function RoutePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="route-hero">
        <div className="route-hero__content">
          <div className="route-hero__eyebrow">Highway 61 South</div>
          <h1 className="route-hero__title">
            Memphis to
            <br />
            <em>New Orleans</em>
          </h1>
          <div className="route-hero__stats">
            <div className="route-stat">
              <span className="route-stat__num">5</span>
              <span className="route-stat__label">Cities</span>
            </div>
            <div className="route-stat">
              <span className="route-stat__num">~400</span>
              <span className="route-stat__label">Miles</span>
            </div>
            <div className="route-stat">
              <span className="route-stat__num">1,000</span>
              <span className="route-stat__label">Years of Music</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="route-overview">
        <div className="section-container">
          <div className="route-overview__text">
            <div className="section-label">The Route</div>
            <p className="route-overview__body">
              Highway 61 is the Blues Highway — the road that carried a generation of 
              Black musicians from the Delta to Chicago, and brought the whole world south 
              to find where the music came from. The full drive takes about eight hours 
              without stops. Plan for four days minimum; a week if you want to do it right.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stops ── */}
      <section className="route-stops">
        <div className="section-container">
          {STOPS.map((stop, i) => (
            <article key={stop.id} id={stop.id} className="route-stop-detail">
              <div className="route-stop-detail__marker">
                <span className="route-stop-detail__num">{String(i + 1).padStart(2, '0')}</span>
                {i < STOPS.length - 1 && <div className="route-stop-detail__connector" />}
              </div>
              <div className="route-stop-detail__body">
                <div className="route-stop-detail__header">
                  <div>
                    <h2 className="route-stop-detail__city">{stop.city}</h2>
                    <p className="route-stop-detail__state">{stop.state}</p>
                    <p className="route-stop-detail__tagline">{stop.tagline}</p>
                  </div>
                  {stop.driveTime && (
                    <div className="route-stop-detail__distance">
                      <span className="route-stop-detail__dist-label">Drive from previous</span>
                      <span className="route-stop-detail__dist-val">{stop.driveTime}</span>
                      <span className="route-stop-detail__dist-mi">{stop.distance}</span>
                    </div>
                  )}
                </div>
                <p className="route-stop-detail__desc">{stop.description}</p>
                <ul className="route-stop-detail__highlights">
                  {stop.highlights.map((h) => (
                    <li key={h}>
                      <span className="route-stop-detail__bullet" aria-hidden="true">&#9670;</span>
                      {h}
                    </li>
                  ))}
                </ul>
                {stop.id === 'natchez' && (
                  <div className="route-stop-detail__inn-callout">
                    <p>
                      <strong>Stay at the inn.</strong> 411 N Commerce Street is where the route 
                      pauses. Six suites, each named for a legend.
                    </p>
                    <a href="/inn" className="btn btn--primary">
                      View the Inn
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        .route-hero {
          min-height: 70vh;
          display: flex;
          align-items: center;
          background: var(--bg);
          padding: var(--space-24) var(--space-6);
          position: relative;
          overflow: hidden;
        }
        .route-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 100% 80% at 0% 50%, rgba(200, 148, 62, 0.06) 0%, transparent 60%);
        }
        .route-hero__content {
          position: relative;
          max-width: var(--container-xl);
          margin: 0 auto;
          width: 100%;
        }
        .route-hero__eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-5);
        }
        .route-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-12);
        }
        .route-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .route-hero__stats {
          display: flex;
          gap: var(--space-12);
        }
        .route-stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .route-stat__num {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .route-stat__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }
        .route-overview {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .route-overview__text {
          max-width: 700px;
        }
        .route-overview__body {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }
        .route-stops .section-container {
          padding-top: var(--space-16);
          padding-bottom: var(--space-16);
        }
        .route-stop-detail {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: var(--space-8);
          position: relative;
        }
        @media (max-width: 640px) {
          .route-stop-detail {
            grid-template-columns: 48px 1fr;
            gap: var(--space-4);
          }
        }
        .route-stop-detail__marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding-top: 6px;
        }
        .route-stop-detail__num {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-muted);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-sm);
          padding: var(--space-1) var(--space-2);
          line-height: 1;
          min-width: 40px;
          text-align: center;
        }
        .route-stop-detail__connector {
          flex: 1;
          width: 1px;
          background: var(--border);
          margin-top: var(--space-2);
          min-height: 60px;
        }
        .route-stop-detail__body {
          padding-bottom: var(--space-16);
        }
        .route-stop-detail:last-child .route-stop-detail__body {
          padding-bottom: 0;
        }
        .route-stop-detail__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-6);
          margin-bottom: var(--space-5);
          flex-wrap: wrap;
        }
        .route-stop-detail__city {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 2px;
        }
        .route-stop-detail__state {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin: 0 0 var(--space-2);
        }
        .route-stop-detail__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          margin: 0;
        }
        .route-stop-detail__distance {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .route-stop-detail__dist-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
        }
        .route-stop-detail__dist-val {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
        }
        .route-stop-detail__dist-mi {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }
        .route-stop-detail__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 700px;
          margin: 0 0 var(--space-6);
        }
        .route-stop-detail__highlights {
          list-style: none;
          margin: 0 0 var(--space-6);
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .route-stop-detail__highlights li {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .route-stop-detail__bullet {
          color: var(--accent);
          font-size: 8px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .route-stop-detail__inn-callout {
          background: var(--accent-muted);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          padding: var(--space-5) var(--space-6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-6);
          flex-wrap: wrap;
          margin-top: var(--space-6);
        }
        .route-stop-detail__inn-callout p {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text);
          margin: 0;
          line-height: var(--leading-normal);
        }
        .route-stop-detail__inn-callout strong {
          color: var(--accent);
        }
        /* Shared button */
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
        .btn--primary { background: var(--accent); color: var(--bg); }
        .btn--primary:hover { background: var(--accent-hover); }
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
          display: block;
        }
      `}</style>
    </>
  );
}
