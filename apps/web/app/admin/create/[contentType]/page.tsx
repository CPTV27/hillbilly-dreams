'use client';

// apps/web/app/admin/create/[contentType]/page.tsx
// Content Creation Wizard — 4-step flow.
//   Step 1: Topic + brand
//   Step 2: Review entities + photos (auto-loaded from /api/wizard/context)
//   Step 3: Generated draft preview
//   Step 4: Save to Sanity

import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

type ContentType =
  | 'magazine-article'
  | 'social-post'
  | 'listing-description'
  | 'episode-description'
  | 'pitch-deck-section';
type Brand =
  | 'inn'
  | 'magazine'
  | 'touring'
  | 'records'
  | 'radio'
  | 'cpp'
  | 'tuthill'
  | 'studio-c';

interface EntityCandidate {
  id: string;
  name: string;
  category: string;
  city: string | null;
  description: string | null;
}
interface PhotoCandidate {
  assetId: string;
  thumbnailUrl: string;
  takenAt: string | null;
  caption?: string;
  score: number;
}
interface WizardContext {
  topic: string;
  contentType: ContentType;
  brand: Brand;
  entities: EntityCandidate[];
  photos: PhotoCandidate[];
}
interface GeneratedDraft {
  title: string;
  body: string;
  wizardMeta: {
    topic: string;
    contentType: ContentType;
    brand: Brand;
    entityIds: string[];
    photoAssetIds: string[];
    aiModel: string;
    generatedAt: string;
  };
}

const BRAND_OPTIONS: Array<{ value: Brand; label: string }> = [
  { value: 'inn', label: 'Inn' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'touring', label: 'Touring' },
  { value: 'records', label: 'Records' },
  { value: 'radio', label: 'Radio' },
  { value: 'cpp', label: 'Chase Pierson Photography' },
  { value: 'tuthill', label: 'Tuthill Design' },
  { value: 'studio-c', label: 'Studio C' },
];

export default function WizardPage() {
  const params = useParams<{ contentType: ContentType }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialBrand = (searchParams.get('brand') ?? 'magazine') as Brand;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [topic, setTopic] = useState('');
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const [context, setContext] = useState<WizardContext | null>(null);
  const [selectedEntityIds, setSelectedEntityIds] = useState<Set<string>>(new Set());
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<string>>(new Set());
  const [draft, setDraft] = useState<GeneratedDraft | null>(null);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadContext() {
    if (!topic.trim()) {
      setError('Topic is required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/wizard/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, contentType: params.contentType, brand }),
      });
      if (!res.ok) throw new Error(`Context load failed: ${res.status}`);
      const json = await res.json();
      setContext(json.data);
      setSelectedEntityIds(new Set(json.data.entities.map((e: EntityCandidate) => e.id)));
      setSelectedPhotoIds(
        new Set((json.data.photos as PhotoCandidate[]).slice(0, 3).map((p) => p.assetId))
      );
      setStep(2);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }

  async function generateDraft() {
    if (!context) return;
    setLoading(true);
    setError(null);
    try {
      const entities = context.entities.filter((e) => selectedEntityIds.has(e.id));
      const photos = context.photos.filter((p) => selectedPhotoIds.has(p.assetId));
      const res = await fetch('/api/wizard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          contentType: params.contentType,
          brand,
          entities,
          photos,
        }),
      });
      if (!res.ok) throw new Error(`Generate failed: ${res.status}`);
      const json = await res.json();
      setDraft(json.data);
      setStep(3);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }

  async function saveDraft() {
    if (!draft) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/wizard/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft }),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      const json = await res.json();
      setSavedDocId(json.data.docId);
      setStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <button
          onClick={() => router.push('/admin/create')}
          style={{
            background: 'transparent',
            color: 'var(--text-muted, #6b6254)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            marginBottom: '8px',
            padding: 0,
          }}
        >
          ← All content types
        </button>
        <h1 style={{ fontSize: '24px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          {params.contentType.replace(/-/g, ' ')}
        </h1>
        <ProgressRail current={step} />
      </header>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#3a1a1a',
            border: '1px solid #c44',
            borderRadius: '4px',
            color: '#fcc',
            marginBottom: '12px',
            fontSize: '13px',
          }}
        >
          {error}
        </div>
      )}

      {step === 1 && (
        <Step1Topic
          topic={topic}
          onTopicChange={setTopic}
          brand={brand}
          onBrandChange={setBrand}
          loading={loading}
          onNext={loadContext}
        />
      )}
      {step === 2 && context && (
        <Step2Context
          context={context}
          selectedEntityIds={selectedEntityIds}
          selectedPhotoIds={selectedPhotoIds}
          onToggleEntity={(id) => {
            const next = new Set(selectedEntityIds);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            setSelectedEntityIds(next);
          }}
          onTogglePhoto={(id) => {
            const next = new Set(selectedPhotoIds);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            setSelectedPhotoIds(next);
          }}
          loading={loading}
          onBack={() => setStep(1)}
          onNext={generateDraft}
        />
      )}
      {step === 3 && draft && (
        <Step3Draft
          draft={draft}
          onEdit={(b) => setDraft({ ...draft, body: b })}
          onTitleEdit={(t) => setDraft({ ...draft, title: t })}
          loading={loading}
          onBack={() => setStep(2)}
          onSave={saveDraft}
        />
      )}
      {step === 4 && savedDocId && (
        <Step4Saved
          docId={savedDocId}
          onReset={() => {
            setStep(1);
            setTopic('');
            setContext(null);
            setDraft(null);
            setSavedDocId(null);
          }}
        />
      )}
    </div>
  );
}

function ProgressRail({ current }: { current: 1 | 2 | 3 | 4 }) {
  const labels = ['Topic', 'Context', 'Draft', 'Saved'];
  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
      {labels.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3 | 4;
        const active = n === current;
        const done = n < current;
        return (
          <div
            key={n}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: active ? '#2f2a23' : 'transparent',
              border: `1px solid ${done ? '#7fa86a' : active ? '#c8a676' : '#2a2723'}`,
              borderRadius: '4px',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: done ? '#7fa86a' : active ? '#e8d5a8' : 'var(--text-muted, #6b6254)',
              fontWeight: 600,
            }}
          >
            {n}. {label}
          </div>
        );
      })}
    </div>
  );
}

function Step1Topic({
  topic,
  onTopicChange,
  brand,
  onBrandChange,
  loading,
  onNext,
}: {
  topic: string;
  onTopicChange: (t: string) => void;
  brand: Brand;
  onBrandChange: (b: Brand) => void;
  loading: boolean;
  onNext: () => void;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          color: 'var(--text-muted, #6b6254)',
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        Brand voice
      </label>
      <select
        value={brand}
        onChange={(e) => onBrandChange(e.target.value as Brand)}
        style={{
          width: '100%',
          padding: '10px 12px',
          background: 'var(--surface, #191715)',
          border: '1px solid var(--border, #2a2723)',
          color: 'var(--text, #d8cfbe)',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '20px',
        }}
      >
        {BRAND_OPTIONS.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

      <label
        style={{
          display: 'block',
          color: 'var(--text-muted, #6b6254)',
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        What's it about?
      </label>
      <textarea
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        rows={4}
        placeholder="e.g., the Blues Room shows in May — focus on the Tracy Lake Trio Friday night"
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--bg, #14110f)',
          border: '1px solid var(--border, #2a2723)',
          color: 'var(--text, #d8cfbe)',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button
          onClick={onNext}
          disabled={loading || !topic.trim()}
          style={{
            padding: '10px 20px',
            background: '#7fa86a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !topic.trim() ? 0.5 : 1,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {loading ? 'Loading context…' : 'Find context →'}
        </button>
      </div>
    </div>
  );
}

function Step2Context({
  context,
  selectedEntityIds,
  selectedPhotoIds,
  onToggleEntity,
  onTogglePhoto,
  loading,
  onBack,
  onNext,
}: {
  context: WizardContext;
  selectedEntityIds: Set<string>;
  selectedPhotoIds: Set<string>;
  onToggleEntity: (id: string) => void;
  onTogglePhoto: (id: string) => void;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', margin: '0 0 12px' }}>
        Entities ({selectedEntityIds.size} selected · {context.entities.length} found)
      </h3>
      {context.entities.length === 0 ? (
        <p style={{ color: 'var(--text-muted, #888)', fontSize: '13px' }}>
          No entities matched. The draft will rely on your topic alone.
        </p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {context.entities.map((e) => {
            const selected = selectedEntityIds.has(e.id);
            return (
              <button
                key={e.id}
                onClick={() => onToggleEntity(e.id)}
                style={{
                  padding: '6px 12px',
                  background: selected ? '#2f2a23' : 'transparent',
                  color: selected ? '#e8d5a8' : 'var(--text-muted, #a89e8d)',
                  border: `1px solid ${selected ? '#c8a676' : '#2a2723'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                {e.name}
                <span style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', marginLeft: '6px' }}>
                  {e.category}
                  {e.city && ` · ${e.city}`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', margin: '0 0 12px' }}>
        Photos ({selectedPhotoIds.size} selected · {context.photos.length} found)
      </h3>
      {context.photos.length === 0 ? (
        <p style={{ color: 'var(--text-muted, #888)', fontSize: '13px' }}>
          No photos matched (Immich offline or no semantic hits). Draft will skip photo references.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '8px',
            marginBottom: '20px',
          }}
        >
          {context.photos.map((p) => {
            const selected = selectedPhotoIds.has(p.assetId);
            return (
              <button
                key={p.assetId}
                onClick={() => onTogglePhoto(p.assetId)}
                style={{
                  padding: 0,
                  background: 'transparent',
                  border: `2px solid ${selected ? '#c8a676' : '#2a2723'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  aspectRatio: '1',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnailUrl}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            color: 'var(--text-muted, #a89e8d)',
            border: '1px solid var(--border, #2a2723)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#7fa86a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {loading ? 'Generating…' : 'Generate draft →'}
        </button>
      </div>
    </div>
  );
}

function Step3Draft({
  draft,
  onEdit,
  onTitleEdit,
  loading,
  onBack,
  onSave,
}: {
  draft: GeneratedDraft;
  onEdit: (b: string) => void;
  onTitleEdit: (t: string) => void;
  loading: boolean;
  onBack: () => void;
  onSave: () => void;
}) {
  return (
    <div>
      <input
        type="text"
        value={draft.title}
        onChange={(e) => onTitleEdit(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--bg, #14110f)',
          border: '1px solid var(--border, #2a2723)',
          color: 'var(--text, #d8cfbe)',
          borderRadius: '4px',
          fontSize: '20px',
          fontFamily: 'var(--font-display)',
          marginBottom: '12px',
        }}
      />
      <textarea
        value={draft.body}
        onChange={(e) => onEdit(e.target.value)}
        rows={20}
        style={{
          width: '100%',
          padding: '14px',
          background: 'var(--bg, #14110f)',
          border: '1px solid var(--border, #2a2723)',
          color: 'var(--text, #d8cfbe)',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'var(--font-body, Georgia, serif)',
          lineHeight: 1.6,
          resize: 'vertical',
        }}
      />

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
        <span style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px' }}>
          {draft.body.split(/\s+/).filter(Boolean).length} words ·
          generated by {draft.wizardMeta.aiModel}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            color: 'var(--text-muted, #a89e8d)',
            border: '1px solid var(--border, #2a2723)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          ← Back
        </button>
        <button
          onClick={onSave}
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#7fa86a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {loading ? 'Saving…' : 'Save to Sanity →'}
        </button>
      </div>
    </div>
  );
}

function Step4Saved({ docId, onReset }: { docId: string; onReset: () => void }) {
  return (
    <div
      style={{
        padding: '40px 24px',
        textAlign: 'center',
        background: 'var(--surface, #191715)',
        border: '1px solid #7fa86a',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '0 0 8px' }}>
        Draft saved
      </h3>
      <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: '0 0 20px' }}>
        Sanity doc: <code>{docId}</code>
        <br />
        Open Studio to review and publish.
      </p>
      <button
        onClick={onReset}
        style={{
          padding: '10px 20px',
          background: '#c8a676',
          color: '#191715',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        Make another
      </button>
    </div>
  );
}
