"use client";

import { motion } from "motion/react";

import { useBackgroundReveal } from "@/components/sections/hero-reveal";

/**
 * Hero background layer (v3 dark). A full-bleed, absolutely-positioned layer that sits
 * BEHIND the hero content (the fold container is `relative`; this is `-z-10`). It is the
 * only thing added to the hero — content, hierarchy and tokens are untouched.
 *
 * The asset is *light on black*: `mix-blend-screen` over a Void base makes the black
 * dissolve so only the colour waves survive, fused into the #08090A canvas. The blend
 * lives inside `.hero-bg-stage` — an isolated, OVER-SIZED Void surface that spans the
 * media's whole extent (not just the fold). That is what keeps the dissolve seamless:
 * an earlier version backed the blend with Void only across the fold box, so where the
 * media spilled above/below the fold the screen blend had no Void to resolve against and
 * a black seam appeared at the navbar and trust-bar edges. The stage's Void now reaches
 * past both, and its own edges meet the page's identical Void, so there is no seam.
 *
 * Focal alignment: `--hero-bg-focus` is the vertical point the stage (and thus the
 * centre of the media inside it) is anchored to. It is tuned so the wave convergence
 * lands on the code terminal, exactly as in the reference — not on the heading. The calm
 * veil shares the same axis so the readable centre column stays clear while the lateral
 * waves live.
 *
 * Responsive / a11y (see globals.css `.hero-bg-video` / `.hero-bg-poster`): the <video>
 * renders only at lg+ AND when motion is allowed; on mobile and under
 * prefers-reduced-motion the static poster image is shown instead. The video's `poster`
 * is the same PNG, so the still frame paints instantly while the video streams in and
 * never blocks first render.
 *
 * Vertical bleed: the layer is NOT clipped vertically. The media is taller than the
 * 780px fold and centred on the terminal, so it intentionally spills UP behind the
 * (sticky, translucent) navbar and DOWN behind the (transparent) trust bar — no hard
 * cut at the fold edges. It never overflows horizontally because the media is
 * `width:100%` and centre-anchored (see `.hero-bg-media`), so no `overflow` clip is
 * needed and no horizontal scrollbar can appear.
 */
export function HeroBackground() {
  return (
    <motion.div
      {...useBackgroundReveal()}
      className="pointer-events-none absolute inset-0 -z-10 [--hero-bg-focus:28%] lg:[--hero-bg-focus:38%]"
      aria-hidden="true"
    >
      {/* Isolated Void stage (over-sized, centred on the focal point): the media is
          screen-blended against this Void so the black dissolves uniformly across the
          whole layer — up behind the navbar and down behind the trust bar — with no
          seam at the fold edges. */}
      <div className="hero-bg-stage">
        <video
          className="hero-bg-media hero-bg-video mix-blend-screen"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-background.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Static fallback for mobile + reduced-motion. Decorative, so a plain <img>
            (not next/image) full-bleed; alt="" keeps it out of the a11y tree. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-background.png" alt="" className="hero-bg-media hero-bg-poster mix-blend-screen" />
      </div>

      {/* Calm zone: a Void veil concentrated on the centre column so the terminal and
          white heading stay legible, fading to transparent so the side waves survive. */}
      <div className="hero-bg-calm" />
    </motion.div>
  );
}
