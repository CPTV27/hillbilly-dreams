import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shows',
  description:
    'Upcoming shows from Arrie Aslin — Blues Room residency at Big Muddy Inn plus the Snowbird Circuit.',
};

type Show = {
  date: string;
  venue: string;
  city: string;
  note?: string;
  ticketsUrl?: string;
};

const UPCOMING: Show[] = [
  // Stub seed content — replace with Sanity-driven entries when schema lands.
  {
    date: 'Every Thursday · Friday · Saturday',
    venue: 'The Blues Room at Big Muddy Inn',
    city: 'Natchez, MS',
    note: 'Artist-in-residence · 8pm sets',
  },
];

export default function ShowsPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          margin: '0 0 0.5rem',
        }}
      >
        Shows
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          marginBottom: '3rem',
        }}
      >
        Natchez · Memphis · Clarksdale · New Orleans
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {UPCOMING.map((show, i) => (
          <li
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 1fr) 2fr auto',
              gap: '1.5rem',
              padding: '1.5rem 0',
              borderBottom: '1px solid rgba(241, 240, 236, 0.12)',
              alignItems: 'baseline',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--accent-warm)',
              }}
            >
              {show.date}
            </div>
            <div>
              <div style={{ fontSize: '1.1rem' }}>{show.venue}</div>
              <div
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                {show.city}
                {show.note ? ` · ${show.note}` : ''}
              </div>
            </div>
            {show.ticketsUrl && (
              <a
                href={show.ticketsUrl}
                style={{
                  padding: '0.6rem 1.25rem',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                Tickets
              </a>
            )}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '4rem', color: 'var(--text-muted)' }}>
        Snowbird Circuit dates post here as they confirm. For booking, write{' '}
        <a href="mailto:booking@arrieaslin.com" style={{ color: 'var(--accent)' }}>
          booking@arrieaslin.com
        </a>
        .
      </p>
    </main>
  );
}
