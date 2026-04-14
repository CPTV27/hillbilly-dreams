# Chase's Photo Workflow

*How to get photos from Lightroom into the Big Muddy library that Tracy and Amy pick from in Sanity Studio.*

This is the complete path from camera → Lightroom → Google Cloud Storage → Sanity picker. You run the sync command on your MacBook Pro; everything else is automatic.

---

## The mental model

1. **In Lightroom,** you organize approved photos into collections by region and city.
2. **You export** those collections to a folder on disk. The folder structure mirrors your collections.
3. **You run one command.** It reads metadata, converts to web-ready sizes, uploads to Google Cloud Storage, and updates the master index.
4. **Tracy and Amy** open Sanity Studio and see new photos in their library picker within 60 seconds.

No CMS uploads. No re-editing photo captions in two places. Metadata flows through — the caption you typed in Lightroom becomes the caption in Sanity.

---

## One-time Lightroom setup

### 1. Collection structure

In Lightroom Classic's Library module, create this collection hierarchy:

```
Collection Sets/
├── BMM Approved/
│   ├── Natchez/
│   │   ├── 2026-04 Arrie Session
│   │   ├── 2026-03 Inn Interiors
│   │   └── ...
│   ├── Memphis/
│   ├── Clarksdale/
│   ├── New Orleans/
│   ├── Vicksburg/
│   ├── Oxford/
│   ├── Greenville/
│   ├── Indianola/
│   ├── Tupelo/
│   ├── Helena/
│   ├── Tunica/
│   ├── Jackson/
│   ├── Yazoo City/
│   └── Uncategorized/
└── Bearsville Approved/
    ├── Woodstock/
    ├── Catskills/
    └── Studio C/
```

Each innermost collection is a **shoot** — one session, one location, one coherent body of work. Drag photos into the collection that matches where they were taken.

**Rule:** a photo is "approved" if it's in one of these collections. That's the entire approval signal. No color labels, no keyword flags, no star ratings.

### 2. Metadata in Lightroom (the important part)

For each photo, fill these fields in the **Metadata** panel:

| Lightroom field | What it becomes | Example |
|---|---|---|
| **Title** or **Caption** | Photo caption | "Arrie at the Blues Room, mid-song" |
| **Creator** or **Byline** | Credit line | "Chase Pierson / Big Muddy" |
| **Keywords** | Tags (see below) | `portrait`, `arrie-aslin`, `blues-room` |

### 3. Keyword vocabulary

Keywords do two things: they set the photo's **category** and they become searchable **subjects** Tracy and Amy can filter by.

**Category keywords (pick ONE per photo):**
- `city-guide` — city walkthroughs
- `feature` — long-form editorial
- `photo-essay` — image-led storytelling
- `interview` — portrait for an interview
- `food-drink` — food photography
- `music` — shows, instruments, musicians
- `venue` — buildings, interiors
- `portrait` — people close-up
- `landscape` — environment, scenery

**Subject keywords (as many as you want):**
- People: `arrie-aslin`, `tracy-allen`, `amy-allen`, `regina-charboneau`, etc.
- Places: `big-muddy-inn`, `blues-room`, `natchez-trace-parkway`, `biscuits-and-blues`, etc.
- Things: `mississippi-river`, `juke-joint`, `sunrise`, `neon-sign`, `vinyl`, etc.

Keywords are lowercase, hyphen-separated. Use the Lightroom Keyword Suggestions panel to avoid typos — once you've used `arrie-aslin` once, LR will auto-complete it forever.

**You do NOT need city/region keywords** — those come from the collection structure. If a photo is in `BMM Approved/Natchez/Arrie Session`, it's automatically tagged `big-muddy` + `natchez`.

### 4. Export preset

Create a Lightroom export preset named **"BMM Sync"** with these settings:

- **Export Location:** Specific folder → `/Users/chasethis/Pictures/BMM-Sync`
  - Check **"Put in Subfolder"** and set it to the collection name so each export overwrites cleanly
  - **OR** uncheck "Put in Subfolder" and use the **Export as Catalog → Preserve Folder Hierarchy** option to mirror your collections
- **File Naming:** Original filename (the sync script renames everything by content hash, so Lightroom's filename only matters for debugging)
- **File Settings:**
  - Image Format: **JPEG**
  - Quality: **95**
  - Color Space: **sRGB**
- **Image Sizing:**
  - Resize to Fit: **Long Edge**
  - **2400 pixels** (the sync script will resize down to three web sizes; 2400 gives it room)
  - Don't Enlarge: ✓
  - Resolution: 72 ppi
- **Output Sharpening:** Screen, Standard
- **Metadata:**
  - **⚠️ CRITICAL: Include "All Metadata"**, NOT "Copyright Only"
  - The whole point is that IPTC captions and keywords travel with the file. If you strip them, the sync script has nothing to read.
- **Watermarking:** off
- **Post-Processing:** Do nothing

Save that preset. From now on, exporting is two clicks: right-click a collection → Export → BMM Sync.

### 5. Target folder structure

After export, `~/Pictures/BMM-Sync/` should look like this:

```
~/Pictures/BMM-Sync/
├── big-muddy/
│   ├── natchez/
│   │   ├── 2026-04-arrie-session/
│   │   │   ├── DSC_0123.jpg
│   │   │   └── DSC_0124.jpg
│   │   └── 2026-03-inn-interiors/
│   └── memphis/
└── bearsville/
    └── woodstock/
```

The sync script reads this tree and derives `region / city / shoot` from the folder names. Lowercase, hyphen-separated.

**If Lightroom exports to a slightly different structure** (camel case, spaces), you have two options:
- **Option A:** Use Finder to rename the top folders to lowercase slugs before running sync (five seconds)
- **Option B:** Set up Lightroom's subfolder naming template to output the slug format directly

You can also manually reorganize once after export. It's a one-time bit of friction — after that, you can re-export to the same structure forever.

---

## Running the sync

After you export, open Terminal and run:

```bash
cd ~/hillbilly-dreams
pnpm tsx scripts/sync-approved.ts ~/Pictures/BMM-Sync/
```

What happens:

1. Walks your export folder tree
2. For each photo: reads metadata with `exifr`, computes a content hash, converts to three webp sizes (2400 / 1600 / 480 long edge), uploads all three plus a JSON sidecar to `gs://bmt-media-bigmuddy/approved/`
3. Updates `gs://bmt-media-bigmuddy/approved/index.json` — the master catalog
4. Prints a summary: N new, N skipped (unchanged by hash), N errored

Tracy and Amy's Sanity Studio picker will show the new photos within 60 seconds.

### Dry run

Before a big export, you can see what WOULD happen without touching GCS:

```bash
pnpm tsx scripts/sync-approved.ts ~/Pictures/BMM-Sync/ --dry-run
```

### Re-runs are safe

The sync is **content-hash based**. Running it twice on the same folder uploads nothing the second time — every file's hash already exists in the index. The only time new uploads happen is when:
- You add new photos to an existing shoot
- You re-edit a photo in Lightroom (new pixels → new hash → treated as a new photo in the library)
- You add a new shoot folder

This means you can re-export entire collections as often as you want without worrying about wasting bandwidth or duplicating storage.

---

## How it ends up in Sanity

Tracy or Amy is writing an article. They click the Hero Image field. They see a button: **"Big Muddy Photo Library"**. Click.

A modal opens showing all your synced photos as thumbnails. Filter controls at the top:
- **Region** → Big Muddy / Bearsville
- **City** → all 16 cities in the taxonomy
- **Category** → portrait / feature / photo-essay / etc.

Click any photo. It imports into the article with the Lightroom caption pre-filled, the credit line pre-filled, and the hotspot/crop controls fully functional (because Sanity re-hosts it on their CDN with transforms).

---

## Troubleshooting

**"Unknown file format" warning for some files**
The sync script uses `exifr` to read metadata. It handles JPEG, PNG, HEIC, TIFF, and — partially — WebP. If you export as JPEG (which is the preset) you'll never see this. WebP files sometimes trigger it because WebP metadata support is spotty; the photo still uploads, it just has no caption/credit/keywords.

**"0 kw · cap=✗"**
That photo has no keywords and no IPTC caption. Check the Lightroom export preset — it probably has "Minimize Embedded Metadata" or "Copyright Only" turned on. Re-export with "Include: All Metadata".

**"Permission denied" on GCS**
Run `gcloud auth application-default login` to refresh your credentials.

**The index.json is stale / Sanity picker isn't showing new photos**
The API route caches for 60 seconds via `next: { revalidate: 60 }`. Wait a minute and refresh the picker. If it's still stale after 2-3 minutes, something is wrong with the API route — check `bigmuddytouring.com/api/photo-library` directly in a browser, it should return JSON.

**"I deleted a photo from Lightroom but it's still in the library"**
The sync is **additive only**. It doesn't remove things from GCS when you remove them from Lightroom. For now, to remove a photo from the library, use `gsutil rm` on the three size variants + the JSON sidecar, then re-run sync to regenerate the index. Cleaner delete workflow is on the backlog.

---

## What to do today

1. Create the `BMM Approved` / `Bearsville Approved` collection structure in Lightroom Classic
2. Drag your existing approved photos into the right city collections
3. For the top 20-30 photos you actually want Tracy and Amy to have access to TODAY, add IPTC captions + credits + category/subject keywords in Lightroom's Metadata panel
4. Create the "BMM Sync" export preset
5. Export the whole `BMM Approved` collection set to `~/Pictures/BMM-Sync/`
6. Run `pnpm tsx scripts/sync-approved.ts ~/Pictures/BMM-Sync/`
7. Open `bigmuddytouring.com/studio` in an incognito tab, create a new Article, click Hero Image → Big Muddy Photo Library → verify your photos show up
8. Text Tracy and Amy: "library is live, go write something"

Steps 3 and 6 are the only steps you need to repeat for every future shoot. Everything else is one-time setup.
