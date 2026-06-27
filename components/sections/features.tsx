import {
  Building2,
  CircleCheck,
  LayoutTemplate,
  Megaphone,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";

/**
 * Features (Figma 30:1066). 2x3 grid of features, each a lucide icon tile + title
 * + copy. A single vertical rail splits the columns on desktop; on mobile the
 * cells stack with hairline dividers. Figma's Phosphor icons are mapped to the
 * closest lucide equivalents.
 */
const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Megaphone,
    title: "Broadcast campaigns",
    body: "Send personalized template messages to up to 100 recipients per request. Schedule sends, track per-recipient delivery, cancel before send.",
  },
  {
    icon: LayoutTemplate,
    title: "Template management",
    body: "Full CRUD via API: create, list, update, delete templates. We submit to Meta for approval and track category changes so you don't get surprise billing.",
  },
  {
    icon: Users,
    title: "Contact CRM",
    body: "Import WhatsApp contacts in bulk, organize with tags and custom fields, track opt-in status. Search, filter, and segment your audience for broadcasts.",
  },
  {
    icon: Phone,
    title: "Phone number provisioning",
    body: "Search and purchase WhatsApp-ready US numbers through our API. No manual Meta developer setup. Automatic verification, no OTP required.",
  },
  {
    icon: CircleCheck,
    title: "Delivery and read tracking",
    body: "Track sent, delivered, read status for every message. Webhooks fire for each status change in the same format as all other platforms.",
  },
  {
    icon: Building2,
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

      <div className="grid grid-cols-1 border-t border-cream-muted lg:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <div
            key={title}
            className={[
              "flex flex-col gap-5 border-cream-muted px-6 py-8 lg:px-10",
              // hairline between stacked cells on mobile only
              i < FEATURES.length - 1 ? "border-b lg:border-b-0" : "",
              // vertical rail on the left column (desktop)
              i % 2 === 0 ? "lg:border-r" : "",
            ].join(" ")}
          >
            <div className="flex size-11 items-center justify-center rounded-2xl border border-cream-muted bg-white text-charcoal">
              <Icon className="size-5" aria-hidden />
            </div>
            <h3 className="text-base font-bold text-charcoal">{title}</h3>
            <p className="text-base text-charcoal-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
