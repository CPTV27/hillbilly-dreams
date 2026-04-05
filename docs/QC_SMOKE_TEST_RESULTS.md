# QC smoke test — production domains

**Issue:** [#87](https://github.com/CPTV27/hillbilly-dreams/issues/87)  
**Run:** 2026-04-05 (UTC) — automated `GET https://{host}/` from QC runner (TLS, ~180 KB HTML sample).  
**Policy:** Apex URLs only (middleware 301s `www` → apex).

## Summary

| Check | Result |
|--------|--------|
| HTTP 200 (homepage) | 12 / 13 in this run |
| `studiocvideo.com` | DNS resolution failed from runner — **inconclusive** (verify from office network) |
| `outsidereconomics.com/case-studies` | **404** at time of run — deploy or routing gap |
| Substring **corridor** (case-insensitive) in HTML sample | Present on most sites — typically geographic / “music corridor” copy; manual editorial pass optional |
| **Measurably Better** on **deepsouthdirectory.com** | **Yes** — appears in page HTML (consumer-QC: prefer **Deep South Directory** as lead name on walk-in surfaces) |

## Per-domain matrix

| Domain | HTTP | Corridor in sample? | DSD-only: MBT string? | Notes |
|--------|------|----------------------|------------------------|--------|
| deepsouthdirectory.com | 200 | Y | **Y** | Title/stack OK; reduce MBT prominence in consumer-facing meta if desired. |
| bigmuddytouring.com | 200 | Y | — | |
| bigmuddymagazine.com | 200 | Y | — | |
| bigmuddyradio.com | 200 | Y | — | |
| bigmuddyentertainment.com | 200 | Y | — | |
| bigmuddyrecordlabel.com | 200 | Y | — | |
| hillbillydreamsinc.com | 200 | Y | — | |
| bearsvillemediagroup.com | 200 | Y | — | |
| studiocvideo.com | — | — | — | **DNS failed** from runner. |
| tuthilldesign.com | 200 | N | — | Partner site; distinct title. |
| outsidereconomics.com | 200 | N | — | `/case-studies` → **404**. |
| measurablybetter.life | 200 | Y | — | B2B surface; MBT naming expected. |
| buycurious.art | 200 | Y | — | |

## Routing table coverage

All hostnames above map to entries in `apps/web/config/domain-routes.ts` except **hillbillydreamsinc.com** and **measurablybetter.life**, which use `hillbillydreams` and `measurablybetter` patterns respectively. **venturegallery** / **buycurious** patterns cover the gallery host.

## Re-run

```bash
for h in deepsouthdirectory.com bigmuddytouring.com bigmuddymagazine.com bigmuddyradio.com \
  bigmuddyentertainment.com bigmuddyrecordlabel.com hillbillydreamsinc.com bearsvillemediagroup.com \
  studiocvideo.com tuthilldesign.com outsidereconomics.com measurablybetter.life buycurious.art; do
  printf '%s ' "$h"; curl -sS -o /dev/null -w '%{http_code}\n' --max-time 20 "https://$h/" || echo "err"
done
```

---

*Overnight batch — Cursor. Re-run after each production promotion.*
