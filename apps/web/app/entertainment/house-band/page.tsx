import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The House Band — Big Muddy Entertainment',
  description: 'A rotating cast of the best musicians on the Mississippi corridor. Like the Swampers. Like Booker T. Like the Wrecking Crew. But bigger.',
};

export default function HouseBandPage() {
  return (
    <main style={{
      background: '#0f0f0d',
      color: '#e8e0d4',
      minHeight: '100vh',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    }}>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 120px)',
        position: 'relative',
      }}>
        <img
          src="/images/studio-c/utopiademo-day-14.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
            filter: 'contrast(1.2) saturate(0.6)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(15,15,13,0.95) 0%, rgba(15,15,13,0.7) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 24px',
          }}>
            Big Muddy Entertainment
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            margin: '0 0 32px',
          }}>
            The House Band
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: 1.6,
            color: '#9b9488',
            maxWidth: '650px',
          }}>
            A rotating cast of the best musicians on the Mississippi corridor.
            Five guitar players. Ten drummers. Eight bass players.
            The call list goes deep. The sound goes deeper.
          </p>
        </div>
      </section>

      {/* THE PRECEDENT */}
      <section style={{
        padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)',
        borderTop: '1px solid rgba(200,148,62,0.1)',
      }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 20px',
          }}>
            The Precedent
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 32px',
          }}>
            Muscle Shoals had the Swampers. Memphis had Booker T. &amp; the MG&rsquo;s.
            LA had the Wrecking Crew. Natchez is next.
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#9b9488',
          }}>
            <p style={{ margin: 0 }}>
              The greatest records in American music were made by house bands. Not
              superstars &mdash; players. Session musicians who showed up every day, learned
              every song in one pass, and made everyone who walked through the door
              sound like the best version of themselves.
            </p>
            <p style={{ margin: 0 }}>
              The Swampers backed Aretha Franklin, The Rolling Stones, Cher, Bob Dylan,
              and Lynyrd Skynyrd &mdash; all in the same studio in a town of 13,000 people
              in northwest Alabama. Nobody went to Muscle Shoals for the nightlife.
              They went for the band.
            </p>
            <p style={{ margin: 0 }}>
              Natchez has 14,000 people. A 200-foot bluff over the Mississippi River.
              A blues heritage as deep as any town in the Delta. And now it has the
              console that Taylor Swift recorded on, a studio full of vintage gear,
              and a network of musicians who play like their rent depends on it.
            </p>
            <p style={{ margin: 0, color: '#c8943e', fontWeight: 600 }}>
              Because it does.
            </p>
          </div>
        </div>
      </section>

      {/* THE MODEL */}
      <section style={{
        padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)',
        borderTop: '1px solid rgba(200,148,62,0.1)',
      }}>
        <div style={{ maxWidth: '900px' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 20px',
          }}>
            How It Works
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: '0 0 48px',
          }}>
            Not a band. A roster.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
          }}>
            {[
              {
                title: 'Friday Night',
                text: 'The house band plays the Blues Room. 50 seats. No setlist. The players rotate — tonight it\'s blues, tomorrow it\'s soul, next week it\'s country. Same fire every time.',
              },
              {
                title: 'Session Work',
                text: 'A touring artist comes to Natchez to record. They don\'t bring a band — they bring songs. Our players learn them in one pass and cut the track on a 1960s console with vintage gear you can\'t find anywhere else.',
              },
              {
                title: 'The Road',
                text: 'A lean touring band that can back anyone on the corridor circuit. Memphis to New Orleans, 13 cities, 735 venues. The van is loaded. The rooms are booked. The house band travels.',
              },
              {
                title: 'Recording',
                text: 'Every show is recorded. Every session is tracked. Multi-camera video synced to multi-track audio. One night of music becomes a live album, a concert film, a radio session, and 15 social clips.',
              },
            ].map((card, i) => (
              <div key={i} style={{
                padding: '28px',
                border: '1px solid #2a2824',
                borderTop: '3px solid #c8943e',
                borderRadius: '4px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '0 0 12px',
                  color: '#e8e0d4',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: '#6b635a',
                  margin: 0,
                }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STUDIO */}
      <section style={{
        padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)',
        borderTop: '1px solid rgba(200,148,62,0.1)',
      }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 20px',
          }}>
            The Studio
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 32px',
          }}>
            A 1960s console. Vintage everything. A talented gay Frenchman who knows every knob.
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#9b9488',
          }}>
            <p style={{ margin: 0 }}>
              The console is the one Taylor Swift recorded on. It&rsquo;s from the 1960s.
              It was recently restored to factory spec. It sounds like nothing made
              in the last 40 years &mdash; because it wasn&rsquo;t.
            </p>
            <p style={{ margin: 0 }}>
              The room around it is full of vintage gear &mdash; preamps, compressors,
              EQs, tape machines &mdash; collected over decades by someone who understands
              that the signal chain is the instrument. You don&rsquo;t plug into a console
              like this and play the same way you play through a laptop.
            </p>
            <p style={{ margin: 0 }}>
              Artists don&rsquo;t come here because it&rsquo;s cheap. They come because
              there is no other room like this. The combination of the board, the gear,
              the engineer, the house band, and the town &mdash; you cannot replicate it.
              You can only come here.
            </p>
          </div>
        </div>
      </section>

      {/* THE CORRIDOR */}
      <section style={{
        padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)',
        borderTop: '1px solid rgba(200,148,62,0.1)',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c8943e',
          margin: '0 0 20px',
        }}>
          The Corridor
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: '0 0 48px',
        }}>
          Memphis to New Orleans. 400 miles of music.
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 28px',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          {['Memphis', 'Clarksdale', 'Oxford', 'Tupelo', 'Greenwood',
            'Indianola', 'Greenville', 'Jackson', 'Vicksburg',
            'Natchez', 'Baton Rouge', 'New Orleans'].map((city) => (
            <span
              key={city}
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: city === 'Natchez' ? '1.5rem' : '1.1rem',
                fontWeight: city === 'Natchez' ? 800 : 400,
                color: city === 'Natchez' ? '#c8943e' : '#4a4440',
              }}
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* THE DEAL */}
      <section style={{
        padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)',
        borderTop: '1px solid rgba(200,148,62,0.1)',
      }}>
        <div style={{ maxWidth: '700px' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 20px',
          }}>
            The Deal
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: '0 0 32px',
          }}>
            You keep 80%.
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#9b9488',
          }}>
            <p style={{ margin: 0 }}>
              80% to the artist. 15% to the label. 5% platform.
            </p>
            <p style={{ margin: 0 }}>
              We record you on a legendary console with a world-class engineer.
              We film it with cinema-quality cameras. We play it on our radio station.
              We write about you in our magazine. We promote it across every channel
              we own. And you keep 80%.
            </p>
            <p style={{ margin: 0 }}>
              Most labels take 50%. Most studios charge by the hour and you leave
              with a hard drive. We give you the session, the content, the distribution,
              the press, and the touring infrastructure &mdash; and you walk away with
              four fifths of everything.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(80px, 12vw, 180px) clamp(40px, 8vw, 120px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.1)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: '0 0 20px',
        }}>
          Come play.
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b635a',
          margin: '0 0 40px',
        }}>
          411 North Congress Street &middot; Natchez, Mississippi
        </p>
        <a
          href="mailto:booking@bigmuddytouring.com?subject=House Band Inquiry"
          style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c8943e',
            border: '1px solid #c8943e',
            padding: '16px 48px',
            textDecoration: 'none',
            borderRadius: '2px',
          }}
        >
          Get in Touch
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.08)',
      }}>
        <p style={{
          fontSize: '0.65rem',
          color: '#3a3630',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Big Muddy Entertainment &middot; Natchez, Mississippi &middot; A Hillbilly Dreams Production
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          section div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}} />
    </main>
  );
}
