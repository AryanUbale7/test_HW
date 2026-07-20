// Theme configuration for Honworth - Reverted mustard color accent changes
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
        ivory: "#FFFFFF",
        sage: "#AEC3B0",
        "sage-mist": "#E8EFE6",
        gold: "#8C6921",
        "deep-green": "#2E4A3A",
        charcoal: "#36403B",
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
