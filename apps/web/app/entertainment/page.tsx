// apps/web/app/entertainment/page.tsx
// Big Muddy Entertainment — bigmuddyentertainment.com
//
// This is the entertainment COMPANY page. We book bands, promote shows,
// provide transportation, and run the media machine behind it all.
// NOT a SaaS platform. NOT edtech. This is rock and roll logistics.

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Big Muddy Entertainment — Your All-Access Pass to the Deep South',
  description:
    'Booking, promotion, and production for the Deep South. The bands, the van, the PA, and the audience. One call, one show, one hell of a night.',
};

export default function EntertainmentPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* ── Hero: The Van ── */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '4rem 5%',
        overflow: 'hidden',
      }}>
        <Image
          src="/images/processed/big-muddy/save-the-hall-ball-003.webp"
          alt="Save the Hall Ball at Stanton Hall, Natchez — March 2026. Photo by Chase Pierson"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.6) contrast(1.1)' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)',
          zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}>
            Big Muddy Entertainment
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            Your all-access pass<br />to the Deep South.
          </h1>
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '500px',
          }}>
            Booking, promotion, transport, and production for bands and venues
            along the Deep South. One call. One show. We handle everything.
          </p>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          The Entertainment Company
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '3rem', maxWidth: '600px' }}>
          We book the bands. We drive the van. We run the sound. We promote the show. We fill the room.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1px',
          backgroundColor: 'var(--border)',
        }}>
          {[
            {
              title: 'Booking',
              desc: 'We match bands to venues across the Deep South. Natchez to Memphis, Clarksdale to New Orleans. We know the rooms, the audiences, and the deals.',
            },
            {
              title: 'Transport',
              desc: 'Black Sprinter van with a PA system in the back. We drive, you play. Sleeper bus coming for longer runs. Travel in style.',
            },
            {
              title: 'Production',
              desc: 'Sound, lights, stage management. We bring what the venue needs. From a 40-seat Blues Room to a 500-seat theater.',
            },
            {
              title: 'Promotion',
              desc: 'Every show gets the full media company behind it. Big Muddy Magazine writes the preview. Radio plays the music. Social posts go out. The audience shows up.',
            },
            {
              title: 'Recording',
              desc: 'Every show can be a live recording. Board mix at minimum, multitrack when the room is right. Released through Big Muddy Records.',
            },
            {
              title: 'The Whole Network',
              desc: 'Venues end up in the Deep South Directory. Bands end up on the radio. Shows become Magazine features. One booking feeds the entire ecosystem.',
            },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '2rem',
              backgroundColor: 'var(--bg)',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Brands ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          The Family
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
          Every division feeds the others.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { name: 'Big Muddy Touring', tag: 'The Circuit', url: 'https://bigmuddytouring.com', desc: '18 cities. Real venues. Real audiences. We book the shows and drive the bands.' },
            { name: 'Big Muddy Radio', tag: 'The Sound', url: 'https://bigmuddyradio.com', desc: 'Streaming worldwide. Live sessions from the Blues Room. No algorithms, just music.' },
            { name: 'Big Muddy Records', tag: 'The Label', url: 'https://bigmuddyrecordlabel.com', desc: 'Non-exclusive. You keep your masters. We distribute, promote, and sell your music.' },
            { name: 'Big Muddy Magazine', tag: 'The Story', url: 'https://bigmuddymagazine.com', desc: 'Long-form editorial about the region. Every show gets a feature. Every artist gets a profile.' },
          ].map((brand) => (
            <a key={brand.name} href={brand.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              padding: '2rem',
              border: '1px solid var(--border)',
              textDecoration: 'none',
              color: 'var(--text)',
            }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                {brand.tag}
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {brand.name}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {brand.desc}
              </p>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>
                {brand.url.replace('https://', '')} →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── The House Band: Modern Muscle Shoals ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            The House Band
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '2rem' }}>
            You bring the songs.<br />
            We bring the band.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Natchez is building a world-class rhythm section — bass, drums, keys, guitar —
            that visiting artists perform with. Fly in or ride down in the Sprinter.
            Walk into the Blues Room. Play with musicians who already know the pocket.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Think Muscle Shoals. The Swampers backed everyone from Aretha to the Stones
            because the house band was that good. We&apos;re building the same thing on the
            Mississippi — a rhythm section so locked in that artists come from Europe to play with them.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}>
            {[
              {
                title: 'Solo Artists',
                desc: 'Bring your songs, sing with the house band. We handle the rest — sound, recording, promotion.',
              },
              {
                title: 'Touring Acts',
                desc: 'Already have a band? Play the circuit. Or sit in with the house band for a special session.',
              },
              {
                title: 'Recording Sessions',
                desc: 'Every performance can be a live album. Board mix at minimum, multitrack when the room is right. Released on Big Muddy Records.',
              },
            ].map((item) => (
              <div key={item.title} style={{ padding: '1.5rem', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)', fontStyle: 'italic' }}>
            The record label makes it real. Non-exclusive deal — you keep your masters,
            we promote you through the magazine, the radio, the store, and the touring circuit.
            Every tool you need to succeed, under one roof.
          </p>
        </div>
      </section>

      {/* ── For Bands ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1000px' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              For Bands
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '1.5rem' }}>
              Sign with us and the whole machine works for you.
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Booked shows across the Deep South',
                'Transportation — we drive, you play',
                'Radio airplay on Big Muddy Radio',
                'Magazine feature in Big Muddy Magazine',
                'Non-exclusive record deal — you keep your masters',
                'Your music in the Big Muddy catalog and store',
                'Social media promotion for every show',
              ].map((item) => (
                <li key={item} style={{
                  padding: '0.6rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="mailto:music@bigmuddyrecordlabel.com" style={{
              display: 'inline-block',
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}>
              Get in Touch
            </a>
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              For Venues
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '1.5rem' }}>
              We bring the talent, the crowd, and the story.
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Curated talent from the Big Muddy roster',
                'Full production — PA, sound, stage management',
                'Promotion through our media company',
                'Your venue in the Deep South Directory',
                'Magazine and radio coverage of every show',
                'Show recaps and photo sets for your marketing',
              ].map((item) => (
                <li key={item} style={{
                  padding: '0.6rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="mailto:chase@hillbillydreamsinc.com" style={{
              display: 'inline-block',
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}>
              Book a Show
            </a>
          </div>
        </div>
      </section>

      {/* ── Arrie Aslin Feature ── */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '4rem 5%',
        overflow: 'hidden',
      }}>
        <Image
          src="/images/processed/arrie-aslin-inn-portrait.webp"
          alt="Arrie Aslin performing at The Big Muddy Inn"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.5)' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)',
          zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Artist in Residence
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, lineHeight: 1.05, marginBottom: '1rem' }}>
            Arrie Aslin &amp; Rise Up
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
            Gospel, soul, and the American songbook — performed live at the Blues Room
            and on stages across the region. Arrie is the first artist in the Big Muddy
            touring roster, and the proof that the machine works.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '3rem 5%',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Natchez, Mississippi. The route starts here.
        </p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-disabled)' }}>
          Powered by Measurably Better Things · Hillbilly Dreams Inc
        </p>
      </footer>
    </main>
  );
}
