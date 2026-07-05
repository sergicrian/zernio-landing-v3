"use client";

import { useRef, type ForwardRefExoticComponent, type RefAttributes } from "react";
import { motion } from "motion/react";
import {
  CircleCheckIcon,
  ContactRoundIcon,
  LayoutListIcon,
  PhoneIcon,
  SendIcon,
  UsersIcon,
} from "@animateicons/react/lucide";

import { cn } from "@/libs/design-system/cn";
import { SectionHeading } from "@/components/sections/section-heading";
import { useScrollReveal } from "@/components/sections/hero-reveal";

/**
 * Features (Figma 30:1066), on the v3 dark system. 2x3 grid of features, each an
 * animated icon tile + title + copy, laid out on the shared graphite rail grid: a
 * vertical rail splits the columns on desktop and horizontal hairlines separate the
 * rows, all rail-to-rail inside the bordered panel (same treatment as GridBand).
 * On mobile the cells stack with a hairline between each.
 *
 * Icons come from `@animateicons/react` (Lucide set, built on motion). They play
 * their micro-interaction on hover of the whole card via the imperative handle
 * (see FeatureCard). Three of the original Lucide glyphs aren't in the animated
 * set, so they map to the closest animated equivalents: Megaphone -> Send,
 * LayoutTemplate -> LayoutList, Building2 -> ContactRound.
 *
 * Token mapping: tile is a carbon surface on a graphite hairline with a paper
 * glyph; title in paper (label-lg), body in fog (body) — matching StepText in
 * how-it-works so the sections stay consistent on the dark system.
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
  const headingReveal = useScrollReveal(0);
  const gridReveal = useScrollReveal(0.5);
  const last = FEATURES.length - 1;

  return (
    <div id="features" className="scroll-mt-24 border-t border-graphite pt-12">
      <motion.div {...headingReveal}>
        <SectionHeading
          eyebrow="Features"
          lead="Everything the Cloud API makes hard,"
          tail="handled"
        />
      </motion.div>

      {/* Rail grid: top hairline separates from the heading; vertical rail splits the
          columns and horizontal hairlines separate the rows (desktop), rail-to-rail. */}
      <motion.div
        {...gridReveal}
        className="grid grid-cols-1 border-t border-graphite md:grid-cols-2"
      >
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            className={cn(
              "flex flex-col gap-5 border-graphite px-4 py-8 lg:px-8",
              // hairline between stacked cells on mobile
              i !== last && "border-b",
              // last desktop row drops its bottom hairline (open-ended panel)
              i === last - 1 && "md:border-b-0",
              // vertical rail on the left column (desktop)
              i % 2 === 0 && "md:border-r",
            )}
          />
        ))}
      </motion.div>
    </div>
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
      <div className="flex size-11 items-center justify-center rounded-2xl border border-graphite bg-carbon text-paper">
        <Icon ref={ref} size={20} aria-hidden />
      </div>
      <h3 className="text-label-lg font-medium text-paper">{title}</h3>
      <p className="text-body text-fog">{body}</p>
    </div>
  );
}
