'use client';

import React from 'react';
import { Shield, Server, Zap, LineChart, Briefcase, Database, Cloud, ChevronRight, CheckCircle2 } from 'lucide-react';
import SplitScreenDemo from '../../../../components/proposal/SplitScreenDemo';
import MarginRecoveryEngine from '../../../../components/proposal/MarginRecoveryEngine';

const colors = {
  slate50: '#f8fafc', slate100: '#f1f5f9', slate200: '#e2e8f0', slate300: '#cbd5e1',
  slate400: '#94a3b8', slate500: '#64748b', slate600: '#475569', slate700: '#334155',
  slate800: '#1e293b', slate900: '#0f172a', slate950: '#020617',
  sky50: '#f0f9ff', sky100: '#e0f2fe', sky200: '#bae6fd', sky300: '#7dd3fc',
  sky400: '#38bdf8', sky500: '#0ea5e9', sky600: '#0284c7', sky700: '#0369a1', sky900: '#0c4a6e',
  orange400: '#fb923c', orange500: '#f97316', orange600: '#ea580c',
  white: '#ffffff',
};

/* ─── Proposal (GA's inline CSS version) ─── */
function Proposal() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.slate50, fontFamily: 'system-ui, -apple-system, sans-serif', color: colors.slate900, lineHeight: 1.5 }}>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${colors.slate200}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.slate900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.slate700}` }}>
            <span style={{ fontWeight: 900, fontSize: 14, backgroundImage: `linear-gradient(to right, ${colors.sky400}, ${colors.orange400})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HDX</span>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: colors.slate500 }}>Hillbilly Dreams, Inc.</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.slate800 }}>Technology Platform for the New South</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: colors.slate500, fontWeight: 500 }}>Prepared For</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.slate800 }}>Scan2Plan LLC / Twinner LLC</div>
        </div>
      </nav>

      <main style={{ maxWidth: 1024, margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 96 }}>

        {/* Hero */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, backgroundColor: colors.sky50, color: colors.sky700, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid ${colors.sky100}` }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.sky500 }} />
            Confidential Strategic Proposal
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-1px', color: colors.slate900, lineHeight: 1.1, margin: 0 }}>
            Technology Licensing <br />
            <span style={{ backgroundImage: `linear-gradient(to right, ${colors.sky500}, ${colors.orange500})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              &amp; Ecosystem Partnership
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', color: colors.slate600, maxWidth: 800, lineHeight: 1.6, margin: 0 }}>
            Formalizing the technology, operations, and marketing infrastructure partnership between Scan2Plan LLC, Twinner LLC, and Hillbilly Dreams, Inc.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, fontSize: 14, color: colors.slate500, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={16} /> Prepared by: Chase Tuthill Pierson</div>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.slate300 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LineChart size={16} /> Date: March 23, 2026</div>
          </div>
        </header>

        {/* §1 Executive Summary */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${colors.slate200}`, paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${colors.sky500}, ${colors.sky600})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(14,165,233,0.2)' }}>1</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: 0 }}>Executive Summary</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: colors.slate600, fontSize: '1.05rem', lineHeight: 1.7 }}>
              <p style={{ margin: 0 }}><strong style={{ color: colors.slate900, fontWeight: 700 }}>Hillbilly Dreams, Inc.</strong> is the technology holding company behind HDX — a business operating system purpose-built for service companies.</p>
              <p style={{ margin: 0 }}>HDX runs on Google Cloud production infrastructure (Firebase App Hosting, Cloud Run, and Cloud SQL) and is powered by Google&apos;s Gemini AI for real-time business intelligence.</p>
            </div>
            <div style={{ backgroundColor: colors.white, border: `1px solid ${colors.slate200}`, padding: 32, borderRadius: 24, boxShadow: '0 20px 25px -5px rgba(0,0,0,.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 128, height: 128, backgroundColor: 'rgba(249,115,22,0.1)', borderBottomLeftRadius: '100%', filter: 'blur(24px)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: colors.slate900, margin: '0 0 16px', position: 'relative' }}>The S2PX Deployment</h3>
              <p style={{ color: colors.slate600, margin: '0 0 24px', lineHeight: 1.6, position: 'relative' }}>S2PX is the HDX deployment purpose-built for 3D scanning and spatial intelligence. As the sole Master Licensor, Hillbilly Dreams powers Scan2Plan&apos;s entire digital workflow.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.sky600, fontWeight: 600, fontSize: 14, position: 'relative' }}>
                <CheckCircle2 size={18} /> 30-day guided onboarding. Full platform access from day one.
              </div>
            </div>
          </div>
        </section>

        {/* §2 Included */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${colors.slate200}`, paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${colors.sky500}, ${colors.sky600})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(14,165,233,0.2)' }}>2</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: 0 }}>Included in HDX License</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: <Database />, title: 'Full Development',    desc: 'Continuous software development, new features, and core platform maintenance.' },
              { icon: <Cloud />,    title: 'GCP Infrastructure',  desc: 'Fully managed server and deployed environment architecture on Google Cloud.' },
              { icon: <Zap />,      title: 'AI Agent Lifecycle',  desc: 'Gemini AI model management, prompt tuning, and database administration.' },
              { icon: <Shield />,   title: 'Enterprise Security', desc: 'Role-based access control, automated backups, and tenant isolation.' },
              { icon: <LineChart />,title: 'Financial Sync',      desc: 'Programmatic, real-time synchronization with QuickBooks Online (QBO).' },
              { icon: <Server />,   title: '24/7 Monitoring',     desc: 'Synthetic uptime monitoring with defined SLA response windows.' },
            ].map((f, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, backgroundColor: colors.white, border: `1px solid ${colors.slate200}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = colors.sky300)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = colors.slate200)}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white, border: `1px solid ${colors.slate200}`, boxShadow: '0 1px 2px rgba(0,0,0,.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.sky500, marginBottom: 16 }}>
                  {React.cloneElement(f.icon, { size: 20 })}
                </div>
                <h4 style={{ fontWeight: 700, color: colors.slate900, margin: '0 0 8px' }}>{f.title}</h4>
                <p style={{ fontSize: 14, color: colors.slate600, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* §3 Pricing */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${colors.slate200}`, paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${colors.orange500}, ${colors.orange600})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, fontWeight: 'bold' }}>3</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: 0 }}>Technology Licensing Fees</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {[
              { title: 'Scan2Plan Base License', note: 'Year 1 represents roughly 12% of gross revenue — below the 15–25% SaaS industry standard.', accent: colors.sky600, stripe: `linear-gradient(to right, ${colors.sky400}, ${colors.sky600})`,
                rows: [{ label: 'HDX Platform License', y1: '$6,000/mo', y2: '$8,000/mo', y3: '$10,000/mo' }, { label: 'Revenue Share', y1: '5% of gross', y2: '6% of gross', y3: '7% of gross' }, { label: 'Google Cloud Infra', y1: '~$500/mo', y2: '~$750/mo', y3: '~$1,000/mo' }] },
              { title: 'Twinner Scale License', note: 'Reflects a cloud-native data processing business operating directly on S2PX infrastructure.', accent: colors.orange600, stripe: `linear-gradient(to right, ${colors.orange400}, ${colors.orange600})`,
                rows: [{ label: 'HDX Platform License', y1: '$1,000/mo', y2: '$3,000/mo', y3: '$4,000/mo' }, { label: 'Revenue Share', y1: '8% of gross', y2: '8% of gross', y3: '10% of gross' }, { label: 'Google Cloud Infra', y1: 'Included', y2: '~$500/mo', y3: '~$750/mo' }] },
            ].map((card, ci) => (
              <div key={ci} style={{ backgroundColor: colors.white, borderRadius: 24, padding: 32, border: `1px solid ${colors.slate200}`, boxShadow: '0 20px 25px -5px rgba(0,0,0,.05)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: card.stripe, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.slate900, margin: '0 0 8px' }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: colors.slate500, margin: '0 0 32px', lineHeight: 1.5 }}>{card.note}</p>
                {card.rows.map((row, ri) => (
                  <div key={ri} style={{ borderBottom: ri < card.rows.length - 1 ? `1px solid ${colors.slate100}` : 'none', paddingBottom: ri < card.rows.length - 1 ? 20 : 0, marginBottom: ri < card.rows.length - 1 ? 20 : 0 }}>
                    <div style={{ fontWeight: 600, color: colors.slate900, marginBottom: 12 }}>{row.label}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      {[['Year 1', row.y1, colors.slate500], ['Year 2', row.y2, colors.slate500], ['Year 3+', row.y3, card.accent]].map(([lbl, val, clr]) => (
                        <div key={lbl as string} style={{ color: clr as string, fontWeight: lbl === 'Year 3+' ? 600 : 400 }}>
                          <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4, color: lbl === 'Year 3+' ? colors.slate400 : undefined }}>{lbl}</span>
                          {val}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* §4 Media Engine */}
        <section style={{ background: `linear-gradient(135deg, ${colors.slate900}, ${colors.slate800})`, borderRadius: 24, padding: 'clamp(32px, 5vw, 48px)', color: colors.white, boxShadow: '0 25px 50px -12px rgba(0,0,0,.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 256, height: 256, backgroundColor: 'rgba(14,165,233,0.2)', borderRadius: '50%', filter: 'blur(64px)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 256, height: 256, backgroundColor: 'rgba(249,115,22,0.2)', borderRadius: '50%', filter: 'blur(64px)' }} />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 900, margin: '0 0 8px' }}>The HDX Media Engine</h2>
            <h3 style={{ fontSize: '1.25rem', color: colors.sky400, margin: '0 0 32px', fontWeight: 500 }}>Marketing Addendum: Full-Stack Creative Services</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: colors.slate300, lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>Separate from the baseline S2PX data engine, Hillbilly Dreams acts as a full-scale media holding company layering high-value content on top of raw Scan2Plan deliverables.</p>
                <div style={{ backgroundColor: 'rgba(2,6,23,0.5)', border: `1px solid ${colors.slate700}`, borderRadius: 12, padding: 24 }}>
                  <h4 style={{ color: colors.white, fontWeight: 700, margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Briefcase size={18} color={colors.orange400} /> Direct Budget Replacement
                  </h4>
                  <p style={{ fontSize: 14, margin: 0 }}>Replaces Scan2Plan&apos;s existing 5% marketing budget with a full-stack automated pipeline. No agency markup, no hiring.</p>
                </div>
                <div>
                  <h4 style={{ color: colors.white, fontWeight: 700, margin: '0 0 8px' }}>Commission Structure</h4>
                  <p style={{ fontSize: 14, margin: 0 }}><strong style={{ color: colors.white }}>$1,000/mo base + 7% commission</strong> on HDX-attributed revenue only — not on all sales. Your existing direct sales, referrals, and repeat clients are unaffected. Attribution is clean, auditable, and available on demand.</p>
                </div>
              </div>
              <div>
                <h4 style={{ color: colors.white, fontWeight: 700, margin: '0 0 20px', letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, borderBottom: `1px solid ${colors.slate700}`, paddingBottom: 8 }}>What The Engine Produces</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {['Gemini-generated project narrative per active job', 'Automated project spotlight content for client packages', 'AI-enhanced spatial media package per completed job', 'Full inbound marketing pipeline automation'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: colors.slate200 }}>
                      <ChevronRight color={colors.sky400} size={18} style={{ flexShrink: 0, marginTop: 2 }} />{item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${colors.slate700}` }}>
                  <a href="https://s2px-sandbox.web.app" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', backgroundColor: colors.white, color: colors.slate900, fontWeight: 700, borderRadius: 12, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    View Live Sandbox Demo <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* §5 AI Vision Demo */}
        <SplitScreenDemo />

        {/* §6 ROI Calculator */}
        <MarginRecoveryEngine />

        {/* §7 60-Day Onboarding */}
        <section style={{ maxWidth: '900px', margin: '4rem auto', padding: '0 1rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: colors.slate900, margin: '0 0 0.75rem', letterSpacing: '-0.5px' }}>60-Day Deployment Roadmap</h3>
          <p style={{ color: colors.slate600, lineHeight: 1.6, margin: '0 0 2rem' }}>
            Two phases. Zero disruption to your active projects.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: colors.slate900, borderRadius: 16, padding: '2rem', border: `1px solid ${colors.slate700}` }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 8, background: colors.sky600, color: colors.white, fontSize: '0.75rem', fontWeight: 700, marginBottom: 16, letterSpacing: '0.05em' }}>DAYS 1–30</div>
              <h4 style={{ color: colors.white, fontWeight: 700, fontSize: '1.1rem', margin: '0 0 16px' }}>S2PX Platform Integration</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'QuickBooks Online sync — live financial dashboard',
                  'Project pipeline migration — historical data import',
                  'Scan team onboarding — mobile field app training',
                  'Gemini AI scoping agent — auto-quote from form data',
                  'Client portal activation — deliverables viewer live',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: colors.slate300, fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color={colors.sky400} style={{ flexShrink: 0, marginTop: 2 }} />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: colors.slate900, borderRadius: 16, padding: '2rem', border: `1px solid ${colors.slate700}` }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 8, background: colors.orange500, color: colors.white, fontSize: '0.75rem', fontWeight: 700, marginBottom: 16, letterSpacing: '0.05em' }}>DAYS 31–60</div>
              <h4 style={{ color: colors.white, fontWeight: 700, fontSize: '1.1rem', margin: '0 0 16px' }}>Marketing Engine Rollout</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Automated case studies — Gemini drafts from project data',
                  'Google Business Profile sync — fresh project photos weekly',
                  'Local SEO content pipeline — city-specific landing pages',
                  'Precision outreach — authenticated Gmail sequences',
                  'Conversion attribution — HDX-tracked lead-to-close pipeline',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: colors.slate300, fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color={colors.orange400} style={{ flexShrink: 0, marginTop: 2 }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* §8 Equity & Terms */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, borderTop: `1px solid ${colors.slate200}`, paddingTop: 48 }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.slate900, margin: '0 0 20px' }}>Equity &amp; Alignment</h2>
            <p style={{ color: colors.slate600, margin: '0 0 24px', lineHeight: 1.6 }}>Chase Tuthill Pierson is a founding technology partner in Twinner LLC. The following reflects a negotiated stake, reduced from standard co-founder equity in exchange for the licensing structure.</p>
            <div style={{ backgroundColor: colors.white, border: `1px solid ${colors.slate200}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: `1px solid ${colors.slate100}` }}>
                <span style={{ fontWeight: 600, color: colors.slate900 }}>V. Owen Bush &amp; Dennis Sheldon</span>
                <span style={{ color: colors.slate600, fontWeight: 500, backgroundColor: colors.slate100, padding: '4px 12px', borderRadius: 8, fontSize: 14 }}>80%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: colors.sky50 }}>
                <span style={{ fontWeight: 600, color: colors.sky900 }}>Chase Tuthill Pierson</span>
                <span style={{ color: colors.sky700, fontWeight: 700, backgroundColor: 'rgba(14,165,233,0.1)', border: `1px solid ${colors.sky200}`, padding: '4px 12px', borderRadius: 8, fontSize: 14 }}>20%</span>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.slate900, margin: '0 0 20px' }}>Operations Terms</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { title: 'Exclusivity',         desc: 'Default pricing is Non-Exclusive. A 3-Year Exclusive Lock requires a +50% premium on all fees.' },
                { title: 'Term & Termination',  desc: '1-year auto-renewing with 90-day notice. Upon termination, a runtime license is granted with zero ongoing updates.' },
                { title: 'Data & IP Ownership', desc: 'Client data belongs to Scan2Plan/Twinner. Underlying technology IP belongs to Hillbilly Dreams, Inc.' },
                { title: 'Non-Compete',         desc: 'Hillbilly Dreams agrees not to license S2PX to direct AEC competitors in the Northeast market for 12 months.' },
                { title: 'SLA & Uptime',        desc: '99.5% uptime target. 24/7 monitoring. P1 incidents acknowledged within 2 hours.' },
              ].map((t, i) => (
                <li key={i}>
                  <div style={{ fontWeight: 700, color: colors.slate900, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 14, color: colors.slate600, lineHeight: 1.5 }}>{t.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${colors.slate200}`, backgroundColor: colors.white, padding: '32px 24px', textAlign: 'center', fontSize: 14, color: colors.slate500 }}>
        <p style={{ margin: '0 0 8px' }}>This document serves as a non-binding strategic proposal intended to lead toward formal definitive agreements.</p>
        <p style={{ margin: 0, fontWeight: 500, color: colors.slate900 }}>© 2026 Hillbilly Dreams, Inc. · hillbillydreamsinc.com</p>
      </footer>
    </div>
  );
}

export default function ProposalPage() {
  return <Proposal />;
}
