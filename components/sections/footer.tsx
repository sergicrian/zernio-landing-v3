import Image from "next/image";

import { FooterWordmark } from "@/components/sections/footer-wordmark";
import logoRender from "@/public/zerni-logo-render.webp";

/**
 * Footer (Figma 29:486), rebuilt on the v3 dark system. Sits on the void canvas just
 * below the final CTA, inside the same 1080 box as every other section so its rails
 * line up with the panel above.
 *
 * The glass "7" logo render (public/zerni-logo-render.webp) is a light-on-black asset
 * that screen-blends against the void: its dark background dissolves and only the lit
 * glass remains. It is centred over the column, the footer card overlapping its lower
 * half — the top of the hook rises free above the card while the rest shows through
 * the frosted panel.
 *
 * The card itself reuses the navbar's glass recipe (carbon/50 fill, white/10 hairline,
 * backdrop-blur + saturate) so the blurred render reads faintly behind the links. Token
 * mapping off the old light tokens: mono eyebrows in mist, links in fog → paper on
 * hover, dividers on white/10, and the oversized wordmark masked to a faint white ghost.
 */
const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Product",
    links: [
      "Documentation",
      "Dashboard",
      "Pricing",
      "Enterprise",
      "Features",
      "Chat SDK Adapter",
      "Changelog",
      "Open Analytics",
      "n8n Templates",
      "AI Agents",
      "Creators",
      "Roadmap",
    ],
  },
  {
    title: "Integrations",
    links: [
      "Twitter/X",
      "Instagram",
      "TikTok",
      "WhatsApp",
      "LinkedIn",
      "Facebook",
      "YouTube",
      "Threads",
      "Reddit",
      "Pinterest",
      "Bluesky",
      "Telegram",
      "Snapchat",
      "Google Business",
      "Discord",
      "Meta Ads",
      "Google Ads",
      "LinkedIn Ads",
      "TikTok Ads",
      "Pinterest Ads",
      "X Ads",
    ],
  },
  {
    title: "Company",
    links: [
      "Blog",
      "Social Media Tips",
      "Terms",
      "Privacy",
      "Content Guidelines",
      "Impressum",
      "About",
      "Customers",
      "Careers",
      "Press",
      "Affiliates",
      "Creators",
      "Trust Portal",
      "Status",
      "Rebrand",
    ],
  },
  {
    title: "Comparisons",
    links: [
      "vs Buffer",
      "vs Ayrshare",
      "vs Blotato",
      "vs Publer",
      "vs Postiz",
      "vs Unipile",
      "vs Twilio",
      "Compare",
    ],
  },
  {
    title: "Community",
    links: ["X", "LinkedIn", "YouTube", "Telegram", "GitHub"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-x-clip pt-[180px] lg:pt-[220px]">
      {/* Glass "7" render, screen-blended exactly like the hero background stage
          (see .hero-bg-stage in globals.css): mix-blend-screen does NOT blend against
          the body's canvas background — it needs an actual Void surface painted right
          behind it inside an isolated group, or the black backdrop survives as a box.
          So this wrapper carries its own `bg-void` fill and `isolate`s the group; the
          render blends against that Void (black → void, glass → lit). The Void box is
          invisible against the identical page Void, and the band below (z-10) overlaps
          its lower half. Decorative → no pointer events. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -top-24 w-[min(600px,90vw)] -translate-x-1/2 isolate bg-void"
      >
        <Image
          src={logoRender}
          alt=""
          className="h-auto w-full"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      {/* Full-bleed glass band — the navbar's frosted recipe stretched edge to edge (no
          lateral rails, only a top hairline), so the fill reaches the full page width
          while the render bleeds through the blur behind the links. */}
      <div className="relative z-10 border-t border-white/10 bg-carbon/50 shadow-[0_-8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150">
        {/* Content capped at the same 1080 box as every other section */}
        <div className="mx-auto w-full max-w-[1080px] px-page lg:px-page-desktop">
          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 pb-10 pt-12 md:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <p className="font-mono text-label-xs uppercase tracking-wide text-mist">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-label text-fog transition-colors duration-base ease-brand hover:text-paper"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright band */}
          <div className="flex items-center gap-6 py-8">
            <p className="font-mono text-label-xs text-fog">© 2026 Zernio</p>
            <a
              href="#"
              className="font-mono text-label-xs text-fog transition-colors duration-base ease-brand hover:text-paper"
            >
              Cookie settings
            </a>
          </div>

          {/* Oversized outlined wordmark with a cursor-following flashlight. */}
          <div className="py-12">
            <FooterWordmark />
          </div>
        </div>
      </div>
    </footer>
  );
}
