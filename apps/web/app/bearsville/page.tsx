import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bearsville Creative — Recording Studios of the Hudson Valley',
  description:
    'The studio node of the Big Muddy corridor. We document recording studios, sessions, engineers, and the rooms where the sound lives — from Woodstock to the Catskills.',
};

// ─── Image archive — Studio C / Utopia photos ─────────────────────────────────
// Primary: /images/studio-c/ (59 Utopia demo day photos)
// Secondary: /images/processed/bearsville/ (Balk sessions, Matt Pond, theater)
// Bucket: gs://bmt-media-bigmuddy/

const HERO_IMAGE = '/images/studio-c/utopiademo-day-18.webp';

const GRID_IMAGES: { src: string; alt: string; bucket: 'region' | 'music' | 'places' }[] = [
  // — Region: landscapes, roads, mountains —
  { src: '/images/processed/hudson-valley-landscape-hero.webp', alt: 'A-frame cabin nestled in Catskills forest canopy', bucket: 'region' },
  { src: '/images/processed/catskills-road-autumn.webp', alt: 'Winding road through the Catskills in autumn', bucket: 'region' },
  { src: '/images/processed/hudson-valley-farmland.webp', alt: 'Hudson Valley farmland with Catskill Mountains beyond', bucket: 'region' },
  { src: '/images/processed/bearsville-hamlet-morning.webp', alt: 'Bearsville hamlet in the morning fog', bucket: 'region' },
  { src: '/images/processed/catskills-reservoir-dawn.webp', alt: 'Catskills reservoir at dawn, fog on still water', bucket: 'region' },
  { src: '/images/processed/hudson-valley-stone-wall.webp', alt: 'Moss-covered stone wall along a country road', bucket: 'region' },
  // — Music / community: concerts, artists, crowds, backstage —
  { src: '/images/processed/bearsville-theater-rock-01.webp', alt: 'Singer performing at Bearsville Theater with floral dress and stage lights', bucket: 'music' },
  { src: '/images/processed/bearsville-theater-rock-02.webp', alt: 'Live band at Bearsville Theater, moody stage lighting', bucket: 'music' },
  { src: '/images/processed/bearsville-theater-rock-03.webp', alt: 'Performer at Bearsville Theater, intimate venue shot', bucket: 'music' },
  { src: '/images/processed/bearsville-theater-rock-04.webp', alt: 'Rock show at Bearsville Theater, crowd and stage', bucket: 'music' },
  { src: '/images/processed/arrie-aslin-inn-portrait.webp', alt: 'Arrie Aslin, arms wide in the Big Muddy Inn parlor', bucket: 'music' },
  { src: '/images/processed/bearsville-matt-pond-studio-01.webp', alt: 'Matt Pond recording session at Utopia Studios', bucket: 'music' },
  // — Places / business: storefronts, studios, property —
  { src: '/images/processed/bearsville-studio-session-01.webp', alt: 'Utopia Studios demo day — recording session in progress', bucket: 'places' },
  { src: '/images/processed/bearsville-studio-session-02.webp', alt: 'Utopia Studios control room during session', bucket: 'places' },
  { src: '/images/processed/bearsville-studio-session-03.webp', alt: 'Studio C equipment and tracking room', bucket: 'places' },
  { src: '/images/processed/bearsville-studio-session-04.webp', alt: 'Recording session at Utopia Studios, Bearsville', bucket: 'places' },
  { src: '/images/processed/bearsville-matt-pond-studio-02.webp', alt: 'Matt Pond at the console, Studio C', bucket: 'places' },
  { src: '/images/processed/bearsville-venue-night.webp', alt: 'Touring van outside a venue at night, string lights', bucket: 'places' },
];

// ─── Services — reframed for studio professionals ────────────────────────────
const SERVICES = [
  {
    label: 'Magazine',
    title: 'The Story',
    desc: 'When a client hires Studio C, we write the feature. Studio deep-dives, session logs, engineer profiles, gear breakdowns. Your work, published and shareable.',
    cta: 'Read the Magazine',
    href: '/magazine',
  },
  {
    label: 'Radio',
    title: 'The Broadcast',
    desc: 'Rough mixes, producer interviews, session recordings. Your session becomes a radio feature on Bearsville Radio — not just a file on a hard drive.',
    cta: 'Listen',
    href: '/radio/player',
  },
  {
    label: 'Directory',
    title: 'The Network',
    desc: 'Every studio, session player, luthier, and mastering room in the Hudson Valley. Documented, profiled, and searchable. Your studio on the map.',
    cta: 'Get Listed',
    href: '/directory/onboard',
  },
  {
    label: 'Gallery',
    title: 'The Archive',
    desc: 'Professional studio photography — consoles, live rooms, gear, sessions. We photograph the work, and the photos become the proof.',
    cta: 'View Gallery',
    href: '/gallery',
  },
];

// ─── Featured Studios ────────────────────────────────────────────────────────
const FEATURED_STUDIOS = [
  { name: 'Studio C at Utopia', location: 'Bearsville, NY', note: 'Todd Rundgren\'s compound. Live room, control room, vintage signal chain.' },
  { name: 'Dreamland Recording', location: 'Hurley, NY', note: 'A church turned studio. Massive drum sounds.' },
  { name: 'Levon Helm Studios', location: 'Woodstock, NY', note: 'The Barn. Midnight Ramble sessions. History in every plank.' },
];

// ─── Intake CTAs ─────────────────────────────────────────────────────────────
const INTAKE_ACTIONS = [
  { label: 'Get featured', desc: 'We write the story about your session, your studio, your work', href: 'mailto:hello@bearsvillemediagroup.com?subject=Get+Featured' },
  { label: 'List your studio', desc: 'Join the Hudson Valley studio directory', href: '/directory/onboard' },
  { label: 'Submit your work', desc: 'Have something we should publish? Send it over', href: 'mailto:hello@bearsvillemediagroup.com?subject=Submission' },
  { label: 'Hire Studio C', desc: 'Need the recording first? Our production arm handles that', href: 'https://studiocvideo.com' },
];

// ─── Placeholder component ──────────────────────────────────────────────────
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
        {HERO_IMAGE && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="Utopia Studios tracking room" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,13,0.4) 0%, rgba(15,15,13,0.85) 100%)' }} />
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: accent, marginBottom: '1.5rem',
          }}>
            Utopia Studios &middot; Bearsville &middot; Woodstock &middot; Hudson Valley
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 800, color: textPrimary,
            letterSpacing: '-0.04em', lineHeight: 1.05,
            margin: '0 0 1.25rem',
          }}>
            The Visual Side<br />of Sound
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: textMuted, maxWidth: 540, lineHeight: 1.65,
            margin: '0 auto 2.5rem',
          }}>
            When you hire a studio, you get a recording. When you hire us, you get the story. Bearsville Creative publishes the sessions, the studios, and the people behind the glass.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/magazine" style={{
              padding: '13px 32px', background: accent, color: bg,
              borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}>
              Read the Magazine
            </a>
            <a href="mailto:hello@bearsvillemediagroup.com?subject=Get+Featured" style={{
              padding: '13px 32px', background: 'transparent', color: accent,
              border: `1px solid ${accent}`, borderRadius: 8,
              fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}>
              Get Featured
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
          {['Studio Sessions', 'Console Close-ups', 'Gear Reviews', 'Engineer Profiles', 'Session Logs', 'Live Room Acoustics', 'Producer Interviews'].map(item => (
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
            Inside the Room
          </h2>

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
            Consoles, tracking rooms, microphones, sessions — the studios of the Hudson Valley and Catskills.
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

      {/* ── FEATURED STUDIOS ── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
        background: bg,
        borderTop: `1px solid ${border}`,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: accent, marginBottom: '0.75rem',
          }}>
            Featured Studios
          </p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800,
            color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1.15,
            margin: '0 0 2rem',
          }}>
            The rooms that built<br />the Hudson Valley sound.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FEATURED_STUDIOS.map((studio, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                background: surface,
                border: `1px solid ${border}`,
                borderRadius: 10,
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: textPrimary, marginBottom: '0.25rem' }}>
                    {studio.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: textDim, lineHeight: 1.5 }}>
                    {studio.note}
                  </div>
                </div>
                <div style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: accent, whiteSpace: 'nowrap',
                }}>
                  {studio.location}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '0.8rem', color: textMuted, lineHeight: 1.65,
            marginTop: '2rem', maxWidth: 600,
          }}>
            Chase Pierson photographs recording studios professionally. These are our clients, our neighbors, and the rooms where the magazine starts.
          </p>
        </div>
      </section>

      {/* ── CORRIDOR ── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
        background: surface,
        borderTop: `1px solid ${border}`,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center',
          }}>
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
                Woodstock connects<br />to Natchez.
              </h2>
              <p style={{ fontSize: '0.9rem', color: textMuted, lineHeight: 1.7, margin: '0 0 1rem' }}>
                Bearsville is the studio node of the Big Muddy corridor. Bands record here and tour south. Engineers swap sessions between Woodstock and Natchez. The infrastructure is shared — the rooms are different.
              </p>
              <a href="https://bigmuddytouring.com" style={{
                fontSize: '0.8rem', fontWeight: 700, color: accent,
                textDecoration: 'none', letterSpacing: '0.05em',
              }}>
                See Big Muddy in Natchez →
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { city: 'Woodstock, NY', label: 'Studio node — Utopia / Studio C', isAccent: true },
                { city: 'Hudson Valley', label: 'Dreamland, Levon Helm, The Barn', isAccent: false },
                { city: 'Appalachian spine', label: 'Connecting corridor', isAccent: false },
                { city: 'Nashville, TN', label: 'Music city crossover', isAccent: false },
                { city: 'Natchez, MS', label: 'Big Muddy anchor', isAccent: true },
              ].map((node, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.85rem 1rem',
                  background: node.isAccent ? accentLight : bg,
                  border: `1px solid ${node.isAccent ? accent : border}`,
                  borderRadius: 8,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: node.isAccent ? accent : border,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: node.isAccent ? textPrimary : textMuted }}>
                      {node.city}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: textDim, marginTop: 2 }}>
                      {node.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTAKE / CONTACT ── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
        background: bg,
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
            The room is open.
          </h2>
          <p style={{
            fontSize: '0.95rem', color: textMuted, lineHeight: 1.65,
            maxWidth: 500, margin: '0 auto 2.5rem',
          }}>
            Whether you&apos;re a studio, an engineer, a session player, or a band looking for the right room — there&apos;s a seat at the console.
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
                background: surface, border: `1px solid ${border}`,
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
          Bearsville Creative LLC &middot; Woodstock, NY
        </p>
        <p style={{ margin: 0 }}>
          Part of the{' '}
          <a href="https://bigmuddytouring.com" style={{ color: accent, textDecoration: 'none' }}>
            Big Muddy corridor
          </a>
          {' '}&mdash; powered by{' '}
          <a href="https://measurablybetter.life" style={{ color: accent, textDecoration: 'none' }}>
            Measurably Better Things
          </a>
        </p>
      </footer>
    </>
  );
}
