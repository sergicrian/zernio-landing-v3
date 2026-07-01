"use client";

import { useRef, type ForwardRefExoticComponent, type RefAttributes } from "react";
import {
  CircleCheckIcon,
  ContactRoundIcon,
  LayoutListIcon,
  PhoneIcon,
  SendIcon,
  UsersIcon,
} from "@animateicons/react/lucide";

import { SectionHeading } from "@/components/sections/section-heading";

/**
 * Features (Figma 30:1066). 2x3 grid of features, each an animated icon tile +
 * title + copy. A single vertical rail splits the columns on desktop; on mobile
 * the cells stack with hairline dividers.
 *
 * Icons come from `@animateicons/react` (Lucide set, built on motion). They play
 * their micro-interaction on hover of the whole card via the imperative handle
 * (see FeatureCard). Three of the original Lucide glyphs aren't in the animated
 * set, so they map to the closest animated equivalents: Megaphone -> Send,
 * LayoutTemplate -> LayoutList, Building2 -> ContactRound.
 */

// Every AnimateIcons handle shares this shape; we drive it on card hover.
type IconHandle = { startAnimation: () => void; stopAnimation: () => void };
type AnimatedIcon = ForwardRefExoticComponent<
  { size?: number; "aria-hidden"?: boolean } & RefAttributes<IconHandle>
>;

const FEATURES: { icon: AnimatedIcon; title: string; body: string }[] = [
  {
    icon: SendIcon,
    title: "Broadcast campaigns",
    body: "Send personalized template messages to up to 100 recipients per request. Schedule sends, track per-recipient delivery, cancel before send.",
  },
  {
    icon: LayoutListIcon,
    title: "Template management",
    body: "Full CRUD via API: create, list, update, delete templates. We submit to Meta for approval and track category changes so you don't get surprise billing.",
  },
  {
    icon: UsersIcon,
    title: "Contact CRM",
    body: "Import WhatsApp contacts in bulk, organize with tags and custom fields, track opt-in status. Search, filter, and segment your audience for broadcasts.",
  },
  {
    icon: PhoneIcon,
    title: "Phone number provisioning",
    body: "Search and purchase WhatsApp-ready US numbers through our API. No manual Meta developer setup. Automatic verification, no OTP required.",
  },
  {
    icon: CircleCheckIcon,
    title: "Delivery and read tracking",
    body: "Track sent, delivered, read status for every message. Webhooks fire for each status change in the same format as all other platforms.",
  },
  {
    icon: ContactRoundIcon,
    title: "Business profile API",
    body: "Read and update your WhatsApp Business profile (about, description, address, email, websites) programmatically. No Meta Business Manager needed.",
  },
];

export function Features() {
  return (
    <section>
      <SectionHeading
        eyebrow="Features"
        lead="Everything the Cloud API makes hard,"
        tail="handled"
      />

      <div className="grid grid-cols-1 border-t border-ash-border rule-t lg:grid-cols-2">
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            className={[
              "flex flex-col gap-5 border-ash-border px-6 py-8 lg:px-10",
              // hairline between stacked cells on mobile only
              i < FEATURES.length - 1 ? "border-b lg:border-b-0" : "",
              // vertical rail on the left column (desktop)
              i % 2 === 0 ? "lg:border-r" : "",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * One feature cell. The whole card is the hover target: entering it plays the
 * icon's animation through its imperative handle (so the micro-interaction fires
 * even when the cursor is on the title/body, not just the glyph), leaving stops it.
 */
function FeatureCard({
  icon: Icon,
  title,
  body,
  className,
}: {
  icon: AnimatedIcon;
  title: string;
  body: string;
  className?: string;
}) {
  const ref = useRef<IconHandle>(null);

  return (
    <div
      className={className}
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <div className="flex size-11 items-center justify-center rounded-2xl border border-ash-border bg-warm-sand text-midnight-ink">
        <Icon ref={ref} size={20} aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-midnight-ink">{title}</h3>
      <p className="text-base text-driftwood">{body}</p>
    </div>
  );
}
