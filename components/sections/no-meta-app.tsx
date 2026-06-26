import { Button } from "@/components/ui/button";

/**
 * No Meta app required (Figma 4:722). Eyebrow + two-column text (lead / detail)
 * then the coral CTA. Bottom hairline closes the content box. Text columns stack
 * on mobile (lead first).
 *
 * Resolution: Figma sets the eyebrow in coral, but the section's single coral
 * action is the button below, so the eyebrow renders charcoal-muted per the rules.
 */
export function NoMetaApp() {
  return (
    <section className="flex flex-col gap-10 border-b border-cream-muted p-6 lg:p-10">
      <div className="flex flex-col gap-5">
        <p className="text-sm font-bold text-charcoal-muted">
          No Meta developer app required
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <p className="text-2xl font-bold tracking-tight text-charcoal">
            Zernio handles WABA provisioning through Meta Embedded Signup.
          </p>
          <p className="text-lg text-charcoal-muted">
            No need to create a Meta app, configure webhooks, or pass App Review.
            Connect in one click from our dashboard.
          </p>
        </div>
      </div>

      <div>
        <Button>Start for free</Button>
      </div>
    </section>
  );
}
