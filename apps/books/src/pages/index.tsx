import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Outsider Economics"
      description="What happens when the economy works for the people who actually live here."
    >
      <div
        style={{
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3EFE9',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: 680, textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              color: '#111111',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Outsider Economics
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#555550',
              lineHeight: 1.7,
              marginBottom: 48,
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            What happens when the economy works for the people who actually live here.
          </p>

          <p
            style={{
              fontSize: 14,
              color: '#888883',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            By Chase Tuthill Pierson
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: 400,
              margin: '0 auto 48px',
            }}
          >
            <Link
              to="/volume-1/intro"
              style={{
                display: 'block',
                padding: '20px 24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D0C8',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#7B1B46',
                  marginBottom: 6,
                }}
              >
                Volume 1 &middot; Published
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Abril Fatface', serif",
                  fontSize: 20,
                  color: '#111111',
                  marginBottom: 6,
                }}
              >
                A Field Manual for Independent Economic Systems
              </span>
              <span style={{ fontSize: 14, color: '#888883' }}>
                The math. The theory. The $450,000 secret.
              </span>
            </Link>

            <Link
              to="/volume-2/intro"
              style={{
                display: 'block',
                padding: '20px 24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D0C8',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#7B1B46',
                  marginBottom: 6,
                }}
              >
                Volume 2 &middot; Read Free
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Abril Fatface', serif",
                  fontSize: 20,
                  color: '#111111',
                  marginBottom: 6,
                }}
              >
                The Implementation Playbook
              </span>
              <span style={{ fontSize: 14, color: '#888883' }}>
                Building community economic sovereignty in 90 days. 19 chapters.
              </span>
            </Link>

            <Link
              to="/volume-3/intro"
              style={{
                display: 'block',
                padding: '20px 24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D0C8',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#7B1B46',
                  marginBottom: 6,
                }}
              >
                Volume 3 &middot; Coming Soon
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Abril Fatface', serif",
                  fontSize: 20,
                  color: '#111111',
                  marginBottom: 6,
                }}
              >
                What Happens Next
              </span>
              <span style={{ fontSize: 14, color: '#888883' }}>
                The Deep South in 2028. Solarpunk meets the Mississippi corridor.
              </span>
            </Link>

            <Link
              to="/corridor/intro"
              style={{
                display: 'block',
                padding: '20px 24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D0C8',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#7B1B46',
                  marginBottom: 6,
                }}
              >
                Reference
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Abril Fatface', serif",
                  fontSize: 20,
                  color: '#111111',
                  marginBottom: 6,
                }}
              >
                The Corridor
              </span>
              <span style={{ fontSize: 14, color: '#888883' }}>
                Memphis to New Orleans. Town profiles from the route.
              </span>
            </Link>
          </div>

          <div style={{ borderTop: '1px solid #D5D0C8', paddingTop: 32 }}>
            <p style={{ fontSize: 14, color: '#888883', lineHeight: 1.7, marginBottom: 16 }}>
              This isn't theory. The hotel is real. The platform is deployed.
              The band is forming. The directory is launching.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <a
                href="https://measurablybetter.life"
                style={{
                  fontSize: 13,
                  color: '#7B1B46',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                See the proof &rarr;
              </a>
              <a
                href="https://deepsouthdirectory.com"
                style={{
                  fontSize: 13,
                  color: '#7B1B46',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Deep South Directory &rarr;
              </a>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  color: '#7B1B46',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Buy on Amazon &rarr;
              </a>
            </div>
          </div>

          <p style={{ fontSize: 12, color: '#B0AFA8', marginTop: 48 }}>
            Hillbilly Dreams, Inc. &middot; Natchez, Mississippi
          </p>
        </div>
      </div>
    </Layout>
  );
}
