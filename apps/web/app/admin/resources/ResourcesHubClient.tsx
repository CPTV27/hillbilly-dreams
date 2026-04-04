'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Digital archive + Sovereign Blue — no Tailwind */
const C = {
  paper: '#0c1222',
  ink: '#f1f5f9',
  muted: '#94a3b8',
  rail: '#080c18',
  accent: '#38bdf8',
  accentDim: 'rgba(56, 189, 248, 0.15)',
  border: 'rgba(148, 163, 184, 0.25)',
  card: 'rgba(15, 23, 42, 0.85)',
};

type ResourceTask = {
  id: string;
  label: string;
  credits: number;
  /** Maps to `LoreEntry.namespace` when you submit / verify. */
  loreNamespace?: string;
};

type Resource = {
  id: string;
  title: string;
  chapter: string;
  summary: string;
  tasks: ResourceTask[];
};

const RESOURCES: Resource[] = [
  {
    id: 'ch-extraction',
    title: 'The Extraction Trap',
    chapter: 'Field manual · Book / site mirror',
    summary:
      'Why dollars leave the zip code in 48 hours—and how a verified directory changes the physics of who gets seen.',
    tasks: [
      {
        id: 't1',
        label: 'Verify 3 directory fields for one Natchez business',
        credits: 30,
        loreNamespace: 'vetted',
      },
      {
        id: 't2',
        label: 'Lore quiz: local multiplier (4/5 to pass)',
        credits: 20,
        loreNamespace: 'vetted',
      },
    ],
  },
  {
    id: 'ch-land',
    title: 'Land vetting & signal',
    chapter: 'Sovereign QR → DSD Scout',
    summary:
      'From reading a chapter to proving you can read a parcel card: the lab opens only after the manual does its job.',
    tasks: [
      {
        id: 't3',
        label: 'Scout task: parcel / ownership signal (pilot rubric)',
        credits: 50,
        loreNamespace: 'scout',
      },
    ],
  },
  {
    id: 'ch-lab',
    title: 'The Laboratory',
    chapter: 'DeepLore + Outsider Economics corpus',
    summary:
      'The AI Librarian below is scoped to approved book chapters and local DeepLore—Vertex hook lands here next.',
    tasks: [
      {
        id: 't4',
        label: 'Submit one vetted LoreEntry (namespace: vetted)',
        credits: 40,
        loreNamespace: 'vetted',
      },
    ],
  },
];

type ChatMsg = { role: 'user' | 'librarian'; text: string };

export function ResourcesHubClient({ initialCredits }: { initialCredits: number }) {
  const [activeId, setActiveId] = useState(RESOURCES[0]!.id);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatMsg[]>([
    {
      role: 'librarian',
      text: "I'm the AI Librarian (placeholder). When Vertex + RAG wire up, I'll answer only from Outsider Economics and your DeepLore index. What's the chapter about?",
    },
  ]);

  const active = useMemo(() => RESOURCES.find((r) => r.id === activeId) ?? RESOURCES[0]!, [activeId]);

  function send(): void {
    const q = input.trim();
    if (!q) return;
    setInput('');
    setChat((c) => [...c, { role: 'user', text: q }]);
    setTimeout(() => {
      setChat((c) => [
        ...c,
        {
          role: 'librarian',
          text: '[Placeholder] RAG not connected. CC: route to tool.lore.query + OE corpus filter; model from lib/ai-models.',
        },
      ]);
    }, 400);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr min(340px, 32vw)',
        background: C.paper,
        color: C.ink,
        fontFamily: 'var(--font-body, "Georgia", "Iowan Old Style", serif)',
      }}
    >
      <div style={{ padding: '2rem 2.5rem', borderRight: `1px solid ${C.border}` }}>
        <header style={{ marginBottom: '2rem', maxWidth: '48rem' }}>
          <p
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: C.accent,
            }}
          >
            Sovereign library
          </p>
          <h1 style={{ margin: '0 0 0.75rem 0', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Outsider Economics · resources
          </h1>
          <p style={{ margin: 0, color: C.muted, fontSize: '1.05rem', lineHeight: 1.55 }}>
            Manual (book) → Library (this archive) → Laboratory (DSD tasks + credits). Learning that earns back the subscription.
          </p>
          <p style={{ margin: '1rem 0 0 0' }}>
            <a
              href="/economics/field-manual"
              style={{
                display: 'inline-block',
                padding: '0.55rem 1rem',
                borderRadius: '6px',
                background: C.accent,
                color: '#020617',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
              }}
            >
              Start with the Outsider Economics field manual
            </a>
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '42rem' }}>
          {RESOURCES.map((r) => (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setActiveId(r.id)}
              whileHover={{ x: 4 }}
              style={{
                textAlign: 'left',
                padding: '1.1rem 1.25rem',
                borderRadius: '4px',
                border: `1px solid ${activeId === r.id ? C.accent : C.border}`,
                background: activeId === r.id ? C.accentDim : C.card,
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>
                {r.chapter}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.35rem' }}>{r.title}</div>
              <div style={{ fontSize: '0.9rem', color: C.muted, marginTop: '0.5rem', lineHeight: 1.45 }}>{r.summary}</div>
            </motion.button>
          ))}
        </div>

        <section style={{ marginTop: '2.5rem', maxWidth: '42rem' }}>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>
            AI Librarian (Vertex hook)
          </h2>
          <div
            style={{
              marginTop: '0.75rem',
              border: `1px solid ${C.border}`,
              borderRadius: '6px',
              background: C.rail,
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', maxHeight: '280px' }}>
              <AnimatePresence initial={false}>
                {chat.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginBottom: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      background: m.role === 'user' ? 'rgba(56,189,248,0.12)' : 'rgba(148,163,184,0.08)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: C.accent, fontSize: '0.65rem', fontWeight: 700 }}>
                      {m.role === 'user' ? 'You' : 'Librarian'}
                    </span>
                    <div style={{ marginTop: '0.25rem' }}>{m.text}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: `1px solid ${C.border}` }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about the book or DeepLore (pilot)…"
                style={{
                  flex: 1,
                  padding: '0.6rem 0.75rem',
                  borderRadius: '4px',
                  border: `1px solid ${C.border}`,
                  background: C.paper,
                  color: C.ink,
                  fontSize: '0.9rem',
                }}
              />
              <button
                type="button"
                onClick={send}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: C.accent,
                  color: '#020617',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </div>

      <aside
        style={{
          padding: '2rem 1.5rem',
          background: C.rail,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted }}>
            Credit balance
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: C.accent, marginTop: '0.25rem' }}>
            {initialCredits}
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: C.muted, marginLeft: '0.35rem' }}>credits</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: C.muted, margin: '0.5rem 0 0 0' }}>
            Completing a task should mint via <code style={{ color: C.accent }}>CreditLedger</code> (CC: wire lore verify API).
          </p>
        </div>

        <div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted }}>
            Lore tasks · this resource
          </div>
          <ul style={{ listStyle: 'none', margin: '0.75rem 0 0 0', padding: 0 }}>
            {active.tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  padding: '0.65rem 0',
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: '0.88rem',
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: C.ink }}>{t.label}</span>
                <div style={{ color: C.accent, fontSize: '0.75rem', marginTop: '0.25rem' }}>+{t.credits} credits</div>
                {t.loreNamespace && (
                  <div style={{ color: C.muted, fontSize: '0.72rem', marginTop: '0.35rem' }}>
                    LoreEntry namespace: <code style={{ color: C.accent }}>{t.loreNamespace}</code>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: C.muted, lineHeight: 1.5 }}>
          <strong style={{ color: C.ink }}>Integration rail</strong>
          <br />
          Sovereign QR / chapter links should deep-link to task IDs here in production. See{' '}
          <code style={{ color: C.accent }}>experiments/design-contest/04_Outsider_Economics_Manual/LEARNING_PATH.md</code>.
        </div>
      </aside>
    </div>
  );
}
