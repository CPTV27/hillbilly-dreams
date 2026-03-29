# Platform Proposal — Tuthill Design + Studio C

## For: Elijah (Studio C / Tuthill Design)

---

## What This Is

A turnkey media company platform — the same system running Big Muddy in Natchez, configured for your businesses. One codebase runs everything: website, client portal, content generation, social media, photo galleries, booking, and broadcasting.

**See it working:** [bigmuddytouring.com](https://bigmuddytouring.com) — this is one implementation. Yours would look completely different but run on the same engine.

### Click through the case study:
- [The main site](https://bigmuddytouring.com) — 15 domains, one codebase
- [The directory](https://deepsouthdirectory.com) — business listings with AI
- [The radio station](https://bigmuddytouring.com/radio/shows) — 18 automated shows
- [The magazine](https://bigmuddymagazine.com) — editorial content
- [The admin panel](https://bigmuddytouring.com/admin/dashboard) — Mission Control
- [The creative tools](https://bigmuddytouring.com/admin/creative) — AI image/video/audio/text generation
- [The photo storefront](https://bigmuddytouring.com/gallery/chase-pierson) — prints with Stripe checkout
- [The demo deck](https://bigmuddytouring.com/demo-deck.html) — full walkthrough

---

## Tuthill Design Implementation

**Domain:** tuthilldesign.com (already configured in routing)

**What you get:**
- Photography portfolio with print sales (Stripe checkout, you keep 75%)
- Client proof galleries (private links per shoot, subjects buy prints)
- AI photo enhancement (5 presets tuned for editorial look)
- Content generation (social posts, project descriptions, SEO copy)
- Client management portal
- Booking/scheduling integration
- Stock photography licensing storefront

**What's already built:**
- The Chase Pierson Photography storefront is the template — same architecture, your brand
- Photo upload → GCS → indexed → searchable in 2 minutes
- Print ordering with Stripe Connect destination charges
- AI-generated social posts from your portfolio

**What Elijah develops:**
- Custom integrations for Tuthill's workflow (Lightroom → platform pipeline)
- Client communication features
- Project management dashboard
- These features roll back into the platform for all tenants

---

## Studio C Implementation

**Domain:** studio-c.video (already configured in routing)

**What you get:**
- Video production company website with portfolio
- Client portal for project delivery
- Recording studio booking system
- Live session recording → automatic content pipeline
- Radio/podcast hosting (same OpenBroadcaster stack)
- Social media automation (Postiz integration)
- AI-generated promotional content (trailers, teasers, social clips)
- Stock footage/audio licensing marketplace

**The vision:**
Studio C isn't just an agency — it's a media company. The platform handles:
- Client projects (video, audio, photo)
- Content distribution (YouTube, social, radio, streaming)
- Licensing marketplace (stock footage, music, sound effects)
- Live broadcasting (OBS → streaming endpoints)

---

## Google AI Integration

Everything runs on Google's enterprise AI stack:

| Capability | Google Product | What It Does For You |
|---|---|---|
| Photo generation | Vertex AI Imagen 3 | Generate backgrounds, concept art, social graphics |
| Photo enhancement | Vertex AI Imagen | Batch-enhance photos with editorial presets |
| Video generation | Vertex AI Veo 3.1 | Generate promo clips, social reels, ambient loops |
| Audio generation | Cloud TTS Journey | Voiceovers, radio promos, podcast intros |
| Text generation | Gemini 2.5/3.1 | Social posts, descriptions, SEO copy, proposals |
| Storage | Google Cloud Storage | All media assets, globally distributed |
| Auth | Google OAuth | One sign-in for everything |
| Search | Gemini + Perplexity | AI assistant that knows your business |

**Draft/Premium toggle:** Fast/cheap generation for iteration, premium quality for final output. You control the cost.

---

## How Updates Work

One codebase → all tenants. When a feature ships:
- Big Muddy gets it
- Bearsville gets it
- Studio C gets it
- Tuthill Design gets it

Elijah's custom development on Studio C features gets merged back into the platform. Everyone benefits. This is the federation model from Outsider Economics — shared infrastructure, independent operations.

---

## The Deal

**For Elijah:**
- Access to the full platform for Studio C and Tuthill Design
- Development environment to build features
- Features you build get licensed back to other tenants (revenue share)
- Owen gets a licensing deal for the Studio C implementation

**What it replaces:**
- Custom website ($5K-15K to build, $200/mo to maintain)
- Social media manager ($3,500/mo)
- Client portal (Sprout Social $250/mo, or custom build)
- Stock licensing platform (custom build $10K+)
- Booking system ($100-300/mo)
- AI tools ($500+/mo across multiple subscriptions)

**What it costs:**
- Platform fee: TBD (discuss with Chase)
- Google Cloud: ~$50-200/mo variable based on usage
- You own your content, your clients, your brand

---

## Next Steps

1. Elijah reviews this proposal and clicks through the Natchez case study
2. 30-minute call to discuss customization needs
3. Tenant configs created (1 day)
4. Brand theming applied (1 day)
5. Content seeded (Elijah provides portfolio, client list)
6. Live within a week
