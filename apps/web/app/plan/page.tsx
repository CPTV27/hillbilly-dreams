// apps/web/app/plan/page.tsx
// Public landing page — front door to all the planning docs and live systems.
// Available at any-domain.com/plan (middleware exempts /plan from tenant rewriting).

import Link from 'next/link';

export const metadata = {
  title: 'Hillbilly Dreams — The Plan',
  description: 'Front door to the docs, systems, and queue running Hillbilly Dreams.',
};

export const dynamic = 'force-static';

const REPO = 'https://github.com/CPTV27/hillbilly-dreams/blob/main';

const SECTIONS = [
  {
    title: 'Start here',
    items: [
      {
        name: 'Current Context',
        desc: 'The single living doc — partners, specialists, decisions, priorities. Any agent reads this first.',
        href: `${REPO}/docs/CURRENT_CONTEXT.md`,
        emoji: '◎',
      },
      {
        name: 'Platform Architecture',
        desc: 'The three-layer model: MBT (platform) → Studio C (operator) → Tenants (clients). Sanity is the CMS.',
        href: `${REPO}/docs/PLATFORM_ARCHITECTURE.md`,
        emoji: '◈',
      },
      {
        name: 'Business Overview',
        desc: 'People · Money · Tech at a glance. Three columns, flywheel, budget, next 30 days.',
        href: `${REPO}/apps/web/public/overview.html`,
        emoji: '✦',
      },
    ],
  },
  {
    title: 'Active workstreams',
    items: [
      {
        name: 'Tracy & Amy meeting prep (4/18)',
        desc: 'Decisions A1–D5, financials, itinerary, post-meeting "Pictures · Stories · Words" lanes.',
        href: `${REPO}/docs/meetings/TRACY_AMY_2026-04-18_PREP.md`,
        emoji: '✎',
      },
      {
        name: 'Agent Queue (35 projects)',
        desc: '5 done, 20 ready, 10 blocked. Dispatchable to Claude/Cursor one at a time.',
        href: `${REPO}/docs/router/QUEUE.md`,
        emoji: '◉',
      },
      {
        name: 'Driving Log',
        desc: "Chase's dictation pad while traveling. Cos picks updates from here.",
        href: `${REPO}/docs/DRIVING_LOG_2026-04-18.md`,
        emoji: '✸',
      },
    ],
  },
  {
    title: 'Studio C / photo archive',
    items: [
      {
        name: 'Photo Archive Workflow',
        desc: 'Two-layer: Immich (DAM) + commerce export (sales catalog). Elijah operates.',
        href: `${REPO}/docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md`,
        emoji: '⎕',
      },
      {
        name: "Elijah's Day-1 Runbook",
        desc: 'Practical setup checklist + Day 1 / Week 1 / monthly rhythm. Hand-off ready.',
        href: `${REPO}/docs/STUDIO_C_ELIJAH_RUNBOOK.md`,
        emoji: '✚',
      },
      {
        name: 'WhatsApp draft (for Chase to send)',
        desc: 'Two messages — the ask + the credentials packet. Currently ON HOLD pending Chase review.',
        href: `${REPO}/docs/ELIJAH_WHATSAPP_DRAFT.md`,
        emoji: '◌',
      },
      {
        name: 'Hetzner Media Infrastructure handoff',
        desc: '52,892 photos already ingested. Caddy + TLS. Server, storage, services live.',
        href: `${REPO}/docs/HANDOFF_HETZNER_MEDIA_INFRASTRUCTURE.md`,
        emoji: '◇',
      },
    ],
  },
  {
    title: 'Live systems (production)',
    items: [
      {
        name: 'Immich — Photo Archive',
        desc: '52,892 photos ingested · face recognition · CLIP semantic search · iPhone backup live.',
        href: 'https://immich.hillbillydreamsinc.com',
        emoji: '✦',
        external: true,
      },
      {
        name: 'Big Muddy Touring',
        desc: 'Anchor site — touring, shows, the flywheel.',
        href: 'https://bigmuddytouring.com',
        emoji: '◈',
        external: true,
      },
      {
        name: 'Big Muddy Magazine',
        desc: 'Editorial front door.',
        href: 'https://bigmuddymagazine.com',
        emoji: '◈',
        external: true,
      },
      {
        name: 'Big Muddy Radio',
        desc: 'Broadcasting presence.',
        href: 'https://bigmuddyradio.com',
        emoji: '◈',
        external: true,
      },
      {
        name: 'Deep South Directory',
        desc: 'Primary recurring revenue product. Subscribed tiers $25/$50/$99/$250.',
        href: 'https://deepsouthdirectory.com',
        emoji: '◈',
        external: true,
      },
      {
        name: 'Bearsville Media Group',
        desc: 'Northeast node. Summer 2026 activation.',
        href: 'https://bearsvillemediagroup.com',
        emoji: '◈',
        external: true,
      },
    ],
  },
  {
    title: 'Reference',
    items: [
      {
        name: 'Cross-Agent Relay Board',
        desc: 'Where agents post messages to each other. Photo agent / Voice System / Cos.',
        href: `${REPO}/docs/router/AGENT_RELAY.md`,
        emoji: '◍',
      },
      {
        name: 'Video Kit Budget',
        desc: 'Wave 1 $8.7K · Phase 1 $9.6–10.2K · Full vision $22–25K over 60 days.',
        href: `${REPO}/docs/finance/VIDEO_KIT_BUDGET_APR2026.md`,
        emoji: '$',
      },
      {
        name: 'Agent Registry',
        desc: 'Every agent department, who owns what, hotline.',
        href: `${REPO}/.claude/agents/HDI_DEPARTMENT_STRUCTURE.md`,
        emoji: '◉',
      },
    ],
  },
];

export default function PlanLandingPage() {
  return (
    <div className="plan-wrap">
      <header className="plan-hero">
        <p className="plan-eyebrow">Hillbilly Dreams · April 2026</p>
        <h1>The Plan</h1>
        <p className="plan-sub">
          Front door to every doc, system, and queue running the operation. Built for partners, agents,
          and Chase on the road. Updated as reality changes.
        </p>
      </header>

      <main>
        {SECTIONS.map((section) => (
          <section key={section.title} className="plan-section">
            <h2>{section.title}</h2>
            <div className="plan-grid">
              {section.items.map((item) => {
                const isExternal = 'external' in item && item.external;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={isExternal ? '_blank' : '_blank'}
                    rel="noopener noreferrer"
                    className="plan-card"
                  >
                    <div className="plan-card-icon" aria-hidden>
                      {item.emoji}
                    </div>
                    <div className="plan-card-body">
                      <div className="plan-card-name">
                        {item.name}
                        <span className="plan-card-arrow">↗</span>
                      </div>
                      <div className="plan-card-desc">{item.desc}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        ))}

        <footer className="plan-footer">
          <p>
            Updated continuously. If something looks stale, ping the Chief of Staff agent. Source of
            truth: <Link href="/plan">/plan</Link>
          </p>
        </footer>
      </main>

      <style>{`
        .plan-wrap {
          min-height: 100vh;
          background: #0f0e0c;
          color: #f4ede0;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
          line-height: 1.55;
          padding: 32px 20px 80px;
        }
        .plan-hero {
          max-width: 920px;
          margin: 0 auto 56px;
          padding-top: 32px;
        }
        .plan-eyebrow {
          color: #c8a676;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0 0 8px;
        }
        h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          line-height: 1.05;
        }
        .plan-sub {
          color: #a89e8d;
          font-size: 17px;
          font-style: italic;
          max-width: 680px;
          margin: 0;
        }
        main {
          max-width: 920px;
          margin: 0 auto;
        }
        .plan-section {
          margin-bottom: 48px;
        }
        h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2723;
        }
        .plan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }
        .plan-card {
          display: flex;
          gap: 14px;
          padding: 16px 18px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: all 150ms ease;
        }
        .plan-card:hover {
          border-color: #c8a676;
          transform: translateY(-1px);
          background: #1f1d1a;
        }
        .plan-card-icon {
          font-size: 22px;
          color: #c8a676;
          width: 28px;
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
          text-align: center;
        }
        .plan-card-body {
          min-width: 0;
          flex: 1;
        }
        .plan-card-name {
          font-weight: 700;
          font-size: 15px;
          color: #f4ede0;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }
        .plan-card-arrow {
          color: #6b6254;
          font-size: 14px;
          flex-shrink: 0;
        }
        .plan-card:hover .plan-card-arrow {
          color: #c8a676;
        }
        .plan-card-desc {
          color: #a89e8d;
          font-size: 13px;
          line-height: 1.5;
        }
        .plan-footer {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid #2a2723;
          color: #6b6254;
          font-size: 13px;
          text-align: center;
        }
        .plan-footer a {
          color: #c8a676;
          text-decoration: none;
        }
        @media (max-width: 600px) {
          h1 { font-size: 40px; }
          .plan-sub { font-size: 15px; }
          h2 { font-size: 20px; }
          .plan-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
