// apps/web/app/studioc/call-sheet/[id]/page.tsx
// Individual session detail — the page QR codes link to

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getSession,
  SESSIONS,
  STATUS_LABELS,
  STATUS_COLORS,
  VIDEO_SERVICE_LABELS,
  type VideoService,
} from '../sessions';

export function generateStaticParams() {
  return SESSIONS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const session = getSession(id);
  if (!session) return { title: 'Session Not Found' };
  return {
    title: `${session.band} — ${session.subtitle} | Utopia Call Sheet`,
    description: `Session details for ${session.band} at Studio C, Bearsville, NY. ${session.date}.`,
  };
}

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();

  const allVideoServices: VideoService[] = [
    'multi-cam',
    'live-stream',
    'highlight-reel',
    'behind-the-scenes',
    'social-clips',
  ];

  return (
    <>
      {/* ── Hero header ── */}
      <section
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: 'var(--space-16) var(--space-6) var(--space-10)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
          <Link
            href="/studioc/call-sheet"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <span style={{ fontSize: 'var(--text-lg)' }}>&larr;</span> Back to Call Sheet
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase' as const,
              }}
            >
              {session.duration} · {session.room}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm, 4px)',
                padding: '2px 10px',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: STATUS_COLORS[session.status],
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: STATUS_COLORS[session.status],
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase' as const,
                }}
              >
                {STATUS_LABELS[session.status]}
              </span>
            </div>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
              margin: '0 0 var(--space-2)',
            }}
          >
            {session.band}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xl)',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {session.subtitle}
          </p>
        </div>
      </section>

      {/* ── Details grid ── */}
      <section style={{ background: 'var(--surface)' }}>
        <div
          style={{
            maxWidth: 'var(--container-xl)',
            margin: '0 auto',
            padding: 'var(--space-10) var(--space-6)',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
        >
          {/* Left column — session info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {/* Info cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <DetailCard label="Date" value={session.date} />
              <DetailCard label="Time" value={session.time} />
              <DetailCard label="Engineer" value={session.engineer} />
              <DetailCard label="Room" value={session.room} />
            </div>

            {/* Equipment */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: 'var(--tracking-tight)',
                  margin: '0 0 var(--space-4)',
                }}
              >
                Equipment List
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                {session.equipment.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      paddingLeft: 'var(--space-4)',
                      borderLeft: '2px solid var(--accent)',
                      padding: 'var(--space-1) 0 var(--space-1) var(--space-4)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: 'var(--tracking-tight)',
                  margin: '0 0 var(--space-4)',
                }}
              >
                Session Notes
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-md)',
                  color: 'var(--text-muted)',
                  lineHeight: 'var(--leading-loose)',
                  margin: 0,
                }}
              >
                {session.notes}
              </p>
            </div>
          </div>

          {/* Right column — Video services & QR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Video Services */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--accent)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase' as const,
                  marginBottom: 'var(--space-2)',
                }}
              >
                Studio C Video
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: 'var(--tracking-tight)',
                  margin: '0 0 var(--space-4)',
                }}
              >
                Video Services
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                {allVideoServices.map((svc) => {
                  const isActive = session.videoServices.includes(svc);
                  return (
                    <label
                      key={svc}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: isActive ? 'var(--text)' : 'var(--text-disabled)',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 'var(--radius-sm, 4px)',
                          border: `2px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                          background: isActive ? 'var(--accent)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '12px',
                          color: isActive ? 'var(--bg)' : 'transparent',
                          fontWeight: 700,
                        }}
                      >
                        {isActive ? '\u2713' : ''}
                      </span>
                      {VIDEO_SERVICE_LABELS[svc]}
                    </label>
                  );
                })}
              </div>
              <div
                style={{
                  marginTop: 'var(--space-5)',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <a
                  href={`mailto:studio@thebigmuddyinn.com?subject=Video Services — ${session.band}&body=Session: ${session.band} — ${session.subtitle}%0ADate: ${session.date}%0A%0APlease add the following video services to this session:%0A`}
                  className="btn btn--primary"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Request Video Services
                </a>
              </div>
            </div>

            {/* QR Code link */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Session QR Code
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--space-4)',
                }}
              >
                Print this QR code for check-in at the studio door.
              </p>
              <Link
                href={`/studioc/call-sheet/qr?session=${session.id}`}
                className="btn btn--outline"
                style={{
                  fontSize: 'var(--text-sm)',
                }}
              >
                View / Print QR Code
              </Link>
            </div>

            {/* Contact */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: 'var(--tracking-tight)',
                  margin: '0 0 var(--space-3)',
                }}
              >
                Contact
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--space-1)',
                }}
              >
                Studio C at Utopia Studios
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--space-1)',
                }}
              >
                Bearsville, NY
              </p>
              <a
                href={`mailto:${session.contact}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                }}
              >
                {session.contact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Responsive + Print ── */}
      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media print {
          nav, footer, .btn { display: none !important; }
          section { break-inside: avoid; }
          * { color: #000 !important; background: #fff !important; border-color: #ccc !important; }
        }
      `}</style>
    </>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg, 8px)',
        padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          color: 'var(--text-muted)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase' as const,
          marginBottom: 'var(--space-1)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text)',
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}
