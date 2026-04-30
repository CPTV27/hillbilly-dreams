# Tomorrow's Presentation — Master Plan

*Written 2026-04-29 ~11:30pm EDT for Chase's call with Tracy + Amy tomorrow.*

## The deliverable Chase asked for

> Website presentation of all the business plans, magazine-style, lots of photos + AI drawings, pleasure to read. PDF downloads in Senate Report style for printing.

## Resource pool (going horizontal)

| Resource | Best use | Status |
|---|---|---|
| **Cos (this session)** | Code, file writes, Imagen calls, Asana coordination, master plan | Active |
| **Sub-agents (general-purpose)** | Per-business-plan content drafts in isolated context | Spawning 4 tonight |
| **Imagen 3 REST** | Pole barn renderings, BMA property vistas | Verified working |
| **NotebookLM DeltaDawn** | Tracy/Amy reference DB for the call | Prompt given to Chase |
| **Perplexity / Gemini / ChatGPT (Chase manual)** | Specific deep-research prompts I'll generate as needed | Available |
| **Sub-agent (already done)** | Eco-tech research | ✓ Delivered |
| **Sub-agent (already done)** | Full audit | ✓ Delivered |

## Critical path for tomorrow morning

| # | Deliverable | Owner | Status |
|---|---|---|---|
| 1 | Big Muddy Acres scroll-deck (HTML + PDF) | Cos | Building |
| 2 | Pole barn renderings (6-8 Imagen) | Cos | Generating |
| 3 | 12-month financial forecast (HTML + PDF) | Cos | Drafting |
| 4 | Big-picture ecosystem one-pager (HTML + PDF) | Cos | Drafting |
| 5 | Index page tying #1-4 together with PDF download links | Cos | Building |

## Nice-to-have if time allows

| # | Deliverable | Owner |
|---|---|---|
| 6 | Big Muddy Inn deep-dive | Sub-agent A |
| 7 | Big Muddy Touring + corridor | Sub-agent B |
| 8 | Big Muddy Magazine editorial monetization | Sub-agent C |
| 9 | Studio C (MBT admin vendor) | Sub-agent D |
| 10 | Chase Pierson Photography pricing + scope | Cos / Chase notes |
| 11 | MBT platform (civic-commerce) | Defer — needs positioning lock |

## Already complete tonight

- ✓ Eco campground research (sub-agent, full report)
- ✓ Full audit (sub-agent, 7 WPC tasks posted)
- ✓ NotebookLM DeltaDawn prompt (Chase 5 min)
- ✓ Tracy + Amy trust-leak replies
- ✓ CLAUDE.md SSH fix
- ✓ Imagen 3 REST verified working

## What Chase does tonight (if he has time, otherwise tomorrow morning)

1. NotebookLM DeltaDawn setup (5 min, prompt provided above in chat)
2. Answer the 6 BMA open questions (location, RV count, customer prospects, etc.)
3. Send the .env.example prompt to Patch for parallel work

## Tomorrow morning before the call

1. Review the deliverables in `/big-muddy-acres/` directory
2. Walk Tracy + Amy through the BMA scroll-deck
3. Hand them PDFs to take home / print
4. Show NotebookLM DeltaDawn so they have the Q&A surface

## Files being written tonight

```
docs/presentations/2026-04-29-master-plan.md           [this file]
apps/web/public/big-muddy-acres/index.html             [presentation hub]
apps/web/public/big-muddy-acres/big-muddy-acres.html   [main BMA scroll-deck]
apps/web/public/big-muddy-acres/forecast.html          [12-month forecast]
apps/web/public/big-muddy-acres/ecosystem.html         [big picture]
apps/web/public/big-muddy-acres/renderings/*.png       [Imagen output]
apps/web/public/big-muddy-acres/pdfs/*.pdf             [Senate-style downloads]
```

## How PDFs get generated

Puppeteer locally → `print` media query in HTML → Senate-style serif single-column → save to `pdfs/`. Each HTML page has a "Download PDF" button linking to its corresponding PDF.

PDF style (Senate Report):
- Single column
- Serif body (Source Serif 4 or Charter)
- Page numbers
- Table of contents on multi-section docs
- Letter size, 1-inch margins
- Footer with date + "Confidential — Hillbilly Dreams / MBT"
