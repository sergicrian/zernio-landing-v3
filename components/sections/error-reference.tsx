import { Button } from "@/components/ui/button";

/**
 * Error Reference (Figma 27:186). A bordered banner linking to the WhatsApp API
 * error reference docs. Text and link stack on mobile, sit on one row on desktop.
 */
export function ErrorReference() {
  return (
    <section className="border-b border-ash-border rule-b p-6 lg:p-10">
      <div className="flex flex-col gap-5 rounded-xl border border-ash-border bg-warm-sand p-6 sm:flex-row sm:items-end sm:justify-between lg:p-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-midnight-ink">
            WhatsApp API error reference
          </p>
          <p className="max-w-2xl text-base text-driftwood">
            Comprehensive guide to WhatsApp API error codes. Find solutions and
            troubleshoot common integration issues.
          </p>
        </div>

        <Button variant="outline" size="sm" className="shrink-0 self-start sm:self-end">
          View error reference
        </Button>
      </div>
    </section>
  );
}
