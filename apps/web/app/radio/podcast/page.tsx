// apps/web/app/(radio)/podcast/page.tsx
// Podcast page — coming soon with newsletter signup

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup, BLUR_DATA_URL } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Podcast',
  description: 'The Big Muddy Radio podcast — conversations with musicians, historians, and storytellers along the Mississippi music corridor.',
};

export default async function PodcastPage() {
  return (
    <>
      {/* ── Hero Header ── */}
      <section className="podcast-hero">
        <Image
          src="https://storage.googleapis.com/bmt-media-bigmuddy/real/musician-performing.webp"
          alt="Musician performing"
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
            The<br />
            <em>Podcast</em>
          </h1>
          <p className="podcast-hero__sub">
            Conversations with musicians, historians, and storytellers along
            the Mississippi music corridor. Coming soon.
          </p>
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="podcast-coming">
        <div className="section-container">
          <div className="podcast-coming__inner">
            <div className="podcast-coming__block">
              <h2 className="podcast-coming__title">Coming Soon</h2>
              <p className="podcast-coming__desc">
                We're recording the first season now — long-form conversations with
                the people who make the corridor what it is. Blues musicians in Clarksdale,
                innkeepers in Natchez, chefs in New Orleans, and the historians who know
                where the stories are buried.
              </p>
              <p className="podcast-coming__desc">
                Subscribe to the newsletter and we'll let you know when the first
                episode drops.
              </p>
            </div>
            <div className="podcast-coming__details">
              <div className="podcast-detail">
                <h3>Format</h3>
                <p>Long-form interviews, 45-60 minutes. Recorded on location along the corridor.</p>
              </div>
              <div className="podcast-detail">
                <h3>Season One</h3>
                <p>Eight episodes. Memphis to New Orleans. The whole route in stories.</p>
              </div>
              <div className="podcast-detail">
                <h3>Subscribe</h3>
                <p>Available on Apple Podcasts, Spotify, and everywhere else when it launches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo Break: Guitarist ── */}
      <section className="photo-break">
        <Image
          src="/images/corridor/guitarist-chandelier-venue.webp"
          alt="Guitarist performing in an intimate venue under a chandelier"
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .podcast-hero {
          position: relative;
          min-height: 50vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .podcast-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.4) 0%, rgba(15, 15, 13, 0.85) 100%);
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
          max-width: 520px;
          margin: 0;
        }

        /* ── Coming Soon ── */
        .podcast-coming__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        @media (min-width: 768px) {
          .podcast-coming__inner {
            grid-template-columns: 1fr 1fr;
          }
        }
        .podcast-coming__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .podcast-coming__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-4);
        }
        .podcast-coming__details {
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

        /* ── Photo Break ── */
        .photo-break {
          width: 100%;
          max-height: 400px;
          overflow: hidden;
          line-height: 0;
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
