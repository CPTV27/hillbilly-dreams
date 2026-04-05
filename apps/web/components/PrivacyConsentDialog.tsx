'use client';

import { useState } from 'react';

type ProfileType = 'private' | 'business' | null;

interface PrivacyConsentDialogProps {
  userEmail: string;
  onComplete: (profileType: ProfileType) => void;
}

export default function PrivacyConsentDialog({
  userEmail,
  onComplete,
}: PrivacyConsentDialogProps) {
  const [step, setStep] = useState<'identity' | 'privacy-free' | 'privacy-paid' | 'done'>('identity');
  const [profileType, setProfileType] = useState<ProfileType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileChoice = (type: ProfileType) => {
    setProfileType(type);
    if (type === 'private') {
      setStep('privacy-free');
    } else {
      setStep('privacy-free');
    }
  };

  const handleConsent = async (tier: 'free' | 'paid') => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/onboarding/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileType,
          dataTier: tier,
          consentTimestamp: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        onComplete(profileType);
      }
    } catch (err) {
      console.error('Consent submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(10, 10, 8, 0.95)',
      backdropFilter: 'blur(8px)',
      padding: '1rem',
    }}>
      <div style={{
        maxWidth: 560,
        width: '100%',
        backgroundColor: '#151412',
        border: '1px solid #2a2520',
        borderRadius: '16px',
        padding: '2.5rem',
        color: '#e8e0d4',
        fontFamily: "var(--font-body, 'Inter', sans-serif)",
      }}>

        {/* Step 1: Identity */}
        {step === 'identity' && (
          <>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#c8943e',
                marginBottom: '0.75rem',
                fontWeight: 600,
              }}>
                Welcome
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 0.75rem 0',
                lineHeight: 1.2,
              }}>
                Hey, {userEmail.split('@')[0]}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#8a8074',
                margin: 0,
                lineHeight: 1.6,
              }}>
                You signed in as{' '}
                <strong style={{ color: '#c8943e' }}>{userEmail}</strong>.
                <br />
                What brings you here?
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '1rem',
            }}>
              <button
                onClick={() => handleProfileChoice('private')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#1a1816',
                  border: '1px solid #2a2520',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  color: '#e8e0d4',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c8943e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2520';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '0.25rem',
                }}>
                  Looking around
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#8a8074',
                  lineHeight: 1.4,
                }}>
                  I live here, I am visiting, or I am curious about the platform.
                </div>
              </button>

              <button
                onClick={() => handleProfileChoice('business')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#1a1816',
                  border: '1px solid #2a2520',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  color: '#e8e0d4',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c8943e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2520';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '0.25rem',
                }}>
                  I run a business
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#8a8074',
                  lineHeight: 1.4,
                }}>
                  I want to claim my listing or sign up for the directory.
                </div>
              </button>
            </div>
          </>
        )}

        {/* Step 2: Data Exchange Explanation */}
        {step === 'privacy-free' && (
          <>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#c8943e',
                marginBottom: '0.75rem',
                fontWeight: 600,
              }}>
                The Data Exchange
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 0.75rem 0',
                lineHeight: 1.2,
              }}>
                How this works
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#8a8074',
                margin: 0,
                lineHeight: 1.6,
              }}>
                We believe in telling you exactly what happens with your data.
                No fine print. No surprises.
              </p>
            </div>

            {/* Free Tier Explanation */}
            <div style={{
              backgroundColor: '#1a1816',
              border: '1px solid #2a2520',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}>
                <span style={{ fontSize: '1.25rem' }}>&#x1F513;</span>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: 0,
                }}>
                  Free Tier
                </h3>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#b0a898',
                margin: '0 0 1rem 0',
                lineHeight: 1.6,
              }}>
                The free tier is subsidized by anonymized, aggregate data that helps
                local businesses understand foot traffic. No personal identifiers
                are ever shared. We count visits, not visitors.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#0a0a08',
                borderRadius: '8px',
                border: '1px solid #2a2520',
              }}>
                <span style={{
                  fontSize: '0.85rem',
                  color: '#5a5248',
                }}>
                  &#x1F512; Strict Privacy / Zero Telemetry
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  color: '#c8943e',
                  fontWeight: 600,
                }}>
                  Upgrade to unlock
                </span>
              </div>
            </div>

            {/* Paid Tier Explanation */}
            <div style={{
              backgroundColor: '#1a1816',
              border: '1px solid #c8943e40',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}>
                <span style={{ fontSize: '1.25rem' }}>&#x1F6E1;&#xFE0F;</span>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#c8943e',
                  margin: 0,
                }}>
                  Paid Tier — You own your data
                </h3>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#b0a898',
                margin: 0,
                lineHeight: 1.6,
              }}>
                Paying subscribers are not the product. One toggle disables all
                ecosystem telemetry. Your business operates in a private enclave.
                Full sovereign data control.
              </p>
            </div>

            {/* Philosophy Line */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              padding: '1rem',
              borderTop: '1px solid #2a2520',
              borderBottom: '1px solid #2a2520',
            }}>
              <p style={{
                fontSize: '0.95rem',
                color: '#c8943e',
                margin: 0,
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}>
                Free means you help the region grow.
                <br />
                Paid means you own the region.
                <br />
                We believe in honest data consent from day one.
              </p>
            </div>

            <button
              onClick={() => handleConsent('free')}
              disabled={isSubmitting}
              style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                backgroundColor: '#c8943e',
                color: '#0a0a08',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: isSubmitting ? 'wait' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#d4a24e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c8943e';
              }}
            >
              {isSubmitting ? 'Setting up...' : 'I understand — let me in'}
            </button>

            <button
              onClick={() => setStep('identity')}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                color: '#5a5248',
                border: 'none',
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginTop: '0.75rem',
              }}
            >
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
