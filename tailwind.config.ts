import type { Config } from "tailwindcss";

/**
 * Zernio design system - light theme only.
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
      // --- Colors: flat brand palette + warm seven-step neutral scale ---
      // Values reference CSS custom properties so a scoped theme (`.theme-dark`,
      // see globals.css) can re-map the whole palette without touching any
      // component. The canonical light values live in `:root`.
      colors: {
        coral: {
          DEFAULT: "var(--coral)", // primary accent, the single primary action
          muted: "var(--coral-muted)", // soft coral surfaces and tints
        },
        burgundy: {
          DEFAULT: "var(--burgundy)", // depth, secondary emphasis, gradient end
          muted: "var(--burgundy-muted)",
        },
        // Primary text, headlines, filled pill background, icon fills.
        "midnight-ink": "var(--midnight-ink)",
        // Secondary body text, muted link text, icon strokes.
        driftwood: "var(--driftwood)",
        // Tertiary helper text, placeholders, light icon strokes.
        fog: "var(--fog)",
        // Nav item text/icons (default), subtle washes, mid-level dividers.
        "silver-mist": "var(--silver-mist)",
        // Hairline borders on buttons, inputs, cards, nav items, dividers.
        "ash-border": "var(--ash-border)",
        // Card surfaces, feature tiles, section backgrounds (warmer than canvas).
        "warm-sand": "var(--warm-sand)",
        // Page canvas, the dominant background behind all sections and nav.
        "parchment-white": "var(--parchment-white)",
        // Quoted strings in embedded code terminals (themes independently of
        // burgundy so it stays legible on the dark terminal surface).
        "code-string": "var(--code-string)",
      },

      // --- Brand gradient + branded CTA glow ---
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #EB3514, #660202)",
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
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.15" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
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
