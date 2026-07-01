"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/design-system/cn";

import zernioLogo from "@/public/zernio-logo.svg";
import zernioWordmark from "@/public/zernio-wordmark.svg";

/**
 * Navbar (Figma 4:730). Fixed glass bar, 72px tall. On mobile everything is
 * compacted so the logo, a ghost "Pricing" link and the primary CTA all fit
 * without clipping; the desktop layout (full nav links, larger logo) returns at
 * lg.
 */
const LINKS: { label: string; caret?: boolean }[] = [
  { label: "Docs", caret: true },
  { label: "Product", caret: true },
  { label: "Pricing" },
  { label: "Affiliates" },
];

// Ghost style of the desktop nav links: black by default (per the reference),
// softening to driftwood on hover.
const ghostLink =
  "inline-flex items-center gap-1 rounded-full px-4 py-2 text-base text-midnight-ink transition-colors hover:text-driftwood";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] border-b border-ash-border transition-colors duration-base",
        scrolled ? "bg-parchment-white/70 backdrop-blur-md" : "bg-parchment-white",
      )}
    >
      {/* Page gutters mirror <main> (px-page / px-page-desktop) so the content
          box lands at exactly the same width as the sections below. */}
      <div className="h-full px-page lg:px-page-desktop">
        {/* max-w-content box with visible border-x rails, aligned vertically with
            the page's outer rails. `relative` anchors the absolutely-centered nav. */}
        <div className="relative mx-auto flex h-full w-full max-w-content items-center gap-3 border-x border-ash-border px-6 lg:gap-6 lg:px-10">
          {/* Logo: tightly-cropped wordmark on mobile (the default logo has a lot of
              internal padding, so it renders tiny); the padded desktop logo at lg. */}
          <a href="#" className="flex h-full shrink-0 items-center">
            <Image
              src={zernioWordmark}
              alt="Zernio"
              className="h-5 w-auto lg:hidden"
              priority
            />
            <Image
              src={zernioLogo}
              alt="Zernio"
              className="hidden h-full w-36 lg:block"
              priority
            />
          </a>

          {/* Center nav links (desktop): absolutely centered in the rail box so
              they stay optically centered regardless of logo / action widths. */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <a key={link.label} href="#" className={ghostLink}>
                {link.label}
                {link.caret ? (
                  <ChevronDown className="size-5" aria-hidden />
                ) : null}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex min-w-0 items-center gap-2 lg:gap-2.5">
            <a
              href="#"
              className="inline-flex shrink-0 items-center rounded-full px-3 py-2 text-sm text-midnight-ink transition-colors hover:text-driftwood lg:hidden"
            >
              Pricing
            </a>
            <Button variant="outline" className="hidden sm:inline-flex">
              Dashboard
            </Button>
            <Button className="shrink-0 px-3 text-xs sm:px-4 sm:text-sm">
              Start for free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
