"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HERO_STEP, useReveal } from "@/components/sections/hero-reveal";

import zernioWordmark from "@/public/zernio-wordmark.svg";

/**
 * Navbar (Figma 0:135, "Frame 97"). Floating carbon pill bar: logo left, primary
 * nav center-left, actions right. On tablet/mobile the center nav collapses to a
 * "Pricing" quick link next to the CTA, so nothing clips.
 *
 * "Start for free" is the primary coral CTA, the same Button component as the hero.
 * "Dashboard" is the secondary gradient button (bg-linear-gradient + smoke hairline).
 */
const NAV_LINKS: { label: string; caret?: boolean }[] = [
  { label: "Docs", caret: true },
  { label: "Product", caret: true },
  { label: "Pricing" },
  { label: "Affiliates" },
];

const navLink =
  "inline-flex items-center gap-1 rounded-full px-3 py-2 text-label-lg font-medium text-fog transition-colors duration-base ease-brand hover:text-paper";

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 px-page pt-4 lg:px-page-desktop">
      <motion.header
        {...useReveal(HERO_STEP.navbar)}
        className="mx-auto flex w-full max-w-[1080px] items-center gap-4 rounded-xl border border-white/10 bg-carbon/50 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150 lg:px-8"
      >
        {/* Logo (coral wordmark). */}
        <a href="#" className="flex shrink-0 items-center" aria-label="Zernio home">
          <Image
            src={zernioWordmark}
            alt="Zernio"
            className="h-auto w-[80px] sm:w-[100px]"
            priority
          />
        </a>

        {/* Primary nav (desktop). */}
        <nav className="ml-6 hidden items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href="#" className={navLink}>
              {link.label}
              {link.caret ? (
                <ChevronDown className="size-5" aria-hidden />
              ) : null}
            </a>
          ))}
        </nav>

        {/* Actions. */}
        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          {/* Mobile/tablet quick link (the full nav is hidden below lg). */}
          <a href="#" className={`${navLink} lg:hidden`}>
            Pricing
          </a>
          {/* Secondary gradient button. */}
          <Button
            variant="outline"
            className="hidden rounded-xl border-smoke bg-linear-gradient text-paper hover:text-paper hover:brightness-110 sm:inline-flex"
          >
            Dashboard
          </Button>
          {/* Primary CTA: same coral button component as the hero. */}
          <Button className="rounded-xl">Start for free</Button>
        </div>
      </motion.header>
    </div>
  );
}
