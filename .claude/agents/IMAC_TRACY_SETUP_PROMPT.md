# Tracy's iMac Setup — Full Ecosystem Handoff

**Machine:** Tracy's iMac, 24GB RAM (freshly upgraded), 192.168.4.26, user: tracyfort
**Date:** April 8, 2026

---

## Who We Are

Hillbilly Dreams Inc — a media-hospitality ecosystem in Natchez, Mississippi. Chase Pierson is the CEO. Tracy Alderson-Allen is an equity partner who runs finance and Inn operations. Amy Allen is an equity partner who runs the Inn and bar.

**The origin story:** Chase got hired to promote Amy's band. They built a micro-media company to do it — a magazine, a record label, and a radio station. The CMS runs it largely autonomously. Now they're duplicating those tools for other applications.

**Tracy's role:** She manages the Big Muddy Inn (411 North Congress Street, Natchez), handles bookings, finances, and is the operations backbone. This iMac is her daily driver.

---

## The Fleet

| Machine | IP | User | SSH Key | Role |
|---|---|---|---|---|
| MacBook Pro | local | chasethis | — | Dev, code, deployment |
| Mac mini | 192.168.4.37 | ClawdBOT | ~/.ssh/id_mini | Broadcasting, Plex, services |
| Tracy's iMac | 192.168.4.26 | tracyfort | needs setup | Inn ops, hospitality, bookings |

---

## Task 1: SSH Access from MacBook Pro

Add this public key to ~/.ssh/authorized_keys so Chase's MacBook can manage this machine remotely:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL3FWdEhw+UJULM6J2Q5VyaVtmkcmTopoNs7rQNn2130 laptop-to-mini
```

Verify:
- ~/.ssh directory exists with permissions 700
- ~/.ssh/authorized_keys has permissions 600
- PubkeyAuthentication is enabled in /etc/ssh/sshd_config (check `grep PubkeyAuthentication /etc/ssh/sshd_config`)
- Remote Login is ON in System Settings → General → Sharing
- Test: from another terminal on this machine, `ssh tracyfort@localhost` should work without password

If PubkeyAuthentication is disabled, enable it:
```
sudo sed -i '' 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sudo launchctl stop com.openssh.sshd
sudo launchctl start com.openssh.sshd
```

---

## Task 2: Safari Bookmarks

Set Safari as the default browser. Add these to the Safari Favorites Bar:

**Hospitality (Daily Use):**
- Cloudbeds: https://us2.cloudbeds.com/connect/202687759294592#/calendar
- Airbnb Host: https://www.airbnb.com/hosting
- VRBO Host: https://www.vrbo.com/host
- Squarespace (Inn website): https://account.squarespace.com/

**Big Muddy (Check regularly):**
- Big Muddy Admin: https://bigmuddytouring.com/admin
- Asana: https://app.asana.com
- Big Muddy Entertainment: https://bigmuddyentertainment.com
- Big Muddy Magazine: https://bigmuddymagazine.com
- Big Muddy Touring: https://bigmuddytouring.com
- Big Muddy Radio: https://bigmuddyradio.com
- Deep South Directory: https://deepsouthdirectory.com

**Tools:**
- Gmail: https://mail.google.com
- Google Drive: https://drive.google.com

---

## Task 3: Mail App

Set up Apple Mail with Tracy's email: tracyaldersonallen@gmail.com
She should be able to check email from the Mail app without opening a browser.

---

## Task 4: System Optimization

This iMac has 24GB RAM — it's capable. But optimize for smooth daily use:
- System Settings → Accessibility → Display → Reduce motion, Reduce transparency
- Clean out Downloads folder
- Remove unnecessary startup items (System Settings → General → Login Items)
- Make sure software is updated

---

## Task 5: Kiosk Mode Options

Create a kiosk launcher Tracy can customize. Build ~/Desktop/BigMuddy-Kiosk.command (double-clickable) that:

1. Opens Safari in full screen
2. Loads tabs for: Cloudbeds, Asana, Big Muddy Admin, Airbnb, VRBO

Create ~/Desktop/kiosk-urls.txt where Tracy can edit the URL list herself.

Three modes (Tracy chooses):
- **Single screen** — just Cloudbeds calendar, full screen
- **Dashboard rotation** — cycles through tabs every 60 seconds
- **Normal** — just opens all the tabs, she switches manually

DON'T auto-start on boot. Let Tracy decide when to use kiosk mode.

To exit: Cmd+Q or close Safari normally.

---

## Task 6: Delta Dawn (AI Assistant)

Delta Dawn is the AI assistant for the Big Muddy ecosystem. Tracy can talk to it through:

- **Siri:** "Hey Siri, Big Muddy" — triggers a Siri Shortcut that talks to Delta Dawn
- **Web:** https://bigmuddytouring.com/dawn — chat interface in the browser
- **Voice:** There's a voice endpoint at the Mac mini (192.168.4.37)

Delta Dawn can answer questions about:
- Show schedule, bookings, revenue
- The corridor (13 cities, 735 venues)
- Business data from the constellation graph (8,548 nodes)
- Magazine content, radio schedule

Tracy should bookmark the Delta Dawn chat: https://bigmuddytouring.com/dawn

---

## Task 7: Key Services on the Network

These are running on the Mac mini (192.168.4.37) — Tracy can access them from Safari:

| Service | URL | What It Does |
|---|---|---|
| Plex | http://192.168.4.37:32400 | Media server — photo slideshows for the Inn lobby |
| Open Notebook | http://192.168.4.37:5055 | AI notebook for research |
| Postiz | http://192.168.4.37:4007 | Social media scheduling |
| Big Muddy Radio | http://192.168.4.37:8010 | Icecast streaming radio |

---

## Task 8: Report Back

When done, confirm:
- [ ] SSH key installed and working
- [ ] macOS version
- [ ] Hardware specs (model, RAM confirmed at 24GB, storage)
- [ ] Safari set as default with all bookmarks
- [ ] Mail app configured
- [ ] Kiosk launcher created
- [ ] What software is installed (Homebrew? Node? Anything else?)
