"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { GridBand } from "@/components/sections/grid-band";
import { cn } from "@/libs/design-system/cn";

/**
 * FAQ (Figma 27:232). Two columns on desktop (title + accordion), stacked on
 * mobile. Each item expands to the real height of its answer with a smooth
 * height-auto animation; one item is open by default. Answers for items 2-6 are
 * placeholders, swap the text in ANSWERS below once provided.
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

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section className="flex flex-col lg:flex-row">
      {/* Title column */}
      <div className="flex flex-col justify-center gap-5 border-b border-cream-muted px-6 py-10 lg:w-[300px] lg:shrink-0 lg:border-r lg:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-charcoal">
          Frequently asked questions
        </h2>
        <Button variant="link" className="h-auto self-start p-0 text-xs">
          Contact
        </Button>
      </div>

      {/* Accordion, framed by ruled bands on desktop */}
      <div className="flex-1">
        <GridBand className="hidden h-[170px] lg:grid" />

        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-cream-muted">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-5 px-6 py-5 text-left lg:px-8"
              >
                <span className="flex-1 text-base font-bold text-charcoal">
                  {item.q}
                </span>
                <Plus
                  className={cn(
                    "mt-0.5 size-5 shrink-0 text-charcoal-muted transition-transform duration-base ease-brand",
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
                <p className="px-6 pb-5 text-base text-charcoal-muted lg:px-8">
                  {item.a}
                </p>
              </motion.div>
            </div>
          );
        })}

        <GridBand className="hidden h-[170px] lg:grid" />
      </div>
    </section>
  );
}
