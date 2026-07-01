import Image from "next/image";

import { cn } from "@/libs/design-system/cn";

import whatsappLogo from "@/public/whatsapp-logo.svg";

/**
 * Hero app-icon: white WhatsApp glyph on a solid coral tile (the one coral
 * accent up top). Static, no shadow.
 */
export function WhatsappIconBrand({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-12 items-center justify-center rounded-[14px] bg-coral lg:size-14 lg:rounded-[16px]",
        className,
      )}
    >
      {/* White WhatsApp glyph */}
      <Image
        src={whatsappLogo}
        alt="WhatsApp"
        className="h-6 w-auto drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] lg:h-7"
      />
    </div>
  );
}
