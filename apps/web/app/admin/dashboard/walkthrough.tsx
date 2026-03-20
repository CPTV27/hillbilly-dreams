'use client';

// Guided walkthrough overlay for onboarding Tracy & Amy
// Step-by-step tour of the Big Muddy Command platform

import { useState, useEffect } from 'react';

interface WalkthroughStep {
  title: string;
  content: string;
  highlight?: string; // CSS selector or nav label to highlight
  position: 'center' | 'right' | 'bottom-right';
  action?: string; // optional CTA text
  actionHref?: string;
}

const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    title: 'Welcome to Big Muddy Command',
    content: `This is your operations dashboard — the nerve center for all seven Big Muddy brands. Everything you need to run the business flows through here. Tracy, Amy — this is your workspace. Let's take a look around.`,
    position: 'center',
  },
  {
    title: 'The Dashboard',
    content: `This is your daily snapshot. KPI tiles show real-time numbers — occupancy rate from CloudBeds, newsletter subscribers, Spotify followers, articles published, upcoming events. When these numbers move, you'll see it here first.`,
    highlight: 'dashboard',
    position: 'right',
  },
  {
    title: 'The Sidebar — Your Navigation',
    content: `On the left is your command menu. It's organized by what you're doing:\n\n• Main — Dashboard + Calendar\n• Operations — Ops Dashboard with live activity feed\n• Content — Articles, Media, Playlists, Events, Newsletter, Social\n• CRM — Contacts and Clients\n• Platform — Bridge Clients (Deep South Directory advertisers)\n• Sites — Direct links to all the live websites`,
    highlight: 'sidebar',
    position: 'right',
  },
  {
    title: 'Delta Dawn — Your AI Assistant',
    content: `Delta Dawn is the most important tool on this platform. She knows everything about Big Muddy — every brand, every property, every pricing tier, every policy. Ask her anything:\n\n"What's our checkout policy?"\n"Draft a response to a guest complaint"\n"What events do we have this month?"\n"Help me write an Instagram caption for the Inn"\n\nShe never says "I don't know." She figures it out.`,
    position: 'center',
    action: 'Try Delta Dawn',
    actionHref: '/ops/chat',
  },
  {
    title: 'Articles & Journal',
    content: `This is where blog posts and magazine articles live. You can create, edit, and publish content for the Inn journal, the Magazine, or any brand. Each article gets a city tag, a status (draft/review/published), and SEO metadata.\n\nThe content engine can also draft articles from podcast transcripts automatically.`,
    position: 'right',
    action: 'View Articles',
    actionHref: '/articles',
  },
  {
    title: 'Events Calendar',
    content: `Every Blues Room session, Inn event, touring stop, and community happening goes here. Events feed the website automatically — when you publish an event, it appears on the public site within minutes.`,
    position: 'right',
    action: 'View Events',
    actionHref: '/events',
  },
  {
    title: 'Bridge Clients — The Revenue Engine',
    content: `Bridge Clients are Deep South Directory advertisers — restaurants, venues, shops along the corridor. They pay monthly for listings, content, and exposure across all seven brands.\n\nTiers: Front Porch ($99/mo) → The Route ($249/mo) → River Room ($499/mo) → Blues Room ($999/mo)\n\nEvery business you add here is revenue.`,
    position: 'right',
    action: 'View Bridge Clients',
    actionHref: '/bridge',
  },
  {
    title: 'The Seven Brands',
    content: `Everything connects. One piece of content can feed multiple brands:\n\n1. Big Muddy Touring — The corridor experience\n2. The Big Muddy Inn — Home base in Natchez\n3. Big Muddy Magazine — Stories from the corridor\n4. Big Muddy Radio — The sound of the river\n5. Big Muddy Records — Artist-owned recordings\n6. BuyCurious Art — Gallery & art marketplace\n7. Deep South Directory — Business listings\n\nOne Blues Room session → 15+ pieces of content across all seven.`,
    position: 'center',
  },
  {
    title: 'Your Daily Workflow',
    content: `Here's what a typical day looks like:\n\n☀️ Morning: Check Dashboard for overnight bookings and metrics\n📱 Mid-morning: Review social posts queued by content engine\n💬 Anytime: Ask Delta Dawn for help with guest comms, content, or operations\n📸 As needed: Upload photos/media to the library\n📊 Weekly: Review Bridge Client pipeline, follow up on leads\n🎤 Event days: Create event, promote across brands, capture content\n\nYou two are the operations backbone. The platform handles the automation — you handle the human touch.`,
    position: 'center',
  },
  {
    title: 'You\'re All Set!',
    content: `That's the tour. A few things to remember:\n\n• Delta Dawn is always available — use her constantly\n• Every photo, every event, every guest interaction is content\n• When something breaks, flag it — we have monitoring, but your eyes are what makes this work\n• The platform grows with us — new features are rolling out regularly\n\nNow — tell me: what do you want your dashboard to look like? What numbers matter most to you day-to-day? Let's customize this for how you actually work.`,
    position: 'center',
    action: 'Start Using Big Muddy Command',
  },
];

export default function Walkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const step = WALKTHROUGH_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === WALKTHROUGH_STEPS.length - 1;
  const progress = ((currentStep + 1) / WALKTHROUGH_STEPS.length) * 100;

  const goNext = () => {
    if (isLast) {
      setIsVisible(false);
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s + 1);
      setIsAnimating(false);
    }, 200);
  };

  const goPrev = () => {
    if (isFirst) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s - 1);
      setIsAnimating(false);
    }, 200);
  };

  const dismiss = () => setIsVisible(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStep]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="wt-backdrop" onClick={dismiss} />

      {/* Card */}
      <div className={`wt-card wt-card--${step.position} ${isAnimating ? 'wt-card--animating' : ''}`}>
        {/* Progress bar */}
        <div className="wt-progress">
          <div className="wt-progress__bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Step counter */}
        <div className="wt-meta">
          <span className="wt-step-count">{currentStep + 1} of {WALKTHROUGH_STEPS.length}</span>
          <button className="wt-dismiss" onClick={dismiss} aria-label="Close walkthrough">✕</button>
        </div>

        {/* Content */}
        <h2 className="wt-title">{step.title}</h2>
        <div className="wt-content">
          {step.content.split('\n').map((line, i) => (
            <p key={i} style={{ margin: line.trim() === '' ? '0.75rem 0' : '0.35rem 0' }}>
              {line}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="wt-actions">
          <div className="wt-nav-btns">
            {!isFirst && (
              <button className="wt-btn wt-btn--ghost" onClick={goPrev}>
                ← Back
              </button>
            )}
            <button className="wt-btn wt-btn--primary" onClick={goNext}>
              {isLast ? 'Get Started' : 'Next →'}
            </button>
          </div>
          {step.action && step.actionHref && (
            <a href={step.actionHref} className="wt-btn wt-btn--action" onClick={dismiss}>
              {step.action} →
            </a>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="wt-keyboard-hint">
          Use arrow keys to navigate · Esc to close
        </div>
      </div>

      <style>{`
        .wt-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 9, 8, 0.75);
          z-index: 9998;
          backdrop-filter: blur(4px);
        }

        .wt-card {
          position: fixed;
          z-index: 9999;
          background: #1e1b18;
          border: 1px solid rgba(200, 148, 62, 0.25);
          border-radius: 12px;
          padding: 0;
          max-width: 560px;
          width: 90vw;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(200, 148, 62, 0.1);
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .wt-card--center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .wt-card--right {
          top: 50%;
          right: 2rem;
          transform: translateY(-50%);
        }

        .wt-card--bottom-right {
          bottom: 2rem;
          right: 2rem;
        }

        .wt-card--animating {
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(0.98);
        }
        .wt-card--right.wt-card--animating {
          transform: translateY(-50%) scale(0.98);
        }

        .wt-progress {
          height: 3px;
          background: rgba(200, 148, 62, 0.1);
          border-radius: 12px 12px 0 0;
          overflow: hidden;
        }

        .wt-progress__bar {
          height: 100%;
          background: #c8943e;
          transition: width 0.3s ease;
          border-radius: 12px 12px 0 0;
        }

        .wt-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem 0;
        }

        .wt-step-count {
          font-size: 0.75rem;
          font-weight: 600;
          color: #c8943e;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .wt-dismiss {
          background: none;
          border: none;
          color: rgba(240, 235, 224, 0.3);
          font-size: 1rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
          transition: color 0.15s ease;
        }
        .wt-dismiss:hover {
          color: rgba(240, 235, 224, 0.7);
        }

        .wt-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.375rem;
          font-weight: 700;
          color: #f0ebe0;
          margin: 0.75rem 1.5rem 0;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .wt-content {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          line-height: 1.65;
          color: rgba(240, 235, 224, 0.7);
          max-height: 45vh;
          overflow-y: auto;
        }

        .wt-content p {
          white-space: pre-wrap;
        }

        .wt-actions {
          padding: 0 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .wt-nav-btns {
          display: flex;
          gap: 0.5rem;
        }

        .wt-btn {
          padding: 0.625rem 1.25rem;
          font-size: 0.813rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          border: none;
        }

        .wt-btn--primary {
          background: #c8943e;
          color: #1a1816;
          flex: 1;
          justify-content: center;
        }
        .wt-btn--primary:hover {
          background: #d4a24e;
        }

        .wt-btn--ghost {
          background: rgba(240, 235, 224, 0.06);
          color: rgba(240, 235, 224, 0.5);
          border: 1px solid rgba(240, 235, 224, 0.1);
        }
        .wt-btn--ghost:hover {
          color: rgba(240, 235, 224, 0.8);
          border-color: rgba(240, 235, 224, 0.2);
        }

        .wt-btn--action {
          background: rgba(200, 148, 62, 0.1);
          color: #c8943e;
          border: 1px solid rgba(200, 148, 62, 0.2);
          justify-content: center;
          text-align: center;
        }
        .wt-btn--action:hover {
          background: rgba(200, 148, 62, 0.18);
          border-color: rgba(200, 148, 62, 0.35);
        }

        .wt-keyboard-hint {
          padding: 0.5rem 1.5rem 1rem;
          font-size: 0.688rem;
          color: rgba(240, 235, 224, 0.2);
          text-align: center;
          letter-spacing: 0.02em;
        }
      `}</style>
    </>
  );
}
