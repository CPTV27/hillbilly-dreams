# Case Study: Bearsville — The Recording Studio That Became a Media Company

Utopia Studios sits on a wooded campus in Bearsville, New York, just outside Woodstock. It has been a recording studio for decades. The rooms are good. The engineers know what they're doing. The problem is the same one every independent studio has: the music industry stopped paying for studio time the way it used to, and the building costs money whether bands show up or not.

The standard answer is to rent the rooms cheaper, add a podcast package, maybe do some corporate events. Compete on price against every home studio with a Focusrite and a dream. That's the extraction trap applied to creative infrastructure — the building generates value, but the value leaves through platforms that take 30% and never set foot in the Hudson Valley.

## The Problem

A recording studio is a media production facility that only uses one of its capabilities. It has cameras, microphones, acoustically treated rooms, editing stations, and a crew that understands production. It records music. But it could record video. It could broadcast. It could publish. It could distribute.

The missing piece is not equipment or talent. It's organization. Nobody connected the recording studio to the magazine to the radio station to the directory to the booking circuit. Each one existed as a separate line item. Together, they're a regional media company.

## What We Built

Bearsville Creative is the media node for the Hudson Valley and Catskills region. Studio C Video is the production arm — camera rigs, multi-cam switching, wireless video, live broadcast. Tuthill Design handles branding and creative direction for realtors, architects, and interior designers in the area. All three operate from the Utopia campus.

The infrastructure:

- **Five-VLAN WiFi network** — public (captive portal with email capture), production (isolated for recording), client (roaming for session visitors). Ubiquiti gear. One outdoor AP covers the one-acre campus.
- **NAS cold storage** — Mac Studio syncs to a 7-bay UNAS Pro via ChronoSync. Deleted files stay on the NAS. NAS backs up to Google Drive. Three copies of everything: local, NAS, cloud.
- **Multi-camera broadcast** — DJI RS4 gimbals, Sony cameras, wireless video transmission, ATEM switching. Every session can be recorded, broadcast live, and archived. A recording session becomes radio content becomes magazine content becomes social clips.
- **Call sheet system** — digital session management built into the same platform that runs DSD. Session info, contacts, equipment lists, catering orders. Not a separate app. A module.

Total equipment owned outright: roughly $70,000-$80,000 in camera rigs, lighting, audio interfaces, switching gear. Day rate for a full cinema package: $4,500. Half-day competitive rate: $1,800. The margins are 35-45% at volume.

## The Math

Studio C pricing before the media company model: compete on hourly rates against home studios. Race to the bottom.

Studio C pricing after: the studio is the production facility for an entire regional media network. Every session recording feeds multiple channels. A band records an album — that's a recording session, a live broadcast, a radio segment, a magazine feature, a social media campaign, and a portfolio piece for the studio. One session, six outputs.

| Revenue Stream | Source | Per Session |
|---|---|---|
| Session fee | Client pays | $1,800 - $4,500 |
| Live broadcast | Restream to YouTube/Facebook | Audience growth |
| Radio content | Edited for Big Muddy Radio | Programming hours |
| Magazine feature | Written up for editorial | Content + ad revenue |
| Social clips | Cut for all platforms | Marketing value |
| Portfolio | Studio reel and case study | Future booking driver |

The studio doesn't need more clients. It needs more outputs per client. That's the coordination premium applied to creative infrastructure.

## What It Means

Every small town has underutilized creative infrastructure. A church with a sound system. A community center with a stage. A photographer with a studio. A radio station running on autopilot. The pieces are there. What's missing is the system that connects them into a production pipeline.

Bearsville proves that a recording studio can be a media company with the right plumbing. The same architecture that runs a Viacom can run a one-acre campus in the Catskills. The technology is identical. The scale is different. The organization is the product.

### Start This Week

1. Walk through the creative spaces in your town. Studios, stages, galleries, shops with back rooms. Count the hours they sit empty.
2. For each space, list what it could produce besides its primary use. A recording studio can shoot video. A gallery can host a podcast. A restaurant can be a venue.
3. Pick one space. Record one session. Cut it into five pieces: a full recording, a radio clip, a social post, a photo set, and a written feature. That's your proof of concept.
4. Show the space owner the five outputs from one session. Ask what they'd charge to do it again next week.
