# Route Map
## Last Updated: March 25, 2026

## RULE: When adding, moving, or disabling a route, update this doc IMMEDIATELY.

## Active Routes (36 pages — slim build for deploy)

### Public / Owen's Tour
| Route | Purpose | Password |
|-------|---------|----------|
| `/welcome/owen` | Guided 6-stop tour for Owen | None |
| `/measurably-better` | MB product landing | None |
| `/measurably-better/thesis` | Outsider Economics Deep South Edition | None |
| `/measurably-better/regional` | Four-tier regional provider model | None |
| `/measurably-better/notebook` | AI notebook interface | None |
| `/platform` | HDX platform overview | None |
| `/hillbilly` | Hillbilly Dreams flagship | None |
| `/hillbilly/proposal/scan2plan` | S2PX proposal page | None |
| `/hillbilly/proposal/scan2plan/console` | S2PX live console | None |
| `/nexus` | Ecosystem org chart | None |
| `/mvx` | MelodyVault 3D spatial prototype | None |
| `/ffx` | Feed Farm prototype | None |
| `/strategy` | Executive strategy report (Senate style) | tracy, amy, jp, owen, chase |

### Touring Brand (Big Muddy)
| Route | Purpose |
|-------|---------|
| `/` (root) | Touring homepage (default brand) |
| `/touring/inn` | Big Muddy Inn |
| `/touring/inn/events` | Inn events |
| `/touring/inn/weddings` | Weddings |
| `/touring/route` | The corridor route map |

### Auth
| Route | Purpose |
|-------|---------|
| `/api/auth/*` | NextAuth routes |
| `/login` | Login page |

### API Routes (Active)
| Route | Purpose |
|-------|---------|
| `/api/auth/*` | Authentication |
| `/api/stripe/*` | Payments (checkout, onboard, webhook) |
| `/api/ai/analyze` | Vertex AI analysis |
| `/api/ai/notebook/chat` | RAG notebook chat |
| `/api/s2px/*` | Scan2Plan exchange |
| `/api/content/*` | Content management |
| `/api/directory/*` | Business directory |
| `/api/gallery/*` | Artist gallery |
| `/api/media/*` | Media/publications |
| `/api/publish/*` | Content publishing |
| `/api/user/*` | User preferences |
| `/api/cron/sync-qbo` | QuickBooks sync (cron) |
| `/api/cron/sync-google` | Google Workspace sync (cron) |

## Disabled Routes (in /_disabled/ — NOT in build)

### Moved March 25, 2026 — to reduce build size for deploy
| Route | Pages | Reason |
|-------|-------|--------|
| `/admin/*` | 29 | Internal backend |
| `/(ops)/*` | 15 | Tracy/Amy ops dashboard |
| `/(amy)/*` | 1 | Amy's interface |
| `/(demo)/*` | 2 | Demo content |
| `/portal/*` | 5 | Internal reporting |
| `/snap/*` | 2 | QR code system |
| `/book` | 1 | Outsider Economics book |
| `/studio/*` | 2 | Production tools |
| `/tuthill` | 1 | Brand page |
| `/media/*` | 16 | Feed Farm media |
| `/records/*` | 5 | Big Muddy Records |
| `/radio/*` | 7 | Big Muddy Radio |
| `/magazine/*` | 4 | Big Muddy Magazine |
| `/economics/*` | 10 | Outsider Economics |
| `/gallery/*` | 12 | Artist gallery |
| `/directory/*` | 4 | Business directory |

### To Restore a Route
```bash
mv _disabled/app/[route] apps/web/app/[route]
# Then update this doc
# Then verify: cd apps/web && npx next build
```

## Middleware Passthroughs
These routes bypass brand rewriting (defined in config/domain-routes.ts):
- `/welcome`
- `/mvx`
- `/ffx`
- `/strategy`
- `/measurably-better`
- `/platform`
- `/nexus`
- `/hillbilly`
- `/api/*`
- `/login`

### To Add a Passthrough
Edit `apps/web/config/domain-routes.ts` — add the path prefix to `BMT_BRAND_PREFIXES` array.
