# Asana Agent Dispatch — Sovereign Pi + Banking + Launch

Read this, then execute every task against the Asana API.

## Workspace
- GID: 1211216881488780
- Name: chasepierson.tv

## People
- Chase Pierson: 1211216881488767
- Tracy Alderson Allen: 1213753731475710
- Amy Allen: 1213838128321988
- JP Houston: 1213857579742020
- Elijah Tuttle: 1211231604957485

## Projects
- Hillbilly Dreams Inc: 1213753731475702
- Tracy — Business & Finance: 1213853652406670
- Amy — Inn & Bar Ops: 1213859652065310
- JP — Shows & Programming: 1213857209781632
- Deep South Directory: create if not exists
- Launch — April 2026: create if not exists

## Tasks to Create

### LAUNCH PROJECT (create project "Launch — April 2026" if it doesn't exist, color: dark-red, owner: Chase)

1. "Art Show — April 12: multimedia show at Big Muddy Radio Studio"
   Assignee: Chase | Due: 2026-04-12
   Notes: Large format prints, projection, live music. First Sovereign Pi demo. See docs/specs/ART_SHOW_APRIL_12.md

2. "Soft Launch — April 17: Amy's country show + Mechanical Bull opening"
   Assignee: Amy | Due: 2026-04-17
   Notes: First 5 DSD walk-in sign-ups target. Pi prototype ready. Walk-in flyer printed. See docs/specs/SOFT_LAUNCH_APRIL_17.md

3. "Full Launch — April 27: DSD goes live publicly"
   Assignee: Chase | Due: 2026-04-27
   Notes: 10 businesses target. Stripe checkout live. Sovereign Pi on the store. See docs/specs/FULL_LAUNCH_APRIL_27.md

4. "Amy's Live at Five — May 8"
   Assignee: Amy | Due: 2026-05-08
   Notes: NOLA band, rehearsals, after-party. See docs/specs/AMY_LIVE_AT_FIVE_PRODUCTION.md

5. "Bearsville Summer Activation — June 1"
   Assignee: Chase | Due: 2026-06-01
   Notes: Northeast node goes live. Elijah + Miles as operators. See docs/specs/BEARSVILLE_ACTIVATION_PLAN.md

### TRACY — BUSINESS & FINANCE (project GID: 1213853652406670)

Already created tonight:
- "ORDER: Sovereign Pi prototype kit (5 units) + Android tablet" — GID: 1213947403940912, due: 2026-04-05
- "RESEARCH: Regional bank micro-lending pilot" — GID: 1213947404666121
- "TEST: Tracy tests DSD + Sovereign Pi as a fake business owner" — GID: 1213965289608639, due: 2026-04-12

Create these additional tasks:

6. "Review Sovereign Pi product spec — docs/specs/SOVEREIGN_PI_PRODUCT.md"
   Assignee: Tracy | Due: 2026-04-10
   Notes: Chase wrote the product spec. Tracy reviews: pricing, margins, fulfillment plan. Flag anything that doesn't add up financially. The COGS is $165/unit — verify this is accurate by checking actual Amazon prices when ordering.

7. "Review bank presentation draft when ready"
   Assignee: Tracy | Due: 2026-05-01
   Notes: Chase will prepare a draft presentation for the banking pilot. Tracy reviews for: accuracy, legal exposure, regulatory concerns, entity structure. No external conversations until Tracy approves. Tracy owns the banking relationship.

8. "Set up Stripe account for DSD payments"
   Assignee: Tracy | Due: 2026-04-10
   Followers: Chase
   Notes: Create Stripe account at stripe.com. Get Secret Key. Give to Chase for Vercel setup. This unblocks: DSD checkout, Sovereign Pi standalone purchases, Display Module sales, and all commerce features.

### AMY — INN & BAR OPS (project GID: 1213859652065310)

9. "Test DSD onboarding flow — sign up as Big Muddy Inn"
   Assignee: Amy | Due: 2026-04-10
   Notes: Go to deepsouthdirectory.com/directory/onboard. Sign up the Big Muddy Inn as a real DSD member (Free tier). Does it work? Is anything confusing? Write down every issue. This is our first real business on the platform.

10. "Prepare Blues Room for Sovereign Pi demo"
    Assignee: Amy | Due: 2026-04-12
    Notes: Chase needs a TV at the Inn with an available HDMI port for the art show Pi demo. Verify: which TV? Is there a power outlet nearby? Is the WiFi strong in that spot?

11. "Photograph the Sovereign Pi at the Inn"
    Assignee: Amy | Due: 2026-04-14
    Notes: When the Pi prototype is assembled, Chase will photograph it at the Inn for the product listing. Amy: clear a spot on the front desk counter, make sure the background looks good. Chase handles the photography.

### JP — SHOWS & PROGRAMMING (project GID: 1213857209781632)

12. "Book April 17 soft launch show"
    Assignee: JP | Due: 2026-04-10
    Notes: Amy's country show + Mechanical Bull opening. Confirm: artist/band, sound requirements, set times, door price. This is the soft launch event — it needs to be solid.

13. "Plan art show music for April 12"
    Assignee: JP | Due: 2026-04-09
    Notes: Live music for the multimedia art show at the radio studio. Acoustic or ambient — something that works with large format prints and projection. Not a full band setup.

### HILLBILLY DREAMS INC (project GID: 1213753731475702)

Already created tonight:
- "ORDER: Sovereign Pi prototype kit" — GID: 1213947403940912
- "PRODUCT SPEC: Sovereign Pi + Display Module + Signage Network" — GID: 1213947404408334
- "Set up vendor onboarding flow for Tracy & Amy" — GID: 1213948091680667

Create these additional tasks:

14. "Assemble first Sovereign Pi prototype"
    Assignee: Chase | Due: 2026-04-11
    Notes: When parts arrive: assemble Pi + NVMe + case, flash OS, install Node, load RAG service, test HDMI output on a TV. Document the assembly process for replication.

15. "Write auto-setup script for Sovereign Pi"
    Assignee: Chase | Due: 2026-04-11
    Notes: Script that runs on first boot: installs Node, copies RAG service, indexes business data, starts the server, displays branded boot screen on HDMI. Must work without internet after initial setup.

16. "Photograph Sovereign Pi for product listing"
    Assignee: Chase | Due: 2026-04-14
    Notes: Product shots: white background, on counter, plugged into TV, with solar panel, in Faraday bag, in Chase's backpack. These go on /store/sovereign-pi and Amazon listing.

17. "Write Amazon listing copy for Sovereign Pi"
    Assignee: Chase | Due: 2026-04-20
    Notes: Title, bullet points, description, A+ content. Use the copy from /store/sovereign-pi page as starting point. Must pass Amazon's listing guidelines.

18. "Configure Stripe products: Sovereign Pi + Display Module + add-ons"
    Assignee: Chase | Due: 2026-04-15
    Notes: After Stripe is set up (Tracy task #8), create products: Sovereign Pi Standalone ($299), Display Module ($99), Battery ($59), Solar ($49), Faraday ($39), HDMI ($9), Full Bundle ($129), Signage Network ($199/mo recurring).

## Rules
- Tracy and Amy are equity partners — never employees
- JP's deal is not finalized — don't reference his compensation
- No specific bank names in any task descriptions
- Tracy owns the banking relationship — no external financial conversations without her approval
- All credentials go in Bitwarden
- Due dates are real — these are launch milestones
