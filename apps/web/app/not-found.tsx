import Link from 'next/link';
import { fetchPhotoIndex } from '@/lib/photo-index';
import { prisma } from '@/lib/db';
import { NotFoundDirectorySearch } from '@/components/NotFoundDirectorySearch';

async function getFeatured() {
  try {
    const rows = await prisma.client.findMany({
      where: { status: 'active' },
      take: 40,
      select: { name: true, slug: true, city: true, state: true, businessType: true },
    });
    const shuffled = [...rows].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  } catch {
    return [];
  }
}

export default async function NotFound() {
  const library = await fetchPhotoIndex();
  const bg = library[0]?.urls.grid;
  const featured = await getFeatured();

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        background: 'var(--bg, #0f0f0d)',
        color: 'var(--text, #e8e0d4)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      {bg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bg}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--bg) 70%, transparent) 0%, var(--bg) 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            margin: '0 0 1rem',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            margin: '0 0 1rem',
            lineHeight: 1.25,
          }}
        >
          This page wandered off down to the river…
        </h1>
        <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
          We couldn&apos;t find what you were looking for. Try the directory or head home.
        </p>

        <NotFoundDirectorySearch />

        {featured.length > 0 && (
          <div style={{ marginBottom: '1.75rem', textAlign: 'left' }}>
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                margin: '0 0 0.75rem',
              }}
            >
              Featured listings
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {featured.map((f) => (
                <li key={f.slug} style={{ marginBottom: '0.65rem' }}>
                  <Link
                    href={`/directory/${f.slug}`}
                    style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {f.name}
                  </Link>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.35rem' }}>
                    {f.city}, {f.state}
                    {f.businessType ? ` · ${f.businessType}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Back to home
          </Link>
          <Link
            href="/directory"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              border: '1px solid color-mix(in srgb, var(--accent) 55%, transparent)',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Deep South Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
