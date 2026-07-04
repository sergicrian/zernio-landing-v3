"use client";

import { useReducedMotion, type Variants } from "motion/react";

/**
 * Page-entrance orchestration for the hero fold (v3 dark).
 *
 * The interface "assembles itself" in a fixed order — navbar, WhatsApp eyebrow + nav,
 * heading, app-icon, terminal, body, actions, trust bar — each element fading in while
 * rising a few px, and THEN the wave background wakes up with a slow, atmospheric fade.
 * The contrast (fast/precise elements vs. slow/atmospheric background) is the effect.
 *
 * System rules: only opacity + transform animate (GPU-cheap), brand easing
 * `cubic-bezier(0.4,0,0.2,1)`, and under prefers-reduced-motion everything is shown
 * immediately with no movement.
 *
 * DOM order ≠ reveal order (the terminal is painted before the icon and heading, yet
 * reveals after them), so the sequence is expressed as explicit ordinals fed to one
 * shared variant — not a container `staggerChildren`, which can only stagger in tree
 * order. Delay is derived from a single formula: `BASE + step * STAGGER`.
 */

// Reveal order. Fractional steps keep the icon + terminal nearly overlapping so the two
// read as a single unit (~40ms apart), tighter than the rest of the sequence.
export const HERO_STEP = {
  navbar: 0,
  heroNav: 1,
  heading: 2,
  icon: 3,
  terminal: 3.5,
  body: 4.5,
  actions: 5.5,
  trust: 6.5,
} as const;

// Timing system. One element ≈ DURATION; each step offset by STAGGER; the whole
// element sequence (navbar → trust) lands just under ~1s so it feels agile, not slow.
const BASE_DELAY = 0.05; // s
const STAGGER = 0.08; // s between steps
const DURATION = 0.4; // s per element
const RISE = 10; // px — small, contained; no bounce/spring
const EASE_BRAND = [0.4, 0, 0.2, 1] as const; // tailwind `ease-brand`

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: (step: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION,
      ease: EASE_BRAND,
      delay: BASE_DELAY + step * STAGGER,
    },
  }),
};

/**
 * Reveal steps for the Why Zernio + No Meta panel. Same fade-up vocabulary as the
 * hero, but split across two triggers: the title and the No Meta block fade in
 * shortly after load (like the hero, via useReveal), while the two comparison cards
 * hold until they scroll into view (via useScrollReveal). The card steps stagger
 * left then right; the load steps trail the mount by a beat.
 */
export const PANEL_STEP = {
  // Load reveal (fires just after mount).
  title: 1,
  noMeta: 2,
  // Scroll reveal (fires when the cards enter the viewport).
  cardLeft: 0,
  cardRight: 0.5,
} as const;

/**
 * Motion props for one element in the sequence. Spread onto any `motion.*` element:
 * `<motion.h1 {...useReveal(HERO_STEP.heading)} />`. Reduced-motion is resolved here,
 * once, so callers never repeat the check.
 */
export function useReveal(step: number) {
  const reduce = useReducedMotion();
  return reduce
    ? ({ initial: false } as const)
    : ({
        variants: fadeUp,
        custom: step,
        initial: "hidden",
        animate: "show",
      } as const);
}

/**
 * Like useReveal, but the fade-up waits until the element scrolls into view instead
 * of firing on load. Used for the Why Zernio comparison cards. `once` so it plays a
 * single time and never replays on scroll back; reduced-motion shows it immediately.
 */
export function useScrollReveal(step: number) {
  const reduce = useReducedMotion();
  return reduce
    ? ({ initial: false } as const)
    : ({
        variants: fadeUp,
        custom: step,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      } as const);
}

// Background: opacity-only, slow and atmospheric. Starts once the element sequence is
// wrapping up (just after the trust bar begins) and fades in much slower than the
// elements — the deliberate tempo contrast that reads as premium.
const BG_START = BASE_DELAY + 7.5 * STAGGER; // s — after the last element has begun
const bgFade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.1, ease: "easeOut", delay: BG_START },
  },
};

/** Motion props for the hero background layer. Same reduced-motion contract as above. */
export function useBackgroundReveal() {
  const reduce = useReducedMotion();
  return reduce
    ? ({ initial: false } as const)
    : ({ variants: bgFade, initial: "hidden", animate: "show" } as const);
}
