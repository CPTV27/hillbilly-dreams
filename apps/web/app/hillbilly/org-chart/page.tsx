import type { Metadata } from 'next';
import Link from 'next/link';
import { TENANTS } from '@/config/tenants';

export const metadata: Metadata = {
  title: 'Organizational Chart | Hillbilly Dreams Inc.',
  description: 'Visual org chart for Hillbilly Dreams, brands, and partner companies.',
};

export default function OrgChartPage() {
  return (
    <main
      style={{
        backgroundColor: '#0f0f0d',
        color: '#f9fafb',
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        padding: 'clamp(1.25rem, 4vw, 4rem) clamp(1rem, 4vw, 2rem)',
      }}
    >
      <style>{`
        @media print {
          body, main { background-color: white !important; color: black !important; }
          .card { border-color: #ccc !important; color: black !important; background-color: #fafafa !important;}
          .accent { color: #000 !important; font-weight: bold; }
          .subtext { color: #555 !important; }
        }
        .tree-line {
          width: 2px;
          height: 30px;
          background-color: #c8943e;
          margin: 0 auto;
        }
        .tree-fork {
          border-top: 2px solid #c8943e;
          width: 80%;
          margin: 0 auto;
          position: relative;
        }
        .tree-fork::before, .tree-fork::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 20px;
          background-color: #c8943e;
          top: 0;
        }
        .tree-fork::before { left: 0; }
        .tree-fork::after { right: 0; }
        .card {
          background-color: #1a1a18;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 1.5rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        a.card:hover {
          transform: translateY(-2px);
          border-color: #c8943e;
          cursor: pointer;
        }
        .tag {
          background-color: #2a2a26;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.8rem;
          display: inline-block;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }
        @media (max-width: 480px) {
          .card { min-height: 44px; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <Link
            href="/hillbilly"
            style={{
              color: '#c8943e',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 44,
            }}
          >
            ← Hillbilly Dreams Inc.
          </Link>
        </div>
        
        {/* HOLDING COMPANY */}
        <div style={{ display: 'inline-block', textAlign: 'center', marginBottom: '1rem' }}>
          <h1
            className="accent"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#c8943e',
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}
          >
            Hillbilly Dreams Inc.
          </h1>
          <p className="subtext" style={{ color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
            Holding Company
          </p>
        </div>

        {/* C-SUITE CARDS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div className="card" style={{ minWidth: '280px', maxWidth: '350px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Chase Pierson</h3>
            <p className="accent" style={{ color: '#c8943e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>CEO, CTO, Showrunner</p>
            <a href="mailto:me@chasepierson.tv" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.85rem' }}>me@chasepierson.tv</a>
          </div>
          <div className="card" style={{ minWidth: '280px', maxWidth: '350px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Tracy Alderson-Allen</h3>
            <p className="accent" style={{ color: '#c8943e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Finance & Inn Ops</p>
            <span className="tag">Equity Partner</span>
          </div>
          <div className="card" style={{ minWidth: '280px', maxWidth: '350px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Amy Allen</h3>
            <p className="accent" style={{ color: '#c8943e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Inn & Bar Ops</p>
            <span className="tag">Equity Partner</span>
          </div>
        </div>

        <div className="tree-line" style={{ marginTop: '3rem' }}></div>
        <div className="tree-fork" style={{ width: '90%', borderColor: '#333' }}></div>

        {/* DEPARTMENTS LAYER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '2rem' }}>
          
          {/* COLUMN 1: Wholly Owned Brands */}
          <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
            <h2 className="accent" style={{ fontFamily: "'Playfair Display', serif", color: '#c8943e', fontSize: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              Brands
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Deep South Directory', desc: 'business marketing platform', url: 'https://deepsouthdirectory.com' },
                { name: 'Big Muddy Touring', desc: 'touring circuit + the Inn', url: 'https://bigmuddytouring.com' },
                { name: 'Big Muddy Magazine', desc: 'editorial publication', url: 'https://bigmuddymagazine.com' },
                { name: 'Big Muddy Radio', desc: 'streaming radio', url: 'https://bigmuddyradio.com' },
                { name: 'Big Muddy Entertainment', desc: 'record label + promoter', url: 'https://bigmuddyentertainment.com' },
                { name: 'Big Muddy Records', desc: 'independent label', url: 'https://bigmuddyrecordlabel.com' },
                { name: 'Outsider Economics', desc: 'field manual', url: 'https://outsidereconomics.com' },
                {
                  name: 'Chase Pierson Photography / Venture Gallery',
                  desc: 'portfolio + gallery',
                  url: 'https://buycurious.art',
                },
              ].map(brand => (
                brand.url ? (
                  <a key={brand.name} href={brand.url} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none' }}>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff', marginBottom: '0.4rem' }}>{brand.name}</div>
                    <div className="subtext" style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.4 }}>{brand.desc}</div>
                  </a>
                ) : null
              ))}
            </div>
          </div>

          {/* COLUMN 2: Partners, Tech & Regional */}
          <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
            
            <h2 className="accent" style={{ fontFamily: "'Playfair Display', serif", color: '#c8943e', fontSize: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              Partner Companies
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
              <div className="card">
                <div style={{ fontWeight: 600, fontSize: '1.15rem', color: '#fff', marginBottom: '0.2rem' }}>Studio C Video</div>
                <div className="subtext" style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.6rem' }}>video department at Utopia Studios, Bearsville NY</div>
                <div style={{ marginBottom: '0.8rem', fontSize: '0.8rem', color: '#c8943e', fontStyle: 'italic' }}>Serves ALL HDI brands</div>
                <div>
                  <span className="tag">Chase 40%</span>
                  <span className="tag">Elijah Tuttle 30%</span>
                  <span className="tag">Miles 30%</span>
                </div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 600, fontSize: '1.15rem', color: '#fff', marginBottom: '0.2rem' }}>Tuthill Design</div>
                <div className="subtext" style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.6rem' }}>media services for realtors, architects, designers</div>
                <div>
                  <span className="tag">Chase 50%</span>
                  <span className="tag">Elijah Tuttle 50%</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <h2 className="accent" style={{ fontFamily: "'Playfair Display', serif", color: '#c8943e', fontSize: '1.3rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Regional Instances
                </h2>
                <a href="https://bearsvillemediagroup.com" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff' }}>Bearsville Creative</div>
                  <div className="subtext" style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.4rem' }}>Northeast node (Woodstock/Bearsville NY)</div>
                </a>
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 className="accent" style={{ fontFamily: "'Playfair Display', serif", color: '#c8943e', fontSize: '1.3rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Technology
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a
                    href="https://measurablybetter.life"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card"
                    style={{ borderColor: '#c8943e', textDecoration: 'none' }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#c8943e' }}>Measurably Better Things (MBT) ↗</div>
                    <div className="subtext" style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.4rem' }}>
                      The platform everything runs on — B2B only; not the walk-in pitch.
                    </div>
                  </a>
                  <div className="card">
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff' }}>Measurably Better Life</div>
                    <div className="subtext" style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.4rem' }}>non-branded individual version</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'left' }}>
          <h2
            className="accent"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#c8943e',
              fontSize: '1.35rem',
              borderBottom: '1px solid #333',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            Live tenant registry (from config)
          </h2>
          <p className="subtext" style={{ fontSize: '0.88rem', color: '#9ca3af', marginBottom: '1rem', lineHeight: 1.5 }}>
            Pulled from <code style={{ color: '#c8943e' }}>apps/web/config/tenants.ts</code> — updates when we ship a deploy.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {TENANTS.map((t) => (
              <div key={t.id} className="card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{t.name}</div>
                <div className="subtext" style={{ fontSize: '0.82rem', marginTop: 6 }}>
                  {t.entity} · {t.location.city}, {t.location.state}
                </div>
                <div className="subtext" style={{ fontSize: '0.8rem', marginTop: 8, lineHeight: 1.5 }}>
                  {t.domains.map((d, i) => (
                    <span key={d}>
                      {i > 0 ? ' · ' : ''}
                      <a href={`https://${d}`} style={{ color: '#c8943e' }} target="_blank" rel="noopener noreferrer">
                        {d}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="subtext" style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.85rem', lineHeight: 1.5 }}>
          We build local. The value stays local. We grow from within.
        </p>
      </div>
    </main>
  );
}
