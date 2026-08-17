import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0D12",
        panel: "#12161F",
        "panel-raised": "#171C27",
        edge: "#242B3A",
        ink: "#EDEFF4",
        mute: "#8A93A6",
        signal: "#8B7CFA", // latent-space violet
        amber: "#F2A65A", // activation amber
        wire: "#4FD1E8", // connective cyan, used sparingly
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
} satisfies Config;
