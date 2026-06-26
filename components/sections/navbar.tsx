"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/design-system/cn";

import zernioLogo from "@/public/zernio-logo.svg";

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

// Ghost style of the desktop nav links.
const ghostLink =
  "inline-flex items-center gap-1 rounded-full px-4 py-3 text-base text-charcoal-muted transition-colors hover:text-charcoal";

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
        "fixed inset-x-0 top-0 z-50 h-[72px] border-b border-cream-muted transition-colors duration-base",
        scrolled ? "bg-cream/70 backdrop-blur-md" : "bg-cream",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-content items-center gap-3 px-6 lg:gap-6 lg:px-10">
        {/* Logo: natural size on mobile, larger on desktop */}
        <a href="#" className="flex h-full shrink-0 items-center">
          <Image
            src={zernioLogo}
            alt="Zernio"
            className="h-7 w-auto lg:h-full lg:w-36"
            priority
          />
        </a>

        {/* Center nav links (desktop) */}
        <nav className="hidden flex-1 items-center gap-1 lg:flex">
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
        <div className="ml-auto flex min-w-0 items-center gap-2 lg:ml-0 lg:gap-2.5">
          <a
            href="#"
            className="inline-flex shrink-0 items-center rounded-full px-3 py-2 text-sm text-charcoal-muted transition-colors hover:text-charcoal lg:hidden"
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
    </header>
  );
}
