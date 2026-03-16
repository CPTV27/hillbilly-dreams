# THE BIG MUDDY
## Google Ecosystem Migration Guide
### Quick Reference for Implementation

---

## AT A GLANCE: STACK COMPARISON

| Function | Original Stack | Google Ecosystem Stack | Monthly Cost |
|----------|---------------|----------------------|--------------|
| **CRM** | Airtable Pro ($20/mo/user) | Google Sheets + Apps Script | $0 |
| **Scheduling** | Cal.com Pro ($15/mo) | Google Calendar + Cal.com Pro | $15/mo |
| **Workflow Engine** | Make.com ($9/mo) | Google Apps Script + Make.com | $9/mo |
| **Communications** | Twilio + OpenPhone ($30/mo) | Gmail + Twilio | $30/mo |
| **AI Layer** | OpenAI API ($50/mo) | Gemini Advanced + Kimi | $30/mo |
| **Email Sequences** | ConvertKit ($29/mo) | Gmail + Apps Script | $0 |
| **Content Creation** | Canva Pro ($13/mo) | Canva Pro (existing) | $0 |
| **Storage** | Google Drive ($12/mo) | Google Drive (Workspace) | $0 |
| **Video/Meetings** | Zoom/Other | Google Meet | $0 |
| **Documentation** | Various | Google Docs/Sites | $0 |
| **Forms** | Typeform/JotForm | Google Forms | $0 |

**TOTAL SAVINGS: $115/month (57% reduction)**

---

## GOOGLE WORKSPACE SETUP CHECKLIST

### Step 1: Workspace Configuration (Day 1)

- [ ] **Create/Configure Google Workspace**
  - Set up admin console
  - Add Ambassador accounts
  - Configure email routing
  - Set up groups (ambassadors@, operations@, etc.)

- [ ] **Google Drive Structure**
  ```
  The Big Muddy (Shared Drive)
  ├── 01_OPERATIONS
  │   ├── CRM (Sheets)
  │   ├── SOPs (Docs)
  │   ├── Reports (Sheets)
  │   └── Analytics (Sheets)
  ├── 02_CONTENT
  │   ├── RAW_UPLOADS
  │   ├── EDITED
  │   ├── PUBLISHED
  │   └── ARCHIVE
  ├── 03_GUEST_EXPERIENCES
  │   ├── PHOTOS_BY_DATE
  │   ├── TESTIMONIALS
  │   └── PLAYLISTS
  ├── 04_MUSIC_MEDIA
  │   ├── RECORDINGS
  │   ├── TOUR_LOGISTICS
  │   └── ARTIST_RIDERS
  └── 05_BRAND
      ├── LOGOS_ASSETS
      ├── TEMPLATES
      └── PHOTO_LIBRARY
  ```

- [ ] **Google Calendar Setup**
  - Create shared calendars:
    - Guest Bookings
    - Artist Sessions
    - Content Shoots
    - Tours/Events
    - Staff Schedule
    - Maintenance
  - Set up calendar sharing permissions
  - Configure notifications

### Step 2: Master Sheets Workbook (Day 2-3)

Create **"The Big Muddy Operations Hub"** Google Sheets workbook with these tabs:

#### Sheet 1: PEOPLE (Master Database)
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| First_Name | Text | |
| Last_Name | Text | |
| Email | Text | Primary contact |
| Phone | Text | |
| Type | Dropdown | Guest/Artist/Partner/Prospect |
| Ambassador | Dropdown | Assigned Ambassador |
| Relationship_Score | Number | 0-100 (auto-calculated) |
| Tags | Multi-select | VIP, Musician, Local, Press, etc. |
| Created_Date | Date | |
| Last_Updated | Date | Auto |
| Notes | Text | |

#### Sheet 2: PREFERENCES (The Memory)
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| Person_ID | Lookup | Link to PEOPLE |
| Category | Dropdown | Food/Room/Music/Communication/etc |
| Preference | Text | Detail |
| Source | Dropdown | Stated/Observed/Inferred |
| Date_Learned | Date | |
| Confidence | Number | 0-1 |

#### Sheet 3: TOUCHES (Interaction History)
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| Person_ID | Lookup | Link to PEOPLE |
| Date | Date/Time | |
| Type | Dropdown | Stay/Call/Email/Social/Event |
| Ambassador | Dropdown | Who initiated |
| Notes | Text | Auto-summarized by Gemini |
| Sentiment | Dropdown | Positive/Neutral/Negative |
| Follow_Up_Required | Checkbox | |
| Follow_Up_Date | Date | |

#### Sheet 4: EVENTS (All Bookings)
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| Event_Type | Dropdown | Guest/Recording/Tour/Content |
| Title | Text | |
| Start_DateTime | Date/Time | |
| End_DateTime | Date/Time | |
| Attendees | Multi-lookup | Link to PEOPLE |
| Room_Space | Text | |
| Revenue_Stream | Dropdown | Hospitality/Music/Agency/Content |
| Revenue | Currency | |
| Status | Dropdown | Confirmed/In Progress/Completed/Cancelled |
| Notes | Text | |

#### Sheet 5: CONTENT_LIBRARY
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| File_ID | Text | Google Drive file ID |
| File_Name | Text | |
| Date_Created | Date | |
| Created_By | Dropdown | Ambassador |
| Type | Dropdown | Photo/Video/Audio/Text |
| Tags | Multi-select | |
| Quality_Score | Number | 0-10 (Gemini) |
| Status | Dropdown | Pending/Approved/Scheduled/Posted/Archived |
| Platforms | Multi-select | IG/FB/TikTok/YouTube/etc |
| Posted_Date | Date | |
| Performance | Text | Metrics JSON |

#### Sheet 6: CONTENT_CALENDAR
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| Date | Date | |
| Platform | Dropdown | |
| Content_ID | Lookup | Link to CONTENT_LIBRARY |
| Caption | Text | |
| Hashtags | Text | |
| Status | Dropdown | Draft/Scheduled/Posted |
| Posted_By | Dropdown | Ambassador |

#### Sheet 7: TASKS
| Column | Type | Description |
|--------|------|-------------|
| ID | Auto | Unique identifier |
| Task | Text | |
| Assigned_To | Dropdown | Ambassador |
| Due_Date | Date | |
| Priority | Dropdown | High/Medium/Low |
| Status | Dropdown | Not Started/In Progress/Complete |
| Related_To | Lookup | Link to PEOPLE or EVENT |
| Notes | Text | |

### Step 3: Google Apps Script Foundation (Day 4-5)

**Create Apps Script project linked to Operations Hub**

Core functions to build:

```javascript
// 1. MORNING BRIEF GENERATOR
function sendMorningBrief() {
  // Runs daily at 7 AM
  // Gets today's events
  // Generates personalized brief for each Ambassador
  // Sends via Gmail + Google Chat
}

// 2. PRE-ARRIVAL SEQUENCE
function sendPreArrivalSequence() {
  // Runs daily at 8 AM
  // Checks for arrivals in next 7 days
  // Sends Day -7, -3, -1 emails
}

// 3. RELATIONSHIP WARMTH ENGINE
function relationshipWarmthEngine() {
  // Runs daily at 9 AM
  // Finds people with low relationship scores
  // Generates touch suggestions via Gemini
  // Sends to Ambassador for approval
}

// 4. CONTENT PROCESSOR
function processNewContent() {
  // Triggered by new file in Drive
  // Uses Gemini Vision to analyze
  // Adds to library with tags
  // Notifies Ambassador if high quality
}

// 5. SENTIMENT ANALYZER
function analyzeSentiment() {
  // Runs daily at 10 PM
  // Analyzes recent communications
  // Alerts if negative sentiment detected
}

// 6. CHAT BOT HANDLER
function onChatMessage(event) {
  // Handles Google Chat commands
  // Routes to appropriate function
}
```

### Step 4: Gemini Integration (Day 6-7)

**Set up Gemini API access:**

1. Go to Google AI Studio (aistudio.google.com)
2. Create API key
3. Add to Apps Script as script property
4. Test basic prompts

**Core Gemini Functions:**

```javascript
function callGemini(prompt) {
  const API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };
  
  const response = UrlFetchApp.fetch(url, {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
  
  const result = JSON.parse(response.getContentText());
  return result.candidates[0].content.parts[0].text;
}
```

### Step 5: Forms & Intake (Day 8)

**Create Google Forms:**

1. **Guest Booking Intake Form**
   - Basic info (name, email, phone, dates)
   - Preferences (coffee, dietary, room temp)
   - Interests (music, attractions, occasions)
   - Content consent (checkboxes)
   - Submit → Auto-populates PEOPLE and PREFERENCES sheets

2. **Artist Session Intake Form**
   - Band/artist info
   - Session dates
   - Rider requirements
   - Content permissions
   - Technical needs

3. **Content Moment Logger**
   - Quick form for Ambassadors
   - Date/time
   - Description
   - People involved
   - Priority level

4. **Guest Feedback Form**
   - Post-stay survey
   - NPS score
   - Favorite moments
   - Improvement suggestions
   - Testimonial permission

### Step 6: Communications Setup (Day 9-10)

**Gmail Configuration:**

- [ ] Create email templates in Gmail
  - Booking confirmation
  - Pre-arrival (Day -7, -3, -1)
  - Welcome message
  - Daily check-in
  - Checkout/follow-up
  - Post-stay nurture

- [ ] Set up Gmail labels:
  - BOOKINGS
  - GUEST_COMMS
  - ARTIST_COMMS
  - PARTNERSHIPS
  - CONTENT_APPROVALS
  - SYSTEM_ALERTS

- [ ] Configure filters for auto-labeling

**Google Chat Setup:**

- [ ] Create "The Big Muddy Operations" space
- [ ] Add all Ambassadors
- [ ] Add @Muddy bot
- [ ] Set up notification preferences

**Twilio Integration:**

- [ ] Set up Twilio account
- [ ] Get phone number
- [ ] Configure webhook to Google Apps Script
- [ ] Test SMS sending/receiving

### Step 7: Content Pipeline (Day 11-12)

**Google Drive Content Folders:**

```
CONTENT (Shared Drive)
├── 01_RAW_UPLOADS
│   └── Auto-upload from Ambassador phones
├── 02_PROCESSING
│   └── Gemini-analyzed, pending approval
├── 03_APPROVED
│   └── Ready for scheduling
├── 04_SCHEDULED
│   └── On content calendar
├── 05_PUBLISHED
│   └── Posted content archive
└── 06_TEMPLATES
    └── Canva templates, brand assets
```

**Apps Script Content Automation:**

```javascript
// Trigger: New file in 01_RAW_UPLOADS
function processContentUpload(file) {
  // 1. Get file from Drive
  // 2. Send to Gemini Vision for analysis
  // 3. Extract: quality score, tags, caption ideas
  // 4. Move to 02_PROCESSING
  // 5. Add to CONTENT_LIBRARY sheet
  // 6. Notify Ambassador if quality > 7
}
```

**Canva Pro Integration:**

- [ ] Connect Canva to Google Drive
- [ ] Set up brand kit
- [ ] Create templates for each platform
- [ ] Share templates with Ambassadors

### Step 8: Testing & Training (Day 13-14)

**Test Scenarios:**

1. New booking → Intake form → CRM → Pre-arrival emails
2. Guest arrival → Morning brief → Check-in → Preference capture
3. Content moment → Voice memo → Process → Approve → Schedule
4. Guest checkout → Follow-up email → Review request → Nurture
5. Relationship warmth alert → Ambassador action → Touch logged

**Ambassador Training:**

- [ ] Google Chat commands walkthrough
- [ ] Gmail labels and templates
- [ ] Sheets navigation (view-only for most)
- [ ] Drive content upload process
- [ ] Voice memo to CRM workflow
- [ ] Emergency escalation

---

## AMBASSADOR QUICK REFERENCE

### Google Chat Commands

| Command | What It Does |
|---------|--------------|
| `brief` or `today` | Get morning brief |
| `profile [name]` | Look up guest/artist |
| `content: [description]` | Log content moment |
| `note: [name] loves [thing]` | Add preference |
| `draft [name] [topic]` | AI draft message |
| `approve [ID]` | Approve content |
| `tasks` | View your tasks |
| `help` | Show all commands |

### Voice Memo Format

Send email to: **muddy@thebigmuddy.com**
Subject: `VOICE [type]`

Types:
- `PREF` - Preference learned
- `CONTENT` - Content opportunity
- `NOTE` - General note
- `TASK` - Task for later

Body: Voice memo or transcript

### Email Response Codes

When guests reply to automated emails, system understands:

- `"1", "2", "3", "4", "5"` - Rating response
- `"Yes"` or `"No"` - Confirmation
- `"Book"` or `"Reserve"` - Intent to book
- `"Cancel"` - Cancellation
- `"Question"` or `"?"` - Needs human

---

## GOOGLE APPS SCRIPT TRIGGERS

Set these up in Apps Script:

| Function | Trigger | Frequency |
|----------|---------|-----------|
| `sendMorningBrief` | Time-based | Daily, 7:00 AM |
| `sendPreArrivalSequence` | Time-based | Daily, 8:00 AM |
| `relationshipWarmthEngine` | Time-based | Daily, 9:00 AM |
| `analyzeSentiment` | Time-based | Daily, 10:00 PM |
| `generateWeeklyCalendar` | Time-based | Weekly, Sunday 6:00 PM |
| `analyzeContentPerformance` | Time-based | Weekly, Monday 9:00 AM |
| `learnGuestPreferences` | Time-based | Monthly, 1st, 10:00 AM |
| `predictBookings` | Time-based | Weekly, Monday 8:00 AM |
| `processNewContent` | Drive trigger | On new file upload |
| `onFormSubmit` | Form trigger | On form submission |
| `onChatMessage` | Chat trigger | On chat message |

---

## TROUBLESHOOTING

### Common Issues

**Issue: Morning brief not sending**
- Check trigger is enabled in Apps Script
- Verify Ambassador emails in PEOPLE sheet
- Check execution log for errors

**Issue: Gemini not responding**
- Verify API key in script properties
- Check quota limits (Google AI Studio)
- Review prompt format

**Issue: Content not processing**
- Verify Drive trigger is enabled
- Check folder permissions
- Review execution log

**Issue: Chat bot not responding**
- Verify bot is added to Chat space
- Check bot permissions
- Review event handling code

---

## NEXT STEPS

1. **Review this guide** with your technical lead
2. **Set up Google Workspace** if not already done
3. **Create the master Sheets workbook** with all tabs
4. **Write core Apps Script functions** (start with morning brief)
5. **Test with one Ambassador** before full rollout
6. **Iterate based on feedback** before Phase 2

---

## SUPPORT RESOURCES

- **Google Apps Script Documentation**: developers.google.com/apps-script
- **Gemini API Documentation**: ai.google.dev
- **Google Workspace Learning Center**: support.google.com/a/users
- **Make.com Documentation**: make.com/en/help

---

*This migration guide gets you from zero to fully operational on Google ecosystem in 14 days.*
