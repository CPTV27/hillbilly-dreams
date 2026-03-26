'use client';

// SPX — Spatial Intelligence Platform proposal
// Rebranded from S2PX. Server-safe client component for interactive slider.

import React, { useState } from 'react';

const C = {
  bg: '#f8f9fa',
  white: '#ffffff',
  border: '#e8eaed',
  text: '#202124',
  textSecondary: '#5f6368',
  textMuted: '#9aa0a6',
  accent: '#b45309',
  accentBg: 'rgba(180,83,9,0.06)',
  dark: '#1a1a2e',
  darkText: '#cbd5e1',
  green: '#1e8e3e',
  greenLight: '#e6f4ea',
};

const INCLUDED = [
  { title: 'Full Development', desc: 'Continuous software development, new features, and core platform maintenance.' },
  { title: 'GCP Infrastructure', desc: 'Fully managed server and deployed environment architecture on Google Cloud.' },
  { title: 'AI Agent Lifecycle', desc: 'Gemini AI model management, prompt tuning, and database administration.' },
  { title: 'Enterprise Security', desc: 'Role-based access control, automated backups, and tenant isolation.' },
  { title: 'Financial Sync', desc: 'Programmatic, real-time synchronization with QuickBooks Online.' },
  { title: '24/7 Monitoring', desc: 'Synthetic uptime monitoring with defined SLA response windows.' },
];

const ONBOARDING = [
  {
    period: 'Days 1–30',
    title: 'SPX Platform Integration',
    color: C.accent,
    items: [
      'QuickBooks Online sync — live financial dashboard',
      'Project pipeline migration — historical data import',
      'Scan team onboarding — mobile field app training',
      'Gemini AI scoping agent — auto-quote from scan data',
      'Client portal activation — deliverables viewer live',
    ],
  },
  {
    period: 'Days 31–60',
    title: 'Marketing Engine Rollout',
    color: C.dark,
    items: [
      'Automated case studies — Gemini drafts from project data',
      'Google Business Profile sync — fresh project photos weekly',
      'Local SEO content pipeline — city-specific landing pages',
      'Precision outreach — authenticated Gmail sequences',
      'Conversion attribution — HDX-tracked lead-to-close pipeline',
    ],
  },
];

const AGREEMENT = [
  { title: 'Contract Type', desc: 'Standard SaaS vendor agreement. 12-month term, auto-renewing with 90-day notice. No equity.' },
  { title: 'Implementation', desc: 'Month 1 is free. If the system does not map to your business, you know before you ever pay full price.' },
  { title: 'Data Ownership', desc: 'Your data stays yours. Period. You retain 100% ownership of all business data. HDX retains platform IP.' },
  { title: 'Compute Transparency', desc: 'Google Cloud costs passed through at wholesale. Zero markup. We make money on the software, not by taxing your data.' },
  { title: 'SLA & Uptime', desc: '99.5% uptime target. 24/7 synthetic monitoring. P1 incidents acknowledged within 2 hours.' },
  { title: 'Termination', desc: 'Upon termination, you receive a data export and a runtime license. Zero lock-in. Zero hostage data.' },
];

export default function SPXProposalPage() {
  const [growthFee, setGrowthFee] = useState(1000);
  const revSharePercent = growthFee >= 10000 ? 0 : 10 - ((growthFee - 1000) / 9000) * 10;
  const totalMonthly = 5000 + growthFee;
  const month2 = Math.round(totalMonthly * 0.5);
  const year1Total = month2 + totalMonthly * 10;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        color: C.text,
        padding: '0 0 80px',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.textMuted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          Measurably Better
        </span>
        <span style={{ fontSize: 13, color: C.textMuted }}>
          SPX — Spatial Intelligence Platform
        </span>
      </div>

      {/* Hero */}
      <div
        style={{
          backgroundColor: C.dark,
          padding: 'clamp(48px, 8vw, 80px) 24px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: C.accent,
              backgroundColor: 'rgba(180,83,9,0.15)',
              padding: '4px 10px',
              borderRadius: 4,
              marginBottom: 20,
            }}
          >
            Technology Licensing &amp; Ecosystem Partnership
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 20px',
            }}
          >
            SPX — Spatial Intelligence
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: C.darkText,
              lineHeight: 1.65,
              margin: '0 0 28px',
              maxWidth: 560,
            }}
          >
            Polycam integration, 3D data processing, and AI-powered spatial
            workflows. The HDX deployment purpose-built for scanning, AEC, and
            spatial intelligence operations.
          </p>
          <p
            style={{
              fontSize: 15,
              color: C.darkText,
              opacity: 0.7,
              margin: 0,
            }}
          >
            Prepared by Hillbilly Dreams, Inc. &mdash; March 2026
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: 64,
          paddingTop: 64,
        }}
      >
        {/* §1 Executive Summary */}
        <section>
          <SectionHeader n="1" title="Executive Summary" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
            }}
          >
            <div style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 16px' }}>
                <strong style={{ color: C.text }}>Hillbilly Dreams, Inc.</strong>{' '}
                is the technology holding company behind HDX — a business
                operating system purpose-built for service companies. We build
                the rails.
              </p>
              <p style={{ margin: 0 }}>
                SPX is the HDX deployment for 3D scanning and spatial
                intelligence. Polycam integration, AI-powered quoting from scan
                data, and full financial sync. Independent operators lose
                roughly 23% of billable capacity to manual administrative
                overhead. SPX fixes it.
              </p>
            </div>
            <div
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.text,
                  margin: '0 0 12px',
                }}
              >
                The SPX Deployment
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: C.textSecondary,
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                }}
              >
                Spatial intelligence — Polycam integration, 3D data processing,
                and AI-powered project workflows. As the sole Master Licensor,
                Hillbilly Dreams powers your entire digital workflow.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.green,
                }}
              >
                <span style={{ fontSize: 16 }}>&#10003;</span>
                30-day guided onboarding. Full platform access from day one.
              </div>
            </div>
          </div>
        </section>

        {/* §2 Included */}
        <section>
          <SectionHeader n="2" title="Included in HDX License" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {INCLUDED.map((f) => (
              <div
                key={f.title}
                style={{
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor: C.white,
                  border: `1px solid ${C.border}`,
                }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    color: C.text,
                    margin: '0 0 8px',
                    fontSize: 15,
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    color: C.textSecondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* §3 Pricing */}
        <section>
          <SectionHeader n="3" title="Outsourced Operating System" />
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.7,
              margin: '0 0 32px',
            }}
          >
            Pure SaaS + performance. No CapEx. No equity. You pay for the
            infrastructure, and the margin upside stays with you.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
              marginBottom: 32,
            }}
          >
            {/* Core Node */}
            <div
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
                position: 'relative' as const,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute' as const,
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: C.dark,
                }}
              />
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: C.textMuted,
                  margin: '0 0 4px',
                }}
              >
                Core Node
              </p>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: '-0.02em',
                  margin: '0 0 4px',
                }}
              >
                $5,000
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: C.textSecondary,
                  }}
                >
                  /mo
                </span>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  margin: '0 0 16px',
                }}
              >
                Pegged to $1M+ run-rate. Scales with your live QuickBooks TTM
                revenue.
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: C.textSecondary,
                  margin: '0 0 20px',
                  lineHeight: 1.55,
                }}
              >
                Your outsourced operating system. Replaces back-office headcount
                and protects existing margins.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  gap: 8,
                }}
              >
                {[
                  'CEO console with live telemetry',
                  'QuickBooks Online sync — real-time P&L dashboard',
                  'Spatial / LiDAR compute pipeline (Vertex AI)',
                  'Polycam integration — scan-to-quote pipeline',
                  'Cloud compute passed through at-cost, 0% markup',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: 13,
                      color: C.textSecondary,
                    }}
                  >
                    <span
                      style={{
                        color: C.accent,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      &#x2713;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Module — interactive */}
            <div
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
                position: 'relative' as const,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute' as const,
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: C.accent,
                }}
              />
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: C.textMuted,
                  margin: '0 0 4px',
                }}
              >
                Growth Module
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: C.textSecondary,
                  margin: '0 0 20px',
                  lineHeight: 1.55,
                }}
              >
                Adjust your risk profile. Increase the monthly retainer to buy
                down commission on closed volume.
              </p>

              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: C.accent,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    ${growthFee.toLocaleString()}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: C.textSecondary,
                      }}
                    >
                      /mo
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color:
                        revSharePercent === 0 ? C.green : C.text,
                    }}
                  >
                    {revSharePercent === 0
                      ? '0%'
                      : `${revSharePercent.toFixed(1)}%`}
                    <span
                      style={{
                        fontSize: 11,
                        color: C.textMuted,
                        fontWeight: 400,
                        marginLeft: 4,
                      }}
                    >
                      {revSharePercent === 0
                        ? 'unlimited volume'
                        : 'rev-share'}
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={500}
                  value={growthFee}
                  onChange={(e) => setGrowthFee(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: C.accent,
                    cursor: 'pointer',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11,
                    color: C.textMuted,
                    marginTop: 4,
                  }}
                >
                  <span>$1,000/mo — 10% rev-share</span>
                  <span style={{ color: C.green, fontWeight: 600 }}>
                    $10,000/mo — 0% commission
                  </span>
                </div>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 20px',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  gap: 8,
                }}
              >
                {[
                  'Inbound marketing engine + AI lead qualification',
                  'Automated case studies from project data',
                  'Google Business Profile sync + local SEO',
                  'Precision outreach — authenticated Gmail sequences',
                  'Conversion attribution — HDX-tracked pipeline',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: 13,
                      color: C.textSecondary,
                    }}
                  >
                    <span
                      style={{
                        color: C.accent,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      &#x2713;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Dynamic total */}
              <div
                style={{
                  backgroundColor: C.dark,
                  borderRadius: 8,
                  padding: '16px 20px',
                }}
              >
                <Row
                  label="Core Node"
                  value="$5,000/mo"
                  color={C.darkText}
                />
                <Row
                  label="Growth Module"
                  value={`$${growthFee.toLocaleString()}/mo`}
                  color={C.accent}
                />
                <div
                  style={{
                    borderTop: '1px solid rgba(203,213,225,0.15)',
                    marginTop: 10,
                    paddingTop: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.darkText,
                    }}
                  >
                    Total Monthly
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: C.green,
                    }}
                  >
                    ${totalMonthly.toLocaleString()}/mo
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: C.textMuted,
                  margin: '10px 0 0',
                  textAlign: 'center' as const,
                }}
              >
                Spatial compute passed through at-cost. 0% markup.
              </p>
            </div>
          </div>

          {/* 12-Month Ramp */}
          <div
            style={{
              backgroundColor: C.dark,
              borderRadius: 12,
              padding: 28,
              color: C.white,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                margin: '0 0 20px',
                color: C.white,
              }}
            >
              12-Month Commitment — De-Risked Ramp
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 20,
              }}
            >
              {[
                {
                  label: 'Month 1',
                  value: '$0',
                  note: 'Connect vaults. Map ledger. Build pipes.',
                  color: C.green,
                },
                {
                  label: 'Month 2',
                  value: `$${month2.toLocaleString()}`,
                  note: 'Dashboard live. AI monitoring. Half-rate ramp.',
                  color: C.accent,
                },
                {
                  label: 'Months 3–12',
                  value: `$${totalMonthly.toLocaleString()}/mo`,
                  note: 'Fully autonomous. ROI proven on dashboard.',
                  color: C.darkText,
                },
              ].map((col) => (
                <div
                  key={col.label}
                  style={{
                    padding: '16px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(203,213,225,0.1)',
                    textAlign: 'center' as const,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      color: C.textMuted,
                      marginBottom: 8,
                    }}
                  >
                    {col.label}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: col.color,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {col.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: C.textMuted,
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {col.note}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 16,
                borderTop: '1px solid rgba(203,213,225,0.15)',
              }}
            >
              <span style={{ fontSize: 13, color: C.textMuted }}>
                Year 1 Total Commitment
              </span>
              <span
                style={{ fontSize: 22, fontWeight: 700, color: C.green }}
              >
                ${year1Total.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* §4 60-Day Onboarding */}
        <section>
          <SectionHeader n="4" title="60-Day Deployment Roadmap" />
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              margin: '0 0 28px',
              lineHeight: 1.65,
            }}
          >
            Four steps. Zero disruption to your active projects.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 24,
              flexWrap: 'wrap' as const,
            }}
          >
            {[
              { step: '01', label: 'Audit', desc: 'Workflow mapping' },
              { step: '02', label: 'Setup', desc: 'Node deployment' },
              {
                step: '03',
                label: 'Build',
                desc: 'Custom rails (Vertex AI + your data)',
              },
              { step: '04', label: 'Go-Live', desc: 'Production handoff' },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  flex: 1,
                  minWidth: 130,
                  padding: '14px 16px',
                  borderRadius: 10,
                  backgroundColor: C.dark,
                  border: '1px solid rgba(203,213,225,0.1)',
                  textAlign: 'center' as const,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: C.accent,
                    marginBottom: 4,
                  }}
                >
                  {s.step} / {s.label}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {ONBOARDING.map((phase) => (
              <div
                key={phase.period}
                style={{
                  backgroundColor: C.dark,
                  borderRadius: 10,
                  padding: '20px 24px',
                  border: '1px solid rgba(203,213,225,0.1)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 4,
                    backgroundColor: phase.color,
                    color: C.white,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.06em',
                    marginBottom: 12,
                  }}
                >
                  {phase.period}
                </span>
                <h4
                  style={{
                    color: C.white,
                    fontWeight: 700,
                    margin: '0 0 14px',
                    fontSize: 15,
                  }}
                >
                  {phase.title}
                </h4>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 8,
                  }}
                >
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: 13,
                        color: C.darkText,
                      }}
                    >
                      <span
                        style={{
                          color: C.accent,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        &#x2713;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* §5 Service Agreement */}
        <section>
          <SectionHeader n="5" title="Service Agreement" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {AGREEMENT.map((t) => (
              <div
                key={t.title}
                style={{
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor: C.white,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: C.text,
                    marginBottom: 8,
                    fontSize: 14,
                  }}
                >
                  {t.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* §6 Next Steps */}
        <section
          style={{
            backgroundColor: C.dark,
            borderRadius: 12,
            padding: 'clamp(32px, 5vw, 48px)',
            textAlign: 'center' as const,
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: C.white,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to deploy?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.darkText,
              maxWidth: 500,
              margin: '0 auto 28px',
              lineHeight: 1.65,
            }}
          >
            30 days from contract to live platform. Your data stays sovereign.
            Your margin stays local.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap' as const,
            }}
          >
            <a
              href="mailto:chase@hillbillydreamsinc.com?subject=SPX%20Deployment"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: C.accent,
                color: C.white,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Initiate SPX Deployment
            </a>
            <a
              href="/hillbilly/proposal/scan2plan/console"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: C.darkText,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 8,
                textDecoration: 'none',
                border: '1px solid rgba(203,213,225,0.2)',
              }}
            >
              Open the Console Demo
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 900,
          margin: '48px auto 0',
          padding: '0 24px',
          borderTop: `1px solid ${C.border}`,
          paddingTop: 24,
        }}
      >
        <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>
          This document serves as a non-binding strategic proposal intended to
          lead toward formal definitive agreements. &copy; 2026 Hillbilly
          Dreams, Inc.
        </p>
      </div>
    </div>
  );
}

function SectionHeader({ n, title }: { n: string; title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid #e8eaed',
        paddingBottom: 14,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          backgroundColor: '#b45309',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 13,
          flexShrink: 0,
        }}
      >
        {n}
      </div>
      <h2
        style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '-0.02em',
          color: '#202124',
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function Row({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}
    >
      <span style={{ fontSize: 13, color: '#9aa0a6' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}
