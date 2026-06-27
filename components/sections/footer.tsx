import Image from "next/image";

import zernioLogo from "@/public/zernio-logo.svg";
import zernioWordmark from "@/public/zernio-wordmark.svg";
import soc2 from "@/public/soc2.webp";
import gdpr from "@/public/gdpr.webp";

/**
 * Footer (Figma 29:486). Full-width, light. The content sits in the same centered
 * column as the rest of the page, framed by the line-grid side rails (border-x).
 * Logo + GDPR/SOC 2 badge cells, the link columns, the copyright band, and the
 * large cream-muted Zernio wordmark, each separated by hairlines. Columns reflow
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

const badgeCell =
  "flex w-20 shrink-0 items-center justify-center border-l border-cream-muted p-3 lg:w-24";

export function Footer() {
  return (
    <footer className="px-page lg:px-page-desktop">
      {/* Content column framed by the grid side rails */}
      <div className="mx-auto w-full max-w-content border-x border-cream-muted">
        {/* Logo + compliance badge cells */}
        <div className="flex items-stretch justify-between border-b border-cream-muted">
          <div className="flex items-center px-6 py-6 lg:px-10">
            {/* -ml compensates the logo's internal left padding so the mark lines up with the columns */}
            <Image src={zernioLogo} alt="Zernio" className="-ml-[14px] h-9 w-auto" />
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
        <div className="grid grid-cols-2 gap-8 border-b border-cream-muted p-6 md:grid-cols-3 lg:grid-cols-5 lg:p-10">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-charcoal-muted transition-colors hover:text-charcoal"
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
        <div className="flex items-center gap-6 border-b border-cream-muted px-6 py-8 lg:px-10">
          <p className="text-xs text-charcoal-muted">© 2026 Zernio</p>
          <a
            href="#"
            className="text-xs text-charcoal-muted transition-colors hover:text-charcoal"
          >
            Cookie settings
          </a>
        </div>

        {/* Large wordmark, masked to cream-muted, full grid width within the 40px margins */}
        <div className="px-6 py-12 lg:px-10">
          <span
            aria-hidden
            className="block aspect-[475/100] w-full bg-cream-muted"
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
