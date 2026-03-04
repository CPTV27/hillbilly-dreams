// apps/web/app/touring/route/page.tsx
// Route page — Memphis to New Orleans via Highway 61, plus the Big Muddy Network

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'The Route — Memphis to New Orleans & The Big Muddy Network',
  description:
    'Eighteen cities, five states, twelve hundred miles of territory. The Big Muddy Touring route along the Mississippi corridor and the expanded network.',
};

const STOPS = [
  {
    id: 'memphis',
    city: 'Memphis',
    state: 'Tennessee',
    tagline: 'Where the Blues Went Electric',
    description:
      "Memphis is the northern anchor — Beale Street, Sun Studio, Stax Records, and the National Civil Rights Museum. This is where Robert Johnson's Delta blues met electric amplification and became rock and roll. Drive south on Highway 61 when you're ready; the delta opens up fast.",
    highlights: [
      'Beale Street — the living museum of Memphis blues',
      'Sun Studio — Elvis, Johnny Cash, Jerry Lee Lewis all recorded here',
      'Stax Records Museum — where soul music was born',
      'National Civil Rights Museum at the Lorraine Motel',
      "Gus's World Famous Fried Chicken — non-negotiable",
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
      "Rusty's Riverfront Grill for catfish",
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
      "Natchez is the heart of the route — and the location of the inn. The oldest permanent settlement on the Mississippi River, Natchez has more antebellum architecture per square mile than anywhere in the country. Under-the-Hill, the historic neighborhood at the base of the bluff, was once the roughest port on the river. It's quieter now. Stay for two nights.",
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
      "Dooky Chase's — Leah Chase's restaurant",
    ],
    distance: '~170 miles south of Natchez',
    driveTime: '3 hours',
  },
];

const NETWORK_CITIES = [
  // Louisiana
  {
    id: 'st-francisville',
    city: 'St. Francisville',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'Ghosts, Gardens, and the River Road',
    description:
      'A two-street town of antebellum homes and live oaks so old they\'ve forgotten what century it is. St. Francisville is the pause between Mississippi\'s blues country and Louisiana\'s Cajun fire — draped in moss, lit by filtered afternoon sun, and haunted in the most beautiful way.',
    highlights: [
      'The Myrtles Plantation — one of America\'s most haunted homes',
      'Rosedown Plantation — stunning historic gardens',
      'The Saint Restaurant — Michelin Recommended, locally sourced Creole cuisine',
      'Magnolia Cafe for po\'boys on Commerce Street',
      'The Oyster Bar — honky-tonk on Bayou Sarah',
    ],
  },
  {
    id: 'baton-rouge',
    city: 'Baton Rouge',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'Capital City Blues and Bayou Smoke',
    description:
      'The state capital and the geographic junction where the loop branches south to New Orleans. Underneath the LSU football culture and the Art Deco capitol tower Huey Long built, Baton Rouge is a blues town with deep juke joint roots and a cuisine that sits at the collision of Cajun country and the Deep South.',
    highlights: [
      'Henry Turner Jr.\'s Listening Room — Baton Rouge\'s last blues juke joint',
      'Teddy\'s Juke Joint — backroad authenticity in Zachary',
      'WATERMARK Hotel — restored 1927 bank building downtown',
      'The Chimes — iconic LSU-area crawfish étouffée',
      'Louisiana State Capitol — tallest in the US, Huey Long\'s monument',
    ],
  },
  {
    id: 'lafayette',
    city: 'Lafayette',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'The Heartbeat of Cajun Country',
    description:
      'Lafayette hits you like a two-step. The moment you cross the city limits, accordion and fiddle replace guitar and harmonica, the rhythms shift from 12-bar blues to Cajun waltz, and the food gets richer, spicier, more unapologetically itself. The capital of French Louisiana doesn\'t just welcome you — it grabs your hand and pulls you onto the dance floor.',
    highlights: [
      'Blue Moon Saloon — the iconic Lafayette honky-tonk',
      'Rock \'n\' Bowl — bowling alley plus live zydeco, somehow perfect',
      'Freetown Boom Boom Room — zydeco, blues, and everything between',
      'Johnson\'s Boucaniere — best BBQ in Louisiana, named by Food Network',
      'Olde Tyme Grocery — best po\'boys in America',
    ],
  },
  {
    id: 'alexandria',
    city: 'Alexandria',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'The Crossroads Nobody Expected',
    description:
      'In the geographic center of Louisiana, Alexandria is the city most people drive through on the way to somewhere else — and that\'s a mistake. A Gilded Age hotel that once hosted Eisenhower and Patton, bayou cottages hidden in pecan orchards, and a soul food tradition that could hold its own against any city twice its size.',
    highlights: [
      'Hotel Bentley — 1908 Gilded Age masterpiece, generals slept here',
      'Susan\'s Cottages — private bayou-view cabins in a pecan orchard',
      'Pamela\'s Bayou in a Bowl — soul food at its most inspired',
      'Spirits Food and Friends — dinner and live music',
      'Alexandria Riverfront Amphitheater — open-air concerts on the Red River',
    ],
  },
  {
    id: 'monroe',
    city: 'Monroe',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'Ouachita Gothic and the Forgotten River Sound',
    description:
      'Monroe sits on the western bank of the Ouachita River with a musical soul it doesn\'t always advertise. Webb Pierce carried country music out of West Monroe and into Nashville\'s hall of fame. The blues floated up from the Delta. And the Spanish moss on the courthouse square makes the Gothic quality of the place literal.',
    highlights: [
      'The Hotel Monroe — restored 1891 buildings, local art throughout',
      'Enoch\'s Irish Pub — Monroe\'s live music heart since 1980',
      'The Hub Music Hall — historic warehouse, blues and soul on rotation',
      'Big Momma\'s Fine Foods — North Louisiana soul food, unapologetic',
      'Restaurant Cotton — Delta-inflected Southern cuisine downtown',
    ],
  },
  {
    id: 'ruston',
    city: 'Ruston',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'Pine Hills, College Town, and the Sound of Something Almost Lost',
    description:
      'Ruston produced Jeff Mangum of Neutral Milk Hotel, which is an extraordinary thing to know about a small North Louisiana city. The pine hills press in from all sides, the light filters through them with Gothic warmth, and the depth here is disproportionate to the size. The Big Muddy\'s expanded territory reaches into these hills connecting the Delta to the Ozarks.',
    highlights: [
      'The Big House — downtown boutique lodging in a historic building',
      'Dixie Center for the Arts — 1930s theater, intimate live concerts',
      'The Revelry of Ruston — outdoor concerts, national acts',
      'Ponchatoulas — Cajun and Creole cooking in the pine hills',
      'Beau Vines Steakhouse — famous for Crab Cake Beignets',
    ],
  },
  {
    id: 'natchitoches',
    city: 'Natchitoches',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'The Oldest Town and the Longest Memory',
    description:
      'Say it: NAK-uh-tish. The oldest permanent settlement in the Louisiana Purchase territory, founded in 1714. The brick streets are still here, the Cane River curves through downtown like a ribbon, and the iron-lace balconies hang over Front Street like something out of a fever dream. Steel Magnolias was filmed here. The light on the Cane River at sunset makes you pull over and stand.',
    highlights: [
      'Lasyone\'s Meat Pie Restaurant — the official Natchitoches specialty since 1967',
      'Mama\'s Blues Room — acoustic and electric blues on Front Street',
      'Château Saint Denis Hotel — French Quarter-inspired courtyard downtown',
      'Natchitoches Jazz/R&B Festival — riverbank festival on the Cane',
      'Mayeaux\'s Steak & Seafood — Catfish Acadiana is the signature dish',
    ],
  },
  {
    id: 'shreveport',
    city: 'Shreveport',
    state: 'Louisiana',
    region: 'Louisiana',
    tagline: 'Neon, Hayrides, and the Ghost of Elvis',
    description:
      'Before there was Nashville, there was Shreveport. The Louisiana Hayride — the radio show that launched Elvis Presley, Hank Williams, and Johnny Cash — broadcast from the Municipal Auditorium. Shreveport was the second city of country music, the place where rockabilly was born, and a blues town in its own right long before the casinos came.',
    highlights: [
      'Shreveport Municipal Auditorium — National Historic Landmark, home of the Louisiana Hayride',
      'Bear\'s on Fairfield — where Shreveport\'s musicians play when they\'re not on tour',
      'Highland Jazz & Blues Festival — free annual party in Columbia Park',
      'Herby-K\'s — time-capsule seafood joint open since 1936',
      'The Remington Suite Hotel — 1920s speakeasy-style lounge',
    ],
  },
  // Arkansas & Missouri
  {
    id: 'el-dorado',
    city: 'El Dorado',
    state: 'Arkansas',
    region: 'Arkansas & Missouri',
    tagline: 'Oil Boom Echoes and Arkansas Soul',
    description:
      'Oil burst from the ground in 1921 and turned this quiet South Arkansas town into a boomtown overnight. The boom faded but the architecture stayed, the pride stayed, and the Murphy Arts District has given El Dorado a second act that honors the first. World-class music halls, serious BBQ, and the soul food is the real thing.',
    highlights: [
      'Murphy Arts District — premier outdoor amphitheater and music halls',
      'First Financial Music Hall — intimate indoor venue for national acts',
      'The Haywood Hotel — boutique lodging in the heart of the MAD',
      'JJ\'s Barbecue — El Dorado institution, unique private-recipe sauces',
      'Smitty\'s Soul Food — traditional Southern soul, the real thing',
    ],
  },
  {
    id: 'little-rock',
    city: 'Little Rock',
    state: 'Arkansas',
    region: 'Arkansas & Missouri',
    tagline: 'The Capital City That Kept Its Wound Open',
    description:
      'Central High School sits in the middle of a residential neighborhood and you can feel 1957 pressing against your chest from across the street. But Little Rock is more than its famous wound. The Dreamland Ballroom on Ninth Street, where Duke Ellington and Louis Armstrong played the Chitlin\' Circuit, is one of the sacred sites of the entire network.',
    highlights: [
      'Dreamland Ballroom — National Historic Landmark, crown jewel of Little Rock\'s musical history',
      'White Water Tavern — the gritty, genre-fluid heart of Little Rock\'s music scene',
      'Capital Hotel — 1876 Gilded Age landmark on Markham Street',
      'Bobbie D\'s — soul food the way the tradition intended, oxtails are the prize',
      'Little Rock Central High School National Historic Site',
    ],
  },
  {
    id: 'fayetteville',
    city: 'Fayetteville',
    state: 'Arkansas',
    region: 'Arkansas & Missouri',
    tagline: 'The Ozark Hills and the Oldest Bar in Arkansas',
    description:
      'Fayetteville is the college town that sneaks up on you. The University of Arkansas gives it energy, the Ozark hills give it soul. Louis Jordan — one of the most important musicians America ever produced — lived in these rhythms. And George\'s Majestic Lounge, open since 1927, is a sacred site on the expanded Big Muddy map.',
    highlights: [
      'George\'s Majestic Lounge — Arkansas\'s oldest standing music venue, open since 1927',
      'Tin Roof — daily live music, all genres, outdoor component',
      'Inn at Carnall Hall — 1905 residence hall on the edge of campus',
      'Penguin Ed\'s BBQ — South Arkansas traditions in the Ozark foothills',
      'Fayetteville Farmers\' Market — vibrant local scene on the square',
    ],
  },
  {
    id: 'bentonville',
    city: 'Bentonville',
    state: 'Arkansas',
    region: 'Arkansas & Missouri',
    tagline: 'Crystal, Trails, and the Ozark Whisper Beneath the Wealth',
    description:
      'The Walton family\'s philanthropy dropped a world-class contemporary art museum into the middle of a town that was selling fishing tackle a generation ago. But underneath the Crystal Bridges gleam, Bentonville is still an Ozark town — the hollows run deep, the old hymns still sound, and the mountain music traditions persist quietly and stubbornly.',
    highlights: [
      'Crystal Bridges Museum of American Art — world-class in the Ozark hills',
      'The Momentary — contemporary performing arts, roots music, and indie acts',
      'Meteor Guitar Gallery — intimate concerts in a historic downtown theater',
      '21c Museum Hotel — boutique hotel as ongoing art exhibition',
      'Tusk & Trotter — Ozark pork traditions, the best BBQ in Bentonville',
    ],
  },
  {
    id: 'branson',
    city: 'Branson',
    state: 'Missouri',
    region: 'Arkansas & Missouri',
    tagline: 'Sequins, Fog, and the Old Religion of the Ozarks',
    description:
      'The fog comes down off the Ozark hills on autumn mornings while Highway 76 blinks to life with marquee lights advertising seventeen country shows simultaneously. The Baldknobbers launched here in 1959, and by 1991 Branson had more theater seats than Broadway. This is the northern terminus of the Big Muddy\'s extended arc — where Ozark mountain traditions connect back down through Arkansas to the Delta.',
    highlights: [
      'Presley\'s Country Jubilee Theater — the first theater on the Strip, opened 1967',
      'Grand Country Music Hall — the old religion of country music, sequined and sincere',
      'Bradford House B&B — Victorian inn in the original pre-Strip Branson',
      'Billy Gail\'s — the breakfast religion of the Ozarks',
      'Table Rock Lake — Ozark scenery, boating, and the hills in every direction',
    ],
  },
];

const NETWORK_REGIONS = ['Louisiana', 'Arkansas & Missouri'];

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
          <p className="route-hero__subtitle">&amp; The Big Muddy Network</p>
          <div className="route-hero__stats">
            <div className="route-stat">
              <span className="route-stat__num">18</span>
              <span className="route-stat__label">Cities</span>
            </div>
            <div className="route-stat">
              <span className="route-stat__num">5</span>
              <span className="route-stat__label">States</span>
            </div>
            <div className="route-stat">
              <span className="route-stat__num">~1,200</span>
              <span className="route-stat__label">Miles of Territory</span>
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
              to find where the music came from. The full corridor drive takes about eight hours 
              without stops. Plan for four days minimum; a week if you want to do it right.
              The expanded network extends the journey into Louisiana, Arkansas, and Missouri —
              thirteen more cities where the same musical traditions run underground, waiting to be found.
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Corridor Stops ── */}
      <section className="route-stops">
        <div className="section-container">
          <div className="section-label" style={{ marginBottom: 'var(--space-10)' }}>The Core Corridor</div>
          {/* Memphis */}
          {[STOPS[0]].map((stop) => (
            <article key={stop.id} id={stop.id} className="route-stop-detail">
              <div className="route-stop-detail__marker">
                <span className="route-stop-detail__num">01</span>
                <div className="route-stop-detail__connector" />
              </div>
              <div className="route-stop-detail__body">
                <div className="route-stop-detail__header">
                  <div>
                    <h2 className="route-stop-detail__city">{stop.city}</h2>
                    <p className="route-stop-detail__state">{stop.state}</p>
                    <p className="route-stop-detail__tagline">{stop.tagline}</p>
                  </div>
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
              </div>
            </article>
          ))}

          {/* ── Fleet ── */}
          <section className="fleet-banner">
            <div className="fleet-banner__inner">
              <Image src="/images/fleet/fleet-ford-transit.webp" alt="Big Muddy Ford Transit at a Delta cotton field" width={1600} height={893} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
            </div>
          </section>

          {/* Clarksdale + Vicksburg */}
          {STOPS.slice(1, 3).map((stop, idx) => (
            <article key={stop.id} id={stop.id} className="route-stop-detail">
              <div className="route-stop-detail__marker">
                <span className="route-stop-detail__num">{String(idx + 2).padStart(2, '0')}</span>
                <div className="route-stop-detail__connector" />
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
              </div>
            </article>
          ))}

          {/* ── Fleet ── */}
          <section className="fleet-banner">
            <div className="fleet-banner__inner">
              <Image src="/images/fleet/fleet-prevost-vicksburg-battlefield.webp" alt="Big Muddy Prevost at Vicksburg National Military Park" width={1600} height={893} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
            </div>
          </section>

          {/* Natchez */}
          {[STOPS[3]].map((stop) => (
            <article key={stop.id} id={stop.id} className="route-stop-detail">
              <div className="route-stop-detail__marker">
                <span className="route-stop-detail__num">04</span>
                <div className="route-stop-detail__connector" />
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
                <div className="route-stop-detail__inn-callout">
                  <p>
                    <strong>Stay at the inn.</strong> 411 N Commerce Street is where the route 
                    pauses. Six suites, each named for a legend.
                  </p>
                  <a href="/inn" className="btn btn--primary">
                    View the Inn
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* ── Fleet ── */}
          <section className="fleet-banner">
            <div className="fleet-banner__inner">
              <Image src="/images/fleet/fleet-tesla-model-3.webp" alt="Big Muddy Tesla by the river with cypress trees" width={1600} height={893} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
            </div>
          </section>

          {/* New Orleans */}
          {[STOPS[4]].map((stop) => (
            <article key={stop.id} id={stop.id} className="route-stop-detail">
              <div className="route-stop-detail__marker">
                <span className="route-stop-detail__num">05</span>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── The Big Muddy Network ── */}
      <section className="route-network">
        <div className="section-container">
          <div className="route-network__header">
            <div className="section-label">Beyond the Corridor</div>
            <h2 className="route-network__title">The Big Muddy Network</h2>
            <p className="route-network__desc">
              Thirteen more cities where the same traditions live — blues, country, soul, Cajun, 
              zydeco, and the mountain music of the Ozarks. Each one a place worth stopping. 
              Together, they define the full reach of the Big Muddy.
            </p>
          </div>

          {NETWORK_REGIONS.map((region) => {
            const regionCities = NETWORK_CITIES.filter((c) => c.region === region);
            return (
              <div key={region} className="route-network__region">
                <h3 className="route-network__region-title">{region}</h3>
                <div className="route-network__grid">
                  {regionCities.map((city) => (
                    <div key={city.id} id={city.id} className="network-city-card">
                      <div className="network-city-card__header">
                        <div>
                          <h4 className="network-city-card__city">{city.city}</h4>
                          <p className="network-city-card__state">{city.state}</p>
                        </div>
                        <p className="network-city-card__tagline">{city.tagline}</p>
                      </div>
                      <p className="network-city-card__desc">{city.description}</p>
                      <ul className="network-city-card__highlights">
                        {city.highlights.map((h) => (
                          <li key={h}>
                            <span className="route-stop-detail__bullet" aria-hidden="true">&#9670;</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
          margin: 0 0 var(--space-4);
        }
        .route-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .route-hero__subtitle {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 400;
          font-style: italic;
          color: var(--text-muted);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-12);
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

        /* ── Network Section ── */
        .route-network {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .route-network__header {
          max-width: 700px;
          margin-bottom: var(--space-16);
        }
        .route-network__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .route-network__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }
        .route-network__region {
          margin-bottom: var(--space-16);
        }
        .route-network__region:last-child {
          margin-bottom: 0;
        }
        .route-network__region-title {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin: 0 0 var(--space-8);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--border);
        }
        .route-network__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .route-network__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .route-network__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .network-city-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-6);
          transition: border-color var(--duration-normal) var(--ease-default);
        }
        .network-city-card:hover {
          border-color: var(--border-strong);
        }
        .network-city-card__header {
          margin-bottom: var(--space-4);
        }
        .network-city-card__city {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 2px;
        }
        .network-city-card__state {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin: 0 0 var(--space-2);
        }
        .network-city-card__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          margin: 0;
        }
        .network-city-card__desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-5);
        }
        .network-city-card__highlights {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .network-city-card__highlights li {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
          line-height: var(--leading-normal);
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

        /* ── Fleet Banner ── */
        .fleet-banner { padding: var(--space-8) var(--space-6); max-width: var(--container-xl); margin: 0 auto; }
        .fleet-banner__inner { border-radius: var(--radius-lg); overflow: hidden; }
        .fleet-banner__inner img { display: block; }
      `}</style>
    </>
  );
}
