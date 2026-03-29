'use client';

import { useState } from 'react';

const ANALYSIS_TOPICS = [
  { id: 'gaps', label: 'Gap Analysis', prompt: 'Analyze the Big Muddy ecosystem for gaps — what capabilities are missing, what revenue streams are untapped, what audience segments are unserved? Be specific and actionable.' },
  { id: 'priorities', label: 'Priority Stack', prompt: 'Given the current state of the ecosystem (3 humans, AI-augmented, 15 domains, $0-99 pricing tiers, radio station, hotel), what should be the top 5 priorities for the next 30 days? Rank by revenue impact.' },
  { id: 'risks', label: 'Risk Assessment', prompt: 'What are the top risks to this ecosystem? Consider: single points of failure, key person dependencies, technology risks, market risks, competitive threats. For each, suggest a mitigation.' },
  { id: 'scaling', label: 'Scaling Playbook', prompt: 'How does this ecosystem scale from 1 corridor town to 10? What needs to change in the architecture, the team, the pricing, the content production? Be specific about what breaks at each stage.' },
  { id: 'monetization', label: 'Monetization Map', prompt: 'Map every possible revenue stream in this ecosystem — active and latent. For each, estimate monthly potential and effort to activate. Include: subscriptions, transactions, licensing, sponsorship, grants, partnerships, content syndication.' },
  { id: 'automation', label: 'Automation Audit', prompt: 'Review the Personnel lens data (10 roles, 3 humans + AI). What can be further automated? What human tasks are bottlenecks? Where is AI underutilized? Suggest specific automations with estimated time savings.' },
];

const ECOSYSTEM_CONTEXT = `
Big Muddy Ecosystem — Current State:

DIVISIONS:
- Big Muddy Touring (Hotel: 6 suites, Blues Room: 50-seat venue)
- Big Muddy Media (Magazine, Radio: 18 shows, Records)
- Big Muddy Entertainment (Rise Up talent pipeline, shows)
- Deep South Directory (Free/$20/$49/$99 tiers for Main Street businesses)
- Outsider Economics (Economic philosophy, field manual)
- BuyCurious Art (Photography storefront, Stripe Connect marketplace)

TEAM: Chase (CEO/CTO), Tracy (Business/Finance), Amy (Inn/Bar Ops), JP (Shows/Programming)
AI STACK: Gemini 2.5 Flash/3.1 Pro, Claude Sonnet/Haiku, Perplexity, Imagen 3, Veo 3.1, Cloud TTS
INFRASTRUCTURE: 15 domains on Vercel, Neon PostgreSQL, GCS, OpenBroadcaster, Plex, Postiz
REVENUE: Pre-launch. Free listings building audience. $20 AI assistant launching. $99 engine for social media management.
LOCATION: Natchez, Mississippi — Mississippi corridor (Memphis to New Orleans)

TRADITIONAL STAFFING EQUIVALENT: $50K/mo for 10 roles
ACTUAL COST: 3 humans + ~$500/mo AI API costs
`;

export function AdvisorLens() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const analyze = async (topicId: string) => {
    const topic = ANALYSIS_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    setSelectedTopic(topicId);
    setAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch('/api/ops/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${topic.prompt}\n\nContext:\n${ECOSYSTEM_CONTEXT}`,
          sessionId: `advisor-${topicId}`,
        }),
      });

      // Read SSE stream
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
          for (const line of lines) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                fullText += data.text;
                setResult(fullText);
              }
            } catch { /* skip parse errors */ }
          }
        }
      }
    } catch (err) {
      setResult('Analysis failed — check API connection.');
    }
    setAnalyzing(false);
  };

  return (
    <div>
      {/* Topic Selector */}
      <div className="eco-card">
        <div className="eco-card-label">Ask the AI Advisor</div>
        <p style={{ fontSize: '0.8rem', color: '#6a6560', marginBottom: '1rem' }}>
          Select a topic and the AI will analyze your ecosystem using live context. Powered by Gemini.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem' }}>
          {ANALYSIS_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => analyze(topic.id)}
              disabled={analyzing}
              style={{
                padding: '0.75rem',
                background: selectedTopic === topic.id ? 'rgba(200,148,62,0.1)' : '#0f0f0d',
                border: `1px solid ${selectedTopic === topic.id ? '#c8943e' : '#2a2520'}`,
                borderRadius: 8,
                color: selectedTopic === topic.id ? '#c8943e' : '#8a8074',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: analyzing ? 'wait' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result */}
      {(analyzing || result) && (
        <div className="eco-card" style={{ marginTop: '1rem' }}>
          <div className="eco-card-label">
            {analyzing ? 'Analyzing...' : ANALYSIS_TOPICS.find(t => t.id === selectedTopic)?.label}
          </div>
          {analyzing && !result && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6a6560' }}>
              Thinking...
            </div>
          )}
          {result && (
            <div style={{ fontSize: '0.85rem', color: '#e8e0d4', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
