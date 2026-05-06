import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press · EPK',
  description:
    'Electronic press kit for Arrie Aslin — bios, photos, and booking contact for press and venue inquiries.',
};

export default function PressPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '5rem 2rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          margin: '0 0 0.5rem',
        }}
      >
        Press · EPK
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
        For press and booking
      </p>

      <Section title="Short bio (50 words)">
        <p>
          Arrie Aslin sings out of Natchez, Mississippi. Artist-in-residence at the Blues Room at
          Big Muddy Inn, signed to Big Muddy Records, host of a weekly hour on Big Muddy Radio.
          Southern soul-blues, original songs and reworked standards from the river corridor that
          runs from Memphis to New Orleans.
        </p>
      </Section>

      <Section title="Medium bio (150 words)">
        <p>
          Arrie Aslin is a singer based in Natchez, Mississippi, working at the seam between
          Southern soul, blues, and the Americana songwriter tradition. Her band — upright bass,
          Wurlitzer, brushed drums, restrained guitar — backs original material about staying put,
          alongside reworked standards drawn from the corridor running Memphis to Clarksdale to
          New Orleans. She holds the artist-in-residence chair at the Blues Room at Big Muddy Inn,
          plays a weekly hour on Big Muddy Radio, and tours the regional Snowbird Circuit each
          winter. Her records ship on Big Muddy Records. The work is hospitality-shaped: songs you
          can hear from the bar without having to lean in, sung in a room that smells like
          cornbread and bourbon. The thesis: the South already taught the world how to sing about
          the river. Arrie Aslin keeps singing about the people who still live on it.
        </p>
      </Section>

      <Section title="Long bio (300 words)">
        <p style={{ marginBottom: '1.25rem' }}>
          Arrie Aslin sings out of Natchez, Mississippi, where the Mississippi River bends back on
          itself and the bar at the Big Muddy Inn fills up about an hour before showtime. The
          voice is warm, lived-in, a little hoarse where it needs to be, and built for songs about
          staying put when you could have left.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          Her band leans on upright bass, a Wurlitzer that hums when you turn it on, brushed
          drums, and a guitar that knows when to keep its mouth shut. The repertoire moves between
          her own writing — small-town gospel about hospitality, marriage, and Tuesday-night work
          — and reworked standards from the corridor that runs from Memphis down through
          Clarksdale into New Orleans. She is, in the strict sense, a hospitality-room singer: the
          Blues Room at the Big Muddy Inn is her home, three nights a week.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          Aslin is the artist-in-residence at the Blues Room, hosts a weekly hour on Big Muddy
          Radio, and tours a regional Snowbird Circuit each winter — Natchez, Memphis, Clarksdale,
          Helena, Greenwood, New Orleans. Her recordings come out on Big Muddy Records.
        </p>
        <p>
          She did not move to Mississippi to be a Mississippi artist. She moved because of family,
          and the songs followed. The thesis: the South already taught everybody how to sing about
          the river. Arrie Aslin's job is to keep singing about the people who still live on it.
        </p>
      </Section>

      <Section title="Booking + press contact">
        <p>
          <strong style={{ color: 'var(--text)' }}>Booking</strong> ·{' '}
          <a href="mailto:booking@arrieaslin.com" style={{ color: 'var(--accent)' }}>
            booking@arrieaslin.com
          </a>
        </p>
        <p>
          <strong style={{ color: 'var(--text)' }}>Management</strong> · Tracy Alderson-Allen ·{' '}
          <a href="mailto:tracy@thebigmuddyinn.com" style={{ color: 'var(--accent)' }}>
            tracy@thebigmuddyinn.com
          </a>
        </p>
        <p>
          <strong style={{ color: 'var(--text)' }}>Label</strong> · Big Muddy Records (a Measurably
          Better Things LLC DBA)
        </p>
        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          High-resolution press photos and a downloadable EPK PDF post here once finalized. In the
          meantime, write to booking@arrieaslin.com and we'll send the current press packet.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          color: 'var(--accent-warm)',
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
        {children}
      </div>
    </section>
  );
}
