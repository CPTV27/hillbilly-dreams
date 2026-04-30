# Gemini prompts for extracting Mechanical Bull lyrics — 2026-04-30

*Drop these into Gemini logged in as `admin@hillbillydreamsinc.com`. The lyrics master Google Doc is at https://docs.google.com/document/d/1l2XHaXsKaJrUR6zXA49n3DVdtZXqAtFGf-pSH1lmJ-0/edit — Gemini's @-mention should pick it up directly when you reference the URL or its title.*

---

## Prompt 1 — Direct lyrics extraction from the Master Catalog Google Doc

```
@Lyrics_MasterCatalog (or paste full URL: https://docs.google.com/document/d/1l2XHaXsKaJrUR6zXA49n3DVdtZXqAtFGf-pSH1lmJ-0/edit)

Open this Google Doc and extract the COMPLETE lyrics for every Mechanical Bull song
in it. For each song, return:

1. Song title (exact, with capitalization preserved)
2. Album it appears on (if specified)
3. Full lyrics — every verse, every chorus, every bridge — verbatim, with line breaks preserved
4. Any notes / hooks / chord tags appended to the lyrics

Format the output as a single markdown document with each song under an H2 header.
Do not summarize. Do not paraphrase. Do not omit verses to "save space." Return
every word of every song as it appears in the doc.

If a song is referenced by title but no lyrics are present, list it at the end
under "Songs referenced but no lyrics in this doc" with what info IS available.
```

---

## Prompt 2 — Cross-reference with Drive folders (for songs not in the master doc)

```
Search my entire Drive for additional lyrics files for Mechanical Bull songs not
covered by the master catalog at
https://docs.google.com/document/d/1l2XHaXsKaJrUR6zXA49n3DVdtZXqAtFGf-pSH1lmJ-0/edit

Look in:
- /My Drive/01-Big Muddy/Entertainment/
- /My Drive/Hillbilly Dreams Archive/
- /My Drive/10-Archive/
- Any folder containing "Mechanical Bull", "Songs to Get Divorced", "A Million Yesterdays"
- Tracy's StudioBookArdent folders (which have lyric .pages files for various songs)

Return only NEW lyrics not already in the master catalog. Same format as before:
H2 song title, then full verbatim lyrics.

For .pages files (Apple Pages format), open them via Google Docs preview if possible
and extract the text. If a .pages file can't be opened, list it with its full path
so I can manually export it.
```

---

## Prompt 3 — Catalog reconciliation (canonical song list)

```
Build a single canonical list of every song I have ever written or recorded under
the Mechanical Bull project. Pull from:

1. The master catalog Google Doc
2. The CD Baby distribution data (search for "CD Baby" in my Gmail — particularly
   payment receipts, which list every track that's earned royalties)
3. Set lists in old emails (search subject:"set list" in my Gmail)
4. Album track-listings in any release press kits in my Drive
5. SoundCloud track titles (I have ~15 tracks at https://soundcloud.com/chase-pierson)

Return a deduplicated table with columns:
| Song title | Album (if released) | Lead vocal (Chase / Avalon Peacock / other) | Where lyrics live | Where audio lives | Notes |

Mark each row whether full lyrics exist anywhere in my Drive or only the title is known.
```

---

## Prompt 4 — Songwriting voice extract (for the AI voice training)

```
Read every Mechanical Bull lyric in the master catalog
(https://docs.google.com/document/d/1l2XHaXsKaJrUR6zXA49n3DVdtZXqAtFGf-pSH1lmJ-0/edit)
and analyze the songwriter's voice. Specifically:

1. Recurring phrases, idioms, and constructions that show up across multiple songs
2. Subject matter the writer returns to (3-5 themes with example lyrics)
3. Rhyme schemes and meter preferences
4. Tonal range — when the writing is humorous vs. when it goes serious
5. Specific Southern / heartland / Americana vocabulary the writer uses
6. The writer's relationship to the first person — narrator vs. character voices

Return as a single voice profile that can be fed into a generative model as a
"write in the style of Chase Pierson the Mechanical Bull songwriter" instruction.

Include 10 verbatim lyric snippets that best exemplify the voice.
```

---

## Notes

- Gemini in `admin@hillbillydreamsinc.com` already returned good thematic descriptions but missed the actual full lyrics (per Chase's evening pastes). Prompt 1 is the most direct fix — it points Gemini at the specific master doc URL.
- If Prompt 1 still returns summaries instead of verbatim text, change to Gemini 2.5 Pro with "Long context" enabled, and explicitly include the doc as an attachment instead of relying on @-mention resolution.
- Keep results in a markdown file at `docs/voice-training/mechanical-bull-lyrics-master.md` once Gemini returns them — that becomes the canonical source for downstream voice-clone training, content generation, and Inverted Intelligence radio show research.
- We're also downloading the SoundCloud catalog tonight via yt-dlp; once those MP3s land, Whisper transcription gives us a SECOND independent source of lyrics (transcribed from Chase's actual vocal performances). Reconciling Gemini-from-Doc + Whisper-from-Audio gives us highest fidelity.
