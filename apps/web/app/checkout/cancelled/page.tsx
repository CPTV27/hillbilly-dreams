// apps/web/app/checkout/cancelled/page.tsx
// Post-Stripe-cancel page. Stripe redirects here if the customer backs out
// of checkout. No charge was made; no account created.

import Link from 'next/link';

export const metadata = {
  title: 'Checkout cancelled',
  description: 'No charge was made. You can pick up where you left off any time.',
};

export default function CheckoutCancelledPage() {
  return (
    <div
      style={{
        padding: '80px 24px',
        maxWidth: '640px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '28px', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
        Checkout cancelled.
      </h1>

      <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 32px' }}>
        No charge was made. If you weren&rsquo;t sure about something, reach out and we&rsquo;ll answer your questions directly.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/pricing"
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
          Back to pricing
        </Link>
        <a
          href="mailto:billing@bigmuddyinn.com"
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
          Email us
        </a>
      </div>
    </div>
  );
}
