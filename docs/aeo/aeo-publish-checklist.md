# AEO Publish Checklist — Definition of "Answer pages live"

*Locked 2026-04-29. This is the gate. Don't say "Answer pages live" until every page passes every check.*

---

## The 5-point gate (per page)

### 1. URL + structure

Each page lives at:

```
/answers/{slug}
```

Example: `/answers/best-place-to-stay-natchez-live-music`

NOT inside `/blog/...` or `/magazine/...` or any other namespace.

### 2. Above-the-fold rule

The page renders, top-down, in this exact order:

1. H1 = the question (verbatim)
2. Answer block (under 80 words, `citationTarget: true`)
   - NO links
   - NO fluff ("Many people ask...", "Great question...", etc.)
   - NO preamble of any kind
3. 1–2 images (can be placeholders if `imageStatus: missing`)
4. Supporting detail (Key details bullets)
5. Editorial body
6. Related links at the bottom

**If the answer is not the first visible content, the page fails the gate.**

### 3. Server-rendered HTML (the silent killer)

Run this for at least one page after publish:

```bash
curl https://bigmuddymagazine.com/answers/{slug}
```

The answer paragraph must appear in the raw HTML output.

If it doesn't appear → it's client-rendered → invisible to LLM crawlers → fix immediately before publishing the rest.

### 4. Internal linking (don't skip this)

Add 5 internal links total pointing TO the answer pages, FROM:

- Homepage (1 link minimum)
- `/shows` (1 link)
- `/inn` (1 link)
- 2–3 existing magazine articles (at least 2 links)

Link copy pattern:

> "Looking for where to stay? See our guide to the best boutique inn in Natchez for live music."

The internal link from existing pages is what tells Bing the answer pages matter. Without these, indexing is slow.

### 5. Schema markup (minimal)

Each page renders these JSON-LD blocks:

- **FAQPage** — `question` (from title) + `acceptedAnswer.text` (from answer field)
- **Article** — `headline` (title), `dateModified` (updatedAt), `author`, `publisher`

That's it. No rabbit holes.

---

## Immediate move (today's order of operations)

1. Publish the 7 pages in Sanity (after `answerPage` content type lands)
2. Verify ONE page with `curl` to confirm SSR HTML contains the answer
3. Add 5 internal links from homepage / /shows / /inn / 2–3 existing articles
4. Confirm `/sitemap.xml` includes the 7 new URLs

Then trigger: `Answer pages live`

---

## Timeline expectation (realistic)

After publish:

| Window | What to expect |
|---|---|
| 24–48 hrs | Bing picks up pages (if linked + sitemap submitted) |
| 3–7 days | Perplexity may start citing |
| 7–14 days | ChatGPT Search may cite |

If nothing happens in 7 days → debug. Not before.

---

## DO NOT (between now and "Answer pages live")

- Scale to 20 pages (only ship 7 first)
- Touch Studio C / MBT / Utopia lanes
- Overbuild the schema beyond what's specified
- Build a dashboard for this yet

The loop hasn't been validated. Don't multiply unproven work.

---

## What happens after the gate fires

Once you say `Answer pages live`, the next moves run in this order:

1. Run the 10 baseline queries from the AEO weekly query test task — capture starting state
2. Adjust 2–3 answers for sharper phrasing (this always happens after first measurement)
3. Lock the format
4. Then scale to Big Muddy 13 (the remaining pages 8–20)

---

## Files referenced

- `docs/aeo/big-muddy-pages-1-7-ready.md` — content to paste
- `docs/aeo/sanity-answerpage-schema.md` — content type spec
- `docs/aeo/big-muddy-image-queue-2026-04-29.md` — image backlog (don't block on this)

## Asana tasks gating this

- `[Engineering] Implement Sanity answerPage content type` — must complete first
- `[Patch] AEO crawlability + indexing verification` — runs in parallel with publish
- `[Chase] AEO weekly query test — Big Muddy` — fires after `Answer pages live`
