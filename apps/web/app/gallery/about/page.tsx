'use client';

import Link from 'next/link';

export default function GalleryAbout() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#c8943e',
          marginBottom: '1rem',
        }}>
          Art Where People Actually Live
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Punk-Chic Meets Sotheby&apos;s.
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#6b5d4a', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          A taste-led marketplace for artists who make things with their hands.
          No gatekeepers. No gallery politics. Just craft, story, and the kind of
          work that stops you mid-scroll.
        </p>
      </div>

      {/* Mission */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#c8943e',
          marginBottom: '1rem',
        }}>
          The Mission
        </h2>
        <div style={{
          background: '#faf7f2',
          border: '1px solid #e8dcc8',
          borderRadius: '12px',
          padding: '2rem',
          lineHeight: 1.8,
          color: '#2c2416',
        }}>
          <p style={{ marginBottom: '1rem' }}>
            The best art in the South isn&apos;t hanging in galleries on Magazine Street. It&apos;s
            in studios behind shotgun houses. On looms in living rooms. On the walls of places
            nobody drives to unless they know. That&apos;s where we go.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            We find it. We photograph it. We tell the story behind it. Then we give you
            a way to own it — directly from the artist, at the artist&apos;s price. No consignment
            roulette. No 50% gallery cuts. No six-month wait for a check. The maker sets the
            price. We handle the rest. They get paid.
          </p>
          <p style={{ marginBottom: '1rem', fontWeight: 600, color: '#c8943e' }}>
            Artists keep 70–80% of every sale. That&apos;s the deal. Always.
          </p>
          <p>
            Call it a cultural insurgency if you want. We call it common sense.
            The people who make the work should make the money.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#c8943e',
          marginBottom: '1.5rem',
        }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              step: '01',
              title: 'Taste-Led Curation',
              desc: 'Every artist on BCA is hand-picked. Not by algorithm — by people who care about craft, materiality, and the story behind the work. If it doesn\u2019t stop us, it won\u2019t stop you.',
            },
            {
              step: '02',
              title: 'Artist-First Economics',
              desc: 'Artists keep 70\u201380% of every sale. No consignment. No markups. No middlemen beyond us. They set the price, we move the work.',
            },
            {
              step: '03',
              title: 'Shipped or Shown',
              desc: 'Buy online and we ship it. Or see it on the walls at Big Muddy Inn and partner venues across the Delta and Ozarks. Art where people actually live.',
            },
          ].map((item) => (
            <div key={item.step} style={{
              background: '#fff',
              border: '1px solid #e8dcc8',
              borderRadius: '12px',
              padding: '1.5rem',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#c8943e',
                marginBottom: '0.5rem',
                fontFamily: 'Georgia, serif',
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6b5d4a', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Big Muddy Connection */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#c8943e',
          marginBottom: '1rem',
        }}>
          Part of Something Bigger
        </h2>
        <div style={{
          background: '#1a1610',
          borderRadius: '16px',
          padding: '2.5rem',
          color: '#e8dcc8',
        }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '600px' }}>
            BCA is one piece of a sovereign creative economy built along the Mississippi
            corridor. Every brand feeds the others. The inn fills the rooms. The radio plays
            the soundtrack. The magazine tells the stories. The gallery sells what the
            corridor makes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Big Muddy Touring', role: 'Hospitality · The Inn · Live Events', icon: '🏨' },
              { name: 'Big Muddy Radio', role: 'Broadcast · Podcasting · Music', icon: '📻' },
              { name: 'Big Muddy Magazine', role: 'Editorial · Photography · Story', icon: '📰' },
              { name: 'BuyCurious Art', role: 'Gallery · Marketplace · Curation', icon: '🎨' },
              { name: 'Big Muddy Records', role: 'Label · Recording · Distribution', icon: '🎵' },
              { name: 'Outsider Economics', role: 'The Math Behind the Movement', icon: '📐' },
            ].map((brand) => (
              <div key={brand.name} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{brand.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{brand.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#8a7d6b', marginTop: '0.25rem' }}>{brand.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>
          You make it. We move it.
        </h2>
        <p style={{ color: '#6b5d4a', marginBottom: '0.5rem', maxWidth: '500px', margin: '0 auto 0.5rem' }}>
          If you paint it, fire it, weave it, print it, or build it — we want to see it.
        </p>
        <p style={{ color: '#c8943e', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          70–80% revenue share. No consignment. No gatekeepers.
        </p>
        <Link
          href="/gallery/apply"
          style={{
            display: 'inline-block',
            background: '#c8943e',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          Apply to Sell on BCA →
        </Link>
      </section>
    </div>
  );
}
