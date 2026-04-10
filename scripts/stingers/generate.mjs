#!/usr/bin/env node
// scripts/stingers/generate.mjs
// Big Muddy Radio station ID stinger generator.
// Reads scripts/stingers/stingers.json, calls ElevenLabs text-to-speech,
// writes MP3 files to scripts/stingers/out/<id>.mp3.
//
// Usage:
//   node scripts/stingers/generate.mjs             # generate all stingers in the manifest
//   node scripts/stingers/generate.mjs <id>        # generate just the one with that id
//   node scripts/stingers/generate.mjs --list      # list voices from your account (no generation)
//
// Requires: ELEVENLABS_API_KEY in env OR .env.vercel-check at repo root.
// Repo-relative paths only. Node 22+ (uses built-in fetch).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..", "..");
const MANIFEST_PATH = join(__dirname, "stingers.json");
const OUT_DIR = join(__dirname, "out");

// ── load API key ─────────────────────────────────────────────────────────────
function loadApiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;

  const envCheckPath = join(REPO_ROOT, ".env.vercel-check");
  if (existsSync(envCheckPath)) {
    const raw = readFileSync(envCheckPath, "utf8");
    const match = raw.match(/^ELEVENLABS_API_KEY\s*=\s*"?([^"\n]+?)(?:\\n)?"?\s*$/m);
    if (match) return match[1];
  }
  throw new Error(
    "ELEVENLABS_API_KEY not found. Set it in env or in .env.vercel-check at the repo root."
  );
}

// ── list voices helper ───────────────────────────────────────────────────────
async function listVoices(apiKey) {
  const res = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": apiKey },
  });
  if (!res.ok) {
    throw new Error(`voices fetch failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const voices = data.voices || [];
  console.log(`${voices.length} voices on account:\n`);
  for (const v of voices) {
    const labels = v.labels || {};
    const bits = Object.entries(labels).map(([k, val]) => `${k}=${val}`).join(", ");
    console.log(`  ${v.voice_id}  ${(v.name || "?").padEnd(30)}  [${v.category || ""}] ${bits}`);
  }
}

// ── single stinger generator ─────────────────────────────────────────────────
async function generateStinger(apiKey, stinger, defaultVoiceSettings) {
  const voiceSettings = stinger.voice_settings || defaultVoiceSettings;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${stinger.voice_id}?output_format=mp3_44100_192`;

  const body = {
    text: stinger.script,
    model_id: "eleven_multilingual_v2",
    voice_settings: voiceSettings,
  };

  console.log(`→ ${stinger.id} (${stinger.character} via ${stinger.voice_name})`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`  ✗ ${stinger.id}: ${res.status} ${errText}`);
  }

  const audioBuffer = Buffer.from(await res.arrayBuffer());
  const outPath = join(OUT_DIR, `${stinger.id}.mp3`);
  writeFileSync(outPath, audioBuffer);
  const kb = (audioBuffer.length / 1024).toFixed(0);
  console.log(`  ✓ ${outPath}  (${kb} KB)`);
  return outPath;
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  const arg = process.argv[2];
  const apiKey = loadApiKey();

  if (arg === "--list") {
    await listVoices(apiKey);
    return;
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  const defaults = manifest._voice_settings_default || {
    stability: 0.5,
    similarity_boost: 0.85,
    style: 0.3,
    use_speaker_boost: true,
  };

  const targets = arg
    ? manifest.stingers.filter((s) => s.id === arg)
    : manifest.stingers;

  if (targets.length === 0) {
    console.error(
      arg
        ? `no stinger with id "${arg}" in ${MANIFEST_PATH}`
        : `no stingers in ${MANIFEST_PATH}`
    );
    process.exit(1);
  }

  console.log(`generating ${targets.length} stinger(s) via ElevenLabs:\n`);
  for (const s of targets) {
    try {
      await generateStinger(apiKey, s, defaults);
    } catch (err) {
      console.error(err.message);
      process.exitCode = 1;
    }
  }
  console.log(`\ndone. MP3s written to ${OUT_DIR}`);
  console.log(`next: bash scripts/stingers/deploy.sh   # ship to the Mac mini + restart radio`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
