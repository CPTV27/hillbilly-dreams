import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@bigmuddy/database';

export const dynamic = 'force-dynamic';

type SlugConfig = { namespace: string; nameContains?: string };

/** Map URL slug → namespace + optional name filter (until `BusinessProfile.slug` exists). */
const SLUG_MAP: Record<string, SlugConfig> = {
  'tuthill-design': { namespace: 'BEARSVILLE_CREATIVE', nameContains: 'Tuthill' },
  'studio-c-video': { namespace: 'BEARSVILLE_CREATIVE', nameContains: 'Studio C' },
  'bearsville-creative': { namespace: 'BEARSVILLE_CREATIVE', nameContains: 'Bearsville' },
  utopia: { namespace: 'BEARSVILLE_CREATIVE', nameContains: 'Utopia' },
};

export default async function AdminBusinessDiscoveryShopPage({ params }: { params: { slug: string } }) {
  const cfg = SLUG_MAP[params.slug];
  if (!cfg) notFound();

  const profiles = await prisma.businessProfile.findMany({
    where: {
      namespace: cfg.namespace,
      ...(cfg.nameContains
        ? { name: { contains: cfg.nameContains, mode: 'insensitive' as const } }
        : {}),
    },
    include: {
      store: {
        include: {
          vendor: true,
          supplies: { take: 24, orderBy: { updatedAt: 'desc' } },
          affiliate: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 8,
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--surface-0, #0f0f0f)',
        color: 'var(--text, #e8e4de)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        padding: '1.25rem',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '1.25rem' }}>
        <Link href="/admin/business" style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', fontWeight: 600 }}>
          ← All brands
        </Link>
      </div>

      <header style={{ borderBottom: '1px solid var(--border, #2a2725)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent, #c8943e)', margin: '0 0 0.35rem', textTransform: 'capitalize' }}>
          {params.slug.replace(/-/g, ' ')}
        </h1>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)' }}>
          Namespace <code style={{ color: 'var(--accent, #c8943e)' }}>{cfg.namespace}</code>
          {cfg.nameContains ? ` · name contains “${cfg.nameContains}”` : ''}
        </p>
      </header>

      {profiles.length === 0 ? (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px dashed var(--border, #444)',
            color: 'var(--text-muted, #8a8074)',
            lineHeight: 1.55,
            fontSize: '0.9rem',
          }}
        >
          <strong style={{ color: 'var(--text, #e8e4de)' }}>No rows yet.</strong> Ensure{' '}
          <code style={{ color: 'var(--accent, #c8943e)' }}>DATABASE_URL</code> is set and schema is applied (
          <code style={{ color: 'var(--accent, #c8943e)' }}>pnpm db:push</code>
          ), then as admin POST{' '}
          <code style={{ color: 'var(--accent, #c8943e)' }}>/api/admin/marketplace/seed-topology</code> once to
          activate the marketplace graph (profiles, vendors, stores, affiliate defaults).
        </div>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {profiles.map((p) => (
            <li
              key={p.id}
              style={{
                border: '1px solid var(--border, #2a2725)',
                borderRadius: '10px',
                padding: '1.1rem 1.25rem',
                background: 'var(--surface-1, #1a1816)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{p.name}</h2>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted, #8a8074)' }}>
                    {[p.address, p.city, p.state, p.zip].filter(Boolean).join(', ') || 'No address on file'}
                  </p>
                  {p.lat != null && p.lng != null && (
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted, #6b7280)' }}>
                      Map: {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
                    </p>
                  )}
                </div>
                {!p.store && (
                  <span style={{ fontSize: '0.75rem', color: '#f59e0b', alignSelf: 'flex-start' }}>No marketplace store linked</span>
                )}
              </div>

              {p.store && (
                <section style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border, #2a2725)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent, #c8943e)' }}>
                    Shop · {p.store.name}
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted, #94a3b8)' }}>
                    Vendor: {p.store.vendor.name}
                    {p.store.affiliate ? ` · Affiliate ${(p.store.affiliate.commissionRate * 100).toFixed(1)}%` : ''}
                  </p>
                  {p.store.supplies.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)' }}>No approved supplies yet.</p>
                  ) : (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.5rem' }}>
                      {p.store.supplies.map((s) => (
                        <li
                          key={s.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.85rem',
                            padding: '0.45rem 0.6rem',
                            background: 'rgba(200, 148, 62, 0.08)',
                            borderRadius: '6px',
                          }}
                        >
                          <span>{s.name}</span>
                          <span style={{ color: 'var(--accent, #c8943e)' }}>
                            ${(s.priceCents / 100).toFixed(2)} · {s.inventory} in stock
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
