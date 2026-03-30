// apps/web/app/measurably-better/life/page.tsx
// MBT Life — Dashboard / Home

import { prisma } from '@bigmuddy/database';

async function getStats(sandbox: boolean) {
  try {
    const [profiles, openTasks, totalHours, tools] = await Promise.all([
      prisma.communityProfile.count({ where: { sandbox } }),
      prisma.taskPost.count({ where: { status: 'open', sandbox } }),
      prisma.timeExchange.aggregate({ where: { status: 'confirmed', sandbox }, _sum: { hours: true } }),
      prisma.toolLibraryItem.count({ where: { available: true, sandbox } }),
    ]);
    return { profiles, openTasks, totalHours: totalHours._sum.hours || 0, tools };
  } catch {
    return { profiles: 0, openTasks: 0, totalHours: 0, tools: 0 };
  }
}

async function getRecentActivity(sandbox: boolean) {
  try {
    const [recentTasks, recentExchanges] = await Promise.all([
      prisma.taskPost.findMany({
        where: { sandbox },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.timeExchange.findMany({
        where: { sandbox, status: 'confirmed' },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);
    return { recentTasks, recentExchanges };
  } catch {
    return { recentTasks: [], recentExchanges: [] };
  }
}

export default async function LifeDashboard({
  searchParams,
}: {
  searchParams: Promise<{ sandbox?: string }>;
}) {
  const params = await searchParams;
  const sandbox = params.sandbox === 'true';
  const [stats, activity] = await Promise.all([
    getStats(sandbox),
    getRecentActivity(sandbox),
  ]);

  return (
    <>
      {sandbox && (
        <div style={{
          background: 'rgba(200, 148, 62, 0.12)',
          border: '1px solid rgba(200, 148, 62, 0.3)',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: '0.75rem',
          color: '#c8943e',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Sandbox Mode — Demo Data
        </div>
      )}

      {/* Greeting */}
      <section style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 800,
          color: 'var(--text, #e8e0d4)',
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
        }}>
          Your Community
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          {sandbox ? 'Natchez, Mississippi — sandbox' : 'Natchez, Mississippi'}
        </p>
      </section>

      {/* Stats */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginBottom: 32,
      }}>
        {[
          { value: stats.profiles, label: 'People' },
          { value: stats.openTasks, label: 'Open Tasks' },
          { value: stats.totalHours, label: 'Hours Traded' },
          { value: stats.tools, label: 'Tools Shared' },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--surface, #1a1816)',
            border: '1px solid var(--border, #2a2520)',
            borderRadius: 12,
            padding: '16px',
          }}>
            <div style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 800,
              color: 'var(--text, #e8e0d4)',
              lineHeight: 1,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--text-muted, #8a8074)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginTop: 4,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Open Tasks */}
      <section style={{ marginBottom: 32 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 12,
        }}>
          <h2 style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--accent, #c8943e)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            Open Tasks
          </h2>
          <a href={`/life/board${sandbox ? '?sandbox=true' : ''}`} style={{
            fontSize: '0.75rem',
            color: 'var(--accent, #c8943e)',
            textDecoration: 'none',
          }}>
            View All
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activity.recentTasks.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #8a8074)', fontStyle: 'italic' }}>
              No open tasks. Post one — someone in your community can help.
            </p>
          ) : (
            activity.recentTasks.map((task) => (
              <a
                key={task.id}
                href={`/life/board${sandbox ? '?sandbox=true' : ''}`}
                style={{
                  display: 'block',
                  background: 'var(--surface, #1a1816)',
                  border: '1px solid var(--border, #2a2520)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text, #e8e0d4)',
                  marginBottom: 4,
                }}>
                  {task.title}
                </div>
                <div style={{
                  display: 'flex',
                  gap: 8,
                  fontSize: '0.7rem',
                  color: 'var(--text-muted, #8a8074)',
                }}>
                  <span style={{
                    background: 'rgba(200, 148, 62, 0.1)',
                    color: '#c8943e',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontWeight: 600,
                  }}>
                    {task.valueType}
                  </span>
                  {task.skillsNeeded.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* Recent Exchanges */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{
          fontSize: '0.7rem',
          fontWeight: 800,
          color: 'var(--accent, #c8943e)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}>
          Recent Exchanges
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activity.recentExchanges.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #8a8074)', fontStyle: 'italic' }}>
              No exchanges yet. Start by trading an hour with a neighbor.
            </p>
          ) : (
            activity.recentExchanges.map((ex) => (
              <div
                key={ex.id}
                style={{
                  background: 'var(--surface, #1a1816)',
                  border: '1px solid var(--border, #2a2520)',
                  borderRadius: 10,
                  padding: '12px 14px',
                }}
              >
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--text, #e8e0d4)',
                  marginBottom: 4,
                }}>
                  {ex.description}
                </div>
                <div style={{
                  display: 'flex',
                  gap: 8,
                  fontSize: '0.7rem',
                  color: 'var(--text-muted, #8a8074)',
                }}>
                  <span style={{ fontWeight: 600 }}>{ex.hours}h</span>
                  <span>{ex.skill}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a
            href={`/life/board${sandbox ? '?sandbox=true' : ''}`}
            style={{
              display: 'block',
              background: 'var(--accent, #c8943e)',
              color: '#0a0a0a',
              textAlign: 'center',
              padding: '12px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            Post a Task
          </a>
          <a
            href={`/life/skills${sandbox ? '?sandbox=true' : ''}`}
            style={{
              display: 'block',
              background: 'transparent',
              color: 'var(--text-muted, #8a8074)',
              textAlign: 'center',
              padding: '12px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              border: '1px solid var(--border, #2a2520)',
            }}
          >
            Browse Skills
          </a>
        </div>
      </section>
    </>
  );
}
