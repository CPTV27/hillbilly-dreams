import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Releases and recordings from Arrie Aslin on Big Muddy Records. Streaming on Spotify, Apple Music, SoundCloud, and Bandcamp.',
};

const PLATFORMS = [
  { label: 'Spotify', href: 'https://open.spotify.com/' },
  { label: 'Apple Music', href: 'https://music.apple.com/' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/' },
  { label: 'Bandcamp', href: 'https://bandcamp.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
];

export default function MusicPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          margin: '0 0 0.5rem',
        }}
      >
        Music
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
        Big Muddy Records · Natchez
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
          The first studio recordings are tracking now. <em>Live at the Blues Room</em> — a
          residency document — is scheduled to release on Big Muddy Records. Streaming and pre-save
          links go up here as soon as they exist. Until then, the work happens in the room.
        </p>
      </section>

      <section>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            marginBottom: '1.5rem',
          }}
        >
          Where to listen
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '0.75rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {PLATFORMS.map((p) => (
            <li key={p.label}>
              <a
                href={p.href}
                style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  border: '1px solid rgba(241, 240, 236, 0.18)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                }}
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
