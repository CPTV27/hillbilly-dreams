#!/usr/bin/env node
// scripts/broadcast-agent/agent.mjs
// Mac mini broadcast agent. Runs on 192.168.4.37 as a long-lived process.
// Every POLL_INTERVAL_MS, posts HMAC-signed request to the MBT server's
// /api/broadcast/agent/poll endpoint. When an instruction comes back,
// executes it locally (OBS scene change via obs-websocket, ffmpeg clip
// extraction, GCS upload) and POSTs result to /api/broadcast/agent/ack.
//
// Deployment:
//   ssh ClawdBOT@192.168.4.37
//   mkdir -p ~/broadcast-agent && cd ~/broadcast-agent
//   # Copy this file + package.json to the mini
//   npm install  # no prod deps for v1
//   export BROADCAST_AGENT_SECRET=... (same as server env)
//   export MBT_BASE_URL=https://bigmuddy.app  (or whatever)
//   node agent.mjs
//
// For persistence across reboots:
//   brew install --cask launchctl (already present on macOS)
//   Set up a LaunchAgent plist — TODO separate SOP.

import { createHmac, randomUUID } from 'node:crypto';

const MBT_BASE_URL = process.env.MBT_BASE_URL ?? 'https://bigmuddy.app';
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS ?? 30_000);
const SECRET = process.env.BROADCAST_AGENT_SECRET;
const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';

if (!SECRET) {
  console.error('FATAL: BROADCAST_AGENT_SECRET env var not set');
  process.exit(1);
}

function log(level, msg, ctx) {
  if (LOG_LEVEL === 'debug' || level !== 'debug') {
    const ts = new Date().toISOString();
    const suffix = ctx ? ` ${JSON.stringify(ctx)}` : '';
    console.log(`[${ts}] ${level.toUpperCase()}: ${msg}${suffix}`);
  }
}

function sign(body) {
  return createHmac('sha256', SECRET).update(body).digest('hex');
}

async function poll() {
  const body = '';
  const signature = sign(body);
  const res = await fetch(`${MBT_BASE_URL}/api/broadcast/agent/poll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-signature': signature,
    },
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    throw new Error(`Poll ${res.status}: ${await res.text().catch(() => '')}`);
  }
  const data = await res.json();
  return data?.data?.instruction ?? null;
}

async function ack(instructionId, success, result, error) {
  const body = JSON.stringify({
    instructionId,
    success,
    result: result ?? undefined,
    error: error ?? undefined,
    completedAt: new Date().toISOString(),
  });
  const signature = sign(body);
  const res = await fetch(`${MBT_BASE_URL}/api/broadcast/agent/ack`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-signature': signature,
    },
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    log('error', `Ack failed ${res.status}`, { instructionId });
  }
}

async function execute(instruction) {
  const { type, payload } = instruction;
  log('info', `Executing ${type}`, { id: instruction.id });

  try {
    switch (type) {
      case 'start_scene':
        await startScene(payload);
        return { started: payload.scene ?? 'default' };
      case 'stop_scene':
        await stopScene();
        return { stopped: true };
      case 'extract_clip':
        return await extractClip(payload);
      case 'push_thumbnail':
        return await pushThumbnail(payload);
      case 'noop':
        return { noop: true };
      default:
        throw new Error(`Unknown instruction type: ${type}`);
    }
  } catch (e) {
    throw new Error(`${type} failed: ${e.message}`);
  }
}

async function startScene({ scene }) {
  // Placeholder: wire obs-websocket when production-ready
  // Requires: npm install obs-websocket-js, OBS running with WebSocket plugin
  log('info', `[STUB] OBS scene change: ${scene}`);
}

async function stopScene() {
  log('info', `[STUB] OBS scene stop`);
}

async function extractClip({ broadcastId, sequence, startSec, endSec, sourceFile }) {
  // Placeholder: run ffmpeg -ss startSec -to endSec -i sourceFile clip.mp4
  // upload to GCS, POST metadata to /api/broadcast/clips/ingest
  const clipId = randomUUID();
  log('info', `[STUB] extract clip`, { broadcastId, sequence, startSec, endSec, clipId });
  return { clipId, startSec, endSec };
}

async function pushThumbnail({ broadcastId, imageUrl }) {
  log('info', `[STUB] push thumbnail`, { broadcastId, imageUrl });
  return { pushed: true };
}

async function tick() {
  try {
    const instruction = await poll();
    if (!instruction) {
      log('debug', 'No pending instruction');
      return;
    }
    try {
      const result = await execute(instruction);
      await ack(instruction.id, true, result);
      log('info', 'Instruction completed', { id: instruction.id });
    } catch (e) {
      await ack(instruction.id, false, undefined, e.message);
      log('error', 'Instruction failed', { id: instruction.id, error: e.message });
    }
  } catch (e) {
    log('error', 'Poll cycle failed', { error: e.message });
  }
}

async function main() {
  log('info', `Broadcast agent starting`, { MBT_BASE_URL, POLL_INTERVAL_MS });
  while (true) {
    await tick();
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
}

main().catch((e) => {
  log('error', 'Fatal', { error: e.message });
  process.exit(1);
});
