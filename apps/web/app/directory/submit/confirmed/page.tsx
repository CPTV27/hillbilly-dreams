'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmedContent() {
  const params = useSearchParams();
  const businessName = params.get('name') ?? 'Your business';
  const spotlight = params.get('spotlight');

  return (
    <main style={{ background: 'var(--bg, #0a0a0a)', color: 'var(--fg, #f5f0eb)', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Eyebrow */}
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
          Deep South Directory
        </p>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
          You&rsquo;re in the network.
        </h1>

        <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, marginBottom: 48 }}>
          <strong style={{ color: 'var(--fg, #f5f0eb)' }}>{businessName}</strong> has been submitted.
          Our team will review your listing and activate it within 1–2 business days.
          You&rsquo;ll hear from us at the email you provided.
        </p>

        {/* AI Spotlight Preview */}
        {spotlight && (
          <section style={{
            borderTop: '1px solid #222',
            paddingTop: 40,
            marginBottom: 48,
          }}>
            <p style={{ color: 'var(--accent, #c8943e)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              Your Editorial Spotlight
            </p>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
              First draft — generated from your submission
            </h2>
            <p style={{ color: '#ccc', fontSize: 15, lineHeight: 1.8, fontStyle: 'italic', borderLeft: '3px solid var(--accent, #c8943e)', paddingLeft: 20 }}>
              {spotlight}
            </p>
            <p style={{ color: '#666', fontSize: 13, marginTop: 16 }}>
              This spotlight publishes automatically when your listing activates at the Main Street tier ($99/mo) or above.
            </p>
          </section>
        )}

        {/* What happens next */}
        <section style={{ borderTop: '1px solid #222', paddingTop: 40, marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>What happens next</h2>
          <ol style={{ paddingLeft: 20, color: '#aaa', lineHeight: 2, fontSize: 15 }}>
            <li>We review your submission and activate your free listing.</li>
            <li>You receive a claim link to manage your profile.</li>
            <li>Your business appears in the Deep South Directory.</li>
            <li>Optional: upgrade to Main Street ($99/mo) to publish your spotlight and get found by travelers, buyers, and the regional press.</li>
          </ol>
        </section>

        {/* Ecosystem upsell */}
        <section style={{
          background: '#111',
          border: '1px solid #222',
          borderRadius: 8,
          padding: 32,
          marginBottom: 48,
        }}>
          <p style={{ color: 'var(--accent, #c8943e)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            Part of the Big Muddy Ecosystem
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#ccc', marginBottom: 16 }}>
            The Directory plugs you into the full Big Muddy machine — Magazine features, Radio mentions,
            event tie-ins, and a real audience of travelers and locals already coming to the region.
          </p>
          <a
            href={`mailto:listings@hillbillydreamsinc.com?subject=Upgrade inquiry from ${encodeURIComponent(businessName)}`}
            style={{ color: 'var(--accent, #c8943e)', fontSize: 14, textDecoration: 'none' }}
          >
            Ask about the full ecosystem →
          </a>
        </section>

        {/* Back to directory */}
        <a
          href="/directory"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            border: '1px solid #333',
            borderRadius: 4,
            color: 'var(--fg, #f5f0eb)',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          ← Back to the Directory
        </a>
      </div>
    </main>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
      <ConfirmedContent />
    </Suspense>
  );
}
