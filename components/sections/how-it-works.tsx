import Image from "next/image";
import { CheckCheck, Hash, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";

import usFlag from "@/public/usflag.png";
import spainFlag from "@/public/spainflag.png";

/**
 * How it works (Figma 30:1065). Header + 3 numbered cards. Each card holds a
 * product UI mockup (recreated from the design with system tokens), with the
 * number badge on top; the title and copy sit below the card. 3 across on desktop,
 * stacked on mobile.
 */

function NumberSelectorMock() {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-cream p-2 font-geist">
      <div className="flex gap-3 rounded-lg border border-cream-muted bg-white p-3 shadow-sm">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-cream-muted text-charcoal">
          <Plus className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-charcoal">Get a number</span>
            <Badge variant="success">recommended</Badge>
          </div>
          <span className="text-xs text-charcoal-muted">
            From $2/mo. Pick a country, we handle setup.
          </span>
        </div>
      </div>
      <div className="flex gap-3 rounded-lg p-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-cream-muted text-charcoal-muted">
          <Hash className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-charcoal">
            Use my own number
          </span>
          <span className="text-xs text-charcoal-muted">
            Bring your existing phone number. Requires verification during setup.
          </span>
        </div>
      </div>
    </div>
  );
}

function NumberTableMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-cream-muted bg-white font-geist">
      <p className="border-b border-cream-muted px-3 py-2 text-xs font-bold text-charcoal-muted">
        Number
      </p>
      <div className="flex items-center gap-2 border-b border-cream-muted px-3 py-3">
        <Image src={usFlag} alt="US" className="size-4 rounded-sm" />
        <span className="flex-1 text-sm text-charcoal">+1 2002 908 7457</span>
        <Badge variant="success">Active</Badge>
      </div>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 border-b border-cream-muted px-3 py-3"
        >
          <Image src={spainFlag} alt="ES" className="size-4 rounded-sm" />
          <div className="flex-1">
            <p className="text-sm font-bold text-charcoal">New ES number</p>
            <p className="text-xs text-charcoal-muted">Awaiting approval</p>
          </div>
          <Badge variant="warning">In review</Badge>
        </div>
      ))}
    </div>
  );
}

function ChatMock() {
  return (
    <div className="flex flex-col gap-3 font-geist">
      <div className="max-w-[75%] self-end rounded-xl rounded-tr-sm bg-coral-muted/30 px-3 py-2">
        <p className="text-sm text-charcoal">Hi</p>
        <p className="flex items-center justify-end gap-1 text-[10px] text-charcoal-muted">
          12.00
          <CheckCheck className="size-3 text-sky-500" aria-hidden />
        </p>
      </div>
      <div className="rounded-xl border border-cream-muted bg-white p-3 shadow-sm">
        <div className="mb-2 border-l-2 border-coral pl-2">
          <p className="text-xs font-bold text-coral">You</p>
          <p className="text-xs text-charcoal-muted">Hi</p>
        </div>
        <p className="text-sm text-charcoal">Hello!</p>
        <p className="text-sm text-charcoal">
          This is a test message to try your flow.
        </p>
        <p className="mt-1 text-right text-[10px] text-charcoal-muted">12.00</p>
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: 1,
    title: "Connect in one click",
    body: "Meta Embedded Signup creates the WABA and links your number. No Business Manager, no App Review.",
    mock: <NumberSelectorMock />,
  },
  {
    n: 2,
    title: "Send your first message",
    body: "One POST request to send templates, media, or interactive messages. Webhooks deliver replies in a consistent format across all platforms.",
    mock: <NumberTableMock />,
  },
  {
    n: 3,
    title: "Scale with broadcasts",
    body: "Bulk send to 100 recipients per request with per-user personalization. Schedule, track delivery and read receipts, cancel before send.",
    mock: <ChatMock />,
  },
];

export function HowItWorks() {
  return (
    <section>
      <SectionHeading
        eyebrow="How it works"
        lead="From zero to first message"
        tail="in three steps"
      />

      <div className="grid grid-cols-1 gap-5 border-y border-cream-muted p-6 md:grid-cols-3 lg:p-10">
        {STEPS.map((step) => (
          <div key={step.n} className="flex flex-col gap-5">
            <div className="h-[320px] overflow-hidden rounded-xl border border-cream-muted bg-white p-5">
              <div className="mb-5 flex size-10 items-center justify-center rounded-2xl border border-cream-muted bg-cream text-lg font-bold text-charcoal">
                {step.n}
              </div>
              {step.mock}
            </div>

            <h3 className="text-lg font-bold text-charcoal">{step.title}</h3>
            <p className="text-base text-charcoal-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
