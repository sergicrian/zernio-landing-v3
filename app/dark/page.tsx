import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Zernio — Dark",
};

/**
 * Dark theme route. Same landing tree, wrapped in `.theme-dark` so the scoped
 * palette overrides (globals.css) re-map every CSS-variable-backed token. The
 * wrapper paints the dark canvas and is min-h-screen so the viewport is covered
 * even before content fills it. The light site (/) is untouched.
 */
export default function DarkHome() {
  return (
    <div className="theme-dark min-h-screen bg-parchment-white text-midnight-ink">
      <LandingPage />
    </div>
  );
}
