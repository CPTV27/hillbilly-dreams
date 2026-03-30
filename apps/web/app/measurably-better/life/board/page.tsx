// apps/web/app/measurably-better/life/board/page.tsx
// Community Board — post needs, claim tasks

import { prisma } from '@bigmuddy/database';

async function getTasks(sandbox: boolean) {
  try {
    return await prisma.taskPost.findMany({
      where: { sandbox },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  } catch {
    return [];
  }
}

async function getProfiles(ids: string[]) {
  if (ids.length === 0) return {};
  try {
    const profiles = await prisma.communityProfile.findMany({
      where: { id: { in: ids } },
      select: { id: true, displayName: true },
    });
    return Object.fromEntries(profiles.map((p) => [p.id, p.displayName]));
  } catch {
    return {};
  }
}

const STATUS_COLORS: Record<string, string> = {
  open: '#c8943e',
  claimed: '#6a9fd8',
  'in-progress': '#8ac66a',
  done: '#6a6560',
};

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<{ sandbox?: string }>;
}) {
  const params = await searchParams;
  const sandbox = params.sandbox === 'true';
  const tasks = await getTasks(sandbox);
  const authorIds = Array.from(new Set(tasks.map((t) => t.authorId)));
  const names = await getProfiles(authorIds);

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
          Community Board
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          What your neighbors need. What you can offer.
        </p>
      </section>

      {/* Filter tabs */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 16,
        overflowX: 'auto',
      }}>
        {['All', 'Open', 'Trade', 'Volunteer', 'Cash'].map((filter) => (
          <span
            key={filter}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: filter === 'All' ? 'rgba(200, 148, 62, 0.15)' : 'var(--surface, #1a1816)',
              color: filter === 'All' ? '#c8943e' : 'var(--text-muted, #8a8074)',
              border: '1px solid var(--border, #2a2520)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Task cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-muted, #8a8074)',
            fontStyle: 'italic',
            fontSize: '0.9rem',
          }}>
            No tasks posted yet. Be the first — what do you need done?
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: 'var(--surface, #1a1816)',
                border: '1px solid var(--border, #2a2520)',
                borderRadius: 12,
                padding: '16px',
                borderLeft: `3px solid ${STATUS_COLORS[task.status] || '#2a2520'}`,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8,
              }}>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text, #e8e0d4)',
                  margin: 0,
                  flex: 1,
                }}>
                  {task.title}
                </h3>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: STATUS_COLORS[task.status] || '#8a8074',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                  marginLeft: 8,
                }}>
                  {task.status}
                </span>
              </div>
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted, #8a8074)',
                lineHeight: 1.5,
                margin: '0 0 10px',
              }}>
                {task.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                alignItems: 'center',
                fontSize: '0.7rem',
              }}>
                {task.skillsNeeded.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: 'rgba(200, 148, 62, 0.08)',
                      color: '#c8943e',
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    {s}
                  </span>
                ))}
                <span style={{ color: 'var(--text-muted, #8a8074)', marginLeft: 'auto' }}>
                  {names[task.authorId] || 'Anonymous'} · {task.valueType}{task.valueNote ? ` — ${task.valueNote}` : ''}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
