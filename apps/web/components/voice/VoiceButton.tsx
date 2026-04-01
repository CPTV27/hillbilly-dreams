'use client';

// components/voice/VoiceButton.tsx
// ─────────────────────────────────────────────────────────────
// Tap-to-Talk Voice AI Button — "Southern Concierge"
// ─────────────────────────────────────────────────────────────
// Floating mic button for Measurably Better Life.
// Tap → record → send to /api/voice/stream → play response via TTS.
//
// Works on: iOS Safari, Android Chrome, Desktop Chrome/Safari/Firefox.
// Uses MediaRecorder API (universal) — NOT Web Speech API (broken on iOS).
//
// All styles inline per .cursorrules (no Tailwind).

import { useState, useRef, useCallback, useEffect } from 'react';

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export function VoiceButton() {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (mediaRecorder.current?.state === 'recording') {
        mediaRecorder.current.stop();
      }
      speechSynthesis.cancel();
    };
  }, []);

  // ── Start recording ──
  const startListening = useCallback(async () => {
    setError('');
    setTranscript('');
    setResponse('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Find the best supported format
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : 'audio/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      recorder.onstop = async () => {
        // Stop mic stream
        stream.getTracks().forEach(t => t.stop());

        const audioBlob = new Blob(audioChunks.current, { type: mimeType });

        // Skip if too short (likely accidental tap)
        if (audioBlob.size < 1000) {
          setState('idle');
          return;
        }

        setState('processing');
        await sendAudioAndSpeak(audioBlob);
      };

      mediaRecorder.current = recorder;
      recorder.start();
      setState('listening');
    } catch (err) {
      console.error('[VoiceButton] Mic access error:', err);
      setError('Microphone access denied. Check your browser settings.');
      setState('error');
    }
  }, []);

  // ── Stop recording ──
  const stopListening = useCallback(() => {
    if (mediaRecorder.current?.state === 'recording') {
      mediaRecorder.current.stop();
    }
  }, []);

  // ── Send audio to API + speak response ──
  const sendAudioAndSpeak = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice.webm');

      const res = await fetch('/api/voice/stream', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.transcription) setTranscript(data.transcription);
      if (data.text) {
        setResponse(data.text);
        speakResponse(data.text);
      } else {
        setState('idle');
      }
    } catch (err) {
      console.error('[VoiceButton] API error:', err);
      setError('Could not process your voice. Try again.');
      setState('error');
    }
  };

  // ── Text-to-Speech playback (browser-native) ──
  const speakResponse = (text: string) => {
    setState('speaking');

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.pitch = 1.0;

    // Try to find a natural-sounding voice
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Samantha') || // iOS
      v.name.includes('Google US English') || // Android
      v.name.includes('Microsoft Jenny') || // Edge
      (v.lang.startsWith('en') && v.localService)
    );
    if (preferred) utt.voice = preferred;

    utt.onend = () => setState('idle');
    utt.onerror = () => setState('idle');

    utterance.current = utt;
    speechSynthesis.speak(utt);
  };

  // ── Handle tap ──
  const handleTap = () => {
    if (state === 'listening') {
      stopListening();
    } else if (state === 'speaking') {
      speechSynthesis.cancel();
      setState('idle');
    } else if (state === 'idle' || state === 'error') {
      startListening();
    }
    // If 'processing', ignore taps
  };

  // ── Pulse animation colors ──
  const stateColors: Record<VoiceState, string> = {
    idle: 'var(--accent, #c8943e)',
    listening: '#ef4444',
    processing: 'var(--accent, #c8943e)',
    speaking: '#22c55e',
    error: '#ef4444',
  };

  const stateLabels: Record<VoiceState, string> = {
    idle: 'Tap to ask',
    listening: 'Listening...',
    processing: 'Thinking...',
    speaking: 'Speaking...',
    error: 'Try again',
  };

  return (
    <>
      {/* ── Response bubble (shows above button when there's content) ── */}
      {(transcript || response || error) && (
        <div style={{
          position: 'fixed',
          bottom: 160,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(90vw, 400px)',
          background: 'var(--surface, #111)',
          border: '1px solid var(--border, #222)',
          borderRadius: 16,
          padding: '1rem 1.25rem',
          zIndex: 999,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {transcript && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--text-muted, #888)',
              margin: '0 0 0.5rem',
              fontStyle: 'italic',
            }}>
              &ldquo;{transcript}&rdquo;
            </p>
          )}
          {response && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: 'var(--text, #f5f0eb)',
              margin: 0,
              lineHeight: 1.6,
            }}>
              {response}
            </p>
          )}
          {error && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              color: '#ef4444',
              margin: 0,
            }}>
              {error}
            </p>
          )}
        </div>
      )}

      {/* ── Floating mic button ── */}
      <button
        onClick={handleTap}
        disabled={state === 'processing'}
        aria-label={stateLabels[state]}
        style={{
          position: 'fixed',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: 'none',
          background: stateColors[state],
          color: 'var(--bg, #0a0a0a)',
          cursor: state === 'processing' ? 'wait' : 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px ${stateColors[state]}40`,
          transition: 'all 0.2s ease',
          opacity: state === 'processing' ? 0.7 : 1,
          // Pulse animation when listening
          animation: state === 'listening' ? 'voice-pulse 1.5s ease-in-out infinite' : 'none',
        }}
      >
        {/* Mic icon */}
        {state === 'processing' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" opacity="0.3" />
            <path d="M12 6v6l4 2" />
          </svg>
        ) : state === 'speaking' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="9" y="1" width="6" height="11" rx="3" />
            <path d="M5 10a7 7 0 0014 0" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <line x1="8" y1="21" x2="16" y2="21" />
          </svg>
        )}
      </button>

      {/* State label */}
      <div style={{
        position: 'fixed',
        bottom: 62,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.55rem',
        color: 'var(--text-disabled, #555)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        zIndex: 1000,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        {stateLabels[state]}
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes voice-pulse {
          0%, 100% { box-shadow: 0 4px 20px ${stateColors.listening}40; transform: translateX(-50%) scale(1); }
          50% { box-shadow: 0 4px 40px ${stateColors.listening}60; transform: translateX(-50%) scale(1.08); }
        }
      `}</style>
    </>
  );
}
