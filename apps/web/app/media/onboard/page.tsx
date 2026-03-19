'use client';

// apps/web/app/media/onboard/page.tsx
// Deep South Directory — Business Onboarding Wizard
// Multi-step wizard for local business owners to get set up in the directory.
// Client component with internal state management only.
//
// Usage: linked from /media/get-started as the self-serve onboarding path.

import { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

type BusinessType = 'restaurant' | 'venue' | 'hotel' | 'shop' | 'tour' | 'service' | '';

interface Step1Data {
  businessName: string;
  businessType: BusinessType;
  city: string;
  state: string;
  website: string;
  googleBusiness: string;
  description: string;
}

interface Step2Data {
  origin: string;
  differentiation: string;
  idealCustomer: string;
}

interface PhotoFile {
  id: string;
  file: File;
  preview: string;
  name: string;
}

interface Step3Data {
  heroPhoto: PhotoFile | null;
  additionalPhotos: PhotoFile[];
}

interface WizardData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

type WizardStep = 1 | 2 | 3 | 4;
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

// ── Constants ─────────────────────────────────────────────────────────────────

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: '', label: 'Select a type' },
  { value: 'restaurant', label: 'Restaurant / Bar / Cafe' },
  { value: 'venue', label: 'Music Venue / Event Space' },
  { value: 'hotel', label: 'Hotel / B&B / Inn' },
  { value: 'shop', label: 'Retail Shop / Boutique' },
  { value: 'tour', label: 'Tour Operator / Guide Service' },
  { value: 'service', label: 'Service Business' },
];

const US_STATES = [
  '', 'AL', 'AR', 'FL', 'GA', 'KY', 'LA', 'MS', 'MO', 'NC',
  'SC', 'TN', 'TX', 'VA', 'WV',
  '—',
  'AK', 'AZ', 'CA', 'CO', 'CT', 'DE', 'HI', 'ID', 'IL', 'IN',
  'IA', 'KS', 'ME', 'MD', 'MA', 'MI', 'MN', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SD', 'UT', 'VT', 'WA', 'WI', 'WY', 'DC',
];

const STEPS = [
  { num: 1, label: 'Your Business' },
  { num: 2, label: 'Your Story' },
  { num: 3, label: 'Photos' },
  { num: 4, label: 'Review' },
];

const INITIAL_DATA: WizardData = {
  step1: {
    businessName: '',
    businessType: '',
    city: '',
    state: '',
    website: '',
    googleBusiness: '',
    description: '',
  },
  step2: {
    origin: '',
    differentiation: '',
    idealCustomer: '',
  },
  step3: {
    heroPhoto: null,
    additionalPhotos: [],
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function createPhotoFile(file: File): PhotoFile {
  return {
    id: generateId(),
    file,
    preview: URL.createObjectURL(file),
    name: file.name,
  };
}

function validateStep1(data: Step1Data): string[] {
  const errors: string[] = [];
  if (!data.businessName.trim()) errors.push('businessName');
  if (!data.businessType) errors.push('businessType');
  if (!data.city.trim()) errors.push('city');
  if (!data.state) errors.push('state');
  if (!data.description.trim()) errors.push('description');
  return errors;
}

function validateStep2(data: Step2Data): string[] {
  const errors: string[] = [];
  if (!data.origin.trim()) errors.push('origin');
  if (!data.differentiation.trim()) errors.push('differentiation');
  if (!data.idealCustomer.trim()) errors.push('idealCustomer');
  return errors;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: WizardStep; total: number }) {
  const pct = ((current - 1) / (total - 1)) * 100;
  return (
    <div className="ob-progress" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current} of ${total}`}>
      <div className="ob-progress__steps">
        {STEPS.map((s) => (
          <div
            key={s.num}
            className={`ob-progress__step ${current === s.num ? 'ob-progress__step--active' : ''} ${current > s.num ? 'ob-progress__step--done' : ''}`}
          >
            <div className="ob-progress__dot" aria-hidden="true">
              {current > s.num ? (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span>{s.num}</span>
              )}
            </div>
            <span className="ob-progress__label">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="ob-progress__bar" aria-hidden="true">
        <div className="ob-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function FieldError({ visible, message }: { visible: boolean; message: string }) {
  if (!visible) return null;
  return (
    <span className="ob-field__error" role="alert" aria-live="polite">
      {message}
    </span>
  );
}

// ── Step 1: Business Info ─────────────────────────────────────────────────────

function Step1({
  data,
  errors,
  onChange,
}: {
  data: Step1Data;
  errors: string[];
  onChange: (patch: Partial<Step1Data>) => void;
}) {
  const descLen = data.description.length;
  const descOver = descLen > 280;

  return (
    <div className="ob-step" role="group" aria-labelledby="step1-heading">
      <div className="ob-step__header">
        <div className="ob-step__eyebrow">Step 1 of 4</div>
        <h2 className="ob-step__title" id="step1-heading">Tell Us About Your Business</h2>
        <p className="ob-step__sub">The basics. This becomes your directory listing.</p>
      </div>

      <div className="ob-fields">
        {/* Business Name */}
        <div className={`ob-field ob-field--full ${errors.includes('businessName') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-businessName" className="ob-field__label">
            Business Name <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <input
            id="ob-businessName"
            type="text"
            className="ob-field__input"
            placeholder="The Blue Note"
            value={data.businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            aria-required="true"
            aria-invalid={errors.includes('businessName')}
            maxLength={120}
            autoComplete="organization"
          />
          <FieldError visible={errors.includes('businessName')} message="Business name is required" />
        </div>

        {/* Business Type */}
        <div className={`ob-field ${errors.includes('businessType') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-businessType" className="ob-field__label">
            Business Type <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <select
            id="ob-businessType"
            className="ob-field__select"
            value={data.businessType}
            onChange={(e) => onChange({ businessType: e.target.value as BusinessType })}
            aria-required="true"
            aria-invalid={errors.includes('businessType')}
          >
            {BUSINESS_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError visible={errors.includes('businessType')} message="Please select a business type" />
        </div>

        {/* City */}
        <div className={`ob-field ${errors.includes('city') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-city" className="ob-field__label">
            City <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <input
            id="ob-city"
            type="text"
            className="ob-field__input"
            placeholder="Natchez"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            aria-required="true"
            aria-invalid={errors.includes('city')}
            autoComplete="address-level2"
          />
          <FieldError visible={errors.includes('city')} message="City is required" />
        </div>

        {/* State */}
        <div className={`ob-field ${errors.includes('state') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-state" className="ob-field__label">
            State <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <select
            id="ob-state"
            className="ob-field__select"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            aria-required="true"
            aria-invalid={errors.includes('state')}
            autoComplete="address-level1"
          >
            <option value="">Select state</option>
            <optgroup label="Deep South Corridor">
              {['AL', 'AR', 'FL', 'GA', 'KY', 'LA', 'MS', 'MO', 'NC', 'SC', 'TN', 'TX', 'VA', 'WV'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </optgroup>
            <optgroup label="Other States">
              {['AK','AZ','CA','CO','CT','DE','HI','ID','IL','IN','IA','KS','ME','MD','MA','MI','MN','MT','NE','NV','NH','NJ','NM','NY','ND','OH','OK','OR','PA','RI','SD','UT','VT','WA','WI','WY','DC'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </optgroup>
          </select>
          <FieldError visible={errors.includes('state')} message="State is required" />
        </div>

        {/* Website */}
        <div className="ob-field">
          <label htmlFor="ob-website" className="ob-field__label">
            Website <span className="ob-field__optional">(optional)</span>
          </label>
          <input
            id="ob-website"
            type="url"
            className="ob-field__input"
            placeholder="https://yourbusiness.com"
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            autoComplete="url"
          />
        </div>

        {/* Google Business */}
        <div className="ob-field">
          <label htmlFor="ob-googleBusiness" className="ob-field__label">
            Google Business Profile <span className="ob-field__optional">(optional)</span>
          </label>
          <input
            id="ob-googleBusiness"
            type="url"
            className="ob-field__input"
            placeholder="https://g.page/your-business"
            value={data.googleBusiness}
            onChange={(e) => onChange({ googleBusiness: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className={`ob-field ob-field--full ${errors.includes('description') ? 'ob-field--error' : ''} ${descOver ? 'ob-field--over' : ''}`}>
          <label htmlFor="ob-description" className="ob-field__label">
            Brief Description <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <textarea
            id="ob-description"
            className="ob-field__textarea"
            placeholder="One to three sentences about what you do and why you're worth stopping for."
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            aria-required="true"
            aria-invalid={errors.includes('description')}
            aria-describedby="ob-desc-count"
          />
          <div className="ob-field__footer">
            <FieldError visible={errors.includes('description')} message="Description is required" />
            <span
              id="ob-desc-count"
              className={`ob-field__char-count ${descOver ? 'ob-field__char-count--over' : ''}`}
              aria-live="polite"
            >
              {descLen}/280
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Your Story ────────────────────────────────────────────────────────

function Step2({
  data,
  errors,
  onChange,
}: {
  data: Step2Data;
  errors: string[];
  onChange: (patch: Partial<Step2Data>) => void;
}) {
  return (
    <div className="ob-step" role="group" aria-labelledby="step2-heading">
      <div className="ob-step__header">
        <div className="ob-step__eyebrow">Step 2 of 4</div>
        <h2 className="ob-step__title" id="step2-heading">Your Story</h2>
        <p className="ob-step__sub">These answers train the AI to write in your voice. Don't overthink it — just talk like you would to someone at the bar.</p>
      </div>

      <div className="ob-fields">
        {/* Origin */}
        <div className={`ob-field ob-field--full ${errors.includes('origin') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-origin" className="ob-field__label">
            How did you get started? <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <p className="ob-field__hint">The real story. How long ago, what pushed you to open, what it was like at the beginning.</p>
          <textarea
            id="ob-origin"
            className="ob-field__textarea ob-field__textarea--tall"
            placeholder="I opened this place in 2009 after working in Memphis kitchens for fifteen years. I was tired of cooking for people who didn't know the food..."
            value={data.origin}
            onChange={(e) => onChange({ origin: e.target.value })}
            rows={5}
            aria-required="true"
            aria-invalid={errors.includes('origin')}
          />
          <FieldError visible={errors.includes('origin')} message="This field is required" />
        </div>

        {/* Differentiation */}
        <div className={`ob-field ob-field--full ${errors.includes('differentiation') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-differentiation" className="ob-field__label">
            What makes you different? <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <p className="ob-field__hint">Not "great service and quality food." What's the actual thing that people remember and come back for?</p>
          <textarea
            id="ob-differentiation"
            className="ob-field__textarea ob-field__textarea--tall"
            placeholder="We only serve what's in season. No freezer. No shortcuts. If something's not right today, it doesn't go on the menu today..."
            value={data.differentiation}
            onChange={(e) => onChange({ differentiation: e.target.value })}
            rows={5}
            aria-required="true"
            aria-invalid={errors.includes('differentiation')}
          />
          <FieldError visible={errors.includes('differentiation')} message="This field is required" />
        </div>

        {/* Ideal Customer */}
        <div className={`ob-field ob-field--full ${errors.includes('idealCustomer') ? 'ob-field--error' : ''}`}>
          <label htmlFor="ob-idealCustomer" className="ob-field__label">
            Who's your ideal customer? <span aria-hidden="true" className="ob-field__required">*</span>
          </label>
          <p className="ob-field__hint">Paint a picture. Not a demographic — a person. What are they doing the day they come in? What do they need?</p>
          <textarea
            id="ob-idealCustomer"
            className="ob-field__textarea ob-field__textarea--tall"
            placeholder="Someone driving the corridor who knows a little about music history and wants to eat somewhere the locals actually eat, not a place with a billboard on I-20..."
            value={data.idealCustomer}
            onChange={(e) => onChange({ idealCustomer: e.target.value })}
            rows={5}
            aria-required="true"
            aria-invalid={errors.includes('idealCustomer')}
          />
          <FieldError visible={errors.includes('idealCustomer')} message="This field is required" />
        </div>
      </div>

      <div className="ob-story-note" aria-label="Note about AI voice building">
        <div className="ob-story-note__icon" aria-hidden="true">&#9670;</div>
        <p className="ob-story-note__text">
          We use these answers to build a brand voice profile for your business.
          The AI writes your social posts, review responses, and listing copy in your voice — not ours.
        </p>
      </div>
    </div>
  );
}

// ── Step 3: Photos ────────────────────────────────────────────────────────────

function Step3({
  data,
  onChange,
}: {
  data: Step3Data;
  onChange: (patch: Partial<Step3Data>) => void;
}) {
  const heroInputRef = useRef<HTMLInputElement>(null);
  const addlInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [heroDragging, setHeroDragging] = useState(false);
  const [addlDragging, setAddlDragging] = useState(false);

  const handleHeroFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    onChange({ heroPhoto: createPhotoFile(file) });
  }, [onChange]);

  const handleAdditionalFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const existing = data.additionalPhotos;
    const remaining = 10 - existing.length;
    if (remaining <= 0) return;
    const newPhotos: PhotoFile[] = [];
    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const f = files[i];
      if (f.type.startsWith('image/')) {
        newPhotos.push(createPhotoFile(f));
      }
    }
    onChange({ additionalPhotos: [...existing, ...newPhotos] });
  }, [data.additionalPhotos, onChange]);

  const removeAdditional = useCallback((id: string) => {
    onChange({
      additionalPhotos: data.additionalPhotos.filter((p) => p.id !== id),
    });
  }, [data.additionalPhotos, onChange]);

  const removeHero = useCallback(() => {
    onChange({ heroPhoto: null });
  }, [onChange]);

  function handleHeroDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setHeroDragging(false);
    handleHeroFile(e.dataTransfer.files);
  }

  function handleAddlDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setAddlDragging(false);
    handleAdditionalFiles(e.dataTransfer.files);
  }

  const additionalCount = data.additionalPhotos.length;

  return (
    <div className="ob-step" role="group" aria-labelledby="step3-heading">
      <div className="ob-step__header">
        <div className="ob-step__eyebrow">Step 3 of 4</div>
        <h2 className="ob-step__title" id="step3-heading">Photos</h2>
        <p className="ob-step__sub">Real photos, real light. No stock. No filters. Show what it actually looks like.</p>
      </div>

      {/* Photo Tips */}
      <div className="ob-photo-tips" role="note" aria-label="Photo tips">
        <div className="ob-photo-tips__title">Quick tips</div>
        <ul className="ob-photo-tips__list">
          <li>Natural light beats any filter</li>
          <li>Show the real thing — people, food, the room as it is</li>
          <li>Horizontal shots work best for the listing</li>
          <li>At least 1200px wide if possible</li>
        </ul>
      </div>

      {/* Hero Upload */}
      <div className="ob-photo-section">
        <div className="ob-photo-section__label">
          Hero Photo <span className="ob-field__optional">(the one that leads your listing)</span>
        </div>

        {data.heroPhoto ? (
          <div className="ob-hero-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.heroPhoto.preview}
              alt={`Hero photo: ${data.heroPhoto.name}`}
              className="ob-hero-preview__img"
            />
            <div className="ob-hero-preview__overlay">
              <span className="ob-hero-preview__name">{data.heroPhoto.name}</span>
              <button
                type="button"
                className="ob-hero-preview__remove"
                onClick={removeHero}
                aria-label="Remove hero photo"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`ob-dropzone ${heroDragging ? 'ob-dropzone--dragging' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setHeroDragging(true); }}
            onDragLeave={() => setHeroDragging(false)}
            onDrop={handleHeroDrop}
            role="button"
            tabIndex={0}
            aria-label="Drop hero photo here or press Enter to browse"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') heroInputRef.current?.click(); }}
          >
            <div className="ob-dropzone__icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 22l8-7 6 5 4-4 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="ob-dropzone__primary">Drop your hero photo here</p>
            <p className="ob-dropzone__secondary">or tap to browse your photos</p>
            <button
              type="button"
              className="ob-dropzone__browse btn btn--outline"
              onClick={() => heroInputRef.current?.click()}
              tabIndex={-1}
              aria-hidden="true"
            >
              Browse Photos
            </button>
            <input
              ref={heroInputRef}
              type="file"
              accept="image/*"
              className="ob-input-hidden"
              aria-hidden="true"
              tabIndex={-1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleHeroFile(e.target.files)}
            />
          </div>
        )}

        {/* Camera button for mobile */}
        <button
          type="button"
          className="ob-camera-btn"
          onClick={() => cameraInputRef.current?.click()}
          aria-label="Take a photo with your camera"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Take a Photo Now
        </button>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="ob-input-hidden"
          aria-hidden="true"
          tabIndex={-1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleHeroFile(e.target.files)}
        />
      </div>

      {/* Additional Photos */}
      <div className="ob-photo-section">
        <div className="ob-photo-section__label">
          Additional Photos
          <span className="ob-photo-section__count">{additionalCount}/10</span>
        </div>

        {additionalCount < 10 && (
          <div
            className={`ob-dropzone ob-dropzone--sm ${addlDragging ? 'ob-dropzone--dragging' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setAddlDragging(true); }}
            onDragLeave={() => setAddlDragging(false)}
            onDrop={handleAddlDrop}
            role="button"
            tabIndex={0}
            aria-label={`Drop additional photos here. ${10 - additionalCount} slots remaining.`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') addlInputRef.current?.click(); }}
          >
            <p className="ob-dropzone__primary">Drop more photos here</p>
            <p className="ob-dropzone__secondary">
              {10 - additionalCount} more {10 - additionalCount === 1 ? 'slot' : 'slots'} available
            </p>
            <button
              type="button"
              className="ob-dropzone__browse btn btn--outline"
              onClick={() => addlInputRef.current?.click()}
              tabIndex={-1}
              aria-hidden="true"
            >
              Browse
            </button>
            <input
              ref={addlInputRef}
              type="file"
              accept="image/*"
              multiple
              className="ob-input-hidden"
              aria-hidden="true"
              tabIndex={-1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleAdditionalFiles(e.target.files)}
            />
          </div>
        )}

        {additionalCount > 0 && (
          <div className="ob-photo-grid" role="list" aria-label="Uploaded photos">
            {data.additionalPhotos.map((photo) => (
              <div key={photo.id} className="ob-photo-thumb" role="listitem">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.preview}
                  alt={photo.name}
                  className="ob-photo-thumb__img"
                />
                <button
                  type="button"
                  className="ob-photo-thumb__remove"
                  onClick={() => removeAdditional(photo.id)}
                  aria-label={`Remove photo ${photo.name}`}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 4: Review ────────────────────────────────────────────────────────────

function Step4({
  data,
  onEdit,
}: {
  data: WizardData;
  onEdit: (step: WizardStep) => void;
}) {
  const { step1, step2, step3 } = data;
  const businessTypeName = BUSINESS_TYPES.find((t) => t.value === step1.businessType)?.label || '';

  return (
    <div className="ob-step" role="group" aria-labelledby="step4-heading">
      <div className="ob-step__header">
        <div className="ob-step__eyebrow">Step 4 of 4</div>
        <h2 className="ob-step__title" id="step4-heading">Review & Submit</h2>
        <p className="ob-step__sub">Look this over. Once you submit, we'll review your listing and reach back out within 48 hours.</p>
      </div>

      {/* Listing Preview */}
      <div className="ob-preview-card" aria-label="Listing preview">
        <div className="ob-preview-card__badge">Preview</div>
        {step3.heroPhoto && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={step3.heroPhoto.preview}
            alt={`${step1.businessName} hero photo`}
            className="ob-preview-card__hero"
          />
        )}
        {!step3.heroPhoto && (
          <div className="ob-preview-card__hero-placeholder" aria-hidden="true">
            <span>No hero photo yet</span>
          </div>
        )}
        <div className="ob-preview-card__body">
          {businessTypeName && (
            <div className="ob-preview-card__type">{businessTypeName}</div>
          )}
          <h3 className="ob-preview-card__name">
            {step1.businessName || <span className="ob-preview-card__placeholder">Business Name</span>}
          </h3>
          {(step1.city || step1.state) && (
            <div className="ob-preview-card__location">
              {[step1.city, step1.state].filter(Boolean).join(', ')}
            </div>
          )}
          {step1.description && (
            <p className="ob-preview-card__desc">{step1.description}</p>
          )}
          {step1.website && (
            <div className="ob-preview-card__link">{step1.website}</div>
          )}
        </div>
      </div>

      {/* Summary Sections */}
      <div className="ob-summary">

        {/* Business Info */}
        <div className="ob-summary__section">
          <div className="ob-summary__section-header">
            <span className="ob-summary__section-title">Business Info</span>
            <button
              type="button"
              className="ob-summary__edit"
              onClick={() => onEdit(1)}
              aria-label="Edit business info"
            >
              Edit
            </button>
          </div>
          <dl className="ob-summary__dl">
            <div className="ob-summary__row">
              <dt>Business</dt>
              <dd>{step1.businessName || <span className="ob-summary__empty">—</span>}</dd>
            </div>
            <div className="ob-summary__row">
              <dt>Type</dt>
              <dd>{businessTypeName || <span className="ob-summary__empty">—</span>}</dd>
            </div>
            <div className="ob-summary__row">
              <dt>Location</dt>
              <dd>{[step1.city, step1.state].filter(Boolean).join(', ') || <span className="ob-summary__empty">—</span>}</dd>
            </div>
            {step1.website && (
              <div className="ob-summary__row">
                <dt>Website</dt>
                <dd className="ob-summary__dd--truncate">{step1.website}</dd>
              </div>
            )}
            {step1.googleBusiness && (
              <div className="ob-summary__row">
                <dt>Google</dt>
                <dd className="ob-summary__dd--truncate">{step1.googleBusiness}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Story */}
        <div className="ob-summary__section">
          <div className="ob-summary__section-header">
            <span className="ob-summary__section-title">Your Story</span>
            <button
              type="button"
              className="ob-summary__edit"
              onClick={() => onEdit(2)}
              aria-label="Edit your story"
            >
              Edit
            </button>
          </div>
          <dl className="ob-summary__dl">
            <div className="ob-summary__row ob-summary__row--stacked">
              <dt>How you got started</dt>
              <dd>{step2.origin || <span className="ob-summary__empty">—</span>}</dd>
            </div>
            <div className="ob-summary__row ob-summary__row--stacked">
              <dt>What makes you different</dt>
              <dd>{step2.differentiation || <span className="ob-summary__empty">—</span>}</dd>
            </div>
            <div className="ob-summary__row ob-summary__row--stacked">
              <dt>Ideal customer</dt>
              <dd>{step2.idealCustomer || <span className="ob-summary__empty">—</span>}</dd>
            </div>
          </dl>
        </div>

        {/* Photos */}
        <div className="ob-summary__section">
          <div className="ob-summary__section-header">
            <span className="ob-summary__section-title">Photos</span>
            <button
              type="button"
              className="ob-summary__edit"
              onClick={() => onEdit(3)}
              aria-label="Edit photos"
            >
              Edit
            </button>
          </div>
          <div className="ob-summary__photo-row">
            {step3.heroPhoto ? (
              <div className="ob-summary__photo-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step3.heroPhoto.preview} alt="Hero" className="ob-summary__photo-thumb" />
                <span className="ob-summary__photo-label">Hero</span>
              </div>
            ) : (
              <span className="ob-summary__empty">No hero photo added</span>
            )}
            {step3.additionalPhotos.map((p) => (
              <div key={p.id} className="ob-summary__photo-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={p.name} className="ob-summary__photo-thumb" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What happens next */}
      <div className="ob-next-steps" role="note">
        <div className="ob-next-steps__icon" aria-hidden="true">&#9670;</div>
        <div className="ob-next-steps__content">
          <strong>What happens after you submit</strong>
          <p>We'll review your listing and get back to you within 48 hours. No phone call required — we'll reach out by email with any questions and a link to preview your live listing before it goes public.</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Wizard Component ─────────────────────────────────────────────────────

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [saved, setSaved] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateStep1(patch: Partial<Step1Data>) {
    setData((prev) => ({ ...prev, step1: { ...prev.step1, ...patch } }));
    if (errors.length > 0) setErrors([]);
  }

  function updateStep2(patch: Partial<Step2Data>) {
    setData((prev) => ({ ...prev, step2: { ...prev.step2, ...patch } }));
    if (errors.length > 0) setErrors([]);
  }

  function updateStep3(patch: Partial<Step3Data>) {
    setData((prev) => ({ ...prev, step3: { ...prev.step3, ...patch } }));
  }

  function flashSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function goNext() {
    let stepErrors: string[] = [];

    if (currentStep === 1) {
      stepErrors = validateStep1(data.step1);
    } else if (currentStep === 2) {
      stepErrors = validateStep2(data.step2);
    }

    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors([]);
    flashSaved();
    setCurrentStep((prev) => Math.min(prev + 1, 4) as WizardStep);
    scrollTop();
  }

  function goBack() {
    setErrors([]);
    setCurrentStep((prev) => Math.max(prev - 1, 1) as WizardStep);
    scrollTop();
  }

  function goToStep(step: WizardStep) {
    setErrors([]);
    setCurrentStep(step);
    scrollTop();
  }

  async function handleSubmit() {
    setSubmitState('submitting');

    // Build a plain payload (no File objects — those would go via FormData in a real impl)
    const payload = {
      businessName: data.step1.businessName,
      businessType: data.step1.businessType,
      city: data.step1.city,
      state: data.step1.state,
      website: data.step1.website || undefined,
      googleBusiness: data.step1.googleBusiness || undefined,
      description: data.step1.description,
      origin: data.step2.origin,
      differentiation: data.step2.differentiation,
      idealCustomer: data.step2.idealCustomer,
      heroPhotoName: data.step3.heroPhoto?.name,
      additionalPhotoCount: data.step3.additionalPhotos.length,
      source: 'media-onboard-wizard',
    };

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Submission failed (${res.status})`);
      }

      setSubmitState('success');
      scrollTop();
    } catch {
      setSubmitState('error');
    }
  }

  // ── Success screen
  if (submitState === 'success') {
    return (
      <div className="ob-page" ref={topRef}>
        <div className="ob-container ob-container--narrow">
          <div className="ob-success">
            <div className="ob-success__icon" aria-hidden="true">&#10003;</div>
            <div className="ob-success__eyebrow">You're in</div>
            <h1 className="ob-success__title">We'll Be in Touch</h1>
            <p className="ob-success__body">
              Your listing is in review. We'll have someone look it over and reach back out within 48 hours
              with a preview link before anything goes live.
            </p>
            <p className="ob-success__body">
              Check your inbox — and your spam folder just in case. If you don't hear from us,
              email{' '}
              <a href="mailto:media@bigmuddytouring.com" className="ob-success__email">
                media@bigmuddytouring.com
              </a>
              {' '}directly.
            </p>
            <div className="ob-success__actions">
              <a href="/media" className="btn btn--outline">Back to Directory</a>
              <a href="/media/how-it-works" className="btn btn--ghost">See How It Works</a>
            </div>
          </div>
        </div>

        <style>{obStyles}</style>
      </div>
    );
  }

  return (
    <div className="ob-page" ref={topRef}>
      <div className="ob-container">

        {/* ── Page Header ── */}
        <div className="ob-page-header">
          <a href="/media" className="ob-back-link" aria-label="Back to Deep South Directory">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Deep South Directory
          </a>
          <div className="ob-page-header__title-group">
            <div className="ob-page-header__eyebrow">Business Onboarding</div>
            <h1 className="ob-page-header__title">Get Listed</h1>
          </div>
        </div>

        {/* ── Progress ── */}
        <ProgressBar current={currentStep} total={4} />

        {/* ── Save Indicator ── */}
        <div
          className={`ob-save-indicator ${saved ? 'ob-save-indicator--visible' : ''}`}
          aria-live="polite"
          aria-label={saved ? 'Progress saved' : ''}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 6l3.5 3.5L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Progress saved
        </div>

        {/* ── Step Content ── */}
        <div className="ob-step-container" key={currentStep} aria-live="polite" aria-atomic="true">
          {currentStep === 1 && (
            <Step1 data={data.step1} errors={errors} onChange={updateStep1} />
          )}
          {currentStep === 2 && (
            <Step2 data={data.step2} errors={errors} onChange={updateStep2} />
          )}
          {currentStep === 3 && (
            <Step3 data={data.step3} onChange={updateStep3} />
          )}
          {currentStep === 4 && (
            <Step4 data={data} onEdit={goToStep} />
          )}
        </div>

        {/* ── Validation Error Banner ── */}
        {errors.length > 0 && (
          <div className="ob-validation-banner" role="alert" aria-live="assertive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1L1 14h14L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 6v4M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Please fill in the required fields above before continuing.
          </div>
        )}

        {/* ── Error on Submit ── */}
        {submitState === 'error' && (
          <div className="ob-validation-banner ob-validation-banner--error" role="alert">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1L1 14h14L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 6v4M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Something went wrong. Please try again or email us at{' '}
            <a href="mailto:media@bigmuddytouring.com" className="ob-banner-link">
              media@bigmuddytouring.com
            </a>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="ob-nav">
          <div className="ob-nav__left">
            {currentStep > 1 && (
              <button
                type="button"
                className="ob-nav__back btn btn--ghost"
                onClick={goBack}
                aria-label="Go back to previous step"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>
            )}
          </div>

          <div className="ob-nav__right">
            {currentStep < 4 && (
              <button
                type="button"
                className="ob-nav__next btn btn--primary"
                onClick={goNext}
              >
                {currentStep === 3 ? 'Review' : 'Continue'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {currentStep === 4 && (
              <button
                type="button"
                className="ob-nav__submit btn btn--primary"
                onClick={handleSubmit}
                disabled={submitState === 'submitting'}
                aria-busy={submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'Submitting...' : 'Submit Listing'}
              </button>
            )}
          </div>
        </div>

        {/* ── Step indicator text ── */}
        <div className="ob-step-hint" aria-hidden="true">
          Step {currentStep} of 4
          {currentStep < 4 && ' · Changes are saved automatically'}
        </div>

      </div>

      <style>{obStyles}</style>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const obStyles = `
  /* ── Page Shell ── */
  .ob-page {
    background: var(--bg);
    min-height: 100vh;
    padding: var(--space-8) 0 var(--space-24);
  }
  .ob-container {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 var(--space-5);
  }
  .ob-container--narrow {
    max-width: 560px;
    margin: 0 auto;
    padding: 0 var(--space-5);
  }

  /* ── Page Header ── */
  .ob-page-header {
    margin-bottom: var(--space-8);
  }
  .ob-back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--text-disabled);
    text-decoration: none;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    margin-bottom: var(--space-6);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .ob-back-link:hover {
    color: var(--accent);
  }
  .ob-page-header__eyebrow {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }
  .ob-page-header__title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: 800;
    color: var(--text);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-tight);
    margin: 0;
  }

  /* ── Progress Bar ── */
  .ob-progress {
    margin-bottom: var(--space-6);
  }
  .ob-progress__steps {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    margin-bottom: var(--space-3);
  }
  .ob-progress__bar {
    height: 2px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }
  .ob-progress__fill {
    height: 100%;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ob-progress__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    flex: 1;
    opacity: 0.35;
    transition: opacity var(--duration-fast) var(--ease-default);
  }
  .ob-progress__step--active,
  .ob-progress__step--done {
    opacity: 1;
  }
  .ob-progress__dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--border-strong);
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--text-muted);
    transition: background var(--duration-fast) var(--ease-default),
                border-color var(--duration-fast) var(--ease-default),
                color var(--duration-fast) var(--ease-default);
  }
  .ob-progress__step--active .ob-progress__dot {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg);
    box-shadow: 0 0 0 4px var(--accent-muted);
  }
  .ob-progress__step--done .ob-progress__dot {
    background: var(--accent-muted);
    border-color: var(--accent);
    color: var(--accent);
  }
  .ob-progress__label {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    white-space: nowrap;
  }
  .ob-progress__step--active .ob-progress__label {
    color: var(--accent);
  }

  /* ── Save Indicator ── */
  .ob-save-indicator {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--accent);
    letter-spacing: var(--tracking-wide);
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    margin-bottom: var(--space-2);
    min-height: 20px;
    pointer-events: none;
  }
  .ob-save-indicator--visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Step Container (animated) ── */
  .ob-step-container {
    animation: ob-step-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  @keyframes ob-step-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ── Step Header ── */
  .ob-step {
    padding: var(--space-8) 0 var(--space-4);
  }
  .ob-step__header {
    margin-bottom: var(--space-8);
  }
  .ob-step__eyebrow {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }
  .ob-step__title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: 800;
    color: var(--text);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-tight);
    margin: 0 0 var(--space-3);
  }
  .ob-step__sub {
    font-family: var(--font-body);
    font-size: var(--text-md);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin: 0;
  }

  /* ── Fields Grid ── */
  .ob-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
  }
  @media (max-width: 520px) {
    .ob-fields {
      grid-template-columns: 1fr;
    }
  }
  .ob-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .ob-field--full {
    grid-column: 1 / -1;
  }
  .ob-field__label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }
  .ob-field__required {
    color: var(--accent);
  }
  .ob-field__optional {
    font-weight: 400;
    color: var(--text-disabled);
    text-transform: none;
    letter-spacing: 0;
    font-size: var(--text-xs);
  }
  .ob-field__hint {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-disabled);
    line-height: var(--leading-normal);
    margin: 0 0 var(--space-1);
    font-style: italic;
  }
  .ob-field__input,
  .ob-field__select,
  .ob-field__textarea {
    width: 100%;
    background: var(--surface-2);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--text);
    outline: none;
    transition: border-color var(--duration-fast) var(--ease-default),
                box-shadow var(--duration-fast) var(--ease-default);
    appearance: none;
    -webkit-appearance: none;
    box-sizing: border-box;
  }
  .ob-field__input::placeholder,
  .ob-field__textarea::placeholder {
    color: var(--text-disabled);
  }
  .ob-field__input:focus,
  .ob-field__select:focus,
  .ob-field__textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-muted);
  }
  .ob-field--error .ob-field__input,
  .ob-field--error .ob-field__select,
  .ob-field--error .ob-field__textarea {
    border-color: var(--error, #c0392b);
  }
  .ob-field--over .ob-field__textarea {
    border-color: var(--error, #c0392b);
  }
  .ob-field__select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8074' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-4) center;
    padding-right: var(--space-10);
  }
  .ob-field__textarea {
    resize: vertical;
    min-height: 100px;
    line-height: var(--leading-normal);
  }
  .ob-field__textarea--tall {
    min-height: 130px;
  }
  .ob-field__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .ob-field__char-count {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-disabled);
    white-space: nowrap;
    margin-left: auto;
  }
  .ob-field__char-count--over {
    color: var(--error, #c0392b);
    font-weight: 700;
  }
  .ob-field__error {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--error, #c0392b);
    font-weight: 500;
  }

  /* ── Story Note ── */
  .ob-story-note {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    margin-top: var(--space-8);
    padding: var(--space-5);
    background: var(--accent-muted, rgba(200, 148, 62, 0.06));
    border: 1px solid rgba(200, 148, 62, 0.2);
    border-radius: var(--radius-md);
  }
  .ob-story-note__icon {
    font-size: 8px;
    color: var(--accent);
    margin-top: 5px;
    flex-shrink: 0;
  }
  .ob-story-note__text {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin: 0;
  }

  /* ── Photo Tips ── */
  .ob-photo-tips {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-4) var(--space-5);
    margin-bottom: var(--space-7);
  }
  .ob-photo-tips__title {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin-bottom: var(--space-3);
  }
  .ob-photo-tips__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-6);
  }
  .ob-photo-tips__list li {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    position: relative;
    padding-left: var(--space-4);
  }
  .ob-photo-tips__list li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: var(--text-xs);
  }

  /* ── Photo Sections ── */
  .ob-photo-section {
    margin-bottom: var(--space-8);
  }
  .ob-photo-section__label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin-bottom: var(--space-3);
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .ob-photo-section__count {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
  }

  /* ── Dropzone ── */
  .ob-dropzone {
    border: 1.5px dashed var(--border-strong);
    border-radius: var(--radius-lg);
    padding: var(--space-10) var(--space-6);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    text-align: center;
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--ease-default),
                background var(--duration-fast) var(--ease-default);
    position: relative;
  }
  .ob-dropzone:hover,
  .ob-dropzone:focus-within {
    border-color: var(--accent);
    background: var(--accent-muted, rgba(200, 148, 62, 0.04));
  }
  .ob-dropzone:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .ob-dropzone--dragging {
    border-color: var(--accent);
    background: var(--accent-muted, rgba(200, 148, 62, 0.08));
  }
  .ob-dropzone--sm {
    padding: var(--space-6) var(--space-5);
  }
  .ob-dropzone__icon {
    color: var(--text-disabled);
    margin-bottom: var(--space-1);
  }
  .ob-dropzone__primary {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--text);
    margin: 0;
  }
  .ob-dropzone__secondary {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    margin: 0 0 var(--space-4);
  }
  .ob-dropzone__browse {
    font-size: var(--text-xs);
    padding: var(--space-2) var(--space-5);
  }

  /* ── Hero Preview ── */
  .ob-hero-preview {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .ob-hero-preview__img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    display: block;
  }
  @media (min-width: 520px) {
    .ob-hero-preview__img {
      height: 300px;
    }
  }
  .ob-hero-preview__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-3) var(--space-4);
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .ob-hero-preview__name {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.7);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ob-hero-preview__remove {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    flex-shrink: 0;
    transition: color var(--duration-fast) var(--ease-default);
  }
  .ob-hero-preview__remove:hover {
    color: #fff;
  }

  /* ── Camera Button ── */
  .ob-camera-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-3);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    letter-spacing: var(--tracking-wide);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .ob-camera-btn:hover {
    color: var(--accent);
  }

  /* ── Photo Grid ── */
  .ob-photo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
    margin-top: var(--space-4);
  }
  @media (min-width: 400px) {
    .ob-photo-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  .ob-photo-thumb {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--radius-sm);
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .ob-photo-thumb__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .ob-photo-thumb__remove {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(0,0,0,0.7);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: background var(--duration-fast) var(--ease-default);
  }
  .ob-photo-thumb__remove:hover {
    background: rgba(0,0,0,0.9);
  }

  /* ── Hidden file input ── */
  .ob-input-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  /* ── Listing Preview Card (Step 4) ── */
  .ob-preview-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: var(--space-8);
    position: relative;
  }
  .ob-preview-card__badge {
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    color: var(--bg);
    background: var(--accent);
    padding: 2px 8px;
    border-radius: var(--radius-full);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    z-index: 1;
  }
  .ob-preview-card__hero {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
    opacity: 0.85;
  }
  .ob-preview-card__hero-placeholder {
    width: 100%;
    height: 140px;
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-disabled);
    border-bottom: 1px solid var(--border);
  }
  .ob-preview-card__body {
    padding: var(--space-5) var(--space-6) var(--space-6);
  }
  .ob-preview-card__type {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }
  .ob-preview-card__name {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 800;
    color: var(--text);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-2);
  }
  .ob-preview-card__placeholder {
    color: var(--text-disabled);
    font-style: italic;
    font-weight: 400;
  }
  .ob-preview-card__location {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    margin-bottom: var(--space-3);
  }
  .ob-preview-card__desc {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin: 0 0 var(--space-3);
  }
  .ob-preview-card__link {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--accent);
    opacity: 0.8;
  }

  /* ── Summary ── */
  .ob-summary {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }
  .ob-summary__section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-5) var(--space-5) var(--space-4);
  }
  .ob-summary__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-4);
  }
  .ob-summary__section-title {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }
  .ob-summary__edit {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    transition: color var(--duration-fast) var(--ease-default);
  }
  .ob-summary__edit:hover {
    color: var(--accent-hover, var(--accent));
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .ob-summary__dl {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .ob-summary__row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: var(--space-3);
    align-items: baseline;
  }
  .ob-summary__row--stacked {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
  .ob-summary__row dt {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--text-disabled);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }
  .ob-summary__row--stacked dt {
    margin-bottom: var(--space-1);
  }
  .ob-summary__row dd {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text);
    line-height: var(--leading-normal);
    margin: 0;
  }
  .ob-summary__dd--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ob-summary__empty {
    color: var(--text-disabled);
    font-style: italic;
  }
  .ob-summary__photo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: flex-start;
  }
  .ob-summary__photo-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }
  .ob-summary__photo-thumb {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    display: block;
  }
  .ob-summary__photo-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }

  /* ── Next Steps Note ── */
  .ob-next-steps {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    padding: var(--space-5);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .ob-next-steps__icon {
    font-size: 8px;
    color: var(--accent);
    margin-top: 5px;
    flex-shrink: 0;
  }
  .ob-next-steps__content strong {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--text);
    margin-bottom: var(--space-2);
  }
  .ob-next-steps__content p {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin: 0;
  }

  /* ── Validation Banner ── */
  .ob-validation-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-5);
    background: rgba(192, 57, 43, 0.08);
    border: 1px solid rgba(192, 57, 43, 0.25);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--error, #c0392b);
    margin-top: var(--space-4);
    line-height: var(--leading-normal);
  }
  .ob-validation-banner svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
  .ob-banner-link {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ── Navigation ── */
  .ob-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--border);
    gap: var(--space-4);
  }
  .ob-nav__left,
  .ob-nav__right {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .ob-nav__back,
  .ob-nav__next,
  .ob-nav__submit {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  .ob-nav__next,
  .ob-nav__submit {
    min-width: 140px;
    justify-content: center;
  }
  @media (max-width: 400px) {
    .ob-nav__next,
    .ob-nav__submit {
      min-width: 120px;
    }
  }

  /* ── Step Hint ── */
  .ob-step-hint {
    text-align: center;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-disabled);
    margin-top: var(--space-4);
    letter-spacing: var(--tracking-wide);
  }

  /* ── Success Screen ── */
  .ob-success {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-5);
    padding: var(--space-16) 0;
  }
  .ob-success__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(200, 148, 62, 0.1);
    border: 1px solid var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    color: var(--accent);
  }
  .ob-success__eyebrow {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin-top: calc(-1 * var(--space-2));
  }
  .ob-success__title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: 800;
    color: var(--text);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-tight);
    margin: 0;
  }
  .ob-success__body {
    font-family: var(--font-body);
    font-size: var(--text-md);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin: 0;
    max-width: 480px;
  }
  .ob-success__email {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .ob-success__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-3);
  }
`;
