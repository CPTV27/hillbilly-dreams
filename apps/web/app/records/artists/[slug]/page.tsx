// apps/web/app/records/artists/[slug]/page.tsx
// Big Muddy Records — Artist detail page (DB-backed)

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@bigmuddy/database';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await prisma.artist.findUnique({ where: { slug } });

  if (!artist) return { title: 'Artist Not Found — Big Muddy Records' };

  return {
    title: `${artist.name} — Big Muddy Records`,
    description: artist.bio?.slice(0, 160) ?? `${artist.name} on Big Muddy Records.`,
  };
}

export default async function ArtistDetailPage({ params }: Props) {
  const { slug } = await params;

  const artist = await prisma.artist.findUnique({
    where: { slug },
  });

  if (!artist) notFound();

  const socialLinks = (artist.socialLinks as Record<string, string> | null) ?? {};

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem' }}>
      {/* Back link */}
      <a
        href="/records/artists"
        style={{
          fontSize: '0.8rem',
          color: 'var(--accent, #c8943e)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        &larr; All Artists
      </a>

      {/* Header */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '2rem' }}>
        {/* Photo or initials */}
        {artist.photoUrl ? (
          <img
            src={artist.photoUrl}
            alt={artist.name}
            style={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 120,
              height: 120,
              background: 'var(--accent, #c8943e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
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
        )}

        <div>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {artist.name}
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--accent, #c8943e)',
              margin: '0.5rem 0',
            }}
          >
            {artist.genre} &middot; {artist.city}, {artist.state}
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--fg, #f5f0eb)',
              opacity: 0.35,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              margin: '0.25rem 0 0',
            }}
          >
            Masters owned by the artist.
          </p>
        </div>
      </div>

      {/* Bio */}
      {artist.bio && (
        <section style={{ marginTop: '3rem' }}>
          <div
            style={{
              fontSize: '1.05rem',
              color: 'var(--fg, #f5f0eb)',
              opacity: 0.8,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {artist.bio}
          </div>
        </section>
      )}

      {/* Links */}
      {Object.keys(socialLinks).length > 0 && (
        <section
          style={{
            marginTop: '3rem',
            borderTop: '1px solid var(--muted, #333)',
            paddingTop: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent, #c8943e)',
              marginBottom: '1rem',
            }}
          >
            Links
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.7,
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  borderBottom: '1px solid var(--muted, #333)',
                  paddingBottom: '0.15rem',
                }}
              >
                {platform}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Notes / Status */}
      {artist.notes && (
        <section
          style={{
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            background: 'rgba(200, 148, 62, 0.06)',
            border: '1px solid rgba(200, 148, 62, 0.2)',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--fg, #f5f0eb)',
              opacity: 0.8,
              lineHeight: 1.7,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {artist.notes}
          </p>
        </section>
      )}

      {/* Ecosystem callout */}
      <section
        style={{
          marginTop: '4rem',
          borderTop: '1px solid var(--muted, #333)',
          paddingTop: '3rem',
        }}
      >
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.5,
            lineHeight: 1.6,
            maxWidth: 500,
          }}
        >
          Big Muddy Records artists get the full ecosystem — Radio, Magazine, the Inn, the
          touring route. One retainer, no hidden fees. Artists own their masters. Always.
        </p>
      </section>
    </main>
  );
}
