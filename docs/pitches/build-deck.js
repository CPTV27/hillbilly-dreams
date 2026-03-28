const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaMapMarkerAlt, FaMusic, FaNewspaper, FaCamera,
  FaMicrophone, FaSearch, FaRocket, FaStar,
  FaUsers, FaHandshake, FaChartLine, FaGlobe
} = require("react-icons/fa");

// ── Icon rendering ──
function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Color palette: Warm Terracotta + Deep River ──
const C = {
  bg:        "1A1512",  // deep brown-black
  bgAlt:     "241F1A",  // slightly lighter
  surface:   "2C2520",  // card backgrounds
  cream:     "F5EDE0",  // primary text
  creamMute: "D4C8BA",  // muted text (brightened for contrast)
  accent:    "C4713B",  // warm terracotta/copper
  accentLt:  "D4915F",  // lighter accent
  gold:      "D4A849",  // gold highlight
  white:     "FFFFFF",
};

// ── Helper: fresh shadow ──
const mkShadow = () => ({
  type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.3
});

async function buildDeck() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Hillbilly Dreams Inc.";
  pres.title = "Natchez: The Next-Gen Tourism Playbook";

  // Pre-render icons
  const iconMap = await iconToBase64Png(FaMapMarkerAlt, `#${C.accent}`);
  const iconMusic = await iconToBase64Png(FaMusic, `#${C.accent}`);
  const iconNews = await iconToBase64Png(FaNewspaper, `#${C.accent}`);
  const iconCam = await iconToBase64Png(FaCamera, `#${C.accent}`);
  const iconMic = await iconToBase64Png(FaMicrophone, `#${C.accent}`);
  const iconSearch = await iconToBase64Png(FaSearch, `#${C.accent}`);
  const iconRocket = await iconToBase64Png(FaRocket, `#${C.gold}`);
  const iconStar = await iconToBase64Png(FaStar, `#${C.gold}`);
  const iconUsers = await iconToBase64Png(FaUsers, `#${C.accent}`);
  const iconHandshake = await iconToBase64Png(FaHandshake, `#${C.gold}`);
  const iconChart = await iconToBase64Png(FaChartLine, `#${C.accent}`);
  const iconGlobe = await iconToBase64Png(FaGlobe, `#${C.accent}`);

  // ════════════════════════════════════════════════
  // SLIDE 1: Title
  // ════════════════════════════════════════════════
  let s1 = pres.addSlide();
  s1.background = { color: C.bg };

  // Accent bar at top
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
  });

  // Badge
  s1.addText("HILLBILLY DREAMS INC.", {
    x: 0.8, y: 1.2, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 6,
    color: C.creamMute, align: "left", margin: 0
  });

  // Main title
  s1.addText("NATCHEZ", {
    x: 0.8, y: 1.7, w: 8.5, h: 1.2,
    fontSize: 54, fontFace: "Georgia", bold: true,
    color: C.cream, align: "left", margin: 0
  });
  s1.addText("The Next-Gen Tourism Playbook", {
    x: 0.8, y: 2.8, w: 8, h: 0.7,
    fontSize: 26, fontFace: "Georgia", italic: true,
    color: C.accentLt, align: "left", margin: 0
  });

  // Divider
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.7, w: 2.5, h: 0.04, fill: { color: C.accent }
  });

  // Subtitle
  s1.addText("Turning 700,000 Visitors into Local Economic Velocity", {
    x: 0.8, y: 4.0, w: 7, h: 0.5,
    fontSize: 16, fontFace: "Calibri",
    color: C.creamMute, align: "left", margin: 0
  });

  // Right-side decorative block (visual balance)
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 1.5, w: 2.0, h: 2.8,
    fill: { color: C.surface }
  });
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 1.5, w: 2.0, h: 0.06,
    fill: { color: C.accent }
  });
  s1.addText("700K\nvisitors\nannually", {
    x: 7.5, y: 1.8, w: 2.0, h: 2.2,
    fontSize: 20, fontFace: "Georgia",
    color: C.creamMute, align: "center", valign: "middle", margin: 0
  });

  // Footer
  s1.addText("Presented by Hillbilly Dreams Inc.  \u00B7  Natchez, Mississippi", {
    x: 0.8, y: 4.9, w: 8, h: 0.3,
    fontSize: 11, fontFace: "Calibri",
    color: C.creamMute, align: "left", margin: 0
  });

  // ════════════════════════════════════════════════
  // SLIDE 2: The Opportunity
  // ════════════════════════════════════════════════
  let s2 = pres.addSlide();
  s2.background = { color: C.bg };
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });

  s2.addText("THE OPPORTUNITY", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s2.addText("From Volume to Value", {
    x: 0.8, y: 0.8, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  // Big stat
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.8, w: 3.6, h: 2.2,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s2.addText("700,000", {
    x: 0.8, y: 1.95, w: 3.6, h: 1.0,
    fontSize: 48, fontFace: "Georgia", bold: true,
    color: C.gold, align: "center", margin: 0
  });
  s2.addText("annual visitors to Natchez", {
    x: 0.8, y: 2.85, w: 3.6, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: C.creamMute, align: "center", margin: 0
  });
  s2.addText("$187.6M tourism revenue (2023)", {
    x: 0.8, y: 3.3, w: 3.6, h: 0.4,
    fontSize: 12, fontFace: "Calibri",
    color: C.accent, align: "center", margin: 0
  });

  // Problem / Goal cards
  const problemX = 5.0;
  // Problem
  s2.addShape(pres.shapes.RECTANGLE, {
    x: problemX, y: 1.8, w: 4.2, h: 1.0,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s2.addText("THE PROBLEM", {
    x: problemX + 0.2, y: 1.9, w: 3.8, h: 0.3,
    fontSize: 10, fontFace: "Georgia", charSpacing: 3,
    color: C.accent, margin: 0
  });
  s2.addText("Most visitors see the \"Greatest Hits\" but miss the Main Street heartbeat.", {
    x: problemX + 0.2, y: 2.2, w: 3.8, h: 0.5,
    fontSize: 13, fontFace: "Calibri",
    color: C.cream, margin: 0
  });

  // Goal
  s2.addShape(pres.shapes.RECTANGLE, {
    x: problemX, y: 3.0, w: 4.2, h: 1.0,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s2.addText("THE GOAL", {
    x: problemX + 0.2, y: 3.1, w: 3.8, h: 0.3,
    fontSize: 10, fontFace: "Georgia", charSpacing: 3,
    color: C.gold, margin: 0
  });
  s2.addText("Increase Local Velocity \u2014 tourist dollars moving through small restaurants, shops, and makers.", {
    x: problemX + 0.2, y: 3.4, w: 3.8, h: 0.5,
    fontSize: 13, fontFace: "Calibri",
    color: C.cream, margin: 0
  });

  // Footer
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.2, w: 10, h: 0.425,
    fill: { color: C.bgAlt }
  });
  s2.addText("Sources: Visit Natchez, Adams County tourism data (2023)", {
    x: 0.8, y: 5.25, w: 8, h: 0.3,
    fontSize: 9, fontFace: "Calibri", italic: true,
    color: C.creamMute, margin: 0
  });

  // ════════════════════════════════════════════════
  // SLIDE 3: Three Engines
  // ════════════════════════════════════════════════
  let s3 = pres.addSlide();
  s3.background = { color: C.bg };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });

  s3.addText("WHAT YOU GET", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s3.addText("Three Engines, One Partner", {
    x: 0.8, y: 0.8, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  // Three engine cards
  const engines = [
    { icon: iconMap, label: "THE ANCHOR", title: "Big Muddy Inn", desc: "A physical \"front porch\" for the city\u2019s culture. The place where visitors become regulars." },
    { icon: iconNews, label: "THE MEDIA ECOSYSTEM", title: "Magazine & Radio", desc: "High-fidelity, evergreen content that tourists actually want to consume. Year-round brand awareness." },
    { icon: iconGlobe, label: "THE DIRECTORY", title: "Deep South Directory", desc: "Connects tourists to Main Street businesses \u2014 and makes sure they show up in AI search, not just Google." },
  ];

  engines.forEach((eng, i) => {
    const cardX = 0.8 + i * 3.05;
    const cardW = 2.75;
    s3.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: 1.8, w: cardW, h: 3.0,
      fill: { color: C.surface }, shadow: mkShadow()
    });
    // Accent top bar
    s3.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: 1.8, w: cardW, h: 0.06,
      fill: { color: i === 0 ? C.accent : i === 1 ? C.gold : C.accentLt }
    });
    // Icon
    s3.addImage({ data: eng.icon, x: cardX + 0.25, y: 2.1, w: 0.4, h: 0.4 });
    // Label
    s3.addText(eng.label, {
      x: cardX + 0.25, y: 2.6, w: cardW - 0.5, h: 0.3,
      fontSize: 9, fontFace: "Georgia", charSpacing: 3,
      color: C.accent, margin: 0
    });
    // Title
    s3.addText(eng.title, {
      x: cardX + 0.25, y: 2.9, w: cardW - 0.5, h: 0.4,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: C.cream, margin: 0
    });
    // Desc
    s3.addText(eng.desc, {
      x: cardX + 0.25, y: 3.35, w: cardW - 0.5, h: 1.2,
      fontSize: 12, fontFace: "Calibri",
      color: C.creamMute, margin: 0
    });
  });

  // ════════════════════════════════════════════════
  // SLIDE 4: The Media Ecosystem
  // ════════════════════════════════════════════════
  let s4 = pres.addSlide();
  s4.background = { color: C.bg };
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });

  s4.addText("ENGINE 2", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s4.addText("The Media Ecosystem", {
    x: 0.8, y: 0.8, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  s4.addText("Instead of one-off ads, we provide a continuous content stream:", {
    x: 0.8, y: 1.5, w: 8, h: 0.4,
    fontSize: 14, fontFace: "Calibri", italic: true,
    color: C.creamMute, margin: 0
  });

  const media = [
    { icon: iconNews, title: "Big Muddy Magazine", desc: "A Sponsored City Guide for Natchez \u2014 not a brochure, but coffee-table quality editorial." },
    { icon: iconMic, title: "Big Muddy Radio", desc: "Native advertising and live sessions recorded in Natchez, streaming globally for year-round awareness." },
    { icon: iconCam, title: "Content Strategy", desc: "We fill the void. Editorial photography, video, and written content across every channel \u2014 building the presence that makes Natchez visible." },
  ];

  media.forEach((m, i) => {
    const rowY = 2.1 + i * 1.1;
    s4.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: rowY, w: 8.4, h: 0.9,
      fill: { color: C.surface }, shadow: mkShadow()
    });
    s4.addImage({ data: m.icon, x: 1.1, y: rowY + 0.2, w: 0.45, h: 0.45 });
    s4.addText(m.title, {
      x: 1.8, y: rowY + 0.1, w: 6, h: 0.35,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: C.cream, margin: 0
    });
    s4.addText(m.desc, {
      x: 1.8, y: rowY + 0.45, w: 7, h: 0.35,
      fontSize: 12, fontFace: "Calibri",
      color: C.creamMute, margin: 0
    });
  });

  // ════════════════════════════════════════════════
  // SLIDE 5: Digitizing Main Street
  // ════════════════════════════════════════════════
  let s5 = pres.addSlide();
  s5.background = { color: C.bg };
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });

  s5.addText("ENGINE 3", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s5.addText("Digitizing Main Street", {
    x: 0.8, y: 0.8, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  // DSD card
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.8, w: 4.0, h: 2.5,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 4.0, h: 0.06, fill: { color: C.accent } });
  s5.addImage({ data: iconGlobe, x: 1.1, y: 2.1, w: 0.4, h: 0.4 });
  s5.addText("Deep South Directory", {
    x: 1.1, y: 2.6, w: 3.4, h: 0.35,
    fontSize: 16, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });
  s5.addText("AI-powered platform that manages reviews, social media, and search presence for Natchez restaurants and shops.", {
    x: 1.1, y: 3.0, w: 3.4, h: 0.9,
    fontSize: 12, fontFace: "Calibri",
    color: C.creamMute, margin: 0
  });

  // AI Search card
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.8, w: 4.0, h: 2.5,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s5.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.8, w: 4.0, h: 0.06, fill: { color: C.gold } });
  s5.addImage({ data: iconSearch, x: 5.5, y: 2.1, w: 0.4, h: 0.4 });
  s5.addText("AI Search Optimization", {
    x: 5.5, y: 2.6, w: 3.4, h: 0.35,
    fontSize: 16, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });
  s5.addText("When someone asks ChatGPT, Google AI, or Perplexity \"where should I eat in Natchez,\" your businesses show up. This is the new SEO.", {
    x: 5.5, y: 3.0, w: 3.4, h: 0.9,
    fontSize: 12, fontFace: "Calibri",
    color: C.creamMute, margin: 0
  });

  // Ecosystem advantage callout
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.5, w: 8.4, h: 0.8,
    fill: { color: C.bgAlt }
  });
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.5, w: 0.06, h: 0.8, fill: { color: C.accent } });
  s5.addText("The Ecosystem Advantage: Directory businesses get featured in the Magazine, mentioned on Radio, and included in social campaigns. No other platform offers editorial coverage + AI tools in one package.", {
    x: 1.15, y: 4.55, w: 7.8, h: 0.7,
    fontSize: 12, fontFace: "Calibri", italic: true,
    color: C.cream, margin: 0
  });

  // ════════════════════════════════════════════════
  // SLIDE 6: Negative-CAC Model
  // ════════════════════════════════════════════════
  let s6 = pres.addSlide();
  s6.background = { color: C.bg };
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });

  s6.addText("THE MODEL", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s6.addText("Negative-CAC: We Generate Our Own Audience", {
    x: 0.8, y: 0.8, w: 8.5, h: 0.7,
    fontSize: 28, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  s6.addText("Every live show, podcast, or magazine feature is a marketing event for Natchez that costs the Tourism Office $0 to produce.", {
    x: 0.8, y: 1.6, w: 8, h: 0.5,
    fontSize: 15, fontFace: "Calibri", italic: true,
    color: C.creamMute, margin: 0
  });

  // Content multiplication flow
  const flowItems = [
    { num: "1", label: "Show", color: C.gold },
    { num: "1", label: "Radio Episode", color: C.gold },
    { num: "1", label: "Magazine Feature", color: C.gold },
    { num: "10", label: "Social Posts", color: C.gold },
    { num: "100", label: "AI Search Touches", color: C.gold },
  ];

  flowItems.forEach((item, i) => {
    const fx = 0.8 + i * 1.85;
    s6.addShape(pres.shapes.RECTANGLE, {
      x: fx, y: 2.5, w: 1.6, h: 1.8,
      fill: { color: C.surface }, shadow: mkShadow()
    });
    s6.addShape(pres.shapes.RECTANGLE, { x: fx, y: 2.5, w: 1.6, h: 0.06, fill: { color: item.color } });
    s6.addText(item.num, {
      x: fx, y: 2.7, w: 1.6, h: 0.8,
      fontSize: 36, fontFace: "Georgia", bold: true,
      color: item.color, align: "center", margin: 0
    });
    s6.addText(item.label, {
      x: fx + 0.1, y: 3.5, w: 1.4, h: 0.6,
      fontSize: 12, fontFace: "Calibri",
      color: C.cream, align: "center", margin: 0
    });
    // Arrow between cards
    if (i < flowItems.length - 1) {
      s6.addText("\u25B6", {
        x: fx + 1.6, y: 3.0, w: 0.25, h: 0.5,
        fontSize: 14, color: C.accent, align: "center", margin: 0
      });
    }
  });

  // Bottom callout
  s6.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.7, w: 8.4, h: 0.6,
    fill: { color: C.bgAlt }
  });
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.7, w: 0.06, h: 0.6, fill: { color: C.gold } });
  s6.addText("You don\u2019t just spend your budget with us. We generate an audience you keep.", {
    x: 1.15, y: 4.75, w: 7.8, h: 0.5,
    fontSize: 14, fontFace: "Georgia", italic: true,
    color: C.cream, margin: 0
  });

  // ════════════════════════════════════════════════
  // SLIDE 7: The Proposal
  // ════════════════════════════════════════════════
  let s7 = pres.addSlide();
  s7.background = { color: C.bg };
  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

  s7.addText("THE PROPOSAL", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s7.addText("Anchor Partnership", {
    x: 0.8, y: 0.8, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  // Deliverables
  const deliverables = [
    { icon: iconCam, text: "Monthly Content Production \u2014 professional photography and video for city use" },
    { icon: iconStar, text: "Featured Placement \u2014 permanent Anchor status in Big Muddy Magazine and Radio" },
    { icon: iconGlobe, text: "Directory Accounts \u2014 for local SMBs to boost the city\u2019s digital and AI search presence" },
    { icon: iconUsers, text: "Community Enrichment \u2014 onboard qualifying businesses into free AI business tools" },
    { icon: iconNews, text: "Quarterly City Guide \u2014 \"The Natchez Compass,\" coffee-table quality, print + digital" },
    { icon: iconCam, text: "Content Production \u2014 editorial photography, video, and written content filling the void across every channel" },
    { icon: iconSearch, text: "AI + SEO Equity \u2014 every piece of content builds search visibility, AI visibility, and social presence simultaneously" },
  ];

  deliverables.forEach((d, i) => {
    const rowY = 1.65 + i * 0.5;
    s7.addImage({ data: d.icon, x: 1.0, y: rowY + 0.05, w: 0.3, h: 0.3 });
    s7.addText(d.text, {
      x: 1.5, y: rowY, w: 7.5, h: 0.4,
      fontSize: 13, fontFace: "Calibri",
      color: C.cream, margin: 0
    });
    if (i < deliverables.length - 1) {
      s7.addShape(pres.shapes.LINE, {
        x: 1.0, y: rowY + 0.45, w: 8.0, h: 0,
        line: { color: C.surface, width: 0.5 }
      });
    }
  });

  // Footer callout
  s7.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 5.0, w: 8.4, h: 0.4,
    fill: { color: C.bgAlt }
  });
  s7.addText("Scope and investment determined together. Let\u2019s talk about what Natchez needs.", {
    x: 1.0, y: 5.0, w: 8, h: 0.4,
    fontSize: 12, fontFace: "Georgia", italic: true,
    color: C.gold, align: "center", margin: 0
  });

  // ════════════════════════════════════════════════
  // SLIDE 8: Next Steps
  // ════════════════════════════════════════════════
  let s8 = pres.addSlide();
  s8.background = { color: C.bg };
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

  s8.addText("NEXT STEPS", {
    x: 0.8, y: 0.4, w: 8, h: 0.4,
    fontSize: 11, fontFace: "Georgia", charSpacing: 5,
    color: C.creamMute, margin: 0
  });
  s8.addText("Let\u2019s Build This Together", {
    x: 0.8, y: 1.0, w: 8, h: 0.8,
    fontSize: 36, fontFace: "Georgia", bold: true,
    color: C.cream, margin: 0
  });

  // Two cards
  // 90-day pilot
  s8.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 2.2, w: 4.0, h: 2.0,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.2, w: 4.0, h: 0.06, fill: { color: C.accent } });
  s8.addImage({ data: iconRocket, x: 1.1, y: 2.5, w: 0.4, h: 0.4 });
  s8.addText("THE PILOT", {
    x: 1.1, y: 2.95, w: 3.4, h: 0.3,
    fontSize: 10, fontFace: "Georgia", charSpacing: 3,
    color: C.accent, margin: 0
  });
  s8.addText("90 days to live. City Guide, business listings, and Radio content stream all running within the first quarter.", {
    x: 1.1, y: 3.3, w: 3.4, h: 0.7,
    fontSize: 13, fontFace: "Calibri",
    color: C.cream, margin: 0
  });

  // The proof
  s8.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.2, w: 4.0, h: 2.0,
    fill: { color: C.surface }, shadow: mkShadow()
  });
  s8.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.2, w: 4.0, h: 0.06, fill: { color: C.gold } });
  s8.addImage({ data: iconChart, x: 5.5, y: 2.5, w: 0.4, h: 0.4 });
  s8.addText("THE PROOF", {
    x: 5.5, y: 2.95, w: 3.4, h: 0.3,
    fontSize: 10, fontFace: "Georgia", charSpacing: 3,
    color: C.gold, margin: 0
  });
  s8.addText("Economic impact report showing content reach, directory traffic, and AI search visibility within the first quarter.", {
    x: 5.5, y: 3.3, w: 3.4, h: 0.7,
    fontSize: 13, fontFace: "Calibri",
    color: C.cream, margin: 0
  });

  // Contact footer
  s8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.7, w: 10, h: 0.925,
    fill: { color: C.bgAlt }
  });
  s8.addText("Chase Pierson  \u00B7  Hillbilly Dreams Inc.  \u00B7  Natchez, Mississippi", {
    x: 1.2, y: 4.85, w: 7.6, h: 0.3,
    fontSize: 14, fontFace: "Georgia",
    color: C.cream, align: "left", margin: 0
  });
  s8.addText("hillbillydreamsinc.com  \u00B7  chase@hillbillydreamsinc.com", {
    x: 1.2, y: 5.2, w: 7.6, h: 0.3,
    fontSize: 12, fontFace: "Calibri",
    color: C.accent, align: "left", margin: 0
  });

  // ── Write file ──
  await pres.writeFile({ fileName: "docs/pitches/Natchez-Tourism-Playbook.pptx" });
  console.log("Deck written to docs/pitches/Natchez-Tourism-Playbook.pptx");
}

buildDeck().catch(console.error);
