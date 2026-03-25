# iOS Sovereign Swarm Shortcut Blueprint
To get the Swarm into your iPhone's Share Sheet, open the **Shortcuts** app and create exactly this sequence:

### Shortcut Name: Ask Swarm
**Icon:** Brain (Blue or Black background)
**Settings:** Turn ON "Show in Share Sheet".
**Accepts:** Text, URLs, PDFs, Media.

---

### Step 1: Text Conversion
*Action:* `Get text from [Shortcut Input]`

### Step 2: Set Variable 
*Action:* `Set variable [Payload] to [Text]`

### Step 3: Dictionary (JSON Construction)
*Action:* `Dictionary`
*Add new Text Item:* `query` -> `Variable: [Payload]`

### Step 4: Network Request (POST)
*Action:* `Get contents of URL`
*URL:* `https://measurablybetterthings.com/api/siri/analyze`
*Method:* `POST`
*Headers:*
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer SIRI-BMT-8842-X` (Change this to your actual `.env` key)
*Request Body:* `JSON` -> `Variable: Dictionary`

### Step 5: Read or Show Result
*Action:* `Get Dictionary Value`
*Key:* `text` in `Contents of URL`

*Action:* `Show Result` or `Speak Text` -> `Dictionary Value`

---
**Done.**
When you highlight text on Safari and hit "Share -> Ask Swarm", your iPhone will silently hit the Edge pipeline and return the generative answer in a native Apple bubble over the app you are currently using.
