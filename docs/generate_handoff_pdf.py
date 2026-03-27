#!/usr/bin/env python3
"""Generate Scan2Plan CPQ Handoff Package PDF."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable, KeepTogether
)

OUTPUT = "/Users/chasethis/hillbilly-dreams/docs/Scan2Plan_CPQ_Handoff_Package.pdf"

# Colors
DARK = HexColor("#1a1a2e")
ACCENT = HexColor("#2563eb")
GRAY = HexColor("#64748b")
LIGHT_BG = HexColor("#f1f5f9")
WHITE = HexColor("#ffffff")
BLACK = HexColor("#000000")

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle(
    "CoverTitle", parent=styles["Title"], fontSize=28, leading=34,
    textColor=DARK, alignment=TA_CENTER, spaceAfter=12
))
styles.add(ParagraphStyle(
    "CoverSub", parent=styles["Normal"], fontSize=14, leading=18,
    textColor=GRAY, alignment=TA_CENTER, spaceAfter=6
))
styles.add(ParagraphStyle(
    "SectionHead", parent=styles["Heading1"], fontSize=18, leading=22,
    textColor=DARK, spaceBefore=20, spaceAfter=10,
    borderWidth=0, borderPadding=0
))
styles.add(ParagraphStyle(
    "SubHead", parent=styles["Heading2"], fontSize=14, leading=17,
    textColor=ACCENT, spaceBefore=14, spaceAfter=6
))
styles.add(ParagraphStyle(
    "SubHead3", parent=styles["Heading3"], fontSize=12, leading=15,
    textColor=DARK, spaceBefore=10, spaceAfter=4
))
styles.add(ParagraphStyle(
    "Body", parent=styles["Normal"], fontSize=10, leading=14,
    textColor=BLACK, spaceAfter=6
))
styles.add(ParagraphStyle(
    "BodySmall", parent=styles["Normal"], fontSize=9, leading=12,
    textColor=GRAY, spaceAfter=4
))
styles.add(ParagraphStyle(
    "BulletItem", parent=styles["Normal"], fontSize=10, leading=14,
    textColor=BLACK, leftIndent=20, bulletIndent=8, spaceAfter=3
))
styles.add(ParagraphStyle(
    "CodeBlock", parent=styles["Normal"], fontSize=9, leading=12,
    fontName="Courier", textColor=DARK, leftIndent=16, spaceAfter=4
))
styles.add(ParagraphStyle(
    "Warning", parent=styles["Normal"], fontSize=10, leading=14,
    textColor=HexColor("#dc2626"), leftIndent=12, spaceAfter=6
))
styles.add(ParagraphStyle(
    "FooterNote", parent=styles["Normal"], fontSize=8, leading=10,
    textColor=GRAY, alignment=TA_CENTER
))

def hr():
    return HRFlowable(width="100%", thickness=1, color=HexColor("#e2e8f0"), spaceAfter=10, spaceBefore=6)

def make_table(headers, rows, col_widths=None):
    data = [headers] + rows
    if col_widths is None:
        col_widths = [None] * len(headers)
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#1e293b")),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("LEADING", (0, 0), (-1, -1), 12),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#cbd5e1")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, HexColor("#f8fafc")]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]
    t.setStyle(TableStyle(style))
    return t

def build():
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=letter,
        leftMargin=0.75*inch, rightMargin=0.75*inch,
        topMargin=0.75*inch, bottomMargin=0.75*inch,
        title="Scan2Plan CPQ - Handoff Package",
        author="Chase Pierson"
    )
    story = []
    W = doc.width

    # ─── COVER PAGE ───
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("Scan2Plan CPQ", styles["CoverTitle"]))
    story.append(Paragraph("Handoff Package for Elijah Tuttle", styles["CoverSub"]))
    story.append(Spacer(1, 24))
    story.append(HRFlowable(width="40%", thickness=2, color=ACCENT, spaceAfter=24, spaceBefore=0))
    story.append(Paragraph("Prepared by Chase Pierson", styles["CoverSub"]))
    story.append(Paragraph("March 26, 2026", styles["CoverSub"]))
    story.append(Spacer(1, 36))
    story.append(Paragraph(
        "Owen declined the partnership on March 25, 2026. This package covers "
        "infrastructure, data, and product documentation so Elijah can operate "
        "the Scan2Plan CPQ independently.",
        ParagraphStyle("CoverBody", parent=styles["Normal"], fontSize=11, leading=16,
                       textColor=GRAY, alignment=TA_CENTER)
    ))
    story.append(Spacer(1, 24))
    story.append(Paragraph(
        '<b>Live Product:</b> <a href="https://pipeline.scan2plan.dev/" color="#2563eb">https://pipeline.scan2plan.dev/</a>',
        ParagraphStyle("CoverLink", parent=styles["Normal"], fontSize=11, alignment=TA_CENTER)
    ))
    story.append(PageBreak())

    # ─── TABLE OF CONTENTS ───
    story.append(Paragraph("Table of Contents", styles["SectionHead"]))
    story.append(hr())
    toc_items = [
        "Part I: What You're Getting (and What You're Not)",
        "Part II: Product Overview",
        "Part III: GCP Infrastructure",
        "Part IV: Google Cloud Storage",
        "Part V: Firebase & Hosting",
        "Part VI: Database",
        "Part VII: Cloud Run Services",
        "Part VIII: Environment Variables & Secrets",
        "Part IX: Domains & DNS",
        "Part X: Third-Party Integrations",
        "Part XI: Auth Architecture",
        "Part XII: How to Get This Running",
        "Part XIII: Credentials Checklist",
        "Part XIV: Ownership Boundary",
        "Part XV: Product Documentation Summary",
        "Part XVI: Development Timeline",
        "Part XVII: Product Manual Summary",
        "Part XVIII: Financial Notes",
    ]
    for i, item in enumerate(toc_items, 1):
        story.append(Paragraph(f"{i}. {item}", styles["Body"]))
    story.append(PageBreak())

    # ─── PART I ───
    story.append(Paragraph("Part I: What You're Getting (and What You're Not)", styles["SectionHead"]))
    story.append(hr())

    story.append(Paragraph("Transfers to Elijah", styles["SubHead"]))
    for item in [
        "<b>GCP project access</b> (<font name='Courier' size='9'>s2px-production</font>) -- IAM roles for managing infrastructure",
        "<b>GCS scan data and project files</b> -- all business data in the storage buckets",
        "<b>Database access</b> -- Cloud SQL connection for the production PostgreSQL instance",
        "<b>Domain</b> (<font name='Courier' size='9'>scan2plan.io</font>) -- can be transferred if desired",
        "<b>Product documentation</b> -- this document and related specs",
        "<b>Firebase Hosting sites</b> -- the deployed frontend URLs",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Does NOT Transfer", styles["SubHead"]))
    for item in [
        "<b>Source code</b> -- The CPTV27/S2PX GitHub repository is Chase's private IP. No codebase leaves.",
        "<b>GitHub access</b> -- All collaborator access was revoked on March 25, 2026.",
        "<b>S2PX platform</b> -- S2PX is Chase's separate AI-first operating system. It is a completely different product from the Scan2Plan CPQ.",
        "<b>Any HDX / Measurably Better / Hillbilly Dreams IP</b> -- completely separate.",
        "If the CPQ source code is needed, that is a separate licensing conversation.",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))
    story.append(PageBreak())

    # ─── PART II ───
    story.append(Paragraph("Part II: Product Overview", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph(
        "The Scan2Plan CPQ is a full-lifecycle platform for 3D scanning and BIM businesses. "
        "It connects lead intake through scoping, pricing, proposals, signatures, and production delivery in one system.",
        styles["Body"]
    ))

    features = [
        ["Sales Pipeline", "Kanban board / lead management with stage tracking"],
        ["Scoping Forms", "135-field intake form with geocoding, multi-building support"],
        ["Deal Workspace", "Full lead detail view with quote builder, documents, engagement tracking"],
        ["CPQ Calculator", "Multi-building, multi-discipline pricing engine with margin controls"],
        ["Production Pipeline", "Project tracking from scan through delivery with blocker enforcement"],
        ["Proposal Builder", "WYSIWYG proposal editing with versioning and PDF export"],
        ["Signature Flow", "Dual e-signature with audit trail and signed PDF generation"],
        ["Scan Tech Portal", "Field technician mobile interface with photo analysis AI"],
        ["QuickBooks Integration", "Estimate/invoice sync via OAuth2"],
        ["Google Drive Integration", "File management via GCS 4-bucket architecture"],
        ["Knowledge Base", "Internal wiki with AI Q&A chat"],
        ["Strategy Center", "CEO strategy drafts with 3-tier governance"],
        ["AI Agents (7)", "Pricing, Operator, Photo Analysis, Checklist, Audio-to-Scoping, KB Chat, Strategy Advisor"],
        ["Scorecard", "Company performance metrics and financial dashboards"],
        ["Website Manager", "Content management for scan2plan.io marketing site"],
    ]
    story.append(make_table(
        ["Feature", "Description"],
        features,
        col_widths=[1.8*inch, W - 1.8*inch]
    ))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Note on the CPQ Calculator", styles["SubHead3"]))
    story.append(Paragraph(
        "The pricing engine was the single most labor-intensive component of the system. "
        "The underlying pricing logic changed repeatedly during development, requiring multiple full refactors. "
        "The current engine is the stabilized version, backed by database-driven rate tables (15 pricing tables) "
        "and covered by 261 unit tests.",
        styles["Body"]
    ))
    story.append(PageBreak())

    # ─── PART III ───
    story.append(Paragraph("Part III: GCP Infrastructure", styles["SectionHead"]))
    story.append(hr())
    gcp_rows = [
        ["Project ID", "s2px-production"],
        ["Owner Account", "chase@scan2plan.io"],
        ["Service Account", "s2px-api@s2px-production.iam.gserviceaccount.com"],
        ["Region (primary)", "us-east4 (N. Virginia)"],
        ["Region (sandbox)", "us-central1 (Iowa)"],
    ]
    story.append(make_table(["Field", "Value"], gcp_rows, col_widths=[2*inch, W - 2*inch]))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Services in Use", styles["SubHead3"]))
    for svc in [
        "Cloud SQL (PostgreSQL)", "Cloud Run (API backend)", "Cloud Storage (4 buckets)",
        "Firebase Hosting (3 targets)", "Firebase Auth (Google OAuth)", "Secret Manager",
        "Cloud Tasks", "Cloud CDN (signed URLs)"
    ]:
        story.append(Paragraph(f"&bull; {svc}", styles["BulletItem"]))
    story.append(PageBreak())

    # ─── PART IV ───
    story.append(Paragraph("Part IV: Google Cloud Storage", styles["SectionHead"]))
    story.append(hr())
    bucket_rows = [
        ["s2p-core-vault", "Primary storage -- proposals, certificates, exports", "GCS_BUCKET"],
        ["s2p-active-projects", "Active project data -- point clouds, tours, deliverables", "GCS_ACTIVE_BUCKET"],
        ["s2p-incoming-staging", "Upload staging area -- files land here before processing", "GCS_STAGING_BUCKET"],
        ["s2p-quarantine", "Quarantine bucket for failed/suspicious uploads", "Security allowlist"],
    ]
    story.append(make_table(
        ["Bucket", "Purpose", "Env Var"],
        bucket_rows,
        col_widths=[1.5*inch, 3.5*inch, 1.5*inch]
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("What's in the Buckets", styles["SubHead3"]))
    for item in [
        "Scan data (.e57, .las, .laz point cloud files)",
        "Virtual tour assets (equirectangular panoramas, floor plan SVGs)",
        "Proposals (generated PDFs)",
        "Certificates of Assurance (generated PDFs)",
        "Field photos (scan tech uploads)",
        "Project deliverables (BIM files, CAD exports)",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))
    story.append(Paragraph("All of this is Scan2Plan business data and can be transferred.", styles["Body"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("GCS Folder Structure (inside s2p-active-projects)", styles["SubHead3"]))
    folder_lines = [
        "{ProjectFolder}/",
        "    project.json",
        "    Deliverables/",
        "        Point Cloud/",
        "            {raw-files} (.las, .laz, .e57, .rcp, .rcs)",
        "            potree/ (metadata.json, octree.bin, hierarchy.bin)",
        "        Virtual Tour/",
        "            tour-manifest.json, floorplan.svg, panoramas/",
        "    BIM/CAD/",
        "    Photos/",
        "    Documents/",
    ]
    for line in folder_lines:
        story.append(Paragraph(line, styles["CodeBlock"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Auto-Processing Pipelines", styles["SubHead3"]))
    story.append(Paragraph(
        "Files uploaded to GCS are processed automatically by Cloud Run workers:",
        styles["Body"]
    ))
    worker_rows = [
        ["Virtual Tour", "ZIP bundle in staging", "tour-manifest.json + panoramas", "POST /api/projects/:id/virtual-tour/process"],
        ["Point Cloud", "Raw .e57/.las/.laz", "Potree octree files", "Manual worker invocation"],
        ["Sidecar Writer", "Project data changes", "project.json metadata", "Automatic on stage transitions"],
    ]
    story.append(make_table(
        ["Worker", "Input", "Output", "Trigger"],
        worker_rows,
        col_widths=[1.2*inch, 1.5*inch, 1.8*inch, 2*inch]
    ))
    story.append(PageBreak())

    # ─── PART V ───
    story.append(Paragraph("Part V: Firebase & Hosting", styles["SectionHead"]))
    story.append(hr())
    fb_rows = [
        ["production", "s2px", "s2px.web.app", "s2px-api (us-east4)"],
        ["sandbox", "s2px-sandbox", "s2px-sandbox.web.app", "s2px-api-sandbox (us-central1)"],
        ["staging", "s2px-staging", "s2px-staging.web.app", "s2px-api-staging (us-east4)"],
    ]
    story.append(make_table(
        ["Target", "Firebase Site", "URL", "API Service"],
        fb_rows,
        col_widths=[1.2*inch, 1.4*inch, 2*inch, 1.9*inch]
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Firebase Services", styles["SubHead3"]))
    for item in [
        "<b>Auth</b> -- Google OAuth provider (only auth method)",
        "<b>Hosting</b> -- Static SPA hosting with API rewrites to Cloud Run",
        "<b>Storage Rules</b> -- defined in storage.rules",
        "<b>Firestore</b> -- Client-side only, supplementary to Cloud SQL (see below)",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Firestore Collections (Not Finalized)", styles["SubHead3"]))
    story.append(Paragraph(
        "Firestore was being evaluated as a supplementary data layer alongside Cloud SQL. "
        "Only wiki_pages is confirmed active. The deal_* collections were not finalized. "
        "The primary database for all business data is Cloud SQL (PostgreSQL).",
        styles["Body"]
    ))
    fs_rows = [
        ["wiki_pages", "Knowledge Base articles (legacy)", "Active"],
        ["deal_sessions", "Viewer session telemetry", "Not finalized"],
        ["deal_events", "Section enter/exit tracking", "Not finalized"],
        ["deal_voice", "Voice memo transcriptions", "Not finalized"],
        ["deal_cta_clicks", "CTA click tracking", "Not finalized"],
    ]
    story.append(make_table(["Collection", "Purpose", "Status"], fs_rows, col_widths=[1.5*inch, 3*inch, 1.5*inch]))

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "WARNING: All three environments (production, staging, local) share the same Firebase Auth project. "
        "There is no auth isolation between environments.",
        styles["Warning"]
    ))
    story.append(PageBreak())

    # ─── PART VI ───
    story.append(Paragraph("Part VI: Database", styles["SectionHead"]))
    story.append(hr())
    db_rows = [
        ["Type", "PostgreSQL (Google Cloud SQL)"],
        ["Instance", "s2px-production-db"],
        ["ORM", "Drizzle ORM"],
        ["Connection", "Via DATABASE_URL env var"],
        ["Max Connections", "~100 (Cloud SQL instance setting)"],
        ["Pool Size", "5 per Cloud Run instance"],
        ["Backups", "Daily automated, 7-day retention + PITR enabled"],
    ]
    story.append(make_table(["Field", "Value"], db_rows, col_widths=[2*inch, W - 2*inch]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Schema (~90 tables across 8 files)", styles["SubHead3"]))
    schema_rows = [
        ["shared/schema/db.ts", "59 core tables", "users, scoping_forms, quotes, proposals, production"],
        ["shared/schema/pricing.ts", "15 tables", "Rate tables, baselines, modifiers"],
        ["shared/schema/platform.ts", "2 tables", "Content, roadmap"],
        ["shared/schema/market-intelligence.ts", "9 tables", "Segments, competitors, scanners"],
        ["+ 4 additional files", "5+ tables", "Deal arena, engagement, AI usage, initiatives"],
    ]
    story.append(make_table(
        ["File", "Tables", "Contents"],
        schema_rows,
        col_widths=[2.2*inch, 1.2*inch, 3.1*inch]
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Key Tables", styles["SubHead3"]))
    key_tables = [
        ["users", "Firebase-authed users with RBAC roles"],
        ["scoping_forms", "Deal intake (135 columns)"],
        ["quotes", "Generated quotes with line items"],
        ["proposals", "Proposal documents with PDF metadata"],
        ["production_projects", "Active production pipeline"],
        ["qbo_tokens", "QuickBooks OAuth tokens"],
        ["pricing_constants", "V2 pricing engine config"],
    ]
    story.append(make_table(["Table", "Purpose"], key_tables, col_widths=[2*inch, W - 2*inch]))
    story.append(PageBreak())

    # ─── PART VII ───
    story.append(Paragraph("Part VII: Cloud Run Services", styles["SectionHead"]))
    story.append(hr())
    cr_rows = [
        ["s2px-api", "us-east4", "Production API"],
        ["s2px-api-sandbox", "us-central1", "Sandbox API"],
        ["s2px-api-staging", "us-east4", "Staging API"],
    ]
    story.append(make_table(["Service", "Region", "Purpose"], cr_rows, col_widths=[2*inch, 1.5*inch, 3*inch]))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Production Configuration", styles["SubHead3"]))
    cfg_rows = [
        ["Max instances", "10 (capped for connection safety)"],
        ["Concurrency", "80"],
        ["Pool max", "5 per instance"],
    ]
    story.append(make_table(["Setting", "Value"], cfg_rows, col_widths=[2*inch, W - 2*inch]))
    story.append(Paragraph(
        "<b>Connection pool rule:</b> instances x pool_max must be &lt;= 0.7 x cloud_sql_max_connections",
        styles["Body"]
    ))

    # ─── PART VIII ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("Part VIII: Environment Variables & Secrets", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph("Required", styles["SubHead3"]))
    req_vars = [
        ["DATABASE_URL", "PostgreSQL connection string"],
        ["GCS_BUCKET", "Primary GCS bucket (s2p-core-vault)"],
        ["VITE_FIREBASE_*", "6 Firebase Web SDK config values"],
        ["FIREBASE_PROJECT_ID", "Server-side Firebase project ID"],
        ["GEMINI_API_KEY", "Google Gemini AI (powers all 7 agents)"],
        ["GOOGLE_MAPS_API_KEY", "Server-side Maps API"],
        ["VITE_GOOGLE_MAPS_API_KEY", "Client-side Maps API"],
    ]
    story.append(make_table(["Variable", "Purpose"], req_vars, col_widths=[2.2*inch, W - 2.2*inch]))

    story.append(Spacer(1, 8))
    story.append(Paragraph("Optional", styles["SubHead3"]))
    opt_vars = [
        ["ANTHROPIC_API_KEY", "Claude AI (KB extraction)"],
        ["QBO_CLIENT_ID / SECRET", "QuickBooks Online OAuth2"],
        ["SENDGRID_API_KEY", "Email delivery (proposals)"],
        ["ENCRYPTION_KEY", "Encrypts stored API keys in DB"],
        ["GCS_ACTIVE_BUCKET", "Active projects bucket"],
        ["GCS_STAGING_BUCKET", "Upload staging bucket"],
    ]
    story.append(make_table(["Variable", "Purpose"], opt_vars, col_widths=[2.2*inch, W - 2.2*inch]))
    story.append(Paragraph(
        "Secrets are stored in GCP Secret Manager on the s2px-production project. "
        "Cloud Run services pull secrets at deploy time.",
        styles["BodySmall"]
    ))
    story.append(PageBreak())

    # ─── PART IX ───
    story.append(Paragraph("Part IX: Domains & DNS", styles["SectionHead"]))
    story.append(hr())
    dns_rows = [
        ["scan2plan.io", "Primary domain", "Can be transferred"],
        ["pipeline.scan2plan.dev", "CPQ product URL", "Live product"],
        ["s2px.web.app", "Production Firebase Hosting", "Tied to Firebase project"],
        ["s2px-sandbox.web.app", "Sandbox", "Tied to Firebase project"],
        ["s2px-staging.web.app", "Staging", "Tied to Firebase project"],
    ]
    story.append(make_table(["Domain", "Purpose", "Notes"], dns_rows, col_widths=[2*inch, 2.2*inch, 2.3*inch]))

    # ─── PART X ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("Part X: Third-Party Integrations", styles["SectionHead"]))
    story.append(hr())
    int_rows = [
        ["Firebase", "Auth + Hosting", "chase@scan2plan.io"],
        ["Google Cloud Storage", "4-bucket file architecture", "s2px-production"],
        ["Google Maps", "Geocoding, travel calc", "API key on project"],
        ["Google Gemini AI", "7 AI agents (server-side)", "API key"],
        ["QuickBooks Online", "Estimate/invoice sync", "Owen's QBO -- needs disconnect"],
        ["SendGrid", "Proposal email delivery", "API key"],
        ["Cloud Tasks", "Async job processing", "s2px-production"],
        ["Cloud CDN", "Secure file delivery (signed URLs)", "s2px-production"],
    ]
    story.append(make_table(
        ["Service", "Purpose", "Account"],
        int_rows,
        col_widths=[1.8*inch, 2.5*inch, 2.2*inch]
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "<b>QuickBooks Note:</b> The QBO integration connects to Owen's QuickBooks account. "
        "Since Owen is out, this connection needs to be either disconnected (revoke OAuth tokens) "
        "or reconnected to a different QBO account.",
        styles["Warning"]
    ))
    story.append(PageBreak())

    # ─── PART XI ───
    story.append(Paragraph("Part XI: Auth Architecture", styles["SectionHead"]))
    story.append(hr())
    for item in [
        "<b>Provider:</b> Firebase Auth with Google OAuth (only auth method)",
        "<b>Flow:</b> Client-side Google sign-in -> Firebase token -> Bearer token in every API call -> server verifies and attaches req.user",
        "<b>Roles:</b> developer, admin, ceo, production, scantech, viewer",
        "<b>Frontend guard:</b> RequireAuth component with allowedRoles",
        "<b>Backend guard:</b> requireRole() middleware on each route",
        "<b>No password auth</b> -- Google OAuth only",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))

    # ─── PART XII ───
    story.append(Spacer(1, 12))
    story.append(Paragraph("Part XII: How to Get This Running", styles["SectionHead"]))
    story.append(hr())

    story.append(Paragraph("Step 1: Get GCP Access", styles["SubHead3"]))
    story.append(Paragraph("Chase adds your Google account to s2px-production with IAM roles:", styles["Body"]))
    for role in [
        "roles/cloudsql.client (database access)",
        "roles/storage.admin (GCS bucket access)",
        "roles/run.admin (Cloud Run management)",
        "roles/firebase.admin (Firebase hosting + auth)",
        "roles/secretmanager.secretAccessor (read secrets)",
    ]:
        story.append(Paragraph(f"&bull; {role}", styles["BulletItem"]))

    story.append(Paragraph("Step 2: Get Credentials from Chase", styles["SubHead3"]))
    story.append(Paragraph("Chase provides DATABASE_URL, Firebase config values, GEMINI_API_KEY, Google Maps keys, and any optional keys needed.", styles["Body"]))

    story.append(Paragraph("Step 3: Verify Access", styles["SubHead3"]))
    for cmd in [
        "gcloud auth login",
        "gcloud config set project s2px-production",
        "gcloud sql instances list",
        "gcloud storage buckets list",
        "gcloud run services list",
    ]:
        story.append(Paragraph(cmd, styles["CodeBlock"]))

    story.append(Paragraph(
        "<b>Note:</b> Running the application locally or deploying updates requires the source code, "
        "which is not part of this handoff. The steps above verify infrastructure access only.",
        styles["BodySmall"]
    ))
    story.append(PageBreak())

    # ─── PART XIII ───
    story.append(Paragraph("Part XIII: Credentials Checklist", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph("Chase fills in and delivers separately (never in this document):", styles["Body"]))
    creds = [
        "GCP IAM access granted to Elijah's Google account",
        "DATABASE_URL connection string",
        "Firebase config block (6 VITE_FIREBASE_* values)",
        "FIREBASE_PROJECT_ID",
        "GEMINI_API_KEY",
        "GOOGLE_MAPS_API_KEY (server)",
        "VITE_GOOGLE_MAPS_API_KEY (client)",
        "ENCRYPTION_KEY (if applicable)",
        "SENDGRID_API_KEY + SENDGRID_FROM_EMAIL (if email delivery needed)",
        "ANTHROPIC_API_KEY (if Claude AI features needed)",
        "Domain registrar transfer (if scan2plan.io is being transferred)",
        "QBO decision: disconnect Owen's account or reconnect to new account",
    ]
    for c in creds:
        story.append(Paragraph(f"[ ] {c}", styles["BulletItem"]))
    story.append(PageBreak())

    # ─── PART XIV ───
    story.append(Paragraph("Part XIV: Ownership Boundary", styles["SectionHead"]))
    story.append(hr())
    own_rows = [
        ["Source code (CPTV27/S2PX repo)", "Chase Pierson", "NO"],
        ["GitHub repository access", "Chase Pierson", "NO"],
        ["S2PX platform (separate product)", "Chase Pierson", "NO"],
        ["HDX / Measurably Better / Hillbilly Dreams IP", "Chase / HDX", "NO"],
        ["GCS scan data & project files", "Business data", "YES"],
        ["GCP project access (s2px-production)", "Chase (owner)", "YES -- IAM roles"],
        ["Cloud SQL database & data", "Business data", "YES"],
        ["Firebase Hosting sites", "Tied to GCP project", "YES"],
        ["Firebase Auth user accounts", "Tied to Firebase project", "YES"],
        ["Domain (scan2plan.io)", "Chase", "YES -- can transfer"],
        ["Product documentation", "General knowledge", "YES"],
        ["API keys", "Account-specific", "CONDITIONAL -- re-provision"],
    ]
    story.append(make_table(
        ["Asset", "Owner", "Transfers?"],
        own_rows,
        col_widths=[2.5*inch, 1.8*inch, 2.2*inch]
    ))

    story.append(Spacer(1, 12))
    story.append(Paragraph("Clear Boundaries", styles["SubHead"]))
    boundaries = [
        "<b>The code is Chase's.</b> The CPTV27/S2PX repository is private and stays with Chase. No source code is part of this handoff.",
        "<b>S2PX is a separate product.</b> S2PX is Chase's AI-first operating system platform. The Scan2Plan CPQ is a focused product that was built for the scanning business. They are different systems.",
        "<b>The data is the business's.</b> GCS files, database records, and project deliverables are Scan2Plan operational data.",
        "<b>Infrastructure access is grantable.</b> Chase can add Elijah to the GCP project with IAM roles without transferring ownership.",
        "<b>API keys should be re-provisioned.</b> Elijah should create his own Google Cloud project and API keys long-term.",
    ]
    for b in boundaries:
        story.append(Paragraph(f"&bull; {b}", styles["BulletItem"]))
    story.append(PageBreak())

    # ─── PART XV ───
    story.append(Paragraph("Part XV: Product Documentation Summary", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph(
        "A separate 13-page product deck (Scan2Plan_App_Deck.pdf) documents each feature with screenshots. Summary:",
        styles["Body"]
    ))
    deck_features = [
        ["Sales Pipeline", "Kanban deal management with value, priority, source, and win probability"],
        ["Deal Workspace", "Central record for CRM data, billing, project info, and downstream actions"],
        ["CPQ Calculator", "Multi-area, multi-discipline quoting with version history, travel, and risk logic"],
        ["Production Pipeline", "Operations board: Scheduling through Delivered with blocker enforcement"],
        ["Proposal Builder", "Versioned WYSIWYG proposal editing and export-ready PDF generation"],
        ["Signature Flow", "Sender-first or direct client signature with public signing page and signed PDF output"],
        ["ScanTech PDF Generator", "Mission brief PDF for field execution with location, scope, conditions, equipment"],
        ["QuickBooks + Google Drive", "Estimate sync, folder creation, document uploads, project file organization"],
        ["Tech Stack", "React, TypeScript, Vite, Tailwind, Express, PostgreSQL, Drizzle ORM, Vitest, Playwright"],
        ["Integration Map", "Lead -> CPQ Quote -> Proposal -> Signature -> Closed Won -> Production Project"],
    ]
    story.append(make_table(
        ["Feature", "Description"],
        deck_features,
        col_widths=[2*inch, W - 2*inch]
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Roadmap / What's Next", styles["SubHead3"]))
    for item in [
        "Finish proposal builder stabilization and PDF parity hardening",
        "Tighten signature completion notifications",
        "Continue Drive/shared-folder reliability work",
        "Expand production UX exposure in the trimmed build",
        "Keep reducing handoff friction between sales and operations",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))
    story.append(PageBreak())

    # ─── PART XVI ───
    story.append(Paragraph("Part XVI: Development Timeline", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph(
        "Based on the full git history. Development ran from January 19 to February 15, 2026 -- 28 days of active development.",
        styles["Body"]
    ))
    phases = [
        ["Phase 1", "Jan 19-20", "Foundation", "Initial repo baseline, Sales & Production direction established"],
        ["Phase 2", "Jan 21-25", "Sales Pipeline & Proposals", "Pipeline UX, proposal versioning, WYSIWYG editor, signature links"],
        ["Phase 3", "Jan 29", "CPQ Hardening", "Pricing fixes, custom line items, pricing-summary grouping"],
        ["Phase 4", "Feb 2", "Dual Signature & Polish", "Dual-signature flow, audit trail, PDF typography, discipline rollup"],
        ["Phase 5", "Feb 4-10", "Pricing Controls", "Tier A overrides, Quote Builder behavior, theme toggle, proposal editability"],
        ["Phase 6", "Feb 15", "Drive Automation", "Google Drive uploads, shared Drive support, proposal editor rebuild"],
    ]
    story.append(make_table(
        ["Phase", "Dates", "Focus", "Key Deliverables"],
        phases,
        col_widths=[0.8*inch, 1*inch, 1.7*inch, 3*inch]
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Current Product State", styles["SubHead3"]))
    story.append(Paragraph("<b>Shipped:</b>", styles["Body"]))
    shipped = [
        "Sales pipeline", "Deal workspace", "Versioned CPQ quoting", "Proposal versioning",
        "WYSIWYG proposal editor", "PDF export", "Sender and client signature workflow",
        "Production tracker", "Mission brief PDF generation", "QuickBooks estimate integration",
        "Google Drive folder and upload flows"
    ]
    for s in shipped:
        story.append(Paragraph(f"&bull; {s}", styles["BulletItem"]))

    story.append(Paragraph("<b>Still in progress:</b>", styles["Body"]))
    wip = [
        "Proposal builder stabilization and parity work",
        "Post-signature notification completion",
        "Drive reliability hardening",
        "Some trimmed-build navigation and production UX exposure",
    ]
    for w in wip:
        story.append(Paragraph(f"&bull; {w}", styles["BulletItem"]))

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "The last commit in the CPQ repository is dated February 15, 2026. "
        "Development paused after the Drive automation and editor rebuild delivery cluster.",
        styles["BodySmall"]
    ))
    story.append(PageBreak())

    # ─── PART XVII ───
    story.append(Paragraph("Part XVII: Product Manual Summary", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph(
        "A separate 7-page product manual (Scan2Plan_App_Manual.pdf) provides detailed how-to instructions "
        "for each feature. The end-to-end usage pattern:",
        styles["Body"]
    ))
    steps = [
        "1. Create the deal in the Sales Pipeline",
        "2. Complete lead and billing data in the Deal Workspace",
        "3. Build the quote in CPQ",
        "4. Create the proposal version and edit it",
        "5. Export the PDF and send the proposal",
        "6. Complete sender signature if required",
        "7. Collect the client signature",
        "8. Confirm the deal closes won and hands off to production",
        "9. Use the Mission Brief and production pipeline to execute the work",
    ]
    for step in steps:
        story.append(Paragraph(step, styles["Body"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Known Limitations", styles["SubHead3"]))
    for item in [
        "<b>Signature flow:</b> Post-signature outbound email notification not fully wired. Token expiry requires link regeneration.",
        "<b>Proposal builder:</b> Under active stabilization. Multiple Feb commits focused on save reliability and PDF parity.",
        "<b>Navigation:</b> Some routes exist that aren't exposed in the trimmed sidebar.",
        "<b>Google Drive:</b> Folder creation is non-blocking; projects can still be created if Drive fails.",
        "<b>QuickBooks:</b> Requires valid OAuth credentials and connected company before estimate operations work.",
    ]:
        story.append(Paragraph(f"&bull; {item}", styles["BulletItem"]))
    story.append(PageBreak())

    # ─── PART XVIII ───
    story.append(Paragraph("Part XVIII: Financial Notes", styles["SectionHead"]))
    story.append(hr())
    story.append(Paragraph(
        "Chase's 5% development arrangement ended in February 2026. No charges from Chase for March 2026.",
        styles["Body"]
    ))
    story.append(Paragraph(
        "Owen is responsible for paying Elijah for any development time in February and March 2026.",
        styles["Body"]
    ))
    story.append(Spacer(1, 12))
    story.append(Paragraph("Accompanying Documents", styles["SubHead"]))
    for doc_item in [
        "<b>Scan2Plan_App_Deck.pdf</b> -- 13-page product overview with screenshots",
        "<b>Scan2Plan_Project_Timeline.pdf</b> -- Git-history-based development timeline",
        "<b>Scan2Plan_App_Manual.pdf</b> -- Full product manual with how-to instructions",
    ]:
        story.append(Paragraph(f"&bull; {doc_item}", styles["BulletItem"]))

    story.append(Spacer(1, 36))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor("#e2e8f0"), spaceAfter=12))
    story.append(Paragraph(
        "This document was generated from codebase configuration, GCP project settings, "
        "and architecture documentation. GCS bucket inventory should be verified live with "
        "gcloud storage buckets list once access is granted.",
        styles["FooterNote"]
    ))

    doc.build(story)
    print(f"PDF generated: {OUTPUT}")

if __name__ == "__main__":
    build()
