import Image from "next/image";

import zernioIcon from "@/public/zernio-icon.svg";
import zernioWordmark from "@/public/zernio-wordmark.svg";
import soc2 from "@/public/soc2.webp";
import gdpr from "@/public/gdpr.webp";

/**
 * Footer (Figma 29:486). Full-width, light. The content sits in the same centered
 * column as the rest of the page, framed by the line-grid side rails (border-x).
 * Logo + GDPR/SOC 2 badge cells, the link columns, the copyright band, and the
 * large ash-border Zernio wordmark, each separated by hairlines. Columns reflow
 * from 5 across to 3, then 2 on mobile.
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

// lg width is 100px so the GDPR|SOC 2 divider lands exactly on the 1080 inner
// rail descending from the sections above (1280 − 1080 = 200 → 100px per side).
const badgeCell =
  "flex w-20 shrink-0 items-center justify-center border-l border-ash-border p-3 lg:w-[100px]";

export function Footer() {
  return (
    <footer className="px-page lg:px-page-desktop">
      {/* Content column framed by the grid side rails */}
      <div className="mx-auto w-full max-w-content border-x border-ash-border">
        {/* Logo + compliance badge cells */}
        <div className="flex items-stretch justify-between border-b border-ash-border">
          <div className="flex items-center px-6 py-6 lg:px-10">
            {/* -ml compensates the logo's internal left padding so the mark lines up with the columns */}
            <Image src={zernioIcon} alt="Zernio" className="h-9 w-auto" />
          </div>
          <div className="flex items-stretch">
            <div className={badgeCell}>
              <Image src={gdpr} alt="GDPR" className="h-12 w-auto" />
            </div>
            <div className={badgeCell}>
              <Image src={soc2} alt="SOC 2" className="h-12 w-auto" />
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 border-b border-ash-border p-6 md:grid-cols-3 lg:grid-cols-5 lg:p-10">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-midnight-ink">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-driftwood transition-colors hover:text-midnight-ink"
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
        <div className="flex items-center gap-6 border-b border-ash-border px-6 py-8 lg:px-10">
          <p className="text-xs text-driftwood">© 2026 Zernio</p>
          <a
            href="#"
            className="text-xs text-driftwood transition-colors hover:text-midnight-ink"
          >
            Cookie settings
          </a>
        </div>

        {/* Large wordmark, masked to ash-border, full grid width within the 40px margins */}
        <div className="px-6 py-12 lg:px-10">
          <span
            aria-hidden
            className="block aspect-[475/100] w-full bg-ash-border"
            style={{
              maskImage: `url(${zernioWordmark.src})`,
              WebkitMaskImage: `url(${zernioWordmark.src})`,
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          />
        </div>
      </div>
    </footer>
  );
}
