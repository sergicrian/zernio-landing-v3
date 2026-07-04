# Zernio Design System - Dark Theme

Zernio is the social media scheduling API for developers. Its design system is
dark-first: a near-black canvas, plenty of negative space, one accent color used
sparingly, and content set on a graded scale of dark surfaces. The type is Geist
(sans) for everything readable, with Menlo (mono) reserved for technical accents.
There is one theme, dark, on purpose. No light mode, no `dark:` variants, no theme
toggle, the palette below *is* the palette.

Source of truth: `tailwind.config.ts` (Tailwind tokens) and `app/globals.css` (the
CSS custom properties they resolve to). When this document and the code disagree, the
code wins.

## Colors

A ten-step neutral scale from the page canvas up to pure white, plus two brand accents
(coral, burgundy), each with a `muted` companion. Names are canonical, use the name in
code (`bg-void`, `text-bone`), never the hex. Colors are plain sRGB hex, no Display P3
variants.

Surfaces, canvas up:

| Token      | Hex       | Role |
|------------|-----------|------|
| `void`     | `#08090A` | Page canvas. The default full-bleed background everything sits on. |
| `carbon`   | `#0F1011` | Card, navbar, and panel surfaces. One step above the canvas. |
| `obsidian` | `#161718` | Elevated surfaces, deeper card panels, popovers. |

Borders and dividers:

| Token      | Hex       | Role |
|------------|-----------|------|
| `graphite` | `#23252A` | Subtle borders, dividers, ghost/outline button outlines. |
| `smoke`    | `#383B3F` | Hairline borders at higher contrast than graphite, section separators. |

Text and icons, dim to bright:

| Token   | Hex       | Role |
|---------|-----------|------|
| `ash`   | `#62666D` | Attenuated body text, inactive icons, secondary metadata. |
| `fog`   | `#8A8F98` | Tertiary text, placeholders, icon fills. |
| `mist`  | `#D0D6E0` | Secondary headings, button text on dark surfaces. |
| `bone`  | `#E5E5E6` | Near-white surface fills, primary body text, high-contrast button text. |
| `paper` | `#FFFFFF` | Primary headings, hero type, maximum-contrast emphasis. |

Brand accents:

| Token            | Hex       | Role |
|------------------|-----------|------|
| `coral`          | `#EB3514` | Primary action accent. Buttons, focus rings, brand emphasis, logo. |
| `coral-muted`    | `#E09282` | Soft coral surfaces and tints, code strings, low-opacity washes. |
| `burgundy`       | `#660202` | Depth, secondary emphasis, gradient end. |
| `burgundy-muted` | `#A57070` | Muted burgundy. |

Text hierarchy on dark: `paper` for primary headings and hero type, `bone` for primary
body, `mist` for secondary headings, `ash` for muted body and metadata, `fog` for
tertiary text and placeholders. Build hierarchy with size and weight first, color last.

Linear gradient: `linear-gradient(-90deg, var(--graphite), var(--carbon))` (graphite to
carbon), Tailwind `bg-linear-gradient`. This is the secondary-button surface (navbar
"Dashboard", hero "View API Docs"): a near-flat dark fill that lifts a control off the
canvas without competing with the single coral action. Pair it with a `smoke` hairline
and `paper` text.

Status colors (badges only) are the luminous, high-value versions that hold up on a
near-black surface, a translucent tint background under a bright foreground. They are
*not* the emerald-700 / amber-700 mid-tones from a light system, those go muddy on
`void`. Never reuse the brand coral for status: coral is the action, and error is a
true red so the two never collide.

| Status  | Background        | Foreground     |
|---------|-------------------|----------------|
| success | `emerald-500/10`  | `emerald-300`  |
| info    | `sky-500/10`      | `sky-300`      |
| warning | `amber-500/10`    | `amber-300`    |
| error   | `red-500/10`      | `red-300`      |

Rule: one coral element per view, the primary action. Coral is brand, not a warning.
Do not spread it across a screen, and do not let status badges borrow it.

## Typography

Two typefaces, with a clear split.

**Geist** (sans) is the default everywhere readable: headings, body, and buttons.
Applied globally via `font-sans` on `<html>`. Loaded with `next/font/google` (the
`Geist` import in `app/layout.tsx`), which self-hosts the font as a static asset, so no
request ever leaves for Google at runtime. It is a variable font exposed as the
`--font-geist` CSS variable. Stack: `Geist, -apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, sans-serif`.

Use exactly two weights: **Geist Regular (400)** for body, **Geist Medium (500)** for
headings and buttons. 500 is the heaviest weight in the system. No `semibold` 600, no
`bold` 700.

**Menlo** (mono) is the `font-mono` utility, reserved for two things only: code and
request/response blocks, and technical eyebrows / tags / labels (the uppercase
`WHATSAPP` eyebrow on the hero, badges, section labels, tabular figures). System font,
zero load. Stack: `Menlo, Consolas, Monaco, "Liberation Mono", "Courier New",
monospace`. Do not set Menlo on body copy or headings.

Size scale (px, line-height baked into each token):

| Token      | Size | Line height | Use |
|------------|------|-------------|-----|
| `display`  | 64px | 1.1         | Hero headline. |
| `heading`  | 24px | 30px        | Section and card headings. |
| `body-lg`  | 20px | 28px        | Lead paragraphs, large body. |
| `body`     | 16px | 24px        | Default body copy. |
| `label-lg` | 16px | 20px        | Button and control labels, tight 16px. |
| `label`    | 14px | 20px        | Secondary labels, dense UI text. |
| `label-sm` | 13px | 16px        | Small labels, captions. |
| `tag`      | 14px | 20px        | Eyebrows, badges, tags (Menlo Bold, weight baked into the token). |

Reach for these named tokens (`text-display`, `text-heading`, `text-body`, ...) over
raw Tailwind sizes. Build hierarchy with size and weight first, color last.

## Spacing

4px base scale (Tailwind defaults): 4, 8, 12, 16, 24, 32, 40, 64, 96px. Rhythm:
~8px within a group, ~16px between groups, 32px+ between sections.

Layout constants (`tailwind.config.ts`):

- Page padding: 24px mobile (`px-page`), 64px desktop (`px-page-desktop`).
- Max content width: 1280px (`max-w-content`).
- Section vertical gap: 80px (`section`), 112px on desktop (`section-desktop`).

## Radius

Canonical radius scale:

| Token  | Value          | Use |
|--------|----------------|-----|
| `sm`   | 0.375rem / 6px | Chips, tags. |
| `md`   | 0.5rem / 8px   | Inputs, small cards. |
| `lg`   | 0.75rem / 12px | Cards, modals. |
| `xl`   | 1rem / 16px    | Large cards, sections. |
| `2xl`  | 1.5rem / 24px  | Hero cards, app-icon style. |
| `full` | 9999px         | Pills, avatars, badges. |

Note: `tailwind.config.ts` does not override `borderRadius`, so the `rounded-md`
/ `rounded-lg` / `rounded-xl` utilities in components resolve to Tailwind's defaults
(6 / 8 / 12px), not the token scale above. The px values quoted in Components are the
actual rendered values.

## Shadows and elevation

On a dark canvas elevation reads from *surface steps and borders*, not from drop
shadows. Lift a panel by moving it up the scale (`void` -> `carbon` -> `obsidian`) and
outlining it with a `graphite` or `smoke` hairline. Shadows stay subtle: use Tailwind
`shadow-sm` on raised cards and controls, scale up gently (`shadow-md` / `lg` / `xl`)
for popovers and modals, and never rely on shadow alone to separate two dark surfaces.

The one branded shadow is the coral CTA glow:

```css
box-shadow: 0 0 20px rgba(235, 53, 20, 0.3); /* shadow-glow */
```

## Motion

Easing `cubic-bezier(0.4, 0, 0.2, 1)`, durations `fast` 150ms, `base` 200ms,
`slow` 300ms. Animate transforms and opacity, never layout. Motion is for clarity,
not decoration.

## Components

shadcn/ui pattern (`class-variance-authority` + `clsx` + `tailwind-merge`, Radix
via `@radix-ui/react-slot`, `lucide-react` icons), in `components/ui/`. Merge classes
with `cn()` from `libs/design-system/cn.ts`.

**Button** (`button.tsx`). Label text is **Geist Medium** (`font-medium`), not mono.
Variants: `default` (solid coral, primary), `secondary` (solid burgundy), `soft`
(coral tint), `outline` (`graphite` border, `bone` text), `ghost` (`mist` text),
`link` (coral), `destructive` (true red, not coral). `md` is the default size. For a
high-contrast neutral CTA where burgundy reads too heavy, use a `bone` fill with `void`
text.

| Size   | Height  | Radius | Padding-x | Text        |
|--------|---------|--------|-----------|-------------|
| `sm`   | 32px    | 6px    | 12px      | `tag` 12px  |
| `md`   | 40px    | 8px    | 16px      | `label` 14px|
| `lg`   | 48px    | 8px    | 24px      | `label-lg` 16px |
| `xl`   | 56px    | 12px   | 32px      | `label-lg` 16px |
| `icon` | 40x40px | 8px    | -         | -           |

**Input** (`input.tsx`). 40px height, 8px radius, `graphite` border, `carbon`
background, `bone` text, `fog` placeholder. On focus the border turns `coral` (no ring).

**Badge** (`badge.tsx`). Full-radius pill, `px-2.5 py-0.5`, `tag` 14px text, set in
**Menlo Bold** (`font-mono`, weight baked into the `tag` token). Never wraps. Variants: `default` (coral), `soft` (coral tint), `outline`
(`graphite` border, `mist` text), `secondary` (burgundy), `neutral` (`bone` fill,
`void` text), `success`, `info`, `warning`, `error` / `destructive` (the luminous
status pairs above).

**Focus ring** (interactive controls): 2px ring `coral` at 50% opacity with a 2px
offset (`focus-visible:ring-2 ring-coral/50 ring-offset-2 ring-offset-void`).

**Card** (`card.tsx`): `Card`, `CardHeader`, `CardTitle`, `CardDescription`,
`CardContent`, `CardFooter`. `carbon` fill, `graphite` hairline. `CardTitle` is
`paper` at `font-medium`, `CardDescription` is `ash`.

**Nav** (`nav.tsx`). Nav item text and icons default to `ash` (inactive). Active or
hovered items brighten to `paper`, never coral (coral stays reserved for the one
primary action per view). Hairline dividers and the nav underline use `graphite`.

**Logo** (`logo.tsx`): `LogoMark` with `variant: primary | dark | white`. On the dark
canvas the default is `white` (or `primary` coral for a brand accent); the `dark`
variant is for light exports only. Brand assets in `public/brand/`. Clear space equals
the height of the mark, never recolor or stretch.

Reuse these primitives before writing new UI. No `dark:` variants, the system is one
dark theme by design.

## Content

Voice is the one you want from good docs: direct, technically honest, never hypey.

- Clear over clever. Say what the thing does, show the request/response.
- No marketing inflation ("revolutionary", "seamless", "effortless").
- Lead with the answer, one idea per sentence.
- Sentence case for body copy, action verb + noun for buttons, numerals over words.
- No em dashes. Use commas, parentheses, or separate sentences (hard rule).
- One question, one hero answer per screen, defer detail to disclosure. A grid of
  stat widgets is not a design, it is a deferred decision.
- Errors are content: show the cause and the next action.
</content>
</invoke>
