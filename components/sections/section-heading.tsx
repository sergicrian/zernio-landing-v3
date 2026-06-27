import { Button } from "@/components/ui/button";

/**
 * Centered section header used across the landing: a soft coral eyebrow over a
 * two-tone heading (lead in charcoal, tail in charcoal-muted). Mirrors the Why
 * Zernio header so the new sections stay visually consistent.
 */
export function SectionHeading({
  eyebrow,
  lead,
  tail,
  stacked = false,
}: {
  eyebrow: string;
  lead: string;
  tail: string;
  /** Render lead and tail as two stacked lines instead of inline. */
  stacked?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-5 px-6 py-10 text-left lg:px-10">
      <Button variant="soft" size="sm">
        {eyebrow}
      </Button>
      <h2 className="text-2xl font-bold tracking-tight text-charcoal">
        {stacked ? (
          <>
            <span className="block">{lead}</span>
            <span className="block text-charcoal-muted">{tail}</span>
          </>
        ) : (
          <>
            {lead} <span className="text-charcoal-muted">{tail}</span>
          </>
        )}
      </h2>
    </div>
  );
}
