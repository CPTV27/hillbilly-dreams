'use client';

import { useState } from 'react';

function NameGate({ onEnter }: { onEnter: () => void }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = name.trim().toLowerCase();
    if (normalized === 'amy' || normalized === 'amy alderson-allen' || normalized === 'amy alderson allen') {
      localStorage.setItem('portal-user', 'amy');
      onEnter();
    } else {
      setError('Access restricted. Please enter your name.');
    }
  };

  return (
    <div style={gate.container}>
      <div style={gate.inner}>
        <div style={gate.icon}>BM</div>
        <h1 style={gate.title}>Big Muddy Inn</h1>
        <p style={gate.sub}>Guest Experience &amp; Artist Operations</p>
        <form onSubmit={handleSubmit} style={gate.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Enter your name"
            style={gate.input}
            autoFocus
          />
          <button type="submit" style={gate.btn}>Enter</button>
        </form>
        {error && <p style={gate.error}>{error}</p>}
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div style={card.container}>
      <h3 style={card.title}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'green' | 'yellow' | 'red' }) {
  const colors = { green: '#2d5016', yellow: '#8b6914', red: '#8b0000' };
  const labels = { green: 'On Track', yellow: 'Needs Attention', red: 'Action Required' };
  return (
    <span style={{ ...badge.base, color: colors[status], borderColor: colors[status] }}>
      {labels[status]}
    </span>
  );
}

export default function AmyDashboard() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portal-user') === 'amy';
    }
    return false;
  });

  if (!authenticated) {
    return <NameGate onEnter={() => setAuthenticated(true)} />;
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={main.container}>
      <header style={main.header}>
        <div>
          <h1 style={main.title}>Good morning, Amy</h1>
          <p style={main.date}>{today}</p>
        </div>
        <StatusBadge status="green" />
      </header>

      <div style={main.grid}>
        <Card title="Today's Guests">
          <p style={main.empty}>— awaiting Cloudbeds integration —</p>
          <p style={main.hint}>Check-ins, check-outs, and special requests will appear here.</p>
        </Card>

        <Card title="Upcoming Events">
          <p style={main.empty}>— awaiting calendar data —</p>
          <p style={main.hint}>Artist performances, workshops, and Inn events.</p>
        </Card>

        <Card title="Artist Operations">
          <p style={main.empty}>— awaiting artist pipeline —</p>
          <p style={main.hint}>Current and upcoming Artist-in-Residence schedule.</p>
        </Card>

        <Card title="Messages from Agents">
          <div style={msg.item}>
            <span style={msg.agent}>Delta Dawn</span>
            <span style={msg.text}>Dashboard is live. Data feeds will populate as integrations come online.</span>
          </div>
          <div style={msg.item}>
            <span style={msg.agent}>Huck</span>
            <span style={msg.text}>Your portal is ready at this URL. Bookmark it on your phone.</span>
          </div>
        </Card>
      </div>

      <footer style={main.footer}>
        <p>Big Muddy Inn — Natchez, Mississippi</p>
        <p style={main.footerSub}>Powered by HDI Agent Syndicate</p>
      </footer>
    </div>
  );
}

// ── Inline Styles (warm, approachable, not Senate-formal) ──

const gate: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#faf9f6',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  inner: { textAlign: 'center', maxWidth: 380, padding: 48 },
  icon: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: '#7B1B46',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
    margin: '0 auto 20px',
    letterSpacing: '0.1em',
  },
  title: { fontSize: 22, fontWeight: 700, margin: '0 0 4px', color: '#2a2520' },
  sub: { fontSize: 14, color: '#8a8074', margin: '0 0 28px' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  input: {
    fontSize: 16,
    padding: '12px 16px',
    border: '1px solid #d4cfc7',
    borderRadius: 8,
    textAlign: 'center' as const,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  btn: {
    fontSize: 14,
    fontWeight: 600,
    padding: 12,
    background: '#7B1B46',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  error: { color: '#8b0000', fontSize: 13, marginTop: 8 },
};

const main: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: '#2a2520',
    minHeight: '100vh',
    background: '#faf9f6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingBottom: 20,
    borderBottom: '1px solid #e5e2dc',
  },
  title: { fontSize: 24, fontWeight: 700, margin: 0 },
  date: { fontSize: 14, color: '#8a8074', margin: '4px 0 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 },
  empty: { color: '#b8b0a4', fontStyle: 'italic', margin: '0 0 4px', fontSize: 14 },
  hint: { color: '#a09888', fontSize: 12, margin: 0 },
  footer: {
    marginTop: 48,
    paddingTop: 20,
    borderTop: '1px solid #e5e2dc',
    textAlign: 'center' as const,
    color: '#b8b0a4',
    fontSize: 13,
  },
  footerSub: { fontSize: 11, marginTop: 4 },
};

const card: Record<string, React.CSSProperties> = {
  container: {
    background: '#fff',
    border: '1px solid #e5e2dc',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.02em',
    margin: '0 0 12px',
    color: '#2a2520',
  },
};

const badge: Record<string, React.CSSProperties> = {
  base: {
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 10px',
    border: '1px solid',
    borderRadius: 4,
    letterSpacing: '0.05em',
  },
};

const msg: Record<string, React.CSSProperties> = {
  item: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    padding: '8px 0',
    borderBottom: '1px solid #f0ede8',
    fontSize: 13,
  },
  agent: {
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
    color: '#7B1B46',
    fontSize: 12,
  },
  text: { color: '#555' },
};
