#!/usr/bin/env python3
"""
Build the Big Muddy Radio playlist for ezstream.

Reads music from /Volumes/T7/Music/BigMuddy-Radio-Library (or whatever the
other agent put together in ~/bigmuddy-radio/playlist.txt), shuffles, then
interleaves with station ID stingers.

Default cadence: a stinger after every single track, rotating through all
available stingers so the same character never plays twice in a row until
the full rotation has cycled.

Output: /Users/ClawdBOT/broadcasting/bigmuddy-playlist.m3u

Usage:
    python3 build-playlist.py [--tracks-source /path] [--stinger-dir /path] [--every N]
    python3 build-playlist.py --every 1    # stinger after every track (default)
    python3 build-playlist.py --every 2    # stinger every other track
    python3 build-playlist.py --every 0    # no stingers (music only)

Run this again whenever the music library or stinger set changes. ezstream
will pick up the new playlist on its next crash/restart cycle. Kill the
screen session `bigmuddy-radio` or run `/Users/ClawdBOT/broadcasting/boot-radio.sh`
to force a reload.
"""
import argparse, os, random, sys

DEFAULT_TRACKS_SOURCE = "/Users/ClawdBOT/bigmuddy-radio/playlist.txt"
DEFAULT_LIBRARY = "/Volumes/T7/Music/BigMuddy-Radio-Library"
DEFAULT_STINGER_DIR = "/Users/ClawdBOT/bigmuddy-radio/stingers"
DEFAULT_OUTPUT = "/Users/ClawdBOT/broadcasting/bigmuddy-playlist.m3u"
DEFAULT_EVERY = 1  # stinger after every single track
EXTS = (".mp3", ".flac", ".m4a", ".wav", ".ogg")


def tracks_from_source_file(path):
    """Read a file-list (one path per line, optionally wrapped in file '...')."""
    out = []
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line.startswith("file '") and line.endswith("'"):
                out.append(line[6:-1])
            elif line and not line.startswith("#"):
                out.append(line)
    return out


def tracks_from_library(root):
    out = []
    for dirpath, _, files in os.walk(root):
        for f in files:
            if f.lower().endswith(EXTS) and not f.startswith("."):
                out.append(os.path.join(dirpath, f))
    return out


def rotation_deck(items):
    """
    Infinite generator that yields items in a shuffled no-repeat rotation.

    Each "deck" is a fresh shuffle of all items. When the deck runs out,
    a new shuffled deck is dealt, with a guard that the first card of the
    new deck can't equal the last card of the previous deck (so there's
    never an immediate repeat at the seam).
    """
    if not items:
        return
    last = None
    while True:
        deck = list(items)
        random.shuffle(deck)
        # Prevent a repeat at the seam between decks
        if last is not None and len(deck) > 1 and deck[0] == last:
            # Swap first with a random later position
            swap_idx = random.randint(1, len(deck) - 1)
            deck[0], deck[swap_idx] = deck[swap_idx], deck[0]
        for item in deck:
            yield item
            last = item


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--tracks-source", default=DEFAULT_TRACKS_SOURCE)
    p.add_argument("--library", default=DEFAULT_LIBRARY)
    p.add_argument("--stinger-dir", default=DEFAULT_STINGER_DIR)
    p.add_argument("--output", default=DEFAULT_OUTPUT)
    p.add_argument("--every", type=int, default=DEFAULT_EVERY,
                   help="inject a stinger every N tracks (1 = after every track, 0 = no stingers)")
    args = p.parse_args()

    if os.path.isfile(args.tracks_source):
        tracks = tracks_from_source_file(args.tracks_source)
        source = args.tracks_source
    elif os.path.isdir(args.library):
        tracks = tracks_from_library(args.library)
        source = args.library
    else:
        print(f"ERROR: neither {args.tracks_source} nor {args.library} exists", file=sys.stderr)
        sys.exit(1)

    stingers = sorted(
        os.path.join(args.stinger_dir, f)
        for f in os.listdir(args.stinger_dir)
        if f.lower().endswith(".mp3")
    ) if os.path.isdir(args.stinger_dir) else []

    random.shuffle(tracks)
    stinger_deck = rotation_deck(stingers)

    out = []
    stinger_count = 0
    for i, t in enumerate(tracks):
        out.append(t)
        # Insert a stinger after every N tracks (args.every). 0 disables.
        if stingers and args.every > 0 and (i + 1) % args.every == 0:
            out.append(next(stinger_deck))
            stinger_count += 1

    with open(args.output, "w") as f:
        f.write("#EXTM3U\n")
        for p in out:
            f.write(f"{p}\n")

    cadence_desc = (
        f"every {args.every} track(s)"
        if args.every > 0
        else "disabled (music only)"
    )
    print(f"tracks source:    {source}")
    print(f"tracks:           {len(tracks)}")
    print(f"stingers available: {len(stingers)} (no-repeat rotation)")
    print(f"stinger cadence:  {cadence_desc}")
    print(f"stingers inserted: {stinger_count}")
    print(f"written:          {args.output} ({len(out)} items)")


if __name__ == "__main__":
    main()
