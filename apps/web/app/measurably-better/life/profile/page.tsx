// apps/web/app/measurably-better/life/profile/page.tsx
// Profile — your community identity

export default function ProfilePage() {
  return (
    <>
      <section style={{ marginBottom: 20 }}>
        <h1 style={{
          fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
          fontWeight: 800,
          color: 'var(--text, #e8e0d4)',
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
        }}>
          Your Profile
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          Skills, exchanges, and contributor credits.
        </p>
      </section>

      <div style={{
        background: 'var(--surface, #1a1816)',
        border: '1px solid var(--border, #2a2520)',
        borderRadius: 12,
        padding: '24px 20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted, #8a8074)',
          margin: '0 0 16px',
        }}>
          Sign in with Apple or Google to create your community profile.
        </p>
        <a
          href="/admin/login"
          style={{
            display: 'inline-block',
            background: 'var(--accent, #c8943e)',
            color: '#0a0a0a',
            padding: '10px 24px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          Sign In
        </a>
      </div>
    </>
  );
}
