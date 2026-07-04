# Figma composition record — navbar, hero, trust bar (v3 dark)

Source of truth for **composition** (layout, spacing, gaps, hierarchy, element order and
position). Colors / type / tokens come from `design.md` + `components/ui/` primitives, not
from here. Read from Figma `Zernio` file `U9jU6AA4lPwh8okecZ1pRy`, frame
`zernio-landing-v3` (node `0:25`, 1440x1120), on 2026-07-04 via `get_metadata`,
`get_screenshot`, `get_variable_defs` and `get_design_context` (navbar).

Design is a **single 1440 desktop artboard**; content column is ~1047px wide, centered
(≈197px side margins). Rendered at `max-w-[1080px]` inside page padding (24/64px).

## Figma variables (for reference; system tokens win)

| Figma var | Hex | System token |
|-----------|-----|--------------|
| Paper | `#ffffff` | `paper` |
| Bone | `#e5e5e6` | `bone` |
| Mist (used) | `#d0d6e0` | `mist` |
| Fog | `#8a8f98` | `fog` |
| Ash | `#62666d` | `ash` |
| Carbon | `#0f1011` | `carbon` |
| Graphite | `#23252a` | `graphite` |
| Smoke | `#282b2f` | `smoke` (design.md `smoke`=`#383b3f`; used token) |
| Coral | `#eb3514` | `coral` |

Type vars: heading/64 = Geist Medium 64 / lh 1.1 / tracking -3.5px (→ `text-display` +
tight tracking). body/16 = Geist Regular 16/24 (`text-body`). label/16 = Geist Medium
16/20. label/14 = Geist Regular 14/20 (`text-label`). tag/12 = Menlo Bold 12/16
(`text-tag` + `font-mono`, eyebrow / disclaimer).

## Navbar — node `0:135` "Frame 97" (1047x68)

Floating pill bar: `bg-carbon`, `border-graphite`, radius 12px (`rounded-xl`), `py-16`,
inner `px-32`. Single row, `items-center`.

- **Logo** `0:137` — 94x19.79, `zernio-logo.svg`. Left, flush.
- **Center nav** `0:145` — starts 40px right of logo; pill buttons, each `px-12 py-8`,
  `rounded-full`, label 16px Geist Medium, gap-4 label↔caret:
  - Docs ▾ (`0:146`) · Product ▾ (`0:150`) · Pricing (`0:154`) · Affiliates (`0:156`)
  - Figma link color = Fog. Caret 20x20.
- **Right actions** `0:158` — pushed to end, gap-10:
  - Dashboard (`0:161`) — `px-12 py-8`, `rounded-xl`, border Smoke, subtle
    graphite→carbon gradient fill, Paper text.
  - Start for free (`0:163`) — `px-12 py-8`, `rounded-xl`, **Coral** fill, Paper text.

## Hero — node `0:27` "Frame 187" (1047x740), stacked, centered

Order top→bottom:

1. **Eyebrow + section-nav row** `0:28` "Frame 189" (h64), space-between:
   - left: `WHATSAPP` eyebrow (`0:29`, x32) — tag/12 Menlo uppercase.
   - right: `0:30` Frame 190 (x425, w590, h44) — 6 text tabs `px-16 py-12`:
     Overview (active) · Why Zernio · How it works · Features · Code example · FAQs.
2. **Code panel** `0:44`→`0:47` "Frame 121" (499px wide, centered): header row (`0:48`)
   with 3 traffic dots (`0:50`, w47), `POST/v1/posts` (`0:54`, mono), copy icon
   (`0:55`, 20x20); divider line (`0:57`); JSON body (`0:59`, mono, x20):
   ```
   { "platforms": ["whatsapp"], "accountId": "acc_abc123",
     "content": "Hello from Zernio!", "scheduledFor": "2025-01-15T19:00:00Z" }
   ```
3. **WhatsApp app-icon** `0:60` "Frame 140" (81x81) — rounded-square dark tile, white
   WhatsApp glyph, at bottom-center of the code panel, overlapping its lower edge.
4. **Heading** `0:68` (w983, h140) — display 64, Medium, tight tracking: "Ship
   **WhatsApp** integration in minutes, not months". "WhatsApp" is a dimmer gray.
5. **Subtitle** `0:69` (y160, h48): "One REST API for WhatsApp Business. No Meta app,
   no template maze, no silent webhook failures." — dim gray.
6. **Buttons** `0:70` "Frame 104" (w263, gap-10): Start for free (`0:73`, w121) ·
   View API Docs (`0:75`, w132). Each `px-12 py-8`.
7. **Disclaimer** `0:77` (w386, h16) — tag/12 mono: "No credit card required •
   View WhatsApp API Reference" (the reference part brighter, a link).

## Trust bar — node `0:78` "Frame 120" (1047x264)

Single row. Label left, four logos spread to the right.

- **Label** `0:79` (x32): "Trusted by developers at" — dim.
- **Logos** `0:80` "Frame 119" (x183, w832, h104), four 208px cells: Warner Music Group
  (`0:82`) · ClickUp (`0:103`) · vibiz (`0:117`, small "Case study" pill `0:115` below) ·
  RE/MAX (`0:129`). Monochrome, dim gray.

## Figma ↔ design-system conflicts (resolved toward the system)

1. **Two coral CTAs.** Figma paints both the navbar and hero "Start for free" Coral.
   design.md rule: one coral action per view (the primary). → Hero keeps Coral (the
   view's single action); navbar "Start for free" uses the neutral high-contrast CTA
   (`bone` fill / `void` text) design.md prescribes for that slot.
2. **Smoke hex.** Figma Smoke `#282b2f` vs design.md `smoke` `#383b3f`. Used the token.
3. **Button radius/height.** Figma navbar/hero buttons are 36px tall, 12px radius,
   `px-12`. Reused the `Button` primitive (system heights/radii) instead of bespoke sizes.
4. **Missing primitives.** design.md documents `nav.tsx` and `logo.tsx` under
   `components/ui/`, but only button/input/badge/card exist. Built the logo + nav items
   inline from tokens.
