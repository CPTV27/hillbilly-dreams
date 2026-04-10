import type { Metadata } from 'next';
import { imageBadgeStyle } from '@/lib/content-status';

export const metadata: Metadata = {
  title: 'MBT Real Estate — For Brokers & Agents',
  description: 'Your listings in a magazine, on the radio, and across social media. Set it up once, never think about it again.',
};

export default function MBTRealEstatePage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/victorian-mansion-natchez.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.1) 60%, transparent 100%)' }} />
        <span style={imageBadgeStyle('borrowed')!}>BORROWED</span>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>Measurably Better Things — Real Estate</p>
          <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 24px' }}>We shoot it. We set it up. You never think about it again.</h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '550px', margin: 0 }}>Your listings in a magazine, on the radio, and across social media. Produced by the same team that shoots for Brown Harris Stevens and Berkshire Hathaway.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <div style={{ maxWidth: '700px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>How It Works</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 32px' }}>Three steps. Then autopilot.</h2>
          {[
            { step: '01', title: 'We come shoot', desc: 'Professional video and photography of your top listings. Same quality as a magazine editorial. One day, everything captured.' },
            { step: '02', title: 'We set you up', desc: 'Directory profile, social accounts configured, AI content engine activated. Your brand looks like it has a marketing department behind it.' },
            { step: '03', title: 'It runs itself', desc: 'AI generates social posts from your photos. Magazine features your market. Radio mentions your listings. You get a report. That is it.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '2rem', fontWeight: 800, color: '#c8943e', lineHeight: 1, minWidth: '50px' }}>{item.step}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#9b9488', margin: '16px 0 0' }}>Need a refresh? We come back and shoot new content. Or upload your own photos and the AI handles the rest.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Pricing — Broker</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 16px' }}>$1,500 setup. $500 first month. Then you pick.</h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#9b9488', margin: '0 0 48px', maxWidth: '550px' }}>No contract. Content in the first week. Pick your tier after 30 days. Walk away if it is not working.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { tier: 'Platform', price: '$199', period: '/mo', features: ['Directory listing', 'AI social content (8 posts/mo)', 'Analytics dashboard', 'Review management'] },
            { tier: 'Marketing', price: '$500', period: '/mo', features: ['Everything in Platform', 'Monthly video content', 'Magazine feature', 'Professional photography', 'Radio mention'] },
            { tier: 'Production', price: '$1,500', period: '/mo', features: ['Everything in Marketing', 'Dedicated monthly shoot day', 'Custom video per listing', 'Neighborhood mini-docs', 'Full social management'] },
          ].map((plan, i) => (
            <div key={i} style={{ padding: '28px', border: '1px solid rgba(200,148,62,0.15)', borderTop: i === 1 ? '3px solid #c8943e' : '1px solid rgba(200,148,62,0.15)', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: i === 1 ? '#c8943e' : '#6b635a', margin: '0 0 8px' }}>{plan.tier}</p>
              <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '2.5rem', fontWeight: 800, margin: '0 0 4px', lineHeight: 1 }}>{plan.price}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#6b635a' }}>{plan.period}</span></p>
              <div style={{ marginTop: '16px' }}>
                {plan.features.map((f, j) => (
                  <p key={j} style={{ fontSize: '0.8rem', color: '#9b9488', margin: '0 0 6px', paddingLeft: '12px', borderLeft: '1px solid rgba(200,148,62,0.2)' }}>{f}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>For Agents</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 24px' }}>Under the broker. $99–150/mo.</h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#9b9488', maxWidth: '550px', margin: 0 }}>Platform tools — AI social posts for your listings, analytics, review management. The broker's content and brand trickles down. You look professional without doing the work.</p>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Two Pilots</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '28px', border: '1px solid rgba(200,148,62,0.15)', borderRadius: '4px' }}>
            <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px' }}>Woodstock, NY</h3>
            <p style={{ fontSize: '0.8rem', color: '#c8943e', margin: '0 0 12px', fontWeight: 600 }}>Vicki Wolpert &middot; Hudson Valley</p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>Fulfilled by Tuthill Design. Existing relationship. Ready to close.</p>
          </div>
          <div style={{ padding: '28px', border: '1px solid rgba(200,148,62,0.15)', borderRadius: '4px' }}>
            <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px' }}>Natchez, MS</h3>
            <p style={{ fontSize: '0.8rem', color: '#c8943e', margin: '0 0 12px', fontWeight: 600 }}>Founding Broker &middot; TBD</p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>Fulfilled by Studio C. Bundled with the town kickstart — the crew is already in town.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(40px, 8vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.95, margin: '0 0 16px' }}>Same team. Same quality. Your brand.</h2>
        <p style={{ fontSize: '1rem', color: '#6b635a', margin: 0 }}>Measurably Better Things &middot; A Hillbilly Dreams Company</p>
      </section>
    </main>
  );
}
