// apps/web/app/records/sessions/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Sessions — Big Muddy Records',
  description:
    'Live recordings from the Blues Room, front porches, and juke joints along the Mississippi corridor.',
};

const SESSIONS = [
  {
    title: 'Blues Room Live',
    frequency: 'Every Friday',
    location: 'The Big Muddy Inn, Natchez, MS',
    description:
      'The Blues Room is a listening room inside the Big Muddy Inn. Capacity: about 40 people. Stage: a corner with good light. Every Friday night is open mic. We record every set. The best ones become releases.',
    status: 'Ongoing',
  },
  {
    title: 'Porch Sessions',
    frequency: 'Spring & Fall',
    location: 'Various front porches, Natchez, MS',
    description:
      'Acoustic recordings on front porches across Natchez. No amplification. No click tracks. Just the instrument, the voice, and whatever sounds the neighborhood provides. Recorded on a stereo pair of condensers and a Zoom F6.',
    status: 'Starting Spring 2026',
  },
  {
    title: 'Corridor Sessions',
    frequency: 'Quarterly',
    location: 'Memphis to New Orleans, various venues',
    description:
      'We load the recording rig into the Prevost and drive Highway 61. We stop at juke joints, churches, living rooms, and front porches between Memphis and New Orleans. Every stop is a session. Every session feeds the ecosystem — Radio gets the live cuts, Magazine gets the story, the Inn gets the next booking.',
    status: 'Summer 2026',
  },
  {
    title: 'Church Sessions',
    frequency: 'Monthly (by invitation)',
    location: 'Various churches, Natchez and corridor',
    description:
      'Gospel recordings in the churches where the music started. We record Sunday services with permission, capture choir rehearsals, and document the musical tradition that predates every genre that came after it.',
    status: 'Planning',
  },
];

const RECORDING_PHILOSOPHY = [
  {
    principle: 'Record the room',
    detail:
      "We use minimal processing. If the room sounds good, the recording sounds good. The Blues Room at the Big Muddy Inn was built for this. So was the back of the bus.",
  },
  {
    principle: 'Own your masters',
    detail:
      "Every artist on Big Muddy Records owns their masters from day one. We license for distribution. The music belongs to the person who made it. No exceptions, no fine print.",
  },
  {
    principle: 'Amplify through the ecosystem',
    detail:
      "A session at the Blues Room doesn't just become a release — it becomes a Radio feature, a Magazine interview, a photo essay, a merch drop on BuyCurious. The recording is the beginning, not the end.",
  },
  {
    principle: 'Press it',
    detail:
      "Vinyl is not a novelty. It's the format. We press limited runs and sell them through the Inn, BuyCurious Art, and local record shops along the corridor. The revenue goes directly to the artist.",
  },
  {
    principle: 'Keep it in the corridor',
    detail:
      'Revenue from Big Muddy Records stays in the communities where the music was made. We pay artists directly and immediately. No recoupment games. No creative accounting.',
  },
  {
    principle: 'Earned media over bought',
    detail:
      "The $24K marketing budget in every retainer is real money, but the bigger play is earned media — Magazine features, Radio airtime, and social reach built on the back of the ecosystem. You don't buy that. You build it.",
  },
];

export default function SessionsPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem' }}>
      {/* Hero image */}
      <div
        style={{
          width: '100%',
          height: 280,
          backgroundImage: 'url(/images/ai-corridor/juke-joint-night.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '2.5rem',
          opacity: 0.7,
        }}
        role="img"
        aria-label="Juke joint at night along the Mississippi corridor"
      />
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--fg, #f5f0eb)',
          marginBottom: '0.5rem',
        }}
      >
        Live Sessions
      </h1>
      <p
        style={{
          color: 'var(--fg, #f5f0eb)',
          opacity: 0.6,
          fontSize: '1rem',
          marginBottom: '3rem',
          maxWidth: 600,
        }}
      >
        We go where the music is and press record. No studio. No producer. Just the
        sound of the place — and everything the ecosystem can do with it afterward.
      </p>

      {/* Session types */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
        {SESSIONS.map((session) => (
          <article
            key={session.title}
            style={{
              border: '1px solid var(--muted, #333)',
              padding: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: 0,
                }}
              >
                {session.title}
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.2rem 0.5rem',
                  border: '1px solid var(--accent, #c8943e)',
                  color: 'var(--accent, #c8943e)',
                  whiteSpace: 'nowrap',
                }}
              >
                {session.status}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent, #c8943e)',
                marginBottom: '0.75rem',
              }}
            >
              {session.frequency} &middot; {session.location}
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.7,
                lineHeight: 1.7,
              }}
            >
              {session.description}
            </p>
          </article>
        ))}
      </div>

      {/* Ecosystem callout */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          paddingTop: '3rem',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '1rem',
          }}
        >
          What a session becomes
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0',
            border: '1px solid var(--muted, #333)',
          }}
        >
          {[
            { channel: 'Big Muddy Radio', output: 'Live cut, pre-release airplay, interview' },
            { channel: 'Big Muddy Magazine', output: 'Feature story, photo essay, interview' },
            { channel: 'Big Muddy Touring', output: 'Next booking at the Inn, route exposure' },
            { channel: 'BuyCurious Art', output: 'Merch drop, limited vinyl, prints' },
          ].map((item, i) => (
            <div
              key={item.channel}
              style={{
                padding: '1.5rem',
                borderRight: i < 3 ? '1px solid var(--muted, #333)' : 'none',
              }}
            >
              <p
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent, #c8943e)',
                  margin: '0 0 0.4rem',
                }}
              >
                {item.channel}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.6,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {item.output}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recording Philosophy */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          paddingTop: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '2rem',
          }}
        >
          How We Record
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {RECORDING_PHILOSOPHY.map((item) => (
            <div key={item.principle}>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  marginBottom: '0.5rem',
                }}
              >
                {item.principle}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.65,
                  lineHeight: 1.6,
                }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
