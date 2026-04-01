import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bearsville Media Group — Hudson Valley / Catskills',
  description:
    'The Northeast media imprint documenting music, land, and independent culture in the Hudson Valley — and connecting it south through the Big Muddy corridor.',
};

// ─── Image archive — swap GCS paths after curation ───────────────────────────
// Bucket: gs://bmt-media-bigmuddy/
// To update: replace the `src` values with public GCS URLs for your 19 picks.
// Suggested split: 1 hero · 6 region · 6 music/community · 6 places/business

const HERO_IMAGE = '/images/processed/hudson-valley-landscape-hero.webp';

const GRID_IMAGES: { src: string; alt: string; bucket: 'region' | 'music' | 'places' }[] = [
  // — Region: landscapes, roads, mountains —
  { src: '/images/processed/hudson-valley-landscape-hero.webp', alt: 'A-frame cabin nestled in Catskills forest canopy', bucket: 'region' },
  { src: '', alt: 'Route 212 heading into Woodstock', bucket: 'region' },
  { src: '', alt: 'Hudson Valley farmland in November', bucket: 'region' },
  { src: '', alt: 'Bearsville hamlet from the hill', bucket: 'region' },
  { src: '', alt: 'Reservoir in early morning fog', bucket: 'region' },
  { src: '', alt: 'Stone wall along a back road', bucket: 'region' },
  // — Music / community: concerts, artists, crowds, backstage —
  { src: '/images/processed/bearsville-theater-rock-01.webp', alt: 'Singer performing at Bearsville Theater with floral dress and stage lights', bucket: 'music' },
  { src: '/images/processed/bearsville-theater-rock-02.webp', alt: 'Live band at Bearsville Theater, moody stage lighting', bucket: 'music' },
  { src: '/images/processed/bearsville-theater-rock-03.webp', alt: 'Performer at Bearsville Theater, intimate venue shot', bucket: 'music' },
  { src: '/images/processed/bearsville-theater-rock-04.webp', alt: 'Rock show at Bearsville Theater, crowd and stage', bucket: 'music' },
  { src: '/images/processed/arri-aslan-inn-portrait.webp', alt: 'Arri Aslan, arms wide in the Big Muddy Inn parlor', bucket: 'music' },
  { src: '/images/processed/bearsville-matt-pond-studio-01.webp', alt: 'Matt Pond recording session at Utopia Studios', bucket: 'music' },
  // — Places / business: storefronts, studios, property —
  { src: '/images/processed/bearsville-studio-session-01.webp', alt: 'Utopia Studios demo day — recording session in progress', bucket: 'places' },
  { src: '/images/processed/bearsville-studio-session-02.webp', alt: 'Utopia Studios control room during session', bucket: 'places' },
  { src: '/images/processed/bearsville-studio-session-03.webp', alt: 'Studio C equipment and tracking room', bucket: 'places' },
  { src: '/images/processed/bearsville-studio-session-04.webp', alt: 'Recording session at Utopia Studios, Bearsville', bucket: 'places' },
  { src: '/images/processed/bearsville-matt-pond-studio-02.webp', alt: 'Matt Pond at the console, Studio C', bucket: 'places' },
  { src: '', alt: 'Production van outside a venue', bucket: 'places' },
];

// ─── Corridor nodes ───────────────────────────────────────────────────────────
const CORRIDOR_NODES = [
  { city: 'Woodstock, NY', label: 'Northeast Origin', accent: true },
  { city: 'Hudson Valley corridor', label: 'Route 9 / I-87', accent: false },
  { city: 'Appalachian spine', label: 'Connecting seam', accent: false },
  { city: 'Nashville, TN', label: 'Music node', accent: false },
  { city: 'Natchez, MS', label: 'Deep South anchor', accent: true },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    label: 'Directory',
    title: 'Find Local',
    desc: 'AI-powered listings for Woodstock-area restaurants, studios, shops, venues, and services. Review alerts and monthly reports included.',
    cta: 'Get Listed',
    href: '/directory/onboard',
  },
  {
    label: 'Radio',
    title: 'Listen Local',
    desc: 'Bearsville Radio — streaming worldwide and broadcasting across the campus. Local music, local voices, local stories.',
    cta: 'Listen',
    href: '/radio/player',
  },
  {
    label: 'Magazine',
    title: 'Read Local',
    desc: 'Long-form editorial on the Hudson Valley creative scene — studios, makers, restaurants, and the people keeping Woodstock alive.',
    cta: 'Read',
    href: '/magazine',
  },
  {
    label: 'Studio',
    title: 'Create Local',
    desc: 'Recording, video production, and broadcasting from the Bearsville campus. Book a session or hire the crew.',
    cta: 'Book a Session',
    href: '/studioc',
  },
];

// ─── Intake CTAs ──────────────────────────────────────────────────────────────
const INTAKE_ACTIONS = [
  { label: 'Book coverage', desc: 'Event, portrait, or editorial shoot', href: 'mailto:hello@bearsvillemediagroup.com?subject=Coverage+Request' },
  { label: 'Join the directory', desc: 'List your business in the Hudson Valley network', href: '/directory/onboard' },
  { label: 'Bring your band south', desc: 'Play the Big Muddy corridor in Natchez, MS', href: 'mailto:hello@bearsvillemediagroup.com?subject=Corridor+Booking' },
  { label: 'Submit your venue', desc: 'Get on the touring map and editorial radar', href: 'mailto:hello@bearsvillemediagroup.com?subject=Venue+Submission' },
];

// ─── Placeholder component ────────────────────────────────────────────────────
function ImageSlot({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }} />;
  }
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--surface)',
      border: '1px dashed var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <span style={{ fontSize: '0.65rem', color: 'var(--text-disabled, #3a3530)', textAlign: 'center', padding: '0.5rem', lineHeight: 1.4 }}>{alt}</span>
    </div>
  );
}

export default function BearsvillePage() {
  // All colors now come from theme-bearsville CSS variables via the layout.
  // These aliases exist only so the JSX references are short and readable.
  const accent = 'var(--accent)';
  const accentLight = 'var(--accent-muted)';
  const bg = 'var(--bg)';
  const surface = 'var(--surface)';
  const border = 'var(--border)';
  const textPrimary = 'var(--text)';
  const textMuted = 'var(--text-muted)';
  const textDim = 'var(--text-disabled, #5a5550)';

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(4rem, 10vw, 8rem) 2rem',
        overflow: 'hidden',
        background: bg,
      }}>
        {/* Hero background image */}
        {HERO_IMAGE && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="Hudson Valley" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,13,0.4) 0%, rgba(15,15,13,0.85) 100%)' }} />
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: accent, marginBottom: '1.5rem',
          }}>
            Woodstock &middot; Bearsville &middot; Hudson Valley &middot; Catskills
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 800, color: textPrimary,
            letterSpacing: '-0.04em', lineHeight: 1.05,
            margin: '0 0 1.25rem',
          }}>
            The Northeast&apos;s<br />Creative Imprint
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: textMuted, maxWidth: 520, lineHeight: 1.65,
            margin: '0 auto 2.5rem',
          }}>
            Bearsville Media Group documents music, land, and independent culture in the Hudson Valley — and connects it south through the Big Muddy corridor.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/directory/onboard" style={{
              padding: '13px 32px', background: accent, color: bg,
              borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}>
              Join the Directory
            </a>
            <a href="mailto:hello@bearsvillemediagroup.com?subject=Corridor+Inquiry" style={{
              padding: '13px 32px', background: 'transparent', color: accent,
              border: `1px solid ${accent}`, borderRadius: 8,
              fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}>
              Work With Us
            </a>
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <section style={{
        borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`,
        background: surface,
        padding: '1.25rem 2rem',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', gap: '2.5rem', justifyContent: 'center',
          flexWrap: 'wrap', alignItems: 'center',
        }}>
          {['Editorial', 'Radio', 'Directory', 'Studio', 'Touring corridor', 'Concert coverage', 'Landscape archive'].map(item => (
            <span key={item} style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: textDim, whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── IMAGE GRID ── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', background: bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: accent, marginBottom: '0.75rem', textAlign: 'center',
          }}>
            The Archive
          </p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800,
            color: textPrimary, textAlign: 'center', letterSpacing: '-0.03em',
            margin: '0 0 2.5rem',
          }}>
            We know this place.
          </h2>

          {/* Masonry-style grid: 3 columns desktop, 2 tablet, 1 mobile */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
          }}>
            {GRID_IMAGES.map((img, i) => (
              <div key={i} style={{
                aspectRatio: i % 5 === 0 ? '4/3' : i % 7 === 0 ? '1/1' : '3/2',
                overflow: 'hidden',
                borderRadius: 4,
                background: surface,
              }}>
                <ImageSlot src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center', fontSize: '0.75rem', color: textDim,
            marginTop: '1.5rem', lineHeight: 1.6,
          }}>
            Concerts, landscapes, storefronts, studios — a decade of the Hudson Valley and Catskills.
          </p>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', background: surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: accent, marginBottom: '0.75rem',
          }}>
            The Platform
          </p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800,
            color: textPrimary, letterSpacing: '-0.03em',
            margin: '0 0 2.5rem', maxWidth: 600,
          }}>
            One infrastructure.<br />Four ways in.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}>
            {SERVICES.map(s => (
              <div key={s.label} style={{
                background: bg, border: `1px solid ${border}`,
                borderRadius: 12, padding: '1.75rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: accent,
                }}>
                  {s.label}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: textPrimary, margin: 0 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: textDim, lineHeight: 1.55, margin: 0, flex: 1 }}>
                  {s.desc}
                </p>
                <a href={s.href} style={{
                  display: 'block', textAlign: 'center', padding: '8px 16px',
                  border: `1px solid ${border}`, borderRadius: 6,
                  color: textMuted, fontSize: '0.75rem', fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  {s.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORRIDOR ── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
        background: bg,
        borderTop: `1px solid ${border}`,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center',
          }}>
            {/* Left: manifesto */}
            <div>
              <p style={{
                fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: accent, marginBottom: '0.75rem',
              }}>
                The Corridor
              </p>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800,
                color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1.15,
                margin: '0 0 1.25rem',
              }}>
                The Hudson Valley<br />connects south.
              </h2>
              <p style={{ fontSize: '0.9rem', color: textMuted, lineHeight: 1.7, margin: '0 0 1rem' }}>
                Bearsville Media Group is the Northeast node of the Big Muddy corridor — an independent media and touring network running from Woodstock, NY down to Natchez, MS.
              </p>
              <p style={{ fontSize: '0.9rem', color: textMuted, lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                We share editorial, radio programming, touring dates, and directory infrastructure with Big Muddy in Natchez. Bands move south. Stories move north. The money stays local on both ends.
              </p>
              <a href="https://bigmuddytouring.com" style={{
                fontSize: '0.8rem', fontWeight: 700, color: accent,
                textDecoration: 'none', letterSpacing: '0.05em',
              }}>
                See Big Muddy in Natchez →
              </a>
            </div>

            {/* Right: corridor map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {CORRIDOR_NODES.map((node, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.85rem 1rem',
                  background: node.accent ? accentLight : surface,
                  border: `1px solid ${node.accent ? accent : border}`,
                  borderRadius: 8,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: node.accent ? accent : border,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: node.accent ? textPrimary : textMuted }}>
                      {node.city}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: textDim, marginTop: 2 }}>
                      {node.label}
                    </div>
                  </div>
                </div>
              ))}
              {/* Vertical connector line visual */}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTAKE / CONTACT ── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
        background: surface,
        borderTop: `1px solid ${border}`,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: accent, marginBottom: '0.75rem',
          }}>
            Get Involved
          </p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800,
            color: textPrimary, letterSpacing: '-0.03em',
            margin: '0 0 0.75rem',
          }}>
            Raise your hand.
          </h2>
          <p style={{
            fontSize: '0.95rem', color: textMuted, lineHeight: 1.65,
            maxWidth: 500, margin: '0 auto 2.5rem',
          }}>
            Whether you&apos;re a venue, a band, a business, or a photographer — there&apos;s a seat in the corridor.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem', textAlign: 'left',
          }}>
            {INTAKE_ACTIONS.map(action => (
              <a key={action.label} href={action.href} style={{
                display: 'flex', flexDirection: 'column', gap: '0.35rem',
                padding: '1.25rem',
                background: bg, border: `1px solid ${border}`,
                borderRadius: 10, textDecoration: 'none',
              }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: textPrimary }}>
                  {action.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: textDim, lineHeight: 1.4 }}>
                  {action.desc}
                </span>
              </a>
            ))}
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: textDim }}>
            Or email directly:{' '}
            <a href="mailto:hello@bearsvillemediagroup.com" style={{ color: accent, textDecoration: 'none' }}>
              hello@bearsvillemediagroup.com
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        borderTop: `1px solid ${border}`,
        fontSize: '0.72rem',
        color: textDim,
        background: bg,
      }}>
        <p style={{ margin: '0 0 0.4rem' }}>
          Bearsville Media Group LLC &middot; Woodstock, NY
        </p>
        <p style={{ margin: 0 }}>
          Part of the{' '}
          <a href="https://bigmuddytouring.com" style={{ color: accent, textDecoration: 'none' }}>
            Big Muddy corridor
          </a>
          {' '}— powered by{' '}
          <a href="https://hillbillydreamsinc.com" style={{ color: textDim, textDecoration: 'none' }}>
            Hillbilly Dreams Inc
          </a>
        </p>
      </footer>
    </>
  );
}
