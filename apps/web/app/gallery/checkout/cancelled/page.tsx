import Link from 'next/link';

export default function CheckoutCancelledPage() {
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
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
        Checkout cancelled
      </h1>
      <p style={{ fontSize: '1rem', color: '#666', maxWidth: 400, lineHeight: 1.6, marginBottom: '2rem' }}>
        No worries — nothing was charged. The artwork is still available if you change your mind.
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
        Back to Gallery
      </Link>
    </div>
  );
}
