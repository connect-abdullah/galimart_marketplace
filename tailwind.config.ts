import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Primary brand (forest green); token name `teal` kept for existing utilities. */
        teal: {
          DEFAULT: "#1B4D3E",
          light: "#2D6A4F",
          dark: "#123D32",
        },
        /** Accent (warm copper); token name `gold` kept for existing utilities. */
        gold: {
          DEFAULT: "#B86B29",
          light: "#C97F3D",
        },
        offwhite: "#F7F5F0",
        lightgrey: "#EDE9E0",
        midgrey: "#D9D3C7",
        border: "#E0DACE",
        /** Footer / deep hero panels */
        ink: "#0F1F1A",
        /** Warm page + header surfaces */
        cream: "#FAF6EF",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.55s ease-out forwards",
        "fade-in-up": "fadeInUp 0.65s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
