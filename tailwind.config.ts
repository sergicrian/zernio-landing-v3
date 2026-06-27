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
      // --- Colors: flat brand palette, each with DEFAULT + muted ---
      colors: {
        coral: {
          DEFAULT: "#EB3514",
          muted: "#E09282",
        },
        burgundy: {
          DEFAULT: "#660202",
          muted: "#A57070",
        },
        charcoal: {
          DEFAULT: "#2D2D2D",
          muted: "#6B6B6B",
        },
        cream: {
          DEFAULT: "#F0EFEB",
          muted: "#D9D8D3",
        },
        white: "#FFFFFF",
      },

      // --- Brand gradient + branded CTA glow ---
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #EB3514, #660202)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(235, 53, 20, 0.3)",
      },

      // --- Typography: Menlo monospace everywhere, no web fonts ---
      fontFamily: {
        mono: [
          "Menlo",
          "Consolas",
          "Monaco",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        // Dashboard UI mockups only (Zernio's product font).
        geist: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
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
        content: "1280px",
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
