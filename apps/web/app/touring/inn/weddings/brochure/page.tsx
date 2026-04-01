import React from 'react';

export default function WeddingBrochurePage() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh', color: '#0a0a0a', fontFamily: 'var(--font-display)', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '60px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #e5e0db' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '60px', borderBottom: '2px solid #c8943e', paddingBottom: '30px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px', fontWeight: 400, letterSpacing: '2px' }}>THE BIG MUDDY INN</h1>
          <p style={{ fontSize: '1.2rem', margin: 0, color: '#666', fontStyle: 'italic' }}>Natchez, Mississippi</p>
          <div style={{ marginTop: '20px', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#c8943e' }}>
            Destination Weddings & Private Events
          </div>
        </header>

        {/* Intro */}
        <section style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '20px' }}>Your Weekend on the River</h2>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#444' }}>
            Intimate weddings in a historic Natchez inn. Six rooms, live blues, a photographer who lives here, 
            and the entire Mississippi corridor as your backdrop. No traffic, no crowds—just you and your closest friends, 
            taking over a 19th-century property for the weekend.
          </p>
        </section>

        {/* Packages */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '30px' }}>Our Packages</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Intimate */}
            <div style={{ background: '#faf8f5', padding: '30px', borderTop: '3px solid #666' }}>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 5px' }}>The Intimate Weekend</h3>
              <p style={{ color: '#c8943e', fontWeight: 600, fontSize: '1.2rem', margin: '0 0 20px' }}>$4,500</p>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.6, color: '#555' }}>
                <li>Full inn buyout (6 rooms, 2 nights)</li>
                <li>Blues Room ceremony or reception</li>
                <li>Front porch cocktail hour</li>
                <li>Live acoustic music by Arrie Aslin</li>
                <li>Photography by Chase Pierson (4 hours)</li>
              </ul>
            </div>

            {/* Full Muddy */}
            <div style={{ background: '#faf8f5', padding: '30px', borderTop: '3px solid #c8943e' }}>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 5px' }}>The Full Muddy</h3>
              <p style={{ color: '#c8943e', fontWeight: 600, fontSize: '1.2rem', margin: '0 0 20px' }}>$8,500</p>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.6, color: '#555' }}>
                <li>Everything in Intimate</li>
                <li>Extended photography (8 hours)</li>
                <li>Rehearsal dinner coordination</li>
                <li>Live band for reception</li>
                <li>Day-of coordination & Social Media Package</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer style={{ textAlign: 'center', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}><strong>Ready to start planning?</strong></p>
          <p style={{ margin: '0', color: '#666' }}>weddings@bigmuddyinn.com | (601) 555-0199 | 411 N Commerce St. Natchez, MS</p>
        </footer>
        
      </div>
      
      {/* Print styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; }
          div { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; border: none !important; }
        }
      `}} />
    </div>
  );
}
