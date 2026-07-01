import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Why Zernio (Figma header 4:669 + table 4:673). Centered eyebrow + two-tone
 * heading, then a two-column comparison built as cells of the line grid (1px
 * ash-border borders, square, no shadow), so it merges with the surrounding grid
 * rather than reading as floating cards. Columns stack on mobile, Zernio first.
 *
 * Resolution: Figma draws the Zernio checks in coral. Per design.md (coral reads
 * as error and is reserved for one action per view) the checks render emerald
 * (success). The WhatsApp crosses stay driftwood (gray), per the rules.
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
    <section>
      {/* Header */}
      <div className="flex flex-col items-center gap-5 px-6 py-10 text-center lg:px-10">
        <Button variant="soft" size="sm" className="tracking-wider">
          Why Zernio?
        </Button>
        <h2 className="text-2xl font-semibold tracking-tight text-midnight-ink">
          Meta&apos;s API fights you.{" "}
          <span className="text-driftwood">Ours doesn&apos;t.</span>
        </h2>
      </div>

      {/* Comparison table */}
      <div className="grid grid-cols-1 border-y border-ash-border rule-y lg:grid-cols-2">
        {/* Zernio (first on mobile) */}
        <div className="border-ash-border lg:border-r">
          <h3 className="px-6 py-5 text-base font-semibold text-midnight-ink lg:px-10">
            Zernio API
          </h3>
          <ul>
            {ZERNIO.map((row) => (
              <li
                key={row}
                className="flex items-center gap-5 px-6 py-2.5 lg:px-10"
              >
                <Check
                  className="size-6 shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span className="text-base text-driftwood">{row}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Cloud API */}
        <div className="border-t border-ash-border lg:border-t-0">
          <h3 className="px-6 py-5 text-base font-semibold text-midnight-ink lg:px-10">
            WhatsApp Cloud API (direct)
          </h3>
          <ul>
            {CLOUD.map((row) => (
              <li
                key={row}
                className="flex items-center gap-5 px-6 py-2.5 lg:px-10"
              >
                <X
                  className="size-6 shrink-0 text-driftwood"
                  aria-hidden
                />
                <span className="text-base text-driftwood">{row}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
