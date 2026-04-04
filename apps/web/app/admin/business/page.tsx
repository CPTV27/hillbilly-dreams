import Link from 'next/link';

export const dynamic = 'force-dynamic';

/** Bearsville-corridor slugs → `/admin/business/[slug]` discovery + shop views. */
const BRAND_SLUGS = [
  { slug: 'tuthill-design', label: 'Tuthill Design' },
  { slug: 'studio-c-video', label: 'Studio C Video' },
  { slug: 'bearsville-creative', label: 'Bearsville Creative' },
  { slug: 'utopia', label: 'Utopia' },
] as const;

export default function AdminBusinessIndexPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--surface-0, #0f0f0f)',
        color: 'var(--text, #e8e4de)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        padding: '1.5rem',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent, #c8943e)', margin: '0 0 0.5rem' }}>
        Vendor portal · Discovery + Shop
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted, #8a8074)', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
        Data-driven views after <code style={{ color: 'var(--accent, #c8943e)' }}>BusinessProfile</code> and{' '}
        <code style={{ color: 'var(--accent, #c8943e)' }}>MarketplaceStore</code> rows exist for each namespace.
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {BRAND_SLUGS.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/admin/business/${b.slug}`}
              style={{
                display: 'block',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border, #2a2725)',
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {b.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
