# Studio C Plex Setup & BGM Operations

This specification outlines the procedure for configuring the Mac Mini located at Utopia Studios (Bearsville, NY) as a dedicated Plex Media Server to handle Background Music (BGM) distribution via the Melody Vault platform.

## Objective
Establish a reliable, high-fidelity local streaming node that caches and pushes Big Muddy Entertainment playlists into the physical Studio C hospitality spaces without relying on consumer platforms like Spotify or Apple Music, saving on commercial licensing fees and maintaining the "Anti-SaaS" sovereign audio architecture.

## Hardware & Environment
- **Host System**: Mac Mini (M-Series or Intel), hardwired to the local Bearsville network.
- **Software Layer**: Plex Media Server (latest stable).
- **Control Interface**: `apps/web/app/admin/playlists/studio-c/page.tsx` on the Next.js platform.

## Configuration Protocol

### 1. File Structure & Ingestion
The Melody Vault tracks will be periodically downloaded via the platform's sync utility to the Mac Mini's local storage.
- Create a root directory: `~/Music/MelodyVault/`
- Directory structure must follow Plex naming conventions:
  - `~/Music/MelodyVault/[Artist Name]/[Album or Single]/[01 - Track Name].flac` (or `.wav` / `.mp3`)

### 2. Plex Server Setup
1. Download and install Plex Media Server on the Mac Mini.
2. Under **Settings > General**, ensure "Start Plex Media Server at login" is checked.
3. Under **Settings > Library**, check "Scan my library automatically" to ensure when the Next.js platform dumps new Melody Vault tracks onto the drive, Plex instantly picks them up.

### 3. Creating the BGM Library
1. Click **Add Library** in the Plex Web UI.
2. Select **Music**.
3. Name it "Studio C Melody Vault".
4. Browse to the `~/Music/MelodyVault/` directory.
5. In the **Advanced** tab:
    - Set Scanner to "Plex Music".
    - Check "Prefer local metadata" to avoid Plex scraping incorrect metadata over the meticulously tagged Melody Vault releases.

### 4. Smart Playlists & Rotations
Playlists are grouped by vibe and daypart.
Using the Next.js `/admin/playlists/studio-c` portal:
1. Chase or an Admin creates a "Rotation" in the system.
2. The tracks are scheduled and curated.
3. On the Mac Mini, operators will open Plexamp or the Plex client routing to the studio's receiver and play the specifically curated Studio C playlists.

## Future Optimization (Automated Sync)
In phase two, the `MelodyVault` Next.js interface will run a lightweight Daemon on the Mac Mini that automatically executes `rsync` from the Big Muddy S3 buckets into the local `~/Music/MelodyVault/` folder, completely eliminating manual track dumping.

## End of Spec
