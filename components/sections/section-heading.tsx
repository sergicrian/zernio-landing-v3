/**
 * Centered section header used across the landing: a coral mono eyebrow (tag token)
 * over a two-tone heading (lead in paper, tail in fog). Matches the Why Zernio
 * header so the sections stay visually consistent on the dark system.
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
    <div className="flex flex-col items-center gap-4 px-4 pb-12 text-center lg:px-8">
      <p className="font-mono text-tag tracking-wider text-coral">{eyebrow}</p>
      <h2 className="text-heading font-medium tracking-tight text-paper">
        {stacked ? (
          <>
            <span className="block">{lead}</span>
            <span className="block text-fog">{tail}</span>
          </>
        ) : (
          <>
            {lead} <span className="text-fog">{tail}</span>
          </>
        )}
      </h2>
    </div>
  );
}
