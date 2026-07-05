import Image from "next/image";

import supportIcon from "@/public/support-icon.webp";

/**
 * Floating support button. Pinned to the bottom-right of the viewport (fixed, so
 * it stays visible through every scroll position) and offset from both edges so
 * it hugs the corner while still getting air on the bottom and sides. The inset
 * uses the safe-area env() vars so it clears the home indicator / rounded corners
 * on mobile, and grows a little on larger screens. z-50 keeps it above the
 * sticky navbar and framed panels.
 */
export function SupportButton() {
  return (
    <a
      href="#contact"
      aria-label="Soporte"
      className="group fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] right-[calc(env(safe-area-inset-right,0px)+1rem)] z-50 flex size-14 items-center justify-center rounded-full bg-coral p-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-base ease-brand hover:scale-105 active:scale-95 sm:bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] sm:right-[calc(env(safe-area-inset-right,0px)+1.5rem)] sm:size-16"
    >
      <Image
        src={supportIcon}
        alt="Soporte"
        className="h-full w-full"
        priority
      />
    </a>
  );
}
