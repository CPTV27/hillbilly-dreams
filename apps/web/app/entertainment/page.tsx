// apps/web/app/entertainment/page.tsx
// Big Muddy Entertainment — bigmuddyentertainment.com
// The umbrella over Radio, Records, Touring, and Rise Up.
// Tells the story of how all four divisions interconnect,
// plus talent search, community enrichment, and the credits system.

import type { Metadata } from 'next';
import { IllustrationDivider } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Big Muddy Entertainment — Radio, Records, Touring, Rise Up',
  description:
    'Four divisions. One corridor. Big Muddy Entertainment is the music and media arm of Hillbilly Dreams, Inc. — touring artists, recording music, broadcasting radio, and building audiences along the Mississippi corridor.',
};

export default function EntertainmentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="ent-hero" style={{ backgroundImage: 'url(https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/11-gig-poster/big-muddy-presents.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="ent-hero__overlay" />
        <div className="ent-hero__content">
          <p className="ent-hero__eyebrow">
            <span className="ent-hero__ornament">&#9670;</span>
            <span>Natchez, Mississippi</span>
          </p>
          <h1 className="ent-hero__title">
            Four divisions.
            <br />
            <em>One corridor.</em>
          </h1>
          <p className="ent-hero__sub">
            Big Muddy Entertainment is the music and media arm of Hillbilly
            Dreams, Inc. We tour artists, record music, broadcast radio, and
            build audiences along the Mississippi corridor. Every division feeds
            the others.
          </p>
          <div className="ent-hero__ctas">
            <a href="#talent-search" className="btn btn--primary">
              Talent Search
            </a>
            <a href="#divisions" className="btn btn--ghost">
              The Divisions
            </a>
          </div>
        </div>
      </section>

      <IllustrationDivider variant="river" />

      {/* ── The Story ── */}
      <section className="ent-story">
        <div className="section-container section-container--narrow">
          <div className="section-label">The story</div>
          <h2 className="section-title">
            The talent has always been here. We built the road.
          </h2>
          <p className="ent-story__body">
            The Mississippi corridor produced America&rsquo;s music &mdash;
            blues, gospel, jazz, soul, country, rock and roll. But the
            infrastructure left. Labels moved to Nashville and LA. Venues
            closed. Artists had nowhere to record, nowhere to tour, nowhere to
            get heard.
          </p>
          <p className="ent-story__body ent-story__body--strong">
            Big Muddy Entertainment is the infrastructure that came back. A
            touring circuit. A radio station. A record label. A live
            performance program. Four divisions that work as one system &mdash;
            an artist books a show, gets recorded for radio, released on the
            label, and added to the touring route. One booking, four revenue
            events.
          </p>
        </div>
      </section>

      <IllustrationDivider variant="wildflowers" />

      {/* ── The Divisions ── */}
      <section className="ent-divisions" id="divisions">
        <div className="section-container">
          <div className="section-label" style={{ textAlign: 'center' }}>
            The divisions
          </div>
          <h2
            className="section-title"
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
          >
            Every division feeds the others.
          </h2>

          <div className="ent-divisions__grid">
            <a
              href="https://bigmuddytouring.com"
              className="ent-division-card"
            >
              <div
                className="ent-division-card__accent"
                style={{ background: 'var(--accent)' }}
              />
              <h3 className="ent-division-card__name">Big Muddy Touring</h3>
              <p className="ent-division-card__tagline">
                The Mississippi Music Corridor
              </p>
              <p className="ent-division-card__desc">
                An 18-city touring circuit from Memphis to New Orleans. Real
                venues, real audiences, lodging included. Artists show up, play,
                get paid, drive to the next one.
              </p>
              <span className="ent-division-card__link">
                bigmuddytouring.com &rarr;
              </span>
            </a>

            <a href="https://bigmuddyradio.com" className="ent-division-card">
              <div
                className="ent-division-card__accent"
                style={{ background: '#00b4ff' }}
              />
              <h3 className="ent-division-card__name">Big Muddy Radio</h3>
              <p className="ent-division-card__tagline">
                The sound of the corridor
              </p>
              <p className="ent-division-card__desc">
                Curated playlists, live sessions from the Blues Room, and the
                full soundtrack of the Mississippi music corridor. No algorithms.
                Real hosts. Real music.
              </p>
              <span
                className="ent-division-card__link"
                style={{ color: '#00b4ff' }}
              >
                bigmuddyradio.com &rarr;
              </span>
            </a>

            <a
              href="https://bigmuddyrecords.net"
              className="ent-division-card"
            >
              <div
                className="ent-division-card__accent"
                style={{ background: '#e87820' }}
              />
              <h3 className="ent-division-card__name">Big Muddy Records</h3>
              <p className="ent-division-card__tagline">
                You keep your masters
              </p>
              <p className="ent-division-card__desc">
                An artist services label. We distribute, promote, and connect.
                You own 100% of your work. Always. No 360 deals. No rights
                grabs.
              </p>
              <span
                className="ent-division-card__link"
                style={{ color: '#e87820' }}
              >
                bigmuddyrecords.net &rarr;
              </span>
            </a>

            <div className="ent-division-card ent-division-card--riseup">
              <div
                className="ent-division-card__accent"
                style={{ background: '#c0392b' }}
              />
              <h3 className="ent-division-card__name">
                Rise Up Entertainment
              </h3>
              <p className="ent-division-card__tagline">
                Gospel, soul, and the American songbook
              </p>
              <p className="ent-division-card__desc">
                The live performance program. Rise Up brings gospel, soul, and
                roots music to stages across the corridor &mdash; anchored at
                the Blues Room in Natchez and touring the full circuit.
              </p>
              <span
                className="ent-division-card__link"
                style={{ color: '#c0392b' }}
              >
                Coming soon &rarr;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Talent Search ── */}
      <section className="ent-talent" id="talent-search">
        <div className="section-container section-container--narrow">
          <div className="section-label">Talent Search</div>
          <h2 className="section-title">
            We find artists and give them a stage, a studio, and an audience.
          </h2>
          <p className="ent-talent__body">
            The Big Muddy talent search is an open call to artists and musicians
            across the Mississippi corridor. We&rsquo;re not looking for
            polished acts with agents &mdash; we&rsquo;re looking for the real
            thing. Gospel choirs, blues guitarists, soul singers, folk
            storytellers, anyone making music that matters.
          </p>
          <p className="ent-talent__body">
            Selected artists get free access to the full Big Muddy machine:
          </p>

          <div className="ent-talent__benefits">
            <div className="ent-talent__benefit">
              <div className="ent-talent__benefit-icon">&#x1F3A4;</div>
              <h3>Performance</h3>
              <p>
                Weekly shows at the Blues Room. Touring slots on the 18-city
                circuit. Rise Up roster placement.
              </p>
            </div>
            <div className="ent-talent__benefit">
              <div className="ent-talent__benefit-icon">&#x1F3B5;</div>
              <h3>Recording</h3>
              <p>
                Live session recording for Big Muddy Radio. Masters released
                through Big Muddy Records. You own everything.
              </p>
            </div>
            <div className="ent-talent__benefit">
              <div className="ent-talent__benefit-icon">&#x1F4F1;</div>
              <h3>Business Tools</h3>
              <p>
                Free Measurably Better access &mdash; marketing, social media,
                booking management, and financial tools. Built for artists who
                are also small businesses.
              </p>
            </div>
            <div className="ent-talent__benefit">
              <div className="ent-talent__benefit-icon">&#x1F91D;</div>
              <h3>Mentorship</h3>
              <p>
                Connected to the full network. Magazine features. Radio
                interviews. Gallery shows for your artwork. The whole machine
                works for you.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-10)' }}>
            <a href="mailto:music@bigmuddyrecords.net" className="btn btn--primary">
              Apply to the Talent Search
            </a>
          </div>
        </div>
      </section>

      {/* ── Community Enrichment ── */}
      <section className="ent-community" id="community">
        <div className="section-container">
          <div className="section-label" style={{ textAlign: 'center' }}>
            Community Enrichment
          </div>
          <h2
            className="section-title"
            style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}
          >
            It&rsquo;s not charity. It&rsquo;s onboarding.
          </h2>
          <p
            className="section-desc"
            style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto var(--space-12)' }}
          >
            We give qualifying artists, businesses, and community members free
            access to Measurably Better &mdash; the AI business platform that
            powers everything we do. Sign up. Learn the tools. Earn credits. Build
            something real.
          </p>

          <div className="ent-community__tiers">
            <div className="ent-community__tier">
              <div className="ent-community__tier-header">
                <p className="ent-community__tier-label">Artists &amp; Musicians</p>
                <p className="ent-community__tier-price">
                  <span className="ent-community__tier-amount">$20</span>
                  <span className="ent-community__tier-period">/mo value &mdash; free</span>
                </p>
              </div>
              <p className="ent-community__tier-desc">
                Selected through the talent search. Get the full MBT toolkit
                &mdash; social posting, booking management, fan engagement, and
                financial tracking. Built for artists who are also running a
                business.
              </p>
              <ul className="ent-community__tier-list">
                <li>Photo-to-post automation</li>
                <li>Booking &amp; calendar management</li>
                <li>Revenue tracking</li>
                <li>Rise Up roster access</li>
              </ul>
            </div>

            <div className="ent-community__tier ent-community__tier--featured">
              <div className="ent-community__tier-header">
                <p className="ent-community__tier-label">Main Street Businesses</p>
                <p className="ent-community__tier-price">
                  <span className="ent-community__tier-amount">$50</span>
                  <span className="ent-community__tier-period">/mo value &mdash; free</span>
                </p>
              </div>
              <p className="ent-community__tier-desc">
                Qualifying small businesses in the corridor get free MBT access.
                Restaurants, shops, venues, B&amp;Bs &mdash; the businesses that
                make the corridor work. Learn the tools through interactive
                modules, graduate to paying customers or stay subsidized.
              </p>
              <ul className="ent-community__tier-list">
                <li>Everything in the artist tier</li>
                <li>Financial tools</li>
                <li>Review monitoring &amp; response</li>
                <li>Deep South Directory listing</li>
                <li>Interactive learning modules</li>
              </ul>
            </div>

            <div className="ent-community__tier">
              <div className="ent-community__tier-header">
                <p className="ent-community__tier-label">Organizations &amp; Nonprofits</p>
                <p className="ent-community__tier-price">
                  <span className="ent-community__tier-amount">$99</span>
                  <span className="ent-community__tier-period">/mo value &mdash; free</span>
                </p>
              </div>
              <p className="ent-community__tier-desc">
                CVBs, arts councils, chambers of commerce, churches, and
                community organizations. Full platform access with team seats,
                marketing automation, and grant reporting tools.
              </p>
              <ul className="ent-community__tier-list">
                <li>Everything in the business tier</li>
                <li>3 team seats</li>
                <li>Marketing automation</li>
                <li>Weekly AI strategy memo</li>
                <li>Grant reporting dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credits System ── */}
      <section className="ent-credits">
        <div className="section-container section-container--narrow">
          <div className="section-label">The Learning Program</div>
          <h2 className="section-title">Sign up. Learn. Earn. Use.</h2>
          <p className="ent-credits__body">
            The interactive learning program is the bridge between free access
            and full platform mastery. Complete modules, earn credits, unlock
            features. By the time you finish, you either become a paying
            customer or you&rsquo;re creating content and performing in the
            network. Either way, you&rsquo;re building.
          </p>

          <div className="ent-credits__steps">
            <div className="ent-credits__step">
              <div className="ent-credits__step-num">01</div>
              <h3>Sign Up</h3>
              <p>
                Apply through the talent search, business track, or community
                track. If you qualify, you get free access immediately.
              </p>
            </div>
            <div className="ent-credits__step">
              <div className="ent-credits__step-num">02</div>
              <h3>Learn</h3>
              <p>
                Interactive modules teach you the platform. Social media
                posting, financial tracking, marketing automation, review
                management. Real skills, not theory.
              </p>
            </div>
            <div className="ent-credits__step">
              <div className="ent-credits__step-num">03</div>
              <h3>Earn Credits</h3>
              <p>
                Each completed module earns platform credits. Credits unlock
                advanced features &mdash; AI marketing, data analytics,
                automation workflows.
              </p>
            </div>
            <div className="ent-credits__step">
              <div className="ent-credits__step-num">04</div>
              <h3>Build</h3>
              <p>
                Use the tools to grow your business, your art, or your
                community. The platform gets smarter the more you use it. Every
                insight gets sharper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Flywheel ── */}
      <section className="ent-flywheel">
        <div className="section-container">
          <div className="section-label" style={{ textAlign: 'center' }}>
            The flywheel
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Everything feeds everything.
          </h2>
          <p
            className="section-desc"
            style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto var(--space-10)' }}
          >
            The entertainment arm and the product arm are the same engine.
            Artists create content. Content builds audience. Audience drives
            subscriptions. Subscriptions fund more community programs.
          </p>

          <div className="ent-flywheel__ring">
            <div className="ent-flywheel__step">
              <div className="ent-flywheel__step-num">01</div>
              <p>Artists perform at the Blues Room and on the circuit</p>
              <span className="ent-flywheel__step-brand" style={{ color: '#c0392b' }}>
                Rise Up + Touring
              </span>
            </div>
            <div className="ent-flywheel__step">
              <div className="ent-flywheel__step-num">02</div>
              <p>Shows are recorded and broadcast</p>
              <span className="ent-flywheel__step-brand" style={{ color: '#00b4ff' }}>
                Radio + Records
              </span>
            </div>
            <div className="ent-flywheel__step">
              <div className="ent-flywheel__step-num">03</div>
              <p>Content builds audience across all platforms</p>
              <span className="ent-flywheel__step-brand" style={{ color: 'var(--accent)' }}>
                Magazine + Gallery
              </span>
            </div>
            <div className="ent-flywheel__step">
              <div className="ent-flywheel__step-num">04</div>
              <p>
                Audience drives Measurably Better subscriptions
              </p>
              <span className="ent-flywheel__step-brand" style={{ color: '#7B1B46' }}>
                Measurably Better
              </span>
            </div>
            <div className="ent-flywheel__step">
              <div className="ent-flywheel__step-num">05</div>
              <p>
                Subscription revenue funds community enrichment programs
              </p>
              <span className="ent-flywheel__step-brand" style={{ color: '#4a7c59' }}>
                Community
              </span>
            </div>
            <div className="ent-flywheel__step">
              <div className="ent-flywheel__step-num">06</div>
              <p>Community programs produce more artists and businesses</p>
              <span className="ent-flywheel__step-brand" style={{ color: '#c0392b' }}>
                Back to Rise Up
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <section className="ent-quote">
        <div className="section-container section-container--narrow">
          <blockquote className="ent-quote__blockquote">
            &ldquo;We didn&rsquo;t need to discover anyone. The talent has
            always been here. We just needed to build the road so they could
            finally tour it properly.&rdquo;
          </blockquote>
          <cite className="ent-quote__cite">
            Chase Pierson, Hillbilly Dreams Inc.
          </cite>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta__box">
            <h2 className="ent-cta__title">Play the corridor.</h2>
            <p className="ent-cta__desc">
              Whether you&rsquo;re an artist looking for a stage, a business
              looking for better tools, or a community member looking to learn
              &mdash; there&rsquo;s a place for you in Big Muddy.
            </p>
            <div className="ent-cta__buttons">
              <a href="#talent-search" className="btn btn--primary">
                Apply to the Talent Search
              </a>
              <a href="#community" className="btn btn--ghost">
                Community Programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
