// apps/web/app/records/artists/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artists — Big Muddy Records',
  description: 'The Big Muddy Records roster. Musicians from the Deep South.',
};

const ARTISTS = [
  {
    name: 'Amy Allen',
    location: 'Natchez, MS',
    genre: 'Soul / Blues / Storytelling',
    bio: 'Amy writes songs the way people used to write letters — with the expectation that someone on the other end needs to hear it. Her song about the Rhythm Nightclub Fire is the reason this label exists.',
    upcoming: 'Debut EP — Spring 2026',
    mastersNote: 'Masters owned by the artist.',
    url: null,
  },
  {
    name: 'Mechanical Bull',
    location: 'Woodstock, NY',
    genre: 'Alt-Country / Southern Rock',
    bio: 'Country, southern rock, and the kind of 70s California guitar tone that makes you want to drive with the windows down. Chase Pierson on guitar and vocals, Avalon Peacock on vocals, Adam Widoff on everything else, Dave Malachowski and Chris Zaloom on guitars, George Quinn on bass, J-Bird Bowman on drums, Josh Pierson on banjo and sax. John Medeski sat in on organ. Two albums including A Million Yesterdays, recorded at home in the Hudson Valley.',
    upcoming: 'Blues Room Sessions — recording in progress',
    mastersNote: 'Masters owned by the artist.',
    url: 'https://mechanicalbullband.blogspot.com',
  },
  {
    name: 'Kate Squire',
    location: 'Mississippi Region',
    genre: 'Folk / Americana / Singer-Songwriter',
    bio: 'Kate Squire writes quiet songs that hit hard — the kind that sit with you for days after you hear them. Spare arrangements, honest vocals, stories pulled from the region and delivered without decoration. The less she does, the more you feel it.',
    upcoming: 'First recordings — 2026',
    mastersNote: 'Masters owned by the artist.',
    url: 'https://kateskwiremusic.com',
  },
  {
    name: 'Arrie Aslin',
    location: 'Natchez, MS',
    genre: 'Americana / Parlor Folk / Blues',
    bio: 'Artist-in-Residence at the Big Muddy Inn. Arrie hosts the Friday night Blues Room sessions, curates the American Parlor Songbook radio show, and records the kind of music that belongs in a room with good light and old wood. Part musician, part curator, part keeper of the flame.',
    upcoming: 'Coming Soon — American Parlor Songbook sessions',
    mastersNote: 'Masters owned by the artist.',
    url: null,
  },
];

export default function RecordsArtistsPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem' }}>
      {/* Hero image */}
      <div
        style={{
          width: '100%',
          height: 280,
          backgroundImage: 'url(/images/records/anthologist-vinyl-bokeh.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '2.5rem',
          opacity: 0.7,
        }}
        role="img"
        aria-label="Guitarist performing at a venue along the Deep South"
      />
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
              {/* Avatar — photo for Arrie Aslin, initials for others */}
              <a
                href={`/records/artists/${artist.name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ textDecoration: 'none', flexShrink: 0 }}
              >
                <div
                  style={
                    artist.name === 'Arrie Aslin'
                      ? {
                          width: 80,
                          height: 80,
                          backgroundImage: 'url(/images/arrie-aslin/ta-c2-384-of-934.webp)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '50%',
                        }
                      : {
                          width: 80,
                          height: 80,
                          background: 'var(--accent, #c8943e)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#0a0a0a',
                        }
                  }
                >
                  {artist.name !== 'Arrie Aslin' &&
                    artist.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                </div>
              </a>
              <div style={{ flex: 1 }}>
                <a
                  href={`/records/artists/${artist.name.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
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
                </a>
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
                  {artist.url && (
                    <a
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--accent, #c8943e)',
                        textDecoration: 'none',
                        margin: 0,
                      }}
                    >
                      {artist.url.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Photo break — Studio C */}
      <div
        style={{
          width: '100%',
          height: 240,
          backgroundImage: 'url(/images/studio-c/utopiademo-day-15.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
          margin: '3rem 0',
        }}
        role="img"
        aria-label="Studio C recording setup"
      />

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
          We take 2–4 artists per year. If you play music along the Deep South
          and you want to be on it, send us something. You keep your masters. We handle
          the rest.
        </p>
        <a
          href="mailto:music@bigmuddyrecordlabel.com"
          style={{
            fontSize: '0.9rem',
            color: 'var(--accent, #c8943e)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          music@bigmuddyrecordlabel.com
        </a>
      </section>
    </main>
  );
}
