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
 * Token verification showcase, served at /designsystem. One example of each
 * primitive on a parchment surface so the design tokens can be checked visually.
 */
export default function DesignSystem() {
  return (
    <main className="mx-auto w-full max-w-content px-page py-12 md:px-page-desktop">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-burgundy">
          Zernio design system
        </h1>
        <p className="mt-2 text-sm text-driftwood">
          Primitive showcase for token verification.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {/* Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Buttons</h2>
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
        <section className="flex max-w-sm flex-col gap-4">
          <h2 className="text-xl font-semibold">Input</h2>
          <Input placeholder="you@example.com" type="email" />
        </section>

        {/* Badges */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Badges</h2>
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
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Card</h2>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Scheduled post</CardTitle>
              <CardDescription>
                Publishes to 3 channels on 2026-07-01 at 09:00 UTC.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-driftwood">
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
