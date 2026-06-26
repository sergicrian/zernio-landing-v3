# Zernio Design System - Light Theme

Zernio is the social media scheduling API for developers. Its design system is
minimal and monospace-first: light theme only, plenty of whitespace, one accent
color used sparingly, and content set on warm near-neutral surfaces. There is no
dark mode and no web-font dependency, both on purpose.

Source of truth: `libs/design-system/tokens.ts` (feeds `tailwind.config.js`,
`app/globals.css` CSS custom properties, and the DaisyUI theme). When this document
and the code disagree, the code wins.

## Colors

A flat brand palette, not a numbered 10-step scale. Each color has one `DEFAULT`
and one `muted` companion. Names are canonical, use the name in code (`bg-coral`),
never the hex. Colors are plain sRGB hex, no Display P3 variants.

| Token              | Hex       | Role |
|--------------------|-----------|------|
| `coral`            | `#EB3514` | Primary accent. The single primary action, focus rings, emphasis, logo. |
| `coral-muted`      | `#E09282` | Soft coral surfaces and tints (used at low opacity). |
| `burgundy`         | `#660202` | Depth. Secondary emphasis, gradient end, headings on light. |
| `burgundy-muted`   | `#A57070` | Muted burgundy. |
| `charcoal`         | `#2D2D2D` | Body text, dark surfaces. |
| `charcoal-muted`   | `#6B6B6B` | Secondary text, placeholders, icons. |
| `cream`            | `#F0EFEB` | Default warm surface, page background, neutral chips. |
| `cream-muted`      | `#D9D8D3` | Hairline borders, dividers. |
| `white`            | `#FFFFFF` | Elevated cards on cream, text on coral/burgundy. |

Brand gradient: `linear-gradient(135deg, #EB3514, #660202)` (coral to burgundy),
Tailwind `bg-brand-gradient`. Use for hero accents and the CTA glow, not large fills
behind text.

Status colors (badges only, never the brand coral, coral reads as error): success
`emerald-100 / emerald-700`, info `sky-100 / sky-700`, warning `amber-100 / amber-700`,
error `red-100 / red-700`.

Rule: one coral element per view (the primary action). Body text is charcoal on
cream or white, never coral.

## Typography

One typeface everywhere: **Menlo** monospace, fallbacks `Consolas, Monaco,
Liberation Mono, Courier New, monospace`. Applied globally via `font-mono` on
`<html>`. No Google Fonts, no Inter, no web-font network requests. Monospace
alignment is free, use it for tabular data, prices, and labels.

Size scale (rem / px, line-height baked in):

| Token   | Size            | Line height |
|---------|-----------------|-------------|
| `xs`    | 0.75rem / 12px  | 1rem        |
| `sm`    | 0.875rem / 14px | 1.25rem     |
| `base`  | 1rem / 16px     | 1.5rem      |
| `lg`    | 1.125rem / 18px | 1.75rem     |
| `xl`    | 1.25rem / 20px  | 1.75rem     |
| `2xl`   | 1.5rem / 24px   | 2rem        |
| `3xl`   | 1.875rem / 30px | 2.25rem     |
| `4xl`   | 2.25rem / 36px  | 2.5rem      |
| `5xl`   | 3rem / 48px     | 1.15        |
| `6xl`   | 3.75rem / 60px  | 1.1         |
| `7xl`   | 4.5rem / 72px   | 1.05        |

Weights: `normal` 400, `medium` 500, `semibold` 600, `bold` 700. Build hierarchy
with size and weight first, color last.

## Spacing

4px base scale (Tailwind defaults): 4, 8, 12, 16, 24, 32, 40, 64, 96px. Rhythm:
~8px within a group, ~16px between groups, 32px+ between sections.

Layout constants (`tokens.ts`):

- Page padding: 24px mobile, 64px desktop.
- Max content width: 1280px.
- Section vertical gap: 80px, 112px on desktop.

## Radius

Canonical radius scale (`tokens.ts` / `--radius-*`):

| Token  | Value          | Use |
|--------|----------------|-----|
| `sm`   | 0.375rem / 6px | Chips, tags. |
| `md`   | 0.5rem / 8px   | Inputs, small cards. |
| `lg`   | 0.75rem / 12px | Cards, modals. |
| `xl`   | 1rem / 16px    | Large cards, sections. |
| `2xl`  | 1.5rem / 24px  | Hero cards, app-icon style. |
| `full` | 9999px         | Pills, avatars, badges. |

Note: `tailwind.config.js` does not override `borderRadius`, so the `rounded-md`
/ `rounded-lg` / `rounded-xl` utilities in components resolve to Tailwind's defaults
(6 / 8 / 12px), not the token scale above. The px values quoted in Components are the
actual rendered values.

## Shadows and elevation

Subtle, low-opacity neutral shadows, this is a flat, light system. Use Tailwind
`shadow-sm` for raised controls and cards, scale up gently (`shadow-md` / `lg` / `xl`)
for popovers and modals. The one branded shadow is the coral CTA glow:

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

**Button** (`button.tsx`). Variants: `default` (solid coral, primary), `secondary`
(solid burgundy), `soft` (coral tint), `outline`, `ghost`, `link`, `destructive`
(red). `md` is the default size.

| Size   | Height  | Radius | Padding-x | Text |
|--------|---------|--------|-----------|------|
| `sm`   | 32px    | 6px    | 12px      | 12px |
| `md`   | 40px    | 8px    | 16px      | 14px |
| `lg`   | 48px    | 8px    | 24px      | 16px |
| `xl`   | 56px    | 12px   | 32px      | 16px |
| `icon` | 40x40px | 8px    | —         | —    |

**Input** (`input.tsx`). 40px height, 8px radius, `cream-muted` border, white
background, `charcoal` text, `charcoal-muted/60` placeholder. On focus the border
turns `coral` (no ring).

**Badge** (`badge.tsx`). Full-radius pill, `px-2.5 py-0.5`, 12px text. Variants:
`default` (coral), `soft`, `outline`, `secondary` (burgundy), `neutral`, `success`,
`info` (blue, not coral), `warning`, `error` / `destructive`.

**Focus ring** (interactive controls): 2px ring `coral` at 50% opacity with a 2px
offset (`focus-visible:ring-2 ring-coral/50 ring-offset-2`).

**Card** (`card.tsx`): `Card`, `CardHeader`, `CardTitle`, `CardDescription`,
`CardContent`, `CardFooter`.

**Logo** (`logo.tsx`): `LogoMark` with `variant: primary | dark | white`. Brand
assets in `public/brand/` (`logo-primary`, `logo-white`, `logo-dark`, `mark-*`,
`icon-primary`, all SVG + PNG). Clear space equals the height of the mark, never
recolor or stretch.

Reuse these primitives before writing new UI. No `dark:` variants, the system is
one theme on purpose.

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
