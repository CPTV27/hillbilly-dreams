import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Muddy Entertainment — It\'s All Connecting',
  description: 'A media company on the Mississippi River. Touring, records, radio, magazine, and a house band. Natchez, Mississippi.',
};

export default function ReaPage() {
  return (
    <main style={{
      background: '#0a0a08',
      color: '#e8e0d4',
      minHeight: '100vh',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      margin: 0,
      padding: 0,
    }}>

      {/* HERO */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/corridor/natchez-bluff-river-view.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.15) 60%, rgba(10,10,8,0.05) 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            margin: '0 0 24px',
          }}>
            It&rsquo;s All<br />Connecting
          </h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: '#9b9488',
            margin: 0,
            maxWidth: '400px',
            lineHeight: 1.5,
          }}>
            Big Muddy Entertainment<br />
            Natchez, Mississippi
          </p>
        </div>
      </section>

      {/* THE TOWN */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/corridor/victorian-mansion-natchez.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#e8e0d4',
            margin: '0 0 16px',
          }}>
            14,000 people on a 200-foot bluff over the Mississippi River.
            The oldest settlement on the river. Blues, jazz, gospel &mdash;
            the music here is older than the recordings.
          </p>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#9b9488',
            margin: 0,
          }}>
            Natchez never got famous the way Memphis did or New Orleans did.
            The architecture survived. The culture survived. The soul of the
            place is still intact &mdash; and that&rsquo;s the foundation.
          </p>
        </div>
      </section>

      {/* BIG MUDDY TOURING */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/corridor/street-musician-guitar.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 16px',
          }}>
            Big Muddy Touring
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            400 miles of venues most people have never heard of.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: 0,
          }}>
            Memphis to New Orleans. 13 cities. 735 venues. We find the artists,
            bring them down the corridor, and let them play with the house band.
            Record the music. Perform live on the circuit. Share what comes out of it.
          </p>
        </div>
      </section>

      {/* CORRIDOR CITIES */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(32px, 6vw, 80px)',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '4px 24px',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          {['Memphis', 'Clarksdale', 'Oxford', 'Tupelo', 'Holly Springs',
            'Greenwood', 'Indianola', 'Greenville', 'Jackson', 'Vicksburg',
            'Natchez', 'Baton Rouge', 'New Orleans'].map((city) => (
            <span
              key={city}
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: city === 'Natchez' ? '1.8rem' : '1rem',
                fontWeight: city === 'Natchez' ? 800 : 400,
                color: city === 'Natchez' ? '#c8943e' : '#3a3630',
              }}
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* BIG MUDDY RECORDS */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/studio-c/utopiademo-day-2.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 16px',
          }}>
            Big Muddy Records
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            Keep your masters. Get the machine.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: 0,
          }}>
            Recording. Distribution. Radio play. Magazine coverage. A corridor
            of venues. The audience is already there. The music just has to be good.
          </p>
        </div>
      </section>

      {/* BIG MUDDY RADIO */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/corridor/natchez-night-lounge.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 16px',
          }}>
            Big Muddy Radio
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            Recorded Tuesday. On the air Wednesday.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: 0,
          }}>
            Streaming from Natchez. Live sessions, corridor music, interviews.
            Every show we produce goes straight to the station.
          </p>
        </div>
      </section>

      {/* BIG MUDDY MAGAZINE */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/corridor/historic-home-natchez.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 16px',
          }}>
            Big Muddy Magazine
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            The stories are already here. Somebody has to tell them right.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: 0,
          }}>
            The music, the food, the architecture, the people.
            Real editorial. Real photography. Every artist on the corridor
            gets the feature they deserve.
          </p>
        </div>
      </section>

      {/* THE STUDIO — the hole */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/studio-c/utopiademo-day-30.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.7) 30%, rgba(10,10,8,0.1) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 16px',
          }}>
            The Recording Studio
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            The one piece that&rsquo;s missing.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: '0 0 16px',
          }}>
            A touring company. A record label. A radio station. A magazine.
            A 50-seat room. A house band. A van full of cameras and a PA.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: '#e8e0d4',
            margin: 0,
          }}>
            The hole in the middle is a recording studio. The right room
            with the right gear turns all of this into something permanent.
          </p>
        </div>
      </section>

      {/* THE HOUSE BAND */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/corridor/drummer-pearl-kit.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.6) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 6vw, 80px)',
          maxWidth: '650px',
        }}>
          <p style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 16px',
          }}>
            The House Band
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            Muscle Shoals had the Swampers. Memphis had Booker T.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: 0,
          }}>
            Session musicians who show up every day, learn every song in one pass,
            and make everyone who walks through the door sound like the best version
            of themselves. That model built American music. Natchez is next.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        padding: 'clamp(80px, 12vw, 160px) clamp(32px, 6vw, 80px)',
      }}>
        <div style={{ maxWidth: '550px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 32px',
          }}>
            One show becomes everything.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: '0 0 32px',
          }}>
            A band plays the Blues Room on a Friday night. By Monday:
          </p>
          {[
            'Magazine feature with real photography',
            'Radio session on Big Muddy Radio',
            'Multi-camera concert film',
            'Social clips from the footage',
            'Live album from the multi-track',
            'Next show booked on the corridor',
          ].map((item, i) => (
            <p key={i} style={{
              fontSize: '1rem',
              color: '#e8e0d4',
              margin: '0 0 12px',
              paddingLeft: '20px',
              borderLeft: '2px solid #c8943e',
            }}>
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <img
          src="/images/dsd/mississippi-sunset.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(10,10,8,0.6) 0%, rgba(10,10,8,0.85) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            margin: '0 0 16px',
          }}>
            Natchez, Mississippi.
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#9b9488',
            margin: 0,
          }}>
            On the river. Where it all connects.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '32px',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.06)',
      }}>
        <p style={{
          fontSize: '0.6rem',
          color: '#2a2620',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Big Muddy Entertainment &middot; Natchez, Mississippi
        </p>
      </footer>

    </main>
  );
}
