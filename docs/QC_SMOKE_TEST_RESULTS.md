# QC smoke test — production (14 domains)

**Issue:** [#87](https://github.com/CPTV27/hillbilly-dreams/issues/87)  
**Run date:** 2026-04-05 (UTC)  
**Method:** Automated `GET` over HTTPS (Python `urllib`, TLS verify on). User-Agent: `HDI-QC-Smoke/1.0`. Response body truncated (~200–250 KB) for title / substring checks.  
**Canonical URL policy:** Middleware **301s `www.` → apex**; smoke used **apex** URLs only.

---

## Executive summary

| Result | Count |
|--------|------:|
| HTTP 200 (home) | 13 / 14 |
| Failed / inconclusive | 1 (`studiocvideo.com` — DNS resolution failed from runner) |
| **Broken paths (high)** | Outsider Economics **`/case-studies`** → **404** on production |
| **Brand / copy flags** | DSD home meta mentions **“Powered by Measurably Better”** (consumer-facing QC risk) |
| **“Corridor” string** | Present in HTML on **11 / 13** resolved sites — mostly **geographic** (“Mississippi … corridor”, “music corridor”); see per-domain notes |

---

## Domain matrix

| # | Domain | HTTP | `<title>` (truncated) | Brand alignment | Corridor | Notes |
|---|--------|------|------------------------|-----------------|----------|--------|
| 1 | `bigmuddytouring.com` | 200 | Big Muddy — Gateway… — Big Muddy | Touring | Y | Title suffix “Big Muddy” OK; body references music corridor. |
| 2 | `bigmuddymagazine.com` | 200 | Big Muddy Magazine — Big Muddy | Magazine | Y | |
| 3 | `bigmuddyradio.com` | 200 | Big Muddy Radio — Big Muddy | Radio | Y | |
| 4 | `bigmuddyentertainment.com` | 200 | Big Muddy Entertainment — … — Big Muddy | Entertainment | Y | |
| 5 | `bigmuddyrecordlabel.com` | 200 | Big Muddy Records — Music from the Mississippi Corridor — Big Muddy | Records | Y | “Mississippi Corridor” in title — geographic; confirm vs. editorial “New South” preference. |
| 6 | `deepsouthdirectory.com` | 200 | Deep South Directory — … — Big Muddy | DSD | Y | Meta description includes **“Powered by Measurably Better”** — **flag** for walk-in / consumer QC (product name should read **Deep South Directory**). |
| 7 | `outsidereconomics.com` | 200 | Outsider Economics — A Field Manual… — Big Muddy | OE | N | **`/case-studies` → 404**; **`/economics/case-studies` → 404**. **`/` → 200**. |
| 8 | `hillbillydreamsinc.com` | 200 | Hillbilly Dreams Inc. — Big Muddy | HDI | Y | |
| 9 | `tuthilldesign.com` | 200 | Hudson Valley Real Estate Photography \| Tuthill Design \| … | Partner | N | Title does not use shared “— Big Muddy” suffix; expected partner differentiation. |
| 10 | `studiocvideo.com` | — | — | Studio C | — | **`Could not resolve host`** from QC runner (environment DNS). **Re-run from office / resolver that matches production DNS.** |
| 11 | `bearsvillemediagroup.com` | 200 | Bearsville Creative — Recording Studios… — Big Muddy | Bearsville | Y | Domain says “Media Group”; title says “Bearsville Creative” — confirm intentional naming. |
| 12 | `bearsvillemedia.com` | 200 | (same as row 11) | Bearsville alias | Y | Same HTML payload as `bearsvillemediagroup.com` in this run (expected if alias). |
| 13 | `measurablybetter.life` | 200 | Measurably Better Things — The platform behind… — Big Muddy | MBT B2B | Y | B2B positioning OK per strategy; not walk-in consumer. |
| 14 | `buycurious.art` | 200 | Chase Pierson Photography \| Venture Gallery — Big Muddy | Gallery | Y | |

---

## Targeted path checks (Outsider Economics)

| Path | HTTP | Note |
|------|------|------|
| `/` | 200 | OK |
| `/field-manual` | 200 | OK |
| `/case-studies` | **404** | Linked from field manual / economics IA in repo |
| `/economics/case-studies` | **404** | Not exposed on hostname (middleware rewrites strip public prefix) |

**Interpretation:** Repo contains `apps/web/app/economics/case-studies/` (hostname rewrite → `/economics/case-studies`). **Production still returned 404** during this run — confirm the live Vercel (or App Hosting) deployment includes the commit that added those routes and that no edge config blocks the path.

---

## Corridor references

- **Automated check:** case-insensitive substring `corridor` in first ~250 KB of HTML.
- **Not** a full content audit; does not distinguish Mississippi River geography from deprecated product language.
- **Sites with no match in sample:** `outsidereconomics.com`, `tuthilldesign.com`.

---

## Wrong-brand / QC rule watchlist

1. **Deep South Directory — meta / consumer copy:** Any above-the-fold or SEO text that leads with **Measurably Better Things** instead of **Deep South Directory** on `deepsouthdirectory.com` should be corrected per `CLAUDE.md` QC (walk-in pitch uses DSD name).
2. **Shared title suffix `— Big Muddy`:** Consistent across most tenants; confirm partner / B2B exceptions remain intentional (`tuthilldesign.com` differs).

---

## Follow-ups (recommended order)

1. **Deploy** economics case studies (or verify `main` + Vercel production includes `app/economics/case-studies`); re-test `https://outsidereconomics.com/case-studies`.
2. **Re-run Studio C** from a network that resolves `studiocvideo.com`; if still failing, check Cloudflare DNS / registrar.
3. **DSD:** Replace or soften “Powered by Measurably Better” in default meta where the audience is local business walk-ins (keep B2B disclosure in footer if required).
4. **Optional:** Manual pass on “corridor” copy for editorial alignment with **New South** language where it is metaphor, not geography.

---

## Re-run command (approximate)

From a machine with working DNS:

```bash
# Example: status + title
for h in bigmuddytouring.com bigmuddymagazine.com bigmuddyradio.com bigmuddyentertainment.com \
  bigmuddyrecordlabel.com deepsouthdirectory.com outsidereconomics.com hillbillydreamsinc.com \
  tuthilldesign.com studiocvideo.com bearsvillemediagroup.com bearsvillemedia.com \
  measurablybetter.life buycurious.art; do
  echo -n "$h "
  curl -sS -o /dev/null -w "%{http_code}" --max-time 25 "https://$h/"
  echo
done
```

---

*Generated for HDI / MBT QC. Re-run after each production promotion.*
