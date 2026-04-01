'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const API_ROUTES = {
  GALLERY_APPLY: '/api/gallery/applications' as const
};

const artistApplicationSchema = z.object({
  portfolioUrl: z.string().url('Must be a valid URL (e.g., https://yourportfolio.com)'),
  artistStatement: z.string()
    .min(10, 'Artist statement must be at least 10 characters')
    .max(5000, 'Artist statement cannot exceed 5000 characters'),
});

type ApplicationForm = z.infer<typeof artistApplicationSchema>;

export default function GalleryApply() {
  const { data: session, status } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplicationForm>({
    resolver: zodResolver(artistApplicationSchema),
    defaultValues: { portfolioUrl: '', artistStatement: '' },
  });

  const onSubmit = async (data: ApplicationForm) => {
    setSubmitError(null);
    try {
      if (!session?.user) {
        setSubmitError('You must be logged in to apply.');
        return;
      }

      // We pass the NextAuth session user's email or ID to the backend if needed, 
      // but ideally the backend infers the userId from the server session.
      // For this scaffold, we'll send the email just in case ID is not on the client session.
      const res = await fetch(API_ROUTES.GALLERY_APPLY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          email: session.user.email
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit application');
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError('There was a problem submitting your application. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d4c5a0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    background: '#fff',
    color: '#2c2416',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600 as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#6b5d4a',
    marginBottom: '0.4rem',
  };

  const errorStyle = {
    color: '#d93025',
    fontSize: '0.8rem',
    marginTop: '0.4rem',
    fontWeight: 500,
  };

  if (status === 'loading') {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading application context...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
          Authentication Required
        </h1>
        <p style={{ color: '#6b5d4a', lineHeight: 1.7, marginBottom: '2rem' }}>
          You must be logged in to apply for the Venture Gallery.
        </p>
        <Link
          href="/admin/login?callbackUrl=/gallery/apply"
          style={{
            display: 'inline-block',
            background: '#c8943e',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Log In
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
          Application Received
        </h1>
        <p style={{ color: '#6b5d4a', lineHeight: 1.7, marginBottom: '2rem' }}>
          Thank you for applying to the Venture Gallery. Our curatorial team will review your 
          portfolio and artist statement shortly. We review every application personally — not algorithmically.
        </p>
        <Link
           href="/gallery"
           style={{
             display: 'inline-block',
             background: '#c8943e',
             color: '#fff',
             padding: '0.75rem 2rem',
             borderRadius: '8px',
             fontWeight: 600,
             textDecoration: 'none',
           }}
        >
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1610 0%, #2a2018 100%)',
        border: '1px solid #c8943e',
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#c8943e',
          marginBottom: '0.75rem',
        }}>
          Artist-First Economics
        </p>
        <p style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
        }}>
          You keep 70–80%.
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: '#e8dcc8',
          lineHeight: 1.5,
          marginBottom: '0.75rem',
        }}>
          Most galleries take 50%. We take 15–20%.
        </p>
        <p style={{
          fontSize: '0.85rem',
          color: '#8a7d6b',
          lineHeight: 1.5,
        }}>
          No consignment. No inventory games. You set the price. We move the work. You get paid.
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Apply to Sell on BCA
        </h1>
        <p style={{ color: '#6b5d4a', lineHeight: 1.7, fontSize: '1.05rem' }}>
          Venture Gallery is a taste-led marketplace. Tell us about yourself and your practice.
          Provide a link to your best work and an artist statement describing your perspective.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {submitError && (
          <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {submitError}
          </div>
        )}

        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 2rem 0' }}>
          <legend style={{
            fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.15em', color: '#c8943e', marginBottom: '1rem',
          }}>
            Your Practice
          </legend>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Portfolio Link *</label>
            <input 
              {...register('portfolioUrl')} 
              style={{...inputStyle, borderColor: errors.portfolioUrl ? '#d93025' : '#d4c5a0'}} 
              placeholder="https://yourportfolio.com or Instagram link" 
            />
            {errors.portfolioUrl && <div style={errorStyle}>{errors.portfolioUrl.message}</div>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Artist Statement *</label>
            <textarea
              {...register('artistStatement')}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' as const, borderColor: errors.artistStatement ? '#d93025' : '#d4c5a0' }}
              placeholder="Tell us about your work, your process, and why you make what you make."
            />
            {errors.artistStatement && <div style={errorStyle}>{errors.artistStatement.message}</div>}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '1rem',
            background: isSubmitting ? '#a3a3a3' : '#c8943e',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>

        <p style={{ fontSize: '0.85rem', color: '#c8943e', textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>
          You'll hear from us within two weeks.
        </p>
      </form>
    </div>
  );
}
