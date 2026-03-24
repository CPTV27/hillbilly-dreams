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
              <p style={{ margin: 0 }}><strong style={{ color: colors.slate900, fontWeight: 700 }}>Hillbilly Dreams, Inc.</strong> is the technology holding company behind HDX — a business operating system purpose-built for service companies. We don&apos;t build models. We build the rails.</p>
              <p style={{ margin: 0 }}>HDX runs on Google Cloud production infrastructure (Cloud Run, Vertex AI, and Cloud SQL) powered by Gemini 1.5 Pro. Independent operators lose ~23% of billable capacity to manual administrative overhead. This pipeline fixes it.</p>
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

        {/* §3 Pricing — SaaS + Performance Model */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${colors.slate200}`, paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${colors.orange500}, ${colors.orange600})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, fontWeight: 'bold' }}>3</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: 0 }}>Outsourced Operating System</h2>
          </div>
          <p style={{ color: colors.slate600, fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
            Pure SaaS + Performance. No CapEx. No equity. You pay for the iron, and we only get wealthy when you get wealthy.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {/* Core Node */}
            <div style={{ backgroundColor: colors.white, borderRadius: 24, padding: 32, border: `1px solid ${colors.slate200}`, boxShadow: '0 20px 25px -5px rgba(0,0,0,.05)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${colors.sky400}, ${colors.sky600})`, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.slate900, margin: '0 0 8px' }}>The Core Node</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: colors.sky600, margin: '0 0 8px' }}>$5,000<span style={{ fontSize: '1rem', color: colors.slate400, fontWeight: 500 }}>/mo</span></div>
              <p style={{ fontSize: 14, color: colors.slate500, margin: '0 0 24px', lineHeight: 1.5 }}>Your outsourced operating system. Replaces back-office headcount and protects existing margins.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Bespoke CEO Console with live telemetry', 'QuickBooks Online sync — real-time P&L dashboard', 'Google Workspace capacity forecasting', 'Spatial / LiDAR compute pipeline (Vertex AI)', 'Cloud compute passed through at-cost, 0% markup'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: colors.slate600 }}>
                    <CheckCircle2 size={16} color={colors.sky500} style={{ flexShrink: 0, marginTop: 2 }} />{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Growth Module */}
            <div style={{ backgroundColor: colors.white, borderRadius: 24, padding: 32, border: `1px solid ${colors.slate200}`, boxShadow: '0 20px 25px -5px rgba(0,0,0,.05)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${colors.orange400}, ${colors.orange600})`, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.slate900, margin: '0 0 8px' }}>The Growth Module</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: colors.orange500, margin: '0 0 8px' }}>$1,000<span style={{ fontSize: '1rem', color: colors.slate400, fontWeight: 500 }}>/mo + RevShare</span></div>
              <p style={{ fontSize: 14, color: colors.slate500, margin: '0 0 24px', lineHeight: 1.5 }}>The offensive engine. You only pay the performance fee when you win.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Inbound marketing engine + AI lead qualification', 'Automated case studies from project data', 'Google Business Profile sync + local SEO', 'Precision outreach — authenticated Gmail sequences', 'Conversion attribution — HDX-tracked pipeline'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: colors.slate600 }}>
                    <CheckCircle2 size={16} color={colors.orange500} style={{ flexShrink: 0, marginTop: 2 }} />{item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24, padding: 20, backgroundColor: colors.slate50, borderRadius: 12, border: `1px solid ${colors.slate100}` }}>
                <div style={{ fontWeight: 700, color: colors.slate900, marginBottom: 8 }}>Performance RevShare Waterfall</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.slate600 }}>
                    <span>First $1M funnel-closed revenue</span>
                    <span style={{ fontWeight: 700, color: colors.orange600 }}>7%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.slate600 }}>
                    <span>Revenue above $1M</span>
                    <span style={{ fontWeight: 700, color: colors.sky600 }}>5%</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: colors.slate400, margin: '12px 0 0', lineHeight: 1.4 }}>The fee decreases as your volume increases. We grow when you grow — never the other way around.</p>
              </div>
            </div>
          </div>

          {/* 12-Month Ramp */}
          <div style={{ backgroundColor: colors.slate900, borderRadius: 24, padding: 32, color: colors.white }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 24px' }}>12-Month Commitment — De-Risked Ramp</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div style={{ padding: 24, borderRadius: 16, backgroundColor: colors.slate800, border: `1px solid ${colors.slate700}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.sky400, marginBottom: 8 }}>Month 1</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.green400 }}>$0</div>
                <div style={{ fontSize: 12, color: colors.slate400, marginTop: 8 }}>Connect vaults. Map ledger. Build pipes.</div>
              </div>
              <div style={{ padding: 24, borderRadius: 16, backgroundColor: colors.slate800, border: `1px solid ${colors.slate700}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.orange400, marginBottom: 8 }}>Month 2</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.white }}>$3,000</div>
                <div style={{ fontSize: 12, color: colors.slate400, marginTop: 8 }}>Dashboard live. AI monitoring. Half-rate ramp.</div>
              </div>
              <div style={{ padding: 24, borderRadius: 16, backgroundColor: colors.slate800, border: `1px solid ${colors.slate700}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.slate400, marginBottom: 8 }}>Months 3–12</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.white }}>$6,000<span style={{ fontSize: '0.875rem', color: colors.slate500 }}>/mo</span></div>
                <div style={{ fontSize: 12, color: colors.slate400, marginTop: 8 }}>Fully autonomous. ROI proven on dashboard.</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 20, borderTop: `1px solid ${colors.slate700}` }}>
              <div style={{ fontSize: 14, color: colors.slate400 }}>Year 1 Total Commitment</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.green400 }}>$63,000</div>
            </div>
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
          <p style={{ color: colors.slate600, lineHeight: 1.6, margin: '0 0 1.5rem' }}>
            Four steps. Zero disruption to your active projects.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: '2rem', flexWrap: 'wrap' }}>
            {[
              { step: '01', label: 'Audit', desc: 'Workflow Mapping' },
              { step: '02', label: 'Setup', desc: 'Node Deployment' },
              { step: '03', label: 'Build', desc: 'Custom Rails (Vertex AI → your data)' },
              { step: '04', label: 'Go-Live', desc: 'Production handoff' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 140, padding: '16px 20px', borderRadius: 12, backgroundColor: colors.slate900, border: `1px solid ${colors.slate700}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.sky500, marginBottom: 4 }}>{s.step} / {s.label}</div>
                <div style={{ fontSize: 13, color: colors.slate400 }}>{s.desc}</div>
              </div>
            ))}
          </div>
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

        {/* §8 Service Agreement Terms */}
        <section style={{ borderTop: `1px solid ${colors.slate200}`, paddingTop: 48 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.slate900, margin: '0 0 24px' }}>Service Agreement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { title: 'Contract Type', desc: 'Standard SaaS vendor agreement. 12-month term, auto-renewing with 90-day notice. No equity, no cap table complexity.' },
              { title: 'Implementation', desc: 'Month 1 is free. If the system does not map to your business, you know before you ever pay full price.' },
              { title: 'Data Ownership', desc: 'Your data stays yours. Period. Scan2Plan/Twinner retains 100% ownership of all business data. HDX retains platform IP.' },
              { title: 'Compute Transparency', desc: 'Google Cloud and RFI storage costs passed through at wholesale. Zero markup. We make money on the software, not by taxing your data.' },
              { title: 'SLA & Uptime', desc: '99.5% uptime target. 24/7 synthetic monitoring. P1 incidents acknowledged within 2 hours.' },
              { title: 'Termination', desc: 'Upon termination, you receive a data export and a runtime license. Zero lock-in. Zero hostage data.' },
            ].map((t, i) => (
              <div key={i} style={{ padding: 20, borderRadius: 16, backgroundColor: colors.white, border: `1px solid ${colors.slate200}` }}>
                <div style={{ fontWeight: 700, color: colors.slate900, marginBottom: 8 }}>{t.title}</div>
                <div style={{ fontSize: 14, color: colors.slate600, lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </section>
        {/* §9 Next Steps */}
        <section style={{ background: `linear-gradient(135deg, ${colors.slate950}, ${colors.slate900})`, borderRadius: 24, padding: 'clamp(32px, 5vw, 48px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, backgroundColor: 'rgba(14,165,233,0.1)', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: colors.white, margin: '0 0 12px' }}>Ready to Deploy?</h2>
            <p style={{ fontSize: '1.1rem', color: colors.slate400, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
              30 days from contract to live platform. Your data stays sovereign. Your margin stays local.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:chase@hillbillydreamsinc.com?subject=S2PX%20Deployment%20—%20Let's%20Go" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', backgroundColor: colors.sky600, color: colors.white, fontWeight: 700, borderRadius: 12, textDecoration: 'none', fontSize: 16 }}>
                Initiate HDX Deployment <ChevronRight size={18} />
              </a>
              <a href="/hillbilly/directory-pitch" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', backgroundColor: 'transparent', color: colors.slate300, fontWeight: 600, borderRadius: 12, textDecoration: 'none', fontSize: 16, border: `1px solid ${colors.slate700}` }}>
                See it Live in the Directory
              </a>
            </div>
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
