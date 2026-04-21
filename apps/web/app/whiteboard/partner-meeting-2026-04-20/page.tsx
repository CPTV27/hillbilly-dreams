import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Muddy — Partner Meeting · April 20, 2026',
  robots: { index: false, follow: false },
};

// ─────────────────────────────────────────────────────────────
// Iron & Earth palette — warm amber, deep green, black, cream, gold
// ─────────────────────────────────────────────────────────────
const C = {
  cream: '#f2ebdc',
  paper: '#ebe2cf',
  ink: '#1a120b',
  inkSoft: '#3a2d1f',
  muted: '#6b5840',
  rule: '#cbbd9d',
  ruleSoft: '#ddd1b3',
  amber: '#b8612d',
  copper: '#a65228',
  green: '#2f4a2c',
  greenDeep: '#233a21',
  gold: '#c89a3f',
  goldDeep: '#a67d24',
  navy: '#1d2740',
  stickyYellow: '#f3dd7a',
  stickyYellowDeep: '#e6c856',
};

const FONT_DISPLAY = `var(--font-display, 'Playfair Display', Georgia, serif)`;
const FONT_BODY = `var(--font-body, 'Inter', system-ui, sans-serif)`;

// ─────────────────────────────────────────────────────────────
// Zone 1 — Financial Ladder
// ─────────────────────────────────────────────────────────────
const LADDER = [
  { tier: 'Break-even floor',    amount: '~$200k',     note: 'Ecosystem covers itself',              color: C.amber,    bar: 34 },
  { tier: 'First real profit',    amount: '$250k',      note: '~$50k margin above floor',             color: C.copper,   bar: 46 },
  { tier: 'Baseline target',      amount: '$330k',      note: '~$130k real profit',                   color: C.green,    bar: 62 },
  { tier: 'Stretch',              amount: '$390–395k',  note: 'Art sales + stock activation',         color: C.gold,     bar: 76 },
  { tier: 'Y5 at 25% YoY',        amount: '$806k',      note: 'Modest, sustainable, no fundraise',    color: C.navy,     bar: 100 },
];

// ─────────────────────────────────────────────────────────────
// Zone 3 — Decisions Locked Today
// ─────────────────────────────────────────────────────────────
const DECISIONS = [
  { title: 'Hospitality labor',       body: 'Per-event (cleaning + arrivals contractor), NOT salaried ops manager.' },
  { title: 'Tuthill Design Photography', body: 'New RE photography service line, two-tier booking.' },
  { title: 'CPP refined',             body: 'Non-real-estate only.' },
  { title: 'FarleyPierson LLC',       body: 'Closing; CPP as DBA of MBT (pending counsel).' },
  { title: 'Vrbo',                    body: 'Skipped. Wrong product for a 6-room shared-space boutique.' },
  { title: 'Google Hotel Ads',        body: 'Added to the Fiverr gig scope.' },
  { title: 'Scan2Plan',               body: 'Now a Tuthill Design account ($26k A/R + ongoing).' },
  { title: 'Production insurance',    body: 'Tuthill holds the policy for all production work.' },
  { title: '$500/mo floor',           body: 'Two-account structure for Big Muddy retainers.' },
  { title: 'Classification taxonomy', body: '8 codes for hours / expenses / revenue.' },
  { title: '$1k/mo Inn → MBT',        body: 'Platform subscription formalized April 1.' },
];

// ─────────────────────────────────────────────────────────────
// Zone 4 — Open Questions for Tracy + Amy
// ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  'Approve Tuthill Design Photography scope + tier pricing?',
  'Approve the per-event hospitality labor model?',
  'Approve the 8-code classification taxonomy?',
  'Approve Vicki Wolpert engagement pricing ($15k upfront + $500/mo)?',
  'Go / no-go on the Whole-Inn Buyout SKU as a Phase 2 product concept?',
  'Confirm Dec 2025 $2,500 = Arden pass-through (NOT Tracy+Amy investment)?',
  'Approve $1k/mo Inn → MBT formal platform subscription starting April 1?',
  'Any changes to the $330k baseline or $390–395k stretch assumptions?',
];

// ─────────────────────────────────────────────────────────────
// Zone 5 — Canonical Doc Library
// ─────────────────────────────────────────────────────────────
const GH = 'https://github.com/CPTV27/hillbilly-dreams/blob/main';
const DOCS = [
  { title: 'The Thesis',                       note: 'Canonical mental model',                                    url: `${GH}/docs/THE_THESIS.md` },
  { title: '90-Day Plan',                      note: 'May 1 to July 31 operating doc',                            url: `${GH}/docs/90_DAY_PLAN.md` },
  { title: 'Story Kit',                        note: 'Canonical statements, bios, brand descriptions',            url: `${GH}/docs/STORY_KIT.md` },
  { title: 'Partner Studios Pitch',            note: 'For Studio C + Tuthill Design',                             url: `${GH}/docs/partner-studios-pitch-2026-04-20.md` },
  { title: 'Tuthill Design Photography Scope', note: 'New RE service line',                                       url: `${GH}/docs/partners/tuthill-photography-scope-2026-04-20.md` },
  { title: 'Scan2Plan as Tuthill Account',     note: '$26k A/R + ongoing royalty',                                url: `${GH}/docs/partners/scan2plan-tuthill-account-2026-04-20.md` },
  { title: 'Inn → MBT Investment History',     note: 'Tracy+Amy contributions + Arden pass-through',              url: `${GH}/docs/partners/inn-mbt-investment-history-2026-04-20.md` },
  { title: 'Channel Yield Strategy',           note: 'Inn OTA tier matrix + demand-gen priority',                 url: `${GH}/docs/partners/channel-yield-strategy-2026-04-20.md` },
  { title: 'Vrbo Position Paper',              note: "Why we're skipping it",                                     url: `${GH}/docs/partners/vrbo-position-2026-04-20.md` },
  { title: 'Cloudbeds Consultant Sourcing',    note: '$500 Fiverr start, $1500 ceiling',                          url: `${GH}/docs/partners/cloudbeds-consultant-sourcing-2026-04-20.md` },
  { title: 'Vicki Wolpert Pricing',            note: '$500/mo engagement floor + account stacking',               url: `${GH}/docs/partners/vicki-wolpert/pricing-floor-2026-04-20.md` },
  { title: 'Ecosystem Classification Taxonomy', note: '8 codes',                                                  url: `${GH}/docs/ecosystem-classification-taxonomy-2026-04-20.md` },
  { title: 'Live /story page',                 note: 'Public ecosystem narrative',                                url: 'https://bigmuddytouring.com/story' },
];

// ─────────────────────────────────────────────────────────────
// Shared atoms
// ─────────────────────────────────────────────────────────────
function ZoneFrame({
  number,
  title,
  kicker,
  children,
  accent = C.ink,
  style,
}: {
  number: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  accent?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        position: 'relative',
        background: C.cream,
        border: `1px solid ${C.rule}`,
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(26,18,11,0.06)',
        padding: '22px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, borderTop: `4px solid ${accent}`, pointerEvents: 'none' }} />
      <header style={{ marginBottom: 14, display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: accent,
            padding: '4px 8px',
            border: `1px solid ${accent}`,
            borderRadius: 2,
          }}
        >
          Zone {number}
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: FONT_DISPLAY,
            fontSize: 30,
            lineHeight: 1.05,
            color: C.ink,
            letterSpacing: '-0.01em',
            fontWeight: 700,
          }}
        >
          {title}
        </h2>
        {kicker && (
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              color: C.muted,
              letterSpacing: '0.04em',
              marginLeft: 'auto',
            }}
          >
            {kicker}
          </span>
        )}
      </header>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function PartnerMeetingBoard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at top left, rgba(200,154,63,0.12), transparent 60%),
          radial-gradient(ellipse at bottom right, rgba(47,74,44,0.10), transparent 55%),
          ${C.paper}
        `,
        padding: '28px 32px 24px',
        fontFamily: FONT_BODY,
        color: C.ink,
      }}
    >
      {/* ── Title bar ── */}
      <header
        style={{
          borderTop: `2px solid ${C.ink}`,
          borderBottom: `1px solid ${C.rule}`,
          padding: '18px 4px 20px',
          marginBottom: 24,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'end',
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: C.amber,
              marginBottom: 8,
            }}
          >
            Iron &amp; Earth · Partner Board
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: FONT_DISPLAY,
              fontSize: 56,
              lineHeight: 1,
              color: C.ink,
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            Big Muddy — Partner Meeting
            <span style={{ color: C.green, fontStyle: 'italic' }}> · </span>
            <span style={{ color: C.green }}>April 20, 2026</span>
          </h1>
          <p
            style={{
              margin: '14px 0 0',
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: C.inkSoft,
              letterSpacing: '0.01em',
              maxWidth: 1000,
            }}
          >
            Tracy + Amy + Chase · what we’ve locked in today, what we need your call on.
          </p>
        </div>
        <div
          style={{
            textAlign: 'right',
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: C.muted,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1.5,
          }}
        >
          <div style={{ color: C.ink, fontWeight: 700 }}>Natchez · MS</div>
          <div>Hillbilly Dreams Inc</div>
          <div>Internal · not for distribution</div>
        </div>
      </header>

      {/* ── Grid body ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 5fr 4fr',
          gridTemplateRows: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: 20,
          alignItems: 'stretch',
        }}
      >
        {/* ── Zone 5 — Canonical Doc Library (left, spans both rows) ── */}
        <div style={{ gridColumn: '1 / 2', gridRow: '1 / 3', minHeight: 0 }}>
          <ZoneFrame number="5" title="Canonical Doc Library" kicker="raw URLs · clickable" accent={C.green} style={{ height: '100%' }}>
            <ol
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                overflow: 'hidden',
              }}
            >
              {DOCS.map((d, i) => (
                <li
                  key={d.url}
                  style={{
                    paddingBottom: 10,
                    borderBottom: i === DOCS.length - 1 ? 'none' : `1px solid ${C.ruleSoft}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.goldDeep,
                        minWidth: 22,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: 17,
                          fontWeight: 700,
                          color: C.ink,
                          lineHeight: 1.2,
                        }}
                      >
                        {d.title}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 13,
                          color: C.muted,
                          marginTop: 2,
                          lineHeight: 1.3,
                        }}
                      >
                        {d.note}
                      </div>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          marginTop: 4,
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                          fontSize: 11.5,
                          color: C.copper,
                          wordBreak: 'break-all',
                          textDecoration: 'underline',
                          textDecorationColor: 'rgba(166,82,40,0.35)',
                          textUnderlineOffset: 2,
                        }}
                      >
                        {d.url}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </ZoneFrame>
        </div>

        {/* ── Zone 1 — Financial Ladder (center-top) ── */}
        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2', minHeight: 0 }}>
          <ZoneFrame number="1" title="The Financial Ladder" kicker="smallest → largest" accent={C.amber} style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {LADDER.map((row) => (
                <div
                  key={row.tier}
                  style={{
                    position: 'relative',
                    background: C.paper,
                    border: `1px solid ${C.ruleSoft}`,
                    padding: '10px 14px 10px 16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 14,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${row.bar}%`,
                      background: `linear-gradient(90deg, ${row.color}22 0%, ${row.color}14 80%, transparent 100%)`,
                      borderRight: `3px solid ${row.color}`,
                      zIndex: 0,
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: row.color,
                      }}
                    >
                      {row.tier}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 14,
                        color: C.inkSoft,
                        marginTop: 2,
                      }}
                    >
                      {row.note}
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontFamily: FONT_DISPLAY,
                      fontSize: 30,
                      fontWeight: 700,
                      color: C.ink,
                      letterSpacing: '-0.01em',
                      lineHeight: 1,
                    }}
                  >
                    {row.amount}
                  </div>
                </div>
              ))}
            </div>
            <blockquote
              style={{
                margin: '14px 0 0',
                padding: '12px 14px',
                borderLeft: `3px solid ${C.gold}`,
                background: 'rgba(200,154,63,0.08)',
                fontFamily: FONT_DISPLAY,
                fontSize: 17,
                fontStyle: 'italic',
                color: C.inkSoft,
                lineHeight: 1.35,
              }}
            >
              Break-even is the minimum. Profit is the goal. Quality of life is the ceiling.
            </blockquote>
          </ZoneFrame>
        </div>

        {/* ── Zone 2 — Partner Structure (center-bottom) ── */}
        <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3', minHeight: 0 }}>
          <ZoneFrame number="2" title="Partner Structure" kicker="equity · amplification" accent={C.green} style={{ height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[
                {
                  name: 'Chase Pierson',
                  role: 'CEO · Showrunner',
                  portfolio: 'CPP non-RE, Studio C, platform ops',
                },
                {
                  name: 'Tracy Alderson-Allen',
                  role: 'Finance · Biz Dev',
                  portfolio: 'Inn, Magazine, ecosystem biz dev',
                },
                {
                  name: 'Amy Allen',
                  role: 'Inn & Bar Ops',
                  portfolio: 'Inn + bar ops, Arrie Aslin, touring / records / radio',
                },
              ].map((p) => (
                <div
                  key={p.name}
                  style={{
                    border: `1px solid ${C.green}`,
                    background: 'rgba(47,74,44,0.05)',
                    padding: '12px 14px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: C.green,
                    }}
                  >
                    Equity Partner
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 19,
                      fontWeight: 700,
                      color: C.ink,
                      marginTop: 2,
                      lineHeight: 1.15,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 12,
                      color: C.copper,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      marginTop: 4,
                    }}
                  >
                    {p.role}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 13,
                      color: C.inkSoft,
                      marginTop: 6,
                      lineHeight: 1.35,
                    }}
                  >
                    {p.portfolio}
                  </div>
                </div>
              ))}
            </div>

            {/* connector tick */}
            <div
              style={{
                textAlign: 'center',
                fontFamily: FONT_BODY,
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: C.muted,
                margin: '2px 0 10px',
              }}
            >
              amplified inside the ecosystem
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                {
                  name: 'Studio C Video',
                  deal: '2 × $500/mo retainer accounts',
                  accounts: 'TOUR · INN/MAG',
                },
                {
                  name: 'Tuthill Design',
                  deal: '2 × $500/mo retainer accounts',
                  accounts: 'TOUR · INN/MAG',
                },
              ].map((s) => (
                <div
                  key={s.name}
                  style={{
                    border: `1px solid ${C.gold}`,
                    background: 'rgba(200,154,63,0.10)',
                    padding: '10px 14px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: C.goldDeep,
                    }}
                  >
                    Partner Studio
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 19,
                      fontWeight: 700,
                      color: C.ink,
                      marginTop: 2,
                    }}
                  >
                    {s.name}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.inkSoft, marginTop: 4 }}>
                    {s.deal}
                  </div>
                  <div
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                      fontSize: 11,
                      color: C.copper,
                      marginTop: 4,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {s.accounts}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: `1px solid ${C.ruleSoft}`,
                fontFamily: FONT_BODY,
                fontSize: 13,
                color: C.muted,
                fontStyle: 'italic',
              }}
            >
              MBT markets full-brand for Studio C + Tuthill, not just MBT-internal work.
            </div>
          </ZoneFrame>
        </div>

        {/* ── Zone 3 — Decisions Locked (right-top) ── */}
        <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2', minHeight: 0 }}>
          <ZoneFrame number="3" title="Decisions Locked Today" kicker="11 · signed off" accent={C.green} style={{ height: '100%' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
                flex: 1,
              }}
            >
              {DECISIONS.map((d) => (
                <div
                  key={d.title}
                  style={{
                    background: C.greenDeep,
                    color: C.cream,
                    padding: '10px 11px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span
                      aria-hidden
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 16,
                        height: 16,
                        borderRadius: 2,
                        background: C.gold,
                        color: C.greenDeep,
                        fontSize: 11,
                        fontWeight: 900,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    <div
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 14.5,
                        fontWeight: 700,
                        lineHeight: 1.15,
                        color: C.cream,
                      }}
                    >
                      {d.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 12,
                      color: 'rgba(242,235,220,0.82)',
                      lineHeight: 1.3,
                      paddingLeft: 24,
                    }}
                  >
                    {d.body}
                  </div>
                </div>
              ))}
            </div>
          </ZoneFrame>
        </div>

        {/* ── Zone 4 — Open Questions (right-bottom) ── */}
        <div style={{ gridColumn: '3 / 4', gridRow: '2 / 3', minHeight: 0 }}>
          <ZoneFrame
            number="4"
            title="Open Questions for Tracy + Amy"
            kicker="mark ✓ during meeting"
            accent={C.copper}
            style={{ height: '100%' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
                flex: 1,
              }}
            >
              {QUESTIONS.map((q, i) => {
                const tilt = (i % 2 === 0 ? -0.8 : 0.9) + ((i * 0.35) % 1 - 0.5);
                return (
                  <div
                    key={q}
                    style={{
                      position: 'relative',
                      background: `linear-gradient(170deg, ${C.stickyYellow} 0%, ${C.stickyYellowDeep} 100%)`,
                      padding: '12px 12px 12px 34px',
                      boxShadow:
                        '0 1px 0 rgba(0,0,0,0.05), 0 6px 14px rgba(26,18,11,0.12), inset 0 -6px 14px rgba(0,0,0,0.04)',
                      transform: `rotate(${tilt.toFixed(2)}deg)`,
                      minHeight: 78,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        width: 18,
                        height: 18,
                        border: `2px solid ${C.ink}`,
                        background: 'transparent',
                        borderRadius: 2,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 14.5,
                        color: C.ink,
                        lineHeight: 1.25,
                        fontWeight: 600,
                      }}
                    >
                      {q}
                    </div>
                  </div>
                );
              })}
            </div>
          </ZoneFrame>
        </div>
      </div>

      {/* ── Zone 6 — Privacy Note ── */}
      <footer
        style={{
          marginTop: 20,
          padding: '12px 18px',
          background: C.ink,
          color: C.cream,
          borderTop: `3px solid ${C.gold}`,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 18,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: C.gold,
          }}
        >
          Zone 6 · Privacy
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.4, color: 'rgba(242,235,220,0.92)' }}>
          The public <span style={{ color: C.gold }}>/story</span> page shows rounded macro numbers only. All Inn
          line-item financials stay internal — partners, counsel, accountant only. Google AI Studio + public
          audiences see the shape, not the detail.
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(242,235,220,0.6)',
          }}
        >
          HDI · Internal
        </div>
      </footer>
    </div>
  );
}
