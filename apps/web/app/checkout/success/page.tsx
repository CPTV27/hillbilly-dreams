// apps/web/app/checkout/success/page.tsx
// Post-Stripe-checkout success page. Stripe redirects here after a
// successful payment. session_id query param is included by Stripe.

import Link from 'next/link';

export const metadata = {
  title: 'You\'re in — welcome',
  description: 'Your subscription is active.',
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id;

  return (
    <div
      style={{
        padding: '80px 24px',
        maxWidth: '640px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '48px',
          marginBottom: '24px',
          color: '#7fa86a',
        }}
      >
        ✓
      </div>

      <h1 style={{ fontSize: '32px', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
        You&rsquo;re in.
      </h1>

      <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '16px', lineHeight: 1.6, margin: '0 0 24px' }}>
        Your subscription is active. A confirmation email is on its way with your receipt and a link to manage your account.
      </p>

      <div
        style={{
          padding: '24px',
          background: 'var(--surface, #191715)',
          border: '1px solid var(--border, #2a2723)',
          borderRadius: '8px',
          margin: '0 0 32px',
          textAlign: 'left',
        }}
      >
        <h3 style={{ fontSize: '14px', margin: '0 0 12px', color: 'var(--text-muted, #6b6254)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          What happens next
        </h3>
        <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--text, #d8cfbe)', fontSize: '14px', lineHeight: 1.8 }}>
          <li>You&rsquo;ll get a welcome email within the hour from the team.</li>
          <li>Your dashboard is active — log in to see it.</li>
          <li>A team member reaches out within one business day to walk you through onboarding.</li>
          <li>Cancel anytime from <Link href="/account/subscriptions" style={{ color: 'var(--accent, #c8a676)' }}>your account</Link>.</li>
        </ol>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/account/subscriptions"
          style={{
            padding: '12px 24px',
            background: '#7fa86a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Go to my account
        </Link>
        <Link
          href="/"
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--text-muted, #a89e8d)',
            textDecoration: 'none',
            border: '1px solid var(--border, #2a2723)',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          Back to home
        </Link>
      </div>

      {sessionId && (
        <p
          style={{
            marginTop: '40px',
            color: 'var(--text-muted, #6b6254)',
            fontSize: '11px',
            fontFamily: 'monospace',
          }}
        >
          Reference: {sessionId.slice(0, 20)}…
        </p>
      )}
    </div>
  );
}
