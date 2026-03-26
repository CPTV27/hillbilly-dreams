// Welcome, Amy — on-network talent and Rise Up performer
// Server component. Imports TourCard from ../owen/TourCard.
// Warmer tone — she's talent, not an executive reading a memo.

import TourCard, { type StopProps } from '../../components/TourCard';

const C = {
  bg: '#ffffff',
  bgPage: '#f8f9fa',
  border: '#e8eaed',
  text: '#202124',
  textSecondary: '#5f6368',
  textTertiary: '#9aa0a6',
};

const stops: StopProps[] = [
  {
    step: '01',
    title: 'Hillbilly Dreams',
    href: '/hillbilly-dreams',
    description:
      'The big picture. Where you fit. This is the holding company — the inn, the label, the touring circuit, the tech platform — and how your work as Rise Up\'s lead vocalist sits at the center of all of it.',
    isFinal: false,
  },
  {
    step: '02',
    title: 'The Mission',
    href: '/measurably-better/thesis',
    description:
      'The mission. Why this matters. "Amy belongs on stage, not answering emails." The whole platform is built so the technology does the admin work and the people can do what they\'re actually good at.',
    isFinal: false,
  },
  {
    step: '03',
    title: 'The Nexus',
    href: '/big-muddy',
    description:
      'The ecosystem. Entertainment is the heartbeat. See how a single show you play ripples across the magazine, the radio, the records catalog, and the touring route — all at once.',
    isFinal: false,
  },
  {
    step: '04',
    title: 'Measurably Better',
    href: '/measurably-better',
    description:
      'The technology. How it supports what you do on stage. This is the platform side — the tools that handle booking, ticketing, marketing, and fan reach so you don\'t have to.',
    isFinal: false,
  },
  {
    step: '05',
    title: 'The Full Report',
    href: '/strategy',
    description:
      'The full picture — the business, the plan, the road ahead, and what Rise Up looks like at scale. Password: amy',
    isFinal: true,
  },
];

export default function WelcomeAmy() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bgPage,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        padding: '0 0 80px',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: C.bg,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.textTertiary,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          Measurably Better
        </span>
      </div>

      {/* Content wrapper */}
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div style={{ paddingTop: 64, paddingBottom: 48 }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}
          >
            Welcome, Amy.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.textSecondary,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 520,
            }}
          >
            This is a quick look at the world you're already part of — from the
            outside in. Five stops. Start wherever makes sense to you.
          </p>
        </div>

        {/* Tour stops */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stops.map((stop) => (
            <TourCard key={stop.step} {...stop} />
          ))}
        </div>

        {/* Action Items */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>Your Action Items</h2>
          <p style={{ fontSize: 14, color: C.textSecondary, margin: '0 0 20px' }}>Online presence &amp; operations. Check off what&apos;s done.</p>

          {[
            { priority: 'CRITICAL', items: [
              { task: 'Get listed on Booking.com', note: 'Biggest gap. Feeds Google Hotel Ads. Captures international traffic.', done: false },
              { task: 'Get listed on Expedia', note: 'Syndicates to Hotels.com, Orbitz, Travelocity, VRBO automatically.', done: false },
              { task: 'Push Google reviews past 25+', note: 'Currently at 15 reviews (all 5-star). Actively ask guests to review.', done: false },
            ]},
            { priority: 'HIGH', items: [
              { task: 'Verify Google Business Profile is claimed', note: 'Confirm you control the GBP. Update hours. Add more photos.', done: false },
              { task: 'Claim TripAdvisor listing', note: 'Listing exists. Upload professional photos. Respond to reviews.', done: false },
              { task: 'Fix Yelp category', note: 'Currently listed as "Music Venues" only. Add "Boutique Hotels."', done: false },
              { task: 'Verify all 6 Airbnb suites are listed', note: 'Only 3 found (Muddy Waters, John Lee Hooker, Robert Johnson). Check the other 3.', done: false },
            ]},
            { priority: 'MEDIUM', items: [
              { task: 'Remove July-August 2025 closure notice from website', note: 'If still showing on thebigmuddyinn.com, remove or update.', done: false },
              { task: 'Keep Facebook events current', note: 'Post Blues Room shows as Facebook Events.', done: false },
              { task: 'Instagram: verify bio has booking link', note: 'Bio should have link, address, phone. Post consistently.', done: false },
              { task: 'Keep Nextdoor updated with events', note: 'Good for local awareness. Post Blues Room shows.', done: false },
              { task: 'Add Blues Room as separate TripAdvisor "Things to Do"', note: 'Separate from the hotel listing.', done: false },
            ]},
          ].map((group) => (
            <div key={group.priority} style={{ marginBottom: 20 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                color: group.priority === 'CRITICAL' ? '#c00' : group.priority === 'HIGH' ? '#b45309' : '#5f6368',
                backgroundColor: group.priority === 'CRITICAL' ? 'rgba(204,0,0,0.06)' : group.priority === 'HIGH' ? 'rgba(180,83,9,0.06)' : 'rgba(95,99,104,0.06)',
                padding: '2px 8px', borderRadius: 4,
              }}>{group.priority}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {group.items.map((item) => (
                  <div key={item.task} style={{
                    backgroundColor: '#ffffff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px',
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 4px' }}>
                      {item.done ? '\u2705' : '\u2B1C'} {item.task}
                    </p>
                    <p style={{ fontSize: 12, color: C.textTertiary, margin: 0 }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: C.text,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Questions? Call Chase directly.
          </p>
          <p
            style={{
              fontSize: 13,
              color: C.textTertiary,
              margin: 0,
            }}
          >
            Built with HDX &mdash; Hillbilly Dreams, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
