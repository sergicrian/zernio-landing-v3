import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Self-hosted Geist, applied globally across the whole site. Exposed as a CSS
// variable and used as the `font-sans` default (`font-mono` is Menlo).
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Zernio",
  description: "The social media scheduling API for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: browser extensions (ColorZilla's
    // `cz-shortcut-listen`, etc.) inject attributes onto <html>/<body> before
    // React hydrates. This silences only those element-level mismatches; it does
    // not mask hydration bugs in the app tree below.
    <html
      lang="en"
      className={`${geist.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
