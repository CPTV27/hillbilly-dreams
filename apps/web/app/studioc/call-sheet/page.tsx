'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SESSIONS, STATUS_LABELS, STATUS_COLORS, VIDEO_SERVICE_LABELS } from './sessions';
import type { Session, VideoService } from './sessions';

const videoServiceDescriptions: Record<VideoService, string> = {
  'multi-cam': 'Up to 4 camera angles, synced to session audio. Full edit delivered.',
  'live-stream': 'Real-time broadcast to web, social, or campus WiFi. Branded overlays.',
  'highlight-reel': '90-second session highlight. Social-ready. Delivered same week.',
  'behind-the-scenes': 'Documentary-style BTS footage. Raw + edited versions.',
  'social-clips': '15-30 second vertical clips for TikTok, Reels, Shorts. Batch of 5.',
};

const videoServiceIcons: Record<VideoService, string> = {
  'multi-cam': '\u25A3',
  'live-stream': '\u25C9',
  'highlight-reel': '\u25B6',
  'behind-the-scenes': '\u25CE',
  'social-clips': '\u25C6',
};

export default function CallSheetPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handlePrintQR(session: Session) {
    const qrUrl = `https://studiocvideo.com/session/${session.id}`;
    window.open(
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`,
      '_blank'
    );
  }

  return (
    <>
      {/* Header */}
      <section
        style={{
          background: 'var(--bg, #0f0f0d)',
          borderBottom: '1px solid var(--border, rgba(200,148,62,0.12))',
          padding: '64px 24px 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              marginBottom: '16px',
            }}
          >
            Studio C Video &middot; Bearsville, NY
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text, #e8e0d4)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px',
            }}
          >
            Call Sheet
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-muted, rgba(232,224,212,0.55))',
              lineHeight: 1.5,
              maxWidth: 600,
              margin: 0,
            }}
          >
            Upcoming sessions at Studio C. Tap a session to see equipment,
            notes, and QR check-in.
          </p>
        </div>
      </section>

      {/* Session Cards */}
      <section
        style={{
          background: 'var(--surface, #0f0f0d)',
          minHeight: '60vh',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {SESSIONS.map((session) => {
            const isExpanded = expandedId === session.id;
            return (
              <div
                key={session.id}
                style={{
                  background: 'var(--bg, #1a1816)',
                  border: '1px solid var(--border, rgba(200,148,62,0.12))',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Clickable header */}
                <div
                  style={{ padding: '28px 32px', cursor: 'pointer' }}
                  onClick={() => setExpandedId(isExpanded ? null : session.id)}
                >
                  {/* Top row: band + status */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: 'var(--accent, #c8943e)',
                          letterSpacing: '0.25em',
                          textTransform: 'uppercase' as const,
                          marginBottom: '6px',
                        }}
                      >
                        {session.duration} &middot; {session.room}
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: 'var(--text, #e8e0d4)',
                          letterSpacing: '-0.01em',
                          margin: '0 0 4px',
                        }}
                      >
                        {session.band}
                      </h2>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          color: 'var(--text-muted, rgba(232,224,212,0.55))',
                          fontStyle: 'italic',
                          margin: 0,
                        }}
                      >
                        {session.subtitle}
                      </p>
                    </div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 14px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        borderRadius: '3px',
                        backgroundColor: `${STATUS_COLORS[session.status]}22`,
                        color: STATUS_COLORS[session.status],
                        border: `1px solid ${STATUS_COLORS[session.status]}44`,
                      }}
                    >
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: STATUS_COLORS[session.status],
                          display: 'inline-block',
                        }}
                      />
                      {STATUS_LABELS[session.status]}
                    </span>
                  </div>

                  {/* Info grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                      gap: '16px',
                      fontSize: '0.85rem',
                    }}
                  >
                    <InfoBlock label="Date" value={session.date} />
                    <InfoBlock label="Time" value={session.time} />
                    <InfoBlock label="Engineer" value={session.engineer} />
                  </div>
                </div>

                {/* Expanded section */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 32px 28px',
                      borderTop: '1px solid var(--border, rgba(200,148,62,0.1))',
                      paddingTop: '24px',
                    }}
                  >
                    {/* Equipment */}
                    <div style={{ marginBottom: '20px' }}>
                      <Label>Equipment</Label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {session.equipment.map((item) => (
                          <span
                            key={item}
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              color: 'var(--text-muted, rgba(232,224,212,0.6))',
                              background: 'var(--surface-2, rgba(200,148,62,0.06))',
                              border: '1px solid var(--border, rgba(200,148,62,0.12))',
                              borderRadius: '3px',
                              padding: '3px 10px',
                              whiteSpace: 'nowrap' as const,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Video Services */}
                    {session.videoServices.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <Label>Video Services</Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {session.videoServices.map((svc) => (
                            <span
                              key={svc}
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                color: 'var(--accent, #c8943e)',
                                background: 'rgba(200,148,62,0.08)',
                                border: '1px solid rgba(200,148,62,0.2)',
                                borderRadius: '3px',
                                padding: '3px 10px',
                                whiteSpace: 'nowrap' as const,
                              }}
                            >
                              {VIDEO_SERVICE_LABELS[svc]}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div style={{ marginBottom: '24px' }}>
                      <Label>Notes</Label>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.88rem',
                          color: 'var(--text-muted, rgba(232,224,212,0.55))',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {session.notes}
                      </p>
                    </div>

                    {/* Actions */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                        borderTop: '1px solid var(--border, rgba(200,148,62,0.1))',
                        paddingTop: '20px',
                      }}
                    >
                      <Link
                        href={`/studioc/call-sheet/${session.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '10px 28px',
                          border: '1px solid var(--accent, #c8943e)',
                          color: 'var(--accent, #c8943e)',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '3px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Session Details
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrintQR(session);
                        }}
                        style={{
                          padding: '10px 28px',
                          backgroundColor: 'transparent',
                          border: '1px solid var(--border, rgba(232,224,212,0.2))',
                          color: 'var(--text, #e8e0d4)',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          borderRadius: '3px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Print QR
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Request Video Services */}
      <section
        style={{
          background: 'var(--surface, #0f0f0d)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '40px 24px 80px',
          }}
        >
          <div
            style={{
              borderTop: '1px solid var(--border, rgba(200,148,62,0.15))',
              paddingTop: '48px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: 300,
                marginBottom: '8px',
                color: 'var(--text, #e8e0d4)',
              }}
            >
              Request Video Services
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted, rgba(232,224,212,0.45))',
                marginBottom: '36px',
              }}
            >
              Studio C Video — integrated production for every session
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              {(Object.keys(VIDEO_SERVICE_LABELS) as VideoService[]).map((svc) => (
                <div
                  key={svc}
                  style={{
                    backgroundColor: 'var(--bg, #1a1816)',
                    border: '1px solid var(--border, rgba(200,148,62,0.1))',
                    borderRadius: '4px',
                    padding: '24px',
                    transition: 'border-color 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(200,148,62,0.35)')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(200,148,62,0.1)')
                  }
                >
                  <div
                    style={{
                      fontSize: '1.4rem',
                      color: 'var(--accent, #c8943e)',
                      marginBottom: '12px',
                    }}
                  >
                    {videoServiceIcons[svc]}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: 'var(--text, #e8e0d4)',
                    }}
                  >
                    {VIDEO_SERVICE_LABELS[svc]}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted, rgba(232,224,212,0.45))',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {videoServiceDescriptions[svc]}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a
                href="mailto:me@chasepierson.tv?subject=Video%20Services%20Request%20%E2%80%94%20Studio%20C"
                style={{
                  display: 'inline-block',
                  padding: '14px 40px',
                  backgroundColor: 'var(--accent, #c8943e)',
                  color: '#0f0f0d',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '3px',
                  fontWeight: 600,
                  transition: 'opacity 0.3s ease',
                }}
              >
                Request Video Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--text-muted, rgba(232,224,212,0.3))',
          borderTop: '1px solid var(--border, rgba(200,148,62,0.08))',
        }}
      >
        Studio C Video &middot; Bearsville, NY &middot; Powered by Measurably
        Better Things
      </footer>

      {/* Print Styles */}
      <style>{`
        @media print {
          nav, footer, button { display: none !important; }
          section { break-inside: avoid; }
          * { color: #000 !important; background: #fff !important; border-color: #ccc !important; }
        }
      `}</style>
    </>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-muted, rgba(232,224,212,0.45))',
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          marginBottom: '4px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: 'var(--text, #e8e0d4)',
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'var(--text-muted, rgba(232,224,212,0.45))',
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  );
}
