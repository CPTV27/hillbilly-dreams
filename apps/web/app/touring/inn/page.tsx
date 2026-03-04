// apps/web/app/touring/inn/page.tsx
// Corridor-Wide Hospitality Guide — Where to Stay Across the Big Muddy Network
// NOT a duplicate of thebigmuddyinn.com — this covers lodging across all 18 cities.

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Where to Stay — Big Muddy Touring',
  description:
    'A corridor-wide hospitality guide to the best lodging across 18 cities and 5 states. From haunted plantations to historic downtown hotels — find where to stay on the Big Muddy circuit.',
};

/* ─────────────────────────────────────────────── *
 *  LODGING DATA — organized by region             *
 *  Replace with Prisma queries in Phase 3         *
 * ─────────────────────────────────────────────── */

interface Lodging {
  name: string;
  description: string;
  price: string;
  url?: string;
}

interface CityLodging {
  city: string;
  state: string;
  tagline: string;
  lodging: Lodging[];
}

interface Region {
  name: string;
  description: string;
  cities: CityLodging[];
}

const REGIONS: Region[] = [
  {
    name: 'The Core Corridor',
    description: 'Memphis to New Orleans — the headline run. Five cities along the Mississippi where the music started and never stopped.',
    cities: [
      {
        city: 'Memphis',
        state: 'TN',
        tagline: 'The birthplace of rock and roll, soul, and the blues',
        lodging: [
          {
            name: 'The Peabody Memphis',
            description: 'Historic grand hotel since 1869, National Register of Historic Places. Watch the daily duck march, then walk to Beale Street.',
            price: 'From $199/night',
            url: 'https://peabodymemphis.com',
          },
          {
            name: 'ARRIVE Memphis',
            description: 'Stylish modern boutique celebrating local artists and Memphis soul. Steps from South Main Arts District.',
            price: 'From $250/night',
            url: 'https://www.arrivehotels.com/hotels/memphis',
          },
          {
            name: 'The James Lee House',
            description: '1848 Victorian mansion turned luxury B&B. National Historic Landmark with opulent suites and original millwork.',
            price: 'From $325/night',
            url: 'https://www.jamesleehouse.com',
          },
        ],
      },
      {
        city: 'Clarksdale',
        state: 'MS',
        tagline: 'The crossroads of the Delta blues',
        lodging: [
          {
            name: 'Shack Up Inn',
            description: 'Renovated sharecropper shacks on Hopson Plantation. "Bed & Beer" with live blues and authentic Delta grit.',
            price: 'From $65/night',
            url: 'https://www.shackupinn.com/',
          },
          {
            name: 'Clark House Inn',
            description: 'Historic 1859 home of Clarksdale founder John Clark. Walking distance to every blues site that matters.',
            price: 'From $75/night',
            url: 'https://www.clarkhouse.info/',
          },
          {
            name: 'Travelers Hotel',
            description: 'Artist-run boutique in a restored downtown building. Community hub for creatives passing through the Delta.',
            price: 'From $100/night',
            url: 'https://www.stayattravelers.com/',
          },
        ],
      },
      {
        city: 'Vicksburg',
        state: 'MS',
        tagline: 'Antebellum mansions and battlefield ghosts',
        lodging: [
          {
            name: 'Anchuca Historic Mansion & Inn',
            description: 'Grand 1830s antebellum mansion with pool, gardens, and on-site restaurant. Southern Gothic hospitality at its finest.',
            price: '$$$',
            url: 'https://anchuca.com',
          },
          {
            name: 'Duff Green Mansion',
            description: '1850s antebellum mansion, once a Civil War hospital. Period furnishings, daily 3-course breakfast, and yes — it is haunted.',
            price: '$$$',
            url: 'https://duffgreenmansion.com',
          },
          {
            name: 'Oak Hall Bed & Breakfast',
            description: '1910 Mission Revival mansion with 32 original stained glass windows and a dedicated Delta Blues Room.',
            price: '$$',
            url: 'https://oakhallbnb.com',
          },
        ],
      },
      {
        city: 'Natchez',
        state: 'MS',
        tagline: 'Where the river bends south toward New Orleans',
        lodging: [
          {
            name: 'The Big Muddy Inn & Blues Room',
            description: 'Our home base. Six suites, each named for a legend. 411 N Commerce Street, in the oldest part of town, perched above the bluff.',
            price: 'From $185/night',
            url: 'https://thebigmuddyinn.com',
          },
          {
            name: 'Monmouth Historic Inn',
            description: 'National Historic Landmark antebellum mansion on 26 acres of gardens. Luxury lodging steeped in another century.',
            price: '$$$',
            url: 'https://www.monmouthhistoricinn.com',
          },
          {
            name: 'Devereaux Shields House',
            description: 'Elegant 1893 Queen Anne Victorian B&B with gourmet breakfasts and lush gardens.',
            price: '$$',
            url: 'https://www.dshieldsusa.com',
          },
        ],
      },
      {
        city: 'New Orleans',
        state: 'LA',
        tagline: 'The city that never needed an introduction',
        lodging: [
          {
            name: 'Hotel Monteleone',
            description: 'French Quarter landmark since 1886. The Carousel Piano Bar rotates — literally. Tennessee Williams drank here.',
            price: 'From $250/night',
            url: 'https://hotelmonteleone.com',
          },
          {
            name: 'Hotel Peter and Paul',
            description: 'Converted 19th-century church, school, and convent in Marigny. Stained glass, cloistered courtyards, speakeasy bar.',
            price: 'From $200/night',
          },
          {
            name: 'Dauphine Orleans Hotel',
            description: 'Boutique hotel with haunted bordello history. Saltwater pool, central French Quarter, and more ghosts than guests.',
            price: 'From $150/night',
            url: 'https://www.dauphineorleans.com',
          },
        ],
      },
    ],
  },
  {
    name: 'Louisiana Network',
    description: 'Bayou country, Cajun heartland, and the pine-hill towns of the north. Eight cities with hospitality that runs deeper than the roots.',
    cities: [
      {
        city: 'St. Francisville',
        state: 'LA',
        tagline: 'Haunted plantations and mossy oaks',
        lodging: [
          {
            name: 'The Myrtles Plantation',
            description: 'Famed haunted antebellum plantation from 1796. Ghost tours, Gothic gardens, and rooms where the past never left.',
            price: 'From $200/night',
            url: 'https://www.myrtlesplantation.com/',
          },
          {
            name: 'The St. Francisville Inn',
            description: 'Luxurious boutique in a renovated 19th-century home. Spa, pool, and a central historic district perch.',
            price: 'From $250/night',
            url: 'https://stfrancisvilleinn.com/',
          },
        ],
      },
      {
        city: 'Baton Rouge',
        state: 'LA',
        tagline: 'State capital, riverfront, and LSU\'s purple pulse',
        lodging: [
          {
            name: 'WATERMARK Baton Rouge',
            description: 'Luxe boutique inside a restored 1927 bank. Marble, soaring interiors, and a prime downtown riverfront location.',
            price: 'From $170/night',
          },
          {
            name: 'The Stockade Bed and Breakfast',
            description: 'Historic B&B with a quiet, residential setting. Porches, gardens, and a personal Baton Rouge experience.',
            price: 'From $150/night',
            url: 'https://thestockade.com/',
          },
        ],
      },
      {
        city: 'Lafayette',
        state: 'LA',
        tagline: 'Capital of Cajun country',
        lodging: [
          {
            name: 'T\'Frere\'s House',
            description: 'Acadian-style B&B in a preserved 1880 home. True Cajun hospitality, full breakfasts, and gardens under ancient oaks.',
            price: 'From $190/night',
          },
          {
            name: 'Carriage House Hotel',
            description: 'AAA 4-Diamond boutique all-suite hotel. Southern charm meets luxury in River Ranch.',
            price: 'From $250/night',
            url: 'https://www.thecarriagehousehotel.com',
          },
        ],
      },
      {
        city: 'Alexandria',
        state: 'LA',
        tagline: 'Gilded Age elegance at the crossroads of Louisiana',
        lodging: [
          {
            name: 'Hotel Bentley',
            description: 'Historic 1908 Gilded Age hotel with grand Ionic columns and a lobby that hosted WWII generals.',
            price: 'From $100/night',
            url: 'https://www.visithotelbentley.com',
          },
          {
            name: 'Susan\'s Cottages',
            description: 'Private romantic cottages in a pecan orchard along Bayou Rapides. Whirlpool tubs and bayou-view balconies.',
            price: 'From $200/night',
            url: 'https://www.susanscottages.net',
          },
        ],
      },
      {
        city: 'Monroe',
        state: 'LA',
        tagline: 'Ouachita River honky-tonk and Southern soul',
        lodging: [
          {
            name: 'The Hotel Monroe',
            description: 'Boutique stay in restored 1891 buildings with local art throughout. Downtown, walkable to everything.',
            price: '$$\u2013$$$',
          },
          {
            name: 'Hamilton House Inn',
            description: 'Luxury B&B in Antique Alley with rooftop terrace overlooking West Monroe.',
            price: '$$\u2013$$$',
          },
        ],
      },
      {
        city: 'Ruston',
        state: 'LA',
        tagline: 'Pine-hill college town with indie roots',
        lodging: [
          {
            name: 'The Big House',
            description: 'Historic downtown venue with luxurious king suites blending antebellum echoes and modern comfort.',
            price: '$$\u2013$$$',
          },
          {
            name: 'Ruston Lofts',
            description: 'Micro-boutique hotel in a restored 1920s department store. Minimalist suites with industrial charm.',
            price: '$$\u2013$$$',
          },
        ],
      },
      {
        city: 'Natchitoches',
        state: 'LA',
        tagline: 'The oldest settlement in Louisiana',
        lodging: [
          {
            name: 'Ch\u00e2teau Saint Denis Hotel',
            description: 'Downtown boutique with French Quarter-inspired courtyard. Brick, fountain, old-world lobby.',
            price: 'From $150/night',
            url: 'https://www.chateausaintdenis.com',
          },
          {
            name: 'Sweet Cane Inn',
            description: 'Restored Victorian B&B with high ceilings, fireplaces, stained glass, and a standout breakfast.',
            price: 'From $130/night',
            url: 'https://www.sweetcaneinn.com',
          },
        ],
      },
      {
        city: 'Shreveport',
        state: 'LA',
        tagline: 'Speakeasies, Victorian porches, and the Red River',
        lodging: [
          {
            name: 'The Remington Suite Hotel & Spa',
            description: 'Downtown all-suite boutique in a 100-year-old building. 1920s speakeasy vibe on the rooftop.',
            price: 'From $200/night',
            url: 'https://remingtonsuite.com',
          },
          {
            name: '2439 Fairfield B&B',
            description: 'Circa-1905 Victorian mansion packed with antiques and gardens. Pure Southern Gothic on Fairfield Avenue.',
            price: 'From $150/night',
            url: 'https://www.shreveportbedandbreakfast.com',
          },
        ],
      },
    ],
  },
  {
    name: 'Arkansas & Missouri',
    description: 'Ozark hollows, art trails, and mountain music. The northern reach of the Big Muddy network — where the river begins to feel different.',
    cities: [
      {
        city: 'El Dorado',
        state: 'AR',
        tagline: 'Oil boom town turned arts district',
        lodging: [
          {
            name: 'The Haywood',
            description: 'Boutique hotel in the heart of Murphy Arts District. Modern comfort meets historic Southern charm.',
            price: 'From $150/night',
          },
          {
            name: 'Pinson House B&B',
            description: 'Circa 1919 historic B&B two blocks from the square. Full breakfast and small-town warmth.',
            price: 'From $100/night',
          },
        ],
      },
      {
        city: 'Little Rock',
        state: 'AR',
        tagline: 'State capital with civil rights history and a raw music scene',
        lodging: [
          {
            name: 'Capital Hotel',
            description: 'Gilded Age luxury downtown. The kind of grand Southern hotel that makes you slow down.',
            price: '$$$',
          },
          {
            name: 'The Empress of Little Rock',
            description: 'Victorian B&B with ornate period charm. A queen of a house.',
            price: '$$\u2013$$$',
          },
        ],
      },
      {
        city: 'Fayetteville',
        state: 'AR',
        tagline: 'Ozark college town where Dickson Street never sleeps',
        lodging: [
          {
            name: 'Inn at Carnall Hall',
            description: 'Historic University of Arkansas dorm turned boutique hotel. Campus charm meets refined hospitality.',
            price: 'From $148/night',
          },
          {
            name: 'Pratt Place Inn',
            description: 'Luxury B&B on a wooded estate. Privacy, porches, and Ozark quiet.',
            price: 'From $234/night',
          },
        ],
      },
      {
        city: 'Bentonville',
        state: 'AR',
        tagline: 'Trails, art, and unexpected culture',
        lodging: [
          {
            name: '21c Museum Hotel',
            description: 'Artsy boutique with contemporary exhibits in every hallway. Sleep surrounded by art, ride trails in the morning.',
            price: '$$$',
          },
          {
            name: 'The Victoria B&B',
            description: 'Victorian charm adjoining Crystal Bridges Museum. Walk to the art, walk to the square.',
            price: 'From $200/night',
          },
        ],
      },
      {
        city: 'Branson',
        state: 'MO',
        tagline: 'Ozark variety shows and fog-shrouded hollows',
        lodging: [
          {
            name: 'Carriage House Inn',
            description: 'Victorian-style inn near the Strip. Southern hospitality meets Ozark mountain charm.',
            price: '$$\u2013$$$',
          },
          {
            name: 'Bradford House B&B',
            description: 'Elegant Victorian downtown. A quieter Branson, away from the neon.',
            price: '$$\u2013$$$',
          },
        ],
      },
    ],
  },
];

const STATS = [
  { label: 'Cities', value: '18', sub: 'Across five states' },
  { label: 'States', value: '5', sub: 'TN \u00b7 MS \u00b7 LA \u00b7 AR \u00b7 MO' },
  { label: 'Properties', value: '40+', sub: 'Curated lodging picks' },
  { label: 'Home Base', value: 'Natchez', sub: 'The Big Muddy Inn' },
];

export default function InnPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="inn-hero">
        <Image
          src="/images/generated/hero-bayou-mist.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="inn-hero__overlay" />
        <div className="inn-hero__content">
          <div className="inn-hero__eyebrow">
            <span className="inn-hero__ornament">&#9670;</span>
            <span>Memphis to New Orleans \u00b7 and Beyond</span>
          </div>
          <h1 className="inn-hero__title">
            Where to Stay
            <br />
            <em>Along the Way</em>
          </h1>
          <p className="inn-hero__sub">
            A hospitality guide to the entire Big Muddy corridor. Eighteen cities,
            five states, and the best places to lay your head — from haunted
            plantations to artists&rsquo; lofts, juke-joint motels to grand hotels.
          </p>
          <a
            href="https://thebigmuddyinn.com"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book the Inn in Natchez
          </a>
        </div>
        <div className="inn-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="1" height="40" viewBox="0 0 1 40">
            <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="inn-stats">
        <div className="section-container">
          <div className="inn-stats__grid">
            {STATS.map((item) => (
              <div key={item.label} className="inn-stat">
                <span className="inn-stat__label">{item.label}</span>
                <span className="inn-stat__value">{item.value}</span>
                <span className="inn-stat__sub">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Home Base Callout ── */}
      <section className="inn-homebase">
        <div className="section-container">
          <div className="inn-homebase__inner">
            <div className="inn-homebase__text">
              <div className="section-label">Home Base</div>
              <h2 className="section-title">The Big Muddy Inn &amp; Blues Room</h2>
              <p className="section-desc">
                411 N Commerce Street, Natchez, Mississippi. Six suites, each named for a
                legend of American music. This is where the Big Muddy started — and where every
                route begins and ends. The property details, suite descriptions, and booking are
                at the dedicated inn site.
              </p>
              <a
                href="https://thebigmuddyinn.com"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit thebigmuddyinn.com
              </a>
            </div>
            <div className="inn-homebase__image">
              <Image
                src="/images/real/inn-foyer.webp"
                alt="The Big Muddy Inn foyer"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      {REGIONS.map((region, ri) => (
        <section key={region.name} className="inn-region">
          <div className="section-container">
            <div className="inn-region__header">
              <div className="section-label">
                {ri === 0 ? 'Memphis to New Orleans' : ri === 1 ? 'Louisiana' : 'Arkansas & Missouri'}
              </div>
              <h2 className="section-title">{region.name}</h2>
              <p className="section-desc">{region.description}</p>
            </div>

            <div className="inn-region__cities">
              {region.cities.map((city) => (
                <article key={city.city} className="inn-city">
                  <div className="inn-city__header">
                    <h3 className="inn-city__name">
                      {city.city}, {city.state}
                    </h3>
                    <p className="inn-city__tagline">{city.tagline}</p>
                  </div>
                  <div className="inn-city__lodging">
                    {city.lodging.map((place) => (
                      <div key={place.name} className="inn-place">
                        <div className="inn-place__header">
                          <h4 className="inn-place__name">
                            {place.url ? (
                              <a
                                href={place.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {place.name}
                                <span className="inn-place__arrow"> &#8599;</span>
                              </a>
                            ) : (
                              place.name
                            )}
                          </h4>
                          <span className="inn-place__price">{place.price}</span>
                        </div>
                        <p className="inn-place__desc">{place.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Bottom CTA ── */}
      <section className="inn-book">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ textAlign: 'center', display: 'block' }}>
            Start at the Source
          </div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-4)' }}>
            The Big Muddy Inn, Natchez
          </h2>
          <p
            className="section-desc"
            style={{ margin: '0 auto var(--space-8)', textAlign: 'center' }}
          >
            Six suites. Live blues downstairs. The Mississippi around the corner.
            This is where it all starts.
          </p>
          <a
            href="https://thebigmuddyinn.com"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book at thebigmuddyinn.com
          </a>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .inn-hero {
          min-height: 70vh;
          display: flex;
          align-items: center;
          background: var(--bg);
          padding: var(--space-24) var(--space-6);
          position: relative;
        }
        .inn-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(26, 24, 22, 0.88) 0%,
            rgba(26, 24, 22, 0.6) 50%,
            rgba(26, 24, 22, 0.92) 100%
          );
          z-index: 1;
        }
        .inn-hero__content {
          position: relative;
          max-width: var(--container-xl);
          margin: 0 auto;
          width: 100%;
          z-index: 2;
        }
        .inn-hero__eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-4);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .inn-hero__ornament {
          font-size: var(--text-xs);
          opacity: 0.6;
        }
        .inn-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-6);
          max-width: 700px;
        }
        .inn-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .inn-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0 0 var(--space-10);
        }
        .inn-hero__scroll-hint {
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
          color: var(--text-muted);
          opacity: 0.5;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          z-index: 2;
        }

        /* ── Stats ── */
        .inn-stats {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .inn-stats__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-8);
        }
        @media (min-width: 640px) {
          .inn-stats__grid { grid-template-columns: repeat(4, 1fr); }
        }
        .inn-stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          padding: var(--space-6) 0;
          border-right: 1px solid var(--border-subtle);
        }
        .inn-stat:last-child { border-right: none; }
        .inn-stat__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .inn-stat__value {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .inn-stat__sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        /* ── Home Base ── */
        .inn-homebase {
          border-bottom: 1px solid var(--border);
        }
        .inn-homebase__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
          align-items: center;
        }
        @media (min-width: 768px) {
          .inn-homebase__inner { grid-template-columns: 1fr 1fr; }
        }
        .inn-homebase__text {
          max-width: 520px;
        }
        .inn-homebase__image {
          position: relative;
          width: 100%;
          min-height: 320px;
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        /* ── Region Sections ── */
        .inn-region {
          border-bottom: 1px solid var(--border);
        }
        .inn-region:nth-child(even) {
          background: var(--surface);
        }
        .inn-region__header {
          max-width: 640px;
          margin-bottom: var(--space-12);
        }
        .inn-region__cities {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        /* ── City Card ── */
        .inn-city {
          padding: var(--space-8) 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .inn-city:last-child { border-bottom: none; }
        .inn-city__header {
          margin-bottom: var(--space-6);
        }
        .inn-city__name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-1);
        }
        .inn-city__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--accent);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          margin: 0;
        }
        .inn-city__lodging {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .inn-city__lodging { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .inn-city__lodging { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Place Card ── */
        .inn-place {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--space-5);
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .inn-place:hover {
          border-color: var(--accent);
        }
        .inn-place__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        .inn-place__name {
          font-family: var(--font-display);
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: var(--leading-snug);
        }
        .inn-place__name a {
          color: var(--text);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .inn-place__name a:hover {
          color: var(--accent);
        }
        .inn-place__arrow {
          font-size: var(--text-xs);
          opacity: 0.5;
        }
        .inn-place__price {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .inn-place__desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-relaxed);
          margin: 0;
        }

        /* ── Book CTA ── */
        .inn-book {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }

        /* ── Shared ── */
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
        .section-desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 520px;
          margin: 0 0 var(--space-6);
        }
      `}</style>
    </>
  );
}
