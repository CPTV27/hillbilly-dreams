'use client';

// apps/web/app/admin/productions/new/page.tsx
// Create a new production job

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const VOICE_PRESETS = [
  'chase', 'delta-dawn', 'catfish-carl', 'deacon-slim',
  'miss-pearline', 'neutral-male', 'neutral-female',
];

const FORMATS = [':15', ':30', ':60', '3:00', '10:00'];

interface Campaign {
  id: number;
  name: string;
}

export default function NewProductionPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    campaignId: '',
    title: '',
    format: ':15',
    veoPrompt: '',
    ttsScript: '',
    musicDirection: '',
    textOverlays: '',
    cta: '',
    voicePreset: 'chase',
    voiceSpeed: 1.0,
    voicePitch: 0,
    veoQuality: 'draft',
    videoDuration: 5,
  });

  const fetchCampaigns = useCallback(async () => {
    const res = await fetch('/api/productions/campaigns');
    const data = await res.json();
    setCampaigns(data.campaigns ?? []);
    if (data.campaigns?.length) {
      setForm((f) => ({ ...f, campaignId: String(data.campaigns[0].id) }));
    }
  }, []);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/productions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to create job');
        return;
      }

      const data = await res.json();
      router.push(`/admin/productions/${data.job.id}`);
    } catch (err) {
      setError('Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <a href="/admin/productions" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>
            &larr; Productions
          </a>
          <h1 className="admin-page-title" style={{ marginTop: 'var(--space-2)' }}>New Production Job</h1>
        </div>
      </div>

      {error && <div className="admin-error-banner">{error}</div>}

      {campaigns.length === 0 && (
        <div className="admin-card" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>No campaigns yet. Seed the 6 concepts first.</p>
          <button
            className="admin-btn admin-btn--primary"
            onClick={async () => {
              await fetch('/api/productions/seed', { method: 'POST' });
              fetchCampaigns();
            }}
          >
            Seed Campaigns
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Campaign</label>
              <select
                className="admin-select"
                value={form.campaignId}
                onChange={(e) => setForm({ ...form, campaignId: e.target.value })}
                required
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Format</label>
              <select
                className="admin-select"
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Title</label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. The Box — :15"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Veo Prompt (Visual Direction)</label>
            <textarea
              className="admin-textarea"
              value={form.veoPrompt}
              onChange={(e) => setForm({ ...form, veoPrompt: e.target.value })}
              placeholder="Describe the visual scene for video generation..."
              rows={4}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">TTS Script (Voiceover)</label>
            <textarea
              className="admin-textarea"
              value={form.ttsScript}
              onChange={(e) => setForm({ ...form, ttsScript: e.target.value })}
              placeholder="The voiceover script text..."
              rows={4}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Music Direction</label>
            <textarea
              className="admin-textarea"
              value={form.musicDirection}
              onChange={(e) => setForm({ ...form, musicDirection: e.target.value })}
              placeholder="Music bed style and feel..."
              rows={2}
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Text Overlays</label>
              <textarea
                className="admin-textarea"
                value={form.textOverlays}
                onChange={(e) => setForm({ ...form, textOverlays: e.target.value })}
                placeholder="Canva text overlay phrases..."
                rows={2}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">CTA</label>
              <input
                className="admin-input"
                value={form.cta}
                onChange={(e) => setForm({ ...form, cta: e.target.value })}
                placeholder="measurablybetter.life/start"
              />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ marginTop: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Settings</h2>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Voice Preset</label>
              <select
                className="admin-select"
                value={form.voicePreset}
                onChange={(e) => setForm({ ...form, voicePreset: e.target.value })}
              >
                {VOICE_PRESETS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Voice Speed ({form.voiceSpeed}x)</label>
              <input
                type="range" min="0.5" max="2" step="0.1"
                value={form.voiceSpeed}
                onChange={(e) => setForm({ ...form, voiceSpeed: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Veo Quality</label>
              <select
                className="admin-select"
                value={form.veoQuality}
                onChange={(e) => setForm({ ...form, veoQuality: e.target.value })}
              >
                <option value="draft">Draft (Fast)</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Video Duration ({form.videoDuration}s)</label>
              <input
                type="range" min="3" max="15" step="1"
                value={form.videoDuration}
                onChange={(e) => setForm({ ...form, videoDuration: parseInt(e.target.value, 10) })}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Job'}
          </button>
          <a href="/admin/productions" className="admin-btn admin-btn--ghost">Cancel</a>
        </div>
      </form>
    </>
  );
}
