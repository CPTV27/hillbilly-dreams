// Big Muddy AI Tools — Photoshop UXP Plugin
// Connects to Vertex AI Imagen 3 for AI-powered photo editing
// RULE: Never add, remove, or alter people in photos. Environment only.

const { app, core, imaging, action } = require('photoshop');
const { localFileSystem } = require('uxp').storage;

// ── Config ──────────────────────────────────────────────────────
// API endpoint proxied through our server to avoid exposing credentials in the plugin
const API_BASE = 'https://bigmuddytouring.com/api/media';

// ── Helpers ─────────────────────────────────────────────────────

function setPrompt(tool, text) {
  const el = document.getElementById(`${tool}-prompt`);
  if (el) el.value = text;
}
// Make global for onclick handlers
window.setPrompt = setPrompt;

function setStatus(tool, message, type = '') {
  const el = document.getElementById(`${tool}-status`);
  if (el) {
    el.textContent = message;
    el.className = `status ${type}`;
  }
}

function getSettings() {
  return {
    sampleCount: parseInt(document.getElementById('sample-count').value, 10),
    baseSteps: parseInt(document.getElementById('quality-steps').value, 10),
  };
}

/**
 * Export the current active document (flattened) as a JPEG buffer in base64.
 * Uses a temporary file approach since UXP doesn't support direct buffer export.
 */
async function getDocumentAsBase64() {
  const doc = app.activeDocument;
  if (!doc) throw new Error('No document open');

  // Use Photoshop action to save a temp JPEG
  const tempFolder = await localFileSystem.getTemporaryFolder();
  const tempFile = await tempFolder.createFile('bigmuddy-temp-export.jpg', { overwrite: true });

  await core.executeAsModal(async () => {
    const saveAction = {
      _obj: 'save',
      as: {
        _obj: 'JPEG',
        quality: 10, // 0-12 scale, 10 = high quality
      },
      in: { _path: tempFile.nativePath, _kind: 'local' },
      copy: true,
      lowerCase: true,
    };
    await action.batchPlay([saveAction], { synchronousExecution: true });
  }, { commandName: 'Export for AI processing' });

  // Read the temp file as base64
  const data = await tempFile.read({ format: require('uxp').storage.formats.binary });
  const base64 = _arrayBufferToBase64(data);

  // Cleanup
  await tempFile.delete();

  return base64;
}

/**
 * Export the current selection as a black/white mask in base64.
 * White = selected area (what to modify), Black = protected.
 */
async function getSelectionMaskAsBase64() {
  const doc = app.activeDocument;

  // Check if there's an active selection
  try {
    const selInfo = await core.executeAsModal(async () => {
      const result = await action.batchPlay([{
        _obj: 'get',
        _target: [{ _property: 'selection' }, { _ref: 'document', _enum: 'ordinal', _value: 'targetEnum' }],
      }], { synchronousExecution: true });
      return result;
    }, { commandName: 'Check selection' });

    if (!selInfo || !selInfo[0] || !selInfo[0].selection) {
      return null; // No selection
    }
  } catch {
    return null; // No selection
  }

  // Save selection as channel, export as image
  const tempFolder = await localFileSystem.getTemporaryFolder();
  const maskFile = await tempFolder.createFile('bigmuddy-mask-export.png', { overwrite: true });

  await core.executeAsModal(async () => {
    // Create a new channel from selection
    await action.batchPlay([
      { _obj: 'duplicate', _target: [{ _ref: 'channel', _enum: 'channel', _value: 'selection' }], name: 'BigMuddyMask' },
    ], { synchronousExecution: true });

    // TODO: Export channel as PNG
    // For now, we'll use auto-detect mode instead of mask
  }, { commandName: 'Export selection mask' });

  return null; // Mask export is complex in UXP — use auto-detect for now
}

/**
 * Place a result image as a new layer in the current document.
 */
async function placeResultAsLayer(base64Data, layerName) {
  const doc = app.activeDocument;
  const tempFolder = await localFileSystem.getTemporaryFolder();
  const resultFile = await tempFolder.createFile(`bigmuddy-result-${Date.now()}.png`, { overwrite: true });

  // Write the base64 data to a temp file
  const buffer = _base64ToArrayBuffer(base64Data);
  await resultFile.write(buffer, { format: require('uxp').storage.formats.binary });

  // Place the file as a new layer
  await core.executeAsModal(async () => {
    await action.batchPlay([{
      _obj: 'placeEvent',
      null: { _path: resultFile.nativePath, _kind: 'local' },
      linked: false,
    }], { synchronousExecution: true });

    // Rename the layer
    const currentLayer = doc.activeLayers[0];
    if (currentLayer) {
      currentLayer.name = layerName;
    }
  }, { commandName: `Place AI result: ${layerName}` });

  await resultFile.delete();
}

function _arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function _base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// ── API Calls ───────────────────────────────────────────────────

async function callAPI(endpoint, body) {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API error ${response.status}: ${errText}`);
  }

  return response.json();
}

// ── Tool Functions ──────────────────────────────────────────────

async function runRemoval(autoDetect = false) {
  const prompt = document.getElementById('remove-prompt').value.trim();
  if (!prompt) { setStatus('remove', 'Please describe what to remove', 'error'); return; }

  const btn = document.getElementById('remove-btn');
  btn.disabled = true;
  setStatus('remove', 'Exporting image...', 'working');

  try {
    const imageBase64 = await getDocumentAsBase64();
    setStatus('remove', 'Sending to Vertex AI Imagen...', 'working');

    const settings = getSettings();
    const result = await callAPI('remove', {
      image: imageBase64,
      prompt,
      autoDetect,
      sampleCount: settings.sampleCount,
      baseSteps: settings.baseSteps,
    });

    if (result.images && result.images.length > 0) {
      for (let i = 0; i < result.images.length; i++) {
        await placeResultAsLayer(result.images[i], `AI Remove ${i + 1} — ${prompt.substring(0, 30)}`);
      }
      setStatus('remove', `${result.images.length} variant${result.images.length > 1 ? 's' : ''} placed as new layers`, 'success');
    } else {
      setStatus('remove', 'No results returned — try a different prompt', 'error');
    }
  } catch (err) {
    setStatus('remove', err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}
window.runRemoval = runRemoval;

async function runSkyReplace() {
  const prompt = document.getElementById('sky-prompt').value.trim();
  if (!prompt) { setStatus('sky', 'Please describe the sky', 'error'); return; }

  const btn = document.getElementById('sky-btn');
  btn.disabled = true;
  setStatus('sky', 'Exporting image...', 'working');

  try {
    const imageBase64 = await getDocumentAsBase64();
    setStatus('sky', 'Replacing sky with Vertex AI...', 'working');

    const settings = getSettings();
    const result = await callAPI('sky-replace', {
      image: imageBase64,
      prompt,
      sampleCount: settings.sampleCount,
      baseSteps: settings.baseSteps,
    });

    if (result.images && result.images.length > 0) {
      for (let i = 0; i < result.images.length; i++) {
        await placeResultAsLayer(result.images[i], `AI Sky ${i + 1} — ${prompt.substring(0, 30)}`);
      }
      setStatus('sky', `${result.images.length} sky variant${result.images.length > 1 ? 's' : ''} placed`, 'success');
    } else {
      setStatus('sky', 'No results returned', 'error');
    }
  } catch (err) {
    setStatus('sky', err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}
window.runSkyReplace = runSkyReplace;

async function runPropertyCleanup() {
  const prompt = document.getElementById('cleanup-prompt').value.trim();
  if (!prompt) { setStatus('cleanup', 'Please describe the cleanup', 'error'); return; }

  const btn = document.getElementById('cleanup-btn');
  btn.disabled = true;
  setStatus('cleanup', 'Exporting image...', 'working');

  try {
    const imageBase64 = await getDocumentAsBase64();
    setStatus('cleanup', 'Cleaning up property with Vertex AI...', 'working');

    const settings = getSettings();
    const result = await callAPI('property-cleanup', {
      image: imageBase64,
      prompt,
      sampleCount: settings.sampleCount,
      baseSteps: settings.baseSteps,
    });

    if (result.images && result.images.length > 0) {
      for (let i = 0; i < result.images.length; i++) {
        await placeResultAsLayer(result.images[i], `AI Cleanup ${i + 1}`);
      }
      setStatus('cleanup', `${result.images.length} cleaned variant${result.images.length > 1 ? 's' : ''} placed`, 'success');
    } else {
      setStatus('cleanup', 'No results returned', 'error');
    }
  } catch (err) {
    setStatus('cleanup', err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}
window.runPropertyCleanup = runPropertyCleanup;

async function runEnhance() {
  const prompt = document.getElementById('enhance-prompt').value.trim();
  if (!prompt) { setStatus('enhance', 'Please describe the look', 'error'); return; }

  const btn = document.getElementById('enhance-btn');
  btn.disabled = true;
  setStatus('enhance', 'Exporting image...', 'working');

  try {
    const imageBase64 = await getDocumentAsBase64();
    setStatus('enhance', 'Enhancing with Vertex AI...', 'working');

    const settings = getSettings();
    const result = await callAPI('enhance', {
      image: imageBase64,
      prompt,
      sampleCount: settings.sampleCount,
      baseSteps: settings.baseSteps,
    });

    if (result.images && result.images.length > 0) {
      for (let i = 0; i < result.images.length; i++) {
        await placeResultAsLayer(result.images[i], `AI Enhance ${i + 1} — ${prompt.substring(0, 30)}`);
      }
      setStatus('enhance', `${result.images.length} enhanced variant${result.images.length > 1 ? 's' : ''} placed`, 'success');
    } else {
      setStatus('enhance', 'No results returned', 'error');
    }
  } catch (err) {
    setStatus('enhance', err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}
window.runEnhance = runEnhance;

// ── Init ────────────────────────────────────────────────────────
console.log('Big Muddy AI Tools loaded');
