import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // L9O Military Design System
        charcoal: {
          950: "#080908",
          900: "#0C0D0B",
          800: "#111310",
          700: "#161A13",
          600: "#1E2318",
        },
        steel: {
          700: "#2A2E27",
          600: "#3A3B33",
          500: "#4A4C42",
          400: "#5A5C50",
          300: "#8A8C85",
          200: "#B0B2A8",
          100: "#D4D6CC",
        },
        olive: {
          900: "#2B3020",
          800: "#3A4228",
          700: "#4A5240",
          600: "#5A6350",
          500: "#6B7A3E",
          400: "#8A9B56",
        },
        ember: {
          700: "#7A2E08",
          600: "#A83D10",
          500: "#C45C1A",
          400: "#D97A35",
          300: "#E89A55",
        },
        cream: "#E8E4DA",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "noise-pattern":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        "hero-gradient":
          "linear-gradient(to bottom, rgba(8,9,8,0.3) 0%, rgba(8,9,8,0.6) 50%, rgba(8,9,8,0.95) 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(74,82,64,0.15) 0%, rgba(22,26,19,0.8) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(196, 92, 26, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(196, 92, 26, 0.7)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
