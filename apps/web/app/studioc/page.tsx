// apps/web/app/studio/page.tsx
// Studio C Video — production studio homepage

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup, BLUR_DATA_URL } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Studio C Video — Live Production & Content from Woodstock, NY',
  description:
    'Multi-camera live production, streaming, music video, and podcast recording at Studio C inside The Big Muddy Inn, Woodstock, NY.',
};

const CAPABILITIES = [
  {
    title: 'Multi-Cam Live Production',
    desc: 'ATEM Mini Extreme ISO switching, up to 8 camera inputs, real-time graphics overlay, and ISO recording for post-production flexibility.',
    icon: '🎬',
  },
  {
    title: 'Live Streaming',
    desc: 'Broadcast to YouTube, Twitch, Facebook, and custom RTMP endpoints simultaneously. Hollyland wireless for zero-cable talent.',
    icon: '📡',
  },
  {
    title: 'Music Sessions',
    desc: 'Steinway grand piano, full drum kit, guitar rigs, and a 40-seat performance room. Record and stream live sessions from the Blues Room.',
    icon: '🎹',
  },
  {
    title: 'Podcast & Interview',
    desc: 'Multi-mic setups at the round table in the parlor. Clean audio, multi-angle video, same-day turnaround for clips.',
    icon: '🎙️',
  },
  {
    title: 'Photo & Video Content',
    desc: 'Studio lighting, seamless backdrop, and DxO-processed photo pipeline. Portraits, product shots, promo content.',
    icon: '📸',
  },
  {
    title: 'Post-Production',
    desc: 'Color grading, audio mixing, editing, and delivery. Final files in any format — broadcast, social, streaming.',
    icon: '🖥️',
  },
];

const GEAR = [
  'Blackmagic ATEM Mini Extreme ISO',
  'Hollyland Wireless Video & Intercom',
  'Blackmagic Pocket Cinema Camera 6K',
  'Sony Alpha series',
  'Audio-Technica AT4050 / AT2020 mics',
  'Steinway & Sons Grand Piano',
  'Pearl drum kit',
  'Aputure & Godox studio lighting',
  'DaVinci Resolve Studio',
  'Pro Tools / Logic Pro',
  'DxO PhotoLab (DeepPRIME)',
  'Custom streaming server (OBS + RTMP)',
];

const PACKAGES = [
  {
    name: 'Session',
    price: '$500',
    unit: 'half day',
    features: [
      'Studio access (4 hours)',
      'Single-camera recording',
      'Basic audio setup',
      'Raw files delivered',
      'Great for podcasts & interviews',
    ],
  },
  {
    name: 'Production',
    price: '$1,500',
    unit: 'full day',
    featured: true,
    features: [
      'Studio access (8 hours)',
      'Multi-camera (up to 4)',
      'Live streaming included',
      'ISO recording all cameras',
      'Basic color grade & edit',
      'Social media clips (3-5)',
      'Music sessions & live shows',
    ],
  },
  {
    name: 'Studio Residency',
    price: '$3,500',
    unit: 'week',
    features: [
      'Full studio access (5 days)',
      'Multi-camera + live stream',
      'Full post-production',
      'Lodging at The Big Muddy Inn',
      'Photo session with Chase Pierson',
      'Magazine feature inclusion',
      'All deliverables — broadcast ready',
    ],
  },
];

export default function StudioPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <Image
          src="/images/studio-c/utopiademo-day-25.webp"
          alt="Studio C production station — multi-monitor setup with ATEM switcher, Steinway grand piano under magenta light"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,15,13,0.7) 0%, rgba(15,15,13,0.5) 40%, rgba(15,15,13,0.92) 100%)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          padding: 'var(--space-24) var(--space-6)',
          width: '100%',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase' as const,
            marginBottom: 'var(--space-4)',
          }}>
            Live Production · Bearsville, NY at Utopia Studios
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-tight)',
            margin: '0 0 var(--space-6)',
          }}>
            Studio <span style={{ color: 'var(--accent)' }}>C</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--leading-loose)',
            maxWidth: 600,
            margin: '0 0 var(--space-10)',
          }}>
            Multi-camera live production, streaming, and content creation
            from Bearsville, NY at Utopia Studios. Real gear, real room, real sound.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' as const }}>
            <a href="mailto:studio@thebigmuddyinn.com" className="btn btn--primary">Book the Studio</a>
            <a href="#capabilities" className="btn btn--ghost">See Capabilities</a>
          </div>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 'var(--space-6)',
      }}>
        <div style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-3)',
        }}>
          {[
            { src: '/images/studio-c/utopiademo-day-50.webp', alt: 'ATEM Software Control with Studio C branding on multiview' },
            { src: '/images/studio-c/utopiademo-day-5.webp', alt: 'ATEM production switcher LED buttons' },
            { src: '/images/studio-c/utopiademo-day-15.webp', alt: 'Pearl drum kit with overhead microphones' },
            { src: '/images/studio-c/utopiademo-day-10.webp', alt: 'Godox studio light with warm modifier' },
          ].map((img) => (
            <div key={img.src} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: 'var(--radius-lg, 8px)' }}>
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                sizes="25vw"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6)',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase' as const,
            marginBottom: 'var(--space-3)',
          }}>
            What We Do
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: 'var(--tracking-tight)',
            margin: '0 0 var(--space-12)',
          }}>
            Production Capabilities
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
          }}>
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
              }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>{cap.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: 'var(--tracking-tight)',
                  margin: '0 0 var(--space-2)',
                }}>
                  {cap.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  lineHeight: 'var(--leading-normal)',
                  margin: 0,
                }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wide Studio Shot ── */}
      <section style={{ width: '100%', maxHeight: 500, overflow: 'hidden', lineHeight: 0 }}>
        <Image
          src="/images/studio-c/utopiademo-day.webp"
          alt="Studio C — cameras, lighting rigs, and seamless backdrop"
          width={1600}
          height={900}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      {/* ── Packages ── */}
      <section id="packages" style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6)',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase' as const,
            marginBottom: 'var(--space-3)',
          }}>
            Pricing
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: 'var(--tracking-tight)',
            margin: '0 0 var(--space-12)',
          }}>
            Studio Packages
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} style={{
                background: pkg.featured ? 'var(--accent-muted)' : 'var(--surface-2)',
                border: `1px solid ${pkg.featured ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-8)',
                position: 'relative',
              }}>
                {pkg.featured && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--space-4)',
                    right: 'var(--space-4)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase' as const,
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: '0 0 var(--space-2)',
                }}>
                  {pkg.name}
                </h3>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 800,
                    color: 'var(--accent)',
                  }}>
                    {pkg.price}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-disabled)',
                    marginLeft: 'var(--space-2)',
                  }}>
                    / {pkg.unit}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      paddingLeft: 'var(--space-5)',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: 2,
                        color: 'var(--accent)',
                        fontSize: 'var(--text-xs)',
                      }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:studio@thebigmuddyinn.com"
                  className={pkg.featured ? 'btn btn--primary' : 'btn btn--outline'}
                  style={{ width: '100%', textAlign: 'center', display: 'block' }}
                >
                  Book {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gear List ── */}
      <section id="gear" style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', alignItems: 'start' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase' as const,
                marginBottom: 'var(--space-3)',
              }}>
                The Rig
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: 'var(--tracking-tight)',
                margin: '0 0 var(--space-6)',
              }}>
                Gear & Software
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {GEAR.map((item) => (
                  <li key={item} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    paddingLeft: 'var(--space-4)',
                    borderLeft: '2px solid var(--border-strong)',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg, 8px)' }}>
              <Image
                src="/images/studio-c/utopiademo-day-35.webp"
                alt="Engineer at the mixing console — Studio C"
                width={800}
                height={600}
                sizes="50vw"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Arrie Aslin Feature ── */}
      <section style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-10)', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg, 8px)' }}>
              <Image
                src="/images/studio-c/utopiademo-day-55.webp"
                alt="Arrie Aslin tracking guitar at Studio C"
                width={600}
                height={600}
                sizes="40vw"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase' as const,
                marginBottom: 'var(--space-3)',
              }}>
                Artist-in-Residence
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: 'var(--tracking-tight)',
                margin: '0 0 var(--space-4)',
              }}>
                Arrie Aslin
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--leading-loose)',
                margin: '0 0 var(--space-4)',
              }}>
                Co-owner of The Big Muddy Inn and one of the first artists on Big Muddy Records.
                Arri is the resident producer and musician at Studio C — writing, recording, and
                performing from the same room where the Blues Room sessions happen every week.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--leading-loose)',
                margin: '0 0 var(--space-6)',
              }}>
                His work bridges the production studio and the performance stage — the same
                Steinway, the same mics, the same room. Studio C exists because Arri needed
                a place to make records without leaving home.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <a href="/records/artists/arrie-aslin" className="btn btn--outline">
                  Artist Profile →
                </a>
                <a href="/radio/podcast" className="btn btn--ghost">
                  Hear the Podcast →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          padding: 'var(--space-20) var(--space-6)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: 'var(--tracking-tight)',
            margin: '0 0 var(--space-4)',
          }}>
            Book the Studio
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--leading-normal)',
            maxWidth: 560,
            margin: '0 auto var(--space-8)',
          }}>
            Studio C is at Bearsville, NY at Utopia Studios.
            Bring your project. We'll bring the rig.
          </p>
          <a href="mailto:studio@thebigmuddyinn.com" className="btn btn--primary" style={{ fontSize: 'var(--text-lg)', padding: 'var(--space-4) var(--space-8)' }}>
            studio@thebigmuddyinn.com
          </a>
        </div>
      </section>

      <NewsletterSignup variant="section" />
    </>
  );
}
