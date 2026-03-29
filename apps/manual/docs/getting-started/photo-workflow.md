---
title: Photo Workflow
sidebar_position: 2
---

# Photo Workflow

How to get photos from your phone or camera onto the website.

## The Short Version

1. Take the photo
2. Drop the file into the **BigMuddy-Dropbox/photos/** folder on the Mac
3. Wait 2 minutes
4. Find it in the Media Vault at `/admin/media`

That's it.

## Step by Step

### 1. Take the Photo

Use your phone or any camera. Tips:
- Landscape (horizontal) works best for the website
- Natural light is your friend
- Get the shot while it's happening — candid beats posed
- Take 3-5 versions so you have options

### 2. Drop It In the Folder

On the Mac, there's a folder on the desktop:

```
~/BigMuddy-Dropbox/photos/
```

Just drag your photo file into it. AirDrop from your phone works great for this.

You can also use these folders for other file types:
- `~/BigMuddy-Dropbox/documents/` — PDFs, menus, flyers
- `~/BigMuddy-Dropbox/videos/` — Video clips
- `~/BigMuddy-Dropbox/audio/` — Music, radio recordings

### 3. Wait 2 Minutes

A sync job runs every 2 minutes. It:
- Uploads your file to Google Cloud Storage
- Indexes it in the database
- Moves the original to a `.processed` folder so it doesn't sync again

### 4. Find It in Media Vault

Go to `bigmuddytouring.com/admin/media` in your browser.

Your photo should be there. You can:
- Search by filename
- Filter by folder
- Click to see the full URL
- Copy the URL to use on the website

## Troubleshooting

**Photo not showing up after 2 minutes?**
- Check Wi-Fi — the Mac needs internet to sync
- Check the folder name — make sure it's in `photos/`, not somewhere else
- Check that the file is an image (JPG, PNG, WebP)

**Photo looks wrong on the site?**
- The system auto-converts to WebP format for speed
- If colors look off, try the `/api/media/enhance` endpoint with the "editorial" preset
