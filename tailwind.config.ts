import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: { DEFAULT: "#C5A059", hover: "#B58A3E", active: "#9E7530", "on-dark": "#D4B679" },
        // Ink
        ink: "#0F1815",
        body: "#1A2820",
        "body-on-dark": "#FAFCFF",
        "body-muted": "#CFDAE5",
        "ink-muted-80": "#3A4A40",
        "ink-muted-48": "#7A8A82",
        // Surfaces (briefing)
        canvas: "#FFFFFF",
        "canvas-parchment": "#F7F4ED",
        "surface-deep": "#0F1815",
        "surface-navy-green": "#1A2820",
        "surface-sage": "#3A5042",
        hairline: "#D8DEE0",
        "divider-soft": "#EDE6D6",
        // Hero overrides (apenas para o hero da Home)
        "hero-bg": "#F5EFE6",
        "hero-green": { DEFAULT: "#1F3D2F", hover: "#2A5240" },
        "hero-ink": "#1A1A1A",
        "hero-muted": "#5C5C5C",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      boxShadow: {
        sm: "rgba(15, 24, 21, 0.06) 0px 1px 3px 0px",
        card: "rgba(15, 24, 21, 0.06) 0px 1px 3px 0px, rgba(15, 24, 21, 0.04) 0px 4px 8px 0px",
        lift: "rgba(15, 24, 21, 0.08) 0px 4px 12px 0px",
        press: "rgba(15, 24, 21, 0.05) 0px 1px 2px 0px",
        "gold-focus": "rgba(197, 160, 89, 0.15) 0px 0px 0px 4px",
        "hero-photo": "rgba(15, 24, 21, 0.08) 0px 12px 32px -8px",
      },
      borderRadius: { card: "16px", pill: "9999px" },
      letterSpacing: { tightish: "-0.01em", tight: "-0.02em", tighter: "-0.03em" },
      maxWidth: { content: "1200px" },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: { "pulse-ring": "pulse-ring 2s ease-out infinite" },
    },
  },
  plugins: [],
} satisfies Config;
