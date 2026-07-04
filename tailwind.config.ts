import type { Config } from "tailwindcss";

/**
 * Zernio design system - dark theme (dark-first, single theme).
 * Source of truth: design.md. Tokens map 1:1 to that document.
 *
 * NOTE: borderRadius is intentionally NOT overridden, so `rounded-md` / `rounded-lg`
 * / `rounded-xl` resolve to Tailwind's defaults (6 / 8 / 12px). Components use those
 * utilities for the px values quoted in design.md.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./libs/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // --- Colors: ten-step dark neutral scale + two brand accents ---
      // Values reference CSS custom properties (defined in app/globals.css) so the
      // palette lives in one place. Names are canonical, use them in code.
      colors: {
        // Surfaces, canvas up.
        void: "var(--void)", // page canvas, full-bleed background
        carbon: "var(--carbon)", // card / navbar / panel surfaces
        obsidian: "var(--obsidian)", // elevated surfaces, deeper panels, popovers
        // Borders and dividers.
        graphite: "var(--graphite)", // subtle borders, ghost/outline outlines
        smoke: "var(--smoke)", // higher-contrast hairlines, section separators
        // Text and icons, dim to bright.
        ash: "var(--ash)", // attenuated body text, inactive icons, metadata
        fog: "var(--fog)", // tertiary text, placeholders, icon fills
        mist: "var(--mist)", // secondary headings, button text on dark
        bone: "var(--bone)", // near-white fills, primary body, button text
        paper: "var(--paper)", // primary headings, hero type, max contrast
        // Brand accents (DEFAULT + muted companion).
        coral: {
          DEFAULT: "var(--coral)", // primary action accent, the single action
          muted: "var(--coral-muted)", // soft coral tints, code strings
        },
        burgundy: {
          DEFAULT: "var(--burgundy)", // depth, secondary emphasis, gradient end
          muted: "var(--burgundy-muted)",
        },
        // Quoted strings in embedded code terminals (themed independently so it
        // stays legible on the dark terminal surface).
        "code-string": "var(--code-string)",
      },

      // --- Secondary-surface gradient + branded CTA glow ---
      backgroundImage: {
        // Figma "linear-gradient": graphite -> carbon. Secondary-button surface.
        "linear-gradient":
          "linear-gradient(-90deg, var(--graphite) 0%, var(--carbon) 100%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(235, 53, 20, 0.3)",
      },

      // --- Typography: Geist (sans) by default; Menlo (mono) for technical accents ---
      fontFamily: {
        // Default font everywhere, applied via `font-sans` on <html>.
        sans: [
          "var(--font-geist)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        // Punctual technical accents (badges, code, eyebrows, tabular figures).
        mono: [
          "Menlo",
          "Consolas",
          "Monaco",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      // Named type scale from design.md (size / line-height baked in). Prefer these
      // over raw Tailwind sizes. Tailwind's default numeric scale stays available.
      fontSize: {
        display: ["4rem", { lineHeight: "1.1" }], // 64 / 110%
        heading: ["1.5rem", { lineHeight: "1.875rem" }], // 24 / 30
        "body-lg": ["1.25rem", { lineHeight: "1.75rem" }], // 20 / 28
        body: ["1rem", { lineHeight: "1.5rem" }], // 16 / 24
        "label-lg": ["1rem", { lineHeight: "1.25rem" }], // 16 / 20
        label: ["0.875rem", { lineHeight: "1.25rem" }], // 14 / 20
        "label-sm": ["0.8125rem", { lineHeight: "1rem" }], // 13 / 16
        tag: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "700" }], // 14 / 20, Menlo Bold
      },

      // --- Layout constants (spacing stays on the 4px default scale) ---
      maxWidth: {
        content: "1280px", // outer frame (solid rails)
      },
      spacing: {
        page: "24px", // page padding, mobile
        "page-desktop": "64px", // page padding, desktop
        section: "80px", // section vertical gap, mobile
        "section-desktop": "112px", // section vertical gap, desktop
      },

      // --- Motion ---
      transitionTimingFunction: {
        brand: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
