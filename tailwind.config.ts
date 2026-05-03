import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        coal: "#111111",
        steel: "#1A1A1A",
        cream: "#F2EFE7",
        mutedCream: "#C8C1B5",
        ticket: "#D8CDB9",
        lineRed: "#D7332F",
        lineBlue: "#2867D8",
        lineYellow: "#E4B72E",
        lineGreen: "#4D8F39",
      },
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "Arial Narrow", "sans-serif"],
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(215, 51, 47, 0.25)",
      },
      backgroundImage: {
        tile: "linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
