import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', marginBottom: '1.5rem',
      }}>
        &#10003;
      </div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
        Thank you for your purchase
      </h1>
      <p style={{ fontSize: '1rem', color: '#666', maxWidth: 400, lineHeight: 1.6, marginBottom: '2rem' }}>
        Your order has been received. The artist will prepare your print and you&apos;ll receive shipping details via email.
      </p>
      <Link
        href="/gallery"
        style={{
          padding: '12px 24px',
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
        }}
      >
        Continue Browsing
      </Link>
    </div>
  );
}
