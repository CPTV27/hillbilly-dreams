// apps/web/app/media/how-it-works/page.tsx
// Deep South Directory — How It Works page
// Server component. Visual timeline layout.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How Deep South Directory works: we visit, build your brand voice, generate your content calendar, get your approval, publish, and report — every month.',
};

const STEPS = [
  {
    num: '01',
    title: 'We Meet',
    tagline: 'In person if we can. On a call if we can\'t.',
    desc: 'We come to your business, walk the space, meet your team, eat your food. We\'re a Deep South company — we know the culture and we take it seriously. This isn\'t a sales call. It\'s the beginning of the work.',
    details: [
      'Business walkthrough and photo documentation',
      'Competitor and local market review',
      'Goals, voice, and non-negotiables conversation',
      'Platform audit — where you are, what\'s working, what isn\'t',
    ],
    timeframe: 'Week 1',
  },
  {
    num: '02',
    title: 'We Build Your Voice',
    tagline: 'AI-generated. Human-refined. Uniquely yours.',
    desc: 'We feed the onboarding transcript, your existing content, and your market positioning into Claude. The AI generates a brand voice profile — tone, vocabulary, topics, what to avoid. You review it. We refine it. It becomes the input for everything.',
    details: [
      'Brand voice document: 2–3 pages covering tone and language',
      'Topic map: what you talk about and why',
      'Content pillars: the 4–6 categories your content lives in',
      'Persona reference for every future content generation',
    ],
    timeframe: 'Week 1–2',
  },
  {
    num: '03',
    title: 'We Generate Your Calendar',
    tagline: '30 days of content. Ready for review.',
    desc: 'AI generates a full month of content matched to your voice, your platforms, your seasonal events, and your content calendar. Posts, captions, hashtags, optimal posting times — the whole calendar. It lands in your inbox for approval.',
    details: [
      'Full calendar with dates, platforms, and post copy',
      'Seasonal content layered in automatically',
      'Event-specific content drafted as soon as you tell us',
      'Image briefs included (or AI-enhanced photos if your tier includes it)',
    ],
    timeframe: 'Week 2',
  },
  {
    num: '04',
    title: 'You Review & Approve',
    tagline: 'Green-light it. Or tell us what to change.',
    desc: 'Simple approval flow. You get a review link. Go post by post, approve or request edits. We turn revisions around in 24 hours. Nothing publishes without your final sign-off — ever. This is your brand.',
    details: [
      'Shareable review link — no login required',
      'Comment directly on any post for revision requests',
      'Unlimited revision rounds (within reason)',
      '24-hour turnaround on all revisions',
    ],
    timeframe: 'Week 2–3',
  },
  {
    num: '05',
    title: 'We Publish & Manage',
    tagline: 'It goes out. Reviews get responses. You stay visible.',
    desc: 'Posts go out on schedule, optimized for each platform. Reviews get responded to within 24 hours. Your GBP stays current. Email goes out. Analytics are tracked. The machine runs so you don\'t have to touch it.',
    details: [
      'Posts publish on the optimal day and time for your audience',
      'Review responses drafted, sent for approval if you prefer',
      'GBP updates: hours, events, photos, Q&A',
      'Real-time engagement monitoring (River Room and up)',
    ],
    timeframe: 'Ongoing',
  },
  {
    num: '06',
    title: 'You See Results',
    tagline: 'Numbers. Trends. What\'s next.',
    desc: 'Monthly report lands in your inbox. What we did. What happened. What the data says about next month. We don\'t hide behind vanity metrics — you see the numbers that matter: calls, direction requests, traffic, email opens, and review velocity.',
    details: [
      'Platform-by-platform performance breakdown',
      'GBP insights: searches, calls, directions',
      'Email metrics and subscriber growth',
      'Competitive benchmarks (The Route and up)',
      'Recommendations for next month\'s strategy',
    ],
    timeframe: 'Monthly',
  },
];

const FAQS = [
  {
    q: 'How long does setup take?',
    a: 'Most clients have their first content calendar approved and scheduled within two weeks. Your first month of service is free while we set up.',
  },
  {
    q: 'What do I have to do?',
    a: 'Show up for the onboarding call (or visit), review and approve content, and let us know about events or specials coming up. That\'s it.',
  },
  {
    q: 'What if I hate the content?',
    a: 'You can reject or request revisions on anything before it publishes. Nothing goes out without your approval. If the voice profile is off, we rebuild it.',
  },
  {
    q: 'How often do I hear from you?',
    a: 'You get a monthly content calendar for review, a monthly performance report, and any urgent communications. We don\'t spam you — but we\'re always reachable.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="hiw-header">
        <div className="section-container">
          <div className="hiw-header__inner">
            <div className="section-label">How It Works</div>
            <h1 className="hiw-header__title">
              Six Steps.
              <br />
              <em>One Ongoing Relationship.</em>
            </h1>
            <p className="hiw-header__sub">
              From first conversation to running content machine — here's exactly how we do it.
              No black box. No mystery. Just a clear process you can hold us to.
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="hiw-timeline">
        <div className="section-container">
          <div className="hiw-timeline__track">
            {STEPS.map((step, i) => (
              <div key={step.num} className="hiw-step">
                {/* Connector line */}
                <div className="hiw-step__connector" aria-hidden="true">
                  <div className="hiw-step__dot" />
                  {i < STEPS.length - 1 && <div className="hiw-step__line" />}
                </div>

                {/* Content */}
                <div className="hiw-step__body">
                  <div className="hiw-step__meta">
                    <span className="hiw-step__num">{step.num}</span>
                    <span className="hiw-step__timeframe">{step.timeframe}</span>
                  </div>
                  <h2 className="hiw-step__title">{step.title}</h2>
                  <p className="hiw-step__tagline">{step.tagline}</p>
                  <p className="hiw-step__desc">{step.desc}</p>
                  <ul className="hiw-step__details" role="list">
                    {step.details.map((d) => (
                      <li key={d} className="hiw-step__detail">
                        <span className="hiw-step__detail-mark" aria-hidden="true">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hiw-faq">
        <div className="section-container">
          <div className="section-label">Common Questions</div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-10)' }}>Straight Answers</h2>
          <div className="hiw-faq__grid">
            {FAQS.map((faq) => (
              <div key={faq.q} className="hiw-faq__item">
                <h3 className="hiw-faq__q">{faq.q}</h3>
                <p className="hiw-faq__a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hiw-cta">
        <div className="section-container">
          <div className="hiw-cta__inner">
            <div className="section-label">Get Started</div>
            <h2 className="hiw-cta__title">Start With the Conversation</h2>
            <p className="hiw-cta__sub">
              Tell us about your business. We'll tell you honestly what we can do for you
              and what it will cost. No pitch. Just a conversation.
            </p>
            <div className="hiw-cta__buttons">
              <a href="/media/get-started" className="btn btn--primary">Get Started</a>
              <a href="/media/pricing" className="btn btn--ghost">See Pricing</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .hiw-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .hiw-header__inner {
          max-width: 700px;
        }
        .hiw-header__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .hiw-header__title em {
          font-style: italic;
          color: var(--accent);
        }
        .hiw-header__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 580px;
        }

        /* ── Timeline ── */
        .hiw-timeline {
          background: var(--bg);
        }
        .hiw-timeline__track {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .hiw-step {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: var(--space-6);
          align-items: start;
        }
        @media (min-width: 768px) {
          .hiw-step {
            grid-template-columns: 64px 1fr;
          }
        }

        /* Connector column */
        .hiw-step__connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: var(--space-1);
        }
        .hiw-step__dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 2px var(--accent);
          flex-shrink: 0;
          z-index: 1;
        }
        .hiw-step__line {
          width: 2px;
          flex: 1;
          min-height: 80px;
          background: linear-gradient(to bottom, var(--accent) 0%, var(--border) 100%);
          margin-top: var(--space-2);
          opacity: 0.4;
        }

        /* Step content */
        .hiw-step__body {
          padding-bottom: var(--space-16);
        }
        .hiw-step:last-child .hiw-step__body {
          padding-bottom: 0;
        }
        .hiw-step__meta {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-3);
        }
        .hiw-step__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-wider);
        }
        .hiw-step__timeframe {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: 2px var(--space-3);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
        }
        .hiw-step__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-2);
        }
        .hiw-step__tagline {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--accent);
          font-style: italic;
          margin: 0 0 var(--space-5);
          line-height: var(--leading-snug);
        }
        .hiw-step__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-6);
          max-width: 640px;
        }
        .hiw-step__details {
          list-style: none;
          margin: 0;
          padding: var(--space-5) var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          max-width: 600px;
        }
        .hiw-step__detail {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .hiw-step__detail-mark {
          color: var(--accent);
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ── FAQ ── */
        .hiw-faq {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .hiw-faq__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .hiw-faq__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .hiw-faq__item {
          padding: var(--space-6);
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .hiw-faq__q {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .hiw-faq__a {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── CTA ── */
        .hiw-cta {
          background: var(--bg);
        }
        .hiw-cta__inner {
          text-align: center;
          max-width: 580px;
          margin: 0 auto;
        }
        .hiw-cta__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .hiw-cta__sub {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-8);
        }
        .hiw-cta__buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
