'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GalleryAbout() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          About BuyCurious Art
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#6b5d4a', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          A curated marketplace for Southern artists — painters, photographers, ceramicists, textile artists, and the people who make things with their hands.
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
            BuyCurious Art exists because the best art in the South isn't in galleries on Magazine Street or Beale. It's in studios behind shotgun houses, in workshops next to anagama kilns, on looms in living rooms, and on walls in places nobody drives to unless they know.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            We find it, photograph it, tell the story behind it, and give you a way to own it. Every artist on BCA sells direct. No consignment games, no 50% gallery cuts, no waiting six months for a check. The artist sets the price, we handle the transaction, and they get paid.
          </p>
          <p>
            BCA is part of the <strong>Big Muddy</strong> ecosystem — connected to Big Muddy Touring (the hospitality company), Big Muddy Radio (the station), and Big Muddy Magazine (the editorial voice). When you buy art here, you're buying into a world that extends past the frame.
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
              title: 'Curated Artists',
              desc: 'Every artist on BCA is reviewed by our editorial team. We look for craft, story, and the kind of work that makes you stop scrolling.',
            },
            {
              step: '02',
              title: 'Direct Sales',
              desc: 'Artists set their own prices. BCA takes a flat 15% commission. No consignment, no markups, no middlemen beyond us.',
            },
            {
              step: '03',
              title: 'Shipped or Shown',
              desc: 'Purchase online for shipping, or see the work in person at Big Muddy Inn and partner venues across the Delta and Ozarks.',
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
          The Big Muddy Ecosystem
        </h2>
        <div style={{
          background: '#1a1610',
          borderRadius: '16px',
          padding: '2.5rem',
          color: '#e8dcc8',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Big Muddy Touring', role: 'Hospitality · The Inn · Live Events', icon: '🏨' },
              { name: 'Big Muddy Radio', role: 'Broadcast · Podcasting · Music', icon: '📻' },
              { name: 'Big Muddy Magazine', role: 'Editorial · Photography · Story', icon: '📰' },
              { name: 'BuyCurious Art', role: 'Gallery · Marketplace · Curation', icon: '🎨' },
              { name: 'Big Muddy Records', role: 'Label · Recording · Distribution', icon: '🎵' },
              { name: 'Big Muddy Studio', role: 'Production · Audio · Video', icon: '🎬' },
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
          Are you an artist?
        </h2>
        <p style={{ color: '#6b5d4a', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          We're always looking for Southern makers doing real work. If you paint it, fire it, weave it, print it, or build it — we want to see it.
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
