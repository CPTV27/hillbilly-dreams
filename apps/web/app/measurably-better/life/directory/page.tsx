// apps/web/app/measurably-better/life/directory/page.tsx
// Local Directory — browse Deep South Directory businesses

import { prisma } from '@bigmuddy/database';

async function getBusinesses(city: string) {
  try {
    return await prisma.directoryBusiness.findMany({
      where: { city, active: true },
      orderBy: { name: 'asc' },
      take: 50,
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        address: true,
        phone: true,
        website: true,
        description: true,
        googleRating: true,
        googleReviewCount: true,
        tier: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function DirectoryPage() {
  const businesses = await getBusinesses('Natchez');

  return (
    <>
      <section style={{ marginBottom: 20 }}>
        <h1 style={{
          fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
          fontWeight: 800,
          color: 'var(--text, #e8e0d4)',
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
        }}>
          Local Directory
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          {businesses.length} businesses in Natchez. Support locals.
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {businesses.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-muted, #8a8074)',
            fontStyle: 'italic',
            fontSize: '0.9rem',
          }}>
            No businesses listed yet. Know a good one? Contribute it.
          </div>
        ) : (
          businesses.map((biz) => (
            <div
              key={biz.id}
              style={{
                background: 'var(--surface, #1a1816)',
                border: '1px solid var(--border, #2a2520)',
                borderRadius: 10,
                padding: '14px',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 6,
              }}>
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--text, #e8e0d4)',
                  margin: 0,
                }}>
                  {biz.name}
                </h3>
                {biz.googleRating && (
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--accent, #c8943e)',
                  }}>
                    {biz.googleRating}/5
                  </span>
                )}
              </div>
              {biz.category && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'var(--accent, #c8943e)',
                  background: 'rgba(200, 148, 62, 0.08)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {biz.category}
                </span>
              )}
              {biz.description && (
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted, #8a8074)',
                  lineHeight: 1.4,
                  margin: '8px 0 0',
                }}>
                  {biz.description.length > 120 ? biz.description.slice(0, 120) + '...' : biz.description}
                </p>
              )}
              {(biz.phone || biz.website) && (
                <div style={{
                  display: 'flex',
                  gap: 12,
                  marginTop: 8,
                  fontSize: '0.7rem',
                }}>
                  {biz.phone && (
                    <a href={`tel:${biz.phone}`} style={{ color: 'var(--text-muted, #8a8074)', textDecoration: 'none' }}>
                      {biz.phone}
                    </a>
                  )}
                  {biz.website && (
                    <a href={biz.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent, #c8943e)', textDecoration: 'none' }}>
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
