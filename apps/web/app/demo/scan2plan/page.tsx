'use client';

import PasswordGate from './PasswordGate';
import { useState, useEffect } from 'react';

// Google Palette
const COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
  dark: '#202124',
  mid: '#5f6368',
  light: '#dadce0',
  white: '#ffffff',
  bg: '#f8f9fa'
};

const Section = ({ 
  children, 
  id, 
  alt = false, 
  full = false,
  title
}: { 
  children: React.ReactNode; 
  id: string; 
  alt?: boolean; 
  full?: boolean;
  title?: string;
}) => (
  <section 
    id={id} 
    style={{
      minHeight: full ? '100vh' : 'auto',
      padding: '80px 20px',
      backgroundColor: alt ? COLORS.bg : COLORS.white,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      borderBottom: `1px solid ${COLORS.light}`
    }}
  >
    <div style={{ maxWidth: 1000, width: '100%' }}>
      {title && (
        <h2 style={{ 
          fontSize: 32, fontWeight: 500, color: COLORS.dark, 
          marginBottom: 48, letterSpacing: '-0.02em',
          fontFamily: 'var(--font-outfit), sans-serif',
          borderLeft: `4px solid ${COLORS.blue}`,
          paddingLeft: 24
        }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

const Card = ({ label, value, sub, color = COLORS.blue }: any) => (
  <div style={{ 
    padding: '32px', border: `1px solid ${COLORS.light}`, 
    borderRadius: 8, backgroundColor: 'white', flex: 1,
    minWidth: 280, boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)'
  }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.mid, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>{label}</div>
    <div style={{ fontSize: 44, fontWeight: 500, color, fontFamily: 'var(--font-outfit), sans-serif', marginBottom: 8 }}>{value}</div>
    <div style={{ fontSize: 14, color: COLORS.mid, lineHeight: 1.5 }}>{sub}</div>
  </div>
);

const CheckItem = ({ children }: any) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
    <div style={{ color: COLORS.green, fontWeight: 700 }}>✓</div>
    <div style={{ fontSize: 16, color: COLORS.mid, lineHeight: 1.4 }}>{children}</div>
  </div>
);

export default function Scan2PlanDeck() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <PasswordGate>
      <main style={{ color: COLORS.dark }}>
        {/* FAB: PDF EXPORT */}
        <button 
          onClick={() => window.print()}
          className="no-print"
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 100,
            backgroundColor: COLORS.blue, color: 'white', border: 'none',
            borderRadius: 32, padding: '12px 24px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <span>Get PDF</span>
          <span style={{ fontSize: 18 }}>↓</span>
        </button>

        <style jsx global>{`
          @media print {
            .no-print { display: none !important; }
            section { page-break-after: always; padding: 40px 0 !important; }
            body { background: white !important; }
            h2 { border-left: 2px solid #4285F4 !important; padding-left: 12px !important; margin-bottom: 24px !important; }
          }
          ::selection { background: #4285F4; color: white; }
          nav { position: sticky; top: 0; background: white; z-index: 1000; border-bottom: 1px solid #dadce0; }
        `}</style>

        {/* 1. TITLE SLIDE */}
        <Section id="slide-1" full alt>
          <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ 
              fontSize: 14, fontWeight: 600, color: COLORS.blue, 
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
              letterSpacing: '0.1em', textTransform: 'uppercase'
            }}>
              <span style={{ padding: '4px 8px', border: `1px solid ${COLORS.blue}`, borderRadius: 4 }}>S2PX</span>
              <span>Partner Preview</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 500, color: COLORS.dark, 
              lineHeight: 1, letterSpacing: '-0.04em',
              fontFamily: 'var(--font-outfit), sans-serif', margin: '0 0 24px'
            }}>
              The Scan2Plan<br/>
              <span style={{ color: COLORS.blue }}>Operating System</span>
            </h1>
            <p style={{ 
              fontSize: 22, color: COLORS.mid, maxWidth: 600, 
              lineHeight: 1.5, margin: '0 0 48px' 
            }}>
              A complete business infrastructure for 3D scanning firms. 
              Built on Google Cloud. Powered by Gemini.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png" 
                   alt="Google Cloud" style={{ height: 24, opacity: 0.8 }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gemini_logo.svg" 
                   alt="Gemini AI" style={{ height: 24, opacity: 0.8 }} />
            </div>
          </div>
          
          <div style={{ 
            padding: '24px', border: `1px solid ${COLORS.yellow}`, 
            backgroundColor: '#FFFBCC', borderRadius: 8, fontSize: 14, lineHeight: 1.6,
            color: '#665c00'
          }}>
            <strong>Meta Note:</strong> This preview is served directly from the S2PX Cloud Engine. 
            The page you are reading was built, hosted, and secured by the same infrastructure 
            proposed for your operation.
          </div>
        </Section>

        {/* 2. PLATFORM AT A GLANCE */}
        <Section id="slide-2" title="Platform at a Glance" alt>
          <p style={{ fontSize: 20, color: COLORS.mid, marginBottom: 48 }}>
            A complete business operating system for 3D scanning and digital twin companies.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <Card label="Module 1: Ops" value="Direct QBO Sync" 
                  sub="Dashboard, project tracking, and capacity forecasting mapped directly to your P&L." />
            <Card label="Module 2: Intelligence" value="7 AI Agents" 
                  sub="Automated scoping, pricing, and 24/7 technical oversight powered by Vertex AI." 
                  color={COLORS.green} />
            <Card label="Module 3: Growth" value="Lead Engine" 
                  sub="Precision outreach, case study automation, and full attribution tracking." 
                  color={COLORS.red} />
          </div>
        </Section>

        {/* 3. BUILT ON GOOGLE CLOUD */}
        <Section id="slide-3" title="Built on Google Cloud">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 48 }}>
            {[
              { t: 'Cloud Run', d: 'High-availability compute for every project portal.' },
              { t: 'Cloud SQL', d: 'PostgreSQL architecture with 90+ battle-tested tables.' },
              { t: 'Cloud Storage', d: 'Proprietary 4-bucket protocol for high-density scan data.' },
              { t: 'Gemini 1.5 Pro', d: 'Multi-modal AI for video analysis and estimation.' },
              { t: 'Firebase Auth', d: 'Enterprise-grade identity management (Google OAuth).' },
              { t: 'Workspace SDK', d: 'Direct integration with Gmail, Drive, and Sheets.' }
            ].map(s => (
              <div key={s.t} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 4, height: 40, backgroundColor: COLORS.blue, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{s.t}</div>
                  <div style={{ fontSize: 14, color: COLORS.mid }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 18, color: COLORS.mid, padding: '24px', background: COLORS.bg, borderRadius: 8, textAlign: 'center' }}>
            "Enterprise infrastructure. No servers to manage. No IT department required."
          </p>
        </Section>

        {/* 4. THE PROBLEM */}
        <Section id="slide-4" title="The Efficiency Leak" alt>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div style={{ flex: 1, minWidth: 280, padding: '32px', background: 'white', borderRadius: 8 }}>
              <div style={{ fontSize: 64, fontWeight: 500, color: COLORS.red, fontFamily: 'var(--font-outfit)' }}>$343K</div>
              <div style={{ fontWeight: 600, borderTop: `1px solid ${COLORS.light}`, paddingTop: 16 }}>Annual Scoping Overhead</div>
              <p style={{ fontSize: 14, color: COLORS.mid, marginTop: 8 }}>Based on 858 estimates/year at $400 avg scoping cost.</p>
            </div>
            <div style={{ flex: 1, minWidth: 280, padding: '32px', background: COLORS.dark, borderRadius: 8, color: 'white' }}>
              <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 16 }}>The Cost of a Site Visit</div>
              <ul style={{ paddingLeft: 20, fontSize: 16, lineHeight: 2, color: '#e8eaed' }}>
                <li>Travel: $150–$250</li>
                <li>Senior Labor: $300–$500</li>
                <li>Quote Assembly: 90 minutes</li>
              </ul>
            </div>
          </div>
          <h3 style={{ fontSize: 28, textAlign: 'center', color: COLORS.blue }}>"What if the customer did the site visit for you?"</h3>
        </Section>

        {/* 5. AI VIDEO SCOPING */}
        <Section id="slide-5" title="The Efficiency Dividend: AI Scoping">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48, overflowX: 'auto', paddingBottom: 24 }}>
            {[
              { s: 'Capture', d: 'User shoots phone walkthrough' },
              { s: 'Analyze', d: 'Vertex AI extracts spatial data' },
              { s: 'Structure', d: 'Material, sqft, and hazard log' },
              { s: 'Quote', d: 'Structured estimate in 180 seconds' }
            ].map((step, i) => (
              <div key={i} style={{ flexShrink: 0, width: 200, textAlign: 'center' }}>
                <div style={{ 
                  width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.blue, 
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  margin: '0 auto 16px', fontWeight: 700 
                }}>
                  {i+1}
                </div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{step.s}</div>
                <div style={{ fontSize: 13, color: COLORS.mid }}>{step.d}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: COLORS.mid, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Powered by Gemini 1.5 Pro Vision
          </div>
        </Section>

        {/* 6. THE MATH */}
        <Section id="slide-6" title="Unit Economics Comparison" alt>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: COLORS.dark, color: 'white' }}>
                <th style={{ padding: '24px', textAlign: 'left' }}>Method</th>
                <th style={{ padding: '24px', textAlign: 'left' }}>Customer Pays</th>
                <th style={{ padding: '24px', textAlign: 'left' }}>Your Margin</th>
                <th style={{ padding: '24px', textAlign: 'left' }}>Time Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '24px', borderBottom: `1px solid ${COLORS.light}` }}>Manual site visit</td>
                <td style={{ padding: '24px', borderBottom: `1px solid ${COLORS.light}` }}>~$500</td>
                <td style={{ padding: '24px', borderBottom: `1px solid ${COLORS.light}`, fontWeight: 600 }}>~$100</td>
                <td style={{ padding: '24px', borderBottom: `1px solid ${COLORS.light}` }}>4–8 hours</td>
              </tr>
              <tr style={{ backgroundColor: '#fdf9ff' }}>
                <td style={{ padding: '24px' }}><strong>AI video scoping</strong></td>
                <td style={{ padding: '24px' }}>$100 Tech Fee</td>
                <td style={{ padding: '24px', fontWeight: 600, color: COLORS.blue }}>$50 Pure Profit</td>
                <td style={{ padding: '24px' }}>15 minutes</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 32, fontSize: 18, color: COLORS.mid, textAlign: 'center' }}>
            "Customer saves $400. You save a day. The tool pays for itself on project one."
          </p>
        </Section>

        {/* 7. MODULE 1: CORE OPS */}
        <Section id="slide-7" title="Module 1: Core Ops Node">
          <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 24 }}>Institutional Replacement</div>
              <p style={{ fontSize: 16, color: COLORS.mid, marginBottom: 32 }}>
                The Ops Node is designed to replace or optimize part-time office management through automated data integrity.
              </p>
              <CheckItem>Real-time QBO P&L Dashboard</CheckItem>
              <CheckItem>End-to-end project tracking pipeline</CheckItem>
              <CheckItem>Capacity forecasting via backlog depth</CheckItem>
              <CheckItem>Unified multi-entity view (S2P + Twinner)</CheckItem>
            </div>
            <div style={{ 
              flex: 1, minWidth: 300, aspectRatio: '16/10', background: COLORS.bg, 
              border: `1px solid ${COLORS.light}`, borderRadius: 12, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 14, color: COLORS.mid
            }}>
              [CEO DASHBOARD PREVIEW]
            </div>
          </div>
        </Section>

        {/* 8. MODULE 2: GROWTH ENGINE */}
        <Section id="slide-8" title="Module 2: Growth Engine" alt>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
            {[
              { t: 'Gmail Outreach', d: 'Authenticated sequencers targeting high-propensity leads.' },
              { t: 'Case Study Autopilot', d: 'Project completion data converts to marketing assets automatically.' },
              { t: 'Local SEO / GBP', d: 'Deep optimization and review loops for regional dominance.' },
              { t: 'Full Attribution', d: 'Transparent lead tracking. No credit-taking for existing book.' }
            ].map(f => (
              <div key={f.t} style={{ padding: '24px', background: 'white', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, marginBottom: 12, color: COLORS.blue }}>{f.t}</div>
                <div style={{ fontSize: 14, color: COLORS.mid }}>{f.d}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '24px', background: COLORS.dark, color: 'white', borderRadius: 8, textAlign: 'center' }}>
            "We only claim credit for leads we generate. Your book is always yours."
          </div>
        </Section>

        {/* 9. MODULE 3: AI AGENTS */}
        <Section id="slide-9" title="Module 3: AI Agent Suite">
          <div style={{ columnCount: 2, columnGap: 48 }}>
            {[
              { n: 'Pricing Agent', d: 'Instant quote generation based on depth of data.' },
              { n: 'Operator Agent', d: 'Intelligent task routing and field tech logistics.' },
              { n: 'Photo Analysis', d: 'LOD verification and hazard spotting via computer vision.' },
              { n: 'Checklist Agent', d: 'Precision QA for field teams during data capture.' },
              { n: 'Audio-to-Scope', d: 'Transcription of field notes into structural scoping data.' },
              { n: 'Memory Agent', d: 'Institutional Knowledge Base with natural language Q&A.' },
              { n: 'Strategy Advisor', d: 'Weekly executive summaries from operational data.' }
            ].map(a => (
              <div key={a.n} style={{ breakInside: 'avoid', marginBottom: 32, borderLeft: `2px solid ${COLORS.green}`, paddingLeft: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{a.n}</div>
                <div style={{ fontSize: 14, color: COLORS.mid }}>{a.d}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* 10. THE CPQ */}
        <Section id="slide-10" title="The Configure-Price-Quote Engine" alt>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Card label="Scoping Data" value="135 Fields" sub="Deep multi-building, multi-discipline geocoding structure." />
            <Card label="Pricing Intelligence" value="15 Tables" sub="Proprietary unit rate engine for Revit, BIM, and Twin deliverables." />
            <Card label="Robustness" value="261 Tests" sub="Full-suite verification to ensure 0% pricing drift over time." />
          </div>
          <div style={{ marginTop: 32, fontSize: 16, color: COLORS.mid, textAlign: 'center' }}>
            "Battle-tested on 858 live estimates and $1.1M in revenue."
          </div>
        </Section>

        {/* 11. PRODUCTION PIPELINE */}
        <Section id="slide-11" title="Production Pipeline Tracking">
          <div style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            background: COLORS.bg, padding: '48px 24px', borderRadius: 12, overflowX: 'auto'
          }}>
            {['Lead', 'Estimate', 'Proposal', 'Sign', 'Schedule', 'Field', 'Process', 'Deliver', 'Invoice'].map((p, i) => (
              <>
                <div key={p} style={{ textAlign: 'center', minWidth: 80 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.mid }}>{p}</div>
                </div>
                {i < 8 && <div style={{ width: 40, height: 1, backgroundColor: COLORS.light }} />}
              </>
            ))}
          </div>
        </Section>

        {/* 12. SECURITY */}
        <Section id="slide-12" title="Security & Compliance" alt>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { t: 'Compliance', d: 'SOC 2 & ISO 27001 via Google infrastructure.' },
              { t: 'Isolation', d: 'Encrypted tenant isolation for S2P and Twinner.' },
              { t: 'Resilience', d: 'Automated point-in-time daily backups.' },
              { t: 'Access', d: 'Role-based control (RBAC) via Firebase Platform.' },
              { t: 'Encryption', d: 'AES-256 for all stored spatial and project data.' },
              { t: 'SLA', d: '99.9% uptime guaranteed via Google Cloud Run.' }
            ].map(s => (
              <div key={s.t}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14, color: COLORS.mid }}>{s.d}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* 13. TWINNER Expansion */}
        <Section id="slide-13" title="Strategic Leverage: Twinner">
          <p style={{ fontSize: 20, color: COLORS.mid, marginBottom: 32 }}>
            S2PX is built for multi-entity scale. Twinner isn't a separate app—it's a second node.
          </p>
          <ul style={{ fontSize: 16, lineHeight: 2 }}>
            <li>Every Scan2Plan project is a Twinner upsell opportunity.</li>
            <li>AI video scoping becomes a "Virtual Site Audit" for Twin-only leads.</li>
            <li>Shared overhead: One platform handles two brands.</li>
          </ul>
        </Section>

        {/* 14. PRICING */}
        <Section id="slide-14" title="Platform Pricing Model" alt>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
            {[
              { t: 'Starter', m: '$2,000', r: '8%', b: 'Testing phase' },
              { t: 'Standard', m: '$3,500', r: '5%', b: 'Growth phase' },
              { t: 'Flat Rate', m: '$5,000', r: '2%', b: 'Scale phase' }
            ].map(p => (
              <div key={p.t} style={{ 
                padding: '48px 32px', background: 'white', border: `1px solid ${COLORS.light}`, 
                borderRadius: 12, textAlign: 'center',
                boxShadow: p.t === 'Standard' ? `0 8px 32px ${COLORS.blue}20` : 'none',
                transform: p.t === 'Standard' ? 'scale(1.05)' : 'none',
                zIndex: p.t === 'Standard' ? 10 : 1
              }}>
                {p.t === 'Standard' && <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.blue, textTransform: 'uppercase', marginBottom: 12 }}>Most Balanced</div>}
                <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 24 }}>{p.t}</div>
                <div style={{ fontSize: 48, fontWeight: 600, marginBottom: 8, fontFamily: 'var(--font-outfit)' }}>{p.m}</div>
                <div style={{ fontSize: 14, color: COLORS.mid, marginBottom: 32 }}>+ {p.r} Rev Share</div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>Best for {p.b}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 14, color: COLORS.mid }}>
            "You choose the balance. Pay more cash, keep more margin. We grow when you grow."
          </p>
        </Section>

        {/* 15. THE RAMP */}
        <Section id="slide-15" title="Deployment Ramp">
          <div style={{ display: 'flex', gap: 2, background: COLORS.light, height: 160, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ flex: 1, background: COLORS.white, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600 }}>Month 1</div>
              <div style={{ fontSize: 24, color: COLORS.blue }}>$0 Fee</div>
              <div style={{ fontSize: 12, color: COLORS.mid }}>Integration Phase</div>
            </div>
            <div style={{ flex: 1, background: '#f8f9ff', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600 }}>Month 2</div>
              <div style={{ fontSize: 24, color: COLORS.blue }}>50% Rate</div>
              <div style={{ fontSize: 12, color: COLORS.mid }}>Live Testing</div>
            </div>
            <div style={{ flex: 2, background: COLORS.blue, color: 'white', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600 }}>Months 3–12</div>
              <div style={{ fontSize: 24 }}>Full Platform</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Scale Production</div>
            </div>
          </div>
        </Section>

        {/* 16. SCENARIOS */}
        <Section id="slide-16" title="Year 1 Forecast Examples" alt>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 48 }}>
            {[
              { t: 'Starter', total: '$21,000' },
              { t: 'Standard', total: '$36,750' },
              { t: 'Flat Rate', total: '$52,500' }
            ].map(s => (
              <div key={s.t}>
                <div style={{ fontSize: 13, color: COLORS.mid, marginBottom: 4 }}>Fixed Base</div>
                <div style={{ fontSize: 28, fontWeight: 500, fontFamily: 'var(--font-outfit)' }}>{s.total}</div>
                <div style={{ fontSize: 12, color: COLORS.mid }}>Plus rev share & project-fees</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '32px', border: `1px solid ${COLORS.green}`, backgroundColor: '#F6FFF8', borderRadius: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.dark, marginBottom: 12 }}>Breakeven Scenario</div>
            <p style={{ fontSize: 15, color: COLORS.mid, lineHeight: 1.6 }}>
              Scan2Plan currently spends <strong>$357,750/year</strong> on outside services and contractors. 
              The platform is designed to recover 30%+ of that margin. 
              Efficiency recovery alone creates a significant net gain even before rev share.
            </p>
          </div>
        </Section>

        {/* 17. INCLUDED */}
        <Section id="slide-17" title="Core Commitments">
          <div style={{ columnCount: 2, columnGap: 48 }}>
            {[
              'Continuous development & security updates',
              'Google Cloud managed architecture',
              '7 Gemini-tuned AI agents',
              'Real-time QuickBooks Sync',
              'Enterprise-grade RBAC/Security',
              'Multi-entity support by default',
              'Industry-standard Uptime SLA',
              '30-day notice walkaway policy'
            ].map(i => <CheckItem key={i}>{i}</CheckItem>)}
          </div>
        </Section>

        {/* 18. NEXT STEPS */}
        <Section id="slide-18" full alt>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ fontSize: 48, fontWeight: 500, marginBottom: 48, fontFamily: 'var(--font-outfit)' }}>
              Next Steps
            </h2>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 64, flexWrap: 'wrap' }}>
              {[
                { o: 'A', t: 'The Platform', d: 'Core Ops + AI Suite' },
                { o: 'B', t: 'Platform + Growth', d: 'The full revenue stack' },
                { o: 'C', t: 'Just the CPQ', d: 'Start with pricing tools' }
              ].map(opt => (
                <div key={opt.o} style={{ 
                  width: 280, padding: '40px 32px', background: 'white', 
                  borderRadius: 16, border: `1px solid ${COLORS.light}` 
                }}>
                  <div style={{ fontSize: 20, color: COLORS.blue, fontWeight: 600, marginBottom: 12 }}>Option {opt.o}</div>
                  <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 16 }}>{opt.t}</div>
                  <div style={{ fontSize: 14, color: COLORS.mid }}>{opt.d}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 20, color: COLORS.mid, marginBottom: 24 }}>
              "Tell us what makes sense. We'll get you set up."
            </p>
            <div style={{ fontSize: 24, fontWeight: 600 }}>Chase Pierson</div>
            <a href="mailto:chase@hillbillydreamsinc.com" style={{ 
              color: COLORS.blue, textDecoration: 'none', fontSize: 18, marginTop: 8, display: 'block' 
            }}>
              chase@hillbillydreamsinc.com
            </a>
          </div>
        </Section>

        {/* FOOTER */}
        <footer style={{ 
          padding: '48px 20px', backgroundColor: COLORS.dark, color: 'white', 
          textAlign: 'center', fontSize: 12, opacity: 0.8
        }}>
          © 2026 HILLBILLY DREAMS INC // POWERED BY GOOGLE CLOUD
        </footer>
      </main>
    </PasswordGate>
  );
}
