# Big Muddy Content Capture — Apple Shortcuts Suite

> iPhone-first workflows for getting photos, video, and audio into the content pipeline.
> All shortcuts POST to the same Google Apps Script endpoint pattern as Delta Dawn.

---

## The Suite (5 Shortcuts)

### 1. "Muddy Snap" — Photo Capture
**What it does:** Take a photo (or select from library), add a caption, tag it by brand/location, upload to the pipeline.

**Shortcut Steps:**
1. **Choose from Menu** — "Take Photo" / "Choose from Library"
   - If Take Photo → **Take Photo** (front or back camera)
   - If Choose → **Select Photos** (limit: 10, select multiple: ON)
2. **Ask for Input** — Prompt: "Caption this?" / Type: Text
3. **Choose from Menu** — "What's this for?"
   - Inn / Blues Room / Magazine / Radio / Touring / Directory / Other
4. **Ask for Input** — Prompt: "Location?" / Type: Text / Default: "Natchez, MS"
5. **Resize Image** — Width: 2400 (preserves aspect ratio, manageable upload size)
6. **Convert to JPEG** — Quality: 85%
7. **Set Name** — `BMT_[date]_[time]_[brand].jpg`
8. **Save to Files** — iCloud Drive/Big Muddy/Photos/
9. **Get Contents of URL** — POST to endpoint:
   ```json
   {
     "from": "[user_name]",
     "type": "photo",
     "brand": "[selected_brand]",
     "caption": "[caption_text]",
     "location": "[location]",
     "filename": "[generated_filename]",
     "icloud_path": "[saved_path]"
   }
   ```
10. **Show Notification** — "Photo uploaded to the pipeline!"

**Pro tip:** Turn on "Show in Share Sheet" so you can send photos from the Photos app directly.

---

### 2. "Muddy Roll" — Video Capture
**What it does:** Record a video (or select existing), tag it, upload to pipeline. Compresses for fast upload.

**Shortcut Steps:**
1. **Choose from Menu** — "Record Now" / "Choose from Library"
   - If Record → **Take Video** (back camera, quality: Medium)
   - If Choose → **Select Files** (type: Videos)
2. **Encode Media** — Size: 1080p, Speed: Normal (compresses large files)
3. **Ask for Input** — "What is this?" / Type: Text
4. **Choose from Menu** — "Type?"
   - Performance / Interview / B-Roll / Walk-through / Testimonial / Other
5. **Choose from Menu** — "Brand?"
   - Inn / Blues Room / Magazine / Radio / Touring / Directory
6. **Set Name** — `BMT_VID_[date]_[time].mp4`
7. **Save to Files** — iCloud Drive/Big Muddy/Video/
8. **Get Contents of URL** — POST to endpoint:
   ```json
   {
     "from": "[user_name]",
     "type": "video",
     "brand": "[selected_brand]",
     "video_type": "[performance/interview/etc]",
     "description": "[description]",
     "filename": "[filename]",
     "icloud_path": "[saved_path]"
   }
   ```
9. **Show Notification** — "Video queued for processing!"

**For performances:** Use "Record Now" → point at the artist → the pipeline handles the rest (color grade, audio sync, clip cutting).

---

### 3. "Muddy Mic" — Audio Capture
**What it does:** Record audio directly or select a file. For podcast episodes, voice memos, ambient sound.

**Shortcut Steps:**
1. **Choose from Menu** — "Record Now" / "Choose Audio File"
   - If Record → **Record Audio** (quality: High, auto-stop: OFF — tap stop when done)
   - If Choose → **Select Files** (type: Audio)
2. **Ask for Input** — "What is this?" / Type: Text
3. **Choose from Menu** — "Type?"
   - Podcast / Voice Memo / Performance / Ambient / Interview
4. **Set Name** — `BMT_AUDIO_[date]_[time].m4a`
5. **Save to Files** — iCloud Drive/Big Muddy/Audio/
6. **Get Contents of URL** — POST to endpoint:
   ```json
   {
     "from": "[user_name]",
     "type": "audio",
     "audio_type": "[podcast/voice_memo/etc]",
     "description": "[description]",
     "filename": "[filename]",
     "icloud_path": "[saved_path]"
   }
   ```
7. **Show Notification** — "Audio saved and queued!"

**Podcast workflow:** Record → it saves to iCloud → pipeline picks it up → runs through mastering chain (HPF, compression, EQ, loudnorm -16 LUFS) → uploads mastered version to Drive Raw folder.

---

### 4. "Muddy Scout" — Business Directory Photo Kit
**What it does:** Guided photo session for directory businesses. Walks the owner through exactly what shots to take.

**Shortcut Steps:**
1. **Ask for Input** — "Business name?" / Type: Text
2. **Ask for Input** — "City?" / Type: Text / Default: "Natchez, MS"
3. **Choose from Menu** — "Business type?"
   - Restaurant / Venue / Hotel / Shop / Tour / Service
4. **Show Alert** — Based on business type, show specific shot list:

   **Restaurant shots:**
   > "We need 6 photos. I'll walk you through each one."
   > 1. "HERO: Stand outside, step back. Get the full front of the building with the sign."
   > 2. "INTERIOR: From the entrance looking in. Show the vibe."
   > 3. "SIGNATURE DISH: Your best seller. Natural light. No flash. Plate it nice."
   > 4. "THE KITCHEN: Action shot. Someone cooking. Steam is good."
   > 5. "THE TEAM: Your people. Smiling. In uniform if you have one."
   > 6. "THE DETAIL: Something that makes you different. The sign, the mural, the view."

   **Venue shots:**
   > 1. "HERO: The stage. Lit if possible."
   > 2. "CAPACITY: From the back, full room view."
   > 3. "PERFORMER: If someone's playing, get the shot."
   > 4. "THE BAR: Where people order."
   > 5. "THE CROWD: Energy. People having fun."
   > 6. "THE SIGN: Your name. Outside."

   **Hotel shots:**
   > 1. "HERO: Front of building. Step back. Full facade."
   > 2. "BEST ROOM: Made up. Pillows fluffed. Natural light."
   > 3. "LOBBY/COMMON: Where guests hang out."
   > 4. "THE VIEW: Whatever guests see that makes them stay."
   > 5. "BATHROOM: Clean. Towels folded. Lights on."
   > 6. "THE DETAIL: The thing guests photograph and post."

5. **Repeat 6 times:**
   - **Show Alert** — Show the current shot instruction
   - **Take Photo** — Back camera
   - **Resize Image** — 2400px wide
   - **Convert to JPEG** — Quality: 85%
   - **Add to Variable** — photos_collection
6. **Combine Images** — Grid (2x3) for preview
7. **Quick Look** — Preview the grid
8. **Save All to Files** — iCloud Drive/Big Muddy/Directory/[business_name]/
9. **Get Contents of URL** — POST manifest to endpoint:
   ```json
   {
     "from": "[user_name]",
     "type": "directory_scout",
     "business_name": "[name]",
     "business_type": "[type]",
     "city": "[city]",
     "photo_count": 6,
     "icloud_folder": "[path]"
   }
   ```
10. **Show Notification** — "6 photos captured for [business]. The AI team will enhance them!"

---

### 5. "Muddy Drop" — iCloud Link Ingestion
**What it does:** Paste an iCloud share link, and the pipeline downloads + processes everything in it.

**Shortcut Steps:**
1. **Receive Input** — from Share Sheet (URLs, Text)
   - OR **Ask for Input** — "Paste the iCloud link" / Type: URL
2. **Get Contents of URL** — Fetch the iCloud share page
3. **Get Contents of URL** — POST to endpoint:
   ```json
   {
     "from": "[user_name]",
     "type": "icloud_link",
     "url": "[icloud_url]",
     "note": "[optional_note]"
   }
   ```
4. **Show Notification** — "Link sent to the pipeline. We'll download and process it."

**Backend:** The Google Apps Script logs the link. A Cloud Function (or GA) fetches the shared iCloud content, downloads it, and routes it to the appropriate Raw subfolder on Drive.

---

## Automation Triggers (Background)

These run automatically without user interaction:

### Auto-Upload New Photos
- **Automation trigger:** "When I take a photo" (or time-based, every night at 2am)
- **Filter:** Photos taken today tagged with "Big Muddy" (requires user to tag in Photos app)
- **Action:** Run "Muddy Snap" in background

### Post-Show Auto-Capture
- **Automation trigger:** When leaving a location (geofence around The Big Muddy Inn)
- **Filter:** After 10pm (show is over)
- **Action:** Show notification: "Capture any content from tonight's show?"
  - If tapped → Open "Muddy Roll" or "Muddy Snap"

### Weekly Content Reminder
- **Automation trigger:** Every Monday at 9am
- **Action:** Show notification: "Time to capture this week's content. What do you have?"
  - Tap → Open menu with all 5 shortcuts

---

## iCloud Folder Structure

```
iCloud Drive/
└── Big Muddy/
    ├── Photos/        ← Muddy Snap saves here
    ├── Video/         ← Muddy Roll saves here
    ├── Audio/         ← Muddy Mic saves here
    └── Directory/     ← Muddy Scout saves here (by business name)
        ├── Bordeaux's/
        ├── The Burn/
        └── ...
```

These folders sync to iCloud automatically. The Google Apps Script endpoint logs the metadata. A Cloud Function monitors the Drive Raw folder and processes new assets.

---

## Google Apps Script Endpoint Updates Needed

The existing endpoint at `AKfycbw7pcZ7_OwTr7...` needs new handlers for:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  switch(data.type) {
    case 'note':     handleNote(data); break;
    case 'question': handleQuestion(data); break;
    case 'photo':    handlePhoto(data); break;    // NEW
    case 'video':    handleVideo(data); break;    // NEW
    case 'audio':    handleAudio(data); break;    // NEW
    case 'directory_scout': handleScout(data); break; // NEW
    case 'icloud_link': handleICloudLink(data); break; // NEW
  }
}
```

Each handler logs to a Google Sheet ("Content Pipeline" tab) and optionally triggers a Cloud Function for processing.

---

## Setup Instructions for Tracy & Amy

Same format as the Delta Dawn shortcut doc:

1. Open Shortcuts app
2. Tap + to create new shortcut
3. Name it (e.g., "Muddy Snap")
4. Follow steps above
5. Add to Home Screen for one-tap access

**Home screen layout suggestion:**
```
┌─────────┬─────────┬─────────┐
│  Muddy  │  Muddy  │  Muddy  │
│  Snap   │  Roll   │   Mic   │
│   📸    │   🎬    │   🎙️   │
├─────────┼─────────┼─────────┤
│  Muddy  │  Muddy  │  Delta  │
│  Scout  │  Drop   │  Dawn   │
│   🏪    │   ☁️    │   📝   │
└─────────┴─────────┴─────────┘
```
