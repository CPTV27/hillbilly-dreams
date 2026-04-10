# Big Muddy Radio Stinger Generator

Manifest-driven ElevenLabs station ID generator for Big Muddy Radio.

## Why this exists

The first set of stingers was made with macOS `say` (robot voices). This tool lets you:
- Iterate on scripts + voices easily
- Add new stingers by editing one JSON file
- Regenerate any single stinger without touching the others
- Ship new voices to the Mac mini with one command

## Files

| File | What |
|---|---|
| `stingers.json` | Single source of truth — character, voice ID, script, per-stinger voice settings |
| `generate.mjs` | Node script — reads manifest, calls ElevenLabs, writes MP3s to `out/` |
| `deploy.sh` | Bash script — SCPs `out/*.mp3` to the Mac mini, restarts the radio |
| `out/` | Generated MP3s (gitignored — the manifest is the source of truth, not the audio) |

## Requirements

- **Node 22+** (uses built-in `fetch`)
- **`ELEVENLABS_API_KEY`** set in env OR present in `.env.vercel-check` at the repo root
- **`~/.ssh/id_mini`** key for the Mac mini SSH connection (override with `MINI_SSH_KEY=...`)
- **Mac mini reachable** at `192.168.4.37` (override with `MINI_HOST=...`)
- ElevenLabs paid tier (voice library access)

## Commands

### Generate all 8 stingers
```bash
node scripts/stingers/generate.mjs
```

### Generate just one stinger
```bash
node scripts/stingers/generate.mjs 05-grandma-porch
```

### List available voices on your ElevenLabs account
```bash
node scripts/stingers/generate.mjs --list
```

### Deploy to the Mac mini + restart radio
```bash
bash scripts/stingers/deploy.sh
```

### Full refresh (generate + deploy)
```bash
node scripts/stingers/generate.mjs && bash scripts/stingers/deploy.sh
```

## Adding a new stinger

1. Edit `stingers.json`
2. Append a new entry to the `stingers` array:
   ```json
   {
     "id": "09-new-voice-name",
     "character": "Character Description",
     "voice_id": "ElevenLabsVoiceID",
     "voice_name": "ElevenLabs Voice Display Name",
     "script": "Your script text. Big Muddy Radio. The soul of the South."
   }
   ```
3. Optional: add `"voice_settings": {...}` to override the default tone
4. Run `node scripts/stingers/generate.mjs 09-new-voice-name` to generate just that one
5. Run `bash scripts/stingers/deploy.sh` to ship it
6. The radio picks it up on next restart (handled by `deploy.sh`)

## Voice settings reference

Default (from `stingers.json._voice_settings_default`):
```json
{
  "stability": 0.55,
  "similarity_boost": 0.85,
  "style": 0.35,
  "use_speaker_boost": true
}
```

- **stability** (0–1): Higher = more consistent, less expressive. Lower = more emotional variance.
- **similarity_boost** (0–1): How closely to match the reference voice. 0.85 is a safe default.
- **style** (0–1): 0 = neutral read, higher = more expressive (required for emotional character work).
- **use_speaker_boost**: Always `true` for broadcast use — improves clarity.

**Per-character overrides** in `stingers.json`:
- Noir characters (Daniel Noir, Reed Latenight) use lower `stability` + higher `style` for theatrical delivery.
- Whisper Midnight uses high `stability` (0.75) + low `style` (0.15) for an intimate, controlled read.
- Promo voices (Fred Promo) use low `stability` + high `style` for maximum energy.

## How the radio picks up new stingers

The stingers live at `/Users/ClawdBOT/bigmuddy-radio/stingers/*.mp3` on the Mac mini. The ezstream playlist at `/Users/ClawdBOT/broadcasting/bigmuddy-playlist.m3u` references each stinger file by absolute path, interleaved with music every 2 tracks. When `deploy.sh` replaces the MP3s and restarts ezstream, the next time a stinger's position hits in the playlist, the new audio plays.

If you've added a BRAND NEW stinger (new `id`) and want it in the rotation immediately, you also need to regenerate the playlist:
```bash
# On the Mac mini
python3 /Users/ClawdBOT/broadcasting/build-playlist.py
# Then deploy.sh will restart ezstream and it picks up the new playlist
```

The playlist builder at `infra/broadcasting/build-playlist.py` scans `stingers/` automatically, so dropping a new file in there is enough.

## Troubleshooting

### "ELEVENLABS_API_KEY not found"
- Export it in your shell: `export ELEVENLABS_API_KEY=sk_...`
- OR make sure `.env.vercel-check` exists at the repo root with `ELEVENLABS_API_KEY="sk_..."`

### "voices fetch failed: 401"
- API key is invalid or expired. Check Bitwarden for the current key.

### "SCP fails with permission denied"
- Verify the Mac mini SSH key: `ls ~/.ssh/id_mini`
- Test connection: `ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 'echo ok'`

### "New voices don't play on the radio"
- Check if ezstream restarted: SSH to the mini, run `screen -ls | grep bigmuddy-radio`
- Check the wrapper log: `tail /Users/ClawdBOT/broadcasting/ezstream-wrapper.log`
- If the radio is dead, manually restart: `/Users/ClawdBOT/broadcasting/boot-radio.sh`

### "I want a completely different voice character"
- Run `node scripts/stingers/generate.mjs --list` to see all 54 voices on your account
- Pick a voice_id from the list, update `stingers.json`, regenerate that one stinger
- Listen to the result in `scripts/stingers/out/<id>.mp3` before deploying

## Current character roster

| # | ID | Character | Voice | Vibe |
|---|---|---|---|---|
| 1 | `01-grandpa-preacher` | Grandpa Preacher | Grandpa Spuds Oxley | Old, gentle, Baptist grandpa |
| 2 | `02-ralph-barker` | Ralph Barker | Brian | Classic deep broadcast DJ |
| 3 | `03-daniel-noir` | Daniel Noir | Adam | Film-noir, after dark |
| 4 | `04-reed-latenight` | Reed Latenight | Eric | Smooth late-night velvet |
| 5 | `05-grandma-porch` | Grandma Porch | Annie K | Warm female (flag: no perfect "old grandma" voice in library — may want to swap) |
| 6 | `06-fred-promo` | Fred Promo | Joey | Upbeat news-host promo energy |
| 7 | `07-moira-gospel` | Moira Gospel | Bella | Bright, warm female (not a true gospel voice — may want to swap if a gospel voice exists on your account) |
| 8 | `08-whisper-midnight` | Whisper Midnight | Lily | British velvet, intimate |

Two of these (Grandma Porch, Moira Gospel) are the best available on the current voice library but aren't perfect character matches. If you want cloned or custom voices for either, use ElevenLabs' Voice Cloning feature and replace the `voice_id` in the manifest.

## Related files

- `infra/broadcasting/ezstream.xml` — ezstream config on the Mac mini
- `infra/broadcasting/boot-radio.sh` — launches ezstream in a persistent screen session
- `infra/broadcasting/build-playlist.py` — generates the interleaved playlist (music + stingers)
- `docs/runbooks/broadcasting.md` — full broadcasting stack runbook
