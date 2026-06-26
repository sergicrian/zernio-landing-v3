import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="font-mono h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
