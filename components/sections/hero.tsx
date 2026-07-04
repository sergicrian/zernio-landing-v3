import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CodeTypewriter } from "@/components/sections/code-typewriter";

import whatsappGlyph from "@/public/whatsapp-logo.svg";

/**
 * Hero (Figma 0:27, "Frame 187"). Split into two blocks so the first fold can lay them
 * out over the full viewport height (see app/page.tsx): `HeroNav` is the WhatsApp
 * eyebrow + section-nav row (pinned near the top), `Hero` is the centered content
 * stack (code panel, app-icon, heading, subtitle, actions, disclaimer). Static only.
 *
 * Coral rule: "Start for free" is the single coral action of the whole view.
 */

// Section anchors (the sections themselves are commented out for now).
const SECTION_TABS = [
  { label: "Overview", active: true },
  { label: "Why Zernio" },
  { label: "How it works" },
  { label: "Features" },
  { label: "Code example" },
  { label: "FAQs" },
];

/** Block A: WhatsApp eyebrow + in-page section nav. Pinned near the top of the fold. */
export function HeroNav() {
  return (
    <section className="px-page lg:px-page-desktop">
      {/* px-4/lg:px-8 mirrors the navbar header so the edges line up with the logo
          (left) and CTAs (right) inside the same 1080 box. */}
      <div className="mx-auto w-full max-w-[1080px] px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <span className="shrink-0 font-mono text-tag uppercase tracking-wider text-bone">
            WhatsApp
          </span>
          {/* < lg: flex-1 + overflow-x-auto turns the tabs into a masked, swipeable row
              (the fade under the WhatsApp label hints at the hidden items). The inner
              w-max row is pushed right with ml-auto: when the tabs fit it anchors them to
              the right (so they don't jump sideways at the lg breakpoint), and when they
              overflow ml-auto resolves to 0 so the row scrolls normally from the start —
              avoiding the flex `justify-end` + overflow bug that traps the left overflow. */}
          <nav className="nav-scroll min-w-0 flex-1 overflow-x-auto lg:flex-none lg:overflow-visible">
            <div className="ml-auto flex w-max items-center gap-1">
              {SECTION_TABS.map((tab) => (
                <a
                  key={tab.label}
                  href="#"
                  className={
                    "shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-label font-medium transition-colors duration-base ease-brand " +
                    (tab.active ? "text-paper" : "text-fog hover:text-paper")
                  }
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

/** Block B: centered content stack (code panel, app-icon, heading, actions). */
export function Hero() {
  return (
    <section className="px-page lg:px-page-desktop">
      <div className="mx-auto w-full max-w-[1080px] px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Code panel with the app-icon overlapping its lower (faded) edge.
              The JSON types itself out, holds, then erases in a loop. */}
          <div className="w-full max-w-[500px]">
            <CodeTypewriter />
          </div>
          <div className="relative z-10 -mt-6">
            <WhatsappTile />
          </div>

          {/* Heading. Forced to two lines on desktop; wraps naturally below lg. */}
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-paper sm:text-5xl lg:text-display">
            Ship WhatsApp integration
            <br className="hidden lg:block" /> in minutes, not months
          </h1>

          <p className="mt-6 max-w-xl text-body text-fog">
            One REST API for WhatsApp Business. No Meta app, no template maze, no
            silent webhook failures.
          </p>

          {/* Actions: the single coral action + a neutral outline. */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <Button className="rounded-xl">Start for free</Button>
            <Button
              variant="outline"
              className="rounded-xl border-smoke bg-linear-gradient text-paper hover:text-paper hover:brightness-110"
            >
              View API Docs
            </Button>
          </div>

          {/* Disclaimer (mono). Not coral: the reference link stays neutral. */}
          <p className="mt-5 font-mono text-tag leading-7 text-ash">
            No credit card required <span aria-hidden>•</span>{" "}
            <a
              href="#"
              className="text-mist underline-offset-4 transition-colors duration-base ease-brand hover:text-paper hover:underline"
            >
              View WhatsApp API Reference
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/** WhatsApp app-icon: a looping video fills the rounded tile (replacing the former
 *  gradient + stroke), with the white glyph composited on top. The clip is a square
 *  1080x1080 light loop, so `object-cover` fills the tile with no distortion; the tile's
 *  `overflow-hidden` clips it to the rounded corners. */
function WhatsappTile() {
  return (
    <div className="relative flex size-[72px] items-center justify-center overflow-hidden rounded-[25px]">
      {/* Looping video backdrop. muted + playsInline are required for mobile autoplay. */}
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/logo-video.mp4" type="video/mp4" />
      </video>
      {/* `relative` keeps the glyph above the absolutely-positioned video. */}
      <Image
        src={whatsappGlyph}
        alt="WhatsApp"
        className="relative h-9 w-auto"
        priority
      />
    </div>
  );
}

