import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Arrie Aslin — booking, press, mailing list, fan mail.',
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          margin: '0 0 0.5rem',
        }}
      >
        Contact
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          marginBottom: '3rem',
        }}
      >
        Booking · Press · Mailing list
      </p>

      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          marginBottom: '4rem',
        }}
      >
        <Card
          label="Booking"
          email="booking@arrieaslin.com"
          note="Venues, festivals, private events. Routes to Tracy until staffed."
        />
        <Card
          label="Press"
          email="booking@arrieaslin.com"
          note="Interviews, features, EPK requests."
        />
        <Card
          label="Fan mail"
          email="hello@arrieaslin.com"
          note="Read when on the road. Replies are slow but real."
        />
      </div>

      <section style={{ borderTop: '1px solid rgba(241, 240, 236, 0.12)', paddingTop: '2.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          Mailing list
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Show announcements, new release notes, residency updates. About one email a month.
          We do not sell the list.
        </p>
        <form
          action="/api/inquiries"
          method="post"
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <input type="hidden" name="source" value="arrieaslin.com/contact" />
          <input type="hidden" name="kind" value="mailing-list" />
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            aria-label="Email address"
            style={{
              flex: '1 1 240px',
              padding: '0.85rem 1rem',
              background: 'transparent',
              border: '1px solid rgba(241, 240, 236, 0.3)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.85rem 1.75rem',
              background: 'var(--accent)',
              color: 'var(--text)',
              border: 'none',
              fontSize: '0.85rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}

function Card({ label, email, note }: { label: string; email: string; note: string }) {
  return (
    <div
      style={{
        padding: '1.5rem',
        border: '1px solid rgba(241, 240, 236, 0.18)',
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent-warm)',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </div>
      <a
        href={`mailto:${email}`}
        style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '1.05rem' }}
      >
        {email}
      </a>
      <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{note}</p>
    </div>
  );
}
