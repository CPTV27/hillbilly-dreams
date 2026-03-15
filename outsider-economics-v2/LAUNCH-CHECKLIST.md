# Outsider Economics — Launch Checklist

Everything below requires your login. The code is done.

---

## 1. DNS & Hosting (5 min)

The app is already deployed — outsidereconomics.com just needs to point to it.

1. **Firebase Console** → App Hosting → Settings → Custom Domains
2. Add `outsidereconomics.com`
3. Firebase gives you a DNS target (CNAME or A record)
4. Go to your domain registrar and point `outsidereconomics.com` to that target
5. Wait for SSL provisioning (automatic, usually < 10 min)
6. Verify: `curl -I https://outsidereconomics.com` should return 200

**Note:** The middleware already handles `outsidereconomics*` hostnames. No code changes needed.

---

## 2. Substack Setup (15 min)

1. Create publication at `outsidereconomics.substack.com`
2. Set name: **Outsider Economics**
3. Tagline: *A field manual for independent economic systems*
4. Upload avatar/logo (use the same wave icon from the site)
5. Publish posts 1-3 (Substack-ready drafts are in `outsider-economics-v2/substack/`)
   - Paste each file's content into Substack's editor
   - Twitter hooks are included as comments at the bottom of each file — copy-paste when posting
6. Schedule posts 4-10 on whatever cadence you want (weekly recommended)

---

## 3. Social Accounts (10 min)

- Create `@OutsiderEcon` on Twitter/X
- Bio: *Your town isn't broke. It's uncoordinated. The math → outsidereconomics.com*
- Pin first tweet using Option B from twitter-hooks.md post 1
- Link Substack to Twitter for auto-sharing

---

## 4. Amazon Book Listing

- Verify the link works: https://www.amazon.com/dp/B0F2HZBZFZ
- Update book description to reference the website
- Add "Read the full series free at outsidereconomics.com" to the book's back matter if possible

---

## Already Done (no action needed)

- [x] Website: 5 pages, all rendering, OG metadata on every page
- [x] Content: 10 posts, ~22K words
- [x] Twitter hooks: 2-3 options per post
- [x] Content matrix: 30 rows seeded, all social posts generated
- [x] Voice guide: `outsider-economics-v2/VOICE-GUIDE.md`
- [x] Substack drafts: posts 1-3 formatted and ready to paste
- [x] Git: all committed and pushed to main
