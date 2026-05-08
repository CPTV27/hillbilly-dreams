// apps/web/app/dispatch/page.tsx
// Dispatch No. 01 landing page — single-purpose conversion page for Big Muddy Magazine.
// Built 2026-04-24 for the Apr 27 public launch. Server component; form is client.

import type { Metadata } from 'next';
import { DispatchSignupForm } from './DispatchSignupForm';

export const metadata: Metadata = {
  title: 'Big Muddy Dispatch No. 01',
  description:
    'Dispatch No. 01 — the first field note from Big Muddy Magazine. Stories from the rooms, roads, bars, stages, and river towns carrying American music forward.',
  openGraph: {
    title: 'Big Muddy Dispatch No. 01',
    description:
      'Dispatch No. 01 — the first field note from Big Muddy Magazine.',
    type: 'website',
  },
};

const STORIES = [
  {
    title: 'The Room',
    copy: 'A look inside the places where the show is more than the show.',
  },
  {
    title: 'The Road',
    copy: 'Field notes from the Mississippi corridor between Natchez, Memphis, and New Orleans.',
  },
  {
    title: 'The Record',
    copy: 'Artists, songs, and sessions worth carrying forward.',
  },
] as const;

export default function DispatchPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '5rem 1.5rem 3rem',
        }}
      >
        <p
          style={{
            margin: '0 0 1rem',
            fontSize: 'var(--text-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Big Muddy Dispatch No. 01
        </p>

        <h1
          style={{
            margin: '0',
            maxWidth: '48rem',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-display)',
            color: 'var(--text)',
          }}
        >
          The Mississippi still makes the music.
        </h1>

        <p
          style={{
            margin: '1.5rem 0 0',
            maxWidth: '36rem',
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
          }}
        >
          Dispatch No. 01 is the first field note from Big Muddy Magazine —
          stories from the rooms, roads, bars, stages, and river towns carrying
          American music forward.
        </p>

        <DispatchSignupForm />
      </section>

      <section
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '0 1.5rem 5rem',
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {STORIES.map((story) => (
          <article
            key={story.title}
            style={{
              borderRadius: '1.25rem',
              border: '1px solid var(--border)',
              padding: '1.5rem',
              background: 'var(--surface)',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 'var(--text-xl, 1.5rem)',
                fontFamily: 'var(--font-display)',
                color: 'var(--text)',
              }}
            >
              {story.title}
            </h2>
            <p
              style={{
                margin: '1rem 0 0',
                color: 'var(--text-muted)',
                lineHeight: 1.55,
              }}
            >
              {story.copy}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
