import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        board: {
          light: "#f8fafc",
          dark: "#0f172a"
        },
        accent: {
          DEFAULT: "#0ea5e9",
          soft: "#7dd3fc"
        },
        fanorona: {
          bg: "#F5EFE0",
          "btn-idle": "#F0E8D8",
          green: "#2D5A27",
          brown: "#3B1F0A",
          amber: "#C8842A",
          muted: "#8B6A4A",
          separator: "#C4A882"
        }
      },
      boxShadow: {
        glow: "0 0 0 4px rgba(14, 165, 233, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
