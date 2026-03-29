import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Architecture — From DeFacto Codec Market to Main Street',
  description: 'The original 2022 blueprint for a complete media production-to-distribution pipeline, and how it became a platform any small town can deploy.',
};

export default function ArchitecturePage() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: '#0f0f0d', color: '#e8e0d4', fontFamily: "'Inter', system-ui, sans-serif" }}>
        {/* Hero */}
        <section style={{
          padding: 'clamp(3rem, 8vw, 6rem) 2rem',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', marginBottom: '1.5rem' }}>
            The Origin
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 1.5rem' }}>
            From DeFacto Codec Market<br />to Main Street
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#8a8074', lineHeight: 1.6, maxWidth: 650, margin: '0 auto 2rem' }}>
            In 2022, Chase designed a complete media production-to-distribution pipeline. Global media infrastructure — broadcast, production, analytics, distribution — built on open source tools. He realized the same architecture that runs a Viacom can run a small-town media economy.
          </p>
        </section>

        {/* The Original Drawing */}
        <section style={{
          maxWidth: 1100,
          margin: '0 auto 3rem',
          padding: '0 2rem',
        }}>
          <div style={{
            background: '#1a1816',
            border: '1px solid #2a2520',
            borderRadius: 12,
            padding: '2rem',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6a6560', marginBottom: '1rem' }}>
              The Original Blueprint — 2022
            </p>
            {/* PDF embedded as an object — falls back to link */}
            <object
              data="/docs/defacto-codec-market-concept.pdf"
              type="application/pdf"
              style={{ width: '100%', height: 600, borderRadius: 8, border: '1px solid #2a2520' }}
            >
              <p style={{ color: '#8a8074', padding: '2rem' }}>
                <a href="/docs/defacto-codec-market-concept.pdf" style={{ color: '#c8943e' }} target="_blank" rel="noopener noreferrer">
                  View the DeFacto Codec Market Blueprint (PDF)
                </a>
              </p>
            </object>
            <p style={{ fontSize: '0.75rem', color: '#5a5550', marginTop: '1rem', fontStyle: 'italic' }}>
              &ldquo;Chase&apos;s theory of everything. Talk amongst yourselves... or with me on DayTimeTV!&rdquo;
            </p>
          </div>
        </section>

        {/* Then vs Now */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem 4rem' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8943e', marginBottom: '1.5rem' }}>
            Then vs Now
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { then: 'OpenBroadcaster (P2P broadcast)', now: 'OpenBroadcaster (local radio, 18 shows)', status: 'Same software, 4 years later' },
              { then: 'Codec Market (cloud transcoding)', now: 'Vertex AI (image, video, audio generation)', status: 'Transcoding → Generation' },
              { then: 'deFacto Global (AI analytics)', now: 'Multi-model AI routing (Gemini + Claude + Perplexity)', status: 'Evolved' },
              { then: 'ART-Chive (blockchain DAM)', now: 'GCS + Media Vault + hot folder sync', status: 'Blockchain → Cloud' },
              { then: 'Media Production & Programming', now: 'Content Studio (one input → 5 channels)', status: 'Automated' },
              { then: 'Distribution Endpoints (Smart TVs)', now: 'Plex in-room TV + web radio + streaming', status: 'Deployed' },
              { then: 'Audience Data (Nielsen)', now: 'First-party analytics + review monitoring', status: 'Owned data' },
              { then: 'NFT making machine', now: 'Photography storefront + Stripe Connect', status: 'NFTs → Real payments' },
              { then: 'mansplaination.tv / DayTimeTV', now: 'Big Muddy Magazine + Radio + Entertainment', status: 'Rebranded' },
            ].map(row => (
              <div key={row.then} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr auto',
                gap: '1rem', alignItems: 'center',
                padding: '0.75rem 1rem', background: '#1a1816',
                borderRadius: 8, border: '1px solid #2a2520',
              }}>
                <span style={{ fontSize: '0.8rem', color: '#6a6560' }}>{row.then}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e8e0d4' }}>{row.now}</span>
                <span style={{ fontSize: '0.65rem', color: '#c8943e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The Punchline */}
        <section style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          borderTop: '1px solid #2a2520',
          maxWidth: 600,
          margin: '0 auto',
        }}>
          <p style={{ fontSize: '1.1rem', color: '#c8943e', fontStyle: 'italic', lineHeight: 1.6 }}>
            &ldquo;The plan was right. The market was wrong. We fixed the market.&rdquo;
          </p>
          <p style={{ fontSize: '0.8rem', color: '#5a5550', marginTop: '1rem' }}>
            Now running in Natchez, MS. Deploying to Woodstock, NY. Any town is next.
          </p>
        </section>
      </div>
    </>
  );
}
