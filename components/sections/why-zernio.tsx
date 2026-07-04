"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

import {
  PANEL_STEP,
  useReveal,
  useScrollReveal,
} from "@/components/sections/hero-reveal";

import zernioApp from "@/public/zernio-app.svg";
import metaApp from "@/public/meta-app.svg";

/**
 * Why Zernio (Figma node 185:1222). Centered coral eyebrow + two-tone heading,
 * then a two-column comparison as two equal-height cards. The Zernio card lifts
 * off the canvas with an obsidian->void fill inside a smoke->void gradient
 * hairline; the Cloud API card is a plain graphite outline. Each header carries
 * the product app icon. On mobile the row icon/text stack vertically.
 *
 * Rendered inside the shared bordered panel composed in app/page.tsx.
 */
const ZERNIO = [
  "One API key. No Meta Business verification maze. Start sending in 30 seconds",
  "Full template CRUD via API. We handle submission to Meta and category tracking",
  "Reliable webhook delivery with built-in retry logic. Same format across all platforms",
  "24h window, rate limits, messaging tiers: all handled automatically. You just call POST",
  "Same REST API for WhatsApp + 14 other platforms. Learn once, ship everywhere",
];

const CLOUD = [
  "Navigate 5+ Meta products just to send one message (Business Manager, App Dashboard, WABA, phone setup, verification)",
  'Template approval is slow and opaque. "Utility" templates silently reclassified as "marketing" (the most expensive tier)',
  "Webhooks silently fail with no replay, no logs, and minimal error feedback. You build retry infrastructure from scratch",
  "New accounts start at 250 messages/day. Phone numbers permanently locked to API. Breaking changes ship without warning",
  "Pay Twilio 3-5x markup for a usable DX, or suffer Meta's broken docs and zero developer tooling yourself",
];

export function WhyZernio() {
  return (
    <div>
      {/* Header. Interior padding matches the navbar pill (px-4/lg:px-8). The title
          reveals on load, like the hero h1. */}
      <motion.div
        {...useReveal(PANEL_STEP.title)}
        className="flex flex-col items-center gap-4 px-4 pb-10 pt-12 text-center lg:px-8"
      >
        <p className="font-mono text-tag tracking-wider text-coral">
          Why Zernio?
        </p>
        <h2 className="text-heading font-medium tracking-tight text-paper">
          Meta&apos;s API fights you.{" "}
          <span className="text-fog">Ours doesn&apos;t.</span>
        </h2>
      </motion.div>

      {/* Comparison cards (equal height via the grid's stretch). Each reveals on
          scroll like the hero terminal, left then right. */}
      <div className="grid grid-cols-1 gap-5 px-4 pb-12 md:grid-cols-2 lg:px-8">
        <ComparisonCard
          title="Zernio API"
          logo={zernioApp}
          rows={ZERNIO}
          tone="pro"
          step={PANEL_STEP.cardLeft}
        />
        <ComparisonCard
          title="WhatsApp Cloud API (direct)"
          logo={metaApp}
          rows={CLOUD}
          tone="con"
          step={PANEL_STEP.cardRight}
        />
      </div>
    </div>
  );
}

function ComparisonCard({
  title,
  logo,
  rows,
  tone,
  step,
}: {
  title: string;
  logo: StaticImageData;
  rows: string[];
  /** "pro" ticks rows in coral on a gradient card, "con" crosses them in ash. */
  tone: "pro" | "con";
  /** Scroll-reveal ordinal (see SCROLL_STEP). */
  step: number;
}) {
  const Icon = tone === "pro" ? Check : X;
  const iconColor = tone === "pro" ? "text-coral" : "text-ash";
  const reveal = useScrollReveal(step);

  const body = (
    <>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-label-lg font-medium text-paper">{title}</h3>
        <Image src={logo} alt="" aria-hidden className="size-11 shrink-0" />
      </div>
      <ul className="mt-5 space-y-5">
        {rows.map((row) => (
          <li
            key={row}
            className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5"
          >
            <Icon className={`size-6 shrink-0 ${iconColor}`} aria-hidden />
            <span className="text-body text-fog">{row}</span>
          </li>
        ))}
      </ul>
    </>
  );

  // Zernio: obsidian->void fill inside a smoke->void gradient hairline (1px pad),
  // with a coral comet sweeping around the border (see .card-beam in globals.css).
  if (tone === "pro") {
    return (
      <motion.div {...reveal} className="relative rounded-2xl p-px">
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-smoke to-void"
        />
        <div aria-hidden className="card-beam absolute inset-0 rounded-2xl" />
        <div className="relative h-full rounded-[calc(1rem-1px)] bg-gradient-to-b from-obsidian to-void p-8">
          {body}
        </div>
      </motion.div>
    );
  }

  // Cloud API: outline only, no surface fill.
  return (
    <motion.div {...reveal} className="rounded-2xl border border-graphite p-8">
      {body}
    </motion.div>
  );
}
