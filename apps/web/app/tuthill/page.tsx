// apps/web/app/tuthill/page.tsx
// Tuthill Design — creative services homepage

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup, BLUR_DATA_URL } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'Tuthill Design — Branding, Web & Creative Direction',
  description:
    'Branding, web design, photography direction, and creative strategy. Built inside the Big Muddy media ecosystem.',
};

const SERVICES = [
  {
    title: 'Brand Identity',
    desc: 'Logo, type system, color palette, voice guidelines. A complete brand kit that works across print, digital, and signage.',
    price: 'from $2,500',
  },
  {
    title: 'Web Design & Development',
    desc: 'Fast, mobile-first websites on modern frameworks. Built to perform — not just look good. SEO-ready, analytics-wired, and maintained.',
    price: 'from $5,000',
  },
  {
    title: 'Photography Direction',
    desc: 'Art direction for editorial and commercial shoots. DxO-processed, WebP-optimized, ready for web, print, and social.',
    price: 'from $1,500 / session',
  },
  {
    title: 'Content Strategy',
    desc: 'Social media, email, and editorial content planning. Voice-matched AI-assisted content pipeline with human editorial control.',
    price: 'from $1,000 / month',
  },
  {
    title: 'Creative Direction',
    desc: 'Campaign concepting, art direction, and creative oversight for launches, events, and seasonal campaigns.',
    price: 'by project',
  },
  {
    title: 'Directory Listing Design',
    desc: 'Enhanced profiles for Deep South Directory businesses. Photos, copy, structured data, and AI search optimization.',
    price: 'included with Route tier',
  },
];

const CLIENTS = [
  'The Big Muddy Inn',
  'Big Muddy Records',
  'Big Muddy Radio',
  'Big Muddy Magazine',
  'Studio C Video',
  'BuyCurious Art',
  'Deep South Directory',
  'Big Muddy Touring',
];

export default function TuthillPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <Image
          src="/images/corridor/natchez-night-lounge.webp"
          alt="Natchez at night — warm interior glow"
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
          background: 'linear-gradient(180deg, rgba(15,15,13,0.8) 0%, rgba(15,15,13,0.6) 40%, rgba(15,15,13,0.95) 100%)',
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
            Creative Services
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
            Tuthill<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Design</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--leading-loose)',
            maxWidth: 560,
            margin: '0 0 var(--space-10)',
          }}>
            Branding, web, photography, and creative direction built inside
            the Big Muddy media ecosystem. We design for businesses that make
            things — not just sell them.
          </p>
          <a href="mailto:design@tuthilldesign.com" className="btn btn--primary">
            Start a Project
          </a>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{
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
            Services
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}>
            {SERVICES.map((svc) => (
              <div key={svc.title} style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg, 8px)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: 'var(--tracking-tight)',
                    margin: '0 0 var(--space-2)',
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    lineHeight: 'var(--leading-normal)',
                    margin: '0 0 var(--space-4)',
                  }}>
                    {svc.desc}
                  </p>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}>
                  {svc.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients / Ecosystem ── */}
      <section id="work" style={{
        background: 'var(--bg)',
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
                The Ecosystem
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: 'var(--tracking-tight)',
                margin: '0 0 var(--space-5)',
              }}>
                Built Inside Big Muddy
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--leading-loose)',
                margin: '0 0 var(--space-6)',
              }}>
                Tuthill Design is the creative arm of the Big Muddy media ecosystem.
                Every brand in the network — the Inn, the label, the radio station,
                the magazine, the directory — was designed and built here. When you
                work with us, you get access to the same production pipeline: photography
                by Chase Pierson, content from the AI publishing engine, distribution
                through the magazine and radio network, and directory placement that
                actually drives business.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--leading-loose)',
                margin: 0,
              }}>
                This isn&apos;t a design agency that hands you a PDF and disappears.
                We build it, run it, and keep it working.
              </p>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase' as const,
                marginBottom: 'var(--space-4)',
              }}>
                Portfolio
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-3)',
              }}>
                {CLIENTS.map((client) => (
                  <div key={client} style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg, 8px)',
                    padding: 'var(--space-4)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text)',
                    fontWeight: 600,
                  }}>
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" style={{
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
            Let&apos;s Build Something
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--leading-normal)',
            maxWidth: 560,
            margin: '0 auto var(--space-8)',
          }}>
            Whether it&apos;s a full brand, a website, or a photo session —
            we&apos;ll figure out the right scope over email or a call.
          </p>
          <a href="mailto:design@tuthilldesign.com" className="btn btn--primary" style={{ fontSize: 'var(--text-lg)', padding: 'var(--space-4) var(--space-8)' }}>
            design@tuthilldesign.com
          </a>
        </div>
      </section>

      <NewsletterSignup variant="section" />
    </>
  );
}
