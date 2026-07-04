import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Token verification showcase, served at /designsystem. Renders the dark palette,
 * the Geist + Menlo type scale, and every re-themed primitive on the Void canvas so
 * the design tokens can be checked visually. Not the home, just a token proof sheet.
 */

// Canonical neutral scale, canvas up to pure white.
const surfaces = [
  { name: "void", hex: "#08090A", role: "page canvas" },
  { name: "carbon", hex: "#0F1011", role: "card / navbar surfaces" },
  { name: "obsidian", hex: "#161718", role: "elevated surfaces" },
  { name: "graphite", hex: "#23252A", role: "subtle borders" },
  { name: "smoke", hex: "#383B3F", role: "hairline separators" },
  { name: "ash", hex: "#62666D", role: "muted body / icons" },
  { name: "fog", hex: "#8A8F98", role: "tertiary / placeholders" },
  { name: "mist", hex: "#D0D6E0", role: "secondary headings" },
  { name: "bone", hex: "#E5E5E6", role: "primary body / fills" },
  { name: "paper", hex: "#FFFFFF", role: "primary headings / hero" },
];

const accents = [
  { name: "coral", hex: "#EB3514", role: "primary action" },
  { name: "coral-muted", hex: "#E09282", role: "soft coral tints" },
  { name: "burgundy", hex: "#660202", role: "depth / gradient end" },
  { name: "burgundy-muted", hex: "#A57070", role: "muted burgundy" },
];

// One row of the type scale: token name, the rendered sample, and its spec.
const typeScale = [
  { className: "text-display font-medium text-paper", label: "display", spec: "64 / 110, Medium" },
  { className: "text-heading font-medium text-paper", label: "heading", spec: "24 / 30, Medium" },
  { className: "text-body-lg text-bone", label: "body-lg", spec: "20 / 28, Regular" },
  { className: "text-body text-bone", label: "body", spec: "16 / 24, Regular" },
  { className: "text-label text-ash", label: "label", spec: "14 / 20, Regular" },
  { className: "text-label-sm text-ash", label: "label-sm", spec: "13 / 16, Regular" },
];

function Swatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-lg border border-graphite"
        style={{ backgroundColor: hex }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-tag text-bone">{name}</span>
        <span className="font-mono text-tag text-fog">{hex}</span>
        <span className="text-label-sm text-ash">{role}</span>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-tag uppercase tracking-wider text-fog">
      {children}
    </h2>
  );
}

export default function DesignSystem() {
  return (
    <main className="mx-auto w-full max-w-content px-page py-16 md:px-page-desktop">
      <header className="mb-16 flex flex-col gap-3">
        <span className="font-mono text-tag uppercase tracking-wider text-coral">
          Design System / Dark
        </span>
        <h1 className="text-display font-medium text-paper">Zernio</h1>
        <p className="text-body-lg text-ash">
          Token proof sheet. The dark palette, the Geist and Menlo type scale, and the
          re-themed primitives, all on Void.
        </p>
      </header>

      <div className="flex flex-col gap-20">
        {/* Palette */}
        <section className="flex flex-col gap-6">
          <SectionHeading>Neutral scale</SectionHeading>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {surfaces.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading>Brand accents</SectionHeading>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {accents.map((a) => (
              <Swatch key={a.name} {...a} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-24 w-full rounded-xl border border-smoke bg-linear-gradient" />
            <span className="text-label-sm text-ash">
              linear-gradient: linear-gradient(-90deg, graphite, carbon). Secondary-button
              surface (navbar Dashboard, hero View API Docs).
            </span>
          </div>
        </section>

        {/* Typography */}
        <section className="flex flex-col gap-6">
          <SectionHeading>Type scale (Geist)</SectionHeading>
          <div className="flex flex-col divide-y divide-graphite">
            {typeScale.map((t) => (
              <div
                key={t.label}
                className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className={`${t.className} min-w-0 truncate`}>
                  The social media scheduling API
                </span>
                <span className="shrink-0 font-mono text-tag text-fog">
                  {t.label} · {t.spec}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading>Mono (Menlo)</SectionHeading>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-tag uppercase tracking-wider text-fog">
              WHATSAPP
            </span>
            <Badge variant="soft">v2.stable</Badge>
            <Badge variant="neutral">POST /schedule</Badge>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-graphite bg-carbon p-5 font-mono text-label text-bone">
            <code>
              {`curl -X POST https://api.zernio.dev/v1/schedule \\
  -H "authorization: Bearer $TOKEN" \\
  -d '{ "channel": `}
              <span className="text-code-string">&quot;whatsapp&quot;</span>
              {`, "at": `}
              <span className="text-code-string">&quot;2026-07-04T09:00:00Z&quot;</span>
              {` }'`}
            </code>
          </pre>
        </section>

        {/* Buttons */}
        <section className="flex flex-col gap-6">
          <SectionHeading>Buttons</SectionHeading>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Connect account</Button>
            <Button variant="secondary">View docs</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
          </div>
        </section>

        {/* Input */}
        <section className="flex max-w-sm flex-col gap-6">
          <SectionHeading>Input</SectionHeading>
          <Input placeholder="you@example.com" type="email" />
        </section>

        {/* Badges */}
        <section className="flex flex-col gap-6">
          <SectionHeading>Badges</SectionHeading>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>default</Badge>
            <Badge variant="soft">soft</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="neutral">neutral</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="info">info</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="error">error</Badge>
          </div>
        </section>

        {/* Card */}
        <section className="flex flex-col gap-6">
          <SectionHeading>Card</SectionHeading>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Scheduled post</CardTitle>
              <CardDescription>
                Publishes to 3 channels on 2026-07-01 at 09:00 UTC.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-label text-ash">
              Draft saved. Review the request payload before you queue it.
            </CardContent>
            <CardFooter className="gap-3">
              <Button size="sm">Queue post</Button>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
