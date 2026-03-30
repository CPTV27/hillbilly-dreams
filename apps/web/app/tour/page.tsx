'use client';

import { useState, useRef, useEffect } from 'react';

const TOUR_STEPS = [
  {
    id: 'welcome',
    message: "Hey JP! I'm Delta Dawn, and I'm going to walk you through everything. Just click 'Next' or type a question anytime. Let's start with the big picture.",
    display: 'story',
    displayUrl: null,
  },
  {
    id: 'story',
    message: "Chase built a global media architecture in 2022 — broadcast, production, distribution — and realized the same system that runs a Viacom can run a small town. Big Muddy is that system, running live in Natchez. 15 domains, one codebase, powered by Google's AI.",
    display: 'iframe',
    displayUrl: 'https://bigmuddytouring.com',
  },
  {
    id: 'flywheel',
    message: "Here's how it all connects. Shows generate audience. Audience generates bar revenue. Content from every show feeds the magazine, radio, and social media. That content drives discovery. Discovery brings in directory subscribers. Subscriber revenue funds more shows. One flywheel.",
    display: 'flywheel',
    displayUrl: null,
  },
  {
    id: 'radio',
    message: "Big Muddy Radio has 18 shows programmed with poster art, DJ characters, and automated playout. This is where your American Parlor Songbook fits — as the flagship show that legitimizes the whole station. You already produce for NPR on 20+ stations. This is your infrastructure.",
    display: 'iframe',
    displayUrl: 'https://bigmuddytouring.com/radio/shows',
  },
  {
    id: 'directory',
    message: "The Deep South Directory is the revenue engine. Free listings build the audience. $20/month gets businesses an AI assistant that knows their town. $99/month gets them the full stack — reviews, social, magazine features, radio mentions. Every business in the directory is a potential show sponsor.",
    display: 'iframe',
    displayUrl: 'https://deepsouthdirectory.com',
  },
  {
    id: 'admin',
    message: "Mission Control is where you manage everything. Content Studio generates social posts, magazine features, radio promos, and posters from one input. The Creative Hub has AI image, video, audio, and text generation. All powered by Google's Vertex AI.",
    display: 'iframe',
    displayUrl: 'https://bigmuddytouring.com/admin/dashboard',
  },
  {
    id: 'show-concept',
    message: "The show concept: Anthony Bourdain meets music. You travel the corridor — Natchez, Clarksdale, Vicksburg, Memphis, New Orleans. Each episode: live music at a local venue, interview with musicians, food segment, your original songs as transitions. One recording becomes radio + YouTube + public access TV + Plex in-room + social. All automatic.",
    display: 'show',
    displayUrl: null,
  },
  {
    id: 'tenants',
    message: "This isn't just one town. The same codebase is deploying to Woodstock, NY (Bearsville Media Group), plus Studio C and Tuthill Design. Four tenants, one push updates all of them. Any town can be next. That's the product — not Big Muddy itself, but the platform that creates Big Muddys.",
    display: 'tenants',
    displayUrl: null,
  },
  {
    id: 'jp-options',
    message: "Now here's where you come in. Four options, from Advisory (2-4 hours/week) to full Partner. Every tier builds on the one below. Your NPR syndication, your production network, your performance chops — that's what makes the radio and entertainment divisions real. Take a look.",
    display: 'jp-options',
    displayUrl: null,
  },
  {
    id: 'scan2plan',
    message: "One more thing — the Scan2Plan situation. Chase needs your eyes on the financials and the communication before it goes out. The numbers are bank-verified. There's an Asana task assigned to you with everything organized. Take your time with it.",
    display: 'iframe',
    displayUrl: 'https://app.asana.com/1/1211216881488780/project/1213753731475702/task/1213862302768434',
  },
  {
    id: 'finish',
    message: "That's the tour. You've got Asana tasks waiting (check your email), the whiteboard at bigmuddytouring.com/whiteboard for the big picture anytime, and Delta Dawn at /ops/chat if you have questions. Welcome aboard, JP.",
    display: 'links',
    displayUrl: null,
  },
];

/* Simple display components for non-iframe steps */
function FlywheelDisplay() {
  const nodes = [
    { label: 'Live Shows', metric: '12/mo', color: '#c8943e' },
    { label: 'Audience', metric: 'In the room', color: '#22c55e' },
    { label: 'Bar Revenue', metric: '$300-500/night', color: '#3b82f6' },
    { label: 'Content', metric: '4 channels', color: '#8b5cf6' },
    { label: 'Media Distribution', metric: 'Magazine + Radio + Social', color: '#ec4899' },
    { label: 'Discovery', metric: 'Tourists find us', color: '#f97316' },
    { label: 'Directory Revenue', metric: '$20-99/mo', color: '#c8943e' },
    { label: 'Reinvestment', metric: 'Better shows', color: '#22c55e' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 0 }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>The Flywheel</h2>
      {nodes.map((n, i) => (
        <div key={n.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 1.5rem', background: `${n.color}10`, border: `1px solid ${n.color}30`, borderRadius: 10, minWidth: 400 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: n.color }} />
            <span style={{ flex: 1, fontWeight: 600 }}>{n.label}</span>
            <span style={{ color: n.color, fontWeight: 700, fontSize: '0.9rem' }}>{n.metric}</span>
          </div>
          {i < nodes.length - 1 && <div style={{ textAlign: 'center', color: '#2a2520', fontSize: '1.2rem' }}>↓</div>}
        </div>
      ))}
      <div style={{ color: '#c8943e', fontWeight: 800, marginTop: '0.5rem' }}>↻ Repeat</div>
    </div>
  );
}

function ShowConceptDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>The Show</h2>
      <p style={{ fontSize: '1.2rem', color: '#c8943e', fontStyle: 'italic', marginBottom: '2rem', textAlign: 'center' }}>Anthony Bourdain meets music.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
        {['Natchez', 'Clarksdale', 'Vicksburg', 'Memphis', 'New Orleans'].map(town => (
          <div key={town} style={{ padding: '1rem', background: '#1a1816', border: '1px solid #2a2520', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{town}</div>
            <div style={{ fontSize: '0.8rem', color: '#6a6560' }}>Live music + Interview + Food</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['Radio', 'YouTube', 'Public Access TV', 'Plex In-Room', 'NPR', 'Social'].map(ch => (
          <span key={ch} style={{ padding: '0.4rem 1rem', background: '#22c55e15', border: '1px solid #22c55e30', borderRadius: 999, fontSize: '0.8rem', color: '#22c55e' }}>{ch}</span>
        ))}
      </div>
    </div>
  );
}

function TenantsDisplay() {
  const tenants = [
    { name: 'Big Muddy', location: 'Natchez, MS', status: 'Live', color: '#c8943e' },
    { name: 'Bearsville Media', location: 'Woodstock, NY', status: 'Deploying', color: '#8B6914' },
    { name: 'Studio C', location: 'Woodstock, NY', status: 'Configuring', color: '#4A90D9' },
    { name: 'Tuthill Design', location: 'Woodstock, NY', status: 'Configuring', color: '#2D5F2D' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>4 Tenants, One Codebase</h2>
      {tenants.map(t => (
        <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: `${t.color}08`, border: `1px solid ${t.color}30`, borderRadius: 10, minWidth: 400 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: t.color }}>{t.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#6a6560' }}>{t.location}</div>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: t.status === 'Live' ? '#22c55e' : '#eab308' }}>{t.status}</span>
        </div>
      ))}
    </div>
  );
}

function JPOptionsDisplay() {
  const tiers = [
    { level: 'Advisory', time: '2-4 hrs/week', color: '#3b82f6' },
    { level: 'Programming Director', time: '10-15 hrs/week', color: '#c8943e' },
    { level: 'Executive Producer', time: '20-30 hrs/week', color: '#22c55e' },
    { level: 'Partner', time: 'Full time', color: '#ec4899' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Options</h2>
      {tiers.map((t, i) => (
        <div key={t.level} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 2rem', background: `${t.color}08`, border: `2px solid ${t.color}40`, borderRadius: 12, minWidth: 450 }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: t.color }}>{i + 1}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: t.color }}>{t.level}</div>
            <div style={{ fontSize: '0.9rem', color: '#8a8074' }}>{t.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StoryDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem', textAlign: 'center' }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', marginBottom: '1rem' }}>Hillbilly Dreams Inc</p>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>Global media architecture.<br /><span style={{ color: '#c8943e' }}>Applied to Main Street.</span></h1>
      <p style={{ fontSize: '1.1rem', color: '#8a8074', maxWidth: 500, lineHeight: 1.6 }}>15 domains. 18 radio shows. 4 tenants. AI handles 70-90% of every role. 3 humans run the whole thing.</p>
    </div>
  );
}

function LinksDisplay() {
  const links = [
    { label: 'Whiteboard', url: 'https://bigmuddytouring.com/whiteboard' },
    { label: 'Asana', url: 'https://app.asana.com' },
    { label: 'Delta Dawn Chat', url: 'https://bigmuddytouring.com/ops/chat' },
    { label: 'Admin Dashboard', url: 'https://bigmuddytouring.com/admin/dashboard' },
    { label: 'Radio Shows', url: 'https://bigmuddytouring.com/radio/shows' },
    { label: 'All Sites', url: 'https://bigmuddytouring.com/whiteboard' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>You're All Set</h2>
      <p style={{ color: '#8a8074', marginBottom: '1rem' }}>Bookmark these:</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {links.map(l => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem 1.5rem', background: '#1a1816', border: '1px solid #2a2520', borderRadius: 10,
            textDecoration: 'none', fontWeight: 600, color: '#e8e0d4', fontSize: '1rem', textAlign: 'center',
          }}>{l.label}</a>
        ))}
      </div>
    </div>
  );
}

export default function TourPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const step = TOUR_STEPS[stepIndex];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [stepIndex]);

  const next = () => { if (stepIndex < TOUR_STEPS.length - 1) setStepIndex(stepIndex + 1); };
  const prev = () => { if (stepIndex > 0) setStepIndex(stepIndex - 1); };

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#0a0a08', color: '#e8e0d4',
      fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', overflow: 'hidden',
    }}>
      {/* Display Panel (left/top) */}
      <div style={{ flex: 1, background: '#0f0f0d', borderRight: '1px solid #1a1816', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {step.display === 'iframe' && step.displayUrl && (
          <iframe src={step.displayUrl} style={{ width: '100%', height: '100%', border: 'none' }} />
        )}
        {step.display === 'story' && <StoryDisplay />}
        {step.display === 'flywheel' && <FlywheelDisplay />}
        {step.display === 'show' && <ShowConceptDisplay />}
        {step.display === 'tenants' && <TenantsDisplay />}
        {step.display === 'jp-options' && <JPOptionsDisplay />}
        {step.display === 'links' && <LinksDisplay />}
      </div>

      {/* Chat Panel (right) */}
      <div style={{ width: 400, display: 'flex', flexDirection: 'column', background: '#0a0a08' }}>
        {/* Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1a1816' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#c8943e', margin: 0 }}>Delta Dawn</h2>
          <p style={{ fontSize: '0.7rem', color: '#5a5550', margin: '0.25rem 0 0' }}>Guided Tour &middot; Step {stepIndex + 1} of {TOUR_STEPS.length}</p>
          {/* Progress */}
          <div style={{ height: 3, background: '#1a1816', borderRadius: 2, marginTop: '0.5rem' }}>
            <div style={{ height: 3, background: '#c8943e', borderRadius: 2, width: `${((stepIndex + 1) / TOUR_STEPS.length) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.25rem' }}>
          {TOUR_STEPS.slice(0, stepIndex + 1).map((s, i) => (
            <div key={s.id} style={{
              marginBottom: '1rem',
              padding: '1rem',
              background: i === stepIndex ? '#1a1816' : '#0f0f0d',
              borderRadius: 12,
              borderLeft: i === stepIndex ? '3px solid #c8943e' : '3px solid transparent',
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: i === stepIndex ? '#e8e0d4' : '#6a6560', margin: 0 }}>
                {s.message}
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Navigation */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #1a1816', display: 'flex', gap: '0.5rem' }}>
          <button onClick={prev} disabled={stepIndex === 0} style={{
            flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid #2a2520',
            borderRadius: 8, color: stepIndex === 0 ? '#2a2520' : '#8a8074', fontWeight: 700, fontSize: '0.85rem', cursor: stepIndex === 0 ? 'default' : 'pointer',
          }}>
            ← Back
          </button>
          <button onClick={next} disabled={stepIndex === TOUR_STEPS.length - 1} style={{
            flex: 2, padding: '0.75rem', background: stepIndex === TOUR_STEPS.length - 1 ? '#22c55e' : '#c8943e',
            border: 'none', borderRadius: 8, color: '#0a0a08', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
          }}>
            {stepIndex === TOUR_STEPS.length - 1 ? "You're All Set ✓" : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
