// apps/web/app/radio/podcast/page.tsx
// Podcast page — episode listings with audio players

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup, BLUR_DATA_URL } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Podcast',
  description:
    'Radio Big Muddy — conversations from the round table at The Big Muddy Inn in Natchez, Mississippi. Music, food, culture, and the stories behind the corridor.',
};

const EPISODES = [
  {
    num: 1,
    title: 'How We Got Here',
    date: 'March 17, 2026',
    duration: '26:27',
    description:
      'The origin story. Amy and Tracy Allen discover Natchez through a biscuit class with Regina Charboneau, take a ten-day cruise on the American Countess, fall in love with a house at 411 North Commerce, and open The Big Muddy Inn. Chase Pierson talks about rediscovering the South after 25 years in New York. Gas station fried chicken at midnight. The magic of the Blues Room. And why Regina always knew which house it would be.',
    highlights: [
      'Regina Charboneau answers the phone from a boat with Andrew Zimmern',
      'Six people in one Navigator — backpacks vs. multiple situations',
      'The party at The Burn that was definitely not a wedding',
      'Chase discovers Dodge\'s fried chicken at midnight',
      'The Blues Room: "All of a sudden it\'s a tiny little community and it\'s magic"',
    ],
    guests: ['Amy Allen', 'Tracy Allen', 'Chase Pierson'],
    audioUrl: '/audio/ep1-how-we-got-here.mp3',
  },
  {
    num: 2,
    title: 'Episode 2',
    date: 'March 18, 2026',
    duration: '19:00',
    description:
      'The conversation continues from the round table at The Big Muddy Inn. More stories from the corridor, the music scene, and what\'s next for Radio Big Muddy.',
    highlights: [],
    guests: ['Amy Allen', 'Tracy Allen', 'Chase Pierson'],
    audioUrl: '/audio/ep2.mp3',
  },
];

export default async function PodcastPage() {
  return (
    <>
      {/* ── Hero Header ── */}
      <section className="podcast-hero">
        <Image
          src="/images/corridor/oceansprings-natchez-601-of-1183.webp"
          alt="The parlor at The Big Muddy Inn"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="podcast-hero__overlay" />
        <div className="podcast-hero__content">
          <div className="section-label">Big Muddy Radio</div>
          <h1 className="podcast-hero__title">
            Radio<br />
            <em>Big Muddy</em>
          </h1>
          <p className="podcast-hero__sub">
            Conversations from the round table at The Big Muddy Inn.
            Music, food, culture, and the stories behind the Mississippi corridor.
            Recorded live in Natchez, Mississippi.
          </p>
        </div>
      </section>

      {/* ── Episodes ── */}
      <section className="podcast-episodes">
        <div className="section-container">
          <div className="section-label">Episodes</div>
          <h2 className="podcast-episodes__title">Season One</h2>
          <p className="podcast-episodes__sub">
            Recorded at the round table in the parlor of The Big Muddy Inn,
            411 North Commerce Street, Natchez, Mississippi.
          </p>

          <div className="podcast-episodes__list">
            {EPISODES.map((ep) => (
              <article key={ep.num} className="episode-card">
                <div className="episode-card__header">
                  <div className="episode-card__num">
                    {String(ep.num).padStart(2, '0')}
                  </div>
                  <div className="episode-card__meta">
                    <h3 className="episode-card__title">{ep.title}</h3>
                    <div className="episode-card__info">
                      <span>{ep.date}</span>
                      <span className="episode-card__dot">·</span>
                      <span>{ep.duration}</span>
                    </div>
                  </div>
                </div>

                <p className="episode-card__desc">{ep.description}</p>

                {/* Audio Player */}
                <div className="episode-card__player">
                  <audio controls preload="none" className="episode-audio">
                    <source src={ep.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Guests */}
                <div className="episode-card__guests">
                  <span className="episode-card__guests-label">Featuring:</span>
                  {ep.guests.map((g, i) => (
                    <span key={g} className="episode-card__guest">
                      {g}{i < ep.guests.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                {ep.highlights.length > 0 && (
                  <details className="episode-card__highlights">
                    <summary className="episode-card__highlights-toggle">
                      Episode Highlights
                    </summary>
                    <ul className="episode-card__highlights-list">
                      {ep.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── About the Show ── */}
      <section className="podcast-about">
        <div className="section-container">
          <div className="podcast-about__inner">
            <div className="podcast-about__text">
              <div className="section-label">About the Show</div>
              <h2 className="podcast-about__title">The Round Table</h2>
              <p className="podcast-about__desc">
                Radio Big Muddy started because we thought it might help with marketing.
                That&apos;s the honest truth. But it turned into something else — a place to
                sit down with interesting people from the Deep South and just talk. About music.
                About food. About why this little town on the Mississippi River keeps pulling
                people in and never letting them leave.
              </p>
              <p className="podcast-about__desc">
                We record at the round table in the parlor of The Big Muddy Inn. The same room
                where Amy plays piano for guests, where the Blues Room shows happen, where
                everyone ends up at the end of the night. If you&apos;ve been here, you know the room.
                If you haven&apos;t — come visit. You&apos;ll end up at the table eventually.
              </p>
            </div>
            <div className="podcast-about__details">
              <div className="podcast-detail">
                <h3>Subscribe</h3>
                <p>Apple Podcasts, Spotify, YouTube, and everywhere you listen. New episodes weekly.</p>
              </div>
              <div className="podcast-detail">
                <h3>Be a Guest</h3>
                <p>
                  Got a story from the corridor? A restaurant, a venue, a piece of history?
                  We want to hear it. Email{' '}
                  <a href="mailto:radio@thebigmuddyinn.com" className="podcast-link">
                    radio@thebigmuddyinn.com
                  </a>
                </p>
              </div>
              <div className="podcast-detail">
                <h3>Location</h3>
                <p>The Big Muddy Inn<br />411 N Commerce St<br />Natchez, MS 39120</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .podcast-hero {
          position: relative;
          min-height: 55vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .podcast-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.3) 0%, rgba(15, 15, 13, 0.88) 100%);
          z-index: 1;
        }
        .podcast-hero__content {
          position: relative;
          z-index: 2;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6) var(--space-12);
          width: 100%;
        }
        .podcast-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .podcast-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .podcast-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 560px;
          margin: 0;
        }

        /* ── Episodes ── */
        .podcast-episodes {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .podcast-episodes__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .podcast-episodes__sub {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-12);
          max-width: 560px;
        }
        .podcast-episodes__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }

        /* ── Episode Card ── */
        .episode-card {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          transition: border-color var(--duration-normal) var(--ease-default);
        }
        .episode-card:hover {
          border-color: var(--border-strong);
        }
        .episode-card__header {
          display: flex;
          gap: var(--space-5);
          align-items: flex-start;
          margin-bottom: var(--space-5);
        }
        .episode-card__num {
          font-family: var(--font-mono);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--accent);
          opacity: 0.25;
          line-height: 1;
          flex-shrink: 0;
        }
        .episode-card__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-2);
        }
        .episode-card__info {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          display: flex;
          gap: var(--space-2);
          align-items: center;
        }
        .episode-card__dot {
          color: var(--border-strong);
        }
        .episode-card__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-6);
          max-width: 720px;
        }

        /* ── Audio Player ── */
        .episode-card__player {
          margin-bottom: var(--space-5);
        }
        .episode-audio {
          width: 100%;
          max-width: 600px;
          height: 44px;
          border-radius: var(--radius-md);
          outline: none;
        }
        .episode-audio::-webkit-media-controls-panel {
          background: var(--bg);
        }

        /* ── Guests ── */
        .episode-card__guests {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-bottom: var(--space-4);
        }
        .episode-card__guests-label {
          font-weight: 600;
          color: var(--accent);
          margin-right: var(--space-2);
          font-size: var(--text-xs);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }

        /* ── Highlights ── */
        .episode-card__highlights {
          border-top: 1px solid var(--border);
          padding-top: var(--space-4);
          margin-top: var(--space-4);
        }
        .episode-card__highlights-toggle {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          cursor: pointer;
          letter-spacing: var(--tracking-wide);
          list-style: none;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .episode-card__highlights-toggle::-webkit-details-marker {
          display: none;
        }
        .episode-card__highlights-toggle::before {
          content: '▸';
          font-size: var(--text-xs);
          transition: transform var(--duration-fast) var(--ease-default);
        }
        details[open] .episode-card__highlights-toggle::before {
          transform: rotate(90deg);
        }
        .episode-card__highlights-list {
          list-style: none;
          padding: 0;
          margin: var(--space-4) 0 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .episode-card__highlights-list li {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          padding-left: var(--space-5);
          position: relative;
        }
        .episode-card__highlights-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }

        /* ── About ── */
        .podcast-about {
          background: var(--bg);
        }
        .podcast-about__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        @media (min-width: 768px) {
          .podcast-about__inner {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
        .podcast-about__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .podcast-about__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-5);
        }
        .podcast-about__details {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }
        .podcast-detail h3 {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-2);
        }
        .podcast-detail p {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }
        .podcast-link {
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .podcast-link:hover {
          color: var(--text);
        }

        /* ── Shared ── */
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-16) var(--space-6);
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
