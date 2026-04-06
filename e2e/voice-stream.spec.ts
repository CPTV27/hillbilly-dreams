// POST /api/voice/stream — Delta Dawn voice agent (admin-gated).
// Run: pnpm exec playwright test e2e/voice-stream.spec.ts --project=local
//
// Full Gemini + tool loop is opt-in (cost/latency): set E2E_SESSION_COOKIE and RUN_VOICE_STREAM_E2E=1

import { test, expect } from '@playwright/test';

test.describe('/api/voice/stream', () => {
  test('returns 401 when not authenticated', async ({ request }) => {
    const res = await request.post('/api/voice/stream', {
      data: { prompt: 'Constellation stats in one sentence.' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status(), 'requireAdmin() rejects anonymous callers').toBe(401);
    const body = await res.json().catch(() => ({}));
    expect(body).toMatchObject({ error: 'Not authenticated' });
  });

  test('returns 400 for unsupported Content-Type (not JSON or multipart)', async ({ request }) => {
    const cookie = process.env.E2E_SESSION_COOKIE;
    test.skip(!cookie, 'Set E2E_SESSION_COOKIE for authenticated voice/stream shape tests');

    const res = await request.post('/api/voice/stream', {
      data: 'plain text body',
      headers: { Cookie: cookie!, 'Content-Type': 'text/plain' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json().catch(() => ({}));
    expect(body.error).toBeTruthy();
  });

  test('returns 400 for multipart without audio when authenticated', async ({ request }) => {
    const cookie = process.env.E2E_SESSION_COOKIE;
    test.skip(!cookie, 'Set E2E_SESSION_COOKIE for authenticated voice/stream shape tests');

    const res = await request.post('/api/voice/stream', {
      multipart: { note: 'no-audio-field' },
      headers: { Cookie: cookie! },
    });
    expect(res.status()).toBe(400);
    const body = await res.json().catch(() => ({}));
    expect(String(body.error)).toMatch(/audio file/i);
  });
});

test.describe('/api/voice/stream — live Gemini (opt-in)', () => {
  test('returns JSON with text when RUN_VOICE_STREAM_E2E=1 and session cookie set', async ({
    request,
  }) => {
    test.skip(process.env.RUN_VOICE_STREAM_E2E !== '1', 'Set RUN_VOICE_STREAM_E2E=1 to run live voice E2E');
    const cookie = process.env.E2E_SESSION_COOKIE;
    test.skip(!cookie, 'Set E2E_SESSION_COOKIE for live voice E2E');

    const res = await request.post('/api/voice/stream', {
      data: {
        prompt:
          'Use your tools only if needed. In one short sentence, say whether you can access internal data.',
      },
      headers: { Cookie: cookie!, 'Content-Type': 'application/json' },
      timeout: 120_000,
    });

    expect(res.status(), await res.text()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ text: expect.any(String) });
    expect(String(body.text).length).toBeGreaterThan(3);
  });
});
