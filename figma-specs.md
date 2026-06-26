# Figma specs - WhatsApp landing (single MCP pass)

Source: Figma `Zernio` file, node `4:576` (canvas "Landing"), artboard `zernio-landing`
1440x2090. Extracted once via MCP `get_metadata` + `get_screenshot`. `get_design_context`
and `get_variable_defs` were unavailable (require a live desktop selection), so token
mapping below is resolved against `design.md`, which is the system of record for color,
type and spacing. This file is the only composition reference from here on.

## Global frame facts

- Content column in Figma: 1047px wide, centered in 1440 (side gutter ~196px).
  Resolved to the system: `max-w-content` (1280px) + page padding `px-page` 24px /
  `lg:px-page-desktop` 64px.
- Two-column sections split the 1047 column into 2x 523.5 halves.
- Inter-section spacer frames in Figma are 55px. Resolved to the system rule:
  section gaps 80px mobile / 112px desktop (`gap-section` / `lg:gap-section-desktop`).
- Inside a half-column, content is inset 40px (`p-10` / `gap-10`).
- Section order on the page: hero, trust bar, why-zernio, no-meta-app.
  (Nav header `4:730` and any footer are out of scope, not built.)

Type scale mapping (Figma text-node height -> design.md token):
| Element                         | Figma h | Token            | px |
|---------------------------------|---------|------------------|----|
| Hero h1 (`4:590`, ~4 lines)     | 212     | `text-4xl`->`5xl`| 36/48 |
| Hero subtitle (`4:591`)         | 72      | `text-lg`        | 18 |
| Button label (`4:595` etc.)     | 20      | `text-sm`        | 14 |
| Small print / eyebrow / labels  | 20      | `text-sm`        | 14 |
| Code header + body              | 20/...  | `text-sm` mono   | 14 |
| Column header (`4:676`,`4:698`) | 32      | `text-2xl`       | 24 |
| Why-Zernio heading (`4:672`)    | 30      | `text-3xl`       | 30 |
| No-meta lead (`4:726`)          | 60      | `text-2xl`       | 24 |
| No-meta detail (`4:727`)        | 78      | `text-base`      | 16 |
| Comparison row text             | 48-96   | `text-base`      | 16 |

---

## 1. Hero (`4:582`, 1047x633)

Layout: 2 columns (523.5 each). Left = copy, right = code block. Stacks to 1 column on
mobile/tablet, copy on top, code below.

Left column (`4:583` -> inset 40px):
1. Logo mark tile, 65x65 at top (Figma: WhatsApp green glyph).
2. h1 at +20px gap below tile, 443.5 wide: "Ship WhatsApp integration in minutes, not months".
   Accent: "in minutes," in coral. Rest charcoal.
3. Subtitle at +20px: "One REST API for WhatsApp Business. No Meta app, no template maze,
   no silent webhook failures." (`text-lg`, charcoal-muted).
4. Button row at +40px: two buttons h44 (resolved to md/h40), 10px gap.
   - Primary (coral): "Start for free".
   - Secondary (burgundy): "Read the docs".
5. Small print at +20px (`text-sm`, charcoal-muted): "No credit card required. 100 free
   messages every month."

Right column (`4:599` -> code card `4:600`, inset 40px, 483.5 wide, full 633 height):
- Dark card. Header row h60: 3 window dots (`4:602` group) + "POST /v1/posts" (`text-sm`
  mono) + copy icon top-right. Divider line at y60.
- Body: line-number gutter (`4:611`) + JSON (`4:612`):
  `{ "platforms": ["whatsapp"], "accountId": "acc_abc123", "content": "Hello from
  Zernio!", "scheduledFor": "2025-01-15T19:00:00Z" }`
- Card stays dark (bg-charcoal) per the rule: hero code block keeps the Zernio docs dark
  style. `overflow-x-auto` so it never overflows horizontally.

---

## 2. Trust bar (`4:613`, 1047x204)

Layout: single centered column.
1. Label `4:614` centered at y40 (`text-sm`, charcoal-muted): "Trusted by developers at".
2. Logo row `4:615` at y100, h104: 5 equal slots (209.4 each): Warner Music, ClickUp,
   ClickUp (duplicate in the design), vibiz.ai, RE/MAX.
   Real PNG assets provided in `public/` (warner-music, clickup, clickup-2, vibiz-ai,
   remax). Rendered via `next/image` in Figma order, normalized to a common height
   (`h-7 w-auto`), grayscale + reduced opacity for the muted trust-bar look, centered,
   `flex-wrap` on mobile.

---

## 3. Why Zernio (header `4:669` h166 + table `4:673` h556)

Header (centered):
1. Eyebrow pill `4:670` (117x36) at y40: "Why Zernio". Resolved to `Badge` (coral) -
   this is the single coral accent of the section (no CTA button here).
2. Heading `4:672` at y96, `text-3xl`, centered: "Meta's API fights you. Ours doesn't."

Table: 2 columns (523.5 each). Stacks on mobile, Zernio first (natural DOM order).
Each column resolved to a `Card`. Icon (24x24) at x40, text at x84 -> 20px gap (`gap-5`).

Left = "Zernio API" (`4:676`, `text-2xl`). Rows with check icons (emerald-600, success
semantics - allowed):
1. "One API key. No Meta Business verification maze. Start sending in 30 seconds"
2. "Full template CRUD via API. We handle submission to Meta and category tracking"
3. "Reliable webhook delivery with built-in retry logic. Same format across all platforms"
4. "24h window, rate limits, messaging tiers: all handled automatically. You just call POST"
5. "Same REST API for WhatsApp + 14 other platforms. Learn once, ship everywhere"

Right = "WhatsApp Cloud API (direct)" (`4:698`, `text-2xl`), muted card (bg-cream). Rows
with X icons. RULE: crosses are `charcoal-muted` (gray), never red/coral:
1. "Navigate 5+ Meta products just to send one message (Business Manager, App Dashboard,
   WABA, phone setup, verification)"
2. "Template approval is slow and opaque. \"Utility\" templates silently reclassified as
   \"marketing\" (the most expensive tier)"
3. "Webhooks silently fail with no replay, no logs, and minimal error feedback. You build
   retry infrastructure from scratch"
4. "New accounts start at 250 messages/day. Phone numbers permanently locked to API.
   Breaking changes ship without warning"
5. "Pay Twilio 3-5x markup for a usable DX, or suffer Meta's broken docs and zero
   developer tooling yourself"

---

## 4. No Meta app (`4:722`, 1047x282)

Layout: text block then button. The descriptive text is 2 columns (473.5 each, 20px gap),
stacking to 1 on mobile/tablet (lead on top, detail below).

1. Eyebrow label `4:724` at top (`text-sm`, charcoal-muted): "No Meta developer app
   required". Resolved to muted label text (not coral) because the section's single coral
   action is the button below.
2. Two-column text at +40px:
   - Lead `4:726` (`text-2xl`, charcoal): "Zernio handles WABA provisioning through Meta
     Embedded Signup."
   - Detail `4:727` (`text-base`, charcoal-muted): "No need to create a Meta app,
     configure webhooks, or pass App Review. Connect in one click from our dashboard."
3. Button `4:728` at +40px (167x44, coral): "Start for free".

---

## Color / token resolutions (Figma -> system)

- WhatsApp green logo glyph -> neutral tile + lucide `MessageCircle` in charcoal (no
  green outside status, no missing asset).
- Brand logo SVGs in trust bar -> muted monospace wordmarks.
- Check marks -> emerald-600 (status success, allowed). Crosses -> charcoal-muted (rule).
- Code block syntax -> only system tokens on dark: keys `coral-muted`, strings/text
  `white`/`cream-muted`, line numbers `white/30`.
- Buttons 44px in Figma -> system `md` (40px).
- One coral action per view: hero primary button (+ allowed coral word in h1); why-zernio
  coral eyebrow badge (no button in section); no-meta coral button (eyebrow stays muted).
