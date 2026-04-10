// apps/web/app/hillbilly/page.tsx
// Hillbilly Dreams Inc. — portfolio tour as a magazine
// Welcome → Portfolio chart → Each property as a story

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams Inc.',
  description: 'A portfolio of interesting, interconnected properties at the intersection of technology, hospitality, entertainment, and media.',
};

export default function HillbillyDreamsPage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      {/* WELCOME */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 8vw, 120px)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>Welcome To</p>
        <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.04em', margin: '0 0 32px', maxWidth: '1100px' }}>Hillbilly Dreams<br />Incorporated</h1>
        <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '720px', margin: 0 }}>
          A portfolio of interesting, interconnected properties at the intersection of technology, hospitality, entertainment, and media. A number of properties acting dynamically together.
        </p>
      </section>

      {/* THE PORTFOLIO CHART */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Portfolio</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 48px', maxWidth: '900px' }}>
          Two businesses. One ecosystem. Two creative nodes.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            { tag: 'The Entertainment Business', title: 'Big Muddy Touring', desc: 'Radio show, concerts, touring, booking, record label, magazine. The radio show is the front door — musicians come on, see the ecosystem, get hooked.' },
            { tag: 'The Product', title: 'Measurably Better Things', desc: 'Sold to towns, brokers, and banks. We clean up your digital life, make everything look amazing, and put it on autopilot. You never think about it again.' },
            { tag: 'The Vendor', title: 'Studio C', desc: 'Video production, photography, tech support, playout systems, website management. Services both Big Muddy and MBT. Operates in both markets.' },
            { tag: 'The Real Estate Vendor', title: 'Tuthill Design', desc: 'Handles real estate implementations of MBT. Existing brokerage relationships in the Hudson Valley — Brown Harris Stevens, Berkshire Hathaway, Coldwell Banker, Keller Williams.' },
          ].map((prop, i) => (
            <div key={i} style={{ padding: '32px', border: '1px solid rgba(200,148,62,0.15)', borderTop: '3px solid #c8943e', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 8px' }}>{prop.tag}</p>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 12px' }}>{prop.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>{prop.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#6b635a', fontStyle: 'italic', margin: 0 }}>
          Anchored in Natchez, Mississippi. Connected to Woodstock, New York. Two creative nodes on the American map.
        </p>
      </section>

      {/* STORY 1: BIG MUDDY TOURING */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Story One</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Big Muddy Touring
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            It started because Amy needed her band promoted. The answer wasn&rsquo;t a flyer or a Facebook post. The answer was a media company.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            We built a magazine, a record label, and a radio station. We mapped the touring corridor from Memphis to New Orleans — 13 cities, 735 venues. We booked shows. We drove the van. We recorded every performance. We wrote the stories.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            The radio show became the front door. Musicians come on to be interviewed, see the whole ecosystem, and want in. They play the Blues Room. They record at the studio. They tour the corridor. The magazine covers it. The label distributes it. The flywheel spins.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            Amy&rsquo;s band needed promotion. We built an entertainment company to do it. Now the tools work for everyone.
          </p>
        </div>
      </section>

      {/* STORY 2: MEASURABLY BETTER THINGS */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Story Two</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Measurably Better Things
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            Once we had the tools, other people started asking for them. Brokers saw the magazine and wanted their listings in it. Mayors saw the directory and wanted it for their town. Restaurant owners saw the social posts and wanted their bakery to look that good online.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            So we packaged it. Measurably Better Things is the product version of what Big Muddy does every day. We come, we shoot, we set you up, and then we put it on autopilot. You never think about your marketing again unless you want to.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            A town buys it for $10,000 and gets a content library, a business directory, and a marketing engine. A broker buys it for $500 a month and gets their listings in a magazine, on the radio, across social media. An agent pays $150 and rides under their broker&rsquo;s brand.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            Same platform. Different skin. Every vertical gets what it needs.
          </p>
        </div>
      </section>

      {/* STORY 3: STUDIO C */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Story Three</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Studio C
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            The production company that makes the rest of it possible. Video, photography, broadcast systems, websites. Studio C is the vendor that services Big Muddy and Measurably Better Things both.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            When a band plays the Blues Room, Studio C shoots it. When a broker buys MBT, Studio C shoots the listings. When a town signs on, Studio C comes for a week and captures everything. The corridor from Memphis to New Orleans. The Hudson Valley to Bearsville. Same team. Same cameras. Same eye.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            The content is the product. Studio C makes the content.
          </p>
        </div>
      </section>

      {/* STORY 4: TUTHILL DESIGN */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Story Four</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Tuthill Design
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            The real estate arm. Hudson Valley architectural and interiors photography for the brokerages that actually move houses — Brown Harris Stevens, Berkshire Hathaway, Coldwell Banker, Keller Williams, Win Morrison, Halter Associates. Airbnb and VRBO property shoots.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            When Measurably Better Things sells a real estate product, Tuthill Design handles the implementation. They already know the market, the buyers, and the properties. They&rsquo;ve been shooting for these brokerages for years.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            The existing relationships become the pilot customers.
          </p>
        </div>
      </section>

      {/* THE TWO NODES */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Two Nodes</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 48px' }}>
          Natchez, Mississippi. Woodstock, New York.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 16px' }}>Natchez, Mississippi</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 12px' }}>
              The anchor. The Big Muddy Inn, the Blues Room, the radio station, the corridor. 14,000 people on a 200-foot bluff over the river. Blues, jazz, gospel, and the oldest settlement on the Mississippi.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>
              Where the entertainment business lives.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 16px' }}>Woodstock, New York</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 12px' }}>
              The northeast node. Bearsville Creative, the Hudson Valley photography business, the Tuthill Design clientele. Arts and culture. Same playbook, different river.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>
              Where the product pilots with real estate.
            </p>
          </div>
        </div>
      </section>

      {/* THE TECHNOLOGY */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Technology</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px', maxWidth: '800px' }}>
          One platform. Every brand runs on it.
        </h2>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            A single codebase serves every Hillbilly Dreams property. The magazine, the radio station, the record label, the directory, the touring engine, the Inn, the product pages — all one system. Different skins. Same engine.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            AI handles the daily work. Photos get tagged automatically. Social posts get generated and scheduled. Reviews get managed. The radio station runs itself. The content flywheel turns without a human touching it.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            When a broker or a town buys Measurably Better Things, they&rsquo;re buying access to the same platform that runs Big Muddy. The difference is the skin, the brand, and the content. The engine is already proven.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            We built it for ourselves first. Now it works for everyone.
          </p>
        </div>
      </section>

      {/* THE PEOPLE */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The People</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 48px' }}>
          A small team with big leverage.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { name: 'Chase Pierson', role: 'Founder, Creative Director', bio: 'Photography, architecture, the radio show, the story. Twenty-five years behind the lens. Wrote Outsider Economics.' },
            { name: 'Tracy Alderson-Allen', role: 'Executive Producer, Finance', bio: 'Runs the Inn, edits the magazine, keeps the books honest. Equity partner. Nothing ships without her sign-off.' },
            { name: 'Amy Allen', role: 'Inn & Bar Operations, Musician', bio: 'The reason this all started. Runs the hospitality side, plays the room, knows every guest by name. Equity partner.' },
            { name: 'Elijah & Miles', role: 'Bearsville Creative', bio: 'The northeast node. Arts and culture programming in Woodstock. Activating summer 2026.' },
          ].map((person, i) => (
            <div key={i} style={{ padding: '24px', borderLeft: '2px solid #c8943e' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px' }}>{person.name}</h3>
              <p style={{ fontSize: '0.7rem', color: '#c8943e', margin: '0 0 12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{person.role}</p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: 'clamp(80px, 12vw, 180px) clamp(40px, 8vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, margin: '0 0 24px' }}>
          Hillbilly Dreams Incorporated.
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#9b9488', margin: 0 }}>
          Natchez, Mississippi + Woodstock, New York.
        </p>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.08)' }}>
        <p style={{ fontSize: '0.6rem', color: '#2a2620', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Hillbilly Dreams Inc &middot; A portfolio of interesting, interconnected properties
        </p>
      </footer>
    </main>
  );
}
