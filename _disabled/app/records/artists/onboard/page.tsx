// apps/web/app/records/artists/onboard/page.tsx
// Band onboarding template — new bands enter their name, we auto-research everything
'use client';

import { useState } from 'react';

interface ResearchTask {
  type: string;
  status: string;
  desc: string;
}

export default function BandOnboardPage() {
  const [form, setForm] = useState({
    name: '',
    genre: '',
    city: '',
    state: 'MS',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    bio: '',
    spotify: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ artist: { slug: string; name: string }; researchTasks: ResearchTask[]; pageUrl: string } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const socialLinks: Record<string, string> = {};
      if (form.spotify) socialLinks.spotify = form.spotify;
      if (form.instagram) socialLinks.instagram = form.instagram;
      if (form.tiktok) socialLinks.tiktok = form.tiktok;
      if (form.youtube) socialLinks.youtube = form.youtube;
      if (form.website) socialLinks.website = form.website;

      const res = await fetch('/api/artists/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          genre: form.genre || undefined,
          city: form.city || undefined,
          state: form.state || undefined,
          contactName: form.contactName || undefined,
          contactEmail: form.contactEmail || undefined,
          contactPhone: form.contactPhone || undefined,
          bio: form.bio || undefined,
          socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setResult(data);
    } catch {
      setError('Network error — please try again');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md, 6px)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    color: 'var(--text-muted)',
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    marginBottom: 'var(--space-2)',
    display: 'block',
  };

  if (result) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          color: 'var(--accent)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-3)',
        }}>
          Welcome to Big Muddy Records
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 700,
          color: 'var(--text)',
          margin: '0 0 var(--space-6)',
        }}>
          {result.artist.name} is In
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-md)',
          color: 'var(--text-muted)',
          lineHeight: 'var(--leading-loose)',
          margin: '0 0 var(--space-8)',
        }}>
          Your artist profile has been created. Here&apos;s what happens next — our system
          is running automatic research on your music, socials, and press. You&apos;ll have a full
          profile page, brand kit, and content calendar within 48 hours.
        </p>

        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg, 8px)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 var(--space-4)',
          }}>
            Research Pipeline
          </h3>
          {result.researchTasks.map((task) => (
            <div key={task.type} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)' }}>○</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                flex: 1,
              }}>
                {task.desc}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--accent)',
                opacity: 0.7,
              }}>
                {task.status}
              </span>
            </div>
          ))}
        </div>

        <a href={result.pageUrl} className="btn btn--primary" style={{ marginRight: 'var(--space-4)' }}>
          View Your Profile →
        </a>
        <a href="/records/artists" className="btn btn--ghost">
          All Artists
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
      <a href="/records/artists" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--accent)',
        textDecoration: 'none',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
      }}>
        ← All Artists
      </a>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--accent)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        marginTop: 'var(--space-8)',
        marginBottom: 'var(--space-3)',
      }}>
        Join the Roster
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-3xl)',
        fontWeight: 700,
        color: 'var(--text)',
        letterSpacing: 'var(--tracking-tight)',
        margin: '0 0 var(--space-3)',
      }}>
        Band Onboarding
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-md)',
        color: 'var(--text-muted)',
        lineHeight: 'var(--leading-loose)',
        margin: '0 0 var(--space-10)',
      }}>
        Enter your band name and whatever info you have. We&apos;ll do the rest —
        auto-research your music, socials, and press, then build you a full brand kit,
        content calendar, and artist page based on the Amy Allen brand template.
        Artists own their masters. Always.
      </p>

      {error && (
        <div style={{
          background: 'rgba(200,50,50,0.1)',
          border: '1px solid rgba(200,50,50,0.3)',
          borderRadius: 'var(--radius-md, 6px)',
          padding: 'var(--space-3) var(--space-4)',
          marginBottom: 'var(--space-6)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: '#e55',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Band Name — Required */}
        <div>
          <label style={labelStyle}>Band / Artist Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Mechanical Bull"
            style={inputStyle}
          />
        </div>

        {/* Genre */}
        <div>
          <label style={labelStyle}>Genre</label>
          <select
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            style={inputStyle}
          >
            <option value="">Select genre...</option>
            <option value="blues">Blues</option>
            <option value="soul">Soul</option>
            <option value="gospel">Gospel</option>
            <option value="rock">Rock</option>
            <option value="folk">Folk</option>
            <option value="jazz">Jazz</option>
            <option value="hip-hop">Hip-Hop</option>
            <option value="country">Country</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Location */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3)' }}>
          <div>
            <label style={labelStyle}>City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Natchez"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>State</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="MS"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label style={labelStyle}>Bio / Description</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={4}
            placeholder="Tell us about your music, your story, what makes you different..."
            style={{ ...inputStyle, resize: 'vertical' as const }}
          />
        </div>

        {/* Contact */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)' }}>
          <div style={{ ...labelStyle, marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text)' }}>Contact Info</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <input type="text" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder="Contact name" style={inputStyle} />
            <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="Email" style={inputStyle} />
            <input type="tel" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} placeholder="Phone" style={inputStyle} />
          </div>
        </div>

        {/* Social Links */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)' }}>
          <div style={{ ...labelStyle, marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text)' }}>Social / Music Links</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <input type="url" value={form.spotify} onChange={(e) => setForm({ ...form, spotify: e.target.value })} placeholder="Spotify URL" style={inputStyle} />
            <input type="url" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="Instagram URL" style={inputStyle} />
            <input type="url" value={form.tiktok} onChange={(e) => setForm({ ...form, tiktok: e.target.value })} placeholder="TikTok URL" style={inputStyle} />
            <input type="url" value={form.youtube} onChange={(e) => setForm({ ...form, youtube: e.target.value })} placeholder="YouTube URL" style={inputStyle} />
            <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="Website URL" style={inputStyle} />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !form.name}
          className="btn btn--primary"
          style={{
            width: '100%',
            marginTop: 'var(--space-4)',
            opacity: submitting || !form.name ? 0.5 : 1,
            cursor: submitting || !form.name ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Creating Profile...' : 'Join Big Muddy Records'}
        </button>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-disabled)',
          textAlign: 'center',
          margin: 'var(--space-2) 0 0',
        }}>
          Just enter your name — we&apos;ll auto-research everything else.
          No commitment. Artists own their masters. Always.
        </p>
      </form>
    </div>
  );
}
