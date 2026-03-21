#!/usr/bin/env python3
"""
Radio Big Muddy — Podcast Clip Cutter for DaVinci Resolve

Reads clip suggestions from the content engine JSON, creates individual
timelines in Resolve for each clip, applies a LUT, adds text overlays,
and queues render jobs for both vertical (9:16) and horizontal (16:9).

Requirements:
  - DaVinci Resolve must be running (Studio or Free)
  - Scripting must be enabled: Preferences → System → General → External scripting using: Local
  - Python path must include Resolve's scripting modules

Usage:
  # From Resolve's Console or with PYTHONPATH set:
  python3 podcast-clip-cutter.py --episode 1 --video ~/Desktop/ep1-ronin-primary.mp4

  # With all options:
  python3 podcast-clip-cutter.py \
    --episode 1 \
    --video ~/Desktop/ep1-ronin-primary.mp4 \
    --content ~/bmt/experiments/results/podcast-content/ep1-content.json \
    --lut ~/Desktop/LR-Grade-Stills/blues-room-grade.cube \
    --output ~/Desktop/podcast-clips \
    --render
"""

import sys
import os
import json
import argparse
import time
import re

# ---------------------------------------------------------------------------
# Resolve module import
# ---------------------------------------------------------------------------

RESOLVE_MODULES = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules/"

if RESOLVE_MODULES not in sys.path:
    sys.path.append(RESOLVE_MODULES)

try:
    import DaVinciResolveScript as bmd
except ImportError:
    print("ERROR: Cannot import DaVinciResolveScript.")
    print(f"Expected at: {RESOLVE_MODULES}")
    print("Make sure DaVinci Resolve is installed and scripting is enabled.")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Timestamp helpers
# ---------------------------------------------------------------------------

def timestamp_to_seconds(ts: str) -> float:
    """Convert 'MM:SS' or 'HH:MM:SS' to seconds."""
    parts = ts.strip().split(":")
    parts = [float(p) for p in parts]
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    elif len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    return 0.0


def seconds_to_frames(seconds: float, fps: float = 24.0) -> int:
    """Convert seconds to frame count at given FPS."""
    return int(round(seconds * fps))


def seconds_to_tc(seconds: float, fps: float = 24.0) -> str:
    """Convert seconds to HH:MM:SS:FF timecode string."""
    total_frames = int(round(seconds * fps))
    ff = total_frames % int(fps)
    total_seconds = total_frames // int(fps)
    ss = total_seconds % 60
    mm = (total_seconds // 60) % 60
    hh = total_seconds // 3600
    return f"{hh:02d}:{mm:02d}:{ss:02d}:{ff:02d}"


# ---------------------------------------------------------------------------
# Clip data loader
# ---------------------------------------------------------------------------

def load_clip_suggestions(content_path: str) -> list:
    """Load video clip suggestions from content engine JSON."""
    with open(content_path, "r") as f:
        data = json.load(f)

    clips = data.get("video_clips", [])
    parsed = []

    for i, clip in enumerate(clips):
        start_sec = timestamp_to_seconds(clip["start_approx"])
        end_sec = timestamp_to_seconds(clip["end_approx"])

        # Add 2-second handles on each side for flexibility
        handle = 2.0
        start_with_handle = max(0, start_sec - handle)
        end_with_handle = end_sec + handle

        parsed.append({
            "index": i + 1,
            "description": clip["segment_description"],
            "caption": clip["caption"],
            "why": clip.get("why_it_works", ""),
            "start_sec": start_sec,
            "end_sec": end_sec,
            "start_with_handle": start_with_handle,
            "end_with_handle": end_with_handle,
            "duration_sec": end_sec - start_sec,
        })

    return parsed


# ---------------------------------------------------------------------------
# Resolve automation
# ---------------------------------------------------------------------------

class ResolveClipCutter:
    """Manages DaVinci Resolve project, timelines, and render jobs."""

    def __init__(self, episode: int, video_path: str, lut_path: str = None,
                 output_dir: str = None, fps: float = 24.0):
        self.episode = episode
        self.video_path = os.path.expanduser(video_path)
        self.lut_path = os.path.expanduser(lut_path) if lut_path else None
        self.output_dir = os.path.expanduser(output_dir) if output_dir else os.path.expanduser("~/Desktop/podcast-clips")
        self.fps = fps

        # Connect to Resolve
        self.resolve = bmd.scriptapp("Resolve")
        if not self.resolve:
            raise RuntimeError(
                "Cannot connect to DaVinci Resolve. "
                "Make sure it's running and scripting is enabled in "
                "Preferences → System → General → External scripting using: Local"
            )

        self.pm = self.resolve.GetProjectManager()
        self.project = None
        self.mediapool = None
        self.source_clip = None

    def setup_project(self):
        """Create or open the clip cutter project."""
        project_name = f"EP{self.episode} Podcast Clips"

        # Try to open existing project
        self.project = self.pm.LoadProject(project_name)

        if not self.project:
            # Create new project
            self.project = self.pm.CreateProject(project_name)
            if not self.project:
                raise RuntimeError(f"Cannot create project '{project_name}'. "
                                   "Close any open project in Resolve and try again.")

        # Set project settings for 24fps
        self.project.SetSetting("timelineFrameRate", str(int(self.fps)))
        self.project.SetSetting("timelineResolutionWidth", "1920")
        self.project.SetSetting("timelineResolutionHeight", "1080")

        self.mediapool = self.project.GetMediaPool()
        print(f"✓ Project: {project_name}")
        return self

    def import_media(self):
        """Import the source video into the media pool."""
        if not os.path.exists(self.video_path):
            raise FileNotFoundError(f"Video not found: {self.video_path}")

        # Import via MediaStorage
        ms = self.resolve.GetMediaStorage()
        items = ms.AddItemListToMediaPool(self.video_path)

        if items and len(items) > 0:
            self.source_clip = items[0]
            print(f"✓ Imported: {os.path.basename(self.video_path)}")
        else:
            # Clip may already be in pool — search for it
            root = self.mediapool.GetRootFolder()
            clips = root.GetClipList()
            basename = os.path.basename(self.video_path)
            for clip in (clips or []):
                if clip.GetClipProperty("File Name") == basename:
                    self.source_clip = clip
                    print(f"✓ Found in pool: {basename}")
                    break

        if not self.source_clip:
            raise RuntimeError(f"Failed to import or find: {self.video_path}")

        return self

    def create_clip_timeline(self, clip_data: dict, orientation: str = "horizontal"):
        """
        Create a timeline for one clip suggestion.

        orientation: 'horizontal' (16:9, 1920x1080) or 'vertical' (9:16, 1080x1920)
        """
        idx = clip_data["index"]
        suffix = "H" if orientation == "horizontal" else "V"
        timeline_name = f"EP{self.episode}_Clip{idx}_{suffix}"

        # Calculate frame range
        start_frame = seconds_to_frames(clip_data["start_with_handle"], self.fps)
        end_frame = seconds_to_frames(clip_data["end_with_handle"], self.fps)

        # Create timeline with subclip approach
        # First create an empty timeline, then append a trimmed clip
        clip_info = {
            "mediaPoolItem": self.source_clip,
            "startFrame": start_frame,
            "endFrame": end_frame,
        }

        timeline = self.mediapool.CreateTimelineFromClips(timeline_name, [clip_info])

        if not timeline:
            # Fallback: create empty timeline and try appending
            timeline = self.mediapool.CreateEmptyTimeline(timeline_name)
            if timeline:
                self.project.SetCurrentTimeline(timeline)
                self.mediapool.AppendToTimeline([clip_info])

        if not timeline:
            print(f"  ✗ Failed to create timeline: {timeline_name}")
            return None

        self.project.SetCurrentTimeline(timeline)

        # Set resolution based on orientation
        if orientation == "vertical":
            timeline.SetSetting("useCustomSettings", "1")
            timeline.SetSetting("timelineResolutionWidth", "1080")
            timeline.SetSetting("timelineResolutionHeight", "1920")
        else:
            timeline.SetSetting("useCustomSettings", "1")
            timeline.SetSetting("timelineResolutionWidth", "1920")
            timeline.SetSetting("timelineResolutionHeight", "1080")

        # Apply LUT if available
        if self.lut_path and os.path.exists(self.lut_path):
            self._apply_lut_to_timeline(timeline)

        print(f"  ✓ {timeline_name} ({clip_data['duration_sec']:.0f}s + handles)")
        return timeline

    def _apply_lut_to_timeline(self, timeline):
        """Apply the .cube LUT to all clips in the timeline."""
        track_count = timeline.GetTrackCount("video")
        for track_idx in range(1, int(track_count) + 1):
            clips = timeline.GetItemListInTrack("video", track_idx)
            for clip in (clips or []):
                # SetLUT applies a 3D LUT to the clip's color page node
                clip.SetLUT(1, self.lut_path)  # Node index 1 (first node)

    def add_text_overlay(self, timeline, caption: str):
        """
        Add a text overlay to the timeline using Fusion.

        Note: Resolve's scripting API has limited text overlay support.
        We create a Fusion Text+ node on the first video clip.
        For production use, you may want to manually adjust position/style.
        """
        track_count = timeline.GetTrackCount("video")
        if track_count < 1:
            return

        clips = timeline.GetItemListInTrack("video", 1)
        if not clips or len(clips) == 0:
            return

        clip = clips[0]

        # Get the Fusion composition for this clip
        fusion_comp = clip.GetFusionCompByIndex(1)
        if not fusion_comp:
            # Add a Fusion comp
            clip.AddFusionComp()
            fusion_comp = clip.GetFusionCompByIndex(1)

        if not fusion_comp:
            print("    (text overlay skipped — Fusion comp unavailable)")
            return

        try:
            # Add Text+ node
            text_node = fusion_comp.AddTool("TextPlus", -32768, -32768)
            if text_node:
                # Clean caption for display (remove emojis for cleaner look)
                clean_caption = re.sub(r'[^\x00-\x7F]+', '', caption).strip()
                # Truncate if too long for overlay
                if len(clean_caption) > 120:
                    clean_caption = clean_caption[:117] + "..."

                text_node.SetInput("StyledText", clean_caption)
                text_node.SetInput("Font", "Futura")
                text_node.SetInput("Size", 0.04)  # Relative size
                text_node.SetInput("Center", {1: 0.5, 2: 0.12})  # Bottom center
                text_node.SetInput("Color1", {1: 1.0, 2: 1.0, 3: 1.0})  # White

                # Add background rectangle for readability
                bg_node = fusion_comp.AddTool("Background", -32768, -32768)
                if bg_node:
                    bg_node.SetInput("TopLeftRed", 0.0)
                    bg_node.SetInput("TopLeftGreen", 0.0)
                    bg_node.SetInput("TopLeftBlue", 0.0)
                    bg_node.SetInput("TopLeftAlpha", 0.6)  # Semi-transparent black

                print("    ✓ Text overlay added")
        except Exception as e:
            print(f"    (text overlay skipped: {e})")

    def queue_render_job(self, timeline, orientation: str, clip_data: dict):
        """Add a render job for this timeline."""
        self.project.SetCurrentTimeline(timeline)

        # Create output subdirectory
        orient_dir = "vertical" if orientation == "vertical" else "horizontal"
        target_dir = os.path.join(self.output_dir, f"ep{self.episode}", orient_dir)
        os.makedirs(target_dir, exist_ok=True)

        # Render settings
        idx = clip_data["index"]
        filename = f"ep{self.episode}_clip{idx}_{orient_dir}"

        if orientation == "vertical":
            settings = {
                "SelectAllFrames": 1,
                "TargetDir": target_dir,
                "CustomName": filename,
                "FormatWidth": 1080,
                "FormatHeight": 1920,
                "ExportVideo": True,
                "ExportAudio": True,
            }
        else:
            settings = {
                "SelectAllFrames": 1,
                "TargetDir": target_dir,
                "CustomName": filename,
                "FormatWidth": 1920,
                "FormatHeight": 1080,
                "ExportVideo": True,
                "ExportAudio": True,
            }

        # Set format: H.264 MP4, high quality
        self.project.SetCurrentRenderFormatAndCodec("mp4", "H264")
        self.project.SetRenderSettings(settings)

        job_id = self.project.AddRenderJob()
        if job_id:
            print(f"    ✓ Render queued → {target_dir}/{filename}.mp4")
        else:
            print(f"    ✗ Failed to queue render for {filename}")

        return job_id

    def start_render(self):
        """Start rendering all queued jobs."""
        print("\n🎬 Starting render...")
        result = self.project.StartRendering()
        if result:
            print("Rendering started. Monitor progress in Resolve's Deliver page.")
        else:
            print("Failed to start rendering. Check Resolve's Deliver page.")
        return result

    def wait_for_render(self):
        """Block until all render jobs complete."""
        while self.project.IsRenderingInProgress():
            status = self.project.GetRenderJobStatus(0)
            if status:
                pct = status.get("CompletionPercentage", 0)
                print(f"  Rendering... {pct}%", end="\r")
            time.sleep(2)
        print("\n✓ All renders complete!")

    def save(self):
        """Save the project."""
        self.pm.SaveProject()
        print("✓ Project saved")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Radio Big Muddy — Podcast Clip Cutter for DaVinci Resolve"
    )
    parser.add_argument(
        "--episode", "-e", type=int, required=True,
        help="Episode number (1, 2, etc.)"
    )
    parser.add_argument(
        "--video", "-v", required=True,
        help="Path to source video (e.g., ~/Desktop/ep1-ronin-primary.mp4)"
    )
    parser.add_argument(
        "--content", "-c",
        help="Path to content engine JSON (default: experiments/results/podcast-content/ep<N>-content.json)"
    )
    parser.add_argument(
        "--lut", "-l",
        help="Path to .cube LUT file (default: ~/Desktop/LR-Grade-Stills/blues-room-grade.cube)"
    )
    parser.add_argument(
        "--output", "-o",
        help="Output directory for rendered clips (default: ~/Desktop/podcast-clips)"
    )
    parser.add_argument(
        "--render", "-r", action="store_true",
        help="Start rendering after creating timelines"
    )
    parser.add_argument(
        "--wait", "-w", action="store_true",
        help="Wait for rendering to complete (implies --render)"
    )
    parser.add_argument(
        "--no-vertical", action="store_true",
        help="Skip vertical (9:16) versions"
    )
    parser.add_argument(
        "--no-horizontal", action="store_true",
        help="Skip horizontal (16:9) versions"
    )
    parser.add_argument(
        "--no-text", action="store_true",
        help="Skip text overlay (caption) on clips"
    )
    parser.add_argument(
        "--fps", type=float, default=24.0,
        help="Source video framerate (default: 24)"
    )

    args = parser.parse_args()

    # Resolve defaults
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)

    if not args.content:
        args.content = os.path.join(
            repo_root, "experiments", "results", "podcast-content",
            f"ep{args.episode}-content.json"
        )

    if not args.lut:
        args.lut = os.path.expanduser("~/Desktop/LR-Grade-Stills/blues-room-grade.cube")

    if not args.output:
        args.output = os.path.expanduser("~/Desktop/podcast-clips")

    if args.wait:
        args.render = True

    # Load clip suggestions
    print(f"\n{'='*60}")
    print(f"  Radio Big Muddy — Podcast Clip Cutter")
    print(f"  Episode {args.episode}")
    print(f"{'='*60}\n")

    clips = load_clip_suggestions(args.content)
    print(f"Found {len(clips)} clip suggestions:\n")
    for c in clips:
        print(f"  {c['index']}. [{seconds_to_tc(c['start_sec'])} → {seconds_to_tc(c['end_sec'])}] "
              f"({c['duration_sec']:.0f}s) {c['description'][:60]}")
    print()

    # Connect to Resolve and set up
    cutter = ResolveClipCutter(
        episode=args.episode,
        video_path=args.video,
        lut_path=args.lut,
        output_dir=args.output,
        fps=args.fps,
    )

    cutter.setup_project()
    cutter.import_media()

    # Create timelines for each clip × orientation
    orientations = []
    if not args.no_horizontal:
        orientations.append("horizontal")
    if not args.no_vertical:
        orientations.append("vertical")

    total_timelines = 0
    for clip_data in clips:
        print(f"\nClip {clip_data['index']}: {clip_data['description'][:50]}...")
        for orient in orientations:
            timeline = cutter.create_clip_timeline(clip_data, orient)
            if timeline:
                total_timelines += 1

                # Add text overlay
                if not args.no_text:
                    cutter.add_text_overlay(timeline, clip_data["caption"])

                # Queue render job
                if args.render:
                    cutter.queue_render_job(timeline, orient, clip_data)

    print(f"\n{'='*60}")
    print(f"  Created {total_timelines} timelines")
    if cutter.lut_path and os.path.exists(cutter.lut_path):
        print(f"  LUT applied: {os.path.basename(cutter.lut_path)}")
    print(f"{'='*60}")

    # Render
    if args.render:
        cutter.start_render()
        if args.wait:
            cutter.wait_for_render()

    cutter.save()

    print(f"\nDone! Open Resolve to review timelines and adjust as needed.")
    if not args.render:
        print("Run with --render to queue render jobs, or render manually from Deliver page.")


if __name__ == "__main__":
    main()
