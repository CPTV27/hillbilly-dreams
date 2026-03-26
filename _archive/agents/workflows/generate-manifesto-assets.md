---
description: How to synthesize the Nano Banana 8K visual assets for the Sovereign Manifesto `/platform` marketing route
---

# Generate Sovereign Manifesto Assets (Nano Banana)

**Prerequisite:** You must have access to a native image synthesis model (Midjourney, Nano Banana, or locally executing Stable Diffusion) capable of high-fidelity, photorealistic, 16:9 8K renders.

## 1. Locate the Prompts
The absolute source of truth for the image prompts is located here:
`/Users/chasethis/.gemini/antigravity/brain/8d80ff43-7d12-4111-961e-01cdb28a1a90/nano_banana_prompts.md`

Read that file to extract the 5 core prompts:
1. The Sovereign Ledger
2. The Optics Link
3. Edge Sensoring
4. The Mesh Topology
5. The Sovereign Nexus

## 2. Execute Asset Synthesis
For each concept, pass the exact `/imagine prompt` query documented in the prompt index directly to your visual synthesizer.

**Critical Requirements for the Output:**
- Aspect Ratio must be `16:9`
- Must feature stark black "Obsidian" backgrounds
- Must incorporate the heavily stylized typography layer explicitly asked for in the prompt.
- Must execute with glassmorphism and industrial Apple-hardware aesthetics.

## 3. Storage and Delivery
Once the 5 assets have been generated, they MUST be injected directly into the BMT static payload directory so the Next.js edge router can pick them up:
1. Rename the resulting files to perfectly match the `<FeatureSection />` placeholder slots:
   - `nano_ledger_asset.png` (or `.jpg` / `.webp`)
   - `nano_optics_asset.png`
   - `nano_spatial_asset.png`
   - `nano_mesh_asset.png`
   - `nano_nexus_asset.png`
2. Save these directly into `/Users/chasethis/bmt/apps/web/public/`
3. If they are successfully deposited there, the `apps/web/app/platform/page.tsx` React component is already pre-configured to automatically render them in place of the pulsing placeholders.

// turbo-all
## 4. Final Next.js Dependency Update
Once the files are moved into the `/public` folder, run a quick `grep` or `sed` command to swap the placeholder syntax `[nano_ledger_asset.png]` inside `apps/web/app/platform/page.tsx` with the actual Next.js `<Image src="/nano_ledger_asset.png" />` tags.
