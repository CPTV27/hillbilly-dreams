#!/usr/bin/env node
// scripts/ai/gemini-image-batch.mjs
//
// Image-generation sibling of gemini-batch.mjs. Uses Gemini's multimodal
// image-output models (gemini-3.1-flash-image-preview and family) via Vertex AI
// to generate PNG/JPEG files instead of text.
//
// Usage:
//   node scripts/ai/gemini-image-batch.mjs <path/to/batch.json>
//
// Reuses GOOGLE_APPLICATION_CREDENTIALS_JSON from apps/web/.env.local.
//
// Batch file shape:
//   {
//     "model": "gemini-3.1-flash-image-preview",
//     "concurrency": 2,
//     "tasks": [
//       {
//         "id": "wrap-hero",
//         "outputPath": "docs/design/wraps/hero.png",
//         "prompt": "...",
//         "negativePrompt": "...",        // optional
//         "aspectRatio": "16:9",          // optional
//         "candidateCount": 1             // optional, default 1
//       }
//     ]
//   }

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(REPO_ROOT, 'apps/web/.env.local') });

const VERTEX_PROJECT_ID = process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651';
const VERTEX_LOCATION = process.env.VERTEX_LOCATION || 'us-central1';
const DEFAULT_CONCURRENCY = 2;

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  console.error('ERROR: GOOGLE_APPLICATION_CREDENTIALS_JSON not set in apps/web/.env.local');
  process.exit(1);
}

let credsJson;
try {
  // Same JSON-fix as gemini-batch.mjs (dotenv unescapes literal \n in private_key)
  const fixed = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    .replace(/\r\n/g, '\\n')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
  credsJson = JSON.parse(fixed);
} catch (e) {
  console.error('ERROR: GOOGLE_APPLICATION_CREDENTIALS_JSON is not valid JSON:', e.message);
  process.exit(1);
}

const auth = new GoogleAuth({
  credentials: credsJson,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

let cachedToken = null;
let tokenExpiry = 0;
async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry - 60_000) return cachedToken;
  const client = await auth.getClient();
  const t = await client.getAccessToken();
  cachedToken = t.token;
  tokenExpiry = t.res?.data?.expires_in
    ? Date.now() + t.res.data.expires_in * 1000
    : Date.now() + 30 * 60_000;
  return cachedToken;
}

function pickExtensionFromMime(mimeType) {
  if (!mimeType) return 'png';
  if (mimeType.includes('png')) return 'png';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpg';
  if (mimeType.includes('webp')) return 'webp';
  return 'png';
}

// Imagen 3 only supports a fixed set of aspect ratios. Map common alternates.
const IMAGEN_ASPECT_MAP = {
  '1:1': '1:1',
  '16:9': '16:9',
  '9:16': '9:16',
  '4:3': '4:3',
  '3:4': '3:4',
  '3:2': '4:3',  // closest landscape supported
  '2:3': '3:4',  // closest portrait supported
};

async function callImagen({ model, prompt, negativePrompt, aspectRatio, candidateCount }) {
  const token = await getToken();
  const endpoint = `https://${VERTEX_LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${VERTEX_LOCATION}/publishers/google/models/${model}:predict`;

  const ar = aspectRatio ? IMAGEN_ASPECT_MAP[aspectRatio] || '16:9' : undefined;

  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: candidateCount || 1,
      ...(ar ? { aspectRatio: ar } : {}),
      ...(negativePrompt ? { negativePrompt } : {}),
      safetyFilterLevel: 'block_only_high',
      personGeneration: 'allow_adult',
    },
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180_000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Imagen ${res.status}: ${errText.slice(0, 700)}`);
  }

  const data = await res.json();
  const images = (data.predictions ?? [])
    .filter((p) => p.bytesBase64Encoded)
    .map((p) => ({ mimeType: p.mimeType || 'image/png', base64: p.bytesBase64Encoded }));

  if (images.length === 0) {
    throw new Error(`No image in response: ${JSON.stringify(data).slice(0, 400)}`);
  }
  return { images, auxText: '' };
}

async function callGeminiNative({ model, prompt, negativePrompt, aspectRatio, candidateCount }) {
  const token = await getToken();
  const endpoint = `https://${VERTEX_LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${VERTEX_LOCATION}/publishers/google/models/${model}:generateContent`;

  const userText = negativePrompt ? `${prompt}\n\n[NEGATIVE: ${negativePrompt}]` : prompt;

  const body = {
    contents: [{ role: 'user', parts: [{ text: userText }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      ...(candidateCount ? { candidateCount } : {}),
      ...(aspectRatio ? { imageConfig: { aspectRatio } } : {}),
    },
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180_000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 700)}`);
  }

  const data = await res.json();
  const images = [];
  let auxText = '';
  for (const candidate of data.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      if (part.inlineData?.data) {
        images.push({ mimeType: part.inlineData.mimeType || 'image/png', base64: part.inlineData.data });
      } else if (part.text) {
        auxText += part.text + '\n';
      }
    }
  }
  if (images.length === 0) {
    throw new Error(`No image returned. Response text: ${auxText.slice(0, 400) || '(empty)'}`);
  }
  return { images, auxText };
}

// Route to the right endpoint based on model family.
async function callGeminiImage(opts) {
  if (/^imagen-/.test(opts.model)) {
    return callImagen(opts);
  }
  return callGeminiNative(opts);
}

async function runTask(task, model, idx, total) {
  const start = Date.now();
  console.log(`[${idx + 1}/${total}] START: ${task.id} → ${task.outputPath}`);
  try {
    const { images, auxText } = await callGeminiImage({
      model: task.model || model,
      prompt: task.prompt,
      negativePrompt: task.negativePrompt,
      aspectRatio: task.aspectRatio,
      candidateCount: task.candidateCount,
    });

    const baseAbs = path.join(REPO_ROOT, task.outputPath);
    await fs.mkdir(path.dirname(baseAbs), { recursive: true });

    // Write each image. If multiple, suffix -01, -02, etc.
    const ext = pickExtensionFromMime(images[0].mimeType);
    const baseNoExt = baseAbs.replace(/\.(png|jpe?g|webp)$/i, '');
    const written = [];
    for (let i = 0; i < images.length; i++) {
      const suffix = images.length === 1 ? '' : `-${String(i + 1).padStart(2, '0')}`;
      const outPath = `${baseNoExt}${suffix}.${ext}`;
      await fs.writeFile(outPath, Buffer.from(images[i].base64, 'base64'));
      written.push(outPath);
    }

    // Sidecar metadata (prompt + any aux text) so we can audit later.
    const sidecar = `${baseNoExt}.txt`;
    const meta =
      `Task: ${task.id}\n` +
      `Model: ${task.model || model}\n` +
      `Generated: ${new Date().toISOString()}\n` +
      `Aspect: ${task.aspectRatio || 'default'}\n` +
      `Candidates: ${images.length}\n\n` +
      `--- PROMPT ---\n${task.prompt}\n\n` +
      (task.negativePrompt ? `--- NEGATIVE ---\n${task.negativePrompt}\n\n` : '') +
      (auxText.trim() ? `--- MODEL TEXT ---\n${auxText.trim()}\n` : '');
    await fs.writeFile(sidecar, meta);

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(
      `[${idx + 1}/${total}] DONE: ${task.id} (${elapsed}s, ${images.length} image${images.length === 1 ? '' : 's'})`
    );
    written.forEach((w) => console.log(`           wrote ${path.relative(REPO_ROOT, w)}`));
    return { id: task.id, success: true, files: written, elapsedMs: Date.now() - start };
  } catch (e) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.error(`[${idx + 1}/${total}] FAIL: ${task.id} (${elapsed}s) — ${e.message}`);
    return { id: task.id, success: false, error: e.message, elapsedMs: Date.now() - start };
  }
}

async function pmap(items, concurrency, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

async function main() {
  const batchPath = process.argv[2];
  if (!batchPath) {
    console.error('Usage: node scripts/ai/gemini-image-batch.mjs <path/to/batch.json>');
    process.exit(1);
  }

  const raw = await fs.readFile(path.resolve(batchPath), 'utf8');
  const batch = JSON.parse(raw);
  const model = batch.model || 'gemini-3.1-flash-image-preview';
  const concurrency = batch.concurrency || DEFAULT_CONCURRENCY;

  console.log(`\n=== Gemini Image Batch ===`);
  console.log(`Model: ${model}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Tasks: ${batch.tasks.length}`);
  console.log(`Vertex project: ${VERTEX_PROJECT_ID}`);
  console.log(`Vertex location: ${VERTEX_LOCATION}\n`);

  const start = Date.now();
  const results = await pmap(batch.tasks, concurrency, (task, idx) =>
    runTask(task, model, idx, batch.tasks.length)
  );
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success);
  const totalImages = results.reduce((sum, r) => sum + (r.files?.length || 0), 0);

  console.log(`\n=== Batch Complete ===`);
  console.log(`Total: ${results.length} | Succeeded: ${succeeded} | Failed: ${failed.length}`);
  console.log(`Total images: ${totalImages}`);
  console.log(`Elapsed: ${elapsed}s`);
  if (failed.length > 0) {
    console.log(`\nFailures:`);
    failed.forEach((r) => console.log(`  - ${r.id}: ${r.error}`));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
