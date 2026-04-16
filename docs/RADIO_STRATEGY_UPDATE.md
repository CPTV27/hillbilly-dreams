# Radio Strategy — Phased Rollout (April 16, 2026)

## The Decision

The 24/7 radio stream is BUILT and READY. AzuraCast is running, SSL is live, the Mac mini broadcasting stack works. But we're not promoting or launching the 24/7 stream publicly yet.

**Phase 1 (Now):** Big Muddy Radio launches as a podcast + curated playlists
- Weekly podcast episodes (interviews, live sessions, Blues Room recordings)
- Curated playlists on Spotify/Apple Music/YouTube
- YouTube channel for video sessions and audiograms
- This requires zero ongoing infrastructure cost and no SoundExchange overhead

**Phase 2 (When triggered):** Flip the switch to 24/7 streaming
- Trigger: a radio sponsor at $399+/mo OR audience metrics that justify the overhead
- AzuraCast is already configured and tested
- Liquidsoap playlists are ready (116 tracks in MelodyVault)
- RadioPlayLog schema is designed and ready to migrate
- SoundExchange licensing kicks in at this point

## What This Changes

- Public-facing copy says "podcast" and "playlists" not "24/7 radio station"
- Bundle packages reference "audio mentions" or "podcast features" instead of "radio mentions/week"
- The infrastructure stays running internally for testing and content production
- The stream URL (stream.bigmuddytouring.com) stays live but is not actively promoted

## What This Does NOT Change

- AzuraCast stays running on DigitalOcean
- OpenBroadcaster + Icecast stay running on Mac mini
- RadioPlayLog schema stays in the blueprints (needed for Phase 2)
- The Narrative Bible keeps "radio" in the brand description — it's still part of the vision
- The one-sentence description keeps "runs a radio station" — we do, it's just not public yet

## Who Owns It

- Chase: content production (interviews, sessions, recordings)
- Amy: hosting and performance (she's the talent)
- Phase 2 sponsor acquisition: Chase (walk-in sales, bundle upsell)
