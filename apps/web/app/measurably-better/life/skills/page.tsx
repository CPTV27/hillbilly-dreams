// apps/web/app/measurably-better/life/skills/page.tsx
// Skill Map — browse community skills

import { prisma } from '@bigmuddy/database';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'trades', label: 'Trades' },
  { key: 'professional', label: 'Professional' },
  { key: 'creative', label: 'Creative' },
  { key: 'tech', label: 'Tech' },
  { key: 'domestic', label: 'Domestic' },
];

const CAT_COLORS: Record<string, string> = {
  trades: '#c8943e',
  professional: '#6a9fd8',
  creative: '#d87a9f',
  tech: '#8ac66a',
  domestic: '#d8a86a',
  other: '#8a8074',
};

async function getSkills(sandbox: boolean) {
  try {
    const skills = await prisma.skillListing.findMany({
      where: { sandbox },
      orderBy: { createdAt: 'desc' },
    });
    // Get profile names
    const profileIds = Array.from(new Set(skills.map((s) => s.profileId)));
    const profiles = await prisma.communityProfile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true, displayName: true, city: true },
    });
    const profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]));
    return skills.map((s) => ({ ...s, profile: profileMap[s.profileId] }));
  } catch {
    return [];
  }
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ sandbox?: string; category?: string }>;
}) {
  const params = await searchParams;
  const sandbox = params.sandbox === 'true';
  const allSkills = await getSkills(sandbox);
  const filteredSkills = params.category && params.category !== 'all'
    ? allSkills.filter((s) => s.category === params.category)
    : allSkills;

  // Group by person
  const byPerson: Record<string, { name: string; city: string; skills: typeof filteredSkills }> = {};
  for (const s of filteredSkills) {
    const pid = s.profileId;
    if (!byPerson[pid]) {
      byPerson[pid] = {
        name: s.profile?.displayName || 'Unknown',
        city: s.profile?.city || '',
        skills: [],
      };
    }
    byPerson[pid].skills.push(s);
  }

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
          Skill Map
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          {filteredSkills.length} skills across {Object.keys(byPerson).length} people
        </p>
      </section>

      {/* Category filters */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 16,
        overflowX: 'auto',
      }}>
        {CATEGORIES.map((cat) => (
          <a
            key={cat.key}
            href={`/life/skills?category=${cat.key}${sandbox ? '&sandbox=true' : ''}`}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: (params.category || 'all') === cat.key ? 'rgba(200, 148, 62, 0.15)' : 'var(--surface, #1a1816)',
              color: (params.category || 'all') === cat.key ? '#c8943e' : 'var(--text-muted, #8a8074)',
              border: '1px solid var(--border, #2a2520)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {/* Skill cards grouped by person */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(byPerson).length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-muted, #8a8074)',
            fontStyle: 'italic',
            fontSize: '0.9rem',
          }}>
            No skills listed yet. Add yours — what can you do?
          </div>
        ) : (
          Object.entries(byPerson).map(([pid, person]) => (
            <div
              key={pid}
              style={{
                background: 'var(--surface, #1a1816)',
                border: '1px solid var(--border, #2a2520)',
                borderRadius: 12,
                padding: '16px',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 10,
              }}>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text, #e8e0d4)',
                  margin: 0,
                }}>
                  {person.name}
                </h3>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted, #8a8074)',
                }}>
                  {person.city}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {person.skills.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      background: `${CAT_COLORS[s.category] || '#8a8074'}10`,
                      border: `1px solid ${CAT_COLORS[s.category] || '#8a8074'}30`,
                      borderRadius: 8,
                      padding: '8px 10px',
                    }}
                  >
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: CAT_COLORS[s.category] || '#8a8074',
                    }}>
                      {s.skill}
                    </span>
                    {s.availability && (
                      <span style={{
                        fontSize: '0.6rem',
                        color: 'var(--text-muted, #8a8074)',
                      }}>
                        {s.availability}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
