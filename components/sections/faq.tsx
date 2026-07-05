"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/libs/design-system/cn";

/**
 * FAQ (Figma 27:232), rebuilt on the v3 dark system. Two columns on desktop (title +
 * accordion), stacked on mobile. Each item expands to the real height of its answer
 * with a smooth height-auto animation; one item is open by default.
 *
 * It's the closing block of the bordered panel chain: it inherits the lateral rails
 * (border-x) and adds the bottom rail (border-b). Because it's the last section of the
 * frame, the bottom corners are rounded (`rounded-b-3xl`) and the content is clipped to
 * them (`overflow-hidden`). The original ruled bands are preserved (a 170px grid band
 * top and bottom of the accordion column, plus the title column's vertical rail) and
 * recolored onto `graphite` so they match the rest of the framed sections.
 *
 * Token mapping (off the old light tokens): rails `ash-border -> graphite`, questions +
 * title `midnight-ink -> paper`, answers + plus icon `driftwood -> fog`.
 */
const ITEMS: { q: string; a: string }[] = [
  {
    q: "Do I need a Meta developer app for WhatsApp?",
    a: "No. Zernio handles WABA provisioning through Meta Embedded Signup. One-click connect from our dashboard, no Meta Business Manager navigation required.",
  },
  {
    q: "How does Zernio handle the 24-hour messaging window?",
    a: "Automatically. When a user messages you, you have 24 hours to reply freely. Outside that window, only approved template messages work (Meta charges for these). Zernio tracks windows per conversation and returns clear errors if you try to send outside it, so you never get silent failures.",
  },
  {
    q: "How does pricing compare to Twilio or other BSPs?",
    a: "Zernio passes through Meta's conversation-based pricing with zero markup on message fees. No per-message surcharge, no BSP tax. You pay Zernio's platform fee plus Meta's standard rates, which are typically 3-5x cheaper than Twilio's WhatsApp pricing.",
  },
  {
    q: "What about Meta Business verification?",
    a: "Meta requires business verification to go beyond 250 messages/day. Zernio's Embedded Signup flow handles the verification request as part of onboarding. If Meta needs additional documents, we surface clear instructions, not a black box rejection with no explanation.",
  },
  {
    q: "Can I build chatbots with Zernio?",
    a: "Yes. Webhooks deliver incoming messages in a consistent JSON format (same as Instagram, Telegram, and all other platforms). Send replies via our API. Works with any AI backend: OpenAI, Claude, custom logic.",
  },
  {
    q: "What happens when Meta ships breaking changes?",
    a: "We absorb them. Meta is known for pushing breaking changes to the WhatsApp Cloud API without warning. Zernio maintains compatibility at the API layer, so your integration keeps working even when Meta's underlying API changes.",
  },
];

/**
 * Ruled band framing the accordion column (desktop only): an empty 170px row split
 * into two cells by a `graphite` vertical rail. The top band carries a bottom hairline
 * to separate it from the first question; the bottom band drops it (the frame's rounded
 * bottom rail closes the block instead).
 */
function Band({ divider = false }: { divider?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hidden h-[170px] grid-cols-2 lg:grid",
        divider && "border-b border-graphite",
      )}
    >
      <div className="border-r border-graphite" />
      <div />
    </div>
  );
}

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faqs"
      className="scroll-mt-24 overflow-hidden rounded-b-3xl border-x border-b border-graphite"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Title column: mirrors the accordion's ruled 170px bands top and bottom so
            the horizontal rails run continuously across both columns. The title sits
            just below the top rail. */}
        <div className="flex flex-col border-b border-graphite lg:w-[300px] lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="hidden h-[170px] border-b border-graphite lg:block" aria-hidden />
          <div className="flex-1 px-6 py-10 lg:px-10">
            <h2 className="text-heading font-medium tracking-tight text-paper">
              Frequently asked questions
            </h2>
          </div>
          <div className="hidden h-[170px] border-t border-graphite lg:block" aria-hidden />
        </div>

        {/* Accordion, framed by ruled bands on desktop */}
        <div className="flex-1">
          <Band divider />

          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-graphite">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-5 px-6 py-5 text-left lg:px-8"
                >
                  <span className="flex-1 text-body font-medium text-paper">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "mt-0.5 size-5 shrink-0 text-fog transition-transform duration-base ease-brand",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-body text-fog lg:px-8">{item.a}</p>
                </motion.div>
              </div>
            );
          })}

          <Band />
        </div>
      </div>
    </section>
  );
}
