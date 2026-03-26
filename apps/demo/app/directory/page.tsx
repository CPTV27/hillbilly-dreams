// Deep South Directory — landing page
// Server component. The neighborly front door.
// Target: Main Street business owner seeing this on Chase's phone.

import Nav from '../components/Nav';

const C = {
  bg: '#FAFAF8',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  accent: '#B45309',
  border: '#E5E5E0',
};

const VALUE_PROPS = [
  {
    icon: '📷',
    title: 'Take a photo. It handles the rest.',
    body: 'Snap a photo of anything — your lunch special, your storefront, an event. It posts to Instagram, Facebook, your website, your newsletter, and your Google listing. Automatically.',
  },
  {
    icon: '📊',
    title: 'Your number. Every morning. One text.',
    body: "Connect QuickBooks and it watches your numbers for you. Every morning, one text: your revenue, one insight, and the one thing that needs a human decision today.",
  },
  {
    icon: '🗺️',
    title: 'Show up when travelers search your town',
    body: 'Your listing goes live on DeepSouthDirectory.com — the corridor from Memphis to New Orleans and 14 cities in between. Chambers and CVBs can bundle directory access with membership so every member gets a free dashboard.',
  },
];

export default function DirectoryLanding() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
        color: C.text,
      }}
    >
      <Nav currentPath="/directory" />
      <style>{`
        .dsd-cta-btn {
          display: inline-block;
          background-color: #B45309;
          color: #FFFFFF;
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 18px;
          padding: 16px 36px;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background-color 0.15s ease;
        }
        .dsd-cta-btn:hover {
          background-color: #92400E;
        }
        .dsd-signin-link {
          color: #B45309;
          text-decoration: none;
          font-weight: 500;
        }
        .dsd-signin-link:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Nav strip */}
      <div
        style={{
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: C.white,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-abril), serif',
            fontSize: 20,
            color: C.text,
            fontWeight: 400,
          }}
        >
          Deep South Directory
        </span>
        <a href="/directory/join" className="dsd-signin-link" style={{ fontSize: 14 }}>
          Sign in
        </a>
      </div>

      {/* Hero */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 96px) 24px 0',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-abril), serif',
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: C.text,
            margin: '0 0 24px',
          }}
        >
          Every business on Main Street.<br />
          One place to find them.
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: C.textSecondary,
            lineHeight: 1.7,
            margin: '0 auto 16px',
            maxWidth: 580,
          }}
        >
          Three minutes. That&apos;s it. Claim your free listing and get a
          dashboard that does all the cool stuff you don&apos;t know how to do.
        </p>
        <p
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            color: C.textSecondary,
            lineHeight: 1.7,
            margin: '0 auto 40px',
            maxWidth: 520,
            opacity: 0.85,
          }}
        >
          Take a photo. It handles your marketing, your reviews, your social
          media. $20/mo.
        </p>

        <img
          src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-bluff-sunset.webp"
          alt="Natchez bluff at sunset — the Mississippi River corridor"
          style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 12, marginBottom: 40 }}
        />

        <a href="/directory/join" className="dsd-cta-btn">
          Join the Directory — Free
        </a>

        <p style={{ fontSize: 14, color: C.textMuted, marginTop: 16 }}>
          Already a member?{' '}
          <a href="/directory/join" className="dsd-signin-link">
            Sign in
          </a>
        </p>
      </div>

      {/* Value props */}
      <div
        style={{
          maxWidth: 1040,
          margin: '72px auto 0',
          padding: '0 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {VALUE_PROPS.map((vp) => (
          <div
            key={vp.title}
            style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '28px 24px',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 14 }}>{vp.icon}</div>
            <h3
              style={{
                fontFamily: 'var(--font-abril), serif',
                fontSize: 20,
                fontWeight: 400,
                color: C.text,
                margin: '0 0 10px',
                lineHeight: 1.25,
              }}
            >
              {vp.title}
            </h3>
            <p
              style={{
                fontSize: 15,
                color: C.textSecondary,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {vp.body}
            </p>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: '20px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
          A product of Measurably Better &middot; Natchez, Mississippi
        </p>
      </div>
    </div>
  );
}
