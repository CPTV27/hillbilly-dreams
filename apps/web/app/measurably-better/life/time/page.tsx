// apps/web/app/measurably-better/life/time/page.tsx
// Time Ledger — track hour-for-hour exchanges

import { prisma } from '@bigmuddy/database';

async function getExchanges(sandbox: boolean) {
  try {
    const exchanges = await prisma.timeExchange.findMany({
      where: { sandbox },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
    const profileIds = Array.from(new Set(exchanges.flatMap((e) => [e.providerId, e.receiverId])));
    const profiles = await prisma.communityProfile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true, displayName: true },
    });
    const nameMap = Object.fromEntries(profiles.map((p) => [p.id, p.displayName]));
    return exchanges.map((e) => ({
      ...e,
      providerName: nameMap[e.providerId] || 'Unknown',
      receiverName: nameMap[e.receiverId] || 'Unknown',
    }));
  } catch {
    return [];
  }
}

async function getStats(sandbox: boolean) {
  try {
    const agg = await prisma.timeExchange.aggregate({
      where: { status: 'confirmed', sandbox },
      _sum: { hours: true },
      _count: true,
    });
    const participants = await prisma.timeExchange.findMany({
      where: { status: 'confirmed', sandbox },
      select: { providerId: true, receiverId: true },
    });
    const uniquePeople = new Set(participants.flatMap((p) => [p.providerId, p.receiverId]));
    return {
      totalHours: agg._sum.hours || 0,
      totalExchanges: agg._count || 0,
      participants: uniquePeople.size,
    };
  } catch {
    return { totalHours: 0, totalExchanges: 0, participants: 0 };
  }
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: 'rgba(138, 198, 106, 0.1)', color: '#8ac66a' },
  logged: { bg: 'rgba(200, 148, 62, 0.1)', color: '#c8943e' },
  disputed: { bg: 'rgba(216, 106, 106, 0.1)', color: '#d86a6a' },
};

export default async function TimePage({
  searchParams,
}: {
  searchParams: Promise<{ sandbox?: string }>;
}) {
  const params = await searchParams;
  const sandbox = params.sandbox === 'true';
  const [exchanges, stats] = await Promise.all([
    getExchanges(sandbox),
    getStats(sandbox),
  ]);

  const avgRate = 75;
  const estimatedValue = stats.totalHours * avgRate;

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
          Time Ledger
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          One hour equals one hour. The value stays local.
        </p>
      </section>

      {/* Stats */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        marginBottom: 24,
      }}>
        <div style={{
          background: 'var(--surface, #1a1816)',
          border: '1px solid var(--border, #2a2520)',
          borderRadius: 10,
          padding: '14px 12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #e8e0d4)' }}>
            {stats.totalHours}
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-muted, #8a8074)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Hours Traded
          </div>
        </div>
        <div style={{
          background: 'var(--surface, #1a1816)',
          border: '1px solid var(--border, #2a2520)',
          borderRadius: 10,
          padding: '14px 12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent, #c8943e)' }}>
            ${estimatedValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-muted, #8a8074)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Est. Value
          </div>
        </div>
        <div style={{
          background: 'var(--surface, #1a1816)',
          border: '1px solid var(--border, #2a2520)',
          borderRadius: 10,
          padding: '14px 12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #e8e0d4)' }}>
            {stats.participants}
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-muted, #8a8074)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            People
          </div>
        </div>
      </section>

      {/* Exchange list */}
      <section>
        <h2 style={{
          fontSize: '0.7rem',
          fontWeight: 800,
          color: 'var(--accent, #c8943e)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}>
          All Exchanges
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {exchanges.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-muted, #8a8074)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
            }}>
              No exchanges logged. Trade an hour with a neighbor to get started.
            </div>
          ) : (
            exchanges.map((ex) => {
              const style = STATUS_STYLE[ex.status] || STATUS_STYLE.logged;
              return (
                <div
                  key={ex.id}
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
                    <div style={{ fontSize: '0.85rem', color: 'var(--text, #e8e0d4)' }}>
                      {ex.description}
                    </div>
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: style.color,
                      background: style.bg,
                      padding: '2px 6px',
                      borderRadius: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      flexShrink: 0,
                      marginLeft: 8,
                    }}>
                      {ex.status}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    fontSize: '0.7rem',
                    color: 'var(--text-muted, #8a8074)',
                    flexWrap: 'wrap',
                  }}>
                    <span><strong>{ex.providerName}</strong> → {ex.receiverName}</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent, #c8943e)' }}>{ex.hours}h</span>
                    <span>{ex.skill}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
