// apps/web/app/records/artists/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artists — Big Muddy Records',
  description: 'The Big Muddy Records roster. Musicians from the Mississippi corridor.',
};

const ARTISTS = [
  {
    name: 'Mechanical Bull',
    location: 'Mississippi Corridor',
    genre: 'Blues Rock / Americana',
    bio: 'Highway dirt and amplifier heat. Mechanical Bull plays like the corridor sounds — rough at the edges, honest in the middle, loud enough to carry across a river. The kind of band that sounds better in a room than on a playlist, which is exactly why we wanted them in the Blues Room.',
    upcoming: 'Blues Room Sessions — recording in progress',
    mastersNote: 'Masters owned by the artist.',
  },
  {
    name: 'Amy Allen',
    location: 'Natchez, MS',
    genre: 'Soul / Blues / Storytelling',
    bio: 'Amy writes songs the way people used to write letters — with the expectation that someone on the other end needs to hear it. Her song about the Rhythm Nightclub Fire is the reason this label exists.',
    upcoming: 'Debut EP — Spring 2026',
    mastersNote: 'Masters owned by the artist.',
  },
  {
    name: 'The Blues Room Sessions',
    location: 'Natchez, MS',
    genre: 'Delta Blues / Acoustic',
    bio: 'Not a band — a series. Every Friday night the Blues Room at the Big Muddy Inn opens its doors. Whoever shows up, plays. We press the tape. The room does the rest. Vol. 1 collects the best of what came through in the first season.',
    upcoming: 'Vol. 1 recording in progress',
    mastersNote: 'Each contributing artist retains their master.',
  },
];

export default function RecordsArtistsPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--fg, #f5f0eb)',
          marginBottom: '0.5rem',
        }}
      >
        Artists
      </h1>
      <p
        style={{
          color: 'var(--fg, #f5f0eb)',
          opacity: 0.6,
          fontSize: '1rem',
          marginBottom: '3rem',
        }}
      >
        2–4 artists at a time. Deep attention, not volume.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {ARTISTS.map((artist) => (
          <article
            key={artist.name}
            style={{
              borderBottom: '1px solid var(--muted, #333)',
              paddingBottom: '3rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              {/* Initials avatar */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: 'var(--accent, #c8943e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  flexShrink: 0,
                }}
              >
                {artist.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--fg, #f5f0eb)',
                    margin: 0,
                  }}
                >
                  {artist.name}
                </h2>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent, #c8943e)',
                    margin: '0.25rem 0',
                  }}
                >
                  {artist.genre} &middot; {artist.location}
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--fg, #f5f0eb)',
                    opacity: 0.7,
                    lineHeight: 1.7,
                    marginTop: '1rem',
                  }}
                >
                  {artist.bio}
                </p>
                <div
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--accent, #c8943e)',
                      fontStyle: 'italic',
                      margin: 0,
                    }}
                  >
                    {artist.upcoming}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--fg, #f5f0eb)',
                      opacity: 0.35,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                    }}
                  >
                    {artist.mastersNote}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Open call */}
      <section
        style={{
          marginTop: '4rem',
          padding: '2.5rem',
          border: '1px solid var(--muted, #333)',
        }}
      >
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '0.75rem',
          }}
        >
          This page should be longer.
        </h3>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.7,
            lineHeight: 1.6,
            maxWidth: 540,
            marginBottom: '1rem',
          }}
        >
          We take 2–4 artists per year. If you play music along the Mississippi corridor
          and you want to be on it, send us something. You keep your masters. We handle
          the rest.
        </p>
        <a
          href="mailto:music@bigmuddyrecords.net"
          style={{
            fontSize: '0.9rem',
            color: 'var(--accent, #c8943e)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          music@bigmuddyrecords.net
        </a>
      </section>
    </main>
  );
}
