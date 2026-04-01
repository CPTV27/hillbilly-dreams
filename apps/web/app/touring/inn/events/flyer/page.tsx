import React from 'react';

export default function EventFlyerPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0eb', fontFamily: 'var(--font-body)', padding: '40px', display: 'flex', justifyContent: 'center' }}>
      
      {/* Flyer Container (Aspect ratio resembles an 11x17 poster) */}
      <div style={{ width: '100%', maxWidth: '600px', background: '#111', border: '1px solid #333', padding: '40px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative background accent */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(200,148,62,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          
          <div style={{ letterSpacing: '4px', textTransform: 'uppercase', color: '#c8943e', fontSize: '14px', marginBottom: '30px', fontWeight: 600 }}>
            The Big Muddy Inn Presents
          </div>

          <h1 style={{ fontSize: '5rem', margin: '0 0 10px', lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px' }}>
            FRIDAY<br />NIGHT<br />BLUES
          </h1>
          
          <div style={{ height: '4px', background: '#c8943e', width: '60px', margin: '30px auto' }} />

          <h2 style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 400, color: '#ccc', margin: '0 0 40px' }}>
            Live in the Blues Room
          </h2>

          <div style={{ border: '2px solid #333', padding: '30px', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px', color: '#c8943e' }}>Featuring Resident Artist</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase' }}>Arri Aslin</div>
            <p style={{ color: '#888', marginTop: '10px' }}>& Special Guests from Big Muddy Records</p>
          </div>

          <div style={{ fontSize: '1.2rem', letterSpacing: '1px', lineHeight: 1.6, marginBottom: '50px' }}>
            <strong>EVERY FRIDAY</strong> <br />
            DOORS AT 7:00 PM <br />
            MUSIC AT 8:30 PM <br />
            <span style={{ color: '#c8943e', fontWeight: 700 }}>FREE ENTRY • BYO-LIQUOR</span>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#666', borderTop: '1px solid #333', paddingTop: '20px' }}>
            THE BIG MUDDY INN & BLUES ROOM <br />
            411 N Commerce St, Natchez, MS
          </div>
          
        </div>
      </div>

    </div>
  );
}
