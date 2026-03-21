#!/usr/bin/env npx tsx
/**
 * lr-to-lut.ts — Lightroom-to-LUT Pipeline
 *
 * Extract a video frame, grade it in Lightroom, then generate a .cube 3D LUT
 * that can be loaded into DaVinci Resolve to apply the same color grade.
 *
 * Usage:
 *   npx tsx scripts/lr-to-lut.ts extract --video <path> --timecode <HH:MM:SS> --output <path.tiff>
 *   npx tsx scripts/lr-to-lut.ts generate --frame <path.tiff> --name <lut-name> [--install-resolve] [--lut-size 33]
 *   npx tsx scripts/lr-to-lut.ts watch --hot-folder <path> [--lut-size 33]
 *   npx tsx scripts/lr-to-lut.ts --help
 */

// @ts-nocheck
import { execSync, execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

interface ExtractArgs {
  command: "extract";
  video: string;
  timecode: string;
  output: string;
}

interface GenerateArgs {
  command: "generate";
  frame: string;
  name: string;
  installResolve: boolean;
  lutSize: number;
}

interface WatchArgs {
  command: "watch";
  hotFolder: string;
  lutSize: number;
  installResolve: boolean;
}

type Args = ExtractArgs | GenerateArgs | WatchArgs | { command: "help" };

function printHelp(): void {
  const help = `
lr-to-lut — Lightroom-to-LUT Pipeline for DaVinci Resolve

COMMANDS

  extract   Extract a single frame from a video for grading in Lightroom
  generate  Read Lightroom adjustments and produce a .cube 3D LUT

EXTRACT

  npx tsx scripts/lr-to-lut.ts extract \\
    --video ~/Desktop/my-video.mp4 \\
    --timecode 00:05:00 \\
    --output ~/Desktop/podcast-frame.tiff

  Options:
    --video      Path to the source video file (required)
    --timecode   Timecode to extract, e.g. 00:05:00 or 00:00:30.500 (required)
    --output     Output path for the 16-bit TIFF frame (required)

  This also creates a HALD identity CLUT image (<output-dir>/hald_identity.tiff)
  that you should import into Lightroom and apply the same adjustments to.

GENERATE

  npx tsx scripts/lr-to-lut.ts generate \\
    --frame ~/Desktop/podcast-frame.tiff \\
    --name "blues-room-grade" \\
    --install-resolve

  Options:
    --frame            Path to the graded frame TIFF (required)
    --name             Name for the LUT file (required)
    --lut-size         LUT cube dimension: 33 or 65 (default: 33)
    --install-resolve  Copy .cube to DaVinci Resolve's LUT directory

WATCH (Hot Folder)

  npx tsx scripts/lr-to-lut.ts watch \\
    --hot-folder ~/Desktop/LUT-Exports \\
    --install-resolve

  Options:
    --hot-folder       Folder to watch for Lightroom exports (required)
    --lut-size         LUT cube dimension: 33 or 65 (default: 33)
    --install-resolve  Auto-install each .cube to Resolve's LUT directory

  The watch command monitors a hot folder for new TIFF/PNG exports from
  Lightroom. When it detects a graded HALD file (or any image with an XMP
  sidecar), it automatically generates a .cube LUT and installs it to
  DaVinci Resolve. Just set Lightroom's export destination to this folder.

  Hot folder structure after processing:
    ~/Desktop/LUT-Exports/
    ├── hald_graded.tiff          ← you export here from Lightroom
    ├── hald_graded.cube          ← auto-generated LUT
    └── archive/
        └── hald_graded_20260319.tiff  ← moved here after processing

WORKFLOW

  1. Run 'extract' to pull a frame + HALD identity from your video
  2. Import BOTH the frame AND the hald_identity.tiff into Lightroom
  3. Grade the frame to taste
  4. Sync/copy those exact adjustments to the hald_identity.tiff
  5. Export the graded HALD from Lightroom as a 16-bit TIFF or high-quality PNG
  6. Run 'generate' pointing --frame at the original frame (for XMP reading)
     The script will look for the graded HALD next to it.
  7. Load the .cube LUT in DaVinci Resolve

  OR use the hot folder workflow:
  1. Run 'extract' to get the frame + HALD identity
  2. Run 'watch --hot-folder ~/Desktop/LUT-Exports --install-resolve'
  3. Import the HALD identity into Lightroom, grade it, export to the hot folder
  4. The LUT appears in Resolve automatically — no manual steps

  If you only grade the frame (not the HALD), the script will attempt to
  reconstruct the LUT from the XMP develop settings. This is an approximation
  — the HALD workflow is more accurate.
`;
  console.log(help);
}

function parseArgs(argv: string[]): Args {
  const args = argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    return { command: "help" };
  }

  const command = args[0];

  function getArg(name: string): string | undefined {
    const idx = args.indexOf(name);
    if (idx === -1 || idx + 1 >= args.length) return undefined;
    return args[idx + 1];
  }

  function hasFlag(name: string): boolean {
    return args.includes(name);
  }

  if (command === "extract") {
    const video = getArg("--video");
    const timecode = getArg("--timecode");
    const output = getArg("--output");
    if (!video) fatal("--video is required for extract");
    if (!timecode) fatal("--timecode is required for extract");
    if (!output) fatal("--output is required for extract");
    return {
      command: "extract",
      video: resolvePath(video!),
      timecode: timecode!,
      output: resolvePath(output!),
    };
  }

  if (command === "generate") {
    const frame = getArg("--frame");
    const name = getArg("--name");
    const lutSizeStr = getArg("--lut-size");
    if (!frame) fatal("--frame is required for generate");
    if (!name) fatal("--name is required for generate");
    const lutSize = lutSizeStr ? parseInt(lutSizeStr, 10) : 33;
    if (![17, 33, 65].includes(lutSize)) fatal("--lut-size must be 17, 33, or 65");
    return {
      command: "generate",
      frame: resolvePath(frame!),
      name: name!,
      installResolve: hasFlag("--install-resolve"),
      lutSize,
    };
  }

  if (command === "watch") {
    const hotFolder = getArg("--hot-folder");
    const lutSizeStr = getArg("--lut-size");
    if (!hotFolder) fatal("--hot-folder is required for watch");
    const lutSize = lutSizeStr ? parseInt(lutSizeStr, 10) : 33;
    if (![17, 33, 65].includes(lutSize)) fatal("--lut-size must be 17, 33, or 65");
    return {
      command: "watch",
      hotFolder: resolvePath(hotFolder!),
      lutSize,
      installResolve: hasFlag("--install-resolve"),
    };
  }

  fatal(`Unknown command: ${command}. Use --help for usage.`);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function fatal(msg: string): never {
  console.error(`\nERROR: ${msg}\n`);
  process.exit(1);
}

function info(msg: string): void {
  console.log(`  [info] ${msg}`);
}

function resolvePath(p: string): string {
  if (p.startsWith("~")) {
    p = path.join(os.homedir(), p.slice(1));
  }
  return path.resolve(p);
}

function checkBinary(name: string): void {
  try {
    execSync(`which ${name}`, { stdio: "pipe" });
  } catch {
    fatal(
      `'${name}' not found. Install it:\n` +
        (name === "ffmpeg"
          ? "  brew install ffmpeg"
          : name === "convert" || name === "magick"
            ? "  brew install imagemagick"
            : `  Please install ${name}`)
    );
  }
}

function ensureDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// HALD Identity Image Generation (pure Node.js with sharp)
// ---------------------------------------------------------------------------

/**
 * Generate a HALD level-N identity CLUT image.
 *
 * A HALD N image has dimension N^2 x N^2 pixels per side, containing
 * (N^2)^3 unique colors that map to a N^2 x N^2 x N^2 identity 3D LUT.
 *
 * HALD 8 → 64x64x64 LUT → 512x512 pixel image (262144 pixels)
 * Each pixel (r,g,b) represents its own position in the cube.
 */
async function generateHaldIdentity(
  level: number,
  outputPath: string
): Promise<void> {
  const cubeSize = level * level; // e.g. level=8 → cube 64
  const imgSize = cubeSize * cubeSize; // total pixels per side... actually total pixels = cubeSize^3
  const totalPixels = cubeSize * cubeSize * cubeSize;
  const side = cubeSize * cubeSize; // image is side x side? No.

  // HALD image: side = level^3 pixels wide, level^3 pixels tall? No.
  // A HALD-N identity has dimensions (N^2) x (N^2) laid out so that
  // the image is N^3 x N^3 pixels? Let me be precise:
  //
  // HALD level N:
  //   cubeSize = N*N (the 3D LUT dimension)
  //   image width = image height = N*N*N = N^3
  //   total pixels = N^6 = cubeSize^3 ✓
  //
  // For level=8: cubeSize=64, image=512x512, total=262144=64^3 ✓

  const imgDim = level * level * level; // 512 for level=8
  const totalPx = imgDim * imgDim;

  // Allocate RGB buffer (3 bytes per pixel, 8-bit)
  // For HALD 8: 64 values per channel maps cleanly to 8-bit (each step = 4.048 in 0-255)
  const buf = Buffer.alloc(totalPx * 3);

  // The pixel ordering for HALD: iterate B (slowest), G, R (fastest)
  // Pixel index i corresponds to:
  //   r = i % cubeSize
  //   g = Math.floor(i / cubeSize) % cubeSize
  //   b = Math.floor(i / (cubeSize * cubeSize))

  for (let i = 0; i < totalPx; i++) {
    const r = i % cubeSize;
    const g = Math.floor(i / cubeSize) % cubeSize;
    const b = Math.floor(i / (cubeSize * cubeSize));

    // Map from [0, cubeSize-1] to [0, 255]
    const r8 = Math.round((r / (cubeSize - 1)) * 255);
    const g8 = Math.round((g / (cubeSize - 1)) * 255);
    const b8 = Math.round((b / (cubeSize - 1)) * 255);

    const offset = i * 3;
    buf[offset] = r8;
    buf[offset + 1] = g8;
    buf[offset + 2] = b8;
  }

  // Write identity HALD as TIFF or PNG depending on extension
  const sharp = (await import("sharp")).default;
  const ext = path.extname(outputPath).toLowerCase();
  const rawOpts = { raw: { width: imgDim, height: imgDim, channels: 3 as const } };

  if (ext === ".tiff" || ext === ".tif") {
    await sharp(buf, rawOpts).tiff({ bitdepth: 8, compression: "none" }).toFile(outputPath);
  } else {
    await sharp(buf, rawOpts).png().toFile(outputPath);
  }
}

// ---------------------------------------------------------------------------
// Frame Extraction
// ---------------------------------------------------------------------------

async function commandExtract(args: ExtractArgs): Promise<void> {
  checkBinary("ffmpeg");

  if (!fs.existsSync(args.video)) {
    fatal(`Video file not found: ${args.video}`);
  }

  ensureDir(args.output);

  console.log("\n--- Frame Extraction ---\n");
  info(`Video:    ${args.video}`);
  info(`Timecode: ${args.timecode}`);
  info(`Output:   ${args.output}`);

  // Extract frame as 16-bit TIFF
  const ffmpegCmd = [
    "ffmpeg",
    "-y",
    "-ss",
    args.timecode,
    "-i",
    args.video,
    "-vframes",
    "1",
    "-pix_fmt",
    "rgb48le",
    "-compression_algo",
    "raw",
    args.output,
  ];

  info(`Running: ${ffmpegCmd.join(" ")}`);

  try {
    execFileSync(ffmpegCmd[0], ffmpegCmd.slice(1), {
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (err: any) {
    const stderr = err.stderr?.toString() || "";
    fatal(`ffmpeg failed:\n${stderr}`);
  }

  if (!fs.existsSync(args.output)) {
    fatal("Frame extraction failed — output file not created");
  }

  const stat = fs.statSync(args.output);
  info(`Frame extracted: ${args.output} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);

  // Generate HALD identity image
  const outputDir = path.dirname(args.output);
  const haldPath = path.join(outputDir, "hald_identity.tiff");

  info("Generating HALD 8 identity CLUT image (512x512)...");
  await generateHaldIdentity(8, haldPath);

  const haldStat = fs.statSync(haldPath);
  info(`HALD identity: ${haldPath} (${(haldStat.size / 1024 / 1024).toFixed(1)} MB)`);

  console.log(`
--- Next Steps ---

1. Import BOTH files into Lightroom:
   - ${args.output}  (grade this to taste)
   - ${haldPath}     (sync the same grade to this)

2. Grade the frame however you like.

3. Select BOTH images, then Sync Settings from the frame to the HALD.
   (Or: Right-click → Develop Settings → Copy Settings, then paste to HALD)

4. Export the graded HALD identity as:
   - 16-bit TIFF (best quality) or high-quality PNG
   - No resizing, no sharpening, no watermarks
   - Save it as: ${path.join(outputDir, "hald_graded.tiff")}

5. Then run:
   npx tsx scripts/lr-to-lut.ts generate \\
     --frame ${args.output} \\
     --name "my-grade"
`);
}

// ---------------------------------------------------------------------------
// XMP Parsing
// ---------------------------------------------------------------------------

interface LRSettings {
  // Basic
  exposure: number;
  contrast: number;
  highlights: number;
  shadows: number;
  whites: number;
  blacks: number;

  // White Balance
  temperature: number;
  tint: number;

  // Presence
  vibrance: number;
  saturation: number;
  clarity: number;
  dehaze: number;

  // Tone Curve
  toneCurveRed: [number, number][];
  toneCurveGreen: [number, number][];
  toneCurveBlue: [number, number][];
  toneCurvePV: [number, number][];
  parametricShadows: number;
  parametricDarks: number;
  parametricLights: number;
  parametricHighlights: number;
  parametricShadowSplit: number;
  parametricMidtoneSplit: number;
  parametricHighlightSplit: number;

  // HSL
  hslHue: Record<string, number>;
  hslSaturation: Record<string, number>;
  hslLuminance: Record<string, number>;

  // Color Grading (split toning)
  shadowHue: number;
  shadowSaturation: number;
  highlightHue: number;
  highlightSaturation: number;
  midtoneHue: number;
  midtoneSaturation: number;
  colorGradeBlending: number;
  colorGradeBalance: number;

  // Sharpening
  sharpenAmount: number;
  sharpenRadius: number;

  // Any raw XMP values we found
  raw: Record<string, string>;
}

const HSL_COLORS = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Aqua",
  "Blue",
  "Purple",
  "Magenta",
];

function defaultSettings(): LRSettings {
  return {
    exposure: 0,
    contrast: 0,
    highlights: 0,
    shadows: 0,
    whites: 0,
    blacks: 0,
    temperature: 0, // will be set to the actual value
    tint: 0,
    vibrance: 0,
    saturation: 0,
    clarity: 0,
    dehaze: 0,
    toneCurveRed: [],
    toneCurveGreen: [],
    toneCurveBlue: [],
    toneCurvePV: [],
    parametricShadows: 0,
    parametricDarks: 0,
    parametricLights: 0,
    parametricHighlights: 0,
    parametricShadowSplit: 25,
    parametricMidtoneSplit: 50,
    parametricHighlightSplit: 75,
    hslHue: Object.fromEntries(HSL_COLORS.map((c) => [c, 0])),
    hslSaturation: Object.fromEntries(HSL_COLORS.map((c) => [c, 0])),
    hslLuminance: Object.fromEntries(HSL_COLORS.map((c) => [c, 0])),
    shadowHue: 0,
    shadowSaturation: 0,
    highlightHue: 0,
    highlightSaturation: 0,
    midtoneHue: 0,
    midtoneSaturation: 0,
    colorGradeBlending: 50,
    colorGradeBalance: 0,
    sharpenAmount: 0,
    sharpenRadius: 1.0,
    raw: {},
  };
}

function findXmpData(framePath: string): string | null {
  // Try sidecar first
  const base = framePath.replace(/\.[^.]+$/, "");
  const xmpPath = base + ".xmp";
  if (fs.existsSync(xmpPath)) {
    info(`Found XMP sidecar: ${xmpPath}`);
    return fs.readFileSync(xmpPath, "utf-8");
  }

  // Try embedded XMP via exiftool
  try {
    checkBinary("exiftool");
    const result = execSync(`exiftool -xmp -b "${framePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    if (result && result.includes("crs:")) {
      info("Found embedded XMP metadata via exiftool");
      return result;
    }
  } catch {
    // exiftool not available or no XMP
  }

  // Try extracting XMP with ffprobe
  try {
    const result = execSync(
      `ffprobe -v quiet -print_format xml -show_entries format_tags "${framePath}"`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
    );
    if (result && result.includes("crs:")) {
      info("Found embedded XMP metadata via ffprobe");
      return result;
    }
  } catch {
    // no XMP found
  }

  return null;
}

function parseXmpValue(xmpData: string, key: string): string | null {
  // Try attribute form: crs:Key="value"
  const attrRegex = new RegExp(`crs:${key}="([^"]*)"`, "i");
  const attrMatch = xmpData.match(attrRegex);
  if (attrMatch) return attrMatch[1];

  // Try element form: <crs:Key>value</crs:Key>
  const elemRegex = new RegExp(`<crs:${key}[^>]*>([^<]*)</crs:${key}>`, "i");
  const elemMatch = xmpData.match(elemRegex);
  if (elemMatch) return elemMatch[1];

  return null;
}

function parseXmpFloat(xmpData: string, key: string): number {
  const val = parseXmpValue(xmpData, key);
  if (val === null) return 0;
  const f = parseFloat(val);
  return isNaN(f) ? 0 : f;
}

function parseToneCurve(xmpData: string, tag: string): [number, number][] {
  // Lightroom tone curves are stored as:
  // <crs:ToneCurvePV2012>
  //   <rdf:Seq>
  //     <rdf:li>0, 0</rdf:li>
  //     <rdf:li>128, 140</rdf:li>
  //     <rdf:li>255, 255</rdf:li>
  //   </rdf:Seq>
  // </crs:ToneCurvePV2012>

  const blockRegex = new RegExp(
    `<crs:${tag}[^>]*>[\\s\\S]*?<rdf:Seq>([\\s\\S]*?)</rdf:Seq>[\\s\\S]*?</crs:${tag}>`,
    "i"
  );
  const blockMatch = xmpData.match(blockRegex);
  if (!blockMatch) return [];

  const points: [number, number][] = [];
  const liRegex = /<rdf:li>([^<]+)<\/rdf:li>/g;
  let m;
  while ((m = liRegex.exec(blockMatch[1])) !== null) {
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      points.push([parts[0], parts[1]]);
    }
  }
  return points;
}

function parseXmp(xmpData: string): LRSettings {
  const s = defaultSettings();

  // Basic
  s.exposure = parseXmpFloat(xmpData, "Exposure2012");
  s.contrast = parseXmpFloat(xmpData, "Contrast2012");
  s.highlights = parseXmpFloat(xmpData, "Highlights2012");
  s.shadows = parseXmpFloat(xmpData, "Shadows2012");
  s.whites = parseXmpFloat(xmpData, "Whites2012");
  s.blacks = parseXmpFloat(xmpData, "Blacks2012");

  // White Balance
  s.temperature = parseXmpFloat(xmpData, "Temperature");
  s.tint = parseXmpFloat(xmpData, "Tint");

  // Presence
  s.vibrance = parseXmpFloat(xmpData, "Vibrance");
  s.saturation = parseXmpFloat(xmpData, "Saturation");
  s.clarity = parseXmpFloat(xmpData, "Clarity2012");
  s.dehaze = parseXmpFloat(xmpData, "Dehaze");

  // Tone Curves
  s.toneCurvePV = parseToneCurve(xmpData, "ToneCurvePV2012");
  s.toneCurveRed = parseToneCurve(xmpData, "ToneCurvePV2012Red");
  s.toneCurveGreen = parseToneCurve(xmpData, "ToneCurvePV2012Green");
  s.toneCurveBlue = parseToneCurve(xmpData, "ToneCurvePV2012Blue");

  // Parametric tone curve
  s.parametricShadows = parseXmpFloat(xmpData, "ParametricShadows");
  s.parametricDarks = parseXmpFloat(xmpData, "ParametricDarks");
  s.parametricLights = parseXmpFloat(xmpData, "ParametricLights");
  s.parametricHighlights = parseXmpFloat(xmpData, "ParametricHighlights");
  s.parametricShadowSplit = parseXmpFloat(xmpData, "ParametricShadowSplit") || 25;
  s.parametricMidtoneSplit = parseXmpFloat(xmpData, "ParametricMidtoneSplit") || 50;
  s.parametricHighlightSplit =
    parseXmpFloat(xmpData, "ParametricHighlightSplit") || 75;

  // HSL
  for (const color of HSL_COLORS) {
    s.hslHue[color] = parseXmpFloat(xmpData, `HueAdjustment${color}`);
    s.hslSaturation[color] = parseXmpFloat(xmpData, `SaturationAdjustment${color}`);
    s.hslLuminance[color] = parseXmpFloat(xmpData, `LuminanceAdjustment${color}`);
  }

  // Color Grading / Split Toning
  s.shadowHue = parseXmpFloat(xmpData, "SplitToningShadowHue");
  s.shadowSaturation = parseXmpFloat(xmpData, "SplitToningShadowSaturation");
  s.highlightHue = parseXmpFloat(xmpData, "SplitToningHighlightHue");
  s.highlightSaturation = parseXmpFloat(xmpData, "SplitToningHighlightSaturation");
  s.colorGradeBalance = parseXmpFloat(xmpData, "SplitToningBalance");

  // Also check newer Color Grading tags
  const cgMidHue = parseXmpFloat(xmpData, "ColorGradeMidtoneHue");
  const cgMidSat = parseXmpFloat(xmpData, "ColorGradeMidtoneSat");
  if (cgMidHue || cgMidSat) {
    s.midtoneHue = cgMidHue;
    s.midtoneSaturation = cgMidSat;
  }
  const cgShadowHue = parseXmpFloat(xmpData, "ColorGradeShadowHue");
  const cgShadowSat = parseXmpFloat(xmpData, "ColorGradeShadowSat");
  if (cgShadowHue || cgShadowSat) {
    s.shadowHue = cgShadowHue;
    s.shadowSaturation = cgShadowSat;
  }
  const cgHighHue = parseXmpFloat(xmpData, "ColorGradeHighlightHue");
  const cgHighSat = parseXmpFloat(xmpData, "ColorGradeHighlightSat");
  if (cgHighHue || cgHighSat) {
    s.highlightHue = cgHighHue;
    s.highlightSaturation = cgHighSat;
  }
  s.colorGradeBlending = parseXmpFloat(xmpData, "ColorGradeBlending") || 50;

  // Sharpening
  s.sharpenAmount = parseXmpFloat(xmpData, "Sharpness");
  s.sharpenRadius = parseXmpFloat(xmpData, "SharpenRadius") || 1.0;

  // Store all raw crs: values for debugging
  const rawRegex = /crs:(\w+)="([^"]*)"/g;
  let rm;
  while ((rm = rawRegex.exec(xmpData)) !== null) {
    s.raw[rm[1]] = rm[2];
  }

  return s;
}

function printSettings(s: LRSettings): void {
  console.log("\n--- Detected Lightroom Develop Settings ---\n");

  const section = (name: string) => console.log(`  ${name}:`);
  const val = (name: string, v: number, suffix = "") => {
    if (v !== 0) {
      console.log(`    ${name.padEnd(24)} ${v > 0 ? "+" : ""}${v}${suffix}`);
    }
  };

  section("Basic");
  val("Exposure", s.exposure, " EV");
  val("Contrast", s.contrast);
  val("Highlights", s.highlights);
  val("Shadows", s.shadows);
  val("Whites", s.whites);
  val("Blacks", s.blacks);

  section("White Balance");
  if (s.temperature) val("Temperature", s.temperature, " K");
  val("Tint", s.tint);

  section("Presence");
  val("Vibrance", s.vibrance);
  val("Saturation", s.saturation);
  val("Clarity", s.clarity);
  val("Dehaze", s.dehaze);

  if (s.toneCurvePV.length > 0) {
    section("Tone Curve (composite)");
    console.log(
      `    Points: ${s.toneCurvePV.map(([x, y]) => `${x},${y}`).join(" / ")}`
    );
  }
  if (s.toneCurveRed.length > 0) {
    section("Tone Curve (Red)");
    console.log(
      `    Points: ${s.toneCurveRed.map(([x, y]) => `${x},${y}`).join(" / ")}`
    );
  }
  if (s.toneCurveGreen.length > 0) {
    section("Tone Curve (Green)");
    console.log(
      `    Points: ${s.toneCurveGreen.map(([x, y]) => `${x},${y}`).join(" / ")}`
    );
  }
  if (s.toneCurveBlue.length > 0) {
    section("Tone Curve (Blue)");
    console.log(
      `    Points: ${s.toneCurveBlue.map(([x, y]) => `${x},${y}`).join(" / ")}`
    );
  }

  const hasHSL = HSL_COLORS.some(
    (c) => s.hslHue[c] !== 0 || s.hslSaturation[c] !== 0 || s.hslLuminance[c] !== 0
  );
  if (hasHSL) {
    section("HSL Adjustments");
    for (const c of HSL_COLORS) {
      if (s.hslHue[c] || s.hslSaturation[c] || s.hslLuminance[c]) {
        console.log(
          `    ${c.padEnd(10)} H:${(s.hslHue[c] > 0 ? "+" : "") + s.hslHue[c]}  S:${(s.hslSaturation[c] > 0 ? "+" : "") + s.hslSaturation[c]}  L:${(s.hslLuminance[c] > 0 ? "+" : "") + s.hslLuminance[c]}`
        );
      }
    }
  }

  if (s.shadowSaturation || s.highlightSaturation || s.midtoneSaturation) {
    section("Color Grading");
    if (s.shadowSaturation)
      console.log(
        `    Shadows:     Hue ${s.shadowHue}  Sat ${s.shadowSaturation}`
      );
    if (s.midtoneSaturation)
      console.log(
        `    Midtones:    Hue ${s.midtoneHue}  Sat ${s.midtoneSaturation}`
      );
    if (s.highlightSaturation)
      console.log(
        `    Highlights:  Hue ${s.highlightHue}  Sat ${s.highlightSaturation}`
      );
  }

  if (s.sharpenAmount) {
    section("Sharpening");
    val("Amount", s.sharpenAmount);
    console.log(`    Radius                   ${s.sharpenRadius}`);
  }

  console.log("");
}

// ---------------------------------------------------------------------------
// HALD-based LUT Generation (preferred workflow)
// ---------------------------------------------------------------------------

async function generateLutFromHald(
  haldGradedPath: string,
  lutSize: number,
  lutName: string,
  outputPath: string
): Promise<void> {
  const sharp = (await import("sharp")).default;

  info(`Reading graded HALD image: ${haldGradedPath}`);

  const img = sharp(haldGradedPath);
  const meta = await img.metadata();
  const { data, info: rawInfo } = await img
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = rawInfo.width;
  const height = rawInfo.height;
  const channels = rawInfo.channels;

  info(`HALD image: ${width}x${height}, ${channels} channels`);

  // Determine the HALD level from image dimensions
  // HALD level N → image size N^3 x N^3
  // 512x512 → level 8 → cube size 64
  let haldLevel = 0;
  for (let n = 2; n <= 16; n++) {
    if (n * n * n === width && n * n * n === height) {
      haldLevel = n;
      break;
    }
  }

  if (haldLevel === 0) {
    fatal(
      `Cannot determine HALD level from image dimensions ${width}x${height}. ` +
        `Expected a square image with side length N^3 (e.g., 512 for HALD 8).`
    );
  }

  const cubeSize = haldLevel * haldLevel; // e.g. 64 for level 8
  info(`Detected HALD level ${haldLevel} (${cubeSize}^3 LUT)`);

  // Read all pixels from the graded HALD
  // The pixel order matches the identity: pixel i → (r, g, b) where
  //   r_idx = i % cubeSize, g_idx = floor(i/cubeSize) % cubeSize, b_idx = floor(i/cubeSize^2)
  // But we want to sample to the output LUT size

  // sharp's .raw() always outputs 8-bit per channel data
  const bytesPerPixel = data.length / (width * height);
  const bytesPerSample = Math.floor(bytesPerPixel / channels);
  const is16bit = bytesPerSample === 2;
  const maxVal = is16bit ? 65535 : 255;

  info(`Pixel data: ${data.length} bytes, ${bytesPerPixel} bytes/pixel, ${is16bit ? 16 : 8}-bit`);

  // Function to read pixel at linear index
  function readPixel(idx: number): [number, number, number] {
    const offset = idx * channels * bytesPerSample;
    let r: number, g: number, b: number;
    if (is16bit) {
      r = data.readUInt16LE(offset) / maxVal;
      g = data.readUInt16LE(offset + 2) / maxVal;
      b = data.readUInt16LE(offset + 4) / maxVal;
    } else {
      r = data[offset] / maxVal;
      g = data[offset + 1] / maxVal;
      b = data[offset + 2] / maxVal;
    }
    return [r, g, b];
  }

  // If lutSize matches cubeSize, we can directly read. Otherwise, we need to
  // interpolate/sample.
  const lines: string[] = [];
  lines.push(`TITLE "${lutName}"`);
  lines.push(`LUT_3D_SIZE ${lutSize}`);
  lines.push("");

  info(`Generating ${lutSize}x${lutSize}x${lutSize} .cube LUT...`);

  // For each output LUT entry, find the corresponding pixel in the HALD
  for (let bi = 0; bi < lutSize; bi++) {
    for (let gi = 0; gi < lutSize; gi++) {
      for (let ri = 0; ri < lutSize; ri++) {
        // Map LUT index to HALD pixel position
        // The output position in the cube: (ri/(lutSize-1), gi/(lutSize-1), bi/(lutSize-1))
        // This maps to HALD pixel index where:
        //   r_float = ri/(lutSize-1) * (cubeSize-1)
        //   g_float = gi/(lutSize-1) * (cubeSize-1)
        //   b_float = bi/(lutSize-1) * (cubeSize-1)

        const rF = (ri / (lutSize - 1)) * (cubeSize - 1);
        const gF = (gi / (lutSize - 1)) * (cubeSize - 1);
        const bF = (bi / (lutSize - 1)) * (cubeSize - 1);

        if (lutSize === cubeSize) {
          // Direct mapping
          const pixelIdx = ri + gi * cubeSize + bi * cubeSize * cubeSize;
          const [r, g, b] = readPixel(pixelIdx);
          lines.push(`${r.toFixed(6)} ${g.toFixed(6)} ${b.toFixed(6)}`);
        } else {
          // Trilinear interpolation
          const r0 = Math.floor(rF);
          const g0 = Math.floor(gF);
          const b0 = Math.floor(bF);
          const r1 = Math.min(r0 + 1, cubeSize - 1);
          const g1 = Math.min(g0 + 1, cubeSize - 1);
          const b1 = Math.min(b0 + 1, cubeSize - 1);

          const rd = rF - r0;
          const gd = gF - g0;
          const bd = bF - b0;

          // Read 8 corner pixels
          const c000 = readPixel(r0 + g0 * cubeSize + b0 * cubeSize * cubeSize);
          const c100 = readPixel(r1 + g0 * cubeSize + b0 * cubeSize * cubeSize);
          const c010 = readPixel(r0 + g1 * cubeSize + b0 * cubeSize * cubeSize);
          const c110 = readPixel(r1 + g1 * cubeSize + b0 * cubeSize * cubeSize);
          const c001 = readPixel(r0 + g0 * cubeSize + b1 * cubeSize * cubeSize);
          const c101 = readPixel(r1 + g0 * cubeSize + b1 * cubeSize * cubeSize);
          const c011 = readPixel(r0 + g1 * cubeSize + b1 * cubeSize * cubeSize);
          const c111 = readPixel(r1 + g1 * cubeSize + b1 * cubeSize * cubeSize);

          // Trilinear interpolation for each channel
          const result: [number, number, number] = [0, 0, 0];
          for (let ch = 0; ch < 3; ch++) {
            const c00 = c000[ch] * (1 - rd) + c100[ch] * rd;
            const c01 = c001[ch] * (1 - rd) + c101[ch] * rd;
            const c10 = c010[ch] * (1 - rd) + c110[ch] * rd;
            const c11 = c011[ch] * (1 - rd) + c111[ch] * rd;

            const c0 = c00 * (1 - gd) + c10 * gd;
            const c1 = c01 * (1 - gd) + c11 * gd;

            result[ch] = c0 * (1 - bd) + c1 * bd;
          }

          lines.push(
            `${result[0].toFixed(6)} ${result[1].toFixed(6)} ${result[2].toFixed(6)}`
          );
        }
      }
    }
  }

  fs.writeFileSync(outputPath, lines.join("\n") + "\n");
  const stat = fs.statSync(outputPath);
  info(`LUT written: ${outputPath} (${(stat.size / 1024).toFixed(0)} KB)`);
}

// ---------------------------------------------------------------------------
// XMP-based LUT Generation (fallback — less accurate)
// ---------------------------------------------------------------------------

async function generateLutFromXmp(
  settings: LRSettings,
  lutSize: number,
  lutName: string,
  outputPath: string
): Promise<void> {
  info(
    "Generating LUT from XMP settings (approximation — HALD workflow is more accurate)"
  );

  // We'll generate by creating a HALD identity, applying ffmpeg filters, then reading it back

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "lr-to-lut-"));
  const haldIdentityPath = path.join(tmpDir, "hald_identity.png");
  const haldProcessedPath = path.join(tmpDir, "hald_processed.png");

  // Generate identity HALD
  // Use level 7 for 49^3 which is close to 33^3 output (or level 8 for 64^3)
  const haldLevel = lutSize <= 33 ? 8 : 8;
  info(`Generating HALD ${haldLevel} identity for processing...`);
  await generateHaldIdentity(haldLevel, haldIdentityPath);

  // Build ffmpeg filter chain from LR settings
  const filters: string[] = [];

  // Exposure: LR range roughly -5 to +5 EV. ffmpeg exposure filter uses EV.
  if (settings.exposure !== 0) {
    filters.push(`exposure=exposure=${settings.exposure}`);
  }

  // Contrast: LR -100 to +100. Map to ffmpeg contrast factor.
  // LR contrast 0 = 1.0, +100 ≈ 1.5, -100 ≈ 0.5
  if (settings.contrast !== 0) {
    const contrastFactor = 1 + settings.contrast / 200;
    filters.push(`eq=contrast=${contrastFactor.toFixed(4)}`);
  }

  // Temperature: LR uses Kelvin. We approximate with colortemperature filter.
  if (settings.temperature > 0) {
    filters.push(`colortemperature=temperature=${settings.temperature}`);
  }

  // Saturation: LR -100 to +100. Map to ffmpeg eq saturation (0-3, default 1)
  if (settings.saturation !== 0) {
    const satFactor = 1 + settings.saturation / 100;
    filters.push(`eq=saturation=${Math.max(0, satFactor).toFixed(4)}`);
  }

  // Vibrance
  if (settings.vibrance !== 0) {
    // ffmpeg doesn't have a vibrance filter in all builds, but let's try
    const vibIntensity = settings.vibrance / 100;
    filters.push(`vibrance=intensity=${vibIntensity.toFixed(4)}`);
  }

  // Highlights & Shadows using curves
  if (
    settings.highlights !== 0 ||
    settings.shadows !== 0 ||
    settings.whites !== 0 ||
    settings.blacks !== 0
  ) {
    // Build a curves filter string with control points
    // Map LR sliders to curve adjustments
    const points: [number, number][] = [];

    // Blacks: affects the very bottom of the curve
    const blacksShift = (settings.blacks / 100) * 0.15;
    points.push([0, Math.max(0, Math.min(1, 0 + blacksShift))]);

    // Shadows: affects the lower quarter
    const shadowsShift = (settings.shadows / 100) * 0.2;
    points.push([0.25, Math.max(0, Math.min(1, 0.25 + shadowsShift))]);

    // Midtones (unchanged)
    points.push([0.5, 0.5]);

    // Highlights: affects the upper quarter
    const highlightsShift = (settings.highlights / 100) * 0.2;
    points.push([0.75, Math.max(0, Math.min(1, 0.75 + highlightsShift))]);

    // Whites: affects the very top
    const whitesShift = (settings.whites / 100) * 0.15;
    points.push([1.0, Math.max(0, Math.min(1, 1.0 + whitesShift))]);

    const curveStr = points.map(([x, y]) => `${x.toFixed(4)}/${y.toFixed(4)}`).join(" ");
    filters.push(`curves=m='${curveStr}'`);
  }

  // Tone Curve (point curve from XMP)
  if (settings.toneCurvePV.length > 2) {
    // LR tone curve is 0-255. Normalize to 0-1.
    const points = settings.toneCurvePV.map(
      ([x, y]) =>
        `${(x / 255).toFixed(4)}/${(y / 255).toFixed(4)}`
    );
    filters.push(`curves=m='${points.join(" ")}'`);
  }

  // Per-channel tone curves
  for (const [channel, curve] of [
    ["r", settings.toneCurveRed],
    ["g", settings.toneCurveGreen],
    ["b", settings.toneCurveBlue],
  ] as const) {
    if (curve.length > 2) {
      const points = curve.map(
        ([x, y]) =>
          `${(x / 255).toFixed(4)}/${(y / 255).toFixed(4)}`
      );
      filters.push(`curves=${channel}='${points.join(" ")}'`);
    }
  }

  // Tint: shift green-magenta balance
  if (settings.tint !== 0) {
    // Tint shifts green/magenta. Approximate with colorbalance.
    const tintVal = (settings.tint / 150) * 0.3;
    filters.push(
      `colorbalance=rs=${(-tintVal).toFixed(4)}:gs=${tintVal.toFixed(4)}:bs=${(-tintVal).toFixed(4)}:rm=${(-tintVal).toFixed(4)}:gm=${tintVal.toFixed(4)}:bm=${(-tintVal).toFixed(4)}:rh=${(-tintVal).toFixed(4)}:gh=${tintVal.toFixed(4)}:bh=${(-tintVal).toFixed(4)}`
    );
  }

  // Dehaze: approximate with contrast boost + curve lift
  if (settings.dehaze !== 0) {
    const dehazeAmount = settings.dehaze / 100;
    const contrastBoost = 1 + dehazeAmount * 0.3;
    const blackLift = Math.max(0, -dehazeAmount * 0.1);
    filters.push(`eq=contrast=${contrastBoost.toFixed(4)}`);
    if (dehazeAmount > 0) {
      filters.push(
        `curves=m='0/${blackLift.toFixed(4)} 0.15/${(0.15 - dehazeAmount * 0.05).toFixed(4)} 1/1'`
      );
    }
  }

  // Color grading (split toning)
  if (settings.shadowSaturation > 0 || settings.highlightSaturation > 0) {
    // Convert hue (0-360) + saturation (0-100) to RGB offsets for colorbalance
    const hueToRgb = (
      hue: number,
      sat: number
    ): { r: number; g: number; b: number } => {
      const s = sat / 100;
      const h = (hue / 360) * 2 * Math.PI;
      return {
        r: Math.cos(h) * s * 0.3,
        g: Math.cos(h - (2 * Math.PI) / 3) * s * 0.3,
        b: Math.cos(h - (4 * Math.PI) / 3) * s * 0.3,
      };
    };

    const shadowRgb = hueToRgb(settings.shadowHue, settings.shadowSaturation);
    const highRgb = hueToRgb(settings.highlightHue, settings.highlightSaturation);

    filters.push(
      `colorbalance=` +
        `rs=${shadowRgb.r.toFixed(4)}:gs=${shadowRgb.g.toFixed(4)}:bs=${shadowRgb.b.toFixed(4)}:` +
        `rh=${highRgb.r.toFixed(4)}:gh=${highRgb.g.toFixed(4)}:bh=${highRgb.b.toFixed(4)}`
    );
  }

  if (filters.length === 0) {
    info("No adjustments detected — generating identity LUT");
    // Just write an identity LUT
    const lines: string[] = [];
    lines.push(`TITLE "${lutName}"`);
    lines.push(`LUT_3D_SIZE ${lutSize}`);
    lines.push("");
    for (let bi = 0; bi < lutSize; bi++) {
      for (let gi = 0; gi < lutSize; gi++) {
        for (let ri = 0; ri < lutSize; ri++) {
          const r = ri / (lutSize - 1);
          const g = gi / (lutSize - 1);
          const b = bi / (lutSize - 1);
          lines.push(`${r.toFixed(6)} ${g.toFixed(6)} ${b.toFixed(6)}`);
        }
      }
    }
    fs.writeFileSync(outputPath, lines.join("\n") + "\n");
    return;
  }

  const filterChain = filters.join(",");
  info(`Filter chain: ${filterChain}`);

  // Apply filters to HALD identity
  const ffmpegCmd = [
    "ffmpeg",
    "-y",
    "-i",
    haldIdentityPath,
    "-vf",
    filterChain,
    "-pix_fmt",
    "rgb48le",
    haldProcessedPath,
  ];

  try {
    execFileSync(ffmpegCmd[0], ffmpegCmd.slice(1), {
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (err: any) {
    const stderr = err.stderr?.toString() || "";
    console.warn(
      `  [warn] Some ffmpeg filters may not be available. Trying with reduced filter chain...`
    );
    console.warn(`  [warn] ffmpeg error: ${stderr.slice(0, 500)}`);

    // Retry with only basic filters
    const basicFilters = filters.filter(
      (f) =>
        f.startsWith("eq=") ||
        f.startsWith("curves=") ||
        f.startsWith("colorbalance=")
    );

    if (basicFilters.length > 0) {
      const fallbackCmd = [
        "ffmpeg",
        "-y",
        "-i",
        haldIdentityPath,
        "-vf",
        basicFilters.join(","),
        "-pix_fmt",
        "rgb48le",
        haldProcessedPath,
      ];
      try {
        execFileSync(fallbackCmd[0], fallbackCmd.slice(1), {
          stdio: ["pipe", "pipe", "pipe"],
        });
      } catch (err2: any) {
        fatal(
          `ffmpeg filter application failed. Error:\n${err2.stderr?.toString() || err2.message}`
        );
      }
    } else {
      fatal("No compatible ffmpeg filters could be applied");
    }
  }

  // Now convert the processed HALD to a .cube file
  await generateLutFromHald(
    haldProcessedPath,
    lutSize,
    lutName,
    outputPath
  );

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// Generate Command
// ---------------------------------------------------------------------------

async function commandGenerate(args: GenerateArgs): Promise<void> {
  checkBinary("ffmpeg");

  if (!fs.existsSync(args.frame)) {
    fatal(`Frame file not found: ${args.frame}`);
  }

  console.log("\n--- LUT Generation ---\n");
  info(`Frame:  ${args.frame}`);
  info(`Name:   ${args.name}`);
  info(`Size:   ${args.lutSize}x${args.lutSize}x${args.lutSize}`);

  const frameDir = path.dirname(args.frame);
  const safeName = args.name.replace(/[^a-zA-Z0-9_-]/g, "_");
  const cubePath = path.join(frameDir, `${safeName}.cube`);

  // Check for a graded HALD image (preferred workflow)
  const possibleHaldPaths = [
    path.join(frameDir, "hald_graded.tiff"),
    path.join(frameDir, "hald_graded.tif"),
    path.join(frameDir, "hald_graded.png"),
    path.join(frameDir, "hald_identity_graded.tiff"),
    path.join(frameDir, "hald_identity_graded.tif"),
    path.join(frameDir, "hald_identity_graded.png"),
    // Lightroom often exports with suffixes
    path.join(frameDir, "hald_identity-Edit.tiff"),
    path.join(frameDir, "hald_identity-Edit.tif"),
    path.join(frameDir, "hald_identity-Edit.png"),
    path.join(frameDir, "hald_identity-2.tiff"),
    path.join(frameDir, "hald_identity-2.tif"),
  ];

  let gradedHaldPath: string | null = null;
  for (const p of possibleHaldPaths) {
    if (fs.existsSync(p)) {
      gradedHaldPath = p;
      break;
    }
  }

  // Also search for any file matching hald*graded* or hald*edit*
  if (!gradedHaldPath) {
    const dirFiles = fs.readdirSync(frameDir);
    for (const f of dirFiles) {
      const lower = f.toLowerCase();
      if (
        lower.includes("hald") &&
        (lower.includes("graded") || lower.includes("edit") || lower.includes("processed")) &&
        (lower.endsWith(".tiff") ||
          lower.endsWith(".tif") ||
          lower.endsWith(".png") ||
          lower.endsWith(".jpg"))
      ) {
        gradedHaldPath = path.join(frameDir, f);
        break;
      }
    }
  }

  let settings: LRSettings | null = null;

  // Always try to read XMP for the summary
  const xmpData = findXmpData(args.frame);
  if (xmpData) {
    settings = parseXmp(xmpData);
    printSettings(settings);
  }

  if (gradedHaldPath) {
    // HALD workflow (preferred — most accurate)
    info(`Found graded HALD image: ${gradedHaldPath}`);
    console.log("  Using HALD-based LUT generation (highest accuracy)\n");

    await generateLutFromHald(gradedHaldPath, args.lutSize, args.name, cubePath);
  } else if (settings) {
    // XMP-only workflow (fallback — approximation)
    console.log(
      "  No graded HALD image found. Falling back to XMP-based approximation."
    );
    console.log(
      "  For better results, export the graded HALD identity from Lightroom.\n"
    );

    await generateLutFromXmp(settings, args.lutSize, args.name, cubePath);
  } else {
    fatal(
      `No graded HALD image or XMP sidecar found.\n\n` +
        `  Looked for graded HALD at:\n` +
        possibleHaldPaths.map((p) => `    - ${p}`).join("\n") +
        `\n\n  Looked for XMP sidecar at:\n` +
        `    - ${args.frame.replace(/\.[^.]+$/, ".xmp")}\n\n` +
        `  Make sure you've either:\n` +
        `    (a) Exported the graded HALD identity as a TIFF/PNG to the same directory, OR\n` +
        `    (b) Lightroom has written an XMP sidecar file for the frame`
    );
  }

  // Install to Resolve
  if (args.installResolve) {
    const resolveDirs = [
      path.join(
        os.homedir(),
        "Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT"
      ),
      "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT",
    ];

    let installed = false;
    for (const dir of resolveDirs) {
      if (fs.existsSync(dir)) {
        const destPath = path.join(dir, `${safeName}.cube`);
        try {
          fs.copyFileSync(cubePath, destPath);
          info(`Installed to Resolve: ${destPath}`);
          installed = true;
          break;
        } catch (err: any) {
          console.warn(
            `  [warn] Could not write to ${dir}: ${err.message}`
          );
          // Try with sudo for system dir
          if (dir.startsWith("/Library")) {
            try {
              execSync(`sudo cp "${cubePath}" "${destPath}"`, {
                stdio: "inherit",
              });
              info(`Installed to Resolve (sudo): ${destPath}`);
              installed = true;
              break;
            } catch {
              console.warn(`  [warn] sudo copy also failed`);
            }
          }
        }
      }
    }

    if (!installed) {
      console.warn(
        `  [warn] DaVinci Resolve LUT directory not found. Checked:\n` +
          resolveDirs.map((d) => `    - ${d}`).join("\n")
      );
      console.warn(
        `  [warn] Manually copy ${cubePath} to your Resolve LUT folder.`
      );
    }
  }

  // Export reference frame info
  if (xmpData) {
    const refFramePath = path.join(
      frameDir,
      `${safeName}_reference.txt`
    );
    fs.writeFileSync(
      refFramePath,
      `LUT Reference\n` +
        `=============\n` +
        `Generated: ${new Date().toISOString()}\n` +
        `Source frame: ${args.frame}\n` +
        `LUT file: ${cubePath}\n` +
        `LUT size: ${args.lutSize}x${args.lutSize}x${args.lutSize}\n` +
        `Method: ${gradedHaldPath ? "HALD identity (accurate)" : "XMP approximation"}\n` +
        (gradedHaldPath ? `Graded HALD: ${gradedHaldPath}\n` : "") +
        `\nRaw XMP settings:\n` +
        Object.entries(settings?.raw || {})
          .map(([k, v]) => `  ${k}: ${v}`)
          .join("\n") +
        "\n"
    );
    info(`Reference info: ${refFramePath}`);
  }

  console.log(`
--- Summary ---

  LUT file:  ${cubePath}
  LUT size:  ${args.lutSize}x${args.lutSize}x${args.lutSize}
  Method:    ${gradedHaldPath ? "HALD identity (highest accuracy)" : "XMP-based approximation"}

  To use in DaVinci Resolve:
    1. Open your project in Resolve
    2. Go to the Color page
    3. Right-click a node → LUT → Browse
    4. Select: ${cubePath}
    ${args.installResolve ? "(or find it in the LUT browser — it was auto-installed)" : ""}

  To use in ffmpeg:
    ffmpeg -i input.mp4 -vf "lut3d='${cubePath}'" output.mp4
`);
}

// ---------------------------------------------------------------------------
// Hot Folder Watcher
// ---------------------------------------------------------------------------

const RESOLVE_LUT_DIRS = [
  path.join(os.homedir(), "Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT"),
  "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT",
];

function getResolveLutDir(): string | null {
  for (const dir of RESOLVE_LUT_DIRS) {
    if (fs.existsSync(dir)) return dir;
  }
  return null;
}

function installLutToResolve(cubePath: string): boolean {
  const resolveDir = getResolveLutDir();
  if (!resolveDir) {
    console.warn("  [warn] DaVinci Resolve LUT directory not found");
    return false;
  }

  const bmtDir = path.join(resolveDir, "Big Muddy");
  if (!fs.existsSync(bmtDir)) {
    try {
      fs.mkdirSync(bmtDir, { recursive: true });
    } catch {
      // Try without subfolder
      const dest = path.join(resolveDir, path.basename(cubePath));
      fs.copyFileSync(cubePath, dest);
      info(`Installed LUT to Resolve: ${dest}`);
      return true;
    }
  }

  const dest = path.join(bmtDir, path.basename(cubePath));
  fs.copyFileSync(cubePath, dest);
  info(`Installed LUT to Resolve: ${dest}`);
  return true;
}

function isImageFile(filename: string): boolean {
  return /\.(tiff?|png|jpg|jpeg)$/i.test(filename);
}

function isHaldFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.includes("hald") && isImageFile(filename);
}

async function processHotFolderFile(
  filePath: string,
  lutSize: number,
  installResolve: boolean
): Promise<string | null> {
  const filename = path.basename(filePath);
  const dir = path.dirname(filePath);
  const baseName = path.basename(filename, path.extname(filename));

  // Clean up the name — strip Lightroom's "-Edit" suffix and common noise
  const cleanName = baseName
    .replace(/-Edit(\s*\(\d+\))?$/i, "")
    .replace(/\s*\(\d+\)$/, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  const cubeName = cleanName.endsWith("-grade") ? cleanName : `${cleanName}-grade`;
  const cubePath = path.join(dir, `${cubeName}.cube`);

  console.log(`\n🎨 Processing: ${filename}`);

  if (isHaldFile(filename)) {
    // This is a graded HALD — convert directly to LUT
    info("Detected graded HALD identity image");
    try {
      const { haldToCubeLut } = await getHaldConverter();
      await haldToCubeLut(filePath, lutSize, cubeName, cubePath);
      console.log(`  ✅ Generated LUT: ${cubePath}`);

      if (installResolve) {
        installLutToResolve(cubePath);
      }

      // Archive the processed file
      archiveFile(filePath, dir);
      return cubePath;
    } catch (err) {
      console.error(`  ❌ Failed to process HALD: ${err}`);
      return null;
    }
  }

  // Not a HALD — check for XMP sidecar
  const xmpPath = path.join(dir, `${baseName}.xmp`);
  if (fs.existsSync(xmpPath)) {
    info("Found XMP sidecar — generating LUT from Lightroom adjustments");
    // Use the generate workflow with XMP
    try {
      // Create a synthetic generate args
      const genArgs: GenerateArgs = {
        command: "generate",
        frame: filePath,
        name: cubeName,
        installResolve,
        lutSize,
      };
      await commandGenerate(genArgs);
      archiveFile(filePath, dir);
      return cubePath;
    } catch (err) {
      console.error(`  ❌ Failed to generate from XMP: ${err}`);
      return null;
    }
  }

  info("No HALD pattern or XMP sidecar found — skipping");
  return null;
}

// Lazy import for haldToCubeLut to avoid circular issues
async function getHaldConverter() {
  const sharp = (await import("sharp")).default;

  async function haldToCubeLut(
    haldPath: string,
    lutSize: number,
    lutName: string,
    outputPath: string
  ): Promise<void> {
    const img = sharp(haldPath);
    const { data, info: rawInfo } = await img
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = rawInfo.width;
    const height = rawInfo.height;
    const channels = rawInfo.channels;

    // Determine the HALD level from dimensions
    // HALD level L: image is L^3 x L^3, cube size = L^2
    const imgDim = width;
    let haldLevel = 0;
    for (let l = 2; l <= 16; l++) {
      if (l * l * l === imgDim) {
        haldLevel = l;
        break;
      }
    }

    if (haldLevel === 0) {
      throw new Error(
        `Image ${width}x${height} doesn't match any HALD level. ` +
        `Expected dimensions like 512x512 (level 8) or 729x729 (level 9).`
      );
    }

    const haldCubeSize = haldLevel * haldLevel; // e.g., 64 for level 8
    info(`HALD level ${haldLevel}: ${width}x${height}, native cube size ${haldCubeSize}`);

    // Read the full HALD cube
    const fullCube: [number, number, number][] = [];
    const totalPx = width * height;

    for (let i = 0; i < totalPx; i++) {
      const offset = i * channels;
      fullCube.push([
        data[offset] / 255.0,
        data[offset + 1] / 255.0,
        data[offset + 2] / 255.0,
      ]);
    }

    // Resample to target LUT size using trilinear interpolation
    const lines: string[] = [];
    lines.push(`TITLE "${lutName}"`);
    lines.push(`# Generated by lr-to-lut.ts — Big Muddy Media`);
    lines.push(`# Source: ${path.basename(haldPath)}`);
    lines.push(`# Date: ${new Date().toISOString()}`);
    lines.push(`LUT_3D_SIZE ${lutSize}`);
    lines.push("");

    for (let bi = 0; bi < lutSize; bi++) {
      for (let gi = 0; gi < lutSize; gi++) {
        for (let ri = 0; ri < lutSize; ri++) {
          // Map from target LUT indices to HALD cube position
          const r = (ri / (lutSize - 1)) * (haldCubeSize - 1);
          const g = (gi / (lutSize - 1)) * (haldCubeSize - 1);
          const b = (bi / (lutSize - 1)) * (haldCubeSize - 1);

          // Trilinear interpolation in the HALD cube
          const r0 = Math.floor(r), r1 = Math.min(r0 + 1, haldCubeSize - 1);
          const g0 = Math.floor(g), g1 = Math.min(g0 + 1, haldCubeSize - 1);
          const b0 = Math.floor(b), b1 = Math.min(b0 + 1, haldCubeSize - 1);

          const rf = r - r0, gf = g - g0, bf = b - b0;

          const idx = (ri2: number, gi2: number, bi2: number) =>
            ri2 + gi2 * haldCubeSize + bi2 * haldCubeSize * haldCubeSize;

          const c000 = fullCube[idx(r0, g0, b0)];
          const c100 = fullCube[idx(r1, g0, b0)];
          const c010 = fullCube[idx(r0, g1, b0)];
          const c110 = fullCube[idx(r1, g1, b0)];
          const c001 = fullCube[idx(r0, g0, b1)];
          const c101 = fullCube[idx(r1, g0, b1)];
          const c011 = fullCube[idx(r0, g1, b1)];
          const c111 = fullCube[idx(r1, g1, b1)];

          const out: [number, number, number] = [0, 0, 0];
          for (let ch = 0; ch < 3; ch++) {
            const c00 = c000[ch] * (1 - rf) + c100[ch] * rf;
            const c01 = c001[ch] * (1 - rf) + c101[ch] * rf;
            const c10 = c010[ch] * (1 - rf) + c110[ch] * rf;
            const c11 = c011[ch] * (1 - rf) + c111[ch] * rf;
            const c0 = c00 * (1 - gf) + c10 * gf;
            const c1 = c01 * (1 - gf) + c11 * gf;
            out[ch] = c0 * (1 - bf) + c1 * bf;
          }

          lines.push(
            `${out[0].toFixed(6)} ${out[1].toFixed(6)} ${out[2].toFixed(6)}`
          );
        }
      }
    }

    fs.writeFileSync(outputPath, lines.join("\n") + "\n");
  }

  return { haldToCubeLut };
}

function archiveFile(filePath: string, dir: string): void {
  const archiveDir = path.join(dir, "archive");
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  const filename = path.basename(filePath);
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const archiveName = `${base}_${date}${ext}`;
  const archivePath = path.join(archiveDir, archiveName);

  fs.renameSync(filePath, archivePath);
  info(`Archived: ${archiveName}`);
}

async function commandWatch(args: WatchArgs): Promise<void> {
  const hotFolder = args.hotFolder;

  // Create hot folder if it doesn't exist
  if (!fs.existsSync(hotFolder)) {
    fs.mkdirSync(hotFolder, { recursive: true });
    info(`Created hot folder: ${hotFolder}`);
  }

  // Create archive subfolder
  const archiveDir = path.join(hotFolder, "archive");
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  const resolveDir = getResolveLutDir();

  console.log(`
🔥 Hot Folder Watcher — lr-to-lut
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Watching:        ${hotFolder}
  LUT size:        ${args.lutSize}x${args.lutSize}x${args.lutSize}
  Auto-install:    ${args.installResolve ? "YES → " + (resolveDir || "not found") : "no"}
  Archive folder:  ${archiveDir}

  Set Lightroom export destination to:
    ${hotFolder}

  Export your graded HALD identity as TIFF or PNG.
  The .cube LUT will appear automatically.

  Press Ctrl+C to stop.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  // Process any existing files first
  const existingFiles = fs.readdirSync(hotFolder).filter(isImageFile);
  for (const file of existingFiles) {
    await processHotFolderFile(
      path.join(hotFolder, file),
      args.lutSize,
      args.installResolve
    );
  }

  // Watch for new files using fs.watch
  const processing = new Set<string>();
  const debounceTimers = new Map<string, NodeJS.Timeout>();

  fs.watch(hotFolder, { persistent: true }, (eventType, filename) => {
    if (!filename || !isImageFile(filename)) return;

    const filePath = path.join(hotFolder, filename);

    // Debounce — Lightroom writes files progressively
    if (debounceTimers.has(filename)) {
      clearTimeout(debounceTimers.get(filename)!);
    }

    debounceTimers.set(
      filename,
      setTimeout(async () => {
        debounceTimers.delete(filename);

        // Skip if already processing or file was archived
        if (processing.has(filename)) return;
        if (!fs.existsSync(filePath)) return;

        // Wait a moment to ensure file is fully written
        const stat1 = fs.statSync(filePath);
        await new Promise((r) => setTimeout(r, 1000));
        if (!fs.existsSync(filePath)) return;
        const stat2 = fs.statSync(filePath);

        // If file size is still changing, wait more
        if (stat1.size !== stat2.size) {
          await new Promise((r) => setTimeout(r, 3000));
          if (!fs.existsSync(filePath)) return;
        }

        processing.add(filename);
        try {
          const cubePath = await processHotFolderFile(
            filePath,
            args.lutSize,
            args.installResolve
          );
          if (cubePath) {
            console.log(`\n  ✅ LUT ready: ${cubePath}`);
            if (args.installResolve) {
              console.log(`  📂 Available in Resolve under "Big Muddy" LUT folder`);
            }
            console.log(`\n  Watching for next export...`);
          }
        } finally {
          processing.delete(filename);
        }
      }, 2000) // 2 second debounce
    );
  });

  // Keep process alive
  await new Promise(() => {}); // never resolves — runs until Ctrl+C
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  if (args.command === "help") {
    printHelp();
    process.exit(0);
  }

  if (args.command === "extract") {
    await commandExtract(args);
  } else if (args.command === "generate") {
    await commandGenerate(args);
  } else if (args.command === "watch") {
    await commandWatch(args);
  }
}

main().catch((err) => {
  console.error(`\nFATAL: ${err.message}\n`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
