# Big Muddy AI Tools — Photoshop Plugin

## Install

1. Open **Adobe Photoshop 2024+**
2. Go to **Plugins > Development > Enable Developer Mode** (if not already enabled)
3. Go to **Plugins > Development > Load Plugin...**
4. Navigate to this folder: `plugins/photoshop-bigmuddy/`
5. Select the `manifest.json` file
6. The **Big Muddy AI** panel appears under **Plugins > Big Muddy AI**

## What It Does

Four AI tools powered by Vertex AI Imagen 3, accessed directly inside Photoshop:

### 1. Remove Objects
- Preset buttons: Wires, Poles, Cars, Trash, Background People
- Custom prompt for anything else
- Uses your current selection as mask, or auto-detects
- Results appear as new layers — originals never touched

### 2. Sky Replacement
- Preset skies: Golden Hour, Blue Sky, Stormy, Twilight, Overcast
- Auto-detects sky region
- Preserves all ground elements

### 3. Property Cleanup
- One-click exterior polish
- Cleans lawn, trims bushes, removes cars, clears debris
- Designed for real estate and Inn exterior shots

### 4. Editorial Enhancement
- Magazine, Cinematic, Clean & Bright, B&W presets
- Applies editorial color grading and polish
- Never alters composition or subjects

## Settings

- **Variants**: Generate 1, 2, or 4 options per operation
- **Quality**: Fast (12 steps) to Maximum (75 steps)

## Safety Rule

**AI will never add, remove, or alter people in photos.**
All edits are environment-only. This is enforced at the API level.

## Requirements

- Adobe Photoshop 2024 or later
- Internet connection (calls bigmuddytouring.com/api/media/*)
- The web app must be deployed with GOOGLE_APPLICATION_CREDENTIALS_JSON set
