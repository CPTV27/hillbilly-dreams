# THE THESIS — Visual Confirmation Map

**Purpose:** One-look check on the canonical state of the ecosystem as captured in `docs/THE_THESIS.md`. If anything in these diagrams doesn't match Chase's mental model, fix it BEFORE proceeding with downstream docs (pro forma re-cut, brief re-cut, memory file sweep).

**View this file on GitHub or in any Mermaid-rendering markdown viewer** to see the diagrams. The raw `mermaid` code blocks below render as actual diagrams.

---

## Diagram 1 — The Mind Map (tree view)

The seven big things that make up the ecosystem.

```mermaid
mindmap
  root((MBT / Big Muddy<br/>Ecosystem<br/><br/>Media-amplification<br/>of existing<br/>businesses))

    People
      Equity partners 1/3 each
        Chase Pierson<br/>CEO/CTO/Showrunner
        Tracy Alderson-Allen<br/>Finance + Inn ops + Magazine editor
        Amy Allen<br/>Inn + bar ops + singer Arrie Aslin
      Ops + back-of-house
        JP Houston<br/>Shows + programming<br/>(deal not finalized)
        Elijah<br/>Mac mini + tech
        Miles<br/>Mac mini + tech
      Partner studios
        Tuthill Design<br/>graphic + brand
        Studio C Video<br/>video production
      AI agents
        Cos<br/>Chief of Staff
        Patch<br/>Technical Director
        Claude Design 2<br/>visual design
        Delta Dawn<br/>team-facing assistant
        Gemini 2.5 Pro/Flash<br/>+ Imagen 3

    Existing businesses being amplified
      Tracy's
        Big Muddy Inn<br/>maximize revenue;<br/>CFP = stop-worrying threshold
        Big Muddy Magazine<br/>Tracy as 'Mississippi Martha Stewart'
        BizDev/sales for<br/>Chase Pierson Photography
      Amy's
        Singing career<br/>performs as Arrie Aslin
        Touring + Records + Radio<br/>support her career<br/>+ ancillary revenue from<br/>other corridor bands
      Chase's
        FarleyPierson NAME retired<br/>LLC = rename or close TBD
        Studio C Video<br/>partner studio
        Chase Pierson Photography<br/>expanded into Deep South
        CTO/showrunner of MBT

    The platform MBT
      Make ecosystem cost less<br/>than sum of parts
      Top-line revenue flows in<br/>redeployed across portfolio
      Automate operational chores<br/>so partners don't get stuck
      9 modules<br/>commerce booking finance events<br/>broadcast social content email database
      Single Vercel deployment<br/>14 domains 5 tenants
      Sanity CMS<br/>13 schemas
      229 real Chase photos<br/>in GCS
      NOT a B2B SaaS startup<br/>NOT chasing a SaaS multiple

    Public brand surfaces
      Customer-facing operating
        bigmuddyinn.com
        bigmuddymagazine.com
        bigmuddytouring.com
        bigmuddyrecordlabel.com
        bigmuddyradio.com<br/>pre-launch Q4
        bigmuddyentertainment.com
      Editorial / partner
        outsidereconomics.com<br/>philosophy backbone
        chasepierson.tv
        tuthilldesign.com
        studiocvideo.com
      Platform
        measurablybetter.life<br/>MBT consumer-facing
        deepsouthdirectory.com<br/>Directory MODULE demo<br/>NOT a /mo SaaS product
      Future
        bearsvillemediagroup.com<br/>summer 2026 activation
        hillbillydreamsinc.com<br/>holding domain

    Financials
      Y1 May 2026 to Apr 2027
      Gross ecosystem costs $203k<br/>QuickBooks lines itemized
      Less Scan2Plan royalty<br/>~$1,500/mo = -$18k/yr<br/>passive income offset
      Net break-even floor $185k
      First profit milestone $250k<br/>$65k above net floor
      Baseline target $330k<br/>$145k profit above net floor
      Stretch $390-395k<br/>art sales + stock activation
      25% YoY from baseline<br/>Y1 $330k<br/>Y2 $413k<br/>Y3 $516k<br/>Y4 $645k<br/>Y5 $806k

    Lifestyle goal
      Tour bus that runs on time
      Right bands booked<br/>great shows
      Inn runs itself
      Less workload<br/>cash-flow positive
      NOT buying ourselves a job
      NOT a unicorn exit

    Open decisions
      FarleyPierson<br/>rename LLC OR close LLC
      Bearsville JV<br/>equity split + floor amount<br/>+ governance
      MBT Touring LLC<br/>separate filing for<br/>road liability
      Pricing for Records / Radio<br/>sponsor packages
      JP Houston deal finalize
      Resend domain DNS<br/>Vercel env vars
```

---

## Diagram 2 — The Relationship Flow (how things move)

Where revenue, content, and audience flow between the businesses + platform.

```mermaid
flowchart TB
    subgraph PEOPLE["EQUITY PARTNERS"]
        Chase[Chase Pierson<br/>CEO/CTO/Sales]
        Tracy[Tracy<br/>Finance + Inn + Magazine + CPP BizDev]
        Amy[Amy<br/>Inn ops + Singer Arrie Aslin]
    end

    subgraph EXISTING["EXISTING BUSINESSES BEING AMPLIFIED"]
        Inn[Big Muddy Inn<br/>maximize rev; CFP = threshold]
        Mag[Big Muddy Magazine<br/>Tracy's editorial vehicle]
        Tour[Big Muddy Touring<br/>supports Amy + corridor bands]
        Rec[Big Muddy Records]
        Rad[Big Muddy Radio<br/>pre-launch]
        CPP[Chase Pierson Photography<br/>expanded by Tracy biz dev]
        StuC[Studio C Video<br/>partner studio]
        Tut[Tuthill Design<br/>partner studio]
    end

    subgraph PLATFORM["MBT PLATFORM"]
        direction LR
        Modules[9 modules<br/>commerce booking finance events<br/>broadcast social content email db]
        Sanity[Sanity CMS<br/>shared content layer]
        Photos[229-photo library<br/>shared GCS bucket]
        Brand[Shared brand systems<br/>+ voice docs]
        AI[AI agents<br/>Cos Patch Delta Dawn Gemini]
    end

    subgraph EXTERNAL["EXTERNAL B2B ENGAGEMENTS"]
        Vicki[Vicki Wolpert<br/>Woodstock broker directory]
        BV[Bearsville Creative<br/>JV second region]
        Future[Future B2B clients<br/>civic partners brokers]
    end

    subgraph MONEY["ECOSYSTEM POOL"]
        Pool[All revenue flows in here<br/>Net break-even $185k<br/>First profit $250k<br/>Baseline $330k<br/>+25% YoY<br/>Costs paid out from here<br/>Surplus subsidizes next thing]
    end

    %% Tracy operates
    Tracy -->|operates| Inn
    Tracy -->|edits| Mag
    Tracy -->|sells| CPP

    %% Amy operates
    Amy -->|operates day-of| Inn
    Amy -->|performs| Tour
    Amy -->|records| Rec

    %% Chase operates
    Chase -->|founded/runs| CPP
    Chase -->|founded/runs| StuC
    Chase -->|builds + sells platform| PLATFORM

    %% Platform amplifies
    PLATFORM -->|amplifies| Inn
    PLATFORM -->|amplifies| Mag
    PLATFORM -->|amplifies| Tour
    PLATFORM -->|amplifies| Rec
    PLATFORM -->|amplifies| Rad
    PLATFORM -->|amplifies| CPP
    PLATFORM -->|amplifies| StuC
    PLATFORM -->|amplifies| Tut

    %% Cross-brand pipeline
    Mag -->|drives bookings| Inn
    Tour -->|fills room nights| Inn
    Rad -->|promotes| Tour
    Rec -->|promotes| Tour
    Inn -->|hosts shows for| Tour
    Inn -->|hosts artist-in-residence| Amy
    StuC -->|records sessions for| Rec
    Tut -->|brands all of| EXISTING

    %% External engagements pay platform
    Vicki -->|B2B engagement fee| Pool
    BV -->|JV revenue share + floor fee| Pool
    Future -->|B2B engagement fees| Pool

    %% Existing biz revenue → pool
    Inn -->|revenue| Pool
    Mag -->|sponsorship rev| Pool
    Tour -->|booking fees + door| Pool
    Rec -->|merch + records| Pool
    Rad -->|sponsor pkgs Q4+| Pool
    CPP -->|photo + print sales| Pool
    StuC -->|video projects| Pool
    Tut -->|design projects| Pool

    %% Pool covers costs
    Pool -.->|covers| PLATFORM
    Pool -.->|funds growth in| EXISTING

    style Pool fill:#c8a676,stroke:#0a0a08,stroke-width:3px,color:#0a0a08
    style PLATFORM fill:#1a1a1a,stroke:#c8a676,color:#e8e0d4
    style EXTERNAL fill:#191715,stroke:#7fa86a,color:#e8e0d4
    style EXISTING fill:#231f1c,stroke:#d8cfbe,color:#e8e0d4
    style PEOPLE fill:#0a0a08,stroke:#c8a676,color:#c8a676
    style MONEY fill:#1a1a1a,stroke:#c8a676,color:#e8e0d4
```

---

## Diagram 3 — The Three Layers (architecture restatement)

Same as the brief had, but now framed under the corrected thesis.

```mermaid
flowchart TB
    L3[LAYER 3 — IMPLEMENTATIONS<br/><br/>Big Muddy: Inn + Mag + Touring + Records + Radio<br/>Bearsville: NE clone via JV summer 2026<br/>Future: any new region as a JV with operators]

    L2[LAYER 2 — MBT PLATFORM<br/>Measurably Better Things LLC<br/><br/>9 modules + Sanity CMS + multi-tenant infra + AI<br/>The Glass Engine — same code serves every brand<br/>Directory module ships INSIDE B2B engagements only]

    L1[LAYER 1 — HDI<br/>Conceptual holding<br/>NOT formally incorporated]

    L3 --> L2
    L2 --> L1

    style L3 fill:#231f1c,stroke:#d8cfbe,color:#e8e0d4
    style L2 fill:#1a1a1a,stroke:#c8a676,stroke-width:3px,color:#e8e0d4
    style L1 fill:#0a0a08,stroke:#6b6254,color:#a89e8d
```

---

## Diagram 4 — Y1 Revenue: Where $330k Baseline Could Come From

NOT a target per line. Just a "where we'd look first" decomposition of the $330k baseline.

```mermaid
pie title Y1 Revenue Mix Hypothesis ($330k baseline, May 2026 - Apr 2027)
    "Big Muddy Inn (rooms, breakfast, Blues Room)" : 150
    "Chase Pierson Photography (Tracy biz dev)" : 100
    "Tuthill + Studio C projects" : 45
    "B2B engagements (Vicki + 1-2 others)" : 20
    "Big Muddy Touring (booking + door + van)" : 10
    "Big Muddy Magazine (sponsorships)" : 5
```

The slices add to $330k. They're a hypothesis of where revenue COULD come from — not commitments per line. If the Inn does $180k and Touring is $0, we can still hit baseline if other lines move. The point is the ecosystem total, not the per-brand splits.

The honest break-even floor is $191k. The $330k baseline is what we work for. Spread between them ($139k) is real profit.

(Compare to the older brief's pro forma which targeted $510k / $760k — that was aspirational and is now retired. The $191k floor and $330k baseline are the real numbers per Chase 2026-04-20.)

---

## Confirmation pinch test

Before we proceed with downstream cleanup (re-cutting the pro forma, re-aligning the brief, sweeping memory files), confirm each of these matches your model:

| # | Statement | Y/N |
|---|---|---|
| 1 | The point of all this is media-amplification of existing businesses, not a vertically-integrated startup ecosystem. | |
| 2 | Tracy operates the Inn + edits the Magazine + does BizDev/sales/management for Chase Pierson Photography. | |
| 3 | Amy is a singer with a band (performs as Arrie Aslin), and Touring + Records + Radio exist primarily to support her career, with ancillary lift for other corridor bands. | |
| 4 | The FarleyPierson name is being retired regardless. The LLC will either be renamed (TBD) or closed. | |
| 5 | The Inn's metric is "maximize revenue" — break-even is the floor, profit is the goal, quality of life is the ceiling. NOT "settle for break-even." | |
| 6 | Y1 gross ecosystem costs are **$191k** (QuickBooks: $125k Inn + $24k platform + $42k Chase housing/bills/living). Chase's 2% Scan2Plan royalty adds ~$18k of passive income, putting the **net ecosystem break-even at $185k**. First profit milestone **$250k**. Baseline **$330k**. Stretch **$390–395k**. Fiscal year May 1, 2026 → April 30, 2027. | |
| 7 | Out-year target is 25% YoY growth from the $330k baseline: Y1 $330k → Y2 $413k → Y3 $516k → Y4 $645k → Y5 $806k. | |
| 8 | The Directory is a CAPABILITY that ships inside B2B engagements (Big Muddy Magazine, Bearsville, Vicki). NOT a $25/$50/$99/$250 SaaS product. | |
| 9 | Bearsville Creative is the same model in a second region (JV with floor-and-share), not a clone-of-the-platform sold to a third party. | |
| 10 | The lifestyle goal is a tour bus that runs on time, the right bands booked, the Inn running itself, and a lighter workload — NOT a unicorn exit. | |
| 11 | MBT (the platform) is the operating layer of the ecosystem. NOT a B2B SaaS startup chasing a SaaS multiple. | |
| 12 | Gross ecosystem costs are $191k; net break-even after the $18k Scan2Plan royalty offset is $185k. Hitting $185k = ecosystem covers itself; $250k = first real profit (~$65k); $330k = $145k of real profit to redeploy. | |

If any row is N (or "yes, but…"), tell me which one + the correction. I'll patch THE_THESIS.md and re-render this map. Then we proceed with downstream cleanup.

If all are Y, we're done with the canonical state and I can sleep too.
